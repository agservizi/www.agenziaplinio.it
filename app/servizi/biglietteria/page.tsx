"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowLeft, Ticket, HelpCircle, ChevronDown, Check, Info } from "lucide-react"
import FAQSection from "@/components/faq-section"

const biglietterieFAQs = [
  {
    question: "Quali tipi di biglietti ferroviari posso acquistare?",
    answer:
      "Presso la nostra agenzia è possibile acquistare biglietti Trenitalia (Frecce, Intercity e Regionali) e Italo per tutte le destinazioni nazionali.",
  },
  {
    question: "Posso acquistare biglietti Flixbus?",
    answer:
      "Sì, offriamo il servizio di vendita biglietti Flixbus per tutte le destinazioni nazionali e internazionali servite dal vettore.",
  },
  {
    question: "Quanto tempo prima devo acquistare un biglietto?",
    answer:
      "Consigliamo di acquistare i biglietti con qualche giorno di anticipo, soprattutto per i treni ad alta velocità e per i viaggi nei periodi di alta stagione. Tuttavia, è possibile acquistare biglietti anche per partenze in giornata, salvo disponibilità.",
  },
  {
    question: "Posso modificare o cancellare un biglietto già acquistato?",
    answer:
      "Le possibilità di modifica o cancellazione dipendono dalle condizioni del vettore e dalla tariffa acquistata. In generale, i biglietti Trenitalia e Italo possono essere modificati o rimborsati secondo le loro politiche, mentre i biglietti Flixbus hanno condizioni più restrittive. Vi invitiamo a contattarci per assistenza specifica.",
  },
  {
    question: "Quali informazioni devo fornire per acquistare un biglietto?",
    answer:
      "Per acquistare un biglietto è necessario fornire: data e orario di partenza desiderati, stazione di partenza e arrivo, numero di passeggeri e, in alcuni casi, i dati anagrafici dei viaggiatori (nome, cognome e data di nascita).",
  },
  {
    question: "Quanto costa il servizio di emissione biglietti?",
    answer:
      "Il servizio di emissione biglietti ha un costo aggiuntivo minimo rispetto al prezzo del biglietto. Contattaci per conoscere le tariffe specifiche.",
  },
]

export default function Biglietteria() {
  const [activeTab, setActiveTab] = useState("trenitalia")
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null)
  const [animatedElements, setAnimatedElements] = useState<string[]>([])

  useEffect(() => {
    // Animazione di entrata per gli elementi
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setAnimatedElements((prev) => [...prev, entry.target.id])
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const toggleInfo = (id: string) => {
    setExpandedInfo(expandedInfo === id ? null : id)
  }

  const isAnimated = (id: string) => animatedElements.includes(id)

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link href="/servizi" className="text-white/80 hover:text-white inline-flex items-center transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Torna ai servizi
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-6">Biglietteria</h1>
              <p className="text-xl max-w-3xl">
                Offriamo servizi di vendita biglietti per i principali vettori ferroviari nazionali.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Ticket size={64} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-8">I Nostri Servizi</h2>

              {/* Tabs di navigazione */}
              <div className="mb-8 border-b">
                <div className="flex flex-wrap -mb-px">
                  <button
                    onClick={() => setActiveTab("trenitalia")}
                    className={`inline-flex items-center py-4 px-6 text-sm font-medium text-center border-b-2 ${
                      activeTab === "trenitalia"
                        ? "text-primary border-primary"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/frecciarossa_500x500-x4CIi5s1zJghDPKWz6zh7JMQGgwr5E.jpg"
                      alt="Trenitalia"
                      width={24}
                      height={24}
                      className="mr-2 rounded-full"
                      unoptimized
                    />
                    Trenitalia
                  </button>
                  <button
                    onClick={() => setActiveTab("italo")}
                    className={`inline-flex items-center py-4 px-6 text-sm font-medium text-center border-b-2 ${
                      activeTab === "italo"
                        ? "text-primary border-primary"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/italo-Re7gKJRIQmzuklz6ZFtHFphwcC5lA7.png"
                      alt="Italo"
                      width={24}
                      height={24}
                      className="mr-2 rounded-full"
                      unoptimized
                    />
                    Italo
                  </button>
                  <button
                    onClick={() => setActiveTab("flixbus")}
                    className={`inline-flex items-center py-4 px-6 text-sm font-medium text-center border-b-2 ${
                      activeTab === "flixbus"
                        ? "text-primary border-primary"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/flix-3ggBvXxQ1W92xIb8IK0WBCC6E14ro6.png"
                      alt="Flixbus"
                      width={24}
                      height={24}
                      className="mr-2 rounded-full"
                      unoptimized
                    />
                    Flixbus
                  </button>
                </div>
              </div>

              {/* Contenuto dei tab */}
              <div className="space-y-8">
                {/* Trenitalia Tab */}
                <div
                  className={`${
                    activeTab === "trenitalia" ? "block" : "hidden"
                  } animate-on-scroll transition-all duration-500 ${
                    isAnimated("trenitalia-content") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  id="trenitalia-content"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/frecciarossa_500x500-x4CIi5s1zJghDPKWz6zh7JMQGgwr5E.jpg"
                        alt="Trenitalia"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-white mb-2">Biglietti Trenitalia</h3>
                          <p className="text-white/90">Frecce, Intercity e Regionali</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3">Servizi disponibili</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center p-3 bg-gray-50 rounded-md">
                            <Check size={18} className="text-green-500 mr-2" />
                            <span>Frecce (Frecciarossa, Frecciargento)</span>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-md">
                            <Check size={18} className="text-green-500 mr-2" />
                            <span>Intercity</span>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-md">
                            <Check size={18} className="text-green-500 mr-2" />
                            <span>Regionali</span>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-md">
                            <Check size={18} className="text-green-500 mr-2" />
                            <span>Carte Sconto e Abbonamenti</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <button
                          onClick={() => toggleInfo("trenitalia-info")}
                          className="w-full flex items-center justify-between p-4 bg-yellow-50 rounded-md border border-yellow-200 hover:bg-yellow-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <Info size={18} className="text-yellow-500 mr-2" />
                            <span className="font-medium">Cosa serve per acquistare</span>
                          </div>
                          <ChevronDown
                            size={18}
                            className={`text-yellow-500 transition-transform duration-300 ${
                              expandedInfo === "trenitalia-info" ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            expandedInfo === "trenitalia-info" ? "max-h-96 mt-3" : "max-h-0"
                          }`}
                        >
                          <div className="p-4 bg-yellow-50 rounded-md">
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>Data e orario di partenza desiderati</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>Stazione di partenza e arrivo</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>Numero di passeggeri</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>
                                  Dati anagrafici dei viaggiatori (nome, cognome e data di nascita) per alcuni tipi di
                                  biglietti
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center mt-6">
                        <a
                          href={`https://wa.me/393773798570?text=${encodeURIComponent(
                            `${
                              new Date().getHours() < 12
                                ? "Buongiorno"
                                : new Date().getHours() < 18
                                  ? "Buon pomeriggio"
                                  : "Buonasera"
                            }, vorrei informazioni sui biglietti Trenitalia.`,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                        >
                          <Image
                            src="/images/whatsapp-icon.png"
                            alt="WhatsApp"
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          Richiedi informazioni
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Italo Tab */}
                <div
                  className={`${activeTab === "italo" ? "block" : "hidden"} animate-on-scroll transition-all duration-500 ${
                    isAnimated("italo-content") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  id="italo-content"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/italo-Re7gKJRIQmzuklz6ZFtHFphwcC5lA7.png"
                        alt="Italo"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-white mb-2">Biglietti Italo</h3>
                          <p className="text-white/90">Alta velocità in tutta Italia</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3">Servizi disponibili</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center p-3 bg-gray-50 rounded-md">
                            <Check size={18} className="text-green-500 mr-2" />
                            <span>Biglietti standard</span>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-md">
                            <Check size={18} className="text-green-500 mr-2" />
                            <span>Biglietti Economy e Low Cost</span>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-md">
                            <Check size={18} className="text-green-500 mr-2" />
                            <span>Prima e Club Executive</span>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-md">
                            <Check size={18} className="text-green-500 mr-2" />
                            <span>Carnet e abbonamenti</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <button
                          onClick={() => toggleInfo("italo-info")}
                          className="w-full flex items-center justify-between p-4 bg-yellow-50 rounded-md border border-yellow-200 hover:bg-yellow-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <Info size={18} className="text-yellow-500 mr-2" />
                            <span className="font-medium">Cosa serve per acquistare</span>
                          </div>
                          <ChevronDown
                            size={18}
                            className={`text-yellow-500 transition-transform duration-300 ${
                              expandedInfo === "italo-info" ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            expandedInfo === "italo-info" ? "max-h-96 mt-3" : "max-h-0"
                          }`}
                        >
                          <div className="p-4 bg-yellow-50 rounded-md">
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>Data e orario di partenza desiderati</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>Stazione di partenza e arrivo</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>Numero di passeggeri</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>
                                  Dati anagrafici dei viaggiatori (nome, cognome e data di nascita) per tutti i
                                  biglietti
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center mt-6">
                        <a
                          href={`https://wa.me/393773798570?text=${encodeURIComponent(
                            `${
                              new Date().getHours() < 12
                                ? "Buongiorno"
                                : new Date().getHours() < 18
                                  ? "Buon pomeriggio"
                                  : "Buonasera"
                            }, vorrei informazioni sui biglietti Italo.`,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                        >
                          <Image
                            src="/images/whatsapp-icon.png"
                            alt="WhatsApp"
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          Richiedi informazioni
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flixbus Tab */}
                <div
                  className={`${
                    activeTab === "flixbus" ? "block" : "hidden"
                  } animate-on-scroll transition-all duration-500 ${
                    isAnimated("flixbus-content") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  id="flixbus-content"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/flix-3ggBvXxQ1W92xIb8IK0WBCC6E14ro6.png"
                        alt="Flixbus"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-white mb-2">Biglietti Flixbus</h3>
                          <p className="text-white/90">Viaggi nazionali e internazionali in autobus</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3">Servizi disponibili</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center p-3 bg-gray-50 rounded-md">
                            <Check size={18} className="text-green-500 mr-2" />
                            <span>Tratte nazionali</span>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-md">
                            <Check size={18} className="text-green-500 mr-2" />
                            <span>Tratte internazionali</span>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-md">
                            <Check size={18} className="text-green-500 mr-2" />
                            <span>Biglietti andata e ritorno</span>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-md">
                            <Check size={18} className="text-green-500 mr-2" />
                            <span>Servizi aggiuntivi (bagagli, etc.)</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <button
                          onClick={() => toggleInfo("flixbus-info")}
                          className="w-full flex items-center justify-between p-4 bg-yellow-50 rounded-md border border-yellow-200 hover:bg-yellow-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <Info size={18} className="text-yellow-500 mr-2" />
                            <span className="font-medium">Cosa serve per acquistare</span>
                          </div>
                          <ChevronDown
                            size={18}
                            className={`text-yellow-500 transition-transform duration-300 ${
                              expandedInfo === "flixbus-info" ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            expandedInfo === "flixbus-info" ? "max-h-96 mt-3" : "max-h-0"
                          }`}
                        >
                          <div className="p-4 bg-yellow-50 rounded-md">
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>Data e orario di partenza desiderati</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>Città di partenza e arrivo</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>Numero di passeggeri</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>
                                  Dati anagrafici dei viaggiatori (nome, cognome e data di nascita) e indirizzo email
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
                                <span>Informazioni su bagagli extra (se necessario)</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center mt-6">
                        <a
                          href={`https://wa.me/393773798570?text=${encodeURIComponent(
                            `${
                              new Date().getHours() < 12
                                ? "Buongiorno"
                                : new Date().getHours() < 18
                                  ? "Buon pomeriggio"
                                  : "Buonasera"
                            }, vorrei informazioni sui biglietti Flixbus.`,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                        >
                          <Image
                            src="/images/whatsapp-icon.png"
                            alt="WhatsApp"
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          Richiedi informazioni
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vantaggi per i Clienti */}
              <div
                className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg shadow-md animate-on-scroll transition-all duration-500"
                id="vantaggi-section"
                style={{
                  opacity: isAnimated("vantaggi-section") ? 1 : 0,
                  transform: isAnimated("vantaggi-section") ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <h3 className="text-2xl font-bold mb-6 text-center">Vantaggi per i Nostri Clienti</h3>
                <p className="text-gray-600 text-center mb-8">
                  Scegliere di acquistare i tuoi biglietti presso la nostra agenzia ti offre numerosi vantaggi
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"></path>
                        <path d="M12 8v4l3 3"></path>
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Risparmio di Tempo</h4>
                    <p className="text-gray-600 text-sm">
                      Nessuna attesa online. Acquista i tuoi biglietti rapidamente con l'assistenza del nostro
                      personale.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm text-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Consulenza Personalizzata</h4>
                    <p className="text-gray-600 text-sm">
                      Ti aiutiamo a trovare la soluzione migliore per le tue esigenze di viaggio e il miglior rapporto
                      qualità-prezzo.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm text-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Sicurezza e Affidabilità</h4>
                    <p className="text-gray-600 text-sm">
                      Acquisti sicuri e garantiti. In caso di problemi, siamo sempre a tua disposizione per assisterti.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                  <h4 className="font-bold mb-2 flex items-center">
                    <HelpCircle size={16} className="mr-2 text-yellow-500" />
                    Informazioni Importanti
                  </h4>
                  <p className="text-gray-600 text-sm">
                    I biglietti acquistati sono soggetti alle condizioni di viaggio stabilite dalle rispettive compagnie
                    (Trenitalia, Italo, Flixbus). Per eventuali modifiche o rimborsi dopo l'acquisto, è necessario
                    contattare direttamente la compagnia di trasporto secondo le loro politiche e tempistiche. Vi
                    consigliamo di verificare attentamente le condizioni di modifica/cancellazione prima dell'acquisto.
                  </p>
                </div>
              </div>

              {/* Loghi dei Partner con animazione */}
              <div
                className="mt-16 animate-on-scroll transition-all duration-500"
                id="partner-section"
                style={{
                  opacity: isAnimated("partner-section") ? 1 : 0,
                  transform: isAnimated("partner-section") ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <h3 className="text-2xl font-bold mb-6">I Nostri Partner</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105">
                    <Image
                      src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/frecciarossa_500x500-x4CIi5s1zJghDPKWz6zh7JMQGgwr5E.jpg"
                      alt="Trenitalia"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105">
                    <Image
                      src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/italo-Re7gKJRIQmzuklz6ZFtHFphwcC5lA7.png"
                      alt="Italo"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105">
                    <Image
                      src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/flix-3ggBvXxQ1W92xIb8IK0WBCC6E14ro6.png"
                      alt="Flixbus"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div
                className="mt-16 animate-on-scroll transition-all duration-500"
                id="faq-section"
                style={{
                  opacity: isAnimated("faq-section") ? 1 : 0,
                  transform: isAnimated("faq-section") ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <FAQSection
                  title="Domande Frequenti sulla Biglietteria"
                  description="Trova le risposte alle domande più comuni sui nostri servizi di biglietteria."
                  faqs={biglietterieFAQs}
                />
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-bold mb-4">Informazioni Utili</h3>

                <div className="space-y-6">
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <h4 className="font-bold mb-2">Orari del Servizio</h4>
                    <p className="text-gray-600">
                      Lun-Ven: 9:00-13:20, 16:00-19:20
                      <br />
                      Sab: 9:00-13:00
                    </p>
                  </div>

                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <h4 className="font-bold mb-2">Metodi di Pagamento Accettati</h4>
                    <p className="text-gray-600">Contanti, Bancomat, Carte di Credito, Carte Prepagate.</p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                    <h4 className="font-bold mb-2 text-primary">Vantaggi del Servizio</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Servizio rapido e sicuro</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Assistenza personalizzata</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Tariffe competitive</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-bold mb-2">Hai bisogno di assistenza?</h4>
                    <p className="text-gray-600 mb-4">
                      Contattaci per maggiori informazioni sui nostri servizi di biglietteria.
                    </p>
                    <div className="space-y-2">
                      <a
                        href={`https://wa.me/393773798570?text=${encodeURIComponent(
                          `${
                            new Date().getHours() < 12
                              ? "Buongiorno"
                              : new Date().getHours() < 18
                                ? "Buon pomeriggio"
                                : "Buonasera"
                          }, vorrei informazioni sui servizi di biglietteria.`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center justify-center w-full transform hover:scale-105 duration-300"
                      >
                        <Image src="/images/whatsapp-icon.png" alt="WhatsApp" width={20} height={20} className="mr-2" />
                        Contattaci su WhatsApp
                      </a>
                      <a
                        href="tel:+390810584542"
                        className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors inline-block w-full text-center transform hover:scale-105 duration-300"
                      >
                        Chiamaci
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
