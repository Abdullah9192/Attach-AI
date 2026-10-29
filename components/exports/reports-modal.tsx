"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Download, MessageCircle, UserCircle, AlertTriangle, ClipboardList } from 'lucide-react'
import { AiWebIcon } from '@/components/ui/ai-web-icon'
import { Card, CardContent } from "@/components/ui/card"

interface ReportsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reportType: 'daily' | 'weekly' | 'monthly'
}

export function ReportsModal({ open, onOpenChange, reportType }: ReportsModalProps) {
  const mockReportData = {
    totalMessages: 342,
    aiHandled: 89,
    humanHandled: 24,
    escalations: 3,
    insightsLearned: 5,
    topClientIntents: ["Float therapy", "Infrared sessions", "Regenerative dining"],
    newPreferences: {
      dietary: 5,
      service: 3,
    },
  }

  const handleDownload = () => {
    console.log("[v0] Backend not connected — this is a mock report download only")
    
    const reportContent = `
ATTACHAI Club - ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
Generated: ${new Date().toLocaleString()}

=== SUMMARY ===
Total Messages: ${mockReportData.totalMessages}
AI Handled: ${mockReportData.aiHandled}%
Human Handled: ${mockReportData.humanHandled}
Escalations: ${mockReportData.escalations}
Insights Learned: ${mockReportData.insightsLearned}

=== TOP CLIENT INTENTS ===
${mockReportData.topClientIntents.map((intent, i) => `${i + 1}. ${intent}`).join('\n')}

=== NEW PREFERENCES ===
Dietary Preferences: ${mockReportData.newPreferences.dietary}
Service Preferences: ${mockReportData.newPreferences.service}

---
Note: This is a mock report generated for demonstration purposes.
Backend integration required for live data.
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const filename = `attachai-${reportType}-report-${new Date().toISOString().split('T')[0]}.txt`
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="font-serif text-[#5A4A3F] text-lg font-light">
            {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
          </DialogTitle>
          <DialogDescription className="font-sans text-[#8B7355] text-sm font-light leading-relaxed">
            Summary of this {reportType}'s activity across your concierge service.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-5">
          <div className="grid grid-cols-2 gap-4">
            <Card className="backdrop-blur-xl bg-white/50 border-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-[#8B7355]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#8B7355] font-light">Total Messages</span>
                </div>
                <p className="text-3xl font-serif font-light text-[#5A4A3F]">{mockReportData.totalMessages}</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/50 border-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AiWebIcon className="h-4 w-4 text-[#8B7355]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#8B7355] font-light">AI Handled</span>
                </div>
                <p className="text-3xl font-serif font-light text-[#5A4A3F]">{mockReportData.aiHandled}%</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/50 border-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <UserCircle className="h-4 w-4 text-[#8B7355]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#8B7355] font-light">Human Handled</span>
                </div>
                <p className="text-3xl font-serif font-light text-[#5A4A3F]">{mockReportData.humanHandled}</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/50 border-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-[#8B7355]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#8B7355] font-light">Escalations</span>
                </div>
                <p className="text-3xl font-serif font-light text-[#5A4A3F]">{mockReportData.escalations}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="backdrop-blur-xl bg-white/50 border-0">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-[#8B7355]" />
                <span className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Top Client Intents</span>
              </div>
              <p className="text-sm font-serif text-[#6E5A4F] leading-relaxed italic">
                {mockReportData.topClientIntents.join(', ')}
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/50 border-0">
            <CardContent className="p-5 space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#8B7355] font-light">New Preferences Learned</span>
              <div className="flex gap-4">
                <div>
                  <span className="text-2xl font-serif font-light text-[#5A4A3F]">{mockReportData.newPreferences.dietary}</span>
                  <span className="text-xs text-[#8B7355] ml-2">dietary prefs</span>
                </div>
                <div>
                  <span className="text-2xl font-serif font-light text-[#5A4A3F]">{mockReportData.newPreferences.service}</span>
                  <span className="text-xs text-[#8B7355] ml-2">service prefs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="rounded-full h-10 px-6 backdrop-blur-xl bg-white/40 border-white/50 text-[#6E5A4F] text-sm font-light"
          >
            Close
          </Button>
          <Button 
            onClick={handleDownload}
            className="rounded-full h-10 px-6 bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] hover:shadow-[0_10px_28px_rgba(216,200,168,0.28)] text-sm font-light"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
