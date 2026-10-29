"use client"

import * as React from "react"
import { Save, Plus, Trash2, Building2, User, MessageCircle, Edit, Phone, Mail, CheckCircle2, Clock, AlertCircle, Loader2, X, Settings, Database, CreditCard, Cloud, BarChart, CircleDot, Workflow } from 'lucide-react'
import { teamMembers, addTeamMember, type TeamMember } from '@/mock/team-members'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'

// Removed static teamMembers array and using imported one instead
const integrations = [
  {
    id: 1,
    name: "Property Management System",
    type: "PMS",
    status: "connected",
    lastSync: "2 minutes ago",
    icon: Building2,
  },
  {
    id: 2,
    name: "WhatsApp Business",
    type: "Messaging",
    status: "connected",
    lastSync: "Active now",
    icon: MessageCircle,
  },
  {
    id: 3,
    name: "Salesforce CRM",
    type: "CRM",
    status: "syncing",
    lastSync: "Syncing...",
    icon: Building2,
  },
  {
    id: 4,
    name: "Stripe Payments",
    type: "Payments",
    status: "pending",
    lastSync: "Not configured",
    icon: Building2,
  },
]

const availableIntegrations = [
  {
    id: "zapier",
    name: "Zapier",
    type: "Automation",
    description: "Connect with 5,000+ apps to automate workflows",
    icon: Workflow,
    setupFields: [
      { name: "apiKey", label: "API Key", type: "text", placeholder: "Enter your Zapier API key" },
      { name: "webhookUrl", label: "Webhook URL", type: "text", placeholder: "https://hooks.zapier.com/..." }
    ]
  },
  {
    id: "salesforce",
    name: "Salesforce CRM",
    type: "CRM",
    description: "Sync guest data and interactions with Salesforce",
    icon: Database,
    setupFields: [
      { name: "domain", label: "Salesforce Domain", type: "text", placeholder: "yourcompany.salesforce.com" },
      { name: "username", label: "Username", type: "email", placeholder: "admin@yourcompany.com" },
      { name: "securityToken", label: "Security Token", type: "password", placeholder: "Enter security token" }
    ]
  },
  {
    id: "stripe",
    name: "Stripe Payments",
    type: "Payments",
    description: "Process payments and manage subscriptions",
    icon: CreditCard,
    setupFields: [
      { name: "publishableKey", label: "Publishable Key", type: "text", placeholder: "pk_live_..." },
      { name: "secretKey", label: "Secret Key", type: "password", placeholder: "sk_live_..." },
      { name: "webhookSecret", label: "Webhook Secret", type: "password", placeholder: "whsec_..." }
    ]
  },
  {
    id: "hubspot",
    name: "HubSpot",
    type: "CRM",
    description: "Marketing automation and CRM integration",
    icon: BarChart,
    setupFields: [
      { name: "apiKey", label: "API Key", type: "password", placeholder: "Enter HubSpot API key" },
      { name: "portalId", label: "Portal ID", type: "text", placeholder: "12345678" }
    ]
  },
  {
    id: "twillio",
    name: "Twilio SMS",
    type: "Messaging",
    description: "Send SMS notifications and messages",
    icon: MessageCircle,
    setupFields: [
      { name: "accountSid", label: "Account SID", type: "text", placeholder: "AC..." },
      { name: "authToken", label: "Auth Token", type: "password", placeholder: "Enter auth token" },
      { name: "phoneNumber", label: "Twilio Phone Number", type: "tel", placeholder: "+1 (555) 123-4567" }
    ]
  },
  {
    id: "googlesheets",
    name: "Google Sheets",
    type: "Data Storage",
    description: "Sync data with Google Sheets",
    icon: Building2,
    setupFields: [
      { name: "spreadsheetId", label: "Spreadsheet ID", type: "text", placeholder: "1BxiMVs0..." },
      { name: "serviceAccountKey", label: "Service Account JSON", type: "textarea", placeholder: "Paste service account JSON key" }
    ]
  },
  {
    id: "slack",
    name: "Slack",
    type: "Communication",
    description: "Send notifications to Slack channels",
    icon: MessageCircle,
    setupFields: [
      { name: "webhookUrl", label: "Webhook URL", type: "text", placeholder: "https://hooks.slack.com/services/..." },
      { name: "defaultChannel", label: "Default Channel", type: "text", placeholder: "#general" }
    ]
  },
  {
    id: "dropbox",
    name: "Dropbox",
    type: "Storage",
    description: "Store files and documents in Dropbox",
    icon: Cloud,
    setupFields: [
      { name: "accessToken", label: "Access Token", type: "password", placeholder: "Enter Dropbox access token" },
      { name: "folderPath", label: "Folder Path", type: "text", placeholder: "/AttachAI/" }
    ]
  }
]

export function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState("property")
  const [environment, setEnvironment] = React.useState("production")
  const [editingMember, setEditingMember] = React.useState<number | null>(null)
  
  const [localTeamMembers, setLocalTeamMembers] = React.useState(teamMembers)
  
  const [addMemberOpen, setAddMemberOpen] = React.useState(false)
  const [newMember, setNewMember] = React.useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "active" as const,
    aiContext: ""
  })
  
  const [browseIntegrationsOpen, setBrowseIntegrationsOpen] = React.useState(false)
  const [configureIntegrationOpen, setConfigureIntegrationOpen] = React.useState(false)
  const [selectedIntegration, setSelectedIntegration] = React.useState<any>(null)

  const handleConfigureExisting = (integration: any) => {
    // Find the full integration details from availableIntegrations
    const fullIntegration = availableIntegrations.find(i => 
      i.name.toLowerCase().includes(integration.name.toLowerCase().split(' ')[0])
    )
    setSelectedIntegration(fullIntegration || {
      id: integration.id,
      name: integration.name,
      type: integration.type,
      description: `Configure ${integration.name}`,
      icon: integration.icon,
      setupFields: [
        { name: "apiKey", label: "API Key", type: "text", placeholder: "Enter API key" }
      ]
    })
    setConfigureIntegrationOpen(true)
  }

  const handleAddIntegration = (integration: any) => {
    setSelectedIntegration(integration)
    setBrowseIntegrationsOpen(false)
    setConfigureIntegrationOpen(true)
  }

  const handleAddMember = () => {
    setAddMemberOpen(true)
  }

  const handleSaveNewMember = () => {
    // Validation
    if (!newMember.name || !newMember.email || !newMember.role) {
      return
    }
    
    const initials = newMember.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
    
    const addedMember = addTeamMember({
      initials,
      name: newMember.name,
      email: newMember.email,
      phone: newMember.phone,
      role: newMember.role.charAt(0).toUpperCase() + newMember.role.slice(1),
      roleDescription: newMember.aiContext || `${newMember.role} team member`,
      status: newMember.status,
    })
    
    setLocalTeamMembers([...teamMembers])
    
    console.log("[v0] Team member added and will appear in admin panel:", addedMember)
    
    // Close modal and reset form
    setAddMemberOpen(false)
    setNewMember({
      name: "",
      email: "",
      phone: "",
      role: "",
      status: "active",
      aiContext: ""
    })
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 xl:p-12">
      <div className="max-w-full lg:max-w-[1200px] mx-auto space-y-6 md:space-y-7 lg:space-y-8">
        <div className="space-y-2">
          <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase">
            SETTINGS
          </h1>
          <p className="font-sans text-sm md:text-[15px] text-[#6E5A4F] leading-relaxed">
            Manage property settings and system configuration.
          </p>
        </div>

        <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex items-center gap-2 p-1.5 rounded-full backdrop-blur-3xl bg-white/40 border border-white/60 shadow-[0_8px_32px_rgba(213,200,186,0.15)] w-fit min-w-full md:min-w-0">
            {[
              { key: 'property', label: 'Property' },
              { key: 'team', label: 'Team' },
              { key: 'whatsapp', label: 'WhatsApp' },
              { key: 'integrations', label: 'Integrations' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full font-sans text-xs md:text-sm transition-all duration-700 whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-white/80 text-[#3F2F2C] shadow-[0_4px_16px_rgba(216,200,168,0.3),inset_0_0_0_1px_rgba(216,200,168,0.6)]'
                    : 'text-[#6E5A4F] hover:text-[#8B7355] hover:bg-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Tab */}
        {activeTab === 'property' && (
          <div className="space-y-6 md:space-y-7 lg:space-y-8 animate-fadeSlideIn">
            <div className="p-5 md:p-7 lg:p-8 rounded-lg md:rounded-[22px] lg:rounded-[24px] backdrop-blur-3xl bg-[#F7F4EF]/40 border border-white/50 shadow-[0_16px_64px_rgba(213,200,186,0.2)]">
              <h2 className="font-serif text-sm md:text-[15px] lg:text-base text-[#3F2F2C] font-medium tracking-[0.04em] uppercase mb-6 md:mb-7">PROPERTY INFORMATION</h2>
              <div className="grid gap-3 md:gap-4 lg:gap-5 grid-cols-1 md:grid-cols-2">
                <div className="space-y-1.5 md:space-y-2">
                  <Label className="font-sans text-[10px] md:text-xs text-[#6E5A4F] font-normal">Property Name</Label>
                  <Input
                    defaultValue="ATTACHAI Club"
                    className="h-9 md:h-10 rounded-[14px] md:rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm md:text-[15px] font-normal text-[#6E5A4F] px-3 md:px-4"
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <Label className="font-sans text-[10px] md:text-xs text-[#6E5A4F] font-normal">Location</Label>
                  <Input
                    defaultValue="Selene Heights, Lunar South Rim"
                    placeholder="e.g., London, United Kingdom"
                    className="h-9 md:h-10 rounded-[14px] md:rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm md:text-[15px] font-normal text-[#6E5A4F] px-3 md:px-4"
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <Label className="font-sans text-[10px] md:text-xs text-[#6E5A4F] font-normal">Website</Label>
                  <Input
                    defaultValue="www.attachaiclub.com"
                    placeholder="www.yourproperty.com"
                    className="h-9 md:h-10 rounded-[14px] md:rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm md:text-[15px] font-normal text-[#6E5A4F] px-3 md:px-4"
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <Label className="font-sans text-[10px] md:text-xs text-[#6E5A4F] font-normal">Timezone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger className="h-9 md:h-10 rounded-[14px] md:rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm md:text-[15px] font-normal text-[#6E5A4F]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[20px] backdrop-blur-3xl bg-[#F7F4EF]/95 border-[#D5C8BA]/30">
                      <SelectItem value="pst">Pacific (PST)</SelectItem>
                      <SelectItem value="est">Eastern (EST)</SelectItem>
                      <SelectItem value="cst">Central (CST)</SelectItem>
                      <SelectItem value="mst">Mountain (MST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <Label className="font-sans text-[10px] md:text-xs text-[#6E5A4F] font-normal">Languages</Label>
                  <Input
                    defaultValue="English, Spanish, French"
                    className="h-9 md:h-10 rounded-[14px] md:rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm md:text-[15px] font-normal text-[#6E5A4F] px-3 md:px-4"
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <Label className="font-sans text-[10px] md:text-xs text-[#6E5A4F] font-normal">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger className="h-9 md:h-10 rounded-[14px] md:rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm md:text-[15px] font-normal text-[#6E5A4F]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[20px] backdrop-blur-3xl bg-[#F7F4EF]/95 border-[#D5C8BA]/30">
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <Label className="font-sans text-[10px] md:text-xs text-[#6E5A4F] font-normal">Experience Category</Label>
                  <Select defaultValue="wellness">
                    <SelectTrigger className="h-9 md:h-10 rounded-[14px] md:rounded-[16px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm md:text-[15px] font-normal text-[#6E5A4F]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[20px] backdrop-blur-3xl bg-[#F7F4EF]/95 border-[#D5C8BA]/30">
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="members">Members' Club</SelectItem>
                      <SelectItem value="wellness">Wellness Space</SelectItem>
                      <SelectItem value="dining">Dining</SelectItem>
                      <SelectItem value="retail">Luxury Retail</SelectItem>
                      <SelectItem value="realestate">Real Estate</SelectItem>
                      <SelectItem value="premium">Premium Service Provider</SelectItem>
                      <SelectItem value="sanctuary">Sanctuary / Pavilion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="p-5 md:p-7 lg:p-8 rounded-lg md:rounded-[22px] lg:rounded-[24px] backdrop-blur-3xl bg-[#F7F4EF]/40 border border-white/50 shadow-[0_16px_64px_rgba(213,200,186,0.2)]">
              <h2 className="font-serif text-sm md:text-[15px] lg:text-base text-[#3F2F2C] font-medium tracking-[0.04em] uppercase mb-2">ENVIRONMENT</h2>
              <p className="font-sans text-sm md:text-[15px] text-[#6E5A4F] mb-6 md:mb-7">Switch between testing and production modes</p>
              
              <div className="flex items-center gap-2 md:gap-4 p-1.5 md:p-2 rounded-full backdrop-blur-3xl bg-white/50 border-0 shadow-[0_8px_24px_rgba(213,200,186,0.15)] w-fit">
                <button
                  onClick={() => setEnvironment('sandbox')}
                  className={`px-4 md:px-8 py-2 md:py-3 rounded-full font-sans text-[10px] md:text-xs transition-all duration-700 ${
                    environment === 'sandbox'
                      ? 'bg-white text-[#5A4A42] shadow-[0_4px_16px_rgba(213,200,186,0.25)]'
                      : 'text-[#6E5A4F] hover:text-[#8B7355]'
                  }`}
                >
                  Sandbox
                </button>
                <button
                  onClick={() => setEnvironment('production')}
                  className={`px-4 md:px-8 py-2 md:py-3 rounded-full font-sans text-[10px] md:text-xs transition-all duration-700 ${
                    environment === 'production'
                      ? 'bg-white text-[#5A4A42] shadow-[0_4px_16px_rgba(213,200,186,0.25)]'
                      : 'text-[#6E5A4F] hover:text-[#8B7355]'
                  }`}
                >
                  Production
                </button>
              </div>

              {environment === 'production' && (
                <div className="mt-3 md:mt-6 p-2.5 md:p-4 rounded-[14px] md:rounded-[18px] backdrop-blur-xl bg-[#E9DCD2]/30 border-0">
                  <p className="font-sans text-[10px] md:text-xs text-[#6E5A4F] leading-relaxed">
                    Production: All actions affect real clients.
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 md:p-7 lg:p-8 rounded-lg md:rounded-[22px] lg:rounded-[24px] backdrop-blur-3xl bg-[#F7F4EF]/40 border border-white/50 shadow-[0_16px_64px_rgba(213,200,186,0.2)]">
              <h2 className="font-serif text-sm md:text-[15px] lg:text-base text-[#3F2F2C] font-medium tracking-[0.04em] uppercase mb-2">REPORTING & EXPORTS</h2>
              <p className="font-sans text-sm md:text-[15px] text-[#6E5A4F] mb-6 md:mb-7">Generate and export performance reports for this property</p>
              
              <Button
                onClick={() => router.push('/reports')}
                className="w-full sm:w-auto h-11 md:h-12 px-6 md:px-8 rounded-full backdrop-blur-3xl bg-white/60 hover:bg-white/70 border border-white/80 text-[#3F2F2C] font-serif text-sm md:text-[15px] shadow-[0_8px_24px_rgba(216,200,168,0.3)] hover:shadow-[0_12px_32px_rgba(216,200,168,0.4)] transition-all duration-700"
              >
                <BarChart className="mr-2 h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} />
                Open Exports & Reports
              </Button>
            </div>

          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-6 md:space-y-7 lg:space-y-8 animate-fadeSlideIn">
            <div className="flex flex-col gap-4 md:gap-5">
              <div>
                <h2 className="font-serif text-sm md:text-[15px] lg:text-base text-[#3F2F2C] font-medium tracking-[0.04em] uppercase mb-1.5">TEAM MEMBERS</h2>
                <p className="font-sans text-sm md:text-[15px] text-[#6E5A4F]">Manage staff access and roles</p>
              </div>
              <Button 
                onClick={handleAddMember}
                className="w-fit h-11 md:h-12 px-6 md:px-8 rounded-full backdrop-blur-3xl bg-white/60 hover:bg-white/70 border border-white/80 text-[#3F2F2C] font-serif text-sm md:text-[15px] shadow-[0_8px_24px_rgba(216,200,168,0.3)] hover:shadow-[0_12px_32px_rgba(216,200,168,0.4)] transition-all duration-700"
              >
                <Plus className="mr-2 h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} />
                ADD TEAM MEMBER
              </Button>
            </div>

            <div className="grid gap-5 md:gap-6 lg:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {localTeamMembers.map((member, idx) => (
                <div
                  key={member.id}
                  className="p-5 md:p-6 lg:p-7 rounded-lg md:rounded-[20px] lg:rounded-[24px] backdrop-blur-3xl bg-[#F7F4EF]/40 border border-white/50 shadow-[0_16px_48px_rgba(213,200,186,0.15)] hover:shadow-[0_20px_64px_rgba(213,200,186,0.25)] transition-all duration-900 animate-fadeSlideIn"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {editingMember === member.id ? (
                    <div className="space-y-2.5 md:space-y-4">
                      <div className="space-y-1.5 md:space-y-2">
                        <Label className="font-sans text-[10px] md:text-xs text-[#6E5A4F] font-normal">Name</Label>
                        <Input
                          defaultValue={member.name}
                          className="h-8 md:h-10 rounded-[12px] md:rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm font-normal text-[#6E5A4F]"
                        />
                      </div>
                      <div className="space-y-1.5 md:space-y-2">
                        <Label className="font-sans text-[10px] md:text-xs text-[#6E5A4F] font-normal">Email</Label>
                        <Input
                          defaultValue={member.email}
                          className="h-8 md:h-10 rounded-[12px] md:rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm font-normal text-[#6E5A4F]"
                        />
                      </div>
                      <div className="space-y-1.5 md:space-y-2">
                        <Label className="font-sans text-[10px] md:text-xs text-[#6E5A4F] font-normal">Phone</Label>
                        <Input
                          defaultValue={member.phone}
                          className="h-8 md:h-10 rounded-[12px] md:rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm font-normal text-[#6E5A4F]"
                        />
                      </div>
                      <div className="space-y-1.5 md:space-y-2">
                        <Label className="font-sans text-[10px] md:text-xs text-[#6E5A4F] font-normal">Role</Label>
                        <Select defaultValue={member.role.toLowerCase()}>
                          <SelectTrigger className="h-8 md:h-10 rounded-[12px] md:rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm font-normal text-[#6E5A4F]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-[20px] backdrop-blur-3xl bg-[#F7F4EF]/95 border-[#D5C8BA]/30">
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="concierge">Concierge</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5 md:space-y-2">
                        <Label className="font-sans text-[10px] md:text-xs text-[#6E5A4F] font-normal">Role Description (for AI)</Label>
                        <textarea
                          defaultValue={member.roleDescription}
                          placeholder="Describe what this team member handles so AI knows when to escalate to them..."
                          rows={3}
                          className="w-full rounded-[12px] md:rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-xs md:text-sm font-normal text-[#6E5A4F] p-2.5 md:p-3 resize-none"
                        />
                        <p className="font-sans text-[9px] md:text-[10px] text-[#6E5A4F] leading-relaxed">
                          Help the AI understand this person's expertise and when to route actions to them
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <Button 
                          onClick={() => setEditingMember(null)}
                          className="flex-1 h-8 md:h-10 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] hover:from-[#D8C8A8]/90 hover:to-[#D5C8BA]/90 text-[#5A4A42] font-sans text-[10px] md:text-xs shadow-[0_8px_24px_rgba(216,200,168,0.25)] transition-all duration-700"
                        >
                          <Save className="mr-1 md:mr-1.5 h-3 w-3 md:h-4 md:w-4" />
                          Save
                        </Button>
                        <Button 
                          onClick={() => setEditingMember(null)}
                          variant="ghost" 
                          className="h-8 md:h-10 px-3 md:px-4 rounded-full text-[#8B7355] hover:bg-[#E9E2D7]/30 font-sans text-[10px] md:text-xs transition-all duration-700"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-5">
                        <div className="relative">
                          <div className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#D5C8BA] flex items-center justify-center shadow-[0_8px_24px_rgba(216,200,168,0.3)]">
                            <span className="font-sans text-sm md:text-base text-[#3F2F2C] font-medium">{member.initials}</span>
                          </div>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 md:w-4 h-3.5 md:h-4 rounded-full border-2 border-white ${
                            member.status === 'active' 
                              ? 'bg-[#6E5A4F] shadow-[0_0_12px_rgba(110,90,79,0.6)]' 
                              : 'bg-[#C8B6A6] shadow-[0_0_8px_rgba(200,182,166,0.4)]'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-base md:text-lg text-[#3F2F2C] mb-0.5 truncate">{member.name}</h3>
                          <p className="font-sans text-sm md:text-[15px] text-[#6E5A4F] truncate">{member.role}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4 md:mb-5">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[#6E5A4F]" strokeWidth={1.5} />
                          <p className="font-sans text-sm text-[#6E5A4F] truncate">{member.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-[#6E5A4F]" strokeWidth={1.5} />
                          <p className="font-sans text-sm text-[#6E5A4F]">{member.phone}</p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-[#D5C8BA]/30">
                          <p className="font-sans text-[10px] text-[#6E5A4F] uppercase tracking-wider mb-1.5">AI Context</p>
                          <p className="font-sans text-sm text-[#6E5A4F] leading-relaxed line-clamp-2">
                            {member.roleDescription}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-[#D5C8BA]/30">
                        <span className="px-3 py-1.5 rounded-full bg-[#E9E2D7]/50 text-[#6E5A4F] font-sans text-sm">
                          {member.status === 'active' ? 'Active' : 'Away'}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button 
                            onClick={() => setEditingMember(member.id)}
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-full text-[#6E5A4F] hover:text-[#3F2F2C] hover:bg-[#E9E2D7]/30 transition-all duration-700"
                          >
                            <Edit className="h-4 w-4" strokeWidth={1.5} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-[#6E5A4F] hover:text-[#3F2F2C] hover:bg-[#E9E2D7]/30 transition-all duration-700">
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WhatsApp Tab */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-6 md:space-y-7 lg:space-y-8 animate-fadeSlideIn">
            <div className="p-5 md:p-7 lg:p-8 rounded-lg md:rounded-[22px] lg:rounded-[24px] backdrop-blur-3xl bg-[#F7F4EF]/40 border border-white/50 shadow-[0_16px_64px_rgba(213,200,186,0.2)]">
              <h2 className="font-serif text-sm md:text-[15px] lg:text-base text-[#3F2F2C] font-medium tracking-[0.04em] uppercase mb-6 md:mb-7">WHATSAPP BUSINESS CONFIGURATION</h2>
              
              <div className="space-y-6 md:space-y-7">
                <div className="space-y-2.5">
                  <Label className="font-serif text-xs md:text-sm text-[#3F2F2C] font-medium tracking-[0.03em] uppercase">BUSINESS NUMBER</Label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Input
                      defaultValue="+1 (424) 555-0199"
                      disabled
                      className="flex-1 h-11 md:h-12 rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-[15px] font-normal text-[#6E5A4F]"
                    />
                    <Button variant="outline" className="h-11 md:h-12 px-5 rounded-full border-[#D5C8BA]/40 text-[#3F2F2C] hover:bg-[#E9E2D7]/40 font-serif text-sm transition-all duration-700">
                      Change
                    </Button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label className="font-serif text-xs md:text-sm text-[#3F2F2C] font-medium tracking-[0.03em] uppercase">WHATSAPP BUSINESS ACCOUNT STATUS</Label>
                  <div className="p-5 md:p-6 rounded-[16px] md:rounded-[18px] backdrop-blur-xl bg-white/50 border-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 md:w-11 h-10 md:h-11 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#D5C8BA] flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-[#3F2F2C]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-sans text-[15px] text-[#3F2F2C] font-medium">Connected</p>
                        <p className="font-sans text-sm text-[#6E5A4F]">Active webhook connection</p>
                      </div>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6E5A4F] shadow-[0_0_12px_rgba(110,90,79,0.6)]" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label className="font-serif text-xs md:text-sm text-[#3F2F2C] font-medium tracking-[0.03em] uppercase">MESSAGE TEMPLATE SYNC</Label>
                  <Button variant="outline" className="w-full h-11 md:h-12 rounded-full border-[#D5C8BA]/40 text-[#3F2F2C] hover:bg-[#E9E2D7]/40 font-serif text-sm transition-all duration-700">
                    <CircleDot className="mr-2 h-4 w-4" strokeWidth={1.5} />
                    Sync Message Templates
                  </Button>
                </div>

                <div className="pt-4">
                  <a href="/automation-rules" className="font-sans text-sm text-[#6E5A4F] hover:text-[#3F2F2C] underline decoration-[#6E5A4F]/30 underline-offset-4 transition-all duration-700">
                    View Automation Rules Using WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="space-y-6 md:space-y-7 lg:space-y-8 animate-fadeSlideIn">
            <div className="p-5 md:p-7 lg:p-8 rounded-lg md:rounded-[22px] lg:rounded-[24px] backdrop-blur-3xl bg-[#F7F4EF]/40 border border-white/50 shadow-[0_16px_64px_rgba(213,200,186,0.2)]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-7">
                <div>
                  <h2 className="font-serif text-sm md:text-[15px] lg:text-base text-[#3F2F2C] font-medium tracking-[0.04em] uppercase mb-1.5">CONNECTED SERVICES</h2>
                  <p className="font-sans text-sm md:text-[15px] text-[#6E5A4F]">Manage external integrations and data sync</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-xl bg-white/50 border-0 shadow-[0_4px_12px_rgba(213,200,186,0.1)]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#6E5A4F] shadow-[0_0_8px_rgba(110,90,79,0.5)]" />
                    <span className="font-sans text-sm text-[#6E5A4F]">{integrations.filter(i => i.status === 'connected').length} Active</span>
                  </div>
                  <div className="w-px h-3.5 bg-[#D5C8BA]/40" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#C8B6A6]" />
                    <span className="font-sans text-sm text-[#6E5A4F]">{integrations.filter(i => i.status === 'pending').length} Pending</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
                {integrations.map((integration, idx) => (
                  <div
                    key={integration.id}
                    className="p-5 md:p-6 rounded-[18px] md:rounded-[20px] backdrop-blur-3xl bg-white/50 border border-white/40 shadow-[0_8px_32px_rgba(213,200,186,0.12)] hover:shadow-[0_12px_48px_rgba(213,200,186,0.2)] transition-all duration-900 animate-fadeSlideIn"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className="flex items-start gap-3 md:gap-4 mb-4">
                      <div className="w-11 md:w-12 h-11 md:h-12 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#D5C8BA] flex items-center justify-center shadow-[0_6px_20px_rgba(216,200,168,0.25)]">
                        <integration.icon className="h-5 md:h-6 w-5 md:w-6 text-[#3F2F2C]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-[15px] md:text-base text-[#3F2F2C] mb-0.5 truncate">{integration.name}</h3>
                        <p className="font-sans text-sm text-[#6E5A4F]">{integration.type}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {integration.status === 'connected' && (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-[#6E5A4F]" strokeWidth={1.5} />
                            <span className="font-sans text-sm text-[#6E5A4F]">Connected</span>
                          </>
                        )}
                        {integration.status === 'syncing' && (
                          <>
                            <Loader2 className="h-4 w-4 text-[#6E5A4F] animate-spin-slow" strokeWidth={1.5} />
                            <span className="font-sans text-sm text-[#6E5A4F]">Syncing</span>
                          </>
                        )}
                        {integration.status === 'pending' && (
                          <>
                            <Clock className="h-4 w-4 text-[#C8B6A6]" strokeWidth={1.5} />
                            <span className="font-sans text-sm text-[#6E5A4F]">Pending</span>
                          </>
                        )}
                      </div>
                      <span className="font-sans text-sm text-[#6E5A4F]">{integration.lastSync}</span>
                    </div>

                    <div className="pt-4 border-t border-[#D5C8BA]/30">
                      <Button 
                        onClick={() => handleConfigureExisting(integration)}
                        variant="ghost" 
                        className="w-full h-10 rounded-full text-[#3F2F2C] hover:bg-[#E9E2D7]/40 font-serif text-sm transition-all duration-700"
                      >
                        <Settings className="mr-2 h-4 w-4" strokeWidth={1.5} />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => setBrowseIntegrationsOpen(true)}
                className="h-11 px-6 md:px-8 rounded-full bg-[#3F2F2C] hover:bg-[#5A4A42] text-white font-serif text-sm shadow-[0_8px_24px_rgba(63,47,44,0.25)] transition-all duration-700"
              >
                <Plus className="mr-2 h-4 w-4" strokeWidth={1.5} />
                Browse More Integrations
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={browseIntegrationsOpen} onOpenChange={setBrowseIntegrationsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto rounded-[28px] backdrop-blur-3xl bg-[#F7F4EF]/98 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.25)] p-0">
          <DialogHeader className="p-8 pb-6">
            <DialogTitle className="font-serif text-2xl text-[#5A4A42]">Browse Integrations</DialogTitle>
            <DialogDescription className="font-sans text-sm text-[#6E5A4F] leading-relaxed">
              Connect ATTACHAI with your favorite tools and services
            </DialogDescription>
          </DialogHeader>
          
          <div className="px-8 pb-8">
            <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
              {availableIntegrations.map((integration, idx) => (
                <div
                  key={integration.id}
                  className="p-6 rounded-[20px] backdrop-blur-3xl bg-white/50 border-0 shadow-[0_8px_32px_rgba(213,200,186,0.12)] hover:shadow-[0_12px_48px_rgba(213,200,186,0.2)] transition-all duration-900 animate-fadeSlideIn"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#D5C8BA] flex items-center justify-center shadow-[0_6px_20px_rgba(216,200,168,0.25)]">
                      <integration.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#5A4A42]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-sm sm:text-base text-[#5A4A42] mb-0.5">{integration.name}</h3>
                      <p className="font-sans text-[10px] sm:text-sm text-[#6E5A4F] mb-2">{integration.type}</p>
                      <p className="font-sans text-xs sm:text-sm text-[#6E5A4F] leading-relaxed">
                        {integration.description}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAddIntegration(integration)}
                    className="w-full h-9 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] hover:from-[#D8C8A8]/90 hover:to-[#D5C8BA]/90 text-[#5A4A42] font-sans text-[10px] sm:text-sm shadow-[0_4px_16px_rgba(216,200,168,0.2)] transition-all duration-700"
                  >
                    <Plus className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                    Add Integration
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={configureIntegrationOpen} onOpenChange={setConfigureIntegrationOpen}>
        <DialogContent className="max-w-2xl rounded-[28px] backdrop-blur-3xl bg-[#F7F4EF]/98 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.25)] p-0">
          {selectedIntegration && (
            <>
              <DialogHeader className="p-8 pb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#D5C8BA] flex items-center justify-center shadow-[0_8px_24px_rgba(216,200,168,0.3)]">
                    <selectedIntegration.icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#5A4A42]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <DialogTitle className="font-serif text-2xl text-[#5A4A42]">{selectedIntegration.name}</DialogTitle>
                    <DialogDescription className="font-sans text-sm text-[#6E5A4F]">
                      {selectedIntegration.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="px-8 pb-8">
                <div className="space-y-5">
                  {selectedIntegration.setupFields?.map((field: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <Label className="font-sans text-xs sm:text-sm text-[#6E5A4F] font-normal">{field.label}</Label>
                      {field.type === 'textarea' ? (
                        <textarea
                          placeholder={field.placeholder}
                          rows={4}
                          className="w-full rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-mono text-[11px] sm:text-sm text-[#6E5A4F] p-3 resize-none"
                        />
                      ) : (
                        <Input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="h-11 rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-[15px] sm:text-sm font-normal text-[#6E5A4F]"
                        />
                      )}
                    </div>
                  ))}

                  <div className="pt-4 p-4 rounded-[18px] backdrop-blur-xl bg-[#E9DCD2]/30 border-0">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#C9A876] mt-0.5 flex-shrink-0" />
                      <p className="font-sans text-xs sm:text-sm text-[#6E5A4F] leading-relaxed">
                        Your credentials are encrypted and securely stored. ATTACHAI uses them only to connect with {selectedIntegration.name}.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <Button 
                      onClick={() => {
                        setConfigureIntegrationOpen(false)
                        setSelectedIntegration(null)
                      }}
                      className="flex-1 h-11 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] hover:from-[#D8C8A8]/90 hover:to-[#D5C8BA]/90 text-[#5A4A42] font-sans text-xs sm:text-sm shadow-[0_8px_24px_rgba(216,200,168,0.25)] transition-all duration-700"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Save Integration
                    </Button>
                    <Button 
                      onClick={() => {
                        setConfigureIntegrationOpen(false)
                        setSelectedIntegration(null)
                      }}
                      variant="ghost"
                      className="h-11 px-6 rounded-full text-[#8B7355] hover:bg-[#E9E2D7]/30 font-sans text-xs sm:text-sm transition-all duration-700"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
        <DialogContent className="max-w-2xl rounded-[28px] backdrop-blur-3xl bg-[#F7F4EF]/98 border-0 shadow-[0_24px_80px_rgba(139,115,85,0.25)] p-0">
          <DialogHeader className="p-6 md:p-8 pb-4 md:pb-6">
            <DialogTitle className="font-serif text-lg md:text-xl text-[#5A4A42] font-medium tracking-[0.03em] uppercase">ADD TEAM MEMBER</DialogTitle>
            <DialogDescription className="font-sans text-xs md:text-sm text-[#6E5A4F] leading-relaxed">
              Create a new staff profile and set their access
            </DialogDescription>
          </DialogHeader>
          
          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <div className="space-y-4 md:space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="font-sans text-xs md:text-sm text-[#6E5A4F] font-normal">
                  Full Name <span className="text-[#C9A876]">*</span>
                </Label>
                <Input
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  placeholder="Enter full name"
                  className="h-10 md:h-11 rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm md:text-[15px] font-normal text-[#6E5A4F]"
                />
                {addMemberOpen && !newMember.name && (
                  <p className="font-sans text-[10px] text-[#C9A876]">Name is required</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="font-sans text-xs md:text-sm text-[#6E5A4F] font-normal">
                  Email Address <span className="text-[#C9A876]">*</span>
                </Label>
                <Input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  placeholder="email@example.com"
                  className="h-10 md:h-11 rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm md:text-[15px] font-normal text-[#6E5A4F]"
                />
                {addMemberOpen && !newMember.email && (
                  <p className="font-sans text-[10px] text-[#C9A876]">Email is required</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="font-sans text-xs md:text-sm text-[#6E5A4F] font-normal">
                  Phone Number <span className="font-sans text-[10px] text-[#8B7355]">(optional)</span>
                </Label>
                <Input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                  className="h-10 md:h-11 rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm md:text-[15px] font-normal text-[#6E5A4F]"
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label className="font-sans text-xs md:text-sm text-[#6E5A4F] font-normal">
                  Role <span className="text-[#C9A876]">*</span>
                </Label>
                <Select value={newMember.role} onValueChange={(value) => setNewMember({...newMember, role: value})}>
                  <SelectTrigger className="h-10 md:h-11 rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm md:text-[15px] font-normal text-[#6E5A4F]">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[20px] backdrop-blur-3xl bg-[#F7F4EF]/95 border-[#D5C8BA]/30">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="concierge">Concierge</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
                {addMemberOpen && !newMember.role && (
                  <p className="font-sans text-[10px] text-[#C9A876]">Role is required</p>
                )}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="font-sans text-xs md:text-sm text-[#6E5A4F] font-normal">Status</Label>
                <Select value={newMember.status} onValueChange={(value) => setNewMember({...newMember, status: value})}>
                  <SelectTrigger className="h-10 md:h-11 rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-sm md:text-[15px] font-normal text-[#6E5A4F]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[20px] backdrop-blur-3xl bg-[#F7F4EF]/95 border-[#D5C8BA]/30">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="away">Away</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* AI Context */}
              <div className="space-y-2">
                <Label className="font-sans text-xs md:text-sm text-[#6E5A4F] font-normal uppercase tracking-[0.02em]">AI CONTEXT</Label>
                <textarea
                  value={newMember.aiContext}
                  onChange={(e) => setNewMember({...newMember, aiContext: e.target.value})}
                  placeholder="Describe what this team member handles so AI knows when to escalate to them..."
                  rows={3}
                  className="w-full rounded-[14px] backdrop-blur-2xl bg-white/50 border-0 ring-0 focus:ring-0 focus-visible:ring-0 shadow-[0_4px_16px_rgba(213,200,186,0.12)] font-sans text-xs md:text-sm font-normal text-[#6E5A4F] p-3 resize-none"
                />
                <p className="font-sans text-[9px] md:text-[10px] text-[#6E5A4F] leading-relaxed">
                  Help the AI understand this person's expertise and when to route actions to them
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <Button 
                  onClick={handleSaveNewMember}
                  disabled={!newMember.name || !newMember.email || !newMember.role}
                  className="flex-1 h-10 md:h-11 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#D5C8BA] hover:from-[#D8C8A8]/90 hover:to-[#D5C8BA]/90 text-[#5A4A42] font-sans text-xs md:text-sm shadow-[0_8px_24px_rgba(216,200,168,0.25)] transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Save Team Member
                </Button>
                <Button 
                  onClick={() => {
                    setAddMemberOpen(false)
                    setNewMember({
                      name: "",
                      email: "",
                      phone: "",
                      role: "",
                      status: "active",
                      aiContext: ""
                    })
                  }}
                  variant="ghost"
                  className="h-10 md:h-11 px-6 rounded-full text-[#8B7355] hover:bg-[#E9E2D7]/30 font-sans text-xs md:text-sm transition-all duration-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
