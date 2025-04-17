"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const IliadPromoFlyer = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [theme, setTheme] = useState("modern")

  const generatePromoFlyer = async () => {
    setIsGenerating(true)

    try {
      // Crea un nuovo documento PDF in formato A4
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Carica i font
      doc.setFont("helvetica")

      // Applica il tema selezionato
      if (theme === "modern") {
        await generateModernTheme(doc)
      } else if (theme === "minimal") {
        await generateMinimalTheme(doc)
      } else if (theme === "bold") {
        await generateBoldTheme(doc)
      }

      // Salva il PDF
      doc.save("Promo_Iliad_AG_Servizi.pdf")
    } catch (error) {
      console.error("Errore nella generazione del PDF:", error)
      alert("Si è verificato un errore nella generazione del volantino. Riprova più tardi.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Tema moderno con gradiente e design elegante
  const generateModernTheme = async (doc) => {
    // Sfondo bianco base
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, 210, 297, "F")

    // Crea un effetto gradiente per l'header (simulato con rettangoli sovrapposti)
    const gradientSteps = 20
    for (let i = 0; i < gradientSteps; i++) {
      const alpha = 1 - i / gradientSteps
      doc.setFillColor(255, 0, 50, alpha)
      doc.rect(0, 0, 210, 70 - i, "F")
    }

    // Aggiungi elementi grafici decorativi
    doc.setFillColor(255, 255, 255, 0.1)
    doc.circle(180, 20, 25, "F") // Cerchio decorativo in alto a destra
    doc.circle(30, 40, 15, "F") // Cerchio decorativo in alto a sinistra

    // Aggiungi il logo Iliad
    await addLogoToDocument(doc, 70, 25, 70)

    // Titolo della promozione con stile moderno
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(28)
    doc.setFont("helvetica", "bold")
    doc.text("OFFERTA ESCLUSIVA", 105, 55, { align: "center" })

    // Sottotitolo con badge
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(30, 75, 150, 25, 5, 5, "F")
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(18)
    doc.text("RISPARMIA €5 SUL COSTO DI ATTIVAZIONE", 105, 90, { align: "center" })

    // Informazioni sulla promozione
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("Offerta valida fino al 30 aprile 2025", 105, 110, { align: "center" })
    doc.text("Disponibile esclusivamente presso", 105, 118, { align: "center" })
    doc.setFont("helvetica", "bold")
    doc.text("AG SERVIZI - Via Plinio il Vecchio 72, Castellammare di Stabia", 105, 126, { align: "center" })

    // Dettagli delle offerte con design a schede
    // Scheda 1
    doc.setFillColor(248, 248, 248)
    doc.roundedRect(20, 140, 80, 100, 8, 8, "F")
    doc.setFillColor(255, 0, 50, 0.1)
    doc.roundedRect(20, 140, 80, 20, 8, 8, "F")

    // Scheda 2
    doc.setFillColor(248, 248, 248)
    doc.roundedRect(110, 140, 80, 100, 8, 8, "F")
    doc.setFillColor(255, 0, 50, 0.1)
    doc.roundedRect(110, 140, 80, 20, 8, 8, "F")

    // Titoli delle schede
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("GIGA 120", 60, 154, { align: "center" })
    doc.text("TOP 250 PLUS", 150, 154, { align: "center" })

    // Contenuto scheda 1
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text("• 120 GB in 4G/4G+", 30, 170)
    doc.text("• Minuti e SMS illimitati", 30, 180)
    doc.text("• 7GB dedicati in Europa", 30, 190)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(16)
    doc.text("€7,99/mese", 60, 210, { align: "center" })
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(10)
    doc.text("Attivazione €5 invece di €9,99", 60, 220, { align: "center" })

    // Contenuto scheda 2
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text("• 250 GB in 5G", 120, 170)
    doc.text("• Minuti e SMS illimitati", 120, 180)
    doc.text("• Roaming in UE incluso", 120, 190)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(16)
    doc.text("€9,99/mese", 150, 210, { align: "center" })
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(10)
    doc.text("Attivazione €5 invece di €9,99", 150, 220, { align: "center" })

    // Box informativo con stile moderno
    doc.setFillColor(255, 0, 50, 0.05)
    doc.roundedRect(20, 250, 170, 35, 8, 8, "F")

    // Bordo colorato a sinistra
    doc.setFillColor(255, 0, 50)
    doc.roundedRect(20, 250, 5, 35, 8, 8, "F")

    doc.setTextColor(255, 0, 50)
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("COME OTTENERE LO SCONTO:", 35, 265)
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("Visita il nostro sito web agenziaplinio.it e scarica", 35, 275)
    doc.text("il tuo voucher personale", 35, 283)

    // Footer con design moderno
    doc.setFillColor(248, 248, 248)
    doc.rect(0, 287, 210, 10, "F")
    doc.setTextColor(120, 120, 120)
    doc.setFontSize(8)
    doc.text("Offerta soggetta a termini e condizioni. Per maggiori informazioni visita agenziaplinio.it", 105, 293, {
      align: "center",
    })
  }

  // Tema minimalista con design pulito
  const generateMinimalTheme = async (doc) => {
    // Sfondo bianco
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, 210, 297, "F")

    // Header minimalista
    doc.setFillColor(250, 250, 250)
    doc.rect(0, 0, 210, 60, "F")

    // Linea rossa sottile
    doc.setFillColor(255, 0, 50)
    doc.rect(0, 60, 210, 2, "F")

    // Aggiungi il logo Iliad
    await addLogoToDocument(doc, 75, 20, 60)

    // Titolo della promozione con stile minimalista
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text("OFFERTA ESCLUSIVA", 105, 80, { align: "center" })

    // Sottotitolo
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(18)
    doc.text("RISPARMIA €5 SUL COSTO DI ATTIVAZIONE", 105, 95, { align: "center" })

    // Informazioni sulla promozione
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("Offerta valida fino al 30 aprile 2025", 105, 115, { align: "center" })
    doc.text("Disponibile esclusivamente presso", 105, 125, { align: "center" })
    doc.setFont("helvetica", "bold")
    doc.text("AG SERVIZI - Via Plinio il Vecchio 72, Castellammare di Stabia", 105, 135, { align: "center" })

    // Linea separatrice
    doc.setDrawColor(220, 220, 220)
    doc.line(30, 145, 180, 145)

    // Dettagli delle offerte con design minimalista
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("LE NOSTRE OFFERTE", 105, 160, { align: "center" })

    // Offerta 1
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(16)
    doc.text("GIGA 120", 60, 180, { align: "center" })
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text("• 120 GB in 4G/4G+", 60, 190, { align: "center" })
    doc.text("• Minuti e SMS illimitati", 60, 200, { align: "center" })
    doc.text("• 7GB dedicati in Europa", 60, 210, { align: "center" })
    doc.setFont("helvetica", "bold")
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(16)
    doc.text("€7,99/mese", 60, 225, { align: "center" })
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(10)
    doc.text("Attivazione €5 invece di €9,99", 60, 235, { align: "center" })

    // Linea separatrice verticale
    doc.setDrawColor(220, 220, 220)
    doc.line(105, 170, 105, 240)

    // Offerta 2
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("TOP 250 PLUS", 150, 180, { align: "center" })
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text("• 250 GB in 5G", 150, 190, { align: "center" })
    doc.text("• Minuti e SMS illimitati", 150, 200, { align: "center" })
    doc.text("• Roaming in UE incluso", 150, 210, { align: "center" })
    doc.setFont("helvetica", "bold")
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(16)
    doc.text("€9,99/mese", 150, 225, { align: "center" })
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(10)
    doc.text("Attivazione €5 invece di €9,99", 150, 235, { align: "center" })

    // Linea separatrice
    doc.setDrawColor(220, 220, 220)
    doc.line(30, 250, 180, 250)

    // Istruzioni per il voucher
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("COME OTTENERE LO SCONTO:", 105, 265, { align: "center" })
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("Visita il nostro sito web agenziaplinio.it e scarica il tuo voucher personale", 105, 275, {
      align: "center",
    })

    // Footer minimalista
    doc.setFillColor(250, 250, 250)
    doc.rect(0, 287, 210, 10, "F")
    doc.setTextColor(150, 150, 150)
    doc.setFontSize(8)
    doc.text("Offerta soggetta a termini e condizioni. Per maggiori informazioni visita agenziaplinio.it", 105, 293, {
      align: "center",
    })
  }

  // Tema bold con colori vivaci e design audace
  const generateBoldTheme = async (doc) => {
    // Sfondo bianco
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, 210, 297, "F")

    // Header con design bold
    doc.setFillColor(255, 0, 50)
    doc.rect(0, 0, 210, 80, "F")

    // Elementi grafici decorativi
    doc.setFillColor(255, 255, 255, 0.1)
    for (let i = 0; i < 5; i++) {
      doc.circle(20 + i * 40, 20, 10 + i * 2, "F")
    }

    // Aggiungi il logo Iliad
    await addLogoToDocument(doc, 65, 25, 80)

    // Titolo della promozione con stile bold
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(32)
    doc.setFont("helvetica", "bold")
    doc.text("OFFERTA ESCLUSIVA", 105, 65, { align: "center" })

    // Badge per il sottotitolo
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(20, 85, 170, 30, 5, 5, "F")
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("RISPARMIA €5", 105, 100, { align: "center" })
    doc.setFontSize(16)
    doc.text("SUL COSTO DI ATTIVAZIONE", 105, 110, { align: "center" })

    // Informazioni sulla promozione
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("Offerta valida fino al 30 aprile 2025", 105, 130, { align: "center" })
    doc.text("Disponibile esclusivamente presso", 105, 140, { align: "center" })
    doc.setFont("helvetica", "bold")
    doc.text("AG SERVIZI - Via Plinio il Vecchio 72, Castellammare di Stabia", 105, 150, { align: "center" })

    // Box per le offerte con design bold
    doc.setFillColor(245, 245, 245)
    doc.roundedRect(15, 165, 180, 90, 10, 10, "F")

    // Intestazione box
    doc.setFillColor(80, 80, 80)
    doc.roundedRect(15, 165, 180, 20, 10, 10, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("SCEGLI TRA LE NOSTRE OFFERTE", 105, 180, { align: "center" })

    // Offerta 1
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(18)
    doc.text("GIGA 120", 60, 200, { align: "center" })
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text("• 120 GB in 4G/4G+", 30, 210)
    doc.text("• Minuti e SMS illimitati", 30, 220)
    doc.text("• 7GB dedicati in Europa", 30, 230)

    // Prezzo con badge
    doc.setFillColor(255, 0, 50)
    doc.roundedRect(30, 235, 60, 15, 7, 7, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("€7,99/mese", 60, 245, { align: "center" })

    // Offerta 2
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("TOP 250 PLUS", 150, 200, { align: "center" })
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text("• 250 GB in 5G", 120, 210)
    doc.text("• Minuti e SMS illimitati", 120, 220)
    doc.text("• Roaming in UE incluso", 120, 230)

    // Prezzo con badge
    doc.setFillColor(255, 0, 50)
    doc.roundedRect(120, 235, 60, 15, 7, 7, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("€9,99/mese", 150, 245, { align: "center" })

    // Box informativo con stile bold
    doc.setFillColor(255, 0, 50, 0.1)
    doc.roundedRect(15, 265, 180, 25, 5, 5, "F")
    doc.setTextColor(255, 0, 50)
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("COME OTTENERE LO SCONTO:", 105, 280, { align: "center" })

    // Footer con design bold
    doc.setFillColor(80, 80, 80)
    doc.rect(0, 287, 210, 10, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(8)
    doc.text("Visita il nostro sito web agenziaplinio.it e scarica il tuo voucher personale", 105, 293, {
      align: "center",
    })
  }

  // Funzione per aggiungere il logo
  const addLogoToDocument = async (doc, x, y, width) => {
    try {
      // Crea un elemento immagine
      const img = new Image()
      img.crossOrigin = "anonymous" // Importante per evitare problemi CORS

      // Imposta l'URL dell'immagine
      img.src = "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Iliad_logo-emmzu7gUgFwdyAdgiVCNUtInfD3i2S.png"

      // Attendi che l'immagine sia caricata
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      // Converti l'immagine in formato base64 per jsPDF
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0)
      const imageData = canvas.toDataURL("image/png")

      // Calcola le dimensioni per mantenere l'aspetto originale
      const imgWidth = width
      const imgHeight = (img.height / img.width) * imgWidth

      // Aggiungi l'immagine al PDF, centrata orizzontalmente
      const xPosition = x // Posizione X specificata
      doc.addImage(imageData, "PNG", xPosition, y, imgWidth, imgHeight)
    } catch (error) {
      console.error("Errore nel caricamento del logo:", error)
      // Fallback al testo in caso di errore
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(36)
      doc.setFont("helvetica", "bold")
      doc.text("iliad", 105, 30, { align: "center" })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold mb-4">Volantino Promozionale Iliad</h3>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Genera un volantino A4 con la promozione Iliad e lo sconto di €5 sul costo di attivazione
      </p>

      <div className="w-full max-w-md mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Scegli lo stile del volantino:</label>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleziona uno stile" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modern">Moderno</SelectItem>
            <SelectItem value="minimal">Minimalista</SelectItem>
            <SelectItem value="bold">Bold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-6">
        <div
          className={`p-3 border rounded-md text-center cursor-pointer transition-all ${theme === "modern" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
          onClick={() => setTheme("modern")}
        >
          <div className="w-full h-12 bg-gradient-to-b from-red-500 to-red-400 rounded-t-sm mb-2"></div>
          <div className="text-xs font-medium">Moderno</div>
        </div>
        <div
          className={`p-3 border rounded-md text-center cursor-pointer transition-all ${theme === "minimal" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
          onClick={() => setTheme("minimal")}
        >
          <div className="w-full h-12 bg-gray-50 border-b-2 border-red-500 mb-2"></div>
          <div className="text-xs font-medium">Minimalista</div>
        </div>
        <div
          className={`p-3 border rounded-md text-center cursor-pointer transition-all ${theme === "bold" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
          onClick={() => setTheme("bold")}
        >
          <div className="w-full h-12 bg-red-500 mb-2"></div>
          <div className="text-xs font-medium">Bold</div>
        </div>
      </div>

      <Button
        onClick={generatePromoFlyer}
        disabled={isGenerating}
        className="bg-[#ff0032] hover:bg-[#d60029] text-white px-8 py-2 rounded-md transition-colors"
        size="lg"
      >
        {isGenerating ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generazione in corso...
          </span>
        ) : (
          "Genera Volantino PDF"
        )}
      </Button>

      <div className="mt-6 text-sm text-gray-500">Scegli tra tre stili diversi per il tuo volantino promozionale</div>
    </div>
  )
}

export default IliadPromoFlyer
