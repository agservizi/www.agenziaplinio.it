"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Carica LinkPrefetcher dinamicamente per evitare problemi di caricamento
const LinkPrefetcher = dynamic(() => import("@/components/link-prefetcher"), {
  ssr: false,
  loading: () => null,
})

export default function DynamicLinkPrefetcher() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <LinkPrefetcher />
}
