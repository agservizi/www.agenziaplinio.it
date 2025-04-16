import { NextResponse } from "next/server"
import { testCallmebotConnection } from "@/lib/whatsapp-callmebot-service"

export async function GET() {
  try {
    console.log("Inizio test diretto WhatsApp")

    // Esegui il test di connessione a Callmebot
    const result = await testCallmebotConnection()

    console.log("Risultato test:", result)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Errore durante il test diretto:", error)
    return NextResponse.json(
      {
        success: false,
        message: `Errore durante il test diretto: ${error instanceof Error ? error.message : "Errore sconosciuto"}`,
      },
      { status: 500 },
    )
  }
}
