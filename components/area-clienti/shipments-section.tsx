"use client"

import Link from "next/link"
import { Package, ExternalLink } from "lucide-react"
import type { Shipment } from "./types"

interface ShipmentsSectionProps {
  shipments: Shipment[]
}

export function ShipmentsSection({ shipments }: ShipmentsSectionProps) {
  return (
    <div className="bg-white rounded-lg border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <Package size={18} className="mr-2 text-primary" />
          Le tue spedizioni
        </h3>
        <Link href="/servizi/spedizioni" className="text-primary hover:text-primary/80 text-sm font-medium">
          Nuova spedizione
        </Link>
      </div>

      {shipments.length > 0 ? (
        <div className="space-y-4">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="font-medium">Spedizione verso {shipment.destination}</div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Tracking:</span> {shipment.trackingNumber}
                </div>
                <div className="text-sm text-gray-600">{shipment.courier}</div>
              </div>
              <div className="text-sm text-gray-600">
                {new Date(shipment.date).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="mt-1 flex justify-between items-center">
                <div className="sr-only">Stato: {shipment.status}</div>
                <span
                  aria-hidden="true"
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    shipment.status === "consegnato"
                      ? "bg-green-100 text-green-800"
                      : shipment.status === "in transito"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {shipment.status}
                </span>
                <button
                  className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                  aria-label={`Traccia spedizione ${shipment.trackingNumber}`}
                >
                  Traccia <ExternalLink size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>Non hai spedizioni attive</p>
          <Link href="/servizi/spedizioni" className="mt-2 inline-block text-primary hover:text-primary/80 font-medium">
            Effettua una spedizione
          </Link>
        </div>
      )}
    </div>
  )
}
