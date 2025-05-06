import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type")
  const status = searchParams.get("status")
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const offset = (page - 1) * limit

  try {
    // Costruisci la query di base
    let whereClause = ""
    const params: any[] = []
    let paramIndex = 1

    // Aggiungi filtri opzionali
    if (type) {
      whereClause += whereClause ? " AND " : " WHERE "
      whereClause += `type = $${paramIndex++}`
      params.push(type)
    }

    if (status) {
      whereClause += whereClause ? " AND " : " WHERE "
      whereClause += `status = $${paramIndex++}`
      params.push(status)
    }

    if (startDate) {
      whereClause += whereClause ? " AND " : " WHERE "
      whereClause += `request_date >= $${paramIndex++}`
      params.push(new Date(startDate))
    }

    if (endDate) {
      whereClause += whereClause ? " AND " : " WHERE "
      whereClause += `request_date <= $${paramIndex++}`
      params.push(new Date(endDate))
    }

    // Query per il conteggio totale
    const countQuery = `
      SELECT COUNT(*) as total
      FROM contract_requests
      ${whereClause}
    `

    // Query per i dati paginati
    const dataQuery = `
      SELECT 
        id, 
        type, 
        status, 
        request_date as "requestDate", 
        user_email as "userEmail", 
        details
      FROM contract_requests
      ${whereClause}
      ORDER BY request_date DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    // Esegui le query
    const totalResult = await sql.unsafe(countQuery, params)
    const contracts = await sql.unsafe(dataQuery, params)

    return NextResponse.json({
      data: contracts,
      pagination: {
        total: totalResult[0].total,
        page,
        limit,
        pages: Math.ceil(totalResult[0].total / limit),
      },
    })
  } catch (error) {
    console.error("Errore durante il recupero dei contratti per l'admin:", error)
    return NextResponse.json(
      {
        error: "Errore durante il recupero dei contratti per l'admin",
      },
      { status: 500 },
    )
  }
}
