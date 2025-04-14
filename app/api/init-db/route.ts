import { NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    // Create time_slots table
    await sql`
      CREATE TABLE IF NOT EXISTS time_slots (
        id SERIAL PRIMARY KEY,
        day_of_week INTEGER NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        is_available BOOLEAN DEFAULT true,
        max_bookings INTEGER DEFAULT 1
      );
    `

    // Create bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        booking_date DATE NOT NULL,
        booking_time TIME NOT NULL,
        service VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    // Create blocked_dates table
    await sql`
      CREATE TABLE IF NOT EXISTS blocked_dates (
        id SERIAL PRIMARY KEY,
        blocked_date DATE NOT NULL UNIQUE,
        reason TEXT
      );
    `

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

    return NextResponse.json({ success: true, message: "Database initialized successfully" })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json({ success: false, error: "Failed to initialize database" }, { status: 500 })
  }
}

