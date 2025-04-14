import FAQSection from "@/components/faq-section"
import { Phone, Mail } from "lucide-react"

const generalFAQs = [
  {
    question: "Quali sono gli orari di apertura dell'agenzia?",
    answer:
      "Siamo aperti dal lunedì al venerdì dalle 9:00 alle 13:00 e dalle 15:00 alle 19:00. Il sabato siamo aperti dalle 9:00 alle 13:00. Domenica chiuso.",
  },
  {
    question: "Quali metodi di pagamento accettate?",
    answer: "Accettiamo pagamenti in contanti, bancomat, carte di credito e carte prepagate.",
  },
  {
    question: "È necessario prendere appuntamento per usufruire dei vostri servizi?",
    answer:
      "Per la maggior parte dei servizi non è necessario prendere appuntamento. Tuttavia, per alcuni servizi specifici come CAF e Patronato, è consigliabile prenotare in anticipo per evitare attese.",
  },
  {
    question: "Offrite servizi a domicilio?",
    answer:
      "Al momento non offriamo servizi a domicilio, ma stiamo valutando la possibilità di introdurli in futuro per alcune categorie di clienti.",
  },
]

const pagamentiFAQs = [
  {
    question: "Quali tipi di bollettini posso pagare presso la vostra agenzia?",
    answer:
      "Presso la nostra agenzia è possibile pagare bollettini postali, MAV, RAV, bollette di utenze domestiche (luce, gas, acqua, telefono), bollo auto, tasse universitarie e molto altro.",
  },
  {
    question: "Posso pagare un F24?",
    answer:
      "Sì, offriamo il servizio di pagamento F24 per tasse, imposte e contributi. Possiamo anche aiutarti nella compilazione del modello.",
  },
  {
    question: "Quanto costa il servizio di pagamento bollettini?",
    answer:
      "Il costo del servizio varia in base al tipo di bollettino. Contattaci o vieni in agenzia per conoscere le tariffe specifiche.",
  },
  {
    question: "Posso pagare con carta di credito?",
    answer: "Sì, accettiamo pagamenti con carte di credito, bancomat, carte prepagate e contanti.",
  },
]

const spedizioniFAQs = [
  {
    question: "Quali corrieri utilizzate per le spedizioni?",
    answer:
      "Collaboriamo con diversi corrieri nazionali e internazionali, tra cui BRT, Poste Italiane, TNT/Fedex. Possiamo consigliarti il corriere più adatto alle tue esigenze in base alla destinazione, ai tempi di consegna e al budget.",
  },
  {
    question: "Quanto costa spedire un pacco in Italia?",
    answer:
      "Il costo di spedizione di un pacco in Italia dipende dal peso, dalle dimensioni e dalla destinazione. Contattaci o vieni in agenzia per un preventivo personalizzato.",
  },
  {
    question: "Posso tracciare la mia spedizione?",
    answer:
      "Sì, per tutte le spedizioni forniamo un codice di tracciamento che permette di seguire il percorso del pacco fino alla consegna.",
  },
  {
    question: "Quali sono i tempi di consegna?",
    answer:
      "I tempi di consegna variano in base al corriere scelto e alla destinazione. In generale, per le spedizioni nazionali i tempi variano da 1 a 3 giorni lavorativi, mentre per le spedizioni internazionali possono variare da 3 a 10 giorni lavorativi.",
  },
]

const digitaliFAQs = [
  {
    question: "Quali documenti servono per attivare lo SPID?",
    answer:
      "Per attivare lo SPID è necessario presentarsi con un documento d'identità valido (carta d'identità, passaporto o patente), la tessera sanitaria, un indirizzo email personale e un numero di cellulare.",
  },
  {
    question: "Quanto costa attivare una PEC?",
    answer:
      "Il costo di attivazione di una PEC varia in base al provider e al piano scelto. Offriamo diverse soluzioni a partire da 5€ all'anno. Contattaci per maggiori informazioni.",
  },
  {
    question: "Quanto tempo ci vuole per attivare una firma digitale?",
    answer:
      "L'attivazione della firma digitale richiede generalmente 24-48 ore dal momento della richiesta. È necessario presentarsi personalmente con un documento d'identità valido.",
  },
  {
    question: "La firma digitale ha una scadenza?",
    answer:
      "Sì, la firma digitale ha una validità di 3 anni dalla data di attivazione, dopodiché deve essere rinnovata.",
  },
]

export default function FAQ() {
  return (
    <div className="pt-0 page-transition">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Domande Frequenti</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Trova le risposte alle domande più comuni sui nostri servizi. Se non trovi la risposta che cerchi, non
            esitare a contattarci.
          </p>
        </div>
      </section>

      {/* General FAQs */}
      <FAQSection
        title="Domande Generali"
        description="Informazioni generali sulla nostra agenzia e sui nostri servizi."
        faqs={generalFAQs}
      />

      {/* Pagamenti FAQs */}
      <FAQSection
        title="Pagamenti"
        description="Domande frequenti sui servizi di pagamento bollettini, F24, PagoPA e bonifici."
        faqs={pagamentiFAQs}
      />

      {/* Spedizioni FAQs */}
      <FAQSection
        title="Spedizioni"
        description="Domande frequenti sui servizi di spedizione nazionale e internazionale."
        faqs={spedizioniFAQs}
      />

      {/* Attivazioni Digitali FAQs */}
      <FAQSection
        title="Attivazioni Digitali"
        description="Domande frequenti sui servizi di attivazione SPID, PEC e firma digitale."
        faqs={digitaliFAQs}
      />

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Non hai trovato la risposta che cercavi?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contattaci direttamente per ricevere assistenza personalizzata. Siamo a tua disposizione per rispondere a
            tutte le tue domande.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+390811234567"
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center justify-center"
            >
              <Phone size={18} className="mr-2" />
              Chiamaci
            </a>
            <a
              href="mailto:info@agservizi.it"
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center justify-center"
            >
              <Mail size={18} className="mr-2" />
              Scrivici
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

