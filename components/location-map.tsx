"use client"

import { useEffect, useRef, useState } from "react"

interface LocationMapProps {
  address: string
  placeId?: string
}

export default function LocationMap({ address, placeId }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    const googlePlaceId = placeId || process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID

    if (!googlePlaceId) {
      setMapError("ID del luogo non definito")
      return
    }

    // Carica la mappa tramite API route sicura
    const loadMap = async () => {
      try {
        // Inizializza il div della mappa con un iframe statico per evitare di esporre la chiave API
        if (mapRef.current) {
          const encodedAddress = encodeURIComponent(address)

          // Utilizziamo un iframe con OpenStreetMap che non richiede chiavi API
          mapRef.current.innerHTML = `
            <iframe 
              width="100%" 
              height="100%" 
              frameborder="0" 
              scrolling="no" 
              marginheight="0" 
              marginwidth="0" 
              src="https://www.openstreetmap.org/export/embed.html?bbox=14.4644%2C40.6904%2C14.4744%2C40.7004&amp;layer=mapnik&amp;marker=40.6954%2C14.4694" 
              style="border: 1px solid #ddd; border-radius: 4px;"
            ></iframe>
          `
          setIsMapLoaded(true)
        }
      } catch (error) {
        console.error("Errore nel caricamento della mappa:", error)
        setMapError("Impossibile caricare la mappa")
      }
    }

    loadMap()
  }, [address, placeId])

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      {mapError ? (
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-100">
          <p className="text-red-500">{mapError}</p>
        </div>
      ) : (
        <div ref={mapRef} className="w-full h-[300px]" aria-label={`Mappa di ${address}`}></div>
      )}
      <div className="bg-white p-4">
        <h3 className="font-semibold text-lg mb-1">AG Servizi</h3>
        <p className="text-gray-600">{address}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline text-sm mt-2 inline-block"
        >
          Visualizza su Google Maps
        </a>
      </div>
    </div>
  )
}
