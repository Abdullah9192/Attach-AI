"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Grid3x3, MessageCircle, Waves, Send, Users2, BookMarked, Volume1, Workflow, Settings2, ChevronDown, Check, Bell, BarChart3, Plus, X, Badge } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRequestAccount } from "@/contexts/request-account-context"
import { useAppSelector } from "@/store/hooks"

interface AppSidebarProps {
  onClose?: () => void
}

const navigation = [
  { name: "DASHBOARD", href: "/dashboard", icon: Grid3x3 },
  { name: "SERVICE INBOX", href: "/service-inbox", icon: MessageCircle },
  { name: "VIP MANAGEMENT", href: "/vip", icon: Badge },
  { name: "CONTACTS", href: "/contacts", icon: Users2 },
  { name: "CAMPAIGNS", href: "/campaigns", icon: Send },
  { name: "AI KNOWLEDGE", href: "/knowledge", icon: BookMarked },
  { name: "AUTOMATION RULES", href: "/automation-rules", icon: Workflow },
  { name: "SETTINGS", href: "/settings", icon: Settings2 },
]

export function AppSidebar({ onClose }: AppSidebarProps) {
  const pathname = usePathname()
  const { openModal } = useRequestAccount()
  const auth = useAppSelector((s) => s.auth)
  // TODO: Enable role-based restriction later
  // const isAdmin = React.useMemo(() => {
  //   try {
  //     const roles = auth?.user?.roles
  //     console.log("User roles:", roles)
  //     if (!roles || !Array.isArray(roles)) return false
  //     return roles.some((r: any) => {
  //       const name = (r && (r.name || r.role || r.slug)) || ""
  //       console.log("Checking role name:", name)
  //       return String(name).toLowerCase() === "admin"
  //     })
  //   } catch (e) {
  //     return false
  //   }
  // }, [auth])
  const isAdmin = true // Temporarily allow all users to see full navigation
  const [showPropertyMenu, setShowPropertyMenu] = React.useState(false)
  const [currentProperty, setCurrentProperty] = React.useState({
    id: 1,
    name: "ATTACHAI Club",
    initials: "AC",
    unreadCount: 12
  })

  const properties = [
    { id: 1, name: "ATTACHAI Club", initials: "AC", unreadCount: 12 },
    { id: 2, name: "ATTACHAI London", initials: "AL", unreadCount: 5 },
    { id: 3, name: "ATTACHAI New York", initials: "NY", unreadCount: 0 },
    { id: 4, name: "ATTACHAI Tokyo", initials: "AT", unreadCount: 23 },
  ]

  const handleNavigationClick = () => {
    // Close sidebar on mobile/tablet when a nav item is clicked
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      <div className="flex h-full w-64 sm:w-56 lg:w-48 flex-col backdrop-blur-[80px] bg-[rgba(247,244,239,0.7)] border-r border-[rgba(213,200,186,0.12)] animate-soft-slide">
        <div className="flex h-16 sm:h-18 lg:h-20 items-center justify-center border-b border-[rgba(213,200,186,0.12)] px-4 lg:px-5 relative">
          <Image 
            src="/images/attachai-logo-full.png" 
            alt="ATTACHAI" 
            width={1200} 
            height={600}
            className="h-[45px] sm:h-[50px] lg:h-[55px] w-auto object-contain"
            priority
          />
          
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 lg:hidden text-[#8B7355] hover:text-[#6E5A4F]"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-2 sm:space-y-2.5 lg:space-y-3 p-4 lg:p-5">
          {(isAdmin ? navigation : navigation.filter((i) => i.href === "/service-inbox")).map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavigationClick}
                className={cn(
                  "group flex items-center gap-2.5 rounded-full px-4 py-2.5 font-serif text-[11px] sm:text-[11.5px] lg:text-[12px] font-medium uppercase tracking-[0.08em] transition-all duration-800 ease-out",
                  isActive
                    ? "bg-[rgba(216,200,168,0.12)] text-[#A18D7B] shadow-[0_8px_24px_rgba(216,200,168,0.2),0_0_12px_rgba(216,200,168,0.15)]"
                    : "text-[#A18D7B]/70 hover:bg-[rgba(247,244,239,0.3)] hover:text-[#A18D7B] hover:translate-x-1"
                )}
              >
                <item.icon className="h-4 w-4 stroke-[1.25] transition-transform duration-800 group-hover:scale-110 flex-shrink-0" />
                <span className="leading-tight">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-[rgba(213,200,186,0.12)] p-4 sm:p-5 lg:p-6">
          <div className="relative">
            <button
              onClick={() => setShowPropertyMenu(!showPropertyMenu)}
              className="w-full flex items-center gap-2.5 rounded-full backdrop-blur-2xl bg-[rgba(247,244,239,0.6)] border border-[rgba(213,200,186,0.2)] px-3 py-2 shadow-sm transition-all duration-500 hover:bg-[rgba(247,244,239,0.9)] hover:shadow-md"
            >
              <div className="relative flex-shrink-0">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 text-[10px] font-light text-[#6E5A4F] backdrop-blur-xl border border-white/40">
                  {currentProperty.initials}
                </div>
                {currentProperty.unreadCount > 0 && (
                  <div className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#C9A876] border border-white/60">
                    <span className="text-[7px] font-medium text-white">{currentProperty.unreadCount}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-hidden text-left">
                <p className="text-[11px] font-serif uppercase tracking-tight text-[#6E5A4F] leading-tight truncate">{currentProperty.name}</p>
              </div>
              <ChevronDown className={cn(
                "h-3 w-3 text-[#8B7355] transition-transform duration-500 flex-shrink-0",
                showPropertyMenu && "rotate-180"
              )} />
            </button>

            {showPropertyMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 rounded-[22px] backdrop-blur-3xl bg-white/90 border-0 shadow-[0_16px_56px_rgba(139,115,85,0.15)] overflow-hidden animate-soft-slide">
                <div className="p-3 space-y-1">
                  {properties.map((property) => (
                    <button
                      key={property.id}
                      onClick={() => {
                        setCurrentProperty(property)
                        setShowPropertyMenu(false)
                      }}
                      className={cn(
                        "w-full flex items-center gap-2.5 rounded-[18px] px-3 py-2.5 transition-all duration-500 text-[15px] text-[#6E5A4F]",
                        property.id === currentProperty.id
                          ? "bg-[rgba(216,200,168,0.20)] font-normal"
                          : "hover:bg-[rgba(247,244,239,0.6)]"
                      )}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#D8C8A8]/30 to-[#C9A876]/20 text-[9px] font-light text-[#6E5A4F] backdrop-blur-xl border border-white/30">
                          {property.initials}
                        </div>
                        {property.unreadCount > 0 && (
                          <div className="absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#C9A876] border border-white/60">
                            <span className="text-[7px] font-medium text-white">{property.unreadCount}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden text-left">
                        <p className="text-[11px] font-serif uppercase tracking-tight text-[#6E5A4F] leading-tight truncate">{property.name}</p>
                      </div>
                      {property.id === currentProperty.id && (
                        <Check className="h-3 w-3 text-[#C9A876] flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="border-t border-[rgba(213,200,186,0.12)] px-3 py-2">
                  <button 
                    onClick={() => {
                      openModal()
                      setShowPropertyMenu(false)
                    }}
                    className="w-full flex items-center gap-2 text-left text-sm font-light text-[#6E5A4F] py-2 hover:text-[#6E5A4F] transition-colors duration-500"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
