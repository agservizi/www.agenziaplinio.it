"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Check, Edit, Trash2, Plus, Loader2, FileText, Phone, Zap, Flame, Calendar, User, MapPin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Tipi per i contratti
export interface ContractRequest {
  id?: string
  type: "telefonia" | "luce" | "gas"
  status: "pending" | "approved" | "rejected" | "completed"
  requestDate: string
  userEmail: string
  details: any
}

// Interfaccia per l'anagrafica completa
interface Anagrafica {
  nome: string
  cognome: string
  codiceFiscale: string
  dataNascita: string
  luogoNascita: string
  nazionalita: string
  email: string
  telefono: string
}

// Interfaccia per l'indirizzo completo
interface Indirizzo {
  via: string
  numeroCivico: string
  cap: string
  citta: string
  provincia: string
  nazione: string
}

// Tipo per i metodi di pagamento
type MetodoPagamento = "iban" | "carta_credito" | "bollettino_postale"

// Interfaccia per i dettagli del pagamento
interface DettagliPagamento {
  metodo: MetodoPagamento
  // Dettagli IBAN
  intestatarioConto?: string
  iban?: string
  // Dettagli Carta di Credito
  intestatarioCarta?: string
  numeroCarta?: string
  scadenzaCarta?: string
  cvv?: string
  // Per bollettino postale non servono dettagli aggiuntivi
  accettaDepositoCauzionale?: boolean
}

// 1. Aggiungi i nuovi campi all'interfaccia TelefoniaDetails per supportare le informazioni specifiche della fibra

interface TelefoniaDetails {
  operatore: string
  piano: string
  tipoServizio: "mobile" | "fibra"
  numeroPortabilita: string
  codiceMigrazione?: string
  hasPortabilita: boolean
  documentoIdentita: string
  numeroDocumento: string
  dataEmissioneDocumento: string
  dataScadenzaDocumento: string
  documentoFile?: {
    name: string
    type: string
    size: number
    data: string
  }[] // Modificato da oggetto singolo ad array
  anagrafica: Anagrafica
  indirizzo: Indirizzo
  // Aggiungi campi specifici per la fibra
  indirizzoInstallazione?: {
    ugualeFatturazione: boolean
    via: string
    numeroCivico: string
    cap: string
    citta: string
    provincia: string
    nazione: string
    piano?: string
    interno?: string
    scala?: string
    noteDiAccesso?: string
  }
  contattoTecnico?: {
    nome: string
    telefono: string
    email: string
    fasciaOraria: "mattina" | "pomeriggio" | "tutto_il_giorno"
  }
  dettagliTecnici?: {
    presaPrecedente: boolean
    operatorePrecedente?: string
    numeroPrese: number
  }
  // Aggiungi dettagli pagamento
  pagamento: DettagliPagamento
}

interface LuceDetails {
  fornitore: string
  potenzaKw: string
  consumoAnnuo: string
  tipoUtenza: "domestico" | "business"
  codPod: string
  intestatario: string
  codiceFiscale: string
  indirizzo: Indirizzo
}

interface GasDetails {
  fornitore: string
  consumoAnnuo: string
  tipoUtenza: "domestico" | "business"
  codPdr: string
  intestatario: string
  codiceFiscale: string
  indirizzo: Indirizzo
}

// Aggiungere nuovi campi all'interfaccia Piano per supportare dettagli specifici per fibra
interface Piano {
  id: string
  nome: string
  descrizione: string
  prezzo: number
  dati: string
  minuti: string
  sms: string
  tipo?: "mobile" | "fibra"
  // Aggiungi campi specifici per fibra
  velocitaDownload?: string
  velocitaUpload?: string
  modem?: boolean
  attivazione?: string
  appuntamentoTecnico?: boolean
}

// Aggiornare i piani fibra con i nuovi campi
const pianiPerOperatore: Record<string, Piano[]> = {
  WindTre: [
    {
      id: "windtre-1",
      nome: "Super 5G",
      descrizione: "Piano con 5G incluso",
      prezzo: 14.99,
      dati: "100 GB",
      minuti: "Illimitati",
      sms: "200",
      tipo: "mobile",
    },
    {
      id: "windtre-2",
      nome: "Flash 200",
      descrizione: "Piano con 200GB in 5G",
      prezzo: 11.99,
      dati: "200 GB",
      minuti: "Illimitati",
      sms: "200",
      tipo: "mobile",
    },
    {
      id: "windtre-3",
      nome: "Young 5G",
      descrizione: "Piano per under 30",
      prezzo: 9.99,
      dati: "150 GB",
      minuti: "Illimitati",
      sms: "200",
      tipo: "mobile",
    },
    // Aggiungi piani fibra WindTre con dettagli specifici
    {
      id: "windtre-fibra-1",
      nome: "Super Fibra",
      descrizione: "Internet illimitato fino a 1 Gbps",
      prezzo: 26.99,
      dati: "Illimitati",
      minuti: "Illimitati",
      sms: "0",
      tipo: "fibra",
      velocitaDownload: "1 Gbps",
      velocitaUpload: "300 Mbps",
      modem: true,
      attivazione: "Inclusa",
      appuntamentoTecnico: true,
    },
    {
      id: "windtre-fibra-2",
      nome: "Super Fibra & Netflix",
      descrizione: "Internet illimitato fino a 1 Gbps con Netflix incluso",
      prezzo: 33.99,
      dati: "Illimitati",
      minuti: "Illimitati",
      sms: "0",
      tipo: "fibra",
      velocitaDownload: "1 Gbps",
      velocitaUpload: "300 Mbps",
      modem: true,
      attivazione: "Inclusa",
      appuntamentoTecnico: true,
    },
    {
      id: "windtre-fibra-3",
      nome: "Super Fibra Business",
      descrizione: "Internet illimitato fino a 2.5 Gbps per aziende",
      prezzo: 32.99,
      dati: "Illimitati",
      minuti: "Illimitati",
      sms: "0",
      tipo: "fibra",
      velocitaDownload: "2.5 Gbps",
      velocitaUpload: "500 Mbps",
      modem: true,
      attivazione: "Gratuita",
      appuntamentoTecnico: true,
    },
  ],
  Fastweb: [
    {
      id: "fastweb-1",
      nome: "Mobile 5G",
      descrizione: "Piano base con 5G",
      prezzo: 8.95,
      dati: "150 GB",
      minuti: "Illimitati",
      sms: "100",
      tipo: "mobile",
    },
    {
      id: "fastweb-2",
      nome: "Mobile Maxi",
      descrizione: "Piano con più dati",
      prezzo: 11.95,
      dati: "300 GB",
      minuti: "Illimitati",
      sms: "100",
      tipo: "mobile",
    },
    {
      id: "fastweb-3",
      nome: "Mobile Plus",
      descrizione: "Piano intermedio",
      prezzo: 9.95,
      dati: "200 GB",
      minuti: "Illimitati",
      sms: "100",
      tipo: "mobile",
    },
    // Aggiungi piani fibra Fastweb con dettagli specifici
    {
      id: "fastweb-fibra-1",
      nome: "Fastweb Casa Light",
      descrizione: "Internet fino a 1 Gbps",
      prezzo: 27.95,
      dati: "Illimitati",
      minuti: "Illimitati",
      sms: "0",
      tipo: "fibra",
      velocitaDownload: "1 Gbps",
      velocitaUpload: "200 Mbps",
      modem: true,
      attivazione: "€39,95 una tantum",
      appuntamentoTecnico: true,
    },
    {
      id: "fastweb-fibra-2",
      nome: "Fastweb Casa",
      descrizione: "Internet fino a 2.5 Gbps",
      prezzo: 29.95,
      dati: "Illimitati",
      minuti: "Illimitati",
      sms: "0",
      tipo: "fibra",
      velocitaDownload: "2.5 Gbps",
      velocitaUpload: "300 Mbps",
      modem: true,
      attivazione: "Inclusa",
      appuntamentoTecnico: true,
    },
    {
      id: "fastweb-fibra-3",
      nome: "Fastweb Casa Plus",
      descrizione: "Internet fino a 2.5 Gbps con Alexa inclusa",
      prezzo: 34.95,
      dati: "Illimitati",
      minuti: "Illimitati",
      sms: "0",
      tipo: "fibra",
      velocitaDownload: "2.5 Gbps",
      velocitaUpload: "300 Mbps",
      modem: true,
      attivazione: "Inclusa",
      appuntamentoTecnico: true,
    },
  ],
}

interface ContractsSectionProps {
  userEmail: string
  activeContractType: string
  setActiveContractType: (type: string) => void
}

export function ContractsSection({ userEmail, activeContractType, setActiveContractType }: ContractsSectionProps) {
  const { toast } = useToast()
  const [contracts, setContracts] = useState<ContractRequest[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingContract, setEditingContract] = useState<ContractRequest | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [selectedPiano, setSelectedPiano] = useState<Piano | null>(null)

  // Form states
  // 2. Aggiorna lo stato iniziale per includere i nuovi campi

  const [telefoniaForm, setTelefoniaForm] = useState<TelefoniaDetails>({
    operatore: "WindTre",
    piano: "",
    tipoServizio: "mobile",
    numeroPortabilita: "",
    codiceMigrazione: "",
    hasPortabilita: false,
    documentoIdentita: "",
    numeroDocumento: "",
    dataEmissioneDocumento: "",
    dataScadenzaDocumento: "",
    documentoFile: [], // Inizializzato come array vuoto invece di undefined
    anagrafica: {
      nome: "",
      cognome: "",
      codiceFiscale: "",
      dataNascita: "",
      luogoNascita: "",
      nazionalita: "Italiana",
      email: userEmail,
      telefono: "",
    },
    indirizzo: {
      via: "",
      numeroCivico: "",
      cap: "",
      citta: "",
      provincia: "",
      nazione: "Italia",
    },
    // Inizializza i campi specifici per la fibra
    indirizzoInstallazione: {
      ugualeFatturazione: true,
      via: "",
      numeroCivico: "",
      cap: "",
      citta: "",
      provincia: "",
      nazione: "Italia",
      piano: "",
      interno: "",
      scala: "",
      noteDiAccesso: "",
    },
    contattoTecnico: {
      nome: "",
      telefono: "",
      email: "",
      fasciaOraria: "mattina",
    },
    dettagliTecnici: {
      presaPrecedente: false,
      operatorePrecedente: "",
      numeroPrese: 1,
    },
    // Inizializza i dettagli di pagamento
    pagamento: {
      metodo: "iban",
      intestatarioConto: "",
      iban: "",
      intestatarioCarta: "",
      numeroCarta: "",
      scadenzaCarta: "",
      cvv: "",
      accettaDepositoCauzionale: false,
    },
  })

  const [luceForm, setLuceForm] = useState<LuceDetails>({
    fornitore: "Enel",
    potenzaKw: "3",
    consumoAnnuo: "",
    tipoUtenza: "domestico",
    codPod: "",
    intestatario: "",
    codiceFiscale: "",
    indirizzo: {
      via: "",
      numeroCivico: "",
      cap: "",
      citta: "",
      provincia: "",
      nazione: "Italia",
    },
  })

  const [gasForm, setGasForm] = useState<GasDetails>({
    fornitore: "Eni",
    consumoAnnuo: "",
    tipoUtenza: "domestico",
    codPdr: "",
    intestatario: "",
    codiceFiscale: "",
    indirizzo: {
      via: "",
      numeroCivico: "",
      cap: "",
      citta: "",
      provincia: "",
      nazione: "Italia",
    },
  })

  // Aggiorna il piano selezionato quando cambia l'operatore
  useEffect(() => {
    if (telefoniaForm.operatore && pianiPerOperatore[telefoniaForm.operatore]?.length > 0) {
      const pianiOperatore = pianiPerOperatore[telefoniaForm.operatore].filter(
        (piano) => piano.tipo === telefoniaForm.tipoServizio,
      )
      if (pianiOperatore.length > 0) {
        setSelectedPiano(pianiOperatore[0])
        setTelefoniaForm((prev) => ({
          ...prev,
          piano: pianiOperatore[0].id,
        }))
      } else {
        setSelectedPiano(null)
        setTelefoniaForm((prev) => ({
          ...prev,
          piano: "",
        }))
      }
    } else {
      setSelectedPiano(null)
      setTelefoniaForm((prev) => ({
        ...prev,
        piano: "",
      }))
    }
  }, [telefoniaForm.operatore, telefoniaForm.tipoServizio])

  // Initialize contract tables on first load
  useEffect(() => {
    initializeContractTables()
  }, [])

  // Fetch contracts after initialization
  useEffect(() => {
    if (userEmail && isInitialized) {
      fetchContracts()
    }
  }, [userEmail, isInitialized])

  const initializeContractTables = async () => {
    setIsInitializing(true)
    try {
      console.log("Initializing contract tables...")
      const response = await fetch("/api/contracts/init")

      if (!response.ok) {
        throw new Error(`Failed to initialize contract tables: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Initialization response:", data)

      if (data.success) {
        setIsInitialized(true)
        console.log("Contract tables initialized successfully")
      } else {
        throw new Error(data.error || "Unknown initialization error")
      }
    } catch (error) {
      console.error("Error initializing contract tables:", error)
      toast({
        title: "Errore di inizializzazione",
        description: "Impossibile inizializzare le tabelle dei contratti. Riprova più tardi.",
        variant: "destructive",
      })
    } finally {
      setIsInitializing(false)
    }
  }

  const fetchContracts = async () => {
    if (!userEmail) return

    setIsLoading(true)
    try {
      console.log("Fetching contracts for:", userEmail)
      const response = await fetch(`/api/contracts?email=${encodeURIComponent(userEmail)}`)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to fetch contracts: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const data = await response.json()
      console.log("Fetched contracts:", data)
      setContracts(data)
    } catch (error) {
      console.error("Error fetching contracts:", error)
      toast({
        title: "Errore",
        description: "Impossibile caricare i contratti. Riprova più tardi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 4. Aggiungi la validazione per i campi specifici della fibra nella funzione validateTelefoniaForm

  const validateTelefoniaForm = (): boolean => {
    // Validazione campi obbligatori
    if (!telefoniaForm.operatore) {
      toast({
        title: "Campo mancante",
        description: "Seleziona un operatore",
        variant: "destructive",
      })
      return false
    }

    if (!telefoniaForm.piano) {
      toast({
        title: "Campo mancante",
        description: "Seleziona un piano",
        variant: "destructive",
      })
      return false
    }

    if (telefoniaForm.hasPortabilita && !telefoniaForm.numeroPortabilita) {
      toast({
        title: "Campo mancante",
        description: "Inserisci il numero da portare",
        variant: "destructive",
      })
      return false
    }

    if (telefoniaForm.hasPortabilita && !telefoniaForm.codiceMigrazione) {
      toast({
        title: "Campo mancante",
        description: "Inserisci il codice di migrazione",
        variant: "destructive",
      })
      return false
    }

    // Validazione anagrafica
    const { nome, cognome, codiceFiscale, dataNascita, luogoNascita } = telefoniaForm.anagrafica
    if (!nome || !cognome || !codiceFiscale || !dataNascita || !luogoNascita) {
      toast({
        title: "Anagrafica incompleta",
        description: "Compila tutti i campi dell'anagrafica",
        variant: "destructive",
      })
      return false
    }

    // Validazione indirizzo
    const { via, numeroCivico, cap, citta, provincia } = telefoniaForm.indirizzo
    if (!via || !numeroCivico || !cap || !citta || !provincia) {
      toast({
        title: "Indirizzo incompleto",
        description: "Compila tutti i campi dell'indirizzo",
        variant: "destructive",
      })
      return false
    }

    // Validazione indirizzo installazione per fibra
    if (
      telefoniaForm.tipoServizio === "fibra" &&
      telefoniaForm.indirizzoInstallazione &&
      !telefoniaForm.indirizzoInstallazione.ugualeFatturazione
    ) {
      const { via, numeroCivico, cap, citta, provincia } = telefoniaForm.indirizzoInstallazione
      if (!via || !numeroCivico || !cap || !citta || !provincia) {
        toast({
          title: "Indirizzo installazione incompleto",
          description: "Compila tutti i campi dell'indirizzo di installazione",
          variant: "destructive",
        })
        return false
      }
    }

    // Validazione contatto tecnico per fibra
    if (telefoniaForm.tipoServizio === "fibra" && telefoniaForm.contattoTecnico) {
      const { nome, telefono } = telefoniaForm.contattoTecnico
      if (!nome || !telefono) {
        toast({
          title: "Contatto tecnico incompleto",
          description: "Inserisci nome e telefono del contatto per il tecnico",
          variant: "destructive",
        })
        return false
      }
    }

    // Validazione documento
    if (!telefoniaForm.documentoIdentita) {
      toast({
        title: "Campo mancante",
        description: "Seleziona un tipo di documento",
        variant: "destructive",
      })
      return false
    }

    if (!telefoniaForm.numeroDocumento) {
      toast({
        title: "Campo mancante",
        description: "Inserisci il numero del documento",
        variant: "destructive",
      })
      return false
    }

    if (!telefoniaForm.dataEmissioneDocumento) {
      toast({
        title: "Campo mancante",
        description: "Inserisci la data di emissione del documento",
        variant: "destructive",
      })
      return false
    }

    if (!telefoniaForm.dataScadenzaDocumento) {
      toast({
        title: "Campo mancante",
        description: "Inserisci la data di scadenza del documento",
        variant: "destructive",
      })
      return false
    }

    if (!telefoniaForm.documentoFile || telefoniaForm.documentoFile.length === 0) {
      toast({
        title: "Campo mancante",
        description: "Carica almeno una copia del documento d'identità",
        variant: "destructive",
      })
      return false
    }

    // Validazione metodo di pagamento
    if (telefoniaForm.pagamento.metodo === "iban") {
      if (!telefoniaForm.pagamento.intestatarioConto || !telefoniaForm.pagamento.iban) {
        toast({
          title: "Dati pagamento incompleti",
          description: "Inserisci intestatario e IBAN per il pagamento",
          variant: "destructive",
        })
        return false
      }

      // Validazione semplice formato IBAN (controllo base)
      const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}[A-Z0-9]{0,16}$/
      if (!ibanRegex.test(telefoniaForm.pagamento.iban.replace(/\s/g, ""))) {
        toast({
          title: "IBAN non valido",
          description: "Inserisci un IBAN valido nel formato corretto",
          variant: "destructive",
        })
        return false
      }
    } else if (telefoniaForm.pagamento.metodo === "carta_credito") {
      if (
        !telefoniaForm.pagamento.intestatarioCarta ||
        !telefoniaForm.pagamento.numeroCarta ||
        !telefoniaForm.pagamento.scadenzaCarta ||
        !telefoniaForm.pagamento.cvv
      ) {
        toast({
          title: "Dati carta incompleti",
          description: "Inserisci tutti i dati della carta di credito",
          variant: "destructive",
        })
        return false
      }
    } else if (telefoniaForm.pagamento.metodo === "bollettino_postale") {
      if (!telefoniaForm.pagamento.accettaDepositoCauzionale) {
        toast({
          title: "Accettazione richiesta",
          description: "È necessario accettare il deposito cauzionale per procedere con il bollettino postale",
          variant: "destructive",
        })
        return false
      }
    }

    return true
  }

  const handleCreateContract = async () => {
    // Validazione form in base al tipo di contratto
    if (activeContractType === "telefonia" && !validateTelefoniaForm()) {
      return
    }

    setIsSubmitting(true)

    let details
    let type: "telefonia" | "luce" | "gas" = "telefonia"

    if (activeContractType === "telefonia") {
      details = telefoniaForm
      type = "telefonia"
    } else if (activeContractType === "luce") {
      details = luceForm
      type = "luce"
    } else if (activeContractType === "gas") {
      details = gasForm
      type = "gas"
    }

    const newContract: ContractRequest = {
      type,
      status: "pending",
      requestDate: new Date().toISOString(),
      userEmail,
      details,
    }

    try {
      const response = await fetch("/api/contracts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContract),
      })

      if (response.ok) {
        const createdContract = await response.json()
        setContracts([...contracts, createdContract])
        setShowForm(false)
        resetForms()
        toast({
          title: "Richiesta inviata",
          description: "La tua richiesta di contratto è stata inviata con successo",
        })
      } else {
        const errorText = await response.text()
        throw new Error(`Failed to create contract: ${response.status} ${response.statusText} - ${errorText}`)
      }
    } catch (error) {
      console.error("Error creating contract:", error)
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'invio della richiesta",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateContract = async () => {
    if (!editingContract) return

    // Validazione form in base al tipo di contratto
    if (editingContract.type === "telefonia" && !validateTelefoniaForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Aggiorna i dettagli del contratto in base al tipo
      if (editingContract.type === "telefonia") {
        editingContract.details = telefoniaForm
      } else if (editingContract.type === "luce") {
        editingContract.details = luceForm
      } else if (editingContract.type === "gas") {
        editingContract.details = gasForm
      }

      const response = await fetch(`/api/contracts/${editingContract.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingContract),
      })

      if (response.ok) {
        const updatedContract = await response.json()
        setContracts(contracts.map((c) => (c.id === updatedContract.id ? updatedContract : c)))
        setEditingContract(null)
        setShowForm(false)
        resetForms()
        toast({
          title: "Contratto aggiornato",
          description: "La tua richiesta di contratto è stata aggiornata con successo",
        })
      } else {
        toast({
          title: "Errore",
          description: "Impossibile aggiornare la richiesta di contratto",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating contract:", error)
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'aggiornamento della richiesta",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteContract = async (id: string) => {
    if (!confirm("Sei sicuro di voler eliminare questa richiesta di contratto?")) return

    try {
      const response = await fetch(`/api/contracts/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setContracts(contracts.filter((c) => c.id !== id))
        toast({
          title: "Contratto eliminato",
          description: "La richiesta di contratto è stata eliminata con successo",
        })
      } else {
        toast({
          title: "Errore",
          description: "Impossibile eliminare la richiesta di contratto",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting contract:", error)
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'eliminazione della richiesta",
        variant: "destructive",
      })
    }
  }

  // 3. Aggiorna la funzione resetForms per resettare anche i nuovi campi

  const resetForms = () => {
    setTelefoniaForm({
      operatore: "WindTre",
      piano: "",
      tipoServizio: "mobile",
      numeroPortabilita: "",
      codiceMigrazione: "",
      hasPortabilita: false,
      documentoIdentita: "",
      numeroDocumento: "",
      dataEmissioneDocumento: "",
      dataScadenzaDocumento: "",
      documentoFile: [], // Inizializzato come array vuoto invece di undefined
      anagrafica: {
        nome: "",
        cognome: "",
        codiceFiscale: "",
        dataNascita: "",
        luogoNascita: "",
        nazionalita: "Italiana",
        email: userEmail,
        telefono: "",
      },
      indirizzo: {
        via: "",
        numeroCivico: "",
        cap: "",
        citta: "",
        provincia: "",
        nazione: "Italia",
      },
      // Reset dei campi specifici per la fibra
      indirizzoInstallazione: {
        ugualeFatturazione: true,
        via: "",
        numeroCivico: "",
        cap: "",
        citta: "",
        provincia: "",
        nazione: "Italia",
        piano: "",
        interno: "",
        scala: "",
        noteDiAccesso: "",
      },
      contattoTecnico: {
        nome: "",
        telefono: "",
        email: "",
        fasciaOraria: "mattina",
      },
      dettagliTecnici: {
        presaPrecedente: false,
        operatorePrecedente: "",
        numeroPrese: 1,
      },
      // Reset dei dettagli di pagamento
      pagamento: {
        metodo: "iban",
        intestatarioConto: "",
        iban: "",
        intestatarioCarta: "",
        numeroCarta: "",
        scadenzaCarta: "",
        cvv: "",
        accettaDepositoCauzionale: false,
      },
    })

    setLuceForm({
      fornitore: "Enel",
      potenzaKw: "3",
      consumoAnnuo: "",
      tipoUtenza: "domestico",
      codPod: "",
      intestatario: "",
      codiceFiscale: "",
      indirizzo: {
        via: "",
        numeroCivico: "",
        cap: "",
        citta: "",
        provincia: "",
        nazione: "Italia",
      },
    })

    setGasForm({
      fornitore: "Eni",
      consumoAnnuo: "",
      tipoUtenza: "domestico",
      codPdr: "",
      intestatario: "",
      codiceFiscale: "",
      indirizzo: {
        via: "",
        numeroCivico: "",
        cap: "",
        citta: "",
        provincia: "",
        nazione: "Italia",
      },
    })

    // Reset del piano selezionato
    if (pianiPerOperatore["WindTre"]?.length > 0) {
      setSelectedPiano(pianiPerOperatore["WindTre"][0])
    } else {
      setSelectedPiano(null)
    }
  }

  const startEdit = (contract: ContractRequest) => {
    setEditingContract(contract)
    setActiveContractType(contract.type)
    setShowForm(true)

    if (contract.type === "telefonia") {
      setTelefoniaForm(contract.details)

      // Imposta il piano selezionato in base all'ID del piano nel contratto
      if (contract.details.piano && contract.details.operatore) {
        const pianiOperatore = pianiPerOperatore[contract.details.operatore] || []
        const piano = pianiOperatore.find((p) => p.id === contract.details.piano)
        if (piano) {
          setSelectedPiano(piano)
        }
      }
    } else if (contract.type === "luce") {
      setLuceForm(contract.details)
    } else if (contract.type === "gas") {
      setGasForm(contract.details)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">In attesa</span>
      case "approved":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Approvato</span>
      case "rejected":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Rifiutato</span>
      case "completed":
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Completato</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>
    }
  }

  const getContractTypeIcon = (type: string) => {
    switch (type) {
      case "telefonia":
        return <Phone className="h-5 w-5 text-primary" />
      case "luce":
        return <Zap className="h-5 w-5 text-blue-600" />
      case "gas":
        return <Flame className="h-5 w-5 text-yellow-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const handlePianoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pianoId = e.target.value
    const pianiOperatore =
      pianiPerOperatore[telefoniaForm.operatore]?.filter((piano) => piano.tipo === telefoniaForm.tipoServizio) || []
    const piano = pianiOperatore.find((p) => p.id === pianoId)

    setSelectedPiano(piano || null)
    setTelefoniaForm((prev) => ({
      ...prev,
      piano: pianoId,
    }))
  }

  // 5. Aggiungi l'effetto per sincronizzare l'indirizzo di installazione con quello di fatturazione quando ugualeFatturazione è true

  // Sincronizza l'indirizzo di installazione con quello di fatturazione
  useEffect(() => {
    if (telefoniaForm.indirizzoInstallazione?.ugualeFatturazione) {
      setTelefoniaForm((prev) => ({
        ...prev,
        indirizzoInstallazione: {
          ...prev.indirizzoInstallazione!,
          via: prev.indirizzo.via,
          numeroCivico: prev.indirizzo.numeroCivico,
          cap: prev.indirizzo.cap,
          citta: prev.indirizzo.citta,
          provincia: prev.indirizzo.provincia,
          nazione: prev.indirizzo.nazione,
        },
      }))
    }
  }, [telefoniaForm.indirizzo, telefoniaForm.indirizzoInstallazione?.ugualeFatturazione])

  // 6. Aggiungi la sincronizzazione dell'indirizzo di installazione quando cambia l'indirizzo di fatturazione
  useEffect(() => {
    if (telefoniaForm.indirizzoInstallazione?.ugualeFatturazione) {
      setTelefoniaForm((prev) => ({
        ...prev,
        indirizzoInstallazione: {
          ...prev.indirizzoInstallazione!,
          via: prev.indirizzo.via,
          numeroCivico: prev.indirizzo.numeroCivico,
          cap: prev.indirizzo.cap,
          citta: prev.indirizzo.citta,
          provincia: prev.indirizzo.provincia,
          nazione: prev.indirizzo.nazione,
        },
      }))
    }
  }, [telefoniaForm.indirizzo])

  const renderContractForm = () => {
    if (activeContractType === "telefonia") {
      return (
        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium flex items-center">
            <Phone className="mr-2 h-5 w-5 text-primary" />
            Richiesta Contratto Telefonia
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {/* Sezione Operatore e Piano */}
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-lg mb-4 pb-2 border-b">Operatore e Piano</h4>
              {/* Tipo di servizio */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo di servizio</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-primary"
                      name="tipoServizio"
                      value="mobile"
                      checked={telefoniaForm.tipoServizio === "mobile"}
                      onChange={() => setTelefoniaForm({ ...telefoniaForm, tipoServizio: "mobile", piano: "" })}
                    />
                    <span className="ml-2">Mobile</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-primary"
                      name="tipoServizio"
                      value="fibra"
                      checked={telefoniaForm.tipoServizio === "fibra"}
                      onChange={() => setTelefoniaForm({ ...telefoniaForm, tipoServizio: "fibra", piano: "" })}
                    />
                    <span className="ml-2">Fibra</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Operatore</label>
                  <select
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.operatore}
                    onChange={(e) => setTelefoniaForm({ ...telefoniaForm, operatore: e.target.value })}
                  >
                    <option value="WindTre">WindTre</option>
                    <option value="Fastweb">Fastweb</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Piano</label>
                  <select
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.piano}
                    onChange={handlePianoChange}
                  >
                    {pianiPerOperatore[telefoniaForm.operatore]?.map((piano) => (
                      <option key={piano.id} value={piano.id}>
                        {piano.nome} - {piano.prezzo}€/mese
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dettagli del piano selezionato */}
              {selectedPiano && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <h5 className="font-medium mb-2">{selectedPiano.nome} - Dettagli</h5>

                  {selectedPiano.tipo === "mobile" ? (
                    // Visualizzazione per piani mobile
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Dati:</span> {selectedPiano.dati}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Minuti:</span> {selectedPiano.minuti}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">SMS:</span> {selectedPiano.sms}
                      </div>
                    </div>
                  ) : (
                    // Visualizzazione per piani fibra
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Velocità download:</span>
                          <span className="text-green-600 font-medium">{selectedPiano.velocitaDownload}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Velocità upload:</span>
                          <span className="text-green-600 font-medium">{selectedPiano.velocitaUpload}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Modem:</span>
                          {selectedPiano.modem ? (
                            <span className="text-green-600">Incluso</span>
                          ) : (
                            <span className="text-red-600">Non incluso</span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Attivazione:</span> {selectedPiano.attivazione}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <span className="font-medium mr-2">Chiamate:</span> {selectedPiano.minuti}
                      </div>

                      {selectedPiano.appuntamentoTecnico && (
                        <div className="flex items-center text-blue-600">
                          <span className="font-medium mr-2">✓</span> Appuntamento con tecnico incluso
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-sm text-gray-600 mt-2">{selectedPiano.descrizione}</p>
                  <p className="text-sm font-medium text-primary mt-1">Prezzo: {selectedPiano.prezzo}€/mese</p>
                </div>
              )}
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="hasPortabilita"
                    checked={telefoniaForm.hasPortabilita}
                    onChange={(e) => setTelefoniaForm({ ...telefoniaForm, hasPortabilita: e.target.checked })}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="hasPortabilita" className="ml-2 block text-sm text-gray-700">
                    Richiedo la portabilità del numero
                  </label>
                </div>

                {telefoniaForm.hasPortabilita && (
                  <div className="space-y-3 mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Numero da portare*</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        value={telefoniaForm.numeroPortabilita}
                        onChange={(e) => setTelefoniaForm({ ...telefoniaForm, numeroPortabilita: e.target.value })}
                        placeholder="Es. 3401234567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Codice di migrazione*</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        value={telefoniaForm.codiceMigrazione || ""}
                        onChange={(e) => setTelefoniaForm({ ...telefoniaForm, codiceMigrazione: e.target.value })}
                        placeholder="Es. A1B2C3D4E5F6"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Il codice di migrazione è necessario per completare la portabilità. Puoi richiederlo al tuo
                        attuale operatore.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Sezione Anagrafica */}
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-lg mb-4 pb-2 border-b flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                Anagrafica
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.anagrafica.nome}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        anagrafica: { ...telefoniaForm.anagrafica, nome: e.target.value },
                      })
                    }
                    placeholder="Inserisci il nome"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cognome*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.anagrafica.cognome}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        anagrafica: { ...telefoniaForm.anagrafica, cognome: e.target.value },
                      })
                    }
                    placeholder="Inserisci il cognome"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Codice Fiscale*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.anagrafica.codiceFiscale}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        anagrafica: { ...telefoniaForm.anagrafica, codiceFiscale: e.target.value },
                      })
                    }
                    placeholder="Inserisci il codice fiscale"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data di Nascita*</label>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      type="date"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      value={telefoniaForm.anagrafica.dataNascita}
                      onChange={(e) =>
                        setTelefoniaForm({
                          ...telefoniaForm,
                          anagrafica: { ...telefoniaForm.anagrafica, dataNascita: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Luogo di Nascita*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.anagrafica.luogoNascita}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        anagrafica: { ...telefoniaForm.anagrafica, luogoNascita: e.target.value },
                      })
                    }
                    placeholder="Città di nascita"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nazionalità</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.anagrafica.nazionalita}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        anagrafica: { ...telefoniaForm.anagrafica, nazionalita: e.target.value },
                      })
                    }
                    placeholder="Nazionalità"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.anagrafica.email}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        anagrafica: { ...telefoniaForm.anagrafica, email: e.target.value },
                      })
                    }
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.anagrafica.telefono}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        anagrafica: { ...telefoniaForm.anagrafica, telefono: e.target.value },
                      })
                    }
                    placeholder="Numero di telefono"
                  />
                </div>
              </div>
            </div>
            {/* Sezione Indirizzo */}
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-lg mb-4 pb-2 border-b flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Indirizzo
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Via/Piazza*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.indirizzo.via}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        indirizzo: { ...telefoniaForm.indirizzo, via: e.target.value },
                      })
                    }
                    placeholder="Nome della via o piazza"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Numero Civico*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.indirizzo.numeroCivico}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        indirizzo: { ...telefoniaForm.indirizzo, numeroCivico: e.target.value },
                      })
                    }
                    placeholder="Numero civico"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CAP*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.indirizzo.cap}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        indirizzo: { ...telefoniaForm.indirizzo, cap: e.target.value },
                      })
                    }
                    placeholder="Codice di avviamento postale"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Città*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.indirizzo.citta}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        indirizzo: { ...telefoniaForm.indirizzo, citta: e.target.value },
                      })
                    }
                    placeholder="Città"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provincia*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.indirizzo.provincia}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        indirizzo: { ...telefoniaForm.indirizzo, provincia: e.target.value },
                      })
                    }
                    placeholder="Provincia (sigla)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nazione</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.indirizzo.nazione}
                    onChange={(e) =>
                      setTelefoniaForm({
                        ...telefoniaForm,
                        indirizzo: { ...telefoniaForm.indirizzo, nazione: e.target.value },
                      })
                    }
                    placeholder="Nazione"
                  />
                </div>
              </div>
            </div>
            {/* Sezioni specifiche per la fibra */}
            {telefoniaForm.tipoServizio === "fibra" && (
              <>
                {/* Sezione Indirizzo Installazione */}
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-lg mb-4 pb-2 border-b flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    Indirizzo di Installazione
                  </h4>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="ugualeFatturazione"
                        checked={telefoniaForm.indirizzoInstallazione?.ugualeFatturazione}
                        onChange={(e) =>
                          setTelefoniaForm({
                            ...telefoniaForm,
                            indirizzoInstallazione: {
                              ...telefoniaForm.indirizzoInstallazione!,
                              ugualeFatturazione: e.target.checked,
                            },
                          })
                        }
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="ugualeFatturazione" className="ml-2 block text-sm text-gray-700">
                        L'indirizzo di installazione è uguale all'indirizzo di fatturazione
                      </label>
                    </div>
                  </div>

                  {!telefoniaForm.indirizzoInstallazione?.ugualeFatturazione && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Via/Piazza*</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.indirizzoInstallazione?.via || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              indirizzoInstallazione: {
                                ...telefoniaForm.indirizzoInstallazione!,
                                via: e.target.value,
                              },
                            })
                          }
                          placeholder="Nome della via o piazza"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numero Civico*</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.indirizzoInstallazione?.numeroCivico || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              indirizzoInstallazione: {
                                ...telefoniaForm.indirizzoInstallazione!,
                                numeroCivico: e.target.value,
                              },
                            })
                          }
                          placeholder="Numero civico"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CAP*</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.indirizzoInstallazione?.cap || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              indirizzoInstallazione: {
                                ...telefoniaForm.indirizzoInstallazione!,
                                cap: e.target.value,
                              },
                            })
                          }
                          placeholder="Codice di avviamento postale"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Città*</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.indirizzoInstallazione?.citta || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              indirizzoInstallazione: {
                                ...telefoniaForm.indirizzoInstallazione!,
                                citta: e.target.value,
                              },
                            })
                          }
                          placeholder="Città"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Provincia*</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.indirizzoInstallazione?.provincia || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              indirizzoInstallazione: {
                                ...telefoniaForm.indirizzoInstallazione!,
                                provincia: e.target.value,
                              },
                            })
                          }
                          placeholder="Provincia (sigla)"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nazione</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.indirizzoInstallazione?.nazione || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              indirizzoInstallazione: {
                                ...telefoniaForm.indirizzoInstallazione!,
                                nazione: e.target.value,
                              },
                            })
                          }
                          placeholder="Nazione"
                        />
                      </div>
                    </div>
                  )}

                  {/* Dettagli aggiuntivi per l'installazione */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Piano</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        value={telefoniaForm.indirizzoInstallazione?.piano || ""}
                        onChange={(e) =>
                          setTelefoniaForm({
                            ...telefoniaForm,
                            indirizzoInstallazione: {
                              ...telefoniaForm.indirizzoInstallazione!,
                              piano: e.target.value,
                            },
                          })
                        }
                        placeholder="Es. 1, 2, ecc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interno</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        value={telefoniaForm.indirizzoInstallazione?.interno || ""}
                        onChange={(e) =>
                          setTelefoniaForm({
                            ...telefoniaForm,
                            indirizzoInstallazione: {
                              ...telefoniaForm.indirizzoInstallazione!,
                              interno: e.target.value,
                            },
                          })
                        }
                        placeholder="Es. A, B, ecc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Scala</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        value={telefoniaForm.indirizzoInstallazione?.scala || ""}
                        onChange={(e) =>
                          setTelefoniaForm({
                            ...telefoniaForm,
                            indirizzoInstallazione: {
                              ...telefoniaForm.indirizzoInstallazione!,
                              scala: e.target.value,
                            },
                          })
                        }
                        placeholder="Es. A, B, ecc."
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Note di accesso</label>
                    <textarea
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      value={telefoniaForm.indirizzoInstallazione?.noteDiAccesso || ""}
                      onChange={(e) =>
                        setTelefoniaForm({
                          ...telefoniaForm,
                          indirizzoInstallazione: {
                            ...telefoniaForm.indirizzoInstallazione!,
                            noteDiAccesso: e.target.value,
                          },
                        })
                      }
                      placeholder="Informazioni utili per il tecnico (es. citofono, codici accesso, ecc.)"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Sezione Contatto per il Tecnico */}
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-lg mb-4 pb-2 border-b flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-primary" />
                    Contatto per il Tecnico
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome e Cognome*</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        value={telefoniaForm.contattoTecnico?.nome || ""}
                        onChange={(e) =>
                          setTelefoniaForm({
                            ...telefoniaForm,
                            contattoTecnico: {
                              ...telefoniaForm.contattoTecnico!,
                              nome: e.target.value,
                            },
                          })
                        }
                        placeholder="Nome e cognome della persona da contattare"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefono*</label>
                      <input
                        type="tel"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        value={telefoniaForm.contattoTecnico?.telefono || ""}
                        onChange={(e) =>
                          setTelefoniaForm({
                            ...telefoniaForm,
                            contattoTecnico: {
                              ...telefoniaForm.contattoTecnico!,
                              telefono: e.target.value,
                            },
                          })
                        }
                        placeholder="Numero di telefono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        value={telefoniaForm.contattoTecnico?.email || ""}
                        onChange={(e) =>
                          setTelefoniaForm({
                            ...telefoniaForm,
                            contattoTecnico: {
                              ...telefoniaForm.contattoTecnico!,
                              email: e.target.value,
                            },
                          })
                        }
                        placeholder="Indirizzo email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fascia oraria preferita</label>
                      <select
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        value={telefoniaForm.contattoTecnico?.fasciaOraria || "mattina"}
                        onChange={(e) =>
                          setTelefoniaForm({
                            ...telefoniaForm,
                            contattoTecnico: {
                              ...telefoniaForm.contattoTecnico!,
                              fasciaOraria: e.target.value as "mattina" | "pomeriggio" | "tutto_il_giorno",
                            },
                          })
                        }
                      >
                        <option value="mattina">Mattina (8:00 - 13:00)</option>
                        <option value="pomeriggio">Pomeriggio (13:00 - 18:00)</option>
                        <option value="tutto_il_giorno">Tutto il giorno (8:00 - 18:00)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Sezione Dettagli Tecnici */}
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-lg mb-4 pb-2 border-b">Dettagli Tecnici</h4>

                  <div className="space-y-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="presaPrecedente"
                        checked={telefoniaForm.dettagliTecnici?.presaPrecedente || false}
                        onChange={(e) =>
                          setTelefoniaForm({
                            ...telefoniaForm,
                            dettagliTecnici: {
                              ...telefoniaForm.dettagliTecnici!,
                              presaPrecedente: e.target.checked,
                            },
                          })
                        }
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="presaPrecedente" className="ml-2 block text-sm text-gray-700">
                        Nell'abitazione è già presente una presa telefonica o connessione internet
                      </label>
                    </div>

                    {telefoniaForm.dettagliTecnici?.presaPrecedente && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Operatore precedente</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.dettagliTecnici?.operatorePrecedente || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              dettagliTecnici: {
                                ...telefoniaForm.dettagliTecnici!,
                                operatorePrecedente: e.target.value,
                              },
                            })
                          }
                          placeholder="Es. TIM, Vodafone, ecc."
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Numero di prese telefoniche richieste
                      </label>
                      <select
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        value={telefoniaForm.dettagliTecnici?.numeroPrese || 1}
                        onChange={(e) =>
                          setTelefoniaForm({
                            ...telefoniaForm,
                            dettagliTecnici: {
                              ...telefoniaForm.dettagliTecnici!,
                              numeroPrese: Number.parseInt(e.target.value),
                            },
                          })
                        }
                      >
                        <option value="1">1 presa</option>
                        <option value="2">2 prese</option>
                        <option value="3">3 prese</option>
                        <option value="4">4 prese</option>
                        <option value="5">5 prese o più (specificare nelle note)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* Sezione Documento */}
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-lg mb-4 pb-2 border-b">Documento d'identità</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo di documento*</label>
                  <select
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.documentoIdentita}
                    onChange={(e) => setTelefoniaForm({ ...telefoniaForm, documentoIdentita: e.target.value })}
                    required
                  >
                    <option value="">Seleziona il tipo di documento</option>
                    <option value="Carta d'identità">Carta d'identità</option>
                    <option value="Patente">Patente</option>
                    <option value="Passaporto">Passaporto</option>
                  </select>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Numero documento*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    value={telefoniaForm.numeroDocumento}
                    onChange={(e) => setTelefoniaForm({ ...telefoniaForm, numeroDocumento: e.target.value })}
                    placeholder="Es. CA12345AA"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data di emissione*</label>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        type="date"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        value={telefoniaForm.dataEmissioneDocumento}
                        onChange={(e) => setTelefoniaForm({ ...telefoniaForm, dataEmissioneDocumento: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data di scadenza*</label>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        type="date"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        value={telefoniaForm.dataScadenzaDocumento}
                        onChange={(e) => setTelefoniaForm({ ...telefoniaForm, dataScadenzaDocumento: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Carica documento*</label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="document-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-3 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-1 text-sm text-gray-500">
                          <span className="font-semibold">Clicca per caricare</span> o trascina qui i file
                        </p>
                        <p className="text-xs text-gray-500">PDF, JPG o PNG (Max. 5MB per file)</p>
                      </div>
                      <input
                        id="document-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple // Aggiunto attributo multiple
                        onChange={(e) => {
                          const files = e.target.files
                          if (files && files.length > 0) {
                            // Converti FileList in array per poterlo iterare
                            const filesArray = Array.from(files)

                            // Controlla la dimensione di ogni file
                            const oversizedFiles = filesArray.filter((file) => file.size > 5 * 1024 * 1024)
                            if (oversizedFiles.length > 0) {
                              toast({
                                title: "File troppo grandi",
                                description: "Alcuni file superano i 5MB",
                                variant: "destructive",
                              })
                              return
                            }

                            // Processa ogni file
                            Promise.all(
                              filesArray.map((file) => {
                                return new Promise<{ name: string; type: string; size: number; data: string }>(
                                  (resolve) => {
                                    const reader = new FileReader()
                                    reader.onloadend = () => {
                                      resolve({
                                        name: file.name,
                                        type: file.type,
                                        size: file.size,
                                        data: reader.result as string,
                                      })
                                    }
                                    reader.readAsDataURL(file)
                                  },
                                )
                              }),
                            ).then((fileDataArray) => {
                              setTelefoniaForm((prev) => ({
                                ...prev,
                                documentoFile: [...(prev.documentoFile || []), ...fileDataArray],
                              }))
                            })
                          }
                        }}
                      />
                    </label>
                  </div>

                  {telefoniaForm.documentoFile && telefoniaForm.documentoFile.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {telefoniaForm.documentoFile.map((file, index) => (
                        <div
                          key={index}
                          className="p-3 bg-blue-50 rounded-md border border-blue-200 flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-md mr-3">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setTelefoniaForm((prev) => ({
                                ...prev,
                                documentoFile: prev.documentoFile?.filter((_, i) => i !== index) || [],
                              }))
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    Dovrai presentare il documento selezionato in agenzia per completare l'attivazione
                  </p>
                </div>
              </div>
            </div>
            {/* Sezione Metodo di Pagamento */}
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-lg mb-4 pb-2 border-b">Metodo di Pagamento</h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Seleziona metodo di pagamento*</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                      className={`border rounded-md p-3 cursor-pointer transition-colors ${
                        telefoniaForm.pagamento.metodo === "iban"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() =>
                        setTelefoniaForm({
                          ...telefoniaForm,
                          pagamento: {
                            ...telefoniaForm.pagamento,
                            metodo: "iban",
                          },
                        })
                      }
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="h-4 w-4 text-primary"
                          checked={telefoniaForm.pagamento.metodo === "iban"}
                          onChange={() => {}}
                        />
                        <span className="ml-2 font-medium">Addebito su Conto (IBAN)</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 ml-6">Addebito diretto sul tuo conto corrente</p>
                    </div>

                    <div
                      className={`border rounded-md p-3 cursor-pointer transition-colors ${
                        telefoniaForm.pagamento.metodo === "carta_credito"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() =>
                        setTelefoniaForm({
                          ...telefoniaForm,
                          pagamento: {
                            ...telefoniaForm.pagamento,
                            metodo: "carta_credito",
                          },
                        })
                      }
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="h-4 w-4 text-primary"
                          checked={telefoniaForm.pagamento.metodo === "carta_credito"}
                          onChange={() => {}}
                        />
                        <span className="ml-2 font-medium">Carta di Credito</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 ml-6">Addebito sulla tua carta di credito</p>
                    </div>

                    {telefoniaForm.operatore === "WindTre" && (
                      <div
                        className={`border rounded-md p-3 cursor-pointer transition-colors ${
                          telefoniaForm.pagamento.metodo === "bollettino_postale"
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() =>
                          setTelefoniaForm({
                            ...telefoniaForm,
                            pagamento: {
                              ...telefoniaForm.pagamento,
                              metodo: "bollettino_postale",
                            },
                          })
                        }
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            className="h-4 w-4 text-primary"
                            checked={telefoniaForm.pagamento.metodo === "bollettino_postale"}
                            onChange={() => {}}
                          />
                          <span className="ml-2 font-medium">Bollettino Postale</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-6">Pagamento tramite bollettino</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Informazioni comparative sui metodi di pagamento */}
                <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Confronto metodi di pagamento</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-3 py-2 text-left">Metodo</th>
                          <th className="px-3 py-2 text-left">Vantaggi</th>
                          <th className="px-3 py-2 text-left">Tempistiche</th>
                          <th className="px-3 py-2 text-left">Note</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 py-2 font-medium">Addebito su Conto</td>
                          <td className="px-3 py-2">
                            <ul className="list-disc pl-4 space-y-1">
                              <li>Nessun costo aggiuntivo</li>
                              <li>Pagamento automatico</li>
                              <li>Nessun deposito cauzionale</li>
                            </ul>
                          </td>
                          <td className="px-3 py-2">Addebito il giorno 5 del mese</td>
                          <td className="px-3 py-2">Richiede un conto corrente attivo</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-medium">Carta di Credito</td>
                          <td className="px-3 py-2">
                            <ul className="list-disc pl-4 space-y-1">
                              <li>Nessun costo aggiuntivo</li>
                              <li>Pagamento automatico</li>
                              <li>Nessun deposito cauzionale</li>
                            </ul>
                          </td>
                          <td className="px-3 py-2">Addebito il giorno 5 del mese</td>
                          <td className="px-3 py-2">Non accetta carte prepagate</td>
                        </tr>
                        {telefoniaForm.operatore === "WindTre" && (
                          <tr>
                            <td className="px-3 py-2 font-medium">Bollettino Postale</td>
                            <td className="px-3 py-2">
                              <ul className="list-disc pl-4 space-y-1">
                                <li>Non richiede conto o carta</li>
                                <li>Pagamento manuale</li>
                              </ul>
                            </td>
                            <td className="px-3 py-2">Scadenza il giorno 15 del mese</td>
                            <td className="px-3 py-2 text-red-600">Richiede deposito cauzionale di 100€</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {telefoniaForm.pagamento.metodo === "iban" && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-md">
                    <h5 className="font-medium mb-3">Dati per addebito su conto corrente</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Intestatario del conto*</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.pagamento.intestatarioConto || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              pagamento: {
                                ...telefoniaForm.pagamento,
                                intestatarioConto: e.target.value,
                              },
                            })
                          }
                          placeholder="Nome e cognome dell'intestatario"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">IBAN*</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.pagamento.iban || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              pagamento: {
                                ...telefoniaForm.pagamento,
                                iban: e.target.value,
                              },
                            })
                          }
                          placeholder="IT60X0542811101000000123456"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Inserisci il codice IBAN completo del tuo conto corrente (27 caratteri per l'Italia)
                        </p>
                      </div>

                      <div className="md:col-span-2 mt-2">
                        <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-700">
                          <p className="font-medium mb-1">Informazioni sull'addebito SEPA</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>L'addebito avverrà automaticamente ogni mese</li>
                            <li>Riceverai notifica via email 5 giorni prima dell'addebito</li>
                            <li>Puoi revocare l'autorizzazione in qualsiasi momento</li>
                            <li>Il mandato SEPA verrà attivato entro 3 giorni lavorativi</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {telefoniaForm.pagamento.metodo === "carta_credito" && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-md">
                    <h5 className="font-medium mb-3">Dati della carta di credito</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Intestatario della carta*
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.pagamento.intestatarioCarta || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              pagamento: {
                                ...telefoniaForm.pagamento,
                                intestatarioCarta: e.target.value,
                              },
                            })
                          }
                          placeholder="Nome e cognome dell'intestatario"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numero carta*</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.pagamento.numeroCarta || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              pagamento: {
                                ...telefoniaForm.pagamento,
                                numeroCarta: e.target.value,
                              },
                            })
                          }
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Sono accettate carte Visa, Mastercard e American Express
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data di scadenza*</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.pagamento.scadenzaCarta || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              pagamento: {
                                ...telefoniaForm.pagamento,
                                scadenzaCarta: e.target.value,
                              },
                            })
                          }
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV*</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          value={telefoniaForm.pagamento.cvv || ""}
                          onChange={(e) =>
                            setTelefoniaForm({
                              ...telefoniaForm,
                              pagamento: {
                                ...telefoniaForm.pagamento,
                                cvv: e.target.value,
                              },
                            })
                          }
                          placeholder="123"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Il codice di sicurezza a 3 cifre sul retro della carta (4 cifre per American Express)
                        </p>
                      </div>

                      <div className="md:col-span-2 mt-2">
                        <div className="bg-green-50 p-3 rounded-md text-xs text-green-700">
                          <p className="font-medium mb-1">Sicurezza dei pagamenti</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>I dati della tua carta sono protetti con crittografia avanzata</li>
                            <li>Utilizziamo protocolli di sicurezza PCI-DSS per la gestione dei dati</li>
                            <li>Nessun costo aggiuntivo per pagamenti con carta</li>
                            <li>Possibilità di aggiornare i dati della carta in qualsiasi momento</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {telefoniaForm.pagamento.metodo === "bollettino_postale" && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-md bg-yellow-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-yellow-800">
                          Informazioni sul pagamento con bollettino
                        </h5>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>Scegliendo il pagamento con bollettino postale:</p>
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>Riceverai i bollettini via posta all'indirizzo di fatturazione</li>
                            <li>È previsto un deposito cauzionale di 100€ che verrà addebitato sulla prima fattura</li>
                            <li>
                              Il deposito verrà restituito in caso di cessazione del contratto o passaggio ad altro
                              metodo di pagamento
                            </li>
                            <li>
                              I bollettini dovranno essere pagati entro la data di scadenza indicata (generalmente il 15
                              del mese)
                            </li>
                            <li>
                              Potrai pagare presso qualsiasi ufficio postale, tabaccheria convenzionata o tramite home
                              banking
                            </li>
                            <li>Costo aggiuntivo di 1,50€ per ogni bollettino come spese di spedizione e gestione</li>
                          </ul>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center">
                            <input
                              id="accettaDeposito"
                              type="checkbox"
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                              checked={telefoniaForm.pagamento.accettaDepositoCauzionale || false}
                              onChange={(e) =>
                                setTelefoniaForm({
                                  ...telefoniaForm,
                                  pagamento: {
                                    ...telefoniaForm.pagamento,
                                    accettaDepositoCauzionale: e.target.checked,
                                  },
                                })
                              }
                            />
                            <label htmlFor="accettaDeposito" className="ml-2 block text-sm text-yellow-800">
                              Accetto il deposito cauzionale di 100€ e le condizioni di pagamento con bollettino
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Opzioni di fatturazione */}
                <div className="mt-4 p-4 border border-gray-200 rounded-md">
                  <h5 className="font-medium mb-3">Opzioni di fatturazione</h5>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Modalità di ricezione fattura
                      </label>
                      <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-primary"
                            name="tipoFattura"
                            value="digitale"
                            checked={true}
                            onChange={() => {}}
                          />
                          <span className="ml-2 text-sm">Fattura digitale (email)</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-primary"
                            name="tipoFattura"
                            value="cartacea"
                            checked={false}
                            onChange={() => {}}
                          />
                          <span className="ml-2 text-sm">Fattura cartacea (+2€/mese)</span>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        La fattura digitale è gratuita e rispetta l'ambiente. Riceverai una notifica via email quando
                        sarà disponibile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Note informative */}
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Informazioni importanti</h4>
              <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                <li>I campi contrassegnati con * sono obbligatori</li>
                <li>La richiesta verrà elaborata entro 24-48 ore lavorative</li>
                <li>Riceverai una email di conferma quando la richiesta sarà approvata</li>
                <li>Per completare l'attivazione dovrai recarti in agenzia con il documento d'identità selezionato</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingContract(null)
                resetForms()
              }}
              className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={editingContract ? handleUpdateContract : handleCreateContract}
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Elaborazione...
                </>
              ) : editingContract ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Aggiorna richiesta
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Invia richiesta
                </>
              )}
            </button>
          </div>
        </div>
      )
    } else if (activeContractType === "luce") {
      return (
        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium flex items-center">
            <Zap className="mr-2 h-5 w-5 text-blue-600" />
            Richiesta Contratto Luce
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fornitore</label>
              <select
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={luceForm.fornitore}
                onChange={(e) => setLuceForm({ ...luceForm, fornitore: e.target.value })}
              >
                <option value="Enel">Enel Energia</option>
                <option value="Edison">Edison</option>
                <option value="Eni">Eni Plenitude</option>
                <option value="A2A">A2A</option>
                <option value="Hera">Hera Comm</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Potenza (kW)</label>
              <select
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={luceForm.potenzaKw}
                onChange={(e) => setLuceForm({ ...luceForm, potenzaKw: e.target.value })}
              >
                <option value="3">3 kW</option>
                <option value="4.5">4.5 kW</option>
                <option value="6">6 kW</option>
                <option value="10">10 kW</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consumo annuo stimato (kWh)</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={luceForm.consumoAnnuo}
                onChange={(e) => setLuceForm({ ...luceForm, consumoAnnuo: e.target.value })}
                placeholder="Es. 2500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo utenza</label>
              <select
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={luceForm.tipoUtenza}
                onChange={(e) => setLuceForm({ ...luceForm, tipoUtenza: e.target.value as "domestico" | "business" })}
              >
                <option value="domestico">Domestico residente</option>
                <option value="business">Business</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Via/Piazza</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={luceForm.indirizzo.via}
                onChange={(e) =>
                  setLuceForm({
                    ...luceForm,
                    indirizzo: { ...luceForm.indirizzo, via: e.target.value },
                  })
                }
                placeholder="Nome della via o piazza"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numero Civico</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={luceForm.indirizzo.numeroCivico}
                onChange={(e) =>
                  setLuceForm({
                    ...luceForm,
                    indirizzo: { ...luceForm.indirizzo, numeroCivico: e.target.value },
                  })
                }
                placeholder="Numero civico"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CAP</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={luceForm.indirizzo.cap}
                onChange={(e) =>
                  setLuceForm({
                    ...luceForm,
                    indirizzo: { ...luceForm.indirizzo, cap: e.target.value },
                  })
                }
                placeholder="Codice di avviamento postale"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Città</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={luceForm.indirizzo.citta}
                onChange={(e) =>
                  setLuceForm({
                    ...luceForm,
                    indirizzo: { ...luceForm.indirizzo, citta: e.target.value },
                  })
                }
                placeholder="Città"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={luceForm.indirizzo.provincia}
                onChange={(e) =>
                  setLuceForm({
                    ...luceForm,
                    indirizzo: { ...luceForm.indirizzo, provincia: e.target.value },
                  })
                }
                placeholder="Provincia (sigla)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Codice POD</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={luceForm.codPod}
                onChange={(e) => setLuceForm({ ...luceForm, codPod: e.target.value })}
                placeholder="IT001E..."
              />
              <p className="text-xs text-gray-500 mt-1">Lo trovi sulla bolletta attuale</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Intestatario</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={luceForm.intestatario}
                onChange={(e) => setLuceForm({ ...luceForm, intestatario: e.target.value })}
                placeholder="Nome e cognome intestatario"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Codice Fiscale</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={luceForm.codiceFiscale}
                onChange={(e) => setLuceForm({ ...luceForm, codiceFiscale: e.target.value })}
                placeholder="Codice fiscale intestatario"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingContract(null)
                resetForms()
              }}
              className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={editingContract ? handleUpdateContract : handleCreateContract}
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Elaborazione...
                </>
              ) : editingContract ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Aggiorna richiesta
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Invia richiesta
                </>
              )}
            </button>
          </div>
        </div>
      )
    } else if (activeContractType === "gas") {
      return (
        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium flex items-center">
            <Flame className="mr-2 h-5 w-5 text-yellow-600" />
            Richiesta Contratto Gas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fornitore</label>
              <select
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                value={gasForm.fornitore}
                onChange={(e) => setGasForm({ ...gasForm, fornitore: e.target.value })}
              >
                <option value="Eni">Eni Plenitude</option>
                <option value="Enel">Enel Energia</option>
                <option value="Edison">Edison</option>
                <option value="A2A">A2A</option>
                <option value="Hera">Hera Comm</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consumo annuo stimato (Smc)</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                value={gasForm.consumoAnnuo}
                onChange={(e) => setGasForm({ ...gasForm, consumoAnnuo: e.target.value })}
                placeholder="Es. 1200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo utenza</label>
              <select
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                value={gasForm.tipoUtenza}
                onChange={(e) => setGasForm({ ...gasForm, tipoUtenza: e.target.value as "domestico" | "business" })}
              >
                <option value="domestico">Domestico</option>
                <option value="business">Business</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Via/Piazza</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                value={gasForm.indirizzo.via}
                onChange={(e) =>
                  setGasForm({
                    ...gasForm,
                    indirizzo: { ...gasForm.indirizzo, via: e.target.value },
                  })
                }
                placeholder="Nome della via o piazza"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numero Civico</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                value={gasForm.indirizzo.numeroCivico}
                onChange={(e) =>
                  setGasForm({
                    ...gasForm,
                    indirizzo: { ...gasForm.indirizzo, numeroCivico: e.target.value },
                  })
                }
                placeholder="Numero civico"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CAP</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                value={gasForm.indirizzo.cap}
                onChange={(e) =>
                  setGasForm({
                    ...gasForm,
                    indirizzo: { ...gasForm.indirizzo, cap: e.target.value },
                  })
                }
                placeholder="Codice di avviamento postale"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Città</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                value={gasForm.indirizzo.citta}
                onChange={(e) =>
                  setGasForm({
                    ...gasForm,
                    indirizzo: { ...gasForm.indirizzo, citta: e.target.value },
                  })
                }
                placeholder="Città"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                value={gasForm.indirizzo.provincia}
                onChange={(e) =>
                  setGasForm({
                    ...gasForm,
                    indirizzo: { ...gasForm.indirizzo, provincia: e.target.value },
                  })
                }
                placeholder="Provincia (sigla)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Codice PDR</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                value={gasForm.codPdr}
                onChange={(e) => setGasForm({ ...gasForm, codPdr: e.target.value })}
                placeholder="Es. 00881234567890"
              />
              <p className="text-xs text-gray-500 mt-1">Lo trovi sulla bolletta attuale</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Intestatario</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                value={gasForm.intestatario}
                onChange={(e) => setGasForm({ ...gasForm, intestatario: e.target.value })}
                placeholder="Nome e cognome intestatario"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Codice Fiscale</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                value={gasForm.codiceFiscale}
                onChange={(e) => setGasForm({ ...gasForm, codiceFiscale: e.target.value })}
                placeholder="Codice fiscale intestatario"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingContract(null)
                resetForms()
              }}
              className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={editingContract ? handleUpdateContract : handleCreateContract}
              disabled={isSubmitting}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md text-sm font-medium hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 disabled:opacity-50 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Elaborazione...
                </>
              ) : editingContract ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Aggiorna richiesta
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Invia richiesta
                </>
              )}
            </button>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="space-y-6">
      {/* Contracts List */}
      {!showForm && (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Le tue richieste di contratto</h3>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Nuova richiesta
            </button>
          </div>

          {isLoading || isInitializing ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-gray-600">{isInitializing ? "Inizializzazione..." : "Caricamento..."}</span>
            </div>
          ) : contracts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tipo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Data richiesta
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Dettagli
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stato
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getContractTypeIcon(contract.type)}
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {contract.type === "telefonia" ? "Telefonia" : contract.type === "luce" ? "Luce" : "Gas"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(contract.requestDate).toLocaleDateString("it-IT", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {contract.type === "telefonia" && (
                            <>
                              <span className="font-medium">{contract.details.operatore}</span>
                              <span className="text-gray-500"> - {contract.details.piano}</span>
                            </>
                          )}
                          {contract.type === "luce" && (
                            <>
                              <span className="font-medium">{contract.details.fornitore}</span>
                              <span className="text-gray-500"> - {contract.details.potenzaKw} kW</span>
                            </>
                          )}
                          {contract.type === "gas" && (
                            <>
                              <span className="font-medium">{contract.details.fornitore}</span>
                              <span className="text-gray-500"> - {contract.details.tipoUtenza}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(contract.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          {contract.status === "pending" && (
                            <>
                              <button
                                onClick={() => startEdit(contract)}
                                className="text-primary hover:text-primary/80 flex items-center"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Modifica
                              </button>
                              <button
                                onClick={() => handleDeleteContract(contract.id!)}
                                className="text-red-600 hover:text-red-800 flex items-center"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Elimina
                              </button>
                            </>
                          )}
                          {contract.status === "approved" && <span className="text-green-600">In lavorazione</span>}
                          {contract.status === "rejected" && (
                            <button
                              onClick={() => startEdit(contract)}
                              className="text-primary hover:text-primary/80 flex items-center"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Rivedi
                            </button>
                          )}
                          {contract.status === "completed" && <span className="text-blue-600">Completato</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nessuna richiesta di contratto</h3>
              <p className="text-gray-500 mb-4">Inizia richiedendo un nuovo contratto</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuova richiesta
              </button>
            </div>
          )}
        </>
      )}

      {/* Contract Form */}
      {showForm && renderContractForm()}
    </div>
  )
}
