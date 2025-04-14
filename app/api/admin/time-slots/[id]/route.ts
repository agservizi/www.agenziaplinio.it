import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid time slot ID" }, { status: 400 })
    }

    const body = await request.json()
    const { dayOfWeek, startTime, endTime, isAvailable, maxBookings } = body

    // Build the update query dynamically based on provided fields
    const updates: any[] = []
    const values: any[] = []

    if (dayOfWeek !== undefined) {
      // Validate dayOfWeek (0-6)
      if (dayOfWeek < 0 || dayOfWeek > 6) {
        return NextResponse.json({ error: "dayOfWeek must be between 0 and 6" }, { status: 400 })
      }

      updates.push("day_of_week = $1")
      values.push(dayOfWeek)
    }

    if (startTime) {
      updates.push(`start_time = $${values.length + 1}`)
      values.push(startTime)
    }

    if (endTime) {
      updates.push(`end_time = $${values.length + 1}`)
      values.push(endTime)
    }

    if (isAvailable !== undefined) {
      updates.push(`is_available = $${values.length + 1}`)
      values.push(isAvailable)
    }

    if (maxBookings !== undefined) {
      updates.push(`max_bookings = $${values.length + 1}`)
      values.push(maxBookings)
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }

    // Add the ID as the last parameter
    values.push(id)

    const query = `
      UPDATE time_slots 
      SET ${updates.join(", ")} 
      WHERE id = $${values.length} 
      RETURNING 
        id, 
        day_of_week as "dayOfWeek", 
        start_time as "startTime", 
        end_time as "endTime", 
        is_available as "isAvailable", 
        max_bookings as "maxBookings"
    `

    const result = await sql.unsafe(query, values)

    if (result.length === 0) {
      return NextResponse.json({ error: "Time slot not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating time slot:", error)
    return NextResponse.json({ error: "Failed to update time slot" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid time slot ID" }, { status: 400 })
    }

    const result = await sql`
      DELETE FROM time_slots
      WHERE id = ${id}
      RETURNING 
        id, 
        day_of_week as "dayOfWeek", 
        start_time as "startTime", 
        end_time as "endTime", 
        is_available as "isAvailable", 
        max_bookings as "maxBookings"
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Time slot not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Time slot deleted successfully",
      timeSlot: result[0],
    })
  } catch (error) {
    console.error("Error deleting time slot:", error)
    return NextResponse.json({ error: "Failed to delete time slot" }, { status: 500 })
  }
}
