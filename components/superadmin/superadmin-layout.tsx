"use client"

import React, { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAdminAuth } from '@/contexts/admin-auth-context'
import { AppHeader } from '@/components/app-header'
import Link from 'next/link'
import { LayoutGrid, DollarSign, TrendingUp, Activity, LogOut, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function SuperadminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasRole, logout, user } = useAdminAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    } else if (!hasRole('superadmin')) {
      // Redirect non-superadmin users to dashboard
      router.push('/dashboard')
    }
  }, [isAuthenticated, hasRole, router])

  if (!isAuthenticated || !hasRole('superadmin')) {
    return null
  }

  const navItems = [
    { href: '/superadmin', label: 'OVERVIEW', icon: LayoutGrid },
    { href: '/superadmin/financials', label: 'FINANCIALS', icon: DollarSign },
    { href: '/superadmin/pipeline', label: 'PIPELINE', icon: TrendingUp },
    { href: '/superadmin/health', label: 'HEALTH', icon: Activity },
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
        {/* Superadmin Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-14 lg:left-0 backdrop-blur-3xl bg-white/40 border-r border-[#E9E2D7]/30">
          <div className="flex-1 flex flex-col gap-4 px-6 py-8">
            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-300 font-serif text-[11px] tracking-[0.08em] ${
                      isActive
                        ? 'bg-[#C9A876]/30 text-[#6E5A4F]'
                        : 'text-[#8B7355] hover:bg-[#F7F4EF]/50 hover:text-[#6E5A4F] hover:translate-x-1'
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              
              <div className="h-px bg-[#E9E2D7]/30 my-4" />
              
              {/* Back to Admin */}
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-300 font-serif text-[11px] tracking-[0.08em] text-[#8B7355] hover:bg-[#F7F4EF]/50 hover:text-[#6E5A4F] hover:translate-x-1"
              >
                <Shield className="h-4 w-4" strokeWidth={1.5} />
                <span>ADMIN CONSOLE</span>
              </Link>
            </nav>

            {/* Logout Button */}
            <div className="mt-auto pt-4 border-t border-[#E9E2D7]/30">
              <Button
                onClick={logout}
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-3 rounded-full hover:bg-[#DCC5BA]/20 transition-all duration-300 font-serif text-[11px] tracking-[0.08em] text-[#B08080]"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.5} />
                <span>SIGN OUT</span>
              </Button>
            </div>

            {/* Superadmin Badge */}
            <div className="px-4 py-3 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-[#C9A876]/20 to-[#A08968]/20 border border-[#C9A876]/30">
              <p className="font-serif text-[10px] tracking-[0.12em] text-[#8B7355] uppercase">
                Superadmin Access
              </p>
              <p className="text-[9px] text-[#B8A896] mt-1">
                {user?.name || 'Founder'}
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}
