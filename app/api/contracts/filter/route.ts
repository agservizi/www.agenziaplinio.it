import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get("email")
  const type = searchParams.get("type")
  const status = searchParams.get("status")
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")

  if (!email) {
    return NextResponse.json(
      {
        error: "Il parametro 'email' è obbligatorio",
      },
      { status: 400 },
    )
  }

  try {
    // Costruisci la query di base
    let query = `
      SELECT 
        id, 
        type, 
        status, 
        request_date as "requestDate", 
        user_email as "userEmail", 
        details
      FROM contract_requests 
      WHERE user_email = ${email}
    `

    const params: any[] = [email]
    let paramIndex = 2

    // Aggiungi filtri opzionali
    if (type) {
      query += ` AND type = $${paramIndex++}`
      params.push(type)
    }

    if (status) {
      query += ` AND status = $${paramIndex++}`
      params.push(status)
    }

    if (startDate) {
      query += ` AND request_date >= $${paramIndex++}`
      params.push(new Date(startDate))
    }

    if (endDate) {
      query += ` AND request_date <= $${paramIndex++}`
      params.push(new Date(endDate))
    }

    // Ordina per data di richiesta (più recente prima)
    query += ` ORDER BY request_date DESC`

    // Esegui la query
    const contracts = await sql.unsafe(query, params)

    return NextResponse.json(contracts)
  } catch (error) {
    console.error("Errore durante il recupero dei contratti filtrati:", error)
    return NextResponse.json(
      {
        error: "Errore durante il recupero dei contratti filtrati",
      },
      { status: 500 },
    )
  }
}
