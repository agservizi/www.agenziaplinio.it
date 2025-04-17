"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Package,
  FileText,
  Calendar,
  LogOut,
  CreditCard,
  Phone,
  FileSignature,
  Search,
  Mail,
  Bell,
  Settings,
  HelpCircle,
  MapPin,
  Clock,
  Download,
  ExternalLink,
  Printer,
  Share2,
} from "lucide-react"

// Interfacce per i tipi di dati
interface Appointment {
  id: number | string
  service?: string
  bookingDate: string
  bookingTime: string
  status: string
}

interface Shipment {
  id: string
  trackingNumber: string
  destination: string
  date: string
  status: string
  courier?: string
}

interface Document {
  id: string
  name: string
  date: string
  type: string
  category?: string
  size?: string
}

interface Bill {
  id: string
  service: string
  amount: number
  dueDate: string
  paid: boolean
  pdfUrl?: string
}

interface ServiceRequest {
  id: string
  type: string
  requestDate: string
  status: string
  details?: string
}

interface UserData {
  name: string
  email: string
  avatar: string
  notifications: number
  appointments: Appointment[]
  shipments: Shipment[]
  documents: Document[]
  bills: Bill[]
  serviceRequests: ServiceRequest[]
}

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

// Componenti per le diverse sezioni dell'area clienti
const DashboardOverview = ({ userData }: { userData: UserData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg border p-4 flex items-center">
        <div className="rounded-full bg-primary/10 p-3 mr-4">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Appuntamenti</p>
          <p className="text-xl font-bold">{userData.appointments.length}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg border p-4 flex items-center">
        <div className="rounded-full bg-primary/10 p-3 mr-4">
          <Package className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Spedizioni</p>
          <p className="text-xl font-bold">{userData.shipments.length}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg border p-4 flex items-center">
        <div className="rounded-full bg-primary/10 p-3 mr-4">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Documenti</p>
          <p className="text-xl font-bold">{userData.documents.length}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg border p-4 flex items-center">
        <div className="rounded-full bg-primary/10 p-3 mr-4">
          <Bell className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Notifiche</p>
          <p className="text-xl font-bold">{userData.notifications}</p>
        </div>
      </div>
    </div>
  )
}

const AppointmentsSection = ({ appointments, isLoading }: { appointments: Appointment[]; isLoading: boolean }) => {
  return (
    <div className="bg-white rounded-lg border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <Calendar size={18} className="mr-2 text-primary" />I tuoi appuntamenti
        </h3>
        <Link href="/prenota-appuntamento" className="text-primary hover:text-primary/80 text-sm font-medium">
          Prenota
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-6">
          <p>Caricamento appuntamenti...</p>
        </div>
      ) : appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="font-medium">{appointment.service || "Appuntamento generico"}</div>
              <div className="text-sm text-gray-600">
                {new Date(appointment.bookingDate).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                - {appointment.bookingTime.substring(0, 5)}
              </div>
              <div className="mt-1 flex justify-between items-center">
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    appointment.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : appointment.status === "confermato"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {appointment.status}
                </span>
                <div className="flex space-x-2">
                  <button
                    title="Stampa dettagli appuntamento"
                    className="text-gray-500 hover:text-primary transition-colors"
                  >
                    <Printer size={16} />
                  </button>
                  <button title="Condividi appuntamento" className="text-gray-500 hover:text-primary transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>Non hai appuntamenti programmati</p>
          <Link
            href="/prenota-appuntamento"
            className="mt-2 inline-block text-primary hover:text-primary/80 font-medium"
          >
            Prenota un appuntamento
          </Link>
        </div>
      )}
    </div>
  )
}

const ShipmentsSection = ({ shipments }: { shipments: Shipment[] }) => {
  return (
    <div className="bg-white rounded-lg border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <Package size={18} className="mr-2 text-primary" />
          Le tue spedizioni
        </h3>
        <Link href="/servizi/spedizioni" className="text-primary hover:text-primary/80 text-sm font-medium">
          Nuova spedizione
        </Link>
      </div>

      {shipments.length > 0 ? (
        <div className="space-y-4">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="font-medium">Spedizione verso {shipment.destination}</div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Tracking:</span> {shipment.trackingNumber}
                </div>
                <div className="text-sm text-gray-600">{shipment.courier}</div>
              </div>
              <div className="text-sm text-gray-600">
                {new Date(shipment.date).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="mt-1 flex justify-between items-center">
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    shipment.status === "consegnato"
                      ? "bg-green-100 text-green-800"
                      : shipment.status === "in transito"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {shipment.status}
                </span>
                <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
                  Traccia <ExternalLink size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>Non hai spedizioni attive</p>
          <Link href="/servizi/spedizioni" className="mt-2 inline-block text-primary hover:text-primary/80 font-medium">
            Effettua una spedizione
          </Link>
        </div>
      )}
    </div>
  )
}

const DocumentsSection = ({ documents }: { documents: Document[] }) => {
  return (
    <div className="bg-white rounded-lg border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <FileText size={18} className="mr-2 text-primary" />I tuoi documenti
        </h3>
        <div className="text-sm text-gray-500">{documents.length} documenti</div>
      </div>

      {documents.length > 0 ? (
        <div className="space-y-4">
          {documents.map((document) => (
            <div key={document.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="font-medium">{document.name}</div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{document.category}</span>
                <span>{document.size}</span>
              </div>
              <div className="text-sm text-gray-600">
                {new Date(document.date).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="mt-1">
                <button className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium">
                  Scarica {document.type}
                  <Download size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>Non hai documenti salvati</p>
        </div>
      )}
    </div>
  )
}

const BillsSection = ({ bills }: { bills: Bill[] }) => {
  return (
    <div className="bg-white rounded-lg border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <CreditCard size={18} className="mr-2 text-primary" />
          Le tue fatture
        </h3>
      </div>

      {bills.length > 0 ? (
        <div className="space-y-4">
          {bills.map((bill) => (
            <div key={bill.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="font-medium">{bill.service}</div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-600">
                  Scadenza:{" "}
                  {new Date(bill.dueDate).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="font-medium">{bill.amount.toFixed(2)} €</div>
              </div>
              <div className="mt-1 flex justify-between items-center">
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    bill.paid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {bill.paid ? "Pagata" : "Da pagare"}
                </span>
                <div className="flex space-x-3">
                  <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
                    <Download size={14} className="mr-1" /> PDF
                  </button>
                  {!bill.paid && (
                    <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
                      Paga ora
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>Non hai fatture disponibili</p>
        </div>
      )}
    </div>
  )
}

const ServiceRequestsSection = ({ requests }: { requests: ServiceRequest[] }) => {
  return (
    <div className="bg-white rounded-lg border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <FileSignature size={18} className="mr-2 text-primary" />
          Richieste di servizio
        </h3>
      </div>

      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="font-medium">{request.type}</div>
              <div className="text-sm text-gray-600">
                Richiesta il:{" "}
                {new Date(request.requestDate).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              {request.details && <div className="text-sm text-gray-600">{request.details}</div>}
              <div className="mt-1">
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    request.status === "completato"
                      ? "bg-green-100 text-green-800"
                      : request.status === "in elaborazione"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {request.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>Non hai richieste di servizio attive</p>
        </div>
      )}
    </div>
  )
}

const QuickActionsSection = () => {
  return (
    <div className="bg-white rounded-lg border p-5 mb-8">
      <h3 className="text-lg font-bold mb-4">Azioni rapide</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <Link
          href="/prenota-appuntamento"
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-center">Prenota appuntamento</span>
        </Link>
        <Link
          href="/servizi/spedizioni"
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-center">Nuova spedizione</span>
        </Link>
        <Link
          href="/servizi/visure"
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-center">Richiedi visura</span>
        </Link>
        <Link
          href="/servizi/trust-provider"
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <FileSignature className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-center">Servizi digitali</span>
        </Link>
        <Link
          href="/servizi/pagamenti"
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-center">Pagamenti</span>
        </Link>
        <Link href="/contatti" className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <HelpCircle className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-center">Assistenza</span>
        </Link>
      </div>
    </div>
  )
}

const UpcomingAppointment = ({ appointment }: { appointment: Appointment | null }) => {
  if (!appointment) return null

  return (
    <div className="bg-primary/5 rounded-lg border border-primary/20 p-5 mb-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold flex items-center">
          <Clock size={18} className="mr-2 text-primary" />
          Prossimo appuntamento
        </h3>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <p className="font-medium text-lg">{appointment.service || "Appuntamento generico"}</p>
          <p className="text-gray-600">
            {new Date(appointment.bookingDate).toLocaleDateString("it-IT", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            alle ore {appointment.bookingTime.substring(0, 5)}
          </p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Link
            href="/dove-siamo"
            className="bg-white text-primary border border-primary/20 hover:bg-primary/5 px-4 py-2 rounded-md text-sm font-medium mr-3 flex items-center"
          >
            <MapPin size={16} className="mr-1" /> Come arrivare
          </Link>
          <button className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium">
            Modifica
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente principale dell'area clienti
export default function CustomerPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [userData, setUserData] = useState<UserData>(sampleUserData)
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const router = useRouter()

  // Funzione per recuperare le prenotazioni dell'utente
  const fetchUserAppointments = async (email: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/bookings?email=${encodeURIComponent(email)}`)
      if (response.ok) {
        const data = await response.json()
        setUserAppointments(data)
      } else {
        console.error("Errore nel recupero delle prenotazioni")
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Effetto per caricare le prenotazioni quando l'utente effettua il login
  useEffect(() => {
    if (isLoggedIn && userData.email) {
      fetchUserAppointments(userData.email)
    }
  }, [isLoggedIn, userData.email])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would validate credentials against a database
    setIsLoggedIn(true)
    // Simuliamo il recupero delle prenotazioni per l'email inserita
    fetchUserAppointments(loginData.email)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoginData({
      email: "",
      password: "",
    })
    router.push("/")
  }

  // Trova il prossimo appuntamento
  const getNextAppointment = (): Appointment | null => {
    const today = new Date()
    const futureAppointments = [...userAppointments]
      .filter((app) => new Date(`${app.bookingDate}T${app.bookingTime}`) > today && app.status !== "cancelled")
      .sort((a, b) => {
        return (
          new Date(`${a.bookingDate}T${a.bookingTime}`).getTime() -
          new Date(`${b.bookingDate}T${b.bookingTime}`).getTime()
        )
      })

    return futureAppointments.length > 0 ? futureAppointments[0] : null
  }

  return (
    <div className="pt-0 page-transition">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Area Clienti</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Accedi alla tua area personale per gestire appuntamenti, documenti e spedizioni.
          </p>
        </div>
      </section>

      {isLoggedIn ? (
        // Dashboard for logged in users
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* User Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-primary/5 p-6 flex flex-col md:flex-row items-center justify-between border-b">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="relative">
                    <Image
                      src={userData.avatar || "/placeholder.svg?height=60&width=60&query=user avatar"}
                      alt={userData.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="absolute -top-1 -right-1 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {userData.notifications}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold">{userData.name}</h2>
                    <p className="text-gray-600">{userData.email}</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    <Settings size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-primary transition-colors">
                    <Bell size={20} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-600 hover:text-primary transition-colors"
                  >
                    <LogOut size={20} className="mr-2" />
                    <span className="hidden md:inline">Logout</span>
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                    activeTab === "dashboard"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("appointments")}
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                    activeTab === "appointments"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Appuntamenti
                </button>
                <button
                  onClick={() => setActiveTab("shipments")}
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                    activeTab === "shipments"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Spedizioni
                </button>
                <button
                  onClick={() => setActiveTab("documents")}
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                    activeTab === "documents"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Documenti
                </button>
                <button
                  onClick={() => setActiveTab("bills")}
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                    activeTab === "bills"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Fatture
                </button>
                <button
                  onClick={() => setActiveTab("services")}
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                    activeTab === "services"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Servizi
                </button>
              </div>
            </div>

            {/* Dashboard Content */}
            {activeTab === "dashboard" && (
              <>
                <UpcomingAppointment appointment={getNextAppointment()} />
                <QuickActionsSection />
                <DashboardOverview userData={userData} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AppointmentsSection
                    appointments={userAppointments.length > 0 ? userAppointments : userData.appointments}
                    isLoading={isLoading}
                  />
                  <ShipmentsSection shipments={userData.shipments} />
                </div>
              </>
            )}

            {activeTab === "appointments" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">I tuoi appuntamenti</h2>
                  <Link
                    href="/prenota-appuntamento"
                    className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Nuovo appuntamento
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Servizio
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Data
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ora
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Stato
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Azioni
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(userAppointments.length > 0 ? userAppointments : userData.appointments).map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.service || "Appuntamento generico"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(appointment.bookingDate).toLocaleDateString("it-IT", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{appointment.bookingTime.substring(0, 5)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                appointment.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : appointment.status === "confermato"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button className="text-primary hover:text-primary/80">Modifica</button>
                              <button className="text-red-600 hover:text-red-800">Cancella</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "shipments" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Le tue spedizioni</h2>
                  <Link
                    href="/servizi/spedizioni"
                    className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Nuova spedizione
                  </Link>
                </div>
                <ShipmentsSection shipments={userData.shipments} />
              </div>
            )}

            {activeTab === "documents" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">I tuoi documenti</h2>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Cerca documenti..."
                      className="border rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="bg-primary text-white px-4 py-2 rounded-r-md">
                      <Search size={18} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userData.documents.map((document) => (
                    <div key={document.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{document.name}</h3>
                          <p className="text-sm text-gray-500">{document.category}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(document.date).toLocaleDateString("it-IT", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="bg-gray-100 p-2 rounded">
                          <FileText size={24} className="text-gray-500" />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-gray-500">{document.size}</span>
                        <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
                          Scarica <Download size={14} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "bills" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Le tue fatture</h2>
                </div>
                <BillsSection bills={userData.bills} />
              </div>
            )}

            {activeTab === "services" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">I tuoi servizi</h2>
                </div>
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">Servizi attivi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className="rounded-full bg-primary/10 p-2 mr-3">
                          <FileSignature className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-medium">SPID</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Identità digitale attiva</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Attivo</span>
                        <button className="text-primary hover:text-primary/80 text-sm">Gestisci</button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className="rounded-full bg-primary/10 p-2 mr-3">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-medium">PEC</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Posta elettronica certificata</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Scade tra 30 giorni
                        </span>
                        <button className="text-primary hover:text-primary/80 text-sm">Rinnova</button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className="rounded-full bg-primary/10 p-2 mr-3">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-medium">Telefonia</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Contratto Iliad</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Attivo</span>
                        <button className="text-primary hover:text-primary/80 text-sm">Dettagli</button>
                      </div>
                    </div>
                  </div>
                </div>
                <ServiceRequestsSection requests={userData.serviceRequests} />
              </div>
            )}
          </div>
        </section>
      ) : (
        // Login form for non-logged in users
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Accedi all'Area Clienti</h2>
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="La tua email"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="La tua password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Accedi
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <Link href="#" className="text-sm text-primary hover:text-primary/80">
                    Password dimenticata?
                  </Link>
                </div>
                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-gray-600 mb-4">Non hai ancora un account?</p>
                  <Link
                    href="#"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors inline-block w-full"
                  >
                    Registrati
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
