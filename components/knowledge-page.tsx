"use client"

import * as React from "react"
import { Search, Plus, Upload, FileText, Globe, AlertCircle, Edit, Copy, Archive, CheckCircle2, Clock, ChevronDown, MapPin, Phone, Mail, ExternalLink, MessageSquare, Calendar, TrendingUp, Users, Info, CircleDot, Workflow, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { BrandVoicePage } from "@/components/brand-voice-page"
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const knowledgeStats = [
  { id: "faqs", name: "FAQs", count: 24, coverage: 92, updated: "2d ago" },
  { id: "services", name: "Services & Menus", count: 18, coverage: 78, updated: "5d ago" },
  { id: "policies", name: "Policies", count: 12, coverage: 100, updated: "1w ago" },
  { id: "contacts", name: "Local Contacts", count: 32, coverage: 85, updated: "3d ago" },
  { id: "rooms", name: "Room Types", count: 6, coverage: 100, updated: "1w ago" },
  { id: "events", name: "Events & Experiences", count: 8, coverage: 65, updated: "4d ago" },
  { id: "hours", name: "Operating Hours", count: 5, coverage: 100, updated: "1d ago" },
]

const sources = [
  { id: "sheets", name: "Google Sheets", status: "synced", lastSync: "2 min ago" },
  { id: "pms", name: "PMS", status: "synced", lastSync: "12 min ago" },
  { id: "cms", name: "Website CMS", status: "syncing", lastSync: "now" },
  { id: "manual", name: "Manual", status: "synced", lastSync: "always" },
]

const knowledgeItems = [
  {
    id: 1,
    type: "FAQ",
    title: "What time is checkout?",
    answer: "Checkout time is 11:00 AM. We offer flexible departure arrangements upon request, subject to availability.",
    scope: "Global",
    languages: ["EN", "ES", "FR"],
    status: "Live",
    source: "Google Sheet",
    sourceStatus: "synced",
    updated: "2 days ago",
    triggers: ["checkout time", "late checkout", "check out", "departure"],
  },
  {
    id: 2,
    type: "FAQ",
    title: "Do you offer transportation services?",
    answer: "Yes, we arrange complimentary electric luxury transport for members. Conscious Transit, our partner, handles all guest transportation needs with zero-emission vehicles.",
    scope: "ATTACHAI Club",
    languages: ["EN", "ES"],
    status: "Live",
    source: "Manual",
    sourceStatus: "synced",
    updated: "1 week ago",
    triggers: ["transportation", "transfer", "car service", "airport"],
  },
  {
    id: 3,
    type: "Service",
    title: "Float Suite Sessions",
    answer: "Our Float Suite offers sensory isolation therapy in mineral-rich water. Sessions available daily from 9 AM to 8 PM. Advanced booking recommended for evening slots.",
    scope: "Global",
    languages: ["EN"],
    status: "Needs Review",
    source: "PMS",
    sourceStatus: "synced",
    updated: "3 days ago",
    triggers: ["float", "float suite", "sensory deprivation", "flotation therapy"],
  },
  {
    id: 4,
    type: "Policy",
    title: "Booking Changes",
    answer: "Reservations can be adjusted up to 48 hours before arrival for full flexibility. Changes within 48 hours are subject to availability and may incur adjustment fees.",
    scope: "Global",
    languages: ["EN", "ES", "FR"],
    status: "Live",
    source: "Website CMS",
    sourceStatus: "synced",
    updated: "1 month ago",
    triggers: ["cancellation", "cancel booking", "change reservation", "modify"],
  },
  {
    id: 10,
    type: "Operating Hours",
    title: "Check-in / Check-out Times",
    answer: "Arrival: 3:00 PM | Departure: 11:00 AM. Early arrival and late departure available upon request, subject to space availability.",
    scope: "Global",
    languages: ["EN", "ES", "FR"],
    status: "Live",
    source: "Manual",
    sourceStatus: "synced",
    updated: "1 day ago",
    triggers: ["check-in time", "check-out time", "arrival time", "departure time"],
  },
  {
    id: 11,
    type: "Operating Hours",
    title: "Guest Services Availability",
    answer: "Our team is available 24/7 to assist with all needs, from Nutritive Parlour reservations to Workroom bookings and local recommendations.",
    scope: "Global",
    languages: ["EN", "ES"],
    status: "Live",
    source: "Manual",
    sourceStatus: "synced",
    updated: "1 day ago",
    triggers: ["concierge hours", "guest services", "help available", "assistance"],
  },
  {
    id: 12,
    type: "Operating Hours",
    title: "Regeneration Floor Hours",
    answer: "The Regeneration Floor is open daily from 8:00 AM to 9:00 PM. Final sessions accepted at 8:00 PM. Advance booking ensures your preferred time.",
    scope: "Global",
    languages: ["EN"],
    status: "Live",
    source: "Manual",
    sourceStatus: "synced",
    updated: "1 day ago",
    triggers: ["regeneration floor", "wellness", "spa hours", "treatment hours"],
  },
  {
    id: 13,
    type: "Operating Hours",
    title: "Nutritive Parlour Dining",
    answer: "Morning nourishment: 7:00 AM - 11:00 AM | Midday: 12:00 PM - 3:00 PM | Evening: 6:00 PM - 10:00 PM. The space remains open for quiet conversation until midnight.",
    scope: "ATTACHAI Club",
    languages: ["EN", "ES"],
    status: "Live",
    source: "Manual",
    sourceStatus: "synced",
    updated: "1 day ago",
    triggers: ["restaurant hours", "dining times", "nutritive parlour", "meal times", "breakfast lunch dinner"],
  },
  {
    id: 14,
    type: "Platform Overview",
    title: "About This Platform",
    answer: "ATTACHAI is an AI-powered concierge platform designed for premium service environments. The system adapts seamlessly to hotels, members' clubs, wellness spaces, luxury concierges, and any business requiring intelligent guest communication.",
    scope: "System",
    languages: ["EN"],
    status: "Live",
    source: "Manual",
    sourceStatus: "synced",
    updated: "Today",
    triggers: ["attachai", "platform", "capabilities", "about"],
  },
]

interface LocalContact {
  id: number
  name: string
  category: string
  subCategory: string
  phone: string
  whatsapp?: string
  email: string
  website?: string
  mapsLink?: string
  openingHours: string
  internalRating: number
  reliabilityScore: number
  distance: string
  tags: string[]
  preferredContactPerson?: string
  relationshipNotes?: string
  vipNotes?: string
  specialRates?: string
  partnershipNotes?: string
  triggerKeywords: string[]
  recommendedActions: string[]
  messageTemplates: {
    booking?: string
    cancellation?: string
    confirmation?: string
  }
  preferredContactMethod: string
  integrations: {
    googleSheets?: boolean
    pms?: boolean
    api?: string
  }
  logs: {
    lastUsed?: string
    useFrequency: number
    outcomes?: string[]
    guestFeedback?: string[]
    conciergeNotes?: string[]
  }
}

const localContacts: LocalContact[] = [
  {
    id: 1,
    name: "Consciousness Kitchen",
    category: "Dining",
    subCategory: "Regenerative Dining",
    phone: "+1 (310) 555-0123",
    whatsapp: "+1 (310) 555-0123",
    email: "reservations@consciousnesskitchen.com",
    website: "https://consciousnesskitchen.com",
    mapsLink: "https://maps.google.com/?q=Consciousness+Kitchen",
    openingHours: "Lunch: 12-3 PM | Dinner: 6-10 PM",
    internalRating: 5,
    reliabilityScore: 98,
    distance: "0.3 mi",
    tags: ["Regenerative", "Plant-Based", "VIP", "Conscious Dining", "Partner"],
    preferredContactPerson: "Maya Chen - Experience Director",
    relationshipNotes: "Exceptional partnership. Deeply aligned with our values. Always accommodates member requests.",
    vipNotes: "Request the meditation alcove or rooftop garden for members. Mention ATTACHAI Club for priority seating and curator's menu.",
    specialRates: "15% courtesy for our members with code ATTACH2024. Complimentary regenerative aperitif for extended stays.",
    partnershipNotes: "Aligned partnership renewed June 2024. Values-based relationship.",
    triggerKeywords: ["regenerative dining", "plant-based", "conscious food", "meditation dining", "sustainable"],
    recommendedActions: ["Make Reservation", "Check Availability", "Request Curator's Menu"],
    messageTemplates: {
      booking: "Hello Maya, I'd like to arrange a table for {guestName} from ATTACHAI Club. Party of {count} for {date} at {time}. Quiet space preferred.",
      cancellation: "Hi Maya, need to adjust reservation for {guestName} on {date}. Thank you for understanding.",
      confirmation: "Confirming reservation for {guestName}, party of {count}, {date} at {time}. Guest will mention ATTACHAI Club."
    },
    preferredContactMethod: "WhatsApp",
    integrations: {
      googleSheets: true,
      pms: true,
      api: "Custom"
    },
    logs: {
      lastUsed: "2 hours ago",
      useFrequency: 47,
      outcomes: ["Seamless experience", "Values alignment", "Member appreciation"],
      guestFeedback: ["Transformative", "Deeply nourishing", "Perfect alignment"],
      conciergeNotes: ["Consistently excellent", "Shares our values", "Member favorite"]
    }
  },
  {
    id: 2,
    name: "Conscious Transit",
    category: "Transportation",
    subCategory: "Electric Luxury Service",
    phone: "+1 (310) 555-0456",
    whatsapp: "+1 (310) 555-0456",
    email: "service@conscioustransit.com",
    website: "https://conscioustransit.com",
    openingHours: "24/7 Available",
    internalRating: 5,
    reliabilityScore: 95,
    distance: "On-demand",
    tags: ["Transportation", "Electric", "24/7", "Zero-Emission", "Luxury"],
    preferredContactPerson: "David Rodriguez - Operations Lead",
    relationshipNotes: "Primary transport partner. Zero-emission fleet. Professional, mindful service.",
    vipNotes: "Request Tesla Model S Plaid or Mercedes EQS for members. All drivers trained in conscious service protocols.",
    specialRates: "20% courtesy on all arrangements. Complimentary airport coordination.",
    partnershipNotes: "Exclusive partnership. Values-aligned. Priority service.",
    triggerKeywords: ["car service", "transportation", "electric vehicle", "driver", "airport", "transfer"],
    recommendedActions: ["Arrange Transfer", "Check Fleet", "Request Quote"],
    messageTemplates: {
      booking: "Hi David, need {vehicleType} for {guestName} on {date} at {time}. Pickup: {location}. Destination: {destination}. ATTACHAI Club member.",
      cancellation: "David, adjusting transport for {guestName} on {date} at {time}. Thank you.",
      confirmation: "Confirming {vehicleType} for {guestName}, {date} at {time}. Driver to connect 15 min prior."
    },
    preferredContactMethod: "WhatsApp",
    integrations: {
      googleSheets: true,
      pms: false
    },
    logs: {
      lastUsed: "4 hours ago",
      useFrequency: 89,
      outcomes: ["Punctual service", "Professional excellence", "Seamless experience"],
      guestFeedback: ["Excellent drivers", "Pristine vehicles", "Mindful service"],
      conciergeNotes: ["Most reliable partner", "Values aligned", "Member favorite"]
    }
  },
  {
    id: 3,
    name: "Presence Wellness Collective",
    category: "Wellness",
    subCategory: "Holistic Therapy",
    phone: "+1 (310) 555-0789",
    email: "connect@presencewellness.com",
    website: "https://presencewellness.com",
    mapsLink: "https://maps.google.com/?q=Presence+Wellness",
    openingHours: "9 AM - 8 PM Daily",
    internalRating: 4,
    reliabilityScore: 88,
    distance: "0.7 mi",
    tags: ["Wellness", "Holistic", "Bodywork", "Energy Work", "Partner"],
    preferredContactPerson: "Sarah Johnson - Wellness Director",
    relationshipNotes: "Strong partnership. Accommodating with session adjustments.",
    specialRates: "10% courtesy for ATTACHAI Club members.",
    partnershipNotes: "Values-based partnership. Quarterly alignment meetings.",
    triggerKeywords: ["wellness", "bodywork", "holistic", "therapy", "healing"],
    recommendedActions: ["Book Session", "Check Availability", "Request Modalities"],
    messageTemplates: {
      booking: "Hello Sarah, arranging {treatment} for {guestName} on {date} at {time}. ATTACHAI Club member - courtesy pricing applies.",
      cancellation: "Hi Sarah, need to adjust {treatment} for {guestName} on {date}. Thank you for flexibility.",
      confirmation: "Confirming {treatment} for {guestName}, {date} at {time}. Member will arrive 15 min early for grounding."
    },
    preferredContactMethod: "Phone",
    integrations: {
      googleSheets: true
    },
    logs: {
      lastUsed: "1 day ago",
      useFrequency: 23,
      outcomes: ["Seamless booking", "Same-day flexibility"],
      guestFeedback: ["Transformative space", "Skilled practitioners"],
      conciergeNotes: ["Usually available", "Quality service"]
    }
  }
]

export function KnowledgePage() {
  const [expandedId, setExpandedId] = React.useState<number | null>(null)
  const [expandedContactId, setExpandedContactId] = React.useState<number | null>(null)
  const [filterType, setFilterType] = React.useState("all")
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [viewMode, setViewMode] = React.useState<"knowledge" | "contacts" | "brandVoice">("knowledge")
  const [contactCategory, setContactCategory] = React.useState("all")

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleContactToggle = (id: number) => {
    setExpandedContactId(expandedContactId === id ? null : id)
  }

  const filteredContacts = localContacts.filter(contact => {
    if (contactCategory === "all") return true
    return contact.category === contactCategory
  })

  const knowledgeStatsFiltered = knowledgeStats.filter(stat => stat.id !== "contacts")

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 xl:p-16 space-y-6 md:space-y-8 lg:space-y-10">
      <div className="max-w-[1320px] mx-auto">
        <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 lg:mb-12">
          <div className="space-y-2 md:space-y-3">
            <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase">
              AI KNOWLEDGE
            </h1>
            
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex-shrink-0">
                      <Info className="h-4 w-4 text-[#B8A896]" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    className="max-w-md p-5 rounded-[20px] backdrop-blur-3xl bg-white/95 border border-[#D8C8A8]/20 shadow-[0_16px_48px_rgba(139,115,85,0.15)]"
                  >
                    <div className="space-y-3">
                      <h4 className="font-serif text-sm font-medium text-[#6E5A4F] tracking-wide">Platform Capabilities</h4>
                      <p className="font-sans text-xs text-[#6B5E52] leading-relaxed">
                        ATTACHAI adapts to your unique environment, whether you operate a hotel, members' club, wellness space, luxury concierges, and any business requiring intelligent guest communication.
                      </p>
                      <p className="font-sans text-xs text-[#8B7355] leading-relaxed">
                        <strong className="text-[#6E5A4F]">Automatic configuration:</strong> During onboarding, the platform matches to your actual departments, services, and offerings.
                      </p>
                      <p className="font-sans text-[10px] text-[#8B7355] leading-relaxed italic pt-2 border-t border-[#D5C8BA]/20">
                        Example content shown represents platform flexibility across diverse service environments.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <p className="font-sans text-sm text-[#8B7355] leading-relaxed max-w-2xl">
              Manage information ATTACHAI uses to answer client questions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                onClick={() => setViewMode("knowledge")}
                variant={viewMode === "knowledge" ? "default" : "outline"}
                className={`h-8 md:h-10 lg:h-11 px-4 md:px-6 rounded-full font-serif text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-700 ${
                  viewMode === "knowledge"
                    ? "bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] text-[#6B5E52] shadow-[0_6px_20px_rgba(216,200,168,0.2)]"
                    : "bg-white/40 text-[#8B7355] hover:bg-white/60 border-white/60"
                }`}
              >
                Knowledge Base
              </Button>
              <Button
                onClick={() => setViewMode("contacts")}
                variant={viewMode === "contacts" ? "default" : "outline"}
                className={`h-8 md:h-10 lg:h-11 px-4 md:px-6 rounded-full font-serif text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-700 ${
                  viewMode === "contacts"
                    ? "bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] text-[#6B5E52] shadow-[0_6px_20px_rgba(216,200,168,0.2)]"
                    : "bg-white/40 text-[#8B7355] hover:bg-white/60 border-white/60"
                }`}
              >
                Local Contacts
              </Button>
              <Button
                onClick={() => setViewMode("brandVoice")}
                variant={viewMode === "brandVoice" ? "default" : "outline"}
                className={`h-8 md:h-10 lg:h-11 px-4 md:px-6 rounded-full font-serif text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-700 ${
                  viewMode === "brandVoice"
                    ? "bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] text-[#6B5E52] shadow-[0_6px_20px_rgba(216,200,168,0.2)]"
                    : "bg-white/40 text-[#8B7355] hover:bg-white/60 border-white/60"
                }`}
              >
                Brand Voice
              </Button>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <Button 
                variant="ghost" 
                className="h-8 md:h-10 lg:h-11 px-3 md:px-5 rounded-full font-serif text-[10px] md:text-xs font-normal uppercase tracking-widest text-[#8B7355] hover:text-[#6B5E52] hover:bg-[#E9E2D7]/50 transition-all duration-700"
              >
                <Upload className="mr-1.5 md:mr-2 h-3 md:h-3.5 w-3 md:w-3.5" />
                <span className="hidden sm:inline">Import</span>
              </Button>
              <Button className="h-8 md:h-10 lg:h-11 px-4 md:px-6 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] hover:from-[#D8C8A8]/90 hover:to-[#D5C8BA]/90 text-[#6B5E52] font-serif text-[10px] md:text-xs font-normal uppercase tracking-widest shadow-[0_8px_32px_rgba(216,200,168,0.25)] transition-all duration-700">
                <Plus className="mr-1.5 md:mr-2 h-3 md:h-3.5 w-3 md:w-3.5" />
                Add Item
              </Button>
            </div>
          </div>
        </div>

        {viewMode === "brandVoice" ? (
          <div className="max-w-[1320px] mx-auto">
            <BrandVoicePage />
          </div>
        ) : viewMode === "knowledge" ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 mb-8 md:mb-10">
              {knowledgeStatsFiltered.map((stat, idx) => (
                <div
                  key={stat.id}
                  className="p-4 md:p-5 rounded-[18px] md:rounded-[20px] lg:rounded-[22px] backdrop-blur-3xl bg-white/40 border border-white/60 shadow-[0_8px_32px_rgba(213,200,186,0.15)] hover:shadow-[0_12px_48px_rgba(213,200,186,0.25)] transition-all duration-900 animate-fadeSlideIn flex flex-col"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-wider text-[#B8A896]">{stat.name}</span>
                  </div>
                  <div className="font-serif text-xl md:text-2xl lg:text-3xl text-[#6B5E52] mb-3">{stat.count}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-1 bg-[#E9E2D7] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] rounded-full transition-all duration-1000"
                        style={{ width: `${stat.coverage}%` }}
                      />
                    </div>
                    <span className="font-sans text-[9px] md:text-[10px] text-[#B8A896] flex-shrink-0">{stat.coverage}%</span>
                  </div>
                  <p className="font-sans text-[9px] md:text-[10px] text-[#B8A896] mt-auto">Updated {stat.updated}</p>
                </div>
              ))}
            </div>

            <div className="mb-6 md:mb-8">
              {/* Desktop layout (≥1024px) */}
              <div className="hidden lg:flex lg:flex-col lg:gap-4">
                {/* Row 1: Knowledge sources + timestamp */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="font-sans text-xs text-[#6B5E52] whitespace-nowrap flex-shrink-0">Knowledge sources</span>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      {sources.map((source) => (
                        <div
                          key={source.id}
                          className="px-3 py-1.5 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30 flex items-center gap-2 group hover:bg-[#E9E2D7]/50 transition-all duration-700 shadow-[0_4px_16px_rgba(139,115,85,0.06)] whitespace-nowrap flex-shrink-0"
                        >
                          <span className="font-sans text-xs text-[#6B5E52]">{source.name}</span>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            source.status === 'synced' ? 'bg-[#8B9D83]' : 
                            source.status === 'syncing' ? 'bg-[#D8C8A8] animate-pulse' : 
                            'bg-[#C9A876]'
                          }`} />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-[#B8A896] whitespace-nowrap flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D8C8A8] animate-pulse" />
                    <span className="text-[10px]">Last re-indexed 12 min ago</span>
                  </div>
                </div>
                
                {/* Row 2: Search bar + filters */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B8A896]" />
                    <Input
                      placeholder="Search knowledge..."
                      className="h-11 pl-11 pr-4 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/30 font-sans text-sm text-[#6B5E52] placeholder:text-[#B8A896] shadow-[0_4px_16px_rgba(139,115,85,0.06)] focus-visible:ring-1 focus-visible:ring-[#D8C8A8]"
                    />
                  </div>
                  
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[140px] h-11 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/30 font-sans text-xs text-[#6B5E52] shadow-[0_4px_16px_rgba(139,115,85,0.06)] focus:ring-1 focus:ring-[#D8C8A8]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[20px]">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="FAQ">FAQ</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                      <SelectItem value="Policy">Policy</SelectItem>
                      <SelectItem value="Operating Hours">Operating Hours</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px] h-11 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/30 font-sans text-xs text-[#6B5E52] shadow-[0_4px_16px_rgba(139,115,85,0.06)] focus:ring-1 focus:ring-[#D8C8A8]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[20px]">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Live">Live</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Needs Review">Needs Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tablet layout (768-1023px) */}
              <div className="hidden md:flex lg:hidden flex-col gap-3">
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2 overflow-x-auto flex-1 min-w-0">
                    <span className="font-sans text-xs text-[#6B5E52] whitespace-nowrap flex-shrink-0">Knowledge sources</span>
                    
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {sources.map((source) => (
                        <div
                          key={source.id}
                          className="px-3 py-1.5 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30 flex items-center gap-2 group hover:bg-[#E9E2D7]/50 transition-all duration-700 shadow-[0_4px_16px_rgba(139,115,85,0.06)] whitespace-nowrap flex-shrink-0"
                        >
                          <span className="font-sans text-xs text-[#6B5E52]">{source.name}</span>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            source.status === 'synced' ? 'bg-[#8B9D83]' : 
                            source.status === 'syncing' ? 'bg-[#D8C8A8] animate-pulse' : 
                            'bg-[#C9A876]'
                          }`} />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-[#B8A896] whitespace-nowrap flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D8C8A8] animate-pulse" />
                    <span className="text-[10px]">12 min ago</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#B8A896]" />
                    <Input
                      placeholder="Search..."
                      className="h-10 pl-10 pr-3 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/30 font-sans text-sm text-[#6B5E52] placeholder:text-[#B8A896] shadow-[0_4px_16px_rgba(139,115,85,0.06)] w-full focus-visible:ring-1 focus-visible:ring-[#D8C8A8]"
                    />
                  </div>
                  
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[120px] h-10 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/30 font-sans text-xs text-[#6B5E52] shadow-[0_4px_16px_rgba(139,115,85,0.06)] flex-shrink-0 focus:ring-1 focus:ring-[#D8C8A8]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[20px]">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="FAQ">FAQ</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                      <SelectItem value="Policy">Policy</SelectItem>
                      <SelectItem value="Operating Hours">Operating Hours</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[120px] h-10 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/30 font-sans text-xs text-[#6B5E52] shadow-[0_4px_16px_rgba(139,115,85,0.06)] flex-shrink-0 focus:ring-1 focus:ring-[#D8C8A8]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[20px]">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Live">Live</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Needs Review">Needs Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mobile layout (≤767px) */}
              <div className="flex md:hidden flex-col gap-3">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="font-sans text-[10px] text-[#6B5E52] whitespace-nowrap flex-shrink-0">Sources</span>
                  
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    {sources.map((source) => (
                      <div
                        key={source.id}
                        className="px-2.5 py-1 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30 flex items-center gap-1.5 group hover:bg-[#E9E2D7]/50 transition-all duration-700 shadow-[0_4px_16px_rgba(139,115,85,0.06)] whitespace-nowrap flex-shrink-0"
                      >
                        <span className="font-sans text-[9px] text-[#6B5E52]">{source.name}</span>
                        <div className={`w-1 h-1 rounded-full ${
                          source.status === 'synced' ? 'bg-[#8B9D83]' : 
                          source.status === 'syncing' ? 'bg-[#D8C8A8] animate-pulse' : 
                          'bg-[#C9A876]'
                        }`} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#B8A896]">
                  <div className="w-1 h-1 rounded-full bg-[#D8C8A8] animate-pulse" />
                  <span className="text-[9px]">Last re-indexed 12 min ago</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[#B8A896]" />
                    <Input
                      placeholder="Search..."
                      className="h-9 pl-9 pr-3 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/30 font-sans text-xs text-[#6B5E52] placeholder:text-[#B8A896] shadow-[0_4px_16px_rgba(139,115,85,0.06)] w-full focus-visible:ring-1 focus-visible:ring-[#D8C8A8]"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="flex-1 h-9 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/30 font-sans text-[10px] text-[#6B5E52] shadow-[0_4px_16px_rgba(139,115,85,0.06)] focus:ring-1 focus:ring-[#D8C8A8]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-[20px]">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="FAQ">FAQ</SelectItem>
                        <SelectItem value="Service">Service</SelectItem>
                        <SelectItem value="Policy">Policy</SelectItem>
                        <SelectItem value="Operating Hours">Operating Hours</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="flex-1 h-9 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/30 font-sans text-[10px] text-[#6B5E52] shadow-[0_4px_16px_rgba(139,115,85,0.06)] focus:ring-1 focus:ring-[#D8C8A8]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="rounded-[20px]">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Live">Live</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Needs Review">Needs Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              {knowledgeItems.map((item, idx) => {
                const isExpanded = expandedId === item.id
                
                return (
                  <div
                    key={item.id}
                    className={`relative rounded-xl md:rounded-[22px] backdrop-blur-3xl border-0 cursor-pointer transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] animate-fadeSlideIn overflow-hidden ${
                      isExpanded
                        ? 'bg-white/50 shadow-[0_12px_40px_rgba(139,115,85,0.08)] md:shadow-[0_16px_56px_rgba(139,115,85,0.1),0_0_0_1px_rgba(216,200,168,0.15),inset_0_2px_4px_rgba(216,200,168,0.12)]'
                        : 'bg-white/40 shadow-[0_8px_24px_rgba(139,115,85,0.04),inset_0_1px_1px_rgba(255,255,255,0.5)] md:shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(139,115,85,0.08)] md:hover:shadow-[0_16px_56px_rgba(139,115,85,0.1),0_0_0_1px_rgba(216,200,168,0.15),inset_0_2px_4px_rgba(216,200,168,0.12)] hover:-translate-y-0.5'
                    }`}
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 md:w-1 rounded-l-xl md:rounded-l-[22px] bg-gradient-to-b from-[#C9A876]/60 to-[#C9A876]/20" />
                    
                    <div
                      onClick={() => handleToggle(item.id)}
                      className="p-3 md:p-5"
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 backdrop-blur-xl flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/40">
                          <FileText className="h-4 w-4 text-[#8B7355]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge className="px-2 py-0.5 rounded-full bg-[#E9E2D7]/60 text-[#7A6A5D] font-sans text-[9px] md:text-[10px] uppercase tracking-wider border-0">
                              {item.type}
                            </Badge>
                            <Badge className="px-2 py-0.5 rounded-full bg-[#E9E2D7]/60 text-[#7A6A5D] font-sans text-[9px] md:text-[10px] border-0">
                              {item.scope}
                            </Badge>
                            {item.languages.map((lang) => (
                              <Badge key={lang} className="px-2 py-0.5 rounded-full bg-[#F7F4EF]/60 text-[#B8A896] font-sans text-[8px] md:text-[9px] border-0">
                                {lang}
                              </Badge>
                            ))}
                            {item.status === 'Needs Review' && (
                              <Badge className="px-2 py-0.5 rounded-full bg-[#D8C8A8]/30 text-[#C9A876] font-sans text-[9px] md:text-[10px] border-0 flex items-center gap-1">
                                <AlertCircle className="h-2.5 w-2.5" />
                                <span className="hidden sm:inline">Needs attention</span>
                              </Badge>
                            )}
                          </div>
                          <h4 className="text-sm md:text-sm font-serif font-normal text-[#3a2f28] uppercase mb-1 md:mb-1 leading-snug max-w-3xl">{item.title}</h4>
                          {!isExpanded && (
                            <p className="text-xs md:text-sm font-normal text-[#7A6A5D] leading-relaxed line-clamp-2 mb-3 max-w-3xl">{item.answer}</p>
                          )}
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${item.sourceStatus === 'synced' ? 'bg-[#8B9D83]' : 'bg-[#D8C8A8] animate-pulse'}`} />
                              <span className="font-sans text-[10px] md:text-xs font-normal text-[#B8A896]">{item.source}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] md:text-xs font-normal text-[#B8A896] tracking-wide">Updated {item.updated}</span>
                              <ChevronDown 
                                className={`h-4 w-4 text-[#B8A896] transition-transform duration-700 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`transition-all duration-900 ease-out ${
                        isExpanded 
                          ? 'max-h-[1000px] opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-3 md:p-4 lg:p-5 pt-0 border-t border-[#D5C8BA]/20 mt-3 md:mt-4">
                        <Tabs defaultValue="content" className="w-full mt-3 md:mt-6">
                          <TabsList className="w-full justify-start mb-3 md:mb-6 bg-[#E9E2D7]/30 p-1 rounded-full">
                            <TabsTrigger value="content" className="rounded-full font-sans text-xs data-[state=active]:bg-white/80 data-[state=active]:text-[#6B5E52] data-[state=active]:shadow-sm">
                              Content
                            </TabsTrigger>
                            <TabsTrigger value="triggers" className="rounded-full font-sans text-xs data-[state=active]:bg-white/80 data-[state=active]:text-[#6B5E52] data-[state=active]:shadow-sm">
                              Triggers
                            </TabsTrigger>
                            <TabsTrigger value="integrations" className="rounded-full font-sans text-xs data-[state=active]:bg-white/80 data-[state=active]:text-[#6B5E52] data-[state=active]:shadow-sm">
                              Integrations
                            </TabsTrigger>
                            <TabsTrigger value="history" className="rounded-full font-sans text-xs data-[state=active]:bg-white/80 data-[state=active]:text-[#6B5E52] data-[state=active]:shadow-sm">
                              History
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="content" className="space-y-4 md:space-y-6">
                            <div>
                              <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Answer</h4>
                              <p className="font-sans text-xs md:text-sm text-[#6B5E52] leading-relaxed">{item.answer}</p>
                            </div>
                            <div>
                              <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Languages</h4>
                              <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {item.languages.map((lang) => (
                                  <Badge key={lang} className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-[#E9E2D7]/60 text-[#6B5E52] font-sans text-xs border-0">
                                    <Globe className="mr-1 h-3 w-3" />
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="triggers" className="space-y-3 md:space-y-4">
                            <div>
                              <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Activation Keywords</h4>
                              <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {item.triggers.map((trigger) => (
                                  <Badge key={trigger} className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-[#E9E2D7]/60 text-[#6B5E52] font-sans text-xs border-0">
                                    {trigger}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="integrations" className="space-y-3 md:space-y-4">
                            <div>
                              <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Connected Systems</h4>
                              <div className="p-3 md:p-4 rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30">
                                <div className="flex items-center justify-between mb-1.5 md:mb-2">
                                  <span className="font-sans text-sm text-[#6B5E52]">{item.source}</span>
                                  <CheckCircle2 className="h-3.5 md:h-4 w-3.5 md:w-4 text-[#8B9D83]" />
                                </div>
                                <p className="font-sans text-[9px] md:text-[10px] text-[#B8A896]">Last sync: {item.updated}</p>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="history" className="space-y-2 md:space-y-3">
                            <div className="p-3 md:p-4 rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30">
                              <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                                <Clock className="h-3.5 md:h-4 w-3.5 md:w-4 text-[#D8C8A8]" />
                                <span className="font-sans text-sm text-[#6B5E52]">Updated {item.updated}</span>
                              </div>
                              <p className="font-sans text-xs text-[#B8A896]">Last modified by AI</p>
                            </div>
                          </TabsContent>
                        </Tabs>

                        <div className="flex items-center gap-2 md:gap-3 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#D5C8BA]/20">
                          <Button className="flex-1 h-10 md:h-11 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] hover:from-[#D8C8A8]/90 hover:to-[#D5C8BA]/90 text-[#6B5E52] font-sans text-xs shadow-[0_8px_24px_rgba(216,200,168,0.25)] transition-all duration-700">
                            <Edit className="mr-1.5 md:mr-2 h-3 md:h-3.5 w-3 md:w-3.5" />
                            Edit
                          </Button>
                          <Button variant="ghost" className="h-10 md:h-11 px-3 md:px-4 rounded-full font-sans text-xs text-[#8B7355] hover:text-[#6B5E52] hover:bg-[#E9E2D7]/50 transition-all duration-700">
                            <Copy className="mr-1.5 md:mr-2 h-3 md:h-3.5 w-3 md:w-3.5" />
                            Duplicate
                          </Button>
                          <Button variant="ghost" className="h-10 md:h-11 px-3 md:px-4 rounded-full font-sans text-xs text-[#8B7355] hover:text-[#6B5E52] hover:bg-[#E9E2D7]/50 transition-all duration-700">
                            <Archive className="h-3 md:h-3.5 w-3 md:w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <>
            <div className="p-3 md:p-4 lg:p-5 rounded-xl md:rounded-[18px] lg:rounded-[22px] backdrop-blur-3xl bg-white/40 border border-white/60 shadow-[0_8px_32px_rgba(213,200,186,0.15)] mb-4 md:mb-10">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-3.5 md:h-4 w-3.5 md:w-4 text-[#B8A896]" />
                  <Input
                    placeholder="Search contacts by name, category, or tag..."
                    className="h-9 md:h-11 pl-9 md:pl-11 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border-0 font-sans text-xs md:text-sm text-[#6B5E52] placeholder:text-[#B8A896] focus-visible:ring-1 focus-visible:ring-[#D8C8A8]"
                  />
                </div>
                <Select value={contactCategory} onValueChange={setContactCategory}>
                  <SelectTrigger className="w-full sm:w-[140px] md:w-[160px] h-9 md:h-11 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border-0 font-sans text-[10px] md:text-xs text-[#6B5E52] focus:ring-1 focus:ring-[#D8C8A8]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[20px] backdrop-blur-2xl bg-white/95 border-[#D5C8BA]/30">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Dining">Dining</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Wellness">Wellness</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              {filteredContacts.map((contact, idx) => {
                const isExpanded = expandedContactId === contact.id
                
                return (
                  <div
                    key={contact.id}
                    className={`relative rounded-xl md:rounded-[22px] backdrop-blur-3xl border-0 cursor-pointer transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] animate-fadeSlideIn overflow-hidden ${
                      isExpanded
                        ? 'bg-white/50 shadow-[0_12px_40px_rgba(139,115,85,0.08)] md:shadow-[0_16px_56px_rgba(139,115,85,0.1),0_0_0_1px_rgba(216,200,168,0.15),inset_0_2px_4px_rgba(216,200,168,0.12)]'
                        : 'bg-white/40 shadow-[0_8px_24px_rgba(139,115,85,0.04),inset_0_1px_1px_rgba(255,255,255,0.5)] md:shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:bg-white/50 hover:shadow-[0_12px_40px_rgba(139,115,85,0.08)] md:hover:shadow-[0_16px_56px_rgba(139,115,85,0.1),0_0_0_1px_rgba(216,200,168,0.15),inset_0_2px_4px_rgba(216,200,168,0.12)] hover:-translate-y-0.5'
                    }`}
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 md:w-1 rounded-l-xl md:rounded-l-[22px] bg-gradient-to-b from-[#C9A876]/60 to-[#C9A876]/20" />
                    
                    <div
                      onClick={() => handleContactToggle(contact.id)}
                      className="p-3 md:p-5"
                    >
                      <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
                        <div className="flex-shrink-0 w-8 md:w-9 lg:w-10 h-8 md:h-9 lg:h-10 rounded-full bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 backdrop-blur-xl flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/40">
                          {contact.category === "Dining" && <FileText className="h-3 md:h-3.5 lg:h-4 w-3 md:w-3.5 lg:w-4 text-[#8B7355]" />}
                          {contact.category === "Transportation" && <MapPin className="h-3 md:h-3.5 lg:h-4 w-3 md:w-3.5 lg:w-4 text-[#8B7355]" />}
                          {contact.category === "Wellness" && <Heart className="h-3 md:h-3.5 lg:h-4 w-3 md:w-3.5 lg:w-4 text-[#8B7355]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1 md:mb-2 flex-wrap">
                            <div>
                              <h4 className="text-xs md:text-sm font-serif font-normal text-[#3a2f28] uppercase mb-0.5 md:mb-1">{contact.name}</h4>
                              <p className="text-[9px] md:text-xs font-normal text-[#7A6A5D]">{contact.subCategory}</p>
                            </div>
                            <div className="flex items-center gap-1.5 md:gap-2">
                              <div className="flex items-center gap-0.5 md:gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full bg-[#E9E2D7]/60">
                                <CircleDot className="h-2 md:h-3 w-2 md:h-3 text-[#D8C8A8]" />
                                <span className="text-[9px] md:text-xs font-normal text-[#6E5A4F]">{contact.internalRating}</span>
                              </div>
                              <Badge className="px-1.5 md:px-2 py-0.5 rounded-full bg-[#8B9D83]/20 text-[#8B9D83] font-sans text-[8px] md:text-[9px] border-0">
                                {contact.reliabilityScore}% reliable
                              </Badge>
                            </div>
                          </div>

                          {!isExpanded && (
                            <div className="space-y-2 md:space-y-3">
                              <div className="flex flex-wrap items-center gap-1 md:gap-2">
                                {contact.tags.slice(0, 4).map((tag) => (
                                  <Badge key={tag} className="px-1.5 md:px-2 py-0.5 rounded-full bg-[#E9E2D7]/60 text-[#7A6A5D] font-sans text-[8px] md:text-[9px] border-0">
                                    {tag}
                                  </Badge>
                                ))}
                                {contact.tags.length > 4 && (
                                  <Badge className="px-1.5 md:px-2 py-0.5 rounded-full bg-[#E9E2D7]/60 text-[#7A6A5D] font-sans text-[8px] md:text-[9px] border-0">
                                    +{contact.tags.length - 4}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[9px] md:text-xs font-normal text-[#B8A896]">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{contact.distance}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  <span>{contact.phone}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" />
                                  <span>Used {contact.logs.useFrequency}x</span>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-2 md:mt-4 flex-wrap gap-1">
                            <div className="flex items-center gap-1 md:gap-2">
                              <Badge className="px-1.5 md:px-2 py-0.5 rounded-full bg-[#F7F4EF]/60 text-[#7A6A5D] font-sans text-[8px] md:text-[9px] uppercase tracking-wider border-0">
                                {contact.category}
                              </Badge>
                              <span className="text-[9px] md:text-[10px] font-normal text-[#B8A896]">Last used {contact.logs.lastUsed}</span>
                            </div>
                            <ChevronDown 
                              className={`h-3 md:h-4 w-3 md:w-4 text-[#B8A896] transition-transform duration-700 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`transition-all duration-900 ease-out ${
                        isExpanded 
                          ? 'max-h-[2000px] opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-3 md:p-4 lg:p-5 pt-0 border-t border-[#D5C8BA]/20 mt-3 md:mt-4">
                        <Tabs defaultValue="overview" className="w-full mt-3 md:mt-6">
                          <TabsList className="w-full justify-start mb-3 md:mb-6 bg-[#E9E2D7]/30 p-1 rounded-full">
                            <TabsTrigger value="overview" className="rounded-full font-sans text-xs data-[state=active]:bg-white/80 data-[state=active]:text-[#6B5E52] data-[state=active]:shadow-sm">
                              Overview
                            </TabsTrigger>
                            <TabsTrigger value="templates" className="rounded-full font-sans text-xs data-[state=active]:bg-white/80 data-[state=active]:text-[#6B5E52] data-[state=active]:shadow-sm">
                              Templates
                            </TabsTrigger>
                            <TabsTrigger value="automations" className="rounded-full font-sans text-xs data-[state=active]:bg-white/80 data-[state=active]:text-[#6B5E52] data-[state=active]:shadow-sm">
                              Automations
                            </TabsTrigger>
                            <TabsTrigger value="history" className="rounded-full font-sans text-xs data-[state=active]:bg-white/80 data-[state=active]:text-[#6B5E52] data-[state=active]:shadow-sm">
                              History
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="overview" className="space-y-4 md:space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                              <div>
                                <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Contact Details</h4>
                                <div className="space-y-2 md:space-y-3 p-3 md:p-4 rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30">
                                  <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                                    <Phone className="h-3.5 md:h-4 w-3.5 md:w-4 text-[#D8C8A8]" />
                                    <span className="text-[#6B5E52]">{contact.phone}</span>
                                  </div>
                                  {contact.whatsapp && (
                                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                                      <MessageSquare className="h-3.5 md:h-4 w-3.5 md:w-4 text-[#D8C8A8]" />
                                      <span className="text-[#6B5E52]">{contact.whatsapp}</span>
                                      <Badge className="px-1.5 md:px-2 py-0.5 rounded-full bg-[#8B9D83]/20 text-[#8B9D83] font-sans text-[7px] md:text-[8px] border-0">
                                        Preferred
                                      </Badge>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                                    <Mail className="h-3.5 md:h-4 w-3.5 md:w-4 text-[#D8C8A8]" />
                                    <span className="text-[#6B5E52]">{contact.email}</span>
                                  </div>
                                  {contact.website && (
                                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                                      <Globe className="h-3.5 md:h-4 w-3.5 md:w-4 text-[#D8C8A8]" />
                                      <a href={contact.website} className="text-[#D8C8A8] hover:text-[#C9A876] transition-colors">
                                        Website
                                      </a>
                                      <ExternalLink className="h-3 w-3" />
                                    </div>
                                  )}
                                  {contact.mapsLink && (
                                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                                      <MapPin className="h-3.5 md:h-4 w-3.5 md:w-4 text-[#D8C8A8]" />
                                      <a href={contact.mapsLink} className="text-[#D8C8A8] hover:text-[#C9A876] transition-colors">
                                        View on Maps
                                      </a>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm pt-1.5 md:pt-2 border-t border-[#D5C8BA]/20">
                                    <Calendar className="h-3.5 md:h-4 w-3.5 md:w-4 text-[#D8C8A8]" />
                                    <span className="text-[#6B5E52]">{contact.openingHours}</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Relationship</h4>
                                <div className="space-y-2 md:space-y-3 p-3 md:p-4 rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30">
                                  {contact.preferredContactPerson && (
                                    <div>
                                      <p className="font-sans text-[9px] md:text-[10px] text-[#B8A896] mb-0.5 md:mb-1">Contact Person</p>
                                      <p className="font-sans text-xs md:text-sm text-[#6B5E52]">{contact.preferredContactPerson}</p>
                                    </div>
                                  )}
                                  {contact.relationshipNotes && (
                                    <div>
                                      <p className="font-sans text-[9px] md:text-[10px] text-[#B8A896] mb-0.5 md:mb-1">Notes</p>
                                      <p className="font-sans text-[10px] md:text-xs text-[#6B5E52] leading-relaxed">{contact.relationshipNotes}</p>
                                    </div>
                                  )}
                                  {contact.specialRates && (
                                    <div className="pt-1.5 md:pt-2 border-t border-[#D5C8BA]/20">
                                      <p className="font-sans text-[9px] md:text-[10px] text-[#B8A896] mb-0.5 md:mb-1">Special Rates</p>
                                      <p className="font-sans text-[10px] md:text-xs text-[#6B5E52] leading-relaxed">{contact.specialRates}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {contact.vipNotes && (
                              <div>
                                <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">VIP Notes</h4>
                                <div className="p-3 md:p-4 rounded-[18px] backdrop-blur-xl bg-gradient-to-br from-[#D8C8A8]/10 to-[#D5C8BA]/10 border border-[#D8C8A8]/30">
                                  <p className="font-sans text-xs md:text-sm text-[#6B5E52] leading-relaxed">{contact.vipNotes}</p>
                                </div>
                              </div>
                            )}

                            <div>
                              <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Integrations</h4>
                              <div className="flex flex-wrap gap-1.5 md:gap-3">
                                {contact.integrations.googleSheets && (
                                  <div className="px-2.5 md:px-4 py-1 md:py-2 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30 flex items-center gap-1.5 md:gap-2">
                                    <CheckCircle2 className="h-3 md:h-3.5 w-3 md:w-3.5 text-[#8B9D83]" />
                                    <span className="font-sans text-[9px] md:text-xs text-[#6B5E52]">Google Sheets</span>
                                  </div>
                                )}
                                {contact.integrations.pms && (
                                  <div className="px-2.5 md:px-4 py-1 md:py-2 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30 flex items-center gap-1.5 md:gap-2">
                                    <CheckCircle2 className="h-3 md:h-3.5 w-3 md:w-3.5 text-[#8B9D83]" />
                                    <span className="font-sans text-[9px] md:text-xs text-[#6B5E52]">PMS</span>
                                  </div>
                                )}
                                {contact.integrations.api && (
                                  <div className="px-2.5 md:px-4 py-1 md:py-2 rounded-full backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30 flex items-center gap-1.5 md:gap-2">
                                    <CheckCircle2 className="h-3 md:h-3.5 w-3 md:w-3.5 text-[#8B9D83]" />
                                    <span className="font-sans text-[9px] md:text-xs text-[#6B5E52]">{contact.integrations.api}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="templates" className="space-y-4 md:space-y-6">
                            {contact.messageTemplates.booking && (
                              <div>
                                <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Booking Template</h4>
                                <Textarea
                                  value={contact.messageTemplates.booking}
                                  readOnly
                                  className="min-h-[100px] rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/30 font-sans text-xs md:text-sm text-[#6B5E52] resize-none focus-visible:ring-1 focus-visible:ring-[#D8C8A8]"
                                />
                                <p className="font-sans text-[9px] md:text-[10px] text-[#B8A896] mt-1 md:mt-2">
                                  Use {"{guestName}"}, {"{count}"}, {"{date}"}, {"{time}"} as variables
                                </p>
                              </div>
                            )}
                            {contact.messageTemplates.cancellation && (
                              <div>
                                <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Cancellation Template</h4>
                                <Textarea
                                  value={contact.messageTemplates.cancellation}
                                  readOnly
                                  className="min-h-[80px] rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/30 font-sans text-xs md:text-sm text-[#6B5E52] resize-none focus-visible:ring-1 focus-visible:ring-[#D8C8A8]"
                                />
                              </div>
                            )}
                            {contact.messageTemplates.confirmation && (
                              <div>
                                <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Confirmation Template</h4>
                                <Textarea
                                  value={contact.messageTemplates.confirmation}
                                  readOnly
                                  className="min-h-[80px] rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border-[#D5C8BA]/30 font-sans text-xs md:text-sm text-[#6B5E52] resize-none focus-visible:ring-1 focus-visible:ring-[#D8C8A8]"
                                />
                              </div>
                            )}
                          </TabsContent>

                          <TabsContent value="automations" className="space-y-4 md:space-y-6">
                            <div>
                              <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Trigger Keywords</h4>
                              <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {contact.triggerKeywords.map((keyword) => (
                                  <Badge key={keyword} className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-[#E9E2D7]/60 text-[#6B5E52] font-sans text-xs border-0">
                                    <Workflow className="mr-1 h-3 w-3 text-[#D8C8A8]" strokeWidth={1.25} />
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Recommended Actions</h4>
                              <div className="space-y-1.5 md:space-y-2">
                                {contact.recommendedActions.map((action, idx) => (
                                  <div key={idx} className="p-2 md:p-3 rounded-[16px] backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30 flex items-center gap-2 md:gap-3">
                                    <div className="w-5 md:w-6 h-5 md:h-6 rounded-full bg-gradient-to-br from-[#D8C8A8]/30 to-[#D5C8BA]/30 flex items-center justify-center">
                                      <span className="font-sans text-[10px] md:text-xs text-[#6B5E52]">{idx + 1}</span>
                                    </div>
                                    <span className="font-sans text-xs md:text-sm text-[#6B5E52]">{action}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Preferred Contact Method</h4>
                              <Badge className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-[#D8C8A8]/20 to-[#D5C8BA]/20 text-[#6B5E52] font-sans text-xs md:text-sm border-0">
                                {contact.preferredContactMethod}
                              </Badge>
                            </div>
                          </TabsContent>

                          <TabsContent value="history" className="space-y-4 md:space-y-6">
                            <div className="grid grid-cols-3 gap-2 md:gap-4">
                              <div className="p-3 md:p-4 rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30 text-center">
                                <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-wider text-[#B8A896] mb-1 md:mb-2">Total Uses</p>
                                <p className="font-serif text-lg md:text-xl lg:text-2xl text-[#6B5E52]">{contact.logs.useFrequency}</p>
                              </div>
                              <div className="p-3 md:p-4 rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30 text-center">
                                <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-wider text-[#B8A896] mb-1 md:mb-2">Reliability</p>
                                <p className="font-serif text-lg md:text-xl lg:text-2xl text-[#6B5E52]">{contact.reliabilityScore}%</p>
                              </div>
                              <div className="p-3 md:p-4 rounded-[18px] backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30 text-center">
                                <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-wider text-[#B8A896] mb-1 md:mb-2">Last Used</p>
                                <p className="font-sans text-xs md:text-sm text-[#6B5E52]">{contact.logs.lastUsed}</p>
                              </div>
                            </div>
                            
                            {contact.logs.outcomes && contact.logs.outcomes.length > 0 && (
                              <div>
                                <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Recent Outcomes</h4>
                                <div className="space-y-1.5 md:space-y-2">
                                  {contact.logs.outcomes.map((outcome, idx) => (
                                    <div key={idx} className="p-2 md:p-3 rounded-[16px] backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30">
                                      <p className="font-sans text-xs md:text-sm text-[#6B5E52]">{outcome}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {contact.logs.guestFeedback && contact.logs.guestFeedback.length > 0 && (
                              <div>
                                <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Guest Feedback</h4>
                                <div className="space-y-1.5 md:space-y-2">
                                  {contact.logs.guestFeedback.map((feedback, idx) => (
                                    <div key={idx} className="p-2 md:p-3 rounded-[16px] backdrop-blur-xl bg-gradient-to-br from-[#D8C8A8]/10 to-[#D5C8BA]/10 border border-[#D8C8A8]/30">
                                      <p className="font-sans text-xs md:text-sm text-[#6B5E52] italic">"{feedback}"</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {contact.logs.conciergeNotes && contact.logs.conciergeNotes.length > 0 && (
                              <div>
                                <h4 className="font-sans text-xs uppercase tracking-wider text-[#8B7355] mb-2 md:mb-3">Concierge Notes</h4>
                                <div className="space-y-1.5 md:space-y-2">
                                  {contact.logs.conciergeNotes.map((note, idx) => (
                                    <div key={idx} className="p-2 md:p-3 rounded-[16px] backdrop-blur-xl bg-[#F7F4EF]/50 border border-[#D5C8BA]/30">
                                      <p className="font-sans text-xs md:text-sm text-[#6B5E52]">{note}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </TabsContent>
                        </Tabs>

                        <div className="flex items-center gap-2 md:gap-3 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#D5C8BA]/20">
                          <Button className="flex-1 h-10 md:h-11 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] hover:from-[#D8C8A8]/90 hover:to-[#D5C8BA]/90 text-[#6B5E52] font-sans text-xs shadow-[0_8px_24px_rgba(216,200,168,0.25)] transition-all duration-700">
                            <Edit className="mr-1.5 md:mr-2 h-3 md:h-3.5 w-3 md:w-3.5" />
                            Edit Contact
                          </Button>
                          <Button variant="ghost" className="h-10 md:h-11 px-3 md:px-4 rounded-full font-sans text-xs text-[#8B7355] hover:text-[#6B5E52] hover:bg-[#E9E2D7]/50 transition-all duration-700">
                            <Copy className="mr-1.5 md:mr-2 h-3 md:h-3.5 w-3 md:w-3.5" />
                            Duplicate
                          </Button>
                          <Button variant="ghost" className="h-10 md:h-11 px-3 md:px-4 rounded-full font-sans text-xs text-[#8B7355] hover:text-[#6B5E52] hover:bg-[#E9E2D7]/50 transition-all duration-700">
                            <Archive className="h-3 md:h-3.5 w-3 md:w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
