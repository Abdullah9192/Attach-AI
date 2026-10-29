"use client"

import { useRouter } from 'next/navigation'
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, MessageCircle, CircleDot, Waves, Clock, Brain, AlertCircle, Users2, UserCircle, MapPin, ChevronRight, ChevronDown, ClipboardList, Wifi, Server, Activity, User, AlertTriangle, FileText, Download } from 'lucide-react'
import { ExportConversationsModal } from "@/components/exports/export-conversations-modal"
import { ExportActionsModal } from "@/components/exports/export-actions-modal"
import { ReportsModal } from "@/components/exports/reports-modal"
import { StatusChip } from '@/components/ui/status-chip'

export function DashboardPage() {
  const router = useRouter()
  
  const [showExportConversations, setShowExportConversations] = React.useState(false)
  const [showExportActions, setShowExportActions] = React.useState(false)
  const [showReports, setShowReports] = React.useState(false)
  const [reportType, setReportType] = React.useState<'daily' | 'weekly' | 'monthly'>('daily')

  React.useEffect(() => {
    console.log("[v0] Dashboard mounted")
    
    setTimeout(() => {
      const metricsContainer = document.querySelector('[data-metrics-grid]')
      console.log("[v0] Metrics container found:", !!metricsContainer)
      if (metricsContainer) {
        console.log("[v0] Metrics cards count:", metricsContainer.children.length)
        console.log("[v0] Metrics HTML:", metricsContainer.innerHTML.substring(0, 200))
      }
      
      const exportsSection = document.querySelector('[data-exports-section]')
      console.log("[v0] Exports section found:", !!exportsSection)
      
      console.log("[v0] Document scroll height:", document.documentElement.scrollHeight)
      console.log("[v0] Window inner height:", window.innerHeight)
    }, 100)
  }, [])

  return (
    <div className="relative">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/architectural-sanctuary-dashboard.png)',
          zIndex: 0
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F4EF]/60 via-[#F7F4EF]/65 to-[#F7F4EF]/70" />
      </div>
      
      {/* Content - removed height constraint */}
      <div className="relative mx-auto max-w-[95%] md:max-w-[90%] lg:max-w-[1100px] px-4 md:px-6 lg:px-20 pt-6 md:pt-8 lg:pt-12 pb-16 md:pb-20 lg:pb-32" style={{ zIndex: 1 }}>
        
        {/* Header */}
        <div className="space-y-1 md:space-y-1.5 mb-6 md:mb-8 lg:mb-10">
          <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase">
            DASHBOARD
          </h1>
          <p className="text-xs md:text-xs lg:text-sm font-normal text-[#8B7355] leading-relaxed tracking-wide">
            Quiet intelligence beneath every request.
          </p>
        </div>

        <div data-metrics-grid className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
          {/* Guest Requests */}
          <div className="backdrop-blur-xl bg-white/70 border-0 rounded-xl shadow-lg p-4 min-h-[110px] flex flex-col items-center justify-center text-center">
            <MessageCircle className="h-5 w-5 text-[#8B7355] mb-2" strokeWidth={1.5} />
            <div className="text-3xl font-serif text-[#6E5A4F] mb-1">342</div>
            <div className="text-[10px] text-[#6E5A4F] tracking-widest uppercase">Guest requests</div>
            <div className="text-[9px] text-[#8B7355] mt-1">AI 76% · Human 24%</div>
          </div>

          {/* Successful AI Responses */}
          <div className="backdrop-blur-xl bg-white/70 border-0 rounded-xl shadow-lg p-4 min-h-[110px] flex flex-col items-center justify-center text-center">
            <CircleDot className="h-5 w-5 text-[#8B7355] mb-2" strokeWidth={1.5} />
            <div className="text-3xl font-serif text-[#6E5A4F] mb-1">89%</div>
            <div className="text-[10px] text-[#6E5A4F] tracking-widest uppercase">Successful AI responses</div>
            <div className="text-[9px] text-[#8B7355] mt-1">12% human takeovers</div>
          </div>

          {/* Requests Resolved */}
          <div className="backdrop-blur-xl bg-white/70 border-0 rounded-xl shadow-lg p-4 min-h-[110px] flex flex-col items-center justify-center text-center">
            <Waves className="h-5 w-5 text-[#8B7355] mb-2" strokeWidth={1.5} />
            <div className="text-3xl font-serif text-[#6E5A4F] mb-1">24</div>
            <div className="text-[10px] text-[#6E5A4F] tracking-widest uppercase">Requests resolved</div>
            <div className="text-[9px] text-[#8B7355] mt-1">+5 vs yesterday</div>
          </div>

          {/* Guest Insights */}
          <div className="backdrop-blur-xl bg-white/70 border-0 rounded-xl shadow-lg p-4 min-h-[110px] flex flex-col items-center justify-center text-center">
            <ClipboardList className="h-5 w-5 text-[#8B7355] mb-2" strokeWidth={1.5} />
            <div className="text-3xl font-serif text-[#6E5A4F] mb-1">5</div>
            <div className="text-[10px] text-[#6E5A4F] tracking-widest uppercase">Guest insights</div>
            <div className="text-[9px] text-[#8B7355] mt-1">Diet, room, service</div>
          </div>

          {/* Average Satisfaction */}
          <div className="backdrop-blur-xl bg-white/70 border-0 rounded-xl shadow-lg p-4 min-h-[110px] flex flex-col items-center justify-center text-center">
            <Brain className="h-5 w-5 text-[#8B7355] mb-2" strokeWidth={1.5} />
            <div className="text-3xl font-serif text-[#6E5A4F] mb-1">4.8</div>
            <div className="text-[10px] text-[#6E5A4F] tracking-widest uppercase">Average satisfaction</div>
            <div className="text-[9px] text-[#8B7355] mt-1">3 at-risk guests</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
          <button
            onClick={() => router.push('/service-inbox')}
            className="rounded-xl md:rounded-[18px] backdrop-blur-3xl bg-white/40 border-0 p-3 md:p-4 transition-all duration-700 hover:bg-white/50 hover:shadow-[0_12px_32px_rgba(139,115,85,0.08)] hover:scale-[1.01] text-left cursor-pointer"
            style={{ 
              boxShadow: '0 8px 24px rgba(139,115,85,0.05), inset 0 1px 1px rgba(255,255,255,0.6)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <MessageCircle className="h-3 w-3 md:h-3.5 md:w-3.5 text-[#8B7355] opacity-60 flex-shrink-0" strokeWidth={1.25} />
              <div className="flex-1">
                <div className="text-xl md:text-2xl font-serif font-normal text-[#6E5A4F] leading-none">24</div>
                <div className="font-serif text-[8px] md:text-[9px] font-normal text-[#6E5A4F] tracking-widest uppercase mt-1">Incoming Today</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => router.push('/escalation-report')}
            className="rounded-xl md:rounded-[18px] backdrop-blur-3xl border-0 p-3 md:p-4 transition-all duration-700 hover:scale-[1.01] text-left cursor-pointer md:col-span-2"
            style={{ 
              background: 'linear-gradient(135deg, rgba(176, 138, 100, 0.15), rgba(176, 138, 100, 0.08))',
              boxShadow: '0 8px 24px rgba(176,138,100,0.12), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 0 0 1px rgba(176,138,100,0.15)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="h-3 w-3 md:h-3.5 md:w-3.5 text-[#B08A64] flex-shrink-0" strokeWidth={1.25} />
              <div className="flex-1">
                <div className="text-xl md:text-2xl font-serif font-normal text-[#B08A64] leading-none">3</div>
                <div className="font-serif text-[8px] md:text-[9px] font-normal text-[#B08A64] tracking-widest uppercase mt-1">Escalated / Urgent</div>
              </div>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 mb-4 md:mb-6">
          
          <div className="lg:col-span-3 rounded-xl md:rounded-[20px] lg:rounded-[22px] backdrop-blur-3xl bg-[rgba(216,200,168,0.14)] shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] border-0 hover:bg-[rgba(216,200,168,0.18)] transition-all duration-900">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl md:rounded-l-[20px] lg:rounded-l-[22px] bg-gradient-to-b from-[#C9A876]/60 to-[#C9A876]/20" />
            
            <div className="p-4 md:p-5 space-y-3 md:space-y-4">
              <div>
                <h3 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-1">
                  REQUIRES REVIEW
                </h3>
                <p className="text-2xl font-serif font-light text-[#6E5A4F]">3 items</p>
              </div>

              <div className="space-y-2 md:space-y-3">
                {[
                  { icon: AlertCircle, title: "Failed automation", desc: "Booking error", time: "8m" },
                  { icon: Waves, title: "Integration error", desc: "System timeout", time: "25m" },
                  { icon: ClipboardList, title: "Policy check", desc: "Approval needed", time: "1h" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2.5 p-2.5 md:p-3 rounded-lg md:rounded-[14px] bg-[rgba(176,138,100,0.20)] border border-[rgba(163,123,89,0.20)] transition-all duration-700 hover:bg-[rgba(176,138,100,0.26)] cursor-pointer"
                  >
                    <item.icon className="h-3 w-3 text-[#9B8370] opacity-60 flex-shrink-0" strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] md:text-[11px] font-light text-[#6E5A4F] mb-0.5">{item.title}</div>
                      <div className="text-[8px] md:text-[9px] font-light text-[#8B7355]">{item.desc}</div>
                    </div>
                    <span className="text-[8px] md:text-[9px] font-light text-[#8B7355]">{item.time}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => router.push('/service-inbox?filter=review')}
                variant="default"
                size="sm"
                className="w-full font-serif text-[9px] md:text-[10px] tracking-wider uppercase"
              >
                Review All
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl md:rounded-[20px] lg:rounded-[22px] backdrop-blur-3xl bg-white/40 shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] border-0 hover:bg-white/50 transition-all duration-900">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl md:rounded-l-[20px] lg:rounded-l-[22px] bg-gradient-to-b from-[#C9A876]/60 to-[#C9A876]/20" />
            
            <div className="p-4 md:p-5 space-y-3 md:space-y-4">
              <div>
                <h3 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-1">
                  PRIORITY QUEUE
                </h3>
                <p className="text-2xl font-serif font-light text-[#6E5A4F]">5 queued</p>
              </div>

              <div className="space-y-2 md:space-y-3">
                {[
                  { title: "VIP arrival", desc: "Workroom setup briefing", time: "2h", badge: "VIP" },
                  { title: "High-value service", desc: "Menu approval needed", time: "3h", badge: "High Value" },
                  { title: "Sensitive request", desc: "Privacy protocol", time: "4h", badge: "Sensitive" },
                  { title: "Float Suite", desc: "Anniversary session", time: "1h", badge: "" },
                  { title: "Infrared booking", desc: "Slot requested", time: "45m", badge: "" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2.5 p-2.5 md:p-3 rounded-lg md:rounded-[14px] bg-[rgba(247,244,239,0.3)] transition-all duration-700 hover:bg-[rgba(247,244,239,0.5)] cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] md:text-[11px] font-light text-[#6E5A4F]">{item.title}</span>
                        {item.badge && (
                          <StatusChip variant="champagne">{item.badge}</StatusChip>
                        )}
                      </div>
                      <div className="text-[8px] md:text-[9px] font-light text-[#8B7355]">{item.desc}</div>
                    </div>
                    <span className="text-[8px] md:text-[9px] font-light text-[#8B7355]">{item.time}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => router.push('/service-inbox?filter=priority')}
                variant="outline"
                size="sm"
                className="w-full font-serif text-[9px] md:text-[10px] tracking-wider uppercase"
              >
                View Full Queue
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3 md:space-y-4">
            {/* System Health */}
            <div className="rounded-xl md:rounded-[20px] lg:rounded-[22px] backdrop-blur-3xl bg-white/40 shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] border-0 hover:bg-white/50 transition-all duration-900">
              <div className="p-4 md:p-5 space-y-3 md:space-y-4">
                <div>
                  <h3 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-1">
                    SYSTEM HEALTH
                  </h3>
                  <p className="text-xs font-light text-[#8B7355] leading-relaxed">
                    Live status across channels
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { label: "WhatsApp API", status: "Stable", color: "#8B9D83" },
                    { label: "Property systems", status: "Minor delays", color: "#C9A876" },
                    { label: "AI engine", status: "97% uptime", color: "#8B9D83" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-[9px] md:text-[10px] font-light">
                      <span className="text-[#6E5A4F]">{item.label}</span>
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[#8B7355]">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* VIP Watchlist */}
            <div className="rounded-xl md:rounded-[20px] lg:rounded-[22px] backdrop-blur-3xl bg-white/40 shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] border-0 hover:bg-white/50 transition-all duration-900">
              <div className="p-4 md:p-5 space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-1">
                      VIP WATCHLIST
                    </h3>
                  </div>
                  <button
                    onClick={() => router.push('/vip')}
                    className="text-[9px] md:text-[10px] font-light text-[#C9A876] hover:text-[#A08968] transition-colors"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-2 md:space-y-3">
                  {[
                    { initials: "SC", name: "Sarah Chen", focus: "Spa + dining", tag: "In-house", tagColor: "#8B9D83", conversationId: "sarah-chen-conv" },
                    { initials: "MR", name: "Michael Roberts", focus: "Chef & transport", tag: "Arriving 6PM", tagColor: "#C9A876", conversationId: "michael-roberts-conv" },
                    { initials: "JD", name: "Julia Davis", focus: "Anniversary", tag: "High touch", tagColor: "#9B8370", conversationId: "julia-davis-conv" },
                  ].map((guest, i) => (
                    <div 
                      key={i} 
                      onClick={() => router.push(`/service-inbox?conversation=${guest.conversationId}`)}
                      className="flex items-center gap-2.5 cursor-pointer hover:bg-[rgba(247,244,239,0.3)] p-2 rounded-[12px] transition-all duration-700"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 flex items-center justify-center text-[9px] md:text-[10px] font-light text-[#6E5A4F] flex-shrink-0">
                        {guest.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-light text-[#6E5A4F] mb-0.5">{guest.name}</div>
                        <div className="text-[8px] font-light text-[#8B7355]">{guest.focus}</div>
                      </div>
                      <span className="text-[7px] font-light px-2 py-0.5 rounded-full" style={{ color: guest.tagColor, backgroundColor: `${guest.tagColor}15` }}>
                        {guest.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          {/* Top Member Intents */}
          <div data-insights-section className="backdrop-blur-3xl bg-white/40 border-0 rounded-xl md:rounded-[20px] shadow-[0_8px_24px_rgba(139,115,85,0.04),inset_0_1px_1px_rgba(255,255,255,0.5)] p-4 md:p-5">
            <div className="mb-3 md:mb-4">
              <div className="flex items-center gap-2 mb-1.5">
                <Brain className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B7355]" strokeWidth={1.5} />
                <h3 className="font-serif text-[10px] md:text-[11px] font-normal text-[#6E5A4F] tracking-widest uppercase">
                  Top Member Intents
                </h3>
              </div>
              <p className="text-[9px] md:text-[10px] font-light text-[#8B7355] leading-relaxed">
                Key behaviours and themes emerging across your guests and members.
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[rgba(247,244,239,0.3)]">
                <span className="text-[10px] md:text-[11px] font-light text-[#6E5A4F]">Wellness escapes</span>
                <span className="text-[9px] md:text-[10px] font-light text-[#8B7355]">28 guests</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[rgba(247,244,239,0.3)]">
                <span className="text-[10px] md:text-[11px] font-light text-[#6E5A4F]">Extended stays</span>
                <span className="text-[9px] md:text-[10px] font-light text-[#8B7355]">15 guests</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[rgba(247,244,239,0.3)]">
                <span className="text-[10px] md:text-[11px] font-light text-[#6E5A4F]">Private dining</span>
                <span className="text-[9px] md:text-[10px] font-light text-[#8B7355]">12 guests</span>
              </div>
            </div>

            <Button
              onClick={() => router.push('/insights')}
              variant="ghost"
              size="sm"
              className="w-full font-serif text-[9px] md:text-[10px] tracking-wider uppercase text-[#C9A876] hover:text-[#6E5A4F]"
            >
              View Full Insights →
            </Button>
          </div>

          {/* New Insights & Moments */}
          <div className="backdrop-blur-3xl bg-white/40 border-0 rounded-xl md:rounded-[20px] shadow-[0_8px_24px_rgba(139,115,85,0.04),inset_0_1px_1px_rgba(255,255,255,0.5)] p-4 md:p-5">
            <div className="mb-3 md:mb-4">
              <div className="flex items-center gap-2 mb-1.5">
                <ClipboardList className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B7355]" strokeWidth={1.5} />
                <h3 className="font-serif text-[10px] md:text-[11px] font-normal text-[#6E5A4F] tracking-widest uppercase">
                  New Insights & Moments
                </h3>
              </div>
              <p className="text-[9px] md:text-[10px] font-light text-[#8B7355] leading-relaxed">
                Recent patterns, notable guest moments, and experience signals.
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="p-2 rounded-lg bg-[rgba(247,244,239,0.3)]">
                <p className="text-[10px] md:text-[11px] font-light text-[#6E5A4F] mb-0.5">5 dietary preferences captured</p>
                <span className="text-[8px] md:text-[9px] font-light text-[#8B7355]">Today</span>
              </div>
              <div className="p-2 rounded-lg bg-[rgba(247,244,239,0.3)]">
                <p className="text-[10px] md:text-[11px] font-light text-[#6E5A4F] mb-0.5">3 special occasions noted</p>
                <span className="text-[8px] md:text-[9px] font-light text-[#8B7355]">This week</span>
              </div>
            </div>

            <Button
              onClick={() => router.push('/insights')}
              variant="ghost"
              size="sm"
              className="w-full font-serif text-[9px] md:text-[10px] tracking-wider uppercase text-[#C9A876] hover:text-[#6E5A4F]"
            >
              Open Insights →
            </Button>
          </div>

          {/* Exports & Reports */}
          <div data-exports-section className="backdrop-blur-3xl bg-white/40 border-0 rounded-xl md:rounded-[20px] shadow-[0_8px_24px_rgba(139,115,85,0.04),inset_0_1px_1px_rgba(255,255,255,0.5)] p-4 md:p-5">
            <div className="mb-3 md:mb-4">
              <div className="flex items-center gap-2 mb-1.5">
                <FileText className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B7355]" strokeWidth={1.5} />
                <h3 className="font-serif text-[10px] md:text-[11px] font-normal text-[#6E5A4F] tracking-widest uppercase">
                  Exports & Reports
                </h3>
              </div>
              <p className="text-[9px] md:text-[10px] font-light text-[#8B7355] leading-relaxed">
                Downloadable summaries and performance views.
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <button
                onClick={() => router.push('/reports?report=daily-summary')}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-[rgba(247,244,239,0.3)] hover:bg-[rgba(247,244,239,0.5)] transition-all"
              >
                <span className="text-[10px] md:text-[11px] font-light text-[#6E5A4F]">Daily service summary</span>
                <Download className="h-3 w-3 text-[#8B7355]" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => router.push('/reports?report=weekly-performance')}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-[rgba(247,244,239,0.3)] hover:bg-[rgba(247,244,239,0.5)] transition-all"
              >
                <span className="text-[10px] md:text-[11px] font-light text-[#6E5A4F]">Weekly performance</span>
                <Download className="h-3 w-3 text-[#8B7355]" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => router.push('/reports?report=satisfaction-quality')}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-[rgba(247,244,239,0.3)] hover:bg-[rgba(247,244,239,0.5)] transition-all"
              >
                <span className="text-[10px] md:text-[11px] font-light text-[#6E5A4F]">Guest satisfaction & AI quality</span>
                <Download className="h-3 w-3 text-[#8B7355]" strokeWidth={1.5} />
              </button>
            </div>

            <Button
              onClick={() => router.push('/reports')}
              variant="ghost"
              size="sm"
              className="w-full font-serif text-[9px] md:text-[10px] tracking-wider uppercase text-[#C9A876] hover:text-[#6E5A4F]"
            >
              View All Reports →
            </Button>
          </div>
        </div>
      </div>
      
      <ExportConversationsModal open={showExportConversations} onOpenChange={setShowExportConversations} />
      <ExportActionsModal open={showExportActions} onOpenChange={setShowExportActions} />
      <ReportsModal open={showReports} onOpenChange={setShowReports} reportType={reportType} />

      {/* Footer - Made GDPR text uppercase, using Spectral font, positioned at bottom */}
      <footer className="relative mt-20 text-center space-y-1.5 py-4 pointer-events-none" style={{ zIndex: 10 }}>
        <p className="font-serif italic text-[9px] md:text-[10px] text-[#A08968] leading-tight">
          Intelligent by Nature. Intimate by Design.
        </p>
        <p className="font-serif text-[7px] md:text-[8px] text-[#A08968] tracking-wider uppercase leading-tight">
          GDPR COMPLIANT. ISO-ALIGNED ARCHITECTURE.
        </p>
        <p className="font-serif text-[7px] md:text-[8px] text-[#A08968] tracking-wider uppercase leading-tight">
          COPYRIGHT ATTACHAI 2025
        </p>
      </footer>
    </div>
  )
}
