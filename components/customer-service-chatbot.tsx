"use client"

import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import {
  X,
  Send,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  Clock,
  HelpCircle,
  Volume2,
  VolumeX,
  Settings,
  Loader2,
} from "lucide-react"

// Definizione dell'animazione di pulsazione sottile
const pulseAnimation = `
@keyframes pulse-subtle {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s infinite;
}
`

// Modifica la funzione callOpenRouter per risolvere il problema di autenticazione
async function callOpenRouter(userMessage: string, chatHistory: ChatMessage[]) {
  try {
    // Call our secure server-side API endpoint instead of directly calling OpenRouter
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: chatHistory.slice(-10), // Send last 10 messages for context
        userMessage: userMessage,
      }),
      signal: AbortSignal.timeout(10000), // Set a 10-second timeout
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Chatbot API error:", errorData)
      return getFallbackResponse(userMessage)
    }

    const data = await response.json()
    return data.content
  } catch (error) {
    console.error("Error calling chatbot API:", error)
    return getFallbackResponse(userMessage)
  }
}

// Funzione di fallback che utilizza la logica basata su parole chiave originale
function getFallbackResponse(userMessage: string) {
  // Sistema di risposta basato su parole chiave
  const userMessageLower = userMessage.toLowerCase()

  // Analisi delle parole chiave principali
  const keywords = {
    orari: ["orari", "apertura", "aperto", "chiuso", "quando", "orario", "ora", "alle", "dalle", "fino"],
    servizi: ["servizi", "offrite", "fate", "disponibile", "disponibilità"],
    pagamenti: ["pagamento", "pagare", "bollettini", "bollette", "mav", "bonifico", "f24"],
    contatti: ["contatto", "telefono", "email", "chiamare", "scrivere", "numero"],
    prenotazioni: ["prenotare", "appuntamento", "prenota", "prenotazione", "riservare"],
    ubicazione: ["dove", "indirizzo", "sede", "trovate", "mappa", "via", "strada"],
    spedizioni: ["spedizione", "spedire", "pacco", "pacchi", "corriere", "inviare"],
    documenti: ["documento", "carta", "identità", "passaporto", "certificato", "visura"],
    digitale: ["spid", "pec", "firma digitale", "identità digitale", "certificato digitale", "costo spid"],
    mattina: ["mattina", "10", "dieci"],
  }

  // Determina la categoria della domanda
  let category = null
  let maxMatches = 0

  for (const [cat, words] of Object.entries(keywords)) {
    const matches = words.filter((word) => userMessageLower.includes(word)).length
    if (matches > maxMatches) {
      maxMatches = matches
      category = cat
    }
  }

  // Risposte in base alla categoria identificata
  let response = ""
  switch (category) {
    case "orari":
      if (userMessageLower.includes("10") || userMessageLower.includes("mattina")) {
        response = "Siamo aperti alle 10:00 dal lunedì al venerdì e il sabato."
      } else {
        response =
          "Siamo aperti dal lunedì al venerdì dalle 9:00 alle 13:20 e dalle 16:00 alle 19:20. Il sabato dalle 9:00 alle 13:00."
      }
      break
    case "servizi":
      response =
        "Offriamo pagamenti, spedizioni, servizi postali, visure, attivazioni digitali, CAF e patronato, punto ritiro pacchi, ricariche e biglietteria."
      break
    case "pagamenti":
      response =
        "Puoi pagare bollettini, MAV, RAV, PagoPA, F24, bollo auto e altro. Accettiamo contanti, bancomat e carte."
      break
    case "contatti":
      response = "Puoi contattarci al numero 081 0584542 o via email a info@agenziaplinio.it."
      break
    case "prenotazioni":
      response = "Puoi prenotare un appuntamento dal nostro sito nella sezione 'Prenota Appuntamento'."
      break
    case "ubicazione":
      response = "Ci troviamo in Via Plinio il Vecchio 72, Castellammare di Stabia (NA)."
      break
    case "spedizioni":
      response = "Offriamo spedizioni nazionali e internazionali tramite BRT, GLS, DHL."
      break
    case "documenti":
      response = "Offriamo visure catastali, camerali, PRA, estratti di ruolo e certificati anagrafici."
      break
    case "digitale":
      if (userMessageLower.includes("costo")) {
        response = "L'attivazione dello SPID con Namirial costa 22,00€."
      } else {
        response = "Offriamo SPID (Namirial), firma digitale e PEC."
      }
      break
    default:
      response = "Mi dispiace, non ho compreso la tua domanda. Puoi riformularla o selezionare un argomento suggerito."
  }

  // Limita la lunghezza della risposta
  const maxLength = 150
  if (response.length > maxLength) {
    response = response.substring(0, maxLength) + "..."
  }

  return response
}

// Componente Tooltip personalizzato
const Tooltip = ({ children, text, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false)

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {isVisible && (
        <div
          className={`absolute ${positions[position]} bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50 pointer-events-none opacity-90 transition-opacity duration-200`}
        >
          {text}
          <div
            className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 
           ${position === "top" ? "top-full -translate-y-1/2 left-1/2 -translate-x-1/2" : ""}
           ${position === "bottom" ? "bottom-full translate-y-1/2 left-1/2 -translate-x-1/2" : ""}
           ${position === "left" ? "left-full -translate-x-1/2 top-1/2 -translate-y-1/2" : ""}
           ${position === "right" ? "right-full translate-x-1/2 top-1/2 -translate-y-1/2" : ""}
         `}
          ></div>
        </div>
      )}
      {children}
    </div>
  )
}

// Interfaccia per le preferenze utente
interface UserPreferences {
  soundEnabled: boolean
  position: "right" | "left"
  theme: "light" | "dark"
  fontSize: "small" | "medium" | "large"
}

// Interfaccia per i messaggi
interface ChatMessage {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: string
  feedback?: "positive" | "negative" | null
  read?: boolean
}

const CustomerServiceChatbot = () => {
  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<UserPreferences>({
    soundEnabled: false,
    position: "right",
    theme: "light",
    fontSize: "medium",
  })
  const [isSending, setIsSending] = useState(false) // Stato per indicare l'invio del messaggio
  const [openRouterError, setOpenRouterError] = useState<string | null>(null)

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const unreadAnnouncementRef = useRef<HTMLDivElement>(null)

  // State variables for localStorage items
  const [isOffline, setIsOffline] = useState(false)
  const [lastChatbotOpen, setLastChatbotOpen] = useState<string | null>(null)

  // Quick replies
  const quickReplies = [
    { id: 1, text: "Orari di apertura", query: "Quali sono i vostri orari?" },
    { id: 2, text: "Servizi disponibili", query: "Che servizi offrite?" },
    { id: 3, text: "Contatti", query: "Come posso contattarvi?" },
    { id: 4, text: "Prenotare appuntamento", query: "Vorrei prenotare un appuntamento" },
    { id: 5, text: "SPID", query: "Come attivo lo SPID?" },
    { id: 6, text: "Costi spedizione", query: "Quanto costa una spedizione?" },
    { id: 7, text: "Metodi di pagamento", query: "Quali metodi di pagamento accettate?" },
  ]

  // Inizializza lastChatbotOpen dal localStorage (solo lato client)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLastChatbotOpen(localStorage.getItem("lastChatbotOpen"))
    }
  }, [])

  // Funzioni di utilità
  const hasUnreadMessages = useCallback(() => {
    return messages.some((m) => m.type === "bot" && !m.read)
  }, [messages])

  const getUnreadCount = useCallback(() => {
    return messages.filter((m) => m.type === "bot" && !m.read).length
  }, [messages])

  const getLatestMessage = useCallback(() => {
    const botMessages = messages.filter((m) => m.type === "bot")
    if (botMessages.length > 0) {
      return (
        botMessages[botMessages.length - 1].content.substring(0, 50) +
        (botMessages[botMessages.length - 1].content.length > 50 ? "..." : "")
      )
    }
    return null
  }, [messages])

  const focusButton = useCallback(() => {
    buttonRef.current?.focus()
  }, [])

  const announceUnreadMessages = useCallback(() => {
    if (hasUnreadMessages()) {
      const unreadCount = getUnreadCount()
      const announcementText = `Hai ${unreadCount} nuovi messaggi dall'assistente virtuale`

      // Crea un elemento per l'annuncio
      const announcement = document.createElement("div")
      announcement.setAttribute("aria-live", "polite")
      announcement.setAttribute("class", "sr-only")
      announcement.textContent = announcementText

      // Aggiungi l'annuncio al DOM
      document.body.appendChild(announcement)

      // Rimuovi l'annuncio dopo un breve ritardo
      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 2000)
    }
  }, [getUnreadCount, hasUnreadMessages])

  const toggleChat = useCallback((open) => {
    setIsChatOpen(open)
    if (open && typeof window !== "undefined") {
      localStorage.setItem("lastChatbotOpen", new Date().toISOString())
    }
  }, [])

  const storeLastInteraction = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lastChatbotOpen", new Date().toISOString())
    }
  }, [])

  const clearNotification = useCallback(() => {
    setMessages((prev) => prev.map((msg) => (msg.type === "bot" ? { ...msg, read: true } : msg)))
  }, [])

  // Carica le preferenze utente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPreferences = localStorage.getItem("chatPreferences")
      if (savedPreferences) {
        try {
          setPreferences(JSON.parse(savedPreferences))
        } catch (e) {
          console.error("Errore nel parsing delle preferenze:", e)
        }
      }
    }
  }, [])

  // Salva le preferenze utente quando cambiano
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatPreferences", JSON.stringify(preferences))
    }
  }, [preferences])

  // Monitora lo stato della connessione
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOffline(false)

    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  // Gestione della navigazione e della cronologia del browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handlePopState = (event) => {
        if (isChatOpen) {
          event.preventDefault()
          setIsChatOpen(false)
        }
      }

      if (isChatOpen) {
        window.history.pushState({ chatOpen: true }, "")
      }

      window.addEventListener("popstate", handlePopState)

      return () => {
        window.removeEventListener("popstate", handlePopState)
      }
    }
  }, [isChatOpen])

  // Gestione del focus per l'accessibilità
  useEffect(() => {
    if (isChatOpen && typeof window !== "undefined") {
      // Salva l'elemento attualmente focalizzato
      previousFocusRef.current = document.activeElement as HTMLElement

      // Focus trap all'interno del chatbot
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsChatOpen(false)
          return
        }

        if (e.key === "Tab" && chatContainerRef.current) {
          const focusableElements = chatContainerRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          )

          const firstElement = focusableElements[0] as HTMLElement
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }

      document.addEventListener("keydown", handleKeyDown)

      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    } else if (previousFocusRef.current) {
      // Ripristina il focus quando il chatbot viene chiuso
      previousFocusRef.current.focus()
    }
  }, [isChatOpen])

  // Load chat history from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatHistory")
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages))
        } catch (e) {
          console.error("Errore nel parsing della cronologia chat:", e)
          // Fallback al messaggio di benvenuto
          setMessages([
            {
              id: Date.now(),
              type: "bot",
              content: "Ciao! Sono l'assistente virtuale di AG Servizi. Come posso aiutarti oggi?",
              timestamp: new Date().toISOString(),
              feedback: null,
              read: true,
            },
          ])
        }
      } else {
        // Initial welcome message
        setMessages([
          {
            id: Date.now(),
            type: "bot",
            content: "Ciao! Sono l'assistente virtuale di AG Servizi. Come posso aiutarti oggi?",
            timestamp: new Date().toISOString(),
            feedback: null,
            read: true,
          },
        ])
      }
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Play notification sound when new bot message arrives
  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastMessage = messages[messages.length - 1]
      if (
        messages.length > 0 &&
        lastMessage &&
        lastMessage.type === "bot" &&
        !lastMessage.read &&
        preferences.soundEnabled
      ) {
        // Mostra notifica del browser se supportata e l'utente ha dato il permesso
        if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("Nuovo messaggio", {
                body: lastMessage.content.substring(0, 100),
                icon: "/logo.png",
              })
            }
          })
        }
      }
    }
  }, [messages, preferences.soundEnabled, isChatOpen])

  // Richiedi permesso per le notifiche
  const requestNotificationPermission = () => {
    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission()
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return

    // Se offline, mostra un messaggio di errore
    if (!isOnline) {
      alert("Sei offline. Il messaggio verrà inviato quando tornerai online.")
      // Salva il messaggio in una coda locale
      if (typeof window !== "undefined") {
        const pendingMessages = JSON.parse(localStorage.getItem("pendingMessages") || "[]")
        pendingMessages.push(text)
        localStorage.setItem("pendingMessages", JSON.stringify(pendingMessages))
      }
      return
    }

    const userMessage = {
      id: Date.now(),
      type: "user" as const,
      content: text,
      timestamp: new Date().toISOString(),
    }

    // Add user message
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Show typing indicator
    setIsTyping(true)
    setIsSending(true) // Set isSending to true when sending
    setOpenRouterError(null) // Clear any previous OpenRouter errors

    try {
      // Chiamata all'API di OpenRouter
      const botResponseText = await callOpenRouter(text, messages)

      // Crea il messaggio di risposta del bot
      const botResponse = {
        id: Date.now() + 1,
        type: "bot" as const,
        content: botResponseText,
        timestamp: new Date().toISOString(),
        feedback: null,
        read: false,
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Error getting bot response:", error)
      setOpenRouterError(
        "La connessione al servizio AI non è disponibile. Per favore, abilita l'addestramento del prompt (prompt training) nelle impostazioni del tuo account OpenRouter: https://openrouter.ai/settings/privacy. In alternativa, verrà utilizzata una risposta predefinita.",
      )

      // Messaggio di fallback in caso di errore
      const errorResponse = {
        id: Date.now() + 1,
        type: "bot" as const,
        content: getFallbackResponse(text), // Usa la risposta di fallback
        timestamp: new Date().toISOString(),
        feedback: null,
        read: false,
      }

      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
      setIsSending(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleFeedback = (messageId, isPositive) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, feedback: isPositive ? "positive" : "negative" } : msg)),
    )

    // Invia feedback al server per migliorare le risposte future
    if (typeof window !== "undefined" && window.fetch) {
      fetch("/api/chatbot-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
          feedback: isPositive ? "positive" : "negative",
          messageContent: messages.find((m) => m.id === messageId)?.content,
        }),
      }).catch((e) => {
        console.error("Errore nell'invio del feedback:", e)
      })
    }
  }

  const handleClearChat = () => {
    const confirmClear = window.confirm("Sei sicuro di voler cancellare tutta la conversazione?")
    if (confirmClear) {
      const welcomeMessage = {
        id: Date.now(),
        type: "bot",
        content: "Conversazione cancellata. Come posso aiutarti oggi?",
        timestamp: new Date().toISOString(),
        feedback: null,
        read: true,
      }
      setMessages([welcomeMessage])
    }
  }

  const handleQuickReply = (query) => {
    handleSendMessage(query)
  }

  // Quando il chat viene aperto, segna tutti i messaggi come letti
  useEffect(() => {
    if (isChatOpen && messages.length > 0) {
      clearNotification()
    }
  }, [isChatOpen, clearNotification, messages.length])

  // Gestione dei visitatori di prima volta
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isFirstVisit = !localStorage.getItem("chatbotVisited")
      const lastOpenTime = localStorage.getItem("lastChatbotOpen")
      const currentTime = new Date()

      // Se è la prima visita o sono passati più di 7 giorni dall'ultima apertura
      if (
        isFirstVisit ||
        (lastOpenTime && currentTime.getTime() - new Date(lastOpenTime).getTime() > 7 * 24 * 60 * 60 * 1000)
      ) {
        // Mostra il chatbot automaticamente dopo 10 secondi
        const timer = setTimeout(() => {
          toggleChat(true)
          localStorage.setItem("chatbotVisited", "true")
          storeLastInteraction()
        }, 10000)

        return () => clearTimeout(timer)
      }
    }
  }, [toggleChat, storeLastInteraction, lastChatbotOpen])

  // Inserisci l'animazione CSS nel documento
  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style")
      style.innerHTML = pulseAnimation
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [])

  // Gestione dei messaggi in coda quando si torna online
  useEffect(() => {
    if (isOnline && typeof window !== "undefined") {
      const pendingMessages = JSON.parse(localStorage.getItem("pendingMessages") || "[]")
      if (pendingMessages.length > 0) {
        // Invia i messaggi in coda uno alla volta
        const sendPendingMessages = async () => {
          for (const message of pendingMessages) {
            await handleSendMessage(message)
          }
          localStorage.setItem("pendingMessages", "[]")
        }

        sendPendingMessages()
      }
    }
  }, [isOnline])

  // Funzione per cambiare le preferenze
  const updatePreference = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Annuncio per screen reader quando arrivano nuovi messaggi
  useEffect(() => {
    if (messages.length > 0 && !isChatOpen) {
      announceUnreadMessages()
    }
  }, [messages, isChatOpen, announceUnreadMessages])

  return (
    <div className={`fixed ${preferences.position === "right" ? "right-6" : "left-6"} bottom-6 z-50`}>
      {isChatOpen ? (
        <div
          ref={chatContainerRef}
          className={`bg-${preferences.theme === "light" ? "white" : "gray-800"} rounded-lg shadow-xl w-80 sm:w-96 flex flex-col overflow-hidden border border-gray-200 animate-fade-in max-h-[80vh]`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
        >
          {/* Header */}
          <div className={`bg-blue-600 text-white p-4 flex justify-between items-center`}>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide-icon"
                aria-hidden="true"
              >
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>
              <h3 id="chat-title" className="font-medium">
                Assistente Virtuale
              </h3>
              {!isOnline && (
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full ml-2">Offline</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Tooltip text="Impostazioni" position="bottom">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-gray-200 p-1"
                  aria-label="Impostazioni"
                  aria-expanded={showSettings}
                >
                  <Settings size={16} />
                </button>
              </Tooltip>
              <Tooltip text="Cancella conversazione" position="bottom">
                <button
                  onClick={handleClearChat}
                  className="text-white hover:text-gray-200 p-1"
                  aria-label="Cancella conversazione"
                >
                  <Trash2 size={16} />
                </button>
              </Tooltip>
              <Tooltip text="Chiudi chat" position="bottom">
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:text-gray-200 p-1"
                  aria-label="Chiudi chat"
                >
                  <X size={18} />
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div
              className={`p-4 border-b border-gray-200 bg-${preferences.theme === "light" ? "gray-50" : "gray-700"}`}
            >
              <h4 className={`font-medium mb-2 text-${preferences.theme === "light" ? "gray-800" : "white"}`}>
                Impostazioni
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className={`text-sm text-${preferences.theme === "light" ? "gray-700" : "gray-200"}`}>
                    Suoni
                  </label>
                  <button
                    onClick={() => updatePreference("soundEnabled", !preferences.soundEnabled)}
                    className={`p-1 rounded ${preferences.soundEnabled ? "text-green-500" : "text-gray-400"}`}
                    aria-label={preferences.soundEnabled ? "Disattiva suoni" : "Attiva suoni"}
                  >
                    {preferences.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <label className={`text-sm text-${preferences.theme === "light" ? "gray-700" : "gray-200"}`}>
                    Posizione
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updatePreference("position", "left")}
                      className={`px-2 py-1 text-xs rounded ${preferences.position === "left" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      Sinistra
                    </button>
                    <button
                      onClick={() => updatePreference("position", "right")}
                      className={`px-2 py-1 text-xs rounded ${preferences.position === "right" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      Destra
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className={`text-sm text-${preferences.theme === "light" ? "gray-700" : "gray-200"}`}>
                    Tema
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updatePreference("theme", "light")}
                      className={`px-2 py-1 text-xs rounded ${preferences.theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      Chiaro
                    </button>
                    <button
                      onClick={() => updatePreference("theme", "dark")}
                      className={`px-2 py-1 text-xs rounded ${preferences.theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      Scuro
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className={`text-sm text-${preferences.theme === "light" ? "gray-700" : "gray-200"}`}>
                    Dimensione testo
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updatePreference("fontSize", "small")}
                      className={`px-2 py-1 text-xs rounded ${preferences.fontSize === "small" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      S
                    </button>
                    <button
                      onClick={() => updatePreference("fontSize", "medium")}
                      className={`px-2 py-1 text-xs rounded ${preferences.fontSize === "medium" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      M
                    </button>
                    <button
                      onClick={() => updatePreference("fontSize", "large")}
                      className={`px-2 py-1 text-xs rounded ${preferences.fontSize === "large" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      L
                    </button>
                  </div>
                </div>
                <button
                  onClick={requestNotificationPermission}
                  className="w-full mt-2 text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                >
                  Attiva notifiche browser
                </button>
              </div>
            </div>
          )}

          {/* Messages area */}
          <div
            className={`flex-1 p-4 overflow-y-auto flex flex-col gap-3 min-h-[300px] max-h-[50vh] bg-${preferences.theme === "light" ? "white" : "gray-800"}`}
            style={{
              fontSize:
                preferences.fontSize === "small" ? "0.875rem" : preferences.fontSize === "large" ? "1.125rem" : "1rem",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${message.type === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`
                   p-3 rounded-lg max-w-[85%] relative
                   ${
                     message.type === "user"
                       ? `bg-blue-100 text-${preferences.theme === "light" ? "gray-800" : "gray-900"}`
                       : `bg-${preferences.theme === "light" ? "gray-100" : "gray-700"} text-${preferences.theme === "light" ? "gray-800" : "gray-100"}`
                   }
                 `}
                >
                  {message.content}
                  <div
                    className={`text-xs text-${preferences.theme === "light" ? "gray-500" : "gray-400"} mt-1 flex items-center`}
                  >
                    <Clock size={12} className="mr-1" />
                    {formatTime(message.timestamp)}
                  </div>
                </div>

                {/* Feedback buttons only for bot messages */}
                {message.type === "bot" && message.feedback === null && (
                  <div className="flex mt-1 space-x-1">
                    <Tooltip text="Risposta utile" position="bottom">
                      <button
                        onClick={() => handleFeedback(message.id, true)}
                        className={`text-${preferences.theme === "light" ? "gray-400" : "gray-500"} hover:text-green-500 p-1`}
                        aria-label="Feedback positivo"
                      >
                        <ThumbsUp size={14} />
                      </button>
                    </Tooltip>
                    <Tooltip text="Risposta non utile" position="bottom">
                      <button
                        onClick={() => handleFeedback(message.id, false)}
                        className={`text-${preferences.theme === "light" ? "gray-400" : "gray-500"} hover:text-red-500 p-1`}
                        aria-label="Feedback negativo"
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </Tooltip>
                  </div>
                )}

                {/* Show feedback confirmation */}
                {message.type === "bot" && message.feedback === "positive" && (
                  <div className="text-xs text-green-500 mt-1">Grazie per il feedback!</div>
                )}
                {message.type === "bot" && message.feedback === "negative" && (
                  <div className="text-xs text-red-500 mt-1">Ci dispiace. Miglioreremo!</div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div
                className={`flex items-center space-x-2 mr-auto bg-${preferences.theme === "light" ? "gray-100" : "gray-700"} p-3 rounded-lg`}
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            )}

            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length > 0 && messages[messages.length - 1].type === "bot" && !isTyping && (
            <div
              className={`px-4 py-2 border-t border-gray-200 flex gap-2 overflow-x-auto bg-${preferences.theme === "light" ? "gray-50" : "gray-700"}`}
            >
              {quickReplies.map((reply) => (
                <Tooltip key={reply.id} text={reply.query} position="top">
                  <button
                    onClick={() => handleQuickReply(reply.query)}
                    className={`whitespace-nowrap text-xs bg-${preferences.theme === "light" ? "gray-100" : "gray-600"} hover:bg-${preferences.theme === "light" ? "gray-200" : "gray-500"} text-${preferences.theme === "light" ? "gray-700" : "gray-200"} px-3 py-1.5 rounded-full flex items-center`}
                  >
                    <HelpCircle size={12} className="mr-1" />
                    {reply.text}
                  </button>
                </Tooltip>
              ))}
            </div>
          )}

          {/* Input area */}
          <div
            className={`border-t border-gray-200 p-3 flex gap-2 bg-${preferences.theme === "light" ? "white" : "gray-800"}`}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Scrivi un messaggio..."
              className={`flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-${preferences.theme === "light" ? "white" : "gray-700"} text-${preferences.theme === "light" ? "gray-800" : "white"}`}
              style={{
                fontSize:
                  preferences.fontSize === "small"
                    ? "0.875rem"
                    : preferences.fontSize === "large"
                      ? "1.125rem"
                      : "1rem",
              }}
              disabled={!isOnline || isSending}
            />
            <Tooltip text="Invia messaggio" position="left">
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping || !isOnline || isSending}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Invia messaggio"
              >
                {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={20} />}
              </button>
            </Tooltip>
          </div>
          {openRouterError && (
            <div className="p-2 text-red-500 text-sm">
              {openRouterError}
              {openRouterError.includes("policy") && (
                <Link href="https://openrouter.ai/settings/privacy" className="underline">
                  Apri impostazioni OpenRouter
                </Link>
              )}
            </div>
          )}
        </div>
      ) : (
        <Tooltip text="Hai bisogno di aiuto? Chatta con il nostro assistente virtuale">
          <button
            ref={buttonRef}
            onClick={() => {
              setIsChatOpen(true)
              // Tracciamento analitico dell'apertura del chatbot
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "open_chatbot", {
                  event_category: "engagement",
                  event_label: "chatbot",
                })
              }
              // Registra l'ultima apertura per gestire i messaggi di benvenuto
              if (typeof window !== "undefined") {
                localStorage.setItem("lastChatbotOpen", new Date().toISOString())
              }

              // Richiedi permesso per le notifiche al primo click
              requestNotificationPermission()
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setIsChatOpen(true)
              }
            }}
            className={`bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center relative ${!isChatOpen && hasUnreadMessages() ? "animate-pulse-subtle" : ""}`}
            aria-label={`Apri assistente virtuale${hasUnreadMessages() ? ` - Hai ${getUnreadCount()} messaggi non letti` : ""}`}
            aria-haspopup="dialog"
            aria-expanded={isChatOpen}
            tabIndex={0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide-icon"
              aria-hidden="true"
            >
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
            {!isChatOpen && hasUnreadMessages() && (
              <span
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                aria-hidden="true"
              >
                {getUnreadCount()}
              </span>
            )}
            {!isChatOpen && getLatestMessage() && !hasUnreadMessages() && (
              <div className="absolute -top-16 right-0 bg-white text-gray-800 p-2 rounded-lg shadow-md text-xs max-w-[200px] border border-gray-200 animate-fade-in">
                <p className="font-semibold">Ultimo messaggio:</p>
                <p className="truncate">{getLatestMessage()}</p>
              </div>
            )}
          </button>
        </Tooltip>
      )}
    </div>
  )
}

export default CustomerServiceChatbot
