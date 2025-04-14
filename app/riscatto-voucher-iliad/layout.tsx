import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Riscatto Voucher Iliad",
  description: "Pannello di riscatto voucher Iliad",
}

export default function RiscattoVoucherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={`${inter.className} min-h-screen`}>{children}</div>
}
