import { NextResponse } from "next/server"

// Funzione per generare orari disponibili (esempio)
// In un'implementazione reale, questi orari verrebbero recuperati dal database
function generateAvailableTimeSlots(date: string) {
  // Orari di base per tutti i giorni
  const baseTimeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  // Esempio: il sabato abbiamo solo orari mattutini
  const dateObj = new Date(date)
  if (dateObj.getDay() === 6) {
    // 6 = sabato
    return baseTimeSlots.filter((slot) => {
      const hour = Number.parseInt(slot.split(":")[0])
      return hour < 13 // Solo orari prima delle 13:00
    })
  }

  return baseTimeSlots
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")

    if (!date) {
      return NextResponse.json({ error: "Data non specificata" }, { status: 400 })
    }

    // In un'implementazione reale, recupereresti gli orari disponibili dal database
    const availableTimeSlots = generateAvailableTimeSlots(date)

    return NextResponse.json({ availableTimeSlots })
  } catch (error) {
    console.error("Errore nel recupero degli orari disponibili:", error)
    return NextResponse.json({ error: "Errore nel recupero degli orari disponibili" }, { status: 500 })
  }
}
