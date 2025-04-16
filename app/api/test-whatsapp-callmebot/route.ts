import { type NextRequest, NextResponse } from "next/server"
import { sendWhatsAppMessage } from "@/lib/whatsapp-callmebot-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verifica che i campi richiesti siano presenti
    if (!body.phoneNumber || !body.customerName) {
      return NextResponse.json({ error: "Numero di telefono e nome cliente sono obbligatori" }, { status: 400 })
    }

    // Invia il messaggio WhatsApp di test
    const result = await sendWhatsAppMessage({
      phoneNumber: body.phoneNumber,
      bookingCode: body.bookingCode || "TEST-123",
      customerName: body.customerName,
      bookingDate: body.bookingDate || "01/01/2023",
      bookingTime: body.bookingTime || "10:00",
      service: body.service || "Test del servizio",
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Errore nell'invio del messaggio WhatsApp" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      message: "Messaggio WhatsApp inviato con successo",
    })
  } catch (error) {
    console.error("Errore durante il test dell'invio WhatsApp:", error)
    return NextResponse.json({ error: "Errore durante il test dell'invio WhatsApp" }, { status: 500 })
  }
}
