"use client"

import type React from "react"

import { useState } from "react"
import { jsPDF } from "jspdf"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VoucherFormData {
  name: string
  phone: string
  plan: string
}

const IliadVoucherGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState<VoucherFormData>({
    name: "",
    phone: "",
    plan: "TOP 250 PLUS",
  })
  const [errors, setErrors] = useState<Partial<VoucherFormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name as keyof VoucherFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handlePlanChange = (value: string) => {
    setFormData((prev) => ({ ...prev, plan: value }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<VoucherFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome obbligatorio"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefono obbligatorio"
    } else if (!/^[0-9]{8,10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Numero di telefono non valido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateVoucher = async () => {
    if (!validateForm()) return

    setIsGenerating(true)

    try {
      // Genera un codice voucher univoco
      const voucherCode = generateVoucherCode()
      const currentDate = new Date().toLocaleDateString("it-IT")

      // Salva il voucher nel database
      const saveResponse = await fetch("/api/iliad-vouchers/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: voucherCode,
        }),
      })

      const saveResult = await saveResponse.json()

      if (!saveResult.success) {
        throw new Error(`Errore nel salvataggio del voucher: ${saveResult.message}`)
      }

      // Crea un nuovo documento PDF in formato A5
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      })

      // Sfondo
      doc.setFillColor(255, 255, 255)
      doc.rect(0, 0, 148, 210, "F")

      // Header con sfondo rosso
      doc.setFillColor(255, 0, 50) // Iliad red in RGB
      doc.rect(0, 0, 148, 40, "F")

      // Aggiungi il logo Iliad come immagine
      await addLogoToDocument(doc)

      // Titolo del voucher
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("VOUCHER PROMOZIONALE", 74, 30, { align: "center" })

      // Informazioni sul voucher
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text(`OFFERTA ILIAD ${formData.plan}`, 74, 50, { align: "center" })

      // Codice voucher
      doc.setFillColor(245, 245, 247) // Iliad gray in RGB
      doc.roundedRect(24, 55, 100, 20, 3, 3, "F")
      doc.setTextColor(255, 0, 50) // Iliad red in RGB
      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.text(voucherCode, 74, 67, { align: "center" })

      // Dettagli dell'offerta
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text("Data di emissione: " + currentDate, 74, 80, { align: "center" })
      doc.text("Valido fino al: 31 maggio 2025, ore 19:00", 74, 85, { align: "center" })
      doc.text(`Intestato a: ${formData.name}`, 74, 90, { align: "center" })
      doc.text(`Telefono: ${formData.phone}`, 74, 95, { align: "center" })

      // Linea divisoria
      doc.setDrawColor(220, 220, 220)
      doc.line(24, 105, 124, 105)

      // Dettagli dell'offerta
      const planDetails = {
        data: "",
        features: ["", "", ""],
        price: "",
        activationPrice: "9,99",
        discountedActivationPrice: "5,00",
      }

      // Imposta i dettagli in base al piano selezionato
      switch (formData.plan) {
        case "GIGA 120":
          planDetails.data = "120 GB in 4G/4G+"
          planDetails.features = [
            "Minuti e SMS illimitati",
            "7GB dedicati in Europa",
            "Minuti illimitati verso 60 destinazioni",
          ]
          planDetails.price = "7,99"
          break
        case "TOP 250 PLUS":
          planDetails.data = "250 GB in 5G"
          planDetails.features = [
            "Minuti e SMS illimitati",
            "Roaming in UE incluso",
            "Minuti illimitati verso 60 destinazioni",
          ]
          planDetails.price = "9,99"
          break
        case "TOP 300":
          planDetails.data = "300 GB in 5G"
          planDetails.features = [
            "Minuti e SMS illimitati",
            "11GB dedicati in Europa",
            "Minuti illimitati verso 60 destinazioni",
          ]
          planDetails.price = "11,99"
          break
      }

      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text("Dettagli dell'offerta:", 24, 115)

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text(`• ${planDetails.data}`, 24, 125)

      // Aggiungi le features specifiche del piano
      planDetails.features.forEach((feature, index) => {
        doc.text(`• ${feature}`, 24, 130 + index * 5)
      })

      // Prezzo
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text("Prezzo mensile:", 24, 150)
      doc.setTextColor(255, 0, 50) // Iliad red in RGB
      doc.text(`€${planDetails.price}/mese per sempre`, 80, 150)

      // Costo di attivazione
      doc.setTextColor(0, 0, 0)
      doc.text("Costo di attivazione:", 24, 160)
      doc.setTextColor(255, 0, 50) // Iliad red in RGB
      doc.text(`€${planDetails.discountedActivationPrice}`, 80, 160)
      doc.setTextColor(150, 150, 150)
      doc.setFont("helvetica", "normal")
      doc.text(`(invece di €${planDetails.activationPrice})`, 95, 160)

      // Istruzioni
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text("Presentare questo voucher presso:", 74, 175, { align: "center" })
      doc.setFontSize(12)
      doc.text("AG SERVIZI VIA PLINIO 72", 74, 182, { align: "center" })

      // Footer con termini e condizioni
      doc.setFillColor(245, 245, 247) // Iliad gray in RGB
      doc.rect(0, 190, 148, 20, "F")
      doc.setTextColor(100, 100, 100)
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.text("Termini e condizioni:", 24, 197)
      doc.text("• Il voucher è valido solo per nuove attivazioni", 24, 202)
      doc.text("• Non cumulabile con altre promozioni", 24, 207)

      // Salva il PDF con il nome del voucher
      doc.save(`Voucher_Iliad_${formData.plan}_${voucherCode}.pdf`)
    } catch (error) {
      console.error("Errore nella generazione del PDF:", error)
      alert("Si è verificato un errore nella generazione del voucher. Riprova più tardi.")
    } finally {
      // Reimposta lo stato dopo un breve ritardo
      setTimeout(() => {
        setIsGenerating(false)
      }, 1500)
    }
  }

  // Funzione per aggiungere il logo
  const addLogoToDocument = async (doc: jsPDF) => {
    try {
      // Crea un elemento immagine
      const img = new Image()
      img.crossOrigin = "anonymous" // Importante per evitare problemi CORS

      // Imposta l'URL dell'immagine
      img.src = "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Iliad_logo-emmzu7gUgFwdyAdgiVCNUtInfD3i2S.png"

      // Attendi che l'immagine sia caricata
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      // Converti l'immagine in formato base64 per jsPDF
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0)
      const imageData = canvas.toDataURL("image/png")

      // Calcola le dimensioni per mantenere l'aspetto originale ma con altezza di circa 15mm
      const imgHeight = 15
      const imgWidth = (img.width / img.height) * imgHeight

      // Aggiungi l'immagine al PDF, centrata orizzontalmente
      const xPosition = (148 - imgWidth) / 2 // Centra l'immagine (148mm è la larghezza del PDF A5)
      doc.addImage(imageData, "PNG", xPosition, 10, imgWidth, imgHeight)
    } catch (error) {
      console.error("Errore nel caricamento del logo:", error)
      // Fallback al testo in caso di errore
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.setFont("helvetica", "bold")
      doc.text("iliad", 74, 20, { align: "center" })
    }
  }

  // Funzione per generare un codice voucher univoco
  const generateVoucherCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = "ILIAD-"
    const length = 8

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return result
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid gap-6">
        <div>
          <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome e Cognome
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Inserisci il tuo nome e cognome"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Numero di Telefono
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Inserisci il tuo numero di telefono"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-1">
            Piano Iliad
          </Label>
          <Select value={formData.plan} onValueChange={handlePlanChange}>
            <SelectTrigger id="plan" className="w-full">
              <SelectValue placeholder="Seleziona un piano" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-sm">
              <SelectItem value="GIGA 120">GIGA 120 - €7,99/mese</SelectItem>
              <SelectItem value="TOP 250 PLUS">TOP 250 PLUS - €9,99/mese</SelectItem>
              <SelectItem value="TOP 300">TOP 300 - €11,99/mese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
          <Button
            onClick={generateVoucher}
            disabled={isGenerating}
            className="w-full bg-[#ff0032] hover:bg-[#d60029] text-white py-3 rounded-lg transition-colors"
            size="lg"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generazione in corso...
              </span>
            ) : (
              "Genera il tuo Voucher"
            )}
          </Button>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>
          Inserisci i tuoi dati per generare un voucher personalizzato con codice univoco. Il voucher ti permetterà di
          attivare una SIM Iliad con €5 di sconto sul costo di attivazione.
        </p>
        <p className="mt-2">
          I tuoi dati saranno utilizzati esclusivamente per la generazione del voucher e non saranno condivisi con terze
          parti.
        </p>
      </div>
    </div>
  )
}

export default IliadVoucherGenerator
