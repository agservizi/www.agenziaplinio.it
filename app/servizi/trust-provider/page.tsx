import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, MessageSquare } from "lucide-react"
import FAQSection from "@/components/faq-section"

export const metadata = {
  title: "Trust Provider | AG SERVIZI",
  description: "Servizi di Trust Provider: SPID, PEC, Firma Digitale e altri servizi digitali.",
}

export default function TrustProviderPage() {
  return (
    <div className="pt-0 page-transition">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trust Provider</h1>
            <p className="text-xl mb-8">
              Attiva i tuoi servizi digitali con AG SERVIZI: SPID, PEC, Firma Digitale e molto altro.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">SPID - Sistema Pubblico di Identità Digitale</h2>
              <p className="text-gray-600 mb-6">
                Lo SPID è il sistema di autenticazione che permette a cittadini e imprese di accedere ai servizi online
                della pubblica amministrazione e dei privati aderenti con un'identità digitale unica.
              </p>
              <p className="text-gray-600 mb-6">
                Con AG SERVIZI puoi attivare il tuo SPID in modo semplice e veloce, con l'assistenza dei nostri
                operatori qualificati.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" size={20} />
                  <p className="text-gray-600">
                    <span className="font-medium">Riconoscimento de visu:</span> Vieni in agenzia con un documento
                    d'identità valido, la tessera sanitaria, un indirizzo email e il tuo smartphone.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" size={20} />
                  <p className="text-gray-600">
                    <span className="font-medium">Assistenza completa:</span> Ti guidiamo in tutte le fasi
                    dell'attivazione, dalla registrazione alla configurazione finale.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" size={20} />
                  <p className="text-gray-600">
                    <span className="font-medium">Operatori certificati:</span> Il nostro personale è formato e
                    certificato per l'attivazione SPID con Namirial.
                  </p>
                </div>
              </div>
              <Link
                href="https://wa.me/+393XXXXXXXXX?text=Salve,%20vorrei%20informazioni%20sull'attivazione%20dello%20SPID%20(costi,%20documenti%20necessari,%20tempistiche).%20Grazie."
                className="group bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center relative overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                <MessageSquare size={20} className="mr-2 animate-[pulse_1.5s_ease-in-out_infinite] relative" />
                <span className="relative">Chiedi info su WhatsApp</span>
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300 relative"
                />
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="SPID Attivazione"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="PEC - Posta Elettronica Certificata"
                width={800}
                height={600}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">PEC - Posta Elettronica Certificata</h2>
              <p className="text-gray-600 mb-6">
                La PEC è il sistema che consente di inviare email con valore legale equiparato ad una raccomandata con
                ricevuta di ritorno. È obbligatoria per aziende, professionisti e sempre più utilizzata dai privati.
              </p>
              <p className="text-gray-600 mb-6">
                In AG SERVIZI puoi attivare la tua casella PEC con pochi semplici passaggi, scegliendo tra diverse
                soluzioni in base alle tue esigenze.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" size={20} />
                  <p className="text-gray-600">
                    <span className="font-medium">Attivazione immediata:</span> La tua PEC sarà attiva in pochi minuti.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" size={20} />
                  <p className="text-gray-600">
                    <span className="font-medium">Assistenza all'uso:</span> Ti spieghiamo come utilizzare la tua nuova
                    casella PEC.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" size={20} />
                  <p className="text-gray-600">
                    <span className="font-medium">Rinnovi semplificati:</span> Gestione dei rinnovi annuali senza
                    pensieri.
                  </p>
                </div>
              </div>
              <Link
                href="https://wa.me/+393773798570?text=Salve,%20vorrei%20informazioni%20sull'attivazione%20della%20PEC%20(costi,%20tempistiche,%20modalità).%20Grazie."
                className="group bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center relative overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                <MessageSquare size={20} className="mr-2 animate-[pulse_1.5s_ease-in-out_infinite] relative" />
                <span className="relative">Chiedi info su WhatsApp</span>
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300 relative"
                />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Firma Digitale</h2>
              <p className="text-gray-600 mb-6">
                La Firma Digitale è l'equivalente informatico di una firma autografa apposta su carta e ha lo stesso
                valore legale. È uno strumento essenziale per professionisti, aziende e privati che vogliono
                digitalizzare i propri processi.
              </p>
              <p className="text-gray-600 mb-6">
                AG SERVIZI è partner Namirial per il rilascio di dispositivi di Firma Digitale, disponibili in diversi
                formati: smart card, token USB o firma remota.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" size={20} />
                  <p className="text-gray-600">
                    <span className="font-medium">Riconoscimento in sede:</span> Vieni in agenzia con un documento
                    d'identità valido e la tessera sanitaria.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" size={20} />
                  <p className="text-gray-600">
                    <span className="font-medium">Configurazione assistita:</span> Ti aiutiamo a configurare il
                    dispositivo sul tuo computer.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" size={20} />
                  <p className="text-gray-600">
                    <span className="font-medium">Supporto continuo:</span> Assistenza per tutta la durata del
                    certificato.
                  </p>
                </div>
              </div>
              <Link
                href="/contatti"
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center"
              >
                Richiedi la Firma Digitale
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Firma Digitale"
                width={800}
                height={600}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* I Nostri Partner */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">I Nostri Partner</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Utilizziamo placeholder.svg invece di immagini che potrebbero non essere disponibili */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="SPID"
                width={200}
                height={200}
                className="object-contain h-24 w-full"
                loading="lazy"
              />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Namirial"
                width={200}
                height={200}
                className="object-contain h-24 w-full"
                loading="lazy"
              />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Aruba PEC"
                width={200}
                height={200}
                className="object-contain h-24 w-full"
                loading="lazy"
              />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="AGID"
                width={200}
                height={200}
                className="object-contain h-24 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title="Domande Frequenti"
        description="Trova le risposte alle domande più comuni sui nostri servizi di Trust Provider."
        faqs={[
          {
            question: "Quanto costa attivare lo SPID?",
            answer:
              "Il costo di attivazione dello SPID varia in base al provider scelto. Con Namirial, il nostro partner principale, il costo è di € 22,00. Contattaci per conoscere eventuali promozioni in corso.",
          },
          {
            question: "Quali documenti servono per la Firma Digitale?",
            answer:
              "Per richiedere la Firma Digitale è necessario presentare un documento d'identità valido (carta d'identità, passaporto o patente) e la tessera sanitaria. Per le aziende sono richiesti anche documenti aggiuntivi relativi alla società.",
          },
          {
            question: "Quanto tempo serve per attivare una PEC?",
            answer:
              "L'attivazione di una casella PEC è immediata. In pochi minuti potrai iniziare ad utilizzare la tua nuova casella di posta elettronica certificata.",
          },
          {
            question: "Posso rinnovare la mia Firma Digitale in scadenza?",
            answer:
              "Sì, è possibile rinnovare la Firma Digitale prima della scadenza. Ti consigliamo di contattarci almeno 30 giorni prima della data di scadenza per procedere con il rinnovo senza interruzioni del servizio.",
          },
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Hai bisogno di assistenza?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            I nostri operatori sono a tua disposizione per aiutarti ad attivare i servizi digitali di cui hai bisogno.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contatti"
              className="bg-white hover:bg-gray-100 text-primary font-medium py-3 px-8 rounded-md transition-colors inline-flex items-center justify-center"
            >
              Contattaci ora
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link
              href="/dove-siamo"
              className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-8 rounded-md transition-colors inline-flex items-center justify-center"
            >
              Vieni in agenzia
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
