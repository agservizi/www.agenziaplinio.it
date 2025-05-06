import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get("email")

  if (!email) {
    return NextResponse.json(
      {
        error: "Il parametro 'email' è obbligatorio",
      },
      { status: 400 },
    )
  }

  try {
    // Statistiche per tipo di contratto
    const statsByType = await sql`
      SELECT 
        type, 
        COUNT(*) as count
      FROM contract_requests 
      WHERE user_email = ${email}
      GROUP BY type
      ORDER BY count DESC
    `

    // Statistiche per stato
    const statsByStatus = await sql`
      SELECT 
        status, 
        COUNT(*) as count
      FROM contract_requests 
      WHERE user_email = ${email}
      GROUP BY status
      ORDER BY count DESC
    `

    // Statistiche per mese
    const statsByMonth = await sql`
      SELECT 
        TO_CHAR(request_date, 'YYYY-MM') as month, 
        COUNT(*) as count
      FROM contract_requests 
      WHERE user_email = ${email}
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12
    `

    // Conteggio totale
    const totalCount = await sql`
      SELECT COUNT(*) as total
      FROM contract_requests 
      WHERE user_email = ${email}
    `

    // Contratto più recente
    const latestContract = await sql`
      SELECT 
        id, 
        type, 
        status, 
        request_date as "requestDate"
      FROM contract_requests 
      WHERE user_email = ${email}
      ORDER BY request_date DESC
      LIMIT 1
    `

    return NextResponse.json({
      total: totalCount[0].total,
      byType: statsByType,
      byStatus: statsByStatus,
      byMonth: statsByMonth,
      latest: latestContract[0] || null,
    })
  } catch (error) {
    console.error("Errore durante il recupero delle statistiche dei contratti:", error)
    return NextResponse.json(
      {
        error: "Errore durante il recupero delle statistiche dei contratti",
      },
      { status: 500 },
    )
  }
}
