"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquare, Upload, X, Check } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export function NotFoundPage() {
  const router = useRouter()
  const [showReportModal, setShowReportModal] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: 'Grace G',
    description: '',
    screenshot: null as File | null
  })
  const { toast } = useToast()

  const handleSubmitReport = () => {
    toast({
      title: "Report Submitted",
      description: "Thank you for letting us know. We'll investigate this broken link.",
    })
    setShowReportModal(false)
    setFormData({
      name: 'Grace G',
      description: '',
      screenshot: null
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, screenshot: e.target.files[0] })
    }
  }

  return (
    <>
      <div className="min-h-screen relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65382a1d-3c86-4c18-8c75-15bfcc2350cb%20%281%29-vvWsAauI22ETsrfO4KJGfOdVHNaB3V.png')`
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F4EF]/20 via-transparent to-[#F7F4EF]/30" />
        
        <div className="ambient-breathe-layer absolute inset-0 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-xl">
          <div className="rounded-[32px] backdrop-blur-[40px] bg-white/60 border border-white/40 shadow-[0_24px_80px_rgba(139,115,85,0.3)] p-8 md:p-12 space-y-8">
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] shadow-[0_12px_48px_rgba(201,168,118,0.4)] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.8)]" />
                </div>
                <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] animate-ping opacity-20" />
              </div>
            </div>

            <div className="text-center space-y-4">
              <h1 className="font-serif text-[24px] md:text-[28px] font-light uppercase tracking-[0.08em] text-[#6E5A4F] leading-tight">
                This Area Isn't Available Right Now.
              </h1>
              
              <p className="font-sans text-[14px] md:text-[15px] font-light text-[#8B7355] leading-relaxed max-w-md mx-auto">
                An unexpected interruption occurred. Gently refresh, or return to your dashboard while we realign things.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                onClick={() => router.push('/dashboard')}
                className="w-full sm:w-auto h-12 px-10 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] hover:from-[#D8C8A8]/95 hover:to-[#C9A876]/95 text-white font-serif text-[13px] font-normal uppercase tracking-[0.08em] shadow-[0_10px_36px_rgba(201,168,118,0.35)] hover:shadow-[0_14px_44px_rgba(201,168,118,0.45)] hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-700"
              >
                Go to Dashboard
              </Button>
              
              <Button
                onClick={() => setShowReportModal(true)}
                variant="ghost"
                className="w-full sm:w-auto h-12 px-10 rounded-full backdrop-blur-xl bg-white/40 hover:bg-white/60 text-[#6E5A4F] border border-[#D8C8A8]/30 hover:border-[#D8C8A8]/50 font-serif text-[13px] font-normal uppercase tracking-[0.08em] shadow-[0_6px_20px_rgba(139,115,85,0.1)] hover:shadow-[0_10px_28px_rgba(139,115,85,0.15)] hover:scale-[1.02] transition-all duration-700"
              >
                Report This
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-10 text-center">
          <p className="font-serif text-[11px] font-light text-[#B8A896] tracking-[0.12em] uppercase">
            ATTACHAI · Intelligent by Nature. Intimate by Design.
          </p>
        </div>
      </div>

      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="max-w-2xl rounded-[28px] backdrop-blur-3xl bg-[#F7F4EF]/98 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.25)] p-0">
          <DialogHeader className="p-8 pb-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#D5C8BA] flex items-center justify-center shadow-[0_8px_24px_rgba(216,200,168,0.3)]">
                <MessageSquare className="h-6 w-6 text-[#5A4A42] stroke-[1.5]" />
              </div>
              <div>
                <DialogTitle className="font-serif text-xl text-[#5A4A42] uppercase tracking-wide">
                  REPORT BROKEN LINK
                </DialogTitle>
                <DialogDescription className="font-sans text-sm text-[#6E5A4F]">
                  Help us improve by reporting this issue
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="px-8 pb-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="font-sans text-xs text-[#6E5A4F] font-normal">NAME</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-11 rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm text-[#6E5A4F]"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-sans text-xs text-[#6E5A4F] font-normal">WHERE WERE YOU TRYING TO GO?</Label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Please describe what you clicked or what page you were looking for..."
                  rows={4}
                  className="w-full rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm text-[#6E5A4F] p-4 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-sans text-xs text-[#6E5A4F] font-normal">SCREENSHOT (OPTIONAL)</Label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="not-found-screenshot-upload"
                  />
                  <label
                    htmlFor="not-found-screenshot-upload"
                    className="flex items-center justify-center h-24 rounded-[16px] backdrop-blur-2xl bg-white/50 border-2 border-dashed border-[#D5C8BA]/40 hover:border-[#D8C8A8]/60 cursor-pointer transition-all duration-500"
                  >
                    {formData.screenshot ? (
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#7C6A5A]" />
                        <span className="font-sans text-sm text-[#6E5A4F]">{formData.screenshot.name}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setFormData({ ...formData, screenshot: null })
                          }}
                          className="ml-2 text-[#8B7355] hover:text-[#6E5A4F]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-5 w-5 text-[#D8C8A8]" />
                        <span className="font-sans text-xs text-[#6E5A4F]">Click to upload screenshot</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button 
                  onClick={handleSubmitReport}
                  disabled={!formData.description}
                  className="flex-1 h-11 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] hover:from-[#D8C8A8]/90 hover:to-[#D5C8BA]/90 text-[#5A4A42] font-serif text-xs uppercase tracking-widest shadow-[0_8px_24px_rgba(216,200,168,0.25)] transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  SUBMIT REPORT
                </Button>
                <Button 
                  onClick={() => setShowReportModal(false)}
                  variant="ghost"
                  className="h-11 px-6 rounded-full text-[#8B7355] hover:bg-[#E9E2D7]/30 font-sans text-xs uppercase tracking-widest transition-all duration-700"
                >
                  CANCEL
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
