"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Phone, Mail, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import ServiceSearch from "@/components/service-search"
import { BookingDialog } from "@/components/booking-dialog"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Funzione per chiudere il megamenu
  const closeMegaMenu = () => {
    setIsMegaMenuOpen(false)
  }

  return (
    <header className="fixed w-full z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <Phone size={14} className="mr-2" />
                <span>+39 081 0584542</span>
              </div>
              <div className="flex items-center">
                <Mail size={14} className="mr-2" />
                <span>info@agenziaplinio.it</span>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <Clock size={14} className="mr-2" />
                <span>Lun-Ven: 9:00-13:20, 16:00-19:20 Sab: 9:00-13:00</span>
              </div>
              <div className="flex items-center">
                <MapPin size={14} className="mr-2" />
                <span>Via Plinio il Vecchio 72, Castellammare di Stabia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`${isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 py-4"} transition-all duration-300`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/logo-J1a5B8fGqtyHQ5NWXPClMRUZ4FVoB2.png"
                alt="AG Servizi Logo"
                width={150}
                height={50}
                priority
                unoptimized
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              <Link
                href="/"
                className="text-gray-800 hover:text-primary font-medium px-3 py-2 rounded-md transition-colors"
              >
                Home
              </Link>
              <Link
                href="/chi-siamo"
                className="text-gray-800 hover:text-primary font-medium px-3 py-2 rounded-md transition-colors"
              >
                Chi Siamo
              </Link>

              {/* Mega Menu Trigger */}
              <div className="relative mega-menu-trigger group">
                <div className="flex items-center">
                  <Link
                    href="/servizi"
                    className="text-gray-800 hover:text-primary font-medium px-3 py-2 rounded-md transition-colors inline-flex items-center"
                  >
                    Servizi
                  </Link>
                  <button
                    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                    className="ml-1 focus:outline-none"
                    aria-label={isMegaMenuOpen ? "Chiudi menu servizi" : "Apri menu servizi"}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {/* Mega Menu */}
                {isMegaMenuOpen && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-screen max-w-4xl bg-white shadow-xl rounded-md overflow-hidden z-20 p-6 border-t-4 border-primary border border-primary/20">
                    <div className="grid grid-cols-3 gap-8">
                      <div>
                        <h3 className="text-lg font-bold mb-4 text-primary border-b pb-2">Servizi Finanziari</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/servizi/pagamenti"
                              className="text-gray-700 hover:text-primary transition-colors flex items-center"
                              onClick={closeMegaMenu}
                            >
                              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                              Pagamenti (Bollettini, F24, PagoPA)
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/servizi/biglietteria"
                              className="text-gray-700 hover:text-primary transition-colors flex items-center"
                              onClick={closeMegaMenu}
                            >
                              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                              Biglietteria
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-4 text-primary border-b pb-2">
                          Servizi Postali e Spedizioni
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/servizi/spedizioni"
                              className="text-gray-700 hover:text-primary transition-colors flex items-center"
                              onClick={closeMegaMenu}
                            >
                              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                              Spedizioni Nazionali e Internazionali
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/servizi/invio-posta"
                              className="text-gray-700 hover:text-primary transition-colors flex items-center"
                              onClick={closeMegaMenu}
                            >
                              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                              Invio Posta
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/servizi/servizi-postali"
                              className="text-gray-700 hover:text-primary transition-colors flex items-center"
                              onClick={closeMegaMenu}
                            >
                              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                              Email, Fax, PEC
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/servizi/punto-ritiro"
                              className="text-gray-700 hover:text-primary transition-colors flex items-center"
                              onClick={closeMegaMenu}
                            >
                              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                              Punto di Ritiro Pacchi
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-4 text-primary border-b pb-2">Altri Servizi</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/servizi/trust-provider"
                              className="text-gray-700 hover:text-primary transition-colors flex items-center"
                              onClick={closeMegaMenu}
                            >
                              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                              Trust Provider (Spid, Pec, Firma Digitale)
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/servizi/caf-patronato"
                              className="text-gray-700 hover:text-primary transition-colors flex items-center"
                              onClick={closeMegaMenu}
                            >
                              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                              CAF e Patronato
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/servizi/visure"
                              className="text-gray-700 hover:text-primary transition-colors flex items-center"
                              onClick={closeMegaMenu}
                            >
                              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                              Visure (CRIF, catastali, camerali)
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/servizi/telefonia-luce-gas"
                              className="text-gray-700 hover:text-primary transition-colors flex items-center"
                              onClick={closeMegaMenu}
                            >
                              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                              Telefonia, Luce e Gas
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t text-center">
                      <Link
                        href="/servizi"
                        className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors inline-block"
                        onClick={closeMegaMenu}
                      >
                        Vedi tutti i servizi
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/dove-siamo"
                className="text-gray-800 hover:text-primary font-medium px-3 py-2 rounded-md transition-colors"
              >
                Dove Siamo
              </Link>
              <Link
                href="/contatti"
                className="text-gray-800 hover:text-primary font-medium px-3 py-2 rounded-md transition-colors"
              >
                Contatti
              </Link>
              <Link
                href="/faq"
                className="text-gray-800 hover:text-primary font-medium px-3 py-2 rounded-md transition-colors"
              >
                FAQ
              </Link>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Prenota Ora
              </button>

              {/* Pulsante Cerca */}
              <div className="hidden md:flex items-center space-x-1">
                <ServiceSearch />
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                className="text-gray-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 animate-slide-in-right px-4 sm:px-6 lg:px-8">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-800 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/chi-siamo"
                  className="text-gray-800 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Chi Siamo
                </Link>
                <div className="space-y-2">
                  <Link
                    href="/servizi"
                    className="text-gray-800 hover:text-primary font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Servizi
                  </Link>
                  <div className="pl-4 flex flex-col space-y-2 mt-2">
                    <Link
                      href="/servizi/pagamenti"
                      className="text-gray-700 hover:text-primary text-sm transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Pagamenti
                    </Link>
                    <Link
                      href="/servizi/biglietteria"
                      className="text-gray-700 hover:text-primary text-sm transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Biglietteria
                    </Link>
                    <Link
                      href="/servizi/spedizioni"
                      className="text-gray-700 hover:text-primary text-sm transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Spedizioni
                    </Link>
                    <Link
                      href="/servizi/trust-provider"
                      className="text-gray-700 hover:text-primary text-sm transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Trust Provider
                    </Link>
                    <Link
                      href="/servizi/caf-patronato"
                      className="text-gray-700 hover:text-primary text-sm transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      CAF e Patronato
                    </Link>
                    <Link
                      href="/servizi/visure"
                      className="text-gray-700 hover:text-primary text-sm transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Visure
                    </Link>
                    <Link
                      href="/servizi/telefonia-luce-gas"
                      className="text-gray-700 hover:text-primary text-sm transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Telefonia, Luce e Gas
                    </Link>
                    <Link
                      href="/servizi/servizi-postali"
                      className="text-gray-700 hover:text-primary text-sm transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Servizi Postali
                    </Link>
                    <Link
                      href="/servizi/punto-ritiro"
                      className="text-gray-700 hover:text-primary text-sm transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Punto di Ritiro Pacchi
                    </Link>
                  </div>
                </div>
                <Link
                  href="/dove-siamo"
                  className="text-gray-800 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dove Siamo
                </Link>
                <Link
                  href="/contatti"
                  className="text-gray-800 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contatti
                </Link>
                <Link
                  href="/faq"
                  className="text-gray-800 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/prenota"
                  className="text-gray-800 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Prenota Appuntamento
                </Link>
              </nav>
              <div className="py-2 px-4 border-t">
                <div className="mt-4">
                  <ServiceSearch />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Booking Modal */}
      <BookingDialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen} />
    </header>
  )
}
