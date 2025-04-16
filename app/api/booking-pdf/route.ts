import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { sendEmail } from "@/lib/email"
import { generateWhatsAppLink, isValidPhoneNumber } from "@/lib/whatsapp-service"

export async function POST(request: NextRequest) {
  try {
    const { customerEmail, customerData } = await request.json()

    if (!customerEmail) {
      return NextResponse.json({ error: "Email cliente richiesta" }, { status: 400 })
    }

    // Genera un codice univoco per la prenotazione
    const bookingCode = uuidv4().substring(0, 8).toUpperCase()
    const bookingDate = new Date()

    // Formatta la data in italiano (GG/MM/YYYY)
    const formattedDate = `${bookingDate.getDate().toString().padStart(2, "0")}/${(bookingDate.getMonth() + 1).toString().padStart(2, "0")}/${bookingDate.getFullYear()}`
    const formattedTime = bookingDate.toLocaleTimeString("it-IT")

    // URL del logo da Vercel Blob
    const logoUrl = "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/logo-J1a5B8fGqtyHQ5NWXPClMRUZ4FVoB2.png"

    // Ottieni l'URL base dalla richiesta
    const baseUrl = request.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "https://www.agenziaplinio.it"

    // Genera l'URL per il download del PDF
    const pdfDownloadUrl = `${baseUrl}/api/booking-pdf/download?code=${bookingCode}&name=${encodeURIComponent(customerData.nome + " " + customerData.cognome)}&date=${encodeURIComponent(formattedDate)}&time=${encodeURIComponent(formattedTime)}&service=${encodeURIComponent(customerData.servizio || "")}`

    // Genera il link WhatsApp se il numero di telefono è valido
    let whatsappLink = null
    if (customerData.telefono && isValidPhoneNumber(customerData.telefono)) {
      whatsappLink = generateWhatsAppLink(
        customerData.telefono,
        bookingCode,
        customerData.nome + " " + customerData.cognome,
        formattedDate,
        formattedTime,
        customerData.servizio || "",
      )
    }

    // Invia l'email all'agenzia
    await sendAgencyEmail(bookingCode, bookingDate, customerData, logoUrl, pdfDownloadUrl)

    // Invia l'email al cliente
    await sendCustomerEmail(
      customerEmail,
      bookingCode,
      bookingDate,
      customerData,
      logoUrl,
      pdfDownloadUrl,
      whatsappLink,
    )

    return NextResponse.json({
      success: true,
      bookingCode,
      bookingDate: bookingDate.toISOString(),
      pdfUrl: pdfDownloadUrl,
      whatsappLink,
    })
  } catch (error) {
    console.error("Errore durante la generazione della prenotazione:", error)
    return NextResponse.json({ error: "Si è verificato un errore durante la prenotazione" }, { status: 500 })
  }
}

async function sendAgencyEmail(
  bookingCode: string,
  bookingDate: Date,
  customerData: any,
  logoUrl: string,
  pdfDownloadUrl: string,
) {
  // Formatta la data in italiano (GG/MM/YYYY)
  const formattedDate = `${bookingDate.getDate().toString().padStart(2, "0")}/${(bookingDate.getMonth() + 1).toString().padStart(2, "0")}/${bookingDate.getFullYear()}`
  const formattedTime = bookingDate.toLocaleTimeString("it-IT")

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuova Prenotazione</title>
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
          .logo {
            max-width: 180px;
            height: auto;
            margin-bottom: 16px;
            background-color: white;
            padding: 10px;
            border-radius: 8px;
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
            width: 150px;
            color: #4b5563;
          }
          .details-value {
            flex: 1;
          }
          .footer { 
            text-align: center; 
            margin-top: 32px; 
            padding: 24px;
            background-color: #f3f4f6;
            color: #6b7280;
            font-size: 14px;
          }
          .highlight {
            color: #4f46e5;
            font-weight: bold;
          }
          .button {
            display: inline-block;
            background-color: #4f46e5;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin-top: 16px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${logoUrl}" alt="AG SERVIZI Logo" class="logo" />
            <h1>Nuova Prenotazione</h1>
          </div>
          <div class="content">
            <p>È stata effettuata una nuova prenotazione con i seguenti dettagli:</p>
            
            <div class="details">
              <div class="details-row">
                <div class="details-label">Codice Prenotazione:</div>
                <div class="details-value highlight">${bookingCode}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Data:</div>
                <div class="details-value">${formattedDate}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Ora:</div>
                <div class="details-value">${formattedTime}</div>
              </div>
            </div>
            
            <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 8px;">Dati Cliente</h2>
            
            <div class="details">
              <div class="details-row">
                <div class="details-label">Nome:</div>
                <div class="details-value">${customerData.nome} ${customerData.cognome}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Email:</div>
                <div class="details-value">${customerData.email}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Telefono:</div>
                <div class="details-value">${customerData.telefono}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Servizio richiesto:</div>
                <div class="details-value highlight">${customerData.servizio}</div>
              </div>
              ${
                customerData.data
                  ? `
              <div class="details-row">
                <div class="details-label">Data preferita:</div>
                <div class="details-value">${customerData.data}</div>
              </div>`
                  : ""
              }
              ${
                customerData.ora
                  ? `
              <div class="details-row">
                <div class="details-label">Ora preferita:</div>
                <div class="details-value">${customerData.ora}</div>
              </div>`
                  : ""
              }
              ${
                customerData.messaggio
                  ? `
              <div class="details-row">
                <div class="details-label">Note aggiuntive:</div>
                <div class="details-value">${customerData.messaggio}</div>
              </div>`
                  : ""
              }
            </div>
            
            <p>Il cliente ha ricevuto il PDF con i dettagli della prenotazione.</p>
            
            <div style="text-align: center; margin-top: 24px;">
              <a href="${pdfDownloadUrl}" class="button" target="_blank">Scarica PDF</a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} AG SERVIZI. Tutti i diritti riservati.</p>
          </div>
        </div>
      </body>
    </html>
  `

  await sendEmail({
    to: "ag.servizi16@gmail.com",
    subject: `Nuova Prenotazione - ${bookingCode}`,
    html: html,
  })
}

async function sendCustomerEmail(
  customerEmail: string,
  bookingCode: string,
  bookingDate: Date,
  customerData: any,
  logoUrl: string,
  pdfDownloadUrl: string,
  whatsappLink: string | null,
) {
  // Formatta la data in italiano (GG/MM/YYYY)
  const formattedDate = `${bookingDate.getDate().toString().padStart(2, "0")}/${(bookingDate.getMonth() + 1).toString().padStart(2, "0")}/${bookingDate.getFullYear()}`
  const formattedTime = bookingDate.toLocaleTimeString("it-IT")

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
            background-color: #4f46e5; 
            color: white; 
            padding: 24px; 
            text-align: center; 
          }
          .logo {
            max-width: 180px;
            height: auto;
            margin-bottom: 16px;
            background-color: white;
            padding: 10px;
            border-radius: 8px;
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
            width: 150px;
            color: #4b5563;
          }
          .details-value {
            flex: 1;
          }
          .address-box {
            background-color: #eef2ff;
            border-left: 4px solid #4f46e5;
            padding: 16px;
            margin: 24px 0;
            border-radius: 4px;
          }
          .footer { 
            text-align: center; 
            margin-top: 32px; 
            padding: 24px;
            background-color: #f3f4f6;
            color: #6b7280;
            font-size: 14px;
          }
          .highlight {
            color: #4f46e5;
            font-weight: bold;
          }
          .thank-you {
            text-align: center;
            font-size: 18px;
            color: #4f46e5;
            margin-top: 32px;
            font-weight: bold;
          }
          .button {
            display: inline-block;
            background-color: #4f46e5;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin: 8px;
          }
          .whatsapp-button {
            display: inline-block;
            background-color: #25D366;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin: 8px;
          }
          .buttons-container {
            text-align: center;
            margin-top: 24px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${logoUrl}" alt="AG SERVIZI Logo" class="logo" />
            <h1>Conferma Prenotazione - AG SERVIZI</h1>
          </div>
          <div class="content">
            <p>Gentile <span class="highlight">${customerData.nome} ${customerData.cognome}</span>,</p>
            <p>La tua prenotazione è stata confermata con i seguenti dettagli:</p>
            
            <div class="details">
              <div class="details-row">
                <div class="details-label">Codice Prenotazione:</div>
                <div class="details-value highlight">${bookingCode}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Data:</div>
                <div class="details-value">${formattedDate}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Ora:</div>
                <div class="details-value">${formattedTime}</div>
              </div>
              <div class="details-row">
                <div class="details-label">Servizio richiesto:</div>
                <div class="details-value highlight">${customerData.servizio}</div>
              </div>
              ${
                customerData.data
                  ? `
              <div class="details-row">
                <div class="details-label">Data preferita:</div>
                <div class="details-value">${customerData.data}</div>
              </div>`
                  : ""
              }
              ${
                customerData.ora
                  ? `
              <div class="details-row">
                <div class="details-label">Ora preferita:</div>
                <div class="details-value">${customerData.ora}</div>
              </div>`
                  : ""
              }
            </div>
            
            <p>Presentati in agenzia con questo codice per completare la tua prenotazione.</p>
            
            <div class="address-box">
              <p><strong>Indirizzo:</strong> Via Plinio il Vecchio 72, Castellammare di Stabia</p>
              <p><strong>Telefono:</strong> +39 081 0584542</p>
              <p><strong>Email:</strong> info@agenziaplinio.it</p>
            </div>
            
            <div class="buttons-container">
              <a href="${pdfDownloadUrl}" class="button" target="_blank">Scarica PDF</a>
              ${whatsappLink ? `<a href="${whatsappLink}" class="whatsapp-button" target="_blank">Ricevi su WhatsApp</a>` : ""}
            </div>
            
            <p class="thank-you">Grazie per aver scelto AG SERVIZI!</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} AG SERVIZI. Tutti i diritti riservati.</p>
          </div>
        </div>
      </body>
    </html>
  `

  await sendEmail({
    to: customerEmail,
    subject: `Conferma Prenotazione - ${bookingCode}`,
    html: html,
  })
}
