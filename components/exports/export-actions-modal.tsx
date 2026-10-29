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
import { Download } from 'lucide-react'
import { mockActions } from "@/mock/conversations"
import { convertToCSV, downloadCSV } from "@/utils/csvExport"
import { downloadJSON } from "@/utils/jsonExport"

interface ExportActionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExportActionsModal({ open, onOpenChange }: ExportActionsModalProps) {
  const [format, setFormat] = React.useState<'csv' | 'json'>('csv')
  const [filter, setFilter] = React.useState<'all' | 'completed' | 'in-progress'>('all')
  const [dateRange, setDateRange] = React.useState<'today' | 'week' | 'month'>('today')

  const handleExport = () => {
    console.log("[v0] Backend not connected — this is a mock export only")
    
    let filteredData = mockActions.filter(action => {
      if (filter === 'all') return true
      return action.status.toLowerCase().replace(' ', '-') === filter
    })

    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `actions-export-${timestamp}`

    if (format === 'csv') {
      const csvData = filteredData.map(action => ({
        'Guest Name': action.guestName,
        'Phone': action.guestPhone,
        'Room': action.room,
        'Action Type': action.actionType,
        'Description': action.description,
        'Handler': action.handler,
        'Status': action.status,
        'Resolution': action.resolution || 'N/A',
        'Tags': action.tags.join(', '),
        'Timestamp': action.timestamp,
      }))
      const csv = convertToCSV(csvData, Object.keys(csvData[0]))
      downloadCSV(`${filename}.csv`, csv)
    } else {
      downloadJSON(`${filename}.json`, filteredData)
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="font-serif text-[#5A4A3F] text-lg font-light">Export Actions</DialogTitle>
          <DialogDescription className="font-sans text-[#8B7355] text-sm font-light leading-relaxed">
            Download action history in your preferred format
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 py-5">
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

          <div className="space-y-3">
            <Label className="text-xs font-sans text-[#6E5A4F] uppercase tracking-wider font-light">Format</Label>
            <Select value={format} onValueChange={(v: any) => setFormat(v)}>
              <SelectTrigger className="h-11 rounded-[18px] backdrop-blur-xl bg-white/60 border-white/50 text-[#6E5A4F] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-[18px] backdrop-blur-3xl bg-white/98 border-0">
                <SelectItem value="csv" className="rounded-[14px] text-sm font-light">CSV</SelectItem>
                <SelectItem value="json" className="rounded-[14px] text-sm font-light">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-sans text-[#6E5A4F] uppercase tracking-wider font-light">Filter</Label>
            <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
              <SelectTrigger className="h-11 rounded-[18px] backdrop-blur-xl bg-white/60 border-white/50 text-[#6E5A4F] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-[18px] backdrop-blur-3xl bg-white/98 border-0">
                <SelectItem value="all" className="rounded-[14px] text-sm font-light">All Actions</SelectItem>
                <SelectItem value="completed" className="rounded-[14px] text-sm font-light">Completed Only</SelectItem>
                <SelectItem value="in-progress" className="rounded-[14px] text-sm font-light">In Progress Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="rounded-full h-10 px-6 backdrop-blur-xl bg-white/40 border-white/50 text-[#6E5A4F] text-sm font-light"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleExport}
            className="rounded-full h-10 px-6 bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] hover:shadow-[0_10px_28px_rgba(216,200,168,0.28)] text-sm font-light"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
