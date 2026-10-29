"use client"

import * as React from "react"
import { Plus, Search, MessageSquare, Calendar, Users, Send, CheckCircle, Clock, Archive, ChevronDown, Eye, Edit, Copy, Trash2, TrendingUp, AlertCircle, X, Check, FileText, CheckCircle2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { StatusChip } from '@/components/ui/status-chip'
import { useToast } from "@/hooks/use-toast"

interface Campaign {
  id: string
  name: string
  description: string
  channel: 'whatsapp'
  audienceSummary: string
  audienceCount: number
  status: 'draft' | 'scheduled' | 'sending' | 'completed'
  scheduledTime: string | null
  sentDate: string | null
  metrics: {
    sent: number
    responses: number
    optOuts: number
  }
}

const campaigns: Campaign[] = [
  {
    id: "CAMP-001",
    name: "Float Suite Winter Series",
    description: "Exclusive sensory isolation experience for members during winter season",
    channel: "whatsapp",
    audienceSummary: "124 members · Float interest + Wellness",
    audienceCount: 124,
    status: "completed",
    scheduledTime: null,
    sentDate: "2 days ago",
    metrics: {
      sent: 124,
      responses: 87,
      optOuts: 2
    }
  },
  {
    id: "CAMP-002",
    name: "Regenerative Valentine's Experience",
    description: "Conscious dining experience with curated wine pairings",
    channel: "whatsapp",
    audienceSummary: "89 members · Present this week · Pairs",
    audienceCount: 89,
    status: "scheduled",
    scheduledTime: "Tomorrow at 10:00 AM",
    sentDate: null,
    metrics: {
      sent: 0,
      responses: 0,
      optOuts: 0
    }
  },
  {
    id: "CAMP-003",
    name: "Arrival Coordination for Tomorrow",
    description: "Pre-arrival message with space details and arrival guidance",
    channel: "whatsapp",
    audienceSummary: "45 members · Arriving tomorrow",
    audienceCount: 45,
    status: "scheduled",
    scheduledTime: "Today at 4:00 PM",
    sentDate: null,
    metrics: {
      sent: 0,
      responses: 0,
      optOuts: 0
    }
  },
  {
    id: "CAMP-004",
    name: "Departure Reflection",
    description: "Warm closing with invitation for continued connection",
    channel: "whatsapp",
    audienceSummary: "67 members · Departed last 7 days",
    audienceCount: 67,
    status: "draft",
    scheduledTime: null,
    sentDate: null,
    metrics: {
      sent: 0,
      responses: 0,
      optOuts: 0
    }
  }
]

const statusConfig: Record<Campaign["status"], { label: string; icon: any; bg: string; text: string; variant: 'sage' | 'champagne' | 'bronze' | 'neutral' }> = {
  draft: {
    label: "Draft",
    icon: FileText,
    bg: "bg-[#B8A896]/10",
    text: "text-[#8B7355]",
    variant: "neutral"
  },
  scheduled: {
    label: "Scheduled",
    icon: Clock,
    bg: "bg-[#D8C8A8]/15",
    text: "text-[#6E5A4F]",
    variant: "champagne"
  },
  sending: {
    label: "Sending",
    icon: Send,
    bg: "bg-[#C9A876]/15",
    text: "text-[#6E5A4F]",
    variant: "bronze"
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    bg: "bg-[#8B9D83]/15",
    text: "text-[#6E5A4F]",
    variant: "sage"
  }
}

export function CampaignsPage() {
  const { toast } = useToast()
  
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showNewCampaign, setShowNewCampaign] = React.useState(false)
  const [selectedCampaign, setSelectedCampaign] = React.useState<Campaign | null>(null)
  const [showDetails, setShowDetails] = React.useState(false)
  const [showScheduleConfirm, setShowScheduleConfirm] = React.useState(false)
  const [preferredLanguage, setPreferredLanguage] = React.useState("en")

  // New campaign form state
  const [campaignName, setCampaignName] = React.useState("")
  const [campaignDescription, setCampaignDescription] = React.useState("")
  const [scheduleType, setScheduleType] = React.useState<'now' | 'schedule'>('now')
  const [scheduledDate, setScheduledDate] = React.useState("")
  const [scheduledTime, setScheduledTime] = React.useState("")
  const [messageContent, setMessageContent] = React.useState("")
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [addToList, setAddToList] = React.useState(false)
  const [triggerAutomation, setTriggerAutomation] = React.useState(false)
  const [followUpEnabled, setFollowUpEnabled] = React.useState(false)
  const [followUpDelay, setFollowUpDelay] = React.useState("24h")

  const filteredCampaigns = React.useMemo(() => {
    return campaigns.filter((campaign) => {
      if (filterStatus !== "all" && campaign.status !== filterStatus) return false
      if (searchQuery && !campaign.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
  }, [filterStatus, searchQuery])

  const handleCreateCampaign = () => {
    console.log('[v0] Creating campaign:', {
      campaignName,
      campaignDescription,
      scheduleType,
      scheduledDate,
      scheduledTime,
      messageContent,
      selectedTags,
      preferredLanguage,
      addToList,
      triggerAutomation,
      followUpEnabled,
      followUpDelay
    })
    toast({
      title: "Campaign Created",
      description: "Your campaign has been created successfully and is ready to send.",
    })
    setShowNewCampaign(false)
    // Reset form
    resetForm()
  }

  const handleSaveDraft = () => {
    console.log('[v0] Saving campaign as draft:', {
      campaignName,
      campaignDescription,
      scheduleType,
      scheduledDate,
      scheduledTime,
      messageContent,
      selectedTags,
      preferredLanguage,
      addToList,
      triggerAutomation,
      followUpEnabled,
      followUpDelay
    })
    toast({
      title: "Draft Saved",
      description: "Your campaign has been saved as a draft. You can find it in the drafts section.",
    })
    setShowNewCampaign(false)
    // Reset form
    resetForm()
  }

  const handleScheduleClick = () => {
    setShowScheduleConfirm(true)
  }

  const handleConfirmSchedule = () => {
    console.log('[v0] Scheduling campaign:', {
      campaignName,
      campaignDescription,
      scheduleType,
      scheduledDate,
      scheduledTime,
      messageContent,
      selectedTags,
      preferredLanguage,
      addToList,
      triggerAutomation,
      followUpEnabled,
      followUpDelay
    })
    toast({
      title: scheduleType === 'now' ? "Campaign Sent" : "Campaign Scheduled",
      description: scheduleType === 'now' 
        ? "Your campaign has been sent successfully to all recipients."
        : `Your campaign has been scheduled for ${scheduledDate} at ${scheduledTime}.`,
    })
    setShowNewCampaign(false)
    setShowScheduleConfirm(false)
    resetForm()
  }

  const resetForm = () => {
    setCampaignName("")
    setCampaignDescription("")
    setMessageContent("")
    setSelectedTags([])
    setPreferredLanguage("en")
    setScheduledDate("")
    setScheduledTime("")
    setScheduleType('now')
    setAddToList(false)
    setTriggerAutomation(false)
    setFollowUpEnabled(false)
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[95%] md:max-w-full lg:max-w-[1100px] px-4 md:px-8 lg:px-20 pt-6 md:pt-10 lg:pt-12 pb-16 md:pb-20 lg:pb-24 space-y-3 md:space-y-6 lg:space-y-8">
        
        <div className="space-y-1 md:space-y-2">
          <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase">
            CAMPAIGNS
          </h1>
          <p className="text-xs md:text-sm font-normal text-[#8B7355] leading-relaxed max-w-2xl">
            Send curated WhatsApp messages to your members and guests, with intelligent follow-up.
          </p>
        </div>

        <div className="rounded-xl md:rounded-[24px] backdrop-blur-3xl bg-white/40 shadow-[0_8px_24px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.6)] md:shadow-[0_20px_60px_rgba(139,115,85,0.08),inset_0_1px_1px_rgba(255,255,255,0.6)] p-3 md:p-5 border-0">
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <div className="relative flex-1 max-w-full sm:max-w-md">
                <Search className="absolute left-3 md:left-5 top-1/2 h-3.5 md:h-4 w-3.5 md:w-4 -translate-y-1/2 text-[#B8A896]" />
                <Input 
                  placeholder="Search campaigns..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 md:pl-12 h-9 md:h-10 rounded-full backdrop-blur-xl bg-white/50 border-0 text-xs md:text-sm font-normal text-[#3a2f28] placeholder:text-[#B8A896]/60 shadow-[0_4px_16px_rgba(139,115,85,0.04)] md:shadow-[0_8px_24px_rgba(139,115,85,0.06)] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_3px_rgba(216,200,168,0.2)] transition-all duration-700 hover:bg-white/60" 
                />
              </div>

              <Button
                onClick={() => setShowNewCampaign(true)}
                className="h-9 md:h-10 px-4 md:px-6 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_8px_30px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-105 text-xs font-normal tracking-wide"
              >
                <Plus className="mr-1.5 md:mr-2 h-3.5 md:h-4 w-3.5 md:w-4" />
                New Campaign
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
              <span className="text-[10px] md:text-xs font-normal text-[#B8A896] tracking-wider uppercase">Status</span>
              <div className="flex items-center gap-1.5 md:gap-2 rounded-full backdrop-blur-xl bg-white/30 p-1 md:p-1.5 shadow-[0_4px_16px_rgba(139,115,85,0.04)] md:shadow-[0_6px_20px_rgba(139,115,85,0.05)] flex-wrap">
                {["all", "draft", "scheduled", "completed"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterStatus(filter)}
                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-normal tracking-wide capitalize transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      filterStatus === filter
                        ? "bg-[#D8C8A8]/50 text-[#3a2f28] shadow-[0_4px_20px_rgba(216,200,168,0.35),inset_0_1px_2px_rgba(255,255,255,0.7)] scale-[1.02]"
                        : "text-[#8B7355] hover:bg-white/40 hover:shadow-[0_2px_12px_rgba(216,200,168,0.2)] hover:scale-[1.01]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 md:space-y-3">
          {filteredCampaigns.map((campaign, index) => {
            const StatusIcon = statusConfig[campaign.status].icon
            
            return (
              <div
                key={campaign.id}
                onClick={() => {
                  setSelectedCampaign(campaign)
                  setShowDetails(true)
                }}
                className="relative group rounded-xl md:rounded-[22px] backdrop-blur-3xl bg-white/40 shadow-[0_8px_24px_rgba(139,115,85,0.04),inset_0_1px_1px_rgba(255,255,255,0.5)] md:shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] border-0 hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(139,115,85,0.08)] md:hover:shadow-[0_16px_56px_rgba(139,115,85,0.1),0_0_0_1px_rgba(216,200,168,0.15),inset_0_2px_4px_rgba(216,200,168,0.12)] hover:-translate-y-0.5 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-0.5 md:w-1 rounded-l-xl md:rounded-l-[22px] bg-gradient-to-b from-[#C9A876]/60 to-[#C9A876]/20" />
                
                <div className="p-3 md:p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  {/* Channel Icon */}
                  <div className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 backdrop-blur-xl items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/40">
                    <MessageSquare className="h-4 w-4 text-[#8B7355]" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1 md:space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm md:text-sm font-serif font-normal text-[#3a2f28] line-clamp-1 uppercase">
                        {campaign.name}
                      </h3>
                      <div className="md:hidden inline-flex items-center gap-1 rounded-full px-2 py-1 text-[8px] font-normal backdrop-blur-xl border border-white/20 flex-shrink-0" style={{
                        backgroundColor: statusConfig[campaign.status].bg.replace('bg-', '').replace(/\//g, ' / '),
                        color: statusConfig[campaign.status].text.replace('text-', '')
                      }}>
                        <StatusIcon className="h-2.5 w-2.5" />
                        <span className={statusConfig[campaign.status].text}>{statusConfig[campaign.status].label}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-[10px] md:text-xs font-normal text-[#B8A896]">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-2.5 md:h-3 w-2.5 md:w-3" />
                        <span className="line-clamp-1">{campaign.audienceSummary}</span>
                      </div>
                      {campaign.scheduledTime && (
                        <div className="flex items-center gap-1.5">
                          <span className="hidden sm:inline">•</span>
                          <Calendar className="h-2.5 md:h-3 w-2.5 md:w-3" />
                          {campaign.scheduledTime}
                        </div>
                      )}
                      {campaign.sentDate && (
                        <div className="flex items-center gap-1.5">
                          <span className="hidden sm:inline">•</span>
                          <span>Sent {campaign.sentDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex md:flex-row items-center justify-between md:justify-start gap-4 md:gap-6 text-xs font-normal">
                    <div className="text-center">
                      <div className="text-sm md:text-base font-serif font-normal text-[#3a2f28]">{campaign.metrics.sent}</div>
                      <div className="text-[8px] md:text-[10px] text-[#B8A896] uppercase tracking-wider">Sent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm md:text-base font-serif font-normal text-[#3a2f28]">{campaign.metrics.responses}</div>
                      <div className="text-[8px] md:text-[10px] text-[#B8A896] uppercase tracking-wider">Replies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm md:text-base font-serif font-normal text-[#3a2f28]">{campaign.metrics.optOuts}</div>
                      <div className="text-[8px] md:text-[10px] text-[#B8A896] uppercase tracking-wider">Opt-outs</div>
                    </div>
                  </div>

                  <div className="hidden md:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-normal backdrop-blur-xl border border-white/20" style={{
                    backgroundColor: statusConfig[campaign.status].bg.replace('bg-', ''),
                    color: statusConfig[campaign.status].text.replace('text-', '')
                  }}>
                    <StatusIcon className="h-3 w-3" />
                    <span className={statusConfig[campaign.status].text}>{statusConfig[campaign.status].label}</span>
                  </div>

                  <ChevronDown className="hidden md:block h-4 w-4 text-[#B8A896] -rotate-90" />
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* New Campaign Modal */}
      <Dialog open={showNewCampaign} onOpenChange={setShowNewCampaign}>
        <DialogContent className="max-w-[95vw] md:max-w-[90vw] lg:max-w-7xl max-h-[92vh] overflow-auto rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)] p-6 md:p-8 lg:p-12">
          <DialogHeader className="space-y-3 pb-4 md:pb-6">
            <DialogTitle className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.03em] text-[#3a2f28] uppercase">
              CREATE NEW CAMPAIGN
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base font-light text-[#8B7355] leading-relaxed">
              Design and schedule a WhatsApp broadcast message for your members and guests
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 py-6 md:py-8">
            {/* Left Column: Campaign Setup */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Campaign Details</Label>
                
                <div className="space-y-4">
                  <Input
                    placeholder="Campaign name (e.g., Float Suite Winter Series)"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="h-14 rounded-[20px] backdrop-blur-xl bg-white/60 border-white/60 text-base text-[#3a2f28] placeholder:text-[#B8A896]/50 focus-visible:ring-[#D8C8A8]/30 focus-visible:border-[#D8C8A8]"
                  />
                  <Input
                    placeholder="Description (optional)"
                    value={campaignDescription}
                    onChange={(e) => setCampaignDescription(e.target.value)}
                    className="h-12 rounded-[20px] backdrop-blur-xl bg-white/40 border-white/60 text-sm text-[#6B5E52] placeholder:text-[#B8A896]/50"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Channel</Label>
                <div className="p-5 rounded-[20px] backdrop-blur-xl bg-gradient-to-br from-[#D8C8A8]/20 to-[#C9A876]/10 border border-[#D8C8A8]/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex items-center justify-center shadow-lg">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-light text-[#3a2f28]">WhatsApp Business</p>
                      <p className="text-sm font-light text-[#8B7355]">Messages sent via approved templates</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#C9A876] shadow-[0_0_8px_currentColor]" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Schedule</Label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setScheduleType('now')}
                      className={`flex-1 px-6 py-4 rounded-[16px] backdrop-blur-xl text-sm font-light transition-all duration-700 ${
                        scheduleType === 'now'
                          ? 'bg-[#D8C8A8]/40 text-[#3a2f28] shadow-[0_4px_16px_rgba(216,200,168,0.2)] border border-[#D8C8A8]/30'
                          : 'bg-white/30 text-[#6B5E52] shadow-[0_2px_8px_rgba(139,115,85,0.05)] border border-white/20 hover:bg-white/40'
                      }`}
                    >
                      Send Now
                    </button>
                    <button
                      onClick={() => setScheduleType('schedule')}
                      className={`flex-1 px-6 py-4 rounded-[16px] backdrop-blur-xl text-sm font-light transition-all duration-700 ${
                        scheduleType === 'schedule'
                          ? 'bg-[#D8C8A8]/40 text-[#3a2f28] shadow-[0_4px_16px_rgba(216,200,168,0.2)] border border-[#D8C8A8]/30'
                          : 'bg-white/30 text-[#6B5E52] shadow-[0_2px_8px_rgba(139,115,85,0.05)] border border-white/20 hover:bg-white/40'
                      }`}
                    >
                      Schedule
                    </button>
                  </div>
                  
                  {scheduleType === 'schedule' && (
                    <div className="grid grid-cols-2 gap-4 animate-fadeSlideIn">
                      <Input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="h-12 rounded-[16px] backdrop-blur-xl bg-white/60 border-white/60 text-sm"
                      />
                      <Input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="h-12 rounded-[16px] backdrop-blur-xl bg-white/60 border-white/60 text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Audience</Label>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {['Members', 'Float interest', 'Present', 'Regenerative dining', 'Extended stays'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTags(prev => 
                            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                          )
                        }}
                        className={`px-5 py-2.5 rounded-full text-sm font-light transition-all duration-700 ${
                          selectedTags.includes(tag)
                            ? 'bg-[#D8C8A8]/40 text-[#3a2f28] shadow-[0_4px_16px_rgba(216,200,168,0.2)] border border-[#D8C8A8]/30'
                            : 'bg-white/30 text-[#6B5E52] shadow-[0_2px_8px_rgba(139,115,85,0.05)] border border-white/20 hover:bg-white/40'
                        }`}
                      >
                        {selectedTags.includes(tag) && <Check className="inline-block h-3 w-3 mr-1.5" />}
                        {tag}
                      </button>
                    ))}
                  </div>
                  
                  {selectedTags.length > 0 && (
                    <div className="p-4 rounded-[16px] backdrop-blur-xl bg-[#F7F4EF]/50 border border-white/25">
                      <p className="text-sm font-light text-[#6B5E52]">
                        Targeting <span className="text-[#3a2f28] font-normal">124 members</span> · {selectedTags.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Preferred Language */}
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Preferred Language</Label>
                <div className="space-y-4">
                  <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                    <SelectTrigger className="h-14 rounded-[20px] backdrop-blur-xl bg-white/60 border-white/60 text-sm text-[#3a2f28]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[20px] backdrop-blur-3xl bg-white/95 border-white/60">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish (Español)</SelectItem>
                      <SelectItem value="fr">French (Français)</SelectItem>
                      <SelectItem value="de">German (Deutsch)</SelectItem>
                      <SelectItem value="it">Italian (Italiano)</SelectItem>
                      <SelectItem value="pt">Portuguese (Português)</SelectItem>
                      <SelectItem value="zh">Chinese (中文)</SelectItem>
                      <SelectItem value="ja">Japanese (日本語)</SelectItem>
                      <SelectItem value="ar">Arabic (العربية)</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="p-4 rounded-[16px] backdrop-blur-xl bg-[#F7F4EF]/50 border border-white/25">
                    <p className="text-sm font-light text-[#6B5E52] leading-relaxed">
                      Messages will be sent in the guest's preferred language when available. Defaults to property language otherwise.
                    </p>
                  </div>
                </div>
              </div>

              {/* After Sending This Campaign */}
              <div className="space-y-5 pt-6 border-t border-[#E9E2D7]/30">
                <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-light">After Sending This Campaign</Label>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 rounded-[16px] backdrop-blur-xl bg-white/30 border border-white/20">
                    <Switch checked={addToList} onCheckedChange={setAddToList} className="data-[state=checked]:bg-[#C9A876] mt-1" />
                    <div className="flex-1 space-y-1.5">
                      <p className="text-sm font-light text-[#3a2f28]">Add recipients to a list</p>
                      <p className="text-sm font-light text-[#8B7355]">Automatically create a segment for follow-up campaigns</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-[16px] backdrop-blur-xl bg-white/30 border border-white/20">
                    <Switch checked={triggerAutomation} onCheckedChange={setTriggerAutomation} className="data-[state=checked]:bg-[#C9A876] mt-1" />
                    <div className="flex-1 space-y-1.5">
                      <p className="text-sm font-light text-[#3a2f28]">Trigger automation when guests reply</p>
                      <p className="text-sm font-light text-[#8B7355]">Route responses to booking workflow automatically</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-[16px] backdrop-blur-xl bg-white/30 border border-white/20">
                    <Switch checked={followUpEnabled} onCheckedChange={setFollowUpEnabled} className="data-[state=checked]:bg-[#C9A876] mt-1" />
                    <div className="flex-1 space-y-3">
                      <div className="space-y-1.5">
                        <p className="text-sm font-light text-[#3a2f28]">Send follow-up if no response</p>
                        <p className="text-sm font-light text-[#8B7355]">Gentle reminder for non-responders</p>
                      </div>
                      {followUpEnabled && (
                        <Select value={followUpDelay} onValueChange={setFollowUpDelay}>
                          <SelectTrigger className="h-11 rounded-full backdrop-blur-xl bg-white/60 border-white/60 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-[20px] backdrop-blur-3xl bg-white/95 border-white/60">
                            <SelectItem value="24h">After 24 hours</SelectItem>
                            <SelectItem value="48h">After 48 hours</SelectItem>
                            <SelectItem value="72h">After 3 days</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Message Builder */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Message Content</Label>
                
                <Textarea
                  placeholder="Hello {first_name}, we're delighted to invite you to our Winter Float Series — an invitation to deep rest and renewal..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows={12}
                  className="rounded-[20px] backdrop-blur-xl bg-white/60 border-white/60 text-base font-light text-[#3a2f28] placeholder:text-[#B8A896]/50 focus-visible:ring-[#D8C8A8]/30 focus-visible:border-[#D8C8A8] resize-none"
                />
                
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 rounded-full backdrop-blur-xl bg-white/40 text-xs font-light text-[#6B5E52] border border-white/30 hover:bg-white/50 transition-all duration-500">
                    {'{first_name}'}
                  </button>
                  <button className="px-4 py-2 rounded-full backdrop-blur-xl bg-white/40 text-xs font-light text-[#6B5E52] border border-white/30 hover:bg-white/50 transition-all duration-500">
                    {'{check_in_date}'}
                  </button>
                  <button className="px-4 py-2 rounded-full backdrop-blur-xl bg-white/40 text-xs font-light text-[#6B5E52] border border-white/30 hover:bg-white/50 transition-all duration-500">
                    {'{room_type}'}
                  </button>
                </div>

                <p className="text-sm font-light text-[#B8A896] leading-relaxed">
                  Messages are delivered via WhatsApp using approved templates where required. In real client setups, all content automatically adapts to your business type and communication style.
                </p>
              </div>

              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Live Preview</Label>
                <div className="p-8 rounded-[20px] backdrop-blur-2xl bg-[#F7F4EF]/50 border border-white/25 shadow-[0_8px_32px_rgba(139,115,85,0.05)]">
                  <div className="max-w-sm">
                    <div className="rounded-[16px] backdrop-blur-xl bg-white/50 border border-white/30 p-5 shadow-[0_6px_20px_rgba(139,115,85,0.08)]">
                      <p className="text-base font-light text-[#6E5A4F] leading-relaxed whitespace-pre-wrap">
                        {messageContent || "Your message will appear here..."}
                      </p>
                      <p className="text-sm font-light text-[#B8A896] mt-4">
                        Just now
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 pt-6 md:pt-8">
            <Button 
              onClick={() => setShowNewCampaign(false)}
              variant="outline"
              className="h-12 md:h-14 px-6 md:px-8 rounded-full backdrop-blur-xl bg-white/40 text-[#6B5E52] border-white/60 hover:bg-white/50 transition-all duration-700 text-sm md:text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveDraft}
              disabled={!campaignName || !messageContent}
              variant="outline"
              className="h-12 md:h-14 px-6 md:px-8 rounded-full backdrop-blur-xl bg-white/50 text-[#3a2f28] border-[#D8C8A8]/30 hover:bg-white/60 transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              Save as Draft
            </Button>
            <Button
              onClick={handleScheduleClick}
              disabled={!campaignName || !messageContent}
              className="flex-1 h-12 md:h-14 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base font-normal"
            >
              {scheduleType === 'now' ? 'Send Campaign' : 'Schedule Campaign'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Confirmation Dialog */}
      <Dialog open={showScheduleConfirm} onOpenChange={setShowScheduleConfirm}>
        <DialogContent className="max-w-lg rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl font-light text-[#3a2f28] tracking-wide">
              {scheduleType === 'now' ? 'Send Campaign Now?' : 'Schedule Campaign?'}
            </DialogTitle>
            <DialogDescription className="text-sm font-light text-[#8B7355] leading-relaxed">
              {scheduleType === 'now' 
                ? `You're about to send "${campaignName}" to ${selectedTags.length > 0 ? '124' : '0'} members immediately via WhatsApp.`
                : `You're about to schedule "${campaignName}" to be sent on ${scheduledDate} at ${scheduledTime} to ${selectedTags.length > 0 ? '124' : '0'} members.`
              }
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <div className="rounded-[20px] backdrop-blur-2xl bg-[#F7F4EF]/50 p-5 space-y-3 border border-white/25">
              <div className="flex items-center justify-between text-sm">
                <span className="font-light text-[#8B7355]">Campaign</span>
                <span className="font-light text-[#3a2f28]">{campaignName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-light text-[#8B7355]">Audience</span>
                <span className="font-light text-[#3a2f28]">{selectedTags.length > 0 ? '124 members' : 'No tags selected'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-light text-[#8B7355]">Language</span>
                <span className="font-light text-[#3a2f28]">
                  {preferredLanguage === 'en' ? 'English' : 
                   preferredLanguage === 'es' ? 'Spanish' :
                   preferredLanguage === 'fr' ? 'French' :
                   preferredLanguage === 'de' ? 'German' :
                   preferredLanguage === 'it' ? 'Italian' :
                   preferredLanguage === 'pt' ? 'Portuguese' :
                   preferredLanguage === 'zh' ? 'Chinese' :
                   preferredLanguage === 'ja' ? 'Japanese' :
                   preferredLanguage === 'ar' ? 'Arabic' : 'English'}
                </span>
              </div>
              {scheduleType === 'schedule' && (
                <div className="flex items-center justify-between text-sm">
                  <span className="font-light text-[#8B7355]">Scheduled for</span>
                  <span className="font-light text-[#3a2f28]">{scheduledDate} at {scheduledTime}</span>
                </div>
              )}
            </div>

            <div className="p-4 rounded-[16px] backdrop-blur-xl bg-[#D8C8A8]/10 border border-[#C9A876]/20">
              <p className="text-xs font-light text-[#8B7355] leading-relaxed flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[#C9A876] mt-0.5 flex-shrink-0" />
                <span>
                  {scheduleType === 'now' 
                    ? 'Messages will be sent immediately. This action cannot be undone.'
                    : 'You can edit or cancel scheduled campaigns before they are sent.'}
                </span>
              </p>
            </div>
          </div>

          <DialogFooter className="flex items-center gap-3">
            <Button 
              onClick={() => setShowScheduleConfirm(false)}
              variant="outline"
              className="flex-1 h-12 rounded-full backdrop-blur-xl bg-white/40 text-[#6B5E52] border-white/60 hover:bg-white/50 transition-all duration-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSchedule}
              className="flex-1 h-12 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-[1.02]"
            >
              {scheduleType === 'now' ? 'Confirm & Send' : 'Confirm & Schedule'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Campaign Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-auto rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)]">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl font-light text-[#3a2f28] tracking-wide">
                  {selectedCampaign.name}
                </DialogTitle>
                <DialogDescription className="text-sm font-light text-[#8B7355] leading-relaxed">
                  {selectedCampaign.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8 py-6">
                {/* Campaign Summary */}
                <div className="rounded-[22px] backdrop-blur-2xl bg-white/40 p-8 space-y-6 shadow-[0_8px_32px_rgba(139,115,85,0.05)] border border-white/30">
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <p className="text-[10px] font-light text-[#B8A896] tracking-wide uppercase mb-2">Channel</p>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-[#C9A876]" />
                        <span className="text-sm font-light text-[#3a2f28]">WhatsApp</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-light text-[#B8A896] tracking-wide uppercase mb-2">Audience</p>
                      <p className="text-sm font-light text-[#3a2f28]">{selectedCampaign.audienceCount} members</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-light text-[#B8A896] tracking-wide uppercase mb-2">Status</p>
                      <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-light backdrop-blur-xl ${statusConfig[selectedCampaign.status].bg} ${statusConfig[selectedCampaign.status].text}`}>
                        {statusConfig[selectedCampaign.status].label}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-light text-[#B8A896] tracking-wide uppercase mb-2">
                        {selectedCampaign.scheduledTime ? 'Scheduled' : 'Sent'}
                      </p>
                      <p className="text-sm font-light text-[#3a2f28]">
                        {selectedCampaign.scheduledTime || selectedCampaign.sentDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                {selectedCampaign.status === 'completed' && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-[20px] backdrop-blur-2xl bg-white/30 p-6 text-center shadow-[0_6px_24px_rgba(139,115,85,0.05)] border border-white/20">
                      <div className="text-3xl font-serif text-[#3a2f28] mb-1">{selectedCampaign.metrics.sent}</div>
                      <div className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Messages Sent</div>
                    </div>
                    <div className="rounded-[20px] backdrop-blur-2xl bg-white/30 p-6 text-center shadow-[0_6px_24px_rgba(139,115,85,0.05)] border border-white/20">
                      <div className="text-3xl font-serif text-[#3a2f28] mb-1">{selectedCampaign.metrics.responses}</div>
                      <div className="text-xs uppercase tracking-wider text-[#8B7355] font-light flex items-center justify-center gap-1.5">
                        Responses
                        <span className="text-[#C9A876]">
                          ({Math.round((selectedCampaign.metrics.responses / selectedCampaign.metrics.sent) * 100)}%)
                        </span>
                      </div>
                    </div>
                    <div className="rounded-[20px] backdrop-blur-2xl bg-white/30 p-6 text-center shadow-[0_6px_24px_rgba(139,115,85,0.05)] border border-white/20">
                      <div className="text-3xl font-serif text-[#3a2f28] mb-1">{selectedCampaign.metrics.optOuts}</div>
                      <div className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Opt-outs</div>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button 
                  onClick={() => setShowDetails(false)}
                  className="w-full h-12 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-[1.02]"
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
