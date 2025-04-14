import { type NextRequest, NextResponse } from "next/server"

// Define the interface for the request body
interface RequestBody {
  messages: Array<{
    id: number
    type: string
    content: string
    timestamp: string
    feedback?: string | null
    read?: boolean
  }>
  userMessage: string
}

export async function POST(request: NextRequest) {
  try {
    // Get the API key from environment variables (server-side only)
    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      console.error("OpenRouter API key not found in environment variables")
      return NextResponse.json({ error: "API key configuration error" }, { status: 500 })
    }

    // Parse the request body
    const body: RequestBody = await request.json()
    const { messages, userMessage } = body

    // Prepare the conversation context for the model
    const formattedMessages = messages.map((msg) => ({
      role: msg.type === "user" ? "user" : "assistant",
      content: msg.content,
    }))

    // Add the current user message
    formattedMessages.push({
      role: "user",
      content: userMessage,
    })

    // Add a system instruction to contextualize the model
    const systemMessage = {
      role: "system",
      content: `Sei l'assistente virtuale di AG Servizi, un'agenzia situata in Via Plinio il Vecchio 72, Castellammare di Stabia (NA).
      Orari di apertura: lunedì-venerdì 9:00-13:20 e 16:00-19:20, sabato 9:00-13:00, domenica chiuso.
      Offri servizi come: pagamento bollettini, spedizioni, servizi postali, visure, SPID, firma digitale, PEC, CAF e patronato, punto ritiro pacchi, ricariche e biglietteria.
      Rispondi in modo cordiale, professionale e conciso. Fornisci informazioni accurate sui servizi dell'agenzia.
      Se non conosci una risposta specifica, indirizza il cliente a contattare l'agenzia al numero 081 0584542 o via email a info@agenziaplinio.it.`,
    }

    // Call the OpenRouter API
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://agenziaplinio.it",
        "X-Title": "AG Servizi Chatbot",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-v3-base:free",
        messages: [systemMessage, ...formattedMessages],
        temperature: 0.7,
        max_tokens: 500,
        allow_training: true,
        transforms: ["middle-out"],
        route: "fallback",
      }),
    })

    if (!openRouterResponse.ok) {
      const errorData = await openRouterResponse.json()
      console.error("OpenRouter API error:", errorData)
      return NextResponse.json({ error: "Failed to get response from AI service" }, { status: 502 })
    }

    const data = await openRouterResponse.json()
    return NextResponse.json({ content: data.choices[0].message.content })
  } catch (error) {
    console.error("Error in chatbot API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

