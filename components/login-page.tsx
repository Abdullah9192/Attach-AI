"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'
import { ArrowRight, Mail, Lock, ArrowLeft, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PublicFooter } from "@/components/public-footer"
import Image from 'next/image'

// API'S
import authService from "@/app/services/auth.service"
import { useAppDispatch } from "@/store/hooks"
import { login as loginAction } from "@/store/slices/authSlice"

export function LoginPage() {
  const router = useRouter()
  const [showForgotPassword, setShowForgotPassword] = React.useState(false)
  const [resetLoading, setResetLoading] = React.useState(false)
  const [resetSuccess, setResetSuccess] = React.useState(false)
  const [resetEmail, setResetEmail] = React.useState("")
  const [resetError, setResetError] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [email, setEmail] = React.useState("")

  const dispatch = useAppDispatch()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // console.log("Login credentials:", email, password)
      const resultAction = await dispatch(loginAction({ email, password }))
      if (loginAction.fulfilled.match(resultAction)) {
        console.log("Login successful:", resultAction.payload)
        router.push("/dashboard")
      } else {
        console.error("Login failed:", resultAction)
      }
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  // const handleForgotPasswordClick = () => {
  //   setShowForgotPassword(true)
  //   setResetEmail("")
  //   setResetError("")
  //   setResetSuccess(false)
  // }

  // const handleCloseForgotPassword = () => {
  //   setShowForgotPassword(false)
  //   setResetEmail("")
  //   setResetError("")
  //   setResetSuccess(false)
  //   setResetLoading(false)
  // }

  // const handleResetSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setResetError("")
    
  //   if (!resetEmail) {
  //     setResetError("Please enter your email address")
  //     return
  //   }
    
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  //   if (!emailRegex.test(resetEmail)) {
  //     setResetError("Please enter a valid email address")
  //     return
  //   }
    
  //   setResetLoading(true)
    
  //   setTimeout(() => {
  //     setResetLoading(false)
  //     setResetSuccess(true)
      
  //     setTimeout(() => {
  //       handleCloseForgotPassword()
  //     }, 3000)
  //   }, 1500)
  // }

  // React.useEffect(() => {
  //   const handleEscape = (e: KeyboardEvent) => {
  //     if (e.key === 'Escape') {
  //       handleCloseForgotPassword()
  //     }
  //   }
    
  //   if (showForgotPassword) {
  //     document.addEventListener('keydown', handleEscape)
  //     document.body.classList.add('overflow-hidden')
  //   }
    
  //   return () => {
  //     document.removeEventListener('keydown', handleEscape)
  //     document.body.classList.remove('overflow-hidden')
  //   }
  // }, [showForgotPassword])

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 lg:p-12 py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/login-background.png"
          alt=""
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-[#F7F4EF]/20 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-3.5 md:space-y-4 mb-8 sm:mb-10 md:mb-12 animate-fadeSlideIn">
          <Image 
            src="/images/attachai-logo-full.png" 
            alt="ATTACHAI" 
            width={1200}
            height={600}
            className="h-[120px] sm:h-[140px] md:h-[150px] lg:h-[160px] w-auto object-contain"
            priority
            style={{
              imageRendering: 'crisp-edges',
              WebkitFontSmoothing: 'antialiased'
            }}
          />
          <p className="font-serif text-[11px] sm:text-[12px] md:text-[13px] text-[#6E5A4F] tracking-[0.2em] uppercase leading-relaxed">
            AI WHATSAPP CONCIERGE
          </p>
        </div>

        <div className="w-full max-w-md lg:max-w-[420px] mx-auto p-6 sm:p-7 md:p-8 rounded-[20px] md:rounded-[22px] backdrop-blur-[24px] bg-white/85 border-0 shadow-[0_16px_60px_rgba(139,115,85,0.14),inset_0_1px_2px_rgba(255,255,255,0.9)] relative overflow-hidden animate-fadeSlideIn" style={{ animationDelay: '0.2s' }}>
          
          <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
            <div className="text-center">
              <h1 className="font-serif text-[19px] sm:text-[20px] md:text-[22px] font-light tracking-wide text-[#6E5A4F]">
                Sign In
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5 md:space-y-4">
              <div className="space-y-1 md:space-y-1.5">
                <Label className=" text-[10px] md:text-[11px] text-[#6E5A4F] font-normal flex items-center gap-1.5">
                  <Mail className="h-3 w-3 md:h-3.5 md:w-3.5 text-[#D8C8A8]" />
                  Email
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="grace@attachaiclub.com"
                  required
                  className="h-9 sm:h-10 rounded-[14px] md:rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] focus:shadow-[0_6px_20px_rgba(213,200,186,0.18)]  text-[12px] sm:text-[13px] font-normal text-[#6E5A4F] px-3 sm:px-3.5 transition-all duration-700"
                />
              </div>

              <div className="space-y-1 md:space-y-1.5">
                <Label className=" text-[10px] md:text-[11px] text-[#6E5A4F] font-normal flex items-center gap-1.5">
                  <Lock className="h-3 w-3 md:h-3.5 md:w-3.5 text-[#D8C8A8]" />
                  Password
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-9 sm:h-10 rounded-[14px] md:rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] focus:shadow-[0_6px_20px_rgba(213,200,186,0.18)]  text-[12px] sm:text-[13px] font-normal text-[#6E5A4F] px-3 sm:px-3.5 transition-all duration-700"
                />
              </div>

              <div className="pt-1 sm:pt-1.5 md:pt-2">
                <Button
                  type="submit"
                  className="w-full h-8 sm:h-9 px-5 sm:px-6 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] hover:from-[#D8C8A8]/95 hover:to-[#C9A876]/95 text-[#3a2f28] font-serif text-[11px] sm:text-[12px] font-normal uppercase tracking-wide shadow-[0_10px_36px_rgba(201,168,118,0.35)] hover:shadow-[0_14px_44px_rgba(201,168,118,0.45)] hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-700 ease-out active:scale-[1.01]"
                >
                  Continue
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="text-center pt-1.5 sm:pt-2">
                <button
                  type="button"
                  // onClick={handleForgotPasswordClick}
                  className="font-serif text-[10px] sm:text-[11px] text-[#D8C8A8] hover:text-[#C9A876] uppercase tracking-wider transition-all duration-700"
                >
                  Forgot password?
                </button>
              </div>
            </form>

            <div className="relative pt-3 sm:pt-3.5 md:pt-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D5C8BA]/30" />
              </div>
              <div className="relative flex justify-center text-[8px] sm:text-[9px] uppercase">
                <span className="bg-white/40 backdrop-blur-xl px-3 py-0.5 rounded-full  text-[#B8A896] tracking-widest">
                  or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-8 sm:h-9 px-4 sm:px-5 rounded-full backdrop-blur-xl bg-white/40 hover:bg-white/60 text-[#6E5A4F] border border-[#D8C8A8]/30 hover:border-[#D8C8A8]/50 font-serif text-[11px] sm:text-[12px] font-normal uppercase tracking-wide shadow-[0_6px_20px_rgba(139,115,85,0.1)] hover:shadow-[0_10px_28px_rgba(139,115,85,0.15)] hover:scale-[1.02] transition-all duration-700 ease-out active:scale-[1.0]"
              >
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-8 sm:h-9 px-4 sm:px-5 rounded-full backdrop-blur-xl bg-white/40 hover:bg-white/60 text-[#6E5A4F] border border-[#D8C8A8]/30 hover:border-[#D8C8A8]/50 font-serif text-[11px] sm:text-[12px] font-normal uppercase tracking-wide shadow-[0_6px_20px_rgba(139,115,85,0.1)] hover:shadow-[0_10px_28px_rgba(139,115,85,0.15)] hover:scale-[1.02] transition-all duration-700 ease-out active:scale-[1.0]"
              >
                Microsoft
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full flex justify-center pt-6 sm:pt-8 md:pt-10 pb-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
        <button
          onClick={() => router.push("/welcome")}
          className="group flex items-center gap-2  text-[12px] sm:text-[13px] text-[#8B7355] hover:text-[#6E5A4F] transition-all duration-700 min-h-[44px] px-4 py-2 rounded-full hover:bg-white/30 backdrop-blur-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-700 group-hover:-translate-x-1" />
          <span className="tracking-wide">Back to welcome</span>
        </button>
      </div>

      <PublicFooter />

      {showForgotPassword && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn"
          // onClick={handleCloseForgotPassword}
          // onClick={handleCloseForgotPassword}
        >
          <div className="absolute inset-0 bg-[#3a2f28]/40 backdrop-blur-md" />
          
          <div 
            className="relative w-full max-w-[420px] md:max-w-[480px] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-7 md:p-8 rounded-[20px] md:rounded-[22px] backdrop-blur-[24px] bg-white/85 border-0 shadow-[0_16px_60px_rgba(139,115,85,0.14),inset_0_1px_2px_rgba(255,255,255,0.9)] relative overflow-hidden">
              <button
                // onClick={handleCloseForgotPassword}
                // onClick={handleCloseForgotPassword}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#7A6A5D]/10 transition-all duration-500 group z-10"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-[#7A6A5D] group-hover:text-[#6E5A4F] transition-colors duration-500" />
              </button>

              {!resetSuccess ? (
                <>
                  <div className="text-center mb-5 sm:mb-6">
                    <h2 className="font-serif text-[20px] sm:text-[22px] md:text-[24px] font-light tracking-wide text-[#6E5A4F] mb-2.5 sm:mb-3">
                      Reset Password
                    </h2>
                    <p className=" text-[12px] sm:text-[13px] text-[#7A6A5D] leading-relaxed max-w-[340px] mx-auto">
                      Enter your email and we'll send you a secure link to reset your password.
                    </p>
                  </div>

                  {/* <form onSubmit={handleResetSubmit} className="space-y-4 sm:space-y-5"> */}
                  <form  className="space-y-4 sm:space-y-5">
                    <div className="space-y-1.5">
                      <Label className=" text-[10px] md:text-[11px] text-[#6E5A4F] font-normal flex items-center gap-1.5">
                        <Mail className="h-3 w-3 md:h-3.5 md:w-3.5 text-[#D8C8A8]" />
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => {
                          setResetEmail(e.target.value)
                          setResetError("")
                        }}
                        placeholder="grace@attachaiclub.com"
                        className="h-9 sm:h-10 rounded-[14px] md:rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] focus:shadow-[0_6px_20px_rgba(213,200,186,0.18)]  text-[12px] sm:text-[13px] font-normal text-[#6E5A4F] px-3 sm:px-3.5 transition-all duration-700"
                        disabled={resetLoading}
                      />
                    </div>

                    {resetError && (
                      <div className="p-3 rounded-xl bg-red-50/50 backdrop-blur-sm border border-red-200/50">
                        <p className=" text-[11px] text-red-600 text-center">
                          {resetError}
                        </p>
                      </div>
                    )}

                    <div className="pt-1">
                      <Button
                        type="submit"
                        disabled={resetLoading}
                        className="w-full h-8 sm:h-9 px-5 sm:px-6 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] hover:from-[#D8C8A8]/95 hover:to-[#C9A876]/95 text-[#3a2f28] font-serif text-[11px] sm:text-[12px] font-normal uppercase tracking-wide shadow-[0_10px_36px_rgba(201,168,118,0.35)] hover:shadow-[0_14px_44px_rgba(201,168,118,0.45)] hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-700 ease-out active:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                      >
                        {resetLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="h-3 w-3 border-2 border-[#3a2f28]/30 border-t-[#3a2f28] rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          "Send Reset Link"
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="text-center py-4 sm:py-6">
                    <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex items-center justify-center mb-4 sm:mb-5 animate-scaleIn">
                      <Mail className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <h3 className="font-serif text-[18px] sm:text-[20px] font-light tracking-wide text-[#6E5A4F] mb-2.5 sm:mb-3">
                      Check Your Email
                    </h3>
                    <p className=" text-[12px] sm:text-[13px] text-[#7A6A5D] leading-relaxed max-w-[320px] mx-auto">
                      A reset link has been sent to{" "}
                      <span className="font-medium text-[#6E5A4F]">{resetEmail}</span>
                    </p>
                    <p className=" text-[11px] text-[#B8A896] mt-3 sm:mt-4">
                      This window will close automatically.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
