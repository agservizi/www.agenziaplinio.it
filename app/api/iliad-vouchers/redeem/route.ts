import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { code, iccid } = await request.json()
    console.log("Tentativo di riscatto voucher:", { code, iccid })

    if (!code || !iccid) {
      console.log("Errore: Codice voucher o ICCID mancante")
      return NextResponse.json(
        {
          success: false,
          message: "Codice voucher e ICCID sono obbligatori",
        },
        { status: 400 },
      )
    }

    // Verifica se la tabella esiste
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'iliad_vouchers'
      );
    `
    console.log("Tabella esiste:", tableExists[0].exists)

    // Se la tabella non esiste, restituisci un errore
    if (!tableExists[0].exists) {
      console.log("Errore: Tabella iliad_vouchers non esiste")
      return NextResponse.json(
        {
          success: false,
          message: "Sistema di voucher non inizializzato. Contattare l'amministratore.",
        },
        { status: 500 },
      )
    }

    // Verifica la struttura della tabella
    console.log("Verifico la struttura della tabella...")
    const tableStructure = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'iliad_vouchers';
    `
    console.log("Struttura tabella:", tableStructure)

    // Verifica se il voucher esiste
    console.log("Cerco il voucher con codice:", code)
    const voucher = await sql`
      SELECT * FROM iliad_vouchers WHERE code = ${code}
    `
    console.log("Risultato ricerca voucher:", voucher)

    if (voucher.length === 0) {
      console.log("Errore: Voucher non trovato")
      return NextResponse.json(
        {
          success: false,
          message: "Voucher non valido o inesistente",
        },
        { status: 404 },
      )
    }

    // Verifica se il voucher è già stato riscattato
    console.log("Stato riscatto voucher:", voucher[0].redeemed)
    if (voucher[0].redeemed) {
      console.log("Errore: Voucher già riscattato")
      return NextResponse.json(
        {
          success: false,
          message: "Questo voucher è già stato riscattato",
        },
        { status: 400 },
      )
    }

    // Riscatta il voucher
    console.log("Riscatto il voucher...")
    await sql`
      UPDATE iliad_vouchers 
      SET redeemed = TRUE, 
          iccid = ${iccid}, 
          redeemed_at = CURRENT_TIMESTAMP 
      WHERE code = ${code}
    `
    console.log("Voucher riscattato con successo")

    return NextResponse.json({
      success: true,
      message: "Voucher riscattato con successo",
    })
  } catch (error) {
    console.error("Errore durante il riscatto del voucher:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Si è verificato un errore durante il riscatto del voucher",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
