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
                src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/team-image-1743602203331-AwX9JqAXe5LfABL29GZ034KwSvyQTn.jpg"
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

      {/* Partnership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Le Nostre Partnership Ufficiali</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Siamo orgogliosi di essere punto di riferimento ufficiale per i principali operatori di telecomunicazioni
              e servizi digitali.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Iliad Space */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-[#f5f5f7] flex items-center justify-center p-0 relative">
                <Image
                  src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/iliad-logo-HZLJf3G2JHnbjxkMCmJavMLxrvTPFf.jpg"
                  alt="Iliad Space"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#ff0032]">Iliad Space</h3>
                <p className="text-gray-600 mb-4">
                  Punto ufficiale Iliad per attivazioni, assistenza e gestione delle offerte di telefonia mobile e
                  fibra.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Attivazioni immediate
                </div>
              </div>
            </div>

            {/* Fastweb Point */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-[#FDC400] flex items-center justify-center p-0 relative">
                <Image
                  src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Logo_Fastweb_2020.svg-YbJbbJpyuPYqL0SdN399VwrdPXm8fP.png"
                  alt="Fastweb Point"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#FDC400]">Fastweb Point</h3>
                <p className="text-gray-600 mb-4">
                  Centro autorizzato per attivazioni e assistenza su servizi di telefonia mobile e connessioni internet
                  ultraveloci.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Consulenza personalizzata
                </div>
              </div>
            </div>

            {/* Windtre Point */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-[#f5f5f7] flex items-center justify-center p-0 relative">
                <Image
                  src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/windtre-logo-162SnUsCcvwetp3oqicGHKWyfryUuk.png"
                  alt="Windtre Point"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#ff8200]">Windtre Point</h3>
                <p className="text-gray-600 mb-4">
                  Punto vendita autorizzato per tutti i servizi WindTre, dalle offerte mobile alle soluzioni per la
                  casa.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Offerte esclusive
                </div>
              </div>
            </div>

            {/* Sky Point */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-[#f0f0f2] flex items-center justify-center p-6 relative">
                <Image
                  src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/Sky_Group_logo_2020.svg-wwrrYZOXD15cOZUdKz1Nu6LCwDpeJj.png"
                  alt="Sky Point"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-4"
                  priority
                  style={{ maxWidth: "80%", maxHeight: "80%", margin: "auto" }}
                />
              </div>
              <div className="p-6">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    background: "linear-gradient(90deg, #0072BB 0%, #00A0E9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Sky Point
                </h3>
                <p className="text-gray-600 mb-4">
                  Centro autorizzato per abbonamenti, assistenza e consulenza su tutti i servizi Sky, incluso Sky Wifi.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Promozioni dedicate
                </div>
              </div>
            </div>

            {/* Pianeta Fibra */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-[#f0f0f2] flex items-center justify-center p-6 relative">
                <Image
                  src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/pianetafibra-Tiyr7HPDn390ZW1F8esvFf0UwMj06w.png"
                  alt="Pianeta Fibra"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-4"
                  priority
                  style={{ maxWidth: "80%", maxHeight: "80%", margin: "auto" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#0A1F44]">Pianeta Fibra</h3>
                <p className="text-gray-600 mb-4">
                  Specialisti in connessioni in fibra ottica, offriamo consulenza e attivazione per la migliore
                  soluzione per la tua casa o azienda.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Verifica copertura gratuita
                </div>
              </div>
            </div>

            {/* Certificazioni */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-lg font-semibold text-gray-700">Personale Certificato</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary">Assistenza Qualificata</h3>
                <p className="text-gray-600 mb-4">
                  Il nostro team è formato da professionisti certificati dai nostri partner, per garantirti un servizio
                  di qualità superiore.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Formazione continua
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Visita il nostro negozio per scoprire tutte le offerte disponibili e ricevere una consulenza
              personalizzata dai nostri esperti.
            </p>
            <div className="mt-8">
              <a
                href="https://wa.me/+393773798570?text=Ciao,%20vorrei%20maggiori%20informazioni%20sulla%20vostra%20agenzia%20e%20i%20servizi%20che%20offrite."
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#25D366] hover:bg-[#128C7E] transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contattaci su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
