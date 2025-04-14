"use client"

import { useState } from "react"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function CheckAvailability() {
  const [date, setDate] = useState<Date>()
  const [isChecking, setIsChecking] = useState(false)
  const [availability, setAvailability] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCheckAvailability = async () => {
    if (!date) return

    setIsChecking(true)
    setError(null)

    try {
      const formattedDate = format(date, "yyyy-MM-dd")
      const response = await fetch(`/api/availability?date=${formattedDate}`)

      if (!response.ok) {
        throw new Error("Failed to check availability")
      }

      const data = await response.json()
      setAvailability(data)
    } catch (error) {
      console.error("Error checking availability:", error)
      setError("Impossibile verificare la disponibilità. Riprova più tardi.")
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">Verifica Disponibilità</h3>

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Seleziona una data</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy", { locale: it }) : <span>Seleziona una data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => {
                  // Disable dates in the past
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  return date < today
                }}
                locale={it}
                weekStartsOn={1} // Monday
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button className="w-full" onClick={handleCheckAvailability} disabled={!date || isChecking}>
          {isChecking ? "Verifica in corso..." : "Verifica Disponibilità"}
        </Button>
      </div>

      {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

      {availability && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Disponibilità per il {format(date!, "dd/MM/yyyy", { locale: it })}:</h4>

          {availability.available ? (
            <>
              <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm mb-3">
                Ci sono orari disponibili per questa data!
              </div>

              <div className="grid grid-cols-2 gap-2">
                {availability.timeSlots
                  .filter((slot: any) => slot.available)
                  .map((slot: any, index: number) => (
                    <div key={index} className="text-center p-2 bg-gray-50 rounded-md text-sm">
                      {slot.time}
                    </div>
                  ))}
              </div>

              <div className="mt-4 text-center">
                <Link href="/prenota">
                  <Button>Prenota Ora</Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
              Non ci sono orari disponibili per questa data. Prova un'altra data.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

