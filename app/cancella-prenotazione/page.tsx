"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function CancelBookingPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  useEffect(() => {
    if (!token) {
      setError("Token di cancellazione mancante o non valido.")
      return
    }
  }, [token])

  const handleCancelBooking = async () => {
    if (!token) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/cancel-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to cancel booking")
      }

      const data = await response.json()
      setIsSuccess(true)
      setBookingDetails(data.booking)

      toast({
        title: "Prenotazione Cancellata",
        description: "La tua prenotazione è stata cancellata con successo.",
      })
    } catch (error) {
      console.error("Error cancelling booking:", error)
      setError(error instanceof Error ? error.message : "Impossibile cancellare la prenotazione. Riprova più tardi.")

      toast({
        title: "Errore",
        description:
          error instanceof Error ? error.message : "Impossibile cancellare la prenotazione. Riprova più tardi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="pt-24 page-transition">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Cancellazione Prenotazione</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">Token di cancellazione mancante o non valido.</p>
            </div>
            <div className="text-center">
              <Link href="/">
                <Button>Torna alla Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 page-transition">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Cancellazione Prenotazione</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 mb-2">La tua prenotazione è stata cancellata con successo.</p>
              {bookingDetails && (
                <p className="text-green-700 text-sm">
                  Prenotazione #{bookingDetails.id} per {bookingDetails.customerName}
                </p>
              )}
            </div>
          ) : (
            <>
              <p className="mb-6 text-gray-600">
                Sei sicuro di voler cancellare la tua prenotazione? Questa azione non può essere annullata.
              </p>

              <div className="flex justify-between">
                <Link href="/">
                  <Button variant="outline">Annulla</Button>
                </Link>
                <Button onClick={handleCancelBooking} disabled={isLoading} variant="destructive">
                  {isLoading ? "Cancellazione in corso..." : "Conferma Cancellazione"}
                </Button>
              </div>
            </>
          )}

          {isSuccess && (
            <div className="mt-6 text-center">
              <Link href="/prenota">
                <Button>Prenota un nuovo appuntamento</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

