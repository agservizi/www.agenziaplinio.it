import { NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET() {
  try {
    // Statistiche per tipo di contratto
    const statsByType = await sql`
      SELECT 
        type, 
        COUNT(*) as count
      FROM contract_requests 
      GROUP BY type
      ORDER BY count DESC
    `

    // Statistiche per stato
    const statsByStatus = await sql`
      SELECT 
        status, 
        COUNT(*) as count
      FROM contract_requests 
      GROUP BY status
      ORDER BY count DESC
    `

    // Statistiche per mese
    const statsByMonth = await sql`
      SELECT 
        TO_CHAR(request_date, 'YYYY-MM') as month, 
        COUNT(*) as count
      FROM contract_requests 
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12
    `

    // Conteggio totale
    const totalCount = await sql`
      SELECT COUNT(*) as total
      FROM contract_requests
    `

    // Contratti più recenti
    const latestContracts = await sql`
      SELECT 
        id, 
        type, 
        status, 
        request_date as "requestDate",
        user_email as "userEmail"
      FROM contract_requests 
      ORDER BY request_date DESC
      LIMIT 5
    `

    // Statistiche per utente (top 10)
    const statsByUser = await sql`
      SELECT 
        user_email as "userEmail", 
        COUNT(*) as count
      FROM contract_requests 
      GROUP BY user_email
      ORDER BY count DESC
      LIMIT 10
    `

    return NextResponse.json({
      total: totalCount[0].total,
      byType: statsByType,
      byStatus: statsByStatus,
      byMonth: statsByMonth,
      byUser: statsByUser,
      latest: latestContracts,
    })
  } catch (error) {
    console.error("Errore durante il recupero delle statistiche admin dei contratti:", error)
    return NextResponse.json(
      {
        error: "Errore durante il recupero delle statistiche admin dei contratti",
      },
      { status: 500 },
    )
  }
}
