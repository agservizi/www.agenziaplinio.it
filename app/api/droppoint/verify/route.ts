import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json({ error: "Codice di riferimento mancante" }, { status: 400 })
    }

    // Effettua la richiesta al sito DropPoint
    const response = await fetch(`https://www.drop-point.store/api/verify?q=${encodeURIComponent(reference)}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; VercelFetch/1.0)",
      },
    })

    if (!response.ok) {
      // Se la risposta non è ok, restituisci l'errore
      const errorText = await response.text()
      return NextResponse.json(
        {
          error: "Errore durante la verifica",
          details: errorText,
          status: response.status,
        },
        { status: response.status },
      )
    }

    // Estrai i dati dalla risposta
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Errore durante la verifica DropPoint:", error)
    return NextResponse.json(
      {
        error: "Si è verificato un errore durante la verifica",
        details: error instanceof Error ? error.message : "Errore sconosciuto",
      },
      { status: 500 },
    )
  }
}

