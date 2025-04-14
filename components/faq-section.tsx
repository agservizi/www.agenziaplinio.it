"use client"

import { useState, useEffect } from "react"
// Importiamo jsPDF direttamente all'inizio del file
import { jsPDF } from "jspdf"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  description?: string
  faqs: FAQ[]
}

// Funzione di countdown
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate))

  function calculateTimeLeft(targetDate: Date) {
    const difference = targetDate.getTime() - new Date().getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

// Funzione per generare un codice voucher univoco
function generateVoucherCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = "ILIAD-"
  const length = 8

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

const FAQSection = ({
  title = "Biglietteria",
  description = "Trova le risposte alle domande più comuni sui nostri servizi di biglietteria.",
  faqs,
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const targetDate = new Date("2025-04-30T19:00:00")
  const timeLeft = useCountdown(targetDate)

  // Funzione per generare e scaricare il PDF del voucher
  const handleDownloadVoucher = async () => {
    setIsDownloading(true)

    try {
      // Genera un codice voucher univoco
      const voucherCode = generateVoucherCode()
      const currentDate = new Date().toLocaleDateString("it-IT")

      // Crea un nuovo documento PDF in formato A5
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      })

      // Colori Iliad
      const iliadRed = "#ff0032"
      const iliadGray = "#f5f5f7"

      // Sfondo
      doc.setFillColor(255, 255, 255)
      doc.rect(0, 0, 148, 210, "F")

      // Header con sfondo rosso
      doc.setFillColor(255, 0, 50) // Iliad red in RGB
      doc.rect(0, 0, 148, 40, "F")

      // Aggiungi il logo Iliad (come testo, dato che non possiamo caricare immagini esterne)
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.setFont("helvetica", "bold")
      doc.text("iliad", 74, 20, { align: "center" })

      // Titolo del voucher
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("VOUCHER PROMOZIONALE", 74, 30, { align: "center" })

      // Informazioni sul voucher
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("OFFERTA ILIAD TOP 250 PLUS", 74, 50, { align: "center" })

      // Codice voucher
      doc.setFillColor(245, 245, 247) // Iliad gray in RGB
      doc.roundedRect(24, 55, 100, 20, 3, 3, "F")
      doc.setTextColor(255, 0, 50) // Iliad red in RGB
      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.text(voucherCode, 74, 67, { align: "center" })

      // Dettagli dell'offerta
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text("Data di emissione: " + currentDate, 74, 80, { align: "center" })
      doc.text("Valido fino al: 30 aprile 2025, ore 19:00", 74, 85, { align: "center" })

      // Linea divisoria
      doc.setDrawColor(220, 220, 220)
      doc.line(24, 90, 124, 90)

      // Dettagli dell'offerta
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text("Dettagli dell'offerta:", 24, 100)

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text("• 250 GB in 5G", 24, 110)
      doc.text("• Minuti e SMS illimitati", 24, 115)
      doc.text("• Roaming in UE incluso", 24, 120)

      // Prezzo
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text("Prezzo mensile:", 24, 130)
      doc.setTextColor(255, 0, 50) // Iliad red in RGB
      doc.text("€9,99/mese per sempre", 80, 130)

      // Costo di attivazione
      doc.setTextColor(0, 0, 0)
      doc.text("Costo di attivazione:", 24, 140)
      doc.setTextColor(255, 0, 50) // Iliad red in RGB
      doc.text("€5,00", 80, 140)
      doc.setTextColor(150, 150, 150)
      doc.setFont("helvetica", "normal")
      doc.text("(invece di €9,99)", 95, 140)

      // Istruzioni
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text("Presentare questo voucher presso:", 74, 155, { align: "center" })
      doc.setFontSize(12)
      doc.text("AG SERVIZI VIA PLINIO 72", 74, 162, { align: "center" })

      // Footer con termini e condizioni
      doc.setFillColor(245, 245, 247) // Iliad gray in RGB
      doc.rect(0, 175, 148, 35, "F")
      doc.setTextColor(100, 100, 100)
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.text("Termini e condizioni:", 24, 185)
      doc.text("• Il voucher è valido solo per nuove attivazioni", 24, 190)
      doc.text("• Non cumulabile con altre promozioni", 24, 195)
      doc.text("• Verificare la copertura 5G nella propria zona", 24, 200)

      // Salva il PDF con il nome del voucher
      doc.save(`Voucher_Iliad_${voucherCode}.pdf`)
    } catch (error) {
      console.error("Errore nella generazione del PDF:", error)
      alert("Si è verificato un errore nella generazione del voucher. Riprova più tardi.")
    } finally {
      // Reimposta lo stato dopo un breve ritardo
      setTimeout(() => {
        setIsDownloading(false)
      }, 1500)
    }
  }

  // Modifica il return statement per sostituire la sezione FAQ con la promozione Iliad
  return (
    <section className="py-16 bg-[#f5f5f7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Colonna sinistra con logo e immagine */}
            <div className="md:w-1/3 bg-[#ff0032] p-6 flex flex-col items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Iliad_logo.svg"
                alt="Logo Iliad"
                className="h-16 mb-6"
              />
              <div className="text-white text-center">
                <p className="font-bold text-xl mb-2">OFFERTA ESCLUSIVA</p>
                <p className="text-sm">Disponibile presso</p>
                <p className="font-bold">AG SERVIZI</p>
                <p className="text-sm mt-4">Scade il</p>
                <p className="font-bold">30 aprile ore 19:00</p>

                {/* Countdown */}
                <div className="mt-4 bg-white rounded-lg p-3 text-[#ff0032]">
                  <p className="text-xs text-center text-gray-600 mb-1">COUNTDOWN</p>
                  <div className="flex justify-center space-x-2">
                    <div className="text-center">
                      <div className="text-xl font-bold">{timeLeft.days}</div>
                      <div className="text-xs">giorni</div>
                    </div>
                    <div className="text-xl font-bold">:</div>
                    <div className="text-center">
                      <div className="text-xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
                      <div className="text-xs">ore</div>
                    </div>
                    <div className="text-xl font-bold">:</div>
                    <div className="text-center">
                      <div className="text-xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
                      <div className="text-xs">min</div>
                    </div>
                    <div className="text-xl font-bold">:</div>
                    <div className="text-center">
                      <div className="text-xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
                      <div className="text-xs">sec</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonna destra con dettagli offerta */}
            <div className="md:w-2/3 p-6 md:p-8">
              <h2 className="text-3xl font-bold text-[#ff0032] mb-4">Offerta Iliad TOP 250 Plus</h2>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#ff0032] flex items-center justify-center text-white mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg">250 GB in 5G</span>
                </div>

                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#ff0032] flex items-center justify-center text-white mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg">Minuti e SMS illimitati</span>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#ff0032] flex items-center justify-center text-white mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg">Roaming in UE incluso</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Costo mensile</p>
                  <p className="text-4xl font-bold text-[#ff0032]">€9,99</p>
                  <p className="text-sm text-gray-500">al mese per sempre</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Attivazione</p>
                  <p className="text-xl">
                    <span className="line-through text-gray-500 mr-2">€9,99</span>
                    <span className="font-bold text-[#ff0032]">€5,00</span>
                  </p>
                </div>
              </div>

              <button
                onClick={handleDownloadVoucher}
                disabled={isDownloading}
                className="w-full py-3 bg-[#ff0032] text-white font-bold rounded-lg hover:bg-[#d60029] transition-colors relative overflow-hidden"
              >
                {isDownloading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    GENERAZIONE PDF...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      ></path>
                    </svg>
                    SCARICA IL TUO VOUCHER PDF
                  </span>
                )}
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Scarica il voucher in formato PDF con codice sconto per l'attivazione a €5,00
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
