"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

// Dati statici delle recensioni - mantenuti invariati
const staticTestimonials = [
  {
    id: 1,
    name: "Ciro Esposito",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Servizio eccellente! Ho utilizzato AG SERVIZI per l'attivazione dello SPID e sono rimasto molto soddisfatto della professionalità e della rapidità del servizio.",
    date: "15/03/2023",
  },
  {
    id: 2,
    name: "Carmela Sorrentino",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Carmine e Valentina sono molto preparati. Ho risolto in pochi minuti un problema con la mia bolletta che mi trascinavo da settimane.",
    date: "22/04/2023",
  },
  {
    id: 3,
    name: "Gennaro Cuomo",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "Ho utilizzato il servizio di spedizione pacchi e devo dire che è stato tutto molto veloce ed efficiente. Consigliato!",
    date: "10/05/2023",
  },
  {
    id: 4,
    name: "Assunta D'Auria",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Grazie al team di AG SERVIZI ho attivato un contratto Fastweb in modo semplice e veloce. Professionali e disponibili.",
    date: "03/06/2023",
  },
  {
    id: 5,
    name: "Salvatore Cascone",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Ho richiesto una visura catastale urgente e sono stati rapidissimi. Ottimo servizio, tornerò sicuramente!",
    date: "18/07/2023",
  },
  {
    id: 6,
    name: "Immacolata Longobardi",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "Servizio di consulenza per le utenze davvero utile. Mi hanno aiutato a risparmiare sulle bollette di luce e gas.",
    date: "29/08/2023",
  },
  {
    id: 7,
    name: "Pasquale Donnarumma",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Punto di ritiro pacchi comodo ed efficiente. Non devo più preoccuparmi di non essere a casa quando arriva il corriere.",
    date: "14/09/2023",
  },
  {
    id: 8,
    name: "Nunzia Staiano",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Ho acquistato i biglietti del treno Italo direttamente in agenzia, evitando code e sovraprezzi online. Servizio impeccabile!",
    date: "05/10/2023",
  },
]

const Testimonials = () => {
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewMode, setViewMode] = useState("grid") // carousel o grid
  const [filterRating, setFilterRating] = useState(0)
  const [filteredTestimonials, setFilteredTestimonials] = useState(staticTestimonials)
  const [expandedId, setExpandedId] = useState(null)

  // Calcola il rating medio basato sulle recensioni effettive
  const averageRating =
    staticTestimonials.reduce((acc, testimonial) => acc + testimonial.rating, 0) / staticTestimonials.length
  const formattedRating = averageRating.toFixed(1)

  // Simuliamo un breve caricamento per dare l'impressione di dati dinamici
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Filtra le testimonianze in base al rating selezionato
  useEffect(() => {
    if (filterRating === 0) {
      setFilteredTestimonials(staticTestimonials)
    } else {
      setFilteredTestimonials(staticTestimonials.filter((t) => t.rating === filterRating))
    }
    setActiveIndex(0)
  }, [filterRating])

  // Autoplay per il carosello
  useEffect(() => {
    if (viewMode !== "carousel" || loading) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === filteredTestimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [viewMode, loading, filteredTestimonials.length])

  // Funzioni di navigazione
  const goToNext = () => {
    setActiveIndex((prev) => (prev === filteredTestimonials.length - 1 ? 0 : prev + 1))
  }

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1))
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Elementi decorativi di sfondo */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            Cosa Dicono i Nostri Clienti
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Leggi le testimonianze di chi ha già scelto i nostri servizi e scopri perché siamo l'agenzia di fiducia a
            Castellammare di Stabia.
          </p>
        </div>

        {/* Controlli e filtri */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <button
              onClick={() => setViewMode(viewMode === "carousel" ? "grid" : "carousel")}
              className="px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
            >
              {viewMode === "carousel" ? "Visualizza griglia" : "Visualizza carosello"}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Filtra per valutazione:</span>
            <div className="flex space-x-1">
              {[0, 5, 4, 3].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilterRating(rating)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    filterRating === rating ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {rating === 0 ? "Tutti" : `${rating}★`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">Nessuna recensione trovata con questo filtro.</p>
            <button
              onClick={() => setFilterRating(0)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Mostra tutte le recensioni
            </button>
          </div>
        ) : viewMode === "carousel" ? (
          <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Carosello */}
            <div className="relative h-[400px] md:h-[300px]">
              {filteredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 p-6 md:p-8 transition-opacity duration-500 flex flex-col md:flex-row items-center gap-6 ${
                    index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <div className="md:w-1/3 flex flex-col items-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={100}
                        height={100}
                        className="rounded-full border-4 border-white shadow-lg relative z-10"
                      />
                    </div>
                    <h3 className="font-bold text-lg mt-4">{testimonial.name}</h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{testimonial.date}</p>
                  </div>

                  <div className="md:w-2/3">
                    <p className="text-gray-600 italic text-lg">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Controlli di navigazione */}
            {filteredTestimonials.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-lg flex items-center justify-center hover:bg-white transition-colors z-20"
                  aria-label="Recensione precedente"
                >
                  <ChevronLeft size={24} className="text-primary" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-lg flex items-center justify-center hover:bg-white transition-colors z-20"
                  aria-label="Recensione successiva"
                >
                  <ChevronRight size={24} className="text-primary" />
                </button>
              </>
            )}

            {/* Indicatori */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
              {filteredTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === idx ? "w-6 bg-primary" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Vai alla recensione ${idx + 1}`}
                ></button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className={expandedId === testimonial.id ? "" : "relative max-h-24 overflow-hidden"}>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  {testimonial.text.length > 100 && expandedId !== testimonial.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
                  )}
                </div>

                {testimonial.text.length > 100 && (
                  <button
                    onClick={() => toggleExpand(testimonial.id)}
                    className="mt-2 text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    {expandedId === testimonial.id ? "Mostra meno" : "Leggi tutto"}
                  </button>
                )}

                <p className="text-gray-400 text-sm mt-3">{testimonial.date}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-md">
            <div className="flex mr-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-gray-700 font-medium">
              {formattedRating} su 5 - Basato su {staticTestimonials.length} recensioni
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
