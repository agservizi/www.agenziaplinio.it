import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, FileText, HelpCircle } from "lucide-react"
import FAQSection from "@/components/faq-section"

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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-8">I Nostri Servizi di Invio Posta</h2>

              <div className="space-y-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Lettere e Posta Prioritaria</h3>
                      <p className="text-gray-600 mb-6">
                        Inviamo lettere e posta prioritaria in Italia e all'estero, con tempi di consegna rapidi e
                        tariffe competitive.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Posta Ordinaria</h4>
                          <p className="text-gray-600 text-sm">Invio di lettere e cartoline in Italia e all'estero.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Posta Prioritaria</h4>
                          <p className="text-gray-600 text-sm">
                            Invio di lettere con consegna prioritaria in Italia e all'estero.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per inviare una lettera è sufficiente conoscere l'indirizzo completo del destinatario.
                          Offriamo anche servizio di scrittura e imbustamento.
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
                      <h3 className="text-2xl font-bold mb-4">Raccomandate</h3>
                      <p className="text-gray-600 mb-6">
                        Inviamo raccomandate semplici e con avviso di ricevimento (A/R) in Italia e all'estero, con
                        tracciabilità completa.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Raccomandata Semplice</h4>
                          <p className="text-gray-600 text-sm">
                            Invio di lettere con prova di spedizione e tracciabilità.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Raccomandata A/R</h4>
                          <p className="text-gray-600 text-sm">
                            Invio di lettere con prova di spedizione, tracciabilità e avviso di ricevimento firmato dal
                            destinatario.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
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
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Telegrammi e Posta Assicurata</h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo servizi di invio telegrammi per comunicazioni urgenti e posta assicurata per l'invio di
                        documenti e oggetti di valore.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Telegrammi</h4>
                          <p className="text-gray-600 text-sm">Invio di messaggi urgenti con consegna entro 24 ore.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Posta Assicurata</h4>
                          <p className="text-gray-600 text-sm">
                            Invio di lettere e pacchi con valore assicurato fino a 3.000€.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per inviare un telegramma è sufficiente conoscere l'indirizzo del destinatario e il testo del
                          messaggio. Per la posta assicurata è necessario dichiarare il valore del contenuto.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loghi dei Partner */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold mb-6">I Nostri Partner</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Image
                    src="/loghi/posta/poste-italiane.png"
                    alt="Poste Italiane"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/posta/raccomandata.png"
                    alt="Raccomandata"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/posta/posta-prioritaria.png"
                    alt="Posta Prioritaria"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/posta/telegramma.png"
                    alt="Telegramma"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-16">
                <FAQSection
                  title="Domande Frequenti sull'Invio Posta"
                  description="Trova le risposte alle domande più comuni sui nostri servizi di invio posta."
                  faqs={invioPostaFAQs}
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
                    <h4 className="font-bold mb-2">Metodi di Pagamento Accettati</h4>
                    <p className="text-gray-600">Contanti, Bancomat, Carte di Credito, Carte Prepagate.</p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-bold mb-2 text-primary">Vantaggi del Servizio</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Invio rapido e sicuro</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Tracciabilità completa</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Assistenza nella compilazione</span>
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
                      Contattaci per maggiori informazioni sui nostri servizi di invio posta.
                    </p>
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
