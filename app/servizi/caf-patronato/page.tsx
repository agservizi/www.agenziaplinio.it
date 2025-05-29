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
      <section className="py-0 overflow-hidden">
        <div className="w-full bg-gradient-to-b from-primary/5 to-white">
          <div className="container mx-auto px-4">
            {/* Titolo animato */}
            <div className="relative py-16 text-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <FileText size={400} className="text-primary animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                I Nostri Servizi CAF e Patronato
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            </div>

            {/* Servizi CAF - Card interattiva */}
            <div className="group relative mb-24 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>

              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Calculator className="text-primary" size={36} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-6 text-primary">Servizi CAF</h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      Il nostro Centro di Assistenza Fiscale offre consulenza e assistenza per tutte le pratiche
                      fiscali, dalla dichiarazione dei redditi al calcolo delle imposte, con professionisti qualificati
                      e costantemente aggiornati.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {[
                        {
                          title: "Dichiarazione dei Redditi",
                          desc: "Compilazione e presentazione del modello 730 e modello Redditi (ex UNICO).",
                        },
                        {
                          title: "IMU/TASI",
                          desc: "Calcolo e pagamento delle imposte sugli immobili.",
                        },
                        {
                          title: "ISEE",
                          desc: "Compilazione e presentazione della Dichiarazione Sostitutiva Unica per il calcolo dell'ISEE.",
                        },
                        {
                          title: "RED",
                          desc: "Compilazione e presentazione del modello RED per i pensionati.",
                        },
                        {
                          title: "Successioni",
                          desc: "Assistenza nella compilazione e presentazione della dichiarazione di successione.",
                        },
                        {
                          title: "Contratti di Locazione",
                          desc: "Registrazione e gestione dei contratti di affitto.",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400 shadow-sm">
                      <h4 className="font-bold mb-2 flex items-center text-lg">
                        <HelpCircle size={20} className="mr-2 text-yellow-500" />
                        Cosa serve
                      </h4>
                      <p className="text-gray-600">
                        Per i servizi CAF è necessario presentare documenti specifici in base al tipo di pratica. Per la
                        dichiarazione dei redditi: documento d'identità, tessera sanitaria, CU, spese detraibili,
                        dichiarazione dell'anno precedente e altra documentazione relativa ai redditi percepiti.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Servizi Patronato - Card interattiva */}
            <div className="group relative mb-24 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-primary"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500"></div>

              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Users className="text-secondary" size={36} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-6 text-secondary">Servizi Patronato</h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      Il nostro Patronato offre assistenza gratuita per pratiche previdenziali, assistenziali e sociali,
                      tutelando i diritti dei cittadini nei rapporti con gli enti pubblici.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {[
                        {
                          title: "Pensioni",
                          desc: "Domande di pensione, verifica posizione contributiva, ricongiunzioni, riscatti.",
                        },
                        {
                          title: "Invalidità Civile",
                          desc: "Domande di invalidità civile, accompagnamento, Legge 104.",
                        },
                        {
                          title: "Disoccupazione",
                          desc: "Domande di NASPI, DIS-COLL e altre indennità di disoccupazione.",
                        },
                        {
                          title: "Assegno Unico",
                          desc: "Domande di assegno unico per figli a carico.",
                        },
                        {
                          title: "Bonus e Agevolazioni",
                          desc: "Richieste di bonus sociali, agevolazioni e sussidi.",
                        },
                        {
                          title: "Maternità",
                          desc: "Assistenza per richieste di congedo di maternità, bonus bebè, assegni familiari.",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400 shadow-sm">
                      <h4 className="font-bold mb-2 flex items-center text-lg">
                        <HelpCircle size={20} className="mr-2 text-yellow-500" />
                        Cosa serve
                      </h4>
                      <p className="text-gray-600">
                        Per i servizi Patronato è necessario presentare documenti specifici in base al tipo di pratica.
                        In generale: documento d'identità, tessera sanitaria, documentazione relativa alla pratica
                        specifica (certificati medici, buste paga, ecc.).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Consulenza Specializzata - Card interattiva */}
            <div className="group relative mb-24 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>

              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="text-blue-500" size={36} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-500">
                      Consulenza Specializzata tramite il nostro patronato di fiducia
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      Offriamo consulenza specializzata per situazioni complesse, con professionisti esperti in materia
                      fiscale, previdenziale e assistenziale.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {[
                        {
                          title: "Consulenza Fiscale",
                          desc: "Consulenza personalizzata per ottimizzare la situazione fiscale.",
                        },
                        {
                          title: "Consulenza Previdenziale",
                          desc: "Analisi della posizione contributiva e pianificazione pensionistica.",
                        },
                        {
                          title: "Assistenza Contenzioso",
                          desc: "Supporto in caso di contenzioso con enti previdenziali e fiscali.",
                        },
                        {
                          title: "Consulenza Agevolazioni",
                          desc: "Individuazione delle agevolazioni e bonus disponibili in base alla situazione personale.",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendario Fiscale Interattivo */}
            <div className="mb-24">
              <h3 className="text-3xl font-bold mb-8 text-center">Calendario Fiscale</h3>
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <p className="text-gray-600 mb-8 text-center text-lg">
                  Ecco le principali scadenze fiscali da ricordare durante l'anno:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    {
                      period: "Gennaio - Febbraio",
                      desc: "Canone RAI, Imposta di bollo e-fatture",
                      color: "primary",
                    },
                    {
                      period: "Marzo - Aprile",
                      desc: "Certificazione Unica (CU), Dichiarazione IVA",
                      color: "secondary",
                    },
                    {
                      period: "Maggio - Giugno",
                      desc: "Modello 730, IMU (acconto)",
                      color: "primary",
                    },
                    {
                      period: "Luglio - Settembre",
                      desc: "Modello Redditi, Dichiarazioni correttive",
                      color: "secondary",
                    },
                    {
                      period: "Ottobre - Dicembre",
                      desc: "IMU (saldo), Acconti IRPEF, IRAP e cedolare secca",
                      color: "primary",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className={`absolute top-0 left-0 w-full h-1 bg-${item.color}`}></div>
                      <div className="p-6 bg-white">
                        <h4
                          className={`font-bold text-${item.color} text-lg mb-2 group-hover:scale-105 transition-transform duration-300`}
                        >
                          {item.period}
                        </h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400 shadow-sm max-w-2xl mx-auto">
                  <h4 className="font-bold mb-2 flex items-center text-lg">
                    <HelpCircle size={20} className="mr-2 text-yellow-500" />
                    Lo sapevi?
                  </h4>
                  <p className="text-gray-600">
                    Presentare la dichiarazione dei redditi in anticipo può accelerare i tempi di rimborso fiscale.
                    Contattaci per pianificare al meglio le tue scadenze fiscali!
                  </p>
                </div>
              </div>
            </div>

            {/* Informazioni Utili */}
            <div className="mb-24 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-xl p-8">
              <h3 className="text-3xl font-bold mb-8 text-center">Informazioni Utili</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <h4 className="font-bold text-xl mb-4 text-primary">Orari del Servizio</h4>
                  <p className="text-gray-600 text-lg">
                    Lun-Ven: 9:00-13:20, 16:00-19:20
                    <br />
                    Sab: 9:00-13:00
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <h4 className="font-bold text-xl mb-4 text-primary">Documenti Necessari</h4>
                  <p className="text-gray-600 text-lg">
                    Documento d'identità, tessera sanitaria e documentazione specifica in base al tipo di pratica.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <h4 className="font-bold text-xl mb-4 text-primary">Vantaggi del Servizio</h4>
                  <ul className="text-gray-600 space-y-2 text-lg">
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
              </div>

              <div className="mt-12 max-w-xl mx-auto">
                <h4 className="font-bold text-xl mb-4 text-center">Hai bisogno di assistenza?</h4>
                <p className="text-gray-600 mb-6 text-center text-lg">
                  Contattaci per maggiori informazioni sui nostri servizi di CAF e Patronato.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/+393773798570?text=Salve%2C%20vorrei%20informazioni%20sui%20servizi%20di%20CAF%20e%20Patronato.%20Grazie."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20BA5C] text-white font-medium py-3 px-6 rounded-xl transition-colors inline-flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <Image src="/images/whatsapp-icon.png" alt="WhatsApp" width={24} height={24} className="mr-2" />
                    Contattaci su WhatsApp
                  </a>
                  <a
                    href="tel:0810584542"
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors inline-flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    Chiamaci
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-24">
              <FAQSection
                title="Domande Frequenti su CAF e Patronato"
                description="Trova le risposte alle domande più comuni sui nostri servizi di CAF e Patronato."
                faqs={cafPatronatoFAQs}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
