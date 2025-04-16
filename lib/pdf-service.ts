import { jsPDF } from "jspdf"
import "jspdf-autotable"

/**
 * Genera un PDF con i dettagli della prenotazione
 *
 * @param bookingCode Codice della prenotazione
 * @param customerName Nome del cliente
 * @param bookingDate Data della prenotazione (formato italiano)
 * @param bookingTime Ora della prenotazione
 * @param service Servizio richiesto
 * @param logoUrl URL del logo dell'agenzia
 * @returns Buffer contenente il PDF generato
 */
export async function generateBookingPDF(
  bookingCode: string,
  customerName: string,
  bookingDate: string,
  bookingTime: string,
  service: string,
  logoUrl: string,
): Promise<Buffer> {
  // Crea un nuovo documento PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Aggiungi il logo
  try {
    // Carica l'immagine del logo
    const logoResponse = await fetch(logoUrl)
    const logoArrayBuffer = await logoResponse.arrayBuffer()
    const logoBase64 = Buffer.from(logoArrayBuffer).toString("base64")

    // Aggiungi il logo al PDF
    doc.addImage(`data:image/png;base64,${logoBase64}`, "PNG", 10, 10, 50, 25, undefined, "FAST")
  } catch (error) {
    console.error("Errore nel caricamento del logo:", error)
    // Continua senza logo in caso di errore
  }

  // Aggiungi il titolo
  doc.setFontSize(20)
  doc.setTextColor(79, 70, 229) // #4f46e5 in RGB
  doc.text("Conferma Prenotazione - AG SERVIZI", 105, 20, { align: "center" })

  // Aggiungi la data di generazione
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Generato il: ${new Date().toLocaleDateString("it-IT")}`, 105, 30, { align: "center" })

  // Aggiungi i dettagli della prenotazione
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(`Gentile ${customerName},`, 20, 50)
  doc.text("La tua prenotazione è stata confermata con i seguenti dettagli:", 20, 60)

  // Crea una tabella con i dettagli
  // @ts-ignore - jspdf-autotable estende jsPDF ma TypeScript non lo riconosce
  doc.autoTable({
    startY: 70,
    head: [["Dettaglio", "Valore"]],
    body: [
      ["Codice Prenotazione", bookingCode],
      ["Data", bookingDate],
      ["Ora", bookingTime],
      ["Servizio richiesto", service],
    ],
    headStyles: {
      fillColor: [79, 70, 229], // #4f46e5 in RGB
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [243, 244, 246], // #f3f4f6 in RGB
    },
    margin: { left: 20, right: 20 },
  })

  // Aggiungi le istruzioni
  const finalY = (doc as any).lastAutoTable.finalY || 130
  doc.text("Presentati in agenzia con questo codice per completare la tua prenotazione.", 20, finalY + 10)

  // Aggiungi i dati di contatto
  doc.setFillColor(238, 242, 255) // #eef2ff in RGB
  doc.rect(20, finalY + 20, 170, 40, "F")
  doc.setTextColor(0, 0, 0)
  doc.text("Indirizzo: Via Plinio il Vecchio 72, Castellammare di Stabia", 25, finalY + 30)
  doc.text("Telefono: +39 081 0584542", 25, finalY + 40)
  doc.text("Email: info@agenziaplinio.it", 25, finalY + 50)

  // Aggiungi il messaggio di ringraziamento
  doc.setTextColor(79, 70, 229) // #4f46e5 in RGB
  doc.setFontSize(14)
  doc.text("Grazie per aver scelto AG SERVIZI!", 105, finalY + 70, { align: "center" })

  // Aggiungi il footer
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`© ${new Date().getFullYear()} AG SERVIZI. Tutti i diritti riservati.`, 105, 280, { align: "center" })

  // Converti il PDF in Buffer
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"))
  return pdfBuffer
}
