import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dayOfWeek, startTime, endTime, isAvailable, maxBookings } = body

    // Validate required fields
    if (dayOfWeek === undefined || !startTime || !endTime) {
      return NextResponse.json({ error: "Missing required fields: dayOfWeek, startTime, endTime" }, { status: 400 })
    }

    // Validate dayOfWeek (0-6)
    if (dayOfWeek < 0 || dayOfWeek > 6) {
      return NextResponse.json({ error: "dayOfWeek must be between 0 and 6" }, { status: 400 })
    }

    // Insert the time slot
    const result = await sql`
      INSERT INTO time_slots (
        day_of_week, 
        start_time, 
        end_time, 
        is_available, 
        max_bookings
      )
      VALUES (
        ${dayOfWeek}, 
        ${startTime}, 
        ${endTime}, 
        ${isAvailable !== undefined ? isAvailable : true}, 
        ${maxBookings || 1}
      )
      RETURNING 
        id, 
        day_of_week as "dayOfWeek", 
        start_time as "startTime", 
        end_time as "endTime", 
        is_available as "isAvailable", 
        max_bookings as "maxBookings"
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating time slot:", error)
    return NextResponse.json({ error: "Failed to create time slot" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const dayOfWeek = searchParams.get("dayOfWeek")

    let query = sql`
      SELECT 
        id, 
        day_of_week as "dayOfWeek", 
        start_time as "startTime", 
        end_time as "endTime", 
        is_available as "isAvailable", 
        max_bookings as "maxBookings"
      FROM time_slots
    `

    if (dayOfWeek !== null) {
      query = sql`${query} WHERE day_of_week = ${Number.parseInt(dayOfWeek)}`
    }

    query = sql`${query} ORDER BY day_of_week, start_time`

    const timeSlots = await query

    return NextResponse.json(timeSlots)
  } catch (error) {
    console.error("Error fetching time slots:", error)
    return NextResponse.json({ error: "Failed to fetch time slots" }, { status: 500 })
  }
}

