import Image from "next/image"

export default function ChiSiamo() {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Chi Siamo</h1>
          <p className="text-xl max-w-3xl mx-auto">
            AG SERVIZI è un'agenzia di servizi a Castellammare di Stabia che offre soluzioni complete per privati e
            aziende.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">La Nostra Storia</h2>
              <p className="text-gray-600 mb-4">
                AG SERVIZI nasce dalla volontà di creare un punto di riferimento per i cittadini di Castellammare di
                Stabia, offrendo una vasta gamma di servizi in un unico luogo.
              </p>
              <p className="text-gray-600 mb-4">
                Negli anni abbiamo ampliato la nostra offerta, stringendo partnership con importanti aziende nazionali e
                internazionali per garantire ai nostri clienti servizi di qualità a prezzi competitivi.
              </p>
              <p className="text-gray-600">
                La nostra missione è semplificare la vita quotidiana dei nostri clienti, offrendo soluzioni rapide ed
                efficienti per tutte le loro esigenze, dalle pratiche burocratiche alle spedizioni, dai pagamenti alle
                attivazioni digitali.
              </p>
            </div>

            <div className="lg:w-1/2">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="La nostra agenzia"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">I Nostri Valori</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I principi che guidano il nostro lavoro quotidiano e il nostro rapporto con i clienti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Trasparenza</h3>
              <p className="text-gray-600">
                Crediamo nella chiarezza e nella trasparenza in ogni aspetto del nostro lavoro, dalle tariffe alle
                procedure.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Affidabilità</h3>
              <p className="text-gray-600">
                Manteniamo le promesse e rispettiamo gli impegni presi con i nostri clienti, garantendo un servizio
                puntuale e preciso.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Professionalità</h3>
              <p className="text-gray-600">
                Il nostro team è formato da professionisti qualificati, costantemente aggiornati sulle normative e le
                procedure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Il Nostro Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professionisti qualificati pronti ad assisterti in ogni tua esigenza.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Team Member"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Mario Rossi</h3>
                <p className="text-gray-500 mb-4">Direttore</p>
                <p className="text-gray-600">
                  Con oltre 15 anni di esperienza nel settore dei servizi, Mario guida il nostro team con passione e
                  dedizione.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Team Member"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Laura Bianchi</h3>
                <p className="text-gray-500 mb-4">Responsabile Servizi</p>
                <p className="text-gray-600">
                  Esperta in pratiche amministrative e fiscali, Laura è il punto di riferimento per tutti i servizi CAF
                  e Patronato.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Team Member"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Giuseppe Verdi</h3>
                <p className="text-gray-500 mb-4">Consulente Digitale</p>
                <p className="text-gray-600">
                  Specializzato in servizi digitali, Giuseppe si occupa delle attivazioni SPID, PEC e Firma Digitale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
