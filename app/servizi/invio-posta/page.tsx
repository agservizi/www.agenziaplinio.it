import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, FileText, HelpCircle, ArrowRight } from "lucide-react"
import FAQSection from "@/components/faq-section"
import TrackingCard from "@/components/tracking-card"

const invioPostaFAQs = [
  {
    question: "Quali tipi di posta posso inviare?",
    answer:
      "Presso la nostra agenzia è possibile inviare lettere, raccomandate, raccomandate A/R, posta prioritaria, telegrammi e posta assicurata.",
  },
  {
    question: "Quanto costa inviare una raccomandata?",
    answer:
      "Il costo di invio di una raccomandata dipende dal peso e dalla destinazione. Contattaci o vieni in agenzia per conoscere le tariffe specifiche.",
  },
  {
    question: "Posso tracciare la mia raccomandata?",
    answer:
      "Sì, per tutte le raccomandate forniamo un codice di tracciamento che permette di seguire il percorso della lettera fino alla consegna.",
  },
  {
    question: "Quali sono i tempi di consegna della posta?",
    answer:
      "I tempi di consegna variano in base al tipo di invio: per la posta prioritaria 1-3 giorni lavorativi, per le raccomandate 3-5 giorni lavorativi, per i telegrammi entro 24 ore.",
  },
]

export default function InvioPosta() {
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
              <h1 className="text-4xl font-bold mb-6">Servizi di Invio Posta</h1>
              <p className="text-xl max-w-3xl">
                Offriamo servizi completi di invio posta, dalle lettere semplici alle raccomandate, con tracciabilità e
                garanzia di consegna.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Mail size={64} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Design Estremo e Interattivo */}
      <section className="relative py-16 overflow-hidden">
        {/* Background con onde animate */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10 overflow-hidden">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#4f46e5"
              fillOpacity="0.05"
              d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-pulse"
              style={{ animationDuration: "10s" }}
            ></path>
          </svg>
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#4f46e5"
              fillOpacity="0.03"
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,144C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-pulse"
              style={{ animationDuration: "15s" }}
            ></path>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 pb-2">
            I Nostri Servizi di Invio Posta
          </h2>

          {/* Servizi in Card Interattive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Card 1 - Lettere e Posta Prioritaria */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Lettere e Posta Prioritaria</h3>
                <p className="text-gray-600 mb-6">
                  Inviamo lettere e posta prioritaria in Italia e all'estero, con tempi di consegna rapidi e tariffe
                  competitive.
                </p>

                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors duration-300">
                    <h4 className="font-bold mb-2">Posta Ordinaria</h4>
                    <p className="text-gray-600 text-sm">Invio di lettere e cartoline in Italia e all'estero.</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors duration-300">
                    <h4 className="font-bold mb-2">Posta Prioritaria</h4>
                    <p className="text-gray-600 text-sm">
                      Invio di lettere con consegna prioritaria in Italia e all'estero.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400 hover:border-yellow-500 transition-colors duration-300">
                  <h4 className="font-bold mb-2 flex items-center">
                    <HelpCircle size={16} className="mr-2 text-yellow-500" />
                    Cosa serve
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Per inviare una lettera è sufficiente conoscere l'indirizzo completo del destinatario. Offriamo
                    anche servizio di scrittura e imbustamento.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto">
                <a href="#" className="text-primary font-medium flex items-center justify-center group-hover:underline">
                  Richiedi informazioni
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Card 2 - Raccomandate */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="text-blue-500 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Raccomandate</h3>
                <p className="text-gray-600 mb-6">
                  Inviamo raccomandate semplici e con avviso di ricevimento (A/R) in Italia e all'estero, con
                  tracciabilità completa.
                </p>

                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors duration-300">
                    <h4 className="font-bold mb-2">Raccomandata Semplice</h4>
                    <p className="text-gray-600 text-sm">Invio di lettere con prova di spedizione e tracciabilità.</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors duration-300">
                    <h4 className="font-bold mb-2">Raccomandata A/R</h4>
                    <p className="text-gray-600 text-sm">
                      Invio di lettere con prova di spedizione, tracciabilità e avviso di ricevimento firmato dal
                      destinatario.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400 hover:border-yellow-500 transition-colors duration-300">
                  <h4 className="font-bold mb-2 flex items-center">
                    <HelpCircle size={16} className="mr-2 text-yellow-500" />
                    Cosa serve
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Per inviare una raccomandata è necessario conoscere l'indirizzo completo del destinatario e
                    presentare un documento d'identità valido.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto">
                <a
                  href="#"
                  className="text-blue-500 font-medium flex items-center justify-center group-hover:underline"
                >
                  Richiedi informazioni
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Card 3 - Tracking Poste Italiane */}
            <TrackingCard />
          </div>

          {/* Informazioni Utili - Design Interattivo */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl p-8 mb-16 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">Informazioni Utili</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <h4 className="font-bold mb-3 text-primary">Orari del Servizio</h4>
                <p className="text-gray-600">
                  Lun-Ven: 9:00-13:20, 16:00-19:20
                  <br />
                  Sab: 9:00-13:00
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <h4 className="font-bold mb-3 text-primary">Metodi di Pagamento</h4>
                <p className="text-gray-600">Contanti, Bancomat, Carte di Credito, Carte Prepagate.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <h4 className="font-bold mb-3 text-primary">Contattaci</h4>
                <div className="space-y-2">
                  <a
                    href="https://wa.me/+390811234567?text=Salve%2C%20vorrei%20informazioni%20sui%20servizi%20di%20invio%20posta.%20Grazie."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors inline-block w-full text-center flex items-center justify-center"
                  >
                    <Image src="/images/whatsapp-icon.png" alt="WhatsApp" width={20} height={20} className="mr-2" />
                    Scrivici su WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-bold mb-4 text-primary">Vantaggi del Servizio</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Invio rapido e sicuro</h5>
                    <p className="text-gray-600 text-sm">
                      Garantiamo tempi di consegna rapidi e sicurezza nella gestione.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Tracciabilità completa</h5>
                    <p className="text-gray-600 text-sm">Monitora lo stato della tua spedizione in tempo reale.</p>
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Assistenza nella compilazione</h5>
                    <p className="text-gray-600 text-sm">
                      Ti aiutiamo a compilare correttamente tutti i moduli necessari.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Tariffe competitive</h5>
                    <p className="text-gray-600 text-sm">
                      Offriamo prezzi vantaggiosi per tutti i nostri servizi di invio posta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loghi dei Partner - Design Interattivo */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">I Nostri Partner</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <Image
                  src="/loghi/posta/poste-italiane.png"
                  alt="Poste Italiane"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain h-24 w-full p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <Image
                  src="/loghi/posta/raccomandata.png"
                  alt="Raccomandata"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain h-24 w-full p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <Image
                  src="/loghi/posta/posta-prioritaria.png"
                  alt="Posta Prioritaria"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain h-24 w-full p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <Image
                  src="/loghi/posta/telegramma.png"
                  alt="Telegramma"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain h-24 w-full p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* FAQ - Design Interattivo */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8 shadow-lg">
            <FAQSection
              title="Domande Frequenti sull'Invio Posta"
              description="Trova le risposte alle domande più comuni sui nostri servizi di invio posta."
              faqs={invioPostaFAQs}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
