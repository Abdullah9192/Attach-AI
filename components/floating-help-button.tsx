"use client"

import * as React from "react"
import { HelpCircle, MessageSquare, Lightbulb, X, Check, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { usePathname } from 'next/navigation'

type ModalType = 'choose' | 'issue' | 'feature' | null

export function FloatingHelpButton() {
  const pathname = usePathname()
  const [modalType, setModalType] = React.useState<ModalType>(null)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: 'Grace G',
    category: '',
    description: '',
    screenshot: null as File | null
  })
  const { toast } = useToast()

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 200)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = () => {
    toast({
      title: "Submitted Successfully",
      description: `Your ${modalType === 'issue' ? 'issue report' : 'feature request'} has been received. We'll review it shortly.`,
    })
    setModalType(null)
    setFormData({
      name: 'Grace G',
      category: '',
      description: '',
      screenshot: null
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, screenshot: e.target.files[0] })
    }
  }

  const shouldHideButton = React.useMemo(() => {
    if (pathname?.startsWith('/admin')) return true
    
    if (pathname?.startsWith('/login') || pathname?.startsWith('/welcome')) return true
    
    if (pathname?.match(/\/[^/]+\/[0-9a-f-]{36}|\/[^/]+\/\d+/)) return true
    
    return false
  }, [pathname])

  if (shouldHideButton) return null

  return (
    <>
      {/* Floating Help Button - Single Global Instance */}
      <button
        onClick={() => setModalType('choose')}
        style={{
          bottom: 'max(24px, env(safe-area-inset-bottom))',
          right: 'max(24px, env(safe-area-inset-right))',
        }}
        className={`fixed w-11 h-11 rounded-full backdrop-blur-2xl bg-[rgba(247,244,239,0.8)] border border-[rgba(213,200,186,0.2)] shadow-[0_8px_32px_rgba(139,115,85,0.15)] hover:shadow-[0_12px_48px_rgba(139,115,85,0.2)] hover:bg-[rgba(247,244,239,0.95)] hover:scale-105 transition-all duration-700 z-[9999] flex items-center justify-center group will-change-transform pointer-events-auto max-[390px]:!bottom-[max(16px,env(safe-area-inset-bottom))] max-[390px]:!right-[max(16px,env(safe-area-inset-right))] ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Help & Support"
      >
        <HelpCircle className="h-5 w-5 text-[#6E5A4F]/70 stroke-[1.5] group-hover:text-[#6E5A4F] group-hover:scale-110 transition-all duration-700" />
      </button>

      {/* Choice Modal */}
      <Dialog open={modalType === 'choose'} onOpenChange={() => setModalType(null)}>
        <DialogContent className="max-w-md rounded-[28px] backdrop-blur-3xl bg-[#F7F4EF]/98 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.25)] p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="font-serif text-xl text-[#5A4A42] uppercase tracking-wide text-center">
              HOW CAN WE HELP?
            </DialogTitle>
            <DialogDescription className="font-sans text-sm text-[#6E5A4F] text-center">
              Choose an option below
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <button
              onClick={() => setModalType('issue')}
              className="w-full p-6 rounded-[20px] backdrop-blur-3xl bg-white/50 border-0 shadow-[0_8px_32px_rgba(213,200,186,0.12)] hover:shadow-[0_12px_48px_rgba(213,200,186,0.2)] hover:bg-white/60 transition-all duration-700 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#D5C8BA] flex items-center justify-center shadow-[0_6px_20px_rgba(216,200,168,0.25)] group-hover:scale-105 transition-transform duration-700">
                  <MessageSquare className="h-5 w-5 text-[#5A4A42] stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-sm text-[#5A4A42] uppercase tracking-wide mb-1">REPORT AN ISSUE</h3>
                  <p className="font-sans text-xs text-[#6E5A4F]">Something not working right?</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setModalType('feature')}
              className="w-full p-6 rounded-[20px] backdrop-blur-3xl bg-white/50 border-0 shadow-[0_8px_32px_rgba(213,200,186,0.12)] hover:shadow-[0_12px_48px_rgba(213,200,186,0.2)] hover:bg-white/60 transition-all duration-700 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#D5C8BA] flex items-center justify-center shadow-[0_6px_20px_rgba(216,200,168,0.25)] group-hover:scale-105 transition-transform duration-700">
                  <Lightbulb className="h-5 w-5 text-[#5A4A42] stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-sm text-[#5A4A42] uppercase tracking-wide mb-1">REQUEST A FEATURE</h3>
                  <p className="font-sans text-xs text-[#6E5A4F]">Have an idea to share?</p>
                </div>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Issue/Feature Modal */}
      <Dialog open={modalType === 'issue' || modalType === 'feature'} onOpenChange={() => setModalType(null)}>
        <DialogContent className="max-w-2xl rounded-[28px] backdrop-blur-3xl bg-[#F7F4EF]/98 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.25)] p-0">
          <DialogHeader className="p-8 pb-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#D5C8BA] flex items-center justify-center shadow-[0_8px_24px_rgba(216,200,168,0.3)]">
                {modalType === 'issue' ? (
                  <MessageSquare className="h-6 w-6 text-[#5A4A42] stroke-[1.5]" />
                ) : (
                  <Lightbulb className="h-6 w-6 text-[#5A4A42] stroke-[1.5]" />
                )}
              </div>
              <div>
                <DialogTitle className="font-serif text-xl text-[#5A4A42] uppercase tracking-wide">
                  {modalType === 'issue' ? 'REPORT AN ISSUE' : 'REQUEST A FEATURE'}
                </DialogTitle>
                <DialogDescription className="font-sans text-sm text-[#6E5A4F]">
                  {modalType === 'issue' 
                    ? 'Describe the problem you encountered'
                    : 'Share your feature idea with us'
                  }
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
                <Label className="font-sans text-xs text-[#6E5A4F] font-normal">CATEGORY</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="h-11 rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm text-[#6E5A4F]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[20px] backdrop-blur-3xl bg-[#F7F4EF]/95 border-[#D5C8BA]/30">
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="ui">UI/UX Issue</SelectItem>
                    <SelectItem value="performance">Performance Issue</SelectItem>
                    <SelectItem value="data">Data Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-sans text-xs text-[#6E5A4F] font-normal">DESCRIPTION</Label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={modalType === 'issue' 
                    ? 'Please describe what happened and the steps to reproduce the issue...'
                    : 'Describe your feature idea and how it would improve your experience...'
                  }
                  rows={5}
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
                    id="floating-screenshot-upload"
                  />
                  <label
                    htmlFor="floating-screenshot-upload"
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
                  onClick={handleSubmit}
                  disabled={!formData.category || !formData.description}
                  className="flex-1 h-11 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] hover:from-[#D8C8A8]/90 hover:to-[#D5C8BA]/90 text-[#5A4A42] font-serif text-xs uppercase tracking-widest shadow-[0_8px_24px_rgba(216,200,168,0.25)] transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  SUBMIT
                </Button>
                <Button 
                  onClick={() => setModalType(null)}
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
