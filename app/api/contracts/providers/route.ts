import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type")

  try {
    let providers

    if (type) {
      // Filtra per tipo se specificato
      providers = await sql`
        SELECT 
          id, 
          type, 
          name, 
          logo_url as "logoUrl", 
          details, 
          is_active as "isActive"
        FROM contract_providers 
        WHERE type = ${type} AND is_active = true
        ORDER BY name ASC
      `
    } else {
      // Altrimenti restituisci tutti i fornitori attivi
      providers = await sql`
        SELECT 
          id, 
          type, 
          name, 
          logo_url as "logoUrl", 
          details, 
          is_active as "isActive"
        FROM contract_providers 
        WHERE is_active = true
        ORDER BY type ASC, name ASC
      `
    }

    return NextResponse.json(providers)
  } catch (error) {
    console.error("Errore durante il recupero dei fornitori:", error)
    return NextResponse.json(
      {
        error: "Errore durante il recupero dei fornitori",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
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

    // Inserisci il nuovo fornitore
    const result = await sql`
      INSERT INTO contract_providers (
        type, 
        name, 
        logo_url, 
        details, 
        is_active
      ) 
      VALUES (
        ${body.type}, 
        ${body.name}, 
        ${body.logoUrl || null}, 
        ${body.details || null}, 
        ${body.isActive !== undefined ? body.isActive : true}
      ) 
      RETURNING 
        id, 
        type, 
        name, 
        logo_url as "logoUrl", 
        details, 
        is_active as "isActive"
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Errore durante la creazione del fornitore:", error)
    return NextResponse.json(
      {
        error: "Errore durante la creazione del fornitore",
      },
      { status: 500 },
    )
  }
}
