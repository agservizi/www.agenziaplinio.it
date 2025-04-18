"use client"

import { Calendar, Package, FileText, Bell } from "lucide-react"
import type { UserData } from "./types"

interface DashboardOverviewProps {
  userData: UserData
}

export function DashboardOverview({ userData }: DashboardOverviewProps) {
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
