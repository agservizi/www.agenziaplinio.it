"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Cookie, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Definizione delle categorie di cookie
const cookieCategories = [
  {
    id: "necessary",
    name: "Cookie necessari",
    description: "Essenziali per il funzionamento del sito. Non possono essere disattivati.",
    required: true,
  },
  {
    id: "functional",
    name: "Cookie funzionali",
    description: "Permettono di personalizzare l'esperienza e ricordare le preferenze.",
    required: false,
  },
  {
    id: "analytics",
    name: "Cookie analitici",
    description: "Ci aiutano a capire come utilizzi il sito per migliorarlo.",
    required: false,
  },
  {
    id: "marketing",
    name: "Cookie di marketing",
    description: "Utilizzati per mostrarti annunci pertinenti in base ai tuoi interessi.",
    required: false,
  },
]

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showCustomization, setShowCustomization] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState<Record<string, boolean>>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Controlla se l'utente ha già accettato i cookie
    const cookieConsent = localStorage.getItem("cookie-consent")
    if (!cookieConsent) {
      setIsVisible(true)
    } else if (cookieConsent === "custom") {
      // Carica le preferenze salvate
      const savedPreferences = localStorage.getItem("cookie-preferences")
      if (savedPreferences) {
        setCookiePreferences(JSON.parse(savedPreferences))
      }
    }
  }, [])

  const acceptAllCookies = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    }
    localStorage.setItem("cookie-consent", "accepted")
    localStorage.setItem("cookie-preferences", JSON.stringify(allAccepted))
    setCookiePreferences(allAccepted)
    setIsVisible(false)

    // Ricarica la pagina per applicare le impostazioni di analytics
    window.location.reload()
  }

  const saveCustomPreferences = () => {
    localStorage.setItem("cookie-consent", "custom")
    localStorage.setItem("cookie-preferences", JSON.stringify(cookiePreferences))
    setIsVisible(false)

    // Ricarica la pagina per applicare le impostazioni di analytics
    window.location.reload()
  }

  const handleToggleChange = (categoryId: string, value: boolean) => {
    setCookiePreferences((prev) => ({
      ...prev,
      [categoryId]: value,
    }))
  }

  const showCustomizationOptions = () => {
    setShowCustomization(true)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="relative bg-primary rounded-xl overflow-hidden shadow-xl border border-primary/20">
        {/* Elemento decorativo */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-secondary/70 to-secondary/30"></div>

        <div className="p-5 md:p-6">
          {!showCustomization ? (
            <div className="flex flex-col md:flex-row items-start gap-5">
              <div className="flex-shrink-0 bg-white/10 p-3 rounded-full">
                <Cookie className="h-6 w-6 text-secondary" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center">Informativa sui Cookie</h3>

                <p className="text-white/80 mb-4 max-w-3xl text-sm">
                  Questo sito utilizza cookie tecnici e di profilazione per offrirti la migliore esperienza. Continuando
                  la navigazione, acconsenti all'utilizzo dei cookie come descritto nella nostra Cookie Policy.
                </p>

                <div className="flex flex-wrap gap-3 items-center">
                  <Button
                    onClick={acceptAllCookies}
                    className="bg-secondary hover:bg-secondary/90 text-white font-medium"
                  >
                    Accetta tutti
                  </Button>
                  <Button
                    variant="outline"
                    onClick={showCustomizationOptions}
                    className="border-white/30 text-secondary hover:bg-white/10 hover:text-white font-medium"
                  >
                    Personalizza
                  </Button>
                  <Link href="/cookie-policy" className="flex items-center text-sm text-white/80 hover:text-white ml-1">
                    <Info className="h-3.5 w-3.5 mr-1" />
                    Maggiori informazioni
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center">Personalizza le preferenze cookie</h3>
                <button
                  onClick={() => setShowCustomization(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Torna indietro"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              <div className="space-y-4 mb-5">
                {cookieCategories.map((category) => (
                  <div key={category.id} className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex-1">
                        <Label htmlFor={category.id} className="text-white font-medium">
                          {category.name}
                        </Label>
                      </div>
                      <Switch
                        id={category.id}
                        checked={cookiePreferences[category.id]}
                        onCheckedChange={(checked) => handleToggleChange(category.id, checked)}
                        disabled={category.required}
                        className="data-[state=checked]:bg-secondary"
                      />
                    </div>
                    <p className="text-white/70 text-sm">{category.description}</p>
                    {category.required && (
                      <div className="mt-1 text-xs text-secondary flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Sempre attivo
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomization(false)}
                  className="border-white/30 text-secondary hover:bg-white/10 hover:text-white"
                >
                  Annulla
                </Button>
                <Button onClick={saveCustomPreferences} className="bg-secondary hover:bg-secondary/90 text-white">
                  Salva preferenze
                </Button>
              </div>
            </div>
          )}

          {!showCustomization && (
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Chiudi"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
