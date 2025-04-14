import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          message: "Codice voucher mancante",
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

    if (!tableExists[0].exists) {
      return NextResponse.json({
        success: false,
        message: "Sistema voucher non inizializzato",
        valid: false,
      })
    }

    // Verifica se il voucher esiste
    const voucher = await sql`
      SELECT * FROM iliad_vouchers WHERE code = ${code}
    `

    if (voucher.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Voucher non trovato",
        valid: false,
      })
    }

    return NextResponse.json({
      success: true,
      valid: true,
      redeemed: voucher[0].redeemed,
      voucher: voucher[0],
    })
  } catch (error) {
    console.error("Errore durante la verifica del voucher:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Si è verificato un errore durante la verifica del voucher",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
