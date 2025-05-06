import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const body = await request.json()

    // Validazione dei campi obbligatori
    if (!body.status) {
      return NextResponse.json(
        {
          error: "Il campo 'status' è obbligatorio",
        },
        { status: 400 },
      )
    }

    // Valida che lo stato sia uno dei valori consentiti
    const validStatuses = ["pending", "approved", "rejected", "completed", "cancelled"]
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        {
          error: "Stato non valido. Gli stati consentiti sono: pending, approved, rejected, completed, cancelled",
        },
        { status: 400 },
      )
    }

    // Aggiorna lo stato del contratto
    const result = await sql`
      UPDATE contract_requests 
      SET 
        status = ${body.status},
        updated_at = CURRENT_TIMESTAMP
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
      return NextResponse.json(
        {
          error: "Richiesta di contratto non trovata",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Errore durante l'aggiornamento dello stato del contratto:", error)
    return NextResponse.json(
      {
        error: "Errore durante l'aggiornamento dello stato del contratto",
      },
      { status: 500 },
    )
  }
}
