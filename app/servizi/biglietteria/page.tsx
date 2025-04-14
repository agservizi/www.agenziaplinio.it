"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Ticket, HelpCircle } from "lucide-react"
import FAQSection from "@/components/faq-section"

const biglietterieFAQs = [
  {
    question: "Quali tipi di biglietti ferroviari posso acquistare?",
    answer:
      "Presso la nostra agenzia è possibile acquistare biglietti Trenitalia (Frecce, Intercity e Regionali) e Italo per tutte le destinazioni nazionali.",
  },
  {
    question: "Posso acquistare biglietti Flixbus?",
    answer:
      "Sì, offriamo il servizio di vendita biglietti Flixbus per tutte le destinazioni nazionali e internazionali servite dal vettore.",
  },
  {
    question: "Quanto tempo prima devo acquistare un biglietto?",
    answer:
      "Consigliamo di acquistare i biglietti con qualche giorno di anticipo, soprattutto per i treni ad alta velocità e per i viaggi nei periodi di alta stagione. Tuttavia, è possibile acquistare biglietti anche per partenze in giornata, salvo disponibilità.",
  },
  {
    question: "Posso modificare o cancellare un biglietto già acquistato?",
    answer:
      "Le possibilità di modifica o cancellazione dipendono dalle condizioni del vettore e dalla tariffa acquistata. In generale, i biglietti Trenitalia e Italo possono essere modificati o rimborsati secondo le loro politiche, mentre i biglietti Flixbus hanno condizioni più restrittive. Vi invitiamo a contattarci per assistenza specifica.",
  },
  {
    question: "Quali informazioni devo fornire per acquistare un biglietto?",
    answer:
      "Per acquistare un biglietto è necessario fornire: data e orario di partenza desiderati, stazione di partenza e arrivo, numero di passeggeri e, in alcuni casi, i dati anagrafici dei viaggiatori (nome, cognome e data di nascita).",
  },
  {
    question: "Quanto costa il servizio di emissione biglietti?",
    answer:
      "Il servizio di emissione biglietti ha un costo aggiuntivo minimo rispetto al prezzo del biglietto. Contattaci per conoscere le tariffe specifiche.",
  },
]

export default function Biglietteria() {
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
              <h1 className="text-4xl font-bold mb-6">Biglietteria</h1>
              <p className="text-xl max-w-3xl">
                Offriamo servizi di vendita biglietti per i principali vettori ferroviari nazionali.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Ticket size={64} className="text-white" />
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
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Ticket className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Biglietteria Ferroviaria</h3>
                      <p className="text-gray-600 mb-6">
                        Vendiamo biglietti ferroviari per Italo e Trenitalia per tutte le destinazioni nazionali.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Trenitalia</h4>
                          <p className="text-gray-600 text-sm">Biglietti per Frecce, Intercity e Regionali.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Italo</h4>
                          <p className="text-gray-600 text-sm">Biglietti per tutte le tratte servite da Italo.</p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per acquistare un biglietto ferroviario è necessario comunicare la data del viaggio, la tratta
                          desiderata e i dati del passeggero.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Ticket className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Biglietteria Flixbus</h3>
                      <p className="text-gray-600 mb-6">
                        Vendiamo biglietti per Flixbus per tutte le destinazioni nazionali e internazionali.
                      </p>

                      <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                        <h4 className="font-bold mb-2 flex items-center">
                          <HelpCircle size={16} className="mr-2 text-yellow-500" />
                          Cosa serve
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Per acquistare un biglietto Flixbus è necessario comunicare la data del viaggio, la tratta
                          desiderata e i dati del passeggero.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vantaggi per i Clienti */}
              <div className="mt-12 mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-center">Vantaggi per i Nostri Clienti</h3>
                <p className="text-gray-600 text-center mb-8">
                  Scegliere di acquistare i tuoi biglietti presso la nostra agenzia ti offre numerosi vantaggi
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"></path>
                        <path d="M12 8v4l3 3"></path>
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Risparmio di Tempo</h4>
                    <p className="text-gray-600 text-sm">
                      Nessuna attesa online. Acquista i tuoi biglietti rapidamente con l'assistenza del nostro
                      personale.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Consulenza Personalizzata</h4>
                    <p className="text-gray-600 text-sm">
                      Ti aiutiamo a trovare la soluzione migliore per le tue esigenze di viaggio e il miglior rapporto
                      qualità-prezzo.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                  <h4 className="font-bold mb-2 flex items-center">
                    <HelpCircle size={16} className="mr-2 text-yellow-500" />
                    Informazioni Importanti
                  </h4>
                  <p className="text-gray-600 text-sm">
                    I biglietti acquistati sono soggetti alle condizioni di viaggio stabilite dalle rispettive compagnie
                    (Trenitalia, Italo, Flixbus). Per eventuali modifiche o rimborsi dopo l'acquisto, è necessario
                    contattare direttamente la compagnia di trasporto secondo le loro politiche e tempistiche. Vi
                    consigliamo di verificare attentamente le condizioni di modifica/cancellazione prima dell'acquisto.
                  </p>
                </div>
              </div>

              {/* Loghi dei Partner */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold mb-6">I Nostri Partner</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-md aspect-square overflow-hidden">
                    <Image
                      src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/frecciarossa_500x500-x4CIi5s1zJghDPKWz6zh7JMQGgwr5E.jpg"
                      alt="Trenitalia"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="bg-white rounded-lg shadow-md aspect-square overflow-hidden">
                    <Image
                      src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/italo-Re7gKJRIQmzuklz6ZFtHFphwcC5lA7.png"
                      alt="Italo"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="bg-white rounded-lg shadow-md aspect-square overflow-hidden">
                    <Image
                      src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/flix-3ggBvXxQ1W92xIb8IK0WBCC6E14ro6.png"
                      alt="Flixbus"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-16">
                <FAQSection
                  title="Domande Frequenti sulla Biglietteria"
                  description="Trova le risposte alle domande più comuni sui nostri servizi di biglietteria."
                  faqs={biglietterieFAQs}
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
                        <span>Servizio rapido e sicuro</span>
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
                      Contattaci per maggiori informazioni sui nostri servizi di biglietteria.
                    </p>
                    <div className="space-y-2">
                      <a
                        href={`https://wa.me/393773798570?text=${encodeURIComponent(`${new Date().getHours() < 12 ? "Buongiorno" : new Date().getHours() < 18 ? "Buon pomeriggio" : "Buonasera"}, vorrei informazioni sui servizi di biglietteria.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center justify-center w-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 mr-2"
                        >
                          <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 13.5723 2.37892 15.0721 3.06513 16.3915L2.0332 21.1252C1.94156 21.5587 2.29 21.9805 2.72653 21.9128L7.61666 21.0003C8.87942 21.6273 10.3019 22 11.9999 22C17.5228 22 22 17.5229 22 12C22 6.47715 17.5228 2 22.001 2ZM16.6587 15.0318C16.4269 15.6491 15.4599 16.1952 14.7559 16.3305C14.2715 16.4244 13.6602 16.5 11.3089 15.5578C8.41294 14.3858 6.54422 11.4441 6.40294 11.2591C6.26746 11.0741 5.34922 9.85653 5.34922 8.59333C5.34922 7.33013 5.98614 6.73053 6.26746 6.44053C6.49813 6.20053 6.84294 6.09386 7.17422 6.09386C7.28136 6.09386 7.37784 6.1 7.46587 6.10482C7.74719 6.11786 7.88267 6.1382 8.06227 6.54053C8.28427 7.04053 8.78694 8.30373 8.85365 8.44053C8.92036 8.57733 8.9682 8.75053 8.87784 8.91733C8.79329 9.08413 8.71698 9.16786 8.58149 9.33466C8.44601 9.50146 8.31957 9.63373 8.18408 9.80053C8.05916 9.94413 7.92122 10.0996 8.07555 10.3496C8.22988 10.5996 8.78694 11.5089 9.60239 12.2318C10.6496 13.1705 11.4766 13.4669 11.7579 13.5918C11.9687 13.6831 12.2194 13.6614 12.3761 13.4951C12.5761 13.2837 12.8233 12.9342 13.0747 12.5902C13.2558 12.3444 13.4877 12.3071 13.7302 12.3984C13.9769 12.4844 15.2359 13.1071 15.5172 13.2478C15.7986 13.3885 15.9799 13.4558 16.0466 13.5644C16.1133 13.6731 16.1133 14.2089 15.8906 14.9171L16.6587 15.0318Z" />
                        </svg>
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
