import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

// GET - Ottieni tutte le richieste di visure
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tipo = searchParams.get("tipo")
    const stato = searchParams.get("stato")

    let query = `
      SELECT * FROM visure_requests 
      WHERE 1=1
    `

    const params: any[] = []

    if (tipo) {
      query += ` AND tipo_visura = $${params.length + 1}`
      params.push(tipo)
    }

    if (stato) {
      query += ` AND stato = $${params.length + 1}`
      params.push(stato)
    }

    query += ` ORDER BY data_richiesta DESC`

    const result = await sql.unsafe(query, params)

    return NextResponse.json({ success: true, data: result.rows })
  } catch (error) {
    console.error("Errore durante il recupero delle richieste di visure:", error)
    return NextResponse.json(
      { success: false, message: "Errore durante il recupero delle richieste", error: String(error) },
      { status: 500 },
    )
  }
}

// POST - Crea una nuova richiesta di visura
export async function POST(request: NextRequest) {
  try {
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
      note,
      documento_identita,
    } = body

    const result = await sql`
      INSERT INTO visure_requests (
        tipo_visura, 
        sottotipo, 
        nome_richiedente, 
        email, 
        telefono, 
        codice_fiscale, 
        partita_iva, 
        dati_richiesta, 
        note, 
        documento_identita
      ) 
      VALUES (
        ${tipo_visura}, 
        ${sottotipo}, 
        ${nome_richiedente}, 
        ${email}, 
        ${telefono}, 
        ${codice_fiscale}, 
        ${partita_iva}, 
        ${dati_richiesta}, 
        ${note}, 
        ${documento_identita}
      )
      RETURNING *
    `

    return NextResponse.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error("Errore durante la creazione della richiesta di visura:", error)
    return NextResponse.json(
      { success: false, message: "Errore durante la creazione della richiesta", error: String(error) },
      { status: 500 },
    )
  }
}
