"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"

// Componenti UI
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Lock, Bug } from "lucide-react"

// Colori Iliad
const iliadRed = "#e20c18"

export default function RiscattoVoucherPage() {
  // Stati
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [voucherCode, setVoucherCode] = useState("")
  const [iccidCode, setIccidCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({
    success: false,
    title: "",
    message: "",
  })
  const [redeemedCount, setRedeemedCount] = useState(0)
  const [isInitializing, setIsInitializing] = useState(true)
  const [debugMode, setDebugMode] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  // Inizializza il database all'avvio
  useEffect(() => {
    const initDatabase = async () => {
      try {
        setIsInitializing(true)
        const response = await fetch("/api/iliad-vouchers/init", {
          method: "POST",
        })
        const data = await response.json()
        console.log("Inizializzazione database:", data)
      } catch (error) {
        console.error("Errore durante l'inizializzazione del database:", error)
      } finally {
        setIsInitializing(false)
      }
    }

    initDatabase()
  }, [])

  // Carica il conteggio dei voucher riscattati
  useEffect(() => {
    if (isAuthenticated && !isInitializing) {
      fetchRedeemedCount()
    }
  }, [isAuthenticated, isInitializing])

  // Funzione per ottenere il conteggio dei voucher riscattati
  const fetchRedeemedCount = async () => {
    try {
      const response = await fetch("/api/iliad-vouchers/count")
      const data = await response.json()
      if (data.success) {
        setRedeemedCount(data.count)
      }
    } catch (error) {
      console.error("Errore nel recupero del conteggio:", error)
    }
  }

  // Funzione per verificare lo stato dei voucher
  const checkVouchers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/iliad-vouchers/check")
      const data = await response.json()
      setDebugInfo(data)
      setDebugMode(true)
    } catch (error) {
      console.error("Errore durante la verifica dei voucher:", error)
      setModalContent({
        success: false,
        title: "Errore",
        message: "Si è verificato un errore durante la verifica dei voucher.",
      })
      setShowModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Gestione login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber === "3773798570") {
      setIsAuthenticated(true)
    } else {
      setModalContent({
        success: false,
        title: "Accesso negato",
        message: "Il numero di telefono inserito non è autorizzato.",
      })
      setShowModal(true)
    }
  }

  // Gestione riscatto voucher
  const handleRedeemVoucher = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!voucherCode || !iccidCode) {
      setModalContent({
        success: false,
        title: "Errore",
        message: "Inserisci sia il codice voucher che il codice ICCID.",
      })
      setShowModal(true)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/iliad-vouchers/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: voucherCode,
          iccid: iccidCode,
        }),
      })

      const data = await response.json()

      setModalContent({
        success: data.success,
        title: data.success ? "Voucher riscattato!" : "Errore",
        message: data.message || (data.error ? `Errore: ${data.error}` : "Errore sconosciuto"),
      })

      setShowModal(true)

      if (data.success) {
        // Reset form e aggiorna conteggio
        setVoucherCode("")
        setIccidCode("")
        fetchRedeemedCount()
      }
    } catch (error) {
      console.error("Errore durante il riscatto del voucher:", error)
      setModalContent({
        success: false,
        title: "Errore",
        message: "Si è verificato un errore durante il riscatto del voucher.",
      })
      setShowModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Pagina di login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Image src="/iliad-logo.png" alt="Iliad Logo" width={150} height={50} className="mx-auto mb-6" />
            <h1 className="text-2xl font-bold" style={{ color: iliadRed }}>
              Pannello Riscatto Voucher
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            {isInitializing ? (
              <div className="text-center py-4">
                <p>Inizializzazione del sistema...</p>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Numero di telefono</Label>
                  <div className="flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Inserisci il numero di telefono"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" style={{ backgroundColor: iliadRed, borderColor: iliadRed }}>
                  Accedi
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Modal di errore */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <XCircle className="h-6 w-6 mr-2 text-red-500" />
                {modalContent.title}
              </DialogTitle>
              <DialogDescription>{modalContent.message}</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <Button onClick={() => setShowModal(false)}>Chiudi</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // Modalità debug
  if (debugMode && debugInfo) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Image src="/iliad-logo.png" alt="Iliad Logo" width={120} height={40} />
              <h1 className="text-2xl font-bold ml-4" style={{ color: iliadRed }}>
                Debug Voucher Iliad
              </h1>
            </div>
            <Button onClick={() => setDebugMode(false)}>Torna al pannello</Button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mb-6">
            <h2 className="text-xl font-semibold mb-4">Struttura tabella</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
              {JSON.stringify(debugInfo.tableStructure, null, 2)}
            </pre>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mb-6">
            <h2 className="text-xl font-semibold mb-4">Voucher di esempio</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
              {JSON.stringify(debugInfo.vouchers, null, 2)}
            </pre>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Tabelle correlate</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
              {JSON.stringify(debugInfo.relatedTables, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard di riscatto voucher
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Image src="/iliad-logo.png" alt="Iliad Logo" width={120} height={40} />
            <h1 className="text-2xl font-bold ml-4" style={{ color: iliadRed }}>
              Pannello Riscatto Voucher
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white px-4 py-2 rounded-lg shadow border border-gray-200">
              <span className="text-sm text-gray-500">Voucher riscattati:</span>
              <span className="ml-2 font-bold text-lg" style={{ color: iliadRed }}>
                {redeemedCount}
              </span>
            </div>
            <Button variant="outline" size="icon" onClick={checkVouchers} title="Modalità debug">
              <Bug className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Riscatta un nuovo voucher</h2>

          <form onSubmit={handleRedeemVoucher} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="voucher">Codice Voucher</Label>
                <Input
                  id="voucher"
                  placeholder="Inserisci il codice voucher"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="iccid">Codice ICCID SIM</Label>
                <Input
                  id="iccid"
                  placeholder="Inserisci il codice ICCID"
                  value={iccidCode}
                  onChange={(e) => setIccidCode(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              style={{ backgroundColor: iliadRed, borderColor: iliadRed }}
              disabled={isLoading}
            >
              {isLoading ? "Elaborazione in corso..." : "Riscatta Voucher"}
            </Button>
          </form>
        </div>
      </div>

      {/* Modal di successo/errore */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {modalContent.success ? (
                <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 mr-2 text-red-500" />
              )}
              {modalContent.title}
            </DialogTitle>
            <DialogDescription>{modalContent.message}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button
              onClick={() => setShowModal(false)}
              style={modalContent.success ? { backgroundColor: iliadRed } : {}}
            >
              Chiudi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
