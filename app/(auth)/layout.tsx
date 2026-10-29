import type React from "react"
import type { Metadata } from "next"
import { Inter, Spectral } from 'next/font/google'
import "../globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
  variable: "--font-spectral",
})

export const metadata: Metadata = {
  title: "ATTACHAI - Welcome",
  description: "AI-powered concierge platform for luxury hospitality",
  generator: "v0.app",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Nested layouts must not render <html> or <body> in Next.js App Router.
  // Keep layout content only — let the root `app/layout.tsx` manage <html> and <body>.
  return (
    <>
      {children}
    </>
  )
}
