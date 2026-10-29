"use client"

import * as React from "react"
import { Save, MessageSquare, Upload, Building2, User, Check, RefreshCw, Plus, X, FileText, CircleDot } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function BrandVoicePage() {
  const [previewContext, setPreviewContext] = React.useState<'greeting' | 'booking' | 'apology' | 'upset' | 'vip' | 'escalation'>('greeting')
  const [doGuidelines, setDoGuidelines] = React.useState([
    "Use client name",
    "Offer alternatives",
    "Confirm details"
  ])
  const [dontGuidelines, setDontGuidelines] = React.useState([
    "No slang",
    "No assumptions",
    "No over-promising"
  ])

  const getPreviewText = () => {
    const contexts = {
      greeting: "Good afternoon! I'm here to help make your experience exceptional.",
      booking: "Perfect! I've secured your reservation for 7:30 PM this evening.",
      apology: "I sincerely apologize. Let me connect you with our manager immediately.",
      upset: "I understand your concern and I'm here to help right away.",
      vip: "Welcome back, Ms. Chen. Your preferred suite is ready.",
      escalation: "I'm connecting you with our senior team member now."
    }
    return contexts[previewContext]
  }

  const addDoGuideline = () => {
    setDoGuidelines([...doGuidelines, ""])
  }

  const removeDoGuideline = (index: number) => {
    setDoGuidelines(doGuidelines.filter((_, i) => i !== index))
  }

  const updateDoGuideline = (index: number, value: string) => {
    const updated = [...doGuidelines]
    updated[index] = value
    setDoGuidelines(updated)
  }

  const addDontGuideline = () => {
    setDontGuidelines([...dontGuidelines, ""])
  }

  const removeDontGuideline = (index: number) => {
    setDontGuidelines(dontGuidelines.filter((_, i) => i !== index))
  }

  const updateDontGuideline = (index: number, value: string) => {
    const updated = [...dontGuidelines]
    updated[index] = value
    setDontGuidelines(updated)
  }

  return (
    <div className="min-h-screen p-12">
      <div className="max-w-[1400px] mx-auto mb-6">
        <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase">
          BRAND VOICE
        </h1>
        <p className="text-sm text-[#6E5A4F] leading-relaxed">
          Shape how your AI expresses your brand's intelligence and intimacy
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 gap-6">
          
          {/* Left Column: Voice Overview + Guidelines + Preview */}
          <div className="space-y-5">
            <div 
              className="backdrop-blur-3xl bg-white/40 rounded-[22px] shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] p-5"
              style={{ animation: 'fadeIn 200ms ease-out' }}
            >
              <h2 className="font-serif text-base text-[#3a2f28] mb-4">Voice Overview</h2>

              <div className="space-y-3">
                <textarea
                  className="w-full h-32 backdrop-blur-2xl bg-white/50 border-0 rounded-[18px] p-4 text-[15px] font-normal text-[#6E5A4F] leading-relaxed resize-none focus:outline-none shadow-[0_8px_24px_-4px_rgba(139,115,85,0.08)] placeholder:text-[#B8A896]/60"
                  placeholder="Describe the tone, feeling, and character your concierge should express."
                  defaultValue="Warm, refined, and attentive. Our brand voice embodies understated luxury and genuine care for each guest."
                />
                <p className="text-xs text-[#B8A896] leading-relaxed">
                  This helps ATTACHAI understand your unique brand presence.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-3xl bg-white/40 rounded-[22px] shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-base text-[#3a2f28]">Guidelines</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 px-4 rounded-full text-[#8B7355] hover:bg-[#E9E2D7]/30 text-xs transition-all duration-700 gap-2"
                >
                  <Upload className="h-3 w-3" />
                  Upload Document
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Do's Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs text-[#3a2f28] font-medium tracking-wide uppercase">Do's</span>
                  </div>

                  <div className="space-y-2">
                    {doGuidelines.map((guideline, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={guideline}
                          onChange={(e) => updateDoGuideline(index, e.target.value)}
                          className="flex-1 h-9 rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_12px_rgba(213,200,186,0.1)] text-xs font-normal text-[#6E5A4F]"
                          placeholder="Enter guideline..."
                        />
                        <button
                          onClick={() => removeDoGuideline(index)}
                          className="w-7 h-7 rounded-full bg-white/50 hover:bg-white/70 flex items-center justify-center text-[#B8A896] hover:text-[#8B7355] transition-all duration-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addDoGuideline}
                      className="w-full px-3 py-2 rounded-full text-xs font-medium bg-white/60 text-[#8B7355] hover:bg-white/80 backdrop-blur-xl transition-all duration-500 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Don'ts Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-[#9B8370]/30 flex items-center justify-center">
                      <span className="text-xs text-[#9B8370]">×</span>
                    </div>
                    <span className="text-xs text-[#3a2f28] font-medium tracking-wide uppercase">Don'ts</span>
                  </div>

                  <div className="space-y-2">
                    {dontGuidelines.map((guideline, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={guideline}
                          onChange={(e) => updateDontGuideline(index, e.target.value)}
                          className="flex-1 h-9 rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_12px_rgba(213,200,186,0.1)] text-xs font-normal text-[#6E5A4F]"
                          placeholder="Enter guideline..."
                        />
                        <button
                          onClick={() => removeDontGuideline(index)}
                          className="w-7 h-7 rounded-full bg-white/50 hover:bg-white/70 flex items-center justify-center text-[#B8A896] hover:text-[#8B7355] transition-all duration-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addDontGuideline}
                      className="w-full px-3 py-2 rounded-full text-xs font-medium bg-white/60 text-[#8B7355] hover:bg-white/80 backdrop-blur-xl transition-all duration-500 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-3xl bg-white/40 rounded-[22px] shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] p-5">
              <h2 className="font-serif text-base text-[#3a2f28] mb-4">Live Preview</h2>

              <div className="flex gap-2 flex-wrap mb-4">
                {(['greeting', 'booking', 'apology', 'upset', 'vip', 'escalation'] as const).map((context) => (
                  <button
                    key={context}
                    onClick={() => setPreviewContext(context)}
                    className={`px-4 py-2 rounded-full text-xs font-normal transition-all duration-700 ${
                      previewContext === context
                        ? 'bg-[#D8C8A8]/50 text-[#3a2f28] shadow-[0_4px_20px_rgba(216,200,168,0.35),inset_0_1px_2px_rgba(255,255,255,0.7)] scale-[1.02]'
                        : 'bg-white/60 text-[#8B7355] hover:bg-white/80'
                    }`}
                  >
                    {context === 'vip' ? 'VIP' : context === 'escalation' ? 'Escalate' : context.charAt(0).toUpperCase() + context.slice(1)}
                  </button>
                ))}
              </div>

              <div 
                className="backdrop-blur-3xl bg-gradient-to-br from-white/60 to-white/40 rounded-[16px] shadow-[0_8px_28px_-4px_rgba(139,115,85,0.12)] p-5 mb-3"
                key={previewContext}
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex items-center justify-center flex-shrink-0">
                    <CircleDot className="w-3.5 h-3.5 text-white" strokeWidth={1.25} />
                  </div>
                  <p className="text-[15px] font-normal text-[#6E5A4F] leading-relaxed flex-1">
                    {getPreviewText()}
                  </p>
                </div>
              </div>

              <button className="w-full px-4 py-2.5 rounded-full text-xs font-medium bg-white/60 text-[#8B7355] hover:bg-white/80 backdrop-blur-xl transition-all duration-500 flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate
              </button>
            </div>
          </div>

          {/* Right Column: Brand Avatar + Company Info */}
          <div className="space-y-5">
            <div className="backdrop-blur-3xl bg-white/40 rounded-[22px] shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] p-5">
              <h2 className="font-serif text-base text-[#3a2f28] mb-5">Brand Avatar</h2>

              <div className="flex gap-6">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-[#6E5A4F] font-normal">AI Name</Label>
                    <Input
                      className="backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[18px] h-10 px-4 text-[15px] font-normal text-[#6E5A4F] shadow-[0_4px_16px_rgba(213,200,186,0.1)]"
                      defaultValue="Alexander"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-[#6E5A4F] font-normal">Role</Label>
                    <Input
                      className="backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[18px] h-10 px-4 text-[15px] font-normal text-[#6E5A4F] shadow-[0_4px_16px_rgba(213,200,186,0.1)]"
                      defaultValue="Virtual Concierge"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-[#6E5A4F] font-normal">Greeting</Label>
                    <Input
                      className="backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[18px] h-10 px-4 text-[15px] font-normal text-[#6E5A4F] shadow-[0_4px_16px_rgba(213,200,186,0.1)]"
                      defaultValue="Hello! I'm here to help."
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-start pt-1">
                  <div className="w-16 h-16 mb-3 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex items-center justify-center shadow-[0_12px_36px_rgba(216,200,168,0.25)]">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-sm text-[#3a2f28] mb-0.5">Alexander</h3>
                  <p className="text-xs text-[#8B7355] mb-3">Concierge</p>
                  
                  <Button className="w-full rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] hover:shadow-[0_6px_20px_rgba(216,200,168,0.3)] text-[#3a2f28] h-9 text-xs transition-all duration-700">
                    <Upload className="mr-1.5 h-3 w-3" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-3xl bg-white/40 rounded-[22px] shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] p-5">
              <h2 className="font-serif text-base text-[#3a2f28] mb-5">Company Information</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-[#6E5A4F] font-normal">Name</Label>
                    <Input
                      className="backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[18px] h-10 px-4 text-[15px] font-normal text-[#6E5A4F] shadow-[0_4px_16px_rgba(213,200,186,0.1)]"
                      defaultValue="The Aman Resort"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-[#6E5A4F] font-normal">Type</Label>
                    <Input
                      className="backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[18px] h-10 px-4 text-[15px] font-normal text-[#6E5A4F] shadow-[0_4px_16px_rgba(213,200,186,0.1)]"
                      defaultValue="Luxury Resort"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-[#6E5A4F] font-normal">Location</Label>
                  <Input
                    className="backdrop-blur-2xl bg-white/50 border-0 rounded-[18px] h-10 px-4 text-[15px] font-normal text-[#6E5A4F] shadow-[0_4px_16px_rgba(213,200,186,0.1)] focus:outline-none"
                    defaultValue="Bali, Indonesia"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-[#6E5A4F] font-normal">Philosophy</Label>
                    <textarea
                      className="w-full h-20 backdrop-blur-2xl bg-white/50 border-0 rounded-[18px] p-3 text-[15px] font-normal text-[#6E5A4F] leading-relaxed resize-none focus:outline-none shadow-[0_4px_16px_rgba(213,200,186,0.1)]"
                      defaultValue="A sanctuary of tranquility."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-[#6E5A4F] font-normal">Services</Label>
                    <textarea
                      className="w-full h-20 backdrop-blur-2xl bg-white/50 border-0 rounded-[18px] p-3 text-[15px] font-normal text-[#6E5A4F] leading-relaxed resize-none focus:outline-none shadow-[0_4px_16px_rgba(213,200,186,0.1)]"
                      defaultValue="Spa, dining, wellness."
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#817462]/10">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs text-[#8B7355] font-medium">AI Understanding</Label>
                    <span className="text-xs text-[#D8C8A8] font-medium">87%</span>
                  </div>
                  <div className="h-1.5 bg-white/50 rounded-full overflow-hidden backdrop-blur-xl">
                    <div 
                      className="h-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] rounded-full"
                      style={{ width: '87%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button className="rounded-full h-11 px-8 text-xs bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] hover:shadow-[0_12px_36px_rgba(216,200,168,0.4)] text-[#3a2f28] transition-all duration-700">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
