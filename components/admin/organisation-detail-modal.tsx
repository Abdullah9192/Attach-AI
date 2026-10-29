"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { AdminOrganisation, mockActivityLogs } from '@/mock/admin-organisations'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Building2, Mail, Phone, Globe, Users, MessageSquare, Clock, Calendar, MapPin, CreditCard, Settings, Activity, X, Key, Zap, Database, Eye, Save, Copy, Plus, Trash2, ExternalLink } from 'lucide-react'

interface OrganisationDetailModalProps {
  organisation: AdminOrganisation
  open: boolean
  onClose: () => void
}

export function OrganisationDetailModal({ organisation, open, onClose }: OrganisationDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'stats' | 'api' | 'integrations' | 'automations' | 'control'>('overview')
  
  const logs = mockActivityLogs[organisation.id] || []

  const statusColors = {
    Live: 'bg-[#8B9D83]/20 text-[#7A8C73] border-[#8B9D83]/30',
    Onboarding: 'bg-[#C9A876]/20 text-[#B8986A] border-[#C9A876]/30',
    Paused: 'bg-[#B8A896]/20 text-[#8B7355] border-[#B8A896]/30',
    Trial: 'bg-[#D8C8A8]/20 text-[#C9A876] border-[#D8C8A8]/30',
  }

  const eventTypeColors = {
    Message: 'bg-[#D8C8A8]/20 text-[#B8986A]',
    Automation: 'bg-[#8B9D83]/20 text-[#7A8C73]',
    Error: 'bg-red-50 text-red-700',
    Login: 'bg-blue-50 text-blue-700',
    'Staff Added': 'bg-purple-50 text-purple-700',
    Integration: 'bg-green-50 text-green-700',
  }

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'stats', label: 'Key Stats' },
    { key: 'api', label: 'API Keys' },
    { key: 'integrations', label: 'Integrations' },
    { key: 'automations', label: 'Automations' },
    { key: 'control', label: 'Control Panel' },
    { key: 'logs', label: 'Activity Logs' },
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[95vh] overflow-hidden p-0 rounded-[24px] border-none">
        <div className="relative h-full flex flex-col backdrop-blur-xl bg-white/95">
          {/* Header */}
          <div className="relative border-b border-[#E9E2D7]/30 p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F7F4EF]/50 transition-colors z-10"
            >
              <X className="h-5 w-5 text-[#8B7355]" />
            </button>
            
            <div className="flex items-start gap-4 pr-12">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex items-center justify-center flex-shrink-0">
                <Building2 className="h-7 w-7 text-white" strokeWidth={1.5} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-2xl text-[#6E5A4F] mb-2">
                  {organisation.name}
                </h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge
                    variant="outline"
                    className={`${statusColors[organisation.status]} rounded-full px-3 py-0.5 text-xs font-light`}
                  >
                    {organisation.status}
                  </Badge>
                  <span className="text-xs text-[#B8A896]">
                    {organisation.vertical} • {organisation.tier}
                  </span>
                  <span className="text-xs text-[#B8A896]">
                    {organisation.city}, {organisation.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2 rounded-full text-xs font-serif tracking-[0.08em] uppercase transition-all whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-[#D8C8A8]/30 text-[#6E5A4F]'
                      : 'text-[#B8A896] hover:bg-[#F7F4EF]/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                  <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Users className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#B8A896] mb-0.5">Primary Contact</p>
                        <p className="text-sm text-[#6E5A4F]">{organisation.primaryContact}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#B8A896] mb-0.5">Email</p>
                        <p className="text-sm text-[#6E5A4F]">{organisation.contactEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#B8A896] mb-0.5">Phone</p>
                        <p className="text-sm text-[#6E5A4F]">{organisation.contactPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#B8A896] mb-0.5">Website</p>
                        <a 
                          href={`https://${organisation.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-[#8B9D83] hover:underline"
                        >
                          {organisation.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                  <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4">
                    Business Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#B8A896] mb-0.5">Location</p>
                        <p className="text-sm text-[#6E5A4F]">{organisation.city}, {organisation.country}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#B8A896] mb-0.5">Timezone</p>
                        <p className="text-sm text-[#6E5A4F]">{organisation.timezone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#B8A896] mb-0.5">Languages</p>
                        <p className="text-sm text-[#6E5A4F]">{organisation.languages.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing */}
                <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                  <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4">
                    Billing & Subscription
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CreditCard className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#B8A896] mb-0.5">Billing Cycle</p>
                        <p className="text-sm text-[#6E5A4F]">{organisation.billingCycle}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#B8A896] mb-0.5">Next Renewal</p>
                        <p className="text-sm text-[#6E5A4F]">
                          {new Date(organisation.nextRenewal).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#B8A896] mb-0.5">Member Since</p>
                        <p className="text-sm text-[#6E5A4F]">
                          {new Date(organisation.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-[20px] bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] p-6 text-white">
                  <MessageSquare className="h-8 w-8 mb-3 opacity-80" strokeWidth={1.5} />
                  <p className="text-xs opacity-80 tracking-[0.08em] uppercase mb-1">Messages / Day</p>
                  <p className="text-4xl font-serif font-light">{organisation.messagesPerDay}</p>
                </div>

                <div className="rounded-[20px] bg-gradient-to-br from-[#8B9D83] to-[#7A8C73] p-6 text-white">
                  <Users className="h-8 w-8 mb-3 opacity-80" strokeWidth={1.5} />
                  <p className="text-xs opacity-80 tracking-[0.08em] uppercase mb-1">Active Staff</p>
                  <p className="text-4xl font-serif font-light">{organisation.activeStaff}</p>
                </div>

                <div className="rounded-[20px] bg-gradient-to-br from-[#B08A64] to-[#9A7A54] p-6 text-white">
                  <Phone className="h-8 w-8 mb-3 opacity-80" strokeWidth={1.5} />
                  <p className="text-xs opacity-80 tracking-[0.08em] uppercase mb-1">WhatsApp Numbers</p>
                  <p className="text-4xl font-serif font-light">{organisation.whatsappNumbers}</p>
                </div>

                <div className="rounded-[20px] bg-gradient-to-br from-[#C9A876] to-[#B8986A] p-6 text-white">
                  <Settings className="h-8 w-8 mb-3 opacity-80" strokeWidth={1.5} />
                  <p className="text-xs opacity-80 tracking-[0.08em] uppercase mb-1">Integrations</p>
                  <p className="text-4xl font-serif font-light">{organisation.integrationsConnected}</p>
                </div>

                <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5 md:col-span-2">
                  <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-3">
                    Activity Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#8B7355]">Last Active</span>
                      <span className="text-sm text-[#6E5A4F] font-light">{organisation.lastActive}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#8B7355]">Experience Category</span>
                      <span className="text-sm text-[#6E5A4F] font-light">{organisation.experienceCategory}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-[#6E5A4F] mb-1">API Keys & Credentials</h3>
                    <p className="text-sm text-[#B8A896]">Manage authentication keys for this organisation</p>
                  </div>
                  <Button className="rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Generate New Key
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* WhatsApp Business API */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-[#B8A896]" />
                        <div>
                          <h4 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase">WhatsApp Business API</h4>
                          <p className="text-xs text-[#B8A896] mt-1">Phone Number ID & Access Token</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-[#8B9D83]/20 text-[#7A8C73] border-[#8B9D83]/30">Active</Badge>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-[#8B7355] mb-2 block">Phone Number ID</Label>
                        <div className="flex gap-2">
                          <Input
                            value="123456789012345"
                            readOnly
                            className="flex-1 bg-white/60"
                          />
                          <Button size="icon" variant="outline" className="flex-shrink-0">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-[#8B7355] mb-2 block">Access Token</Label>
                        <div className="flex gap-2">
                          <Input
                            value="EAA...•••...hidden"
                            type="password"
                            readOnly
                            className="flex-1 bg-white/60"
                          />
                          <Button size="icon" variant="outline" className="flex-shrink-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* API Authentication */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Key className="h-5 w-5 text-[#B8A896]" />
                        <div>
                          <h4 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase">ATTACHAI API Key</h4>
                          <p className="text-xs text-[#B8A896] mt-1">For accessing ATTACHAI services</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-[#8B7355]">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <Label className="text-xs text-[#8B7355] mb-2 block">API Key</Label>
                      <div className="flex gap-2">
                        <Input
                          value="sk_live_51H...•••...hidden"
                          type="password"
                          readOnly
                          className="flex-1 bg-white/60"
                        />
                        <Button size="icon" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-[#B8A896] mt-2">Created: Jan 15, 2025 • Last used: 2 hours ago</p>
                    </div>
                  </div>

                  {/* Webhook Configuration */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="h-5 w-5 text-[#B8A896]" />
                      <h4 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase">Webhook Configuration</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs text-[#8B7355] mb-2 block">Webhook URL</Label>
                        <Input
                          value="https://api.attachai.com/webhooks/org-12345"
                          readOnly
                          className="bg-white/60"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-[#8B7355] mb-2 block">Webhook Secret</Label>
                        <div className="flex gap-2">
                          <Input
                            value="whsec_...•••...hidden"
                            type="password"
                            readOnly
                            className="flex-1 bg-white/60"
                          />
                          <Button size="icon" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-[#6E5A4F] mb-1">Connected Integrations</h3>
                    <p className="text-sm text-[#B8A896]">Manage third-party services and data sync</p>
                  </div>
                  <Button className="rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Integration
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* PMS Integration */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex items-center justify-center">
                          <Database className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm text-[#6E5A4F]">Property Management System</h4>
                          <p className="text-xs text-[#B8A896]">Oracle Opera</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-[#8B9D83]/20 text-[#7A8C73] border-[#8B9D83]/30">Connected</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8B7355]">Last Sync</span>
                        <span className="text-[#6E5A4F]">5 minutes ago</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8B7355]">Status</span>
                        <span className="text-[#6E5A4F]">Active</span>
                      </div>
                      <Button variant="outline" className="w-full rounded-full mt-2">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                    </div>
                  </div>

                  {/* CRM Integration */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B9D83] to-[#7A8C73] flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm text-[#6E5A4F]">Salesforce CRM</h4>
                          <p className="text-xs text-[#B8A896]">Guest Data Sync</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-[#C9A876]/20 text-[#B8986A] border-[#C9A876]/30">Syncing</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8B7355]">Last Sync</span>
                        <span className="text-[#6E5A4F]">Syncing now...</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8B7355]">Records Synced</span>
                        <span className="text-[#6E5A4F]">1,234</span>
                      </div>
                      <Button variant="outline" className="w-full rounded-full mt-2">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                    </div>
                  </div>

                  {/* Payment Integration */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B08A64] to-[#9A7A54] flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm text-[#6E5A4F]">Stripe Payments</h4>
                          <p className="text-xs text-[#B8A896]">Payment Processing</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-[#8B9D83]/20 text-[#7A8C73] border-[#8B9D83]/30">Connected</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8B7355]">Account ID</span>
                        <span className="text-[#6E5A4F]">acct_...4321</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8B7355]">Environment</span>
                        <span className="text-[#6E5A4F]">Production</span>
                      </div>
                      <Button variant="outline" className="w-full rounded-full mt-2">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                    </div>
                  </div>

                  {/* Analytics Integration */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A876] to-[#B8986A] flex items-center justify-center">
                          <Activity className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm text-[#6E5A4F]">Google Analytics</h4>
                          <p className="text-xs text-[#B8A896]">Event Tracking</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-[#B8A896]/20 text-[#8B7355] border-[#B8A896]/30">Setup Required</Badge>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-[#8B7355]">Complete setup to start tracking events and user behavior</p>
                      <Button className="w-full rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-white">
                        Complete Setup
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'automations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-[#6E5A4F] mb-1">Automation Rules</h3>
                    <p className="text-sm text-[#B8A896]">Configure automated workflows and responses</p>
                  </div>
                  <Button className="rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Rule
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Welcome Message */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-[#B8A896]" />
                        <div>
                          <h4 className="font-serif text-sm text-[#6E5A4F]">Welcome Message</h4>
                          <p className="text-xs text-[#B8A896] mt-1">Send greeting when guest first messages</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <p className="text-sm text-[#6E5A4F]">
                        "Welcome to ATTACHAI Club! I'm your AI concierge, here to assist with reservations, spa bookings, and any requests during your stay. How may I help you today?"
                      </p>
                    </div>
                    <Button variant="ghost" className="mt-3 text-[#8B7355]">
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Message
                    </Button>
                  </div>

                  {/* Auto-escalation */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-[#B8A896]" />
                        <div>
                          <h4 className="font-serif text-sm text-[#6E5A4F]">Auto-escalation to Staff</h4>
                          <p className="text-xs text-[#B8A896] mt-1">Escalate when AI confidence is low</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-[#8B7355] mb-2 block">Confidence Threshold</Label>
                        <Input value="70%" readOnly className="bg-white/60" />
                      </div>
                      <div>
                        <Label className="text-xs text-[#8B7355] mb-2 block">Escalate To</Label>
                        <Input value="On-duty Manager" readOnly className="bg-white/60" />
                      </div>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-[#B8A896]" />
                        <div>
                          <h4 className="font-serif text-sm text-[#6E5A4F]">After-hours Auto-response</h4>
                          <p className="text-xs text-[#B8A896] mt-1">Send message outside business hours</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-[#8B7355] mb-2 block">Business Hours</Label>
                          <Input value="8:00 AM - 10:00 PM" readOnly className="bg-white/60" />
                        </div>
                        <div>
                          <Label className="text-xs text-[#8B7355] mb-2 block">Timezone</Label>
                          <Input value="Pacific Time (PT)" readOnly className="bg-white/60" />
                        </div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-4">
                        <p className="text-sm text-[#6E5A4F]">
                          "Thank you for reaching out. Our team is currently offline but will respond first thing in the morning. For urgent matters, please call +1 (424) 555-0199."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'control' && (
              <div className="space-y-6">
                <div className="rounded-[20px] bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] p-8 text-white">
                  <Eye className="h-12 w-12 mb-4 opacity-80" />
                  <h3 className="font-serif text-2xl mb-2">Access Organisation Control Panel</h3>
                  <p className="text-sm opacity-90 mb-6">
                    View and manage this organisation's dashboard as if you were logged in as them. Perfect for setup and troubleshooting.
                  </p>
                  <Button className="bg-white text-[#6E5A4F] hover:bg-white/90 rounded-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Control Panel
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Quick Actions */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                    <h4 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start rounded-full">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start rounded-full">
                        <Users className="mr-2 h-4 w-4" />
                        Manage Team Members
                      </Button>
                      <Button variant="outline" className="w-full justify-start rounded-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        View Conversations
                      </Button>
                      <Button variant="outline" className="w-full justify-start rounded-full">
                        <Activity className="mr-2 h-4 w-4" />
                        Check Analytics
                      </Button>
                    </div>
                  </div>

                  {/* Setup Checklist */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                    <h4 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4">Setup Checklist</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#8B9D83] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-white">✓</span>
                        </div>
                        <span className="text-sm text-[#6E5A4F]">WhatsApp Connected</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#8B9D83] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-white">✓</span>
                        </div>
                        <span className="text-sm text-[#6E5A4F]">Team Members Added</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#8B9D83] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-white">✓</span>
                        </div>
                        <span className="text-sm text-[#6E5A4F]">Brand Voice Configured</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#C9A876] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-white">!</span>
                        </div>
                        <span className="text-sm text-[#6E5A4F]">Integrations Pending</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
                  <h4 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4">Admin Notes</h4>
                  <Textarea
                    placeholder="Add internal notes about this organisation's setup, requirements, or special considerations..."
                    rows={4}
                    className="bg-white/60 resize-none"
                  />
                  <Button className="mt-3 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-white">
                    <Save className="mr-2 h-4 w-4" />
                    Save Notes
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="space-y-3">
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <div
                      key={log.id}
                      className="rounded-[16px] bg-[#F7F4EF]/50 p-4 hover:bg-[#F7F4EF]/80 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Activity className="h-4 w-4 text-[#B8A896] mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-light ${
                                eventTypeColors[log.eventType]
                              }`}
                            >
                              {log.eventType}
                            </span>
                            <span className="text-xs text-[#B8A896]">
                              {new Date(log.timestamp).toLocaleString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-[#6E5A4F] mb-1">{log.description}</p>
                          {log.userName && (
                            <p className="text-xs text-[#B8A896]">by {log.userName}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Activity className="h-12 w-12 text-[#B8A896] mx-auto mb-3 opacity-40" />
                    <p className="text-sm text-[#B8A896]">No activity logs available</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-[#E9E2D7]/30 p-4 flex justify-between gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="rounded-full text-[#8B7355] hover:bg-[#F7F4EF]/50"
            >
              Close
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-full border-[#D8C8A8]/30"
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Invite
              </Button>
              <Button
                className="rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-white hover:shadow-lg transition-all"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
