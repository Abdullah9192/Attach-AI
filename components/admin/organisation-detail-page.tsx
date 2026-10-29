"use client"

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { AdminOrganisation, mockActivityLogs, mockOrganisationReports, OrganisationReport } from '@/mock/admin-organisations'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Building2, Mail, Phone, Globe, Users, MessageSquare, Clock, Calendar, MapPin, CreditCard, Settings, Activity, ArrowLeft, Key, Zap, Database, Eye, Save, Copy, Plus, Trash2, ExternalLink, DollarSign, UserCircle, TrendingUp, BarChart3 } from 'lucide-react'
import { BillingPlansTab } from './billing-plans-tab'
import { getTeamMemberNames } from '@/mock/team-members'


interface OrganisationDetailPageProps {
  organisation: AdminOrganisation
}

export function OrganisationDetailPage({ organisation: initialOrg }: OrganisationDetailPageProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'billing' | 'integrations' | 'automations' | 'documents' | 'control' | 'logs' | 'reports'>('overview')
  const [organisation, setOrganisation] = useState(initialOrg)
  const [editMode, setEditMode] = useState<Record<string, boolean>>({})
  const [hasChanges, setHasChanges] = useState(false)
  
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({})

  const [externalDocs, setExternalDocs] = useState(organisation.externalDocuments || [])

  const logs = mockActivityLogs[organisation.id] || []
  const reports = mockOrganisationReports[organisation.id] || []

  // CHANGE: Added state management for reports drawer and filters
  const [selectedReport, setSelectedReport] = useState<OrganisationReport | null>(null)
  const [reportDrawerOpen, setReportDrawerOpen] = useState(false)
  const [reportFilters, setReportFilters] = useState({
    type: 'All',
    priority: 'All',
    status: 'All',
    assignedTo: 'All',
  })
  const [reportSort, setReportSort] = useState<'newest' | 'oldest' | 'priority' | 'status'>('newest')
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp')
  const [internalNotes, setInternalNotes] = useState<Array<{ id: string; author: string; timestamp: string; note: string }>>([])
  const [newNote, setNewNote] = useState('')

  const handleFieldEdit = (field: string) => {
    setEditMode({ ...editMode, [field]: true })
  }

  const handleFieldSave = (field: string, value: any) => {
    setOrganisation({ ...organisation, [field]: value })
    setEditMode({ ...editMode, [field]: false })
    setHasChanges(true)
  }

  const handleSaveAll = () => {
    console.log('[v0] Saving organisation data:', organisation)
    setHasChanges(false)
    // Here you would call an API to save the data
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const maskApiKey = (key: string | undefined) => {
    if (!key) return 'Not configured'
    const visibleChars = 8
    if (key.length <= visibleChars) return key
    return key.slice(0, 4) + '*'.repeat(key.length - visibleChars) + key.slice(-4)
  }

  const toggleApiKeyVisibility = (keyName: string) => {
    setShowApiKeys({ ...showApiKeys, [keyName]: !showApiKeys[keyName] })
  }

  const addExternalDocument = () => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: '',
      type: 'URL Link' as const, // Default to URL Link for flexibility
      url: '',
      description: '',
      usedForAI: false,
    }
    setExternalDocs([...externalDocs, newDoc])
    setHasChanges(true)
  }

  const updateExternalDocument = (id: string, field: string, value: any) => {
    const updated = externalDocs.map(doc =>
      doc.id === id ? { ...doc, [field]: value } : doc
    )
    setExternalDocs(updated)
    setHasChanges(true)
  }

  const removeExternalDocument = (id: string) => {
    setExternalDocs(externalDocs.filter(doc => doc.id !== id))
    setHasChanges(true)
  }

  const statusColors = {
    Live: 'bg-[#8B9D83]/20 text-[#7A8C73] border-[#8B9D83]/30',
    Onboarding: 'bg-[#C9A876]/20 text-[#B8986A] border-[#C9A876]/30',
    Paused: 'bg-[#B8A896]/20 text-[#8B7355] border-[#B8A896]/30',
    Trial: 'bg-[#D8C8A8]/20 text-[#C9A876] border-[#D8C8A8]/30',
  }

  const onboardingStatusColors = {
    'Discovery': 'bg-[#E9E2D7]/40 text-[#B8A896] border-[#E9E2D7]/60',
    'Contract sent': 'bg-[#D8C8A8]/20 text-[#C9A876] border-[#D8C8A8]/30',
    'Waiting for payment': 'bg-[#C9A876]/20 text-[#B8986A] border-[#C9A876]/30',
    'API Setup': 'bg-blue-100 text-blue-700',
    'Configuration & testing': 'bg-purple-100 text-purple-700',
    'Live': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
    'Archived': 'bg-gray-200 text-gray-500',
  }

  const eventTypeColors = {
    Message: 'bg-[#D8C8A8]/20 text-[#B8986A] border-[#D8C8A8]/30',
    Automation: 'bg-[#8B9D83]/20 text-[#7A8C73] border-[#8B9D83]/30',
    Error: 'bg-[#C9A876]/20 text-[#B8986A] border-[#C9A876]/30',
    Login: 'bg-[#E9E2D7]/40 text-[#8B7355] border-[#E9E2D7]/60',
    'Staff Added': 'bg-[#B8A896]/20 text-[#8B7355] border-[#B8A896]/30',
    Integration: 'bg-[#D8C8A8]/30 text-[#C9A876] border-[#D8C8A8]/40',
    'API Call': 'bg-[#E9E2D7]/30 text-[#B8A896] border-[#E9E2D7]/50',
    'System Event': 'bg-[#F7F4EF]/60 text-[#8B7355] border-[#E9E2D7]/40',
    Database: 'bg-[#C9A876]/15 text-[#B8A896] border-[#C9A876]/25',
    Webhook: 'bg-[#B8A896]/15 text-[#8B7355] border-[#B8A896]/25',
  }

  const priorityColors = {
    Low: 'bg-[#E9E2D7]/40 text-[#B8A896] border-[#E9E2D7]/60',
    Medium: 'bg-[#D8C8A8]/20 text-[#C9A876] border-[#D8C8A8]/30',
    High: 'bg-[#C9A876]/20 text-[#B8A896] border-[#C9A876]/30',
    Critical: 'bg-[#B8986A]/20 text-[#8B7355] border-[#B8986A]/30',
  }

  const reportStatusColors = {
    Open: 'bg-[#E9E2D7]/40 text-[#B8A896] border-[#E9E2D7]/60',
    'In Progress': 'bg-[#D8C8A8]/20 text-[#C9A876] border-[#D8C8A8]/30',
    Resolved: 'bg-[#8B9D83]/20 text-[#7A8C73] border-[#8B9D83]/30',
    Closed: 'bg-[#B8A896]/20 text-[#8B7355] border-[#B8A896]/30',
  }

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'stats', label: 'Key Stats' },
    { key: 'billing', label: 'Billing & Plans' }, // Added billing tab
    { key: 'integrations', label: 'Integrations' },
    { key: 'automations', label: 'Automations' },
    { key: 'documents', label: 'External Documents' },
    { key: 'control', label: 'Control Panel' },
    { key: 'logs', label: 'Activity Logs' },
    { key: 'reports', label: 'Reports' },
  ]

  // CHANGE: Define attachaiTeamMembers, whatsappTemplates, filteredAndSortedReports, updateReportStatus, updateReportAssignee, addInternalNote, sendWhatsAppMessage, sendEmailMessage
  const attachaiTeamMembers = useMemo(() => getTeamMemberNames(), [])

  const whatsappTemplates = {
    reviewing: "Hello! We're currently reviewing your request and will get back to you shortly.",
    update: "We wanted to update you on the progress of your request.",
    resolved: "Great news! Your request has been resolved. Please let us know if you need any further assistance.",
  }

  const filteredAndSortedReports = reports
    .filter(report => {
      if (reportFilters.type !== 'All' && report.type !== reportFilters.type) return false
      if (reportFilters.priority !== 'All' && report.priority !== reportFilters.priority) return false
      if (reportFilters.status !== 'All' && report.status !== reportFilters.status) return false
      if (reportFilters.assignedTo !== 'All' && report.assignedTo !== reportFilters.assignedTo) return false
      return true
    })
    .sort((a, b) => {
      if (reportSort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (reportSort === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (reportSort === 'priority') {
        const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      if (reportSort === 'status') {
        const statusOrder = { Open: 0, 'In Progress': 1, 'Awaiting Client Reply': 2, Resolved: 3, Closed: 4 }
        return statusOrder[a.status] - statusOrder[b.status]
      }
      return 0
    })

  const updateReportStatus = (reportId: string, newStatus: string) => {
    console.log(`[v0] Updating report ${reportId} status to:`, newStatus)
    // Update in parent state would happen here
    setHasChanges(true)
  }

  const updateReportAssignee = (reportId: string, assignee: string) => {
    console.log(`[v0] Assigning report ${reportId} to:`, assignee)
    setHasChanges(true)
  }

  const addInternalNote = () => {
    if (!newNote.trim()) return
    const note = {
      id: `note-${Date.now()}`,
      author: 'Grace Gordon', // Would come from admin auth context
      timestamp: new Date().toISOString(),
      note: newNote,
    }
    setInternalNotes([...internalNotes, note])
    setNewNote('')
    console.log('[v0] Added internal note:', note)
  }

  const sendWhatsAppMessage = (template: string, customMessage?: string) => {
    const message = customMessage || whatsappTemplates[template as keyof typeof whatsappTemplates]
    console.log('[v0] Sending WhatsApp message:', message)
    setContactModalOpen(false)
    // Show toast notification would happen here
  }

  const sendEmailMessage = (subject: string, body: string) => {
    console.log('[v0] Sending email:', { subject, body })
    setContactModalOpen(false)
    // Show toast notification would happen here
  }

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 w-full">
        {/* Back Button & Save Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/admin')}
            className="rounded-full hover:bg-[#F7F4EF]/50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="font-serif text-[11px] tracking-[0.08em] uppercase">Back to Admin</span>
          </Button>

          {hasChanges && (
            <Button
              onClick={handleSaveAll}
              className="rounded-full bg-[#8B9D83] hover:bg-[#7A8C73] text-white w-full sm:w-auto"
            >
              <Save className="mr-2 h-4 w-4" />
              <span className="font-serif text-[11px] tracking-[0.08em] uppercase">Save All Changes</span>
            </Button>
          )}
        </div>

        {/* Header Card */}
        <div className="backdrop-blur-3xl bg-white/80 border-4 border-[#E9E2D7]/40 rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex items-center justify-center flex-shrink-0">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" strokeWidth={1.5} />
            </div>
            
            <div className="flex-1 min-w-0 w-full">
              <h1 className="font-serif text-[20px] sm:text-[24px] lg:text-[28px] tracking-[0.02em] text-[#6E5A4F] mb-3 break-words">
                {organisation.name}
              </h1>
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <Badge
                  variant="outline"
                  className={`${statusColors[organisation.status]} rounded-full px-3 sm:px-4 py-1 text-xs font-light`}
                >
                  {organisation.status}
                </Badge>
                <span className="text-xs sm:text-sm text-[#B8A896]">
                  {organisation.vertical} • {organisation.tier}
                </span>
                <span className="text-xs sm:text-sm text-[#B8A896]">
                  {organisation.city}, {organisation.country}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-serif tracking-[0.08em] uppercase transition-all whitespace-nowrap flex-shrink-0 ${
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
        <div className="backdrop-blur-3xl bg-white/80 border-4 border-[#E9E2D7]/40 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Subscription & Billing */}
              <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Subscription & Billing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-[#B8A896] mb-1">Subscription Type</p>
                      <p className="text-sm text-[#6E5A4F] font-medium">{organisation.subscriptionType}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-[#B8A896] mb-1">Monthly Revenue</p>
                      {editMode['monthlyRevenue'] ? (
                        <Input
                          type="number"
                          value={organisation.monthlyRevenue}
                          onChange={(e) => setOrganisation({ ...organisation, monthlyRevenue: Number(e.target.value) })}
                          onBlur={() => handleFieldSave('monthlyRevenue', organisation.monthlyRevenue)}
                          className="h-7 text-sm"
                          autoFocus
                        />
                      ) : (
                        <p 
                          className="text-sm text-[#6E5A4F] font-medium cursor-pointer hover:text-[#8B9D83]"
                          onClick={() => handleFieldEdit('monthlyRevenue')}
                        >
                          £{organisation.monthlyRevenue.toLocaleString()}/mo
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-[#B8A896] mb-1">Member Since</p>
                      <p className="text-sm text-[#6E5A4F]">
                        {new Date(organisation.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-[#B8A896] mb-1">Billing Cycle</p>
                      <p className="text-sm text-[#6E5A4F]">{organisation.billingCycle}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-[#B8A896] mb-1">Next Renewal</p>
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
                    <DollarSign className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-[#B8A896] mb-1">Setup Fees (Total)</p>
                      <p className="text-sm text-[#6E5A4F] font-medium">
                        £{organisation.locations?.reduce((sum, loc) => sum + loc.implementationFeeAmount, 0).toLocaleString() || '0'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Onboarding Status & Account Manager */}
              <div className="rounded-[20px] bg-[#F7F4EF]/50 p-4 sm:p-5">
                <h3 className="font-serif text-xs sm:text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Client Journey & Management
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-[#B8A896] mb-2 block">Onboarding Status</Label>
                    <Select
                      value={organisation.onboardingStatus}
                      onValueChange={(value: any) => {
                        handleFieldSave('onboardingStatus', value)
                      }}
                    >
                      <SelectTrigger className="rounded-full border-[#E9E2D7]/60 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Discovery">Discovery</SelectItem>
                        <SelectItem value="Contract sent">Contract sent</SelectItem>
                        <SelectItem value="Waiting for payment">Waiting for payment</SelectItem>
                        <SelectItem value="API Setup">API Setup</SelectItem>
                        <SelectItem value="Configuration & testing">Configuration & testing</SelectItem>
                        <SelectItem value="Live">Live</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-[#B8A896] mt-2">
                      Automated workflows trigger based on this status
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <UserCircle className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-[#B8A896] mb-1">Account Manager</p>
                      {editMode['accountManager'] ? (
                        <Input
                          value={organisation.accountManager}
                          onChange={(e) => setOrganisation({ ...organisation, accountManager: e.target.value })}
                          onBlur={() => handleFieldSave('accountManager', organisation.accountManager)}
                          className="h-7 text-sm"
                          autoFocus
                        />
                      ) : (
                        <p 
                          className="text-sm text-[#6E5A4F] font-medium cursor-pointer hover:text-[#8B9D83]"
                          onClick={() => handleFieldEdit('accountManager')}
                        >
                          {organisation.accountManager}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-[#B8A896] mb-0.5">Primary Contact</p>
                      {editMode['primaryContact'] ? (
                        <Input
                          value={organisation.primaryContact}
                          onChange={(e) => setOrganisation({ ...organisation, primaryContact: e.target.value })}
                          onBlur={() => handleFieldSave('primaryContact', organisation.primaryContact)}
                          className="h-7 text-sm"
                          autoFocus
                        />
                      ) : (
                        <p 
                          className="text-sm text-[#6E5A4F] cursor-pointer hover:text-[#8B9D83]"
                          onClick={() => handleFieldEdit('primaryContact')}
                        >
                          {organisation.primaryContact}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-[#B8A896] mb-0.5">Email</p>
                      {editMode['contactEmail'] ? (
                        <Input
                          value={organisation.contactEmail}
                          onChange={(e) => setOrganisation({ ...organisation, contactEmail: e.target.value })}
                          onBlur={() => handleFieldSave('contactEmail', organisation.contactEmail)}
                          className="h-7 text-sm"
                          autoFocus
                        />
                      ) : (
                        <p 
                          className="text-sm text-[#6E5A4F] cursor-pointer hover:text-[#8B9D83]"
                          onClick={() => handleFieldEdit('contactEmail')}
                        >
                          {organisation.contactEmail}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-[#B8A896] mb-0.5">Phone</p>
                      {editMode['contactPhone'] ? (
                        <Input
                          value={organisation.contactPhone}
                          onChange={(e) => setOrganisation({ ...organisation, contactPhone: e.target.value })}
                          onBlur={() => handleFieldSave('contactPhone', organisation.contactPhone)}
                          className="h-7 text-sm"
                          autoFocus
                        />
                      ) : (
                        <p 
                          className="text-sm text-[#6E5A4F] cursor-pointer hover:text-[#8B9D83]"
                          onClick={() => handleFieldEdit('contactPhone')}
                        >
                          {organisation.contactPhone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
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
                  {/* Removed Environment field display
                    <div className="flex items-start gap-3">
                      <Settings className="h-4 w-4 text-[#B8A896] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#B8A896] mb-0.5">Environment</p>
                        <p className="text-sm text-[#6E5A4F]">{organisation.environment}</p>
                      </div>
                    </div>
                  */}
                </div>
              </div>
            </div>
          )}

          {/* KEY STATS TAB */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-[20px] bg-gradient-to-br from-[#D8C8A8]/20 to-[#C9A876]/10 p-6 border border-[#E9E2D7]/40">
                  <MessageSquare className="h-6 w-6 text-[#C9A876] mb-3" />
                  <p className="text-xs text-[#B8A896] mb-1">Messages per Day</p>
                  <p className="text-2xl font-serif text-[#6E5A4F]">{organisation.messagesPerDay}</p>
                </div>
                <div className="rounded-[20px] bg-gradient-to-br from-[#8B9D83]/20 to-[#7A8C73]/10 p-6 border border-[#E9E2D7]/40">
                  <Users className="h-6 w-6 text-[#8B9D83] mb-3" />
                  <p className="text-xs text-[#B8A896] mb-1">Active Staff</p>
                  <p className="text-2xl font-serif text-[#6E5A4F]">{organisation.activeStaff}</p>
                </div>
                <div className="rounded-[20px] bg-gradient-to-br from-[#B8A896]/20 to-[#8B7355]/10 p-6 border border-[#E9E2D7]/40">
                  <Phone className="h-6 w-6 text-[#B8A896] mb-3" />
                  <p className="text-xs text-[#B8A896] mb-1">WhatsApp Numbers</p>
                  <p className="text-2xl font-serif text-[#6E5A4F]">{organisation.whatsappNumbers}</p>
                </div>
                <div className="rounded-[20px] bg-gradient-to-br from-[#D8C8A8]/20 to-[#B8986A]/10 p-6 border border-[#E9E2D7]/40">
                  <Database className="h-6 w-6 text-[#D8C8A8] mb-3" />
                  <p className="text-xs text-[#B8A896] mb-1">Integrations</p>
                  <p className="text-2xl font-serif text-[#6E5A4F]">{organisation.integrationsConnected}</p>
                </div>
              </div>

              <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                <h4 className="font-serif text-xs tracking-[0.08em] text-[#6E5A4F] uppercase mb-3">
                  Activity Summary
                </h4>
                <div className="space-y-2 text-sm text-[#6E5A4F]">
                  <div className="flex justify-between">
                    <span className="text-[#B8A896]">Last Active:</span>
                    <span>{organisation.lastActive}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B8A896]">Total Revenue (Annual):</span>
                    <span>£{(organisation.monthlyRevenue * 12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B8A896]">Experience Category:</span>
                    <span>{organisation.experienceCategory}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BILLING & PLANS TAB */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="mb-4">
                <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-2 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Billing & Subscription Plans
                </h3>
                <p className="text-xs text-[#8B7355] leading-relaxed">
                  Manage subscription tiers and implementation fees for each location. All subscriptions and setup fees are charged per location.
                </p>
              </div>

              <BillingPlansTab
                locations={organisation.locations || []}
                onUpdate={(updatedLocations) => {
                  setOrganisation({ ...organisation, locations: updatedLocations })
                  setHasChanges(true)
                }}
              />
            </div>
          )}

          {/* INTEGRATIONS TAB (merged with API Keys) */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Stripe Connection
                </h3>
                <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label className="text-sm text-[#6E5A4F] font-medium">Stripe Account</Label>
                      <p className="text-xs text-[#B8A896] mt-1">
                        Connect their Stripe account to enable payment processing and billing automation
                      </p>
                    </div>
                    <Switch
                      checked={organisation.stripeConnected || false}
                      onCheckedChange={(checked) => {
                        setOrganisation({ ...organisation, stripeConnected: checked })
                        setHasChanges(true)
                      }}
                    />
                  </div>
                  
                  {organisation.stripeConnected && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label className="text-xs text-[#B8A896] mb-2 block">Stripe Account ID</Label>
                        <Input
                          value={organisation.stripeAccountId || ''}
                          onChange={(e) => {
                            setOrganisation({ ...organisation, stripeAccountId: e.target.value })
                            setHasChanges(true)
                          }}
                          placeholder="acct_1234567890"
                          className="font-mono text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-[#B8A896] mb-2 block">Stripe Publishable Key</Label>
                        <Input
                          value={organisation.stripePublishableKey || ''}
                          onChange={(e) => {
                            setOrganisation({ ...organisation, stripePublishableKey: e.target.value })
                            setHasChanges(true)
                          }}
                          placeholder="pk_live_..."
                          className="font-mono text-xs"
                        />
                      </div>
                      <div className="rounded-lg bg-[#D8C8A8]/10 border border-[#D8C8A8]/30 p-3">
                        <p className="text-xs text-[#6E5A4F]">
                          <strong>Note:</strong> Connecting Stripe enables automated invoicing, subscription management, and payment collection for this organisation.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* API Keys Section */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4 flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  API Keys & Authentication
                </h3>
                <div className="space-y-4">
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-xs text-[#B8A896]">WhatsApp API Key</Label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleApiKeyVisibility('whatsapp')}
                          className="h-7 text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          {showApiKeys['whatsapp'] ? 'Hide' : 'Show'}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(organisation.whatsappApiKey || '')}
                          className="h-7 text-xs"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                    {editMode['whatsappApiKey'] ? (
                      <Input
                        value={organisation.whatsappApiKey}
                        onChange={(e) => setOrganisation({ ...organisation, whatsappApiKey: e.target.value })}
                        onBlur={() => handleFieldSave('whatsappApiKey', organisation.whatsappApiKey)}
                        className="font-mono text-xs"
                        autoFocus
                      />
                    ) : (
                      <code 
                        className="block text-xs text-[#6E5A4F] bg-white/50 p-3 rounded-lg cursor-pointer hover:bg-white/80"
                        onClick={() => handleFieldEdit('whatsappApiKey')}
                      >
                        {showApiKeys['whatsapp'] ? organisation.whatsappApiKey : maskApiKey(organisation.whatsappApiKey)}
                      </code>
                    )}
                  </div>

                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-xs text-[#B8A896]">ATTACHAI API Key</Label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleApiKeyVisibility('attachai')}
                          className="h-7 text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          {showApiKeys['attachai'] ? 'Hide' : 'Show'}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(organisation.attachaiApiKey || '')}
                          className="h-7 text-xs"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                    {editMode['attachaiApiKey'] ? (
                      <Input
                        value={organisation.attachaiApiKey}
                        onChange={(e) => setOrganisation({ ...organisation, attachaiApiKey: e.target.value })}
                        onBlur={() => handleFieldSave('attachaiApiKey', organisation.attachaiApiKey)}
                        className="font-mono text-xs"
                        autoFocus
                      />
                    ) : (
                      <code 
                        className="block text-xs text-[#6E5A4F] bg-white/50 p-3 rounded-lg cursor-pointer hover:bg-white/80"
                        onClick={() => handleFieldEdit('attachaiApiKey')}
                      >
                        {showApiKeys['attachai'] ? organisation.attachaiApiKey : maskApiKey(organisation.attachaiApiKey)}
                      </code>
                    )}
                  </div>

                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                    <Label className="text-xs text-[#B8A896] mb-3 block">Webhook URL</Label>
                    {editMode['webhookUrl'] ? (
                      <Input
                        value={organisation.webhookUrl}
                        onChange={(e) => setOrganisation({ ...organisation, webhookUrl: e.target.value })}
                        onBlur={() => handleFieldSave('webhookUrl', organisation.webhookUrl)}
                        className="font-mono text-xs"
                        placeholder="https://yourdomain.com/webhooks/attachai"
                        autoFocus
                      />
                    ) : (
                      <code 
                        className="block text-xs text-[#6E5A4F] bg-white/50 p-3 rounded-lg cursor-pointer hover:bg-white/80"
                        onClick={() => handleFieldEdit('webhookUrl')}
                      >
                        {organisation.webhookUrl || 'Not configured - click to add'}
                      </code>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Connected Integrations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* PMS Integration */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-[#B8A896]" />
                        <Label className="text-xs text-[#B8A896]">Property Management System</Label>
                      </div>
                      <Switch
                        checked={organisation.integrations.pms?.connected}
                        onCheckedChange={(checked) => {
                          const newIntegrations = {
                            ...organisation.integrations,
                            pms: { ...organisation.integrations.pms!, connected: checked }
                          }
                          handleFieldSave('integrations', newIntegrations)
                        }}
                      />
                    </div>
                    {organisation.integrations.pms && (
                      <>
                        <Select
                          value={organisation.integrations.pms.name || ''}
                          onValueChange={(value) => {
                            const newIntegrations = {
                              ...organisation.integrations,
                              pms: { ...organisation.integrations.pms!, name: value }
                            }
                            setOrganisation({ ...organisation, integrations: newIntegrations })
                            setHasChanges(true)
                          }}
                        >
                          <SelectTrigger className="mb-2 text-xs">
                            <SelectValue placeholder="Select PMS" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Opera PMS">Opera PMS</SelectItem>
                            <SelectItem value="Cloudbeds">Cloudbeds</SelectItem>
                            <SelectItem value="Mews">Mews</SelectItem>
                            <SelectItem value="Protel">Protel</SelectItem>
                            <SelectItem value="RoomRaccoon">RoomRaccoon</SelectItem>
                            <SelectItem value="Custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        {organisation.integrations.pms.connected && (
                          <Input
                            value={organisation.integrations.pms.apiKey || ''}
                            onChange={(e) => {
                              const newIntegrations = {
                                ...organisation.integrations,
                                pms: { ...organisation.integrations.pms!, apiKey: e.target.value }
                              }
                              setOrganisation({ ...organisation, integrations: newIntegrations })
                              setHasChanges(true)
                            }}
                            placeholder="API Key"
                            className="font-mono text-xs"
                          />
                        )}
                      </>
                    )}
                  </div>

                  {/* CRM Integration */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#B8A896]" />
                        <Label className="text-xs text-[#B8A896]">CRM System</Label>
                      </div>
                      <Switch
                        checked={organisation.integrations.crm?.connected}
                        onCheckedChange={(checked) => {
                          const newIntegrations = {
                            ...organisation.integrations,
                            crm: { ...organisation.integrations.crm!, connected: checked }
                          }
                          handleFieldSave('integrations', newIntegrations)
                        }}
                      />
                    </div>
                    {organisation.integrations.crm && (
                      <>
                        <Select
                          value={organisation.integrations.crm.name || ''}
                          onValueChange={(value) => {
                            const newIntegrations = {
                              ...organisation.integrations,
                              crm: { ...organisation.integrations.crm!, name: value }
                            }
                            setOrganisation({ ...organisation, integrations: newIntegrations })
                            setHasChanges(true)
                          }}
                        >
                          <SelectTrigger className="mb-2 text-xs">
                            <SelectValue placeholder="Select CRM" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Salesforce">Salesforce</SelectItem>
                            <SelectItem value="HubSpot">HubSpot</SelectItem>
                            <SelectItem value="Zoho">Zoho CRM</SelectItem>
                            <SelectItem value="Pipedrive">Pipedrive</SelectItem>
                            <SelectItem value="Monday.com">Monday.com</SelectItem>
                            <SelectItem value="Custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        {organisation.integrations.crm.connected && (
                          <Input
                            value={organisation.integrations.crm.apiKey || ''}
                            onChange={(e) => {
                              const newIntegrations = {
                                ...organisation.integrations,
                                crm: { ...organisation.integrations.crm!, apiKey: e.target.value }
                              }
                              setOrganisation({ ...organisation, integrations: newIntegrations })
                              setHasChanges(true)
                            }}
                            placeholder="API Key"
                            className="font-mono text-xs"
                          />
                        )}
                      </>
                    )}
                  </div>

                  {/* Payments Integration */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-[#B8A896]" />
                        <Label className="text-xs text-[#B8A896]">Payment Processor</Label>
                      </div>
                      <Switch
                        checked={organisation.integrations.payments?.connected}
                        onCheckedChange={(checked) => {
                          const newIntegrations = {
                            ...organisation.integrations,
                            payments: { ...organisation.integrations.payments!, connected: checked }
                          }
                          handleFieldSave('integrations', newIntegrations)
                        }}
                      />
                    </div>
                    {organisation.integrations.payments && (
                      <>
                        <Select
                          value={organisation.integrations.payments.name || ''}
                          onValueChange={(value) => {
                            const newIntegrations = {
                              ...organisation.integrations,
                              payments: { ...organisation.integrations.payments!, name: value }
                            }
                            setOrganisation({ ...organisation, integrations: newIntegrations })
                            setHasChanges(true)
                          }}
                        >
                          <SelectTrigger className="mb-2 text-xs">
                            <SelectValue placeholder="Select Payment Processor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Stripe">Stripe</SelectItem>
                            <SelectItem value="PayPal">PayPal</SelectItem>
                            <SelectItem value="Square">Square</SelectItem>
                            <SelectItem value="Adyen">Adyen</SelectItem>
                            <SelectItem value="Worldpay">Worldpay</SelectItem>
                            <SelectItem value="Custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        {organisation.integrations.payments.connected && (
                          <Input
                            value={organisation.integrations.payments.apiKey || ''}
                            onChange={(e) => {
                              const newIntegrations = {
                                ...organisation.integrations,
                                payments: { ...organisation.integrations.payments!, apiKey: e.target.value }
                              }
                              setOrganisation({ ...organisation, integrations: newIntegrations })
                              setHasChanges(true)
                            }}
                            placeholder="API Key"
                            className="font-mono text-xs"
                          />
                        )}
                      </>
                    )}
                  </div>

                  {/* Analytics Integration */}
                  <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-[#B8A896]" />
                        <Label className="text-xs text-[#B8A896]">Analytics Platform</Label>
                      </div>
                      <Switch
                        checked={organisation.integrations.analytics?.connected}
                        onCheckedChange={(checked) => {
                          const newIntegrations = {
                            ...organisation.integrations,
                            analytics: { ...organisation.integrations.analytics!, connected: checked }
                          }
                          handleFieldSave('integrations', newIntegrations)
                        }}
                      />
                    </div>
                    {organisation.integrations.analytics && (
                      <>
                        <Select
                          value={organisation.integrations.analytics.name || ''}
                          onValueChange={(value) => {
                            const newIntegrations = {
                              ...organisation.integrations,
                              analytics: { ...organisation.integrations.analytics!, name: value }
                            }
                            setOrganisation({ ...organisation, integrations: newIntegrations })
                            setHasChanges(true)
                          }}
                        >
                          <SelectTrigger className="mb-2 text-xs">
                            <SelectValue placeholder="Select Analytics" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Google Analytics">Google Analytics</SelectItem>
                            <SelectItem value="Mixpanel">Mixpanel</SelectItem>
                            <SelectItem value="Amplitude">Amplitude</SelectItem>
                            <SelectItem value="Segment">Segment</SelectItem>
                            <SelectItem value="Heap">Heap</SelectItem>
                            <SelectItem value="Custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        {organisation.integrations.analytics.connected && (
                          <Input
                            value={organisation.integrations.analytics.apiKey || ''}
                            onChange={(e) => {
                              const newIntegrations = {
                                ...organisation.integrations,
                                analytics: { ...organisation.integrations.analytics!, apiKey: e.target.value }
                              }
                              setOrganisation({ ...organisation, integrations: newIntegrations })
                              setHasChanges(true)
                            }}
                            placeholder="API Key / Tracking ID"
                            className="font-mono text-xs"
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AUTOMATIONS TAB */}
          {activeTab === 'automations' && (
            <div className="space-y-6">
              <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Automation Rules
              </h3>

              {/* Welcome Message */}
              <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-serif text-xs tracking-[0.08em] text-[#6E5A4F] uppercase">
                      Welcome Message
                    </h4>
                    <p className="text-xs text-[#B8A896] mt-1">Automatic greeting for new conversations</p>
                  </div>
                  <Switch
                    checked={organisation.automations.welcomeMessage.enabled}
                    onCheckedChange={(checked) => {
                      const newAutomations = {
                        ...organisation.automations,
                        welcomeMessage: { ...organisation.automations.welcomeMessage, enabled: checked }
                      }
                      handleFieldSave('automations', newAutomations)
                    }}
                  />
                </div>
                {organisation.automations.welcomeMessage.enabled && (
                  <Textarea
                    value={organisation.automations.welcomeMessage.message}
                    onChange={(e) => {
                      const newAutomations = {
                        ...organisation.automations,
                        welcomeMessage: { ...organisation.automations.welcomeMessage, message: e.target.value }
                      }
                      setOrganisation({ ...organisation, automations: newAutomations })
                      setHasChanges(true)
                    }}
                    placeholder="Enter welcome message"
                    className="text-sm"
                    rows={3}
                  />
                )}
              </div>

              {/* Auto-escalation */}
              <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-serif text-xs tracking-[0.08em] text-[#6E5A4F] uppercase">
                      Auto-Escalation
                    </h4>
                    <p className="text-xs text-[#B8A896] mt-1">Escalate unanswered messages automatically</p>
                  </div>
                  <Switch
                    checked={organisation.automations.autoEscalation.enabled}
                    onCheckedChange={(checked) => {
                      const newAutomations = {
                        ...organisation.automations,
                        autoEscalation: { ...organisation.automations.autoEscalation, enabled: checked }
                      }
                      handleFieldSave('automations', newAutomations)
                    }}
                  />
                </div>
                {organisation.automations.autoEscalation.enabled && (
                  <div className="flex items-center gap-3">
                    <Label className="text-xs text-[#B8A896]">Threshold (minutes):</Label>
                    <Input
                      type="number"
                      value={organisation.automations.autoEscalation.thresholdMinutes}
                      onChange={(e) => {
                        const newAutomations = {
                          ...organisation.automations,
                          autoEscalation: { 
                            ...organisation.automations.autoEscalation, 
                            thresholdMinutes: Number(e.target.value) 
                          }
                        }
                        setOrganisation({ ...organisation, automations: newAutomations })
                        setHasChanges(true)
                      }}
                      className="w-24 text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Business Hours */}
              <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-serif text-xs tracking-[0.08em] text-[#6E5A4F] uppercase">
                      Business Hours
                    </h4>
                    <p className="text-xs text-[#B8A896] mt-1">Set operational hours for automation</p>
                  </div>
                  <Switch
                    checked={organisation.automations.businessHours.enabled}
                    onCheckedChange={(checked) => {
                      const newAutomations = {
                        ...organisation.automations,
                        businessHours: { ...organisation.automations.businessHours, enabled: checked }
                      }
                      handleFieldSave('automations', newAutomations)
                    }}
                  />
                </div>
                {organisation.automations.businessHours.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-[#B8A896] mb-2 block">Start Time</Label>
                      <Input
                        type="time"
                        value={organisation.automations.businessHours.start}
                        onChange={(e) => {
                          const newAutomations = {
                            ...organisation.automations,
                            businessHours: { ...organisation.automations.businessHours, start: e.target.value }
                          }
                          setOrganisation({ ...organisation, automations: newAutomations })
                          setHasChanges(true)
                        }}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-[#B8A896] mb-2 block">End Time</Label>
                      <Input
                        type="time"
                        value={organisation.automations.businessHours.end}
                        onChange={(e) => {
                          const newAutomations = {
                            ...organisation.automations,
                            businessHours: { ...organisation.automations.businessHours, end: e.target.value }
                          }
                          setOrganisation({ ...organisation, automations: newAutomations })
                          setHasChanges(true)
                        }}
                        className="text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Auto-response */}
              <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-serif text-xs tracking-[0.08em] text-[#6E5A4F] uppercase">
                      Auto-Response
                    </h4>
                    <p className="text-xs text-[#B8A896] mt-1">Automatic reply when team is unavailable</p>
                  </div>
                  <Switch
                    checked={organisation.automations.autoResponse.enabled}
                    onCheckedChange={(checked) => {
                      const newAutomations = {
                        ...organisation.automations,
                        autoResponse: { ...organisation.automations.autoResponse, enabled: checked }
                      }
                      handleFieldSave('automations', newAutomations)
                    }}
                  />
                </div>
                {organisation.automations.autoResponse.enabled && (
                  <Textarea
                    value={organisation.automations.autoResponse.message}
                    onChange={(e) => {
                      const newAutomations = {
                        ...organisation.automations,
                        autoResponse: { ...organisation.automations.autoResponse, message: e.target.value }
                      }
                      setOrganisation({ ...organisation, automations: newAutomations })
                      setHasChanges(true)
                    }}
                    placeholder="Enter auto-response message"
                    className="text-sm"
                    rows={3}
                  />
                )}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    External Documents & Knowledge Base
                  </h3>
                  <p className="text-xs text-[#B8A896] mt-1">
                    Add unlimited documents via URL to feed the AI model and backend systems
                  </p>
                </div>
                <Button
                  onClick={addExternalDocument}
                  size="sm"
                  className="rounded-full bg-[#8B9D83] hover:bg-[#7A8C73] text-white w-full sm:w-auto"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="font-serif text-[11px] tracking-[0.08em] uppercase">Add Document</span>
                </Button>
              </div>

              {externalDocs.length > 0 ? (
                <div className="space-y-4">
                  {externalDocs.map((doc, index) => (
                    <div key={doc.id} className="rounded-[20px] bg-[#F7F4EF]/50 p-4 sm:p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#D8C8A8]/30 flex items-center justify-center">
                          <span className="text-xs font-serif text-[#6E5A4F]">{index + 1}</span>
                        </div>
                        <span className="text-xs text-[#B8A896]">Document {index + 1}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-xs text-[#B8A896] mb-2 block">Document Name</Label>
                          <Input
                            value={doc.name}
                            onChange={(e) => updateExternalDocument(doc.id, 'name', e.target.value)}
                            placeholder="e.g., Brand Guidelines, Product Catalog"
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-[#B8A896] mb-2 block">Document Type</Label>
                          <Select
                            value={doc.type}
                            onValueChange={(value) => updateExternalDocument(doc.id, 'type', value)}
                          >
                            <SelectTrigger className="text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="URL Link">URL Link</SelectItem>
                              <SelectItem value="Google Docs">Google Docs</SelectItem>
                              <SelectItem value="Google Sheets">Google Sheets</SelectItem>
                              <SelectItem value="Notion Page">Notion Page</SelectItem>
                              <SelectItem value="Confluence">Confluence</SelectItem>
                              <SelectItem value="PDF">PDF</SelectItem>
                              <SelectItem value="Dropbox">Dropbox</SelectItem>
                              <SelectItem value="OneDrive">OneDrive</SelectItem>
                              <SelectItem value="Website">Website</SelectItem>
                              <SelectItem value="API Endpoint">API Endpoint</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <Label className="text-xs text-[#B8A896] mb-2 block">
                          Document URL or Link
                        </Label>
                        <Input
                          value={doc.url}
                          onChange={(e) => updateExternalDocument(doc.id, 'url', e.target.value)}
                          placeholder="https://... (any web-accessible URL)"
                          className="text-sm font-mono"
                        />
                        <p className="text-xs text-[#B8A896] mt-1">
                          Paste any web-accessible link: Google Drive, Dropbox, Notion, websites, etc.
                        </p>
                      </div>

                      <div className="mb-4">
                        <Label className="text-xs text-[#B8A896] mb-2 block">Description (Optional)</Label>
                        <Textarea
                          value={doc.description}
                          onChange={(e) => updateExternalDocument(doc.id, 'description', e.target.value)}
                          placeholder="What information does this document contain? How should the AI use it?"
                          className="text-sm"
                          rows={2}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={doc.usedForAI}
                            onCheckedChange={(checked) => updateExternalDocument(doc.id, 'usedForAI', checked)}
                          />
                          <div>
                            <Label className="text-xs text-[#6E5A4F]">Use for AI Training</Label>
                            <p className="text-xs text-[#B8A896]">Feed this document to the AI model</p>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          {doc.url && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(doc.url, '_blank')}
                              className="h-8 text-xs flex-1 sm:flex-initial"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Open
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeExternalDocument(doc.id)}
                            className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-[20px] bg-[#F7F4EF]/50">
                  <Globe className="h-12 w-12 text-[#E9E2D7] mx-auto mb-4" />
                  <p className="text-sm text-[#B8A896] mb-4">No external documents connected</p>
                  <Button
                    onClick={addExternalDocument}
                    size="sm"
                    variant="outline"
                    className="rounded-full border-[#E9E2D7]/60"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="text-xs">Add Your First Document</span>
                  </Button>
                </div>
              )}

              <div className="rounded-[20px] bg-[#D8C8A8]/10 border border-[#D8C8A8]/30 p-4">
                <h4 className="font-serif text-xs tracking-[0.08em] text-[#6E5A4F] uppercase mb-2 flex items-center gap-2">
                  <Database className="h-3 w-3" />
                  How It Works
                </h4>
                <ul className="text-xs text-[#6E5A4F] space-y-1 list-disc list-inside">
                  <li>Add unlimited documents from any web-accessible source</li>
                  <li>Supports Google Docs/Sheets, Notion, PDFs, Dropbox, websites, and more</li>
                  <li>Toggle "Use for AI Training" to feed content to the AI model</li>
                  <li>Documents are automatically synced and indexed</li>
                  <li>AI uses this knowledge to provide contextual, accurate responses</li>
                  <li>Each document can be individually managed and removed</li>
                </ul>
              </div>
            </div>
          )}

          {/* CONTROL PANEL TAB */}
          {activeTab === 'control' && (
            <div className="space-y-6">
              <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Organisation Control Panel
              </h3>
              
              <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                <p className="text-sm text-[#6E5A4F] mb-4">
                  Access the organisation's dashboard to manage their setup, view analytics, and configure settings.
                </p>
                <Button
                  onClick={() => window.open('/dashboard', '_blank')}
                  className="rounded-full bg-[#8B9D83] hover:bg-[#7A8C73] text-white"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span className="font-serif text-[11px] tracking-[0.08em] uppercase">
                    Open Control Panel
                  </span>
                </Button>
              </div>

              <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                <h4 className="font-serif text-xs tracking-[0.08em] text-[#6E5A4F] uppercase mb-3">
                  Quick Actions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="rounded-full border-[#E9E2D7]/60 justify-start"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <span className="text-xs">Manage Staff Access</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-[#E9E2D7]/60 justify-start"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span className="text-xs">Configure Brand Voice</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-[#E9E2D7]/60 justify-start"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span className="text-xs">View Conversations</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-[#E9E2D7]/60 justify-start"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span className="text-xs">View Analytics</span>
                  </Button>
                </div>
              </div>

              <div className="rounded-[20px] bg-[#F7F4EF]/50 p-5">
                <h4 className="font-serif text-xs tracking-[0.08em] text-[#6E5A4F] uppercase mb-3">
                  Setup Checklist
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`w-4 h-4 rounded-full ${organisation.whatsappApiKey ? 'bg-[#8B9D83]' : 'bg-[#E9E2D7]'}`} />
                    <span className={organisation.whatsappApiKey ? 'text-[#6E5A4F]' : 'text-[#B8A896]'}>
                      WhatsApp API Connected
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`w-4 h-4 rounded-full ${organisation.integrationsConnected > 0 ? 'bg-[#8B9D83]' : 'bg-[#E9E2D7]'}`} />
                    <span className={organisation.integrationsConnected > 0 ? 'text-[#6E5A4F]' : 'text-[#B8A896]'}>
                      Integrations Configured
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`w-4 h-4 rounded-full ${organisation.activeStaff > 0 ? 'bg-[#8B9D83]' : 'bg-[#E9E2D7]'}`} />
                    <span className={organisation.activeStaff > 0 ? 'text-[#6E5A4F]' : 'text-[#B8A896]'}>
                      Staff Members Added
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`w-4 h-4 rounded-full ${organisation.automations.welcomeMessage.enabled ? 'bg-[#8B9D83]' : 'bg-[#E9E2D7]'}`} />
                    <span className={organisation.automations.welcomeMessage.enabled ? 'text-[#6E5A4F]' : 'text-[#B8A896]'}>
                      Automations Enabled
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVITY LOGS TAB */}
          {activeTab === 'logs' && (
            <div className="space-y-4">
              <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Activity Timeline
              </h3>
              
              {logs.length > 0 ? (
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="rounded-[20px] bg-[#F7F4EF]/50 p-4 hover:bg-[#F7F4EF]/80 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className={`${eventTypeColors[log.eventType]} rounded-full px-3 py-0.5 text-xs border`}
                            >
                              {log.eventType}
                            </Badge>
                            <span className="text-xs text-[#B8A896]">
                              {new Date(log.timestamp).toLocaleString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            {log.userName && log.userName !== 'System' && (
                              <span className="text-xs text-[#B8A896]">• {log.userName}</span>
                            )}
                          </div>
                          <p className="text-sm text-[#6E5A4F] mb-1">{log.description}</p>
                          {log.metadata && (
                            <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#B8A896] font-mono">
                              {log.metadata.endpoint && (
                                <span>Endpoint: {log.metadata.endpoint}</span>
                              )}
                              {log.metadata.statusCode && (
                                <span className={log.metadata.statusCode >= 400 ? 'text-[#C9A876]' : ''}>
                                  Status: {log.metadata.statusCode}
                                </span>
                              )}
                              {log.metadata.responseTime && (
                                <span>Response: {log.metadata.responseTime}ms</span>
                              )}
                              {log.metadata.errorCode && (
                                <span className="text-[#C9A876]">Error: {log.metadata.errorCode}</span>
                              )}
                              {log.metadata.ipAddress && (
                                <span>IP: {log.metadata.ipAddress}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-[#E9E2D7] mx-auto mb-4" />
                  <p className="text-sm text-[#B8A896]">No activity logs available</p>
                </div>
              )}
            </div>
          )}

          {/* CHANGE: Added report detail drawer with full action toolbar */}
          {activeTab === 'reports' && (
            <>
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                  <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Reports & Requests
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                    <Select value={reportFilters.type} onValueChange={(value) => setReportFilters({ ...reportFilters, type: value })}>
                      <SelectTrigger className="w-full sm:w-[140px] rounded-full border-[#E9E2D7]/60 text-xs">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Bug Report">Bug Report</SelectItem>
                        <SelectItem value="Feature Request">Feature Request</SelectItem>
                        <SelectItem value="Change Request">Change Request</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={reportFilters.priority} onValueChange={(value) => setReportFilters({ ...reportFilters, priority: value })}>
                      <SelectTrigger className="w-full sm:w-[140px] rounded-full border-[#E9E2D7]/60 text-xs">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Priorities</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={reportFilters.status} onValueChange={(value) => setReportFilters({ ...reportFilters, status: value })}>
                      <SelectTrigger className="w-full sm:w-[160px] rounded-full border-[#E9E2D7]/60 text-xs">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Awaiting Client Reply">Awaiting Reply</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={reportSort} onValueChange={(value: any) => setReportSort(value)}>
                      <SelectTrigger className="w-full sm:w-[140px] rounded-full border-[#E9E2D7]/60 text-xs">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="priority">By Priority</SelectItem>
                        <SelectItem value="status">By Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {filteredAndSortedReports.length > 0 ? (
                  <div className="space-y-3">
                    {filteredAndSortedReports.map((report) => (
                      <div
                        key={report.id}
                        onClick={() => {
                          setSelectedReport(report)
                          setReportDrawerOpen(true)
                        }}
                        className="rounded-[20px] bg-[#F7F4EF]/50 p-5 hover:bg-[#F7F4EF]/80 transition-all cursor-pointer border-2 border-transparent hover:border-[#D8C8A8]/30"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge
                                variant="outline"
                                className="rounded-full px-3 py-0.5 text-xs border bg-[#E9E2D7]/40 text-[#8B7355] border-[#E9E2D7]/60"
                              >
                                {report.type}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`${priorityColors[report.priority]} rounded-full px-3 py-0.5 text-xs border`}
                              >
                                {report.priority}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`${reportStatusColors[report.status]} rounded-full px-3 py-0.5 text-xs border`}
                              >
                                {report.status}
                              </Badge>
                              {report.assignedTo && (
                                <span className="text-xs text-[#B8A896]">
                                  • {report.assignedTo}
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-medium text-[#6E5A4F] mb-1">{report.title}</h4>
                            <p className="text-xs text-[#B8A896] line-clamp-2">{report.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2 text-xs text-[#B8A896]">
                              <span>{new Date(report.createdAt).toLocaleDateString('en-GB')}</span>
                              <span>• {report.createdBy}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 rounded-[20px] bg-[#F7F4EF]/50">
                    <BarChart3 className="h-12 w-12 text-[#E9E2D7] mx-auto mb-4" />
                    <p className="text-sm text-[#B8A896] mb-2">No reports match your filters</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReportFilters({ type: 'All', priority: 'All', status: 'All', assignedTo: 'All' })}
                      className="text-xs"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>

              {reportDrawerOpen && selectedReport && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end bg-black/20 backdrop-blur-sm">
                  <div
                    className="fixed inset-0"
                    onClick={() => setReportDrawerOpen(false)}
                  />
                  <div className="relative w-full sm:w-[90vw] md:w-[70vw] lg:w-[600px] h-[100vh] sm:h-[95vh] md:h-[90vh] bg-white rounded-t-3xl sm:rounded-l-3xl sm:rounded-r-none overflow-hidden shadow-2xl">
                    <div className="h-full flex flex-col">
                      {/* Header */}
                      <div className="p-6 border-b border-[#E9E2D7]/40">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="font-serif text-lg text-[#6E5A4F] mb-2">{selectedReport.title}</h3>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs bg-[#E9E2D7]/40 text-[#8B7355] border-[#E9E2D7]/60">
                                {selectedReport.type}
                              </Badge>
                              <Badge variant="outline" className={`${priorityColors[selectedReport.priority]} rounded-full px-3 py-0.5 text-xs border`}>
                                {selectedReport.priority}
                              </Badge>
                              <Badge variant="outline" className={`${reportStatusColors[selectedReport.status]} rounded-full px-3 py-0.5 text-xs border`}>
                                {selectedReport.status}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setReportDrawerOpen(false)}
                            className="rounded-full h-8 w-8 p-0"
                          >
                            ✕
                          </Button>
                        </div>

                        {/* Action Toolbar */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <Label className="text-xs text-[#B8A896] mb-2 block">Status</Label>
                            <Select
                              value={selectedReport.status}
                              onValueChange={(value) => updateReportStatus(selectedReport.id, value)}
                            >
                              <SelectTrigger className="rounded-full border-[#E9E2D7]/60 text-xs h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Open">Open</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Awaiting Client Reply">Awaiting Reply</SelectItem>
                                <SelectItem value="Resolved">Resolved</SelectItem>
                                <SelectItem value="Closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="sm:col-span-2">
                            <Label className="text-xs text-[#B8A896] mb-2 block">Assigned To</Label>
                            <Select
                              value={selectedReport.assignedTo || 'Unassigned'}
                              onValueChange={(value) => updateReportAssignee(selectedReport.id, value)}
                            >
                              <SelectTrigger className="rounded-full border-[#E9E2D7]/60 text-xs h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {attachaiTeamMembers.map((member) => (
                                  <SelectItem key={member} value={member}>{member}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            onClick={() => {
                              setContactMethod('whatsapp')
                              setContactModalOpen(true)
                            }}
                            className="flex-1 rounded-full bg-[#8B9D83] hover:bg-[#7A8C73] text-white text-xs h-9"
                          >
                            <MessageSquare className="h-3 w-3 mr-2" />
                            WhatsApp Client
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setContactMethod('email')
                              setContactModalOpen(true)
                            }}
                            variant="outline"
                            className="flex-1 rounded-full border-[#E9E2D7]/60 text-xs h-9"
                          >
                            <Mail className="h-3 w-3 mr-2" />
                            Email Client
                          </Button>
                        </div>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Details Section */}
                        <div>
                          <h4 className="font-serif text-xs tracking-[0.08em] text-[#6E5A4F] uppercase mb-3">Details</h4>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs text-[#B8A896]">Full Description</Label>
                              <p className="text-sm text-[#6E5A4F] mt-1">{selectedReport.description}</p>
                            </div>
                            
                            {selectedReport.tags.length > 0 && (
                              <div>
                                <Label className="text-xs text-[#B8A896] mb-2 block">Tags</Label>
                                <div className="flex flex-wrap gap-2">
                                  {selectedReport.tags.map((tag) => (
                                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-[#E9E2D7]/30 text-[#B8A896]">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div>
                                <Label className="text-[#B8A896]">Created Date</Label>
                                <p className="text-[#6E5A4F] mt-1">{new Date(selectedReport.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                              </div>
                              <div>
                                <Label className="text-[#B8A896]">Submitted By</Label>
                                <p className="text-[#6E5A4F] mt-1">{selectedReport.createdBy}</p>
                              </div>
                              <div>
                                <Label className="text-[#B8A896]">Organisation</Label>
                                <p className="text-[#6E5A4F] mt-1">{organisation.name}</p>
                              </div>
                              <div>
                                <Label className="text-[#B8A896]">Contact</Label>
                                <p className="text-[#6E5A4F] mt-1">{organisation.contactEmail}</p>
                              </div>
                            </div>

                            {selectedReport.resolvedAt && (
                              <div>
                                <Label className="text-xs text-[#B8A896]">Resolved Date</Label>
                                <p className="text-sm text-[#8B9D83] mt-1">{new Date(selectedReport.resolvedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Internal Notes Section */}
                        <div>
                          <h4 className="font-serif text-xs tracking-[0.08em] text-[#6E5A4F] uppercase mb-3">Internal Notes</h4>
                          <div className="space-y-3 mb-4">
                            {internalNotes.map((note) => (
                              <div key={note.id} className="rounded-lg bg-[#F7F4EF]/50 p-3">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <span className="text-xs font-medium text-[#6E5A4F]">{note.author}</span>
                                  <span className="text-xs text-[#B8A896]">{new Date(note.timestamp).toLocaleDateString('en-GB')}</span>
                                </div>
                                <p className="text-xs text-[#6E5A4F]">{note.note}</p>
                              </div>
                            ))}
                            {internalNotes.length === 0 && (
                              <p className="text-xs text-[#B8A896] italic">No internal notes yet</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Textarea
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              placeholder="Add a private internal note (not visible to client)..."
                              className="text-xs resize-none"
                              rows={3}
                            />
                            <Button
                              size="sm"
                              onClick={addInternalNote}
                              disabled={!newNote.trim()}
                              className="rounded-full bg-[#D8C8A8] hover:bg-[#C9A876] text-[#6E5A4F] text-xs h-8"
                            >
                              Add Note
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {contactModalOpen && selectedReport && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                  <div
                    className="fixed inset-0"
                    onClick={() => setContactModalOpen(false)}
                  />
                  <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase">
                        {contactMethod === 'whatsapp' ? 'Send WhatsApp Message' : 'Send Email'}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setContactModalOpen(false)}
                        className="rounded-full h-7 w-7 p-0"
                      >
                        ✕
                      </Button>
                    </div>

                    {contactMethod === 'whatsapp' ? (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-xs text-[#B8A896] mb-2 block">Select Template</Label>
                          <div className="space-y-2">
                            {Object.entries(whatsappTemplates).map(([key, message]) => (
                              <button
                                key={key}
                                onClick={() => sendWhatsAppMessage(key)}
                                className="w-full text-left p-3 rounded-lg border border-[#E9E2D7]/60 hover:bg-[#F7F4EF]/50 transition-colors"
                              >
                                <p className="text-xs font-medium text-[#6E5A4F] mb-1 capitalize">{key.replace('_', ' ')}</p>
                                <p className="text-xs text-[#B8A896]">{message}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-[#B8A896] mb-2 block">Or Write Custom Message</Label>
                          <Textarea
                            placeholder="Type your custom message..."
                            className="text-xs"
                            rows={4}
                            id="customWhatsApp"
                          />
                          <Button
                            size="sm"
                            onClick={() => {
                              const textarea = document.getElementById('customWhatsApp') as HTMLTextAreaElement
                              sendWhatsAppMessage('custom', textarea.value)
                            }}
                            className="mt-2 w-full rounded-full bg-[#8B9D83] hover:bg-[#7A8C73] text-white text-xs"
                          >
                            Send Message
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-xs text-[#B8A896] mb-2 block">To</Label>
                          <Input
                            value={organisation.contactEmail}
                            readOnly
                            className="text-xs bg-[#F7F4EF]/30"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-[#B8A896] mb-2 block">Subject</Label>
                          <Input
                            defaultValue={`Re: ${selectedReport.title}`}
                            className="text-xs"
                            id="emailSubject"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-[#B8A896] mb-2 block">Message</Label>
                          <Textarea
                            placeholder="Type your email message..."
                            className="text-xs"
                            rows={6}
                            id="emailBody"
                          />
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            const subject = (document.getElementById('emailSubject') as HTMLInputElement).value
                            const body = (document.getElementById('emailBody') as HTMLTextAreaElement).value
                            sendEmailMessage(subject, body)
                          }}
                          className="w-full rounded-full bg-[#8B9D83] hover:bg-[#7A8C73] text-white text-xs"
                        >
                          Send Email
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
