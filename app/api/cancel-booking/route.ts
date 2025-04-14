import { type NextRequest, NextResponse } from "next/server"
import { verifyCancellationToken, invalidateToken } from "@/lib/token-service"
import { cancelBooking } from "@/lib/booking-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json({ error: "Missing cancellation token" }, { status: 400 })
    }

    // Verify the token and get the booking ID
    const bookingId = await verifyCancellationToken(token)

    if (!bookingId) {
      return NextResponse.json({ error: "Invalid or expired cancellation token" }, { status: 400 })
    }

    // Cancel the booking
    const booking = await cancelBooking(bookingId)

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Invalidate the token to prevent reuse
    await invalidateToken(token)

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    })
  } catch (error) {
    console.error("Error cancelling booking:", error)
    return NextResponse.json({ error: "Failed to cancel booking" }, { status: 500 })
  }
}

