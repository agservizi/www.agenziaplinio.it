import { NextResponse } from "next/server"
import { createSchema } from "@/lib/db/schema"

export async function GET() {
  try {
    await createSchema()
    return NextResponse.json({ success: true, message: "Database initialized successfully" })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json({ success: false, error: "Failed to initialize database" }, { status: 500 })
  }
}
