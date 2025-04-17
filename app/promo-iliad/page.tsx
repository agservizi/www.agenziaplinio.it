import IliadPromoFlyer from "@/components/iliad-promo-flyer"
import PromoIliadSection from "@/components/promo-iliad-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Promozione Iliad - AG SERVIZI",
  description: "Offerte esclusive Iliad con sconto di €5 sul costo di attivazione presso AG SERVIZI",
}

export default function PromoIliadPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Promozione Iliad - AG SERVIZI</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#ff0032]">Scarica il Voucher Personale</h2>
            <p className="mb-4">
              Ottieni il tuo voucher personale con codice univoco per attivare una SIM Iliad con uno sconto di €5 sul
              costo di attivazione.
            </p>
            <p className="mb-4">
              Presenta il voucher presso la nostra agenzia in Via Plinio il Vecchio 72, Castellammare di Stabia per
              usufruire della promozione.
            </p>
            <p className="font-semibold">Offerta valida fino al 30 aprile 2025.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <IliadPromoFlyer />
          </div>
        </div>

        <PromoIliadSection />
      </div>
    </main>
  )
}
