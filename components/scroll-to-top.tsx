"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Controlla lo scroll e mostra/nasconde il pulsante
  useEffect(() => {
    const toggleVisibility = () => {
      // Mostra il pulsante quando l'utente scorre oltre 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    // Pulizia dell'event listener quando il componente viene smontato
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Funzione per scorrere verso l'alto
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-20 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "transform hover:scale-110",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
      )}
      aria-label="Torna all'inizio della pagina"
    >
      <ArrowUp size={24} />
    </button>
  )
}
