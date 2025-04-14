import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST() {
  try {
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

      // Inserisci alcuni voucher di esempio per test
      await sql`
        INSERT INTO iliad_vouchers (code, redeemed) 
        VALUES 
          ('TEST123', FALSE),
          ('TEST456', FALSE),
          ('TEST789', TRUE)
        ON CONFLICT (code) DO NOTHING;
      `

      return NextResponse.json({
        success: true,
        message: "Tabella iliad_vouchers creata con successo",
      })
    }

    return NextResponse.json({
      success: true,
      message: "La tabella iliad_vouchers esiste già",
    })
  } catch (error) {
    console.error("Errore durante l'inizializzazione della tabella:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Si è verificato un errore durante l'inizializzazione della tabella",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
