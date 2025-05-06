import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const body = await request.json()

    // Validazione dei campi obbligatori
    if (!body.assignedTo) {
      return NextResponse.json(
        {
          error: "Il campo 'assignedTo' è obbligatorio",
        },
        { status: 400 },
      )
    }

    // Aggiorna il contratto con l'assegnazione
    const currentDetails = await sql`
      SELECT details FROM contract_requests WHERE id = ${id}
    `

    if (currentDetails.length === 0) {
      return NextResponse.json(
        {
          error: "Richiesta di contratto non trovata",
        },
        { status: 404 },
      )
    }

    const details = currentDetails[0].details || {}

    // Aggiorna i dettagli con l'assegnazione
    const updatedDetails = {
      ...details,
      assignment: {
        assignedTo: body.assignedTo,
        assignedBy: body.assignedBy || "Admin",
        assignedAt: new Date().toISOString(),
        notes: body.notes || "",
      },
    }

    // Aggiorna il contratto
    const result = await sql`
      UPDATE contract_requests 
      SET 
        details = ${updatedDetails},
        status = CASE WHEN status = 'pending' THEN 'in_progress' ELSE status END,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING 
        id, 
        status,
        details
    `

    return NextResponse.json({
      success: true,
      id: result[0].id,
      status: result[0].status,
      assignment: result[0].details.assignment,
    })
  } catch (error) {
    console.error("Errore durante l'assegnazione del contratto:", error)
    return NextResponse.json(
      {
        error: "Errore durante l'assegnazione del contratto",
      },
      { status: 500 },
    )
  }
}
