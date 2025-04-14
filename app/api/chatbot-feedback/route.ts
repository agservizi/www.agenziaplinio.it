import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { messageId, feedback, messageContent } = body

    console.log("Feedback ricevuto:", { messageId, feedback, messageContent })

    // Qui puoi implementare la logica per salvare il feedback nel database
    // Per ora, registriamo solo il feedback nei log

    // Esempio di come potresti salvare il feedback nel database Neon
    // const { neon } = await import('@neondatabase/serverless');
    // const sql = neon(process.env.DATABASE_URL);
    // await sql`INSERT INTO chatbot_feedback (message_id, feedback, message_content) VALUES (${messageId}, ${feedback}, ${messageContent})`;

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Errore nella gestione del feedback:", error)
    return NextResponse.json({ success: false, error: "Errore interno del server" }, { status: 500 })
  }
}

