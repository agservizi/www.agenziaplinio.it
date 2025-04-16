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
  BarChart3,
  PiggyBank,
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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-8">I Nostri Servizi</h2>

              <div className="space-y-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  {/* Sostituisci la sezione della telefonia con questa versione ampliata */}
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

                      {/* Nuova sezione: Servizi aggiuntivi */}
                      <h4 className="font-bold text-lg mb-3 text-primary">Servizi Aggiuntivi</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-400">
                          <h5 className="font-bold mb-2">Verifica Copertura</h5>
                          <p className="text-gray-600 text-sm">
                            Analisi gratuita della copertura internet nella tua zona per consigliarti la migliore
                            tecnologia disponibile (FTTH, FTTC, FWA).
                          </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-400">
                          <h5 className="font-bold mb-2">Confronto Tariffe</h5>
                          <p className="text-gray-600 text-sm">
                            Analisi personalizzata delle tue bollette attuali per trovare l'offerta più conveniente in
                            base al tuo profilo di consumo.
                          </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-400">
                          <h5 className="font-bold mb-2">Assistenza Tecnica</h5>
                          <p className="text-gray-600 text-sm">
                            Supporto per problemi tecnici, configurazione router, ottimizzazione della rete Wi-Fi
                            domestica e risoluzione guasti.
                          </p>
                        </div>
                      </div>

                      {/* Nuova sezione: Promozioni speciali */}
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-lg mb-6">
                        <h4 className="font-bold text-lg mb-3">Promozioni Speciali</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <span className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                              1
                            </span>
                            <div>
                              <h5 className="font-bold">Pacchetto Famiglia</h5>
                              <p className="text-gray-600 text-sm">
                                Attiva internet a casa + 2 SIM mobili con uno sconto speciale sul canone mensile e
                                installazione gratuita.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <span className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                              2
                            </span>
                            <div>
                              <h5 className="font-bold">Offerta Smart Home</h5>
                              <p className="text-gray-600 text-sm">
                                Con l'attivazione di una nuova linea fissa, ricevi un dispositivo smart home (Google
                                Nest o Amazon Echo) in omaggio.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <span className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                              3
                            </span>
                            <div>
                              <h5 className="font-bold">Porta un Amico</h5>
                              <p className="text-gray-600 text-sm">
                                Ricevi uno sconto sulla tua bolletta per ogni amico che attiva un nuovo contratto
                                tramite la nostra agenzia.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Nuova sezione: Servizio di consulenza */}
                      <div className="bg-primary/5 p-5 rounded-lg mb-6 border border-primary/20">
                        <h4 className="font-bold text-lg mb-3 flex items-center">
                          <HelpCircle size={18} className="mr-2 text-primary" />
                          Consulenza Personalizzata
                        </h4>
                        <p className="text-gray-600 mb-3">Prenota una consulenza gratuita con i nostri esperti per:</p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                            <span className="text-gray-600 text-sm">Analisi delle tue esigenze di comunicazione</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                            <span className="text-gray-600 text-sm">Ottimizzazione dei costi di telefonia</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                            <span className="text-gray-600 text-sm">
                              Soluzioni per famiglie, professionisti e piccole imprese
                            </span>
                          </li>
                        </ul>
                        <Link
                          href="https://wa.me/+393773798570?text=Salve,%20vorrei%20prenotare%20una%20consulenza%20gratuita%20per%20i%20servizi%20di%20telefonia.%20Grazie."
                          className="bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center relative overflow-hidden group"
                          target="_blank"
                        >
                          <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-300 ease-out group-hover:w-full"></span>
                          <MessageSquare className="mr-2 h-5 w-5 animate-pulse" style={{ animationDuration: "1.5s" }} />
                          <span>Prenota consulenza su WhatsApp</span>
                          <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                        </Link>
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

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Lightbulb className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Efficienza Energetica</h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo consulenza e soluzioni per ottimizzare i consumi energetici della tua casa o azienda,
                        riducendo i costi in bolletta e l'impatto ambientale attraverso tecnologie innovative e buone
                        pratiche.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Analisi Consumi</h4>
                          <p className="text-gray-600 text-sm">
                            Analisi dettagliata dei tuoi consumi energetici per identificare sprechi e inefficienze.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Smart Home</h4>
                          <p className="text-gray-600 text-sm">
                            Dispositivi intelligenti per il controllo e l'ottimizzazione dei consumi (termostati, prese
                            e illuminazione smart).
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Consulenza Bonus</h4>
                          <p className="text-gray-600 text-sm">
                            Assistenza per l'accesso a incentivi e detrazioni fiscali per efficientamento energetico.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Soluzioni Rinnovabili</h4>
                          <p className="text-gray-600 text-sm">
                            Consulenza per l'installazione di impianti fotovoltaici, pompe di calore e sistemi di
                            accumulo.
                          </p>
                        </div>
                      </div>

                      {/* Vantaggi dell'efficienza energetica */}
                      <div className="bg-green-50 p-5 rounded-lg mb-6">
                        <h4 className="font-bold text-lg mb-3">Vantaggi dell'Efficienza Energetica</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col items-center text-center p-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                              <PiggyBank className="text-green-600" size={24} />
                            </div>
                            <h5 className="font-bold mb-1">Risparmio Economico</h5>
                            <p className="text-gray-600 text-sm">
                              Riduci fino al 30% i costi delle bollette energetiche
                            </p>
                          </div>

                          <div className="flex flex-col items-center text-center p-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                              <BarChart3 className="text-green-600" size={24} />
                            </div>
                            <h5 className="font-bold mb-1">Monitoraggio</h5>
                            <p className="text-gray-600 text-sm">Controlla e ottimizza i tuoi consumi in tempo reale</p>
                          </div>

                          <div className="flex flex-col items-center text-center p-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                              <Lightbulb className="text-green-600" size={24} />
                            </div>
                            <h5 className="font-bold mb-1">Sostenibilità</h5>
                            <p className="text-gray-600 text-sm">Riduci l'impatto ambientale e le emissioni di CO2</p>
                          </div>
                        </div>
                      </div>

                      {/* Call to action */}
                      <div className="bg-primary/5 p-5 rounded-lg mb-6 border border-primary/20">
                        <h4 className="font-bold text-lg mb-3">Check-up Energetico Gratuito</h4>
                        <p className="text-gray-600 mb-4">
                          Prenota un check-up energetico gratuito della tua abitazione o attività. I nostri esperti
                          analizzeranno i tuoi consumi e ti suggeriranno le soluzioni più adatte per risparmiare.
                        </p>
                        <Link
                          href="https://wa.me/+393773798570?text=Salve,%20vorrei%20prenotare%20un%20check-up%20energetico%20gratuito%20per%20ottimizzare%20i%20miei%20consumi.%20Grazie."
                          className="bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center relative overflow-hidden group"
                          target="_blank"
                        >
                          <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-300 ease-out group-hover:w-full"></span>
                          <MessageSquare className="mr-2 h-5 w-5 animate-pulse" style={{ animationDuration: "1.5s" }} />
                          <span>Prenota check-up su WhatsApp</span>
                          <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per una consulenza sull'efficienza energetica è utile avere a disposizione le bollette degli
                          ultimi 12 mesi, informazioni sulla superficie dell'immobile e sugli impianti esistenti
                          (riscaldamento, raffrescamento, elettrodomestici).
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
                      <a
                        href="https://wa.me/+393773798570?text=Salve%2C%20vorrei%20informazioni%20sui%20servizi%20di%20telefonia%2C%20luce%20e%20gas.%20Grazie."
                        className="bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center justify-center w-full relative overflow-hidden group"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-300 ease-out group-hover:w-full"></span>
                        <Image src="/images/whatsapp-icon.png" alt="WhatsApp" width={20} height={20} className="mr-2" />
                        <span>Contattaci su WhatsApp</span>
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
