import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Truck, Package, HelpCircle } from "lucide-react"
import FAQSection from "@/components/faq-section"

const spedizioniFAQs = [
  {
    question: "Quali corrieri utilizzate per le spedizioni?",
    answer:
      "Collaboriamo con diversi corrieri nazionali e internazionali, tra cui BRT, Poste Italiane, TNT/Fedex. Possiamo consigliarti il corriere più adatto alle tue esigenze in base alla destinazione, ai tempi di consegna e al budget.",
  },
  {
    question: "Quanto costa spedire un pacco in Italia?",
    answer:
      "Il costo di spedizione di un pacco in Italia dipende dal peso, dalle dimensioni e dalla destinazione. Contattaci o vieni in agenzia per un preventivo personalizzato.",
  },
  {
    question: "Posso tracciare la mia spedizione?",
    answer:
      "Sì, per tutte le spedizioni forniamo un codice di tracciamento che permette di seguire il percorso del pacco fino alla consegna.",
  },
  {
    question: "Quali sono i tempi di consegna?",
    answer:
      "I tempi di consegna variano in base al corriere scelto e alla destinazione. In generale, per le spedizioni nazionali i tempi variano da 1 a 3 giorni lavorativi, mentre per le spedizioni internazionali possono variare da 3 a 10 giorni lavorativi.",
  },
]

export default function Spedizioni() {
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
              <h1 className="text-4xl font-bold mb-6">Servizi di Spedizione</h1>
              <p className="text-xl max-w-3xl">
                Offriamo servizi di spedizione nazionali e internazionali con i migliori corrieri, garantendo sicurezza,
                tracciabilità e tempi di consegna rapidi.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Truck size={64} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Extreme Interactive Design */}
      <section className="py-0 overflow-hidden bg-gradient-to-b from-primary/5 to-white">
        {/* Hero Wave Background */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path
              fill="#4f46e5"
              fillOpacity="1"
              d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,117.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Servizi di Spedizione - Interactive Cards */}
          <div className="py-16">
            <h2 className="text-5xl font-black mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              I Nostri Servizi di Spedizione
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {/* Card 1 - Spedizioni Nazionali */}
              <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600"></div>
                <div className="absolute top-0 right-0 bg-primary/10 w-24 h-24 rounded-full -mt-8 -mr-8"></div>

                <div className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Truck className="text-primary" size={32} />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    Spedizioni Nazionali
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Effettuiamo spedizioni in tutta Italia con i migliori corrieri nazionali, garantendo tempi di
                    consegna rapidi e tracciabilità completa.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-primary">
                      <h4 className="font-bold mb-2">Corrieri Disponibili</h4>
                      <p className="text-gray-600">BRT, Poste Italiane, TNT/Fedex.</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-secondary">
                      <h4 className="font-bold mb-2">Tempi di Consegna</h4>
                      <p className="text-gray-600">Da 1 a 3 giorni lavorativi, in base alla destinazione.</p>
                    </div>
                  </div>

                  <div className="mt-6 bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400">
                    <h4 className="font-bold mb-2 flex items-center">
                      <HelpCircle size={16} className="mr-2 text-yellow-500" />
                      Cosa serve
                    </h4>
                    <p className="text-gray-600">
                      Per effettuare una spedizione nazionale è necessario presentare il pacco da spedire, conoscere
                      l'indirizzo completo del destinatario e un recapito telefonico.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto">
                  <a
                    href="#"
                    className="text-primary font-medium flex items-center justify-center group-hover:underline"
                  >
                    Richiedi preventivo
                    <ArrowLeft size={16} className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Card 2 - Spedizioni Internazionali */}
              <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-primary"></div>
                <div className="absolute top-0 right-0 bg-blue-500/10 w-24 h-24 rounded-full -mt-8 -mr-8"></div>

                <div className="p-8">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Package className="text-blue-500" size={32} />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-500 transition-colors">
                    Spedizioni Internazionali
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Effettuiamo spedizioni in tutto il mondo con i principali corrieri internazionali, garantendo
                    sicurezza e tracciabilità.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-blue-500">
                      <h4 className="font-bold mb-2">Corrieri Disponibili</h4>
                      <p className="text-gray-600">TNT/Fedex, Poste Italiane, BRT e altri.</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-blue-400">
                      <h4 className="font-bold mb-2">Tempi di Consegna</h4>
                      <p className="text-gray-600">Da 3 a 10 giorni lavorativi, in base alla destinazione.</p>
                    </div>
                  </div>

                  <div className="mt-6 bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400">
                    <h4 className="font-bold mb-2 flex items-center">
                      <HelpCircle size={16} className="mr-2 text-yellow-500" />
                      Cosa serve
                    </h4>
                    <p className="text-gray-600">
                      Per effettuare una spedizione internazionale è necessario presentare il pacco da spedire,
                      conoscere l'indirizzo completo del destinatario, un recapito telefonico e, per alcune
                      destinazioni, potrebbe essere richiesta documentazione aggiuntiva.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto">
                  <a
                    href="#"
                    className="text-blue-500 font-medium flex items-center justify-center group-hover:underline"
                  >
                    Richiedi preventivo
                    <ArrowLeft size={16} className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Card 3 - Imballaggio e Materiali */}
              <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-green-500"></div>
                <div className="absolute top-0 right-0 bg-secondary/10 w-24 h-24 rounded-full -mt-8 -mr-8"></div>

                <div className="p-8">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Package className="text-secondary" size={32} />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors">
                    Imballaggio e Materiali
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Offriamo servizi di imballaggio professionale per garantire la sicurezza dei tuoi pacchi durante il
                    trasporto. Disponiamo di vari materiali di imballaggio adatti a ogni esigenza.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-secondary">
                      <h4 className="font-bold mb-2">Materiali Disponibili</h4>
                      <p className="text-gray-600">
                        Scatole di varie dimensioni, buste imbottite, pluriball, nastro adesivo, riempitivi.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-green-500">
                      <h4 className="font-bold mb-2">Servizio di Imballaggio</h4>
                      <p className="text-gray-600">
                        Imballaggio professionale per oggetti fragili, documenti, pacchi di varie dimensioni.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto">
                  <a
                    href="#"
                    className="text-secondary font-medium flex items-center justify-center group-hover:underline"
                  >
                    Scopri di più
                    <ArrowLeft size={16} className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Informazioni Utili - Interactive Section */}
          <div className="py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl -z-10"></div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-3xl font-bold mb-8 text-center">Informazioni Utili</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Orari del Servizio
                  </h4>
                  <div className="space-y-2 ml-13">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lunedì - Venerdì:</span>
                      <span className="font-medium">9:00-13:20, 16:00-19:20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sabato:</span>
                      <span className="font-medium">9:00-13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domenica:</span>
                      <span className="font-medium">Chiuso</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-secondary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path
                          fillRule="evenodd"
                          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Metodi di Pagamento
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                      <span className="text-gray-800 font-medium">Contanti</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                      <span className="text-gray-800 font-medium">Bancomat</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                      <span className="text-gray-800 font-medium">Carte di Credito</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                      <span className="text-gray-800 font-medium">Carte Prepagate</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Vantaggi del Servizio
                  </h4>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                      <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                      <span className="text-gray-800">Spedizioni rapide e sicure</span>
                    </li>
                    <li className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                      <span className="w-3 h-3 bg-secondary rounded-full mr-3"></span>
                      <span className="text-gray-800">Tracciabilità completa</span>
                    </li>
                    <li className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-gray-800">Assistenza personalizzata</span>
                    </li>
                    <li className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                      <span className="text-gray-800">Tariffe competitive</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl">
                <h4 className="font-bold text-xl mb-4 text-center">Hai bisogno di assistenza?</h4>
                <p className="text-gray-600 text-center mb-6">
                  Contattaci per maggiori informazioni sui nostri servizi di spedizione.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/+390811234567?text=Buongiorno%2C%20vorrei%20informazioni%20sui%20servizi%20di%20spedizione."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-3 px-6 rounded-xl transition-colors inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Image src="/images/whatsapp-logo.png" alt="WhatsApp" width={24} height={24} className="mr-2" />
                    Contattaci su WhatsApp
                  </a>
                  <a
                    href="tel:+390810584542"
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-xl transition-all inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Chiamaci
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Section - Interactive */}
          <div className="py-16">
            <h3 className="text-3xl font-bold mb-10 text-center">I Nostri Partner</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="group bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Image
                  src="/loghi/spedizioni/brt.png"
                  alt="BRT"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain h-24 w-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="group bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Image
                  src="/loghi/spedizioni/poste-italiane.png"
                  alt="Poste Italiane"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain h-24 w-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="group bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Image
                  src="/loghi/spedizioni/tnt-fedex.png"
                  alt="TNT/Fedex"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain h-24 w-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="group bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Image
                  src="/loghi/spedizioni/dhl.png"
                  alt="DHL"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain h-24 w-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* FAQ Section - Interactive */}
          <div className="py-16">
            <div className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 rounded-3xl p-8 shadow-xl">
              <FAQSection
                title="Domande Frequenti sulle Spedizioni"
                description="Trova le risposte alle domande più comuni sui nostri servizi di spedizione."
                faqs={spedizioniFAQs}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
