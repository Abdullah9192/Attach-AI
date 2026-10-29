"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'
import { AlertTriangle, Clock, CheckCircle2, XCircle, User, MessageCircle, ArrowLeft, ChevronDown, ChevronRight, Filter, FileText, Bug, Settings } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type EscalationLog = {
  id: string
  guest: string
  initials: string
  issue: string
  escalatedAt: string
  escalatedBy: string
  status: 'in-progress' | 'resolved'
  priority: 'urgent' | 'high' | 'vip'
  assignedTo: string
  room: string
  resolvedAt?: string
  conversationLogs?: Array<{ timestamp: string; sender: string; message: string }>
  bugReports?: Array<{
    id: string
    type: string
    title: string
    description: string
    reportedAt: string
    reportedBy: string
    severity: string
    status: string
  }>
  changeRequests?: Array<{
    id: string
    type: string
    title: string
    description: string
    requestedAt: string
    requestedBy: string
    approvedBy?: string
    status: string
  }>
  timeline: Array<{
    time: string
    event: string
    type: string
    user: string
  }>
  actions: Array<{
    action: string
    status: string
    timestamp: string
  }>
}

const initialEscalationLogs: EscalationLog[] = [
  {
    id: "ESC-001",
    guest: "Emma Wilson",
    initials: "EW",
    issue: "Failed automation - Float therapy booking integration error",
    escalatedAt: "Today, 10:24 AM",
    escalatedBy: "AI System (Low Confidence: 58%)",
    status: "in-progress",
    priority: "urgent",
    assignedTo: "Sarah Johnson",
    room: "528",
    conversationLogs: [
      { timestamp: "10:20 AM", sender: "Emma Wilson", message: "Hi, I'd like to book a float therapy session for tomorrow at 3pm" },
      { timestamp: "10:21 AM", sender: "AI Assistant", message: "I'd be happy to help you book a float therapy session. Let me check availability for tomorrow at 3pm." },
      { timestamp: "10:22 AM", sender: "AI Assistant", message: "[System Error: Float Suite API timeout - unable to fetch availability]" },
      { timestamp: "10:23 AM", sender: "Emma Wilson", message: "Is everything okay? It seems to be taking a while..." },
      { timestamp: "10:24 AM", sender: "System", message: "[AUTO-ESCALATED: Low confidence 58%, Integration failure detected]" },
    ],
    bugReports: [
      {
        id: "BUG-101",
        type: "integration",
        title: "Float Suite API Timeout",
        description: "Float Suite booking system API is timing out after 30 seconds. Unable to fetch real-time availability.",
        reportedAt: "10:24 AM",
        reportedBy: "AI System",
        severity: "high",
        status: "investigating"
      }
    ],
    timeline: [
      { time: "10:24 AM", event: "AI detected integration failure", type: "system", user: "System" },
      { time: "10:25 AM", event: "Automatically escalated due to low confidence", type: "escalation", user: "AI System" },
      { time: "10:27 AM", event: "Assigned to Sarah Johnson", type: "assignment", user: "Jane Doe" },
      { time: "10:30 AM", event: "Sarah acknowledged and investigating", type: "update", user: "Sarah Johnson" },
    ],
    actions: [
      { action: "Checked Float Suite booking system", status: "completed", timestamp: "10:32 AM" },
      { action: "Identified API timeout issue", status: "completed", timestamp: "10:35 AM" },
      { action: "Contacted IT for system restart", status: "in-progress", timestamp: "10:40 AM" },
      { action: "Follow up with guest", status: "pending", timestamp: "-" },
    ]
  },
  {
    id: "ESC-002",
    guest: "James Patterson",
    initials: "JP",
    issue: "Neural programming session adjustment requested",
    escalatedAt: "Today, 9:15 AM",
    escalatedBy: "AI System (Policy Check Required)",
    status: "resolved",
    priority: "high",
    assignedTo: "Mike Chen",
    room: "201",
    resolvedAt: "Today, 11:45 AM",
    conversationLogs: [
      { timestamp: "9:10 AM", sender: "James Patterson", message: "Good morning. I'd like to extend my neural programming session to 60 minutes instead of the standard 45." },
      { timestamp: "9:11 AM", sender: "AI Assistant", message: "I understand you'd like a longer neural programming session. Let me check if this can be arranged." },
      { timestamp: "9:14 AM", sender: "James Patterson", message: "I've done the 45-minute session before and feel ready for the extended protocol." },
      { timestamp: "9:15 AM", sender: "System", message: "[AUTO-ESCALATED: Policy check required for custom neural programming duration]" },
      { timestamp: "9:50 AM", sender: "Mike Chen", message: "Hi James, I've reviewed your request and your previous sessions. I'm pleased to approve the 60-minute protocol for you today at 10:30 AM." },
      { timestamp: "9:51 AM", sender: "James Patterson", message: "Perfect, thank you so much!" },
    ],
    bugReports: [],
    changeRequests: [
      {
        id: "CR-045",
        type: "policy",
        title: "Custom Neural Programming Duration",
        description: "Guest requested extension from standard 45-minute to 60-minute neural programming protocol based on previous experience.",
        requestedAt: "9:15 AM",
        requestedBy: "James Patterson",
        approvedBy: "Mike Chen",
        status: "approved"
      }
    ],
    timeline: [
      { time: "9:15 AM", event: "Guest requested custom neural programming protocol", type: "system", user: "Guest" },
      { time: "9:16 AM", event: "AI flagged as requiring expert approval", type: "escalation", user: "AI System" },
      { time: "9:20 AM", event: "Assigned to Mike Chen (Neural Programming Expert)", type: "assignment", user: "System" },
      { time: "9:45 AM", event: "Mike reviewed request and approved custom protocol", type: "update", user: "Mike Chen" },
      { time: "11:45 AM", event: "Session completed successfully", type: "resolution", user: "Mike Chen" },
    ],
    actions: [
      { action: "Reviewed guest's neural programming history", status: "completed", timestamp: "9:25 AM" },
      { action: "Consulted with Neural Programming Director", status: "completed", timestamp: "9:35 AM" },
      { action: "Approved customized 60-minute protocol", status: "completed", timestamp: "9:45 AM" },
      { action: "Monitored session in real-time", status: "completed", timestamp: "10:30 AM" },
      { action: "Post-session follow-up completed", status: "completed", timestamp: "11:45 AM" },
    ]
  },
  {
    id: "ESC-003",
    guest: "Michael Torres",
    initials: "MT",
    issue: "VIP member arrival - requires white-glove coordination",
    escalatedAt: "Today, 8:00 AM",
    escalatedBy: "Jane Doe (Manual Escalation)",
    status: "resolved",
    priority: "vip",
    assignedTo: "Jane Doe",
    room: "Workroom 315",
    resolvedAt: "Today, 9:30 AM",
    conversationLogs: [
      { timestamp: "7:45 AM", sender: "Michael Torres", message: "Good morning. I'll be arriving around 9 AM. Could you ensure the Workroom is set up with my usual preferences?" },
      { timestamp: "7:46 AM", sender: "AI Assistant", message: "Good morning, Michael! I'll coordinate everything for your arrival. Let me confirm your preferences and prepare the team." },
      { timestamp: "7:50 AM", sender: "Jane Doe", message: "[MANUAL ESCALATION: VIP arrival - taking personal oversight]" },
      { timestamp: "8:15 AM", sender: "Jane Doe", message: "Michael, everything is being coordinated for your arrival. Your Workroom will be ready with your preferred setup, infrared sauna pre-heated to 160°F, and your regenerative welcome meal prepared." },
      { timestamp: "8:45 AM", sender: "Michael Torres", message: "Excellent, thank you Jane. See you shortly." },
    ],
    bugReports: [],
    timeline: [
      { time: "8:00 AM", event: "VIP member check-in scheduled", type: "system", user: "System" },
      { time: "8:01 AM", event: "Jane manually escalated for personal oversight", type: "escalation", user: "Jane Doe" },
      { time: "8:15 AM", event: "Coordinated with all departments", type: "update", user: "Jane Doe" },
      { time: "9:00 AM", event: "Member arrived and greeted personally", type: "update", user: "Jane Doe" },
      { time: "9:30 AM", event: "Member settled, all preferences confirmed", type: "resolution", user: "Jane Doe" },
    ],
    actions: [
      { action: "Prepared Workroom with preferred setup", status: "completed", timestamp: "8:10 AM" },
      { action: "Confirmed infrared sauna pre-heat", status: "completed", timestamp: "8:15 AM" },
      { action: "Arranged regenerative welcome meal", status: "completed", timestamp: "8:20 AM" },
      { action: "Personal greeting and orientation", status: "completed", timestamp: "9:00 AM" },
      { action: "Verified all member preferences", status: "completed", timestamp: "9:30 AM" },
    ]
  },
]

export function EscalationReportPage() {
  const router = useRouter()
  const [escalations, setEscalations] = React.useState<EscalationLog[]>(initialEscalationLogs)
  const [selectedStatus, setSelectedStatus] = React.useState<'all' | 'in-progress' | 'resolved'>('all')
  const [selectedPriority, setSelectedPriority] = React.useState<'all' | 'urgent' | 'high' | 'vip'>('all')
  const [expandedEscalation, setExpandedEscalation] = React.useState<string | null>("ESC-001")
  const [mobilePanel, setMobilePanel] = React.useState<'list' | 'detail'>('list')
  const [selectedEscalation, setSelectedEscalation] = React.useState<EscalationLog | null>(null)

  const handleMarkAsResolved = (escalationId: string) => {
    const now = new Date()
    const timeString = `Today, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`
    
    setEscalations(prevEscalations => 
      prevEscalations.map(escalation => 
        escalation.id === escalationId
          ? {
              ...escalation,
              status: 'resolved' as const,
              resolvedAt: timeString,
              timeline: [
                ...escalation.timeline,
                {
                  time: timeString,
                  event: 'Marked as resolved',
                  type: 'resolution',
                  user: 'Grace G'
                }
              ]
            }
          : escalation
      )
    )
  }

  const filteredLogs = React.useMemo(() => {
    return escalations.filter(log => {
      const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus
      const matchesPriority = selectedPriority === 'all' || log.priority === selectedPriority
      return matchesStatus && matchesPriority
    })
  }, [escalations, selectedStatus, selectedPriority])

  const stats = React.useMemo(() => ({
    total: escalations.length,
    inProgress: escalations.filter(l => l.status === 'in-progress').length,
    resolved: escalations.filter(l => l.status === 'resolved').length,
    avgResolutionTime: "2h 15m",
  }), [escalations])

  return (
    <div className="min-h-screen w-full">
      <div className="relative z-10 w-full mx-auto max-w-[95%] md:max-w-[96%] lg:max-w-[1400px] px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-12 sm:pb-16 md:pb-20 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
        {/* Header */}
        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center gap-2 md:gap-3">
            <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-[#C9A876]" />
            <h1 className="font-serif text-xl md:text-2xl text-[#5e4c42] font-normal tracking-wide">
              Escalation Report
            </h1>
          </div>
          <p className="text-xs md:text-sm font-normal text-[#8B7355] leading-relaxed tracking-wide">
            Detailed logs of escalated items, actions taken, and resolution status
          </p>
        </div>

        <div className="md:hidden space-y-1.5">
          {[
            { icon: AlertTriangle, label: "Total Escalations", value: stats.total, detail: "Last 24 hours" },
            { icon: Clock, label: "In Progress", value: stats.inProgress, detail: "Currently being handled" },
            { icon: CheckCircle2, label: "Resolved", value: stats.resolved, detail: "Successfully completed" },
            { icon: Clock, label: "Avg Resolution", value: stats.avgResolutionTime, detail: "Mean time to resolve" },
          ].map((stat, i) => (
            <Card 
              key={i}
              className="backdrop-blur-3xl bg-white/30 border-0 rounded-xl"
              style={{ 
                boxShadow: '0 8px 24px rgba(139,115,85,0.04), inset 0 1px 1px rgba(255,255,255,0.5)',
              }}
            >
              <CardContent className="p-2.5 flex items-center gap-2.5">
                <stat.icon className="h-3.5 w-3.5 text-[#8B7355] opacity-60 flex-shrink-0" strokeWidth={1.5} />
                <div className="flex-1">
                  <div className="text-base font-serif font-normal text-[#6E5A4F] leading-none">{stat.value}</div>
                  <div className="text-[9px] font-normal text-[#5e4c42] tracking-wider uppercase mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[8px] font-normal text-[#8B7355] mt-0.5">
                    {stat.detail}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <Card className="backdrop-blur-3xl bg-white/40 border-0 rounded-[20px] shadow-[0_12px_40px_rgba(139,115,85,0.06)]">
            <CardContent className="p-4 md:p-5">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="h-4 w-4 text-[#8B7355]" />
                <span className="text-[10px] uppercase tracking-wider text-[#8B7355] font-normal">Total Escalations</span>
              </div>
              <div className="text-2xl md:text-3xl font-serif font-normal text-[#6E5A4F]">{stats.total}</div>
              <div className="text-[9px] text-[#8B7355] mt-1">Last 24 hours</div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-3xl bg-white/40 border-0 rounded-[20px] shadow-[0_12px_40px_rgba(139,115,85,0.06)]">
            <CardContent className="p-4 md:p-5">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-4 w-4 text-[#C9A876]" />
                <span className="text-[10px] uppercase tracking-wider text-[#8B7355] font-normal">In Progress</span>
              </div>
              <div className="text-2xl md:text-3xl font-serif font-normal text-[#6E5A4F]">{stats.inProgress}</div>
              <div className="text-[9px] text-[#8B7355] mt-1">Currently being handled</div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-3xl bg-white/40 border-0 rounded-[20px] shadow-[0_12px_40px_rgba(139,115,85,0.06)]">
            <CardContent className="p-4 md:p-5">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="h-4 w-4 text-[#8B9D83]" />
                <span className="text-[10px] uppercase tracking-wider text-[#8B7355] font-normal">Resolved</span>
              </div>
              <div className="text-2xl md:text-3xl font-serif font-normal text-[#6E5A4F]">{stats.resolved}</div>
              <div className="text-[9px] text-[#8B7355] mt-1">Successfully completed</div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-3xl bg-white/40 border-0 rounded-[20px] shadow-[0_12px_40px_rgba(139,115,85,0.06)]">
            <CardContent className="p-4 md:p-5">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-4 w-4 text-[#8B7355]" />
                <span className="text-[10px] uppercase tracking-wider text-[#8B7355] font-normal">Avg Resolution</span>
              </div>
              <div className="text-2xl md:text-3xl font-serif font-normal text-[#6E5A4F]">{stats.avgResolutionTime}</div>
              <div className="text-[9px] text-[#8B7355] mt-1">Mean time to resolve</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-[20px] backdrop-blur-3xl bg-white/30 md:bg-white/40 border-0 shadow-[0_8px_24px_rgba(139,115,85,0.05)]">
          <div className="flex items-center gap-2 md:gap-3">
            <Filter className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B7355]" />
            <span className="text-[10px] md:text-xs text-[#8B7355] font-normal uppercase tracking-wider">Filter by:</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {[
              { value: 'all', label: 'All Status' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'resolved', label: 'Resolved' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedStatus(filter.value as any)}
                className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-normal transition-all duration-700 ${
                  selectedStatus === filter.value
                    ? "bg-[#D8C8A8]/40 text-[#5A4A3F] shadow-[0_4px_16px_rgba(216,200,168,0.2)]"
                    : "bg-white/30 text-[#6E5A4F] hover:bg-white/40"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block h-4 w-px bg-white/30 mx-2" />

          <div className="flex flex-wrap gap-1.5 md:gap-2 md:mt-0">
            {[
              { value: 'all', label: 'All Priority' },
              { value: 'vip', label: 'VIP' },
              { value: 'urgent', label: 'Urgent' },
              { value: 'high', label: 'High' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedPriority(filter.value as any)}
                className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-normal transition-all duration-700 ${
                  selectedPriority === filter.value
                    ? "bg-[#D8C8A8]/40 text-[#5A4A3F] shadow-[0_4px_16px_rgba(216,200,168,0.2)]"
                    : "bg-white/30 text-[#6E5A4F] hover:bg-white/40"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="md:hidden w-full">
          {mobilePanel === 'list' ? (
            <div className="space-y-2.5 w-full">
              {filteredLogs.length === 0 ? (
                <Card className="backdrop-blur-3xl bg-white/40 border-0 rounded-[18px] p-8 text-center">
                  <AlertTriangle className="h-12 w-12 text-[#8B7355] mx-auto mb-3 opacity-40" />
                  <p className="text-sm text-[#6E5A4F] mb-1">No escalations found</p>
                  <p className="text-xs text-[#8B7355]">Try adjusting your filters</p>
                </Card>
              ) : (
                filteredLogs.map((log) => {
                  const statusColor = log.status === 'resolved' ? '#8B9D83' : '#C9A876'
                  const priorityColor = log.priority === 'urgent' ? '#C97355' : log.priority === 'vip' ? '#D8C8A8' : '#8B7355'

                  return (
                    <button
                      key={log.id}
                      onClick={() => {
                        setSelectedEscalation(log)
                        setMobilePanel('detail')
                      }}
                      className="w-full rounded-[16px] backdrop-blur-3xl bg-white/40 border-0 p-3.5 text-left hover:bg-white/50 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_16px_rgba(139,115,85,0.06)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full backdrop-blur-xl bg-gradient-to-br from-white/70 to-[#F7F4EF]/50 border border-white/50 flex items-center justify-center text-[11px] font-normal text-[#6E5A4F] flex-shrink-0 shadow-[0_4px_16px_rgba(216,200,168,0.1)]">
                          {log.initials}
                        </div>

                        <div className="flex-1 overflow-hidden space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-xs font-normal text-[#5A4A3F] truncate">{log.guest}</h3>
                            <span className="text-[9px] text-[#8B7355] whitespace-nowrap">{log.escalatedAt.replace('Today, ', '')}</span>
                          </div>

                          <p className="text-[11px] text-[#6E5A4F] leading-relaxed line-clamp-2">{log.issue}</p>

                          <div className="flex items-center gap-1.5 flex-wrap">
                            <Badge className="text-[8px] px-2 py-0.5 rounded-full border-0 font-sans" style={{ backgroundColor: `${statusColor}20`, color: statusColor }}>
                              {log.status === 'resolved' ? 'Resolved' : 'In Progress'}
                            </Badge>
                            <Badge className="text-[8px] px-2 py-0.5 rounded-full border-0 font-sans" style={{ backgroundColor: `${priorityColor}20`, color: priorityColor }}>
                              {log.priority.toUpperCase()}
                            </Badge>
                            <span className="text-[8px] text-[#8B7355]">{log.id}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          ) : (
            selectedEscalation && (
              <div className="fixed inset-0 z-50 bg-[#F7F4EF] overflow-y-auto">
                <div className="sticky top-0 z-10 border-b border-white/25 backdrop-blur-xl bg-white/50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setMobilePanel('list')} 
                      className="flex items-center justify-center h-9 w-9 rounded-full bg-white/60 hover:bg-white/80 transition-all shadow-sm active:scale-95 flex-shrink-0"
                    >
                      <ArrowLeft className="h-3.5 w-3.5 text-[#6E5A4F]" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-serif uppercase tracking-wide text-[#5A4A3F] truncate">
                        {selectedEscalation.guest}
                      </h3>
                      <p className="text-[9px] text-[#8B7355]">{selectedEscalation.id}</p>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-4 space-y-4">
                  <Card className="backdrop-blur-3xl bg-white/40 border-0 rounded-[18px] p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="text-[8px] px-2 py-0.5 rounded-full border-0 font-sans" style={{ 
                          backgroundColor: `${selectedEscalation.status === 'resolved' ? '#8B9D83' : '#C9A876'}20`, 
                          color: selectedEscalation.status === 'resolved' ? '#8B9D83' : '#C9A876' 
                        }}>
                          {selectedEscalation.status === 'resolved' ? 'Resolved' : 'In Progress'}
                        </Badge>
                        <Badge className="text-[8px] px-2 py-0.5 rounded-full border-0 font-sans" style={{ 
                          backgroundColor: `${selectedEscalation.priority === 'urgent' ? '#C97355' : selectedEscalation.priority === 'vip' ? '#D8C8A8' : '#8B7355'}20`, 
                          color: selectedEscalation.priority === 'urgent' ? '#C97355' : selectedEscalation.priority === 'vip' ? '#D8C8A8' : '#8B7355' 
                        }}>
                          {selectedEscalation.priority.toUpperCase()}
                        </Badge>
                      </div>

                      <h4 className="text-sm text-[#5A4A3F] font-normal leading-relaxed">{selectedEscalation.issue}</h4>

                      <div className="space-y-1 text-[10px] text-[#8B7355]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          <span>Escalated: {selectedEscalation.escalatedAt}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="h-3 w-3" />
                          <span>Assigned: {selectedEscalation.assignedTo}</span>
                        </div>
                        {selectedEscalation.resolvedAt && (
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Resolved: {selectedEscalation.resolvedAt}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <h4 className="font-serif text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase">Timeline</h4>
                    <div className="space-y-2 pl-3 border-l-2 border-[#D8C8A8]/30">
                      {selectedEscalation.timeline.map((event, idx) => (
                        <div key={idx} className="relative pl-4">
                          <div className="absolute left-[-14px] top-1 h-3 w-3 rounded-full bg-white border-2 border-[#D8C8A8] shadow-sm" />
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] text-[#8B7355]">{event.time}</span>
                              <Badge className="text-[7px] px-1.5 py-0.5 rounded-full border-0 bg-[#D8C8A8]/20 text-[#6E5A4F]">
                                {event.type}
                              </Badge>
                            </div>
                            <p className="text-[10px] text-[#6E5A4F]">{event.event}</p>
                            <p className="text-[9px] text-[#8B7355]">by {event.user}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Taken */}
                  <div className="space-y-2">
                    <h4 className="font-serif text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase">Actions Taken</h4>
                    <div className="space-y-1.5">
                      {selectedEscalation.actions.map((action, idx) => {
                        const actionStatusIcon = action.status === 'completed' ? CheckCircle2 : action.status === 'in-progress' ? Clock : XCircle
                        const actionStatusColor = action.status === 'completed' ? '#8B9D83' : action.status === 'in-progress' ? '#C9A876' : '#8B7355'
                        const ActionIcon = actionStatusIcon

                        return (
                          <div key={idx} className="flex items-center gap-2 p-2.5 rounded-[12px] bg-white/30">
                            <ActionIcon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: actionStatusColor }} />
                            <div className="flex-1">
                              <p className="text-[10px] text-[#6E5A4F]">{action.action}</p>
                              <p className="text-[9px] text-[#8B7355]">{action.timestamp}</p>
                            </div>
                            <Badge 
                              className="text-[8px] px-1.5 py-0.5 rounded-full border-0 font-sans"
                              style={{ backgroundColor: `${actionStatusColor}20`, color: actionStatusColor }}
                            >
                              {action.status}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  {selectedEscalation.status === 'in-progress' && (
                    <div className="flex flex-col gap-2 pt-2">
                      <Button className="h-9 px-4 rounded-full bg-white/50 hover:bg-white/60 text-[#6E5A4F] border-0 shadow-sm text-xs font-medium">
                        View Full Conversation
                      </Button>
                      <Button 
                        onClick={() => handleMarkAsResolved(selectedEscalation.id)}
                        className="h-9 px-4 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] hover:shadow-[0_8px_24px_rgba(216,200,168,0.25)] border-0 text-xs font-medium"
                      >
                        Mark as Resolved
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        <div className="hidden md:block w-full space-y-3 lg:space-y-4">
          {filteredLogs.length === 0 ? (
            <Card className="backdrop-blur-3xl bg-white/40 border-0 rounded-[22px] p-12 text-center shadow-[0_12px_40px_rgba(139,115,85,0.06)]">
              <AlertTriangle className="h-16 w-16 text-[#8B7355] mx-auto mb-4 opacity-40" />
              <p className="text-base text-[#6E5A4F] mb-2">No escalations found</p>
              <p className="text-sm text-[#8B7355]">Try adjusting your filters to see more results</p>
            </Card>
          ) : (
            filteredLogs.map((log) => {
              const isExpanded = expandedEscalation === log.id
              const statusColor = log.status === 'resolved' ? '#8B9D83' : '#C9A876'
              const priorityColor = log.priority === 'urgent' ? '#C97355' : log.priority === 'vip' ? '#D8C8A8' : '#8B7355'

              return (
                <Card 
                  key={log.id}
                  className="backdrop-blur-3xl bg-white/40 border-0 rounded-[22px] shadow-[0_12px_40px_rgba(139,115,85,0.06)] overflow-hidden w-full"
                >
                  <button
                    onClick={() => setExpandedEscalation(isExpanded ? null : log.id)}
                    className="w-full p-3 md:p-6 text-left hover:bg-white/20 transition-all duration-700"
                  >
                    <div className="flex items-start justify-between gap-3 md:gap-6">
                      <div className="flex items-start gap-3 md:gap-4 flex-1">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full backdrop-blur-xl bg-gradient-to-br from-white/70 to-[#F7F4EF]/50 border border-white/50 flex items-center justify-center text-[11px] md:text-sm font-normal text-[#6E5A4F] flex-shrink-0 shadow-[0_4px_16px_rgba(216,200,168,0.1)]">
                          {log.initials}
                        </div>

                        <div className="flex-1 space-y-1 md:space-y-2">
                          <div className="flex items-center gap-1.5 md:gap-3 flex-wrap">
                            <h3 className="text-xs md:text-sm font-normal text-[#5A4A3F]">{log.guest}</h3>
                            <Badge className="text-[8px] md:text-[9px] px-2 md:px-2 py-0.5 rounded-full border-0 font-sans" style={{ backgroundColor: `${statusColor}20`, color: statusColor }}>
                              {log.status === 'resolved' ? 'Resolved' : 'In Progress'}
                            </Badge>
                            <Badge className="text-[8px] md:text-[9px] px-2 md:px-2 py-0.5 rounded-full border-0 font-sans" style={{ backgroundColor: `${priorityColor}20`, color: priorityColor }}>
                              {log.priority.toUpperCase()}
                            </Badge>
                            <span className="text-[9px] md:text-[10px] text-[#8B7355] md:ml-auto">{log.id}</span>
                          </div>

                          <p className="text-xs md:text-sm text-[#6E5A4F] leading-relaxed">{log.issue}</p>

                          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-[9px] md:text-[10px] text-[#8B7355]">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-2.5 w-2.5 md:h-3 md:w-3" />
                              <span>Escalated: {log.escalatedAt}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <User className="h-2.5 w-2.5 md:h-3 md:w-3" />
                              <span>Assigned: {log.assignedTo}</span>
                            </div>
                            {log.resolvedAt && (
                              <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-2.5 w-2.5 md:h-3 md:w-3" />
                                <span>Resolved: {log.resolvedAt}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355] transition-transform duration-300" />
                        ) : (
                          <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355] transition-transform duration-300" />
                        )}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-white/20 p-3 md:p-6 space-y-4 md:space-y-6 bg-white/10">
                      
                      {log.conversationLogs && log.conversationLogs.length > 0 && (
                        <div className="space-y-2 md:space-y-3">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-3 w-3 md:h-4 md:w-4 text-[#8B7355]" />
                            <h4 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase">Conversation Logs</h4>
                          </div>
                          <div className="space-y-1.5 md:space-y-2 max-h-64 overflow-y-auto pr-2">
                            {log.conversationLogs.map((msg, idx) => (
                              <div 
                                key={idx}
                                className={`p-2 md:p-3 rounded-xl ${
                                  msg.sender === 'System' 
                                    ? 'bg-[#C9A876]/10 border border-[#C9A876]/20' 
                                    : msg.sender.includes('AI') 
                                    ? 'bg-[#D8C8A8]/10' 
                                    : 'bg-white/30'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[9px] md:text-[10px] font-medium text-[#5A4A3F]">{msg.sender}</span>
                                  <span className="text-[8px] md:text-[9px] text-[#8B7355]">{msg.timestamp}</span>
                                </div>
                                <p className="text-[10px] md:text-xs text-[#6E5A4F] leading-relaxed">{msg.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {log.bugReports && log.bugReports.length > 0 && (
                        <div className="space-y-2 md:space-y-3">
                          <div className="flex items-center gap-2">
                            <Bug className="h-3 w-3 md:h-4 md:w-4 text-[#C97355]" />
                            <h4 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase">Bug Reports</h4>
                          </div>
                          <div className="space-y-2">
                            {log.bugReports.map((bug) => (
                              <div key={bug.id} className="p-3 rounded-xl bg-[#C97355]/10 border border-[#C97355]/20">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[9px] md:text-[10px] font-medium text-[#5A4A3F]">{bug.id}</span>
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      className="text-[8px] px-1.5 py-0.5 rounded-full border-0"
                                      style={{ 
                                        backgroundColor: bug.severity === 'high' ? '#C9735520' : '#8B735520',
                                        color: bug.severity === 'high' ? '#C97355' : '#8B7355'
                                      }}
                                    >
                                      {bug.severity}
                                    </Badge>
                                    <Badge 
                                      className="text-[8px] px-1.5 py-0.5 rounded-full border-0 bg-[#C9A876]/20 text-[#C9A876]"
                                    >
                                      {bug.status}
                                    </Badge>
                                  </div>
                                </div>
                                <h5 className="text-[10px] md:text-xs font-medium text-[#5A4A3F] mb-1">{bug.title}</h5>
                                <p className="text-[9px] md:text-[10px] text-[#6E5A4F] leading-relaxed mb-2">{bug.description}</p>
                                <div className="flex items-center gap-3 text-[8px] md:text-[9px] text-[#8B7355]">
                                  <span>Reported by {bug.reportedBy}</span>
                                  <span>•</span>
                                  <span>{bug.reportedAt}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {log.changeRequests && log.changeRequests.length > 0 && (
                        <div className="space-y-2 md:space-y-3">
                          <div className="flex items-center gap-2">
                            <Settings className="h-3 w-3 md:h-4 md:w-4 text-[#8B7355]" />
                            <h4 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase">Change Requests</h4>
                          </div>
                          <div className="space-y-2">
                            {log.changeRequests.map((request) => (
                              <div key={request.id} className="p-3 rounded-xl bg-[#D8C8A8]/10 border border-[#D8C8A8]/20">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[9px] md:text-[10px] font-medium text-[#5A4A3F]">{request.id}</span>
                                  <Badge 
                                    className="text-[8px] px-1.5 py-0.5 rounded-full border-0"
                                    style={{ 
                                      backgroundColor: request.status === 'approved' ? '#8B9D8320' : '#C9A87620',
                                      color: request.status === 'approved' ? '#8B9D83' : '#C9A876'
                                    }}
                                  >
                                    {request.status}
                                  </Badge>
                                </div>
                                <h5 className="text-[10px] md:text-xs font-medium text-[#5A4A3F] mb-1">{request.title}</h5>
                                <p className="text-[9px] md:text-[10px] text-[#6E5A4F] leading-relaxed mb-2">{request.description}</p>
                                <div className="flex flex-col gap-1 text-[8px] md:text-[9px] text-[#8B7355]">
                                  <span>Requested by {request.requestedBy} at {request.requestedAt}</span>
                                  {request.approvedBy && <span>Approved by {request.approvedBy}</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Timeline */}
                      <div className="space-y-2 md:space-y-3">
                        <h4 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase">Timeline</h4>
                        <div className="space-y-2 pl-3 md:pl-4 border-l-2 border-[#D8C8A8]/30">
                          {log.timeline.map((event, idx) => (
                            <div key={idx} className="relative pl-4 md:pl-6">
                              <div className="absolute left-[-18px] md:left-[-25px] top-1 h-3 w-3 md:h-4 md:w-4 rounded-full bg-white border-2 border-[#D8C8A8] shadow-sm" />
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                  <span className="text-[9px] md:text-[10px] text-[#8B7355]">{event.time}</span>
                                  <Badge className="text-[7px] md:text-[8px] px-1 md:px-1.5 py-0.5 rounded-full border-0 bg-[#D8C8A8]/20 text-[#6E5A4F]">
                                    {event.type}
                                  </Badge>
                                </div>
                                <p className="text-[10px] md:text-xs text-[#6E5A4F]">{event.event}</p>
                                <p className="text-[9px] md:text-[10px] text-[#8B7355]">by {event.user}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions Taken */}
                      <div className="space-y-2 md:space-y-3">
                        <h4 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase">Actions Taken</h4>
                        <div className="space-y-1.5 md:space-y-2">
                          {log.actions.map((action, idx) => {
                            const actionStatusIcon = action.status === 'completed' ? CheckCircle2 : action.status === 'in-progress' ? Clock : XCircle
                            const actionStatusColor = action.status === 'completed' ? '#8B9D83' : action.status === 'in-progress' ? '#C9A876' : '#8B7355'
                            const ActionIcon = actionStatusIcon

                            return (
                              <div key={idx} className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl md:rounded-[14px] bg-white/30">
                                <ActionIcon className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" style={{ color: actionStatusColor }} />
                                <div className="flex-1">
                                  <p className="text-[10px] md:text-xs text-[#6E5A4F]">{action.action}</p>
                                  <p className="text-[9px] md:text-[10px] text-[#8B7355]">{action.timestamp}</p>
                                </div>
                                <Badge 
                                  className="text-[8px] md:text-[9px] px-1.5 md:px-2 py-0.5 rounded-full border-0 font-sans"
                                  style={{ backgroundColor: `${actionStatusColor}20`, color: actionStatusColor }}
                                >
                                  {action.status}
                                </Badge>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      {log.status === 'in-progress' && (
                        <div className="flex flex-col md:flex-row gap-2 md:gap-3 pt-2 md:pt-3 border-t border-white/20">
                          <Button 
                            onClick={() => router.push(`/service-inbox?conversation=${log.id.toLowerCase()}`)}
                            className="h-8 md:h-9 px-3 md:px-4 rounded-full bg-white/50 hover:bg-white/60 text-[#6E5A4F] border-0 shadow-sm text-[10px] md:text-xs font-medium w-full md:w-auto"
                          >
                            View Full Conversation
                          </Button>
                          <Button 
                            onClick={() => handleMarkAsResolved(log.id)}
                            className="h-8 md:h-9 px-3 md:px-4 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] hover:shadow-[0_8px_24px_rgba(216,200,168,0.25)] border-0 text-[10px] md:text-xs font-medium w-full md:w-auto"
                          >
                            Mark as Resolved
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default EscalationReportPage
