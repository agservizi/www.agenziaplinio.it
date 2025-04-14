import BookingForm from "@/components/booking-form"
import OpenStreetMap from "@/components/open-street-map"

export const metadata = {
  title: "Prenota un Appuntamento - AG SERVIZI",
  description:
    "Prenota un appuntamento presso AG SERVIZI per i nostri servizi di pagamenti, spedizioni, attivazioni digitali e molto altro.",
}

export default function BookingPage() {
  return (
    <div className="pt-24 page-transition">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Prenota un Appuntamento</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Prenota un appuntamento presso la nostra agenzia per evitare attese e ricevere assistenza personalizzata.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Compila il modulo per prenotare</h2>
              <BookingForm />
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Informazioni Utili</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• La prenotazione è gratuita e non vincolante.</li>
                <li>• Riceverai una email di conferma con tutti i dettagli.</li>
                <li>• In caso di imprevisti, puoi cancellare la prenotazione fino a 24 ore prima dell'appuntamento.</li>
                <li>• Ti consigliamo di arrivare 5 minuti prima dell'orario prenotato.</li>
                <li>• Per qualsiasi informazione, contattaci al numero +39 081 0584542.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Dove Siamo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Orari di Apertura</h3>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="font-medium">Lunedì - Venerdì:</span>
                      <span>9:00 - 13:00, 15:00 - 19:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Sabato:</span>
                      <span>9:00 - 13:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Domenica:</span>
                      <span>Chiuso</span>
                    </li>
                  </ul>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold mb-2">Contatti</h4>
                    <p className="text-gray-600">
                      <strong>Telefono:</strong> +39 081 0584542
                      <br />
                      <strong>Email:</strong> info@agservizi.it
                    </p>
                  </div>
                </div>
              </div>
              {/* Coordinate di Via Plinio 72, Castellammare di Stabia */}
              <OpenStreetMap address="Via Plinio 72, Castellammare di Stabia" lat={40.6954} lng={14.4694} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

