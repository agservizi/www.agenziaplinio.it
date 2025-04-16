/**
 * Servizio per l'invio di messaggi WhatsApp
 */

/**
 * Genera un link WhatsApp per inviare un messaggio con i dettagli della prenotazione
 *
 * @param phoneNumber Numero di telefono del destinatario (formato internazionale senza +)
 * @param bookingCode Codice della prenotazione
 * @param customerName Nome del cliente
 * @param bookingDate Data della prenotazione (formato italiano)
 * @param bookingTime Ora della prenotazione
 * @param service Servizio richiesto
 * @returns URL per aprire WhatsApp con messaggio precompilato
 */
export function generateWhatsAppLink(
  phoneNumber: string,
  bookingCode: string,
  customerName: string,
  bookingDate: string,
  bookingTime: string,
  service: string,
): string {
  // Rimuovi eventuali caratteri non numerici dal numero di telefono
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, "")

  // Se il numero non inizia con il prefisso internazionale, aggiungi il prefisso italiano
  const formattedNumber = cleanPhoneNumber.startsWith("39") ? cleanPhoneNumber : `39${cleanPhoneNumber}`

  // Crea il messaggio
  const message = `
*Conferma Prenotazione - AG SERVIZI*

Gentile ${customerName},
La tua prenotazione è stata confermata con i seguenti dettagli:

*Codice Prenotazione:* ${bookingCode}
*Data:* ${bookingDate}
*Ora:* ${bookingTime}
*Servizio richiesto:* ${service}

Presentati in agenzia con questo codice per completare la tua prenotazione.

*Indirizzo:* Via Plinio il Vecchio 72, Castellammare di Stabia
*Telefono:* +39 081 0584542
*Email:* info@agenziaplinio.it

Grazie per aver scelto AG SERVIZI!
`

  // Codifica il messaggio per l'URL
  const encodedMessage = encodeURIComponent(message)

  // Genera il link WhatsApp
  return `https://wa.me/${formattedNumber}?text=${encodedMessage}`
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
