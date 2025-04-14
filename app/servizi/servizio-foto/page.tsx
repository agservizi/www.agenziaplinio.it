import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Camera, ImageIcon, FileImage, HelpCircle } from "lucide-react"
import FAQSection from "@/components/faq-section"

const fotoFAQs = [
  {
    question: "Quanto tempo ci vuole per stampare le foto?",
    answer:
      "Per la stampa di foto standard il servizio è immediato. Per grandi quantità o formati speciali potrebbe richiedere da 1 a 24 ore in base al carico di lavoro.",
  },
  {
    question: "Quali formati di foto potete stampare?",
    answer:
      "Offriamo stampa fotografica in vari formati: 10x15, 13x18, 15x20, 20x30, 30x40, 30x45 e formati personalizzati su richiesta.",
  },
  {
    question: "Le fototessere sono conformi per documenti ufficiali?",
    answer:
      "Sì, le nostre fototessere rispettano tutti i requisiti richiesti per documenti ufficiali come carta d'identità, passaporto, patente e permesso di soggiorno.",
  },
  {
    question: "Posso portare le foto su una chiavetta USB?",
    answer:
      "Sì, accettiamo foto da qualsiasi supporto digitale: chiavette USB, schede di memoria, CD/DVD, o inviate via email o WhatsApp.",
  },
]

export default function ServizioFoto() {
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
              <h1 className="text-4xl font-bold mb-6">Servizio Fotografico</h1>
              <p className="text-xl max-w-3xl">
                Offriamo servizi fotografici professionali, dalla stampa di foto alla realizzazione di fototessere
                conformi per documenti ufficiali, con qualità e rapidità.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Camera size={64} className="text-white" />
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
              <h2 className="text-3xl font-bold mb-8">I Nostri Servizi Fotografici</h2>

              <div className="space-y-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <ImageIcon className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Stampa Fotografica</h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo un servizio di stampa fotografica professionale con carta di alta qualità e tecnologia
                        all'avanguardia, per risultati brillanti e duraturi.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Formati Standard</h4>
                          <p className="text-gray-600 text-sm">10x15, 13x18, 15x20, 20x30 cm</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Formati Grandi</h4>
                          <p className="text-gray-600 text-sm">30x40, 30x45, 40x60, 50x70 cm</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Stampa da Supporti Digitali</h4>
                          <p className="text-gray-600 text-sm">USB, schede di memoria, smartphone, email</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Stampa da Social</h4>
                          <p className="text-gray-600 text-sm">Instagram, Facebook, Google Foto</p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per stampare le tue foto puoi portarle su qualsiasi supporto digitale (USB, scheda di
                          memoria), inviarle via email o WhatsApp, o condividerle direttamente dai tuoi social.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Camera className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Fototessere</h3>
                      <p className="text-gray-600 mb-6">
                        Realizziamo fototessere conformi per tutti i documenti ufficiali: carta d'identità, passaporto,
                        patente, permesso di soggiorno e altri documenti. Il servizio è immediato e include lo scatto,
                        la stampa e il controllo di conformità.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Fototessere Standard</h4>
                          <p className="text-gray-600 text-sm">Per carta d'identità, patente, tessere varie</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Fototessere Passaporto</h4>
                          <p className="text-gray-600 text-sm">Conformi alle specifiche ICAO per passaporti</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Fototessere Permesso di Soggiorno</h4>
                          <p className="text-gray-600 text-sm">Conformi alle specifiche per permessi di soggiorno</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Fototessere Digitali</h4>
                          <p className="text-gray-600 text-sm">Invio digitale per pratiche online</p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per le fototessere è sufficiente presentarsi in agenzia. Ti consigliamo di indossare abiti con
                          colori non troppo chiari e di evitare accessori come cappelli o occhiali scuri.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FileImage className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Servizi Fotografici Aggiuntivi</h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo una serie di servizi fotografici aggiuntivi per soddisfare tutte le tue esigenze, dalla
                        digitalizzazione di foto antiche alla creazione di fotoalbum personalizzati.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Digitalizzazione Foto</h4>
                          <p className="text-gray-600 text-sm">
                            Scansione e digitalizzazione di foto antiche o stampate
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Fotoalbum Personalizzati</h4>
                          <p className="text-gray-600 text-sm">Creazione di fotoalbum e fotolibri personalizzati</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Fotoritocco</h4>
                          <p className="text-gray-600 text-sm">Servizi di fotoritocco base e avanzato</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Stampa su Gadget</h4>
                          <p className="text-gray-600 text-sm">
                            Stampa di foto su tazze, magliette, cuscini e altri oggetti
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Tempi di consegna
                        </h4>
                        <p className="text-gray-600 text-sm">
                          I tempi di consegna variano in base al servizio richiesto: per la digitalizzazione di foto e
                          il fotoritocco da 1 a 3 giorni, per fotoalbum e stampa su gadget da 3 a 7 giorni lavorativi.
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
                    src="/loghi/foto/kodak.png"
                    alt="Kodak"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/foto/fujifilm.png"
                    alt="Fujifilm"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/foto/canon.png"
                    alt="Canon"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/foto/nikon.png"
                    alt="Nikon"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-16">
                <FAQSection
                  title="Domande Frequenti sul Servizio Fotografico"
                  description="Trova le risposte alle domande più comuni sui nostri servizi fotografici."
                  faqs={fotoFAQs}
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
                        <span>Stampa di alta qualità</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Fototessere conformi per documenti</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Servizio rapido e professionale</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Ampia gamma di formati e supporti</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-bold mb-2">Hai bisogno di assistenza?</h4>
                    <p className="text-gray-600 mb-4">
                      Contattaci per maggiori informazioni sui nostri servizi fotografici.
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

