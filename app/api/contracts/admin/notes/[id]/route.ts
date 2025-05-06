import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const body = await request.json()

    // Validazione dei campi obbligatori
    if (!body.note) {
      return NextResponse.json(
        {
          error: "Il campo 'note' è obbligatorio",
        },
        { status: 400 },
      )
    }

    // Recupera il contratto
    const contract = await sql`
      SELECT details FROM contract_requests WHERE id = ${id}
    `

    if (contract.length === 0) {
      return NextResponse.json(
        {
          error: "Richiesta di contratto non trovata",
        },
        { status: 404 },
      )
    }

    // Prepara i dettagli aggiornati con la nuova nota
    const currentDetails = contract[0].details || {}
    const notes = currentDetails.notes || []

    notes.push({
      text: body.note,
      author: body.author || "Admin",
      timestamp: new Date().toISOString(),
    })

    const updatedDetails = {
      ...currentDetails,
      notes,
    }

    // Aggiorna i dettagli del contratto
    const result = await sql`
      UPDATE contract_requests 
      SET 
        details = ${updatedDetails},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING 
        id, 
        details
    `

    return NextResponse.json({
      success: true,
      id: result[0].id,
      notes: result[0].details.notes,
    })
  } catch (error) {
    console.error("Errore durante l'aggiunta della nota:", error)
    return NextResponse.json(
      {
        error: "Errore durante l'aggiunta della nota",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const contract = await sql`
      SELECT details FROM contract_requests WHERE id = ${id}
    `

    if (contract.length === 0) {
      return NextResponse.json(
        {
          error: "Richiesta di contratto non trovata",
        },
        { status: 404 },
      )
    }

    const notes = contract[0].details?.notes || []

    return NextResponse.json(notes)
  } catch (error) {
    console.error("Errore durante il recupero delle note:", error)
    return NextResponse.json(
      {
        error: "Errore durante il recupero delle note",
      },
      { status: 500 },
    )
  }
}
