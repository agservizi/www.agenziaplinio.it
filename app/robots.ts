import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/", "/*.json$", "/*.xml$"],
    },
    sitemap: "https://www.agservizi.it/sitemap.xml",
    host: "https://www.agservizi.it",
  }
}
