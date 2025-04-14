import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { blockedDate, reason } = body

    if (!blockedDate) {
      return NextResponse.json({ error: "Missing required field: blockedDate" }, { status: 400 })
    }

    // Insert the blocked date
    const result = await sql`
      INSERT INTO blocked_dates (blocked_date, reason)
      VALUES (${blockedDate}, ${reason || null})
      RETURNING id, blocked_date as "blockedDate", reason
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error blocking date:", error)

    // Check for duplicate key error
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json({ error: "This date is already blocked" }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to block date" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    let query = sql`
      SELECT id, blocked_date as "blockedDate", reason
      FROM blocked_dates
    `

    if (startDate) {
      query = sql`${query} WHERE blocked_date >= ${startDate}`
    }

    if (endDate) {
      if (startDate) {
        query = sql`${query} AND blocked_date <= ${endDate}`
      } else {
        query = sql`${query} WHERE blocked_date <= ${endDate}`
      }
    }

    query = sql`${query} ORDER BY blocked_date`

    const blockedDates = await query

    return NextResponse.json(blockedDates)
  } catch (error) {
    console.error("Error fetching blocked dates:", error)
    return NextResponse.json({ error: "Failed to fetch blocked dates" }, { status: 500 })
  }
}

