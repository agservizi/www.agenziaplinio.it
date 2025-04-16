import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | AG SERVIZI",
  description: "Informativa sulla privacy e sul trattamento dei dati personali di AG SERVIZI.",
}

export default function PrivacyPolicy() {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link href="/" className="text-white/80 hover:text-white inline-flex items-center transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Torna alla home
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl max-w-3xl">Informativa sulla privacy e sul trattamento dei dati personali</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg">
              <h2>Informativa sulla Privacy ai sensi del GDPR</h2>
              <p>
                La presente informativa sulla privacy descrive come AG SERVIZI VIA PLINIO 72 DI C.C. raccoglie, utilizza
                e protegge i dati personali degli utenti che visitano il nostro sito web o utilizzano i nostri servizi,
                in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR) dell'Unione Europea.
              </p>

              <h3>1. Titolare del Trattamento</h3>
              <p>
                Il titolare del trattamento dei dati è AG SERVIZI VIA PLINIO 72 DI C.C., con sede in Via Plinio il
                Vecchio 72, Castellammare di Stabia (NA), 80053, Italia.
                <br />
                Email: info@agenziaplinio.it
                <br />
                Telefono: +39 081 0584542
              </p>

              <h3>2. Tipologie di Dati Raccolti</h3>
              <p>Possiamo raccogliere i seguenti tipi di dati personali:</p>
              <ul>
                <li>Dati di identificazione (nome, cognome, indirizzo, numero di telefono, email)</li>
                <li>Dati fiscali (codice fiscale, partita IVA)</li>
                <li>Dati relativi ai servizi richiesti</li>
                <li>Dati di navigazione (indirizzo IP, cookie)</li>
                <li>Dati forniti volontariamente tramite moduli di contatto</li>
              </ul>

              <h3>3. Finalità del Trattamento</h3>
              <p>I dati personali sono raccolti e trattati per le seguenti finalità:</p>
              <ul>
                <li>Fornire i servizi richiesti</li>
                <li>Gestire le richieste di informazioni</li>
                <li>Adempiere agli obblighi legali e fiscali</li>
                <li>Migliorare i nostri servizi</li>
                <li>Inviare comunicazioni di servizio</li>
                <li>Con il consenso esplicito, inviare comunicazioni commerciali</li>
              </ul>

              <h3>4. Base Giuridica del Trattamento</h3>
              <p>Il trattamento dei dati personali si basa su una o più delle seguenti basi giuridiche:</p>
              <ul>
                <li>Esecuzione di un contratto di cui l'interessato è parte</li>
                <li>Adempimento di obblighi legali</li>
                <li>Consenso esplicito dell'interessato</li>
                <li>Legittimo interesse del titolare del trattamento</li>
              </ul>

              <h3>5. Modalità di Trattamento e Conservazione</h3>
              <p>
                I dati personali sono trattati sia in formato cartaceo che elettronico, adottando misure di sicurezza
                adeguate per prevenire l'accesso non autorizzato, la divulgazione, la modifica o la distruzione non
                autorizzata dei dati.
              </p>
              <p>
                I dati personali saranno conservati per il tempo necessario a conseguire le finalità per cui sono stati
                raccolti e in conformità con gli obblighi di legge. Al termine di tale periodo, i dati saranno
                cancellati o resi anonimi.
              </p>

              <h3>6. Condivisione dei Dati</h3>
              <p>I dati personali possono essere condivisi con:</p>
              <ul>
                <li>Fornitori di servizi che agiscono per nostro conto</li>
                <li>Autorità pubbliche quando richiesto dalla legge</li>
                <li>Partner commerciali con il consenso dell'interessato</li>
              </ul>
              <p>Non vendiamo o affittiamo i dati personali a terzi per finalità di marketing.</p>

              <h3>7. Cookie e Tecnologie Simili</h3>
              <p>
                Il nostro sito utilizza cookie e tecnologie simili per migliorare l'esperienza dell'utente, analizzare
                il traffico e personalizzare i contenuti. Gli utenti possono controllare l'uso dei cookie attraverso le
                impostazioni del browser e il nostro banner dei cookie.
              </p>

              <h3>8. Diritti dell'Interessato</h3>
              <p>In conformità con il GDPR, gli interessati hanno i seguenti diritti:</p>
              <ul>
                <li>Diritto di accesso ai propri dati personali</li>
                <li>Diritto di rettifica dei dati inesatti</li>
                <li>Diritto alla cancellazione dei dati (diritto all'oblio)</li>
                <li>Diritto di limitazione del trattamento</li>
                <li>Diritto alla portabilità dei dati</li>
                <li>Diritto di opposizione al trattamento</li>
                <li>Diritto di non essere sottoposto a processi decisionali automatizzati</li>
              </ul>
              <p>
                Per esercitare questi diritti, contattare il titolare del trattamento utilizzando i recapiti forniti.
              </p>

              <h3>9. Modifiche alla Privacy Policy</h3>
              <p>
                Ci riserviamo il diritto di modificare questa privacy policy in qualsiasi momento. Le modifiche saranno
                pubblicate su questa pagina con la data di aggiornamento.
              </p>

              <h3>10. Contatti</h3>
              <p>
                Per qualsiasi domanda o richiesta riguardante questa privacy policy o il trattamento dei dati personali,
                contattare:
              </p>
              <p>
                AG SERVIZI VIA PLINIO 72 DI C.C.
                <br />
                Via Plinio il Vecchio 72
                <br />
                Castellammare di Stabia (NA), 80053
                <br />
                Email: info@agenziaplinio.it
                <br />
                Telefono: +39 081 0584542
              </p>

              <p className="text-sm text-gray-500 mt-8">Ultimo aggiornamento: 1 Aprile 2024</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
