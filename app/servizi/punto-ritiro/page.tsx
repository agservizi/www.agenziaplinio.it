import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Package, MapPin, Clock, HelpCircle } from "lucide-react"
import FAQSection from "@/components/faq-section"

const puntoRitiroFAQs = [
  {
    question: "Quali corrieri supportate per il ritiro pacchi?",
    answer:
      "Siamo punto di ritiro ufficiale per PuntoPoste (Poste Italiane), BRT-Fermopoint, GLS Shop e Fedex Location.",
  },
  {
    question: "Quanto tempo avete a disposizione per ritirare un pacco?",
    answer:
      "I pacchi restano disponibili per il ritiro generalmente per 7 giorni, ma questo può variare in base al corriere. Ti consigliamo di ritirare il pacco il prima possibile.",
  },
  {
    question: "Cosa serve per ritirare un pacco?",
    answer:
      "Per ritirare un pacco è necessario presentare un documento d'identità valido e il codice di ritiro che ti è stato inviato via SMS o email dal corriere.",
  },
  {
    question: "Posso delegare qualcuno a ritirare il pacco al posto mio?",
    answer:
      "Sì, è possibile delegare una persona a ritirare il pacco. La persona delegata dovrà presentare un proprio documento d'identità, una delega scritta e una copia del documento del delegante.",
  },
]

export default function PuntoRitiro() {
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
              <h1 className="text-4xl font-bold mb-6">Punto di Ritiro Pacchi</h1>
              <p className="text-xl max-w-3xl">
                Siamo punto di ritiro ufficiale per i principali corrieri. Ritira i tuoi pacchi quando preferisci, senza
                attese e con orari flessibili.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Package size={64} className="text-white" />
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
              <h2 className="text-3xl font-bold mb-8">I Nostri Servizi di Punto Ritiro</h2>

              <div className="space-y-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Package className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Corrieri Disponibili</h3>
                      <p className="text-gray-600 mb-6">
                        Siamo punto di ritiro ufficiale per i principali corrieri nazionali e internazionali, offrendo
                        un servizio comodo e flessibile per il ritiro dei tuoi pacchi.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">PuntoPoste</h4>
                          <p className="text-gray-600 text-sm">
                            Punto di ritiro ufficiale per i pacchi di Poste Italiane.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">BRT-Fermopoint</h4>
                          <p className="text-gray-600 text-sm">Punto di ritiro per i pacchi spediti con BRT.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">GLS Shop</h4>
                          <p className="text-gray-600 text-sm">Punto di ritiro per i pacchi spediti con GLS.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Fedex Location</h4>
                          <p className="text-gray-600 text-sm">Punto di ritiro per i pacchi spediti con Fedex/TNT.</p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Come funziona
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Quando effettui un acquisto online, seleziona la nostra agenzia come punto di ritiro.
                          Riceverai una notifica quando il pacco sarà disponibile per il ritiro. Presentati in agenzia
                          con un documento d'identità e il codice di ritiro.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Vantaggi del Punto Ritiro</h3>
                      <p className="text-gray-600 mb-6">
                        Scegliere la nostra agenzia come punto di ritiro offre numerosi vantaggi rispetto alla consegna
                        a domicilio.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Orari Flessibili</h4>
                          <p className="text-gray-600 text-sm">
                            Ritira i tuoi pacchi negli orari di apertura dell'agenzia, senza dover attendere a casa il
                            corriere.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Nessuna Attesa</h4>
                          <p className="text-gray-600 text-sm">
                            Evita le attese e i mancati recapiti, ritira quando preferisci.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Sicurezza</h4>
                          <p className="text-gray-600 text-sm">
                            I tuoi pacchi sono custoditi in un luogo sicuro fino al tuo ritiro.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Assistenza</h4>
                          <p className="text-gray-600 text-sm">
                            Personale qualificato a tua disposizione per qualsiasi necessità.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Procedura di Ritiro</h3>
                      <p className="text-gray-600 mb-6">
                        Ritirare un pacco presso la nostra agenzia è semplice e veloce. Ecco la procedura da seguire:
                      </p>

                      <ol className="space-y-4 mb-6">
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-primary font-bold">
                            1
                          </span>
                          <div>
                            <h4 className="font-bold mb-1">Ricevi la notifica</h4>
                            <p className="text-gray-600 text-sm">
                              Quando il pacco arriva in agenzia, riceverai una notifica via SMS o email dal corriere con
                              un codice di ritiro.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-primary font-bold">
                            2
                          </span>
                          <div>
                            <h4 className="font-bold mb-1">Vieni in agenzia</h4>
                            <p className="text-gray-600 text-sm">
                              Presentati in agenzia negli orari di apertura con un documento d'identità valido e il
                              codice di ritiro.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-primary font-bold">
                            3
                          </span>
                          <div>
                            <h4 className="font-bold mb-1">Ritira il pacco</h4>
                            <p className="text-gray-600 text-sm">
                              Il nostro personale verificherà la tua identità e ti consegnerà il pacco. Potrai
                              controllare il contenuto prima di lasciare l'agenzia.
                            </p>
                          </div>
                        </li>
                      </ol>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per ritirare un pacco è necessario presentare un documento d'identità valido (carta
                          d'identità, patente o passaporto) e il codice di ritiro ricevuto via SMS o email. In caso di
                          delega, è necessaria una delega scritta e una copia del documento del delegante.
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
                    src="/loghi/punto-ritiro/puntoposte.png"
                    alt="PuntoPoste"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/punto-ritiro/brt-fermopoint.png"
                    alt="BRT Fermopoint"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/punto-ritiro/gls-shop.png"
                    alt="GLS Shop"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/punto-ritiro/fedex-location.png"
                    alt="Fedex Location"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-16">
                <FAQSection
                  title="Domande Frequenti sul Punto Ritiro"
                  description="Trova le risposte alle domande più comuni sul nostro servizio di punto ritiro pacchi."
                  faqs={puntoRitiroFAQs}
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
                      Documento d'identità valido e codice di ritiro ricevuto via SMS o email.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-bold mb-2 text-primary">Vantaggi del Servizio</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Orari flessibili</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Nessuna attesa a casa</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Custodia sicura dei pacchi</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Assistenza personalizzata</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-bold mb-2">Hai bisogno di assistenza?</h4>
                    <p className="text-gray-600 mb-4">
                      Contattaci per maggiori informazioni sul nostro servizio di punto ritiro pacchi.
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

