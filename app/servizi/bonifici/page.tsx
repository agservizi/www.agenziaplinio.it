import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Landmark, HelpCircle } from "lucide-react"
import FAQSection from "@/components/faq-section"

const bonificisFAQs = [
  {
    question: "Quali tipi di bonifici posso effettuare presso la vostra agenzia?",
    answer:
      "Presso la nostra agenzia è possibile effettuare bonifici SEPA, bonifici extra SEPA e bonifici urgenti tramite il servizio DropPoint.",
  },
  {
    question: "Quanto costa effettuare un bonifico?",
    answer:
      "Il costo del servizio varia in base al tipo di bonifico e all'importo. Contattaci o vieni in agenzia per conoscere le tariffe specifiche.",
  },
  {
    question: "Quali documenti servono per effettuare un bonifico?",
    answer:
      "Per effettuare un bonifico è necessario presentare un documento d'identità valido e conoscere l'IBAN del beneficiario e la causale del bonifico.",
  },
  {
    question: "Quanto tempo ci vuole per l'accredito di un bonifico?",
    answer:
      "I tempi di accredito variano in base al tipo di bonifico: per i bonifici SEPA generalmente 1-2 giorni lavorativi, per i bonifici extra SEPA 3-5 giorni lavorativi, per i bonifici urgenti l'accredito può avvenire anche in giornata.",
  },
]

export default function Bonifici() {
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
              <h1 className="text-4xl font-bold mb-6">Servizi di Bonifico</h1>
              <p className="text-xl max-w-3xl">
                Effettuiamo bonifici nazionali e internazionali tramite il servizio DropPoint in modo sicuro e veloce,
                con tariffe competitive.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Landmark size={64} className="text-white" />
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
              <h2 className="text-3xl font-bold mb-8">I Nostri Servizi di Bonifico</h2>

              <div className="space-y-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Landmark className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Bonifici SEPA</h3>
                      <p className="text-gray-600 mb-6">
                        Effettuiamo bonifici SEPA (Single Euro Payments Area) verso tutti i paesi dell'area SEPA, che
                        comprende i 27 Stati membri dell'Unione Europea più Islanda, Liechtenstein, Norvegia, Svizzera,
                        Principato di Monaco, San Marino, Principato di Andorra, Città del Vaticano e Regno Unito.
                      </p>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400 mb-6">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Vantaggi
                        </h4>
                        <p className="text-gray-600 text-sm">
                          I bonifici SEPA hanno costi contenuti e tempi di accredito rapidi, generalmente entro 1-2
                          giorni lavorativi.
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
                      <h3 className="text-2xl font-bold mb-4">Bonifici Extra SEPA</h3>
                      <p className="text-gray-600 mb-6">
                        Effettuiamo bonifici internazionali verso paesi al di fuori dell'area SEPA, in diverse valute.
                        Il servizio è disponibile per trasferimenti di denaro in tutto il mondo.
                      </p>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400 mb-6">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Informazioni utili
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per i bonifici extra SEPA potrebbero essere richieste informazioni aggiuntive come il codice
                          BIC/SWIFT della banca beneficiaria. I tempi di accredito sono generalmente di 3-5 giorni
                          lavorativi.
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
                      <h3 className="text-2xl font-bold mb-4">Bonifici Urgenti</h3>
                      <p className="text-gray-600 mb-6">
                        Per chi ha necessità di trasferire denaro in tempi rapidi, offriamo il servizio di bonifici
                        urgenti con accredito in giornata o entro 24 ore.
                      </p>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400 mb-6">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per effettuare un bonifico urgente è necessario presentare un documento d'identità valido,
                          conoscere l'IBAN del beneficiario e la causale del bonifico. Il servizio ha un costo
                          aggiuntivo rispetto ai bonifici standard.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold mb-6">I Nostri Partner</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Image
                    src="/loghi/bonifici/droppoint.png"
                    alt="DropPoint"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/bonifici/sepa.png"
                    alt="SEPA"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/bonifici/swift.png"
                    alt="SWIFT"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/bonifici/banca-italia.png"
                    alt="Banca d'Italia"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-16">
                <FAQSection
                  title="Domande Frequenti sui Bonifici"
                  description="Trova le risposte alle domande più comuni sui nostri servizi di bonifico."
                  faqs={bonificisFAQs}
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
                      Lun-Ven: 9:00-13:00, 15:00-19:00
                      <br />
                      Sab: 9:00-13:00
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2">Documenti Necessari</h4>
                    <p className="text-gray-600">
                      Per effettuare bonifici è necessario presentare un documento d'identità valido e conoscere l'IBAN
                      del beneficiario.
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
                        <span>Bonifici rapidi e sicuri</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Assistenza personalizzata</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Nessun conto corrente necessario</span>
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
                      Contattaci per maggiori informazioni sui nostri servizi di bonifico.
                    </p>
                    <div className="space-y-2">
                      <Link
                        href="/contatti"
                        className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors inline-block w-full text-center"
                      >
                        Contattaci
                      </Link>
                      <a
                        href="tel:+390811234567"
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
    </div>
  )
}
