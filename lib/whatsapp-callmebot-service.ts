/**
 * Servizio per l'invio automatico di messaggi WhatsApp tramite Callmebot
 * https://www.callmebot.com/blog/free-api-whatsapp-messages/
 */

interface WhatsAppMessageParams {
  phoneNumber: string
  bookingCode: string
  customerName: string
  bookingDate: string
  bookingTime: string
  service?: string
}

interface ReminderMessageParams {
  bookingCode: string
  customerName: string
  bookingDate: string
  bookingTime: string
  service?: string
}

// Numero di telefono dell'agenzia per ricevere le notifiche
const AGENCY_PHONE = "393773798570"
// API key fornita da Callmebot
const CALLMEBOT_API_KEY = "9208549"

/**
 * Invia un messaggio WhatsApp automaticamente tramite Callmebot
 *
 * @param params Parametri per il messaggio WhatsApp
 * @returns Risultato dell'invio del messaggio
 */
export async function sendWhatsAppMessage(
  params: WhatsAppMessageParams,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  console.log("[WhatsApp] Inizio invio messaggio WhatsApp", {
    phoneNumber: params.phoneNumber,
    bookingCode: params.bookingCode,
  })

  try {
    // Formatta il numero di telefono (rimuovi caratteri non numerici e assicurati che inizi con il prefisso internazionale)
    const cleanPhoneNumber = params.phoneNumber.replace(/\D/g, "")
    const formattedNumber = cleanPhoneNumber.startsWith("39") ? cleanPhoneNumber : `39${cleanPhoneNumber}`

    console.log("[WhatsApp] Numero formattato:", formattedNumber)

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

    // Codifica il messaggio per l'URL
    const encodedMessage = encodeURIComponent(messageText)
    console.log("[WhatsApp] Messaggio codificato")

    // Usa direttamente l'API key hardcoded invece di prenderla dalle variabili d'ambiente
    const apiKey = CALLMEBOT_API_KEY
    console.log("[WhatsApp] API key:", apiKey)

    // Costruisci l'URL per la richiesta a Callmebot
    const url = `https://api.callmebot.com/whatsapp.php?phone=${AGENCY_PHONE}&text=${encodedMessage}&apikey=${apiKey}`
    console.log("[WhatsApp] URL creato (parziale):", url.substring(0, 100) + "...")

    // Invia la richiesta a Callmebot con timeout esteso
    console.log("[WhatsApp] Invio richiesta a Callmebot...")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 secondi di timeout

    try {
      const response = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: {
          Accept: "*/*",
          "User-Agent": "Mozilla/5.0 (compatible; AGServizi/1.0)",
        },
      })
      clearTimeout(timeoutId)

      console.log("[WhatsApp] Risposta ricevuta, status:", response.status)

      const responseText = await response.text()
      console.log("[WhatsApp] Testo risposta:", responseText)

      // Verifica la risposta
      if (!response.ok || responseText.includes("ERROR")) {
        console.error("[WhatsApp] Errore nella risposta di Callmebot:", responseText)
        return {
          success: false,
          error: `Errore nella risposta di Callmebot: ${responseText}`,
        }
      }

      console.log("[WhatsApp] Messaggio inviato con successo")

      // Restituisci il risultato positivo
      return {
        success: true,
        messageId: new Date().toISOString(), // Callmebot non fornisce un ID messaggio, usiamo un timestamp
      }
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error("[WhatsApp] Errore durante la fetch:", fetchError)
      return {
        success: false,
        error: `Errore durante la richiesta HTTP: ${
          fetchError instanceof Error ? fetchError.message : "Errore sconosciuto"
        }`,
      }
    }
  } catch (error) {
    console.error("[WhatsApp] Eccezione non gestita:", error)
    return {
      success: false,
      error: `Eccezione non gestita: ${error instanceof Error ? error.message : "Errore sconosciuto"}`,
    }
  }
}

/**
 * Invia un promemoria WhatsApp 1 ora prima dell'appuntamento
 */
export async function sendReminderMessage(
  params: ReminderMessageParams,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  console.log("[WhatsApp] Inizio invio promemoria WhatsApp", {
    bookingCode: params.bookingCode,
  })

  try {
    // Crea il messaggio di promemoria
    const messageText = `
*Promemoria Appuntamento - AG SERVIZI*

Gentile ${params.customerName},
Ti ricordiamo che hai un appuntamento tra un'ora:

*Codice Prenotazione:* ${params.bookingCode}
*Data:* ${params.bookingDate}
*Ora:* ${params.bookingTime}
${params.service ? `*Servizio richiesto:* ${params.service}` : ""}

*Indirizzo:* Via Plinio il Vecchio 72, Castellammare di Stabia

Ti aspettiamo!
`

    // Codifica il messaggio per l'URL
    const encodedMessage = encodeURIComponent(messageText)
    console.log("[WhatsApp] Promemoria codificato")

    // Usa direttamente l'API key hardcoded
    const apiKey = CALLMEBOT_API_KEY
    console.log("[WhatsApp] API key per promemoria:", apiKey)

    // Costruisci l'URL per la richiesta a Callmebot
    const url = `https://api.callmebot.com/whatsapp.php?phone=${AGENCY_PHONE}&text=${encodedMessage}&apikey=${apiKey}`
    console.log("[WhatsApp] URL promemoria creato (parziale):", url.substring(0, 100) + "...")

    // Invia la richiesta a Callmebot con timeout esteso
    console.log("[WhatsApp] Invio richiesta promemoria a Callmebot...")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 secondi di timeout

    try {
      const response = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: {
          Accept: "*/*",
          "User-Agent": "Mozilla/5.0 (compatible; AGServizi/1.0)",
        },
      })
      clearTimeout(timeoutId)

      console.log("[WhatsApp] Risposta promemoria ricevuta, status:", response.status)

      const responseText = await response.text()
      console.log("[WhatsApp] Testo risposta promemoria:", responseText)

      // Verifica la risposta
      if (!response.ok || responseText.includes("ERROR")) {
        console.error("[WhatsApp] Errore nella risposta di Callmebot per promemoria:", responseText)
        return {
          success: false,
          error: `Errore nella risposta di Callmebot per promemoria: ${responseText}`,
        }
      }

      console.log("[WhatsApp] Promemoria inviato con successo")

      // Restituisci il risultato positivo
      return {
        success: true,
        messageId: new Date().toISOString(),
      }
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error("[WhatsApp] Errore durante la fetch del promemoria:", fetchError)
      return {
        success: false,
        error: `Errore durante la richiesta HTTP per promemoria: ${
          fetchError instanceof Error ? fetchError.message : "Errore sconosciuto"
        }`,
      }
    }
  } catch (error) {
    console.error("[WhatsApp] Eccezione non gestita per promemoria:", error)
    return {
      success: false,
      error: `Eccezione non gestita per promemoria: ${error instanceof Error ? error.message : "Errore sconosciuto"}`,
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

/**
 * Pianifica un promemoria per un appuntamento
 *
 * @param bookingId ID della prenotazione
 * @param bookingDate Data dell'appuntamento
 * @param bookingTime Ora dell'appuntamento
 * @param customerName Nome del cliente
 * @param service Servizio richiesto
 */
export async function scheduleReminderMessage(
  bookingId: number,
  bookingDate: string,
  bookingTime: string,
  customerName: string,
  service?: string,
): Promise<void> {
  try {
    console.log(`[WhatsApp] Pianificazione promemoria per prenotazione ${bookingId}`)

    // Calcola quando inviare il promemoria (1 ora prima dell'appuntamento)
    const appointmentDateTime = new Date(`${bookingDate}T${bookingTime}:00`)
    const reminderTime = new Date(appointmentDateTime.getTime() - 60 * 60 * 1000) // 1 ora prima
    const currentTime = new Date()

    // Calcola il ritardo in millisecondi
    const delay = reminderTime.getTime() - currentTime.getTime()

    // Se il ritardo è negativo, l'appuntamento è già passato o è troppo vicino
    if (delay < 0) {
      console.log(
        `[WhatsApp] Appuntamento troppo vicino o già passato, promemoria non pianificato per la prenotazione ${bookingId}`,
      )
      return
    }

    console.log(
      `[WhatsApp] Promemoria pianificato per la prenotazione ${bookingId} tra ${Math.floor(delay / 60000)} minuti`,
    )

    // Pianifica l'invio del promemoria
    setTimeout(async () => {
      console.log(`[WhatsApp] Invio promemoria per la prenotazione ${bookingId}`)

      await sendReminderMessage({
        bookingCode: bookingId.toString(),
        customerName,
        bookingDate,
        bookingTime,
        service,
      })

      console.log(`[WhatsApp] Promemoria inviato per la prenotazione ${bookingId}`)
    }, delay)
  } catch (error) {
    console.error(`[WhatsApp] Errore nella pianificazione del promemoria per la prenotazione ${bookingId}:`, error)
  }
}

/**
 * Funzione di test per verificare direttamente la connessione a Callmebot
 */
export async function testCallmebotConnection(): Promise<{ success: boolean; message: string }> {
  console.log("[WhatsApp] Test connessione Callmebot")

  try {
    // Messaggio di test semplice
    const testMessage = "Test connessione da AG SERVIZI " + new Date().toISOString()
    const encodedMessage = encodeURIComponent(testMessage)

    // Usa direttamente l'API key hardcoded
    const apiKey = CALLMEBOT_API_KEY

    // URL di test diretto
    const url = `https://api.callmebot.com/whatsapp.php?phone=${AGENCY_PHONE}&text=${encodedMessage}&apikey=${apiKey}`

    console.log("[WhatsApp] Invio richiesta test a Callmebot...")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 secondi di timeout

    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: {
        Accept: "*/*",
        "User-Agent": "Mozilla/5.0 (compatible; AGServizi/1.0)",
      },
    })
    clearTimeout(timeoutId)

    console.log("[WhatsApp] Risposta test ricevuta, status:", response.status)

    const responseText = await response.text()
    console.log("[WhatsApp] Testo risposta test:", responseText)

    if (!response.ok || responseText.includes("ERROR")) {
      return {
        success: false,
        message: `Errore nella risposta di Callmebot: ${responseText}`,
      }
    }

    return {
      success: true,
      message: `Test completato con successo: ${responseText}`,
    }
  } catch (error) {
    console.error("[WhatsApp] Errore durante il test:", error)
    return {
      success: false,
      message: `Errore durante il test: ${error instanceof Error ? error.message : "Errore sconosciuto"}`,
    }
  }
}
