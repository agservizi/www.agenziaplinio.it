"use client"

import { useEffect, useRef } from "react"

interface OpenStreetMapProps {
  address: string
  lat: number
  lng: number
}

// Estendi l'interfaccia Window per includere Leaflet
declare global {
  interface Window {
    L: any
  }
}

export default function OpenStreetMap({ address, lat, lng }: OpenStreetMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Funzione per caricare Leaflet
    const loadLeaflet = async () => {
      // Carica il CSS di Leaflet
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      linkElement.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      linkElement.crossOrigin = ""
      document.head.appendChild(linkElement)

      // Carica lo script di Leaflet
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      script.crossOrigin = ""

      // Attendi il caricamento dello script
      const scriptLoaded = new Promise<void>((resolve) => {
        script.onload = () => resolve()
      })

      document.head.appendChild(script)
      await scriptLoaded

      // Inizializza la mappa
      initMap()
    }

    // Inizializza la mappa con Leaflet
    const initMap = () => {
      if (!mapRef.current || !window.L) return

      // Crea l'istanza della mappa
      const map = window.L.map(mapRef.current).setView([lat, lng], 16)

      // Aggiungi il layer di OpenStreetMap
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Aggiungi un marker per la posizione
      const marker = window.L.marker([lat, lng]).addTo(map)

      // Aggiungi un popup al marker
      marker.bindPopup(`<b>AG Servizi</b><br>${address}`).openPopup()

      // Gestisci il ridimensionamento della finestra
      const handleResize = () => {
        map.invalidateSize()
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        map.remove()
      }
    }

    loadLeaflet()

    // Cleanup function
    return () => {
      // Cleanup will be handled by the inner return from initMap
    }
  }, [address, lat, lng])

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <div ref={mapRef} className="w-full h-[300px]" aria-label={`Mappa di ${address}`}></div>
      <div className="bg-white p-4">
        <h3 className="font-semibold text-lg mb-1">AG Servizi</h3>
        <p className="text-gray-600">{address}</p>
        <a
          href={`https://www.openstreetmap.org/directions?from=&to=${lat}%2C${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline text-sm mt-2 inline-block"
        >
          Indicazioni stradali
        </a>
      </div>
    </div>
  )
}
