"use client"

import * as React from "react"
import { MessageSquare, Lightbulb, Upload, X, Check } from 'lucide-react'
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

type ModalType = 'issue' | 'feature' | null

export function SupportFeedbackPage() {
  const [modalType, setModalType] = React.useState<ModalType>(null)
  const [formData, setFormData] = React.useState({
    name: 'Grace G',
    category: '',
    description: '',
    screenshot: null as File | null
  })
  const { toast } = useToast()

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

  return (
    <div className="min-h-screen p-8 lg:p-12">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl text-[#6E5A4F] font-light tracking-tight">SUPPORT & FEEDBACK</h1>
          <p className="font-sans text-sm text-[#6E5A4F] leading-relaxed">
            Help us improve ATTACHAI by reporting issues or suggesting new features.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Report an Issue Card */}
          <div 
            onClick={() => setModalType('issue')}
            className="group p-10 rounded-[28px] backdrop-blur-3xl bg-white/40 border-0 shadow-[0_16px_64px_rgba(213,200,186,0.2),inset_0_0_0_1px_rgba(216,200,168,0.2)] hover:shadow-[0_20px_80px_rgba(213,200,186,0.3)] hover:bg-white/50 transition-all duration-900 cursor-pointer animate-fadeSlideIn"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D8C8A8]/40 to-[#D5C8BA]/30 flex items-center justify-center shadow-[0_12px_40px_rgba(216,200,168,0.25)] group-hover:shadow-[0_16px_56px_rgba(216,200,168,0.35)] group-hover:scale-105 transition-all duration-900">
                <MessageSquare className="h-9 w-9 text-[#6E5A4F] stroke-[1.5]" />
              </div>
              
              <div className="space-y-3">
                <h2 className="font-serif text-xl text-[#6E5A4F] uppercase tracking-wide">REPORT AN ISSUE</h2>
                <p className="font-sans text-sm text-[#6E5A4F] leading-relaxed max-w-sm">
                  Found a bug or something not working as expected? Let us know so we can fix it.
                </p>
              </div>

              <Button className="w-full h-11 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] hover:from-[#D8C8A8]/90 hover:to-[#D5C8BA]/90 text-[#5A4A42] font-serif text-xs uppercase tracking-widest shadow-[0_8px_24px_rgba(216,200,168,0.25)] transition-all duration-700 group-hover:shadow-[0_12px_32px_rgba(216,200,168,0.35)]">
                REPORT ISSUE
              </Button>
            </div>
          </div>

          {/* Request a Feature Card */}
          <div 
            onClick={() => setModalType('feature')}
            className="group p-10 rounded-[28px] backdrop-blur-3xl bg-white/40 border-0 shadow-[0_16px_64px_rgba(213,200,186,0.2),inset_0_0_0_1px_rgba(216,200,168,0.2)] hover:shadow-[0_20px_80px_rgba(213,200,186,0.3)] hover:bg-white/50 transition-all duration-900 cursor-pointer animate-fadeSlideIn"
            style={{ animationDelay: '100ms' }}
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D8C8A8]/40 to-[#D5C8BA]/30 flex items-center justify-center shadow-[0_12px_40px_rgba(216,200,168,0.25)] group-hover:shadow-[0_16px_56px_rgba(216,200,168,0.35)] group-hover:scale-105 transition-all duration-900">
                <Lightbulb className="h-9 w-9 text-[#6E5A4F] stroke-[1.5]" />
              </div>
              
              <div className="space-y-3">
                <h2 className="font-serif text-xl text-[#6E5A4F] uppercase tracking-wide">REQUEST A FEATURE</h2>
                <p className="font-sans text-sm text-[#6E5A4F] leading-relaxed max-w-sm">
                  Have an idea for a new feature or improvement? Share your suggestions with us.
                </p>
              </div>

              <Button className="w-full h-11 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] hover:from-[#D8C8A8]/90 hover:to-[#D5C8BA]/90 text-[#5A4A42] font-serif text-xs uppercase tracking-widest shadow-[0_8px_24px_rgba(216,200,168,0.25)] transition-all duration-700 group-hover:shadow-[0_12px_32px_rgba(216,200,168,0.35)]">
                REQUEST FEATURE
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalType !== null} onOpenChange={() => setModalType(null)}>
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
              {/* Name Field */}
              <div className="space-y-2">
                <Label className="font-sans text-xs text-[#6E5A4F] font-normal">NAME</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-11 rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm text-[#6E5A4F]"
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <Label className="font-sans text-xs text-[#6E5A4F] font-normal">CATEGORY</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="h-11 rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm text-[#6E5A4F]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[20px] backdrop-blur-3xl bg-[#F7F4EF]/95 border-[#D5C8BA]/30">
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="ui">UI Issue</SelectItem>
                    <SelectItem value="data">Data Issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
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

              {/* Screenshot Upload */}
              <div className="space-y-2">
                <Label className="font-sans text-xs text-[#6E5A4F] font-normal">SCREENSHOT (OPTIONAL)</Label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <label
                    htmlFor="screenshot-upload"
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

              {/* Submit Button */}
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
    </div>
  )
}
