import type { Metadata } from "next"
import IliadQrCodeGenerator from "@/components/iliad-qr-code-generator"

export const metadata: Metadata = {
  title: "QR Code Promozione Iliad - AG SERVIZI",
  description: "Genera e stampa il QR code per la promozione Iliad con €5 di sconto sull'attivazione",
}

export default function IliadQrPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">QR Code Promozione Iliad</h1>

        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#ff0032]">Genera il QR Code</h2>
            <p className="mb-6">
              Genera e stampa il QR code per la promozione Iliad. I clienti potranno inquadrarlo per accedere
              direttamente alla pagina della promozione e generare il loro voucher personale.
            </p>

            <IliadQrCodeGenerator />
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Come utilizzare il QR Code:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Scarica o stampa il QR code</li>
              <li>Posizionalo in un punto visibile del tuo negozio</li>
              <li>I clienti possono inquadrarlo con la fotocamera del loro smartphone</li>
              <li>Verranno indirizzati alla pagina della promozione Iliad</li>
              <li>Potranno generare il loro voucher personale con codice sconto</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  )
}
