import { NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET() {
  try {
    console.log("Initializing contract tables...")

    // Create contract_requests table if it doesn't exist
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
    console.log("contract_requests table created or already exists")

    // Insert a test record to verify the table exists and is working
    const testRecord = await sql`
      INSERT INTO contract_requests (type, status, user_email, details)
      VALUES ('test', 'pending', 'test@example.com', '{"test": true}')
      ON CONFLICT DO NOTHING
      RETURNING id;
    `
    console.log("Test record inserted:", testRecord)

    return NextResponse.json({
      success: true,
      message: "Contract tables initialized successfully",
      testRecord,
    })
  } catch (error) {
    console.error("Error initializing contract tables:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to initialize contract tables",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
