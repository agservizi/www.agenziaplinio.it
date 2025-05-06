import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const contract = await sql`
      SELECT 
        cr.id, 
        cr.type, 
        cr.status, 
        cr.request_date as "requestDate", 
        cr.user_email as "userEmail", 
        cr.details,
        cr.created_at as "createdAt",
        cr.updated_at as "updatedAt"
      FROM contract_requests cr
      WHERE cr.id = ${id}
    `

    if (contract.length === 0) {
      return NextResponse.json(
        {
          error: "Richiesta di contratto non trovata",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(contract[0])
  } catch (error) {
    console.error("Errore durante il recupero del contratto:", error)
    return NextResponse.json(
      {
        error: "Errore durante il recupero del contratto",
      },
      { status: 500 },
    )
  }
}

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

    // Aggiorna il contratto
    const result = await sql`
      UPDATE contract_requests 
      SET 
        status = ${body.status},
        details = COALESCE(${body.details || null}, details),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING 
        id, 
        type, 
        status, 
        request_date as "requestDate", 
        user_email as "userEmail", 
        details,
        updated_at as "updatedAt"
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
    console.error("Errore durante l'aggiornamento del contratto:", error)
    return NextResponse.json(
      {
        error: "Errore durante l'aggiornamento del contratto",
      },
      { status: 500 },
    )
  }
}
