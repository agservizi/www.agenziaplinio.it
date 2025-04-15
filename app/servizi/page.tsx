import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const services = [
  {
    id: "pagamenti",
    title: "Pagamenti",
    description: "Bollettini, F24, PagoPA, MAV/RAV, Bonifici con DropPoint.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743606275426-pagamenti-uUXVejJrRwBKjHfIa5fw0z8o4HnnE5",
  },
  {
    id: "biglietteria",
    title: "Biglietteria",
    description: "Biglietti Italo e Trenitalia.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743614960666-ricariche-biglietteria-tEHclXq2TxiP5AWew1aCp0t4BNM1RS",
  },
  {
    id: "spedizioni",
    title: "Spedizioni",
    description: "Spedizioni nazionali e internazionali con BRT, Poste Italiane, TNT/Fedex.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743613584301-spedizioni-JLUm309g701TR3QNDl0Xz2j07FKJId",
  },
  {
    id: "attivazioni-digitali",
    title: "Attivazioni Digitali",
    description: "SPID, PEC, Firma Digitale (Namirial).",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743606783124-trust-provider-2NERtQT5Xys9yJdvpkNnLnkBlh3dBp",
  },
  {
    id: "caf-patronato",
    title: "CAF e Patronato",
    description: "Pratiche fiscali e assistenza previdenziale.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743621638868-caf-patronato-9aJ8wmKeSMq2Y5USY2vGsWlUcgxw79",
  },
  {
    id: "visure",
    title: "Visure",
    description: "Visure CRIF, catastali, camerali, protestati.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743603835674-visure-bcUPyq8wThBE7rDrULvYMEhZrOECGx",
  },
  {
    id: "telefonia-luce-gas",
    title: "Telefonia, Luce e Gas",
    description:
      "Contratti con Fastweb, Iliad, Windtre, Pianeta Fibra, Sky, A2A Energia, Enel Energia, Fastweb Energia.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743603919793-telefonia-luce-gas-ggQXQJH3lX6Ub0yHqydKbLdFXfoEKf",
  },
  {
    id: "servizi-postali",
    title: "Servizi Postali",
    description: "Invio Email, Fax, PEC.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743607125482-servizi-postali-KjHfIa5fw0z8o4HnnE5uUXVejJrRwB",
  },
  {
    id: "punto-ritiro",
    title: "Punto di Ritiro Pacchi",
    description: "PuntoPoste, BRT-Fermopoint, GLS Shop, Fedex Location.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743607325789-punto-ritiro-fVXcRULJDNawR86pMB0QwUjVAFCDzJf",
  },
]

export default function Servizi() {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">I Nostri Servizi</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Offriamo una vasta gamma di servizi per soddisfare tutte le tue esigenze quotidiane.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden service-card hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                  <Image
                    src={
                      service.id === "spedizioni"
                        ? "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/brt-XmfBclOgJHjfimzC2bpN17zzIQC5xT.jpg"
                        : service.id === "biglietteria"
                          ? "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/treno-YWoVrIKusxhlIG6eVmhOd0YiNsJ5A6.jpg"
                          : service.id === "attivazioni-digitali"
                            ? "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/namirial-qwWloPu8WTylnGifUpwOWoHEU28Uwb.png"
                            : service.id === "caf-patronato"
                              ? "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/cafpatronato-IYvk759MyjLrJWvwVmoWlFfqzKUFOB.jpg"
                              : service.id === "visure"
                                ? "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/esempio-visura-camerale-YPfUuu8a7dXkH38cd4UcSSJNNvDPMX.jpg"
                                : service.id === "telefonia-luce-gas"
                                  ? "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/consulenza-utenze-mnvuZsScuMyQ7x7vzXJWfeVAj0Ju8l.jpg"
                                  : service.id === "servizi-postali"
                                    ? "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/il-logo-di-poste-italiane_880x495-VqPqFWCcWYUwHbCGF1haVMT9ubKCWH.jpg"
                                    : service.image || "/placeholder.svg?height=200&width=300"
                    }
                    alt={service.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover absolute inset-0"
                    unoptimized={true}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {service.id === "trust-provider" ? "Trust Provider" : service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    href={`/servizi/${service.id}`}
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors"
                  >
                    Scopri di più
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
