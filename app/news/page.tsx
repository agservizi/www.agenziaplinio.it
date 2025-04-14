import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumbs"

// Sample news data - in a real application, this would come from a database
const newsArticles = [
  {
    id: "nuovo-servizio-spid",
    title: "Nuovo Servizio di Attivazione SPID",
    excerpt: "Siamo lieti di annunciare il nostro nuovo servizio di attivazione SPID con procedura semplificata.",
    date: "2023-11-15",
    image: "/images/news/spid-news.jpg",
    category: "Servizi Digitali",
  },
  {
    id: "orari-estivi",
    title: "Orari Estivi 2023",
    excerpt: "Informiamo la gentile clientela che dal 1 luglio al 31 agosto saremo aperti con orario continuato.",
    date: "2023-06-20",
    image: "/images/news/summer-hours.jpg",
    category: "Avvisi",
  },
  {
    id: "nuova-convenzione-caf",
    title: "Nuova Convenzione CAF",
    excerpt: "Abbiamo attivato una nuova convenzione con CAF Italia per offrire servizi fiscali ancora più completi.",
    date: "2023-05-10",
    image: "/images/news/caf-news.jpg",
    category: "Servizi Fiscali",
  },
  {
    id: "promozione-spedizioni",
    title: "Promozione Spedizioni Internazionali",
    excerpt: "Per tutto il mese di aprile, spedizioni internazionali a tariffe agevolate con i nostri partner.",
    date: "2023-04-01",
    image: "/images/news/shipping-promo.jpg",
    category: "Promozioni",
  },
  {
    id: "nuovo-punto-ritiro",
    title: "Siamo diventati Punto di Ritiro GLS",
    excerpt: "Da oggi è possibile ritirare i pacchi GLS presso la nostra sede di Via Plinio il Vecchio 72.",
    date: "2023-03-15",
    image: "/images/news/gls-pickup.jpg",
    category: "Servizi",
  },
  {
    id: "dichiarazione-redditi-2023",
    title: "Dichiarazione dei Redditi 2023",
    excerpt: "Prenota il tuo appuntamento per la dichiarazione dei redditi 2023. Servizio disponibile da aprile.",
    date: "2023-02-28",
    image: "/images/news/tax-return.jpg",
    category: "Servizi Fiscali",
  },
]

export default function NewsPage() {
  return (
    <div className="pt-24 page-transition">
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">News ed Aggiornamenti</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Resta aggiornato sulle ultime novità, promozioni e servizi di AG SERVIZI.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 bg-primary/10 flex items-center justify-center relative">
                  <Image
                    src={article.image || "/placeholder.svg?height=200&width=300"}
                    alt={article.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-medium py-1 px-2 rounded">
                    {article.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(article.date).toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Link
                    href={`/news/${article.id}`}
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors"
                  >
                    Leggi di più
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Iscriviti alla nostra Newsletter</h2>
              <p className="text-gray-600">
                Ricevi aggiornamenti sui nostri servizi, promozioni e novità direttamente nella tua casella di posta.
              </p>
            </div>
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Iscriviti
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Iscrivendoti accetti la nostra{" "}
              <Link href="/privacy-policy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
              . Potrai disiscriverti in qualsiasi momento.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
