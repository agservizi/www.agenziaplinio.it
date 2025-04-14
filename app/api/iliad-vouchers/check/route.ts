import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Verifica se la tabella esiste
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'iliad_vouchers'
      );
    `

    if (!tableExists[0].exists) {
      return NextResponse.json({
        success: false,
        message: "La tabella iliad_vouchers non esiste",
      })
    }

    // Ottieni la struttura della tabella
    const tableStructure = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'iliad_vouchers';
    `

    // Ottieni alcuni voucher di esempio
    const vouchers = await sql`
      SELECT * FROM iliad_vouchers LIMIT 10;
    `

    // Verifica se ci sono altre tabelle correlate ai voucher
    const relatedTables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name LIKE '%voucher%' OR table_name LIKE '%iliad%';
    `

    return NextResponse.json({
      success: true,
      tableStructure,
      vouchers,
      relatedTables,
    })
  } catch (error) {
    console.error("Errore durante la verifica dei voucher:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Si è verificato un errore durante la verifica dei voucher",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
