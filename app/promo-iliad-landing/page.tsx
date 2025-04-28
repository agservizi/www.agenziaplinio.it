import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import IliadVoucherGenerator from "@/components/iliad-voucher-generator"
import VintageCountdown from "@/components/vintage-countdown"

export const metadata: Metadata = {
  title: "Promozione Esclusiva Iliad - Risparmia €5 sull'attivazione | AG SERVIZI",
  description:
    "Ottieni il tuo voucher esclusivo per attivare una SIM Iliad con €5 di sconto sul costo di attivazione presso AG SERVIZI",
}

export default function IliadLandingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-[#ff0032] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Iliad_logo-emmzu7gUgFwdyAdgiVCNUtInfD3i2S.png"
              alt="Logo Iliad"
              width={180}
              height={60}
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">OFFERTA ESCLUSIVA</h1>
          <p className="text-xl md:text-2xl font-semibold mb-2">RISPARMIA €5 SUL COSTO DI ATTIVAZIONE</p>

          {/* Vintage Countdown Timer */}
          <div className="my-6">
            <VintageCountdown targetDate={new Date("2025-05-31T19:00:00")} />
          </div>

          <div className="bg-white text-[#ff0032] font-bold py-2 px-4 rounded-lg inline-block">
            Disponibile solo presso AG SERVIZI
          </div>
        </div>
      </section>

      {/* Offerte Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">SCEGLI LA TUA OFFERTA</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Offerta 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-[#ff0032]">
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#ff0032] mb-2">GIGA 120</h3>
                <div className="text-3xl font-bold mb-4">
                  €7,99<span className="text-sm font-normal text-gray-500">/mese</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#ff0032] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      120 GB in 4G/4G+ <span className="font-bold text-[#ff0032]">PER SEMPRE</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#ff0032] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Minuti e SMS illimitati</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#ff0032] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>7GB dedicati in Europa</span>
                  </li>
                </ul>
                <div className="bg-gray-100 p-3 rounded-lg text-center mb-4">
                  <p className="text-sm text-gray-600">Costo di attivazione</p>
                  <p className="font-bold">
                    <span className="line-through text-gray-500 mr-2">€9,99</span>
                    <span className="text-[#ff0032]">€5,00</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Offerta 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-[#ff0032] transform scale-105 z-10">
              <div className="bg-[#ff0032] text-white text-center py-2 text-sm font-bold">PIÙ POPOLARE</div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#ff0032]">TOP 250 PLUS</h3>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#ff0032] text-white">
                    5G INCLUSO
                  </span>
                </div>
                <div className="text-3xl font-bold mb-4">
                  €9,99<span className="text-sm font-normal text-gray-500">/mese</span>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded-md text-sm mb-4">
                  Offerta attivabile fino al 6 maggio ore 15
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#ff0032] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      250 GB in 5G <span className="font-bold text-[#ff0032]">PER SEMPRE</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#ff0032] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Minuti e SMS illimitati</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#ff0032] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>25GB in Europa</span>
                  </li>
                </ul>
                <div className="bg-gray-100 p-3 rounded-lg text-center mb-4">
                  <p className="text-sm text-gray-600">Costo di attivazione</p>
                  <p className="font-bold">
                    <span className="line-through text-gray-500 mr-2">€9,99</span>
                    <span className="text-[#ff0032]">€5,00</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Offerta 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-[#ff0032]">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#ff0032]">TOP 300</h3>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#ff0032] text-white">
                    5G INCLUSO
                  </span>
                </div>
                <div className="text-3xl font-bold mb-4">
                  €11,99<span className="text-sm font-normal text-gray-500">/mese</span>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded-md text-sm mb-4">
                  Offerta attivabile fino al 6 maggio ore 15
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#ff0032] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      300 GB in 5G <span className="font-bold text-[#ff0032]">PER SEMPRE</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#ff0032] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Minuti e SMS illimitati</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#ff0032] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>16GB dedicati in Europa</span>
                  </li>
                </ul>
                <div className="bg-gray-100 p-3 rounded-lg text-center mb-4">
                  <p className="text-sm text-gray-600">Costo di attivazione</p>
                  <p className="font-bold">
                    <span className="line-through text-gray-500 mr-2">€9,99</span>
                    <span className="text-[#ff0032]">€5,00</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voucher Generator Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Genera il tuo Voucher Esclusivo</h2>
              <p className="text-lg text-gray-600">
                Ottieni subito il tuo voucher con codice univoco per attivare una SIM Iliad con €5 di sconto sul costo
                di attivazione.
              </p>
            </div>

            <IliadVoucherGenerator />

            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Come utilizzare il voucher:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Scarica il voucher PDF sul tuo dispositivo</li>
                <li>Presentalo presso AG SERVIZI in Via Plinio il Vecchio 72, Castellammare di Stabia</li>
                <li>Attiva la tua nuova SIM Iliad con €5 di sconto sul costo di attivazione</li>
              </ol>
              <p className="mt-4 text-sm text-gray-500">
                Il voucher è valido fino al 31 maggio 2025. Offerta soggetta a disponibilità.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Perché scegliere Iliad?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-[#ff0032] mr-3 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong>Trasparenza:</strong> Nessun costo nascosto, il prezzo è per sempre
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-[#ff0032] mr-3 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong>Qualità:</strong> Rete 4G/5G ad alta velocità in continua espansione
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-[#ff0032] mr-3 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong>Convenienza:</strong> Offerte competitive con grandi quantità di dati
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-[#ff0032] mr-3 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong>Flessibilità:</strong> Nessun vincolo contrattuale, sei libero di cambiare quando vuoi
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#ff0032] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Vieni a trovarci!</h2>
          <p className="text-xl mb-8">AG SERVIZI - Via Plinio il Vecchio 72, Castellammare di Stabia</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dove-siamo"
              className="bg-white text-[#ff0032] font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Come raggiungerci
            </Link>
            <Link
              href="/contatti"
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </section>

      {/* QR Code Info */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            Condividi questa pagina con i tuoi amici! Inquadra il QR code per accedere alla promozione.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            URL: <span className="font-mono">https://www.agenziaplinio.it/promo-iliad-landing</span>
          </p>
        </div>
      </section>
    </main>
  )
}
