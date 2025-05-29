import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, FileText, Send } from "lucide-react"
import FAQSection from "@/components/faq-section"

const serviziPostaliFAQs = [
  {
    question: "Posso inviare una PEC dalla vostra agenzia?",
    answer:
      "Sì, offriamo il servizio di invio PEC per i clienti che non dispongono di un proprio indirizzo PEC o che necessitano di assistenza nell'invio.",
  },
  {
    question: "Quanto costa inviare un fax?",
    answer:
      "Il costo di invio di un fax dipende dal numero di pagine e dalla destinazione (nazionale o internazionale). Contattaci per conoscere le tariffe specifiche.",
  },
  {
    question: "Posso ricevere un fax presso la vostra agenzia?",
    answer:
      "Sì, offriamo il servizio di ricezione fax. Ti avviseremo quando riceverai un fax e potrai passare a ritirarlo in agenzia.",
  },
  {
    question: "È possibile scansionare documenti?",
    answer:
      "Sì, offriamo servizi di scansione documenti con possibilità di invio via email o salvataggio su supporto digitale.",
  },
]

export default function ServiziPostali() {
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
              <h1 className="text-4xl font-bold mb-6">Invii Posta Telematica</h1>
              <p className="text-xl max-w-3xl">
                Offriamo una gamma completa di servizi postali digitali, dall'invio di email e PEC, per soddisfare tutte
                le tue esigenze di comunicazione.
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

      {/* Main Content */}
      <section className="bg-gray-50 py-16">
        {/* Content Container */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">
                I Nostri Servizi Postali
              </h2>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"></div>
            </div>

            {/* Interactive Service Cards */}
            <div className="space-y-16 mb-20">
              {/* Email Card */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-b-4 border-blue-500">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 flex-shrink-0">
                    <Mail className="text-white" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4 flex items-center">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Email
                      </span>
                      <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Servizio Base
                      </span>
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      Offriamo servizi di invio email per chi non dispone di un proprio indirizzo email o necessita di
                      assistenza nell'invio. Possiamo aiutarti a creare, formattare e inviare email a uno o più
                      destinatari.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-300 cursor-pointer">
                        <h4 className="font-bold mb-2 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Invio Email
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Assistenza nella creazione e nell'invio di email a uno o più destinatari.
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-300 cursor-pointer">
                        <h4 className="font-bold mb-2 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Allegati
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Possibilità di allegare documenti, immagini e altri file alle email.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-400 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full opacity-20 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                      <h4 className="font-bold mb-2 flex items-center relative z-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Cosa serve
                      </h4>
                      <p className="text-gray-700 relative z-10">
                        Per inviare un'email è sufficiente conoscere l'indirizzo email del destinatario e il contenuto
                        del messaggio. Per allegare file, è necessario portarli su supporto digitale o stamparli per la
                        scansione.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PEC Card */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-b-4 border-indigo-600">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 flex-shrink-0">
                    <FileText className="text-white" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4 flex items-center">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        PEC
                      </span>
                      <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        Valore Legale
                      </span>
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      Offriamo servizi di invio Posta Elettronica Certificata (PEC) per comunicazioni ufficiali con
                      valore legale. La PEC garantisce l'invio e la ricezione dei messaggi con lo stesso valore legale
                      di una raccomandata con ricevuta di ritorno.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition-colors duration-300 cursor-pointer">
                        <h4 className="font-bold mb-2 flex items-center">
                          <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                          Invio PEC
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Invio di messaggi PEC a enti pubblici, aziende e privati.
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition-colors duration-300 cursor-pointer">
                        <h4 className="font-bold mb-2 flex items-center">
                          <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                          Attivazione PEC
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Servizio di attivazione di caselle PEC personali o aziendali.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-l-4 border-indigo-400 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full opacity-20 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                      <h4 className="font-bold mb-2 flex items-center relative z-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-indigo-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Cosa serve
                      </h4>
                      <p className="text-gray-700 relative z-10">
                        Per inviare una PEC è necessario conoscere l'indirizzo PEC del destinatario e presentare un
                        documento d'identità valido. Per l'attivazione di una casella PEC personale è necessario un
                        documento d'identità e il codice fiscale.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fax Card */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-b-4 border-purple-600">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 flex-shrink-0">
                    <Send className="text-white" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4 flex items-center">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                        Fax
                      </span>
                      <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Nazionale e Internazionale
                      </span>
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      Offriamo servizi di invio e ricezione fax nazionali e internazionali. Il fax rimane uno strumento
                      importante per la comunicazione ufficiale con molti enti e aziende.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-300 cursor-pointer">
                        <h4 className="font-bold mb-2 flex items-center">
                          <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                          Invio Fax
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Invio di fax nazionali e internazionali con conferma di ricezione.
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-300 cursor-pointer">
                        <h4 className="font-bold mb-2 flex items-center">
                          <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                          Ricezione Fax
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Servizio di ricezione fax con avviso al cliente e conservazione dei documenti.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border-l-4 border-purple-400 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full opacity-20 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                      <h4 className="font-bold mb-2 flex items-center relative z-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-purple-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Cosa serve
                      </h4>
                      <p className="text-gray-700 relative z-10">
                        Per inviare un fax è sufficiente portare i documenti da inviare e conoscere il numero di fax del
                        destinatario. Per ricevere fax è necessario comunicare il nostro numero di fax al mittente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Logos Section */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6">I Nostri Partner</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Image
                  src="/loghi/servizi-postali/gmail.png"
                  alt="Gmail"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain h-24 w-full bg-white p-2"
                />
                <Image
                  src="/loghi/servizi-postali/aruba-pec.png"
                  alt="Aruba PEC"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain h-24 w-full bg-white p-2"
                />
                <Image
                  src="/loghi/servizi-postali/fax.png"
                  alt="Fax"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain h-24 w-full bg-white p-2"
                />
                <Image
                  src="/loghi/servizi-postali/scanner.png"
                  alt="Scanner"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain h-24 w-full bg-white p-2"
                />
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-16">
              <FAQSection
                title="Domande Frequenti sui Servizi Postali"
                description="Trova le risposte alle domande più comuni sui nostri servizi postali."
                faqs={serviziPostaliFAQs}
              />
            </div>

            {/* Contact Section */}
            <div className="mt-16 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Hai bisogno di assistenza?</h3>
              <p className="text-gray-600 mb-6">Contattaci per maggiori informazioni sui nostri servizi postali.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/+390811234567?text=Salve%2C%20vorrei%20informazioni%20sui%20servizi%20postali%20telematici.%20Grazie."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center justify-center"
                >
                  <Image src="/images/whatsapp-icon.png" alt="WhatsApp" width={20} height={20} className="mr-2" />
                  Contattaci su WhatsApp
                </a>
                <a
                  href="tel:+390811234567"
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors inline-block text-center"
                >
                  Chiamaci
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
