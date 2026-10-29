"use client"

import * as React from "react"
import { useState } from "react" // Import useState
import { useRouter } from "next/navigation"
import {
  Search,
  ChevronDown,
  X,
  Check,
  MessageSquare,
  Tag,
  Plus,
  CircleDot,
  FileText,
  Activity,
  Phone,
  Send,
  ExternalLink,
  Bot,
  Zap,
  Target,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StatusChip } from "@/components/ui/status-chip"

interface Contact {
  id: string
  name: string
  initials: string
  avatarUrl?: string
  whatsappProfile?: string
  phone: string
  email: string
  role: "Guest" | "Member" | "Staff" | "Owner" | "Lead"
  tags: string[]
  status: "In-house" | "Upcoming" | "Past" | "Lead"
  lastInteraction: string
  lastInteractionMs: number
  crmSource: string
  crmId?: string
  language: string
  homeCity?: string
  homeCountry?: string
  conversationId?: string
  aiInsights: string[]
  recentActivity: Array<{
    type: "conversation" | "action" | "campaign" | "note"
    description: string
    timestamp: string
  }>
}

const contacts: Contact[] = [
  {
    id: "CNT-001",
    name: "Sarah Chen",
    initials: "SC",
    phone: "+1 (424) 555-0104",
    email: "sarah.chen@email.com",
    role: "Guest",
    tags: ["VIP", "Float Suite", "Repeat"],
    status: "In-house",
    lastInteraction: "6m ago",
    lastInteractionMs: Date.now() - 6 * 60 * 1000,
    crmSource: "Synced · PMS",
    crmId: "PMS-8472",
    language: "English",
    homeCity: "San Francisco",
    homeCountry: "USA",
    conversationId: "CONV-001",
    aiInsights: [
      "Prefers early morning float therapy sessions",
      "Often requests extended Silence Atelier time",
      "Responds best to concise, calm messages",
    ],
    recentActivity: [
      { type: "action", description: "Booked infrared sauna session for tomorrow", timestamp: "6m ago" },
      { type: "conversation", description: "Asked about Float Suite availability", timestamp: "15m ago" },
      { type: "campaign", description: "Opened Neural Programming Retreat email", timestamp: "2 days ago" },
    ],
  },
  {
    id: "CNT-002",
    name: "Michael Roberts",
    initials: "MR",
    phone: "+1 (310) 555-0892",
    email: "michael.r@email.com",
    role: "Guest",
    tags: ["VIP", "Workroom", "Regenerative Dining"],
    status: "In-house",
    lastInteraction: "14m ago",
    lastInteractionMs: Date.now() - 14 * 60 * 1000,
    crmSource: "Synced · PMS",
    crmId: "PMS-8461",
    language: "English",
    homeCity: "Los Angeles",
    homeCountry: "USA",
    conversationId: "CONV-002",
    aiInsights: [
      "Frequently books Nutritive Parlour experiences",
      "Prefers customized regenerative meal plans",
      "Values quiet workspace in Workroom",
    ],
    recentActivity: [
      { type: "action", description: "Requested regenerative meal consultation", timestamp: "14m ago" },
      { type: "note", description: "Dietary preferences updated", timestamp: "1h ago" },
    ],
  },
  {
    id: "CNT-003",
    name: "Julia Davis",
    initials: "JD",
    phone: "+1 (213) 555-4521",
    email: "julia.davis@email.com",
    role: "Guest",
    tags: ["Neural Programming", "Workroom"],
    status: "Upcoming",
    lastInteraction: "24m ago",
    lastInteractionMs: Date.now() - 24 * 60 * 1000,
    crmSource: "Synced · PMS",
    language: "English",
    homeCity: "New York",
    homeCountry: "USA",
    conversationId: "CONV-003",
    aiInsights: [
      "Regular Neural Programming Studio user",
      "Prefers early morning sessions",
      "Minimal communication style",
    ],
    recentActivity: [
      { type: "action", description: "Neural programming session scheduled", timestamp: "24m ago" },
      { type: "conversation", description: "Confirmed arrival time", timestamp: "1 day ago" },
    ],
  },
  {
    id: "CNT-004",
    name: "Emily Parker",
    initials: "EP",
    phone: "+1 (818) 555-7290",
    email: "emily.parker@email.com",
    role: "Member",
    tags: ["VIP", "Member Tier 1", "Nutritive Parlour"],
    status: "In-house",
    lastInteraction: "31m ago",
    lastInteractionMs: Date.now() - 31 * 60 * 1000,
    crmSource: "Synced · PMS",
    language: "English",
    homeCity: "Beverly Hills",
    homeCountry: "USA",
    conversationId: "CONV-004",
    aiInsights: [
      "Frequent regenerative dining experiences",
      "Prefers quiet Nutritive Parlour seating",
      "Always punctual for sessions",
    ],
    recentActivity: [{ type: "action", description: "Reserved Nutritive Parlour experience", timestamp: "31m ago" }],
  },
  {
    id: "CNT-005",
    name: "David Kim",
    initials: "DK",
    phone: "+1 (323) 555-6103",
    email: "david.kim@email.com",
    role: "Guest",
    tags: ["VIP", "Regeneration Floor", "High-value"],
    status: "In-house",
    lastInteraction: "44m ago",
    lastInteractionMs: Date.now() - 44 * 60 * 1000,
    crmSource: "Synced · PMS",
    language: "English, Korean",
    homeCity: "Seoul",
    homeCountry: "South Korea",
    conversationId: "CONV-005",
    aiInsights: [
      "High-value Regeneration Floor member",
      "Prefers communication in both English and Korean",
      "Values premium regenerative services",
    ],
    recentActivity: [{ type: "action", description: "Processing Regeneration Floor package", timestamp: "44m ago" }],
  },
  {
    id: "CNT-006",
    name: "Amanda Liu",
    initials: "AL",
    phone: "+1 (310) 555-2247",
    email: "amanda.liu@email.com",
    role: "Guest",
    tags: ["Conscious Events", "Float Suite"],
    status: "Past",
    lastInteraction: "2h ago",
    lastInteractionMs: Date.now() - 120 * 60 * 1000,
    crmSource: "Synced · PMS",
    language: "English, Mandarin",
    homeCity: "Shanghai",
    homeCountry: "China",
    conversationId: "CONV-006",
    aiInsights: [
      "Frequently attends Conscious Events Pavilion",
      "Prefers bilingual communication",
      "High attention to wellness details",
    ],
    recentActivity: [{ type: "action", description: "Registered for conscious living workshop", timestamp: "2h ago" }],
  },
]

export function ContactsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [tagFilter, setTagFilter] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("last-interaction")

  const [selectedContacts, setSelectedContacts] = React.useState<string[]>([])
  const [showDrawer, setShowDrawer] = React.useState(false)
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null)
  const [showBulkActions, setShowBulkActions] = React.useState(false)

  const [availableTags, setAvailableTags] = React.useState<string[]>(["In-house", "VIP"])
  const [showAddTagDialog, setShowAddTagDialog] = React.useState(false)
  const [newTagName, setNewTagName] = React.useState("")

  const [showBulkTagDialog, setShowBulkTagDialog] = React.useState(false)
  const [selectedTagsToAdd, setSelectedTagsToAdd] = React.useState<string[]>([])

  const [showAddToListDialog, setShowAddToListDialog] = React.useState(false)
  const [addToListMode, setAddToListMode] = React.useState<"tags" | "campaign">("tags")
  const [selectedCampaignList, setSelectedCampaignList] = React.useState<string>("")

  const [showNewTagInput, setShowNewTagInput] = React.useState(false)
  const [newTagInputValue, setNewTagInputValue] = React.useState("")

  // Mock campaign lists data
  const availableCampaignLists = [
    "Winter Float Series",
    "VIP Regeneration Floor",
    "Neural Programming Retreat",
    "Nutritive Parlour Events",
    "Member Wellness Circle",
  ]

  const [showWhatsAppPanel, setShowWhatsAppPanel] = React.useState(false)
  const [whatsappMessage, setWhatsappMessage] = React.useState("")
  const [selectedAction, setSelectedAction] = React.useState<"direct" | "ai" | "automation" | "campaign">("direct")

  // New state for new contact modal
  const [showNewContactModal, setShowNewContactModal] = useState<boolean>(false)
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: "",
    phone: "",
    email: "",
    role: "Guest",
    tags: [],
    status: "Lead",
    language: "English",
    homeCity: "",
    homeCountry: "",
    crmSource: "Manual Entry",
  })

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const contactId = urlParams.get("id")
      const contactName = urlParams.get("name")

      console.log("[v0] ContactsPage mounted with params:", { contactId, contactName })

      if (contactId || contactName) {
        // Try to find contact by ID first, then by name
        let contact = contactId ? contacts.find((c) => c.id === contactId) : null

        if (!contact && contactName) {
          // If not found by ID, try matching by name (case insensitive)
          contact = contacts.find((c) => c.name.toLowerCase() === contactName.toLowerCase())
          console.log("[v0] Searching by name:", contactName, "Found:", !!contact)
        }

        if (contact) {
          console.log("[v0] Opening contact from URL:", contact.id, contact.name)
          setSelectedContact(contact)
          setShowDrawer(true)
        } else {
          console.log("[v0] Contact not found for:", { contactId, contactName })
        }

        // Clean up URL without reloading
        window.history.replaceState({}, "", "/contacts")
      }
    }
  }, [])

  const filteredAndSortedContacts = React.useMemo(() => {
    const filtered = contacts.filter((contact) => {
      // Search filtering
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (
          !contact.name.toLowerCase().includes(query) &&
          !contact.phone.includes(query) &&
          !contact.email.toLowerCase().includes(query) &&
          !contact.tags.some((tag) => tag.toLowerCase().includes(query))
        ) {
          return false
        }
      }

      // Status filtering
      if (statusFilter !== "all" && contact.status.toLowerCase() !== statusFilter.toLowerCase()) return false

      // Tag filtering
      if (tagFilter !== "all" && !contact.tags.includes(tagFilter)) return false

      return true
    })

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "last-interaction") {
        return b.lastInteractionMs - a.lastInteractionMs
      }
      return 0
    })

    return filtered
  }, [searchQuery, statusFilter, tagFilter, sortBy])

  const toggleContactSelection = (id: string) => {
    setSelectedContacts((prev) => (prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]))
  }

  const openContactDrawer = (contact: Contact) => {
    setSelectedContact(contact)
    setShowDrawer(true)
  }

  React.useEffect(() => {
    setShowBulkActions(selectedContacts.length > 0)
  }, [selectedContacts])

  const handleAddTag = () => {
    if (newTagName.trim() && !availableTags.some((tag) => tag.toLowerCase() === newTagName.trim().toLowerCase())) {
      setAvailableTags([...availableTags, newTagName.trim()])
      setNewTagName("")
      setShowAddTagDialog(false)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    // Don't allow removing default tags
    if (tagToRemove === "In-house" || tagToRemove === "VIP") return
    setAvailableTags(availableTags.filter((tag) => tag !== tagToRemove))
  }

  const toggleBulkTag = (tag: string) => {
    setSelectedTagsToAdd((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleApplyBulkTags = () => {
    console.log("[v0] Applying tags to contacts:", {
      contacts: selectedContacts,
      tags: selectedTagsToAdd,
    })
    // Here you would update the contacts with the selected tags
    // For now, just log and close the dialog
    setShowBulkTagDialog(false)
    setSelectedTagsToAdd([])
  }

  const handleAddToList = () => {
    if (addToListMode === "tags" && selectedTagsToAdd.length > 0) {
      console.log("[v0] Adding tags to contact:", {
        contact: selectedContact?.id,
        tags: selectedTagsToAdd,
      })
      // Update the contact with new tags
      setShowAddToListDialog(false)
      setSelectedTagsToAdd([])
      setShowNewTagInput(false)
      setNewTagInputValue("")
    } else if (addToListMode === "campaign" && selectedCampaignList) {
      console.log("[v0] Adding contact to campaign:", {
        contact: selectedContact?.id,
        campaign: selectedCampaignList,
      })
      // Navigate to campaigns page with this contact preselected
      router.push(`/campaigns?preselected=${selectedContact?.id}&list=${selectedCampaignList}`)
      setShowAddToListDialog(false)
      setShowDrawer(false)
    }
  }

  const handleCreateNewTag = () => {
    if (
      newTagInputValue.trim() &&
      !availableTags.some((tag) => tag.toLowerCase() === newTagInputValue.trim().toLowerCase())
    ) {
      setAvailableTags([...availableTags, newTagInputValue.trim()])
      setSelectedTagsToAdd([...selectedTagsToAdd, newTagInputValue.trim()])
      setNewTagInputValue("")
      setShowNewTagInput(false)
      console.log("[v0] Created new tag:", newTagInputValue.trim())
    }
  }

  const handleBulkWhatsApp = () => {
    console.log("[v0] Sending bulk WhatsApp to:", selectedContacts)
    // Open WhatsApp panel or show bulk message composer
  }

  // Handlers for WhatsApp panel actions
  const handleSendWhatsApp = () => {
    console.log("[v0] Sending WhatsApp message:", {
      contact: selectedContact?.name,
      message: whatsappMessage,
      action: selectedAction,
    })
    setWhatsappMessage("")
    setShowWhatsAppPanel(false)
  }

  const handleAIDelegation = () => {
    console.log("[v0] Delegating to AI for contact:", selectedContact?.name)
    setShowWhatsAppPanel(false)
  }

  const handleSetupAutomation = () => {
    console.log("[v0] Setting up automation for contact:", selectedContact?.name)
    router.push(`/automation-rules?contact=${selectedContact?.id}`)
    setShowWhatsAppPanel(false)
    setShowDrawer(false)
  }

  const handleCreateCampaign = () => {
    console.log("[v0] Creating campaign for contact:", selectedContact?.name)
    router.push(`/campaigns?contact=${selectedContact?.id}`)
    setShowWhatsAppPanel(false)
    setShowDrawer(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4EDE1] via-[#E9DCC9] to-[#F4EDE1]">
      <div className="mx-auto max-w-[95%] md:max-w-[1100px] px-4 md:px-8 lg:px-20 pt-6 md:pt-10 lg:pt-12 pb-16 md:pb-20 lg:pb-24 space-y-4 md:space-y-6 lg:space-y-8">
        {/* Page Header */}
        <div className="space-y-1 md:space-y-2">
          <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase">
            CONTACTS
          </h1>
          <p className="text-xs md:text-sm font-normal text-[#8B7355] leading-relaxed max-w-2xl">
            View, tag, and message your guests and members.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="rounded-xl md:rounded-[24px] backdrop-blur-3xl bg-white/40 shadow-[0_20px_60px_rgba(139,115,85,0.08),inset_0_1px_1px_rgba(255,255,255,0.6)] p-3 md:p-5 border-0">
          <div className="space-y-3 md:space-y-4">
            {/* Search and Action Buttons - Fully responsive */}
            <div className="flex flex-col gap-3">
              {/* Search Input Row */}
              <div className="relative w-full">
                <Search className="absolute left-3 md:left-5 top-1/2 h-3.5 md:h-4 w-3.5 md:w-4 -translate-y-1/2 text-[#B8A896]" />
                <Input
                  placeholder="Search by name, tag, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 md:pl-12 h-9 md:h-10 w-full rounded-full backdrop-blur-xl bg-white/50 border-0 text-xs md:text-sm font-normal text-[#3a2f28] placeholder:text-[#B8A896]/60 shadow-[0_8px_24px_rgba(139,115,85,0.06)] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_3px_rgba(216,200,168,0.2)] transition-all duration-700 hover:bg-white/60 hover:shadow-[0_8px_28px_rgba(216,200,168,0.15)]"
                />
              </div>

              {/* Sort & New Button Row */}
              <div className="flex items-center gap-2 w-full">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="flex-1 sm:flex-none sm:w-[140px] md:w-[180px] h-9 md:h-10 rounded-full backdrop-blur-xl bg-white/40 border-0 text-xs md:text-sm font-normal text-[#6B5E52] shadow-[0_8px_24px_rgba(139,115,85,0.06)] hover:bg-white/50 transition-all duration-700 focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl md:rounded-[20px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_16px_48px_rgba(139,115,85,0.12)]">
                    <SelectItem
                      value="last-interaction"
                      className="rounded-xl md:rounded-[14px] text-xs md:text-sm font-normal"
                    >
                      Last Interaction
                    </SelectItem>
                    <SelectItem value="name" className="rounded-xl md:rounded-[14px] text-xs md:text-sm font-normal">
                      Name
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() => setShowNewContactModal(true)}
                  className="flex-shrink-0 h-9 md:h-10 px-4 md:px-6 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_8px_30px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-105 text-[10px] md:text-xs font-serif uppercase tracking-widest"
                >
                  <Plus className="mr-1.5 md:mr-2 h-3.5 md:h-4 w-3.5 md:w-4" />
                  NEW
                </Button>
              </div>
            </div>

            {/* Status Filter Pills */}
            <div className="space-y-2">
              <span className="block text-[10px] md:text-xs font-normal text-[#6E5A4F] tracking-wider uppercase">
                Status
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {["all", "In-House", "Upcoming", "Past", "Lead"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-normal text-xs transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${
                      statusFilter === filter
                        ? "bg-[#D8C8A8]/50 text-[#3a2f28] shadow-[0_4px_20px_rgba(216,200,168,0.35),inset_0_1px_2px_rgba(255,255,255,0.7)] scale-[1.02]"
                        : "bg-white/40 text-[#8B7355] hover:bg-white/50 hover:shadow-[0_2px_12px_rgba(216,200,168,0.2)] hover:scale-[1.01] backdrop-blur-xl border border-[#D8C8A8]/20"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Filter Pills */}
            <div className="space-y-2">
              <span className="block text-[10px] md:text-xs font-normal text-[#6E5A4F] tracking-wider uppercase">
                Tags
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setTagFilter("all")}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-normal text-xs transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${
                    tagFilter === "all"
                      ? "bg-[#D8C8A8]/50 text-[#3a2f28] shadow-[0_4px_20px_rgba(216,200,168,0.35),inset_0_1px_2px_rgba(255,255,255,0.7)] scale-[1.02]"
                      : "bg-white/40 text-[#8B7355] hover:bg-white/50 hover:shadow-[0_2px_12px_rgba(216,200,168,0.2)] hover:scale-[1.01] backdrop-blur-xl border border-[#D8C8A8]/20"
                  }`}
                >
                  All
                </button>

                {availableTags.map((filter) => (
                  <div key={filter} className="relative group">
                    <button
                      onClick={() => setTagFilter(filter)}
                      className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-normal text-xs transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${
                        tagFilter === filter
                          ? "bg-[#D8C8A8]/50 text-[#3a2f28] shadow-[0_4px_20px_rgba(216,200,168,0.35),inset_0_1px_2px_rgba(255,255,255,0.7)] scale-[1.02]"
                          : "bg-white/40 text-[#8B7355] hover:bg-white/50 hover:shadow-[0_2px_12px_rgba(216,200,168,0.2)] hover:scale-[1.01] backdrop-blur-xl border border-[#D8C8A8]/20"
                      }`}
                    >
                      {filter}
                    </button>
                    {/* Remove button for custom tags */}
                    {filter !== "In-house" && filter !== "VIP" && (
                      <button
                        onClick={() => handleRemoveTag(filter)}
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A876] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      >
                        <X className="h-2.5 w-2.5" />
                      </button>
                    )}
                  </div>
                ))}

                {/* Add Tag Button */}
                <button
                  onClick={() => setShowAddTagDialog(true)}
                  className="px-3 md:px-4 py-1.5 md:py-2 rounded-full font-normal text-xs text-[#8B7355] hover:bg-white/50 hover:shadow-[0_2px_12px_rgba(216,200,168,0.2)] hover:scale-[1.01] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-1.5 whitespace-nowrap bg-white/40 backdrop-blur-xl border border-[#D8C8A8]/20"
                >
                  <Plus className="h-3 w-3" />
                  Add Tag
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {showBulkActions && (
          <div className="rounded-[22px] backdrop-blur-3xl bg-gradient-to-br from-[#D8C8A8]/30 to-[#C9A876]/20 shadow-[0_20px_60px_rgba(139,115,85,0.12),inset_0_1px_2px_rgba(255,255,255,0.6)] border border-[#D8C8A8]/20 p-3 md:p-4 lg:p-5 animate-fadeSlideIn">
            {/* Desktop Layout (≥1024px) */}
            <div className="hidden lg:flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#D8C8A8]/50 to-[#C9A876]/40 backdrop-blur-xl flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.1)] border border-white/40">
                  <Check className="h-4 w-4 text-[#8B7355]" />
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-sm font-light text-[#3a2f28] tracking-wide">
                    {selectedContacts.length} {selectedContacts.length === 1 ? "contact" : "contacts"} selected
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-6 py-2.5 rounded-full backdrop-blur-xl bg-gradient-to-r from-[#D8C8A8]/40 to-[#C9A876]/30 text-[#3a2f28] text-xs font-light tracking-wide shadow-[0_8px_28px_rgba(139,115,85,0.12)] border border-[#D8C8A8]/30 hover:from-[#D8C8A8]/50 hover:to-[#C9A876]/40 hover:shadow-[0_12px_40px_rgba(216,200,168,0.25)] transition-all duration-700 flex items-center gap-2 whitespace-nowrap">
                  <Send className="h-4 w-4" />
                  Send Campaign
                </button>

                <button
                  onClick={handleBulkWhatsApp}
                  className="px-6 py-2.5 rounded-full backdrop-blur-xl bg-white/40 text-[#6B5E52] text-xs font-light tracking-wide shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/30 hover:bg-white/50 transition-all duration-700 flex items-center gap-2 whitespace-nowrap"
                >
                  <MessageSquare className="h-4 w-4" />
                  Send WhatsApp
                </button>

                <button
                  onClick={() => setShowBulkTagDialog(true)}
                  className="px-6 py-2.5 rounded-full backdrop-blur-xl bg-white/40 text-[#6B5E52] text-xs font-light tracking-wide shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/30 hover:bg-white/50 transition-all duration-700 flex items-center gap-2 whitespace-nowrap"
                >
                  <Tag className="h-4 w-4" />
                  Add Tags
                </button>

                <button
                  onClick={() => setSelectedContacts([])}
                  className="px-4 py-2.5 rounded-full backdrop-blur-xl bg-white/40 text-[#8B7355] text-xs font-light border border-white/30 hover:bg-white/50 transition-all duration-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Tablet Layout (768-1023px) - Two rows */}
            <div className="hidden md:block lg:hidden space-y-3">
              {/* Row 1: Selection count + Close button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#D8C8A8]/50 to-[#C9A876]/40 backdrop-blur-xl flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.1)] border border-white/40">
                    <Check className="h-3.5 w-3.5 text-[#8B7355]" />
                  </div>

                  <h3 className="text-sm font-light text-[#3a2f28] tracking-wide">
                    {selectedContacts.length} selected
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedContacts([])}
                  className="px-3.5 py-2 rounded-full backdrop-blur-xl bg-white/40 text-[#8B7355] text-xs font-light border border-white/30 hover:bg-white/50 transition-all duration-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Row 2: Action buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button className="px-4 py-2.5 rounded-full backdrop-blur-xl bg-gradient-to-r from-[#D8C8A8]/40 to-[#C9A876]/30 text-[#3a2f28] text-xs font-light tracking-wide shadow-[0_8px_28px_rgba(139,115,85,0.12)] border border-[#D8C8A8]/30 hover:from-[#D8C8A8]/50 hover:to-[#C9A876]/40 hover:shadow-[0_12px_40px_rgba(216,200,168,0.25)] transition-all duration-700 flex items-center justify-center gap-2">
                  <Send className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Send Campaign</span>
                  <span className="sm:hidden">Campaign</span>
                </button>

                <button
                  onClick={handleBulkWhatsApp}
                  className="px-4 py-2.5 rounded-full backdrop-blur-xl bg-white/40 text-[#6B5E52] text-xs font-light tracking-wide shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/30 hover:bg-white/50 transition-all duration-700 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                  <span className="sm:hidden">Message</span>
                </button>

                <button
                  onClick={() => setShowBulkTagDialog(true)}
                  className="px-4 py-2.5 rounded-full backdrop-blur-xl bg-white/40 text-[#6B5E52] text-xs font-light tracking-wide shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/30 hover:bg-white/50 transition-all duration-700 flex items-center justify-center gap-2"
                >
                  <Tag className="h-3.5 w-3.5" />
                  <span>Add Tags</span>
                </button>
              </div>
            </div>

            {/* Mobile Layout (≤767px) - Stacked vertical */}
            <div className="md:hidden space-y-2.5">
              {/* Row 1: Selection count + Close button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#D8C8A8]/50 to-[#C9A876]/40 backdrop-blur-xl flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.1)] border border-white/40">
                    <Check className="h-3 w-3 text-[#8B7355]" />
                  </div>

                  <h3 className="text-xs font-light text-[#3a2f28] tracking-wide">
                    {selectedContacts.length} selected
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedContacts([])}
                  className="w-8 h-8 rounded-full backdrop-blur-xl bg-white/40 text-[#8B7355] border border-white/30 hover:bg-white/50 transition-all duration-700 flex items-center justify-center"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Row 2: Stacked action buttons */}
              <div className="space-y-2">
                <button className="w-full min-h-[44px] px-4 py-2.5 rounded-full backdrop-blur-xl bg-gradient-to-r from-[#D8C8A8]/40 to-[#C9A876]/30 text-[#3a2f28] text-xs font-light tracking-wide shadow-[0_8px_28px_rgba(139,115,85,0.12)] border border-[#D8C8A8]/30 hover:from-[#D8C8A8]/50 hover:to-[#C9A876]/40 hover:shadow-[0_12px_40px_rgba(216,200,168,0.25)] transition-all duration-700 flex items-center justify-center gap-2.5">
                  <Send className="h-4 w-4" />
                  Send Campaign
                </button>

                <button
                  onClick={handleBulkWhatsApp}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-full backdrop-blur-xl bg-white/40 text-[#6B5E52] text-xs font-light tracking-wide shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/30 hover:bg-white/50 transition-all duration-700 flex items-center justify-center gap-2.5"
                >
                  <MessageSquare className="h-4 w-4" />
                  Send WhatsApp
                </button>

                <button
                  onClick={() => setShowBulkTagDialog(true)}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-full backdrop-blur-xl bg-white/40 text-[#6B5E52] text-xs font-light tracking-wide shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/30 hover:bg-white/50 transition-all duration-700 flex items-center justify-center gap-2.5"
                >
                  <Tag className="h-4 w-4" />
                  Add Tags
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact List */}
        <div className="space-y-2 md:space-y-3">
          {filteredAndSortedContacts.map((contact, index) => (
            <div
              key={contact.id}
              className="relative group rounded-xl md:rounded-[22px] backdrop-blur-3xl bg-white/40 shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] border-0 hover:bg-white/50 hover:shadow-[0_16px_56px_rgba(139,115,85,0.1),0_0_0_1px_rgba(216,200,168,0.15)] hover:-translate-y-0.5 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden"
              style={{
                animationName: "fadeSlideIn",
                animationDuration: "800ms",
                animationTimingFunction: "ease-out",
                animationFillMode: "forwards",
                animationDelay: `${index * 60}ms`,
                opacity: 0,
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-0.5 md:w-1 rounded-l-xl md:rounded-l-[22px] bg-gradient-to-b from-[#C9A876]/60 to-[#C9A876]/20" />

              <div
                className="p-2.5 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4"
                onClick={() => openContactDrawer(contact)}
              >
                {/* Mobile layout: stacked */}
                <div className="flex md:hidden items-center gap-2 w-full">
                  {/* Checkbox */}
                  <div
                    className="flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleContactSelection(contact.id)
                    }}
                  >
                    <Checkbox
                      checked={selectedContacts.includes(contact.id)}
                      className="data-[state=checked]:bg-[#C9A876] data-[state=checked]:border-[#C9A876] h-3.5 w-3.5"
                    />
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 backdrop-blur-xl flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/40">
                    <span className="text-[10px] font-normal text-[#8B7355] tracking-wide">{contact.initials}</span>
                  </div>

                  {/* Name & Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-serif uppercase text-[#3a2f28] truncate">{contact.name}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-normal text-[#6E5A4F]">
                      <span>{contact.role}</span>
                      <span>•</span>
                      <span className="truncate">{contact.phone}</span>
                    </div>
                  </div>

                  {/* Status & Time */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <StatusChip status={contact.status} />
                    <span className="text-[9px] font-normal text-[#6E5A4F]">{contact.lastInteraction}</span>
                  </div>
                </div>

                {/* Tags on mobile - second row */}
                <div className="flex md:hidden items-center gap-1.5 flex-wrap pl-9">
                  {contact.tags.map((tag) => (
                    <div
                      key={tag}
                      className="px-2.5 py-1 rounded-full backdrop-blur-xl bg-[#D8C8A8]/20 text-[9px] font-normal text-[#8B7355] border border-[#D8C8A8]/30 shadow-[0_2px_8px_rgba(139,115,85,0.04)]"
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Desktop layout: horizontal */}
                <div className="hidden md:flex items-center gap-4 w-full">
                  {/* Checkbox */}
                  <div
                    className="flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleContactSelection(contact.id)
                    }}
                  >
                    <Checkbox
                      checked={selectedContacts.includes(contact.id)}
                      className="data-[state=checked]:bg-[#C9A876] data-[state=checked]:border-[#C9A876]"
                    />
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 backdrop-blur-xl flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/40">
                    <span className="text-sm font-normal text-[#8B7355] tracking-wide">{contact.initials}</span>
                  </div>

                  {/* Name & Role */}
                  <div className="flex-1 min-w-[180px] space-y-1">
                    <h3 className="text-sm font-serif uppercase text-[#3a2f28]">{contact.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-normal text-[#6B5E52]">
                      <span>{contact.role}</span>
                      <span>•</span>
                      <span>{contact.phone}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {contact.tags.map((tag) => (
                      <div
                        key={tag}
                        className="px-3 py-1.5 rounded-full backdrop-blur-xl bg-[#D8C8A8]/20 text-xs font-normal text-[#8B7355] border border-[#D8C8A8]/30 shadow-[0_2px_8px_rgba(139,115,85,0.04)]"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  {/* Status */}
                  <div className="flex-shrink-0">
                    <StatusChip status={contact.status} />
                  </div>

                  {/* Last Interaction */}
                  <div className="flex-shrink-0 text-xs font-normal text-[#6E5A4F]">{contact.lastInteraction}</div>

                  {/* CRM Badge */}
                  <div className="flex-shrink-0 text-[10px] font-normal text-[#6E5A4F]">{contact.crmSource}</div>

                  <ChevronDown className="h-4 w-4 text-[#6E5A4F]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Profile Drawer */}
      <Dialog open={showDrawer} onOpenChange={setShowDrawer}>
        <DialogContent className="w-[calc(100vw-32px)] max-w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-[20px] sm:rounded-[24px] md:rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)] p-4 sm:p-6">
          {selectedContact && (
            <>
              {/* Header */}
              <DialogHeader className="space-y-4 sm:space-y-6 pb-4 sm:pb-6 border-b border-[#E9E2D7]/30">
                <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 backdrop-blur-xl flex items-center justify-center shadow-[0_8px_32px_rgba(139,115,85,0.12)] border border-white/40">
                    <span className="text-lg sm:text-xl md:text-2xl font-light text-[#8B7355] tracking-wide">
                      {selectedContact.initials}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                    <DialogTitle className="font-serif text-lg sm:text-xl md:text-2xl uppercase font-light text-[#3a2f28] tracking-wide">
                      {selectedContact.name}
                    </DialogTitle>

                    {/* Tag chips in contact drawer */}
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      {selectedContact.tags.map((tag) => (
                        <div
                          key={tag}
                          className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-xl bg-[#D8C8A8]/20 text-[10px] sm:text-xs font-normal text-[#8B7355] border border-[#D8C8A8]/30 shadow-[0_2px_8px_rgba(139,115,85,0.04)]"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>

                    <div className="text-xs sm:text-sm font-light text-[#6B5E52]">
                      {selectedContact.status} · {selectedContact.role}
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 sm:space-y-8 py-4 sm:py-6">
                {/* Overview */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-[10px] sm:text-xs font-light text-[#6E5A4F] tracking-wider uppercase">
                    Overview
                  </h4>

                  <div className="rounded-[16px] sm:rounded-[20px] backdrop-blur-2xl bg-white/30 p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-[0_8px_32px_rgba(139,115,85,0.05)] border border-white/30">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1">
                        <p className="text-[9px] sm:text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase">
                          Phone / WhatsApp
                        </p>
                        <p className="text-xs sm:text-sm font-light text-[#3a2f28] break-all">
                          {selectedContact.phone}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] sm:text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase">
                          Email
                        </p>
                        <p className="text-xs sm:text-sm font-light text-[#3a2f28] break-all">
                          {selectedContact.email}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] sm:text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase">
                          Language(s)
                        </p>
                        <p className="text-xs sm:text-sm font-light text-[#3a2f28]">{selectedContact.language}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] sm:text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase">
                          Home
                        </p>
                        <p className="text-xs sm:text-sm font-light text-[#3a2f28]">
                          {selectedContact.homeCity}, {selectedContact.homeCountry}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CRM Integration */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-[10px] sm:text-xs font-light text-[#6E5A4F] tracking-wider uppercase">
                    CRM Integration
                  </h4>

                  <div className="rounded-[16px] sm:rounded-[20px] backdrop-blur-2xl bg-white/30 p-4 sm:p-6 space-y-3 shadow-[0_8px_32px_rgba(139,115,85,0.05)] border border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-[9px] sm:text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase">
                          Source
                        </p>
                        <p className="text-xs sm:text-sm font-light text-[#3a2f28]">{selectedContact.crmSource}</p>
                      </div>
                      {selectedContact.crmId && (
                        <div className="space-y-1">
                          <p className="text-[9px] sm:text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase">
                            External ID
                          </p>
                          <p className="text-xs sm:text-sm font-light text-[#3a2f28] font-mono">
                            {selectedContact.crmId}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="pt-3 border-t border-[#E9E2D7]/20">
                      <button className="text-[10px] sm:text-xs font-light text-[#C9A876] hover:text-[#A08968] transition-colors flex items-center gap-2">
                        <ExternalLink className="h-3 w-3" />
                        Open in CRM
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-[10px] sm:text-xs font-light text-[#6E5A4F] tracking-wider uppercase flex items-center gap-2">
                    <CircleDot className="h-3 w-3 text-[#C9A876]" strokeWidth={1.25} />
                    AI Insight
                  </h4>

                  <div className="rounded-[16px] sm:rounded-[20px] backdrop-blur-2xl bg-gradient-to-br from-[#D8C8A8]/10 to-[#C9A876]/5 p-4 sm:p-6 space-y-2 sm:space-y-3 shadow-[0_8px_32px_rgba(216,200,168,0.08)] border border-[#D8C8A8]/20">
                    <ul className="space-y-2">
                      {selectedContact.aiInsights.map((insight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm font-light text-[#6B5E52] leading-relaxed"
                        >
                          <div className="w-1 h-1 rounded-full bg-[#C9A876] mt-1.5 sm:mt-2 flex-shrink-0" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-[10px] sm:text-xs font-light text-[#6E5A4F] tracking-wider uppercase">
                    Recent Activity
                  </h4>

                  <div className="space-y-2 sm:space-y-3">
                    {selectedContact.recentActivity.map((activity, idx) => (
                      <div
                        key={idx}
                        className="rounded-[14px] sm:rounded-[16px] backdrop-blur-xl bg-white/30 p-3 sm:p-4 shadow-[0_6px_20px_rgba(139,115,85,0.04)] border border-white/20"
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          {activity.type === "conversation" && (
                            <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          )}
                          {activity.type === "action" && (
                            <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          )}
                          {activity.type === "campaign" && (
                            <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          )}
                          {activity.type === "note" && (
                            <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          )}

                          <div className="flex-1 min-w-0 space-y-1">
                            <p className="text-xs sm:text-sm font-light text-[#3a2f28]">{activity.description}</p>
                            <p className="text-[10px] sm:text-xs font-light text-[#6E5A4F]">{activity.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-[10px] sm:text-xs font-light text-[#6E5A4F] tracking-wider uppercase">
                    Quick Actions
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <button
                      onClick={() => {
                        if (selectedContact?.conversationId) {
                          router.push(`/service-inbox?conversation=${selectedContact.conversationId}`)
                          setShowDrawer(false)
                        }
                      }}
                      className="px-4 py-2.5 sm:py-3 rounded-[14px] sm:rounded-[16px] backdrop-blur-xl bg-white/40 text-[#6B5E52] text-xs font-light tracking-wide shadow-[0_4px_20px_rgba(139,115,85,0.1)] border border-white/30 hover:bg-white/50 hover:shadow-[0_6px_24px_rgba(139,115,85,0.12)] transition-all duration-700 flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Send Message
                    </button>

                    <button
                      onClick={() => setShowWhatsAppPanel(true)}
                      className="px-4 py-2.5 sm:py-3 rounded-[14px] sm:rounded-[16px] backdrop-blur-xl bg-gradient-to-r from-[#D8C8A8]/40 to-[#C9A876]/30 text-[#3a2f28] text-xs font-light tracking-wide shadow-[0_4px_20px_rgba(139,115,85,0.1)] border border-[#D8C8A8]/30 hover:from-[#D8C8A8]/50 hover:to-[#C9A876]/40 hover:shadow-[0_6px_24px_rgba(216,200,168,0.2)] transition-all duration-700 flex items-center justify-center gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      Send WhatsApp
                    </button>

                    <button
                      onClick={() => setShowAddToListDialog(true)}
                      className="px-4 py-2.5 sm:py-3 rounded-[14px] sm:rounded-[16px] backdrop-blur-xl bg-white/40 text-[#6B5E52] text-xs font-light tracking-wide shadow-[0_4px_20px_rgba(139,115,85,0.1)] border border-white/30 hover:bg-white/50 hover:shadow-[0_6px_24px_rgba(139,115,85,0.12)] transition-all duration-700 flex items-center justify-center gap-2"
                    >
                      <Tag className="h-4 w-4" />
                      Add to List
                    </button>
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button
                  onClick={() => setShowDrawer(false)}
                  className="w-full h-10 sm:h-12 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-[1.02] text-xs sm:text-sm"
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showWhatsAppPanel} onOpenChange={setShowWhatsAppPanel}>
        <DialogContent className="w-[calc(100vw-32px)] max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto rounded-[20px] sm:rounded-[24px] md:rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)] p-4 sm:p-6">
          {selectedContact && (
            <>
              <DialogHeader className="space-y-3 pb-4 border-b border-[#E9E2D7]/30">
                <DialogTitle className="font-serif text-lg sm:text-xl md:text-2xl uppercase font-light text-[#3a2f28] tracking-wide flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#C9A876]" />
                  WhatsApp Messaging
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm font-light text-[#6B5E52]">
                  Send a message to {selectedContact.name} ({selectedContact.phone})
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-6">
                {/* Action Type Selector */}
                <div className="space-y-3">
                  <Label className="text-xs font-light text-[#6E5A4F] tracking-wider uppercase">
                    Choose Action Type
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    <button
                      onClick={() => setSelectedAction("direct")}
                      className={`p-3 sm:p-4 rounded-[16px] backdrop-blur-xl border transition-all duration-700 ${
                        selectedAction === "direct"
                          ? "bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 border-[#D8C8A8]/50 shadow-[0_8px_32px_rgba(216,200,168,0.2)]"
                          : "bg-white/30 border-white/30 hover:bg-white/40"
                      }`}
                    >
                      <MessageSquare className="h-5 w-5 text-[#C9A876] mb-2" />
                      <p className="text-xs font-light text-[#3a2f28]">Direct Chat</p>
                    </button>

                    <button
                      onClick={() => setSelectedAction("ai")}
                      className={`p-3 sm:p-4 rounded-[16px] backdrop-blur-xl border transition-all duration-700 ${
                        selectedAction === "ai"
                          ? "bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 border-[#D8C8A8]/50 shadow-[0_8px_32px_rgba(216,200,168,0.2)]"
                          : "bg-white/30 border-white/30 hover:bg-white/40"
                      }`}
                    >
                      <Bot className="h-5 w-5 text-[#C9A876] mb-2" />
                      <p className="text-xs font-light text-[#3a2f28]">Ask AI</p>
                    </button>

                    <button
                      onClick={() => setSelectedAction("automation")}
                      className={`p-3 sm:p-4 rounded-[16px] backdrop-blur-xl border transition-all duration-700 ${
                        selectedAction === "automation"
                          ? "bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 border-[#D8C8A8]/50 shadow-[0_8px_32px_rgba(216,200,168,0.2)]"
                          : "bg-white/30 border-white/30 hover:bg-white/40"
                      }`}
                    >
                      <Zap className="h-5 w-5 text-[#C9A876] mb-2" />
                      <p className="text-xs font-light text-[#3a2f28]">Automation</p>
                    </button>

                    <button
                      onClick={() => setSelectedAction("campaign")}
                      className={`p-3 sm:p-4 rounded-[16px] backdrop-blur-xl border transition-all duration-700 ${
                        selectedAction === "campaign"
                          ? "bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 border-[#D8C8A8]/50 shadow-[0_8px_32px_rgba(216,200,168,0.2)]"
                          : "bg-white/30 border-white/30 hover:bg-white/40"
                      }`}
                    >
                      <Target className="h-5 w-5 text-[#C9A876] mb-2" />
                      <p className="text-xs font-light text-[#3a2f28]">Campaign</p>
                    </button>
                  </div>
                </div>

                {/* Direct Chat Interface */}
                {selectedAction === "direct" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="whatsapp-message"
                        className="text-xs font-light text-[#6E5A4F] tracking-wider uppercase"
                      >
                        Your Message
                      </Label>
                      <Textarea
                        id="whatsapp-message"
                        value={whatsappMessage}
                        onChange={(e) => setWhatsappMessage(e.target.value)}
                        placeholder="Type your WhatsApp message here..."
                        rows={6}
                        className="rounded-[16px] backdrop-blur-xl bg-white/50 border-0 text-sm font-light text-[#3a2f28] resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_3px_rgba(216,200,168,0.2)]"
                      />
                    </div>

                    <div className="rounded-[16px] backdrop-blur-xl bg-gradient-to-br from-[#D8C8A8]/10 to-[#C9A876]/5 p-4 border border-[#D8C8A8]/20">
                      <p className="text-xs font-light text-[#6B5E52] leading-relaxed">
                        Your message will be sent directly to {selectedContact.name} via WhatsApp. You'll be able to
                        continue the conversation in the Service Inbox.
                      </p>
                    </div>

                    <Button
                      onClick={handleSendWhatsApp}
                      disabled={!whatsappMessage.trim()}
                      className="w-full h-12 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-[1.02] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send WhatsApp Message
                    </Button>
                  </div>
                )}

                {/* AI Delegation Interface */}
                {selectedAction === "ai" && (
                  <div className="space-y-4">
                    <div className="rounded-[16px] backdrop-blur-xl bg-gradient-to-br from-[#D8C8A8]/10 to-[#C9A876]/5 p-5 border border-[#D8C8A8]/20">
                      <div className="flex items-start gap-3 mb-4">
                        <Bot className="h-6 w-6 text-[#C9A876] flex-shrink-0 mt-0.5" />
                        <div className="space-y-2">
                          <h4 className="text-sm font-light text-[#3a2f28] tracking-wide">AI-Powered Handling</h4>
                          <p className="text-xs font-light text-[#6B5E52] leading-relaxed">
                            Let ATTACHAI's intelligent assistant handle this conversation. The AI will:
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-9">
                        <li className="flex items-start gap-2 text-xs font-light text-[#6B5E52]">
                          <Check className="h-3.5 w-3.5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          <span>Respond using your brand voice and knowledge base</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs font-light text-[#6B5E52]">
                          <Check className="h-3.5 w-3.5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          <span>Handle booking requests, amenity questions, and service inquiries</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs font-light text-[#6B5E52]">
                          <Check className="h-3.5 w-3.5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          <span>Escalate to human staff if complex issues arise</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs font-light text-[#6B5E52]">
                          <Check className="h-3.5 w-3.5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          <span>Learn from {selectedContact.name}'s preferences and history</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="ai-context"
                        className="text-xs font-light text-[#6E5A4F] tracking-wider uppercase"
                      >
                        Additional Context for AI (Optional)
                      </Label>
                      <Textarea
                        id="ai-context"
                        placeholder="Add any specific instructions or context for the AI..."
                        rows={4}
                        className="rounded-[16px] backdrop-blur-xl bg-white/50 border-0 text-sm font-light text-[#3a2f28] resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_3px_rgba(216,200,168,0.2)]"
                      />
                    </div>

                    <Button
                      onClick={handleAIDelegation}
                      className="w-full h-12 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-[1.02] text-sm"
                    >
                      <Bot className="mr-2 h-4 w-4" />
                      Activate AI Handling
                    </Button>
                  </div>
                )}

                {/* Automation Setup Interface */}
                {selectedAction === "automation" && (
                  <div className="space-y-4">
                    <div className="rounded-[16px] backdrop-blur-xl bg-gradient-to-br from-[#D8C8A8]/10 to-[#C9A876]/5 p-5 border border-[#D8C8A8]/20">
                      <div className="flex items-start gap-3 mb-4">
                        <Zap className="h-6 w-6 text-[#C9A876] flex-shrink-0 mt-0.5" />
                        <div className="space-y-2">
                          <h4 className="text-sm font-light text-[#3a2f28] tracking-wide">Setup Automation Rules</h4>
                          <p className="text-xs font-light text-[#6B5E52] leading-relaxed">
                            Create automated workflows for {selectedContact.name}. Examples include:
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-9">
                        <li className="flex items-start gap-2 text-xs font-light text-[#6B5E52]">
                          <Zap className="h-3.5 w-3.5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          <span>Send welcome message when they check in</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs font-light text-[#6B5E52]">
                          <Zap className="h-3.5 w-3.5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          <span>Auto-escalate VIP requests to senior staff</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs font-light text-[#6B5E52]">
                          <Zap className="h-3.5 w-3.5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          <span>Send follow-up messages after checkout</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs font-light text-[#6B5E52]">
                          <Zap className="h-3.5 w-3.5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          <span>Trigger notifications based on booking patterns</span>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-[16px] backdrop-blur-xl bg-white/30 p-4 border border-white/30">
                      <p className="text-xs font-light text-[#6B5E52] leading-relaxed mb-3">
                        You'll be redirected to the Automation Rules page where you can create custom workflows for this
                        contact.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-light text-[#8B7355]">
                        <Activity className="h-3.5 w-3.5" />
                        <span>Current automations: 0 active rules</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleSetupAutomation}
                      className="w-full h-12 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-[1.02] text-sm"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Setup Automation Rules
                    </Button>
                  </div>
                )}

                {/* Campaign Creation Interface */}
                {selectedAction === "campaign" && (
                  <div className="space-y-4">
                    <div className="rounded-[16px] backdrop-blur-xl bg-gradient-to-br from-[#D8C8A8]/10 to-[#C9A876]/5 p-5 border border-[#D8C8A8]/20">
                      <div className="flex items-start gap-3 mb-4">
                        <Target className="h-6 w-6 text-[#C9A876] flex-shrink-0 mt-0.5" />
                        <div className="space-y-2">
                          <h4 className="text-sm font-light text-[#3a2f28] tracking-wide">Add to Campaign</h4>
                          <p className="text-xs font-light text-[#6B5E52] leading-relaxed">
                            Include {selectedContact.name} in a targeted WhatsApp campaign. Campaign features:
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-9">
                        <li className="flex items-start gap-2 text-xs font-light text-[#6B5E52]">
                          <Target className="h-3.5 w-3.5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          <span>Curated messaging based on guest preferences</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs font-light text-[#6B5E52]">
                          <Target className="h-3.5 w-3.5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          <span>Scheduled delivery at optimal times</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs font-light text-[#6B5E52]">
                          <Target className="h-3.5 w-3.5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          <span>Track engagement and responses</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs font-light text-[#6B5E52]">
                          <Target className="h-3.5 w-3.5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                          <span>Intelligent follow-up sequences</span>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-[16px] backdrop-blur-xl bg-white/30 p-4 border border-white/30">
                      <p className="text-xs font-light text-[#6B5E52] leading-relaxed mb-3">
                        You'll be redirected to the Campaigns page where you can create a new campaign or add this
                        contact to an existing one.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-light text-[#8B7355]">
                        <Send className="h-3.5 w-3.5" />
                        <span>Contact is in 0 active campaigns</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleCreateCampaign}
                      className="w-full h-12 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-[1.02] text-sm"
                    >
                      <Target className="mr-2 h-4 w-4" />
                      Create Campaign
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Tag Dialog */}
      <Dialog open={showAddTagDialog} onOpenChange={setShowAddTagDialog}>
        <DialogContent className="max-w-md rounded-[20px] md:rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl md:text-2xl font-normal text-[#3a2f28] tracking-wide">
              Add Custom Tag
            </DialogTitle>
            <DialogDescription className="text-xs md:text-sm font-normal text-[#6B5E52]">
              Create a new tag to organize your contacts
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tag-name" className="text-xs font-normal text-[#6E5A4F] tracking-wider uppercase">
                Tag Name
              </Label>
              <Input
                id="tag-name"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="e.g., Premium Member, Regular Guest"
                className="h-10 rounded-full backdrop-blur-xl bg-white/50 border-0 text-sm font-normal text-[#3a2f28]"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddTag()
                  }
                }}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => setShowAddTagDialog(false)}
              variant="outline"
              className="w-full sm:w-auto h-10 rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddTag}
              disabled={
                !newTagName.trim() || availableTags.some((tag) => tag.toLowerCase() === newTagName.trim().toLowerCase())
              }
              className="w-full sm:w-auto h-10 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40"
            >
              Add Tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showBulkTagDialog} onOpenChange={setShowBulkTagDialog}>
        <DialogContent className="w-[calc(100vw-32px)] max-w-[95vw] sm:max-w-md rounded-[20px] md:rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg sm:text-xl md:text-2xl font-normal text-[#3a2f28] tracking-wide">
              Add Tags to Contacts
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm font-normal text-[#6B5E52]">
              Adding tags to {selectedContacts.length} {selectedContacts.length === 1 ? "contact" : "contacts"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-xs font-normal text-[#6E5A4F] tracking-wider uppercase">Select Tags to Add</Label>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {availableTags.map((tag) => (
                  <div
                    key={tag}
                    onClick={() => toggleBulkTag(tag)}
                    className={`p-3 rounded-[14px] backdrop-blur-xl border cursor-pointer transition-all duration-300 ${
                      selectedTagsToAdd.includes(tag)
                        ? "bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 border-[#D8C8A8]/50 shadow-[0_4px_20px_rgba(216,200,168,0.2)]"
                        : "bg-white/30 border-white/30 hover:bg-white/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-normal text-[#3a2f28]">{tag}</span>
                      {selectedTagsToAdd.includes(tag) && <Check className="h-4 w-4 text-[#C9A876]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[14px] backdrop-blur-xl bg-gradient-to-br from-[#D8C8A8]/10 to-[#C9A876]/5 p-3 border border-[#D8C8A8]/20">
              <p className="text-xs font-normal text-[#6B5E52]">
                Selected tags will be added to all {selectedContacts.length} contacts. Existing tags will be preserved.
              </p>
            </div>

            <button
              onClick={() => setShowAddTagDialog(true)}
              className="w-full px-4 py-2.5 rounded-full backdrop-blur-xl bg-white/40 text-[#6B5E52] text-xs font-normal tracking-wide shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/30 hover:bg-white/50 transition-all duration-700 flex items-center justify-center gap-2"
            >
              <Plus className="h-3.5 w-3.5" />
              Create New Tag
            </button>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => {
                setShowBulkTagDialog(false)
                setSelectedTagsToAdd([])
              }}
              variant="outline"
              className="w-full sm:w-auto h-10 rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApplyBulkTags}
              disabled={selectedTagsToAdd.length === 0}
              className="w-full sm:w-auto h-10 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40 disabled:opacity-50"
            >
              Add {selectedTagsToAdd.length} {selectedTagsToAdd.length === 1 ? "Tag" : "Tags"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddToListDialog} onOpenChange={setShowAddToListDialog}>
        <DialogContent className="w-[calc(100vw-32px)] max-w-[95vw] sm:max-w-md rounded-[20px] md:rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg sm:text-xl md:text-2xl font-normal text-[#3a2f28] tracking-wide">
              Add to List
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm font-normal text-[#6B5E52]">
              Add {selectedContact?.name} to tags or campaign lists
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Mode Selector */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setAddToListMode("tags")
                  setSelectedTagsToAdd([])
                  setSelectedCampaignList("")
                  setShowNewTagInput(false)
                  setNewTagInputValue("")
                }}
                className={`p-3 sm:p-4 rounded-[16px] backdrop-blur-xl border transition-all duration-700 ${
                  addToListMode === "tags"
                    ? "bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 border-[#D8C8A8]/50 shadow-[0_8px_32px_rgba(216,200,168,0.2)]"
                    : "bg-white/30 border-white/30 hover:bg-white/40"
                }`}
              >
                <Tag className="h-5 w-5 text-[#C9A876] mb-2 mx-auto" />
                <p className="text-xs font-light text-[#3a2f28] text-center">Add Tags</p>
              </button>

              <button
                onClick={() => {
                  setAddToListMode("campaign")
                  setSelectedTagsToAdd([])
                  setSelectedCampaignList("")
                  setShowNewTagInput(false)
                  setNewTagInputValue("")
                }}
                className={`p-3 sm:p-4 rounded-[16px] backdrop-blur-xl border transition-all duration-700 ${
                  addToListMode === "campaign"
                    ? "bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 border-[#D8C8A8]/50 shadow-[0_8px_32px_rgba(216,200,168,0.2)]"
                    : "bg-white/30 border-white/30 hover:bg-white/40"
                }`}
              >
                <Target className="h-5 w-5 text-[#C9A876] mb-2 mx-auto" />
                <p className="text-xs font-light text-[#3a2f28] text-center">Add to Campaign</p>
              </button>
            </div>

            {/* Tags Mode */}
            {addToListMode === "tags" && (
              <div className="space-y-3">
                <Label className="text-xs font-normal text-[#6E5A4F] tracking-wider uppercase">Select Tags</Label>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {availableTags.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => toggleBulkTag(tag)}
                      className={`p-3 rounded-[14px] backdrop-blur-xl border cursor-pointer transition-all duration-300 ${
                        selectedTagsToAdd.includes(tag)
                          ? "bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 border-[#D8C8A8]/50 shadow-[0_4px_20px_rgba(216,200,168,0.2)]"
                          : "bg-white/30 border-white/30 hover:bg-white/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-normal text-[#3a2f28]">{tag}</span>
                        {selectedTagsToAdd.includes(tag) && <Check className="h-4 w-4 text-[#C9A876]" />}
                      </div>
                    </div>
                  ))}
                </div>

                {showNewTagInput ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        value={newTagInputValue}
                        onChange={(e) => setNewTagInputValue(e.target.value)}
                        placeholder="Enter new tag name..."
                        className="h-10 rounded-full backdrop-blur-xl bg-white/50 border-0 text-sm font-normal text-[#3a2f28]"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleCreateNewTag()
                          }
                        }}
                        autoFocus
                      />
                      <button
                        onClick={handleCreateNewTag}
                        disabled={
                          !newTagInputValue.trim() ||
                          availableTags.some((tag) => tag.toLowerCase() === newTagInputValue.trim().toLowerCase())
                        }
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_8px_30px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setShowNewTagInput(false)
                          setNewTagInputValue("")
                        }}
                        className="flex-shrink-0 w-10 h-10 rounded-full backdrop-blur-xl bg-white/40 text-[#6B5E52] border border-white/30 hover:bg-white/50 transition-all duration-700 flex items-center justify-center"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowNewTagInput(true)}
                    className="w-full px-4 py-2.5 rounded-full backdrop-blur-xl bg-white/40 text-[#6B5E52] text-xs font-normal tracking-wide shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/30 hover:bg-white/50 transition-all duration-700 flex items-center justify-center gap-2"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Create New Tag
                  </button>
                )}
              </div>
            )}

            {/* Campaign Mode */}
            {addToListMode === "campaign" && (
              <div className="space-y-3">
                <Label className="text-xs font-normal text-[#6E5A4F] tracking-wider uppercase">
                  Select Campaign List
                </Label>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {availableCampaignLists.map((campaign) => (
                    <div
                      key={campaign}
                      onClick={() => setSelectedCampaignList(campaign)}
                      className={`p-3 rounded-[14px] backdrop-blur-xl border cursor-pointer transition-all duration-300 ${
                        selectedCampaignList === campaign
                          ? "bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 border-[#D8C8A8]/50 shadow-[0_4px_20px_rgba(216,200,168,0.2)]"
                          : "bg-white/30 border-white/30 hover:bg-white/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-normal text-[#3a2f28]">{campaign}</span>
                        {selectedCampaignList === campaign && <Check className="h-4 w-4 text-[#C9A876]" />}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-[14px] backdrop-blur-xl bg-gradient-to-br from-[#D8C8A8]/10 to-[#C9A876]/5 p-3 border border-[#D8C8A8]/20">
                  <p className="text-xs font-normal text-[#6B5E52]">
                    Adding {selectedContact?.name} to a campaign will include them in the next scheduled broadcast.
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => {
                setShowAddToListDialog(false)
                setSelectedTagsToAdd([])
                setSelectedCampaignList("")
                setShowNewTagInput(false)
                setNewTagInputValue("")
              }}
              variant="outline"
              className="w-full sm:w-auto h-10 rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToList}
              disabled={
                (addToListMode === "tags" && selectedTagsToAdd.length === 0) ||
                (addToListMode === "campaign" && !selectedCampaignList)
              }
              className="w-full sm:w-auto h-10 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40 disabled:opacity-50"
            >
              {addToListMode === "tags"
                ? `Add ${selectedTagsToAdd.length} ${selectedTagsToAdd.length === 1 ? "Tag" : "Tags"}`
                : "Add to Campaign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNewContactModal} onOpenChange={setShowNewContactModal}>
        <DialogContent className="w-[calc(100vw-32px)] max-w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-[20px] sm:rounded-[24px] md:rounded-[28px] backdrop-blur-3xl bg-white/95 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.15)] p-4 sm:p-6">
          <DialogHeader className="space-y-2 pb-4 sm:pb-6 border-b border-[#E9E2D7]/30">
            <DialogTitle className="font-serif text-lg sm:text-xl md:text-2xl uppercase font-light text-[#3a2f28] tracking-wide">
              Add New Contact
            </DialogTitle>
            <p className="text-xs sm:text-sm font-light text-[#6B5E52]">Create a new contact with their details</p>
          </DialogHeader>

          <div className="space-y-6 sm:space-y-6 py-4 sm:py-6">
            {/* Basic Information */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-serif text-[10px] sm:text-xs font-light text-[#6E5A4F] tracking-wider uppercase">
                Basic Information
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase block mb-2">
                    Full Name *
                  </label>
                  <Input
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    placeholder="Enter full name"
                    className="rounded-full bg-white/50 border-[#E9E2D7]/40 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase block mb-2">
                      Phone / WhatsApp *
                    </label>
                    <Input
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="rounded-full bg-white/50 border-[#E9E2D7]/40 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase block mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      placeholder="email@example.com"
                      className="rounded-full bg-white/50 border-[#E9E2D7]/40 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase block mb-2">
                      Role *
                    </label>
                    <Select
                      value={newContact.role}
                      onValueChange={(value: "Guest" | "Member" | "Staff" | "Owner" | "Lead") =>
                        setNewContact({ ...newContact, role: value })
                      }
                    >
                      <SelectTrigger className="rounded-full bg-white/50 border-[#E9E2D7]/40 font-serif uppercase tracking-widest text-[10px] sm:text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl backdrop-blur-3xl bg-white/95 border-[#E9E2D7]/40">
                        <SelectItem
                          value="Guest"
                          className="font-serif uppercase tracking-widest text-[10px] sm:text-xs"
                        >
                          GUEST
                        </SelectItem>
                        <SelectItem
                          value="Member"
                          className="font-serif uppercase tracking-widest text-[10px] sm:text-xs"
                        >
                          MEMBER
                        </SelectItem>
                        <SelectItem
                          value="Staff"
                          className="font-serif uppercase tracking-widest text-[10px] sm:text-xs"
                        >
                          STAFF
                        </SelectItem>
                        <SelectItem
                          value="Owner"
                          className="font-serif uppercase tracking-widest text-[10px] sm:text-xs"
                        >
                          OWNER
                        </SelectItem>
                        <SelectItem
                          value="Lead"
                          className="font-serif uppercase tracking-widest text-[10px] sm:text-xs"
                        >
                          LEAD
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase block mb-2">
                      Status *
                    </label>
                    <Select
                      value={newContact.status}
                      onValueChange={(value: "In-house" | "Upcoming" | "Past" | "Lead") =>
                        setNewContact({ ...newContact, status: value })
                      }
                    >
                      <SelectTrigger className="rounded-full bg-white/50 border-[#E9E2D7]/40 font-serif uppercase tracking-widest text-[10px] sm:text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl backdrop-blur-3xl bg-white/95 border-[#E9E2D7]/40">
                        <SelectItem
                          value="Lead"
                          className="font-serif uppercase tracking-widest text-[10px] sm:text-xs"
                        >
                          LEAD
                        </SelectItem>
                        <SelectItem
                          value="Upcoming"
                          className="font-serif uppercase tracking-widest text-[10px] sm:text-xs"
                        >
                          UPCOMING
                        </SelectItem>
                        <SelectItem
                          value="In-house"
                          className="font-serif uppercase tracking-widest text-[10px] sm:text-xs"
                        >
                          IN-HOUSE
                        </SelectItem>
                        <SelectItem
                          value="Past"
                          className="font-serif uppercase tracking-widest text-[10px] sm:text-xs"
                        >
                          PAST
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-serif text-[10px] sm:text-xs font-light text-[#6E5A4F] tracking-wider uppercase">
                Additional Details
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase block mb-2">
                    Language(s)
                  </label>
                  <Input
                    value={newContact.language}
                    onChange={(e) => setNewContact({ ...newContact, language: e.target.value })}
                    placeholder="e.g. English, Spanish"
                    className="rounded-full bg-white/50 border-[#E9E2D7]/40 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase block mb-2">
                      Home City
                    </label>
                    <Input
                      value={newContact.homeCity}
                      onChange={(e) => setNewContact({ ...newContact, homeCity: e.target.value })}
                      placeholder="City"
                      className="rounded-full bg-white/50 border-[#E9E2D7]/40 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase block mb-2">
                      Home Country
                    </label>
                    <Input
                      value={newContact.homeCountry}
                      onChange={(e) => setNewContact({ ...newContact, homeCountry: e.target.value })}
                      placeholder="Country"
                      className="rounded-full bg-white/50 border-[#E9E2D7]/40 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-light text-[#6E5A4F] tracking-wide uppercase block mb-2">
                    Tags (comma separated)
                  </label>
                  <Input
                    placeholder="VIP, Repeat, Float Suite"
                    onChange={(e) => {
                      const tags = e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter((t) => t)
                      setNewContact({ ...newContact, tags })
                    }}
                    className="rounded-full bg-white/50 border-[#E9E2D7]/40 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 sm:pt-6 border-t border-[#E9E2D7]/30">
            <Button
              variant="outline"
              onClick={() => {
                setShowNewContactModal(false)
                setNewContact({
                  name: "",
                  phone: "",
                  email: "",
                  role: "Guest",
                  tags: [],
                  status: "Lead",
                  language: "English",
                  homeCity: "",
                  homeCountry: "",
                  crmSource: "Manual Entry",
                })
              }}
              className="rounded-full px-6 font-serif uppercase tracking-widest text-[10px] sm:text-xs border-[#E9E2D7]/40"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // In a real app, this would save to backend
                console.log("New contact:", newContact)
                setShowNewContactModal(false)
                setNewContact({
                  name: "",
                  phone: "",
                  email: "",
                  role: "Guest",
                  tags: [],
                  status: "Lead",
                  language: "English",
                  homeCity: "",
                  homeCountry: "",
                  crmSource: "Manual Entry",
                })
              }}
              disabled={!newContact.name || !newContact.phone || !newContact.email}
              className="rounded-full px-6 bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_8px_30px_rgba(216,200,168,0.4)] border border-white/40 font-serif uppercase tracking-widest text-[10px] sm:text-xs disabled:opacity-50"
            >
              Create Contact
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
