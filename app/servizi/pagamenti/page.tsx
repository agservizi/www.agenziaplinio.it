"use client"
import { useState } from "react"
import type React from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, FileText, Landmark, Receipt, HelpCircle } from "lucide-react"
import FAQSection from "@/components/faq-section"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"

// Sostituisco il componente VerificaDropPoint con una versione che reindirizza al sito ufficiale

function VerificaDropPoint() {
  const [reference, setReference] = useState("")

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()

    if (!reference.trim()) return

    // Reindirizza al sito ufficiale di DropPoint con il codice già inserito
    window.open(`https://www.drop-point.store/verifica?code=${encodeURIComponent(reference)}`, "_blank")
  }

  return (
    <form onSubmit={handleVerify} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Inserisci il codice di riferimento"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-md transition-colors"
        >
          Verifica
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">La verifica verrà effettuata sul sito ufficiale di DropPoint</p>
    </form>
  )
}

// Rimuovo il Dialog e la logica di verifica locale poiché non sono più necessari

const pagamentiFAQs = [
  {
    question: "Quali tipi di bollettini posso pagare presso la vostra agenzia?",
    answer:
      "Presso la nostra agenzia è possibile pagare bollettini postali, MAV, RAV, bollette di utenze domestiche (luce, gas, acqua, telefono), bollo auto, tasse universitarie e molto altro.",
  },
  {
    question: "Posso pagare un F24?",
    answer:
      "Sì, offriamo il servizio di pagamento F24 per tasse, imposte e contributi. Possiamo anche aiutarti nella compilazione del modello.",
  },
  {
    question: "Quanto costa il servizio di pagamento bollettini?",
    answer:
      "Il costo del servizio varia in base al tipo di bollettino. Contattaci o vieni in agenzia per conoscere le tariffe specifiche.",
  },
  {
    question: "Posso pagare con carta di credito?",
    answer: "Sì, accettiamo pagamenti con carte di credito, bancomat, carte prepagate e contanti.",
  },
  {
    question: "Quali sono le tariffe per i servizi di pagamento?",
    answer:
      "Ecco le nostre tariffe per i principali servizi di pagamento:\n\n• Bollettini: 1,50€ (per gli over 70: 1,20€)\n• Bonifici: 1,80€\n• F24: 1,50€",
  },
]

export default function Pagamenti() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
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
              <h1 className="text-4xl font-bold mb-6">Servizi di Pagamento</h1>
              <p className="text-xl max-w-3xl">
                Offriamo una vasta gamma di servizi di pagamento per soddisfare tutte le tue esigenze, dai bollettini ai
                bonifici, dai F24 ai pagamenti PagoPA.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <CreditCard size={64} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Extreme Interactive Version */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <div className="relative mb-16">
            <h2 className="text-5xl font-black mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              I Nostri Servizi di Pagamento
            </h2>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full"></div>
          </div>

          {/* Interactive Service Cards */}
          <div className="space-y-16">
            {/* Bollettini Card */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-b-4 border-primary">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 flex-shrink-0">
                  <Receipt className="text-white w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4 flex items-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                      Bollettini
                    </span>
                    <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Da €1,50
                    </span>
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Effettuiamo pagamenti di bollettini postali, bollette di utenze domestiche e altri tipi di
                    bollettini in modo rapido e sicuro.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-300 cursor-pointer">
                      <h4 className="font-bold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        Bollettini Postali
                      </h4>
                      <p className="text-gray-600 text-sm">Pagamento di bollettini postali premarcati e bianchi.</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-300 cursor-pointer">
                      <h4 className="font-bold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        Bollette Utenze
                      </h4>
                      <p className="text-gray-600 text-sm">Pagamento di bollette di luce, gas, acqua, telefono.</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-300 cursor-pointer">
                      <h4 className="font-bold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        MAV/RAV
                      </h4>
                      <p className="text-gray-600 text-sm">Pagamento di bollettini MAV e RAV.</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-300 cursor-pointer">
                      <h4 className="font-bold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        Bollo Auto
                      </h4>
                      <p className="text-gray-600 text-sm">Pagamento del bollo auto e moto.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border-l-4 border-yellow-400 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full opacity-20 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                    <h4 className="font-bold mb-2 flex items-center relative z-10">
                      <HelpCircle size={20} className="mr-2 text-yellow-500" />
                      Cosa serve
                    </h4>
                    <p className="text-gray-700 relative z-10">
                      Per pagare un bollettino è sufficiente presentare il bollettino stesso e un documento di identità
                      valido.
                    </p>
                    <button className="mt-4 bg-white text-primary font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center relative z-10">
                      <span>Scopri di più</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* F24 Card */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-b-4 border-purple-600">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 flex-shrink-0">
                  <FileText className="text-white w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4 flex items-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-primary">
                      F24
                    </span>
                    <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600">
                      €1,50
                    </span>
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Assistenza nella compilazione e nel pagamento di modelli F24 per tasse, imposte e contributi.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-300 cursor-pointer">
                      <h4 className="font-bold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                        F24 Semplificato
                      </h4>
                      <p className="text-gray-600 text-sm">Per il pagamento di tributi e contributi.</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-300 cursor-pointer">
                      <h4 className="font-bold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                        F24 Ordinario
                      </h4>
                      <p className="text-gray-600 text-sm">Per il pagamento di imposte, tasse e contributi.</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-300 cursor-pointer">
                      <h4 className="font-bold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                        F24 Elementi Identificativi
                      </h4>
                      <p className="text-gray-600 text-sm">Per il pagamento di tributi con elementi identificativi.</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-300 cursor-pointer">
                      <h4 className="font-bold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                        F24 Accise
                      </h4>
                      <p className="text-gray-600 text-sm">Per il pagamento di accise e imposte di consumo.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border-l-4 border-purple-400 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full opacity-20 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                    <h4 className="font-bold mb-2 flex items-center relative z-10">
                      <HelpCircle size={20} className="mr-2 text-purple-500" />
                      Cosa serve
                    </h4>
                    <p className="text-gray-700 relative z-10">
                      Per pagare un F24 è necessario presentare il modello compilato o i dati necessari per la
                      compilazione e un documento di identità valido.
                    </p>
                    <button className="mt-4 bg-white text-purple-600 font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center relative z-10">
                      <span>Scopri di più</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bonifici Card */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-b-4 border-teal-500">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-300 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 flex-shrink-0">
                  <Landmark className="text-white w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4 flex items-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-500">
                      Bonifici
                    </span>
                    <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-600">
                      €1,80
                    </span>
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Effettuiamo bonifici nazionali e internazionali tramite il servizio DropPoint in modo sicuro e
                    veloce.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-teal-300 hover:bg-teal-50 transition-colors duration-300 cursor-pointer">
                      <h4 className="font-bold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                        Bonifici SEPA
                      </h4>
                      <p className="text-gray-600 text-sm">Per trasferimenti di denaro all'interno dell'area SEPA.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-xl border-l-4 border-teal-400 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200 rounded-full opacity-20 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                    <h4 className="font-bold mb-2 flex items-center relative z-10">
                      <HelpCircle size={20} className="mr-2 text-teal-500" />
                      Cosa serve
                    </h4>
                    <p className="text-gray-700 relative z-10">
                      Per effettuare un bonifico è necessario presentare un documento di identità valido e conoscere
                      l'IBAN del beneficiario e la causale del bonifico.
                    </p>
                    <button className="mt-4 bg-white text-teal-600 font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center relative z-10">
                      <span>Scopri di più</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verifica Pagamenti DropPoint */}
          <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6 flex items-center">
                <Receipt className="mr-3 text-primary" size={28} />
                Verifica Pagamenti DropPoint
              </h3>
              <p className="mb-6 text-gray-300 max-w-3xl">
                Hai effettuato un pagamento tramite DropPoint e vuoi verificarne lo stato? Inserisci il codice di
                riferimento qui sotto:
              </p>
              <div className="max-w-xl">
                <VerificaDropPoint />
              </div>
            </div>
          </div>

          {/* Guida Rapida ai Pagamenti */}
          <div className="mt-16 bg-gradient-to-br from-primary/10 to-purple-600/10 p-8 rounded-2xl border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-xl"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Guida Rapida ai Pagamenti
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h4 className="font-bold text-xl mb-4 flex items-center text-primary">
                    <Receipt className="mr-3" size={24} />
                    Cosa Portare Con Te
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      </span>
                      <span>Documento d'identità valido</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      </span>
                      <span>Bollettino/F24 da pagare</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      </span>
                      <span>Codice fiscale</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      </span>
                      <span>Per bonifici: IBAN del beneficiario</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h4 className="font-bold text-xl mb-4 flex items-center text-purple-600">
                    <HelpCircle className="mr-3" size={24} />
                    Promemoria Scadenze
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      </span>
                      <span>Bollo Auto: entro l'ultimo giorno del mese successivo alla scadenza</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      </span>
                      <span>F24: il 16 del mese per la maggior parte dei tributi</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      </span>
                      <span>Bollette: verificare la data di scadenza sul bollettino</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h4 className="font-bold text-xl mb-4 flex items-center text-teal-600">
                    <CreditCard className="mr-3" size={24} />
                    Informazioni Utili
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-bold mb-2 text-gray-800">Orari del Servizio</h5>
                      <p className="text-gray-600">
                        Lun-Ven: 9:00-13:20, 16:00-19:20
                        <br />
                        Sab: 9:00-13:00
                      </p>
                    </div>
                    <div>
                      <h5 className="font-bold mb-2 text-gray-800">Metodi di Pagamento Accettati</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Contanti</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Bancomat</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Carte di Credito</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Carte Prepagate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
                <h4 className="font-bold text-xl mb-6 text-center">Servizi Rapidi</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <button
                    onClick={() => {
                      setActiveModal("bollettini")
                    }}
                    className="group bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Receipt className="text-primary" size={24} />
                    </div>
                    <span className="block font-medium text-gray-800">Bollettini</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal("f24")
                    }}
                    className="group bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <FileText className="text-purple-600" size={24} />
                    </div>
                    <span className="block font-medium text-gray-800">F24</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal("mav")
                    }}
                    className="group bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-12 h-12 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-amber-600"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"></path>
                        <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"></path>
                        <path d="M4 12h16"></path>
                        <path d="M9 12v4"></path>
                        <path d="M15 12v4"></path>
                        <path d="M13 8V4"></path>
                      </svg>
                    </div>
                    <span className="block font-medium text-gray-800">MAV/RAV</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal("bollo")
                    }}
                    className="group bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-12 h-12 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-teal-600"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                        <path d="M12 18V6"></path>
                      </svg>
                    </div>
                    <span className="block font-medium text-gray-800">Bollo Auto</span>
                  </button>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-yellow-100 to-amber-100 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 rounded-full opacity-20 -mr-10 -mt-10"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <HelpCircle size={28} className="text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Lo sapevi che...</h4>
                    <p className="text-gray-700">
                      Pagando i bollettini presso la nostra agenzia eviti le lunghe code agli sportelli e hai la
                      certezza che il pagamento venga registrato immediatamente. Inoltre, conserviamo una copia della
                      ricevuta per 5 anni!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3">
                    <h4 className="font-bold text-2xl mb-4">Hai bisogno di assistenza?</h4>
                    <p className="text-gray-600 mb-6">
                      Contattaci per maggiori informazioni sui nostri servizi di pagamento. Siamo qui per aiutarti!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="https://wa.me/393773798570?text=Vorrei%20informazioni%20sui%20servizi%20di%20pagamento"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
                      >
                        <Image
                          src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Whatsapp_icon-icons.com_66931%20%281%29-3ge8nOrwR41gROIM2LrKPJOYueyxzj.png"
                          alt="WhatsApp"
                          width={24}
                          height={24}
                          className="mr-3"
                        />
                        Chiedi info su WhatsApp
                      </a>
                      <a
                        href="tel:+390810584542"
                        className="bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-3"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        Chiamaci
                      </a>
                    </div>
                  </div>
                  <div className="md:w-2/3 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h5 className="font-bold mb-2 text-primary">Vantaggi del Servizio</h5>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                              <span className="w-2 h-2 bg-primary rounded-full"></span>
                            </span>
                            <span>Pagamenti rapidi e sicuri</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                              <span className="w-2 h-2 bg-primary rounded-full"></span>
                            </span>
                            <span>Assistenza personalizzata</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                              <span className="w-2 h-2 bg-primary rounded-full"></span>
                            </span>
                            <span>Nessuna fila agli sportelli</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h5 className="font-bold mb-2 text-purple-600">Tariffe</h5>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                            </span>
                            <span>Bollettini: 1,50€ (over 70: 1,20€)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                            </span>
                            <span>Bonifici: 1,80€</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                            </span>
                            <span>F24: 1,50€</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <FAQSection
              title="Domande Frequenti sui Pagamenti"
              description="Trova le risposte alle domande più comuni sui nostri servizi di pagamento."
              faqs={pagamentiFAQs}
            />
          </div>
        </div>
      </section>
      {/* Modals for quick services */}
      <Dialog open={activeModal === "bollettini"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bollettini</DialogTitle>
            <DialogDescription>Informazioni sul servizio di pagamento bollettini</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>Presso la nostra agenzia è possibile pagare tutti i tipi di bollettini:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Bollettini postali (premarcati e bianchi)</li>
              <li>Bollette di utenze domestiche (luce, gas, acqua, telefono)</li>
              <li>Bollettini MAV e RAV</li>
              <li>PagoPA</li>
            </ul>
            <div className="bg-yellow-50 p-3 rounded-md">
              <p className="text-sm font-medium">Tariffa: 1,50€ (per gli over 70: 1,20€)</p>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={() => setActiveModal(null)}
            >
              Chiudi
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "f24"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>F24</DialogTitle>
            <DialogDescription>Informazioni sul servizio di pagamento F24</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>Offriamo assistenza nella compilazione e nel pagamento di modelli F24:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>F24 Semplificato</li>
              <li>F24 Ordinario</li>
              <li>F24 Elementi Identificativi</li>
              <li>F24 Accise</li>
            </ul>
            <div className="bg-yellow-50 p-3 rounded-md">
              <p className="text-sm font-medium">Tariffa: 1,50€</p>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={() => setActiveModal(null)}
            >
              Chiudi
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "mav"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>MAV/RAV</DialogTitle>
            <DialogDescription>Informazioni sul servizio di pagamento MAV e RAV</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>Presso la nostra agenzia è possibile pagare bollettini MAV e RAV:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>MAV (Pagamento Mediante Avviso)</li>
              <li>RAV (Ruoli Mediante Avviso)</li>
            </ul>
            <div className="bg-yellow-50 p-3 rounded-md">
              <p className="text-sm font-medium">Tariffa: 1,50€ (per gli over 70: 1,20€)</p>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={() => setActiveModal(null)}
            >
              Chiudi
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "bollo"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bollo Auto</DialogTitle>
            <DialogDescription>Informazioni sul servizio di pagamento del bollo auto</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>Offriamo il servizio di pagamento del bollo auto e moto:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Pagamento bollo auto</li>
              <li>Pagamento bollo moto</li>
              <li>Verifica importi e scadenze</li>
            </ul>
            <div className="bg-yellow-50 p-3 rounded-md">
              <p className="text-sm font-medium">Tariffa: 1,50€</p>
            </div>
            <p className="text-sm">
              Ricorda: il bollo auto va pagato entro l'ultimo giorno del mese successivo alla scadenza.
            </p>
          </div>
          <DialogFooter className="sm:justify-start">
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={() => setActiveModal(null)}
            >
              Chiudi
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
