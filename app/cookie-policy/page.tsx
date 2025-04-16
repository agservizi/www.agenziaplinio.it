import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Cookie Policy | AG SERVIZI",
  description: "Informativa sull'utilizzo dei cookie sul sito di AG SERVIZI.",
}

export default function CookiePolicy() {
  return (
    <div className="pt-24 page-transition">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link href="/" className="text-white/80 hover:text-white inline-flex items-center transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Torna alla home
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-xl max-w-3xl">Informativa sull'utilizzo dei cookie sul nostro sito web</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg">
              <h2>Informativa sui Cookie</h2>
              <p>
                La presente Cookie Policy è parte integrante della Privacy Policy di AG SERVIZI VIA PLINIO 72 DI C.C. e
                viene redatta in conformità alla normativa europea, in particolare al Regolamento (UE) 2016/679 (GDPR) e
                alla Direttiva ePrivacy (Direttiva 2002/58/CE), come modificata dalla Direttiva 2009/136/CE.
              </p>

              <h3>1. Cosa sono i Cookie</h3>
              <p>
                I cookie sono piccoli file di testo che i siti visitati dall'utente inviano al suo terminale (computer,
                tablet, smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla
                successiva visita del medesimo utente. I cookie permettono ai siti web di riconoscere il dispositivo
                dell'utente, migliorando la navigazione e personalizzando l'esperienza.
              </p>

              <h3>2. Tipologie di Cookie utilizzati</h3>
              <p>Il nostro sito utilizza diverse tipologie di cookie:</p>

              <h4>2.1 Cookie Tecnici/Necessari</h4>
              <p>
                Questi cookie sono essenziali per il corretto funzionamento del sito web. Consentono la navigazione e
                l'utilizzo delle funzioni di base. Non possono essere disattivati nei nostri sistemi. Generalmente
                vengono impostati solo in risposta ad azioni da te effettuate che costituiscono una richiesta di
                servizi, come l'impostazione delle preferenze di privacy, l'accesso o la compilazione di moduli.
              </p>

              <h4>2.2 Cookie Funzionali</h4>
              <p>
                Questi cookie permettono al sito Questi cookie permettono al sito di ricordare le scelte effettuate
                dall'utente (come il nome utente, la lingua o la regione di provenienza) e fornire funzionalità avanzate
                e personalizzate. Questi cookie raccolgono informazioni in forma anonima e non possono tracciare i
                movimenti dell'utente su altri siti web.
              </p>

              <h4>2.3 Cookie Analitici</h4>
              <p>
                Questi cookie ci permettono di contare le visite e le fonti di traffico in modo da poter misurare e
                migliorare le prestazioni del nostro sito. Ci aiutano a sapere quali pagine sono le più e le meno
                popolari e vedere come i visitatori si muovono nel sito. Tutte le informazioni raccolte da questi cookie
                sono aggregate e quindi anonime.
              </p>

              <h4>2.4 Cookie di Marketing</h4>
              <p>
                Questi cookie vengono utilizzati per tracciare i visitatori sui siti web. L'intento è quello di
                visualizzare annunci pertinenti e coinvolgenti per il singolo utente e quindi più preziosi per gli
                editori e gli inserzionisti terzi. Questi cookie aiutano a misurare l'efficacia delle campagne
                pubblicitarie.
              </p>

              <h3>3. Gestione dei Cookie</h3>
              <p>
                Al momento del primo accesso al nostro sito web, viene visualizzato un banner che informa l'utente
                sull'utilizzo dei cookie e offre la possibilità di:
              </p>
              <ul>
                <li>Accettare tutti i cookie</li>
                <li>Rifiutare tutti i cookie non essenziali</li>
                <li>Personalizzare le proprie preferenze sui cookie</li>
              </ul>
              <p>
                L'utente può modificare le proprie preferenze in qualsiasi momento attraverso il link "Impostazioni
                Cookie" presente nel footer del sito.
              </p>
              <p>
                Inoltre, la maggior parte dei browser permette di gestire le preferenze relative ai cookie. È possibile
                impostare il proprio browser per rifiutare i cookie o per eliminare solo alcuni di essi. Di seguito i
                link alle istruzioni per la gestione dei cookie nei browser più comuni:
              </p>
              <ul>
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647?hl=it"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apple Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/it-it/help/17442/windows-internet-explorer-delete-manage-cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Microsoft Internet Explorer
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/it-it/help/4027947/microsoft-edge-delete-cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>

              <h3>4. Cookie di Terze Parti</h3>
              <p>
                Il nostro sito potrebbe utilizzare servizi di terze parti che, a loro volta, installano cookie. Di
                seguito un elenco dei servizi utilizzati e dei link alle rispettive informative sulla privacy:
              </p>
              <ul>
                <li>
                  Google Analytics:{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  Google Maps:{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </li>
                <li>Social Media (Facebook, Instagram, Twitter): consultare le rispettive privacy policy</li>
              </ul>

              <h3>5. Durata dei Cookie</h3>
              <p>
                I cookie hanno una durata dettata dalla data di scadenza o da un'azione specifica come la chiusura del
                browser impostata al momento dell'installazione. I cookie possono essere:
              </p>
              <ul>
                <li>
                  Temporanei o di sessione: sono utilizzati per archiviare informazioni temporanee, consentono di
                  collegare le azioni eseguite durante una sessione specifica e vengono rimossi dal computer alla
                  chiusura del browser;
                </li>
                <li>
                  Permanenti: sono utilizzati per archiviare informazioni, ad esempio il nome e la password di accesso,
                  in modo da evitare che l'utente debba digitarli nuovamente ogni volta che visita un sito specifico.
                  Questi rimangono memorizzati nel computer anche dopo aver chiuso il browser.
                </li>
              </ul>

              <h3>6. Conseguenze del Rifiuto dei Cookie</h3>
              <p>
                L'utente è libero di scegliere se accettare o meno i cookie. Tuttavia, rifiutando i cookie necessari,
                potrebbe non essere in grado di utilizzare tutte le funzionalità del sito o l'accesso ad alcune aree
                potrebbe essere limitato. Rifiutando i cookie funzionali, analitici o di marketing, l'utente potrà
                comunque navigare nel sito, ma alcune funzioni potrebbero non essere disponibili.
              </p>

              <h3>7. Aggiornamenti della Cookie Policy</h3>
              <p>
                La presente Cookie Policy potrebbe essere soggetta a modifiche nel tempo. Si consiglia di consultare
                regolarmente questa pagina per essere sempre aggiornati sulle ultime modifiche.
              </p>

              <h3>8. Contatti</h3>
              <p>Per qualsiasi domanda o chiarimento riguardo l'utilizzo dei cookie sul nostro sito, contattare:</p>
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
