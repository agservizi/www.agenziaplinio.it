// Modifichiamo i container nella home page per garantire padding simmetrici

"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CreditCard, Truck, FileText, Shield, Smartphone, Users } from "lucide-react"
import Testimonials from "@/components/testimonials"
import PromoIliadSection from "@/components/promo-iliad-section"
import Breadcrumbs from "@/components/breadcrumbs"

const featuredServices = [
  {
    id: "pagamenti",
    storageKey: "service-image-pagamenti",
    title: "Pagamenti",
    description: "Bollettini, F24, PagoPA, MAV/RAV, Bonifici con DropPoint.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743606275426-pagamenti-uUXVejJrRwBKjHfIa5fw0z8o4HnnE5",
    icon: <CreditCard className="text-primary" size={24} />,
  },
  {
    id: "spedizioni",
    storageKey: "service-image-spedizioni",
    title: "Spedizioni",
    description: "Spedizioni nazionali e internazionali con BRT, Poste Italiane, TNT/Fedex.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743606726182-spedizioni-6pMB0QwUjVAFCDzJfVXcRULJDNawR8",
    icon: <Truck className="text-primary" size={24} />,
  },
  {
    id: "trust-provider",
    storageKey: "service-image-trust-provider",
    title: "Attivazioni Digitali",
    description: "SPID, PEC, Firma Digitale (Namirial) e altri servizi digitali.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743606783124-trust-provider-2NERtQT5Xys9yJdvpkNnLnkBlh3dBp",
    icon: <FileText className="text-primary" size={24} />,
  },
]

const homeFAQs = [
  {
    question: "Quali sono gli orari di apertura dell'agenzia?",
    answer:
      "Siamo aperti dal lunedì al venerdì dalle 9:00 alle 13:00 e dalle 15:00 alle 19:00. Il sabato siamo aperti dalle 9:00 alle 13:00. Domenica chiuso.",
  },
  {
    question: "Quali documenti servono per attivare lo SPID?",
    answer:
      "Per attivare lo SPID è necessario presentarsi con un documento d'identità valido (carta d'identità, passaporto o patente), la tessera sanitaria, un indirizzo email personale e un numero di cellulare.",
  },
  {
    question: "Quanto costa spedire un pacco in Italia?",
    answer:
      "Il costo di spedizione di un pacco in Italia dipende dal peso, dalle dimensioni e dalla destinazione. Contattaci o vieni in agenzia per un preventivo personalizzato.",
  },
  {
    question: "Posso pagare con carta di credito?",
    answer: "Sì, accettiamo pagamenti con carte di credito, bancomat, carte prepagate e contanti.",
  },
]

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  return (
    <div className="page-transition">
      <Breadcrumbs />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/background-z9isp6XJC1MwADytNLlTxLWI9JQNse"
            alt="AG Servizi"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/70"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tutti i servizi di cui hai bisogno in un unico posto
            </h1>
            <p className="text-xl mb-8">
              Siamo la tua agenzia di fiducia a Castellammare di Stabia per pagamenti, spedizioni, attivazioni digitali
              e molto altro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/servizi"
                className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center"
              >
                Scopri i nostri servizi
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                href="/contatti"
                className="bg-white hover:bg-gray-100 text-primary font-medium py-3 px-6 rounded-md transition-colors"
              >
                Contattaci
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Box Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            <div className="relative group">
              <Link
                href="/servizi/pagamenti"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <CreditCard className="text-primary" size={28} />
                </div>
                <span className="font-medium">Pagamenti</span>
              </Link>
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
                <p>Paga bollettini, F24, PagoPA, MAV/RAV e effettua bonifici con DropPoint.</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/servizi/spedizioni"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Truck className="text-primary" size={28} />
                </div>
                <span className="font-medium">Spedizioni</span>
              </Link>
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
                <p>Spedisci pacchi e documenti in Italia e all'estero con BRT, Poste Italiane, TNT/Fedex.</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/servizi/trust-provider"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Shield className="text-primary" size={28} />
                </div>
                <span className="font-medium">Trust Provider</span>
              </Link>
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
                <p>Attiva SPID, PEC, Firma Digitale e altri servizi digitali certificati Namirial.</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/servizi/telefonia-luce-gas"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Smartphone className="text-primary" size={28} />
                </div>
                <span className="font-medium">Telefonia e Utenze</span>
              </Link>
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
                <p>Attiva contratti per telefonia, internet, luce e gas con i migliori operatori sul mercato.</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/servizi/caf-patronato"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Users className="text-primary" size={28} />
                </div>
                <span className="font-medium">CAF e Patronato</span>
              </Link>
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
                <p>Assistenza per dichiarazioni dei redditi, ISEE, pratiche pensionistiche e altri servizi fiscali.</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <Image
                src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/team-image-1743602203331-AwX9JqAXe5LfABL29GZ034KwSvyQTn.jpg"
                alt="AG Servizi Team"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Chi Siamo</h2>
              <p className="text-gray-600 mb-4">
                AG SERVIZI è un'agenzia multiservizi situata nel cuore di Castellammare di Stabia, in Via Plinio il
                Vecchio 72. Da anni offriamo ai nostri clienti una vasta gamma di servizi, dalle pratiche burocratiche
                alle spedizioni, dai pagamenti alle attivazioni digitali.
              </p>
              <p className="text-gray-600 mb-6">
                La nostra missione è semplificare la vita quotidiana dei nostri clienti, offrendo soluzioni rapide ed
                efficienti per tutte le loro esigenze in un unico punto di riferimento.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-bold mb-2 text-primary">Professionalità</h3>
                  <p className="text-gray-600 text-sm">
                    Il nostro team è formato da professionisti qualificati, costantemente aggiornati sulle normative e
                    le procedure.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-bold mb-2 text-primary">Affidabilità</h3>
                  <p className="text-gray-600 text-sm">
                    Manteniamo le promesse e rispettiamo gli impegni presi con i nostri clienti, garantendo un servizio
                    puntuale e preciso.
                  </p>
                </div>
              </div>
              <Link
                href="/chi-siamo"
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors"
              >
                Scopri di più su di noi
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">I Nostri Servizi Principali</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Offriamo una vasta gamma di servizi per soddisfare tutte le tue esigenze quotidiane. Ecco alcuni dei
              nostri servizi più richiesti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden service-card">
                <div className="h-48 bg-primary/10 flex items-center justify-center relative">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">{service.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    href={`/servizi/${service.id}`}
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors"
                  >
                    Scopri di più
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/servizi"
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center"
            >
              Vedi tutti i servizi
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Promozione Iliad invece delle FAQ nella home */}
      <PromoIliadSection />

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Hai bisogno di assistenza?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Vieni a trovarci nella nostra sede di Castellammare di Stabia o contattaci per maggiori informazioni sui
            nostri servizi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contatti"
              className="bg-white hover:bg-gray-100 text-primary font-medium py-3 px-8 rounded-md transition-colors inline-flex items-center justify-center"
            >
              Contattaci
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link
              href="/dove-siamo"
              className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-8 rounded-md transition-colors inline-flex items-center justify-center"
            >
              Come raggiungerci
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
