import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://agservizi.vercel.app"

  // Pagine principali
  const mainRoutes = [
    "",
    "/chi-siamo",
    "/servizi",
    "/dove-siamo",
    "/contatti",
    "/faq",
    "/news",
    "/prenota",
    "/area-clienti",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Pagine dei servizi
  const serviceRoutes = [
    "/servizi/visure",
    "/servizi/spedizioni",
    "/servizi/bonifici",
    "/servizi/invio-posta",
    "/servizi/servizi-postali",
    "/servizi/servizio-foto",
    "/servizi/punto-ritiro",
    "/servizi/telefonia-luce-gas",
    "/servizi/trust-provider",
    "/servizi/caf-patronato",
    "/servizi/biglietteria",
    "/servizi/pagamenti",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Pagine legali
  const legalRoutes = ["/privacy-policy", "/cookie-policy", "/termini-condizioni"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }))

  return [...mainRoutes, ...serviceRoutes, ...legalRoutes]
}

