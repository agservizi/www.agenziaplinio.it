import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search, FileText, Building, HelpCircle } from "lucide-react"
import FAQSection from "@/components/faq-section"
import VisureTool from "@/components/visure/visure-tool"

const visureFAQs = [
  {
    question: "Cosa sono le visure catastali?",
    answer:
      "Le visure catastali sono documenti ufficiali rilasciati dall'Agenzia delle Entrate che contengono informazioni su immobili (terreni e fabbricati) presenti nel territorio italiano, come dati identificativi, rendita catastale, consistenza e titolarità.",
  },
  {
    question: "A cosa serve una visura camerale?",
    answer:
      "La visura camerale è un documento ufficiale rilasciato dalla Camera di Commercio che contiene informazioni su un'impresa iscritta al Registro delle Imprese, come dati anagrafici, attività svolta, capitale sociale, cariche sociali e altro.",
  },
  {
    question: "Cosa contiene una visura CRIF?",
    answer:
      "La visura CRIF contiene informazioni sulla situazione creditizia di una persona, come finanziamenti in corso, pagamenti regolari o in ritardo, richieste di finanziamento effettuate e altri dati utili per valutare l'affidabilità creditizia.",
  },
  {
    question: "Quanto tempo ci vuole per ottenere una visura?",
    answer:
      "Per la maggior parte delle visure il servizio è immediato. Per visure più complesse o particolari potrebbe richiedere da 1 a 24 ore in base al tipo di documento richiesto.",
  },
]

export default function Visure() {
  return (
    <div className="pt-0 page-transition">
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
              <h1 className="text-4xl font-bold mb-6">Servizi di Visure</h1>
              <p className="text-xl max-w-3xl">
                Offriamo un servizio completo di visure catastali, camerali, CRIF e protestati, con rilascio immediato e
                assistenza professionale.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Search size={64} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            I Nostri Servizi di Visure
          </h2>

          {/* Servizi principali in grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Visure Catastali */}
            <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Visure Catastali</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Documenti ufficiali con informazioni su immobili presenti nel territorio italiano. Servizio rapido di
                richiesta e rilascio.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-gray-50 p-3 rounded-md text-sm hover:bg-gray-100 transition-colors">
                  <span className="font-bold block">Visura per Soggetto</span>
                  <span className="text-xs text-gray-500">Elenco immobili intestati</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-sm hover:bg-gray-100 transition-colors">
                  <span className="font-bold block">Visura per Immobile</span>
                  <span className="text-xs text-gray-500">Dati specifici immobile</span>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-md border-l-2 border-yellow-400 text-sm">
                <span className="font-bold flex items-center">
                  <HelpCircle size={14} className="mr-1 text-yellow-500" />
                  Documento d'identità valido richiesto
                </span>
              </div>
            </div>

            {/* Visure Camerali */}
            <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Visure Camerali</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Documenti ufficiali rilasciati dalla Camera di Commercio con informazioni sulle imprese iscritte al
                Registro.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-gray-50 p-3 rounded-md text-sm hover:bg-gray-100 transition-colors">
                  <span className="font-bold block">Visura Ordinaria</span>
                  <span className="text-xs text-gray-500">Dati aggiornati impresa</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-sm hover:bg-gray-100 transition-colors">
                  <span className="font-bold block">Visura Storica</span>
                  <span className="text-xs text-gray-500">Modifiche nel tempo</span>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-md border-l-2 border-yellow-400 text-sm">
                <span className="font-bold flex items-center">
                  <HelpCircle size={14} className="mr-1 text-yellow-500" />
                  Necessaria denominazione o P.IVA
                </span>
              </div>
            </div>

            {/* Visure CRIF */}
            <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Visure CRIF e Protestati</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Servizi per conoscere la propria situazione creditizia e verificare la presenza di protesti a carico.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-gray-50 p-3 rounded-md text-sm hover:bg-gray-100 transition-colors">
                  <span className="font-bold block">Visura CRIF</span>
                  <span className="text-xs text-gray-500">Situazione creditizia</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-sm hover:bg-gray-100 transition-colors">
                  <span className="font-bold block">Visura Protestati</span>
                  <span className="text-xs text-gray-500">Verifica protesti</span>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-md border-l-2 border-yellow-400 text-sm">
                <span className="font-bold flex items-center">
                  <HelpCircle size={14} className="mr-1 text-yellow-500" />
                  Documento d'identità del diretto interessato
                </span>
              </div>
            </div>
          </div>

          {/* Servizi dettagliati */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center">Servizi Dettagliati</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-primary/20">
                <h4 className="font-bold mb-2 text-primary">Planimetrie Catastali</h4>
                <p className="text-gray-600 text-sm">
                  Rappresentazione grafica della disposizione interna di un immobile.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-primary/20">
                <h4 className="font-bold mb-2 text-primary">Estratti di Mappa</h4>
                <p className="text-gray-600 text-sm">
                  Rappresentazione grafica della posizione di un immobile sul territorio.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-primary/20">
                <h4 className="font-bold mb-2 text-primary">Bilanci</h4>
                <p className="text-gray-600 text-sm">
                  Documenti contabili depositati da società di capitali presso la Camera di Commercio.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-primary/20">
                <h4 className="font-bold mb-2 text-primary">Atti Societari</h4>
                <p className="text-gray-600 text-sm">
                  Statuti, atti costitutivi e altri documenti depositati presso la Camera di Commercio.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-primary/20">
                <h4 className="font-bold mb-2 text-primary">Cancellazione Protesti</h4>
                <p className="text-gray-600 text-sm">
                  Assistenza nella procedura di cancellazione di protesti dal Registro Informatico.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-primary/20">
                <h4 className="font-bold mb-2 text-primary">Consulenza Creditizia</h4>
                <p className="text-gray-600 text-sm">
                  Analisi della situazione creditizia e consulenza per il miglioramento del proprio profilo.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-primary/20">
                <h4 className="font-bold mb-2 text-primary">Visura per Soggetto</h4>
                <p className="text-gray-600 text-sm">
                  Elenco degli immobili intestati a una persona fisica o giuridica.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-primary/20">
                <h4 className="font-bold mb-2 text-primary">Visura per Immobile</h4>
                <p className="text-gray-600 text-sm">
                  Informazioni su un immobile specifico identificato dai dati catastali.
                </p>
              </div>
            </div>
          </div>

          {/* Informazioni utili e contatti */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Orari del Servizio</h3>
              <p className="text-gray-600">
                <span className="block mb-1">Lun-Ven: 9:00-13:20, 16:00-19:20</span>
                <span className="block">Sab: 9:00-13:00</span>
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Documenti Necessari</h3>
              <p className="text-gray-600">
                Documento d'identità valido e informazioni specifiche in base al tipo di visura richiesta.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Vantaggi del Servizio</h3>
              <ul className="text-gray-600 space-y-1">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                  <span>Rilascio in 24h</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                  <span>Assistenza professionale</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                  <span>Consulenza personalizzata</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                  <span>Tariffe competitive</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tool Visure */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center">Richiedi una Visura Online</h3>
            <div className="relative">
              {/* Elementi decorativi */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>

              {/* Tool interattivo */}
              <VisureTool />
            </div>
          </div>

          {/* Contatti */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-xl text-white text-center mb-16">
            <h3 className="text-2xl font-bold mb-4">Hai bisogno di assistenza?</h3>
            <p className="mb-6">Contattaci per maggiori informazioni sui nostri servizi di visure.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/+393773798570?text=Salve%2C%20vorrei%20informazioni%20sui%20servizi%20di%20visure%20catastali%20e%20camerali.%20Grazie."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-6 rounded-xl transition-all inline-flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                <Image src="/images/whatsapp-icon.png" alt="WhatsApp" width={24} height={24} className="mr-2" />
                Contattaci su WhatsApp
              </a>
              <a
                href="tel:0810584542"
                className="bg-primary/20 hover:bg-primary/30 text-white font-medium py-3 px-6 rounded-xl transition-all inline-flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                Chiamaci
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <FAQSection
              title="Domande Frequenti sulle Visure"
              description="Trova le risposte alle domande più comuni sui nostri servizi di visure."
              faqs={visureFAQs}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
