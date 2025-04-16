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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-8">I Nostri Servizi di Pagamento</h2>

              <div className="space-y-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Receipt className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Bollettini</h3>
                      <p className="text-gray-600 mb-6">
                        Effettuiamo pagamenti di bollettini postali, bollette di utenze domestiche e altri tipi di
                        bollettini in modo rapido e sicuro.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Bollettini Postali</h4>
                          <p className="text-gray-600 text-sm">Pagamento di bollettini postali premarcati e bianchi.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Bollette Utenze</h4>
                          <p className="text-gray-600 text-sm">Pagamento di bollette di luce, gas, acqua, telefono.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">MAV/RAV</h4>
                          <p className="text-gray-600 text-sm">Pagamento di bollettini MAV e RAV.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Bollo Auto</h4>
                          <p className="text-gray-600 text-sm">Pagamento del bollo auto e moto.</p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per pagare un bollettino è sufficiente presentare il bollettino stesso e un documento di
                          identità valido.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FileText className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">F24</h3>
                      <p className="text-gray-600 mb-6">
                        Assistenza nella compilazione e nel pagamento di modelli F24 per tasse, imposte e contributi.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">F24 Semplificato</h4>
                          <p className="text-gray-600 text-sm">Per il pagamento di tributi e contributi.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">F24 Ordinario</h4>
                          <p className="text-gray-600 text-sm">Per il pagamento di imposte, tasse e contributi.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">F24 Elementi Identificativi</h4>
                          <p className="text-gray-600 text-sm">
                            Per il pagamento di tributi con elementi identificativi.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">F24 Accise</h4>
                          <p className="text-gray-600 text-sm">Per il pagamento di accise e imposte di consumo.</p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per pagare un F24 è necessario presentare il modello compilato o i dati necessari per la
                          compilazione e un documento di identità valido.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Landmark className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Bonifici</h3>
                      <p className="text-gray-600 mb-6">
                        Effettuiamo bonifici nazionali e internazionali tramite il servizio DropPoint in modo sicuro e
                        veloce.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Bonifici SEPA</h4>
                          <p className="text-gray-600 text-sm">
                            Per trasferimenti di denaro all'interno dell'area SEPA.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per effettuare un bonifico è necessario presentare un documento di identità valido e conoscere
                          l'IBAN del beneficiario e la causale del bonifico.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verifica Pagamenti DropPoint */}
              {/* Guida Rapida ai Pagamenti */}
              <div className="mt-16 bg-gradient-to-r from-primary/20 to-primary/5 p-6 rounded-lg border-l-4 border-primary">
                <h3 className="text-2xl font-bold mb-4">Guida Rapida ai Pagamenti</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center">
                      <Receipt className="mr-2 text-primary" size={20} />
                      Cosa Portare Con Te
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                        <span>Documento d'identità valido</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                        <span>Bollettino/F24 da pagare</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                        <span>Codice fiscale</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                        <span>Per bonifici: IBAN del beneficiario</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center">
                      <HelpCircle className="mr-2 text-primary" size={20} />
                      Promemoria Scadenze
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                        <span>Bollo Auto: entro l'ultimo giorno del mese successivo alla scadenza</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                        <span>F24: il 16 del mese per la maggior parte dei tributi</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                        <span>Bollette: verificare la data di scadenza sul bollettino</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/60 rounded-md">
                  <h4 className="font-bold text-lg mb-3 flex items-center">
                    <CreditCard className="mr-2 text-primary" size={20} />
                    Servizi Rapidi
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => {
                        setActiveModal("bollettini")
                      }}
                      className="bg-white p-3 rounded-md shadow-sm text-center hover:shadow-md transition-shadow"
                    >
                      <span className="block font-medium">Bollettini</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveModal("f24")
                      }}
                      className="bg-white p-3 rounded-md shadow-sm text-center hover:shadow-md transition-shadow"
                    >
                      <span className="block font-medium">F24</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveModal("mav")
                      }}
                      className="bg-white p-3 rounded-md shadow-sm text-center hover:shadow-md transition-shadow"
                    >
                      <span className="block font-medium">MAV/RAV</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveModal("bollo")
                      }}
                      className="bg-white p-3 rounded-md shadow-sm text-center hover:shadow-md transition-shadow"
                    >
                      <span className="block font-medium">Bollo Auto</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                  <h4 className="font-bold mb-2 flex items-center">
                    <HelpCircle size={16} className="mr-2 text-yellow-500" />
                    Lo sapevi che...
                  </h4>
                  <p className="text-gray-600">
                    Pagando i bollettini presso la nostra agenzia eviti le lunghe code agli sportelli e hai la certezza
                    che il pagamento venga registrato immediatamente. Inoltre, conserviamo una copia della ricevuta per
                    5 anni!
                  </p>
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

            <div className="lg:w-1/3">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-bold mb-4">Informazioni Utili</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-2">Orari del Servizio</h4>
                    <p className="text-gray-600">
                      Lun-Ven: 9:00-13:20, 16:00-19:20
                      <br />
                      Sab: 9:00-13:00
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2">Documenti Necessari</h4>
                    <p className="text-gray-600">
                      Per effettuare pagamenti è necessario presentare un documento di identità valido.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2">Metodi di Pagamento Accettati</h4>
                    <p className="text-gray-600">Contanti, Bancomat, Carte di Credito, Carte Prepagate.</p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-bold mb-2 text-primary">Vantaggi del Servizio</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Pagamenti rapidi e sicuri</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Assistenza personalizzata</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Nessuna fila agli sportelli</span>
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
                      Contattaci per maggiori informazioni sui nostri servizi di pagamento.
                    </p>
                    <div className="space-y-2">
                      <a
                        href="https://wa.me/393773798570?text=Vorrei%20informazioni%20sui%20servizi%20di%20pagamento"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors inline-block w-full text-center flex items-center justify-center"
                      >
                        <Image
                          src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Whatsapp_icon-icons.com_66931%20%281%29-3ge8nOrwR41gROIM2LrKPJOYueyxzj.png"
                          alt="WhatsApp"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        Chiedi info su WhatsApp
                      </a>
                      <a
                        href="tel:+390810584542"
                        className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors inline-block w-full text-center"
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
