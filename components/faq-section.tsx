"use client"

import { useState, useEffect } from "react"
import { jsPDF } from "jspdf"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  description?: string
  faqs: FAQ[]
  showPromo?: boolean // Prop per forzare la visualizzazione delle promo
}

interface IliadPlan {
  name: string
  price: string
  data: string
  features: string[]
  activationPrice: string
  discountedActivationPrice: string
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

// Data di fine della promozione
const PROMO_END_DATE = new Date("2025-04-30T19:00:00")

const FAQSection = ({
  title = "Biglietteria",
  description = "Trova le risposte alle domande più comuni sui nostri servizi di biglietteria.",
  faqs,
  showPromo = false, // Default a false, può essere impostato a true per forzare la visualizzazione delle promo
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPromoActive, setIsPromoActive] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  // Controlla se la promo è attiva in base alla data attuale
  useEffect(() => {
    const checkPromoStatus = () => {
      const now = new Date()
      const isActive = now < PROMO_END_DATE || showPromo
      setIsPromoActive(isActive)
    }

    checkPromoStatus()
    // Controlla lo stato della promo ogni ora
    const interval = setInterval(checkPromoStatus, 3600000)

    return () => clearInterval(interval)
  }, [showPromo])

  // Funzione per attivare la modalità admin con una combinazione di tasti (Ctrl+Shift+P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault()
        setIsAdmin(!isAdmin)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isAdmin])

  // Funzione per attivare/disattivare manualmente la promo (solo per admin)
  const togglePromo = () => {
    if (isAdmin) {
      setIsPromoActive(!isPromoActive)
    }
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const timeLeft = useCountdown(PROMO_END_DATE)

  // Definizione delle offerte Iliad
  const iliadPlans: IliadPlan[] = [
    {
      name: "GIGA 120",
      price: "7,99",
      data: "120 GB in 4G/4G+",
      features: ["Minuti e SMS illimitati", "7GB dedicati in Europa", "Minuti illimitati verso 60 destinazioni"],
      activationPrice: "9,99",
      discountedActivationPrice: "5,00",
    },
    {
      name: "TOP 250 PLUS",
      price: "9,99",
      data: "250 GB in 5G",
      features: ["Minuti e SMS illimitati", "Roaming in UE incluso", "Minuti illimitati verso 60 destinazioni"],
      activationPrice: "9,99",
      discountedActivationPrice: "5,00",
    },
    {
      name: "TOP 300",
      price: "11,99",
      data: "300 GB in 5G",
      features: ["Minuti e SMS illimitati", "11GB dedicati in Europa", "Minuti illimitati verso 60 destinazioni"],
      activationPrice: "9,99",
      discountedActivationPrice: "5,00",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === iliadPlans.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? iliadPlans.length - 1 : prev - 1))
  }

  // Funzione per generare e scaricare il PDF del voucher
  const handleDownloadVoucher = async (plan: IliadPlan) => {
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

      // Sfondo
      doc.setFillColor(255, 255, 255)
      doc.rect(0, 0, 148, 210, "F")

      // Header con sfondo rosso
      doc.setFillColor(255, 0, 50) // Iliad red in RGB
      doc.rect(0, 0, 148, 40, "F")

      // Aggiungi il logo Iliad come immagine
      const addLogoToDocument = async () => {
        try {
          // Crea un elemento immagine
          const img = new Image()
          img.crossOrigin = "anonymous" // Importante per evitare problemi CORS

          // Imposta l'URL dell'immagine
          img.src =
            "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Iliad_logo-emmzu7gUgFwdyAdgiVCNUtInfD3i2S.png"

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

          // Calcola le dimensioni per mantenere l'aspetto originale ma con altezza di circa 15mm
          const imgHeight = 15
          const imgWidth = (img.width / img.height) * imgHeight

          // Aggiungi l'immagine al PDF, centrata orizzontalmente
          const xPosition = (148 - imgWidth) / 2 // Centra l'immagine (148mm è la larghezza del PDF A5)
          doc.addImage(imageData, "PNG", xPosition, 10, imgWidth, imgHeight)
        } catch (error) {
          console.error("Errore nel caricamento del logo:", error)
          // Fallback al testo in caso di errore
          doc.setTextColor(255, 255, 255)
          doc.setFontSize(24)
          doc.setFont("helvetica", "bold")
          doc.text("iliad", 74, 20, { align: "center" })
        }
      }

      // Esegui la funzione asincrona per aggiungere il logo
      await addLogoToDocument()

      // Titolo del voucher
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("VOUCHER PROMOZIONALE", 74, 30, { align: "center" })

      // Informazioni sul voucher
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text(`OFFERTA ILIAD ${plan.name}`, 74, 50, { align: "center" })

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
      doc.text(`• ${plan.data}`, 24, 110)

      // Aggiungi le features specifiche del piano
      plan.features.forEach((feature, index) => {
        doc.text(`• ${feature}`, 24, 115 + index * 5)
      })

      // Prezzo
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text("Prezzo mensile:", 24, 135)
      doc.setTextColor(255, 0, 50) // Iliad red in RGB
      doc.text(`€${plan.price}/mese per sempre`, 80, 135)

      // Costo di attivazione
      doc.setTextColor(0, 0, 0)
      doc.text("Costo di attivazione:", 24, 145)
      doc.setTextColor(255, 0, 50) // Iliad red in RGB
      doc.text(`€${plan.discountedActivationPrice}`, 80, 145)
      doc.setTextColor(150, 150, 150)
      doc.setFont("helvetica", "normal")
      doc.text(`(invece di €${plan.activationPrice})`, 95, 145)

      // Istruzioni
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text("Presentare questo voucher presso:", 74, 160, { align: "center" })
      doc.setFontSize(12)
      doc.text("AG SERVIZI VIA PLINIO 72", 74, 167, { align: "center" })

      // Footer con termini e condizioni
      doc.setFillColor(245, 245, 247) // Iliad gray in RGB
      doc.rect(0, 175, 148, 35, "F")
      doc.setTextColor(100, 100, 100)
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.text("Termini e condizioni:", 24, 185)
      doc.text("• Il voucher è valido solo per nuove attivazioni", 24, 190)
      doc.text("• Non cumulabile con altre promozioni", 24, 195)
      doc.text("• Verificare la copertura nella propria zona", 24, 200)

      // Salva il PDF con il nome del voucher
      doc.save(`Voucher_Iliad_${plan.name}_${voucherCode}.pdf`)
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

  // Modifica il return statement per mostrare le FAQ o la promozione Iliad in base allo stato
  return (
    <section className="py-16 bg-[#f5f5f7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pulsante admin nascosto (visibile solo in modalità admin) */}
        {isAdmin && (
          <div className="mb-4 p-2 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Modalità Admin</span>
              <button
                onClick={togglePromo}
                className={`px-4 py-2 rounded-md text-white text-sm font-medium ${
                  isPromoActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isPromoActive ? "Disattiva Promozioni" : "Attiva Promozioni"}
              </button>
            </div>
          </div>
        )}

        {isPromoActive ? (
          // Mostra le promozioni Iliad
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
            {/* Controlli dello slider */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
              <button
                onClick={prevSlide}
                className="bg-white rounded-full p-2 shadow-md text-[#ff0032] hover:bg-gray-100 -ml-4"
                aria-label="Offerta precedente"
              >
                <ChevronLeft size={24} />
              </button>
            </div>

            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
              <button
                onClick={nextSlide}
                className="bg-white rounded-full p-2 shadow-md text-[#ff0032] hover:bg-gray-100 -mr-4"
                aria-label="Offerta successiva"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Indicatori dello slider */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              {iliadPlans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-[#ff0032]" : "bg-gray-300"}`}
                  aria-label={`Vai all'offerta ${index + 1}`}
                />
              ))}
            </div>

            {/* Contenuto dello slider */}
            <div className="flex flex-col md:flex-row">
              {/* Colonna sinistra con logo e immagine */}
              <div className="md:w-1/3 bg-[#ff0032] p-6 flex flex-col items-center justify-center">
                <img
                  src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Iliad_logo-emmzu7gUgFwdyAdgiVCNUtInfD3i2S.png"
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
                <h2 className="text-3xl font-bold text-[#ff0032] mb-4">
                  Offerta Iliad {iliadPlans[currentSlide].name}
                </h2>

                <div className="mb-6">
                  {iliadPlans[currentSlide].data.includes("5G") ? (
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#ff0032] flex items-center justify-center text-white mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-lg">{iliadPlans[currentSlide].data}</span>
                    </div>
                  ) : (
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#ff0032] flex items-center justify-center text-white mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-lg">{iliadPlans[currentSlide].data}</span>
                    </div>
                  )}

                  {iliadPlans[currentSlide].features.map((feature, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#ff0032] flex items-center justify-center text-white mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-lg">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Costo mensile</p>
                    <p className="text-4xl font-bold text-[#ff0032]">€{iliadPlans[currentSlide].price}</p>
                    <p className="text-sm text-gray-500">al mese per sempre</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Attivazione</p>
                    <p className="text-xl">
                      <span className="line-through text-gray-500 mr-2">
                        €{iliadPlans[currentSlide].activationPrice}
                      </span>
                      <span className="font-bold text-[#ff0032]">
                        €{iliadPlans[currentSlide].discountedActivationPrice}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadVoucher(iliadPlans[currentSlide])}
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
                  Scarica il voucher in formato PDF con codice sconto per l'attivazione a €
                  {iliadPlans[currentSlide].discountedActivationPrice}
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Mostra le FAQ originali
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
            </div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-900 hover:text-primary transition-colors"
                    aria-expanded={openIndex === index}
                  >
                    <span>{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="flex-shrink-0 ml-2" />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-96 pb-4" : "max-h-0"
                    }`}
                  >
                    <div className="text-gray-600 answer-content">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default FAQSection
