"use client"

import Link from "next/link"
import { Calendar, Printer, Share2 } from "lucide-react"
import type { Appointment } from "./types"

interface AppointmentsSectionProps {
  appointments: Appointment[]
  isLoading: boolean
}

export function AppointmentsSection({ appointments, isLoading }: AppointmentsSectionProps) {
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
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b pb-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
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
                <div className="sr-only">Stato: {appointment.status}</div>
                <span
                  aria-hidden="true"
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
                    aria-label="Stampa dettagli appuntamento"
                    className="text-gray-500 hover:text-primary transition-colors"
                  >
                    <Printer size={16} />
                  </button>
                  <button
                    title="Condividi appuntamento"
                    aria-label="Condividi appuntamento"
                    className="text-gray-500 hover:text-primary transition-colors"
                  >
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
