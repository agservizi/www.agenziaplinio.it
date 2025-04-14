import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumbs"

// Sample news data - in a real application, this would come from a database
const newsArticles = {
  "nuovo-servizio-spid": {
    title: "Nuovo Servizio di Attivazione SPID",
    date: "2023-11-15",
    image: "/images/news/spid-news.jpg",
    category: "Servizi Digitali",
    content: `
      <p>Siamo lieti di annunciare il nostro nuovo servizio di attivazione SPID con procedura semplificata.</p>
      
      <p>Lo SPID (Sistema Pubblico di Identità Digitale) è diventato ormai essenziale per accedere ai servizi della Pubblica Amministrazione e di molti enti privati. Per venire incontro alle esigenze dei nostri clienti, abbiamo ottimizzato il processo di attivazione, rendendolo più rapido e accessibile.</p>
      
      <h3>Come funziona il nuovo servizio?</h3>
      
      <p>Il nostro nuovo processo di attivazione SPID prevede:</p>
      
      <ul>
        <li>Assistenza completa nella compilazione della documentazione</li>
        <li>Verifica dell'identità direttamente presso la nostra sede</li>
        <li>Supporto telefonico per l'attivazione finale</li>
        <li>Guida all'utilizzo dello SPID sui principali portali</li>
      </ul>
      
      <p>Grazie alla nostra partnership con Namirial, possiamo garantire un'attivazione sicura e conforme a tutte le normative vigenti.</p>
      
      <h3>Documenti necessari</h3>
      
      <p>Per attivare lo SPID presso la nostra agenzia è necessario presentarsi con:</p>
      
      <ul>
        <li>Documento d'identità valido (carta d'identità, passaporto o patente)</li>
        <li>Tessera sanitaria</li>
        <li>Numero di cellulare personale</li>
        <li>Indirizzo email personale</li>
      </ul>
      
      <p>Per maggiori informazioni o per prenotare un appuntamento, contattaci al numero 081 0584542 o vieni a trovarci in Via Plinio il Vecchio 72 a Castellammare di Stabia.</p>
    `,
    relatedArticles: ["orari-estivi", "nuovo-punto-ritiro"],
  },
  "orari-estivi": {
    title: "Orari Estivi 2023",
    date: "2023-06-20",
    image: "/images/news/summer-hours.jpg",
    category: "Avvisi",
    content: `
      <p>Informiamo la gentile clientela che dal 1 luglio al 31 agosto saremo aperti con orario continuato.</p>
      
      <p>Per garantire un servizio migliore durante il periodo estivo, abbiamo modificato i nostri orari di apertura:</p>
      
      <ul>
        <li>Dal lunedì al venerdì: 9:00 - 17:00 (orario continuato)</li>
        <li>Sabato: 9:00 - 13:00</li>
        <li>Domenica: chiuso</li>
      </ul>
      
      <p>Questo cambiamento ci permetterà di offrire i nostri servizi anche durante la pausa pranzo, venendo incontro alle esigenze di chi lavora e ha poco tempo a disposizione.</p>
      
      <p>Ricordiamo che per alcuni servizi è consigliabile prendere appuntamento per evitare attese, soprattutto per:</p>
      
      <ul>
        <li>Attivazione SPID</li>
        <li>Pratiche CAF e Patronato</li>
        <li>Consulenze per contratti di telefonia, luce e gas</li>
      </ul>
      
      <p>Per prenotare un appuntamento, potete contattarci al numero 081 0584542 o utilizzare il form di prenotazione sul nostro sito.</p>
      
      <p>Vi ringraziamo per la comprensione e vi auguriamo una buona estate!</p>
    `,
    relatedArticles: ["nuovo-servizio-spid", "promozione-spedizioni"],
  },
  // Other articles would be defined similarly
}

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const article = newsArticles[slug as keyof typeof newsArticles]

  if (!article) {
    return (
      <div className="pt-24 page-transition">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Articolo non trovato</h1>
          <p className="mb-6">L'articolo che stai cercando non esiste o è stato rimosso.</p>
          <Link
            href="/news"
            className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Torna alle News
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 page-transition">
      <Breadcrumbs />

      {/* Article Header */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-white/20 text-white text-sm font-medium py-1 px-3 rounded-full mb-4">
            {article.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center justify-center text-sm">
            <Calendar size={16} className="mr-1" />
            <span>
              {new Date(article.date).toLocaleDateString("it-IT", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 rounded-lg overflow-hidden shadow-md">
              <Image
                src={article.image || "/placeholder.svg?height=400&width=800"}
                alt={article.title}
                width={800}
                height={400}
                className="w-full h-auto"
              />
            </div>

            <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: article.content }} />

            {/* Social Sharing */}
            <div className="border-t border-b border-gray-200 py-4 my-8">
              <div className="flex items-center">
                <span className="text-gray-600 mr-4 font-medium">Condividi:</span>
                <div className="flex space-x-3">
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M19.5 6.75a4.5 4.5 0 0 0-4.5-4.5H9a4.5 4.5 0 0 0-4.5 4.5v10.5a4.5 4.5 0 0 0 4.5 4.5h6a4.5 4.5 0 0 0 4.5-4.5V6.75Zm-9.75 12h6a3 3 0 0 0 3-3v-4.5h-3.75a2.25 2.25 0 0 0-2.25 2.25v2.25H9.75v3Zm9-7.5V6.75a3 3 0 0 0-3-3H9.75v4.5h4.5a2.25 2.25 0 0 1 2.25 2.25v1.5h2.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Articoli correlati</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.relatedArticles.map((relatedSlug) => {
                    const relatedArticle = newsArticles[relatedSlug as keyof typeof newsArticles]
                    if (!relatedArticle) return null

                    return (
                      <div key={relatedSlug} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                        <div className="w-1/3">
                          <Image
                            src={relatedArticle.image || "/placeholder.svg?height=100&width=100"}
                            alt={relatedArticle.title}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <div className="text-xs text-gray-500 mb-1">{relatedArticle.category}</div>
                          <h4 className="font-medium text-sm mb-2 line-clamp-2">{relatedArticle.title}</h4>
                          <Link
                            href={`/news/${relatedSlug}`}
                            className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center transition-colors"
                          >
                            Leggi
                            <ArrowLeft size={14} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Back to News */}
            <div className="mt-12 text-center">
              <Link
                href="/news"
                className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors inline-flex items-center"
              >
                <ArrowLeft size={16} className="mr-2" />
                Torna alle News
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

