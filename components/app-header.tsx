"use client"

import * as React from "react"
import { Bell, ChevronDown, AlertCircle, MessageCircle, XCircle, CircleDot, UserCircle, Menu, User, Settings, CreditCard, LogOut, Crown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from 'next/navigation'

interface Notification {
  id: string
  type: 'escalation' | 'failed' | 'conversation' | 'mention' | 'success'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionLink?: string
  itemId?: string // Specific conversation or action ID
  itemType?: 'conversation' | 'action' | 'automation-rule' | 'contact'
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "escalation",
    title: "Human Review Required",
    message: "Private chef request needs menu approval",
    timestamp: "14m ago",
    read: false,
    actionLink: "/service-inbox?item=action-1", // Direct link to specific action
    itemId: "action-1",
    itemType: "action"
  },
  {
    id: "2",
    type: "failed",
    title: "Action Failed",
    message: "Taxi booking to LAX timed out",
    timestamp: "24m ago",
    read: false,
    actionLink: "/automation-rules?rule=3", // Direct link to Failed Actions Alert rule
    itemId: "3",
    itemType: "automation-rule"
  },
  {
    id: "3",
    type: "conversation",
    title: "New Conversation",
    message: "Sarah Chen sent a new message",
    timestamp: "31m ago",
    read: false,
    actionLink: "/service-inbox?item=conv-1", // Direct link to specific conversation
    itemId: "conv-1",
    itemType: "conversation"
  },
  {
    id: "4",
    type: "escalation",
    title: "Payment Approval Needed",
    message: "$1,850 spa package awaiting approval",
    timestamp: "44m ago",
    read: false,
    actionLink: "/service-inbox?item=action-2", // Direct link to specific action
    itemId: "action-2",
    itemType: "action"
  },
  {
    id: "5",
    type: "mention",
    title: "Team Mention",
    message: "Mike Chen assigned you a task",
    timestamp: "1h ago",
    read: true,
    actionLink: "/service-inbox?assigned=true",
    itemType: "action"
  },
  {
    id: "6",
    type: "success",
    title: "Action Completed",
    message: "Spa booking confirmed for Sarah Chen",
    timestamp: "2h ago",
    read: true,
    actionLink: "/service-inbox?item=conv-1",
    itemId: "conv-1",
    itemType: "conversation"
  },
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

export function AppHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [showNotifications, setShowNotifications] = React.useState(false)
  const unreadCount = notifications.filter(n => !n.read).length
  const router = useRouter()

  const handleLogout = () => {
    // Clear any session data here if needed
    router.push('/welcome')
  }

  const isSuperadmin = typeof window !== 'undefined' && (() => {
    try {
      const userData = localStorage.getItem('attachai_admin_user')
      if (userData) {
        const user = JSON.parse(userData)
        return user.role === 'superadmin'
      }
    } catch (e) {
      return false
    }
    return false
  })()

  return (
    <header className="flex h-14 sm:h-13 lg:h-12 items-center justify-between backdrop-blur-3xl bg-[rgb(247_244_239)]/50 px-4 sm:px-6 md:px-8 lg:px-12 shadow-[0_8px_32px_-8px_rgba(139,115,85,0.08)] animate-soft-slide relative z-[100]">
      <div className="flex items-center gap-3 sm:gap-5">
        {onMenuClick && (
          <Button
            onClick={onMenuClick}
            variant="ghost"
            size="icon"
            className="lg:hidden h-10 w-10 rounded-[18px] hover:backdrop-blur-xl hover:bg-[rgb(247_244_239)]/80 transition-all duration-900"
          >
            <Menu className="h-4.5 w-4.5 text-[#6E5A4F]" />
          </Button>
        )}
        
        <div className="hidden sm:flex items-center gap-3">
          <Badge variant="outline" className="text-xs font-light px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border-primary/30 bg-primary/15 text-primary-foreground shadow-sm">
            Live
          </Badge>
        </div>
      </div>

      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
        <h1 className="font-serif text-xs sm:text-sm tracking-[0.2em] text-[#6E5A4F] font-light">
          AI WHATSAPP CONCIERGE
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-[18px] sm:rounded-[20px] hover:backdrop-blur-xl hover:bg-[rgb(247_244_239)]/80 transition-all duration-900 glow-on-hover hover:scale-110 hover:rotate-3">
              <Bell className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              {unreadCount > 0 && (
                <>
                  <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive/80 shadow-lg animate-float" />
                  <span className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-gradient-to-br from-[#C9A876]/90 to-[#B08080]/80 text-[10px] font-light text-white flex items-center justify-center shadow-lg">
                    {unreadCount}
                  </span>
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="end" 
            className="w-[calc(100vw-2rem)] sm:w-[380px] lg:w-[420px] rounded-[20px] sm:rounded-[22px] backdrop-blur-3xl bg-white/90 border-0 shadow-[0_16px_56px_rgba(139,115,85,0.15)] p-0 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#E9E2D7]/30">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-light text-[#6E5A4F] tracking-wide">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <button className="text-xs font-light text-[#C9A876] hover:text-[#A08968] transition-colors duration-300">
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[480px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D8C8A8]/20 to-[#C9A876]/10 flex items-center justify-center">
                    <Bell className="h-6 w-6 text-[#B8A896]" />
                  </div>
                  <p className="text-sm font-light text-[#8B7355]">
                    No notifications yet
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#E9E2D7]/20">
                  {notifications.map((notification) => {
                    const Icon = notificationIcons[notification.type]
                    const colors = notificationColors[notification.type]
                    
                    return (
                      <Link
                        key={notification.id}
                        href={notification.actionLink || '#'}
                        onClick={() => setShowNotifications(false)}
                        className={`block px-6 py-4 hover:bg-[#F7F4EF]/50 transition-all duration-500 ${
                          !notification.read ? 'bg-[#D8C8A8]/5' : ''
                        }`}
                      >
                        <div className="flex gap-4">
                          {/* Icon */}
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                            <Icon className={`h-4 w-4 ${colors.text}`} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-light text-[#6E5A4F] leading-snug">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 rounded-full bg-[#C9A876] flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-xs font-light text-[#6B5E52] leading-relaxed line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-[10px] font-light text-[#B8A896]">
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-6 py-3 border-t border-[#E9E2D7]/30">
                <Link 
                  href="/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="block text-center text-xs font-light text-[#8B7355] hover:text-[#6B5E52] transition-colors duration-300"
                >
                  View all notifications
                </Link>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Account Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 h-10 px-3 rounded-[18px] hover:backdrop-blur-xl hover:bg-[rgb(247_244_239)]/80 transition-all duration-900"
            >
              {/* Avatar circle */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex items-center justify-center shadow-md">
                <span className="text-xs font-light text-[#5A4A42] font-serif">GG</span>
              </div>
              {/* Name and chevron - hidden on mobile, shown on larger screens */}
              <span className="hidden md:inline text-sm font-light text-[#6E5A4F]">Grace G</span>
              <ChevronDown className="hidden md:inline h-3.5 w-3.5 text-[#6E5A4F]" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="end" 
            className="w-[240px] rounded-[20px] backdrop-blur-3xl bg-white/90 border-0 shadow-[0_16px_56px_rgba(139,115,85,0.15)] p-2"
          >
            <DropdownMenuLabel className="px-3 py-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-light text-[#6E5A4F] font-serif">Grace G</p>
                <p className="text-xs font-light text-[#B8A896]">grace@attachaiclub.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#E9E2D7]/30" />
            
            <DropdownMenuItem asChild className="rounded-[14px] cursor-pointer hover:bg-[#F7F4EF]/50 transition-all duration-500">
              <Link href="/account/profile" className="flex items-center gap-3 px-3 py-2">
                <User className="h-4 w-4 text-[#8B7355]" />
                <span className="text-sm font-light text-[#6E5A4F]">Profile</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="rounded-[14px] cursor-pointer hover:bg-[#F7F4EF]/50 transition-all duration-500">
              <Link href="/account/preferences" className="flex items-center gap-3 px-3 py-2">
                <Settings className="h-4 w-4 text-[#8B7355]" />
                <span className="text-sm font-light text-[#6E5A4F]">Preferences</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="rounded-[14px] cursor-pointer hover:bg-[#F7F4EF]/50 transition-all duration-500">
              <Link href="/account/billing" className="flex items-center gap-3 px-3 py-2">
                <CreditCard className="h-4 w-4 text-[#8B7355]" />
                <span className="text-sm font-light text-[#6E5A4F]">Billing</span>
              </Link>
            </DropdownMenuItem>
            
            {isSuperadmin && (
              <>
                <DropdownMenuSeparator className="bg-[#E9E2D7]/30" />
                <DropdownMenuItem asChild className="rounded-[14px] cursor-pointer hover:bg-[#C9A876]/10 transition-all duration-500">
                  <Link href="/superadmin" className="flex items-center gap-3 px-3 py-2">
                    <Crown className="h-4 w-4 text-[#C9A876]" />
                    <span className="text-sm font-light text-[#C9A876]">Superadmin</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            
            <DropdownMenuSeparator className="bg-[#E9E2D7]/30" />
            
            <DropdownMenuItem 
              onClick={handleLogout}
              className="rounded-[14px] cursor-pointer hover:bg-[#DCC5BA]/20 transition-all duration-500"
            >
              <div className="flex items-center gap-3 px-3 py-2">
                <LogOut className="h-4 w-4 text-[#B08080]" />
                <span className="text-sm font-light text-[#8B7355]">Sign out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
