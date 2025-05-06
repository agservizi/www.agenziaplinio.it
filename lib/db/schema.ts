import { sql } from "@/lib/db"

export async function createSchema() {
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
      day_of_week INTEGER NOT NULL, -- 0 for Sunday, 1 for Monday, etc.
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
      status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled
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

  // Create contract_requests table
  await sql`
    CREATE TABLE IF NOT EXISTS contract_requests (
      id SERIAL PRIMARY KEY,
      type VARCHAR(50) NOT NULL, -- telefonia, luce, gas
      status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, completed
      request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_email VARCHAR(255) NOT NULL,
      details JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  console.log("Schema created successfully")
}
