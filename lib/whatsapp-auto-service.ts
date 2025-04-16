/**
 * Servizio per l'invio automatico di messaggi WhatsApp tramite l'API WhatsApp Cloud
 */

// Costanti per l'API WhatsApp Cloud
const WHATSAPP_API_VERSION = "v18.0"
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN
const WHATSAPP_BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID

interface WhatsAppMessageParams {
  phoneNumber: string
  bookingCode: string
  customerName: string
  bookingDate: string
  bookingTime: string
  service?: string
}

/**
 * Invia un messaggio WhatsApp automaticamente tramite l'API WhatsApp Cloud
 *
 * @param params Parametri per il messaggio WhatsApp
 * @returns Risultato dell'invio del messaggio
 */
export async function sendWhatsAppMessage(
  params: WhatsAppMessageParams,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Verifica che le variabili d'ambiente necessarie siano configurate
    if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
      console.error("Configurazione WhatsApp mancante: WHATSAPP_PHONE_NUMBER_ID o WHATSAPP_ACCESS_TOKEN non impostati")
      return { success: false, error: "Configurazione WhatsApp mancante" }
    }

    // Formatta il numero di telefono (rimuovi caratteri non numerici e assicurati che inizi con il prefisso internazionale)
    const cleanPhoneNumber = params.phoneNumber.replace(/\D/g, "")
    const formattedNumber = cleanPhoneNumber.startsWith("39") ? cleanPhoneNumber : `39${cleanPhoneNumber}`

    // Crea il messaggio
    const messageText = `
*Conferma Prenotazione - AG SERVIZI*

Gentile ${params.customerName},
La tua prenotazione è stata confermata con i seguenti dettagli:

*Codice Prenotazione:* ${params.bookingCode}
*Data:* ${params.bookingDate}
*Ora:* ${params.bookingTime}
${params.service ? `*Servizio richiesto:* ${params.service}` : ""}

Presentati in agenzia con questo codice per completare la tua prenotazione.

*Indirizzo:* Via Plinio il Vecchio 72, Castellammare di Stabia
*Telefono:* +39 081 0584542
*Email:* info@agenziaplinio.it

Grazie per aver scelto AG SERVIZI!
`

    // Prepara il payload per l'API WhatsApp
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: formattedNumber,
      type: "text",
      text: {
        preview_url: false,
        body: messageText,
      },
    }

    // Invia la richiesta all'API WhatsApp Cloud
    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload),
      },
    )

    // Analizza la risposta
    const data = await response.json()

    if (!response.ok) {
      console.error("Errore nell'invio del messaggio WhatsApp:", data)
      return {
        success: false,
        error: `Errore nell'invio del messaggio WhatsApp: ${data.error?.message || "Errore sconosciuto"}`,
      }
    }

    // Restituisci il risultato positivo con l'ID del messaggio
    return {
      success: true,
      messageId: data.messages?.[0]?.id,
    }
  } catch (error) {
    console.error("Eccezione durante l'invio del messaggio WhatsApp:", error)
    return {
      success: false,
      error: `Eccezione durante l'invio del messaggio WhatsApp: ${error instanceof Error ? error.message : "Errore sconosciuto"}`,
    }
  }
}

/**
 * Verifica se un numero di telefono è valido per WhatsApp
 *
 * @param phoneNumber Numero di telefono da verificare
 * @returns true se il numero è valido, false altrimenti
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  // Rimuovi eventuali caratteri non numerici
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, "")

  // Verifica che il numero abbia almeno 10 cifre (numero italiano standard)
  return cleanPhoneNumber.length >= 10
}
