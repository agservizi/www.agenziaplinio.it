/**
 * Get the day of the week from a date string (0 = Sunday, 1 = Monday, etc.)
 */
export function getDayOfWeek(dateString: string): number {
  const date = new Date(dateString)
  return date.getDay()
}

/**
 * Check if a date is in the past
 */
export function isDateInPast(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()

  // Reset time to midnight for comparison
  date.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  return date < today
}

/**
 * Check if a date and time are in the past
 */
export function isDateTimeInPast(dateString: string, timeString: string): boolean {
  const [hours, minutes] = timeString.split(":").map(Number)

  const dateTime = new Date(dateString)
  dateTime.setHours(hours, minutes, 0, 0)

  const now = new Date()

  return dateTime < now
}

/**
 * Format a date in Italian format (DD/MM/YYYY)
 */
export function formatDateItalian(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  const day = dateObj.getDate().toString().padStart(2, "0")
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0")
  const year = dateObj.getFullYear()

  return `${day}/${month}/${year}`
}

/**
 * Format a time in Italian format (HH:MM)
 */
export function formatTimeItalian(time: string): string {
  // If it's already in HH:MM format, return it
  if (/^\d{2}:\d{2}$/.test(time)) {
    return time
  }

  // If it's a Date object or ISO string, format it
  const timeObj = typeof time === "string" ? new Date(time) : time

  const hours = timeObj.getHours().toString().padStart(2, "0")
  const minutes = timeObj.getMinutes().toString().padStart(2, "0")

  return `${hours}:${minutes}`
}

/**
 * Format a date in Italian format with day name (es. Lunedì, 01/01/2023)
 */
export function formatDateWithDayItalian(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  const days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
  const dayName = days[dateObj.getDay()]

  const formattedDate = formatDateItalian(dateObj)

  return `${dayName}, ${formattedDate}`
}
