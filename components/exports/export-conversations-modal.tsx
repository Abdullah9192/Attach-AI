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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Download, FileText, Mail, MessageCircle } from 'lucide-react'
import { mockConversations } from "@/mock/conversations"
import { convertToCSV, downloadCSV } from "@/utils/csvExport"
import { downloadJSON } from "@/utils/jsonExport"

interface ExportConversationsModalProps {
  showModal: boolean
  onClose: () => void
}

export function ExportConversationsModal({ showModal, onClose }: ExportConversationsModalProps) {
  const [format, setFormat] = React.useState<'csv' | 'json' | 'pdf'>('pdf')
  const [filter, setFilter] = React.useState<'all' | 'ai' | 'human' | 'hybrid'>('all')
  const [dateRange, setDateRange] = React.useState<'today' | 'week' | 'month'>('today')
  const [exportAction, setExportAction] = React.useState<'download' | 'email' | 'whatsapp'>('download')

  const handleExport = () => {
    console.log("[v0] Backend not connected — this is a mock export only")
    
    let filteredData = mockConversations.filter(conv => {
      if (filter === 'all') return true
      return conv.handler.toLowerCase() === filter
    })

    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `conversations-export-${timestamp}`

    if (exportAction === 'download') {
      if (format === 'csv') {
        const csvData = filteredData.map(conv => ({
          'Guest Name': conv.guestName,
          'Phone': conv.guestPhone,
          'Room': conv.room,
          'Handler': conv.handler,
          'Confidence': `${Math.round(conv.confidence * 100)}%`,
          'Status': conv.status,
          'Messages': conv.messages.length,
          'Tags': conv.tags.join(', '),
          'Timestamp': conv.timestamp,
        }))
        const csv = convertToCSV(csvData, Object.keys(csvData[0]))
        downloadCSV(`${filename}.csv`, csv)
      } else if (format === 'json') {
        downloadJSON(`${filename}.json`, filteredData)
      } else if (format === 'pdf') {
        console.log("[v0] PDF generation would happen here - requires backend")
        alert("PDF export will be generated. This requires backend integration.")
      }
    } else if (exportAction === 'email') {
      const subject = `ATTACHAI Conversation Export - ${dateRange}`
      const body = `Conversation export for ${dateRange} with ${filter} filter applied.\n\nTotal conversations: ${filteredData.length}`
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    } else if (exportAction === 'whatsapp') {
      const message = `ATTACHAI Conversation Export\n${dateRange} | ${filter} filter\nTotal: ${filteredData.length} conversations`
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
    }

    onClose()
  }

  return (
    <Dialog open={showModal} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="font-serif text-[#5A4A3F] text-lg font-light">Export Conversations</DialogTitle>
          <DialogDescription className="font-sans text-[#8B7355] text-sm font-light leading-relaxed">
            Download, email, or share conversation history
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 py-5">
          <div className="space-y-3">
            <Label className="text-xs font-sans text-[#6E5A4F] uppercase tracking-wider font-light">Action</Label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setExportAction('download')}
                className={`h-11 rounded-[18px] backdrop-blur-xl border transition-all ${
                  exportAction === 'download'
                    ? 'bg-[#D8C8A8]/40 border-[#C9A876] shadow-[0_4px_20px_rgba(216,200,168,0.25)]'
                    : 'bg-white/40 border-white/50 hover:bg-white/60'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <Download className="h-4 w-4 text-[#6E5A4F]" />
                  <span className="text-[10px] uppercase tracking-wide text-[#6E5A4F]">Download</span>
                </div>
              </button>
              <button
                onClick={() => setExportAction('email')}
                className={`h-11 rounded-[18px] backdrop-blur-xl border transition-all ${
                  exportAction === 'email'
                    ? 'bg-[#D8C8A8]/40 border-[#C9A876] shadow-[0_4px_20px_rgba(216,200,168,0.25)]'
                    : 'bg-white/40 border-white/50 hover:bg-white/60'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <Mail className="h-4 w-4 text-[#6E5A4F]" />
                  <span className="text-[10px] uppercase tracking-wide text-[#6E5A4F]">Email</span>
                </div>
              </button>
              <button
                onClick={() => setExportAction('whatsapp')}
                className={`h-11 rounded-[18px] backdrop-blur-xl border transition-all ${
                  exportAction === 'whatsapp'
                    ? 'bg-[#D8C8A8]/40 border-[#C9A876] shadow-[0_4px_20px_rgba(216,200,168,0.25)]'
                    : 'bg-white/40 border-white/50 hover:bg-white/60'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <MessageCircle className="h-4 w-4 text-[#6E5A4F]" />
                  <span className="text-[10px] uppercase tracking-wide text-[#6E5A4F]">WhatsApp</span>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-sans text-[#6E5A4F] uppercase tracking-wider font-light">Date Range</Label>
            <Select value={dateRange} onValueChange={(v: any) => setDateRange(v)}>
              <SelectTrigger className="h-11 rounded-[18px] backdrop-blur-xl bg-white/60 border-white/50 text-[#6E5A4F] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-[18px] backdrop-blur-3xl bg-white/98 border-0">
                <SelectItem value="today" className="rounded-[14px] text-sm font-light">Today</SelectItem>
                <SelectItem value="week" className="rounded-[14px] text-sm font-light">This Week</SelectItem>
                <SelectItem value="month" className="rounded-[14px] text-sm font-light">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {exportAction === 'download' && (
            <div className="space-y-3">
              <Label className="text-xs font-sans text-[#6E5A4F] uppercase tracking-wider font-light">Format</Label>
              <Select value={format} onValueChange={(v: any) => setFormat(v)}>
                <SelectTrigger className="h-11 rounded-[18px] backdrop-blur-xl bg-white/60 border-white/50 text-[#6E5A4F] text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[18px] backdrop-blur-3xl bg-white/98 border-0">
                  <SelectItem value="pdf" className="rounded-[14px] text-sm font-light">PDF</SelectItem>
                  <SelectItem value="csv" className="rounded-[14px] text-sm font-light">CSV</SelectItem>
                  <SelectItem value="json" className="rounded-[14px] text-sm font-light">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-3">
            <Label className="text-xs font-sans text-[#6E5A4F] uppercase tracking-wider font-light">Filter</Label>
            <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
              <SelectTrigger className="h-11 rounded-[18px] backdrop-blur-xl bg-white/60 border-white/50 text-[#6E5A4F] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-[18px] backdrop-blur-3xl bg-white/98 border-0">
                <SelectItem value="all" className="rounded-[14px] text-sm font-light">All Conversations</SelectItem>
                <SelectItem value="ai" className="rounded-[14px] text-sm font-light">AI Only</SelectItem>
                <SelectItem value="human" className="rounded-[14px] text-sm font-light">Human Only</SelectItem>
                <SelectItem value="hybrid" className="rounded-[14px] text-sm font-light">Hybrid Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="rounded-full h-10 px-6 backdrop-blur-xl bg-white/40 border-white/50 text-[#6E5A4F] text-sm font-light"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleExport}
            className="rounded-full h-10 px-6 bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] hover:shadow-[0_10px_28px_rgba(216,200,168,0.28)] text-sm font-light"
          >
            {exportAction === 'download' && (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download {format.toUpperCase()}
              </>
            )}
            {exportAction === 'email' && (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Email Export
              </>
            )}
            {exportAction === 'whatsapp' && (
              <>
                <MessageCircle className="mr-2 h-4 w-4" />
                Share via WhatsApp
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
