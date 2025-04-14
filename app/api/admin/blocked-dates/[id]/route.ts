import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid blocked date ID" }, { status: 400 })
    }

    const result = await sql`
      DELETE FROM blocked_dates
      WHERE id = ${id}
      RETURNING id, blocked_date as "blockedDate", reason
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Blocked date not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Blocked date removed successfully",
      blockedDate: result[0],
    })
  } catch (error) {
    console.error("Error removing blocked date:", error)
    return NextResponse.json({ error: "Failed to remove blocked date" }, { status: 500 })
  }
}

