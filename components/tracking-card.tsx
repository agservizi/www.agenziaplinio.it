"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, HelpCircle, Package, Truck, CheckCircle, AlertCircle, Clock, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { it } from "date-fns/locale"

// Definizione dei tipi per i dati di tracking
type TrackingEvent = {
  date: string
  description: string
  location: string
}

type TrackingResult = {
  success: boolean
  trackingNumber: string
  product: string
  status: string
  events: TrackingEvent[]
  error?: string
}

export default function TrackingCard() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Funzione per ottenere l'icona in base allo stato dell'evento
  const getStatusIcon = (description: string) => {
    const lowerDesc = description.toLowerCase()
    if (lowerDesc.includes("consegnat")) return <CheckCircle className="text-green-500" size={18} />
    if (lowerDesc.includes("in consegna") || lowerDesc.includes("transito"))
      return <Truck className="text-blue-500" size={18} />
    if (lowerDesc.includes("presa in carico")) return <Package className="text-purple-500" size={18} />
    if (lowerDesc.includes("elaborazione")) return <Clock className="text-orange-500" size={18} />
    return <Clock className="text-gray-500" size={18} />
  }

  // Funzione per ottenere il colore di sfondo in base allo stato
  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes("consegnat")) return "bg-green-100 text-green-800"
    if (lowerStatus.includes("in consegna")) return "bg-blue-100 text-blue-800"
    if (lowerStatus.includes("transito")) return "bg-indigo-100 text-indigo-800"
    if (lowerStatus.includes("elaborazione")) return "bg-orange-100 text-orange-800"
    return "bg-gray-100 text-gray-800"
  }

  // Funzione per formattare la data
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "d MMMM yyyy 'alle' HH:mm", { locale: it })
    } catch (e) {
      return dateString
    }
  }

  // Funzione per tracciare la spedizione
  const trackShipment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!trackingNumber.trim()) {
      setError("Inserisci un codice di tracciamento valido")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/tracking/poste-italiane", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber: trackingNumber.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Errore durante il tracking")
      }

      setTrackingResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Si è verificato un errore durante il tracking")
    } finally {
      setIsLoading(false)
    }
  }

  // Funzione per aggiornare i risultati di tracking
  const refreshTracking = async () => {
    if (!trackingResult) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/tracking/poste-italiane", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber: trackingResult.trackingNumber }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Errore durante l'aggiornamento del tracking")
      }

      setTrackingResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Si è verificato un errore durante l'aggiornamento")
    } finally {
      setIsLoading(false)
    }
  }

  // Funzione per resettare il form
  const resetTracking = () => {
    setTrackingNumber("")
    setTrackingResult(null)
    setError(null)
  }

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#003399] to-[#ffcc00]"></div>
      <div className="p-8">
        <div className="w-16 h-16 bg-[#003399]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#003399"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-4">Tracking Poste Italiane</h3>
        <p className="text-gray-600 mb-6">
          Traccia in tempo reale le tue spedizioni e raccomandate inviate con Poste Italiane direttamente dalla nostra
          agenzia.
        </p>

        <div className="bg-[#003399] p-4 sm:p-5 rounded-xl mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ffcc00] rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#003399"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h4 className="text-white font-bold text-sm sm:text-base">Traccia la tua spedizione</h4>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-lg">
            <form onSubmit={trackShipment}>
              <label htmlFor="tracking-code" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Inserisci il codice di tracciamento
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="text"
                  id="tracking-code"
                  placeholder="Es. RA123456789IT"
                  className="w-full sm:flex-1 border border-gray-300 rounded-md sm:rounded-r-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003399]"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#ffcc00] text-[#003399] font-bold px-4 py-2 rounded-md sm:rounded-l-none hover:bg-[#ffdd33] transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <RefreshCw size={16} className="animate-spin mr-2" />
                      Ricerca...
                    </span>
                  ) : (
                    "Traccia"
                  )}
                </button>
              </div>
              {error && (
                <div className="mt-2 text-red-600 text-xs sm:text-sm flex items-center">
                  <AlertCircle size={14} className="mr-1 flex-shrink-0" />
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>

        {trackingResult && (
          <div className="mt-6 bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-[#003399]">{trackingResult.product}</h4>
                  <p className="text-sm text-gray-600">{trackingResult.trackingNumber}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trackingResult.status)}`}
                  >
                    {trackingResult.status}
                  </div>
                  <button
                    onClick={refreshTracking}
                    disabled={isLoading}
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    title="Aggiorna tracking"
                  >
                    <RefreshCw size={16} className={`text-gray-600 ${isLoading ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h5 className="font-bold mb-3 text-gray-700">Cronologia spedizione</h5>
              <div className="space-y-4">
                {trackingResult.events.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 mt-1">{getStatusIcon(event.description)}</div>
                    <div>
                      <p className="font-medium">{event.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500">
                        <span>{formatDate(event.date)}</span>
                        {event.location && (
                          <>
                            <span className="hidden sm:inline mx-2">•</span>
                            <span>{event.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={resetTracking}
                  className="text-[#003399] text-sm font-medium hover:underline flex items-center"
                >
                  Nuova ricerca
                  <ArrowRight size={14} className="ml-1" />
                </button>

                <a
                  href={`https://www.poste.it/cerca/index.html#/risultati-spedizioni/${trackingResult.trackingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#003399] text-sm font-medium hover:underline flex items-center"
                >
                  Vedi su Poste Italiane
                  <ArrowRight size={14} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        )}

        {!trackingResult && (
          <>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors duration-300 border-l-4 border-[#003399]">
                <h4 className="font-bold mb-2 text-[#003399]">Raccomandate</h4>
                <p className="text-gray-600 text-sm">
                  Traccia raccomandate semplici, A/R, atti giudiziari e assicurate.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors duration-300 border-l-4 border-[#ffcc00]">
                <h4 className="font-bold mb-2 text-[#003399]">Pacchi</h4>
                <p className="text-gray-600 text-sm">
                  Traccia pacchi nazionali e internazionali spediti con Poste Italiane.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-[#ffcc00] hover:border-[#ffdd33] transition-colors duration-300">
              <h4 className="font-bold mb-2 flex items-center text-[#003399]">
                <HelpCircle size={16} className="mr-2 text-[#ffcc00]" />
                Come funziona
              </h4>
              <p className="text-gray-600 text-sm">
                Inserisci il codice di tracciamento che trovi sulla ricevuta di spedizione. Il sistema mostrerà lo stato
                aggiornato della tua spedizione in tempo reale.
              </p>
            </div>
          </>
        )}
      </div>
      <div className="p-4 bg-[#003399]/5 border-t border-gray-100 mt-auto">
        <a
          href="https://www.poste.it/cerca/index.html#/cerca-spedizioni"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#003399] font-medium flex items-center justify-center group-hover:underline"
        >
          Vai al tracking ufficiale
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  )
}
