import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin, Phone, Clock, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AG SERVIZI</h3>
            <p className="mb-4">
              La tua agenzia di servizi a Castellammare di Stabia. Offriamo una vasta gamma di servizi per soddisfare
              tutte le tue esigenze.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-secondary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="mailto:info@agservizi.it" className="hover:text-secondary transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Link Utili</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chi-siamo" className="hover:text-secondary transition-colors">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link href="/dove-siamo" className="hover:text-secondary transition-colors">
                  Dove Siamo
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="hover:text-secondary transition-colors">
                  Contatti
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-secondary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-secondary transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Link Legali</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-secondary transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/termini-condizioni" className="hover:text-secondary transition-colors">
                  Termini e Condizioni
                </Link>
              </li>
              <li>
                <Link href="/area-clienti" className="hover:text-secondary transition-colors">
                  Area Clienti
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contatti</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>Via Plinio il Vecchio 72, Castellammare di Stabia (NA)</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>+39 081 0584542</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>info@agenziaplinio.it</span>
              </li>
              <li className="flex items-start">
                <Clock size={20} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>Lun-Ven: 9:00-13:20, 16:00-19:20</p>
                  <p>Sab: 9:00-13:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/logo-J1a5B8fGqtyHQ5NWXPClMRUZ4FVoB2.png"
              alt="AG Servizi Logo"
              width={120}
              height={40}
              className="h-auto invert"
              unoptimized
            />
          </div>
          <p>&copy; {new Date().getFullYear()} AG SERVIZI VIA PLINIO 72. Tutti i diritti riservati.</p>
          <p className="text-sm mt-2 text-gray-400">
            P.IVA: 08442881218 | REA: NA-985288 | Conforme al GDPR (UE) 2016/679
          </p>
        </div>
      </div>
    </footer>
  )
}
