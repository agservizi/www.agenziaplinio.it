import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

// GET - Ottieni una richiesta di visura specifica
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const result = await sql`
      SELECT * FROM visure_requests WHERE id = ${id}
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Richiesta di visura non trovata" }, { status: 404 })
    }

    // Ottieni anche i documenti associati
    const documents = await sql`
      SELECT * FROM visure_documents WHERE visura_id = ${id}
    `

    return NextResponse.json({
      success: true,
      data: {
        ...result.rows[0],
        documents: documents.rows,
      },
    })
  } catch (error) {
    console.error("Errore durante il recupero della richiesta di visura:", error)
    return NextResponse.json(
      { success: false, message: "Errore durante il recupero della richiesta", error: String(error) },
      { status: 500 },
    )
  }
}

// PUT - Aggiorna una richiesta di visura
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    const {
      tipo_visura,
      sottotipo,
      nome_richiedente,
      email,
      telefono,
      codice_fiscale,
      partita_iva,
      dati_richiesta,
      stato,
      note,
      documento_identita,
      data_completamento,
    } = body

    const result = await sql`
      UPDATE visure_requests 
      SET 
        tipo_visura = COALESCE(${tipo_visura}, tipo_visura),
        sottotipo = COALESCE(${sottotipo}, sottotipo),
        nome_richiedente = COALESCE(${nome_richiedente}, nome_richiedente),
        email = COALESCE(${email}, email),
        telefono = COALESCE(${telefono}, telefono),
        codice_fiscale = COALESCE(${codice_fiscale}, codice_fiscale),
        partita_iva = COALESCE(${partita_iva}, partita_iva),
        dati_richiesta = COALESCE(${dati_richiesta}, dati_richiesta),
        stato = COALESCE(${stato}, stato),
        note = COALESCE(${note}, note),
        documento_identita = COALESCE(${documento_identita}, documento_identita),
        data_completamento = COALESCE(${data_completamento}, data_completamento)
      WHERE id = ${id}
      RETURNING *
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Richiesta di visura non trovata" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error("Errore durante l'aggiornamento della richiesta di visura:", error)
    return NextResponse.json(
      { success: false, message: "Errore durante l'aggiornamento della richiesta", error: String(error) },
      { status: 500 },
    )
  }
}

// DELETE - Elimina una richiesta di visura
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Elimina prima i documenti associati
    await sql`
      DELETE FROM visure_documents WHERE visura_id = ${id}
    `

    const result = await sql`
      DELETE FROM visure_requests WHERE id = ${id} RETURNING *
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Richiesta di visura non trovata" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error("Errore durante l'eliminazione della richiesta di visura:", error)
    return NextResponse.json(
      { success: false, message: "Errore durante l'eliminazione della richiesta", error: String(error) },
      { status: 500 },
    )
  }
}
