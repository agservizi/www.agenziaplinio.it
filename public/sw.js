// Service Worker per caching, funzionalità offline e notifiche push
const CACHE_NAME = "ag-servizi-cache-v1"
const urlsToCache = [
  "/",
  "/chi-siamo",
  "/contatti",
  "/dove-siamo",
  "/faq",
  "/servizi",
  "/offline.html",
  "/logo.png",
  "/styles.css",
  "/main.js",
]

// Installazione del Service Worker
self.addEventListener("install", (event) => {
  self.skipWaiting() // Assicura che la versione più recente del Service Worker si attivi immediatamente

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.error("Pre-caching fallito:", error)
      }),
  )
})

// Gestione delle richieste fetch
self.addEventListener("fetch", (event) => {
  // Non tentare di gestire richieste non GET
  if (event.request.method !== "GET") return

  // Salta le richieste API e admin per il caching
  if (event.request.url.includes("/api/") || event.request.url.includes("/admin/dashboard")) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - restituisci la risposta
      if (response) {
        return response
      }

      // Clona la richiesta perché è uno stream utilizzabile una sola volta
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest)
        .then((response) => {
          // Controlla se abbiamo ricevuto una risposta valida
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clona la risposta perché è uno stream utilizzabile una sola volta
          const responseToCache = response.clone()

          caches
            .open(CACHE_NAME)
            .then((cache) => {
              // Non memorizzare nella cache chiamate API o risorse di terze parti
              if (event.request.url.includes("/api/") || !event.request.url.includes(self.location.origin)) {
                return
              }
              cache.put(event.request, responseToCache)
            })
            .catch((error) => {
              console.error("Caching fallito:", error)
            })

          return response
        })
        .catch(() => {
          // Se la rete non è disponibile, prova a restituire la pagina offline
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html")
          }

          // Se non è una richiesta di navigazione, restituisci semplicemente l'errore
          return new Response("Si è verificato un errore di rete", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          })
        })
    }),
  )
})

// Pulizia delle cache vecchie
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        // Rivendica i client in modo che il SW sia in controllo immediatamente
        return self.clients.claim()
      }),
  )
})

// Gestione delle notifiche push
self.addEventListener("push", (event) => {
  if (!event.data) return

  const data = event.data.json()

  const options = {
    body: data.body || "Nuova notifica",
    icon: data.icon || "/icon-192x192.png",
    badge: "/icon-192x192.png",
    data: data.data || {},
    vibrate: [100, 50, 100],
    actions: [
      {
        action: "open",
        title: "Visualizza",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification(data.title || "AG SERVIZI", options))
})

// Gestione del click sulle notifiche
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "open" || event.action === "") {
    const urlToOpen = event.notification.data?.url || "/admin/dashboard"

    event.waitUntil(
      clients.matchAll({ type: "window" }).then((windowClients) => {
        // Controlla se c'è già una finestra/tab aperta con l'URL di destinazione
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i]
          if (client.url.includes(urlToOpen) && "focus" in client) {
            return client.focus()
          }
        }
        // Se non c'è una finestra/tab aperta, ne apre una nuova
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      }),
    )
  }
})

