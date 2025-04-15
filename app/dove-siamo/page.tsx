import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function DoveSiamo() {
  return (
    <div className="pt-24 page-transition">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Dove Siamo</h1>
          <p className="text-xl max-w-3xl mx-auto">Vieni a trovarci nella nostra sede di Castellammare di Stabia.</p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Informazioni di Contatto</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="text-primary mr-2" size={20} />
                Via Plinio il Vecchio 72, Castellammare di Stabia (NA)
              </div>
              <div className="flex items-center">
                <Phone className="text-primary mr-2" size={20} />
                +39 081 0584542
              </div>
              <div className="flex items-center">
                <Mail className="text-primary mr-2" size={20} />
                info@agservizi.it
              </div>
              <div className="flex items-center">
                <Clock className="text-primary mr-2" size={20} />
                Lun-Ven: 9:00-13:20, 16:00-19:20 | Sab: 9:00-13:00
              </div>
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Via+Plinio+il+Vecchio+72,+Castellammare+di+Stabia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded"
              >
                Apri in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
