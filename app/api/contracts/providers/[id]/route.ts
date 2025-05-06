import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const provider = await sql`
      SELECT 
        id, 
        type, 
        name, 
        logo_url as "logoUrl", 
        details, 
        is_active as "isActive"
      FROM contract_providers 
      WHERE id = ${id}
    `

    if (provider.length === 0) {
      return NextResponse.json(
        {
          error: "Fornitore non trovato",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(provider[0])
  } catch (error) {
    console.error("Errore durante il recupero del fornitore:", error)
    return NextResponse.json(
      {
        error: "Errore durante il recupero del fornitore",
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
    if (!body.type || !body.name) {
      return NextResponse.json(
        {
          error: "I campi 'type' e 'name' sono obbligatori",
        },
        { status: 400 },
      )
    }

    // Aggiorna il fornitore
    const result = await sql`
      UPDATE contract_providers 
      SET 
        type = ${body.type},
        name = ${body.name},
        logo_url = ${body.logoUrl || null},
        details = ${body.details || null},
        is_active = ${body.isActive !== undefined ? body.isActive : true},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING 
        id, 
        type, 
        name, 
        logo_url as "logoUrl", 
        details, 
        is_active as "isActive"
    `

    if (result.length === 0) {
      return NextResponse.json(
        {
          error: "Fornitore non trovato",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Errore durante l'aggiornamento del fornitore:", error)
    return NextResponse.json(
      {
        error: "Errore durante l'aggiornamento del fornitore",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const result = await sql`
      DELETE FROM contract_providers 
      WHERE id = ${id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json(
        {
          error: "Fornitore non trovato",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      id: result[0].id,
    })
  } catch (error) {
    console.error("Errore durante l'eliminazione del fornitore:", error)
    return NextResponse.json(
      {
        error: "Errore durante l'eliminazione del fornitore",
      },
      { status: 500 },
    )
  }
}
