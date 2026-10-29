import type React from "react"
import type { Metadata, Viewport } from "next"
import localFont from 'next/font/local'
import { Spectral } from 'next/font/google'
import "./globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
// Diagnostic: client-only logger to inspect attributes injected onto <body>
import BodyAttributeLogger from "@/components/body-attribute-logger"
import ReduxProvider from "@/providers/redux-provider"

// const basisGrotesque = localFont({
//   src: [
//     {
//       path: '../public/fonts/BasisGrotesque-Regular.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/BasisGrotesque-Medium.woff2',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/BasisGrotesque-Bold.woff2',
//       weight: '700',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-basis-grotesque',
//   display: 'swap',
//   fallback: ['system-ui', 'sans-serif'],
// })

// const spectral = Spectral({
//   subsets: ["latin"],
//   weight: ["300", "400", "600"],
//   display: "swap",
//   variable: "--font-spectral",
// })

export const metadata: Metadata = {
  title: "ATTACHAI - AI Concierge Platform",
  description: "AI-powered concierge platform for luxury hospitality and service industries",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#F7F4EF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <html lang="en" className={`${spectral.variable} ${basisGrotesque.variable} antialiased dark`}>
    <html lang="en">
      {/* Development-only: early head script to remove known injected attributes before hydration */}
      {process.env.NODE_ENV === "development" && (
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{function remove(){if(document.body&&document.body.hasAttribute&&document.body.hasAttribute('cz-shortcut-listen')){document.body.removeAttribute('cz-shortcut-listen');console.info('[body-attr] removed cz-shortcut-listen before hydration');}}remove();if(!document.body){var o=new MutationObserver(function(){remove();o.disconnect();});o.observe(document.documentElement,{childList:true,subtree:true});}}catch(e){}})();`,
            }}
          />
        </head>
      )}

      <body className="font-sans prevent-horizontal-scroll">
        {/* Development-only: remove known injected attribute early to avoid hydration mismatch */}
        {process.env.NODE_ENV === "development" && (
          <>
            <script
              // remove attribute inserted by some browser extensions before React hydration
              dangerouslySetInnerHTML={{
                __html: `try{if(document && document.body && document.body.hasAttribute && document.body.hasAttribute('cz-shortcut-listen')){document.body.removeAttribute('cz-shortcut-listen');console.info('[body-attr] removed cz-shortcut-listen attribute to avoid hydration mismatch');}}catch(e){};`,
              }}
            />
            {/* Development-only diagnostic: logs attributes present on document.body */}
            <BodyAttributeLogger />
          </>
        )}
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
