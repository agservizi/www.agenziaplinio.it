"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function Contatti() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(false)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        setSubmitError(true)
        console.error("Errore nell'invio dell'email:", data.error)
      }
    } catch (error) {
      setSubmitError(true)
      console.error("Errore nella richiesta:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-0 page-transition">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contattaci</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Siamo a tua disposizione per qualsiasi informazione o richiesta. Contattaci o vieni a trovarci in agenzia.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-bold mb-8">Informazioni di Contatto</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Indirizzo</h3>
                    <p className="text-gray-600">
                      Via Plinio il Vecchio 72
                      <br />
                      Castellammare di Stabia (NA)
                      <br />
                      80053
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Telefono</h3>
                    <p className="text-gray-600">
                      +39 081 1234567
                      <br />
                      +39 333 1234567
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-gray-600">
                      info@agenziaplinio.it
                      <br />
                      ag.servizi16@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Orari di Apertura</h3>
                    <p className="text-gray-600">
                      Lunedì - Venerdì: 9:00 - 13:00, 15:00 - 19:00
                      <br />
                      Sabato: 9:00 - 13:00
                      <br />
                      Domenica: Chiuso
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-8">Inviaci un Messaggio</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome e Cognome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Oggetto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Seleziona un oggetto</option>
                      <option value="Informazioni generali">Informazioni generali</option>
                      <option value="Pagamenti">Pagamenti</option>
                      <option value="Spedizioni">Spedizioni</option>
                      <option value="Attivazioni Digitali">Attivazioni Digitali</option>
                      <option value="CAF e Patronato">CAF e Patronato</option>
                      <option value="Altro">Altro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Messaggio *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center disabled:opacity-70"
                  >
                    {isSubmitting ? "Invio in corso..." : "Invia Messaggio"}
                    {!isSubmitting && <Send size={18} className="ml-2" />}
                  </button>
                </div>

                {submitSuccess && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-md">
                    Messaggio inviato con successo! Ti risponderemo al più presto.
                  </div>
                )}

                {submitError && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-md">
                    Si è verificato un errore durante l'invio del messaggio. Riprova più tardi.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Dove Siamo</h2>

          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            {/* Replace with actual Google Maps embed */}
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <p className="text-gray-600">Mappa Google non disponibile in anteprima</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Siamo facilmente raggiungibili con i mezzi pubblici e disponiamo di parcheggio nelle vicinanze.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
