import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Get total bookings
    const totalBookings = await sql`
      SELECT COUNT(*) as count FROM bookings
    `

    // Get bookings by status
    const bookingsByStatus = await sql`
      SELECT status, COUNT(*) as count 
      FROM bookings 
      GROUP BY status
    `

    // Get bookings for the current month
    const currentMonthBookings = await sql`
      SELECT COUNT(*) as count 
      FROM bookings 
      WHERE booking_date >= DATE_TRUNC('month', CURRENT_DATE)
      AND booking_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    `

    // Get bookings for the previous month
    const previousMonthBookings = await sql`
      SELECT COUNT(*) as count 
      FROM bookings 
      WHERE booking_date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
      AND booking_date < DATE_TRUNC('month', CURRENT_DATE)
    `

    // Get bookings by day of week
    const bookingsByDayOfWeek = await sql`
      SELECT EXTRACT(DOW FROM booking_date) as day_of_week, COUNT(*) as count 
      FROM bookings 
      GROUP BY day_of_week 
      ORDER BY day_of_week
    `

    // Get cancellation rate
    const cancellationRate = await sql`
      SELECT 
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END)::float / COUNT(*)::float * 100 as rate
      FROM bookings
    `

    return NextResponse.json({
      totalBookings: Number.parseInt(totalBookings[0].count),
      bookingsByStatus: bookingsByStatus.map((item) => ({
        status: item.status,
        count: Number.parseInt(item.count),
      })),
      currentMonthBookings: Number.parseInt(currentMonthBookings[0].count),
      previousMonthBookings: Number.parseInt(previousMonthBookings[0].count),
      bookingsByDayOfWeek: bookingsByDayOfWeek.map((item) => ({
        dayOfWeek: Number.parseInt(item.day_of_week),
        count: Number.parseInt(item.count),
      })),
      cancellationRate: Number.parseFloat(cancellationRate[0].rate),
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}

