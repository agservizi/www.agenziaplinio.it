import { type NextRequest, NextResponse } from "next/server"
import {
  getAvailabilityForDate,
  getAvailabilityForDateRange,
  getSimplifiedAvailabilityForDateRange,
  getAvailabilityForCurrentWeek,
} from "@/lib/availability-service"
import sql from "@/lib/db"

// Helper function to check if tables exist
async function checkTablesExist() {
  try {
    // Check if the blocked_dates table exists
    const result = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'blocked_dates'
      );
    `
    return result[0].exists
  } catch (error) {
    console.error("Error checking tables:", error)
    return false
  }
}

// Implementazione di un semplice rate limiter
const RATE_LIMIT_WINDOW = 60000 // 1 minuto in millisecondi
const MAX_REQUESTS_PER_WINDOW = 60 // Massimo numero di richieste per finestra
const requestCounts = new Map<string, { count: number; timestamp: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const requestData = requestCounts.get(ip)

  if (!requestData) {
    requestCounts.set(ip, { count: 1, timestamp: now })
    return false
  }

  // Se la finestra è scaduta, resetta il contatore
  if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now })
    return false
  }

  // Incrementa il contatore e controlla se supera il limite
  requestData.count++
  requestCounts.set(ip, requestData)

  return requestData.count > MAX_REQUESTS_PER_WINDOW
}

export async function GET(request: NextRequest) {
  try {
    // Ottieni l'IP del client
    const ip = request.headers.get("x-forwarded-for") || "unknown"

    // Controlla il rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "Too many requests",
          message: "Please try again later",
          timeSlots: [],
        },
        { status: 429 },
      )
    }

    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get("date")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const simplified = searchParams.get("simplified") === "true"
    const currentWeek = searchParams.get("currentWeek") === "true"

    // Check if tables exist
    const tablesExist = await checkTablesExist()

    if (!tablesExist) {
      return NextResponse.json({
        error: "Database not initialized",
        message: "Please initialize the database by visiting /api/init-db",
        timeSlots: [],
      })
    }

    // If currentWeek is requested, get availability for the current week
    if (currentWeek) {
      try {
        const availability = await getAvailabilityForCurrentWeek()
        return NextResponse.json(availability)
      } catch (error) {
        console.error("Error getting availability for current week:", error)
        return NextResponse.json([])
      }
    }

    // If date is provided, get availability for that specific date
    if (date) {
      try {
        const availability = await getAvailabilityForDate(date)
        return NextResponse.json(availability)
      } catch (error) {
        console.error("Error getting availability for date:", error)
        // Return a fallback response with empty time slots
        return NextResponse.json({
          date,
          available: false,
          timeSlots: [],
          error: "Failed to fetch availability",
        })
      }
    }

    // If startDate and endDate are provided, get availability for the date range
    if (startDate && endDate) {
      try {
        if (simplified) {
          const availability = await getSimplifiedAvailabilityForDateRange(startDate, endDate)
          return NextResponse.json(availability)
        } else {
          const availability = await getAvailabilityForDateRange(startDate, endDate)
          return NextResponse.json(availability)
        }
      } catch (error) {
        console.error("Error getting availability for date range:", error)
        // Return a fallback response with empty array
        return NextResponse.json([])
      }
    }

    // If no parameters are provided, return an error
    return NextResponse.json({
      error: "Missing required parameters: date or startDate and endDate or currentWeek",
      timeSlots: [],
    })
  } catch (error) {
    console.error("Error in availability route:", error)

    // Ensure we always return a valid JSON response
    return NextResponse.json({
      error: "Failed to fetch availability",
      message: error instanceof Error ? error.message : "Unknown error",
      timeSlots: [],
    })
  }
}

