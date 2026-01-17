import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DotGothic16 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "700"],
})

const dotGothic = DotGothic16({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dot-gothic",
})

export const metadata: Metadata = {
  title: "BASED404 | The Digital Pharmacy",
  description: "Error 404: Limits Not Found. High-performance neural protocols for next-gen AI.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${dotGothic.variable} font-sans antialiased noise`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
