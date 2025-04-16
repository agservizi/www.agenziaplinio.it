import { NextResponse } from "next/server"

// Funzione per generare date disponibili (esempio)
// In un'implementazione reale, queste date verrebbero recuperate dal database
function generateAvailableDates() {
  const dates = []
  const today = new Date()

  // Genera date per i prossimi 30 giorni
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    // Escludiamo le domeniche (0 = domenica)
    if (date.getDay() !== 0) {
      // Formato ISO per le date (YYYY-MM-DD)
      dates.push(date.toISOString().split("T")[0])
    }
  }

  return dates
}

export async function GET() {
  try {
    // In un'implementazione reale, recupereresti le date disponibili dal database
    const availableDates = generateAvailableDates()

    return NextResponse.json({ availableDates })
  } catch (error) {
    console.error("Errore nel recupero delle date disponibili:", error)
    return NextResponse.json({ error: "Errore nel recupero delle date disponibili" }, { status: 500 })
  }
}
