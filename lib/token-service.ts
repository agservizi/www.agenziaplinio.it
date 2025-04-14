import { createHash, randomBytes } from "crypto"
import sql from "@/lib/db"

/**
 * Generate a secure token for booking cancellation
 */
export async function generateCancellationToken(bookingId: number): Promise<string> {
  // Generate a random token
  const token = randomBytes(32).toString("hex")

  // Hash the token for storage
  const hashedToken = createHash("sha256").update(token).digest("hex")

  // Store the token in the database (you would need to create this table)
  await sql`
    INSERT INTO cancellation_tokens (booking_id, token_hash, expires_at)
    VALUES (
      ${bookingId}, 
      ${hashedToken}, 
      NOW() + INTERVAL '7 days'
    )
  `

  // Return the unhashed token to be included in the cancellation link
  return token
}

/**
 * Verify a cancellation token
 */
export async function verifyCancellationToken(token: string): Promise<number | null> {
  // Hash the token for comparison
  const hashedToken = createHash("sha256").update(token).digest("hex")

  // Look up the token in the database
  const result = await sql`
    SELECT booking_id 
    FROM cancellation_tokens 
    WHERE token_hash = ${hashedToken}
    AND expires_at > NOW()
  `

  if (result.length === 0) {
    return null
  }

  return result[0].booking_id
}

/**
 * Invalidate a cancellation token after use
 */
export async function invalidateToken(token: string): Promise<boolean> {
  // Hash the token for comparison
  const hashedToken = createHash("sha256").update(token).digest("hex")

  // Delete the token from the database
  const result = await sql`
    DELETE FROM cancellation_tokens 
    WHERE token_hash = ${hashedToken}
  `

  return result.count > 0
}
