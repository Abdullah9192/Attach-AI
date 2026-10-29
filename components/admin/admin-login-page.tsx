"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/contexts/admin-auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Image from 'next/image'
import { LogIn, AlertCircle } from 'lucide-react'

export function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const success = await login(email, password)
    
    if (success) {
      router.push('/admin')
    } else {
      setError('Invalid email or password. Try admin@attachai.com / admin123')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-[24px] backdrop-blur-3xl bg-white/90 border border-[#E9E2D7]/30 shadow-[0_16px_56px_rgba(139,115,85,0.15)] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase mb-2">
              ATTACHAI Admin
            </h1>
            <p className="text-sm text-[#8B7355] font-light">
              Secure access for the ATTACHAI team.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-[#DCC5BA]/20 border border-[#DCC5BA]/30 flex items-start gap-3">
              <AlertCircle className="h-4 w-4 text-[#B08080] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#8B7355]">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-[#6E5A4F] font-light">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-2xl backdrop-blur-xl bg-white/50 border-[#E9E2D7]/30 focus:border-[#D8C8A8] transition-all"
                placeholder="admin@attachai.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-[#6E5A4F] font-light">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-2xl backdrop-blur-xl bg-white/50 border-[#E9E2D7]/30 focus:border-[#D8C8A8] transition-all"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-[#3F2F2C] hover:bg-[#6E5A4F] text-white font-serif text-sm tracking-[0.08em] uppercase transition-all duration-300 shadow-lg"
            >
              {loading ? (
                'Signing in...'
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign in to Admin Console
                </>
              )}
            </Button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 pt-6 border-t border-[#E9E2D7]/30 text-center">
            <Link
              href="/dashboard"
              className="text-sm text-[#8B7355] hover:text-[#6E5A4F] transition-colors font-light"
            >
              ← Back to main app
            </Link>
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[#B8A896]">
            Demo credentials: admin@attachai.com / admin123
          </p>
        </div>
      </div>
    </div>
  )
}
