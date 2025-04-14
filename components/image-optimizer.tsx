"use client"

import { useEffect } from "react"

export default function ImageOptimizer() {
  useEffect(() => {
    // Converti le immagini in formato WebP dove supportato
    const checkWebpSupport = async () => {
      try {
        // Controlla se il browser supporta WebP
        const webpSupported = document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0

        if (webpSupported) {
          document.documentElement.classList.add("webp")
        } else {
          document.documentElement.classList.add("no-webp")
        }
      } catch (e) {
        console.log("Rilevamento WebP fallito")
        document.documentElement.classList.add("no-webp")
      }
    }

    // Aggiungi loading="lazy" alle immagini che non ce l'hanno
    const addLazyLoadingToImages = () => {
      try {
        const images = document.querySelectorAll("img:not([loading])")
        images.forEach((img) => {
          if (!img.hasAttribute("loading") && !img.hasAttribute("data-no-lazy") && !img.hasAttribute("priority")) {
            img.setAttribute("loading", "lazy")
          }
        })
      } catch (error) {
        console.log("Errore durante l'aggiunta di lazy loading alle immagini")
      }
    }

    // Ottimizza la qualità dell'immagine in base alla velocità di connessione
    const optimizeImagesForConnection = () => {
      try {
        if ("connection" in navigator && (navigator as any).connection) {
          const connection = (navigator as any).connection

          if (connection.saveData || connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") {
            document.documentElement.classList.add("low-data-mode")
          }
        }
      } catch (error) {
        console.log("Errore durante l'ottimizzazione delle immagini per la connessione")
      }
    }

    // Esegui le ottimizzazioni con un ritardo per dare priorità al rendering iniziale
    setTimeout(() => {
      checkWebpSupport()
      addLazyLoadingToImages()
      optimizeImagesForConnection()
    }, 1000)

    // Riesegui quando il contenuto cambia (es. dopo la navigazione lato client)
    const observer = new MutationObserver(() => {
      addLazyLoadingToImages()
    })

    // Osserva solo le modifiche alle immagini per ridurre il carico
    setTimeout(() => {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
      })
    }, 2000)

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}

