import { type NextRequest, NextResponse } from "next/server"
import { createBooking, getBookings } from "@/lib/booking-service"
import { sendAdminNotification } from "@/lib/email-service"
import { formatDateItalian, formatTimeItalian } from "@/lib/date-utils"
import { testConnection } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    // Verifica la connessione al database
    const isConnected = await testConnection()
    if (!isConnected) {
      return NextResponse.json(
        {
          error: "Database connection error",
          message: "Unable to connect to the database. Please try again later.",
        },
        { status: 503 },
      )
    }

    const body = await request.json()

    // Validate required fields
    const requiredFields = ["customerName", "email", "phone", "bookingDate", "bookingTime"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create the booking
    const booking = await createBooking({
      customerName: body.customerName,
      email: body.email,
      phone: body.phone,
      bookingDate: body.bookingDate,
      bookingTime: body.bookingTime,
      service: body.service,
      notes: body.notes,
    })

    // Send admin notification
    try {
      await sendAdminNotification({
        id: booking.id,
        customerName: booking.customerName,
        email: booking.email,
        bookingDate: formatDateItalian(booking.bookingDate),
        bookingTime: formatTimeItalian(booking.bookingTime),
        service: booking.service,
      })
    } catch (emailError) {
      console.error("Error sending admin notification:", emailError)
      // Continue execution even if email fails
    }

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.startsWith("Cannot book:")) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
    }

    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verifica la connessione al database
    const isConnected = await testConnection()
    if (!isConnected) {
      return NextResponse.json(
        {
          error: "Database connection error",
          message: "Unable to connect to the database. Please try again later.",
        },
        { status: 503 },
      )
    }

    const searchParams = request.nextUrl.searchParams

    // Extract filter parameters
    const filters = {
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
      status: searchParams.get("status") || undefined,
      email: searchParams.get("email") || undefined,
    }

    // Get bookings with filters
    const bookings = await getBookings(filters)

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
