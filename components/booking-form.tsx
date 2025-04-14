"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format, addMonths, startOfMonth, endOfMonth, isSameDay, parseISO } from "date-fns"
import { it } from "date-fns/locale"
import { CalendarIcon, Clock, AlertTriangle, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

// Define the form schema with Zod
const formSchema = z.object({
  customerName: z.string().min(3, {
    message: "Il nome deve contenere almeno 3 caratteri",
  }),
  email: z.string().email({
    message: "Inserisci un indirizzo email valido",
  }),
  phone: z.string().min(5, {
    message: "Inserisci un numero di telefono valido",
  }),
  bookingDate: z.date({
    required_error: "Seleziona una data per la prenotazione",
  }),
  bookingTime: z.string({
    required_error: "Seleziona un orario per la prenotazione",
  }),
  service: z.string().optional(),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

// Define available services
const availableServices = [
  { id: "pagamenti", label: "Pagamenti" },
  { id: "spedizioni", label: "Spedizioni" },
  { id: "trust-provider", label: "Trust Provider (SPID, PEC, Firma Digitale)" },
  { id: "caf-patronato", label: "CAF e Patronato" },
  { id: "visure", label: "Visure" },
  { id: "telefonia-luce-gas", label: "Telefonia, Luce e Gas" },
  { id: "servizi-postali", label: "Servizi Postali" },
  { id: "servizio-foto", label: "Servizio Foto" },
  { id: "altro", label: "Altro" },
]

type BookingFormProps = {
  onSuccess?: () => void
}

// Interface for simplified availability
interface SimplifiedAvailability {
  date: string
  available: boolean
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableTimes, setAvailableTimes] = useState<{ time: string; available: boolean; reason?: string }[]>([])
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([])
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false)
  const [cachedAvailability, setCachedAvailability] = useState<
    Record<string, { time: string; available: boolean; reason?: string }[]>
  >({})
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date())
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const fetchControllerRef = useRef<AbortController | null>(null)

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      service: "",
      notes: "",
    },
  })

  // Watch for date changes to fetch available times
  const selectedDate = form.watch("bookingDate")

  // Load current week availability on initial load
  useEffect(() => {
    if (isInitialLoad) {
      loadCurrentWeekAvailability()
      setIsInitialLoad(false)
    }
  }, [isInitialLoad])

  // Load availability for the current week
  const loadCurrentWeekAvailability = async () => {
    setIsLoadingCalendar(true)

    try {
      const response = await fetch(`/api/availability?currentWeek=true`)

      if (!response.ok) {
        throw new Error("Failed to fetch current week availability")
      }

      const data: SimplifiedAvailability[] = await response.json()

      const availableDatesArray: Date[] = []
      const unavailableDatesArray: Date[] = []

      data.forEach((dayData) => {
        const date = parseISO(dayData.date)

        if (dayData.available) {
          availableDatesArray.push(date)
        } else {
          unavailableDatesArray.push(date)
        }
      })

      setAvailableDates(availableDatesArray)
      setUnavailableDates(unavailableDatesArray)
    } catch (error) {
      console.error("Error loading current week availability:", error)
    } finally {
      setIsLoadingCalendar(false)
    }
  }

  // Pre-load availability for the current month
  const preloadMonthAvailability = useCallback(async (month: Date) => {
    setIsLoadingCalendar(true)

    try {
      const startDate = format(startOfMonth(month), "yyyy-MM-dd")
      const endDate = format(endOfMonth(month), "yyyy-MM-dd")

      const response = await fetch(`/api/availability?startDate=${startDate}&endDate=${endDate}&simplified=true`)

      if (!response.ok) {
        throw new Error("Failed to fetch month availability")
      }

      const data: SimplifiedAvailability[] = await response.json()

      const availableDatesArray: Date[] = []
      const unavailableDatesArray: Date[] = []

      data.forEach((dayData) => {
        const date = parseISO(dayData.date)

        if (dayData.available) {
          availableDatesArray.push(date)
        } else {
          unavailableDatesArray.push(date)
        }
      })

      setAvailableDates((prev) => {
        // Filter out dates from the current month to avoid duplicates
        const filtered = prev.filter((d) => {
          const monthStart = startOfMonth(month)
          const monthEnd = endOfMonth(month)
          return d < monthStart || d > monthEnd
        })
        return [...filtered, ...availableDatesArray]
      })

      setUnavailableDates((prev) => {
        // Filter out dates from the current month to avoid duplicates
        const filtered = prev.filter((d) => {
          const monthStart = startOfMonth(month)
          const monthEnd = endOfMonth(month)
          return d < monthStart || d > monthEnd
        })
        return [...filtered, ...unavailableDatesArray]
      })
    } catch (error) {
      console.error("Error preloading month availability:", error)
    } finally {
      setIsLoadingCalendar(false)
    }
  }, [])

  // Load initial month data when component mounts
  useEffect(() => {
    // We don't need to load the entire month on initial load
    // since we're already loading the current week
    if (!isInitialLoad) {
      preloadMonthAvailability(calendarMonth)
    }
  }, [preloadMonthAvailability, calendarMonth, isInitialLoad])

  // Handle month change in calendar
  const handleMonthChange = (month: Date) => {
    setCalendarMonth(month)
    preloadMonthAvailability(month)
  }

  // Fetch available times for the selected date
  const fetchAvailableTimes = async (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd")

    // Check if the availability is already cached
    if (cachedAvailability[formattedDate]) {
      setAvailableTimes(cachedAvailability[formattedDate])
      return
    }

    setIsCheckingAvailability(true)
    setFetchError(null)

    // Cancel any previous fetch request
    if (fetchControllerRef.current) {
      fetchControllerRef.current.abort()
    }

    // Create a new AbortController for this fetch request
    fetchControllerRef.current = new AbortController()

    try {
      const response = await fetch(`/api/availability?date=${formattedDate}`, {
        headers: {
          Accept: "application/json",
        },
        signal: fetchControllerRef.current.signal,
      })

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error response:", errorText)
        throw new Error(`Server error: ${response.status} ${response.statusText}`)
      }

      // Try to parse JSON
      let data
      try {
        data = await response.json()
      } catch (e) {
        console.error("Error parsing JSON:", e)
        throw new Error("Invalid response format")
      }

      // Check if data has the expected structure
      if (!data || !Array.isArray(data.timeSlots)) {
        console.error("Unexpected data structure:", data)
        throw new Error("Unexpected response format")
      }

      const timeSlots = data.timeSlots || []
      setAvailableTimes(timeSlots)

      // Cache the availability for this date
      setCachedAvailability((prev) => ({
        ...prev,
        [formattedDate]: timeSlots,
      }))

      // Update available/unavailable dates based on the detailed response
      if (timeSlots.some((slot: { available: boolean }) => slot.available)) {
        setAvailableDates((prev) => {
          const newDate = new Date(date)
          newDate.setHours(0, 0, 0, 0)
          if (!prev.some((d) => isSameDay(d, newDate))) {
            return [...prev, newDate]
          }
          return prev
        })
      } else {
        setUnavailableDates((prev) => {
          const newDate = new Date(date)
          newDate.setHours(0, 0, 0, 0)
          if (!prev.some((d) => isSameDay(d, newDate))) {
            return [...prev, newDate]
          }
          return prev
        })
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        // Request was aborted, do nothing
        return
      }
      console.error("Error fetching available times:", error)
      setFetchError(error instanceof Error ? error.message : "Errore sconosciuto")
      setAvailableTimes([])
    } finally {
      setIsCheckingAvailability(false)
    }
  }

  // Effect to fetch available times when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimes(selectedDate)
    }
  }, [selectedDate])

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // Format date for API
      const formattedDate = format(data.bookingDate, "yyyy-MM-dd")

      // Create booking
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          bookingDate: formattedDate,
          bookingTime: data.bookingTime,
          service: data.service,
          notes: data.notes,
        }),
      })

      // Check if response is ok
      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `Errore del server: ${response.status} ${response.statusText}`

        try {
          // Try to parse as JSON first
          const errorData = await response.json()
          if (errorData && errorData.error) {
            errorMessage = errorData.error
          }
        } catch (e) {
          // If JSON parsing fails, try to get text
          try {
            const errorText = await response.text()
            if (errorText) {
              errorMessage = `Errore: ${errorText.substring(0, 100)}${errorText.length > 100 ? "..." : ""}`
            }
          } catch (textError) {
            // If all fails, use the default error message
            console.error("Failed to parse error response:", textError)
          }
        }

        throw new Error(errorMessage)
      }

      // Try to parse the response as JSON
      let booking
      try {
        booking = await response.json()
      } catch (e) {
        console.error("Error parsing booking response:", e)
        throw new Error("Formato di risposta non valido dal server")
      }

      // Show success message
      setBookingSuccess(true)
      setBookingDetails({
        ...booking,
        formattedDate: format(new Date(booking.bookingDate), "dd/MM/yyyy", { locale: it }),
        formattedTime: booking.bookingTime,
      })

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }

      // Reset form
      form.reset()
    } catch (error) {
      console.error("Error creating booking:", error)
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Impossibile creare la prenotazione. Riprova più tardi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // If booking was successful, show success message
  if (bookingSuccess && bookingDetails) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Prenotazione Confermata!</h3>
        <p className="text-green-700 mb-4">
          Grazie {bookingDetails.customerName}, la tua prenotazione è stata confermata per il giorno{" "}
          {bookingDetails.formattedDate} alle ore {bookingDetails.formattedTime}.
        </p>
        <p className="text-green-700 mb-6">
          Abbiamo inviato una email di conferma all'indirizzo {bookingDetails.email} con tutti i dettagli.
        </p>
        <Button onClick={() => setBookingSuccess(false)}>Effettua una nuova prenotazione</Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fetchError && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Errore di connessione</AlertTitle>
            <AlertDescription>
              Si è verificato un errore durante il caricamento degli orari disponibili: {fetchError}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome e Cognome *</FormLabel>
                <FormControl>
                  <Input placeholder="Mario Rossi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="mario.rossi@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono *</FormLabel>
                <FormControl>
                  <Input placeholder="+39 123 456 7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem className="bg-white p-2 rounded-md">
                <FormLabel>Servizio</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Seleziona un servizio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border border-gray-200 shadow-md">
                    {availableServices.map((service) => (
                      <SelectItem key={service.id} value={service.id} className="hover:bg-gray-100">
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
            Quando vuoi venire?
          </h3>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="bookingDate"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-2">
                    <FormLabel>Data</FormLabel>
                    <div className="grid gap-2 relative">
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white",
                          !field.value && "text-muted-foreground",
                        )}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          const calendarElement = document.getElementById("booking-calendar")
                          if (calendarElement) {
                            calendarElement.style.display = calendarElement.style.display === "none" ? "block" : "none"
                          }
                        }}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy", { locale: it })
                        ) : (
                          <span>Seleziona una data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>

                      <div
                        id="booking-calendar"
                        className="border rounded-md p-3 bg-white shadow-md absolute top-full left-0 right-0 z-50"
                        style={{ display: "none" }}
                      >
                        {isLoadingCalendar && (
                          <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          </div>
                        )}
                        <div className="p-2 border-b border-gray-200 flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Seleziona una data</span>
                          {isLoadingCalendar && (
                            <span className="text-xs text-gray-500 flex items-center">
                              <Loader2 className="h-3 w-3 animate-spin mr-1" />
                              Caricamento...
                            </span>
                          )}
                        </div>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date)
                              // Nascondi il calendario dopo la selezione
                              const calendarElement = document.getElementById("booking-calendar")
                              if (calendarElement) {
                                calendarElement.style.display = "none"
                              }
                            }
                          }}
                          disabled={(date) => {
                            // Disable dates in the past
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)

                            // Check if the date is in unavailableDates
                            const isUnavailable = unavailableDates.some((d) => isSameDay(d, date))

                            return date < today || isUnavailable
                          }}
                          locale={it}
                          weekStartsOn={1} // Monday
                          className="w-full"
                          onMonthChange={handleMonthChange}
                          modifiers={{
                            available: availableDates,
                          }}
                          modifiersStyles={{
                            available: {
                              color: "#fff",
                              backgroundColor: "#4CAF50",
                            },
                          }}
                          fromMonth={new Date()}
                          toMonth={addMonths(new Date(), 3)}
                        />
                        <div className="p-2 border-t border-gray-200 mt-2">
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span>Date disponibili</span>
                          </div>
                          <div className="mt-2 flex justify-end">
                            <Button
                              size="sm"
                              onClick={() => {
                                const calendarElement = document.getElementById("booking-calendar")
                                if (calendarElement) {
                                  calendarElement.style.display = "none"
                                }
                              }}
                              className="text-xs"
                            >
                              Chiudi
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bookingTime"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-2">
                    <FormLabel>Orario</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedDate || isCheckingAvailability}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue
                            placeholder={
                              isCheckingAvailability
                                ? "Caricamento orari..."
                                : selectedDate
                                  ? "Seleziona un orario"
                                  : "Seleziona prima una data"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {isCheckingAvailability ? (
                          <div className="flex items-center justify-center py-2">
                            <Clock className="h-4 w-4 animate-spin mr-2" />
                            <span>Caricamento orari...</span>
                          </div>
                        ) : selectedDate && availableTimes.length > 0 ? (
                          // Usa un Set per rimuovere i duplicati
                          [...new Set(availableTimes.filter((slot) => slot.available).map((slot) => slot.time))].map(
                            (time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ),
                          )
                        ) : selectedDate ? (
                          <div className="p-2 text-center text-sm text-red-500">
                            Nessun orario disponibile per questa data
                          </div>
                        ) : (
                          <div className="p-2 text-center text-sm text-gray-500">Seleziona prima una data</div>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    {!isCheckingAvailability &&
                      selectedDate &&
                      availableTimes.length > 0 &&
                      !availableTimes.some((slot) => slot.available) && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Nessun orario disponibile</AlertTitle>
                          <AlertDescription>
                            Non ci sono orari disponibili per la data selezionata. Si prega di scegliere un'altra data.
                          </AlertDescription>
                        </Alert>
                      )}
                  </div>
                </FormItem>
              )}
            />

            {selectedDate && form.getValues().bookingTime && (
              <div className="mt-2 text-sm bg-white p-3 rounded-md border border-gray-200">
                <p className="font-medium">Riepilogo appuntamento:</p>
                <p>
                  {format(selectedDate, "EEEE d MMMM yyyy", { locale: it })} alle ore {form.getValues().bookingTime}
                </p>
              </div>
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Inserisci eventuali note o richieste particolari"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Massimo 500 caratteri</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Prenotazione in corso..." : "Prenota Appuntamento"}
        </Button>
      </form>
    </Form>
  )
}
