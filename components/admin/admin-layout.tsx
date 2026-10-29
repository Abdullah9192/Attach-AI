"use client"

import React, { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAdminAuth } from '@/contexts/admin-auth-context'
import { AppHeader } from '@/components/app-header'
import Link from 'next/link'
import { LayoutGrid, Building2, LogOut, Crown, DollarSign, TrendingUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasRole, logout, user } = useAdminAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login')
    } else if (isAuthenticated && !hasRole(['admin', 'superadmin'])) {
      // User is authenticated but doesn't have admin or superadmin role
      router.push('/dashboard')
    }
  }, [isAuthenticated, pathname, router, hasRole])

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null
  }

  if (isAuthenticated && !hasRole(['admin', 'superadmin'])) {
    return null
  }

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const navItems = [
    { href: '/admin', label: 'OVERVIEW', icon: LayoutGrid },
    { href: '/admin/organisations', label: 'ORGANISATIONS', icon: Building2 },
  ]

  const isSuperadmin = hasRole('superadmin')

  const superadminNavItems = [
    { href: '/superadmin', label: 'OVERVIEW', icon: Crown },
    { href: '/superadmin/financials', label: 'FINANCIALS', icon: DollarSign },
    { href: '/superadmin/pipeline', label: 'GROWTH & LEADS', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Sanctuary Background */}
      <div className="sanctuary-background">
        <Image
          src="/images/sanctuary-background.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      {/* App Header */}
      <AppHeader />

      {/* Main Content with Sidebar */}
      <div className="relative z-10 flex">
        {/* Admin Sidebar - Added h-[calc(100vh-3.5rem)] to ensure full height coverage */}
        <aside className="hidden md:flex md:w-64 lg:w-64 md:flex-col md:fixed md:top-14 md:bottom-0 md:left-0 md:h-[calc(100vh-3.5rem)] backdrop-blur-3xl bg-white/40 border-r border-[#E9E2D7]/30">
          <div className="flex flex-col h-full gap-4 px-4 lg:px-6 py-6 lg:py-8">
            {/* Navigation */}
            <nav className="space-y-2 flex-shrink-0">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-full transition-all duration-300 font-serif text-[10px] lg:text-[11px] tracking-[0.08em] ${
                      isActive
                        ? 'bg-[#D8C8A8]/30 text-[#6E5A4F]'
                        : 'text-[#8B7355] hover:bg-[#F7F4EF]/50 hover:text-[#6E5A4F] hover:translate-x-1'
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                )
              })}
              
              {isSuperadmin && (
                <>
                  <div className="h-px bg-[#E9E2D7]/30 my-4" />
                  <div className="mb-2">
                    <p className="px-3 lg:px-4 text-[9px] lg:text-[10px] font-serif tracking-[0.12em] text-[#B8A896] uppercase mb-2">
                      Superadmin
                    </p>
                    {superadminNavItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-full transition-all duration-300 font-serif text-[10px] lg:text-[11px] tracking-[0.08em] ${
                            isActive
                              ? 'bg-[#C9A876]/20 text-[#A08968]'
                              : 'text-[#C9A876] hover:bg-[#D8C8A8]/20 hover:text-[#A08968] hover:translate-x-1'
                          }`}
                        >
                          <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </>
              )}
            </nav>

            <div className="flex-1 min-h-0" />

            {/* Logout Button */}
            <div className="pt-4 border-t border-[#E9E2D7]/30 flex-shrink-0">
              <Button
                onClick={logout}
                variant="ghost"
                className="w-full justify-start gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-full hover:bg-[#DCC5BA]/20 transition-all duration-300 font-serif text-[10px] lg:text-[11px] tracking-[0.08em] text-[#B08080]"
              >
                <LogOut className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                <span className="truncate">SIGN OUT</span>
              </Button>
            </div>

            {/* Admin Badge */}
            <div className="px-3 lg:px-4 py-3 rounded-2xl backdrop-blur-xl bg-[#D8C8A8]/20 border border-[#D8C8A8]/30 flex-shrink-0">
              <p className="font-serif text-[9px] lg:text-[10px] tracking-[0.12em] text-[#8B7355] uppercase truncate">
                {isSuperadmin ? 'Superadmin' : 'Admin Console'}
              </p>
              <p className="text-[8px] lg:text-[9px] text-[#B8A896] mt-1 truncate">
                {user?.name || 'ATTACHAI Team Access'}
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 lg:ml-64 w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
