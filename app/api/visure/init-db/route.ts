import { NextResponse } from "next/server"
import { createVisureSchema } from "@/lib/db/schema-visure"

export async function GET() {
  try {
    await createVisureSchema()
    return NextResponse.json({ success: true, message: "Database visure inizializzato con successo" })
  } catch (error) {
    console.error("Errore durante l'inizializzazione del database visure:", error)
    return NextResponse.json(
      { success: false, message: "Errore durante l'inizializzazione del database", error: String(error) },
      { status: 500 },
    )
  }
}
