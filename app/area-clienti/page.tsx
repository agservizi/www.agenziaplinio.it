"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package, FileText, Calendar, LogOut } from "lucide-react"

// Sample user data - in a real application, this would come from a database
const userData = {
  name: "Mario Rossi",
  email: "mario.rossi@example.com",
  avatar: "/images/avatar-placeholder.jpg",
  notifications: 3,
  appointments: [
    {
      id: "app-1",
      service: "CAF - Dichiarazione dei Redditi",
      date: "2023-12-15T10:30:00",
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
    },
    {
      id: "ship-2",
      trackingNumber: "TNT9876543210",
      destination: "Milano, MI",
      date: "2023-11-05T11:15:00",
      status: "consegnato",
    },
  ],
  documents: [
    {
      id: "doc-1",
      name: "Dichiarazione dei Redditi 2022",
      date: "2023-05-20T09:45:00",
      type: "PDF",
    },
    {
      id: "doc-2",
      name: "Ricevuta Attivazione SPID",
      date: "2023-08-12T16:30:00",
      type: "PDF",
    },
    {
      id: "doc-3",
      name: "Contratto Luce A2A",
      date: "2023-09-05T11:20:00",
      type: "PDF",
    },
  ],
}

export default function CustomerPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would validate credentials against a database
    setIsLoggedIn(true)
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
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* User Header */}
              <div className="bg-primary/5 p-6 flex flex-col md:flex-row items-center justify-between border-b">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="relative">
                    <Image
                      src={userData.avatar || "/placeholder.svg?height=60&width=60"}
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
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-primary transition-colors"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </div>

              {/* Dashboard Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Appointments */}
                  <div className="bg-white rounded-lg border p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold flex items-center">
                        <Calendar size={18} className="mr-2 text-primary" />I tuoi appuntamenti
                      </h3>
                      <Link href="/booking" className="text-primary hover:text-primary/80 text-sm font-medium">
                        Prenota
                      </Link>
                    </div>

                    {userData.appointments.length > 0 ? (
                      <div className="space-y-4">
                        {userData.appointments.map((appointment) => (
                          <div key={appointment.id} className="border-b pb-4 last:border-0 last:pb-0">
                            <div className="font-medium">{appointment.service}</div>
                            <div className="text-sm text-gray-600">
                              {new Date(appointment.date).toLocaleDateString("it-IT", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            <div className="mt-1">
                              <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                {appointment.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <p>Non hai appuntamenti programmati</p>
                        <Link
                          href="/booking"
                          className="mt-2 inline-block text-primary hover:text-primary/80 font-medium"
                        >
                          Prenota un appuntamento
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Shipments */}
                  <div className="bg-white rounded-lg border p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold flex items-center">
                        <Package size={18} className="mr-2 text-primary" />
                        Le tue spedizioni
                      </h3>
                    </div>

                    {userData.shipments.length > 0 ? (
                      <div className="space-y-4">
                        {userData.shipments.map((shipment) => (
                          <div key={shipment.id} className="border-b pb-4 last:border-0 last:pb-0">
                            <div className="font-medium">Spedizione verso {shipment.destination}</div>
                            <div className="text-sm text-gray-600">Tracking: {shipment.trackingNumber}</div>
                            <div className="text-sm text-gray-600">
                              {new Date(shipment.date).toLocaleDateString("it-IT", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </div>
                            <div className="mt-1">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  shipment.status === "consegnato"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {shipment.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <p>Non hai spedizioni attive</p>
                        <Link
                          href="/servizi/spedizioni"
                          className="mt-2 inline-block text-primary hover:text-primary/80 font-medium"
                        >
                          Effettua una spedizione
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Documents */}
                  <div className="bg-white rounded-lg border p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold flex items-center">
                        <FileText size={18} className="mr-2 text-primary" />I tuoi documenti
                      </h3>
                    </div>

                    {userData.documents.length > 0 ? (
                      <div className="space-y-4">
                        {userData.documents.map((document) => (
                          <div key={document.id} className="border-b pb-4 last:border-0 last:pb-0">
                            <div className="font-medium">{document.name}</div>
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
                                <ArrowRight size={14} className="ml-1" />
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
                </div>
              </div>
            </div>
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
