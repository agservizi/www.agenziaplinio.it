import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    // Statistiche per tipo di visura
    const statsByType = await sql`
      SELECT tipo_visura, COUNT(*) as count 
      FROM visure_requests 
      GROUP BY tipo_visura
    `

    // Statistiche per stato
    const statsByStatus = await sql`
      SELECT stato, COUNT(*) as count 
      FROM visure_requests 
      GROUP BY stato
    `

    // Statistiche per mese
    const statsByMonth = await sql`
      SELECT 
        EXTRACT(YEAR FROM data_richiesta) as year,
        EXTRACT(MONTH FROM data_richiesta) as month,
        COUNT(*) as count 
      FROM visure_requests 
      GROUP BY year, month
      ORDER BY year DESC, month DESC
      LIMIT 12
    `

    // Tempo medio di completamento (in ore)
    const avgCompletionTime = await sql`
      SELECT AVG(EXTRACT(EPOCH FROM (data_completamento - data_richiesta)) / 3600) as avg_hours
      FROM visure_requests
      WHERE data_completamento IS NOT NULL
    `

    return NextResponse.json({
      success: true,
      data: {
        byType: statsByType.rows,
        byStatus: statsByStatus.rows,
        byMonth: statsByMonth.rows,
        avgCompletionTime: avgCompletionTime.rows[0]?.avg_hours || 0,
      },
    })
  } catch (error) {
    console.error("Errore durante il recupero delle statistiche:", error)
    return NextResponse.json(
      { success: false, message: "Errore durante il recupero delle statistiche", error: String(error) },
      { status: 500 },
    )
  }
}
