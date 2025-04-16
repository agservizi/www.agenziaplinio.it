// Simple analytics utility that doesn't rely on localStorage
// to avoid client/server mismatches

import { track } from "@vercel/analytics"

/**
 * Traccia un evento personalizzato
 */
export function trackEvent(name: string, properties?: Record<string, any>) {
  try {
    track(name, properties)
  } catch (error) {
    console.error("Error tracking event:", error)
  }
}

/**
 * Traccia una visualizzazione di pagina
 */
export function trackPageView(url: string) {
  trackEvent("page_view", { url })
}

/**
 * Traccia un click su un servizio
 */
export function trackServiceClick(serviceName: string, serviceId: string) {
  trackEvent("service_click", { service_name: serviceName, service_id: serviceId })
}
