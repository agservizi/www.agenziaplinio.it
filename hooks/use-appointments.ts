"use client"

import { useState, useEffect } from "react"
import type { Appointment } from "@/components/area-clienti/types"

export function useAppointments(email: string | null, isLoggedIn: boolean) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAppointments() {
      if (!email || !isLoggedIn) return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/bookings?email=${encodeURIComponent(email)}`)

        if (!response.ok) {
          throw new Error(`Errore nel recupero delle prenotazioni: ${response.status}`)
        }

        const data = await response.json()
        setAppointments(data)
      } catch (err) {
        console.error("Errore nella richiesta:", err)
        setError(err instanceof Error ? err.message : "Si è verificato un errore")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [email, isLoggedIn])

  // Funzione per ottenere il prossimo appuntamento
  const getNextAppointment = (): Appointment | null => {
    const today = new Date()
    const futureAppointments = [...appointments]
      .filter((app) => new Date(`${app.bookingDate}T${app.bookingTime}`) > today && app.status !== "cancelled")
      .sort((a, b) => {
        return (
          new Date(`${a.bookingDate}T${a.bookingTime}`).getTime() -
          new Date(`${b.bookingDate}T${b.bookingTime}`).getTime()
        )
      })

    return futureAppointments.length > 0 ? futureAppointments[0] : null
  }

  return {
    appointments,
    isLoading,
    error,
    getNextAppointment,
  }
}
