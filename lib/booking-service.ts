import sql from "@/lib/db"
import { checkAvailability } from "@/lib/availability-service"
import { sendConfirmationEmail } from "@/lib/email-service"
import { formatDateItalian, formatTimeItalian, formatDateWithDayItalian } from "@/lib/date-utils"
import { generateCancellationToken } from "@/lib/token-service"

export interface BookingData {
  customerName: string
  email: string
  phone: string
  bookingDate: string
  bookingTime: string
  service?: string
  notes?: string
}

export interface Booking extends BookingData {
  id: number
  status: string
  createdAt: Date
}

/**
 * Create a new booking
 */
export async function createBooking(data: BookingData): Promise<Booking> {
  // Check availability first
  const availability = await checkAvailability(data.bookingDate, data.bookingTime)

  if (!availability.available) {
    throw new Error(`Cannot book: ${availability.reason}`)
  }

  // Create booking in a transaction to ensure consistency
  const result = await sql.begin(async (sql) => {
    // Double-check availability to prevent race conditions
    const recheck = await checkAvailability(data.bookingDate, data.bookingTime)
    if (!recheck.available) {
      throw new Error(`Cannot book: ${recheck.reason}`)
    }

    // Insert the booking
    const booking = await sql`
      INSERT INTO bookings (
        customer_name, 
        email, 
        phone, 
        booking_date, 
        booking_time,
        service,
        notes
      ) 
      VALUES (
        ${data.customerName}, 
        ${data.email}, 
        ${data.phone}, 
        ${data.bookingDate}, 
        ${data.bookingTime},
        ${data.service || null},
        ${data.notes || null}
      ) 
      RETURNING 
        id, 
        customer_name as "customerName", 
        email, 
        phone, 
        booking_date as "bookingDate", 
        booking_time as "bookingTime", 
        service,
        status, 
        notes,
        created_at as "createdAt"
    `

    return booking[0]
  })

  // Generate cancellation token
  const cancellationToken = await generateCancellationToken(result.id)

  // Format date and time for email
  const formattedDate = formatDateItalian(result.bookingDate)
  const formattedTime = formatTimeItalian(result.bookingTime)
  const formattedDateWithDay = formatDateWithDayItalian(result.bookingDate)

  // Send confirmation email
  await sendConfirmationEmail(result.email, {
    bookingId: result.id,
    customerName: result.customerName,
    bookingDate: formattedDate,
    bookingTime: formattedTime,
    bookingDateWithDay: formattedDateWithDay,
    service: result.service,
    cancellationToken,
  })

  return result
}

/**
 * Get a booking by ID
 */
export async function getBookingById(id: number): Promise<Booking | null> {
  const result = await sql`
    SELECT 
      id, 
      customer_name as "customerName", 
      email, 
      phone, 
      booking_date as "bookingDate", 
      booking_time as "bookingTime", 
      service,
      status, 
      notes,
      created_at as "createdAt"
    FROM bookings 
    WHERE id = ${id}
  `

  return result.length > 0 ? result[0] : null
}

/**
 * Update a booking
 */
export async function updateBooking(
  id: number,
  data: Partial<BookingData & { status: string }>,
): Promise<Booking | null> {
  // Build the update query dynamically based on provided fields
  const updates: any[] = []
  const values: any[] = []

  if (data.customerName) {
    updates.push("customer_name = $1")
    values.push(data.customerName)
  }

  if (data.email) {
    updates.push(`email = $${values.length + 1}`)
    values.push(data.email)
  }

  if (data.phone) {
    updates.push(`phone = $${values.length + 1}`)
    values.push(data.phone)
  }

  if (data.bookingDate) {
    updates.push(`booking_date = $${values.length + 1}`)
    values.push(data.bookingDate)
  }

  if (data.bookingTime) {
    updates.push(`booking_time = $${values.length + 1}`)
    values.push(data.bookingTime)
  }

  if (data.service !== undefined) {
    updates.push(`service = $${values.length + 1}`)
    values.push(data.service)
  }

  if (data.notes !== undefined) {
    updates.push(`notes = $${values.length + 1}`)
    values.push(data.notes)
  }

  if (data.status) {
    updates.push(`status = $${values.length + 1}`)
    values.push(data.status)
  }

  if (updates.length === 0) {
    return getBookingById(id)
  }

  // Add the ID as the last parameter
  values.push(id)

  const query = `
    UPDATE bookings 
    SET ${updates.join(", ")} 
    WHERE id = $${values.length} 
    RETURNING 
      id, 
      customer_name as "customerName", 
      email, 
      phone, 
      booking_date as "bookingDate", 
      booking_time as "bookingTime", 
      service,
      status, 
      notes,
      created_at as "createdAt"
  `

  const result = await sql.unsafe(query, values)

  return result.length > 0 ? result[0] : null
}

/**
 * Cancel a booking
 */
export async function cancelBooking(id: number): Promise<Booking | null> {
  return updateBooking(id, { status: "cancelled" })
}

/**
 * Get all bookings with optional filters
 */
export async function getBookings(
  filters: {
    startDate?: string
    endDate?: string
    status?: string
    email?: string
  } = {},
): Promise<Booking[]> {
  let query = sql`
    SELECT 
      id, 
      customer_name as "customerName", 
      email, 
      phone, 
      booking_date as "bookingDate", 
      booking_time as "bookingTime", 
      service,
      status, 
      notes,
      created_at as "createdAt"
    FROM bookings 
    WHERE 1=1
  `

  if (filters.startDate) {
    query = sql`${query} AND booking_date >= ${filters.startDate}`
  }

  if (filters.endDate) {
    query = sql`${query} AND booking_date <= ${filters.endDate}`
  }

  if (filters.status) {
    query = sql`${query} AND status = ${filters.status}`
  }

  if (filters.email) {
    query = sql`${query} AND email = ${filters.email}`
  }

  query = sql`${query} ORDER BY booking_date, booking_time`

  return await query
}

