import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const origin = searchParams.get("origin")
    const destination = searchParams.get("destination")
    const mode = searchParams.get("mode") || "driving"

    if (!origin || !destination) {
      return NextResponse.json({ error: "Origin and destination parameters are required" }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Google API key is not configured" }, { status: 500 })
    }

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
      origin,
    )}&destination=${encodeURIComponent(destination)}&mode=${mode}&language=it&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching directions:", error)
    return NextResponse.json({ error: "Failed to fetch directions" }, { status: 500 })
  }
}
