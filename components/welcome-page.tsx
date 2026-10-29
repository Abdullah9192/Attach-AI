"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { PublicFooter } from "@/components/public-footer"
import Image from 'next/image'

export function WelcomePage() {
  const router = useRouter()
  const [videoEnded, setVideoEnded] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      setVideoEnded(true)
    }

    video.addEventListener('ended', handleVideoEnd)
    return () => video.removeEventListener('ended', handleVideoEnd)
  }, [])

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3fe3fd77-76e6-44f3-bd60-fb82881cbd4d-NpgJsxc88I2ofWU8t8sEOlvfCrUERG.mp4" type="video/mp4" />
      </video>
      
      {videoEnded && (
        <>
          <div className="ambient-breathe-layer absolute inset-0 pointer-events-none" />
          <div className="ambient-light-shift absolute inset-0 pointer-events-none" />
          <div className="ambient-blur-pulse absolute inset-0 pointer-events-none" />
        </>
      )}
      
      <div className="absolute inset-0 bg-[#F7F4EF]/70 md:bg-[#F7F4EF]/65 backdrop-blur-[2px] md:backdrop-blur-[1.5px]" />
      
      <div className="relative z-10 w-full max-w-full sm:max-w-2xl lg:max-w-4xl space-y-2 sm:space-y-8 md:space-y-10 lg:space-y-6 animate-fadeSlideIn px-4 sm:px-0 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-28">
        
        <div className="flex justify-center animate-fadeIn" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
          <Image 
            src="/images/attachai-logo-full.png" 
            alt="ATTACHAI" 
            width={1200}
            height={600}
            className="h-[150px] sm:h-[210px] md:h-[200px] lg:h-[200px] w-auto object-contain opacity-0 animate-fadeIn"
            style={{ 
              animationDelay: '0.5s',
              animationDuration: '0.8s',
              animationFillMode: 'forwards'
            }}
            priority
          />
        </div>

        <div className="text-center space-y-3 sm:space-y-5 md:space-y-6 lg:space-y-5 relative opacity-0 animate-fadeIn -mt-6 sm:-mt-2 md:mt-0 lg:-mt-4" style={{ animationDelay: '0.7s', animationDuration: '0.9s', animationFillMode: 'forwards' }}>
          <div className="absolute inset-0 bg-gradient-radial from-[#C9A876]/8 via-transparent to-transparent blur-3xl -z-10" />
          
          <p className="font-serif text-lg sm:text-[19px] md:text-[19px] lg:text-[22px] font-light text-[#6E5A4F] leading-[1.6] md:leading-[1.65] tracking-[0.02em] px-4 max-w-[90%] md:max-w-[70%] mx-auto">
            The intelligence layer that refines every service touchpoint.
          </p>
          
          <p className="font-sans text-sm sm:text-[13px] md:text-[13.5px] lg:text-[15px] font-light text-[#6E5A4F] leading-[1.6] md:leading-[1.65] max-w-full sm:max-w-lg md:max-w-[78%] lg:max-w-xl mx-auto opacity-100 px-4">
            Your WhatsApp concierge for elevated, responsive communication — crafted for luxury hospitality and premium service brands.
          </p>
        </div>

        <div className="opacity-0 animate-fadeIn px-2 sm:px-4 md:px-8 mt-8 sm:mt-6 md:mt-8 lg:mt-6 mb-16 sm:mb-20 md:mb-24 lg:mb-28" style={{ animationDelay: '0.9s', animationDuration: '1s', animationFillMode: 'forwards' }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-4">
            <Button
              onClick={() => router.push("/login")}
              className="w-full max-w-[200px] sm:max-w-[160px] md:max-w-[170px] lg:w-auto h-8 sm:h-9 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] hover:from-[#D8C8A8]/95 hover:to-[#C9A876]/95 text-[#3a2f28] font-serif text-[12px] sm:text-[13px] font-normal uppercase tracking-wide shadow-[0_10px_36px_rgba(201,168,118,0.35)] hover:shadow-[0_14px_44px_rgba(201,168,118,0.45)] hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-700 ease-out active:scale-[1.01]"
            >
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              className="w-full max-w-[200px] sm:max-w-[160px] md:max-w-[170px] lg:w-auto h-8 sm:h-9 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full backdrop-blur-xl bg-white/40 hover:bg-white/60 text-[#6E5A4F] border border-[#D8C8A8]/30 hover:border-[#D8C8A8]/50 font-serif text-[12px] sm:text-[13px] font-normal uppercase tracking-wide shadow-[0_6px_20px_rgba(139,115,85,0.1)] hover:shadow-[0_10px_28px_rgba(139,115,85,0.15)] hover:scale-[1.02] transition-all duration-700 ease-out active:scale-[1.0]"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <div className="opacity-0 animate-fadeIn" style={{ animationDelay: '1.1s', animationDuration: '0.8s', animationFillMode: 'forwards' }}>
        <PublicFooter />
      </div>
    </div>
  )
}
