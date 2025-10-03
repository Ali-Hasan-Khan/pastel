import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta"
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono"
})

export const metadata = {
  title: "Pastel - A Personal AI-Powered Memory Vault",
  description:
    "Capture memories and letters to your future self with AI-generated reflections on your emotional journey.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
        <head>
          <link
            rel="preload"
            href="/placeholder-light.png"
            as="image"
            type="image/png"
          />
          <link
            rel="preload"
            href="/placeholder-dark.png"
            as="image"
            type="image/png"
          />
          <style dangerouslySetInnerHTML={{
            __html: `
            /* Critical CSS for LCP text */
            .lcp-welcome-text {
              font-size: 1.875rem;
              line-height: 2.25rem;
              font-weight: 700;
              color: #6b5c7c;
              margin-bottom: 0.5rem;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-display: swap;
            }
            .dark .lcp-welcome-text {
              color: #d8c5f0;
            }
          `
          }} />
        </head>
        <body className={`${plusJakartaSans.variable} ${ibmPlexMono.variable} ${plusJakartaSans.className}`} suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
