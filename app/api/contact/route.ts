import { sendEmail } from "@/lib/email"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Tutti i campi obbligatori devono essere compilati" },
        { status: 400 },
      )
    }

    // Costruisci l'HTML dell'email
    const html = `
      <h2>Nuovo messaggio dal modulo di contatto</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefono:</strong> ${phone || "Non specificato"}</p>
      <p><strong>Oggetto:</strong> ${subject}</p>
      <h3>Messaggio:</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `

    // Invia l'email
    const result = await sendEmail({
      to: "ag.servizi16@gmail.com",
      subject: `Nuovo contatto: ${subject}`,
      html,
      replyTo: email,
    })

    if (!result.success) {
      console.error("Errore nell'invio dell'email:", result.error)
      return NextResponse.json(
        { success: false, error: "Si è verificato un errore durante l'invio dell'email" },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Errore nella gestione della richiesta:", error)
    return NextResponse.json(
      { success: false, error: "Si è verificato un errore durante l'elaborazione della richiesta" },
      { status: 500 },
    )
  }
}
