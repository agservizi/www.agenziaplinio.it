import sql from "@/lib/db"
import { getDayOfWeek, isDateInPast, isDateTimeInPast } from "@/lib/date-utils"
import { startOfWeek, endOfWeek, format } from "date-fns"

export interface TimeSlot {
  id: number
  dayOfWeek: number
  startTime: string
  endTime: string
  isAvailable: boolean
  maxBookings: number
}

export interface AvailabilityResponse {
  date: string
  available: boolean
  timeSlots: {
    time: string
    available: boolean
    reason?: string
  }[]
}

export interface SimplifiedAvailability {
  date: string
  available: boolean
}

// Server-side cache
const timeSlotCache = new Map<number, TimeSlot[]>()
const blockedDatesCache = new Map<string, boolean>()
const bookingsCountCache = new Map<string, number>()
const availabilityCache = new Map<string, AvailabilityResponse>()
const monthAvailabilityCache = new Map<string, SimplifiedAvailability[]>()

// Cache expiration (1 hour)
const CACHE_EXPIRATION = 60 * 60 * 1000
let lastCacheClear = Date.now()

// Function to clear expired cache
function clearExpiredCache() {
  const now = Date.now()
  if (now - lastCacheClear > CACHE_EXPIRATION) {
    timeSlotCache.clear()
    blockedDatesCache.clear()
    bookingsCountCache.clear()
    availabilityCache.clear()
    monthAvailabilityCache.clear()
    lastCacheClear = now
  }
}

/**
 * Get all time slots for all days of the week in a single query
 */
export async function getAllTimeSlots(): Promise<Record<number, TimeSlot[]>> {
  try {
    const result = await sql`
      SELECT 
        id, 
        day_of_week as "dayOfWeek", 
        start_time as "startTime", 
        end_time as "endTime", 
        is_available as "isAvailable", 
        max_bookings as "maxBookings"
      FROM time_slots 
      WHERE is_available = true
      ORDER BY day_of_week, start_time
    `

    // Group by day of week
    const timeSlotsByDay: Record<number, TimeSlot[]> = {}

    for (const slot of result) {
      const dayOfWeek = slot.dayOfWeek
      if (!timeSlotsByDay[dayOfWeek]) {
        timeSlotsByDay[dayOfWeek] = []
      }
      timeSlotsByDay[dayOfWeek].push(slot)

      // Update cache
      if (!timeSlotCache.has(dayOfWeek)) {
        timeSlotCache.set(dayOfWeek, [])
      }
      timeSlotCache.get(dayOfWeek)!.push(slot)
    }

    return timeSlotsByDay
  } catch (error) {
    console.error("Error getting all time slots:", error)
    return {}
  }
}

/**
 * Get all blocked dates in a date range
 */
export async function getBlockedDatesInRange(startDate: string, endDate: string): Promise<string[]> {
  try {
    const result = await sql`
      SELECT blocked_date 
      FROM blocked_dates 
      WHERE blocked_date >= ${startDate} 
      AND blocked_date <= ${endDate}
    `

    const blockedDates = result.map((row) => row.blocked_date)

    // Update cache
    for (const date of blockedDates) {
      blockedDatesCache.set(date, true)
    }

    return blockedDates
  } catch (error) {
    console.error("Error getting blocked dates in range:", error)
    return []
  }
}

/**
 * Get all bookings in a date range
 */
export async function getBookingsInRange(
  startDate: string,
  endDate: string,
): Promise<Record<string, Record<string, number>>> {
  try {
    const result = await sql`
      SELECT 
        booking_date, 
        booking_time, 
        COUNT(*) as count
      FROM bookings 
      WHERE booking_date >= ${startDate} 
      AND booking_date <= ${endDate}
      AND status != 'cancelled'
      GROUP BY booking_date, booking_time
    `

    const bookingsByDate: Record<string, Record<string, number>> = {}

    for (const booking of result) {
      const date = booking.booking_date
      const time = booking.booking_time
      const count = Number.parseInt(booking.count)

      if (!bookingsByDate[date]) {
        bookingsByDate[date] = {}
      }

      bookingsByDate[date][time] = count

      // Update cache
      const cacheKey = `${date}-${time}`
      bookingsCountCache.set(cacheKey, count)
    }

    return bookingsByDate
  } catch (error) {
    console.error("Error getting bookings in range:", error)
    return {}
  }
}

/**
 * Check if a specific date is blocked
 */
export async function isDateBlocked(date: string): Promise<boolean> {
  clearExpiredCache()

  // Check cache first
  if (blockedDatesCache.has(date)) {
    return blockedDatesCache.get(date)!
  }

  try {
    const result = await sql`
      SELECT * FROM blocked_dates WHERE blocked_date = ${date}
    `

    const isBlocked = result.length > 0
    blockedDatesCache.set(date, isBlocked)
    return isBlocked
  } catch (error) {
    console.error("Error checking if date is blocked:", error)
    return false
  }
}

/**
 * Get time slots for a specific day of the week
 */
export async function getTimeSlotsForDay(dayOfWeek: number): Promise<TimeSlot[]> {
  clearExpiredCache()

  // Check cache first
  if (timeSlotCache.has(dayOfWeek)) {
    return timeSlotCache.get(dayOfWeek)!
  }

  try {
    const result = await sql`
      SELECT 
        id, 
        day_of_week as "dayOfWeek", 
        start_time as "startTime", 
        end_time as "endTime", 
        is_available as "isAvailable", 
        max_bookings as "maxBookings"
      FROM time_slots 
      WHERE day_of_week = ${dayOfWeek} 
      AND is_available = true
      ORDER BY start_time
    `

    timeSlotCache.set(dayOfWeek, result)
    return result
  } catch (error) {
    console.error("Error getting time slots for day:", error)
    return []
  }
}

/**
 * Count existing bookings for a specific date and time
 */
export async function countBookings(date: string, time: string): Promise<number> {
  clearExpiredCache()

  const cacheKey = `${date}-${time}`

  // Check cache first
  if (bookingsCountCache.has(cacheKey)) {
    return bookingsCountCache.get(cacheKey)!
  }

  try {
    const result = await sql`
      SELECT COUNT(*) 
      FROM bookings 
      WHERE booking_date = ${date} 
      AND booking_time = ${time} 
      AND status != 'cancelled'
    `

    const count = Number.parseInt(result[0]?.count || "0")
    bookingsCountCache.set(cacheKey, count)
    return count
  } catch (error) {
    console.error("Error counting bookings:", error)
    return 0
  }
}

/**
 * Check availability for a specific date and time
 */
export async function checkAvailability(date: string, time: string): Promise<{ available: boolean; reason?: string }> {
  try {
    // Check if date is in the past
    if (isDateInPast(date)) {
      return { available: false, reason: "date_in_past" }
    }

    // Check if date and time are in the past
    if (isDateTimeInPast(date, time)) {
      return { available: false, reason: "time_in_past" }
    }

    // Check if date is blocked
    const blocked = await isDateBlocked(date)
    if (blocked) {
      return { available: false, reason: "date_blocked" }
    }

    // Get day of the week
    const dayOfWeek = getDayOfWeek(date)

    // Check if there's a time slot for this day and time
    const timeSlots = await getTimeSlotsForDay(dayOfWeek)

    const matchingSlot = timeSlots.find((slot) => {
      // Convert times to comparable format (minutes since midnight)
      const slotStart = timeToMinutes(slot.startTime)
      const slotEnd = timeToMinutes(slot.endTime)
      const checkTime = timeToMinutes(time)

      return checkTime >= slotStart && checkTime < slotEnd
    })

    if (!matchingSlot) {
      return { available: false, reason: "time_slot_not_available" }
    }

    // Count existing bookings
    const bookingsCount = await countBookings(date, time)

    // Check if there are still available spots
    if (bookingsCount >= matchingSlot.maxBookings) {
      return { available: false, reason: "fully_booked" }
    }

    return { available: true }
  } catch (error) {
    console.error("Error checking availability:", error)
    return { available: false, reason: "error_checking_availability" }
  }
}

/**
 * Get availability for a specific date
 */
export async function getAvailabilityForDate(date: string): Promise<AvailabilityResponse> {
  clearExpiredCache()

  // Check cache first
  if (availabilityCache.has(date)) {
    return availabilityCache.get(date)!
  }

  try {
    // Check if date is blocked
    const blocked = await isDateBlocked(date)

    if (blocked) {
      const response = {
        date,
        available: false,
        timeSlots: [],
      }
      availabilityCache.set(date, response)
      return response
    }

    // Get day of the week
    const dayOfWeek = getDayOfWeek(date)

    // Get time slots for this day
    const timeSlots = await getTimeSlotsForDay(dayOfWeek)

    if (timeSlots.length === 0) {
      const response = {
        date,
        available: false,
        timeSlots: [],
      }
      availabilityCache.set(date, response)
      return response
    }

    // Generate available times for each slot
    const availableTimeSlots = []

    for (const slot of timeSlots) {
      // Generate times at 30-minute intervals within the slot
      const times = generateTimesInSlot(slot.startTime, slot.endTime, 30)

      // Check availability for each time
      for (const time of times) {
        const { available, reason } = await checkAvailability(date, time)

        availableTimeSlots.push({
          time,
          available,
          reason,
        })
      }
    }

    const response = {
      date,
      available: availableTimeSlots.some((slot) => slot.available),
      timeSlots: availableTimeSlots,
    }

    availabilityCache.set(date, response)
    return response
  } catch (error) {
    console.error("Error getting availability for date:", error)
    return {
      date,
      available: false,
      timeSlots: [],
      error: "Failed to fetch availability",
    }
  }
}

/**
 * Get simplified availability for a range of dates (only available/not available)
 */
export async function getSimplifiedAvailabilityForDateRange(
  startDate: string,
  endDate: string,
): Promise<SimplifiedAvailability[]> {
  clearExpiredCache()

  const cacheKey = `${startDate}-${endDate}`

  // Check cache first
  if (monthAvailabilityCache.has(cacheKey)) {
    return monthAvailabilityCache.get(cacheKey)!
  }

  try {
    // Get all time slots for all days of the week
    const allTimeSlots = await getAllTimeSlots()

    // Get all blocked dates in the range
    const blockedDates = await getBlockedDatesInRange(startDate, endDate)
    const blockedDatesSet = new Set(blockedDates)

    // Get all bookings in the range
    const bookingsByDate = await getBookingsInRange(startDate, endDate)

    // Create a date range
    const start = new Date(startDate)
    const end = new Date(endDate)
    const result: SimplifiedAvailability[] = []

    // Process each date in the range
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateString = format(date, "yyyy-MM-dd")

      // Skip if date is in the past
      if (isDateInPast(dateString)) {
        result.push({
          date: dateString,
          available: false,
        })
        continue
      }

      // Skip if date is blocked
      if (blockedDatesSet.has(dateString)) {
        result.push({
          date: dateString,
          available: false,
        })
        continue
      }

      // Get day of the week
      const dayOfWeek = getDayOfWeek(dateString)

      // Get time slots for this day
      const timeSlots = allTimeSlots[dayOfWeek] || []

      if (timeSlots.length === 0) {
        result.push({
          date: dateString,
          available: false,
        })
        continue
      }

      // Check if any time slot is available
      let hasAvailableSlot = false

      for (const slot of timeSlots) {
        // Generate times at 30-minute intervals within the slot
        const times = generateTimesInSlot(slot.startTime, slot.endTime, 30)

        for (const time of times) {
          // Skip if time is in the past
          if (isDateTimeInPast(dateString, time)) {
            continue
          }

          // Check bookings
          const bookingsForDate = bookingsByDate[dateString] || {}
          const bookingsCount = bookingsForDate[time] || 0

          // Check if there are still available spots
          if (bookingsCount < slot.maxBookings) {
            hasAvailableSlot = true
            break
          }
        }

        if (hasAvailableSlot) {
          break
        }
      }

      result.push({
        date: dateString,
        available: hasAvailableSlot,
      })
    }

    monthAvailabilityCache.set(cacheKey, result)
    return result
  } catch (error) {
    console.error("Error getting simplified availability for date range:", error)
    return []
  }
}

/**
 * Get availability for a range of dates
 */
export async function getAvailabilityForDateRange(startDate: string, endDate: string): Promise<AvailabilityResponse[]> {
  try {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const result: AvailabilityResponse[] = []

    // Limita il range a massimo 14 giorni per evitare troppe richieste
    const maxEnd = new Date(start)
    maxEnd.setDate(maxEnd.getDate() + 14)
    const actualEnd = end < maxEnd ? end : maxEnd

    // Loop through each date in the range
    for (let date = new Date(start); date <= actualEnd; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split("T")[0]
      const availability = await getAvailabilityForDate(dateString)
      result.push(availability)
    }

    return result
  } catch (error) {
    console.error("Error getting availability for date range:", error)
    return []
  }
}

/**
 * Get availability for the current week
 */
export async function getAvailabilityForCurrentWeek(): Promise<SimplifiedAvailability[]> {
  const today = new Date()
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }) // Start from Monday
  const endOfCurrentWeek = endOfWeek(today, { weekStartsOn: 1 })

  const startDate = format(startOfCurrentWeek, "yyyy-MM-dd")
  const endDate = format(endOfCurrentWeek, "yyyy-MM-dd")

  return getSimplifiedAvailabilityForDateRange(startDate, endDate)
}

/**
 * Helper function to convert time string to minutes since midnight
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

/**
 * Helper function to generate times at specified intervals within a time slot
 */
function generateTimesInSlot(startTime: string, endTime: string, intervalMinutes: number): string[] {
  const result: string[] = []

  const startMinutes = timeToMinutes(startTime)
  const endMinutes = timeToMinutes(endTime)

  for (let minutes = startMinutes; minutes < endMinutes; minutes += intervalMinutes) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    result.push(`${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`)
  }

  return result
}

