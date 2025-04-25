"use client"

// Modifichiamo i container nel componente testimonials per garantire padding simmetrici

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star } from "lucide-react"

// Dati statici delle recensioni
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

  // Simuliamo un breve caricamento per dare l'impressione di dati dinamici
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Calcola il rating medio basato sulle recensioni effettive
  const averageRating =
    staticTestimonials.reduce((acc, testimonial) => acc + testimonial.rating, 0) / staticTestimonials.length
  const formattedRating = averageRating.toFixed(1)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Cosa Dicono i Nostri Clienti</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Leggi le testimonianze di chi ha già scelto i nostri servizi e scopri perché siamo l'agenzia di fiducia a
            Castellammare di Stabia.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {staticTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 testimonial-card">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg?height=100&width=100"}
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
                <p className="text-gray-600 mb-3 italic">"{testimonial.text}"</p>
                <p className="text-gray-400 text-sm">{testimonial.date}</p>
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
