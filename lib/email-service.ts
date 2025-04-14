import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailData {
  bookingId: number
  customerName: string
  bookingDate: string
  bookingTime: string
  bookingDateWithDay: string
  service?: string
  cancellationToken: string
}

/**
 * Send booking confirmation email
 */
export async function sendConfirmationEmail(to: string, data: EmailData): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const cancellationUrl = `${baseUrl}/cancella-prenotazione?token=${data.cancellationToken}`

  // Create Google Calendar URL
  const startDate = new Date(`${data.bookingDate.split("/").reverse().join("-")}T${data.bookingTime}:00`)
  const endDate = new Date(startDate.getTime() + 30 * 60000) // Add 30 minutes

  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Appuntamento AG Servizi - ${data.service || "Servizio generico"}`)}&dates=${startDate
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z")}/${endDate
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(
      /\.\d{3}Z$/,
      "Z",
    )}&details=${encodeURIComponent(`Appuntamento presso AG Servizi\nServizio: ${data.service || "Non specificato"}\n\nPer qualsiasi informazione contattare: info@agservizi.it`)}&location=${encodeURIComponent("Via Plinio 72, Castellammare di Stabia")}&sf=true&output=xml`

  const html = `
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
            background-color: #1a4b8c; 
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
            background-color: #1a4b8c;
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
            color: #1a4b8c;
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
            <p>Gentile <strong>${data.customerName}</strong>,</p>
            <p>La sua prenotazione è stata confermata con i seguenti dettagli:</p>
            
            <div class="details">
              <div class="details-row">
                <div class="details-label">Data:</div>
                <div class="details-value">${data.bookingDateWithDay}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Ora:</div>
                <div class="details-value">${data.bookingTime}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Servizio:</div>
                <div class="details-value">${data.service || "Non specificato"}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Indirizzo:</div>
                <div class="details-value">Via Plinio 72, Castellammare di Stabia</div>
              </div>
            </div>
            
            <p>Può aggiungere questo appuntamento al suo calendario:</p>
            
            <p>
              <a href="${googleCalendarUrl}" class="button" target="_blank" rel="noopener noreferrer">
                Aggiungi a Google  class="button" target="_blank" rel="noopener noreferrer">
                Aggiungi a Google Calendar
              </a>
            </p>
            
            <p>Se desidera annullare o modificare la sua prenotazione, può farlo cliccando sul seguente link:</p>
            
            <p>
              <a href="${cancellationUrl}" class="button button-danger" target="_blank" rel="noopener noreferrer">
                Annulla Prenotazione
              </a>
            </p>
            
            <p>Per qualsiasi informazione o modifica, non esiti a contattarci:</p>
            <p>
              <strong>Email:</strong> info@agservizi.it<br>
              <strong>Telefono:</strong> +39 081 0584542
            </p>
            
            <p>Cordiali saluti,<br>AG Servizi</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} AG Servizi. Tutti i diritti riservati.</p>
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

  try {
    await resend.emails.send({
      from: "AG Servizi <info@agenziaplinio.it>",
      to: [to],
      subject: "Conferma Prenotazione - AG Servizi",
      html: html,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send confirmation email")
  }
}

/**
 * Send admin notification email
 */
export async function sendAdminNotification(booking: {
  id: number
  customerName: string
  email: string
  bookingDate: string
  bookingTime: string
  service?: string
}): Promise<void> {
  const html = `
    <h1>Nuova Prenotazione</h1>
    <p>È stata effettuata una nuova prenotazione:</p>
    <ul>
      <li><strong>ID:</strong> ${booking.id}</li>
      <li><strong>Nome:</strong> ${booking.customerName}</li>
      <li><strong>Email:</strong> ${booking.email}</li>
      <li><strong>Data:</strong> ${booking.bookingDate}</li>
      <li><strong>Ora:</strong> ${booking.bookingTime}</li>
      <li><strong>Servizio:</strong> ${booking.service || "Non specificato"}</li>
    </ul>
  `

  try {
    await resend.emails.send({
      from: "AG Servizi <info@agenziaplinio.it>",
      to: [process.env.ADMIN_EMAIL || "info@agenziaplinio.it"],
      subject: "Nuova Prenotazione - AG Servizi",
      html: html,
    })
  } catch (error) {
    console.error("Error sending admin notification:", error)
    // Don't throw here, as this is a notification and shouldn't block the booking process
  }
}

