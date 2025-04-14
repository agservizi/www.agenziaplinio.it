"use client"

import { useEffect } from "react"

export default function PerformanceOptimizations() {
  useEffect(() => {
    // Precarica le pagine principali quando l'utente passa sopra i link
    const prefetchLinks = () => {
      const links = document.querySelectorAll("a")

      links.forEach((link) => {
        const href = link.getAttribute("href")

        if (href && href.startsWith("/") && !href.includes("#")) {
          link.addEventListener("mouseenter", () => {
            // Precarica la pagina quando l'utente passa sopra il link
            const prefetchLink = document.createElement("link")
            prefetchLink.rel = "prefetch"
            prefetchLink.href = href
            document.head.appendChild(prefetchLink)
          })
        }
      })
    }

    // Lazy load delle immagini che non sono nel viewport
    const lazyLoadImages = () => {
      if ("IntersectionObserver" in window) {
        const lazyImages = document.querySelectorAll("img[data-src]")

        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              img.src = img.dataset.src || ""
              img.removeAttribute("data-src")
              imageObserver.unobserve(img)
            }
          })
        })

        lazyImages.forEach((img) => {
          imageObserver.observe(img)
        })
      }
    }

    // Implementa il Service Worker per il caching solo in produzione
    const registerServiceWorker = async () => {
      // Salta la registrazione del Service Worker in ambiente di sviluppo o anteprima
      if (
        "serviceWorker" in navigator &&
        window.location.hostname !== "localhost" &&
        !window.location.hostname.includes("vusercontent.net")
      ) {
        try {
          await navigator.serviceWorker.register("/sw.js")
          console.log("Service Worker registrato con successo")
        } catch (error) {
          console.log("Registrazione del Service Worker saltata in ambiente di sviluppo/anteprima")
        }
      }
    }

    prefetchLinks()
    lazyLoadImages()
    registerServiceWorker()

    // Cleanup
    return () => {
      // Codice di pulizia se necessario
    }
  }, [])

  return null
}

