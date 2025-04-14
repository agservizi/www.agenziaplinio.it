"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"

// Sample service data - in a real application, this would come from a database
const allServices = [
  {
    id: "pagamenti",
    title: "Pagamenti",
    description: "Bollettini, F24, PagoPA, MAV/RAV, Bonifici con DropPoint.",
    keywords: ["bollettini", "f24", "pagopa", "mav", "rav", "bonifici", "droppoint", "pagamenti"],
  },
  {
    id: "biglietteria",
    title: "Biglietteria",
    description: "Biglietti Italo e Trenitalia.",
    keywords: ["biglietti", "treno", "italo", "trenitalia", "viaggi", "trasporti"],
  },
  {
    id: "spedizioni",
    title: "Spedizioni",
    description: "Spedizioni nazionali e internazionali con BRT, Poste Italiane, TNT/Fedex.",
    keywords: ["spedizioni", "pacchi", "corriere", "brt", "poste", "tnt", "fedex", "internazionali"],
  },
  {
    id: "trust-provider",
    title: "Attivazioni Digitali",
    description: "SPID, PEC, Firma Digitale (Namirial).",
    keywords: ["spid", "pec", "firma digitale", "namirial", "identità digitale", "servizi digitali"],
  },
  {
    id: "caf-patronato",
    title: "CAF e Patronato",
    description: "Pratiche fiscali e assistenza previdenziale.",
    keywords: ["caf", "patronato", "730", "isee", "dichiarazione redditi", "pensioni", "fiscale"],
  },
  {
    id: "visure",
    title: "Visure",
    description: "Visure CRIF, catastali, camerali, protestati.",
    keywords: ["visure", "crif", "catasto", "camera commercio", "protesti", "documenti"],
  },
  {
    id: "telefonia-luce-gas",
    title: "Telefonia, Luce e Gas",
    description:
      "Contratti con Fastweb, Iliad, Windtre, Pianeta Fibra, Sky, A2A Energia, Enel Energia, Fastweb Energia.",
    keywords: ["telefonia", "luce", "gas", "contratti", "fastweb", "iliad", "windtre", "enel", "a2a", "utenze"],
  },
  {
    id: "servizi-postali",
    title: "Servizi Postali",
    description: "Invio Email, Fax, PEC.",
    keywords: ["email", "fax", "pec", "posta", "invio", "comunicazioni"],
  },
  {
    id: "servizio-foto",
    title: "Servizio Foto",
    description: "Stampa fotografica professionale.",
    keywords: ["foto", "fototessera", "passaporto", "stampa", "documenti"],
  },
  {
    id: "punto-ritiro",
    title: "Punto di Ritiro Pacchi",
    description: "PuntoPoste, BRT-Fermopoint, GLS Shop, Fedex Location.",
    keywords: ["ritiro", "pacchi", "puntoposte", "fermopoint", "gls", "fedex", "consegna"],
  },
]

export default function ServiceSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<typeof allServices>([])

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = allServices.filter((service) => {
        const termLower = searchTerm.toLowerCase()
        return (
          service.title.toLowerCase().includes(termLower) ||
          service.description.toLowerCase().includes(termLower) ||
          service.keywords.some((keyword) => keyword.toLowerCase().includes(termLower))
        )
      })
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [searchTerm])

  const handleOpen = () => {
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const handleClose = () => {
    setIsOpen(false)
    setSearchTerm("")
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center text-gray-600 hover:text-primary transition-colors"
        aria-label="Cerca servizi"
      >
        <Search size={20} />
        <span className="ml-1 text-sm hidden md:inline">Cerca</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b flex items-center">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Cerca servizi (es. SPID, bollettini, spedizioni...)"
                className="flex-1 outline-none text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-2">
              {searchTerm.length > 1 && results.length === 0 && (
                <div className="p-4 text-center text-gray-500">Nessun servizio trovato per "{searchTerm}"</div>
              )}

              {results.map((service) => (
                <Link
                  key={service.id}
                  href={`/servizi/${service.id}`}
                  onClick={handleClose}
                  className="block p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <h3 className="font-bold text-lg mb-1">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </Link>
              ))}

              {searchTerm.length <= 1 && (
                <div className="p-4">
                  <p className="text-gray-500 mb-4">Servizi popolari:</p>
                  <div className="flex flex-wrap gap-2">
                    {["SPID", "Bollettini", "Spedizioni", "CAF", "Visure"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchTerm(term)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
