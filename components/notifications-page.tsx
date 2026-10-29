"use client"

import * as React from "react"
import { Bell, AlertCircle, MessageCircle, XCircle, CircleDot, UserCircle, Check, Archive, Trash2, Filter, Search, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface NotificationAction {
  id: string
  type: 'viewed' | 'clicked' | 'resolved' | 'dismissed'
  timestamp: string
  user?: string
}

interface Notification {
  id: string
  type: 'escalation' | 'failed' | 'conversation' | 'mention' | 'success'
  title: string
  message: string
  timestamp: string
  read: boolean
  archived: boolean
  actionLink?: string
  itemId?: string
  itemType?: 'conversation' | 'action' | 'automation-rule' | 'contact'
  actions: NotificationAction[]
  relatedConversation?: {
    guestName: string
    lastMessage: string
    status: 'open' | 'resolved' | 'pending'
  }
}

const allNotifications: Notification[] = [
  {
    id: "1",
    type: "escalation",
    title: "Human Review Required",
    message: "Private chef request needs menu approval",
    timestamp: "14m ago",
    read: false,
    archived: false,
    actionLink: "/service-inbox?item=action-1",
    itemId: "action-1",
    itemType: "action",
    actions: [],
    relatedConversation: {
      guestName: "Sarah Chen",
      lastMessage: "Could I arrange for a private chef for dinner tomorrow?",
      status: "pending"
    }
  },
  {
    id: "2",
    type: "failed",
    title: "Action Failed",
    message: "Conscious Transit booking to LAX timed out",
    timestamp: "24m ago",
    read: false,
    archived: false,
    actionLink: "/automation-rules?rule=3",
    itemId: "3",
    itemType: "automation-rule",
    actions: [
      { id: "a1", type: "viewed", timestamp: "22m ago" }
    ],
    relatedConversation: {
      guestName: "Michael Roberts",
      lastMessage: "I need airport transport for 3pm departure",
      status: "open"
    }
  },
  {
    id: "3",
    type: "conversation",
    title: "New Conversation",
    message: "Sarah Chen sent a new message",
    timestamp: "31m ago",
    read: false,
    archived: false,
    actionLink: "/service-inbox?item=conv-1",
    itemId: "conv-1",
    itemType: "conversation",
    actions: [],
    relatedConversation: {
      guestName: "Sarah Chen",
      lastMessage: "Thank you! Looking forward to the Float Suite session.",
      status: "open"
    }
  },
  {
    id: "4",
    type: "escalation",
    title: "Payment Approval Needed",
    message: "$1,850 Regeneration Floor package awaiting approval",
    timestamp: "44m ago",
    read: false,
    archived: false,
    actionLink: "/service-inbox?item=action-2",
    itemId: "action-2",
    itemType: "action",
    actions: [],
    relatedConversation: {
      guestName: "Julia Davis",
      lastMessage: "Can we upgrade to the full day package?",
      status: "pending"
    }
  },
  {
    id: "5",
    type: "mention",
    title: "Team Mention",
    message: "Grace assigned you a Neural Programming consultation",
    timestamp: "1h ago",
    read: true,
    archived: false,
    actionLink: "/service-inbox?assigned=true",
    itemType: "action",
    actions: [
      { id: "a2", type: "viewed", timestamp: "58m ago", user: "You" },
      { id: "a3", type: "clicked", timestamp: "57m ago", user: "You" }
    ]
  },
  {
    id: "6",
    type: "success",
    title: "Action Completed",
    message: "Float Suite booking confirmed for Sarah Chen",
    timestamp: "2h ago",
    read: true,
    archived: false,
    actionLink: "/service-inbox?item=conv-1",
    itemId: "conv-1",
    itemType: "conversation",
    actions: [
      { id: "a4", type: "viewed", timestamp: "1h 58m ago", user: "You" },
      { id: "a5", type: "clicked", timestamp: "1h 55m ago", user: "You" },
      { id: "a6", type: "resolved", timestamp: "1h 50m ago", user: "You" }
    ],
    relatedConversation: {
      guestName: "Sarah Chen",
      lastMessage: "Perfect, thank you so much!",
      status: "resolved"
    }
  },
  {
    id: "7",
    type: "escalation",
    title: "VIP Guest Arrival",
    message: "High-touch guest checking in - preferences loaded",
    timestamp: "3h ago",
    read: true,
    archived: false,
    actionLink: "/contacts?vip=true",
    itemType: "contact",
    actions: [
      { id: "a7", type: "viewed", timestamp: "2h 55m ago", user: "You" },
      { id: "a8", type: "resolved", timestamp: "2h 45m ago", user: "You" }
    ]
  },
  {
    id: "8",
    type: "conversation",
    title: "Inquiry Response Needed",
    message: "New member asking about Workroom availability",
    timestamp: "4h ago",
    read: true,
    archived: false,
    actionLink: "/service-inbox?item=conv-5",
    itemId: "conv-5",
    itemType: "conversation",
    actions: [
      { id: "a9", type: "viewed", timestamp: "3h 58m ago", user: "You" },
      { id: "a10", type: "clicked", timestamp: "3h 55m ago", user: "You" },
      { id: "a11", type: "resolved", timestamp: "3h 50m ago", user: "Grace" }
    ],
    relatedConversation: {
      guestName: "Emma Wilson",
      lastMessage: "Do you have Workroom availability tomorrow?",
      status: "resolved"
    }
  }
]

const notificationIcons = {
  escalation: AlertCircle,
  failed: XCircle,
  conversation: MessageCircle,
  mention: UserCircle,
  success: CircleDot,
}

const notificationColors = {
  escalation: {
    bg: "bg-[#D8C8A8]/20",
    text: "text-[#C9A876]",
    border: "border-[#D8C8A8]/30"
  },
  failed: {
    bg: "bg-[#DCC5BA]/20",
    text: "text-[#B08080]",
    border: "border-[#DCC5BA]/30"
  },
  conversation: {
    bg: "bg-[#D5C8BA]/20",
    text: "text-[#9B8370]",
    border: "border-[#D5C8BA]/30"
  },
  mention: {
    bg: "bg-[#A08968]/15",
    text: "text-[#8B7355]",
    border: "border-[#A08968]/25"
  },
  success: {
    bg: "bg-[#D8C8A8]/15",
    text: "text-[#A08968]",
    border: "border-[#D8C8A8]/25"
  },
}

const actionLabels = {
  viewed: 'Viewed',
  clicked: 'Opened',
  resolved: 'Resolved',
  dismissed: 'Dismissed'
}

export function NotificationsPage() {
  const [filter, setFilter] = React.useState<'all' | 'unread' | 'archived'>('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [notifications, setNotifications] = React.useState(allNotifications)

  const filteredNotifications = notifications.filter(notification => {
    // Filter by read/archived status
    if (filter === 'unread' && notification.read) return false
    if (filter === 'archived' && !notification.archived) return false
    if (filter === 'all' && notification.archived) return false
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        notification.relatedConversation?.guestName.toLowerCase().includes(query)
      )
    }
    
    return true
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const handleArchive = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, archived: true } : n)
    )
  }

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read && !n.archived).length

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-light text-[#6E5A4F] mb-2">
                Notifications
              </h1>
              <p className="text-sm font-light text-[#8B7355]">
                Track all system alerts, conversations, and actions
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                onClick={handleMarkAllRead}
                variant="outline"
                className="rounded-full px-5 py-2 text-xs font-bold border-[#C9A876]/30 text-[#6E5A4F] hover:bg-[#C9A876]/10"
              >
                Mark all as read
              </Button>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4">
            <div className="backdrop-blur-3xl bg-white/60 border border-white/60 rounded-[20px] p-4 shadow-[0_8px_32px_rgba(139,115,85,0.08)]">
              <div className="text-2xl font-serif font-light text-[#6E5A4F] mb-1">
                {notifications.filter(n => !n.archived).length}
              </div>
              <div className="text-[10px] font-serif uppercase tracking-widest text-[#8B7355]">
                Total Active
              </div>
            </div>
            <div className="backdrop-blur-3xl bg-white/60 border border-white/60 rounded-[20px] p-4 shadow-[0_8px_32px_rgba(139,115,85,0.08)]">
              <div className="text-2xl font-serif font-light text-[#C9A876] mb-1">
                {unreadCount}
              </div>
              <div className="text-[10px] font-serif uppercase tracking-widest text-[#8B7355]">
                Unread
              </div>
            </div>
            <div className="backdrop-blur-3xl bg-white/60 border border-white/60 rounded-[20px] p-4 shadow-[0_8px_32px_rgba(139,115,85,0.08)]">
              <div className="text-2xl font-serif font-light text-[#6E5A4F] mb-1">
                {notifications.filter(n => n.actions.some(a => a.type === 'resolved')).length}
              </div>
              <div className="text-[10px] font-serif uppercase tracking-widest text-[#8B7355]">
                Resolved
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button
                onClick={() => setFilter('all')}
                variant={filter === 'all' ? 'default' : 'outline'}
                className={`rounded-full px-5 py-2 text-xs font-bold ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-[#C9A876] to-[#A08968] text-white'
                    : 'border-[#C9A876]/30 text-[#6E5A4F] hover:bg-[#C9A876]/10'
                }`}
              >
                All
              </Button>
              <Button
                onClick={() => setFilter('unread')}
                variant={filter === 'unread' ? 'default' : 'outline'}
                className={`rounded-full px-5 py-2 text-xs font-bold ${
                  filter === 'unread'
                    ? 'bg-gradient-to-r from-[#C9A876] to-[#A08968] text-white'
                    : 'border-[#C9A876]/30 text-[#6E5A4F] hover:bg-[#C9A876]/10'
                }`}
              >
                Unread {unreadCount > 0 && `(${unreadCount})`}
              </Button>
              <Button
                onClick={() => setFilter('archived')}
                variant={filter === 'archived' ? 'default' : 'outline'}
                className={`rounded-full px-5 py-2 text-xs font-bold ${
                  filter === 'archived'
                    ? 'bg-gradient-to-r from-[#C9A876] to-[#A08968] text-white'
                    : 'border-[#C9A876]/30 text-[#6E5A4F] hover:bg-[#C9A876]/10'
                }`}
              >
                Archived
              </Button>
            </div>

            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B7355]" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 rounded-full border-[#C9A876]/30 bg-white/60 text-sm font-light"
              />
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="backdrop-blur-3xl bg-white/60 border border-white/60 rounded-[20px] p-12 text-center shadow-[0_8px_32px_rgba(139,115,85,0.08)]">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D8C8A8]/20 to-[#C9A876]/10 flex items-center justify-center">
                <Bell className="h-6 w-6 text-[#B8A896]" />
              </div>
              <p className="text-sm font-light text-[#8B7355]">
                No notifications found
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notificationIcons[notification.type]
              const colors = notificationColors[notification.type]
              
              return (
                <div
                  key={notification.id}
                  className={`backdrop-blur-3xl bg-white/60 border border-white/60 rounded-[20px] p-5 shadow-[0_8px_32px_rgba(139,115,85,0.08)] transition-all duration-300 ${
                    !notification.read ? 'bg-[#D8C8A8]/10' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${colors.text}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-light text-[#6E5A4F]">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-[#C9A876]" />
                            )}
                          </div>
                          <p className="text-sm font-light text-[#8B7355] mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 text-xs font-light text-[#8B7355]">
                            <Clock className="h-3 w-3" />
                            {notification.timestamp}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button
                              onClick={() => handleMarkAsRead(notification.id)}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-[#C9A876]/10"
                            >
                              <Check className="h-4 w-4 text-[#8B7355]" />
                            </Button>
                          )}
                          <Button
                            onClick={() => handleArchive(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-[#C9A876]/10"
                          >
                            <Archive className="h-4 w-4 text-[#8B7355]" />
                          </Button>
                        </div>
                      </div>

                      {/* Related Conversation */}
                      {notification.relatedConversation && (
                        <div className="bg-[#F7F4EF]/50 rounded-xl p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-serif uppercase tracking-widest text-[#8B7355]">
                              Related Conversation
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`text-[10px] px-2 py-0.5 ${
                                notification.relatedConversation.status === 'resolved'
                                  ? 'bg-[#D8C8A8]/20 text-[#A08968] border-[#D8C8A8]/30'
                                  : notification.relatedConversation.status === 'pending'
                                  ? 'bg-[#C9A876]/20 text-[#C9A876] border-[#C9A876]/30'
                                  : 'bg-[#B8A896]/20 text-[#8B7355] border-[#B8A896]/30'
                              }`}
                            >
                              {notification.relatedConversation.status}
                            </Badge>
                          </div>
                          <div>
                            <div className="text-sm font-light text-[#6E5A4F] mb-1">
                              {notification.relatedConversation.guestName}
                            </div>
                            <div className="text-xs font-light text-[#8B7355] line-clamp-1">
                              "{notification.relatedConversation.lastMessage}"
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Timeline */}
                      {notification.actions.length > 0 && (
                        <div className="border-t border-[#E9E2D7]/30 pt-3 space-y-2">
                          <div className="text-xs font-serif uppercase tracking-widest text-[#8B7355] mb-2">
                            Action History
                          </div>
                          <div className="space-y-1.5">
                            {notification.actions.map((action) => (
                              <div key={action.id} className="flex items-center gap-2 text-xs font-light text-[#8B7355]">
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  action.type === 'resolved' ? 'bg-[#A08968]' : 'bg-[#B8A896]'
                                }`} />
                                <span>{actionLabels[action.type]}</span>
                                {action.user && (
                                  <span className="text-[#B8A896]">by {action.user}</span>
                                )}
                                <span className="text-[#B8A896]">• {action.timestamp}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* View Button */}
                      {notification.actionLink && (
                        <Link href={notification.actionLink}>
                          <Button 
                            variant="outline" 
                            className="w-full rounded-full px-5 py-2 text-xs font-bold border-[#C9A876]/30 text-[#6E5A4F] hover:bg-[#C9A876]/10"
                          >
                            View {notification.itemType === 'conversation' ? 'Conversation' : 
                                  notification.itemType === 'action' ? 'Action' :
                                  notification.itemType === 'automation-rule' ? 'Rule' : 'Details'}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
