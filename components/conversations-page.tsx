"use client"

import * as React from "react"
import { Search, Send, AlertCircle, ArrowRight, Bot, UserCircle, Phone, Calendar, Users2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { StatusChip } from '@/components/ui/status-chip'

const teamMembers = [
  {
    id: 1,
    name: "Grace G",
    role: "Admin",
    phone: "+1 (424) 555-0123",
    email: "grace@attachai.com",
    roleDescription: "Property manager handling all escalations and VIP guest issues. Final decision maker for complex situations.",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Manager",
    phone: "+1 (424) 555-0456",
    email: "mike@attachai.com",
    roleDescription: "Operations manager specializing in spa bookings, dining reservations, and high-value service requests.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Concierge",
    phone: "+1 (424) 555-0789",
    email: "sarah@attachai.com",
    roleDescription: "Guest relations expert handling transportation, activities, and general concierge services.",
  },
]

const conversations = [
  {
    id: 1,
    phone: "+1 (424) 555-0104",
    name: "Sarah Chen",
    initials: "SC",
    lastMessage: "Thank you! The massage was amazing.",
    time: "2m",
    unread: 0,
    status: "active",
    aiHandling: true,
    confidence: 0.95,
    sentiment: "positive",
    tags: ["VIP"],
  },
  {
    id: 2,
    phone: "+1 (310) 555-0892",
    name: "Michael Roberts",
    initials: "MR",
    lastMessage: "I need a private chef for tomorrow evening",
    time: "5m",
    unread: 1,
    status: "escalated",
    aiHandling: false,
    confidence: 0.62,
    sentiment: "neutral",
    tags: ["Escalated", "Needs Review"],
  },
  {
    id: 3,
    phone: "+1 (213) 555-4521",
    name: null,
    initials: "4521",
    lastMessage: "Book taxi to LAX at 6pm",
    time: "8m",
    unread: 0,
    status: "failed",
    aiHandling: true,
    confidence: 0.45,
    sentiment: "neutral",
    tags: ["Failed Automation"],
  },
  {
    id: 4,
    phone: "+1 (818) 555-7290",
    name: "Emily Parker",
    initials: "EP",
    lastMessage: "What time is checkout tomorrow?",
    time: "12m",
    unread: 0,
    status: "active",
    aiHandling: true,
    confidence: 0.92,
    sentiment: "positive",
    tags: [],
  },
]

const messages = [
  {
    id: 1,
    type: "client",
    content: "Hi, I'd like to book a spa appointment",
    time: "10:24 AM",
    reviewed: false,
  },
  {
    id: 2,
    type: "ai",
    content: "I'd be happy to help you book a spa appointment. What type of treatment would you prefer and what time works best for you?",
    time: "10:24 AM",
    confidence: 0.94,
    reviewed: true,
    reviewedBy: "System auto-approved",
  },
  {
    id: 3,
    type: "client",
    content: "Swedish massage at 3pm today if possible",
    time: "10:25 AM",
    reviewed: false,
  },
  {
    id: 4,
    type: "ai",
    content: "Perfect! Let me check availability for a Swedish massage at 3pm today.",
    time: "10:25 AM",
    confidence: 0.97,
    reviewed: false,
  },
  {
    id: 5,
    type: "action",
    action: {
      type: "Spa Booking",
      status: "completed",
      details: "Swedish Massage - 60 min\nTherapist: Maria Lopez\nTime: 3:00 PM\nConfirmation: SPA-2847",
    },
    time: "10:25 AM",
  },
  {
    id: 6,
    type: "ai",
    content: "Great news! I've booked your Swedish massage for 3:00 PM today with Maria Lopez. Your confirmation number is SPA-2847. Is there anything else I can help you with?",
    time: "10:25 AM",
    confidence: 0.96,
    reviewed: true,
    reviewedBy: "Grace (Concierge)",
  },
  {
    id: 7,
    type: "client",
    content: "Thank you! The massage was amazing.",
    time: "2m ago",
    reviewed: false,
  },
]

const clientProfile = {
  phone: "+1 (424) 555-0104",
  name: "Sarah Chen",
  initials: "SC",
  vip: true,
  location: "Suite 412",
  memberSince: "Jan 2023",
  preferences: {
    wellness: ["Prefers quiet spa times", "Swedish massage preferred"],
    dining: ["Vegetarian meals", "Allergic to shellfish"],
    room: ["Early check-in when possible", "Extra pillows"],
  },
  visitHistory: [
    { type: "Spa", date: "Today", details: "Swedish Massage with Maria" },
    { type: "Dining", date: "Yesterday", details: "Vegetarian tasting menu" },
    { type: "Concierge", date: "2 days ago", details: "Airport transfer arranged" },
  ],
  humanInterventions: [
    { date: "Today", staff: "Grace", action: "Reviewed spa booking confirmation" },
    { date: "Yesterday", staff: "Mike", action: "Manually handled dietary request" },
  ],
  aiUnderstanding: [
    "Prefers wellness services in morning/early afternoon",
    "Values personalized service and specific staff",
    "Responds well to proactive suggestions",
  ],
}

export function ConversationsPage() {
  const [selectedConversation, setSelectedConversation] = React.useState(conversations[0])
  const [showEscalateModal, setShowEscalateModal] = React.useState(false)
  const [showTakeoverModal, setShowTakeoverModal] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [aiHandling, setAiHandling] = React.useState(true)

  const [selectedTeamMember, setSelectedTeamMember] = React.useState<string>("")
  const [escalationNote, setEscalationNote] = React.useState("")
  const [escalationPriority, setEscalationPriority] = React.useState("normal")

  const [handlerFilter, setHandlerFilter] = React.useState<'all' | 'ai' | 'human' | 'hybrid'>('all')
  const [sortBy, setSortBy] = React.useState<'date' | 'tag'>('date')
  const [searchQuery, setSearchQuery] = React.useState('')

  // Helper function to parse time strings like "2m", "5m", "1h" to minutes
  const parseTimeToMinutes = (time: string): number => {
    const match = time.match(/(\d+)([mh])/)
    if (!match) return 0
    const [, value, unit] = match
    return unit === 'h' ? parseInt(value) * 60 : parseInt(value)
  }

  const filteredConversations = React.useMemo(() => {
    let filtered = conversations

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(conv => 
        conv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.phone.includes(searchQuery) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by handler type
    if (handlerFilter !== 'all') {
      if (handlerFilter === 'ai') {
        filtered = filtered.filter(conv => conv.aiHandling && !conv.tags.includes('Escalated'))
      } else if (handlerFilter === 'human') {
        filtered = filtered.filter(conv => !conv.aiHandling || conv.tags.includes('Escalated'))
      } else if (handlerFilter === 'hybrid') {
        filtered = filtered.filter(conv => 
          conv.aiHandling && (conv.tags.includes('Needs Review') || conv.status === 'escalated')
        )
      }
    }

    // Sort conversations
    if (sortBy === 'date') {
      // Most recent first (already in order, but explicit)
      filtered = [...filtered].sort((a, b) => {
        const timeA = parseTimeToMinutes(a.time)
        const timeB = parseTimeToMinutes(b.time)
        return timeA - timeB // Ascending (most recent has smallest time value)
      })
    } else if (sortBy === 'tag') {
      // Group by tag priority: VIP > Escalated > Needs Review > Failed > Others
      filtered = [...filtered].sort((a, b) => {
        const tagPriority = (tags: string[]) => {
          if (tags.includes('VIP')) return 0
          if (tags.includes('Escalated')) return 1
          if (tags.includes('Needs Review')) return 2
          if (tags.includes('Failed Automation')) return 3
          return 4
        }
        return tagPriority(a.tags) - tagPriority(b.tags)
      })
    }

    return filtered
  }, [conversations, handlerFilter, sortBy, searchQuery])

  return (
    <div className="min-h-screen p-8 flex flex-col">
      <div className="max-w-[1800px] mx-auto w-full flex flex-col flex-1">
        <div className="space-y-1 mb-6 flex-shrink-0">
          <h1 className="font-serif text-2xl text-[#3a2f28] font-light tracking-wide">
            Conversations
          </h1>
          <p className="text-sm font-light text-[#8B7355] leading-relaxed tracking-wide">
            Every message, every moment, effortlessly managed
          </p>
        </div>

        <div className="flex gap-6 flex-1 min-h-0" style={{ height: 'calc(100vh - 12rem)' }}>
          {/* LEFT COLUMN — Conversation List */}
          <div className="flex w-[280px] flex-col h-full rounded-[22px] backdrop-blur-3xl bg-white/40 border-0 shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] overflow-hidden transition-all duration-900 ease-out animate-in fade-in slide-in-from-left-6" style={{ animationDuration: '1200ms' }}>
            <div className="border-b border-[#D8C8A8]/10 p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#B8A896]" />
                <Input 
                  placeholder="Search conversations..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 rounded-full backdrop-blur-[8px] bg-[#F7F4EF]/50 border-[#FFFFFF]/15 text-xs text-[#6E5A4F] placeholder:text-[#B8A896] font-sans focus:border-[#D8C8A8]/40 focus:ring-1 focus:ring-[#D8C8A8]/15 transition-all duration-900 tracking-wide" 
                />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-light text-[#B8A896] tracking-wider uppercase">Filter by Handler</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { value: 'all', label: 'All', icon: null },
                    { value: 'ai', label: 'AI', icon: Bot },
                    { value: 'human', label: 'Human', icon: UserCircle },
                    { value: 'hybrid', label: 'Hybrid', icon: Users2 },
                  ].map((filter) => {
                    const Icon = filter.icon
                    return (
                      <button
                        key={filter.value}
                        onClick={() => setHandlerFilter(filter.value as any)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-light tracking-wide transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-1 ${
                          handlerFilter === filter.value
                            ? "bg-[#D8C8A8]/50 text-[#3a2f28] shadow-[0_4px_20px_rgba(216,200,168,0.35),inset_0_1px_2px_rgba(255,255,255,0.7)] scale-[1.02]"
                            : "bg-white/30 text-[#8B7355] hover:bg-white/40 hover:shadow-[0_2px_12px_rgba(216,200,168,0.2)] hover:scale-[1.01]"
                        }`}
                      >
                        {Icon && <Icon className="h-3 w-3" />}
                        {filter.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-light text-[#B8A896] tracking-wider uppercase">Sort by</span>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'date' | 'tag')}>
                  <SelectTrigger className="h-9 rounded-full backdrop-blur-[8px] bg-[#F7F4EF]/50 border-[#FFFFFF]/15 text-xs text-[#6E5A4F] focus:ring-0 focus:ring-offset-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[20px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_16px_48px_rgba(139,115,85,0.12)]">
                    <SelectItem value="date" className="rounded-[14px] text-xs font-light">Most Recent</SelectItem>
                    <SelectItem value="tag" className="rounded-[14px] text-xs font-light">By Priority Tag</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex-1 h-full overflow-y-auto px-3 py-3 space-y-1.5" style={{ height: 'calc(100% - 200px)' }}>
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D8C8A8]/20 to-[#C9A876]/10 flex items-center justify-center mb-2">
                    <Search className="h-5 w-5 text-[#B8A896]" />
                  </div>
                  <p className="text-xs font-light text-[#B8A896] leading-relaxed max-w-[200px]">
                    No conversations match your filters
                  </p>
                </div>
              ) : (
                filteredConversations.map((conv, idx) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full rounded-[14px] backdrop-blur-[8px] p-2 text-left transition-all duration-900 ease-out border animate-in fade-in slide-in-from-bottom-2 relative ${
                      selectedConversation.id === conv.id 
                        ? "bg-[#F7F4EF]/60 border-[#D8C8A8]/30 shadow-[0_6px_24px_rgba(216,200,168,0.12),0_0_0_1px_rgba(216,200,168,0.15)_inset] scale-[1.01]" 
                        : "bg-[#F7F4EF]/25 border-[#FFFFFF]/8 hover:bg-[#F7F4EF]/45 hover:border-[#D8C8A8]/20 hover:shadow-[0_4px_18px_rgba(216,200,168,0.08)] hover:-translate-y-0.5"
                    }`}
                    style={{ animationDelay: `${idx * 60}ms`, animationDuration: '800ms' }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-[14px] bg-gradient-to-b from-[#C9A876]/60 to-[#C9A876]/20 flex items-center justify-center mb-2">
                      <Search className="h-5 w-5 text-[#B8A896]" />
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="relative flex-shrink-0">
                        <div className="h-7 w-7 rounded-full backdrop-blur-[10px] bg-gradient-to-br from-[#E9E2D7]/50 to-[#D8C8A8]/30 border border-[#D8C8A8]/25 flex items-center justify-center text-[9px] font-medium text-[#6E5A4F] shadow-[0_3px_12px_rgba(216,200,168,0.15)] transition-all duration-900">
                          {conv.initials}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full border border-[#F7F4EF] shadow-sm transition-all duration-900 ${
                          conv.aiHandling 
                            ? "bg-[#D8C8A8] shadow-[0_0_6px_rgba(216,200,168,0.5)]" 
                            : "bg-[#B8A896] shadow-[0_0_6px_rgba(184,168,150,0.4)]"
                        }`} />
                      </div>

                      <div className="flex-1 overflow-hidden space-y-0.5">
                        <div className="flex items-start justify-between gap-1">
                          <div className="flex-1 overflow-hidden">
                            <h4 className="text-[10px] font-serif text-[#6E5A4F] truncate tracking-wide leading-tight">
                              {conv.name || conv.phone}
                            </h4>
                            <div className="flex flex-wrap gap-0.5 mt-0.5">
                              {conv.tags.map((tag, i) => (
                                <Badge 
                                  key={i}
                                  className={`text-[8px] px-1 py-0 rounded-full border font-sans tracking-wide transition-all duration-900 leading-none ${
                                    tag === "VIP" 
                                      ? "bg-[#D8C8A8]/20 text-[#6E5A4F] border-[#D8C8A8]/30" 
                                      : tag === "Escalated"
                                      ? "bg-[#D5C8BA]/20 text-[#6E5A4F] border-[#D5C8BA]/30"
                                      : tag === "Failed Automation"
                                      ? "bg-[#B8A896]/20 text-[#6E5A4F] border-[#B8A896]/30"
                                      : tag === "Needs Review"
                                      ? "bg-[#C9A876]/20 text-[#6E5A4F] border-[#C9A876]/30"
                                      : "bg-[#E9E2D7]/20 text-[#6E5A4F] border-[#E9E2D7]/30"
                                  }`}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <span className="text-[9px] text-[#B8A896] font-sans flex-shrink-0 tracking-wider opacity-80">{conv.time}</span>
                        </div>

                        <p className="truncate text-[9px] text-[#B8A896] font-sans leading-relaxed tracking-wide">
                          {conv.lastMessage}
                        </p>

                        <div className="flex items-center gap-1">
                          <div className="flex-1 h-0.5 bg-[#E9E2D7]/30 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] rounded-full transition-all duration-1000"
                              style={{ width: `${conv.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-[8px] text-[#B8A896] font-sans tracking-wide">{Math.round(conv.confidence * 100)}%</span>
                        </div>
                      </div>

                      {conv.unread > 0 && (
                        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#D8C8A8]/80 text-[8px] font-medium text-[#6E5A4F] shadow-[0_2px_10px_rgba(216,200,168,0.35)] flex-shrink-0">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* CENTER COLUMN — Conversation Thread */}
          <div className="flex flex-1 max-w-3xl flex-col h-full rounded-[22px] backdrop-blur-3xl bg-white/40 border-0 shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] overflow-hidden animate-in fade-in zoom-in-95" style={{ animationDuration: '1200ms', animationDelay: '150ms' }}>
            <div className="flex items-center justify-between border-b border-[#D5C8BA]/8 px-8 py-5 backdrop-blur-xl bg-[#F7F4EF]/25">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-[10px] bg-gradient-to-br from-[#E9E2D7]/50 to-[#D8C8A8]/30 border border-[#D8C8A8]/25 shadow-[0_3px_12px_rgba(216,200,168,0.15)] text-xs font-medium text-[#6E5A4F] transition-all duration-900">
                  {clientProfile.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-xs font-serif font-normal text-[#6E5A4F] tracking-wide">
                      {selectedConversation.name || selectedConversation.phone}
                    </h3>
                    {clientProfile.vip && (
                      <StatusChip variant="champagne">Vip</StatusChip>
                    )}
                  </div>
                  {selectedConversation.name && (
                    <p className="text-[10px] text-[#B8A896] font-sans tracking-wide">{selectedConversation.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Button
                  onClick={() => {
                    setAiHandling(!aiHandling)
                  }}
                  className="h-8 px-4 rounded-full backdrop-blur-xl border transition-all duration-900 text-[10px] font-sans shadow-[0_4px_16px_rgba(216,200,168,0.10)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(216,200,168,0.16)] bg-[#D8C8A8]/15 hover:bg-[#D8C8A8]/25 text-[#6E5A4F] border-[#D8C8A8]/25 tracking-wide"
                >
                  {aiHandling ? (
                    <>
                      <UserCircle className="mr-1.5 h-3 w-3" />
                      Take Over Now
                    </>
                  ) : (
                    <>
                      <Bot className="mr-1.5 h-3 w-3" />
                      Return to AI
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setShowEscalateModal(true)}
                  className="h-8 px-4 rounded-full bg-[#D8C8A8]/15 hover:bg-[#D8C8A8]/25 text-[#6E5A4F] border border-[#D8C8A8]/25 shadow-[0_4px_16px_rgba(216,200,168,0.10)] transition-all duration-900 hover:scale-105 text-[10px] font-sans tracking-wide"
                >
                  <AlertCircle className="mr-1.5 h-3 w-3" />
                  Escalate
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-10 py-8" style={{ 
              background: `
                radial-gradient(circle at 30% 40%, rgba(233,226,215,0.08) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(213,200,186,0.05) 0%, transparent 50%),
                #F7F4EF
              `
            }}>
              <div className="space-y-10 max-w-3xl mx-auto">
                {messages.map((msg, idx) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === "client" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`}
                    style={{ animationDelay: `${idx * 60}ms`, animationDuration: '700ms' }}
                  >
                    {msg.type === "action" ? (
                      <Card className="w-full max-w-md backdrop-blur-[8px] bg-[#E9E2D7]/35 border border-[#D5C8BA]/15 p-5 rounded-[18px] shadow-[0_8px_32px_rgba(213,200,186,0.06)] transition-all duration-900 hover:shadow-[0_12px_42px_rgba(213,200,186,0.10)] hover:-translate-y-0.5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex gap-1.5">
                            <Badge className="text-[9px] px-2.5 py-0.5 rounded-full bg-[#D8C8A8]/20 text-[#6E5A4F] border border-[#D8C8A8]/30 font-sans tracking-wide">
                              {msg.action.type}
                            </Badge>
                            <Badge
                              className={`text-[9px] px-2.5 py-0.5 rounded-full font-sans tracking-wide ${
                                msg.action.status === "completed" 
                                  ? "bg-[#D5C8BA]/20 text-[#6E5A4F] border border-[#D5C8BA]/30" 
                                  : "bg-[#B8A896]/20 text-[#6E5A4F] border border-[#B8A896]/30"
                              }`}
                            >
                              {msg.action.status}
                            </Badge>
                          </div>
                        </div>
                        <pre className="whitespace-pre-wrap text-xs text-[#6E5A4F] font-sans leading-relaxed tracking-wide">
                          {msg.action.details}
                        </pre>
                        <p className="mt-3 text-[10px] text-[#B8A896] font-sans tracking-wide">{msg.time}</p>
                      </Card>
                    ) : (
                      <div className="space-y-1.5 max-w-md">
                        <div
                          className={`rounded-[16px] px-5 py-3 shadow-[0_6px_20px_rgba(110,90,79,0.05)] transition-all duration-900 ${
                            msg.type === "client"
                              ? "backdrop-blur-[8px] bg-gradient-to-br from-[#E9E2D7]/60 to-[#D5C8BA]/40 border border-[#D5C8BA]/25"
                              : "backdrop-blur-[8px] bg-[#F7F4EF]/50 border border-[#FFFFFF]/25 shadow-[0_0_16px_rgba(216,200,168,0.06)] animate-breathing"
                          }`}
                        >
                          <p className="text-xs text-[#6E5A4F] font-sans leading-relaxed tracking-wide">
                            {msg.content}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-[10px] text-[#B8A896] font-sans tracking-wide">
                              {msg.time}
                            </p>
                            {msg.type === "ai" && msg.confidence && (
                              <span className="text-[10px] text-[#B8A896] font-sans tracking-wide">
                                {Math.round(msg.confidence * 100)}%
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {msg.type === "ai" && msg.reviewed && (
                          <div className="flex items-center gap-2 px-2.5">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D8C8A8]/25 to-transparent" />
                            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full backdrop-blur-xl bg-[#D8C8A8]/10 border border-[#D8C8A8]/25 shadow-[0_0_12px_rgba(216,200,168,0.15)]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#D8C8A8]" />
                              <span className="text-[10px] text-[#6E5A4F] font-sans tracking-wide">
                                {msg.reviewedBy}
                              </span>
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D8C8A8]/25 to-transparent" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-8 py-6 backdrop-blur-xl bg-[#F7F4EF]/35 border-t border-[#D5C8BA]/8">
              <div className="max-w-3xl mx-auto">
                <div className="rounded-full backdrop-blur-3xl bg-[#F7F4EF]/60 border border-[#FFFFFF]/25 shadow-[0_10px_40px_rgba(110,90,79,0.08)] p-2.5 transition-all duration-900 hover:shadow-[0_14px_52px_rgba(110,90,79,0.12)] hover:border-[#D8C8A8]/15">
                  <div className="flex items-center gap-2.5">
                    <Textarea
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[36px] max-h-[100px] resize-none bg-transparent border-none text-sm text-[#6E5A4F] placeholder:text-[#B8A896] font-sans focus-visible:ring-0 focus-visible:ring-offset-0 leading-relaxed px-4 tracking-wide"
                      rows={1}
                    />
                    <Button className="h-9 w-9 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] hover:from-[#D8C8A8]/95 hover:to-[#C9A876]/95 shadow-[0_6px_20px_rgba(216,200,168,0.30)] transition-all duration-900 hover:scale-110 hover:shadow-[0_10px_32px_rgba(216,200,168,0.40)] flex-shrink-0">
                      <Send className="h-3.5 w-3.5 text-[#6E5A4F]" />
                    </Button>
                  </div>
                </div>
                <p className="mt-2.5 text-center text-[10px] text-[#B8A896] font-sans leading-relaxed tracking-wide">
                  {aiHandling 
                    ? "AI is monitoring this conversation. Step in anytime to take over manually." 
                    : "You are managing this conversation. AI suggestions available on request."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Client Profile */}
          <div className="w-[260px] h-full space-y-6 overflow-y-auto rounded-[22px] backdrop-blur-3xl bg-white/40 border-0 shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] px-6 py-6 animate-in fade-in slide-in-from-right-6" style={{ animationDuration: '1200ms', animationDelay: '300ms' }}>
            
            <div className="space-y-5">
              <h3 className="text-xs font-serif text-[#6E5A4F] tracking-widest uppercase">Client Information</h3>
              <div className="space-y-4 rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/40 border border-[#D5C8BA]/12 p-5 shadow-[0_4px_20px_rgba(213,200,186,0.05)]">
                <div>
                  <p className="text-[10px] text-[#B8A896] font-sans mb-1 tracking-widest uppercase">Name</p>
                  <p className="text-xs font-serif text-[#6E5A4F] tracking-wide">{clientProfile.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#B8A896] font-sans mb-1 tracking-widest uppercase">Phone</p>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3 text-[#D8C8A8]" />
                    <p className="text-xs font-sans text-[#6E5A4F] tracking-wide">{clientProfile.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-[#B8A896] font-sans mb-1 tracking-widest uppercase">Location</p>
                  <p className="text-xs font-sans text-[#6E5A4F] tracking-wide">{clientProfile.location}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#B8A896] font-sans mb-1 tracking-widest uppercase">Member Since</p>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-[#D8C8A8]" />
                    <p className="text-xs font-sans text-[#6E5A4F] tracking-wide">{clientProfile.memberSince}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-xs font-serif text-[#6E5A4F] tracking-widest uppercase">Preferences</h3>
              <div className="space-y-4">
                {Object.entries(clientProfile.preferences).map(([category, prefs]) => (
                  <div key={category} className="space-y-2.5">
                    <p className="text-[10px] text-[#B8A896] font-sans uppercase tracking-widest">{category}</p>
                    <div className="space-y-2">
                      {prefs.map((pref, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#6E5A4F] font-sans backdrop-blur-xl bg-[#F7F4EF]/35 border border-[#D5C8BA]/8 px-4 py-2.5 rounded-[14px] leading-relaxed shadow-[0_2px_12px_rgba(213,200,186,0.03)] transition-all duration-900 hover:border-[#D8C8A8]/25 hover:shadow-[0_4px_18px_rgba(216,200,168,0.06)] tracking-wide">
                          <span className="text-[#D8C8A8] mt-0.5 flex-shrink-0 text-[10px]">•</span>
                          <span>{pref}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-xs font-serif text-[#6E5A4F] tracking-widest uppercase">Visit History</h3>
              <div className="space-y-3">
                {clientProfile.visitHistory.map((visit, idx) => (
                  <div key={idx} className="rounded-[16px] backdrop-blur-xl bg-[#F7F4EF]/40 border border-[#D5C8BA]/12 p-4 shadow-[0_4px_18px_rgba(213,200,186,0.05)] transition-all duration-900 hover:shadow-[0_8px_28px_rgba(213,200,186,0.10)] hover:-translate-y-0.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#D8C8A8]/15 border border-[#D8C8A8]/25 text-[9px] font-sans text-[#6E5A4F] tracking-wide">
                        {visit.type}
                      </span>
                      <span className="text-[10px] text-[#B8A896] font-sans tracking-wide">{visit.date}</span>
                    </div>
                    <p className="text-xs text-[#6E5A4F] font-sans leading-relaxed tracking-wide">{visit.details}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-xs font-serif text-[#6E5A4F] tracking-widest uppercase">Human Interventions</h3>
              <div className="space-y-2.5">
                {clientProfile.humanInterventions.map((intervention, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-[14px] backdrop-blur-xl bg-[#B8A896]/8 border border-[#B8A896]/15 p-4 shadow-[0_2px_12px_rgba(184,168,150,0.04)] transition-all duration-900">
                    <UserCircle className="h-3.5 w-3.5 text-[#B8A896] flex-shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-sans text-[#6E5A4F] font-medium tracking-wide">{intervention.staff}</span>
                        <span className="text-[10px] text-[#B8A896] font-sans tracking-wide">{intervention.date}</span>
                      </div>
                      <p className="text-xs text-[#6E5A4F] font-sans leading-relaxed tracking-wide">{intervention.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-xs font-serif text-[#6E5A4F] tracking-widest uppercase">AI Understanding</h3>
              <div className="space-y-2.5">
                {clientProfile.aiUnderstanding.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-[14px] backdrop-blur-xl bg-[#D8C8A8]/8 border border-[#D8C8A8]/15 p-4 shadow-[0_2px_12px_rgba(216,200,168,0.05)] transition-all duration-900 hover:bg-[#D8C8A8]/12">
                    <Bot className="h-3.5 w-3.5 text-[#D8C8A8] flex-shrink-0 mt-0.5" />
                    <p className="flex-1 text-xs text-[#6E5A4F] font-sans leading-relaxed tracking-wide">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showEscalateModal} onOpenChange={setShowEscalateModal}>
        <DialogContent className="max-w-lg rounded-[28px] backdrop-blur-3xl bg-[#F7F4EF]/98 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.25)]">
          <DialogHeader className="space-y-3">
            <DialogTitle className="font-serif text-[#6E5A4F] text-sm tracking-wide">Escalate to Team</DialogTitle>
            <DialogDescription className="font-sans text-[#B8A896] text-[10px] leading-relaxed tracking-wide">
              Route this conversation to a specific team member for personal attention. The selected team member will receive notifications via phone and email.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-5">
            <div className="space-y-3">
              <Label htmlFor="route-to" className="text-[9px] font-sans text-[#6E5A4F] uppercase tracking-widest">Route to Team Member</Label>
              <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
                <SelectTrigger id="route-to" className="h-11 rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/25 text-[#6E5A4F] text-[10px]">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent className="rounded-[18px] backdrop-blur-3xl bg-[#F7F4EF]/98 border-0 shadow-[0_16px_48px_rgba(139,115,85,0.12)]">
                  {teamMembers.map((member) => (
                    <SelectItem 
                      key={member.id} 
                      value={member.id.toString()} 
                      className="rounded-[14px] text-[10px] font-sans"
                    >
                      <div className="flex flex-col py-1">
                        <span className="font-medium text-[#6E5A4F]">{member.name} ({member.role})</span>
                        <span className="text-[9px] text-[#B8A896] mt-0.5">{member.phone} • {member.email}</span>
                        <span className="text-[8px] text-[#8B7355] mt-1 leading-relaxed">{member.roleDescription}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedTeamMember && (
                <div className="p-3 rounded-[14px] backdrop-blur-xl bg-[#D8C8A8]/10 border border-[#D8C8A8]/25">
                  <p className="text-[8px] text-[#6E5A4F] font-sans leading-relaxed">
                    <span className="font-medium">Notifications will be sent to:</span><br />
                    {teamMembers.find(m => m.id.toString() === selectedTeamMember)?.phone} (SMS)<br />
                    {teamMembers.find(m => m.id.toString() === selectedTeamMember)?.email} (Email)
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <Label htmlFor="priority" className="text-[9px] font-sans text-[#6E5A4F] uppercase tracking-widest">Priority</Label>
              <Select value={escalationPriority} onValueChange={setEscalationPriority}>
                <SelectTrigger id="priority" className="h-11 rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/25 text-[#6E5A4F] text-[10px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[18px] backdrop-blur-3xl bg-[#F7F4EF]/98 border-[#D5C8BA]/25">
                  <SelectItem value="normal" className="rounded-[14px] text-[10px]">Normal</SelectItem>
                  <SelectItem value="urgent" className="rounded-[14px] text-[10px]">Urgent</SelectItem>
                  <SelectItem value="vip" className="rounded-[14px] text-[10px]">VIP Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="note" className="text-[9px] font-sans text-[#6E5A4F] uppercase tracking-widest">Context for Team Member</Label>
              <Textarea
                id="note"
                value={escalationNote}
                onChange={(e) => setEscalationNote(e.target.value)}
                placeholder="Add any important context or instructions for the team member..."
                className="min-h-[120px] rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/25 text-[10px] text-[#6E5A4F] font-sans resize-none leading-relaxed tracking-wide"
              />
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowEscalateModal(false)
                setSelectedTeamMember("")
                setEscalationNote("")
                setEscalationPriority("normal")
              }}
              className="rounded-full h-10 px-6 backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/25 text-[#6E5A4F] hover:bg-[#E9E2D7]/60 transition-all duration-900 text-[9px] font-sans tracking-wide"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                // Handle escalation
                console.log("[v0] Escalating to team member:", selectedTeamMember, "with priority:", escalationPriority)
                setShowEscalateModal(false)
                setAiHandling(false) // Automatically switch to human mode
              }}
              disabled={!selectedTeamMember}
              className="rounded-full h-10 px-6 bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] hover:from-[#D8C8A8]/95 hover:to-[#C9A876]/95 shadow-[0_10px_28px_rgba(216,200,168,0.28)] transition-all duration-900 hover:scale-105 text-[9px] font-sans tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight className="mr-1.5 h-3.5 w-3.5" />
              Escalate & Notify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}
