"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { jsPDF } from "jspdf"

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingDialog({ open, onOpenChange }: BookingDialogProps) {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    servizio: "",
    data: "",
    ora: "",
    messaggio: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const response = await fetch("/api/availability/dates")
        if (response.ok) {
          const data = await response.json()
          setAvailableDates(data.availableDates || [])
        }
      } catch (error) {
        console.error("Errore nel caricamento delle date disponibili:", error)
      }
    }

    fetchAvailableDates()
  }, [])

  const fetchTimeSlots = async (selectedDate: string) => {
    if (!selectedDate) {
      setAvailableTimeSlots([])
      return
    }

    try {
      const response = await fetch(`/api/availability/timeslots?date=${selectedDate}`)
      if (response.ok) {
        const data = await response.json()
        setAvailableTimeSlots(data.availableTimeSlots || [])
      }
    } catch (error) {
      console.error("Errore nel caricamento degli orari disponibili:", error)
      setAvailableTimeSlots([])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Se è cambiata la data, carica gli orari disponibili
    if (name === "data" && value) {
      fetchTimeSlots(value)
      // Reset dell'orario selezionato quando cambia la data
      setFormData((prev) => ({ ...prev, ora: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validazione base
    if (
      !formData.nome ||
      !formData.cognome ||
      !formData.email ||
      !formData.telefono ||
      !formData.servizio ||
      !formData.data ||
      !formData.ora
    ) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi obbligatori",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      // Chiamata API per generare la prenotazione
      const response = await fetch("/api/booking-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail: formData.email,
          customerData: formData,
        }),
      })

      if (!response.ok) {
        throw new Error("Errore durante la prenotazione")
      }

      const data = await response.json()

      // Genera e scarica il PDF
      generateAndDownloadPDF(data.bookingCode, new Date(data.bookingDate), formData)

      // Chiudi il dialog
      onOpenChange(false)

      // Mostra un messaggio di successo
      toast({
        title: "Prenotazione completata!",
        description: "Il PDF è stato scaricato e la conferma è stata inviata via email.",
      })
    } catch (error) {
      console.error("Errore durante la prenotazione:", error)
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la prenotazione. Riprova più tardi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateAndDownloadPDF = (bookingCode: string, bookingDate: Date, userData: any) => {
    // Crea un nuovo documento PDF in formato A5
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a5",
    })

    // Imposta il titolo
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("AG SERVIZI - Conferma Prenotazione", 148 / 2, 20, { align: "center" })

    // Aggiungi una linea separatrice
    doc.setLineWidth(0.5)
    doc.line(10, 25, 138, 25)

    // Imposta il font per il contenuto
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")

    // Aggiungi i dettagli della prenotazione
    doc.text("Codice Prenotazione:", 15, 40)
    doc.setFont("helvetica", "bold")
    doc.text(bookingCode, 70, 40)
    doc.setFont("helvetica", "normal")

    doc.text("Data di Prenotazione:", 15, 50)
    doc.text(bookingDate.toLocaleDateString("it-IT"), 70, 50)

    doc.text("Ora di Prenotazione:", 15, 60)
    doc.text(bookingDate.toLocaleTimeString("it-IT"), 70, 60)

    // Aggiungi i dati dell'utente
    doc.text("Nome:", 15, 75)
    doc.text(`${userData.nome} ${userData.cognome}`, 70, 75)

    doc.text("Email:", 15, 85)
    doc.text(userData.email, 70, 85)

    doc.text("Telefono:", 15, 95)
    doc.text(userData.telefono, 70, 95)

    doc.text("Servizio richiesto:", 15, 105)
    doc.text(userData.servizio, 70, 105)

    if (userData.data && userData.ora) {
      doc.text("Data preferita:", 15, 115)
      doc.text(`${userData.data} - ${userData.ora}`, 70, 115)
    }

    // Aggiungi informazioni aggiuntive
    doc.setFontSize(10)
    doc.text("Presentati in agenzia con questo codice per completare la tua prenotazione.", 15, 130)
    doc.text("Indirizzo: Via Plinio il Vecchio 72, Castellammare di Stabia", 15, 140)
    doc.text("Telefono: +39 081 0584542", 15, 150)
    doc.text("Email: info@agenziaplinio.it", 15, 160)

    // Aggiungi un footer
    doc.setFontSize(8)
    doc.text("AG SERVIZI - Tutti i diritti riservati", 148 / 2, 200, { align: "center" })

    // Scarica il PDF
    doc.save(`Prenotazione_${bookingCode}.pdf`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Prenota un Appuntamento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome *</Label>
              <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cognome">Cognome *</Label>
              <Input id="cognome" name="cognome" value={formData.cognome} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Telefono *</Label>
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="servizio">Servizio richiesto *</Label>
              <select
                id="servizio"
                name="servizio"
                value={formData.servizio}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Seleziona un servizio</option>
                <option value="Pagamenti">Pagamenti (Bollettini, F24, PagoPA)</option>
                <option value="Biglietteria">Biglietteria</option>
                <option value="Spedizioni">Spedizioni</option>
                <option value="Trust Provider">Trust Provider</option>
                <option value="CAF e Patronato">CAF e Patronato</option>
                <option value="Visure">Visure</option>
                <option value="Telefonia, Luce e Gas">Telefonia, Luce e Gas</option>
                <option value="Servizi Postali">Servizi Postali</option>
                <option value="Punto di Ritiro Pacchi">Punto di Ritiro Pacchi</option>
                <option value="Altro">Altro</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="data">Data disponibile *</Label>
              <select
                id="data"
                name="data"
                value={formData.data}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Seleziona una data</option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString("it-IT", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ora">Orario disponibile *</Label>
              <select
                id="ora"
                name="ora"
                value={formData.ora}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
                disabled={!formData.data}
              >
                <option value="">Seleziona un orario</option>
                {availableTimeSlots.map((timeSlot) => (
                  <option key={timeSlot} value={timeSlot}>
                    {timeSlot}
                  </option>
                ))}
              </select>
              {!formData.data && <p className="text-xs text-muted-foreground">Seleziona prima una data</p>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="messaggio">Note aggiuntive (opzionale)</Label>
              <textarea
                id="messaggio"
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Elaborazione in corso..." : "Conferma Prenotazione"}
          </Button>
          <p className="text-xs text-gray-500 text-center">
            Riceverai un PDF con i dettagli della prenotazione e un codice univoco. Lo stesso codice ti verrà inviato
            anche via email.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
