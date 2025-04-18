"use client"

import { FileSignature } from "lucide-react"
import type { ServiceRequest } from "./types"

interface ServiceRequestsSectionProps {
  requests: ServiceRequest[]
}

export function ServiceRequestsSection({ requests }: ServiceRequestsSectionProps) {
  return (
    <div className="bg-white rounded-lg border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <FileSignature size={18} className="mr-2 text-primary" />
          Richieste di servizio
        </h3>
      </div>

      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="font-medium">{request.type}</div>
              <div className="text-sm text-gray-600">
                Richiesta il:{" "}
                {new Date(request.requestDate).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              {request.details && <div className="text-sm text-gray-600">{request.details}</div>}
              <div className="mt-1">
                <div className="sr-only">Stato: {request.status}</div>
                <span
                  aria-hidden="true"
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    request.status === "completato"
                      ? "bg-green-100 text-green-800"
                      : request.status === "in elaborazione"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {request.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>Non hai richieste di servizio attive</p>
        </div>
      )}
    </div>
  )
}
