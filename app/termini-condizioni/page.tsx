import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Termini e Condizioni | AG SERVIZI",
  description: "Termini e condizioni di utilizzo dei servizi di AG SERVIZI.",
}

export default function TerminiCondizioni() {
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
          <h1 className="text-4xl font-bold mb-6">Termini e Condizioni</h1>
          <p className="text-xl max-w-3xl">Condizioni generali di utilizzo dei servizi offerti da AG SERVIZI</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg">
              <h2>Termini e Condizioni di Utilizzo</h2>
              <p>
                I presenti Termini e Condizioni regolano l'utilizzo del sito web e dei servizi offerti da AG SERVIZI VIA
                PLINIO 72 DI C.C. (di seguito "AG SERVIZI"). Utilizzando il nostro sito web e i nostri servizi, l'utente
                accetta integralmente i presenti Termini e Condizioni.
              </p>

              <h3>1. Definizioni</h3>
              <p>Ai fini dei presenti Termini e Condizioni, si intende per:</p>
              <ul>
                <li>"Sito": il sito web di AG SERVIZI accessibile all'indirizzo www.agservizi.it;</li>
                <li>"Servizi": tutti i servizi offerti da AG SERVIZI, sia online che presso la sede fisica;</li>
                <li>"Utente": qualsiasi persona fisica o giuridica che accede al Sito o utilizza i Servizi;</li>
                <li>
                  "Contenuti": tutti i materiali presenti sul Sito, inclusi testi, immagini, loghi, grafica, video,
                  audio e software.
                </li>
              </ul>

              <h3>2. Servizi Offerti</h3>
              <p>AG SERVIZI offre una vasta gamma di servizi, tra cui:</p>
              <ul>
                <li>Servizi di pagamento (bollettini, F24, PagoPA, bonifici);</li>
                <li>Servizi di spedizione nazionale e internazionale;</li>
                <li>Servizi di attivazione digitale (SPID, PEC, Firma Digitale);</li>
                <li>Servizi CAF e Patronato;</li>
                <li>Servizi di telefonia, luce e gas;</li>
                <li>Altri servizi come indicato sul Sito.</li>
              </ul>
              <p>
                Le specifiche, i prezzi e le modalità di erogazione dei singoli servizi sono descritti nelle relative
                sezioni del Sito o disponibili presso la sede fisica.
              </p>

              <h3>3. Modalità di Utilizzo dei Servizi</h3>
              <p>Per usufruire dei Servizi, l'Utente può:</p>
              <ul>
                <li>
                  Recarsi presso la sede fisica di AG SERVIZI in Via Plinio il Vecchio 72, Castellammare di Stabia (NA);
                </li>
                <li>Contattare AG SERVIZI tramite i canali indicati sul Sito;</li>
                <li>Utilizzare i servizi online, ove disponibili.</li>
              </ul>
              <p>
                Per alcuni Servizi potrebbe essere richiesta la presentazione di documenti di identità, codice fiscale o
                altra documentazione specifica.
              </p>

              <h3>4. Obblighi dell'Utente</h3>
              <p>L'Utente si impegna a:</p>
              <ul>
                <li>Fornire informazioni veritiere, accurate e complete;</li>
                <li>Utilizzare i Servizi in conformità con la legge e i presenti Termini e Condizioni;</li>
                <li>Non utilizzare i Servizi per scopi illeciti o fraudolenti;</li>
                <li>Rispettare i diritti di proprietà intellettuale di AG SERVIZI e di terzi;</li>
                <li>Non danneggiare, sovraccaricare o compromettere il Sito o i sistemi informatici di AG SERVIZI.</li>
              </ul>

              <h3>5. Proprietà Intellettuale</h3>
              <p>
                Tutti i Contenuti del Sito sono di proprietà di AG SERVIZI o dei suoi licenzianti e sono protetti dalle
                leggi sul diritto d'autore e sulla proprietà intellettuale. L'Utente non può copiare, modificare,
                distribuire, vendere o affittare alcuna parte del Sito o dei Contenuti senza il previo consenso scritto
                di AG SERVIZI.
              </p>

              <h3>6. Privacy e Protezione dei Dati</h3>
              <p>
                Il trattamento dei dati personali dell'Utente è regolato dalla Privacy Policy di AG SERVIZI, disponibile
                sul Sito. Utilizzando i Servizi, l'Utente acconsente al trattamento dei propri dati personali in
                conformità con la Privacy Policy.
              </p>

              <h3>7. Limitazioni di Responsabilità</h3>
              <p>
                AG SERVIZI si impegna a fornire i Servizi con la massima diligenza e professionalità. Tuttavia, non può
                garantire che i Servizi saranno sempre disponibili, privi di errori o che soddisferanno le specifiche
                esigenze dell'Utente.
              </p>
              <p>AG SERVIZI non sarà responsabile per:</p>
              <ul>
                <li>Danni diretti o indiretti derivanti dall'utilizzo o dall'impossibilità di utilizzo dei Servizi;</li>
                <li>
                  Ritardi o interruzioni dei Servizi dovuti a cause di forza maggiore o a circostanze al di fuori del
                  controllo di AG SERVIZI;
                </li>
                <li>Azioni o omissioni di terzi, inclusi i partner commerciali di AG SERVIZI;</li>
                <li>
                  Informazioni o documenti forniti dall'Utente che risultino inesatti, incompleti o non veritieri.
                </li>
              </ul>

              <h3>8. Modifiche ai Termini e Condizioni</h3>
              <p>
                AG SERVIZI si riserva il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento. Le
                modifiche saranno pubblicate sul Sito e saranno efficaci dalla data di pubblicazione. L'Utente è
                invitato a consultare regolarmente i Termini e Condizioni per verificare eventuali aggiornamenti.
              </p>

              <h3>9. Legge Applicabile e Foro Competente</h3>
              <p>
                I presenti Termini e Condizioni sono regolati dalla legge italiana. Per qualsiasi controversia relativa
                all'interpretazione, esecuzione o risoluzione dei presenti Termini e Condizioni sarà competente in via
                esclusiva il Foro di Torre Annunziata, salvo diversa disposizione di legge.
              </p>

              <h3>10. Contatti</h3>
              <p>Per qualsiasi domanda o chiarimento riguardo i presenti Termini e Condizioni, contattare:</p>
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
