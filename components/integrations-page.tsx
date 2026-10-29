"use client"

import * as React from "react"
import { Database, Bell, Zap, Calendar, MessageCircle, Key, Link2, Check, MoreHorizontal, RefreshCw, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const integrations = {
  dataSources: [
    {
      id: "opera",
      name: "Opera PMS",
      description: "Property management system",
      status: "connected",
      lastSync: "2 min ago",
      icon: Database,
    },
    {
      id: "sevenrooms",
      name: "SevenRooms",
      description: "Restaurant reservations",
      status: "syncing",
      lastSync: "Syncing now",
      icon: Database,
    },
    {
      id: "salesforce",
      name: "Salesforce CRM",
      description: "Customer relationship data",
      status: "pending",
      lastSync: null,
      icon: Database,
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Event scheduling sync",
      status: "connected",
      lastSync: "1 min ago",
      icon: Calendar,
    },
  ],
  notifications: [
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      description: "Client messaging platform",
      status: "connected",
      lastSync: "Active",
      icon: MessageCircle,
    },
    {
      id: "sendgrid",
      name: "SendGrid",
      description: "Email delivery service",
      status: "connected",
      lastSync: "Active",
      icon: Bell,
    },
    {
      id: "twilio",
      name: "Twilio SMS",
      description: "SMS notifications",
      status: "pending",
      lastSync: null,
      icon: Bell,
    },
  ],
  actionExecutors: [
    {
      id: "stripe",
      name: "Stripe",
      description: "Payment processing",
      status: "connected",
      lastSync: "Working",
      icon: Zap,
    },
    {
      id: "uber",
      name: "Uber for Business",
      description: "Transportation booking",
      status: "error",
      lastSync: "Connection issue",
      icon: Zap,
    },
    {
      id: "opentable",
      name: "OpenTable",
      description: "Restaurant reservations",
      status: "pending",
      lastSync: null,
      icon: Zap,
    },
  ],
}

export function IntegrationsPage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [selectedIntegration, setSelectedIntegration] = React.useState<any>(null)
  const [activeTab, setActiveTab] = React.useState("overview")

  const handleTileClick = (integration: any) => {
    setSelectedIntegration(integration)
    setDrawerOpen(true)
  }

  const totalIntegrations = Object.values(integrations).flat().length
  const connectedCount = Object.values(integrations)
    .flat()
    .filter((i) => i.status === "connected").length

  return (
    <div className="min-h-screen bg-[#F7F4EF] p-16 space-y-12">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-serif text-[#3a2f28] tracking-wide">Integrations</h1>
          <p className="mt-2 text-sm text-[#8B7355] font-sans leading-relaxed">
            Connect external systems to enhance intelligence
          </p>
        </div>

        {/* Summary Card */}
        <div className="backdrop-blur-3xl bg-white/50 rounded-3xl p-8 shadow-[0_8px_80px_rgba(107,78,58,0.12)]">
          <div className="grid grid-cols-3 gap-12">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-[#A08968] font-mono">Total Integrations</p>
              <p className="text-3xl font-serif text-[#3a2f28]">{totalIntegrations}</p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-[#A08968] font-mono">Connected</p>
              <p className="text-3xl font-serif text-[#3a2f28]">{connectedCount}</p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-[#A08968] font-mono">Last Sync</p>
              <p className="text-3xl font-serif text-[#3a2f28]">2m</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto space-y-16">
        {/* Data Sources Module */}
        <div className="space-y-6">
          <h2 className="text-base font-serif text-[#3a2f28] tracking-wide">Data Sources</h2>
          <div className="grid grid-cols-3 gap-8">
            {integrations.dataSources.map((integration, index) => (
              <IntegrationTile
                key={integration.id}
                integration={integration}
                onClick={() => handleTileClick(integration)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Notifications Module */}
        <div className="space-y-6">
          <h2 className="text-base font-serif text-[#3a2f28] tracking-wide">Notifications</h2>
          <div className="grid grid-cols-3 gap-8">
            {integrations.notifications.map((integration, index) => (
              <IntegrationTile
                key={integration.id}
                integration={integration}
                onClick={() => handleTileClick(integration)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Action Executors Module */}
        <div className="space-y-6">
          <h2 className="text-base font-serif text-[#3a2f28] tracking-wide">Action Executors</h2>
          <div className="grid grid-cols-3 gap-8">
            {integrations.actionExecutors.map((integration, index) => (
              <IntegrationTile
                key={integration.id}
                integration={integration}
                onClick={() => handleTileClick(integration)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-12 right-12">
        <button className="flex items-center gap-3 px-8 py-4 backdrop-blur-3xl bg-white/60 rounded-full shadow-[0_4px_60px_rgba(216,200,168,0.4)] border border-[#D8C8A8]/40 hover:shadow-[0_8px_80px_rgba(216,200,168,0.6)] hover:scale-[1.02] transition-all duration-700 ease-out group">
          <span className="text-3xl text-[#D8C8A8] group-hover:rotate-90 transition-transform duration-700">+</span>
          <span className="text-sm font-sans text-[#6E5A4F] tracking-wide">Add Integration</span>
        </button>
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="fixed inset-0 bg-[#3a2f28]/20 backdrop-blur-sm animate-fadeIn"
          />
          <div
            className="relative w-[42%] h-full backdrop-blur-3xl bg-white/80 shadow-[-20px_0_80px_rgba(107,78,58,0.15)] animate-slideInRight overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-12 space-y-10">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    {selectedIntegration && (
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl backdrop-blur-xl bg-[#D8C8A8]/20 border border-[#D8C8A8]/40">
                        <selectedIntegration.icon className="h-6 w-6 text-[#C9A876]" strokeWidth={1.5} />
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl font-serif text-[#3a2f28]">{selectedIntegration?.name}</h2>
                      <p className="text-sm text-[#8B7355] font-sans mt-1">{selectedIntegration?.description}</p>
                    </div>
                  </div>
                  <StatusIndicator status={selectedIntegration?.status} />
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-[#8B7355] hover:text-[#6E5A4F] transition-colors duration-500"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                <TabsList className="backdrop-blur-xl bg-white/60 rounded-full p-1.5 border-0">
                  <TabsTrigger value="overview" className="rounded-full text-xs font-sans data-[state=active]:bg-[#D8C8A8]/30 data-[state=active]:text-[#3a2f28] transition-all duration-500">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="rounded-full text-xs font-sans data-[state=active]:bg-[#D8C8A8]/30 data-[state=active]:text-[#3a2f28] transition-all duration-500">
                    Settings
                  </TabsTrigger>
                  <TabsTrigger value="logs" className="rounded-full text-xs font-sans data-[state=active]:bg-[#D8C8A8]/30 data-[state=active]:text-[#3a2f28] transition-all duration-500">
                    Logs
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8 animate-fadeIn">
                  <div className="backdrop-blur-2xl bg-white/50 rounded-3xl p-8 space-y-6">
                    <h3 className="text-sm font-serif text-[#3a2f28]">Connection Details</h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#8B7355]">Last Sync</span>
                        <span className="text-[#3a2f28] font-medium">{selectedIntegration?.lastSync || "Never"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8B7355]">Data Points</span>
                        <span className="text-[#3a2f28] font-medium">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8B7355]">API Calls (24h)</span>
                        <span className="text-[#3a2f28] font-medium">342</span>
                      </div>
                    </div>
                  </div>

                  <div className="backdrop-blur-2xl bg-white/50 rounded-3xl p-8 space-y-4">
                    <h3 className="text-sm font-serif text-[#3a2f28]">Description</h3>
                    <p className="text-sm text-[#6E5A4F] leading-relaxed">
                      This integration connects your system with {selectedIntegration?.name} to synchronize data and enable automated workflows. All data is encrypted and securely transmitted.
                    </p>
                  </div>

                  <button className="w-full py-4 backdrop-blur-xl bg-[#D8C8A8]/20 rounded-full border border-[#D8C8A8]/40 text-sm font-sans text-[#6E5A4F] hover:bg-[#D8C8A8]/30 hover:shadow-[0_0_40px_rgba(216,200,168,0.4)] transition-all duration-700">
                    Test Connection
                  </button>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6 animate-fadeIn">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-mono">API Key</Label>
                      <Input
                        type="password"
                        placeholder="Enter API key"
                        className="backdrop-blur-2xl bg-white/50 border-0 rounded-2xl h-12 text-sm text-[#3a2f28] placeholder:text-[#A08968] focus-visible:ring-2 focus-visible:ring-[#D8C8A8]/50 focus-visible:ring-offset-0 transition-all duration-500"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-mono">API Endpoint</Label>
                      <Input
                        placeholder="https://api.example.com"
                        className="backdrop-blur-2xl bg-white/50 border-0 rounded-2xl h-12 text-sm text-[#3a2f28] placeholder:text-[#A08968] focus-visible:ring-2 focus-visible:ring-[#D8C8A8]/50 focus-visible:ring-offset-0 transition-all duration-500"
                      />
                    </div>
                  </div>

                  <button className="w-full py-4 backdrop-blur-xl bg-[#D8C8A8]/30 rounded-full border border-[#D8C8A8]/50 text-sm font-sans text-[#3a2f28] hover:bg-[#D8C8A8]/40 hover:shadow-[0_0_40px_rgba(216,200,168,0.5)] transition-all duration-700">
                    Save Configuration
                  </button>
                </TabsContent>

                <TabsContent value="logs" className="space-y-4 animate-fadeIn">
                  <div className="space-y-3">
                    {[
                      { time: "2 min ago", event: "Sync completed successfully", type: "success" },
                      { time: "15 min ago", event: "API request processed", type: "info" },
                      { time: "1 hour ago", event: "Connection established", type: "success" },
                    ].map((log, i) => (
                      <div
                        key={i}
                        className="backdrop-blur-2xl bg-white/50 rounded-2xl p-5 space-y-1.5 hover:bg-white/60 transition-all duration-500"
                      >
                        <p className="text-xs text-[#8B7355] font-mono">{log.time}</p>
                        <p className="text-sm text-[#3a2f28]">{log.event}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function IntegrationTile({ integration, onClick, index }: any) {
  const Icon = integration.icon

  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
      className="group relative backdrop-blur-3xl bg-white/50 rounded-3xl p-8 text-left shadow-[0_8px_60px_rgba(107,78,58,0.08)] hover:shadow-[0_12px_80px_rgba(216,200,168,0.25)] hover:-translate-y-1 transition-all duration-700 ease-out animate-fadeSlideIn"
    >
      {/* Icon */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl backdrop-blur-xl bg-[#D8C8A8]/20 border border-[#D8C8A8]/30 group-hover:bg-[#D8C8A8]/30 group-hover:shadow-[0_0_30px_rgba(216,200,168,0.4)] transition-all duration-700">
        <Icon className="h-7 w-7 text-[#C9A876] group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="space-y-3 mb-5">
        <h3 className="text-sm font-serif text-[#3a2f28] tracking-wide">{integration.name}</h3>
        <p className="text-xs text-[#8B7355] font-sans leading-relaxed">{integration.description}</p>
      </div>

      {/* Status & Last Sync */}
      <div className="flex items-center justify-between">
        <StatusIndicator status={integration.status} compact />
        {integration.lastSync && (
          <p className="text-[10px] text-[#A08968] font-mono">{integration.lastSync}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button className="flex-1 py-2.5 backdrop-blur-xl bg-white/60 rounded-full text-xs font-sans text-[#6E5A4F] hover:bg-white/80 transition-colors duration-500">
          Configure
        </button>
        <button className="flex-1 py-2.5 backdrop-blur-xl bg-white/40 rounded-full text-xs font-sans text-[#8B7355] hover:bg-white/60 transition-colors duration-500">
          Logs
        </button>
      </div>
    </button>
  )
}

function StatusIndicator({ status, compact = false }: { status: string; compact?: boolean }) {
  const configs = {
    connected: {
      icon: Check,
      label: "Connected",
      className: "bg-[#E9E2D7]/60 text-[#8B7355] border-[#D5C8BA]/40 shadow-[inset_0_0_20px_rgba(216,200,168,0.3)]",
    },
    syncing: {
      icon: RefreshCw,
      label: "Syncing",
      className: "bg-[#D8C8A8]/20 text-[#C9A876] border-[#D8C8A8]/40 shadow-[inset_0_0_20px_rgba(216,200,168,0.2)]",
      animate: "animate-spin-slow",
    },
    pending: {
      icon: MoreHorizontal,
      label: "Pending Setup",
      className: "bg-white/40 text-[#A08968] border-[#E9E2D7]/50 border-dashed",
    },
    error: {
      icon: AlertTriangle,
      label: "Needs Attention",
      className: "bg-[#D5C8BA]/30 text-[#9B8370] border-[#C8B9AA]/50 shadow-[0_2px_20px_rgba(155,131,112,0.15)]",
    },
  }

  const config = configs[status as keyof typeof configs] || configs.pending
  const StatusIcon = config.icon

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-wide ${config.className}`}>
        <StatusIcon className={`h-2.5 w-2.5 ${config.animate || ""}`} strokeWidth={2} />
        <span>{config.label}</span>
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono tracking-wide ${config.className}`}>
      <StatusIcon className={`h-3.5 w-3.5 ${config.animate || ""}`} strokeWidth={2} />
      <span>{config.label}</span>
    </div>
  )
}
