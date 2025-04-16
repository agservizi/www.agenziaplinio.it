import { type NextRequest, NextResponse } from "next/server"
import { generateBookingPDF } from "@/lib/pdf-service"

export async function GET(request: NextRequest) {
  try {
    // Ottieni i parametri dalla query string
    const searchParams = request.nextUrl.searchParams
    const bookingCode = searchParams.get("code")
    const customerName = searchParams.get("name")
    const bookingDate = searchParams.get("date")
    const bookingTime = searchParams.get("time")
    const service = searchParams.get("service")

    // Verifica che tutti i parametri necessari siano presenti
    if (!bookingCode || !customerName || !bookingDate || !bookingTime || !service) {
      return NextResponse.json({ error: "Parametri mancanti per la generazione del PDF" }, { status: 400 })
    }

    // URL del logo da Vercel Blob
    const logoUrl = "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/logo-J1a5B8fGqtyHQ5NWXPClMRUZ4FVoB2.png"

    // Genera il PDF
    const pdfBuffer = await generateBookingPDF(bookingCode, customerName, bookingDate, bookingTime, service, logoUrl)

    // Imposta gli header per il download del file
    const fileName = `Prenotazione_${bookingCode}.pdf`

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error("Errore nella generazione del PDF:", error)
    return NextResponse.json({ error: "Si è verificato un errore durante la generazione del PDF" }, { status: 500 })
  }
}
