// Update the database connection to handle potential errors

import { neon } from "@neondatabase/serverless"

// Check if DATABASE_URL is defined and provide better error handling
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error("DATABASE_URL environment variable is not defined")
}

// Create the SQL client with error handling
export const sql = neon(connectionString || "")

// Export the sql client as default
export default sql
