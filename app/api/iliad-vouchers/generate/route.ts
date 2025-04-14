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

    // Se la tabella non esiste, creala
    if (!tableExists[0].exists) {
      await sql`
        CREATE TABLE iliad_vouchers (
          id SERIAL PRIMARY KEY,
          code VARCHAR(50) NOT NULL UNIQUE,
          iccid VARCHAR(50),
          redeemed BOOLEAN DEFAULT FALSE,
          redeemed_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `
    }

    // Verifica se il voucher esiste già
    const existingVoucher = await sql`
      SELECT * FROM iliad_vouchers WHERE code = ${code}
    `

    if (existingVoucher.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Questo codice voucher esiste già",
        },
        { status: 400 },
      )
    }

    // Inserisci il nuovo voucher
    await sql`
      INSERT INTO iliad_vouchers (code, redeemed) 
      VALUES (${code}, FALSE)
    `

    return NextResponse.json({
      success: true,
      message: "Voucher salvato con successo",
      code,
    })
  } catch (error) {
    console.error("Errore durante il salvataggio del voucher:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Si è verificato un errore durante il salvataggio del voucher",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
