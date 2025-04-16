import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import ImageOptimizer from "@/components/image-optimizer"
import DynamicLinkPrefetcher from "@/components/dynamic-link-prefetcher"
import CookieBanner from "@/components/cookie-banner"
import CustomerServiceChatbot from "@/components/customer-service-chatbot"
import Script from "next/script"
import ScrollToTop from "@/components/scroll-to-top"
import { Analytics } from "@vercel/analytics/react"
// Remove SpeedInsights for now as it might be causing the issue
// import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AG Servizi Via Plinio 72 - Agenzia Multiservizi a Castellammare di Stabia",
  description:
    "AG Servizi è un'agenzia multiservizi a Castellammare di Stabia. Offriamo servizi di pagamento bollettini, spedizioni, visure, attivazioni digitali e molto altro.",
  keywords:
    "AG Servizi, agenzia servizi, Castellammare di Stabia, pagamento bollettini, spedizioni, visure, SPID, firma digitale, PEC",
  alternates: {
    canonical: "https://www.agservizi.it",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.agservizi.it",
    title: "AG SERVIZI - Agenzia Multiservizi a Castellammare di Stabia",
    description:
      "Tutti i servizi di cui hai bisogno in un unico posto: pagamenti, spedizioni, attivazioni digitali, CAF e patronato a Castellammare di Stabia.",
    siteName: "AG SERVIZI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AG SERVIZI - Agenzia Multiservizi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AG SERVIZI - Agenzia Multiservizi a Castellammare di Stabia",
    description:
      "Tutti i servizi di cui hai bisogno in un unico posto: pagamenti, spedizioni, attivazioni digitali, CAF e patronato.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1a4b8c" />
        <meta name="geo.region" content="IT-NA" />
        <meta name="geo.placename" content="Castellammare di Stabia" />
        <meta name="geo.position" content="40.7142;14.4711" />
        <meta name="ICBM" content="40.7142, 14.4711" />
      </head>
      <body className={inter.className}>
        <Script id="schema-local-business" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "AG SERVIZI VIA PLINIO 72",
              "image": "https://www.agservizi.it/logo.png",
              "url": "https://www.agservizi.it",
              "telephone": "+39 081 0584542",
              "email": "info@agenziaplinio.it",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Via Plinio il Vecchio 72",
                "addressLocality": "Castellammare di Stabia",
                "addressRegion": "NA",
                "postalCode": "80053",
                "addressCountry": "IT"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.7142,
                "longitude": 14.4711
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "13:20"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "16:00",
                  "closes": "19:20"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "13:00"
                }
              ],
              "priceRange": "€€",
              "servesCuisine": "Servizi",
              "sameAs": [
                "https://www.facebook.com/agservizi",
                "https://www.instagram.com/agservizi",
                "https://twitter.com/agservizi"
              ],
              "vatID": "08442881218"
            }
          `}
        </Script>
        <Header />
        <main className="pt-24 md:pt-32">{children}</main>
        <Footer />
        <CustomerServiceChatbot />
        <ScrollToTop />
        <CookieBanner />
        <Toaster />
        <ImageOptimizer />
        <DynamicLinkPrefetcher />
        <Analytics />
      </body>
    </html>
  )
}


import './globals.css'