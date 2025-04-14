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

    // Se la tabella non esiste, restituisci 0
    if (!tableExists[0].exists) {
      return NextResponse.json({
        success: true,
        count: 0,
        tableExists: false,
      })
    }

    // Altrimenti, conta i voucher riscattati
    const result = await sql`
      SELECT COUNT(*) as count 
      FROM iliad_vouchers 
      WHERE redeemed = true
    `

    return NextResponse.json({
      success: true,
      count: Number.parseInt(result[0].count),
      tableExists: true,
    })
  } catch (error) {
    console.error("Errore durante il conteggio dei voucher:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Si è verificato un errore durante il conteggio dei voucher",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
