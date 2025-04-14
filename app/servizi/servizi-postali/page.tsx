import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, FileText, Send, HelpCircle } from "lucide-react"
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
              <h1 className="text-4xl font-bold mb-6">Servizi Postali</h1>
              <p className="text-xl max-w-3xl">
                Offriamo una gamma completa di servizi postali digitali, dall'invio di email e PEC all'invio di fax, per
                soddisfare tutte le tue esigenze di comunicazione.
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
              <h2 className="text-3xl font-bold mb-8">I Nostri Servizi Postali</h2>

              <div className="space-y-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Email</h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo servizi di invio email per chi non dispone di un proprio indirizzo email o necessita di
                        assistenza nell'invio. Possiamo aiutarti a creare, formattare e inviare email a uno o più
                        destinatari.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Invio Email</h4>
                          <p className="text-gray-600 text-sm">
                            Assistenza nella creazione e nell'invio di email a uno o più destinatari.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Allegati</h4>
                          <p className="text-gray-600 text-sm">
                            Possibilità di allegare documenti, immagini e altri file alle email.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per inviare un'email è sufficiente conoscere l'indirizzo email del destinatario e il contenuto
                          del messaggio. Per allegare file, è necessario portarli su supporto digitale o stamparli per
                          la scansione.
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
                      <h3 className="text-2xl font-bold mb-4">PEC</h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo servizi di invio Posta Elettronica Certificata (PEC) per comunicazioni ufficiali con
                        valore legale. La PEC garantisce l'invio e la ricezione dei messaggi con lo stesso valore legale
                        di una raccomandata con ricevuta di ritorno.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Invio PEC</h4>
                          <p className="text-gray-600 text-sm">
                            Invio di messaggi PEC a enti pubblici, aziende e privati.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Attivazione PEC</h4>
                          <p className="text-gray-600 text-sm">
                            Servizio di attivazione di caselle PEC personali o aziendali.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per inviare una PEC è necessario conoscere l'indirizzo PEC del destinatario e presentare un
                          documento d'identità valido. Per l'attivazione di una casella PEC personale è necessario un
                          documento d'identità e il codice fiscale.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Send className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Fax</h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo servizi di invio e ricezione fax nazionali e internazionali. Il fax rimane uno
                        strumento importante per la comunicazione ufficiale con molti enti e aziende.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Invio Fax</h4>
                          <p className="text-gray-600 text-sm">
                            Invio di fax nazionali e internazionali con conferma di ricezione.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Ricezione Fax</h4>
                          <p className="text-gray-600 text-sm">
                            Servizio di ricezione fax con avviso al cliente e conservazione dei documenti.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per inviare un fax è sufficiente portare i documenti da inviare e conoscere il numero di fax
                          del destinatario. Per ricevere fax è necessario comunicare il nostro numero di fax al
                          mittente.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              {/* Loghi dei Partner */}
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
                    <h4 className="font-bold mb-2">Metodi di Pagamento Accettati</h4>
                    <p className="text-gray-600">Contanti, Bancomat, Carte di Credito, Carte Prepagate.</p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-bold mb-2 text-primary">Vantaggi del Servizio</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Comunicazioni rapide e sicure</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Assistenza personalizzata</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Valore legale delle comunicazioni</span>
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
                      Contattaci per maggiori informazioni sui nostri servizi postali.
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

