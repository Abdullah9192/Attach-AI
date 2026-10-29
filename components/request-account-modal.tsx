"use client"

import * as React from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRequestAccount } from "@/contexts/request-account-context"

export function RequestAccountModal() {
  const { isOpen, closeModal } = useRequestAccount()
  const { toast } = useToast()
  const [accountRequestForm, setAccountRequestForm] = React.useState({
    accountName: '',
    locationName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    notes: ''
  })

  const handleSubmit = () => {
    if (!accountRequestForm.accountName || !accountRequestForm.contactEmail) {
      toast({
        title: "Missing Information",
        description: "Please provide at least account name and contact email.",
        variant: "destructive"
      })
      return
    }

    console.log('[v0] Account request submitted:', accountRequestForm)
    
    toast({
      title: "Request Submitted",
      description: "Your account implementation request has been sent to the ATTACHAI team. We'll be in touch within 24 hours.",
    })

    setAccountRequestForm({
      accountName: '',
      locationName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      notes: ''
    })
    closeModal()
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#8B7355]/30 backdrop-blur-md animate-in fade-in duration-500"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal()
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          closeModal()
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-[96vw] sm:w-[85vw] md:w-[560px] max-w-[560px] mx-auto rounded-[24px] backdrop-blur-3xl bg-gradient-to-br from-[#FAF8F4]/95 via-[#F7F4EF]/95 to-[#F5F1EA]/95 border border-white/60 shadow-[0_32px_96px_rgba(139,115,85,0.2),0_0_1px_rgba(255,255,255,0.5)_inset] animate-in zoom-in-95 fade-in duration-500"
      >
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 text-[#8B7355] hover:text-[#6E5A4F] transition-colors duration-500 z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto px-5 sm:px-8 md:px-10 py-6 sm:py-10 md:py-12">
          <div className="mb-6 sm:mb-10 pr-6 sm:pr-8">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#5A4A42] uppercase tracking-wide mb-2 sm:mb-3 md:mb-4">
              REQUEST NEW ACCOUNT
            </h2>
            <p className="text-sm sm:text-base text-[#6E5A4F] leading-relaxed font-sans">
              Submit a request to add a new account or location to ATTACHAI. Our team will review and begin the implementation process.
            </p>
          </div>

          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            <div className="space-y-2.5 sm:space-y-3">
              <Label htmlFor="accountName" className="text-xs uppercase tracking-wider text-[#6E5A4F] font-sans font-medium inline-block">
                Account Name *
              </Label>
              <Input
                id="accountName"
                placeholder="e.g., The Aman Resort Group"
                value={accountRequestForm.accountName}
                onChange={(e) => setAccountRequestForm(prev => ({ ...prev, accountName: e.target.value }))}
                className="h-10 sm:h-11 md:h-12 rounded-full border-[#E9E2D7] bg-white/60 backdrop-blur-sm focus:border-[#C9A876] focus:ring-[#C9A876]/20 text-[#5A4A42] font-sans"
              />
              <p className="text-xs text-[#8B7355] font-sans">The parent organization or brand name</p>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <Label htmlFor="locationName" className="text-xs uppercase tracking-wider text-[#6E5A4F] font-sans font-medium inline-block">
                Location Name (Optional)
              </Label>
              <Input
                id="locationName"
                placeholder="e.g., Aman Tokyo, Aman New York"
                value={accountRequestForm.locationName}
                onChange={(e) => setAccountRequestForm(prev => ({ ...prev, locationName: e.target.value }))}
                className="h-10 sm:h-11 md:h-12 rounded-full border-[#E9E2D7] bg-white/60 backdrop-blur-sm focus:border-[#C9A876] focus:ring-[#C9A876]/20 text-[#5A4A42] font-sans"
              />
              <p className="text-xs text-[#8B7355] font-sans">Specific property or location (can add more later)</p>
            </div>

            <div className="pt-4 sm:pt-6 md:pt-8 border-t border-[#E9E2D7]/50">
              <h3 className="font-serif text-base sm:text-lg uppercase tracking-wider text-[#6E5A4F] mb-4 sm:mb-5 md:mb-6">
                Primary Contact
              </h3>
              
              <div className="space-y-5 sm:space-y-6">
                <div className="space-y-2.5 sm:space-y-3">
                  <Label htmlFor="contactName" className="text-xs uppercase tracking-wider text-[#6E5A4F] font-sans font-medium inline-block">
                    Full Name
                  </Label>
                  <Input
                    id="contactName"
                    placeholder="Grace G"
                    value={accountRequestForm.contactName}
                    onChange={(e) => setAccountRequestForm(prev => ({ ...prev, contactName: e.target.value }))}
                    className="h-10 sm:h-11 md:h-12 rounded-full border-[#E9E2D7] bg-white/60 backdrop-blur-sm focus:border-[#C9A876] focus:ring-[#C9A876]/20 text-[#5A4A42] font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2.5 sm:space-y-3">
                    <Label htmlFor="contactEmail" className="text-xs uppercase tracking-wider text-[#6E5A4F] font-sans font-medium inline-block">
                      Email *
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="grace.g@attachaiclub.com"
                      value={accountRequestForm.contactEmail}
                      onChange={(e) => setAccountRequestForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className="h-10 sm:h-11 md:h-12 rounded-full border-[#E9E2D7] bg-white/60 backdrop-blur-sm focus:border-[#C9A876] focus:ring-[#C9A876]/20 text-[#5A4A42] font-sans"
                    />
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    <Label htmlFor="contactPhone" className="text-xs uppercase tracking-wider text-[#6E5A4F] font-sans font-medium inline-block">
                      Phone (Optional)
                    </Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={accountRequestForm.contactPhone}
                      onChange={(e) => setAccountRequestForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                      className="h-10 sm:h-11 md:h-12 rounded-full border-[#E9E2D7] bg-white/60 backdrop-blur-sm focus:border-[#C9A876] focus:ring-[#C9A876]/20 text-[#5A4A42] font-sans"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <Label htmlFor="notes" className="text-xs uppercase tracking-wider text-[#6E5A4F] font-sans font-medium inline-block">
                Additional Information (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Number of expected locations, specific requirements, timeline expectations..."
                value={accountRequestForm.notes}
                onChange={(e) => setAccountRequestForm(prev => ({ ...prev, notes: e.target.value }))}
                className="min-h-[100px] sm:min-h-[120px] rounded-2xl border-[#E9E2D7] bg-white/60 backdrop-blur-sm focus:border-[#C9A876] focus:ring-[#C9A876]/20 resize-none text-[#5A4A42] font-sans"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-6 sm:mt-8 md:mt-10 pt-5 sm:pt-6 md:pt-8 border-t border-[#E9E2D7]/50">
            <Button
              variant="ghost"
              onClick={closeModal}
              className="w-full sm:w-auto rounded-full px-6 sm:px-8 h-10 sm:h-11 md:h-12 text-[#6E5A4F] hover:bg-[#F7F4EF] font-sans"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="w-full sm:w-auto rounded-full px-8 sm:px-10 h-10 sm:h-11 md:h-12 bg-gradient-to-r from-[#C9A876] to-[#B89968] text-white shadow-sm hover:shadow-md transition-all duration-500 font-sans font-medium"
            >
              Submit Request
            </Button>
          </div>

          <div className="mt-5 sm:mt-6 md:mt-8 p-4 sm:p-5 rounded-2xl bg-[#F7F4EF]/60 border border-[#E9E2D7]/50">
            <p className="text-xs sm:text-sm text-[#6E5A4F] leading-relaxed font-sans">
              <span className="font-medium">What happens next:</span> Your request will be reviewed by the ATTACHAI implementation team. We'll contact you within 24 hours to discuss your requirements, timeline, and begin the onboarding process. Multiple locations can be added under a single account.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
