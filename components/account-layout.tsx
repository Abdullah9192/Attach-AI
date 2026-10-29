"use client"

import * as React from "react"
import { usePathname } from 'next/navigation'
import Link from "next/link"
import { ArrowLeft, User, Settings, CreditCard } from 'lucide-react'
import { cn } from "@/lib/utils"

const tabs = [
  { name: "Profile", href: "/account/profile" },
  { name: "Preferences", href: "/account/preferences" },
  { name: "Billing", href: "/account/billing" },
]

export function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex" style={{
      background: 'linear-gradient(135deg, #F7F4EF 0%, #E8DCC8 50%, #D8C8A8 100%)'
    }}>
      <aside className="w-64 sm:w-56 lg:w-48 backdrop-blur-[80px] bg-[rgba(247,244,239,0.7)] border-r border-[rgba(213,200,186,0.12)] p-4 lg:p-5 flex flex-col">
        {/* Back to Dashboard Button */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-4 py-2.5 mb-6 rounded-full font-serif text-[11px] sm:text-[11.5px] lg:text-[12px] font-medium uppercase tracking-[0.08em] text-[#A18D7B]/70 hover:bg-[rgba(247,244,239,0.3)] hover:text-[#A18D7B] hover:translate-x-1 transition-all duration-800 ease-out"
        >
          <ArrowLeft className="h-4 w-4 stroke-[1.25] flex-shrink-0" />
          <span className="leading-tight">Back to Dashboard</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2 sm:space-y-2.5 lg:space-y-3">
          <Link
            href="/account/profile"
            className={cn(
              "group flex items-center gap-2.5 rounded-full px-4 py-2.5 font-serif text-[11px] sm:text-[11.5px] lg:text-[12px] font-medium uppercase tracking-[0.08em] transition-all duration-800 ease-out",
              pathname === "/account/profile"
                ? "bg-[rgba(216,200,168,0.12)] text-[#A18D7B] shadow-[0_8px_24px_rgba(216,200,168,0.2),0_0_12px_rgba(216,200,168,0.15)]"
                : "text-[#A18D7B]/70 hover:bg-[rgba(247,244,239,0.3)] hover:text-[#A18D7B] hover:translate-x-1"
            )}
          >
            <User className="h-4 w-4 stroke-[1.25] transition-transform duration-800 group-hover:scale-110 flex-shrink-0" />
            <span className="leading-tight">Profile</span>
          </Link>
          <Link
            href="/account/preferences"
            className={cn(
              "group flex items-center gap-2.5 rounded-full px-4 py-2.5 font-serif text-[11px] sm:text-[11.5px] lg:text-[12px] font-medium uppercase tracking-[0.08em] transition-all duration-800 ease-out",
              pathname === "/account/preferences"
                ? "bg-[rgba(216,200,168,0.12)] text-[#A18D7B] shadow-[0_8px_24px_rgba(216,200,168,0.2),0_0_12px_rgba(216,200,168,0.15)]"
                : "text-[#A18D7B]/70 hover:bg-[rgba(247,244,239,0.3)] hover:text-[#A18D7B] hover:translate-x-1"
            )}
          >
            <Settings className="h-4 w-4 stroke-[1.25] transition-transform duration-800 group-hover:scale-110 flex-shrink-0" />
            <span className="leading-tight">Preferences</span>
          </Link>
          <Link
            href="/account/billing"
            className={cn(
              "group flex items-center gap-2.5 rounded-full px-4 py-2.5 font-serif text-[11px] sm:text-[11.5px] lg:text-[12px] font-medium uppercase tracking-[0.08em] transition-all duration-800 ease-out",
              pathname === "/account/billing"
                ? "bg-[rgba(216,200,168,0.12)] text-[#A18D7B] shadow-[0_8px_24px_rgba(216,200,168,0.2),0_0_12px_rgba(216,200,168,0.15)]"
                : "text-[#A18D7B]/70 hover:bg-[rgba(247,244,239,0.3)] hover:text-[#A18D7B] hover:translate-x-1"
            )}
          >
            <CreditCard className="h-4 w-4 stroke-[1.25] transition-transform duration-800 group-hover:scale-110 flex-shrink-0" />
            <span className="leading-tight">Billing</span>
          </Link>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer in Sidebar */}
        <div className="pt-6 border-t border-[rgba(213,200,186,0.12)]">
          <p className="text-[10px] font-serif uppercase tracking-tight text-[#8B7355]/60 text-center">ATTACHAI © 2025</p>
        </div>
      </aside>

      <div className="flex-1">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-2xl md:text-3xl font-normal text-[#6E5A4F] mb-2">Account Settings</h1>
            <p className="text-sm text-[#8B7355]">Manage your personal details, preferences, and billing information</p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-2 mb-8 shadow-lg border border-white/40">
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const isActive = pathname === tab.href
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`
                      flex-1 px-6 py-3 rounded-xl text-sm font-normal text-center
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-[#D8C8A8]/40 text-[#6E5A4F] shadow-md"
                          : "text-[#8B7355] hover:bg-white/50"
                      }
                    `}
                  >
                    {tab.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div>
            {children}
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center">
            <p className="text-xs text-[#8B7355]/60">Copyright ATTACHAI 2025</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
