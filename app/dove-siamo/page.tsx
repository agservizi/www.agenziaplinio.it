import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Car, Train, Bus, ExternalLink, Calendar, Navigation } from "lucide-react"

export default function DoveSiamo() {
  // Coordinate esatte dell'agenzia
  const latitude = 40.700629319318956
  const longitude = 14.485392263659271

  return (
    <div className="pt-0 page-transition">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Dove Siamo</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Vieni a trovarci nella nostra sede di Castellammare di Stabia. Siamo facilmente raggiungibili e a tua
            disposizione per qualsiasi esigenza.
          </p>
        </div>
      </section>

      {/* Map and Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6">La Nostra Sede</h2>

              <div className="h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=14.483392%2C40.698629%2C14.487392%2C40.702629&amp;layer=mapnik&amp;marker=40.700629%2C14.485392"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Mappa AG Servizi Via Plinio il Vecchio 72"
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Pulsanti per le indicazioni stradali */}
              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Indicazioni su Google Maps
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <a
                  href={`https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Indicazioni su Waze
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <Link
                  href="/prenota-appuntamento"
                  className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors ml-auto"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Prenota un appuntamento
                </Link>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Come Raggiungerci</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <Car className="text-primary" size={20} />
                      </div>
                      <h4 className="font-bold">In Auto</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Dall'autostrada A3 Napoli-Salerno, uscita Castellammare di Stabia. Seguire le indicazioni per il
                      centro città, poi per Via Plinio il Vecchio.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <Train className="text-primary" size={20} />
                      </div>
                      <h4 className="font-bold">In Treno</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Dalla stazione ferroviaria di Castellammare di Stabia o Via Nocera, proseguire a piedi per circa
                      10 minuti.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <Bus className="text-primary" size={20} />
                      </div>
                      <h4 className="font-bold">In Autobus</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Le linee 1, 2 e 5 fermano a pochi passi dalla nostra sede. Scendere alla fermata "Via Plinio" e
                      proseguire a piedi per 2 minuti.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Parcheggio</h3>
                <p className="text-gray-600 mb-4">
                  Nelle vicinanze della nostra sede sono disponibili diverse opzioni di parcheggio:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Parcheggio pubblico in Piazza Umberto I (a 3 minuti a piedi)</li>
                  <li>Parcheggio a pagamento in Via Roma (a 5 minuti a piedi)</li>
                  <li>Parcheggio gratuito in Via Napoli (a 7 minuti a piedi)</li>
                </ul>
              </div>

              {/* Nuova sezione: Punti di riferimento */}
              <div>
                <h3 className="text-xl font-bold mb-4">Punti di Riferimento</h3>
                <p className="text-gray-600 mb-4">
                  La nostra agenzia è facilmente riconoscibile e si trova vicino a questi punti di riferimento:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>A 20 metri dalla farmacia Plinio</li>
                  <li>A 200 metri da Piazza Matteotti</li>
                  <li>Vicino all'ufficio postale di Via Plinio il Vecchio "Centrale"</li>
                </ul>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h3 className="text-xl font-bold mb-6">Informazioni di Contatto</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Indirizzo</h4>
                      <p className="text-gray-600">
                        Via Plinio il Vecchio 72
                        <br />
                        Castellammare di Stabia (NA)
                        <br />
                        80053
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Telefono</h4>
                      <p className="text-gray-600">
                        <a href="tel:+390810584542" className="hover:underline">
                          +39 081 0584542
                        </a>
                        <br />
                        <a href="tel:+393773798570" className="hover:underline">
                          +39 377 3798570
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Email</h4>
                      <p className="text-gray-600">
                        <a href="mailto:info@agenziaplinio.it" className="hover:underline">
                          info@agenziaplinio.it
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Orari di Apertura</h4>
                      <p className="text-gray-600">
                        Lun-Ven: 9:00-13:20, 16:00-19:20
                        <br />
                        Sab: 9:00-13:00
                        <br />
                        Domenica: Chiuso
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Image
                    src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/team-image-1743602203331-AwX9JqAXe5LfABL29GZ034KwSvyQTn.jpg"
                    alt="Ingresso AG Servizi"
                    width={400}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <p className="text-sm text-gray-500 text-center">L'ingresso della nostra agenzia</p>
                </div>

                <div className="mt-8 space-y-3">
                  <a
                    href="https://wa.me/393773798570?text=Buongiorno%2C%20vorrei%20avere%20maggiori%20informazioni%20sui%20vostri%20servizi.%20Grazie!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors w-full block text-center flex items-center justify-center"
                  >
                    <Image
                      src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Whatsapp_icon-icons.com_66931%20%281%29-3ge8nOrwR41gROIM2LrKPJOYueyxzj.png"
                      alt="WhatsApp"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Contattaci su WhatsApp
                  </a>

                  <a
                    href="tel:+390810584542"
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors w-full block text-center flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Chiamaci ora
                  </a>

                  <Link
                    href="/prenota-appuntamento"
                    className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-6 rounded-md transition-colors w-full block text-center flex items-center justify-center"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Prenota un appuntamento
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
