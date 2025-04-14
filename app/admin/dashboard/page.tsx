"use client"

import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { it } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const { toast } = useToast()
  const [bookings, setBookings] = useState<any[]>([])
  const [blockedDates, setBlockedDates] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Fetch bookings
      const bookingsResponse = await fetch("/api/bookings")
      const bookingsData = await bookingsResponse.json()
      setBookings(bookingsData)

      // Fetch blocked dates
      const blockedDatesResponse = await fetch("/api/admin/blocked-dates")
      const blockedDatesData = await blockedDatesResponse.json()
      setBlockedDates(blockedDatesData)

      // Fetch stats
      const statsResponse = await fetch("/api/admin/stats")
      const statsData = await statsResponse.json()
      setStats(statsData)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Errore",
        description: "Impossibile caricare i dati. Riprova più tardi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBlockDate = async () => {
    if (!selectedDate) return

    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      const response = await fetch("/api/admin/blocked-dates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blockedDate: formattedDate,
          reason: "Blocked by admin",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to block date")
      }

      toast({
        title: "Data Bloccata",
        description: `La data ${format(selectedDate, "dd/MM/yyyy", { locale: it })} è stata bloccata con successo.`,
      })

      // Refresh data
      fetchData()
    } catch (error) {
      console.error("Error blocking date:", error)
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Impossibile bloccare la data. Riprova più tardi.",
        variant: "destructive",
      })
    }
  }

  const handleUnblockDate = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/blocked-dates/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to unblock date")
      }

      toast({
        title: "Data Sbloccata",
        description: "La data è stata sbloccata con successo.",
      })

      // Refresh data
      fetchData()
    } catch (error) {
      console.error("Error unblocking date:", error)
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Impossibile sbloccare la data. Riprova più tardi.",
        variant: "destructive",
      })
    }
  }

  const handleCancelBooking = async (id: number) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to cancel booking")
      }

      toast({
        title: "Prenotazione Cancellata",
        description: "La prenotazione è stata cancellata con successo.",
      })

      // Refresh data
      fetchData()
    } catch (error) {
      console.error("Error cancelling booking:", error)
      toast({
        title: "Errore",
        description:
          error instanceof Error ? error.message : "Impossibile cancellare la prenotazione. Riprova più tardi.",
        variant: "destructive",
      })
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "dd/MM/yyyy", { locale: it })
  }

  // Format time for display
  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5) // Extract HH:MM from HH:MM:SS
  }

  // Get bookings for selected date
  const getBookingsForSelectedDate = () => {
    if (!selectedDate) return []

    const formattedDate = format(selectedDate, "yyyy-MM-dd")
    return bookings.filter((booking) => booking.bookingDate === formattedDate)
  }

  // Check if selected date is blocked
  const isSelectedDateBlocked = () => {
    if (!selectedDate) return false

    const formattedDate = format(selectedDate, "yyyy-MM-dd")
    return blockedDates.some((date) => date.blockedDate === formattedDate)
  }

  // Get blocked date ID for selected date
  const getBlockedDateId = () => {
    if (!selectedDate) return null

    const formattedDate = format(selectedDate, "yyyy-MM-dd")
    const blockedDate = blockedDates.find((date) => date.blockedDate === formattedDate)
    return blockedDate ? blockedDate.id : null
  }

  return (
    <div className="pt-24 page-transition">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Dashboard Amministratore</h1>

        <Tabs defaultValue="calendar">
          <TabsList className="mb-6">
            <TabsTrigger value="calendar">Calendario</TabsTrigger>
            <TabsTrigger value="bookings">Prenotazioni</TabsTrigger>
            <TabsTrigger value="blocked-dates">Date Bloccate</TabsTrigger>
            <TabsTrigger value="stats">Statistiche</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Calendario Prenotazioni</CardTitle>
                    <CardDescription>Seleziona una data per visualizzare o gestire le prenotazioni</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      locale={it}
                      weekStartsOn={1} // Monday
                      className="rounded-md border"
                    />

                    <div className="mt-4 flex justify-between">
                      {isSelectedDateBlocked() ? (
                        <Button variant="outline" onClick={() => handleUnblockDate(getBlockedDateId()!)}>
                          Sblocca Data
                        </Button>
                      ) : (
                        <Button variant="outline" onClick={handleBlockDate}>
                          Blocca Data
                        </Button>
                      )}

                      <Button onClick={fetchData}>Aggiorna</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Prenotazioni per{" "}
                      {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: it }) : "la data selezionata"}
                    </CardTitle>
                    <CardDescription>
                      {isSelectedDateBlocked() ? (
                        <span className="text-red-500">Questa data è bloccata</span>
                      ) : (
                        `${getBookingsForSelectedDate().length} prenotazioni`
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {getBookingsForSelectedDate().length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ora</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Stato</TableHead>
                            <TableHead>Azioni</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getBookingsForSelectedDate().map((booking) => (
                            <TableRow key={booking.id}>
                              <TableCell>{formatTime(booking.bookingTime)}</TableCell>
                              <TableCell>{booking.customerName}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    booking.status === "confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : booking.status === "cancelled"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {booking.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                {booking.status !== "cancelled" && (
                                  <Button variant="ghost" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                                    Cancella
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-4 text-gray-500">Nessuna prenotazione per questa data</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Tutte le Prenotazioni</CardTitle>
                <CardDescription>Elenco completo delle prenotazioni</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4">Caricamento in corso...</div>
                ) : bookings.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ora</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefono</TableHead>
                        <TableHead>Servizio</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead>Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.id}</TableCell>
                          <TableCell>{formatDate(booking.bookingDate)}</TableCell>
                          <TableCell>{formatTime(booking.bookingTime)}</TableCell>
                          <TableCell>{booking.customerName}</TableCell>
                          <TableCell>{booking.email}</TableCell>
                          <TableCell>{booking.phone}</TableCell>
                          <TableCell>{booking.service || "-"}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {booking.status !== "cancelled" && (
                              <Button variant="ghost" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                                Cancella
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4 text-gray-500">Nessuna prenotazione trovata</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blocked-dates">
            <Card>
              <CardHeader>
                <CardTitle>Date Bloccate</CardTitle>
                <CardDescription>Gestisci le date in cui non è possibile prenotare</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4">Caricamento in corso...</div>
                ) : blockedDates.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Motivo</TableHead>
                        <TableHead>Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blockedDates.map((date) => (
                        <TableRow key={date.id}>
                          <TableCell>{date.id}</TableCell>
                          <TableCell>{formatDate(date.blockedDate)}</TableCell>
                          <TableCell>{date.reason || "-"}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleUnblockDate(date.id)}>
                              Sblocca
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4 text-gray-500">Nessuna data bloccata</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Prenotazioni Totali</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats ? stats.totalBookings : "-"}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Prenotazioni Questo Mese</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats ? stats.currentMonthBookings : "-"}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Prenotazioni Mese Scorso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats ? stats.previousMonthBookings : "-"}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Tasso di Cancellazione</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats ? `${stats.cancellationRate.toFixed(1)}%` : "-"}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prenotazioni per Stato</CardTitle>
                </CardHeader>
                <CardContent>
                  {stats && stats.bookingsByStatus ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Stato</TableHead>
                          <TableHead>Numero</TableHead>
                          <TableHead>Percentuale</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stats.bookingsByStatus.map((item: any) => (
                          <TableRow key={item.status}>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  item.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : item.status === "cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {item.status}
                              </span>
                            </TableCell>
                            <TableCell>{item.count}</TableCell>
                            <TableCell>{((item.count / stats.totalBookings) * 100).toFixed(1)}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-4 text-gray-500">Nessun dato disponibile</div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prenotazioni per Giorno della Settimana</CardTitle>
                </CardHeader>
                <CardContent>
                  {stats && stats.bookingsByDayOfWeek ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Giorno</TableHead>
                          <TableHead>Numero</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stats.bookingsByDayOfWeek.map((item: any) => {
                          const dayNames = [
                            "Domenica",
                            "Lunedì",
                            "Martedì",
                            "Mercoledì",
                            "Giovedì",
                            "Venerdì",
                            "Sabato",
                          ]
                          return (
                            <TableRow key={item.dayOfWeek}>
                              <TableCell>{dayNames[item.dayOfWeek]}</TableCell>
                              <TableCell>{item.count}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-4 text-gray-500">Nessun dato disponibile</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

