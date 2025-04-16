import { NextResponse } from "next/server"
import https from "https"

export async function GET() {
  return new Promise((resolve) => {
    try {
      console.log("[Alternative] Inizio test alternativo WhatsApp")

      // Parametri per il test
      const phone = "393773798570"
      const apikey = "9208549"
      const text = "Test messaggio alternativo da AG SERVIZI " + new Date().toISOString()

      // Costruisci l'URL
      const encodedText = encodeURIComponent(text)
      const path = `/whatsapp.php?phone=${phone}&text=${encodedText}&apikey=${apikey}`

      console.log("[Alternative] Path:", path)

      // Opzioni per la richiesta HTTP
      const options = {
        hostname: "api.callmebot.com",
        port: 443,
        path: path,
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; AGServizi/1.0)",
          Accept: "*/*",
        },
        timeout: 30000, // 30 secondi
      }

      console.log("[Alternative] Invio richiesta...")

      // Esegui la richiesta HTTP
      const req = https.request(options, (res) => {
        console.log("[Alternative] Risposta ricevuta, status:", res.statusCode)

        let data = ""

        res.on("data", (chunk) => {
          data += chunk
        })

        res.on("end", () => {
          console.log("[Alternative] Risposta completa:", data)

          resolve(
            NextResponse.json({
              success: true,
              statusCode: res.statusCode,
              headers: res.headers,
              data: data,
            }),
          )
        })
      })

      req.on("error", (error) => {
        console.error("[Alternative] Errore nella richiesta:", error)
        resolve(
          NextResponse.json(
            {
              success: false,
              error: error.message,
            },
            { status: 500 },
          ),
        )
      })

      req.on("timeout", () => {
        console.error("[Alternative] Timeout della richiesta")
        req.destroy()
        resolve(
          NextResponse.json(
            {
              success: false,
              error: "Timeout della richiesta",
            },
            { status: 504 },
          ),
        )
      })

      req.end()
    } catch (error) {
      console.error("[Alternative] Errore generale:", error)
      resolve(
        NextResponse.json(
          {
            success: false,
            error: error instanceof Error ? error.message : "Errore sconosciuto",
          },
          { status: 500 },
        ),
      )
    }
  })
}
