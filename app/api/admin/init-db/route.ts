import { type NextRequest, NextResponse } from "next/server"
import { createSchema } from "@/lib/db/schema"
import sql from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Create schema
    await createSchema()

    // Create cancellation_tokens table
    await sql`
      CREATE TABLE IF NOT EXISTS cancellation_tokens (
        id SERIAL PRIMARY KEY,
        booking_id INTEGER NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
        token_hash VARCHAR(255) NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    // Insert default time slots for weekdays (Monday to Friday)
    for (let dayOfWeek = 1; dayOfWeek <= 5; dayOfWeek++) {
      // Morning slots
      await sql`
        INSERT INTO time_slots (day_of_week, start_time, end_time, is_available, max_bookings)
        VALUES 
          (${dayOfWeek}, '09:00', '10:00', true, 2),
          (${dayOfWeek}, '10:00', '11:00', true, 2),
          (${dayOfWeek}, '11:00', '12:00', true, 2),
          (${dayOfWeek}, '12:00', '13:00', true, 2)
        ON CONFLICT DO NOTHING;
      `

      // Afternoon slots
      await sql`
        INSERT INTO time_slots (day_of_week, start_time, end_time, is_available, max_bookings)
        VALUES 
          (${dayOfWeek}, '15:00', '16:00', true, 2),
          (${dayOfWeek}, '16:00', '17:00', true, 2),
          (${dayOfWeek}, '17:00', '18:00', true, 2),
          (${dayOfWeek}, '18:00', '19:00', true, 2)
        ON CONFLICT DO NOTHING;
      `
    }

    // Insert default time slots for Saturday (day 6)
    await sql`
      INSERT INTO time_slots (day_of_week, start_time, end_time, is_available, max_bookings)
      VALUES 
        (6, '09:00', '10:00', true, 2),
        (6, '10:00', '11:00', true, 2),
        (6, '11:00', '12:00', true, 2),
        (6, '12:00', '13:00', true, 2)
      ON CONFLICT DO NOTHING;
    `

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
    })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to initialize database",
      },
      { status: 500 },
    )
  }
}

