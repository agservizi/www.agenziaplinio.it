import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const contract = await sql`
      SELECT 
        id, 
        type, 
        status, 
        request_date as "requestDate", 
        user_email as "userEmail", 
        details
      FROM contract_requests 
      WHERE id = ${id}
    `

    if (contract.length === 0) {
      return NextResponse.json({ error: "Contract request not found" }, { status: 404 })
    }

    return NextResponse.json(contract[0])
  } catch (error) {
    console.error("Error fetching contract:", error)
    return NextResponse.json({ error: "Failed to fetch contract" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const body = await request.json()

    // Validate required fields
    if (!body.type || !body.userEmail || !body.details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update the contract request
    const result = await sql`
      UPDATE contract_requests 
      SET 
        type = ${body.type},
        status = ${body.status || "pending"},
        details = ${body.details}
      WHERE id = ${id}
      RETURNING 
        id, 
        type, 
        status, 
        request_date as "requestDate", 
        user_email as "userEmail", 
        details
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Contract request not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating contract:", error)
    return NextResponse.json({ error: "Failed to update contract" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const result = await sql`
      DELETE FROM contract_requests 
      WHERE id = ${id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Contract request not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, id: result[0].id })
  } catch (error) {
    console.error("Error deleting contract:", error)
    return NextResponse.json({ error: "Failed to delete contract" }, { status: 500 })
  }
}
