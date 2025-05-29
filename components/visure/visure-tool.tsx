"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { FileText, Search, Building, RefreshCw, CheckCircle, XCircle, Clock, AlertCircle, Database } from "lucide-react"

type VisuraRequest = {
  id: number
  tipo_visura: string
  sottotipo: string
  nome_richiedente: string
  email: string
  telefono: string
  stato: string
  data_richiesta: string
}

export default function VisureTool() {
  // Rimuovere questa riga
  // const [activeTab, setActiveTab] = useState<"richiedi" | "stato">("richiedi")

  // E sostituirla con
  const [fileUploaded, setFileUploaded] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [requests, setRequests] = useState<VisuraRequest[]>([])
  const [formData, setFormData] = useState({
    tipo_visura: "catastale",
    sottotipo: "per soggetto",
    nome_richiedente: "",
    email: "",
    telefono: "",
    codice_fiscale: "",
    partita_iva: "",
    dati_richiesta: {
      indirizzo: "",
      comune: "",
      provincia: "",
      foglio: "",
      particella: "",
      subalterno: "",
      denominazione: "",
      ragione_sociale: "",
    },
    note: "",
    documento_identita: false,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [dbInitialized, setDbInitialized] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [whatsappLink, setWhatsappLink] = useState("")

  // Inizializza il database al caricamento del componente
  useEffect(() => {
    const initDb = async () => {
      try {
        const response = await fetch("/api/visure/init-db")
        const data = await response.json()
        if (data.success) {
          setDbInitialized(true)
          console.log("Database visure inizializzato con successo")
        }
      } catch (error) {
        console.error("Errore durante l'inizializzazione del database:", error)
      }
    }

    initDb()
  }, [])

  // Rimuovere questo useEffect
  // useEffect(() => {
  //   if (activeTab === "stato") {
  //     fetchRequests()
  //   }
  // }, [activeTab])

  // Rimuovere anche la funzione fetchRequests()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (name.includes(".")) {
      // Gestisci i campi nidificati (es. dati_richiesta.indirizzo)
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      // Gestisci i campi normali
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }))
    }

    // Rimuovi l'errore quando l'utente modifica il campo
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.nome_richiedente) errors.nome_richiedente = "Il nome è obbligatorio"
    if (!formData.email) errors.email = "L'email è obbligatoria"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email non valida"
    if (!formData.telefono) errors.telefono = "Il telefono è obbligatorio"

    // Validazione specifica per tipo di visura
    if (formData.tipo_visura === "catastale") {
      if (formData.sottotipo === "per soggetto" && !formData.codice_fiscale) {
        errors.codice_fiscale = "Il codice fiscale è obbligatorio per questo tipo di visura"
      }
      if (formData.sottotipo === "per immobile" && !formData.dati_richiesta.foglio) {
        errors["dati_richiesta.foglio"] = "Il foglio è obbligatorio per questo tipo di visura"
      }
    } else if (formData.tipo_visura === "camerale") {
      if (!formData.dati_richiesta.denominazione) {
        errors["dati_richiesta.denominazione"] = "La denominazione è obbligatoria per questo tipo di visura"
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setFileUploaded(file)

      // Crea un'anteprima del file
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeFile = () => {
    setFileUploaded(null)
    setFilePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setSuccessMessage("")
    setErrorMessage("")

    try {
      // Costruisci il messaggio WhatsApp
      let message = `*Richiesta Visura - AG SERVIZI*\n\n`
      message += `*Tipo Visura:* ${formData.tipo_visura.charAt(0).toUpperCase() + formData.tipo_visura.slice(1)}\n`
      message += `*Sottotipo:* ${formData.sottotipo}\n\n`
      message += `*Richiedente:* ${formData.nome_richiedente}\n`
      message += `*Email:* ${formData.email}\n`
      message += `*Telefono:* ${formData.telefono}\n`

      if (formData.codice_fiscale) {
        message += `*Codice Fiscale:* ${formData.codice_fiscale}\n`
      }

      if (formData.partita_iva) {
        message += `*Partita IVA:* ${formData.partita_iva}\n`
      }

      // Aggiungi dettagli specifici in base al tipo di visura
      if (formData.tipo_visura === "catastale" && formData.sottotipo === "per immobile") {
        message += `\n*Dati Immobile:*\n`
        message += `Foglio: ${formData.dati_richiesta.foglio}\n`
        if (formData.dati_richiesta.particella) message += `Particella: ${formData.dati_richiesta.particella}\n`
        if (formData.dati_richiesta.subalterno) message += `Subalterno: ${formData.dati_richiesta.subalterno}\n`
      }

      if (formData.tipo_visura === "camerale") {
        message += `\n*Dati Azienda:*\n`
        message += `Denominazione: ${formData.dati_richiesta.denominazione}\n`
      }

      if (formData.note) {
        message += `\n*Note:*\n${formData.note}\n`
      }

      message += `\n*Documento d'identità:* ${formData.documento_identita ? "Disponibile" : "Non disponibile"}\n`

      if (fileUploaded) {
        message += `\n*Allegato:* ${fileUploaded.name} (${(fileUploaded.size / 1024).toFixed(2)} KB)\n`
        message += `\nNOTA: L'allegato verrà inviato separatamente.\n`
      }

      // Numero WhatsApp (rimuovi eventuali caratteri non numerici)
      const whatsappNumber = "+393773798570".replace(/\D/g, "")

      // Crea il link WhatsApp
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

      // Salva il link per usarlo nel modale
      setWhatsappLink(whatsappLink)

      // Mostra il modale invece di aprire direttamente WhatsApp
      setIsModalOpen(true)

      setSuccessMessage("Richiesta elaborata con successo!")

      // Reset del form
      setFormData({
        tipo_visura: "catastale",
        sottotipo: "per soggetto",
        nome_richiedente: "",
        email: "",
        telefono: "",
        codice_fiscale: "",
        partita_iva: "",
        dati_richiesta: {
          indirizzo: "",
          comune: "",
          provincia: "",
          foglio: "",
          particella: "",
          subalterno: "",
          denominazione: "",
          ragione_sociale: "",
        },
        note: "",
        documento_identita: false,
      })
      setFileUploaded(null)
      setFilePreview(null)
    } catch (error) {
      console.error("Errore durante l'invio della richiesta:", error)
      setErrorMessage("Si è verificato un errore durante l'invio della richiesta")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in attesa":
        return <Clock size={16} className="text-yellow-500" />
      case "in elaborazione":
        return <RefreshCw size={16} className="text-blue-500" />
      case "completata":
        return <CheckCircle size={16} className="text-green-500" />
      case "annullata":
        return <XCircle size={16} className="text-red-500" />
      default:
        return <AlertCircle size={16} className="text-gray-500" />
    }
  }

  const getVisuraTypeIcon = (type: string) => {
    switch (type) {
      case "catastale":
        return <FileText size={16} className="text-primary" />
      case "camerale":
        return <Building size={16} className="text-primary" />
      case "crif":
      case "protestati":
        return <Search size={16} className="text-primary" />
      default:
        return <FileText size={16} className="text-primary" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const openWhatsApp = () => {
    window.open(whatsappLink, "_blank")
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Intestazione */}
      <div className="bg-gradient-to-r from-primary/80 to-primary p-6 text-white">
        <h3 className="text-xl font-bold flex items-center">
          <FileText size={24} className="mr-2" />
          Richiedi una Visura
        </h3>
        <p className="mt-2 text-white/80">
          Compila il form sottostante per richiedere una visura. Ti contatteremo al più presto.
        </p>
      </div>

      {/* Contenuto */}
      <div className="p-6">
        {!dbInitialized && (
          <div className="mb-4 p-4 bg-yellow-50 rounded-lg flex items-center">
            <Database size={20} className="text-yellow-500 mr-2" />
            <span>Inizializzazione database in corso...</span>
            <button
              className="ml-auto bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition-colors"
              onClick={() => fetch("/api/visure/init-db")}
            >
              Init DB
            </button>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
            <CheckCircle size={20} className="text-green-500 mr-2" />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
            <AlertCircle size={20} className="text-red-500 mr-2" />
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo di Visura</label>
              <select
                name="tipo_visura"
                value={formData.tipo_visura}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="catastale">Visura Catastale</option>
                <option value="camerale">Visura Camerale</option>
                <option value="crif">Visura CRIF</option>
                <option value="protestati">Visura Protestati</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sottotipo</label>
              <select
                name="sottotipo"
                value={formData.sottotipo}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                {formData.tipo_visura === "catastale" && (
                  <>
                    <option value="per soggetto">Per Soggetto</option>
                    <option value="per immobile">Per Immobile</option>
                    <option value="planimetria">Planimetria</option>
                    <option value="estratto di mappa">Estratto di Mappa</option>
                  </>
                )}
                {formData.tipo_visura === "camerale" && (
                  <>
                    <option value="ordinaria">Ordinaria</option>
                    <option value="storica">Storica</option>
                    <option value="bilancio">Bilancio</option>
                    <option value="atti societari">Atti Societari</option>
                  </>
                )}
                {formData.tipo_visura === "crif" && (
                  <>
                    <option value="standard">Standard</option>
                    <option value="completa">Completa</option>
                  </>
                )}
                {formData.tipo_visura === "protestati" && (
                  <>
                    <option value="verifica">Verifica Protesti</option>
                    <option value="cancellazione">Cancellazione Protesti</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome e Cognome</label>
              <input
                type="text"
                name="nome_richiedente"
                value={formData.nome_richiedente}
                onChange={handleInputChange}
                className={`w-full p-2 border ${
                  formErrors.nome_richiedente ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-primary focus:border-primary`}
              />
              {formErrors.nome_richiedente && (
                <p className="mt-1 text-sm text-red-500">{formErrors.nome_richiedente}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-2 border ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-primary focus:border-primary`}
              />
              {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className={`w-full p-2 border ${
                  formErrors.telefono ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-primary focus:border-primary`}
              />
              {formErrors.telefono && <p className="mt-1 text-sm text-red-500">{formErrors.telefono}</p>}
            </div>

            {(formData.tipo_visura === "catastale" && formData.sottotipo === "per soggetto") ||
            formData.tipo_visura === "crif" ||
            formData.tipo_visura === "protestati" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Codice Fiscale</label>
                <input
                  type="text"
                  name="codice_fiscale"
                  value={formData.codice_fiscale}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${
                    formErrors.codice_fiscale ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-primary focus:border-primary`}
                />
                {formErrors.codice_fiscale && <p className="mt-1 text-sm text-red-500">{formErrors.codice_fiscale}</p>}
              </div>
            ) : formData.tipo_visura === "camerale" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partita IVA</label>
                <input
                  type="text"
                  name="partita_iva"
                  value={formData.partita_iva}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            ) : null}
          </div>

          {/* Campi specifici per tipo di visura */}
          {formData.tipo_visura === "catastale" && formData.sottotipo === "per immobile" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foglio</label>
                <input
                  type="text"
                  name="dati_richiesta.foglio"
                  value={formData.dati_richiesta.foglio}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${
                    formErrors["dati_richiesta.foglio"] ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-primary focus:border-primary`}
                />
                {formErrors["dati_richiesta.foglio"] && (
                  <p className="mt-1 text-sm text-red-500">{formErrors["dati_richiesta.foglio"]}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Particella</label>
                <input
                  type="text"
                  name="dati_richiesta.particella"
                  value={formData.dati_richiesta.particella}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subalterno</label>
                <input
                  type="text"
                  name="dati_richiesta.subalterno"
                  value={formData.dati_richiesta.subalterno}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          )}

          {formData.tipo_visura === "camerale" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Denominazione / Ragione Sociale</label>
              <input
                type="text"
                name="dati_richiesta.denominazione"
                value={formData.dati_richiesta.denominazione}
                onChange={handleInputChange}
                className={`w-full p-2 border ${
                  formErrors["dati_richiesta.denominazione"] ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-primary focus:border-primary`}
              />
              {formErrors["dati_richiesta.denominazione"] && (
                <p className="mt-1 text-sm text-red-500">{formErrors["dati_richiesta.denominazione"]}</p>
              )}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Note Aggiuntive</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="Inserisci eventuali dettagli aggiuntivi per la tua richiesta..."
            />
          </div>

          {/* Upload documento */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Carica Documento d'Identità (opzionale)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {filePreview ? (
                  <div className="relative">
                    <img
                      src={filePreview || "/placeholder.svg"}
                      alt="Anteprima documento"
                      className="mx-auto h-32 object-contain"
                    />
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      title="Rimuovi file"
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none"
                      >
                        <span>Carica un file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">o trascina e rilascia</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF fino a 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="documento_identita"
                checked={formData.documento_identita}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Confermo di avere un documento d'identità valido da presentare per il rilascio della visura
              </span>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin mr-2" />
                  Invio in corso...
                </>
              ) : (
                <>
                  <img src="/images/whatsapp-icon.png" alt="WhatsApp" className="w-5 h-5 mr-2" />
                  Invia su WhatsApp
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      {/* Modale di conferma */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <XCircle size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Richiesta Completata!</h3>
              <p className="text-gray-600">
                La tua richiesta di visura è stata elaborata con successo. Clicca sul pulsante qui sotto per inviarla
                tramite WhatsApp.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Riepilogo Richiesta:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  <span className="font-medium">Tipo:</span>{" "}
                  {formData.tipo_visura.charAt(0).toUpperCase() + formData.tipo_visura.slice(1)} - {formData.sottotipo}
                </li>
                <li>
                  <span className="font-medium">Richiedente:</span> {formData.nome_richiedente}
                </li>
                {fileUploaded && (
                  <li>
                    <span className="font-medium">Allegato:</span> {fileUploaded.name}
                  </li>
                )}
              </ul>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={openWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center transition-colors"
              >
                <img src="/images/whatsapp-icon.png" alt="WhatsApp" className="w-5 h-5 mr-2" />
                Continua su WhatsApp
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
              >
                Torna al form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
