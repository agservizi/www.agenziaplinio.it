import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, FileText, Users, Calculator, HelpCircle } from "lucide-react"
import FAQSection from "@/components/faq-section"

const cafPatronatoFAQs = [
  {
    question: "Quali servizi offre il vostro CAF?",
    answer:
      "Il nostro CAF offre assistenza per la compilazione e presentazione del modello 730, modello Redditi (ex UNICO), calcolo e pagamento IMU/TASI, ISEE, RED, modelli INPS e altre pratiche fiscali.",
  },
  {
    question: "Quali documenti servono per la dichiarazione dei redditi?",
    answer:
      "Per la dichiarazione dei redditi sono necessari: documento d'identità, tessera sanitaria, dichiarazione dell'anno precedente, CU (Certificazione Unica), spese detraibili (mediche, mutuo, assicurazioni, ecc.), F24 di eventuali acconti versati e altra documentazione relativa a redditi percepiti.",
  },
  {
    question: "Quali servizi offre il vostro Patronato?",
    answer:
      "Il nostro Patronato offre assistenza per pratiche di pensione, invalidità civile, disoccupazione (NASPI), assegno unico, bonus vari, permessi di soggiorno e altre pratiche previdenziali e assistenziali.",
  },
  {
    question: "Quanto costa il servizio di compilazione del 730?",
    answer:
      "Il costo del servizio di compilazione del 730 varia in base alla complessità della dichiarazione. Contattaci per un preventivo personalizzato.",
  },
]

export default function CafPatronato() {
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
              <h1 className="text-4xl font-bold mb-6">CAF e Patronato</h1>
              <p className="text-xl max-w-3xl">
                Offriamo servizi completi di CAF e Patronato, in collaborazione con lo Studio Schettino, per assistenza
                fiscale, previdenziale e sociale, con professionisti qualificati e aggiornati sulle normative vigenti.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <FileText size={64} className="text-white" />
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
              <h2 className="text-3xl font-bold mb-8">I Nostri Servizi CAF e Patronato</h2>

              <div className="space-y-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Calculator className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Servizi CAF</h3>
                      <p className="text-gray-600 mb-6">
                        Il nostro Centro di Assistenza Fiscale offre consulenza e assistenza per tutte le pratiche
                        fiscali, dalla dichiarazione dei redditi al calcolo delle imposte, con professionisti
                        qualificati e costantemente aggiornati.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Dichiarazione dei Redditi</h4>
                          <p className="text-gray-600 text-sm">
                            Compilazione e presentazione del modello 730 e modello Redditi (ex UNICO).
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">IMU/TASI</h4>
                          <p className="text-gray-600 text-sm">Calcolo e pagamento delle imposte sugli immobili.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">ISEE</h4>
                          <p className="text-gray-600 text-sm">
                            Compilazione e presentazione della Dichiarazione Sostitutiva Unica per il calcolo dell'ISEE.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">RED</h4>
                          <p className="text-gray-600 text-sm">
                            Compilazione e presentazione del modello RED per i pensionati.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Successioni</h4>
                          <p className="text-gray-600 text-sm">
                            Assistenza nella compilazione e presentazione della dichiarazione di successione.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Contratti di Locazione</h4>
                          <p className="text-gray-600 text-sm">Registrazione e gestione dei contratti di affitto.</p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per i servizi CAF è necessario presentare documenti specifici in base al tipo di pratica. Per
                          la dichiarazione dei redditi: documento d'identità, tessera sanitaria, CU, spese detraibili,
                          dichiarazione dell'anno precedente e altra documentazione relativa ai redditi percepiti.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Users className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Servizi Patronato</h3>
                      <p className="text-gray-600 mb-6">
                        Il nostro Patronato offre assistenza gratuita per pratiche previdenziali, assistenziali e
                        sociali, tutelando i diritti dei cittadini nei rapporti con gli enti pubblici.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Pensioni</h4>
                          <p className="text-gray-600 text-sm">
                            Domande di pensione, verifica posizione contributiva, ricongiunzioni, riscatti.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Invalidità Civile</h4>
                          <p className="text-gray-600 text-sm">
                            Domande di invalidità civile, accompagnamento, Legge 104.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Disoccupazione</h4>
                          <p className="text-gray-600 text-sm">
                            Domande di NASPI, DIS-COLL e altre indennità di disoccupazione.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Assegno Unico</h4>
                          <p className="text-gray-600 text-sm">Domande di assegno unico per figli a carico.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Bonus e Agevolazioni</h4>
                          <p className="text-gray-600 text-sm">Richieste di bonus sociali, agevolazioni e sussidi.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Maternità</h4>
                          <p className="text-gray-600 text-sm">
                            Assistenza per richieste di congedo di maternità, bonus bebè, assegni familiari e altre
                            prestazioni per neogenitori.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per i servizi Patronato è necessario presentare documenti specifici in base al tipo di
                          pratica. In generale: documento d'identità, tessera sanitaria, documentazione relativa alla
                          pratica specifica (certificati medici, buste paga, ecc.).
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
                      <h3 className="text-2xl font-bold mb-4">
                        Consulenza Specializzata tramite il nostro patronato di fiducia
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo consulenza specializzata per situazioni complesse, con professionisti esperti in
                        materia fiscale, previdenziale e assistenziale.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Consulenza Fiscale</h4>
                          <p className="text-gray-600 text-sm">
                            Consulenza personalizzata per ottimizzare la situazione fiscale.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Consulenza Previdenziale</h4>
                          <p className="text-gray-600 text-sm">
                            Analisi della posizione contributiva e pianificazione pensionistica.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Assistenza Contenzioso</h4>
                          <p className="text-gray-600 text-sm">
                            Supporto in caso di contenzioso con enti previdenziali e fiscali.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Consulenza Agevolazioni</h4>
                          <p className="text-gray-600 text-sm">
                            Individuazione delle agevolazioni e bonus disponibili in base alla situazione personale.
                          </p>
                        </div>
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
                    src="/loghi/caf-patronato/caf.png"
                    alt="CAF"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/caf-patronato/patronato.png"
                    alt="Patronato"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/caf-patronato/inps.png"
                    alt="INPS"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/caf-patronato/agenzia-entrate.png"
                    alt="Agenzia delle Entrate"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-16">
                <FAQSection
                  title="Domande Frequenti su CAF e Patronato"
                  description="Trova le risposte alle domande più comuni sui nostri servizi di CAF e Patronato."
                  faqs={cafPatronatoFAQs}
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
                    <h4 className="font-bold mb-2">Documenti Necessari</h4>
                    <p className="text-gray-600">
                      Documento d'identità, tessera sanitaria e documentazione specifica in base al tipo di pratica.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-bold mb-2 text-primary">Vantaggi del Servizio</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Professionisti qualificati</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Assistenza personalizzata</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Aggiornamento costante sulle normative</span>
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
                      Contattaci per maggiori informazioni sui nostri servizi di CAF e Patronato.
                    </p>
                    <div className="space-y-2">
                      <a
                        href="https://wa.me/+390811234567?text=Salve%2C%20vorrei%20informazioni%20sui%20servizi%20di%20CAF%20e%20Patronato.%20Grazie."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20BA5C] text-white font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center justify-center w-full"
                      >
                        <Image src="/images/whatsapp-icon.png" alt="WhatsApp" width={20} height={20} className="mr-2" />
                        Contattaci su WhatsApp
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
