import { Resend } from "resend"
import { format, parseISO } from "date-fns"
import { it } from "date-fns/locale"

// Inizializza Resend con la tua API key
const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailParams {
  to: string
  subject: string
  html: string
  from?: string
  replyTo?: string
  attachments?: Array<{
    filename: string
    content: Buffer
  }>
}

export async function sendEmail({
  to,
  subject,
  html,
  from = "AG Servizi <info@agenziaplinio.it>",
  replyTo = "info@agserviziaplinio.it",
  attachments = [],
}: SendEmailParams) {
  try {
    console.log(`Tentativo di invio email a: ${to}`)

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      reply_to: replyTo,
      attachments,
    })

    if (error) {
      console.error("Errore nell'invio dell'email:", error)
      return { success: false, error }
    }

    console.log("Email inviata con successo:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Errore nell'invio dell'email:", error)
    return { success: false, error }
  }
}

interface Prenotazione {
  id: number
  nome_cliente: string
  email_cliente: string
  telefono_cliente?: string
  data_prenotazione: string
  ora_prenotazione: string
  servizio?: string
  stato: string
  note?: string
  created_at?: string
}

export function generatePrenotazioneEmailHtml(prenotazione: Prenotazione, cancellationToken?: string) {
  // Formatta la data in italiano
  const dataFormattata = format(parseISO(prenotazione.data_prenotazione), "EEEE d MMMM yyyy", { locale: it })

  // Capitalizza la prima lettera del giorno
  const dataCapitalizzata = dataFormattata.charAt(0).toUpperCase() + dataFormattata.slice(1)

  // Crea l'URL di cancellazione se è fornito un token
  const cancellationUrl = cancellationToken
    ? `${process.env.NEXT_PUBLIC_BASE_URL || "https://agservizi.it"}/cancella-prenotazione?token=${cancellationToken}`
    : ""

  // Genera un ID univoco per Google Calendar
  const calendarEventId = `prenotazione-${prenotazione.id}-${Date.now()}`

  // Crea la data di inizio e fine per Google Calendar (assumendo che ogni appuntamento duri 30 minuti)
  const startDate = `${prenotazione.data_prenotazione}T${prenotazione.ora_prenotazione}:00`
  const endDateTime = new Date(startDate)
  endDateTime.setMinutes(endDateTime.getMinutes() + 30)
  const endDate = endDateTime.toISOString().replace(/\.\d{3}Z$/, "Z")

  // Crea l'URL per aggiungere l'evento a Google Calendar
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Appuntamento AG Servizi - ${prenotazione.servizio || "Servizio generico"}`)}&dates=${startDate.replace(/[-:]/g, "")}/${endDate.replace(/[-:]/g, "")}&details=${encodeURIComponent(`Appuntamento presso AG Servizi\nServizio: ${prenotazione.servizio || "Non specificato"}\nNote: ${prenotazione.note || "Nessuna nota"}\n\nPer qualsiasi informazione contattare: info@agservizi.it`)}&location=${encodeURIComponent("Via Plinio 72, Milano")}&sf=true&output=xml`

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Conferma Prenotazione</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0;
            background-color: #f9f9f9;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header { 
            background-color: #4f46e5; 
            color: white; 
            padding: 24px; 
            text-align: center; 
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .content { 
            padding: 32px 24px; 
          }
          .details {
            background-color: #f3f4f6;
            border-radius: 8px;
            padding: 16px;
            margin: 24px 0;
          }
          .details-row {
            display: flex;
            margin-bottom: 8px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 8px;
          }
          .details-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          .details-label {
            font-weight: 600;
            width: 120px;
            color: #4b5563;
          }
          .details-value {
            flex: 1;
          }
          .button {
            display: inline-block;
            background-color: #4f46e5;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: 500;
            margin-right: 12px;
            margin-bottom: 12px;
          }
          .button-secondary {
            background-color: #9ca3af;
          }
          .button-danger {
            background-color: #ef4444;
          }
          .footer { 
            text-align: center; 
            margin-top: 32px; 
            padding: 24px;
            background-color: #f3f4f6;
            color: #6b7280;
            font-size: 14px;
          }
          .social-links {
            margin-top: 16px;
          }
          .social-link {
            display: inline-block;
            margin: 0 8px;
            color: #4f46e5;
            text-decoration: none;
          }
          @media (max-width: 600px) {
            .details-row {
              flex-direction: column;
            }
            .details-label {
              width: 100%;
              margin-bottom: 4px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Conferma Prenotazione</h1>
          </div>
          <div class="content">
            <p>Gentile <strong>${prenotazione.nome_cliente}</strong>,</p>
            <p>La sua prenotazione è stata confermata con i seguenti dettagli:</p>
            
            <div class="details">
              <div class="details-row">
                <div class="details-label">Data:</div>
                <div class="details-value">${dataCapitalizzata}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Ora:</div>
                <div class="details-value">${prenotazione.ora_prenotazione}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Servizio:</div>
                <div class="details-value">${prenotazione.servizio || "Non specificato"}</div>
              </div>
              ${
                prenotazione.note
                  ? `
              <div class="details-row">
                <div class="details-label">Note:</div>
                <div class="details-value">${prenotazione.note}</div>
              </div>
              `
                  : ""
              }
              <div class="details-row">
                <div class="details-label">Indirizzo:</div>
                <div class="details-value">Via Plinio 72, Milano</div>
              </div>
            </div>
            
            <p>Può aggiungere questo appuntamento al suo calendario:</p>
            
            <p>
              <a href="${googleCalendarUrl}" class="button" target="_blank" rel="noopener noreferrer">
                Aggiungi a Google Calendar
              </a>
            </p>
            
            ${
              cancellationUrl
                ? `
            <p>Se desidera annullare o modificare la sua prenotazione, può farlo cliccando sul seguente link:</p>
            
            <p>
              <a href="${cancellationUrl}" class="button button-danger" target="_blank" rel="noopener noreferrer">
                Annulla Prenotazione
              </a>
            </p>
            `
                : ""
            }
            
            <p>Per qualsiasi informazione o modifica, non esiti a contattarci:</p>
            <p>
              <strong>Email:</strong> info@agservizi.it<br>
              <strong>Telefono:</strong> 02 1234567
            </p>
            
            <p>Cordiali saluti,<br>AG Servizi</p>
          </div>
          <div class="footer">
            <p>&copy; {new Date().getFullYear()} AG Servizi. Tutti i diritti riservati.</p>
            <div class="social-links">
              <a href="#" class="social-link">Facebook</a>
              <a href="#" class="social-link">Instagram</a>
              <a href="#" class="social-link">LinkedIn</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function sendAdminNotification(prenotazione: Prenotazione) {
  try {
    const html = `
      <p>Nuova prenotazione ricevuta:</p>
      <ul>
        <li>Nome: ${prenotazione.nome_cliente}</li>
        <li>Email: ${prenotazione.email_cliente}</li>
        <li>Data: ${prenotazione.data_prenotazione}</li>
        <li>Ora: ${prenotazione.ora_prenotazione}</li>
        <li>Servizio: ${prenotazione.servizio || "Non specificato"}</li>
      </ul>
      <p>Accedi alla dashboard per maggiori dettagli.</p>
    `

    const { data, error } = await resend.emails.send({
      from: "AG Servizi <info@agenziaplinio.it>",
      to: "info@agenziaplinio.it", // TODO: Cambiare con l'email dell'admin
      subject: "Nuova Prenotazione Ricevuta",
      html: html,
    })

    if (error) {
      console.error("Errore nell'invio dell'email di notifica all'admin:", error)
      return { success: false, error }
    }

    console.log("Email di notifica all'admin inviata con successo:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Errore durante l'invio dell'email di notifica all'admin:", error)
    return { success: false, error }
  }
}

