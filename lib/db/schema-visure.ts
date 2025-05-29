import { sql } from "@/lib/db"

export async function createVisureSchema() {
  // Crea tabella per le richieste di visure
  await sql`
    CREATE TABLE IF NOT EXISTS visure_requests (
      id SERIAL PRIMARY KEY,
      tipo_visura VARCHAR(50) NOT NULL, -- catastale, camerale, crif, protestati
      sottotipo VARCHAR(50), -- per soggetto, per immobile, ordinaria, storica
      nome_richiedente VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      telefono VARCHAR(50) NOT NULL,
      codice_fiscale VARCHAR(16),
      partita_iva VARCHAR(11),
      dati_richiesta JSONB NOT NULL,
      stato VARCHAR(50) DEFAULT 'in attesa', -- in attesa, in elaborazione, completata, annullata
      note TEXT,
      documento_identita BOOLEAN DEFAULT false,
      data_richiesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      data_completamento TIMESTAMP
    );
  `

  // Crea tabella per i documenti delle visure
  await sql`
    CREATE TABLE IF NOT EXISTS visure_documents (
      id SERIAL PRIMARY KEY,
      visura_id INTEGER REFERENCES visure_requests(id) ON DELETE CASCADE,
      nome_file VARCHAR(255) NOT NULL,
      tipo_file VARCHAR(50) NOT NULL,
      url_file TEXT NOT NULL,
      data_caricamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  console.log("Schema visure creato con successo")
}
