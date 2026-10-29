"use client"

import * as React from "react"
import { Search, ChevronDown, UserCircle, Users2, AlertCircle, Phone, MessageCircle, Mail, Send, CircleDot, XCircle, FileText, Waves, ExternalLink, X } from 'lucide-react'
import { AiWebIcon } from '@/components/ui/ai-web-icon'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatusChip } from '@/components/ui/status-chip'
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
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const handlerConfig = {
  AI: {
    icon: AiWebIcon,
    bg: "bg-[#D8C8A8]/20",
    text: "text-[#C9A876]",
  },
  Human: {
    icon: UserCircle,
    bg: "bg-[#A08968]/15",
    text: "text-[#8B7355]",
  },
  Hybrid: {
    icon: Users2,
    bg: "bg-[#D5C8BA]/20",
    text: "text-[#9B8370]",
  },
}

const actionTypeConfig = {
  "Room Service": { icon: CircleDot, color: "text-[#D8C8A8]" },
  "Reservation": { icon: FileText, color: "text-[#C9A876]" },
  "Spa Booking": { icon: Waves, color: "text-[#B8A896]" },
  "Concierge": { icon: Send, color: "text-[#A08968]" },
  "Complaint": { icon: AlertCircle, color: "text-[#D4A574]" },
  "General Inquiry": { icon: MessageCircle, color: "text-[#C8B8A8]" },
}

const sampleActions = [
  {
    id: 1,
    guest: "Sarah Chen",
    room: "402",
    actionType: "Room Service",
    description: "Request for breakfast delivery - Continental with extra croissants",
    time: "8 mins ago",
    handler: "AI" as const,
    status: "Completed",
    priority: "Normal",
  },
  {
    id: 2,
    guest: "Michael Torres",
    room: "315",
    actionType: "Spa Booking",
    description: "Couples massage appointment requested for tomorrow at 2 PM",
    time: "15 mins ago",
    handler: "Hybrid" as const,
    status: "In Progress",
    priority: "High",
  },
  {
    id: 3,
    guest: "Emma Wilson",
    room: "528",
    actionType: "Concierge",
    description: "Restaurant reservation at local Michelin-star venue",
    time: "22 mins ago",
    handler: "Human" as const,
    status: "Pending",
    priority: "High",
  },
  {
    id: 4,
    guest: "James Patterson",
    room: "201",
    actionType: "Complaint",
    description: "Air conditioning not working properly in room",
    time: "35 mins ago",
    handler: "Human" as const,
    status: "In Progress",
    priority: "Urgent",
  },
  {
    id: 5,
    guest: "Lisa Rodriguez",
    room: "412",
    actionType: "General Inquiry",
    description: "Questions about checkout time and late checkout options",
    time: "1 hour ago",
    handler: "AI" as const,
    status: "Completed",
    priority: "Normal",
  },
  {
    id: 6,
    guest: "David Kim",
    room: "307",
    actionType: "Reservation",
    description: "Additional night extension requested for weekend stay",
    time: "2 hours ago",
    handler: "Hybrid" as const,
    status: "Completed",
    priority: "Normal",
  },
]

export function ActionsPage() {
  const [selectedActionForModal, setSelectedActionForModal] = React.useState<any>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterHandler, setFilterHandler] = React.useState("all")
  const [filterStatus, setFilterStatus] = React.useState("all")

  const filteredActions = sampleActions.filter(action => {
    const matchesSearch = action.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.actionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesHandler = filterHandler === "all" || action.handler === filterHandler
    const matchesStatus = filterStatus === "all" || action.status === filterStatus
    return matchesSearch && matchesHandler && matchesStatus
  })

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl text-[#5A4A3F]">Actions</h1>
          <p className="text-sm text-[#6E5A4F]">Track and manage all guest interactions and service requests</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B7B6F]" />
            <Input
              placeholder="Search by guest, action, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/60 backdrop-blur-sm border-[#D8C8A8]/30 text-[#6E5A4F] placeholder:text-[#8B7B6F]"
            />
          </div>
          
          <Select value={filterHandler} onValueChange={setFilterHandler}>
            <SelectTrigger className="w-[160px] bg-white/60 backdrop-blur-sm border-[#D8C8A8]/30 text-[#6E5A4F]">
              <SelectValue placeholder="Handler" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Handlers</SelectItem>
              <SelectItem value="AI">AI Only</SelectItem>
              <SelectItem value="Human">Human Only</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[160px] bg-white/60 backdrop-blur-sm border-[#D8C8A8]/30 text-[#6E5A4F]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-2xl backdrop-blur-xl bg-white/40 border border-white/30 p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-light text-[#6E5A4F] uppercase tracking-wider">Total Actions</span>
              <CircleDot className="h-4 w-4 text-[#D8C8A8]" />
            </div>
            <p className="text-3xl font-light text-[#5A4A3F]">{sampleActions.length}</p>
            <p className="text-xs text-[#8B7B6F] mt-1">Last 24 hours</p>
          </div>

          <div className="rounded-2xl backdrop-blur-xl bg-white/40 border border-white/30 p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-light text-[#6E5A4F] uppercase tracking-wider">AI Handled</span>
              <AiWebIcon className="h-4 w-4 text-[#C9A876]" />
            </div>
            <p className="text-3xl font-light text-[#5A4A3F]">
              {sampleActions.filter(a => a.handler === "AI").length}
            </p>
            <p className="text-xs text-[#8B7B6F] mt-1">Fully automated</p>
          </div>

          <div className="rounded-2xl backdrop-blur-xl bg-white/40 border border-white/30 p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-light text-[#6E5A4F] uppercase tracking-wider">In Progress</span>
              <Waves className="h-4 w-4 text-[#B8A896]" />
            </div>
            <p className="text-3xl font-light text-[#5A4A3F]">
              {sampleActions.filter(a => a.status === "In Progress").length}
            </p>
            <p className="text-xs text-[#8B7B6F] mt-1">Being resolved</p>
          </div>

          <div className="rounded-2xl backdrop-blur-xl bg-white/40 border border-white/30 p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-light text-[#6E5A4F] uppercase tracking-wider">Completed</span>
              <FileText className="h-4 w-4 text-[#A08968]" />
            </div>
            <p className="text-3xl font-light text-[#5A4A3F]">
              {sampleActions.filter(a => a.status === "Completed").length}
            </p>
            <p className="text-xs text-[#8B7B6F] mt-1">Successfully resolved</p>
          </div>
        </div>

        {/* Actions List */}
        <div className="space-y-3">
          {filteredActions.map((action) => {
            const HandlerIcon = handlerConfig[action.handler].icon
            const ActionIcon = actionTypeConfig[action.actionType as keyof typeof actionTypeConfig]?.icon || CircleDot
            const actionColor = actionTypeConfig[action.actionType as keyof typeof actionTypeConfig]?.color || "text-[#D8C8A8]"

            return (
              <div
                key={action.id}
                onClick={() => setSelectedActionForModal(action)}
                className="rounded-2xl backdrop-blur-xl bg-white/40 border border-white/30 p-5 shadow-lg hover:bg-white/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-xl ${handlerConfig[action.handler].bg}`}>
                      <HandlerIcon className={`h-5 w-5 ${handlerConfig[action.handler].text}`} />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-lg text-[#5A4A3F]">{action.guest}</h3>
                        <Badge variant="outline" className="text-[10px] font-light border-[#D8C8A8]/30 text-[#8B7B6F]">
                          Room {action.room}
                        </Badge>
                        {action.priority === "Urgent" && (
                          <StatusChip variant="urgent">Urgent</StatusChip>
                        )}
                        {action.priority === "High" && (
                          <StatusChip variant="bronze">High Priority</StatusChip>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <ActionIcon className={`h-4 w-4 ${actionColor}`} />
                        <span className="text-sm font-medium text-[#6E5A4F]">{action.actionType}</span>
                      </div>

                      <p className="text-sm text-[#6E5A4F] leading-relaxed">{action.description}</p>

                      <div className="flex items-center gap-4 text-xs text-[#8B7B6F]">
                        <span>{action.time}</span>
                        <span>•</span>
                        <span>{action.handler} Handler</span>
                        <span>•</span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-light ${
                            action.status === "Completed"
                              ? "bg-[#B8D4A8]/20 text-[#6B8E4E] border-[#B8D4A8]/30"
                              : action.status === "In Progress"
                              ? "bg-[#D8C8A8]/20 text-[#8B7355] border-[#D8C8A8]/30"
                              : "bg-[#D8D4C8]/20 text-[#8B8370] border-[#D8D4C8]/30"
                          }`}
                        >
                          {action.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <ExternalLink className="h-4 w-4 text-[#8B7B6F]" />
                </div>
              </div>
            )
          })}

          {filteredActions.length === 0 && (
            <div className="rounded-2xl backdrop-blur-xl bg-white/40 border border-white/30 p-12 text-center shadow-lg">
              <AlertCircle className="h-12 w-12 text-[#8B7B6F] mx-auto mb-4" />
              <p className="text-lg text-[#6E5A4F]">No actions found</p>
              <p className="text-sm text-[#8B7B6F] mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Detail Modal */}
      <Dialog open={!!selectedActionForModal} onOpenChange={() => setSelectedActionForModal(null)}>
        <DialogContent className="backdrop-blur-2xl bg-white/70 border-white/40 shadow-2xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-[#5A4A3F]">
              {selectedActionForModal?.actionType}
            </DialogTitle>
            <DialogDescription className="text-[#6E5A4F]">
              Action details for {selectedActionForModal?.guest} - Room {selectedActionForModal?.room}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-[#8B7B6F]">Description</Label>
              <p className="text-sm text-[#6E5A4F] leading-relaxed">{selectedActionForModal?.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-[#8B7B6F]">Handler</Label>
                <Badge className={`${handlerConfig[selectedActionForModal?.handler as keyof typeof handlerConfig]?.bg} ${handlerConfig[selectedActionForModal?.handler as keyof typeof handlerConfig]?.text} border-0`}>
                  {selectedActionForModal?.handler}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-[#8B7B6F]">Status</Label>
                <Badge
                  variant="outline"
                  className={`${
                    selectedActionForModal?.status === "Completed"
                      ? "bg-[#B8D4A8]/20 text-[#6B8E4E] border-[#B8D4A8]/30"
                      : selectedActionForModal?.status === "In Progress"
                      ? "bg-[#D8C8A8]/20 text-[#8B7355] border-[#D8C8A8]/30"
                      : "bg-[#D8D4C8]/20 text-[#8B8370] border-[#D8D4C8]/30"
                  }`}
                >
                  {selectedActionForModal?.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-[#8B7B6F]">Priority</Label>
                <Badge
                  variant="outline"
                  className={`${
                    selectedActionForModal?.priority === "Urgent"
                      ? "bg-[#D4A574]/20 text-[#D4A574] border-[#D4A574]/30"
                      : selectedActionForModal?.priority === "High"
                      ? "bg-[#C9A876]/20 text-[#C9A876] border-[#C9A876]/30"
                      : "bg-[#D8C8A8]/20 text-[#8B7355] border-[#D8C8A8]/30"
                  }`}
                >
                  {selectedActionForModal?.priority}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-[#8B7B6F]">Time</Label>
                <p className="text-sm text-[#6E5A4F]">{selectedActionForModal?.time}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedActionForModal(null)}
              className="border-[#D8C8A8]/30 text-[#6E5A4F] hover:bg-[#D8C8A8]/10"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
