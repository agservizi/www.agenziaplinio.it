// Modifica il file di connessione al database per una gestione più robusta degli errori
import { neon } from "@neondatabase/serverless"

// Verifica più robusta della connessione
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error("DATABASE_URL non definita - impossibile connettersi al database")
}

// Crea il client SQL con gestione degli errori
export const sql = neon(connectionString || "")

// Funzione di utilità per verificare la connessione
export async function testConnection() {
  try {
    const result = await sql`SELECT 1 as test`
    return result?.[0]?.test === 1
  } catch (error) {
    console.error("Errore di connessione al database:", error)
    return false
  }
}

// Esporta il client SQL come default
export default sql
