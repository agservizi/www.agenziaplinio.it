"use client"

import { FileText, Download } from "lucide-react"
import type { Document } from "./types"

interface DocumentsSectionProps {
  documents: Document[]
}

export function DocumentsSection({ documents }: DocumentsSectionProps) {
  return (
    <div className="bg-white rounded-lg border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <FileText size={18} className="mr-2 text-primary" />I tuoi documenti
        </h3>
        <div className="text-sm text-gray-500">{documents.length} documenti</div>
      </div>

      {documents.length > 0 ? (
        <div className="space-y-4">
          {documents.map((document) => (
            <div key={document.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="font-medium">{document.name}</div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{document.category}</span>
                <span>{document.size}</span>
              </div>
              <div className="text-sm text-gray-600">
                {new Date(document.date).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="mt-1">
                <button
                  className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                  aria-label={`Scarica ${document.name}`}
                >
                  Scarica {document.type}
                  <Download size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>Non hai documenti salvati</p>
        </div>
      )}
    </div>
  )
}
