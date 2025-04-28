import { NextResponse } from "next/server"
import QRCode from "qrcode"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get("url") || "https://www.agenziaplinio.it/promo-iliad-landing"

    // Genera il QR code come data URL
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      errorCorrectionLevel: "H",
      margin: 1,
      color: {
        dark: "#ff0032",
        light: "#ffffff",
      },
    })

    // Restituisci l'immagine come risposta
    return new NextResponse(qrCodeDataURL, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
  } catch (error) {
    console.error("Errore nella generazione del QR code:", error)
    return NextResponse.json({ error: "Errore nella generazione del QR code" }, { status: 500 })
  }
}
