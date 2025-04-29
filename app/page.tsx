// Modifichiamo i container nella home page per garantire padding simmetrici

"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CreditCard, Truck, FileText, Shield, Smartphone, Users } from "lucide-react"
import Testimonials from "@/components/testimonials"
import PromoIliadSection from "@/components/promo-iliad-section"
import Breadcrumbs from "@/components/breadcrumbs"

const featuredServices = [
  {
    id: "pagamenti",
    storageKey: "service-image-pagamenti",
    title: "Pagamenti",
    description: "Bollettini, F24, PagoPA, MAV/RAV, Bonifici con DropPoint.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743606275426-pagamenti-uUXVejJrRwBKjHfIa5fw0z8o4HnnE5",
    icon: <CreditCard className="text-primary" size={24} />,
  },
  {
    id: "spedizioni",
    storageKey: "service-image-spedizioni",
    title: "Spedizioni",
    description: "Spedizioni nazionali e internazionali con BRT, Poste Italiane, TNT/Fedex.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743606726182-spedizioni-6pMB0QwUjVAFCDzJfVXcRULJDNawR8",
    icon: <Truck className="text-primary" size={24} />,
  },
  {
    id: "trust-provider",
    storageKey: "service-image-trust-provider",
    title: "Attivazioni Digitali",
    description: "SPID, PEC, Firma Digitale (Namirial) e altri servizi digitali.",
    image:
      "https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/service-image-1743606783124-trust-provider-2NERtQT5Xys9yJdvpkNnLnkBlh3dBp",
    icon: <FileText className="text-primary" size={24} />,
  },
]

const homeFAQs = [
  {
    question: "Quali sono gli orari di apertura dell'agenzia?",
    answer:
      "Siamo aperti dal lunedì al venerdì dalle 9:00 alle 13:00 e dalle 15:00 alle 19:00. Il sabato siamo aperti dalle 9:00 alle 13:00. Domenica chiuso.",
  },
  {
    question: "Quali documenti servono per attivare lo SPID?",
    answer:
      "Per attivare lo SPID è necessario presentarsi con un documento d'identità valido (carta d'identità, passaporto o patente), la tessera sanitaria, un indirizzo email personale e un numero di cellulare.",
  },
  {
    question: "Quanto costa spedire un pacco in Italia?",
    answer:
      "Il costo di spedizione di un pacco in Italia dipende dal peso, dalle dimensioni e dalla destinazione. Contattaci o vieni in agenzia per un preventivo personalizzato.",
  },
  {
    question: "Posso pagare con carta di credito?",
    answer: "Sì, accettiamo pagamenti con carte di credito, bancomat, carte prepagate e contanti.",
  },
]

// Funzione per animare i contatori
function animateCounter(element: HTMLElement, target: number) {
  let current = 0
  const increment = Math.ceil(target / 100)
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target.toString()
      clearInterval(timer)
    } else {
      element.textContent = current.toString()
    }
  }, 20)
}

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  // Aggiungi gli stili per l'animazione
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Riferimento per verificare se l'animazione dei contatori è già stata eseguita
  const countersAnimated = useRef(false)

  // Effetto per inizializzare AOS (Animate On Scroll)
  useEffect(() => {
    // Importa e inizializza AOS
    const loadAOS = async () => {
      const AOS = (await import("aos")).default
      await import("aos/dist/aos.css")
      AOS.init({
        duration: 1000,
        once: true,
        easing: "ease-in-out",
      })
    }

    loadAOS()

    // Aggiungi lo script AOS al documento
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css"
    document.head.appendChild(link)

    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      // @ts-ignore
      if (window.AOS) {
        // @ts-ignore
        window.AOS.init()
      }
    }

    return () => {
      document.head.removeChild(link)
      document.body.removeChild(script)
    }
  }, [])

  // Effetto per animare i contatori quando sono visibili
  useEffect(() => {
    if (countersAnimated.current) return

    const handleScroll = () => {
      const counters = document.querySelectorAll(".counter")
      if (counters.length === 0) return

      const triggerPosition = window.innerHeight * 0.8

      const firstCounter = counters[0]
      const position = firstCounter.getBoundingClientRect().top

      if (position < triggerPosition) {
        countersAnimated.current = true
        counters.forEach((counter) => {
          const target = Number.parseInt(counter.getAttribute("data-target") || "0", 10)
          animateCounter(counter as HTMLElement, target)
        })
        window.removeEventListener("scroll", handleScroll)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Effetto per tracciare la posizione del mouse e creare l'effetto parallasse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    // Inizializza le particelle
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        // @ts-ignore
        if (window.particlesJS) {
          // @ts-ignore
          window.particlesJS("particles-js", {
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: "#ffffff" },
              opacity: { value: 0.3, random: false },
              size: { value: 3, random: true },
              line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 },
              move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true,
              },
            },
          })
        }
      }

      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      // Rimuovi lo script quando il componente viene smontato
      const scriptElement = document.querySelector(
        'script[src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"]',
      )
      if (scriptElement) {
        document.body.removeChild(scriptElement)
      }
    }
  }, [])

  // Aggiungi stili CSS globali per le animazioni
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 15s ease infinite;
      }
      
      @keyframes gradient-x {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .particles-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    const counters = document.querySelectorAll(".counter")
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target") || "0", 10)
      animateCounter(counter as HTMLElement, target)
    })
  }, [])

  return (
    <div className="page-transition">
      <Breadcrumbs />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/background-z9isp6XJC1MwADytNLlTxLWI9JQNse"
            alt="AG Servizi"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/70 animate-gradient-x">
            <div className="absolute inset-0 opacity-70">
              <div className="particles-container h-full w-full" id="particles-js"></div>
            </div>
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-70"
              style={{
                transform: "translateY(0px)",
                animation: "pulse 8s infinite ease-in-out",
              }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tutti i servizi di cui hai bisogno in un unico posto
            </h1>
            <p className="text-xl mb-8">
              Siamo la tua agenzia di fiducia a Castellammare di Stabia per pagamenti, spedizioni, attivazioni digitali
              e molto altro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/servizi"
                className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center"
              >
                Scopri i nostri servizi
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                href="/contatti"
                className="bg-white hover:bg-gray-100 text-primary font-medium py-3 px-6 rounded-md transition-colors"
              >
                Contattaci
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Box Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Elementi decorativi di sfondo */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">I Nostri Servizi</h2>
            <p className="text-gray-600">Scopri tutti i servizi che offriamo</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            <div className="relative group perspective-500">
              <Link
                href="/servizi/pagamenti"
                className="flex flex-col items-center p-4 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md text-center transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:animate-pulse transition-all duration-300 group-hover:bg-primary/20">
                  <CreditCard
                    className="text-primary group-hover:scale-110 transition-transform duration-300"
                    size={28}
                  />
                </div>
                <span className="font-medium group-hover:text-primary transition-colors duration-300">Pagamenti</span>
              </Link>
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm rounded-lg shadow-lg">
                <p>Paga bollettini, F24, PagoPA, MAV/RAV e effettua bonifici con DropPoint.</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
              </div>
            </div>

            <div className="relative group perspective-500">
              <Link
                href="/servizi/spedizioni"
                className="flex flex-col items-center p-4 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md text-center transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:animate-pulse transition-all duration-300 group-hover:bg-primary/20">
                  <Truck className="text-primary group-hover:scale-110 transition-transform duration-300" size={28} />
                </div>
                <span className="font-medium group-hover:text-primary transition-colors duration-300">Spedizioni</span>
              </Link>
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm rounded-lg shadow-lg">
                <p>Spedisci pacchi e documenti in Italia e all'estero con BRT, Poste Italiane, TNT/Fedex.</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
              </div>
            </div>

            <div className="relative group perspective-500">
              <Link
                href="/servizi/trust-provider"
                className="flex flex-col items-center p-4 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md text-center transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:animate-pulse transition-all duration-300 group-hover:bg-primary/20">
                  <Shield className="text-primary group-hover:scale-110 transition-transform duration-300" size={28} />
                </div>
                <span className="font-medium group-hover:text-primary transition-colors duration-300">
                  Trust Provider
                </span>
              </Link>
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm rounded-lg shadow-lg">
                <p>Attiva SPID, PEC, Firma Digitale e altri servizi digitali certificati Namirial.</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
              </div>
            </div>

            <div className="relative group perspective-500">
              <Link
                href="/servizi/telefonia-luce-gas"
                className="flex flex-col items-center p-4 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md text-center transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:animate-pulse transition-all duration-300 group-hover:bg-primary/20">
                  <Smartphone
                    className="text-primary group-hover:scale-110 transition-transform duration-300"
                    size={28}
                  />
                </div>
                <span className="font-medium group-hover:text-primary transition-colors duration-300">
                  Telefonia e Utenze
                </span>
              </Link>
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm rounded-lg shadow-lg">
                <p>Attiva contratti per telefonia, internet, luce e gas con i migliori operatori sul mercato.</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
              </div>
            </div>

            <div className="relative group perspective-500">
              <Link
                href="/servizi/caf-patronato"
                className="flex flex-col items-center p-4 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md text-center transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:animate-pulse transition-all duration-300 group-hover:bg-primary/20">
                  <Users className="text-primary group-hover:scale-110 transition-transform duration-300" size={28} />
                </div>
                <span className="font-medium group-hover:text-primary transition-colors duration-300">
                  CAF e Patronato
                </span>
              </Link>
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm rounded-lg shadow-lg">
                <p>Assistenza per dichiarazioni dei redditi, ISEE, pratiche pensionistiche e altri servizi fiscali.</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>

          {/* Aggiungi un pulsante "Vedi tutti i servizi" */}
          <div className="text-center mt-8">
            <Link
              href="/servizi"
              className="inline-flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary font-medium py-2 px-4 rounded-md transition-all duration-300 hover:shadow group"
            >
              <span>Vedi tutti i servizi</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Aggiungi stili CSS per le animazioni */}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          .group-hover\\:animate-pulse:hover {
            animation: pulse 2s infinite ease-in-out;
          }
          
          .perspective-500 {
            perspective: 500px;
          }
        `}</style>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Elementi decorativi di sfondo */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 perspective-1000">
              <div
                className="relative group transition-all duration-500 transform hover:scale-[1.02]"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <Image
                    src="https://qwyk4zaydta0yrkb.public.blob.vercel-storage.com/team-image-1743602203331-AwX9JqAXe5LfABL29GZ034KwSvyQTn.jpg"
                    alt="AG Servizi Team"
                    width={800}
                    height={600}
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <p className="font-medium text-sm">Il nostro team di professionisti è pronto ad assisterti</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
              <h2 className="text-3xl font-bold mb-6 relative">
                Chi Siamo
                <span className="absolute -bottom-2 left-0 w-20 h-1 bg-primary"></span>
              </h2>
              <p className="text-gray-600 mb-4">
                AG SERVIZI è un'agenzia multiservizi situata nel cuore di Castellammare di Stabia, in Via Plinio il
                Vecchio 72. Da anni offriamo ai nostri clienti una vasta gamma di servizi, dalle pratiche burocratiche
                alle spedizioni, dai pagamenti alle attivazioni digitali.
              </p>
              <p className="text-gray-600 mb-6">
                La nostra missione è semplificare la vita quotidiana dei nostri clienti, offrendo soluzioni rapide ed
                efficienti per tutte le loro esigenze in un unico punto di riferimento.
              </p>

              {/* Statistiche con contatori animati */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-3 bg-white rounded-lg shadow-sm transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-primary text-2xl font-bold mb-1 counter" data-target="1500">
                    0
                  </div>
                  <div className="text-gray-500 text-sm">Clienti Soddisfatti</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-primary text-2xl font-bold mb-1 counter" data-target="9">
                    0
                  </div>
                  <div className="text-gray-500 text-sm">Anni di Esperienza</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-primary text-2xl font-bold mb-1 counter" data-target="20">
                    0
                  </div>
                  <div className="text-gray-500 text-sm">Servizi Offerti</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-primary text-2xl font-bold mb-1 counter" data-target="5000">
                    0
                  </div>
                  <div className="text-gray-500 text-sm">Pratiche Gestite</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-primary">
                  <h3 className="font-bold mb-2 text-primary">Professionalità</h3>
                  <p className="text-gray-600 text-sm">
                    Il nostro team è formato da professionisti qualificati, costantemente aggiornati sulle normative e
                    le procedure.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-secondary">
                  <h3 className="font-bold mb-2 text-primary">Affidabilità</h3>
                  <p className="text-gray-600 text-sm">
                    Manteniamo le promesse e rispettiamo gli impegni presi con i nostri clienti, garantendo un servizio
                    puntuale e preciso.
                  </p>
                </div>
              </div>
              <Link
                href="/chi-siamo"
                className="group text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors relative overflow-hidden"
              >
                <span className="relative z-10">Scopri di più su di noi</span>
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Elementi decorativi di sfondo */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              I Nostri Servizi Principali
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-primary rounded-full"></span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Offriamo una vasta gamma di servizi per soddisfare tutte le tue esigenze quotidiane. Ecco alcuni dei
              nostri servizi più richiesti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden service-card group transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={index * 100}
              >
                <div className="h-48 bg-primary/10 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    {service.icon}
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="absolute top-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500"></div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    href={`/servizi/${service.id}`}
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors relative overflow-hidden group-hover:font-bold"
                  >
                    <span className="relative z-10">Scopri di più</span>
                    <ArrowRight
                      size={16}
                      className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
            <Link
              href="/servizi"
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 hover:shadow-lg hover:px-10 inline-flex items-center group"
            >
              <span>Vedi tutti i servizi</span>
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Aggiungi stili CSS per le animazioni */}
        <style jsx>{`
          .service-card {
            position: relative;
            z-index: 1;
            transition: all 0.5s ease;
          }
          
          .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--secondary-rgb), 0.1) 100%);
            opacity: 0;
            z-index: -1;
            transition: opacity 0.5s ease;
            border-radius: 0.5rem;
          }
          
          .service-card:hover::before {
            opacity: 1;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Promozione Iliad invece delle FAQ nella home */}
      <PromoIliadSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-white relative overflow-hidden">
        {/* Elementi decorativi animati */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/2 left-3/4 w-40 h-40 bg-white/5 rounded-full blur-xl animate-spin-very-slow"></div>

          {/* Particelle animate */}
          <div className="particles-container absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/20 rounded-full"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float-random ${Math.random() * 10 + 10}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 relative inline-block"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                Hai bisogno di assistenza?
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </h2>
              <p
                className="text-xl mb-10 max-w-2xl mx-auto"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="100"
              >
                Vieni a trovarci nella nostra sede di Castellammare di Stabia o contattaci per maggiori informazioni sui
                nostri servizi.
              </p>
            </div>

            {/* Card interattive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/20 group"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-secondary/40 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Contattaci</h3>
                <p className="text-white/80 mb-4 text-center">
                  Hai domande sui nostri servizi? Contattaci per ricevere assistenza personalizzata.
                </p>
                <div className="text-center">
                  <Link
                    href="/contatti"
                    className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-primary font-medium py-3 px-6 rounded-md transition-all duration-300 hover:shadow-lg group"
                  >
                    <span>Scrivici ora</span>
                    <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/20 group"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-delay="300"
              >
                <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-secondary/40 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Vieni a trovarci</h3>
                <p className="text-white/80 mb-4 text-center">
                  Siamo in Via Plinio il Vecchio 72, Castellammare di Stabia. Vieni a trovarci!
                </p>
                <div className="text-center">
                  <Link
                    href="/dove-siamo"
                    className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 hover:shadow-lg group"
                  >
                    <span>Come raggiungerci</span>
                    <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Orari e contatto rapido */}
            <div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">Orari di apertura</h3>
                  <p className="text-white/80 mb-1">Lun-Ven: 9:00-13:20 / 16:00-19:20</p>
                  <p className="text-white/80">Sabato: 9:00-13:00</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+390810584542"
                    className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 hover:shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Chiama ora
                  </a>
                  <a
                    href="https://wa.me/+393773798570"
                    className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium py-3 px-6 rounded-md transition-all duration-300 hover:shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Aggiungi stili CSS per le animazioni */}
        <style jsx>{`
          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.6;
            }
          }

          @keyframes spin-very-slow {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes float-random {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-30px) translateX(15px);
            }
            50% {
              transform: translateY(-15px) translateX(-15px);
            }
            75% {
              transform: translateY(30px) translateX(15px);
            }
          }

          .animate-pulse-slow {
            animation: pulse-slow 8s infinite ease-in-out;
          }

          .animate-float-slow {
            animation: float-slow 12s infinite ease-in-out;
          }

          .animate-spin-very-slow {
            animation: spin-very-slow 30s infinite linear;
          }
        `}</style>
      </section>

      {/* Fine della sezione CTA */}
    </div>
  )
}
