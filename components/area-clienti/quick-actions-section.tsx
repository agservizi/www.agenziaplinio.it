"use client"

import Link from "next/link"
import { Calendar, Package, Search, FileSignature, CreditCard, HelpCircle } from "lucide-react"

export function QuickActionsSection() {
  return (
    <div className="bg-white rounded-lg border p-5 mb-8">
      <h3 className="text-lg font-bold mb-4">Azioni rapide</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <Link
          href="/prenota-appuntamento"
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Prenota appuntamento"
        >
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-center">Prenota appuntamento</span>
        </Link>
        <Link
          href="/servizi/spedizioni"
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Nuova spedizione"
        >
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-center">Nuova spedizione</span>
        </Link>
        <Link
          href="/servizi/visure"
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Richiedi visura"
        >
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-center">Richiedi visura</span>
        </Link>
        <Link
          href="/servizi/trust-provider"
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Servizi digitali"
        >
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <FileSignature className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-center">Servizi digitali</span>
        </Link>
        <Link
          href="/servizi/pagamenti"
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Pagamenti"
        >
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-center">Pagamenti</span>
        </Link>
        <Link
          href="/contatti"
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Assistenza"
        >
          <div className="rounded-full bg-primary/10 p-3 mb-2">
            <HelpCircle className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-center">Assistenza</span>
        </Link>
      </div>
    </div>
  )
}
