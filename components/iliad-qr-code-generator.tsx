"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const IliadQrCodeGenerator = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/generate-qr-code?url=https://www.agenziaplinio.it/promo-iliad-landing")

        if (!response.ok) {
          throw new Error("Errore nella generazione del QR code")
        }

        const dataUrl = await response.text()
        setQrCodeUrl(dataUrl)
      } catch (err) {
        console.error("Errore:", err)
        setError("Impossibile generare il QR code. Riprova più tardi.")
      } finally {
        setIsLoading(false)
      }
    }

    generateQrCode()
  }, [])

  const downloadQrCode = () => {
    if (!qrCodeUrl) return

    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = "Iliad_Promo_QR_Code.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const printQrCode = () => {
    if (!qrCodeUrl) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code Iliad Promo</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
            }
            .container {
              text-align: center;
              max-width: 500px;
            }
            img {
              max-width: 300px;
              height: auto;
            }
            h1 {
              color: #ff0032;
              margin-bottom: 10px;
            }
            p {
              margin-bottom: 20px;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #666;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Promozione Esclusiva Iliad</h1>
            <p>Inquadra il QR code per ottenere il tuo voucher con €5 di sconto sull'attivazione</p>
            <img src="${qrCodeUrl}" alt="QR Code Iliad Promo" />
            <div class="footer">
              <p>AG SERVIZI - Via Plinio il Vecchio 72, Castellammare di Stabia</p>
              <p>Offerta valida fino al 31 maggio 2025</p>
            </div>
            <button class="no-print" onclick="window.print(); window.close();" style="margin-top: 20px; padding: 10px 20px; background-color: #ff0032; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Stampa QR Code
            </button>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 1000);
            }
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">QR Code per la Promozione</h3>

      <div className="flex flex-col items-center">
        {isLoading ? (
          <div className="flex items-center justify-center h-64 w-full">
            <svg
              className="animate-spin h-10 w-10 text-[#ff0032]"
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
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4">{error}</div>
        ) : (
          <>
            <div className="mb-6 p-4 border border-gray-200 rounded-lg">
              {qrCodeUrl && (
                <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code Iliad Promo" className="max-w-[200px]" />
              )}
            </div>

            <p className="text-sm text-gray-600 text-center mb-6">
              Questo QR code porta direttamente alla pagina della promozione Iliad.
              <br />
              Stampalo e condividilo con i tuoi clienti!
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={downloadQrCode} className="bg-[#ff0032] hover:bg-[#d60029] text-white">
                Scarica QR Code
              </Button>

              <Button
                onClick={printQrCode}
                variant="outline"
                className="border-[#ff0032] text-[#ff0032] hover:bg-[#ff0032]/10"
              >
                Stampa QR Code
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default IliadQrCodeGenerator
