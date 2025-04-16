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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-8">I Nostri Servizi di Spedizione</h2>

              <div className="space-y-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Truck className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Spedizioni Nazionali</h3>
                      <p className="text-gray-600 mb-6">
                        Effettuiamo spedizioni in tutta Italia con i migliori corrieri nazionali, garantendo tempi di
                        consegna rapidi e tracciabilità completa.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Corrieri Disponibili</h4>
                          <p className="text-gray-600 text-sm">BRT, Poste Italiane, TNT/Fedex.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Tempi di Consegna</h4>
                          <p className="text-gray-600 text-sm">
                            Da 1 a 3 giorni lavorativi, in base alla destinazione.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per effettuare una spedizione nazionale è necessario presentare il pacco da spedire, conoscere
                          l'indirizzo completo del destinatario e un recapito telefonico.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Package className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Spedizioni Internazionali</h3>
                      <p className="text-gray-600 mb-6">
                        Effettuiamo spedizioni in tutto il mondo con i principali corrieri internazionali, garantendo
                        sicurezza e tracciabilità.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Corrieri Disponibili</h4>
                          <p className="text-gray-600 text-sm">TNT/Fedex, DHL, UPS e altri.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Tempi di Consegna</h4>
                          <p className="text-gray-600 text-sm">
                            Da 3 a 10 giorni lavorativi, in base alla destinazione.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per effettuare una spedizione internazionale è necessario presentare il pacco da spedire,
                          conoscere l'indirizzo completo del destinatario, un recapito telefonico e, per alcune
                          destinazioni, potrebbe essere richiesta documentazione aggiuntiva.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Package className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Imballaggio e Materiali</h3>
                      <p className="text-gray-600 mb-6">
                        Offriamo servizi di imballaggio professionale per garantire la sicurezza dei tuoi pacchi durante
                        il trasporto. Disponiamo di vari materiali di imballaggio adatti a ogni esigenza.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Materiali Disponibili</h4>
                          <p className="text-gray-600 text-sm">
                            Scatole di varie dimensioni, buste imbottite, pluriball, nastro adesivo, riempitivi.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Servizio di Imballaggio</h4>
                          <p className="text-gray-600 text-sm">
                            Imballaggio professionale per oggetti fragili, documenti, pacchi di varie dimensioni.
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
                    src="/loghi/spedizioni/brt.png"
                    alt="BRT"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/spedizioni/poste-italiane.png"
                    alt="Poste Italiane"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/spedizioni/tnt-fedex.png"
                    alt="TNT/Fedex"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                  <Image
                    src="/loghi/spedizioni/dhl.png"
                    alt="DHL"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain h-24 w-full bg-white p-2"
                  />
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-16">
                <FAQSection
                  title="Domande Frequenti sulle Spedizioni"
                  description="Trova le risposte alle domande più comuni sui nostri servizi di spedizione."
                  faqs={spedizioniFAQs}
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
                    <h4 className="font-bold mb-2">Metodi di Pagamento Accettati</h4>
                    <p className="text-gray-600">Contanti, Bancomat, Carte di Credito, Carte Prepagate.</p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-bold mb-2 text-primary">Vantaggi del Servizio</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Spedizioni rapide e sicure</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Tracciabilità completa</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-2"></span>
                        <span>Assistenza personalizzata</span>
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
                      Contattaci per maggiori informazioni sui nostri servizi di spedizione.
                    </p>
                    <div className="space-y-2">
                      <a
                        href="https://wa.me/+390811234567?text=Buongiorno%2C%20vorrei%20informazioni%20sui%20servizi%20di%20spedizione."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-2 px-4 rounded-md transition-colors inline-block w-full text-center flex items-center justify-center"
                      >
                        <Image src="/images/whatsapp-logo.png" alt="WhatsApp" width={24} height={24} className="mr-2" />
                        Contattaci su WhatsApp
                      </a>
                      <a
                        href="tel:+390810584542"
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
