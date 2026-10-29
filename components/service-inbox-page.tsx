"use client"

import * as React from "react"
import { Search, Send, AlertCircle, UserCircle, Phone, Calendar, Users2, MessageCircle, CircleDot, Waves, FileText, TrendingUp, Clock, CheckCircle2, AlertTriangle, ChevronDown, ChevronRight, Download, X, Info, ArrowLeft } from 'lucide-react'
import { AiWebIcon } from '@/components/ui/ai-web-icon'
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
import { useSearchParams } from 'next/navigation'
import { ExportConversationsModal } from "@/components/exports/export-conversations-modal"
import { useRouter } from 'next/navigation'
import { StatusChip } from '@/components/ui/status-chip'
import { mockConversationThreads } from "@/mock/conversations"
import { connectSocket, getSocket } from "@/app/services/socket"


const teamMembers = [
  {
    id: 1,
    name: "Grace G",
    role: "Admin",
    phone: "+1 (424) 555-0123",
    email: "grace@attachai.com",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Manager",
    phone: "+1 (424) 555-0456",
    email: "mike@attachai.com",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Concierge",
    phone: "+1 (424) 555-0789",
    email: "sarah@attachai.com",
  },
]

const inboxItems = [
  {
    id: "conv-1",
    type: "conversation" as const,
    guest: "Sarah Chen",
    initials: "SC",
    preview: "Thank you! The float therapy was incredible.",
    time: "2m",
    handler: "AI" as const,
    confidence: 0.95,
    tags: ["VIP"],
    phone: "+1 (424) 555-0104",
    room: "Silence Atelier Suite 412",
  },
  {
    id: "CONV-001",
    type: "conversation" as const,
    guest: "Sarah Chen",
    initials: "SC",
    preview: "Thank you! The float therapy was incredible.",
    time: "2m",
    handler: "AI" as const,
    confidence: 0.95,
    tags: ["VIP"],
    phone: "+1 (424) 555-0104",
    room: "Silence Atelier Suite 412",
  },
  {
    id: "action-1",
    type: "action" as const,
    guest: "Michael Torres",
    initials: "MT",
    preview: "Infrared sauna appointment - Tomorrow 2 PM",
    time: "5m",
    handler: "Hybrid" as const,
    confidence: 0.88,
    tags: ["High Priority"],
    phone: "+1 (310) 555-0892",
    room: "Workroom 315",
    actionType: "Infrared Booking",
    status: "In Progress",
  },
  {
    id: "CONV-002",
    type: "conversation" as const,
    guest: "Michael Roberts",
    initials: "MR",
    preview: "Infrared sauna appointment - Tomorrow 2 PM",
    time: "5m",
    handler: "Hybrid" as const,
    confidence: 0.88,
    tags: ["VIP", "Workroom"],
    phone: "+1 (310) 555-0892",
    room: "Workroom 315",
  },
  {
    id: "conv-2",
    type: "conversation" as const,
    guest: "Emma Wilson",
    initials: "EW",
    preview: "Regenerative meal reservation request",
    time: "8m",
    handler: "Human" as const,
    confidence: 0.72,
    tags: ["Escalated"],
    phone: "+1 (213) 555-4521",
    room: "528",
  },
  {
    id: "CONV-003",
    type: "conversation" as const,
    guest: "Julia Davis",
    initials: "JD",
    preview: "Neural programming session scheduled",
    time: "8m",
    handler: "AI" as const,
    confidence: 0.92,
    tags: ["Neural Programming"],
    phone: "+1 (213) 555-4521",
    room: "528",
  },
  {
    id: "action-2",
    type: "action" as const,
    guest: "James Patterson",
    initials: "JP",
    preview: "Neural programming session needs adjustment",
    time: "12m",
    handler: "Human" as const,
    confidence: 0.65,
    tags: ["Urgent"],
    phone: "+1 (818) 555-7290",
    room: "201",
    actionType: "Service Request",
    status: "In Progress",
  },
]

const clientProfile = {
  name: "Sarah Chen",
  initials: "SC",
  phone: "+1 (424) 555-0104",
  vip: true,
  location: "Silence Atelier Suite 412",
  memberSince: "Jan 2023",
  preferences: {
    wellness: ["Prefers early float sessions", "Infrared sauna regular"],
    dining: ["Regenerative meals preferred", "Plant-based nutrition focus"],
    space: ["Silence Atelier preferred", "Neural programming Tuesdays"],
  },
  visitHistory: [
    { type: "Float Suite", date: "Today", details: "90-minute float therapy session" },
    { type: "Nutritive Parlour", date: "Yesterday", details: "Regenerative tasting menu" },
  ],
}

export function ServiceInboxPage() {
  const searchParams = useSearchParams()
  const filterParam = searchParams?.get('filter')
  const conversationParam = searchParams?.get('conversation')
  const router = useRouter() // Initialize useRouter
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768 // Basic mobile detection

  const [selectedItem, setSelectedItem] = React.useState(inboxItems[0])

  const [currentThread, setCurrentThread] = React.useState(mockConversationThreads["conv-1"])

   React.useEffect(() => {
    const socket = connectSocket();

    socket.on("all_chats", (data) => {
      console.log("ALL CHATS:", data);
    });

    return () => {
      socket.off("all_chats");
    };
  }, []);

  React.useEffect(() => {
    if (conversationParam) {
      const conversation = inboxItems.find(item => item.id === conversationParam)
      if (conversation) {
        setSelectedItem(conversation)
        // On mobile, automatically show chat view
        if (isMobile) {
          setMobilePanel('chat')
        }
      }
    }
  }, [conversationParam, isMobile])

  React.useEffect(() => {
    const thread = mockConversationThreads[selectedItem.id]
    if (thread) {
      setCurrentThread(thread)
    }
  }, [selectedItem.id])

  const [showEscalateModal, setShowEscalateModal] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [selectedTeamMember, setSelectedTeamMember] = React.useState<string>("")
  const [escalationNote, setEscalationNote] = React.useState("")
  const [showExportModal, setShowExportModal] = React.useState(false)

  const [conversationMode, setConversationMode] = React.useState<'ai' | 'human'>('ai')

  const [filterHandler, setFilterHandler] = React.useState<'all' | 'AI' | 'Human' | 'Hybrid'>('all')
  const [filterType, setFilterType] = React.useState<'all' | 'conversation' | 'action'>('all')
  const [searchQuery, setSearchQuery] = React.useState('')

  const [showIncoming, setShowIncoming] = React.useState(false)

  const [showPriority, setShowPriority] = React.useState(
    filterParam === 'priority'
  )

  const [showNeedsReview, setShowNeedsReview] = React.useState(
    filterParam === 'review'
  )
  const [showUrgent, setShowUrgent] = React.useState(
    filterParam === 'urgent'
  )
  const [showCompleted, setShowCompleted] = React.useState(false)

  const [mobilePanel, setMobilePanel] = React.useState<'inbox' | 'chat' | 'profile'>('inbox')

  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    new Set(['preferences'])
  )

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
    })
  }

  const handleTakeOver = () => {
    if (conversationMode === 'ai') {
      setConversationMode('human')
    } else {
      setConversationMode('ai')
    }
  }

  const filteredItems = React.useMemo(() => {
    return inboxItems.filter(item => {
      const matchesSearch = item.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.preview.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesHandler = filterHandler === 'all' || item.handler === filterHandler
      const matchesType = filterType === 'all' || item.type === filterType
      const matchesReview = !showNeedsReview ||
        item.confidence < 0.85 ||
        item.tags.some(tag => tag.includes('Review') || tag.includes('Escalated'))

      const matchesUrgent = !showUrgent ||
        item.tags.some(tag =>
          tag.toLowerCase().includes('urgent') ||
          tag.toLowerCase().includes('escalated') ||
          tag.toLowerCase().includes('high priority') ||
          tag.toLowerCase().includes('critical')
        ) ||
        item.confidence < 0.7

      const matchesPriority = !showPriority ||
        item.tags.some(tag =>
          tag.toLowerCase().includes('vip') ||
          tag.toLowerCase().includes('high value') ||
          tag.toLowerCase().includes('sensitive') ||
          tag.toLowerCase().includes('priority')
        )

      const matchesIncoming = !showIncoming ||
        !item.tags.some(tag => tag.toLowerCase().includes('completed'))

      const matchesCompleted = !showCompleted ||
        item.tags.some(tag => tag.toLowerCase().includes('completed'))

      return matchesSearch && matchesHandler && matchesType && matchesReview && matchesUrgent && matchesPriority && matchesIncoming && matchesCompleted
    })
  }, [searchQuery, filterHandler, filterType, showNeedsReview, showUrgent, showPriority, showIncoming, showCompleted])

  const requiresReviewItems = React.useMemo(() => {
    return inboxItems.filter(item =>
      item.confidence < 0.85 ||
      item.tags.some(tag => tag.includes('Escalated') || tag.includes('Urgent') || tag.includes('Review'))
    )
  }, [])

  const conversationsStreamItems = React.useMemo(() => {
    return filteredItems.filter(item =>
      item.type === 'conversation' && item.handler !== 'Human'
    )
  }, [filteredItems])

  const actionsStreamItems = React.useMemo(() => {
    return filteredItems.filter(item =>
      item.type === 'action' && item.handler !== 'Human'
    )
  }, [filteredItems])

  const handoffItems = React.useMemo(() => {
    return filteredItems.filter(item => item.handler === 'Human')
  }, [filteredItems])

  React.useEffect(() => {
    if (showUrgent && (isMobile || window.innerWidth < 1024)) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [showUrgent, isMobile])

  React.useEffect(() => {
    // Only reset if not coming from a filter parameter
    if (!filterParam && !conversationParam) { // Also check for conversationParam
      setShowIncoming(false)
      setShowNeedsReview(false)
      setShowUrgent(false)
      setShowCompleted(false)
      setShowPriority(false)
    }
  }, [filterParam, conversationParam]) // Add conversationParam dependency

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex-1 flex flex-col px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-[2000px] mx-auto w-full">

        {/* Mobile Header */}
        {isMobile && (
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              {/* Standardized mobile H1 to Spectral ALL CAPS with primary taupe token */}
              <h1 className="font-serif text-[20px] tracking-[0.03em] text-[#6E5A4F] uppercase">
                {filterParam === 'review' ? 'NEEDS REVIEW' : filterParam === 'urgent' ? 'URGENT' : conversationParam ? 'CONVERSATION' : 'SERVICE INBOX'} {/* Added conversationParam check */}
              </h1>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-6 flex-shrink-0 ">
          <div className="space-y-1">
            {/* Standardized desktop H1 to Spectral ALL CAPS with primary taupe token */}
            <h1 className="font-serif text-[28px] tracking-[0.03em] text-[#6E5A4F] uppercase">
              SERVICE INBOX
            </h1>
            <p className="text-sm text-[#8B7355] leading-relaxed tracking-wide">
              Every message, every action, intelligently unified
            </p>
          </div>

          <Button
            onClick={() => setShowExportModal(true)}
            variant="outline"
            size="sm"
            className="h-9 px-4"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export View
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6 ">
          <button
            onClick={() => {
              setShowIncoming(!showIncoming)
              setShowNeedsReview(false)
              setShowUrgent(false)
              setShowCompleted(false)
              setShowPriority(false)
              // Navigate to clear other filters if needed
              if (!showIncoming) {
                router.push('/service-inbox')
              }
            }}
            className={`rounded-[16px] backdrop-blur-3xl shadow-[0_8px_24px_rgba(139,115,85,0.05),inset_0_1px_1px_rgba(255,255,255,0.6)] border-0 p-2 sm:p-2.5 transition-all duration-700 text-left ${showIncoming
              ? 'bg-[#D8C8A8]/40 shadow-[0_12px_32px_rgba(216,200,168,0.15)] ring-2 ring-[#D8C8A8]/30'
              : 'bg-white/40 hover:bg-white/50'
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#8B7355]" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8B7355]">Incoming</span>
              </div>
              <span className="text-base sm:text-lg font-serif text-[#5A4A3F]">24</span>
            </div>
          </button>

          <button
            onClick={() => {
              setShowNeedsReview(!showNeedsReview)
              setShowIncoming(false)
              setShowUrgent(false)
              setShowCompleted(false)
              setShowPriority(false)
              if (!showNeedsReview) {
                router.push('/service-inbox?filter=review')
              } else {
                router.push('/service-inbox')
              }
            }}
            className={`rounded-[16px] backdrop-blur-3xl shadow-[0_8px_24px_rgba(139,115,85,0.05),inset_0_1px_1px_rgba(255,255,255,0.6)] border-0 p-2 sm:p-2.5 transition-all duration-700 text-left ${showNeedsReview
              ? 'bg-[#D8C8A8]/40 shadow-[0_12px_32px_rgba(216,200,168,0.15)] ring-2 ring-[#D8C8A8]/30'
              : 'bg-white/40 hover:bg-white/50'
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <AlertCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#8B7355]" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8B7355]">Review</span>
              </div>
              <span className="text-base sm:text-lg font-serif text-[#5A4A3F]">7</span>
            </div>
          </button>

          <button
            onClick={() => {
              setShowUrgent(!showUrgent)
              setShowIncoming(false)
              setShowNeedsReview(false)
              setShowCompleted(false)
              setShowPriority(false)
              if (!showUrgent) {
                router.push('/service-inbox?filter=urgent')
              } else {
                router.push('/service-inbox')
              }
            }}
            className={`rounded-[16px] backdrop-blur-3xl shadow-[0_8px_24px_rgba(139,115,85,0.05),inset_0_1px_1px_rgba(255,255,255,0.6)] border-0 p-2 sm:p-2.5 transition-all duration-700 text-left ${showUrgent
              ? 'bg-[#C9A876]/40 shadow-[0_12px_32px_rgba(201,168,118,0.15)] ring-2 ring-[#C9A876]/30'
              : 'bg-white/40 hover:bg-white/50'
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <AlertTriangle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#8B7355]" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8B7355]">Urgent</span>
              </div>
              <span className="text-base sm:text-lg font-serif text-[#5A4A3F]">3</span>
            </div>
          </button>

          <button
            onClick={() => {
              setShowCompleted(!showCompleted)
              setShowIncoming(false)
              setShowNeedsReview(false)
              setShowUrgent(false)
              setShowPriority(false)
              if (!showCompleted) {
                router.push('/service-inbox?filter=completed')
              } else {
                router.push('/service-inbox')
              }
            }}
            className={`rounded-[16px] backdrop-blur-3xl shadow-[0_8px_24px_rgba(139,115,85,0.05),inset_0_1px_1px_rgba(255,255,255,0.6)] border-0 p-2 sm:p-2.5 transition-all duration-700 text-left ${showCompleted
              ? 'bg-[#D8C8A8]/40 shadow-[0_12px_32px_rgba(216,200,168,0.15)] ring-2 ring-[#D8C8A8]/30'
              : 'bg-white/40 hover:bg-white/50'
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#8B7355]" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8B7355]">Complete</span>
              </div>
              <span className="text-base sm:text-lg font-serif text-[#5A4A3F]">142</span>
            </div>
          </button>
        </div>

        {showPriority && (
          <div className="mb-4 sm:mb-6 ">
            <button
              onClick={() => {
                setShowPriority(!showPriority)
                setShowIncoming(false)
                setShowNeedsReview(false)
                setShowUrgent(false)
                setShowCompleted(false)
                if (!showPriority) {
                  router.push('/service-inbox?filter=priority')
                } else {
                  router.push('/service-inbox')
                }
              }}
              className="w-full sm:w-auto rounded-[16px] backdrop-blur-3xl shadow-[0_8px_24px_rgba(139,115,85,0.05),inset_0_1px_1px_rgba(255,255,255,0.6)] border-0 p-3 sm:p-3.5 transition-all duration-700 text-left bg-gradient-to-br from-[#D8C8A8]/50 to-[#C9A876]/30 shadow-[0_12px_32px_rgba(216,200,168,0.2)] ring-2 ring-[#C9A876]/40"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <AiWebIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C9A876]" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6E5A4F] font-serif">Priority Queue</span>
                </div>
                <span className="text-lg sm:text-xl font-serif text-[#6E5A3F]">5</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-[#8B7355] mt-1.5 ml-7 sm:ml-8">
                VIP arrivals, high-value services, and sensitive requests
              </p>
            </button>
          </div>
        )}

        {/* Mobile Layout */}
        <div className="lg:hidden flex-1 flex flex-col min-h-0">
          {mobilePanel === 'inbox' && (
            <div className="rounded-[20px] backdrop-blur-3xl bg-white/40 border-0 shadow-[0_12px_40px_rgba(139,115,85,0.06)] overflow-hidden flex flex-col flex-1">
              <div className="border-b border-white/25 p-3 sm:p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8B7355]" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 rounded-full backdrop-blur-xl bg-white/50 border-0 text-xs text-[#6E5A4F]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'AI', label: 'AI', icon: AiWebIcon },
                    { value: 'Human', label: 'Human', icon: UserCircle },
                    { value: 'Hybrid', label: 'Hybrid', icon: Users2 },
                  ].map((filter) => {
                    const Icon = filter.icon
                    return (
                      <button
                        key={filter.value}
                        onClick={() => setFilterHandler(filter.value as any)}
                        className={`px-2.5 py-1.5 rounded-full text-[10px] uppercase tracking-wide transition-all duration-700 flex items-center gap-1 ${filterHandler === filter.value
                          ? "bg-[#D8C8A8]/40 text-[#5A4A3F] shadow-[0_4px_20px_rgba(216,200,168,0.25)]"
                          : "bg-white/30 text-[#6E5A4F] hover:bg-white/40"
                          }`}
                      >
                        {Icon && <Icon className="h-2.5 w-2.5" />}
                        {filter.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-2 py-2 space-y-3">
                {requiresReviewItems.length > 0 && (
                  <div className="space-y-1.5">
                    <button
                      onClick={() => toggleSection('review')}
                      className="w-full flex items-center justify-between px-2 py-1 hover:bg-white/20 rounded-lg"
                    >
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="h-3 w-3 text-[#C9A876]" />
                        <span className="text-[11px] font-serif uppercase tracking-wide text-[#8B7355] truncate">
                          Review
                        </span>
                      </div>
                      <ChevronDown className={`h-3 w-3 text-[#8B7355] transition-transform ${expandedSections.has('review') ? '' : '-rotate-90'}`} />
                    </button>

                    {expandedSections.has('review') && requiresReviewItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedItem(item)
                          setMobilePanel('chat')
                        }}
                        className="w-full rounded-[14px] bg-amber-50/30 border-l-2 border-[#C9A876] p-2.5 text-left"
                      >
                        <div className="flex items-start gap-2">
                          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-white/70 to-[#F7F4EF]/50 flex items-center justify-center text-[10px] text-[#6E5A4F]">
                            {item.initials}
                          </div>
                          <div className="flex-1 overflow-hidden space-y-0.5">
                            <div className="flex items-center justify-between">
                              <h4 className="text-[11px] font-serif uppercase text-[#5A4A3F] truncate">
                                {item.guest}
                              </h4>
                              <span className="text-[9px] text-[#8B7355]">{item.time}</span>
                            </div>
                            <p className="truncate text-[10px] text-[#6E5A4F]">{item.preview}</p>
                            <div className="flex gap-1 flex-wrap">
                              {item.tags.map((tag, i) => (
                                <Badge key={i} className="text-[8px] px-1.5 py-0 bg-[#C9A876]/25 text-[#6E5A4F] border-0">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <div className="space-y-1.5">
                  <button
                    onClick={() => toggleSection('conversations')}
                    className="w-full flex items-center justify-between px-2 py-1 hover:bg-white/20 rounded-lg"
                  >
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="h-3 w-3 text-[#8B7355]" />
                      <span className="text-[11px] font-serif uppercase tracking-wide text-[#8B7355]">Stream</span>
                    </div>
                    <ChevronDown className={`h-3 w-3 text-[#8B7355] transition-transform ${expandedSections.has('conversations') ? '' : '-rotate-90'}`} />
                  </button>

                  {expandedSections.has('conversations') && conversationsStreamItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item)
                        setMobilePanel('chat')
                      }}
                      className="w-full rounded-[14px] bg-white/30 p-2.5 text-left hover:bg-white/45"
                    >
                      <div className="flex items-start gap-2">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-white/70 to-[#F7F4EF]/50 flex items-center justify-center text-[10px] text-[#6E5A4F]">
                          {item.initials}
                        </div>
                        <div className="flex-1 overflow-hidden space-y-0.5">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[11px] font-serif uppercase text-[#5A4A3F] truncate">
                              {item.guest}
                            </h4>
                            <span className="text-[9px] text-[#8B7355]">{item.time}</span>
                          </div>
                          <p className="truncate text-[10px] text-[#6E5A4F]">{item.preview}</p>
                          <div className="flex gap-1 flex-wrap">
                            {item.tags.map((tag, i) => (
                              <Badge key={i} className="text-[8px] px-1.5 py-0 bg-[#D8C8A8]/25 text-[#6E5A4F] border-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mobilePanel === 'chat' && (
            <div className="fixed inset-0 z-50 bg-[#F7F4EF] flex flex-col">
              {/* Sticky header */}
              <div className="sticky top-0 z-10 border-b border-white/25 backdrop-blur-xl bg-white/50">
                {/* Top row with back button, guest info, and profile button */}
                <div className="flex items-center gap-2 px-3 py-2.5">
                  <button
                    onClick={() => setMobilePanel('inbox')}
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-white/60 hover:bg-white/80 transition-all shadow-sm active:scale-95 flex-shrink-0"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 text-[#6E5A4F]" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-serif uppercase tracking-wide text-[#5A4A3F] truncate">
                        {currentThread.guest}
                      </h3>
                      {currentThread.vip && <StatusChip variant="champagne">Vip</StatusChip>}
                    </div>
                    <p className="text-[9px] text-[#8B7355] truncate">{currentThread.phone}</p>
                  </div>
                  <button
                    onClick={() => setMobilePanel('profile')}
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-white/60 hover:bg-white/80 transition-all shadow-sm active:scale-95 flex-shrink-0"
                  >
                    <Info className="h-3.5 w-3.5 text-[#6E5A4F]" />
                  </button>
                </div>

                {/* AI status and TAKE OVER button row */}
                <div className="px-3 py-2 bg-gradient-to-r from-[#D8C8A8]/20 to-[#F7F4EF]/20">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[10px] text-[#8B7355] flex-shrink min-w-0">
                      {conversationMode === 'ai' ? (
                        <>
                          <AiWebIcon className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">AI Handling • {Math.round(selectedItem.confidence * 100)}%</span>
                        </>
                      ) : (
                        <>
                          <UserCircle className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">Human Control</span>
                        </>
                      )}
                    </div>

                    <Button
                      onClick={handleTakeOver}
                      className={`h-7 px-3 rounded-full text-[9px] uppercase tracking-wide whitespace-nowrap flex-shrink-0 ${conversationMode === 'ai'
                        ? 'bg-gradient-to-r from-[#8B7355] to-[#6E5A4F] text-white'
                        : 'bg-white/60 text-[#8B7355]'
                        }`}
                    >
                      {conversationMode === 'ai' ? 'Take Over' : 'Return AI'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-4 max-w-3xl mx-auto">
                  {currentThread.messages.map((msg, idx) => (
                    <div key={msg.id}>
                      {idx === 0 || (idx > 0 && currentThread.messages[idx - 1].time !== msg.time) && (
                        <div className="flex items-center gap-2 my-4">
                          <div className="flex-1 h-px bg-white/30" />
                          <span className="text-[10px] text-[#8B7355] font-sans">{msg.time}</span>
                          <div className="flex-1 h-px bg-white/30" />
                        </div>
                      )}

                      <div className={`flex ${msg.type === "client" ? "justify-end" : "justify-start"}`}>
                        {msg.type === "system-action" ? (
                          <Card className="w-full backdrop-blur-2xl bg-[#F7F4EF]/50 border-0 p-3 rounded-[14px]">
                            <div className="flex gap-1.5 mb-1.5">
                              <Badge className="text-[8px] px-1.5 py-0 bg-[#D8C8A8]/30 text-[#6E5A4F] border-0">
                                {msg.action.type}
                              </Badge>
                              <Badge className="text-[8px] px-1.5 py-0 bg-[#D5C8BA]/30 text-[#6E5A4F] border-0">
                                {msg.action.status === "completed" ? "Approved" : "Review"}
                              </Badge>
                            </div>
                            <pre className="whitespace-pre-wrap text-[11px] text-[#6E5A4F] leading-relaxed font-sans">
                              {msg.action.details}
                            </pre>
                          </Card>
                        ) : (
                          <div
                            className={`rounded-[12px] px-3 py-2 max-w-[82%] ${msg.type === "client"
                              ? "bg-gradient-to-br from-white/60 to-[#F7F4EF]/50"
                              : msg.type === "human"
                                ? "bg-gradient-to-br from-[#D8C8A8]/30 to-white/50"
                                : "bg-white/50"
                              }`}
                          >
                            <p className="text-[11px] text-[#6E5A4F] leading-relaxed font-sans">
                              {msg.content}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed input */}
              <div className="px-4 py-3 backdrop-blur-xl bg-white/30 border-t border-white/25">
                <div className="rounded-full bg-white/50 p-2">
                  <div className="flex items-center gap-2">
                    <Textarea
                      placeholder={conversationMode === 'ai' ? "AI handling..." : "Type message..."}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={conversationMode === 'ai'}
                      className="min-h-[32px] max-h-[80px] resize-none bg-transparent border-none text-xs text-[#6E5A4F]"
                      rows={1}
                    />
                    <Button
                      disabled={conversationMode === 'ai' || !message.trim()}
                      className="h-7 w-7 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex-shrink-0"
                    >
                      <Send className="h-3 w-3 text-white" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mobilePanel === 'profile' && (
            <div className="lg:hidden fixed inset-0 z-50 bg-[#F7F4EF] flex flex-col">
              <div className="sticky top-0 z-10 border-b border-white/25 backdrop-blur-xl bg-white/50">
                <div className="flex items-center gap-3 px-4 py-3">
                  <button
                    onClick={() => setMobilePanel('chat')}
                    className="flex items-center justify-center h-9 w-9 rounded-full bg-white/60 hover:bg-white/80 transition-all shadow-sm active:scale-95 flex-shrink-0"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 text-[#6E5A4F]" />
                  </button>
                  <h3 className="text-sm font-serif uppercase tracking-wide text-[#5A4A3F]">
                    Guest Profile
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Layout - Three Column */}
        <div className="hidden lg:grid lg:grid-cols-[320px_1fr_280px] gap-4 xl:gap-6 flex-1 min-h-0">
          {/* Left Sidebar - Inbox List */}
          <div className="rounded-[20px] backdrop-blur-3xl bg-white/40 border-0 shadow-[0_12px_40px_rgba(139,115,85,0.06)] overflow-hidden flex flex-col">
            <div className="border-b border-white/25 p-4 space-y-3 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7355]" />
                <Input
                  placeholder="Search by name, tag, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 rounded-full backdrop-blur-xl bg-white/50 border-0 text-sm text-[#6E5A4F]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'AI', label: 'AI', icon: AiWebIcon },
                  { value: 'Human', label: 'Human', icon: UserCircle },
                  { value: 'Hybrid', label: 'Hybrid', icon: Users2 },
                ].map((filter) => {
                  const Icon = filter.icon
                  return (
                    <button
                      key={filter.value}
                      onClick={() => setFilterHandler(filter.value as any)}
                      className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wide transition-all duration-700 flex items-center gap-1.5 ${filterHandler === filter.value
                        ? "bg-[#D8C8A8]/40 text-[#5A4A3F] shadow-[0_4px_20px_rgba(216,200,168,0.25)]"
                        : "bg-white/30 text-[#6E5A4F] hover:bg-white/40"
                        }`}
                    >
                      {Icon && <Icon className="h-3 w-3" />}
                      {filter.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
              {requiresReviewItems.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-[#C9A876]" />
                    <span className="text-[11px] font-serif uppercase tracking-wide text-[#8B7355]">
                      Review
                    </span>
                  </div>

                  {requiresReviewItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`w-full rounded-[14px] border-l-2 border-[#C9A876] p-3 text-left transition-all ${selectedItem.id === item.id
                        ? 'bg-amber-50/50 shadow-md'
                        : 'bg-amber-50/30 hover:bg-amber-50/40'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-white/70 to-[#F7F4EF]/50 flex items-center justify-center text-[11px] text-[#6E5A4F] flex-shrink-0">
                          {item.initials}
                        </div>
                        <div className="flex-1 overflow-hidden space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-serif uppercase text-[#5A4A3F] truncate">
                              {item.guest}
                            </h4>
                            <span className="text-[10px] text-[#8B7355] flex-shrink-0">{item.time}</span>
                          </div>
                          <p className="truncate text-[11px] text-[#6E5A4F]">{item.preview}</p>
                          <div className="flex gap-1 flex-wrap">
                            {item.tags.map((tag, i) => (
                              <Badge key={i} className="text-[9px] px-2 py-0 bg-[#C9A876]/25 text-[#6E5A4F] border-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2 px-2">
                  <MessageCircle className="h-3.5 w-3.5 text-[#8B7355]" />
                  <span className="text-[11px] font-serif uppercase tracking-wide text-[#8B7355]">Stream</span>
                </div>

                {conversationsStreamItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full rounded-[14px] p-3 text-left transition-all ${selectedItem.id === item.id
                      ? 'bg-white/50 shadow-md'
                      : 'bg-white/30 hover:bg-white/45'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-white/70 to-[#F7F4EF]/50 flex items-center justify-center text-[11px] text-[#6E5A4F] flex-shrink-0">
                        {item.initials}
                      </div>
                      <div className="flex-1 overflow-hidden space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-serif uppercase text-[#5A4A3F] truncate">
                            {item.guest}
                          </h4>
                          <span className="text-[10px] text-[#8B7355] flex-shrink-0">{item.time}</span>
                        </div>
                        <p className="truncate text-[11px] text-[#6E5A4F]">{item.preview}</p>
                        <div className="flex gap-1 flex-wrap">
                          {item.tags.map((tag, i) => (
                            <Badge key={i} className="text-[9px] px-2 py-0 bg-[#D8C8A8]/25 text-[#6E5A4F] border-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle - Chat Thread */}
          <div className="rounded-[20px] backdrop-blur-3xl bg-white/40 border-0 shadow-[0_12px_40px_rgba(139,115,85,0.06)] overflow-hidden flex flex-col">
            <div className="border-b border-white/25 p-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-serif uppercase tracking-wide text-[#5A4A3F]">
                    {currentThread.guest}
                  </h3>
                  {currentThread.vip && <StatusChip variant="champagne">Vip</StatusChip>}
                </div>
                <Button
                  onClick={() => setShowEscalateModal(true)}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs"
                >
                  Escalate
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#D8C8A8]/20 to-[#F7F4EF]/20">
                <div className="flex items-center gap-2 text-xs text-[#8B7355]">
                  {conversationMode === 'ai' ? (
                    <>
                      <AiWebIcon className="h-3.5 w-3.5" />
                      <span>AI Handling • {Math.round(selectedItem.confidence * 100)}% Confidence</span>
                    </>
                  ) : (
                    <>
                      <UserCircle className="h-3.5 w-3.5" />
                      <span>Human Control Active</span>
                    </>
                  )}
                </div>

                <Button
                  onClick={handleTakeOver}
                  size="sm"
                  className={`h-8 px-4 rounded-full text-[10px] uppercase tracking-wide ${conversationMode === 'ai'
                    ? 'bg-gradient-to-r from-[#8B7355] to-[#6E5A4F] text-white'
                    : 'bg-white/60 text-[#8B7355]'
                    }`}
                >
                  {conversationMode === 'ai' ? 'Take Over' : 'Return to AI'}
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-5 max-w-3xl mx-auto">
                {currentThread.messages.map((msg, idx) => (
                  <div key={msg.id}>
                    {idx === 0 || (idx > 0 && currentThread.messages[idx - 1].time !== msg.time) && (
                      <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-white/30" />
                        <span className="text-[11px] text-[#8B7355] font-sans">{msg.time}</span>
                        <div className="flex-1 h-px bg-white/30" />
                      </div>
                    )}

                    <div className={`flex ${msg.type === "client" ? "justify-end" : "justify-start"}`}>
                      {msg.type === "system-action" ? (
                        <Card className="w-full backdrop-blur-2xl bg-[#F7F4EF]/50 border-0 p-4 rounded-[16px]">
                          <div className="flex gap-2 mb-2">
                            <Badge className="text-[9px] px-2 py-0.5 bg-[#D8C8A8]/30 text-[#6E5A4F] border-0">
                              {msg.action.type}
                            </Badge>
                            <Badge className="text-[9px] px-2 py-0.5 bg-[#D5C8BA]/30 text-[#6E5A4F] border-0">
                              {msg.action.status === "completed" ? "Approved" : "Review"}
                            </Badge>
                          </div>
                          <pre className="whitespace-pre-wrap text-xs text-[#6E5A4F] leading-relaxed font-sans">
                            {msg.action.details}
                          </pre>
                        </Card>
                      ) : (
                        <div
                          className={`rounded-[14px] px-4 py-2.5 max-w-[75%] ${msg.type === "client"
                            ? "bg-gradient-to-br from-white/60 to-[#F7F4EF]/50"
                            : msg.type === "human"
                              ? "bg-gradient-to-br from-[#D8C8A8]/30 to-white/50"
                              : "bg-white/50"
                            }`}
                        >
                          <p className="text-sm text-[#6E5A4F] leading-relaxed font-sans">
                            {msg.content}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 backdrop-blur-xl bg-white/30 border-t border-white/25 flex-shrink-0">
              <div className="rounded-2xl bg-white/50 p-3">
                <div className="flex items-end gap-3">
                  <Textarea
                    placeholder={conversationMode === 'ai' ? "AI is handling this conversation..." : "Type your message..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={conversationMode === 'ai'}
                    className="min-h-[40px] max-h-[120px] resize-none bg-transparent border-none text-sm text-[#6E5A4F] placeholder:text-[#8B7355]/50"
                    rows={1}
                  />
                  <Button
                    disabled={conversationMode === 'ai' || !message.trim()}
                    className="h-9 w-9 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex-shrink-0"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Guest Profile */}
          <div className="rounded-[20px] backdrop-blur-3xl bg-white/40 border-0 shadow-[0_12px_40px_rgba(139,115,85,0.06)] overflow-hidden flex flex-col">
            <div className="border-b border-white/25 p-4 flex-shrink-0">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-white/70 to-[#F7F4EF]/50 flex items-center justify-center text-lg text-[#6E5A4F]">
                  {clientProfile.initials}
                </div>
                <div>
                  <h3 className="text-sm font-serif uppercase tracking-wide text-[#5A4A3F]">
                    {clientProfile.name}
                  </h3>
                  {clientProfile.vip && (
                    <Badge className="mt-1 text-[9px] px-2 py-0 bg-[#C9A876]/25 text-[#6E5A4F] border-0">
                      VIP Member
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-[#8B7355]">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{clientProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#8B7355]">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Member since {clientProfile.memberSince}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => toggleSection('preferences')}
                  className="w-full flex items-center justify-between p-2 hover:bg-white/20 rounded-lg"
                >
                  <span className="text-xs font-serif uppercase tracking-wide text-[#8B7355]">
                    Preferences
                  </span>
                  <ChevronRight className={`h-4 w-4 text-[#8B7355] transition-transform ${expandedSections.has('preferences') ? 'rotate-90' : ''}`} />
                </button>

                {expandedSections.has('preferences') && (
                  <div className="space-y-3 px-2">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-wide text-[#8B7355] mb-1.5">Wellness</h4>
                      <ul className="space-y-1 text-[11px] text-[#6E5A4F]">
                        {clientProfile.preferences.wellness.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#C9A876] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-wide text-[#8B7355] mb-1.5">Dining</h4>
                      <ul className="space-y-1 text-[11px] text-[#6E5A4F]">
                        {clientProfile.preferences.dining.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#C9A876] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => toggleSection('history')}
                  className="w-full flex items-center justify-between p-2 hover:bg-white/20 rounded-lg"
                >
                  <span className="text-xs font-serif uppercase tracking-wide text-[#8B7355]">
                    Visit History
                  </span>
                  <ChevronRight className={`h-4 w-4 text-[#8B7355] transition-transform ${expandedSections.has('history') ? 'rotate-90' : ''}`} />
                </button>

                {expandedSections.has('history') && (
                  <div className="space-y-2 px-2">
                    {clientProfile.visitHistory.map((visit, i) => (
                      <div key={i} className="rounded-lg bg-white/30 p-3">
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-[11px] font-serif uppercase text-[#5A4A3F]">
                            {visit.type}
                          </span>
                          <span className="text-[10px] text-[#8B7355]">{visit.date}</span>
                        </div>
                        <p className="text-[10px] text-[#6E5A4F]">{visit.details}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Escalate Modal */}
      <Dialog open={showEscalateModal} onOpenChange={setShowEscalateModal}>
        <DialogContent className="sm:max-w-[425px] rounded-[16px] backdrop-blur-3xl bg-white/70 border-0 shadow-[0_12px_40px_rgba(139,115,85,0.08)]">
          <DialogHeader>
            <DialogTitle className="text-lg font-serif uppercase text-[#5A4A3F]">Escalate Conversation</DialogTitle>
            <DialogDescription className="text-sm text-[#8B7355]">
              Assign this conversation to a team member for further review.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teamMember" className="text-right text-[#6E5A4F] text-xs uppercase tracking-wider">
                Assign To
              </Label>
              <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
                <SelectTrigger className="col-span-3 h-10 rounded-lg backdrop-blur-xl bg-white/50 border-0 text-sm text-[#6E5A4F]">
                  <SelectValue placeholder="Select a team member" />
                </SelectTrigger>
                <SelectContent className="rounded-lg backdrop-blur-xl bg-white/70 border-0">
                  {teamMembers.map(member => (
                    <SelectItem key={member.id} value={member.id.toString()} className="text-sm text-[#6E5A4F]">
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="escalationNote" className="text-right text-[#6E5A4F] text-xs uppercase tracking-wider">
                Note
              </Label>
              <Textarea
                id="escalationNote"
                value={escalationNote}
                onChange={(e) => setEscalationNote(e.target.value)}
                placeholder="Add details for the assigned team member..."
                className="col-span-3 h-[100px] resize-none rounded-lg backdrop-blur-xl bg-white/50 border-0 text-sm text-[#6E5A4F] placeholder:text-[#8B7355]/50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEscalateModal(false)}
              className="rounded-full px-5 h-9"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // TODO: Implement escalation logic
                console.log("Escalating:", { assignedTo: selectedTeamMember, note: escalationNote });
                setShowEscalateModal(false);
                setEscalationNote("");
                setSelectedTeamMember("");
              }}
              className="rounded-full px-5 h-9 bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] text-white"
              disabled={!selectedTeamMember || !escalationNote.trim()}
            >
              Escalate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Modal */}
      <ExportConversationsModal showModal={showExportModal} onClose={() => setShowExportModal(false)} />
    </div>
  )
}
