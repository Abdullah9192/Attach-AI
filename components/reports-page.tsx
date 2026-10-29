"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Mail, FileText, TrendingUp, Users, MessageCircle, Clock, Calendar, Filter, Send, X, ChevronDown, Activity, Zap, Target, Award, Eye } from 'lucide-react'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

type DateRange = 'today' | 'last7days' | 'last30days' | 'custom'
type ReportType = 'service-inbox' | 'response-times' | 'satisfaction' | 'automation' | 'campaigns' | 'conversation-intelligence'

export function ReportsPage() {
  const [dateRange, setDateRange] = React.useState<DateRange>('last7days')
  const [selectedProperty, setSelectedProperty] = React.useState('current')
  const [selectedReportTypes, setSelectedReportTypes] = React.useState<ReportType[]>(['service-inbox', 'response-times'])
  
  const [showEmailModal, setShowEmailModal] = React.useState(false)
  const [showWhatsAppModal, setShowWhatsAppModal] = React.useState(false)
  const [emailRecipient, setEmailRecipient] = React.useState("")
  const [emailMessage, setEmailMessage] = React.useState("")
  const [emailFormat, setEmailFormat] = React.useState<'pdf' | 'csv'>('pdf')
  const [whatsAppRecipient, setWhatsAppRecipient] = React.useState('me')
  const [whatsAppNumber, setWhatsAppNumber] = React.useState("")
  
  const [showReportTypeDropdown, setShowReportTypeDropdown] = React.useState(false)
  const [viewingReport, setViewingReport] = React.useState<string | null>(null)

  React.useEffect(() => {
    const handleResizeObserverError = (e: ErrorEvent) => {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        e.stopImmediatePropagation()
      }
    }

    window.addEventListener('error', handleResizeObserverError)

    return () => {
      window.removeEventListener('error', handleResizeObserverError)
    }
  }, [])

  const getMockData = () => {
    const multiplier = dateRange === 'today' ? 1 : dateRange === 'last7days' ? 7 : 30
    
    const hasServiceInbox = selectedReportTypes.includes('service-inbox')
    const hasResponseTimes = selectedReportTypes.includes('response-times')
    const hasAutomation = selectedReportTypes.includes('automation')
    const hasCampaigns = selectedReportTypes.includes('campaigns')
    const hasConversationIntel = selectedReportTypes.includes('conversation-intelligence')
    
    // Adjust metrics based on selected report types
    const baseMessages = hasServiceInbox ? 342 : 150
    const baseAutomation = hasAutomation ? 87 : 60
    
    return {
      totalMessages: Math.floor(baseMessages * multiplier),
      avgResponseTime: hasResponseTimes ? (dateRange === 'today' ? '2m 15s' : '2m 45s') : 'N/A',
      automationRate: hasAutomation ? (dateRange === 'today' ? 89 : baseAutomation) : 0,
      priorityConversations: Math.ceil(5 * multiplier / 7),
      conversationMetrics: hasConversationIntel ? {
        totalQuestions: Math.floor(89 * multiplier),
        actionsCompleted: Math.floor(67 * multiplier),
        integrationsUsed: Math.floor(34 * multiplier),
        humanEscalations: Math.ceil(8 * multiplier / 7),
      } : null,
    }
  }

  const data = getMockData()

  const handleSendEmail = () => {
    console.log("Sending email report:", { emailRecipient, emailFormat })
    setTimeout(() => {
      setShowEmailModal(false)
      setEmailRecipient("")
      setEmailMessage("")
      alert("Report emailed successfully.")
    }, 1000)
  }

  const handleSendWhatsApp = () => {
    console.log("Sending WhatsApp summary:", { whatsAppRecipient, whatsAppNumber })
    setTimeout(() => {
      setShowWhatsAppModal(false)
      setWhatsAppNumber("")
      alert("WhatsApp summary queued.")
    }, 1000)
  }

  const toggleReportType = (type: ReportType) => {
    setSelectedReportTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  console.log('[v0] ReportsPage component mounted')
  console.log('[v0] Reports data:', data)

  return (
    <div className="relative w-full min-h-screen z-30 bg-transparent">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase mb-2">
          EXPORTS & REPORTS
        </h1>
        <p className="text-xs md:text-xs lg:text-sm text-[#8B7355] leading-relaxed tracking-wide">
          Filter performance, view insights, and export summaries via email or WhatsApp.
        </p>
      </div>

      {/* Content container with explicit visibility */}
      <div className="relative z-30 space-y-6 pb-12">
        {/* Filters Card */}
        <Card className="relative z-30 backdrop-blur-3xl bg-white/90 border-[rgba(139,115,85,0.2)] border-2 rounded-[20px] shadow-[0_12px_32px_rgba(139,115,85,0.18)] overflow-visible">
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-[#B08A64]" strokeWidth={1.5} />
              <h2 className="font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#6E5A4F]">FILTERS</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                {/* Using sans-serif for label text */}
                <Label className="font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">DATE RANGE</Label>
                <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
                  <SelectTrigger className="bg-white/70 border-[rgba(139,115,85,0.2)] font-serif uppercase text-xs tracking-wider">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-serif">
                    <SelectItem value="today" className="uppercase text-xs tracking-wider">Today</SelectItem>
                    <SelectItem value="last7days" className="uppercase text-xs tracking-wider">Last 7 days</SelectItem>
                    <SelectItem value="last30days" className="uppercase text-xs tracking-wider">Last 30 days</SelectItem>
                    <SelectItem value="custom" className="uppercase text-xs tracking-wider">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                {/* Using sans-serif for label text */}
                <Label className="font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">PROPERTY / ORGANISATION</Label>
                <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                  <SelectTrigger className="bg-white/70 border-[rgba(139,115,85,0.2)] font-serif uppercase text-xs tracking-wider">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-serif">
                    <SelectItem value="current" className="uppercase text-xs tracking-wider">Current Organisation</SelectItem>
                    <SelectItem value="sanctuary" className="uppercase text-xs tracking-wider">The Sanctuary Hotel & Spa</SelectItem>
                    <SelectItem value="mayfair" className="uppercase text-xs tracking-wider">Mayfair Members Club</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2 lg:col-span-1">
                 {/* Using sans-serif for label text */}
                <Label className="font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">REPORT TYPE</Label>
                <Popover open={showReportTypeDropdown} onOpenChange={setShowReportTypeDropdown}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-white/70 text-left font-serif uppercase text-xs tracking-wider border-[rgba(139,115,85,0.2)]"
                    >
                      <span className="font-serif uppercase text-xs tracking-wider text-[#6E5A4F]">{selectedReportTypes.length} SELECTED</span>
                      <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${showReportTypeDropdown ? 'rotate-180' : ''}`} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-[var(--radix-popover-trigger-width)] p-2 bg-white border-2 border-[rgba(139,115,85,0.25)] shadow-2xl"
                    align="start"
                    sideOffset={8}
                  >
                    <div className="space-y-1">
                      {[
                        { value: 'service-inbox', label: 'Service inbox performance' },
                        { value: 'response-times', label: 'Response times' },
                        { value: 'satisfaction', label: 'Guest satisfaction tags' },
                        { value: 'automation', label: 'Automation performance' },
                        { value: 'campaigns', label: 'Campaign performance' },
                        { value: 'conversation-intelligence', label: 'Conversation intelligence' },
                      ].map(type => (
                        <label key={type.value} className="flex items-center gap-2 p-2 hover:bg-[rgba(247,244,239,0.5)] rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedReportTypes.includes(type.value as ReportType)}
                            onChange={() => toggleReportType(type.value as ReportType)}
                            className="rounded border-[#C9A876]"
                          />
                          <span className="font-serif uppercase text-xs tracking-wider text-[#6E5A4F]">{type.label}</span>
                        </label>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <p className="text-[10px] text-[#8B7355] mt-3">
              Insights and exports below will reflect your filter selections.
            </p>
          </CardContent>
        </Card>

        {/* Summary Cards Grid */}
        <div className="relative z-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="backdrop-blur-3xl bg-white/90 border-[rgba(139,115,85,0.25)] border-2 rounded-[16px] shadow-[0_6px_20px_rgba(139,115,85,0.15)]">
            <CardContent className="p-4 md:p-5 text-center">
              <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-[#B08A64] mx-auto mb-2" strokeWidth={1.5} />
              <div className="text-2xl md:text-3xl font-serif text-[#6E5A4F] mb-1">{data.totalMessages}</div>
              <div className="text-[10px] text-[#8B7355] uppercase tracking-wider">Total Messages</div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-3xl bg-white/90 border-[rgba(139,115,85,0.25)] border-2 rounded-[16px] shadow-[0_6px_20px_rgba(139,115,85,0.15)]">
            <CardContent className="p-4 md:p-5 text-center">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-[#B08A64] mx-auto mb-2" strokeWidth={1.5} />
              <div className="text-2xl md:text-3xl font-serif text-[#6E5A4F] mb-1">{data.avgResponseTime}</div>
              <div className="text-[10px] text-[#8B7355] uppercase tracking-wider">Avg Response</div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-3xl bg-white/90 border-[rgba(139,115,85,0.25)] border-2 rounded-[16px] shadow-[0_6px_20px_rgba(139,115,85,0.15)]">
            <CardContent className="p-4 md:p-5 text-center">
              <Zap className="h-5 w-5 md:h-6 md:w-6 text-[#B08A64] mx-auto mb-2" strokeWidth={1.5} />
              <div className="text-2xl md:text-3xl font-serif text-[#6E5A4F] mb-1">{data.automationRate}%</div>
              <div className="text-[10px] text-[#8B7355] uppercase tracking-wider">Automation</div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-3xl bg-white/90 border-[rgba(139,115,85,0.25)] border-2 rounded-[16px] shadow-[0_6px_20px_rgba(139,115,85,0.15)]">
            <CardContent className="p-4 md:p-5 text-center">
              <Target className="h-5 w-5 md:h-6 md:w-6 text-[#B08A64] mx-auto mb-2" strokeWidth={1.5} />
              <div className="text-2xl md:text-3xl font-serif text-[#6E5A4F] mb-1">{data.priorityConversations}</div>
              <div className="text-[10px] text-[#8B7355] uppercase tracking-wider">Priority</div>
            </CardContent>
          </Card>
        </div>

        {data.conversationMetrics && (
          <div className="relative z-30">
            <h3 className="font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#6E5A4F] mb-4">Conversation Intelligence</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="backdrop-blur-3xl bg-white/90 border-[rgba(139,115,85,0.25)] border-2 rounded-[16px] shadow-[0_6px_20px_rgba(139,115,85,0.15)]">
                <CardContent className="p-4 md:p-5 text-center">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-[#B08A64] mx-auto mb-2" strokeWidth={1.5} />
                  <div className="text-2xl md:text-3xl font-serif text-[#6E5A4F] mb-1">{data.conversationMetrics.totalQuestions}</div>
                  <div className="text-[10px] text-[#8B7355] uppercase tracking-wider">Questions Asked</div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-3xl bg-white/90 border-[rgba(139,115,85,0.25)] border-2 rounded-[16px] shadow-[0_6px_20px_rgba(139,115,85,0.15)]">
                <CardContent className="p-4 md:p-5 text-center">
                  <Award className="h-5 w-5 md:h-6 md:w-6 text-[#B08A64] mx-auto mb-2" strokeWidth={1.5} />
                  <div className="text-2xl md:text-3xl font-serif text-[#6E5A4F] mb-1">{data.conversationMetrics.actionsCompleted}</div>
                  <div className="text-[10px] text-[#8B7355] uppercase tracking-wider">Actions Taken</div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-3xl bg-white/90 border-[rgba(139,115,85,0.25)] border-2 rounded-[16px] shadow-[0_6px_20px_rgba(139,115,85,0.15)]">
                <CardContent className="p-4 md:p-5 text-center">
                  <Activity className="h-5 w-5 md:h-6 md:w-6 text-[#B08A64] mx-auto mb-2" strokeWidth={1.5} />
                  <div className="text-2xl md:text-3xl font-serif text-[#6E5A4F] mb-1">{data.conversationMetrics.integrationsUsed}</div>
                  <div className="text-[10px] text-[#8B7355] uppercase tracking-wider">Integrations</div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-3xl bg-white/90 border-[rgba(139,115,85,0.25)] border-2 rounded-[16px] shadow-[0_6px_20px_rgba(139,115,85,0.15)]">
                <CardContent className="p-4 md:p-5 text-center">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-[#B08A64] mx-auto mb-2" strokeWidth={1.5} />
                  <div className="text-2xl md:text-3xl font-serif text-[#6E5A4F] mb-1">{data.conversationMetrics.humanEscalations}</div>
                  <div className="text-[10px] text-[#8B7355] uppercase tracking-wider">Human Escalations</div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4 backdrop-blur-3xl bg-white/90 border-[rgba(139,115,85,0.25)] border-2 rounded-[16px] shadow-[0_6px_20px_rgba(139,115,85,0.15)]">
              <CardContent className="p-4 md:p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-[10px] md:text-[11px] text-[#6E5A4F] uppercase tracking-wider mb-1">Full Conversation Transcripts</h4>
                    <p className="text-[9px] md:text-[10px] text-[#8B7355] leading-relaxed">
                      Export complete conversation history with timestamps, user questions, AI responses, actions taken, and escalation details.
                    </p>
                  </div>
                  <Button
                    className="whitespace-nowrap bg-gradient-to-br from-[#C9A876] to-[#B08A64] hover:from-[#B08A64] hover:to-[#9B7854] text-white h-10"
                  >
                    <Download className="h-4 w-4 mr-2" strokeWidth={1.5} />
                    <span className="font-serif text-xs uppercase tracking-wider">Export Conversations</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Export Actions Card */}
        <Card className="relative z-30 backdrop-blur-3xl bg-white/90 border-[rgba(139,115,85,0.2)] border-2 rounded-[20px] shadow-[0_12px_32px_rgba(139,115,85,0.18)]">
          <CardContent className="p-5 md:p-6">
            <h3 className="font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#6E5A4F] mb-4">EXPORT & SHARE</h3>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setShowEmailModal(true)}
                className="flex-1 justify-center gap-2 bg-gradient-to-br from-[#C9A876] to-[#B08A64] hover:from-[#B08A64] hover:to-[#9B7854] text-white h-11"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
                <span className="font-serif text-xs uppercase tracking-wider">Email full report</span>
              </Button>

              <Button
                onClick={() => setShowWhatsAppModal(true)}
                variant="outline"
                className="flex-1 justify-center gap-2 h-11 border-[rgba(139,115,85,0.2)]"
              >
                <Send className="h-4 w-4" strokeWidth={1.5} />
                <span className="font-serif text-xs uppercase tracking-wider">Send WhatsApp summary</span>
              </Button>
            </div>

            <p className="text-[9px] md:text-[10px] text-[#8B7355] mt-4 leading-relaxed">
              Exports respect the filters you've set above (date range, property, report type).
            </p>
          </CardContent>
        </Card>

        {/* Reports History */}
        <Card className="relative z-30 backdrop-blur-3xl bg-white/90 border-[rgba(139,115,85,0.2)] border-2 rounded-[20px] shadow-[0_12px_32px_rgba(139,115,85,0.18)]">
          <CardContent className="p-5 md:p-6">
            <h2 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] uppercase tracking-widest mb-5">
              REPORTS HISTORY
            </h2>

            {/* Desktop & Tablet Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(139,115,85,0.15)]">
                    <th className="text-left py-3 px-2 font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">REPORT NAME</th>
                    <th className="text-left py-3 px-2 font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">PERIOD</th>
                    <th className="text-left py-3 px-2 font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355] hidden lg:table-cell">CREATED BY</th>
                    <th className="text-left py-3 px-2 font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">CREATED AT</th>
                    <th className="text-left py-3 px-2 font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">FORMAT</th>
                    <th className="text-right py-3 px-2 font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Conversation Intelligence – Last 7 days",
                      period: "10 Nov - 17 Nov",
                      createdBy: "Grace G",
                      createdAt: "17 Nov, 10:45",
                      format: "PDF",
                    },
                    {
                      name: "Service inbox – Last 7 days",
                      period: "10 Nov - 17 Nov",
                      createdBy: "Sarah Mitchell",
                      createdAt: "17 Nov, 08:30",
                      format: "PDF",
                    },
                    {
                      name: "Full Conversation Transcripts",
                      period: "03 Nov - 10 Nov",
                      createdBy: "James Robertson",
                      createdAt: "11 Nov, 16:20",
                      format: "CSV",
                    },
                    {
                      name: "Weekly Performance Summary",
                      period: "03 Nov - 10 Nov",
                      createdBy: "James Robertson",
                      createdAt: "10 Nov, 21:00",
                      format: "CSV",
                    },
                    {
                      name: "Guest Satisfaction Report",
                      period: "01 Nov - 07 Nov",
                      createdBy: "Sarah Mitchell",
                      createdAt: "08 Nov, 14:15",
                      format: "PDF",
                    },
                    {
                      name: "Actions & Escalations Report",
                      period: "October 2024",
                      createdBy: "Grace G",
                      createdAt: "02 Nov, 11:30",
                      format: "PDF",
                    },
                    {
                      name: "Automation Performance",
                      period: "October 2024",
                      createdBy: "Admin",
                      createdAt: "01 Nov, 09:00",
                      format: "CSV",
                    },
                  ].map((report, i) => (
                    <tr key={i} className="border-b border-[rgba(139,115,85,0.08)] hover:bg-[rgba(247,244,239,0.5)] transition-colors">
                      <td className="py-4 px-2">
                        <span className="text-[10px] md:text-[11px] text-[#6E5A4F]">{report.name}</span>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-[10px] md:text-[11px] text-[#8B7355]">{report.period}</span>
                      </td>
                      <td className="py-4 px-2 hidden lg:table-cell">
                        <span className="text-[10px] md:text-[11px] text-[#8B7355]">{report.createdBy}</span>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-[10px] md:text-[11px] text-[#8B7355]">{report.createdAt}</span>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-[9px] px-2 py-1 rounded-full bg-[rgba(201,168,118,0.15)] text-[#B08A64] uppercase">
                          {report.format}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewingReport(report.name)}
                            className="text-xs text-[#B08A64] hover:text-[#8B6E4E] h-8 px-2"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-[#B08A64] hover:text-[#8B6E4E] h-8 px-2"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowEmailModal(true)}
                            className="text-xs text-[#B08A64] hover:text-[#8B6E4E] h-8 px-2"
                          >
                            <Mail className="h-3 w-3 mr-1" />
                            Resend
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3">
              {/* Mobile View */}
              {[
                {
                  name: "Conversation Intelligence – Last 7 days",
                  period: "10 Nov - 17 Nov",
                  createdBy: "Grace G",
                  createdAt: "17 Nov, 10:45",
                  format: "PDF",
                },
                {
                  name: "Service inbox – Last 7 days",
                  period: "10 Nov - 17 Nov",
                  createdBy: "Sarah Mitchell",
                  createdAt: "17 Nov, 08:30",
                  format: "PDF",
                },
                {
                  name: "Full Conversation Transcripts",
                  period: "03 Nov - 10 Nov",
                  createdBy: "James Robertson",
                  createdAt: "11 Nov, 16:20",
                  format: "CSV",
                },
                {
                  name: "Weekly Performance Summary",
                  period: "03 Nov - 10 Nov",
                  createdBy: "James Robertson",
                  createdAt: "10 Nov, 21:00",
                  format: "CSV",
                },
                {
                  name: "Guest Satisfaction Report",
                  period: "01 Nov - 07 Nov",
                  createdBy: "Sarah Mitchell",
                  createdAt: "08 Nov, 14:15",
                  format: "PDF",
                },
                {
                  name: "Actions & Escalations Report",
                  period: "October 2024",
                  createdBy: "Grace G",
                  createdAt: "02 Nov, 11:30",
                  format: "PDF",
                },
                {
                  name: "Automation Performance",
                  period: "October 2024",
                  createdBy: "Admin",
                  createdAt: "01 Nov, 09:00",
                  format: "CSV",
                },
              ].map((report, i) => (
                <Card key={i} className="backdrop-blur-xl bg-white/90 border-[rgba(139,115,85,0.25)] border-2 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-[11px] text-[#6E5A4F] flex-1">{report.name}</h3>
                      <span className="text-[9px] px-2 py-1 rounded-full bg-[rgba(201,168,118,0.15)] text-[#B08A64] uppercase ml-2">
                        {report.format}
                      </span>
                    </div>
                    <div className="space-y-1 text-[10px] text-[#8B7355] mb-3">
                      <div><strong className="text-[#6E5A4F]">Period:</strong> {report.period}</div>
                      <div><strong className="text-[#6E5A4F]">Created:</strong> {report.createdAt}</div>
                      <div><strong className="text-[#6E5A4F]">By:</strong> {report.createdBy}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewingReport(report.name)}
                        className="text-xs h-9 border-[rgba(139,115,85,0.2)]"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-9 border-[rgba(139,115,85,0.2)]"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button
                        onClick={() => {
                          setViewingReport(null)
                          setShowEmailModal(true)
                        }}
                        className="text-xs h-9 border-[rgba(139,115,85,0.2)]"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Email Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="backdrop-blur-3xl bg-gradient-to-br from-white/98 to-[#F7F4EF]/95 border-0 rounded-[20px] md:rounded-[24px] shadow-[0_24px_64px_rgba(139,115,85,0.2)] max-w-full md:max-w-md mx-4 md:mx-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-[9px] md:text-[10px] text-[#6E5A4F] uppercase tracking-widest">
              EMAIL FULL REPORT
            </DialogTitle>
            <DialogDescription className="text-[10px] md:text-xs text-[#8B7355]">
              Send a comprehensive report to your email
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">
                RECIPIENT EMAIL
              </Label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                className="bg-white/80 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">
                FORMAT
              </Label>
              <Select value={emailFormat} onValueChange={(v) => setEmailFormat(v as 'pdf' | 'csv')}>
                <SelectTrigger className="bg-white/80 h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">
                OPTIONAL MESSAGE
              </Label>
              <Input
                placeholder="Add a note..."
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                className="bg-white/80 h-11"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowEmailModal(false)}
                className="flex-1 font-serif text-xs uppercase tracking-widest h-11"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendEmail}
                disabled={!emailRecipient.trim()}
                className="flex-1 font-serif text-xs uppercase tracking-widest bg-gradient-to-br from-[#C9A876] to-[#B08A64] h-11"
              >
                <Mail className="h-3.5 w-3.5 mr-2" />
                Send Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showWhatsAppModal} onOpenChange={setShowWhatsAppModal}>
        <DialogContent className="backdrop-blur-3xl bg-gradient-to-br from-white/98 to-[#F7F4EF]/95 border-0 rounded-[20px] md:rounded-[24px] shadow-[0_24px_64px_rgba(139,115,85,0.2)] max-w-full md:max-w-md mx-4 md:mx-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-[9px] md:text-[10px] text-[#6E5A4F] uppercase tracking-widest">
              SEND WHATSAPP SUMMARY
            </DialogTitle>
            <DialogDescription className="text-[10px] md:text-xs text-[#8B7355]">
              Quick summary with key metrics + link to full report
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">
                CHOOSE RECIPIENT
              </Label>
              <Select value={whatsAppRecipient} onValueChange={setWhatsAppRecipient}>
                <SelectTrigger className="bg-white/80 h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="me">Me (current WhatsApp number)</SelectItem>
                  <SelectItem value="team">Team member</SelectItem>
                  <SelectItem value="custom">Custom number</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(whatsAppRecipient === 'team' || whatsAppRecipient === 'custom') && (
              <div className="space-y-2">
                <Label className="font-serif text-[9px] md:text-[10px] uppercase tracking-widest text-[#8B7355]">
                  {whatsAppRecipient === 'team' ? 'TEAM MEMBER' : 'PHONE NUMBER'}
                </Label>
                <Input
                  placeholder={whatsAppRecipient === 'team' ? 'Select team member' : '+44 20 7123 4567'}
                  value={whatsAppNumber}
                  onChange={(e) => setWhatsAppNumber(e.target.value)}
                  className="bg-white/80 h-11"
                />
              </div>
            )}

            <div className="p-4 rounded-lg bg-[rgba(201,168,118,0.1)] border border-[rgba(201,168,118,0.2)]">
              <p className="text-[9px] md:text-[10px] text-[#8B7355] leading-relaxed">
                <strong className="text-[#6E5A4F]">What will be sent:</strong><br />
                • Total messages: {data.totalMessages}<br />
                • Automation rate: {data.automationRate}%<br />
                • Avg response: {data.avgResponseTime}<br />
                • Link to full detailed report
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowWhatsAppModal(false)}
                className="flex-1 font-serif text-xs uppercase tracking-widest h-11"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendWhatsApp}
                disabled={whatsAppRecipient !== 'me' && !whatsAppNumber.trim()}
                className="flex-1 font-serif text-xs uppercase tracking-widest bg-gradient-to-br from-[#C9A876] to-[#B08A64] h-11"
              >
                <Send className="h-3.5 w-3.5 mr-2" />
                Send Summary
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Viewer Dialog */}
      <Dialog open={!!viewingReport} onOpenChange={() => setViewingReport(null)}>
        <DialogContent className="backdrop-blur-3xl bg-gradient-to-br from-white/98 to-[#F7F4EF]/95 border-0 rounded-[20px] md:rounded-[24px] shadow-[0_24px_64px_rgba(139,115,85,0.2)] max-w-full md:max-w-3xl mx-4 md:mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-[9px] md:text-[10px] text-[#6E5A4F] uppercase tracking-widest">
              {viewingReport}
            </DialogTitle>
            <DialogDescription className="text-[10px] md:text-xs text-[#8B7355]">
              Report Preview
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Summary Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-[rgba(201,168,118,0.1)] border border-[rgba(201,168,118,0.2)]">
                <MessageCircle className="h-5 w-5 text-[#B08A64] mb-2" strokeWidth={1.5} />
                <div className="text-2xl font-serif text-[#6E5A4F]">{data.totalMessages}</div>
                <div className="text-[10px] text-[#8B7355] uppercase tracking-wider">Total Messages</div>
              </div>
              <div className="p-4 rounded-lg bg-[rgba(201,168,118,0.1)] border border-[rgba(201,168,118,0.2)]">
                <Clock className="h-5 w-5 text-[#B08A64] mb-2" strokeWidth={1.5} />
                <div className="text-2xl font-serif text-[#6E5A4F]">{data.avgResponseTime}</div>
                <div className="text-[10px] text-[#8B7355] uppercase tracking-wider">Avg Response</div>
              </div>
              <div className="p-4 rounded-lg bg-[rgba(201,168,118,0.1)] border border-[rgba(201,168,118,0.2)]">
                <Zap className="h-5 w-5 text-[#B08A64] mb-2" strokeWidth={1.5} />
                <div className="text-2xl font-serif text-[#6E5A4F]">{data.automationRate}%</div>
                <div className="text-[10px] text-[#8B7355] uppercase tracking-wider">Automation</div>
              </div>
              <div className="p-4 rounded-lg bg-[rgba(201,168,118,0.1)] border border-[rgba(201,168,118,0.2)]">
                <Target className="h-5 w-5 text-[#B08A64] mb-2" strokeWidth={1.5} />
                <div className="text-2xl font-serif text-[#6E5A4F]">{data.priorityConversations}</div>
                <div className="text-[10px] text-[#8B7355] uppercase tracking-wider">Priority</div>
              </div>
            </div>

            {/* Breakdown Section */}
            <div className="space-y-3">
              <h3 className="font-serif text-[10px] md:text-[11px] uppercase tracking-widest text-[#6E5A4F]">PERFORMANCE BREAKDOWN</h3>
              <div className="space-y-2">
                {[
                  { label: 'Service Inbox', value: '87%', color: 'bg-[#C9A876]' },
                  { label: 'Guest Satisfaction', value: '92%', color: 'bg-[#B08A64]' },
                  { label: 'Response Times', value: '85%', color: 'bg-[#9B7854]' },
                  { label: 'Automation Success', value: '89%', color: 'bg-[#8B6E4E]' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-[10px] text-[#6E5A4F] w-32">{item.label}</div>
                    <div className="flex-1 h-2 bg-[rgba(139,115,85,0.1)] rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: item.value }} />
                    </div>
                    <div className="text-xs font-serif text-[#B08A64] w-12 text-right">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-[rgba(139,115,85,0.15)]">
              <Button
                variant="outline"
                onClick={() => setViewingReport(null)}
                className="flex-1 font-serif text-xs uppercase tracking-widest h-11"
              >
                Close
              </Button>
              <Button
                className="flex-1 font-serif text-xs uppercase tracking-widest bg-gradient-to-br from-[#C9A876] to-[#B08A64] h-11"
              >
                <Download className="h-3.5 w-3.5 mr-2" />
                Download Report
              </Button>
              <Button
                onClick={() => {
                  setViewingReport(null)
                  setShowEmailModal(true)
                }}
                className="flex-1 font-serif text-xs uppercase tracking-widest bg-gradient-to-br from-[#C9A876] to-[#B08A64] h-11"
              >
                <Mail className="h-3.5 w-3.5 mr-2" />
                Email Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
