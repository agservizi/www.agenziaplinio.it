"use client"

import Image from "next/image"
import { Settings, Bell, LogOut } from "lucide-react"
import type { UserData } from "./types"

interface UserHeaderProps {
  userData: UserData
  onLogout: () => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function UserHeader({ userData, onLogout, activeTab, setActiveTab }: UserHeaderProps) {
  return (
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
          <button className="text-gray-600 hover:text-primary transition-colors" aria-label="Impostazioni">
            <Settings size={20} />
          </button>
          <button className="text-gray-600 hover:text-primary transition-colors" aria-label="Notifiche">
            <Bell size={20} />
          </button>
          <button
            onClick={onLogout}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
            aria-label="Logout"
          >
            <LogOut size={20} className="mr-2" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="hidden md:flex overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
            activeTab === "dashboard" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-primary"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("appointments")}
          className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
            activeTab === "appointments" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-primary"
          }`}
        >
          Appuntamenti
        </button>
        <button
          onClick={() => setActiveTab("shipments")}
          className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
            activeTab === "shipments" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-primary"
          }`}
        >
          Spedizioni
        </button>
        <button
          onClick={() => setActiveTab("documents")}
          className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
            activeTab === "documents" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-primary"
          }`}
        >
          Documenti
        </button>
        <button
          onClick={() => setActiveTab("bills")}
          className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
            activeTab === "bills" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-primary"
          }`}
        >
          Fatture
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
            activeTab === "services" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-primary"
          }`}
        >
          Servizi
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden p-4">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="w-full p-2 border rounded-md bg-white"
          aria-label="Seleziona sezione"
        >
          <option value="dashboard">Dashboard</option>
          <option value="appointments">Appuntamenti</option>
          <option value="shipments">Spedizioni</option>
          <option value="documents">Documenti</option>
          <option value="bills">Fatture</option>
          <option value="services">Servizi</option>
        </select>
      </div>
    </div>
  )
}
