import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const placeId = searchParams.get("placeId") || process.env.GOOGLE_PLACE_ID

  if (!placeId) {
    return NextResponse.json({ error: "Place ID is required" }, { status: 400 })
  }

  try {
    // Qui possiamo fare una richiesta a Google Maps API usando la chiave API dal server
    // Per questo esempio, restituiamo solo le coordinate di default
    const mapData = {
      name: "AG Servizi",
      location: { lat: 40.6954, lng: 14.4694 },
      address: "Via Plinio 72, Castellammare di Stabia",
    }

    return NextResponse.json(mapData)
  } catch (error) {
    console.error("Error fetching map data:", error)
    return NextResponse.json({ error: "Failed to fetch map data" }, { status: 500 })
  }
}
