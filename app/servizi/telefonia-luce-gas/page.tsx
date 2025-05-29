import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Smartphone,
  Zap,
  Flame,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Lightbulb,
  PiggyBank,
  Phone,
} from "lucide-react"
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

      {/* Main Content - Redesigned with full-width extreme interactive layout */}
      <section className="py-0 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[40%] bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-bl from-secondary/20 to-primary/10 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[40%] bg-gradient-to-tr from-primary/15 to-secondary/5 rounded-full blur-3xl opacity-70"></div>
        </div>

        {/* Main Content Container */}
        <div className="container mx-auto px-4 relative z-10">
          {/* Services Header */}
          <div className="py-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
              I Nostri Servizi
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Soluzioni complete per telefonia, energia elettrica e gas con i migliori operatori e fornitori sul
              mercato.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-16 mb-20">
            {/* Telefonia Mobile e Fissa */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl transform group-hover:scale-[1.02] transition-all duration-500 blur-xl opacity-70"></div>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative transform group-hover:scale-[1.01] transition-all duration-500 border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4 flex justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center transform group-hover:rotate-6 transition-all duration-500">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <Smartphone className="text-white h-8 w-8" />
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-3xl font-bold mb-4 text-gray-800 group-hover:text-primary transition-colors duration-300">
                        Telefonia Mobile e Fissa
                      </h3>
                      <p className="text-gray-600 mb-6 text-lg">
                        Offriamo servizi di attivazione, modifica e assistenza per contratti di telefonia mobile e fissa
                        con i principali operatori nazionali, aiutandoti a scegliere l'offerta più adatta alle tue
                        esigenze.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Operatori Disponibili</h4>
                          <p className="text-gray-600">Fastweb, Iliad, WindTre, Pianeta Fibra, Sky e altri.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Servizi Offerti</h4>
                          <p className="text-gray-600">
                            Attivazione nuove linee, portabilità del numero, modifica contratti, assistenza
                            post-vendita.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Telefonia Mobile</h4>
                          <p className="text-gray-600">Offerte per smartphone con chiamate, SMS e internet mobile.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Telefonia Fissa e Internet</h4>
                          <p className="text-gray-600">
                            Offerte per casa con internet fibra o ADSL e chiamate incluse.
                          </p>
                        </div>
                      </div>

                      {/* Servizi Aggiuntivi */}
                      <h4 className="font-bold text-xl mb-4 text-primary">Servizi Aggiuntivi</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-400 hover:shadow-md hover:translate-y-[-5px] transition-all duration-300">
                          <h5 className="font-bold mb-2 text-blue-700">Verifica Copertura</h5>
                          <p className="text-gray-600">
                            Analisi gratuita della copertura internet nella tua zona per consigliarti la migliore
                            tecnologia disponibile (FTTH, FTTC, FWA).
                          </p>
                        </div>

                        <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-400 hover:shadow-md hover:translate-y-[-5px] transition-all duration-300">
                          <h5 className="font-bold mb-2 text-blue-700">Confronto Tariffe</h5>
                          <p className="text-gray-600">
                            Analisi personalizzata delle tue bollette attuali per trovare l'offerta più conveniente in
                            base al tuo profilo di consumo.
                          </p>
                        </div>

                        <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-400 hover:shadow-md hover:translate-y-[-5px] transition-all duration-300">
                          <h5 className="font-bold mb-2 text-blue-700">Assistenza Tecnica</h5>
                          <p className="text-gray-600">
                            Supporto per problemi tecnici, configurazione router, ottimizzazione della rete Wi-Fi
                            domestica e risoluzione guasti.
                          </p>
                        </div>
                      </div>

                      {/* Promozioni Fastweb */}
                      <div className="bg-gradient-to-r from-[#FDC400]/10 to-white rounded-2xl p-6 mb-6 shadow-md border border-[#FDC400]/20 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDC400]/10 rounded-full blur-3xl opacity-70 transform -translate-y-1/2 translate-x-1/2"></div>
                        <h4 className="font-bold text-xl mb-4 text-[#FDC400] flex items-center relative z-10">
                          <Image
                            src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Logo_Fastweb_2020.svg-7FVD78wUiYxgDCEqdxnIzUhEOtIl8w.png"
                            alt="Fastweb"
                            width={120}
                            height={24}
                            className="mr-2"
                          />
                          Promozioni Fastweb
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                          {/* Offerta Fastweb Casa */}
                          <div className="relative group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:border-[#FDC400]">
                            <div className="absolute top-0 right-0 bg-[#FDC400] text-white text-xs font-bold py-1 px-3 rounded-bl-lg z-10">
                              ESCLUSIVA
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FDC400]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="p-6">
                              <h5 className="font-bold text-xl mb-3 flex items-center">
                                <div className="w-10 h-10 bg-[#FDC400]/10 rounded-full flex items-center justify-center mr-3">
                                  <Lightbulb className="text-[#FDC400] h-5 w-5" />
                                </div>
                                Fastweb Casa Light
                              </h5>
                              <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-bold text-gray-800">27,95€</span>
                                <span className="text-sm text-gray-500 ml-2">/mese</span>
                              </div>
                              <ul className="space-y-3 mb-5">
                                <li className="flex items-start">
                                  <span className="w-6 h-6 bg-[#FDC400]/10 rounded-full flex items-center justify-center text-[#FDC400] mr-3 mt-0.5">
                                    ✓
                                  </span>
                                  <span className="text-gray-600">Internet illimitato fino a 2.5 Gbps</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-6 h-6 bg-[#FDC400]/10 rounded-full flex items-center justify-center text-[#FDC400] mr-3 mt-0.5">
                                    ✓
                                  </span>
                                  <span className="text-gray-600">Attivazione inclusa</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-6 h-6 bg-[#FDC400]/10 rounded-full flex items-center justify-center text-[#FDC400] mr-3 mt-0.5">
                                    ✓
                                  </span>
                                  <span className="text-gray-600">Internet Box NeXXt con Wi-Fi 6</span>
                                </li>
                              </ul>
                              <div className="relative overflow-hidden">
                                <a
                                  href="https://wa.me/+393773798570?text=Salve,%20vorrei%20informazioni%20sull'offerta%20Fastweb%20Casa%20Light.%20Grazie."
                                  className="bg-[#FDC400] hover:bg-[#e5b100] text-white font-medium py-3 px-4 rounded-xl transition-colors inline-flex items-center justify-center w-full relative overflow-hidden group"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-500 ease-out group-hover:w-full"></span>
                                  <MessageSquare className="mr-2 h-5 w-5" />
                                  <span className="font-bold">Richiedi info</span>
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Offerta Fastweb Mobile */}
                          <div className="relative group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:border-[#FDC400]">
                            <div className="absolute top-0 right-0 bg-[#FDC400] text-white text-xs font-bold py-1 px-3 rounded-bl-lg z-10">
                              BEST SELLER
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FDC400]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="p-6">
                              <h5 className="font-bold text-xl mb-3 flex items-center">
                                <div className="w-10 h-10 bg-[#FDC400]/10 rounded-full flex items-center justify-center mr-3">
                                  <Smartphone className="text-[#FDC400] h-5 w-5" />
                                </div>
                                Fastweb Mobile
                              </h5>
                              <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-bold text-gray-800">8,95€</span>
                                <span className="text-sm text-gray-500 ml-2">/mese</span>
                              </div>
                              <ul className="space-y-3 mb-5">
                                <li className="flex items-start">
                                  <span className="w-6 h-6 bg-[#FDC400]/10 rounded-full flex items-center justify-center text-[#FDC400] mr-3 mt-0.5">
                                    ✓
                                  </span>
                                  <span className="text-gray-600">150 GB in 5G</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-6 h-6 bg-[#FDC400]/10 rounded-full flex items-center justify-center text-[#FDC400] mr-3 mt-0.5">
                                    ✓
                                  </span>
                                  <span className="text-gray-600">Minuti illimitati</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-6 h-6 bg-[#FDC400]/10 rounded-full flex items-center justify-center text-[#FDC400] mr-3 mt-0.5">
                                    ✓
                                  </span>
                                  <span className="text-gray-600">100 SMS inclusi</span>
                                </li>
                              </ul>
                              <div className="relative overflow-hidden">
                                <a
                                  href="https://wa.me/+393773798570?text=Salve,%20vorrei%20informazioni%20sull'offerta%20Fastweb%20Mobile.%20Grazie."
                                  className="bg-[#FDC400] hover:bg-[#e5b100] text-white font-medium py-3 px-4 rounded-xl transition-colors inline-flex items-center justify-center w-full relative overflow-hidden group"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-500 ease-out group-hover:w-full"></span>
                                  <MessageSquare className="mr-2 h-5 w-5" />
                                  <span className="font-bold">Richiedi info</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Offerta combinata Casa + Mobile */}
                        <div className="mt-6 relative group overflow-hidden rounded-xl border border-[#FDC400]/20 bg-white transition-all duration-500 hover:shadow-xl hover:scale-[1.01] hover:border-[#FDC400]">
                          <div className="absolute top-0 right-0 bg-[#ff6b00] text-white text-xs font-bold py-1 px-3 rounded-bl-lg z-10">
                            FASTWEB
                          </div>
                          <div className="p-6">
                            <h5 className="font-bold text-xl mb-3 flex items-center">
                              <div className="w-10 h-10 bg-[#FDC400]/10 rounded-full flex items-center justify-center mr-3">
                                <PiggyBank className="text-[#FDC400] h-5 w-5" />
                              </div>
                              Fastweb Casa + Mobile
                            </h5>
                            <p className="text-gray-600 mb-4">Fibra ultraveloce e mobile 5G con minuti illimitati</p>

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-yellow-50 p-4 rounded-xl mb-4 shadow-sm">
                              <div className="flex items-center mb-3 md:mb-0">
                                <div className="w-12 h-12 bg-[#FDC400]/10 rounded-full flex items-center justify-center mr-4">
                                  <Zap className="text-[#FDC400] h-6 w-6" />
                                </div>
                                <div>
                                  <h6 className="font-bold text-lg">Fastweb Casa + Mobile</h6>
                                  <p className="text-sm text-gray-500">FastwebUP Plus, WOW Space incluso</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="text-right mr-4">
                                  <p className="text-sm text-gray-500 line-through">55,85€/mese</p>
                                  <p className="font-bold text-2xl text-[#ff6b00]">34,95€/mese</p>
                                </div>
                                <div className="bg-[#ff6b00] text-white text-xs font-bold py-1 px-3 rounded animate-pulse">
                                  -20€/mese
                                </div>
                              </div>
                            </div>

                            <div className="relative overflow-hidden">
                              <a
                                href="https://wa.me/+393773798570?text=Salve,%20vorrei%20informazioni%20sull'offerta%20combinata%20Fastweb%20Casa%20+%20Mobile.%20Grazie."
                                className="bg-gradient-to-r from-[#FDC400] to-[#ff6b00] hover:from-[#e5b100] hover:to-[#e56100] text-white font-medium py-3 px-4 rounded-xl transition-colors inline-flex items-center justify-center w-full relative overflow-hidden group"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-500 ease-out group-hover:w-full"></span>
                                <MessageSquare className="mr-2 h-5 w-5" />
                                <span className="font-bold">Scopri l'offerta combinata</span>
                                <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 text-center">
                          <p className="text-sm text-gray-500">
                            Prezzi IVA inclusa. Verifica copertura e dettagli completi delle offerte in agenzia.
                          </p>
                        </div>
                      </div>

                      {/* Servizio di consulenza */}
                      <div className="bg-gradient-to-r from-primary/10 to-white p-6 rounded-2xl mb-6 border border-primary/20 relative overflow-hidden group hover:shadow-lg transition-all duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70 transform -translate-y-1/2 translate-x-1/2"></div>
                        <h4 className="font-bold text-xl mb-4 flex items-center relative z-10">
                          <HelpCircle size={20} className="mr-3 text-primary" />
                          Consulenza Personalizzata
                        </h4>
                        <p className="text-gray-600 mb-4 relative z-10">
                          Prenota una consulenza gratuita con i nostri esperti per:
                        </p>
                        <ul className="space-y-2 mb-5 relative z-10">
                          <li className="flex items-start">
                            <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="w-2 h-2 bg-primary rounded-full"></span>
                            </span>
                            <span className="text-gray-600">Analisi delle tue esigenze di comunicazione</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="w-2 h-2 bg-primary rounded-full"></span>
                            </span>
                            <span className="text-gray-600">Ottimizzazione dei costi di telefonia</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="w-2 h-2 bg-primary rounded-full"></span>
                            </span>
                            <span className="text-gray-600">
                              Soluzioni per famiglie, professionisti e piccole imprese
                            </span>
                          </li>
                        </ul>
                        <Link
                          href="https://wa.me/+393773798570?text=Salve,%20vorrei%20prenotare%20una%20consulenza%20gratuita%20per%20i%20servizi%20di%20telefonia.%20Grazie."
                          className="bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-3 px-4 rounded-xl transition-colors inline-flex items-center relative overflow-hidden group"
                          target="_blank"
                        >
                          <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-500 ease-out group-hover:w-full"></span>
                          <MessageSquare className="mr-2 h-5 w-5 animate-pulse" style={{ animationDuration: "1.5s" }} />
                          <span className="font-bold">Prenota consulenza su WhatsApp</span>
                          <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>

                      <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={18} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600">
                          Per attivare un nuovo contratto di telefonia è necessario presentare un documento d'identità
                          valido, codice fiscale e, in caso di portabilità, il codice di migrazione o il numero seriale
                          della SIM.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Energia Elettrica */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-yellow-500/10 rounded-3xl transform group-hover:scale-[1.02] transition-all duration-500 blur-xl opacity-70"></div>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative transform group-hover:scale-[1.01] transition-all duration-500 border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-yellow-500"></div>
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4 flex justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-yellow-500/20 rounded-full flex items-center justify-center transform group-hover:rotate-6 transition-all duration-500">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-full flex items-center justify-center">
                          <Zap className="text-white h-8 w-8" />
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-3xl font-bold mb-4 text-gray-800 group-hover:text-blue-500 transition-colors duration-300">
                        Energia Elettrica
                      </h3>
                      <p className="text-gray-600 mb-6 text-lg">
                        Offriamo servizi di attivazione, voltura, subentro e cambio fornitore per contratti di energia
                        elettrica, con consulenza personalizzata per trovare l'offerta più conveniente in base ai tuoi
                        consumi.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Fornitori Disponibili</h4>
                          <p className="text-gray-600">A2A Energia, Enel Energia, Fastweb Energia e altri.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Servizi Offerti</h4>
                          <p className="text-gray-600">
                            Attivazione nuove utenze, voltura, subentro, cambio fornitore, assistenza post-vendita.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Offerte per Privati</h4>
                          <p className="text-gray-600">Contratti per abitazioni con tariffe fisse o indicizzate.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Offerte per Aziende</h4>
                          <p className="text-gray-600">
                            Contratti per attività commerciali e imprese con tariffe personalizzate.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={18} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600">
                          Per attivare un contratto di energia elettrica è necessario presentare un documento d'identità
                          valido, codice fiscale, dati dell'immobile (indirizzo completo), POD (reperibile su una
                          bolletta precedente) e, in caso di voltura o subentro, una lettura del contatore.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gas */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl transform group-hover:scale-[1.02] transition-all duration-500 blur-xl opacity-70"></div>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative transform group-hover:scale-[1.01] transition-all duration-500 border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4 flex justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center transform group-hover:rotate-6 transition-all duration-500">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <Flame className="text-white h-8 w-8" />
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-3xl font-bold mb-4 text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
                        Gas
                      </h3>
                      <p className="text-gray-600 mb-6 text-lg">
                        Offriamo servizi di attivazione, voltura, subentro e cambio fornitore per contratti di gas, con
                        consulenza personalizzata per trovare l'offerta più conveniente in base ai tuoi consumi.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Fornitori Disponibili</h4>
                          <p className="text-gray-600">A2A Energia, Enel Energia, Fastweb Energia e altri.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Servizi Offerti</h4>
                          <p className="text-gray-600">
                            Attivazione nuove utenze, voltura, subentro, cambio fornitore, assistenza post-vendita.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Offerte per Privati</h4>
                          <p className="text-gray-600">Contratti per abitazioni con tariffe fisse o indicizzate.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Offerte per Aziende</h4>
                          <p className="text-gray-600">
                            Contratti per attività commerciali e imprese con tariffe personalizzate.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={18} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600">
                          Per attivare un contratto di gas è necessario presentare un documento d'identità valido,
                          codice fiscale, dati dell'immobile (indirizzo completo), PDR (reperibile su una bolletta
                          precedente) e, in caso di voltura o subentro, una lettura del contatore.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Efficienza Energetica */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-3xl transform group-hover:scale-[1.02] transition-all duration-500 blur-xl opacity-70"></div>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative transform group-hover:scale-[1.01] transition-all duration-500 border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500"></div>
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4 flex justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full flex items-center justify-center transform group-hover:rotate-6 transition-all duration-500">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                          <Lightbulb className="text-white h-8 w-8" />
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-3xl font-bold mb-4 text-gray-800 group-hover:text-green-500 transition-colors duration-300">
                        Efficienza Energetica
                      </h3>
                      <p className="text-gray-600 mb-6 text-lg">
                        Offriamo consulenza e soluzioni per ottimizzare i consumi energetici della tua casa o azienda,
                        riducendo i costi in bolletta e l'impatto ambientale attraverso tecnologie innovative e buone
                        pratiche.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Analisi Consumi</h4>
                          <p className="text-gray-600">
                            Analisi dettagliata dei tuoi consumi energetici per identificare sprechi e inefficienze.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Smart Home</h4>
                          <p className="text-gray-600">
                            Dispositivi intelligenti per il controllo e l'ottimizzazione dei consumi (termostati, prese
                            e illuminazione smart).
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Consulenza Bonus</h4>
                          <p className="text-gray-600">
                            Assistenza per l'accesso a incentivi e detrazioni fiscali per efficientamento energetico.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300">
                          <h4 className="font-bold mb-2 text-gray-800">Soluzioni Rinnovabili</h4>
                          <p className="text-gray-600">
                            Consulenza per l'installazione di impianti fotovoltaici, pompe di calore e sistemi di
                            accumulo.
                          </p>
                        </div>
                      </div>

                      {/* Offerte Energia e Gas in Evidenza */}
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl mb-6 border border-blue-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-70 transform -translate-y-1/2 translate-x-1/2"></div>
                        <h4 className="font-bold text-xl mb-4 text-blue-700 relative z-10">
                          Offerte Energia e Gas in Evidenza
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                          {/* Offerta Fastweb Energia */}
                          <div className="relative group overflow-hidden rounded-xl border border-[#FDC400]/20 bg-white transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:border-[#FDC400]">
                            <div className="absolute top-0 right-0 bg-[#FDC400] text-white text-xs font-bold py-1 px-3 rounded-bl-lg z-10">
                              NOVITÀ
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FDC400]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="p-6">
                              <div className="flex items-center mb-3">
                                <Image
                                  src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Logo_Fastweb_2020.svg-7FVD78wUiYxgDCEqdxnIzUhEOtIl8w.png"
                                  alt="Fastweb"
                                  width={100}
                                  height={20}
                                  className="mr-2"
                                />
                              </div>
                              <h5 className="font-bold text-xl mb-3 flex items-center">
                                <div className="w-10 h-10 bg-[#FDC400]/10 rounded-full flex items-center justify-center mr-3">
                                  <Zap className="text-[#FDC400] h-5 w-5" />
                                </div>
                                Fastweb Energia Flex
                              </h5>
                              <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-bold text-gray-800">0,158€</span>
                                <span className="text-sm text-gray-500 ml-2">/kWh</span>
                              </div>
                              <ul className="space-y-3 mb-5">
                                <li className="flex items-start">
                                  <span className="w-6 h-6 bg-[#FDC400]/10 rounded-full flex items-center justify-center text-[#FDC400] mr-3 mt-0.5">
                                    ✓
                                  </span>
                                  <span className="text-gray-600">Prezzo indicizzato al PUN con sconto</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-6 h-6 bg-[#FDC400]/10 rounded-full flex items-center justify-center text-[#FDC400] mr-3 mt-0.5">
                                    ✓
                                  </span>
                                  <span className="text-gray-600">Energia 100% verde certificata</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-6 h-6 bg-[#FDC400]/10 rounded-full flex items-center justify-center text-[#FDC400] mr-3 mt-0.5">
                                    ✓
                                  </span>
                                  <span className="text-gray-600">Zero costi di attivazione</span>
                                </li>
                              </ul>
                              <div className="relative overflow-hidden">
                                <a
                                  href="https://wa.me/+393773798570?text=Salve,%20vorrei%20informazioni%20sull'offerta%20Fastweb%20Energia%20Flex.%20Grazie."
                                  className="bg-[#FDC400] hover:bg-[#e5b100] text-white font-medium py-3 px-4 rounded-xl transition-colors inline-flex items-center justify-center w-full relative overflow-hidden group"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-500 ease-out group-hover:w-full"></span>
                                  <MessageSquare className="mr-2 h-5 w-5" />
                                  <span className="font-bold">Richiedi info</span>
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Offerta A2A Energia */}
                          <div className="relative group overflow-hidden rounded-xl border border-[#009FE3]/20 bg-white transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:border-[#009FE3]">
                            <div className="absolute top-0 right-0 bg-[#009FE3] text-white text-xs font-bold py-1 px-3 rounded-bl-lg z-10">
                              A2A
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#009FE3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="p-6">
                              <div className="flex items-center mb-3">
                                <Image
                                  src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/a2alogo-wHvgkm0ecSPUXdG4CCsFg9FrzqSLkl.png"
                                  alt="A2A Energia"
                                  width={100}
                                  height={40}
                                  className="object-contain"
                                />
                              </div>
                              <h5 className="font-bold text-xl mb-3 flex items-center">
                                <div className="w-10 h-10 bg-[#009FE3]/10 rounded-full flex items-center justify-center mr-3">
                                  <Flame className="text-[#009FE3] h-5 w-5" />
                                </div>
                                A2A Full Luce e Gas
                              </h5>
                              <div className="flex flex-col mb-4">
                                <div className="flex items-baseline mb-1">
                                  <span className="text-3xl font-bold text-gray-800">0,14900€</span>
                                  <span className="text-sm text-gray-500 ml-2">/kWh</span>
                                  <span className="text-xs text-gray-500 ml-2">(Luce)</span>
                                </div>
                                <div className="flex items-baseline">
                                  <span className="text-3xl font-bold text-gray-800">0,5600€</span>
                                  <span className="text-sm text-gray-500 ml-2">/Smc</span>
                                  <span className="text-xs text-gray-500 ml-2">(Gas)</span>
                                </div>
                              </div>
                              <ul className="space-y-3 mb-5">
                                <li className="flex items-start">
                                  <span className="w-6 h-6 bg-[#009FE3]/10 rounded-full flex items-center justify-center text-[#009FE3] mr-3 mt-0.5">
                                    ✓
                                  </span>
                                  <span className="text-gray-600">Prezzo fisso bloccato 24 mesi</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-6 h-6 bg-[#009FE3]/10 rounded-full flex items-center justify-center text-[#009FE3] mr-3 mt-0.5">
                                    ✓
                                  </span>
                                  <span className="text-gray-600">Energia 100% verde certificata</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="w-6 h-6 bg-[#009FE3]/10 rounded-full flex items-center justify-center text-[#009FE3] mr-3 mt-0.5">
                                    ✓
                                  </span>
                                  <span className="text-gray-600">Sconto 5% per domiciliazione</span>
                                </li>
                              </ul>
                              <div className="relative overflow-hidden">
                                <a
                                  href="https://wa.me/+393773798570?text=Salve,%20vorrei%20informazioni%20sull'offerta%20A2A%20Full.%20Grazie."
                                  className="bg-[#009FE3] hover:bg-[#0084bd] text-white font-medium py-3 px-4 rounded-xl transition-colors inline-flex items-center justify-center w-full relative overflow-hidden group"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-500 ease-out group-hover:w-full"></span>
                                  <MessageSquare className="mr-2 h-5 w-5" />
                                  <span className="font-bold">Richiedi info</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 text-center">
                          <p className="text-sm text-gray-500">
                            Prezzi indicativi IVA inclusa. Verifica copertura e dettagli completi delle offerte in
                            agenzia.
                          </p>
                        </div>
                      </div>

                      {/* Call to action */}
                      <div className="bg-gradient-to-r from-green-500/10 to-white p-6 rounded-2xl mb-6 border border-green-500/20 relative overflow-hidden group hover:shadow-lg transition-all duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl opacity-70 transform -translate-y-1/2 translate-x-1/2"></div>
                        <h4 className="font-bold text-xl mb-4 relative z-10">Check-up Energetico Gratuito</h4>
                        <p className="text-gray-600 mb-5 relative z-10">
                          Prenota un check-up energetico gratuito della tua abitazione o attività. I nostri esperti
                          analizzeranno i tuoi consumi e ti suggeriranno le soluzioni più adatte per risparmiare.
                        </p>
                        <Link
                          href="https://wa.me/+393773798570?text=Salve,%20vorrei%20prenotare%20un%20check-up%20energetico%20gratuito%20per%20ottimizzare%20i%20miei%20consumi.%20Grazie."
                          className="bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-3 px-4 rounded-xl transition-colors inline-flex items-center relative overflow-hidden group"
                          target="_blank"
                        >
                          <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-500 ease-out group-hover:w-full"></span>
                          <MessageSquare className="mr-2 h-5 w-5 animate-pulse" style={{ animationDuration: "1.5s" }} />
                          <span className="font-bold">Prenota check-up su WhatsApp</span>
                          <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>

                      <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={18} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600">
                          Per una consulenza sull'efficienza energetica è utile avere a disposizione le bollette degli
                          ultimi 12 mesi, informazioni sulla superficie dell'immobile e sugli impianti esistenti
                          (riscaldamento, raffrescamento, elettrodomestici).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Section */}
          <div className="py-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
              I Nostri Partner
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12">
              Collaboriamo con i migliori operatori e fornitori per offrirti sempre le soluzioni più vantaggiose.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-gray-100 hover:border-primary/20 flex items-center justify-center h-32 relative overflow-hidden">
                <Image
                  src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Logo_Fastweb_2020.svg-7FVD78wUiYxgDCEqdxnIzUhEOtIl8w.png"
                  alt="Fastweb"
                  width={160}
                  height={32}
                  className="object-contain max-h-16"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-gray-100 hover:border-primary/20 flex items-center justify-center h-32 relative overflow-hidden">
                <Image
                  src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Iliad_logo-vDBBHCfOm9PgxVZpyYvSJkFyvigtwU.png"
                  alt="Iliad"
                  width={140}
                  height={60}
                  className="object-contain max-h-16"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-gray-100 hover:border-primary/20 flex items-center justify-center h-32 relative overflow-hidden">
                <Image
                  src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/a2alogo-wHvgkm0ecSPUXdG4CCsFg9FrzqSLkl.png"
                  alt="A2A Energia"
                  width={120}
                  height={40}
                  className="object-contain max-h-16"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-gray-100 hover:border-primary/20 flex items-center justify-center h-32 relative overflow-hidden">
                <Image
                  src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Enel_Group_logo.svg-jipkWt8lK1lB5fiYSPs4Vd4PRD75KG.png"
                  alt="Enel Energia"
                  width={140}
                  height={40}
                  className="object-contain max-h-16"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
                Domande Frequenti
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                Trova le risposte alle domande più comuni sui nostri servizi di telefonia, energia elettrica e gas.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <FAQSection title="" description="" faqs={telefoniaLuceGasFAQs} />
            </div>
          </div>

          {/* Contact Section */}
          <div className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
              <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full blur-3xl opacity-70"></div>
              <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-tl from-secondary/20 to-primary/10 rounded-full blur-3xl opacity-70"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
                  Contattaci
                </h2>
                <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                  Hai domande sui nostri servizi? Contattaci per una consulenza personalizzata.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
                <a
                  href="https://wa.me/+393773798570?text=Salve%2C%20vorrei%20informazioni%20sui%20servizi%20di%20telefonia%2C%20luce%20e%20gas.%20Grazie."
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BD5C] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex-1 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-500 ease-out group-hover:w-full"></span>
                  <Image src="/images/whatsapp-icon.png" alt="WhatsApp" width={24} height={24} className="mr-3" />
                  <span>Contattaci su WhatsApp</span>
                </a>
                <a
                  href="tel:0810584542"
                  className="bg-white border-2 border-primary hover:bg-primary/5 text-primary hover:text-primary font-bold py-4 px-6 rounded-xl transition-all duration-300 flex-1 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <Phone className="mr-3 h-6 w-6" />
                  <span>Chiamaci</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
