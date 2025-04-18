"use client"

import Link from "next/link"
import { Clock, MapPin } from "lucide-react"
import type { Appointment } from "./types"

interface UpcomingAppointmentProps {
  appointment: Appointment | null
}

export function UpcomingAppointment({ appointment }: UpcomingAppointmentProps) {
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
            aria-label="Visualizza indicazioni per arrivare"
          >
            <MapPin size={16} className="mr-1" /> Come arrivare
          </Link>
          <button
            className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
            aria-label="Modifica appuntamento"
          >
            Modifica
          </button>
        </div>
      </div>
    </div>
  )
}
