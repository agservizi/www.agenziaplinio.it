// Modifico l'esportazione per includere sql come esportazione nominata

import { neon } from "@neondatabase/serverless"

// Utilizziamo la variabile d'ambiente DATABASE_URL per la connessione
export const sql = neon(process.env.DATABASE_URL!)

export default sql
