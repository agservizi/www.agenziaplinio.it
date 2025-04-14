import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search, FileText, Building, HelpCircle } from "lucide-react"
import FAQSection from "@/components/faq-section"

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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-8">I Nostri Servizi di Visure</h2>

              <div className="space-y-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FileText className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Visure Catastali</h3>
                      <p className="text-gray-600 mb-6">
                        Le visure catastali sono documenti ufficiali che contengono informazioni su immobili presenti
                        nel territorio italiano. Offriamo un servizio rapido di richiesta e rilascio di visure catastali
                        per terreni e fabbricati.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Visura per Soggetto</h4>
                          <p className="text-gray-600 text-sm">
                            Elenco degli immobili intestati a una persona fisica o giuridica.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Visura per Immobile</h4>
                          <p className="text-gray-600 text-sm">
                            Informazioni su un immobile specifico identificato dai dati catastali.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Planimetrie Catastali</h4>
                          <p className="text-gray-600 text-sm">
                            Rappresentazione grafica della disposizione interna di un immobile.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Estratti di Mappa</h4>
                          <p className="text-gray-600 text-sm">
                            Rappresentazione grafica della posizione di un immobile sul territorio.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per richiedere una visura catastale è necessario conoscere i dati identificativi dell'immobile
                          (foglio, particella, subalterno) o i dati anagrafici del proprietario. È richiesto un
                          documento d'identità valido.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Building className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Visure Camerali</h3>
                      <p className="text-gray-600 mb-6">
                        Le visure camerali sono documenti ufficiali rilasciati dalla Camera di Commercio che contengono
                        informazioni sulle imprese iscritte al Registro delle Imprese. Offriamo un servizio di richiesta
                        e rilascio di visure camerali ordinarie e storiche.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Visura Camerale Ordinaria</h4>
                          <p className="text-gray-600 text-sm">
                            Informazioni aggiornate su un'impresa (dati anagrafici, attività, capitale sociale,
                            cariche).
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Visura Camerale Storica</h4>
                          <p className="text-gray-600 text-sm">
                            Informazioni storiche su un'impresa, con tutte le modifiche avvenute nel tempo.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Bilanci</h4>
                          <p className="text-gray-600 text-sm">
                            Documenti contabili depositati da società di capitali presso la Camera di Commercio.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Atti Societari</h4>
                          <p className="text-gray-600 text-sm">
                            Statuti, atti costitutivi e altri documenti depositati presso la Camera di Commercio.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per richiedere una visura camerale è necessario conoscere la denominazione dell'impresa o il
                          codice fiscale/partita IVA. È richiesto un documento d'identità valido.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Search className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Visure CRIF e Protestati</h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo servizi di visure CRIF per conoscere la propria situazione creditizia e visure
                        protestati per verificare la presenza di protesti a carico di persone fisiche o giuridiche.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Visura CRIF</h4>
                          <p className="text-gray-600 text-sm">
                            Informazioni sulla situazione creditizia di una persona (finanziamenti, pagamenti,
                            richieste).
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Visura Protestati</h4>
                          <p className="text-gray-600 text-sm">
                            Verifica della presenza di protesti a carico di persone fisiche o giuridiche.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Cancellazione Protesti</h4>
                          <p className="text-gray-600 text-sm">
                            Assistenza nella procedura di cancellazione di protesti dal Registro Informatico dei
                            Protesti.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Consulenza Creditizia</h4>
                          <p className="text-gray-600 text-sm">
                            Analisi della situazione creditizia e consulenza per il miglioramento del proprio profilo.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per richiedere una visura CRIF o protestati è necessario presentare un documento d'identità
                          valido. Per la visura CRIF è necessario essere il diretto interessato o avere una delega.
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
                    src="/loghi/visure/crif.png"
                    alt="CRIF"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/visure/catasto.png"
                    alt="Catasto"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/visure/camera-commercio.png"
                    alt="Camera di Commercio"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/visure/registro-protesti.png"
                    alt="Registro Protesti"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-16">
                <FAQSection
                  title="Domande Frequenti sulle Visure"
                  description="Trova le risposte alle domande più comuni sui nostri servizi di visure."
                  faqs={visureFAQs}
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
                      Documento d'identità valido e informazioni specifiche in base al tipo di visura richiesta.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-bold mb-2 text-primary">Vantaggi del Servizio</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Rilascio immediato</span>
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

                  <div className="pt-4 border-t">
                    <h4 className="font-bold mb-2">Hai bisogno di assistenza?</h4>
                    <p className="text-gray-600 mb-4">
                      Contattaci per maggiori informazioni sui nostri servizi di visure.
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
