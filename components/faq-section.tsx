"use client"

// Modifica la funzione di rendering per mostrare una promozione Iliad invece delle FAQ

import { useState, useEffect } from "react"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  description?: string
  faqs: FAQ[]
}

// Aggiungi la funzione di countdown dopo la definizione delle interfacce e prima del componente FAQSection
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

const FAQSection = ({
  title = "Biglietteria",
  description = "Trova le risposte alle domande più comuni sui nostri servizi di biglietteria.",
  faqs,
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const targetDate = new Date("2025-04-30T19:00:00") // Nota: ho usato 2025 perché 2024 potrebbe essere già passato
  const timeLeft = useCountdown(targetDate)

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

              <button className="w-full py-3 bg-[#ff0032] text-white font-bold rounded-lg hover:bg-[#d60029] transition-colors">
                ATTIVA SUBITO
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
