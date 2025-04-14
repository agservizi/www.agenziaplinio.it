"use client"

import { useEffect } from "react"

export default function LinkPrefetcher() {
  useEffect(() => {
    // Prefetch delle pagine importanti al caricamento della pagina
    const prefetchImportantPages = () => {
      // Limitiamo il numero di pagine da prefetchare per evitare troppi fetch simultanei
      const importantPages = ["/servizi", "/contatti"]

      // Prefetch solo se il browser è inattivo e non su una connessione lenta
      if ("requestIdleCallback" in window && !("connection" in navigator && (navigator as any).connection?.saveData)) {
        ;(window as any).requestIdleCallback(() => {
          importantPages.forEach((page) => {
            try {
              const link = document.createElement("link")
              link.rel = "prefetch"
              link.href = page
              document.head.appendChild(link)
            } catch (error) {
              // Ignora errori di prefetch
              console.log("Prefetch non riuscito per:", page)
            }
          })
        })
      }
    }

    // Prefetch delle pagine quando si passa sopra i link
    const setupLinkPrefetching = () => {
      const links = document.querySelectorAll("a")

      links.forEach((link) => {
        const href = link.getAttribute("href")

        if (href && href.startsWith("/") && !href.includes("#")) {
          let timer: NodeJS.Timeout

          // Prefetch dopo aver passato sopra per 200ms (aumentato per ridurre i prefetch non necessari)
          link.addEventListener("mouseenter", () => {
            timer = setTimeout(() => {
              try {
                const prefetchLink = document.createElement("link")
                prefetchLink.rel = "prefetch"
                prefetchLink.href = href
                document.head.appendChild(prefetchLink)
              } catch (error) {
                // Ignora errori di prefetch
                console.log("Prefetch non riuscito per:", href)
              }
            }, 200)
          })

          // Annulla il prefetch se il mouse esce prima che il timer completi
          link.addEventListener("mouseleave", () => {
            clearTimeout(timer)
          })
        }
      })
    }

    // Esegui le strategie di prefetching con un ritardo per dare priorità al rendering iniziale
    setTimeout(() => {
      prefetchImportantPages()
      setupLinkPrefetching()
    }, 2000)

    // Riesegui quando il contenuto cambia
    const observer = new MutationObserver(() => {
      setupLinkPrefetching()
    })

    // Osserva solo le modifiche ai link per ridurre il carico
    setTimeout(() => {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    }, 3000)

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
