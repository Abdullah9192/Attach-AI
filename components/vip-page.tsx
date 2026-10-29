"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, MessageSquare, ChevronRight, Clock, Users, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface VIPContact {
  id: string
  name: string
  initials: string
  phone: string
  email: string
  role: "Guest" | "Member" | "Client"
  tags: string[]
  status: "In-house" | "Upcoming" | "Past"
  tier: "Gold" | "Platinum" | "VVIP"
  property: string
  lastInteraction: string
  lastInteractionMs: number
  preferences: string[]
  conversationId: string
  recentStays?: Array<{
    property: string
    dates: string
    status: "current" | "upcoming" | "past"
  }>
  openRequests?: Array<{
    id: string
    description: string
    timestamp: string
    status: "open" | "in-progress" | "resolved"
  }>
  notes?: string
}

const vipContacts: VIPContact[] = [
  {
    id: "VIP-001",
    name: "Sarah Chen",
    initials: "SC",
    phone: "+1 (424) 555-0104",
    email: "sarah.chen@email.com",
    role: "Guest",
    tags: ["Float Suite", "Repeat", "High-value"],
    status: "In-house",
    tier: "Platinum",
    property: "ATTACHAI Sanctuary",
    lastInteraction: "6m ago",
    lastInteractionMs: Date.now() - 6 * 60 * 1000,
    preferences: ["Early morning sessions", "Extended silence time", "Plant-based dining"],
    conversationId: "sarah-chen-conv",
    recentStays: [
      { property: "ATTACHAI Sanctuary", dates: "Dec 14-18", status: "current" },
      { property: "ATTACHAI Sanctuary", dates: "Nov 2-5", status: "past" },
    ],
    openRequests: [
      { id: "REQ-1", description: "Extended float session tomorrow", timestamp: "6m ago", status: "open" },
    ],
    notes: "Prefers minimal conversation during treatments. Anniversary stay - arrange special amenity.",
  },
  {
    id: "VIP-002",
    name: "Michael Roberts",
    initials: "MR",
    phone: "+1 (310) 555-0892",
    email: "michael.r@email.com",
    role: "Guest",
    tags: ["Workroom", "Regenerative Dining", "Business traveler"],
    status: "Upcoming",
    tier: "Gold",
    property: "ATTACHAI Sanctuary",
    lastInteraction: "14m ago",
    lastInteractionMs: Date.now() - 14 * 60 * 1000,
    preferences: ["Private chef consultations", "Quiet workspace", "Late checkout"],
    conversationId: "michael-roberts-conv",
    recentStays: [{ property: "ATTACHAI Sanctuary", dates: "Tonight 6PM", status: "upcoming" }],
    openRequests: [
      { id: "REQ-2", description: "Tesla Model S for airport transfer", timestamp: "14m ago", status: "in-progress" },
    ],
    notes: "Requires Tesla Model S for airport transfer. Prefers workspace setup before arrival.",
  },
  {
    id: "VIP-003",
    name: "Julia Davis",
    initials: "JD",
    phone: "+1 (213) 555-4521",
    email: "julia.davis@email.com",
    role: "Member",
    tags: ["Founder Member", "Neural Programming", "Long-term"],
    status: "In-house",
    tier: "VVIP",
    property: "ATTACHAI Sanctuary",
    lastInteraction: "24m ago",
    lastInteractionMs: Date.now() - 24 * 60 * 1000,
    preferences: ["Neural programming", "Privacy protocols", "Extended stays"],
    conversationId: "julia-davis-conv",
    recentStays: [{ property: "ATTACHAI Sanctuary", dates: "Dec 12-20", status: "current" }],
    openRequests: [],
    notes: "Founding member - white glove service. Anniversary of first stay - prepare special recognition.",
  },
  {
    id: "VIP-004",
    name: "David Kim",
    initials: "DK",
    phone: "+1 (323) 555-6103",
    email: "david.kim@email.com",
    role: "Guest",
    tags: ["High-value", "International", "Wellness focused"],
    status: "In-house",
    tier: "Platinum",
    property: "ATTACHAI Sanctuary",
    lastInteraction: "44m ago",
    lastInteractionMs: Date.now() - 44 * 60 * 1000,
    preferences: ["Bilingual service (EN/KR)", "Premium treatments", "Conscious events"],
    conversationId: "david-kim-conv",
    recentStays: [{ property: "ATTACHAI Sanctuary", dates: "Dec 13-16", status: "current" }],
    openRequests: [
      { id: "REQ-3", description: "Conscious living workshop registration", timestamp: "44m ago", status: "open" },
    ],
    notes: "Prefers communication in both English and Korean. VIP from Seoul - arrange cultural considerations.",
  },
]

export function VIPPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [propertyFilter, setPropertyFilter] = React.useState<string>("all")
  const [tierFilter, setTierFilter] = React.useState<string>("all")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [selectedGuest, setSelectedGuest] = React.useState<VIPContact | null>(null)
  const [showGuestDrawer, setShowGuestDrawer] = React.useState(false)

  const filteredContacts = vipContacts.filter((contact) => {
    const matchesSearch =
      searchQuery === "" ||
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      contact.property.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesProperty = propertyFilter === "all" || contact.property === propertyFilter
    const matchesTier = tierFilter === "all" || contact.tier === tierFilter
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter

    return matchesSearch && matchesProperty && matchesTier && matchesStatus
  })

  if (vipContacts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full backdrop-blur-3xl bg-white/40 border-0 rounded-[28px] shadow-[0_20px_60px_rgba(139,115,85,0.1)]">
          <CardContent className="p-8 md:p-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#D8C8A8]/30 to-[#C9A876]/20 flex items-center justify-center">
              <Users className="h-8 w-8 text-[#B08A64]" strokeWidth={1.25} />
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-xl md:text-2xl lg:text-2xl font-normal text-[#6E5A4F] uppercase">
                No VIPs added yet.
              </h3>
              <p className="text-sm font-normal text-[#8B7355] leading-relaxed">
                Mark key guests and clients as VIP to see them here at a glance.
              </p>
            </div>
            <Button
              onClick={() => router.push("/contacts")}
              className="h-11 px-6 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700"
            >
              Go to Guests
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[95%] md:max-w-[1100px] px-4 md:px-8 lg:px-20 pt-6 md:pt-10 lg:pt-12 pb-16 md:pb-20 lg:pb-24 space-y-4 md:space-y-6 lg:space-y-8">
        <div className="space-y-1 md:space-y-2">
          <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase">
            VIP MANAGEMENT
          </h1>
          <p className="text-xs md:text-sm font-normal text-[#8B7355] leading-relaxed max-w-2xl">
            View, message, and manage your most valued guests and members.
          </p>
        </div>

        <Card className="backdrop-blur-3xl bg-white/40 border-0 rounded-[20px] md:rounded-[24px] shadow-[0_20px_60px_rgba(139,115,85,0.08)]">
          <CardContent className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-5 lg:space-y-6">
            <div className="space-y-3 md:space-y-4">
              <div className="relative">
                <Search
                  className="absolute left-3 md:left-4 lg:left-5 top-1/2 h-3.5 md:h-4 w-3.5 md:w-4 -translate-y-1/2 text-[#B8A896]"
                  strokeWidth={1.5}
                />
                <Input
                  placeholder="Search VIPs by name, tier, or property..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 md:pl-11 lg:pl-12 h-9 md:h-10 lg:h-11 rounded-full backdrop-blur-xl bg-white/50 border-0 text-xs md:text-sm font-normal text-[#3a2f28] placeholder:text-[#B8A896]/60 shadow-[0_8px_24px_rgba(139,115,85,0.06)] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_3px_rgba(216,200,168,0.2)] transition-all duration-700 hover:bg-white/60 hover:shadow-[0_8px_28px_rgba(216,200,168,0.15)]"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                  <SelectTrigger className="w-auto h-9 md:h-10 rounded-full backdrop-blur-xl bg-white/50 border-0 text-xs md:text-sm font-normal text-[#3a2f28] shadow-[0_8px_24px_rgba(139,115,85,0.06)] hover:bg-white/60 transition-all duration-700">
                    <SelectValue placeholder="All Properties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="ATTACHAI Sanctuary">ATTACHAI Sanctuary</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={tierFilter} onValueChange={setTierFilter}>
                  <SelectTrigger className="w-auto h-9 md:h-10 rounded-full backdrop-blur-xl bg-white/50 border-0 text-xs md:text-sm font-normal text-[#3a2f28] shadow-[0_8px_24px_rgba(139,115,85,0.06)] hover:bg-white/60 transition-all duration-700">
                    <SelectValue placeholder="All Tiers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="VVIP">VVIP</SelectItem>
                    <SelectItem value="Platinum">Platinum</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-auto h-9 md:h-10 rounded-full backdrop-blur-xl bg-white/50 border-0 text-xs md:text-sm font-normal text-[#3a2f28] shadow-[0_8px_24px_rgba(139,115,85,0.06)] hover:bg-white/60 transition-all duration-700">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="In-house">In-house</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Past">Past</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {filteredContacts.map((contact) => (
                <Card
                  key={contact.id}
                  className="group cursor-pointer backdrop-blur-2xl bg-white/30 border-0 rounded-[18px] md:rounded-[20px] shadow-[0_8px_32px_rgba(139,115,85,0.05)] hover:shadow-[0_16px_48px_rgba(139,115,85,0.12)] hover:bg-white/40 transition-all duration-700"
                  onClick={() => {
                    setSelectedGuest(contact)
                    setShowGuestDrawer(true)
                  }}
                >
                  <CardContent className="p-4 md:p-5 space-y-3 md:space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs md:text-sm font-medium text-[#3a2f28]">{contact.initials}</span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm md:text-base font-medium text-[#3a2f28] truncate">{contact.name}</h3>
                          <p className="text-[10px] md:text-xs text-[#8B7355]">{contact.role}</p>
                        </div>
                      </div>
                      <Badge
                        className={`text-[9px] md:text-[10px] px-2 py-0.5 rounded-full font-normal ${
                          contact.tier === "VVIP"
                            ? "bg-gradient-to-r from-[#B08A64] to-[#8B6F47] text-white"
                            : contact.tier === "Platinum"
                              ? "bg-gradient-to-r from-[#C9A876] to-[#B08A64] text-white"
                              : "bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28]"
                        }`}
                      >
                        {contact.tier}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {contact.tags.slice(0, 3).map((tag, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-[9px] md:text-[10px] px-2 py-0.5 rounded-full bg-white/40 text-[#6E5A4F] border-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {contact.tags.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="text-[9px] md:text-[10px] px-2 py-0.5 rounded-full bg-white/40 text-[#6E5A4F] border-0"
                        >
                          +{contact.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E9E2D7]/30">
                      <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-[#8B7355]">
                        <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" strokeWidth={1.5} />
                        <span>{contact.lastInteraction}</span>
                      </div>
                      <ChevronRight
                        className="h-4 w-4 text-[#B8A896] group-hover:translate-x-1 transition-transform duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredContacts.length === 0 && (
              <div className="text-center py-12 text-[#8B7355] space-y-2">
                <p className="text-sm">No VIPs match your filters</p>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery("")
                    setPropertyFilter("all")
                    setTierFilter("all")
                    setStatusFilter("all")
                  }}
                  className="text-xs text-[#B08A64] hover:text-[#8B6F47]"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showGuestDrawer} onOpenChange={setShowGuestDrawer}>
        <DialogContent className="max-w-full sm:max-w-[90vw] md:max-w-2xl lg:max-w-3xl max-h-[90vh] rounded-[24px] md:rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)] p-0 overflow-hidden">
          {selectedGuest && (
            <div className="flex flex-col h-full max-h-[90vh]">
              <DialogHeader className="p-6 md:p-8 border-b border-[#E9E2D7]/30 flex-shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex items-center justify-center flex-shrink-0">
                      <span className="text-lg md:text-xl font-medium text-[#3a2f28]">{selectedGuest.initials}</span>
                    </div>
                    <div>
                      <DialogTitle className="text-xl md:text-2xl font-serif text-[#3a2f28] uppercase tracking-wide">
                        {selectedGuest.name}
                      </DialogTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={`text-[10px] px-2 py-0.5 rounded-full font-normal ${
                            selectedGuest.tier === "VVIP"
                              ? "bg-gradient-to-r from-[#B08A64] to-[#8B6F47] text-white"
                              : selectedGuest.tier === "Platinum"
                                ? "bg-gradient-to-r from-[#C9A876] to-[#B08A64] text-white"
                                : "bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28]"
                          }`}
                        >
                          {selectedGuest.tier}
                        </Badge>
                        <span className="text-xs text-[#8B7355]">{selectedGuest.role}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowGuestDrawer(false)}
                    className="h-8 w-8 rounded-full hover:bg-white/40"
                  >
                    <X className="h-4 w-4 text-[#8B7355]" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-[#8B7355] tracking-wider uppercase">Phone</p>
                    <p className="text-sm text-[#3a2f28]">{selectedGuest.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-[#8B7355] tracking-wider uppercase">Email</p>
                    <p className="text-sm text-[#3a2f28] truncate">{selectedGuest.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-[#8B7355] tracking-wider uppercase">Property</p>
                    <p className="text-sm text-[#3a2f28]">{selectedGuest.property}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-[#8B7355] tracking-wider uppercase">Status</p>
                    <p className="text-sm text-[#3a2f28]">{selectedGuest.status}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] text-[#8B7355] tracking-wider uppercase">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedGuest.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs px-3 py-1 rounded-full bg-white/40 text-[#6E5A4F] border-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedGuest.preferences && selectedGuest.preferences.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-[#8B7355] tracking-wider uppercase">Preferences</p>
                    <ul className="space-y-1">
                      {selectedGuest.preferences.map((pref, i) => (
                        <li key={i} className="text-sm text-[#3a2f28] flex items-start gap-2">
                          <span className="text-[#C9A876] mt-1">•</span>
                          <span>{pref}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedGuest.notes && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-[#8B7355] tracking-wider uppercase">Notes</p>
                    <p className="text-sm text-[#3a2f28] leading-relaxed">{selectedGuest.notes}</p>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8 border-t border-[#E9E2D7]/30 flex gap-3 flex-shrink-0">
                <Button className="flex-1 h-11 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] transition-all duration-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-11 rounded-full border-[#D8C8A8]/40 text-[#3a2f28] hover:bg-white/40 bg-transparent"
                >
                  View Profile
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
