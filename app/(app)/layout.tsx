"use client"

import type React from "react"
import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"
import Image from "next/image"
import { FloatingHelpButton } from "@/components/floating-help-button"
import { RequestAccountProvider } from "@/contexts/request-account-context"
import { RequestAccountModal } from "@/components/request-account-modal"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <RequestAccountProvider>
      <div className="flex h-screen overflow-hidden relative">
        <div className="sanctuary-background fixed inset-0 z-0">
          <Image
            src="/images/sanctuary-background.jpg"
            alt=""
            fill
            className="object-cover"
            style={{
              filter: 'blur(5px) saturate(1.05) brightness(1.02)',
            }}
            quality={100}
            priority
          />
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <AppSidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden relative z-10 w-full lg:w-auto">
          <AppHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              {children}
            </div>
            <AppFooter />
          </main>
        </div>
        
        <FloatingHelpButton />
      </div>
      
      <RequestAccountModal />
    </RequestAccountProvider>
  )
}
