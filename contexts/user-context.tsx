"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { UserData } from "@/components/area-clienti/types"

// Dati di esempio per lo sviluppo
const sampleUserData: UserData = {
  name: "Mario Rossi",
  email: "mario.rossi@example.com",
  avatar: "/images/avatar-placeholder.jpg",
  notifications: 3,
  appointments: [
    {
      id: "app-1",
      service: "CAF - Dichiarazione dei Redditi",
      bookingDate: "2023-12-15",
      bookingTime: "10:30:00",
      status: "confermato",
    },
  ],
  shipments: [
    {
      id: "ship-1",
      trackingNumber: "BRT1234567890",
      destination: "Roma, RM",
      date: "2023-11-10T14:00:00",
      status: "in transito",
      courier: "BRT",
    },
    {
      id: "ship-2",
      trackingNumber: "TNT9876543210",
      destination: "Milano, MI",
      date: "2023-11-05T11:15:00",
      status: "consegnato",
      courier: "TNT",
    },
  ],
  documents: [
    {
      id: "doc-1",
      name: "Dichiarazione dei Redditi 2022",
      date: "2023-05-20T09:45:00",
      type: "PDF",
      category: "Fiscale",
      size: "2.4 MB",
    },
    {
      id: "doc-2",
      name: "Ricevuta Attivazione SPID",
      date: "2023-08-12T16:30:00",
      type: "PDF",
      category: "Identità Digitale",
      size: "1.1 MB",
    },
    {
      id: "doc-3",
      name: "Contratto Luce A2A",
      date: "2023-09-05T11:20:00",
      type: "PDF",
      category: "Utenze",
      size: "3.2 MB",
    },
  ],
  bills: [
    {
      id: "bill-1",
      service: "Attivazione SPID",
      amount: 20.0,
      dueDate: "2023-10-15",
      paid: true,
      pdfUrl: "#",
    },
    {
      id: "bill-2",
      service: "Rinnovo PEC",
      amount: 25.0,
      dueDate: "2023-12-01",
      paid: false,
      pdfUrl: "#",
    },
  ],
  serviceRequests: [
    {
      id: "req-1",
      type: "Attivazione SPID",
      requestDate: "2023-09-10",
      status: "completato",
      details: "Identità verificata e attivata",
    },
    {
      id: "req-2",
      type: "Richiesta Visura Catastale",
      requestDate: "2023-10-25",
      status: "in elaborazione",
      details: "In attesa di risposta dall'ufficio catastale",
    },
  ],
}

interface UserContextType {
  userData: UserData | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const UserContext = createContext<UserContextType>({
  userData: null,
  isLoggedIn: false,
  login: async () => false,
  logout: () => {},
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Verifica se l'utente è già loggato al caricamento
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn")
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true)
      setUserData(sampleUserData) // In produzione, recuperare i dati dal server
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulazione di una chiamata API di login
    // In produzione, questa dovrebbe essere una vera chiamata API
    try {
      // Simuliamo un ritardo di rete
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Per ora accettiamo qualsiasi credenziale
      setIsLoggedIn(true)
      setUserData({
        ...sampleUserData,
        email,
      })

      // Salva lo stato di login nel localStorage
      localStorage.setItem("isLoggedIn", "true")

      return true
    } catch (error) {
      console.error("Errore durante il login:", error)
      return false
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserData(null)
    localStorage.removeItem("isLoggedIn")
  }

  return <UserContext.Provider value={{ userData, isLoggedIn, login, logout }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
