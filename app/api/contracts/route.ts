import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get("email")

  if (!email) {
    return NextResponse.json({ error: "Email parameter is required" }, { status: 400 })
  }

  try {
    // Verifica se la tabella esiste
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'contract_requests'
      );
    `

    if (!tableExists[0].exists) {
      console.error("Table contract_requests does not exist")
      return NextResponse.json(
        {
          error: "Table contract_requests does not exist. Please initialize the database first.",
          contracts: [],
        },
        { status: 404 },
      )
    }

    const contracts = await sql`
      SELECT 
        id, 
        type, 
        status, 
        request_date as "requestDate", 
        user_email as "userEmail", 
        details
      FROM contract_requests 
      WHERE user_email = ${email}
      ORDER BY request_date DESC
    `

    return NextResponse.json(contracts)
  } catch (error) {
    console.error("Error fetching contracts:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch contracts",
        details: error instanceof Error ? error.message : String(error),
        contracts: [],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.type || !body.userEmail || !body.details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert the contract request
    const result = await sql`
      INSERT INTO contract_requests (
        type, 
        status, 
        request_date, 
        user_email, 
        details
      ) 
      VALUES (
        ${body.type}, 
        ${body.status || "pending"}, 
        ${body.requestDate || new Date().toISOString()}, 
        ${body.userEmail}, 
        ${body.details}
      ) 
      RETURNING 
        id, 
        type, 
        status, 
        request_date as "requestDate", 
        user_email as "userEmail", 
        details
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating contract request:", error)
    return NextResponse.json(
      {
        error: "Failed to create contract request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
