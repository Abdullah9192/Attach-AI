"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Brain, ClipboardList, TrendingUp, Users2, Calendar, MapPin, ChevronDown, ChevronRight, Heart, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Shared insights data - single source of truth
export const insightsData = {
  topIntents: [
    { 
      name: "Wellness escapes", 
      count: 28, 
      confidence: 92, 
      lastSeen: "2 hours ago",
      description: "Guests seeking spa treatments, float therapy, and mindfulness experiences",
      examples: ["Float Suite bookings", "Spa + dining packages", "Wellness consultations"]
    },
    { 
      name: "Extended stays", 
      count: 15, 
      confidence: 88, 
      lastSeen: "5 hours ago",
      description: "Members requesting longer stays and remote work amenities",
      examples: ["Workroom setup", "Weekly meal planning", "Extended suite access"]
    },
    { 
      name: "Private dining", 
      count: 12, 
      confidence: 85, 
      lastSeen: "1 day ago",
      description: "Exclusive dining experiences and chef collaborations",
      examples: ["Tasting menu requests", "Chef interactions", "Special occasion meals"]
    },
    { 
      name: "Regenerative experiences", 
      count: 9, 
      confidence: 81, 
      lastSeen: "1 day ago",
      description: "Interest in holistic health and recovery therapies",
      examples: ["Infrared sessions", "Cryotherapy", "IV treatments"]
    },
  ],
  newInsights: [
    {
      type: "preference",
      title: "5 dietary preferences captured",
      description: "Gluten-free, vegan, and allergen information added to guest profiles",
      timestamp: "Today, 2:30 PM",
      priority: "medium",
      icon: Heart
    },
    {
      type: "occasion",
      title: "3 special occasions noted",
      description: "Anniversaries and celebrations identified for personalized service",
      timestamp: "Today, 11:15 AM",
      priority: "high",
      icon: AlertCircle
    },
    {
      type: "trend",
      title: "Rising interest in float therapy",
      description: "Float Suite bookings up 40% this week",
      timestamp: "Yesterday, 4:20 PM",
      priority: "low",
      icon: TrendingUp
    },
    {
      type: "at-risk",
      title: "2 guests showing dissatisfaction signals",
      description: "Service delays and unresolved requests detected",
      timestamp: "Yesterday, 1:45 PM",
      priority: "high",
      icon: AlertCircle
    },
  ]
}

export function InsightsPage() {
  const router = useRouter()
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null)
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null)
  const [dateRange, setDateRange] = useState("7-days")

  const selectedIntentData = insightsData.topIntents.find(i => i.name === selectedIntent)

  return (
    <div className="relative min-h-screen">
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

      {/* Content */}
      <div className="relative mx-auto max-w-[95%] md:max-w-[90%] lg:max-w-[1100px] px-4 md:px-6 lg:px-20 pt-6 md:pt-8 lg:pt-12 pb-16 md:pb-20 lg:pb-32" style={{ zIndex: 1 }}>
        
        {/* Header */}
        <div className="space-y-1 md:space-y-1.5 mb-6 md:mb-8 lg:mb-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-[#8B7355] hover:text-[#6E5A4F] transition-colors"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
            <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase">
              INSIGHTS
            </h1>
          </div>
          <p className="text-xs md:text-xs lg:text-sm font-normal text-[#8B7355] leading-relaxed tracking-wide ml-7">
            Guest patterns, intentions, and notable moments
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 rounded-xl backdrop-blur-xl bg-white/60 border-0 text-[10px] text-[#6E5A4F] tracking-wider uppercase font-serif focus:outline-none focus:ring-2 focus:ring-[#C9A876]/30"
          >
            <option value="24-hours">Last 24 Hours</option>
            <option value="7-days">Last 7 Days</option>
            <option value="30-days">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Top Member Intents Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-[#8B7355]" strokeWidth={1.5} />
            <h2 className="font-serif text-[14px] md:text-[16px] font-normal text-[#6E5A4F] tracking-widest uppercase">
              Top Member Intents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insightsData.topIntents.map((intent) => (
              <div
                key={intent.name}
                className="backdrop-blur-3xl bg-white/50 border-0 rounded-xl p-5 cursor-pointer transition-all hover:bg-white/60 hover:shadow-lg"
                onClick={() => setSelectedIntent(selectedIntent === intent.name ? null : intent.name)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[14px] font-light text-[#6E5A4F] mb-1">{intent.name}</h3>
                    <p className="text-[11px] font-light text-[#8B7355]">{intent.count} guests</p>
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 text-[#8B7355] transition-transform ${selectedIntent === intent.name ? 'rotate-180' : ''}`} 
                  />
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] text-[#8B7355]">Confidence</div>
                    <div className="text-[12px] font-light text-[#6E5A4F]">{intent.confidence}%</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] text-[#8B7355]">Last seen</div>
                    <div className="text-[12px] font-light text-[#6E5A4F]">{intent.lastSeen}</div>
                  </div>
                </div>

                {selectedIntent === intent.name && (
                  <div className="pt-3 border-t border-[#8B7355]/10 space-y-3">
                    <p className="text-[11px] font-light text-[#6E5A4F] leading-relaxed">
                      {intent.description}
                    </p>
                    <div>
                      <div className="text-[9px] text-[#8B7355] uppercase tracking-wider mb-2">Common patterns:</div>
                      <div className="flex flex-wrap gap-2">
                        {intent.examples.map((example, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-[#C9A876]/15 text-[#6E5A4F]">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* New Insights & Moments Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="h-5 w-5 text-[#8B7355]" strokeWidth={1.5} />
            <h2 className="font-serif text-[14px] md:text-[16px] font-normal text-[#6E5A4F] tracking-widest uppercase">
              New Insights & Moments
            </h2>
          </div>

          <div className="space-y-3">
            {insightsData.newInsights.length === 0 ? (
              <div className="backdrop-blur-3xl bg-white/40 border-0 rounded-xl p-12 text-center">
                <ClipboardList className="h-12 w-12 text-[#8B7355]/30 mx-auto mb-4" strokeWidth={1} />
                <p className="font-serif text-[14px] text-[#6E5A4F] mb-2">
                  No new insights yet
                </p>
                <p className="text-[11px] font-light text-[#8B7355] max-w-md mx-auto leading-relaxed">
                  ATTACHAI will surface new insights as patterns emerge from guest interactions and preferences.
                </p>
              </div>
            ) : (
              insightsData.newInsights.map((insight, index) => {
                const Icon = insight.icon
                return (
                  <div
                    key={index}
                    className="backdrop-blur-3xl bg-white/50 border-0 rounded-xl p-4 cursor-pointer transition-all hover:bg-white/60 hover:shadow-lg"
                    onClick={() => setExpandedInsight(expandedInsight === index ? null : index)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        insight.priority === 'high' ? 'bg-[#B08A64]/15' :
                        insight.priority === 'medium' ? 'bg-[#C9A876]/15' :
                        'bg-[#8B7355]/10'
                      }`}>
                        <Icon className="h-4 w-4 text-[#8B7355]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-[13px] font-light text-[#6E5A4F]">{insight.title}</h3>
                          <ChevronDown 
                            className={`h-4 w-4 text-[#8B7355] transition-transform flex-shrink-0 ml-2 ${expandedInsight === index ? 'rotate-180' : ''}`} 
                          />
                        </div>
                        <p className="text-[11px] font-light text-[#8B7355] mb-2">{insight.description}</p>
                        <p className="text-[9px] text-[#8B7355]">{insight.timestamp}</p>
                        
                        {expandedInsight === index && (
                          <div className="mt-3 pt-3 border-t border-[#8B7355]/10">
                            <Button
                              size="sm"
                              variant="outline"
                              className="font-serif text-[9px] tracking-wider uppercase"
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push('/service-inbox')
                              }}
                            >
                              View Related Conversations
                            </Button>
                          </div>
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
    </div>
  )
}
