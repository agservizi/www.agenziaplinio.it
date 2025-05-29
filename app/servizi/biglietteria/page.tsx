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

      {/* Main Content - Extreme Interactive Design */}
      <section className="py-0 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-[80px] animate-pulse"></div>
          <div
            className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-yellow-400/20 to-red-500/20 blur-[80px] animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-[40%] left-[20%] w-[20%] h-[20%] rounded-full bg-gradient-to-r from-green-400/20 to-teal-500/20 blur-[60px] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 py-16 mb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                  Biglietteria
                </span>
                <span className="block text-2xl md:text-3xl font-normal mt-2 text-blue-200">
                  Viaggia ovunque con un click
                </span>
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Scopri la nostra selezione di biglietti per treni e autobus. Prenota facilmente e rapidamente il tuo
                prossimo viaggio.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => document.getElementById("trenitalia-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold hover:bg-blue-100 transform hover:scale-105 transition-all duration-300 flex items-center"
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
                  onClick={() => document.getElementById("italo-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold hover:bg-blue-100 transform hover:scale-105 transition-all duration-300 flex items-center"
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
                  onClick={() => document.getElementById("flixbus-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold hover:bg-blue-100 transform hover:scale-105 transition-all duration-300 flex items-center"
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
          </div>

          {/* Animated wave divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-[60px] text-white"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 space-y-24">
          {/* Trenitalia Section */}
          <div id="trenitalia-section" className="scroll-mt-24">
            <div className="max-w-7xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 to-red-800/90 z-10"></div>
                      <Image
                        src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/frecciarossa_500x500-x4CIi5s1zJghDPKWz6zh7JMQGgwr5E.jpg"
                        alt="Trenitalia"
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                      <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-4">Trenitalia</h3>
                          <p className="text-white/90 text-lg">
                            Viaggia in tutta Italia con i treni ad alta velocità e regionali
                          </p>
                        </div>
                        <div className="mt-auto">
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
                            className="inline-flex items-center px-6 py-3 bg-white text-red-700 rounded-full font-bold hover:bg-red-50 transform hover:scale-105 transition-all duration-300"
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
                    <div className="md:w-2/3 p-8">
                      <div className="space-y-6">
                        <h4 className="text-2xl font-bold text-gray-800 flex items-center">
                          <span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                            <Check size={20} className="text-red-600" />
                          </span>
                          Servizi disponibili
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            "Frecce (Frecciarossa, Frecciargento)",
                            "Intercity",
                            "Regionali",
                            "Carte Sconto e Abbonamenti",
                          ].map((service, index) => (
                            <div
                              key={index}
                              className="bg-red-50 rounded-lg p-4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3 transform rotate-0 group-hover:rotate-12 transition-transform duration-300">
                                  <Check size={16} className="text-white" />
                                </div>
                                <span className="font-medium text-gray-800">{service}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8">
                          <button
                            onClick={() => toggleInfo("trenitalia-info")}
                            className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-3">
                                <Info size={20} className="text-red-600" />
                              </div>
                              <span className="font-bold text-gray-800">Cosa serve per acquistare</span>
                            </div>
                            <ChevronDown
                              size={20}
                              className={`text-red-600 transition-transform duration-500 ${
                                expandedInfo === "trenitalia-info" ? "transform rotate-180" : ""
                              }`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-500 ${
                              expandedInfo === "trenitalia-info" ? "max-h-96 mt-4" : "max-h-0"
                            }`}
                          >
                            <div className="p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-xl">
                              <ul className="space-y-4">
                                {[
                                  "Data e orario di partenza desiderati",
                                  "Stazione di partenza e arrivo",
                                  "Numero di passeggeri",
                                  "Dati anagrafici dei viaggiatori (nome, cognome e data di nascita) per alcuni tipi di biglietti",
                                ].map((item, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center mt-0.5 mr-3 transform group-hover:rotate-12 transition-transform duration-300">
                                      <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                    </div>
                                    <span className="text-gray-700">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Italo Section */}
          <div id="italo-section" className="scroll-mt-24">
            <div className="max-w-7xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-purple-800/90 z-10"></div>
                      <Image
                        src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/italo-Re7gKJRIQmzuklz6ZFtHFphwcC5lA7.png"
                        alt="Italo"
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                      <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-4">Italo</h3>
                          <p className="text-white/90 text-lg">Alta velocità in tutta Italia</p>
                        </div>
                        <div className="mt-auto">
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
                            className="inline-flex items-center px-6 py-3 bg-white text-purple-700 rounded-full font-bold hover:bg-purple-50 transform hover:scale-105 transition-all duration-300"
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
                    <div className="md:w-2/3 p-8">
                      <div className="space-y-6">
                        <h4 className="text-2xl font-bold text-gray-800 flex items-center">
                          <span className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <Check size={20} className="text-purple-600" />
                          </span>
                          Servizi disponibili
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            "Biglietti standard",
                            "Biglietti Economy e Low Cost",
                            "Prima e Club Executive",
                            "Carnet e abbonamenti",
                          ].map((service, index) => (
                            <div
                              key={index}
                              className="bg-purple-50 rounded-lg p-4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3 transform rotate-0 group-hover:rotate-12 transition-transform duration-300">
                                  <Check size={16} className="text-white" />
                                </div>
                                <span className="font-medium text-gray-800">{service}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8">
                          <button
                            onClick={() => toggleInfo("italo-info")}
                            className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-purple-600/10 flex items-center justify-center mr-3">
                                <Info size={20} className="text-purple-600" />
                              </div>
                              <span className="font-bold text-gray-800">Cosa serve per acquistare</span>
                            </div>
                            <ChevronDown
                              size={20}
                              className={`text-purple-600 transition-transform duration-500 ${
                                expandedInfo === "italo-info" ? "transform rotate-180" : ""
                              }`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-500 ${
                              expandedInfo === "italo-info" ? "max-h-96 mt-4" : "max-h-0"
                            }`}
                          >
                            <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                              <ul className="space-y-4">
                                {[
                                  "Data e orario di partenza desiderati",
                                  "Stazione di partenza e arrivo",
                                  "Numero di passeggeri",
                                  "Dati anagrafici dei viaggiatori (nome, cognome e data di nascita) per tutti i biglietti",
                                ].map((item, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-600/20 flex items-center justify-center mt-0.5 mr-3 transform group-hover:rotate-12 transition-transform duration-300">
                                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                                    </div>
                                    <span className="text-gray-700">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flixbus Section */}
          <div id="flixbus-section" className="scroll-mt-24">
            <div className="max-w-7xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-green-800/90 z-10"></div>
                      <Image
                        src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/flix-3ggBvXxQ1W92xIb8IK0WBCC6E14ro6.png"
                        alt="Flixbus"
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                      <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-4">Flixbus</h3>
                          <p className="text-white/90 text-lg">Viaggi nazionali e internazionali in autobus</p>
                        </div>
                        <div className="mt-auto">
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
                            className="inline-flex items-center px-6 py-3 bg-white text-green-700 rounded-full font-bold hover:bg-green-50 transform hover:scale-105 transition-all duration-300"
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
                    <div className="md:w-2/3 p-8">
                      <div className="space-y-6">
                        <h4 className="text-2xl font-bold text-gray-800 flex items-center">
                          <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <Check size={20} className="text-green-600" />
                          </span>
                          Servizi disponibili
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            "Tratte nazionali",
                            "Tratte internazionali",
                            "Biglietti andata e ritorno",
                            "Servizi aggiuntivi (bagagli, etc.)",
                          ].map((service, index) => (
                            <div
                              key={index}
                              className="bg-green-50 rounded-lg p-4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center mr-3 transform rotate-0 group-hover:rotate-12 transition-transform duration-300">
                                  <Check size={16} className="text-white" />
                                </div>
                                <span className="font-medium text-gray-800">{service}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8">
                          <button
                            onClick={() => toggleInfo("flixbus-info")}
                            className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-green-600/10 flex items-center justify-center mr-3">
                                <Info size={20} className="text-green-600" />
                              </div>
                              <span className="font-bold text-gray-800">Cosa serve per acquistare</span>
                            </div>
                            <ChevronDown
                              size={20}
                              className={`text-green-600 transition-transform duration-500 ${
                                expandedInfo === "flixbus-info" ? "transform rotate-180" : ""
                              }`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-500 ${
                              expandedInfo === "flixbus-info" ? "max-h-96 mt-4" : "max-h-0"
                            }`}
                          >
                            <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                              <ul className="space-y-4">
                                {[
                                  "Data e orario di partenza desiderati",
                                  "Città di partenza e arrivo",
                                  "Numero di passeggeri",
                                  "Dati anagrafici dei viaggiatori (nome, cognome e data di nascita) e indirizzo email",
                                  "Informazioni su bagagli extra (se necessario)",
                                ].map((item, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-green-600/20 flex items-center justify-center mt-0.5 mr-3 transform group-hover:rotate-12 transition-transform duration-300">
                                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                    </div>
                                    <span className="text-gray-700">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vantaggi Section */}
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25"></div>
              <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 md:p-12 shadow-xl">
                <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  Vantaggi per i Nostri Clienti
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: "clock",
                      title: "Risparmio di Tempo",
                      description:
                        "Nessuna attesa online. Acquista i tuoi biglietti rapidamente con l'assistenza del nostro personale.",
                    },
                    {
                      icon: "check",
                      title: "Consulenza Personalizzata",
                      description:
                        "Ti aiutiamo a trovare la soluzione migliore per le tue esigenze di viaggio e il miglior rapporto qualità-prezzo.",
                    },
                    {
                      icon: "shield",
                      title: "Sicurezza e Affidabilità",
                      description:
                        "Acquisti sicuri e garantiti. In caso di problemi, siamo sempre a tua disposizione per assisterti.",
                    },
                  ].map((advantage, index) => (
                    <div key={index} className="group">
                      <div className="bg-white rounded-xl p-6 shadow-md h-full transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:rotate-12">
                          {advantage.icon === "clock" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="28"
                              height="28"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-600"
                            >
                              <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"></path>
                              <path d="M12 8v4l3 3"></path>
                            </svg>
                          )}
                          {advantage.icon === "check" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="28"
                              height="28"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-indigo-600"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          )}
                          {advantage.icon === "shield" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="28"
                              height="28"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-600"
                            >
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                          )}
                        </div>
                        <h4 className="text-xl font-bold mb-3 text-center text-gray-800">{advantage.title}</h4>
                        <p className="text-gray-600 text-center">{advantage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
                  <h4 className="font-bold mb-3 flex items-center text-gray-800">
                    <HelpCircle size={20} className="mr-2 text-yellow-500" />
                    Informazioni Importanti
                  </h4>
                  <p className="text-gray-600">
                    I biglietti acquistati sono soggetti alle condizioni di viaggio stabilite dalle rispettive compagnie
                    (Trenitalia, Italo, Flixbus). Per eventuali modifiche o rimborsi dopo l'acquisto, è necessario
                    contattare direttamente la compagnia di trasporto secondo le loro politiche e tempistiche. Vi
                    consigliamo di verificare attentamente le condizioni di modifica/cancellazione prima dell'acquisto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Section */}
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold mb-10 text-center">I Nostri Partner</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Trenitalia",
                  image:
                    "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/frecciarossa_500x500-x4CIi5s1zJghDPKWz6zh7JMQGgwr5E.jpg",
                  color: "from-red-600 to-red-400",
                },
                {
                  name: "Italo",
                  image:
                    "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/italo-Re7gKJRIQmzuklz6ZFtHFphwcC5lA7.png",
                  color: "from-purple-600 to-purple-400",
                },
                {
                  name: "Flixbus",
                  image:
                    "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/flix-3ggBvXxQ1W92xIb8IK0WBCC6E14ro6.png",
                  color: "from-green-600 to-green-400",
                },
              ].map((partner, index) => (
                <div key={index} className="group relative">
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${partner.color} rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}
                  ></div>
                  <div className="relative bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 group-hover:scale-105">
                    <div className="h-64 relative">
                      <Image
                        src={partner.image || "/placeholder.svg"}
                        alt={partner.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-7xl mx-auto">
            <FAQSection
              title="Domande Frequenti sulla Biglietteria"
              description="Trova le risposte alle domande più comuni sui nostri servizi di biglietteria."
              faqs={biglietterieFAQs}
            />
          </div>

          {/* Contact Section */}
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25"></div>
              <div className="relative bg-white rounded-xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Hai bisogno di assistenza?</h3>
                <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                  Contattaci per maggiori informazioni sui nostri servizi di biglietteria o per prenotare i tuoi
                  biglietti.
                </p>

                <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
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
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full transition-colors inline-flex items-center justify-center transform hover:scale-105 duration-300"
                  >
                    <Image src="/images/whatsapp-icon.png" alt="WhatsApp" width={24} height={24} className="mr-2" />
                    Contattaci su WhatsApp
                  </a>
                  <a
                    href="tel:+390810584542"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full transition-colors inline-flex items-center justify-center transform hover:scale-105 duration-300"
                  >
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
                      className="mr-2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Chiamaci
                  </a>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Orari del Servizio:</span> Lun-Ven: 9:00-13:20, 16:00-19:20 | Sab:
                    9:00-13:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
