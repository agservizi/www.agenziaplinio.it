"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search } from "lucide-react"

import { UserProvider, useUser } from "@/contexts/user-context"
import { useAppointments } from "@/hooks/use-appointments"

// Componenti dell'area clienti
import { LoginForm } from "@/components/area-clienti/login-form"
import { UserHeader } from "@/components/area-clienti/user-header"
import { DashboardOverview } from "@/components/area-clienti/dashboard-overview"
import { AppointmentsSection } from "@/components/area-clienti/appointments-section"
import { ShipmentsSection } from "@/components/area-clienti/shipments-section"
import { BillsSection } from "@/components/area-clienti/bills-section"
import { ServiceRequestsSection } from "@/components/area-clienti/service-requests-section"
import { QuickActionsSection } from "@/components/area-clienti/quick-actions-section"
import { UpcomingAppointment } from "@/components/area-clienti/upcoming-appointment"

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

// Componente principale che utilizza il Context
function CustomerPortalContent() {
  const { userData, isLoggedIn, logout } = useUser()
  const [activeTab, setActiveTab] = useState("dashboard")
  const router = useRouter()

  // Utilizziamo il custom hook per recuperare gli appuntamenti
  const { appointments, isLoading, getNextAppointment } = useAppointments(
    isLoggedIn ? userData?.email || null : null,
    isLoggedIn,
  )

  const handleLogout = () => {
    logout()
    router.push("/")
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

      {isLoggedIn && userData ? (
        // Dashboard for logged in users
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* User Header with Navigation */}
            <UserHeader userData={userData} onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Dashboard Content */}
            {activeTab === "dashboard" && (
              <>
                <UpcomingAppointment appointment={getNextAppointment()} />
                <QuickActionsSection />
                <DashboardOverview userData={userData} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AppointmentsSection
                    appointments={appointments.length > 0 ? appointments : userData.appointments}
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
                      {(appointments.length > 0 ? appointments : userData.appointments).map((appointment) => (
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
                      aria-label="Cerca documenti"
                    />
                    <button className="bg-primary text-white px-4 py-2 rounded-r-md" aria-label="Avvia ricerca">
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
                          <Search size={24} className="text-gray-500" />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-gray-500">{document.size}</span>
                        <button
                          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                          aria-label={`Scarica ${document.name}`}
                        >
                          Scarica
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
                          <Search className="h-5 w-5 text-primary" />
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
                          <Search className="h-5 w-5 text-primary" />
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
                          <Search className="h-5 w-5 text-primary" />
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
            <LoginForm />
          </div>
        </section>
      )}
    </div>
  )
}

// Wrapper che fornisce il Context
export default function CustomerPortal() {
  return (
    <UserProvider>
      <CustomerPortalContent />
    </UserProvider>
  )
}
