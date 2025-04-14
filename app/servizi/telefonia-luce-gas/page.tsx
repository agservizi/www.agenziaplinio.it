import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Smartphone, Zap, Flame, HelpCircle } from "lucide-react"
import FAQSection from "@/components/faq-section"

const telefoniaLuceGasFAQs = [
  {
    question: "Quali operatori di telefonia offrite?",
    answer:
      "Offriamo contratti con i principali operatori di telefonia: Fastweb, Iliad, WindTre, Pianeta Fibra, Sky e altri. Possiamo consigliarti l'operatore più adatto alle tue esigenze in base alla copertura nella tua zona e alle tue necessità.",
  },
  {
    question: "Posso mantenere il mio numero di telefono cambiando operatore?",
    answer:
      "Sì, è possibile mantenere il proprio numero di telefono (portabilità) quando si cambia operatore. La procedura è gratuita e viene gestita direttamente dal nuovo operatore.",
  },
  {
    question: "Quali fornitori di energia elettrica e gas offrite?",
    answer:
      "Offriamo contratti con diversi fornitori di energia elettrica e gas, tra cui A2A Energia, Enel Energia, Fastweb Energia e altri. Possiamo aiutarti a scegliere l'offerta più conveniente in base ai tuoi consumi.",
  },
  {
    question: "Quanto tempo ci vuole per attivare un nuovo contratto?",
    answer:
      "I tempi di attivazione variano in base al tipo di servizio: per la telefonia mobile generalmente 1-2 giorni lavorativi, per la telefonia fissa e internet 7-15 giorni lavorativi, per luce e gas 15-30 giorni lavorativi.",
  },
]

export default function TelefoniaLuceGas() {
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
              <h1 className="text-4xl font-bold mb-6">Telefonia, Luce e Gas</h1>
              <p className="text-xl max-w-3xl">
                Offriamo servizi di attivazione, modifica e assistenza per contratti di telefonia, energia elettrica e
                gas, con i migliori operatori e fornitori sul mercato.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Smartphone size={64} className="text-white" />
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
              <h2 className="text-3xl font-bold mb-8">I Nostri Servizi</h2>

              <div className="space-y-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Smartphone className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Telefonia Mobile e Fissa</h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo servizi di attivazione, modifica e assistenza per contratti di telefonia mobile e fissa
                        con i principali operatori nazionali, aiutandoti a scegliere l'offerta più adatta alle tue
                        esigenze.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Operatori Disponibili</h4>
                          <p className="text-gray-600 text-sm">Fastweb, Iliad, WindTre, Pianeta Fibra, Sky e altri.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Servizi Offerti</h4>
                          <p className="text-gray-600 text-sm">
                            Attivazione nuove linee, portabilità del numero, modifica contratti, assistenza
                            post-vendita.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Telefonia Mobile</h4>
                          <p className="text-gray-600 text-sm">
                            Offerte per smartphone con chiamate, SMS e internet mobile.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Telefonia Fissa e Internet</h4>
                          <p className="text-gray-600 text-sm">
                            Offerte per casa con internet fibra o ADSL e chiamate incluse.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per attivare un nuovo contratto di telefonia è necessario presentare un documento d'identità
                          valido, codice fiscale e, in caso di portabilità, il codice di migrazione o il numero seriale
                          della SIM.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Zap className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Energia Elettrica</h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo servizi di attivazione, voltura, subentro e cambio fornitore per contratti di energia
                        elettrica, con consulenza personalizzata per trovare l'offerta più conveniente in base ai tuoi
                        consumi.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Fornitori Disponibili</h4>
                          <p className="text-gray-600 text-sm">A2A Energia, Enel Energia, Fastweb Energia e altri.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Servizi Offerti</h4>
                          <p className="text-gray-600 text-sm">
                            Attivazione nuove utenze, voltura, subentro, cambio fornitore, assistenza post-vendita.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Offerte per Privati</h4>
                          <p className="text-gray-600 text-sm">
                            Contratti per abitazioni con tariffe fisse o indicizzate.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Offerte per Aziende</h4>
                          <p className="text-gray-600 text-sm">
                            Contratti per attività commerciali e imprese con tariffe personalizzate.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per attivare un contratto di energia elettrica è necessario presentare un documento d'identità
                          valido, codice fiscale, dati dell'immobile (indirizzo completo), POD (reperibile su una
                          bolletta precedente) e, in caso di voltura o subentro, una lettura del contatore.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Flame className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Gas</h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo servizi di attivazione, voltura, subentro e cambio fornitore per contratti di gas, con
                        consulenza personalizzata per trovare l'offerta più conveniente in base ai tuoi consumi.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Fornitori Disponibili</h4>
                          <p className="text-gray-600 text-sm">A2A Energia, Enel Energia, Fastweb Energia e altri.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Servizi Offerti</h4>
                          <p className="text-gray-600 text-sm">
                            Attivazione nuove utenze, voltura, subentro, cambio fornitore, assistenza post-vendita.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Offerte per Privati</h4>
                          <p className="text-gray-600 text-sm">
                            Contratti per abitazioni con tariffe fisse o indicizzate.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Offerte per Aziende</h4>
                          <p className="text-gray-600 text-sm">
                            Contratti per attività commerciali e imprese con tariffe personalizzate.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per attivare un contratto di gas è necessario presentare un documento d'identità valido,
                          codice fiscale, dati dell'immobile (indirizzo completo), PDR (reperibile su una bolletta
                          precedente) e, in caso di voltura o subentro, una lettura del contatore.
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
                    src="/loghi/telefonia-luce-gas/fastweb.png"
                    alt="Fastweb"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/telefonia-luce-gas/iliad.png"
                    alt="Iliad"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/telefonia-luce-gas/a2a-energia.png"
                    alt="A2A Energia"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/telefonia-luce-gas/enel-energia.png"
                    alt="Enel Energia"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-16">
                <FAQSection
                  title="Domande Frequenti su Telefonia, Luce e Gas"
                  description="Trova le risposte alle domande più comuni sui nostri servizi di telefonia, energia elettrica e gas."
                  faqs={telefoniaLuceGasFAQs}
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
                      Documento d'identità valido, codice fiscale e documentazione specifica in base al tipo di
                      contratto.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-bold mb-2 text-primary">Vantaggi del Servizio</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Consulenza personalizzata</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Confronto delle migliori offerte</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Assistenza post-vendita</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Gestione completa delle pratiche</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-bold mb-2">Hai bisogno di assistenza?</h4>
                    <p className="text-gray-600 mb-4">
                      Contattaci per maggiori informazioni sui nostri servizi di telefonia, energia elettrica e gas.
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

