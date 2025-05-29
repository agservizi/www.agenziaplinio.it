import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Package, MapPin, Clock, HelpCircle } from "lucide-react"
import FAQSection from "@/components/faq-section"

const puntoRitiroFAQs = [
  {
    question: "Quali corrieri supportate per il ritiro pacchi?",
    answer:
      "Siamo punto di ritiro ufficiale per PuntoPoste (Poste Italiane), BRT-Fermopoint, GLS Shop e Fedex Location.",
  },
  {
    question: "Quanto tempo avete a disposizione per ritirare un pacco?",
    answer:
      "I pacchi restano disponibili per il ritiro generalmente per 7 giorni, ma questo può variare in base al corriere. Ti consigliamo di ritirare il pacco il prima possibile.",
  },
  {
    question: "Cosa serve per ritirare un pacco?",
    answer:
      "Per ritirare un pacco è necessario presentare un documento d'identità valido e il codice di ritiro che ti è stato inviato via SMS o email dal corriere.",
  },
  {
    question: "Posso delegare qualcuno a ritirare il pacco al posto mio?",
    answer:
      "Sì, è possibile delegare una persona a ritirare il pacco. La persona delegata dovrà presentare un proprio documento d'identità, una delega scritta e una copia del documento del delegante.",
  },
]

export default function PuntoRitiro() {
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
              <h1 className="text-4xl font-bold mb-6">Punto di Ritiro Pacchi</h1>
              <p className="text-xl max-w-3xl">
                Siamo punto di ritiro ufficiale per i principali corrieri. Ritira i tuoi pacchi quando preferisci, senza
                attese e con orari flessibili.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Package size={64} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Full Page Interactive Layout */}
      <section className="relative py-16 bg-gray-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              I Nostri Servizi di Punto Ritiro
            </h2>
            <p className="text-lg text-gray-600">
              Scopri tutti i vantaggi del nostro servizio di punto ritiro pacchi e come utilizzarlo al meglio per
              ricevere i tuoi acquisti online.
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
          </div>

          {/* Corrieri Disponibili */}
          <div className="mb-24">
            <div className="flex items-center justify-center mb-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <Package className="text-primary" size={32} />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Corrieri Disponibili
              </h3>
            </div>

            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Siamo punto di ritiro ufficiale per i principali corrieri nazionali e internazionali, offrendo un servizio
              comodo e flessibile per il ritiro dei tuoi pacchi.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "PuntoPoste",
                  description: "Punto di ritiro ufficiale per i pacchi di Poste Italiane.",
                  logo: "/loghi/punto-ritiro/puntoposte.png",
                },
                {
                  title: "BRT-Fermopoint",
                  description: "Punto di ritiro per i pacchi spediti con BRT.",
                  logo: "/loghi/punto-ritiro/brt-fermopoint.png",
                },
                {
                  title: "GLS Shop",
                  description: "Punto di ritiro per i pacchi spediti con GLS.",
                  logo: "/loghi/punto-ritiro/gls-shop.png",
                },
                {
                  title: "Fedex Location",
                  description: "Punto di ritiro per i pacchi spediti con Fedex/TNT.",
                  logo: "/loghi/punto-ritiro/fedex-location.png",
                },
              ].map((corriere, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="h-32 flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={corriere.logo || "/placeholder.svg"}
                      alt={corriere.title}
                      width={160}
                      height={80}
                      className="object-contain max-h-24 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-xl mb-2">{corriere.title}</h4>
                    <p className="text-gray-600">{corriere.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200 max-w-3xl mx-auto">
              <h4 className="font-bold mb-3 flex items-center text-lg">
                <HelpCircle size={20} className="mr-2 text-yellow-500" />
                Come funziona
              </h4>
              <p className="text-gray-700">
                Quando effettui un acquisto online, seleziona la nostra agenzia come punto di ritiro. Riceverai una
                notifica quando il pacco sarà disponibile per il ritiro. Presentati in agenzia con un documento
                d'identità e il codice di ritiro.
              </p>
            </div>
          </div>

          {/* Vantaggi del Punto Ritiro */}
          <div className="mb-24 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl -z-10"></div>

            <div className="flex items-center justify-center mb-10 pt-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <MapPin className="text-primary" size={32} />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Vantaggi del Punto Ritiro
              </h3>
            </div>

            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Scegliere la nostra agenzia come punto di ritiro offre numerosi vantaggi rispetto alla consegna a
              domicilio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 pb-10">
              {[
                {
                  title: "Orari Flessibili",
                  description:
                    "Ritira i tuoi pacchi negli orari di apertura dell'agenzia, senza dover attendere a casa il corriere.",
                  icon: "Clock",
                },
                {
                  title: "Nessuna Attesa",
                  description: "Evita le attese e i mancati recapiti, ritira quando preferisci.",
                  icon: "Clock",
                },
                {
                  title: "Sicurezza",
                  description: "I tuoi pacchi sono custoditi in un luogo sicuro fino al tuo ritiro.",
                  icon: "Shield",
                },
                {
                  title: "Assistenza",
                  description: "Personale qualificato a tua disposizione per qualsiasi necessità.",
                  icon: "HeadphonesIcon",
                },
              ].map((vantaggio, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center mb-4 transform transition-transform group-hover:rotate-6 group-hover:scale-110">
                    <Clock className="text-white" size={28} />
                  </div>
                  <h4 className="font-bold text-xl mb-3">{vantaggio.title}</h4>
                  <p className="text-gray-600">{vantaggio.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Procedura di Ritiro */}
          <div className="mb-24">
            <div className="flex items-center justify-center mb-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <Clock className="text-primary" size={32} />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Procedura di Ritiro
              </h3>
            </div>

            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Ritirare un pacco presso la nostra agenzia è semplice e veloce. Ecco la procedura da seguire:
            </p>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 via-primary to-primary/30 transform -translate-x-1/2 hidden md:block"></div>

              {/* Steps */}
              <div className="space-y-12 md:space-y-0">
                {[
                  {
                    title: "Ricevi la notifica",
                    description:
                      "Quando il pacco arriva in agenzia, riceverai una notifica via SMS o email dal corriere con un codice di ritiro.",
                  },
                  {
                    title: "Vieni in agenzia",
                    description:
                      "Presentati in agenzia negli orari di apertura con un documento d'identità valido e il codice di ritiro.",
                  },
                  {
                    title: "Ritira il pacco",
                    description:
                      "Il nostro personale verificherà la tua identità e ti consegnerà il pacco. Potrai controllare il contenuto prima di lasciare l'agenzia.",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="md:w-1/2 p-6">
                      <div
                        className={`bg-white rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl ${index % 2 === 1 ? "md:ml-auto md:mr-8" : "md:mr-auto md:ml-8"}`}
                      >
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-white font-bold text-xl">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-xl mb-2">{step.title}</h4>
                            <p className="text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                      <div className="w-10 h-10 bg-white border-4 border-primary rounded-full z-10 flex items-center justify-center hidden md:flex">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200 max-w-3xl mx-auto">
              <h4 className="font-bold mb-3 flex items-center text-lg">
                <HelpCircle size={20} className="mr-2 text-yellow-500" />
                Cosa serve
              </h4>
              <p className="text-gray-700">
                Per ritirare un pacco è necessario presentare un documento d'identità valido (carta d'identità, patente
                o passaporto) e il codice di ritiro ricevuto via SMS o email. In caso di delega, è necessaria una delega
                scritta e una copia del documento del delegante.
              </p>
            </div>
          </div>

          {/* Informazioni Utili */}
          <div className="mb-24 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Informazioni Utili
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <h4 className="font-bold text-xl mb-4 text-primary">Orari del Servizio</h4>
                <p className="text-gray-700">
                  <span className="font-semibold">Lun-Ven:</span> 9:00-13:20, 16:00-19:20
                  <br />
                  <span className="font-semibold">Sab:</span> 9:00-13:00
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <h4 className="font-bold text-xl mb-4 text-primary">Documenti Necessari</h4>
                <p className="text-gray-700">
                  Documento d'identità valido e codice di ritiro ricevuto via SMS o email.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <h4 className="font-bold text-xl mb-4 text-primary">Contattaci</h4>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/+390811234567?text=Salve%2C%20vorrei%20informazioni%20sul%20servizio%20di%20punto%20ritiro%20pacchi.%20Grazie."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#25D366]/90 text-white font-medium py-2 px-4 rounded-md transition-colors inline-block w-full text-center flex items-center justify-center"
                  >
                    <Image src="/images/whatsapp-icon.png" alt="WhatsApp" width={20} height={20} className="mr-2" />
                    Scrivici su WhatsApp
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

          {/* Loghi dei Partner */}
          <div className="mb-24">
            <h3 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              I Nostri Partner
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "PuntoPoste",
                  logo: "/loghi/punto-ritiro/puntoposte.png",
                },
                {
                  name: "BRT Fermopoint",
                  logo: "/loghi/punto-ritiro/brt-fermopoint.png",
                },
                {
                  name: "GLS Shop",
                  logo: "/loghi/punto-ritiro/gls-shop.png",
                },
                {
                  name: "Fedex Location",
                  logo: "/loghi/punto-ritiro/fedex-location.png",
                },
              ].map((partner, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex items-center justify-center h-32 transform hover:scale-105"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={200}
                    height={100}
                    className="object-contain max-h-24"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <FAQSection
              title="Domande Frequenti sul Punto Ritiro"
              description="Trova le risposte alle domande più comuni sul nostro servizio di punto ritiro pacchi."
              faqs={puntoRitiroFAQs}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
