"use client"

import { CreditCard, Download } from "lucide-react"
import type { Bill } from "./types"

interface BillsSectionProps {
  bills: Bill[]
}

export function BillsSection({ bills }: BillsSectionProps) {
  return (
    <div className="bg-white rounded-lg border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <CreditCard size={18} className="mr-2 text-primary" />
          Le tue fatture
        </h3>
      </div>

      {bills.length > 0 ? (
        <div className="space-y-4">
          {bills.map((bill) => (
            <div key={bill.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="font-medium">{bill.service}</div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-600">
                  Scadenza:{" "}
                  {new Date(bill.dueDate).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="font-medium">{bill.amount.toFixed(2)} €</div>
              </div>
              <div className="mt-1 flex justify-between items-center">
                <div className="sr-only">Stato: {bill.paid ? "Pagata" : "Da pagare"}</div>
                <span
                  aria-hidden="true"
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    bill.paid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {bill.paid ? "Pagata" : "Da pagare"}
                </span>
                <div className="flex space-x-3">
                  <button
                    className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                    aria-label={`Scarica PDF fattura ${bill.service}`}
                  >
                    <Download size={14} className="mr-1" /> PDF
                  </button>
                  {!bill.paid && (
                    <button
                      className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                      aria-label={`Paga fattura ${bill.service}`}
                    >
                      Paga ora
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>Non hai fatture disponibili</p>
        </div>
      )}
    </div>
  )
}
