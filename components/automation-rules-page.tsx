"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Search, X, Settings, Badge, Workflow, AlertTriangle, Moon, Wrench, UserPlus, TrendingDown, Phone, MessageSquare, Mail, Tag, ArrowRight, Play, MoreVertical, Copy, FileText, Trash2, TrendingUp, CircleDot, CheckCircle2, AlertCircle } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Condition {
  type: string
  operator: string
  value: string
  connector: string | null
}

interface Action {
  type: string
  value: string
}

interface Rule {
  id: number
  name: string
  status: "active" | "paused"
  scope: string
  channels: string[]
  category: string
  summary: string
  triggersToday: number
  successRate: number
  errors: number
  conditions: Condition[]
  actions: Action[]
}

const initialRules: Rule[] = [
  {
    id: 1,
    name: "VIP Client Requests",
    status: "active",
    scope: "Global",
    channels: ["whatsapp", "sms"],
    category: "VIP",
    summary: "IF client tier = VIP AND message contains request → THEN route to Senior Concierge, send WhatsApp notification, set priority High",
    triggersToday: 23,
    successRate: 95,
    errors: 2,
    conditions: [
      { type: "Client Tier", operator: "equals", value: "VIP", connector: "AND" },
      { type: "Message Intent", operator: "contains", value: "Request", connector: null }
    ],
    actions: [
      { type: "Route to", value: "Senior Concierge (Jane Smith)" },
      { type: "Notify via", value: "WhatsApp + In-app alert" },
      { type: "Set Priority", value: "High" },
      { type: "Tag Conversation", value: "VIP / Pre-arrival" }
    ]
  },
  {
    id: 2,
    name: "High-Value Service Requests",
    status: "active",
    scope: "Property",
    channels: ["whatsapp"],
    category: "Operations",
    summary: "IF action type = Service AND value > $500 → THEN pause execution, route to Property Manager, require approval",
    triggersToday: 8,
    successRate: 100,
    errors: 0,
    conditions: [
      { type: "Action Type", operator: "equals", value: "Service Request", connector: "AND" },
      { type: "Value", operator: "greater than", value: "$500", connector: null }
    ],
    actions: [
      { type: "Pause Execution", value: "Await manager approval" },
      { type: "Route to", value: "Property Manager" },
      { type: "Notify via", value: "Email + In-app" }
    ]
  },
  {
    id: 3,
    name: "Failed Actions Alert",
    status: "active",
    scope: "Global",
    channels: ["whatsapp", "sms", "email"],
    category: "Operations",
    summary: "IF action status = Failed → THEN notify responsible team via SMS, escalate after 10 minutes if no response",
    triggersToday: 3,
    successRate: 100,
    errors: 0,
    conditions: [
      { type: "Action Status", operator: "equals", value: "Failed", connector: null }
    ],
    actions: [
      { type: "Route to", value: "Responsible Department" },
      { type: "Notify via", value: "SMS (urgent)" },
      { type: "Set Priority", value: "Urgent" },
      { type: "Escalate After", value: "10 minutes if no response" }
    ]
  },
  {
    id: 4,
    name: "After-Hours Routing",
    status: "active",
    scope: "Global",
    channels: ["whatsapp", "sms"],
    category: "Operations",
    summary: "IF time outside business hours → THEN route to on-call manager, send urgent notification via WhatsApp + SMS",
    triggersToday: 12,
    successRate: 92,
    errors: 1,
    conditions: [
      { type: "Time of Day", operator: "outside", value: "7am - 11pm", connector: "AND" },
      { type: "Requires Human", operator: "equals", value: "Yes", connector: null }
    ],
    actions: [
      { type: "Route to", value: "On-call Manager" },
      { type: "Notify via", value: "WhatsApp + SMS" },
      { type: "Set Priority", value: "Urgent" },
      { type: "Auto-reply", value: "We've notified our on-call team" }
    ]
  },
  {
    id: 5,
    name: "Low AI Confidence",
    status: "paused",
    scope: "Global",
    channels: ["whatsapp"],
    category: "Operations",
    summary: "IF AI confidence < 70% → THEN flag conversation, route to Front Desk, show AI's attempted response for review",
    triggersToday: 0,
    successRate: 88,
    errors: 0,
    conditions: [
      { type: "AI Confidence", operator: "less than", value: "70%", connector: null }
    ],
    actions: [
      { type: "Flag Conversation", value: "⚠️ Low Confidence" },
      { type: "Route to", value: "Front Desk (next available)" },
      { type: "Show", value: "AI's attempted response for review" }
    ]
  }
]

const templates = [
  { id: "vip", name: "VIP Client Requests", icon: Badge, desc: "Route high-priority client requests to senior staff" },
  { id: "failed", name: "Failed Actions Alert", icon: AlertTriangle, desc: "Instantly notify team when actions fail" },
  { id: "booking", name: "New Service Request", icon: Workflow, desc: "Handle incoming service requests automatically" },
  { id: "inquiry", name: "General Inquiry", icon: MessageSquare, desc: "AI handles general questions with routing rules" }
]

const templateData: Record<string, Partial<Rule>> = {
  vip: {
    name: "VIP Client Requests",
    scope: "Global",
    channels: ["whatsapp"],
    category: "VIP",
    conditions: [
      { type: "Client Tier", operator: "equals", value: "VIP", connector: "AND" },
      { type: "Message Intent", operator: "contains", value: "Request", connector: null }
    ],
    actions: [
      { type: "Route to", value: "Senior Concierge" },
      { type: "Notify via", value: "WhatsApp + In-app alert" },
      { type: "Set Priority", value: "High" }
    ]
  },
  failed: {
    name: "Failed Actions Alert",
    scope: "Global",
    channels: ["whatsapp", "sms"],
    category: "Operations",
    conditions: [
      { type: "Action Status", operator: "equals", value: "Failed", connector: null }
    ],
    actions: [
      { type: "Route to", value: "Responsible Department" },
      { type: "Notify via", value: "SMS (urgent)" },
      { type: "Set Priority", value: "Urgent" }
    ]
  }
}

export function AutomationRulesPage() {
  const [rules, setRules] = React.useState<Rule[]>(initialRules)
  const [selectedRuleId, setSelectedRuleId] = React.useState<number | null>(null)
  const [filterStatus, setFilterStatus] = React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showTemplates, setShowTemplates] = React.useState(false)
  const [showRuleBuilder, setShowRuleBuilder] = React.useState(false)
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null)
  const [editingRuleId, setEditingRuleId] = React.useState<number | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<number | null>(null)
  const [simulationResult, setSimulationResult] = React.useState<string | null>(null)
  const [simulationInput, setSimulationInput] = React.useState("")
  const [showSuccessToast, setShowSuccessToast] = React.useState(false)
  
  const [builderForm, setBuilderForm] = React.useState({
    name: "",
    description: "",
    scope: "global",
    channels: [] as string[],
    category: "Operations",
    conditions: [{ type: "", operator: "", value: "", connector: null }] as Condition[],
    actions: [{ type: "", value: "" }] as Action[]
  })
  
  const selectedRule = selectedRuleId ? rules.find(r => r.id === selectedRuleId) : null

  const activeRules = rules.filter(r => r.status === "active").length
  const totalTriggers = rules.reduce((acc, r) => acc + r.triggersToday, 0)
  const avgSuccessRate = rules.length > 0 ? Math.round(rules.reduce((acc, r) => acc + r.successRate, 0) / rules.length) : 0

  const filteredRules = rules.filter(rule => {
    if (filterStatus !== "all" && rule.status !== filterStatus) return false
    if (searchQuery && !rule.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const generateSummary = (conditions: Condition[], actions: Action[]) => {
    const conditionsText = conditions.map((c, i) => {
      const connector = i < conditions.length - 1 && conditions[i].connector ? ` ${conditions[i].connector} ` : ""
      return `${c.type} ${c.operator} ${c.value}${connector}`
    }).join("")
    
    const actionsText = actions.map(a => `${a.type}: ${a.value}`).join(", ")
    
    return `IF ${conditionsText} → THEN ${actionsText}`
  }

  const handleCreateRule = () => {
    const newRule: Rule = {
      id: Math.max(0, ...rules.map(r => r.id)) + 1,
      name: builderForm.name || "Untitled Rule",
      status: "active",
      scope: builderForm.scope,
      channels: builderForm.channels,
      category: builderForm.category,
      summary: generateSummary(builderForm.conditions.filter(c => c.type && c.operator && c.value), builderForm.actions.filter(a => a.type && a.value)),
      triggersToday: 0,
      successRate: 100,
      errors: 0,
      conditions: builderForm.conditions.filter(c => c.type && c.operator && c.value),
      actions: builderForm.actions.filter(a => a.type && a.value)
    }
    
    setRules([...rules, newRule])
    setShowRuleBuilder(false)
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)
    resetBuilderForm()
  }

  const handleUpdateRule = (updatedRule: Rule) => {
    setRules(rules.map(r => r.id === updatedRule.id ? updatedRule : r))
    setSelectedRuleId(updatedRule.id) // Keep the editor open
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)
  }

  const handleDeleteRule = (ruleId: number) => {
    setRules(rules.filter(r => r.id !== ruleId))
    setDeleteConfirmId(null)
    setSelectedRuleId(null)
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)
  }

  const handleToggleRuleStatus = (ruleId: number) => {
    setRules(rules.map(r => 
      r.id === ruleId 
        ? { ...r, status: r.status === "active" ? "paused" : "active" } as Rule
        : r
    ))
  }

  const handleDuplicateRule = (ruleId: number) => {
    const ruleToDuplicate = rules.find(r => r.id === ruleId)
    if (!ruleToDuplicate) return
    
    const newRule: Rule = {
      ...ruleToDuplicate,
      id: Math.max(0, ...rules.map(r => r.id)) + 1,
      name: `${ruleToDuplicate.name} (Copy)`,
      triggersToday: 0,
      errors: 0
    }
    
    setRules([...rules, newRule])
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)
  }

  const resetBuilderForm = () => {
    setBuilderForm({
      name: "",
      description: "",
      scope: "global",
      channels: [],
      category: "Operations",
      conditions: [{ type: "", operator: "", value: "", connector: null }],
      actions: [{ type: "", value: "" }]
    })
  }

  const loadTemplate = (templateId: string) => {
    const template = templateData[templateId]
    if (template) {
      setBuilderForm({
        name: template.name || "",
        description: "",
        scope: template.scope || "global",
        channels: template.channels || [],
        category: template.category || "Operations",
        conditions: template.conditions || [{ type: "", operator: "", value: "", connector: null }],
        actions: template.actions || [{ type: "", value: "" }]
      })
    }
  }

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    loadTemplate(templateId)
    setShowTemplates(false)
    setShowRuleBuilder(true)
  }

  const handleStartFromScratch = () => {
    setSelectedTemplate(null)
    resetBuilderForm()
    setShowTemplates(false)
    setShowRuleBuilder(true)
  }

  const handleAddCondition = () => {
    const lastCondition = builderForm.conditions[builderForm.conditions.length - 1]
    const updatedConditions = [...builderForm.conditions]
    if (lastCondition && !lastCondition.connector) {
      updatedConditions[builderForm.conditions.length - 1] = { ...lastCondition, connector: "AND" }
    }
    updatedConditions.push({ type: "", operator: "", value: "", connector: null })
    setBuilderForm({ ...builderForm, conditions: updatedConditions })
  }

  const handleRemoveCondition = (index: number) => {
    const updatedConditions = builderForm.conditions.filter((_, i) => i !== index)
    if (updatedConditions.length > 0 && index < updatedConditions.length) {
      updatedConditions[index] = { ...updatedConditions[index], connector: null }
    } else if (updatedConditions.length > 0 && index === updatedConditions.length) {
       // If the last condition was removed, ensure the previous one's connector is cleared if it exists
       if(index > 0) updatedConditions[index - 1] = { ...updatedConditions[index - 1], connector: null }
    }
    setBuilderForm({ ...builderForm, conditions: updatedConditions })
  }

  const handleAddAction = () => {
    setBuilderForm({ 
      ...builderForm, 
      actions: [...builderForm.actions, { type: "", value: "" }] 
    })
  }

  const handleRemoveAction = (index: number) => {
    setBuilderForm({ 
      ...builderForm, 
      actions: builderForm.actions.filter((_, i) => i !== index) 
    })
  }

  const handleToggleChannel = (channel: string) => {
    setBuilderForm({
      ...builderForm,
      channels: builderForm.channels.includes(channel)
        ? builderForm.channels.filter(c => c !== channel)
        : [...builderForm.channels, channel]
    })
  }

  const handleSimulation = () => {
    if (!simulationInput.trim()) return
    
    // Simple simulation logic
    setTimeout(() => {
      setSimulationResult("✓ Rule would trigger: Route to Senior Concierge, Send WhatsApp notification, Set priority to High")
    }, 800)
  }

  const isRuleValid = () => {
    return (
      builderForm.name.trim() !== "" &&
      builderForm.conditions.some(c => c.type && c.operator && c.value) &&
      builderForm.actions.some(a => a.type && a.value)
    )
  }

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className={`flex-1 overflow-auto transition-all duration-900 ${selectedRule ? 'mr-[42%]' : ''}`}>
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-16 py-4 md:py-8 lg:py-16">
          
          <div className="space-y-1 md:space-y-2 mb-4 md:mb-10">
            <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase">
              AUTOMATION RULES
            </h1>
            <p className="text-[10px] md:text-sm font-light text-[#8B7355] leading-relaxed tracking-wide">
              Intelligent automation that learns and adapts to your needs
            </p>
          </div>

          <div className="mb-4 md:mb-12 rounded-xl md:rounded-[22px] backdrop-blur-3xl bg-white/40 border border-white/60 shadow-[0_8px_80px_rgba(216,200,168,0.15)] p-2 md:p-5">
            <div className="grid grid-cols-4 gap-2 md:gap-8">
              <div className="text-center">
                <div className="text-xl md:text-4xl font-serif text-[#3a2f28] mb-0.5 md:mb-2">{rules.length}</div>
                <div className="text-[8px] md:text-xs uppercase tracking-wider text-[#8B7355] font-light">Total Rules</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-4xl font-serif text-[#3a2f28] mb-0.5 md:mb-2">{activeRules}</div>
                <div className="text-[8px] md:text-xs uppercase tracking-wider text-[#8B7355] font-light">Active</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-4xl font-serif text-[#3a2f28] mb-0.5 md:mb-2">{totalTriggers}</div>
                <div className="text-[8px] md:text-xs uppercase tracking-wider text-[#8B7355] font-light flex items-center justify-center gap-0.5 md:gap-2">
                  Triggers Today
                  <span className="text-[#C9A876] text-[8px] md:text-[10px]">
                    <TrendingUp className="h-2 md:h-3 w-2 md:w-3" />
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-4xl font-serif text-[#3a2f28] mb-0.5 md:mb-2">{avgSuccessRate}%</div>
                <div className="text-[8px] md:text-xs uppercase tracking-wider text-[#8B7355] font-light">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="mb-4 md:mb-10 rounded-xl md:rounded-[22px] backdrop-blur-3xl bg-white/40 border border-white/60 shadow-[0_8px_80px_rgba(216,200,168,0.15)] p-2 md:p-5">
            <div className="flex items-center gap-1.5 md:gap-6 flex-wrap md:flex-nowrap">
              {/* Search */}
              <div className="flex-1 min-w-0 relative">
                <Search className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-3 md:h-4 w-3 md:w-4 text-[#8B7355]" />
                <Input
                  placeholder="Search rules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-7 md:pl-11 h-7 md:h-11 rounded-full backdrop-blur-xl bg-white/50 border-white/60 text-[10px] md:text-sm text-[#3a2f28] placeholder:text-[#8B7355]/50 focus:ring-[#D8C8A8]/30 focus:border-[#D8C8A8] transition-all duration-500"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
                {[
                  { value: "all", label: "All" },
                  { value: "active", label: "Active" },
                  { value: "paused", label: "Paused" }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setFilterStatus(filter.value)}
                    className={`px-2 md:px-5 py-1 md:py-2 rounded-full text-[8px] md:text-xs font-light tracking-wide transition-all duration-700 ${
                      filterStatus === filter.value
                        ? 'backdrop-blur-xl bg-[#D8C8A8]/30 text-[#3a2f28] shadow-[0_0_20px_rgba(216,200,168,0.4)] border border-[#D8C8A8]/40'
                        : 'backdrop-blur-xl bg-white/30 text-[#8B7355] border border-white/40 hover:bg-white/50 hover:shadow-[0_0_15px_rgba(216,200,168,0.2)]'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Create Button */}
              <Button
                onClick={() => setShowTemplates(true)}
                className="h-7 md:h-11 px-3 md:px-6 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_8px_30px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-105 text-[9px] md:text-sm flex-shrink-0"
              >
                <Plus className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                <span className="hidden sm:inline">Create Rule</span>
                <span className="sm:hidden">Create</span>
              </Button>
            </div>
          </div>

          <div className="space-y-1.5 md:space-y-3">
            {filteredRules.map((rule, index) => (
              <div
                key={rule.id}
                onClick={() => setSelectedRuleId(rule.id)}
                className="relative group rounded-xl md:rounded-[22px] backdrop-blur-3xl bg-white/40 shadow-[0_12px_40px_rgba(139,115,85,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] border-0 hover:bg-white/50 hover:shadow-[0_16px_56px_rgba(139,115,85,0.1),0_0_0_1px_rgba(216,200,168,0.15),inset_0_2px_4px_rgba(216,200,168,0.12)] hover:-translate-y-0.5 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-0.5 md:w-1 rounded-l-xl md:rounded-l-[22px] bg-gradient-to-b from-[#C9A876]/60 to-[#C9A876]/20" />
                
                <div className="p-2 md:p-5 flex items-start gap-2 md:gap-4 flex-wrap">
                  
                  <div className="flex-shrink-0 w-6 md:w-10 h-6 md:h-10 rounded-full bg-gradient-to-br from-[#D8C8A8]/40 to-[#C9A876]/30 backdrop-blur-xl flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.08)] border border-white/40">
                    <Workflow className="h-2.5 md:h-4 w-2.5 md:w-4 text-[#8B7355]" strokeWidth={1.25} />
                  </div>

                  <div className="w-full md:w-56 flex-shrink-0 space-y-1 md:space-y-2">
                    <h3 className="text-[10px] md:text-sm font-serif uppercase text-[#3a2f28] tracking-wide">
                      {rule.name}
                    </h3>
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${rule.status === 'active' ? 'bg-[#C9A876]' : 'bg-[#9B8370]'} shadow-[0_0_8px_currentColor]`} />
                      <span className="text-[8px] md:text-[10px] font-light text-[#B8A896] tracking-wide uppercase">
                        {rule.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1.5 md:space-y-3 min-w-0">
                    <div className="flex items-center gap-1 md:gap-3 flex-wrap">
                      <span className="inline-flex items-center gap-1 md:gap-1.5 px-1.5 md:px-3 py-0.5 md:py-1.5 rounded-full backdrop-blur-xl bg-[#E9E2D7]/40 text-[7px] md:text-[10px] font-light text-[#8B7355] border border-white/20">
                        {rule.scope}
                      </span>
                      <div className="flex items-center gap-1 md:gap-2">
                        {rule.channels.includes("whatsapp") && <MessageSquare className="h-2 md:h-3.5 w-2 md:w-3.5 text-[#8B7355]" />}
                        {rule.channels.includes("sms") && <Phone className="h-2 md:h-3.5 w-2 md:w-3.5 text-[#8B7355]" />}
                        {rule.channels.includes("email") && <Mail className="h-2 md:h-3.5 w-2 md:w-3.5 text-[#8B7355]" />}
                      </div>
                      <span className="inline-flex items-center gap-1 md:gap-1.5 px-1.5 md:px-3 py-0.5 md:py-1.5 rounded-full backdrop-blur-xl bg-[#D5C8BA]/30 text-[7px] md:text-[10px] font-light text-[#8B7355] border border-white/20">
                        {rule.category}
                      </span>
                    </div>
                    <p className="text-[9px] md:text-sm font-light text-[#6B5E52] leading-relaxed line-clamp-1 md:line-clamp-2">
                      {rule.summary}
                    </p>
                    <div className="flex items-center gap-2 md:gap-6 text-[8px] md:text-[10px] font-light text-[#B8A896] flex-wrap">
                      <span>Triggers today: <span className="text-[#3a2f28]">{rule.triggersToday}</span></span>
                      <span>Success: <span className="text-[#3a2f28]">{rule.successRate}%</span></span>
                      {rule.errors > 0 && (
                        <span className="text-[#9B8370]">Errors: <span>{rule.errors}</span></span>
                      )}
                    </div>
                  </div>

                  <div className="hidden md:flex w-64 flex-shrink-0 items-center justify-end gap-4">
                    <span className="text-xs font-light text-[#B8A896] tracking-wide">
                      {rule.triggersToday} triggers
                    </span>
                    <Switch 
                      checked={rule.status === "active"} 
                      onCheckedChange={() => handleToggleRuleStatus(rule.id)}
                      className="data-[state=checked]:bg-[#C9A876]"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-full hover:bg-white/60 transition-all duration-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4 text-[#8B7355]" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="backdrop-blur-3xl bg-white/90 border-white/60">
                        <DropdownMenuItem 
                          className="text-[#3a2f28] text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDuplicateRule(rule.id)
                          }}
                        >
                          <Copy className="mr-2 h-3.5 w-3.5" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#3a2f28] text-xs">
                          <FileText className="mr-2 h-3.5 w-3.5" />
                          Save as Template
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-[#9B8370] text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            setDeleteConfirmId(rule.id)
                          }}
                        >
                          <Trash2 className="mr-2 h-3.5 w-3.5" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right-Side Rule Editor Panel */}
      {selectedRule && (
        <div className="fixed right-0 top-0 bottom-0 w-[42%] bg-[#F7F4EF]/95 backdrop-blur-3xl border-l border-white/60 shadow-[-8px_0_80px_rgba(0,0,0,0.08)] overflow-auto animate-[slideInRight_0.9s_ease-out] z-50">
          <div className="p-10 space-y-10">
            
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <Input
                  defaultValue={selectedRule.name}
                  onChange={(e) => handleUpdateRule({ ...selectedRule, name: e.target.value })}
                  className="text-2xl font-serif text-[#3a2f28] border-none bg-transparent p-0 focus-visible:ring-0 placeholder:text-[#8B7355]/50"
                />
                <Input
                  placeholder="Add a short description..."
                  className="text-sm text-[#8B7355] border-none bg-transparent p-0 focus-visible:ring-0 placeholder:text-[#8B7355]/40 font-light"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedRuleId(null)}
                className="rounded-full hover:bg-white/60 transition-all duration-500"
              >
                <X className="h-5 w-5 text-[#8B7355]" />
              </Button>
            </div>

            {/* Status & Scope */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Status</span>
                <Switch 
                  checked={selectedRule.status === "active"} 
                  onCheckedChange={() => handleToggleRuleStatus(selectedRule.id)}
                  className="data-[state=checked]:bg-[#C9A876]" 
                />
                <span className="text-xs text-[#3a2f28]">{selectedRule.status === "active" ? "Active" : "Paused"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Scope</span>
                <Select 
                  defaultValue={selectedRule.scope.toLowerCase()}
                  onValueChange={(value) => handleUpdateRule({ ...selectedRule, scope: value.charAt(0).toUpperCase() + value.slice(1) })}
                >
                  <SelectTrigger className="w-32 h-9 rounded-full backdrop-blur-xl bg-white/50 border-white/60 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-3xl bg-white/90 border-white/60">
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="property">Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* IF Conditions */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-serif uppercase tracking-wider text-[#3a2f28]">IF (Conditions)</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    if (selectedRule) {
                      // Directly update the selectedRule state, then update the rules state
                      const updatedSelectedRule = {
                        ...selectedRule,
                        conditions: [...(selectedRule.conditions || []), { type: '', operator: '', value: '', connector: null }]
                      };
                      setRules(rules.map(r => r.id === selectedRule.id ? updatedSelectedRule : r));
                      // No need to call setSelectedRuleId(updatedSelectedRule.id) as it's already selected
                      // Optionally, you might want to re-trigger a re-render or ensure the state update is visible
                    }
                  }}
                  className="h-8 text-xs text-[#8B7355] hover:text-[#3a2f28] rounded-full hover:bg-white/50 transition-all duration-500"
                >
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Add Condition
                </Button>
              </div>
              
              <div className="space-y-4">
                {selectedRule.conditions.map((condition, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="rounded-[20px] backdrop-blur-2xl bg-[#E9E2D7]/40 border border-white/60 p-6">
                      <div className="grid grid-cols-3 gap-4">
                        <Select defaultValue={condition.type.toLowerCase().replace(/ /g, '-')}>
                          <SelectTrigger className="rounded-full backdrop-blur-xl bg-white/60 border-white/60 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-3xl bg-white/90 border-white/60">
                            <SelectItem value="client-tier">Client Tier</SelectItem>
                            <SelectItem value="message-intent">Message Intent</SelectItem>
                            <SelectItem value="action-type">Action Type</SelectItem>
                            <SelectItem value="time-of-day">Time of Day</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue={condition.operator.toLowerCase().replace(/ /g, '-')}>
                          <SelectTrigger className="rounded-full backdrop-blur-xl bg-white/60 border-white/60 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-3xl bg-white/90 border-white/60">
                            <SelectItem value="equals">equals</SelectItem>
                            <SelectItem value="contains">contains</SelectItem>
                            <SelectItem value="greater-than">greater than</SelectItem>
                            <SelectItem value="less-than">less than</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          defaultValue={condition.value}
                          className="rounded-full backdrop-blur-xl bg-white/60 border-white/60 text-xs"
                        />
                      </div>
                    </div>
                    {condition.connector && (
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full backdrop-blur-xl bg-[#D8C8A8]/30 text-[10px] uppercase tracking-wider text-[#3a2f28] font-normal border border-[#D8C8A8]/40">
                          {condition.connector}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-xl bg-white/40 border border-white/60">
                <span className="text-[10px] uppercase tracking-wider text-[#8B7355] font-light">Then</span>
                <ArrowRight className="h-4 w-4 text-[#C9A876]" />
              </div>
            </div>

            {/* THEN Actions */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-serif uppercase tracking-wider text-[#3a2f28]">THEN (Actions)</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    if (selectedRule) {
                      // Directly update the selectedRule state, then update the rules state
                      const updatedSelectedRule = {
                        ...selectedRule,
                        actions: [...(selectedRule.actions || []), { type: '', value: '' }]
                      };
                      setRules(rules.map(r => r.id === selectedRule.id ? updatedSelectedRule : r));
                    }
                  }}
                  className="h-8 text-xs text-[#8B7355] hover:text-[#3a2f28] rounded-full hover:bg-white/50 transition-all duration-500"
                >
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Add Action
                </Button>
              </div>
              
              <div className="space-y-4">
                {selectedRule.actions.map((action, idx) => (
                  <div key={idx} className="rounded-[20px] backdrop-blur-2xl bg-[#D5C8BA]/30 border border-white/60 p-6 flex items-center gap-4">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full backdrop-blur-xl bg-[#D8C8A8]/40 text-xs text-[#3a2f28] font-serif">
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="text-xs text-[#3a2f28] font-normal">{action.type}</div>
                      <div className="text-[10px] text-[#8B7355] font-light">{action.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulation */}
            <div className="rounded-[20px] backdrop-blur-2xl bg-white/40 border border-white/60 p-8 space-y-4">
              <h4 className="text-xs font-serif uppercase tracking-wider text-[#3a2f28]">Test This Rule</h4>
              <Input
                placeholder="Paste a sample message..."
                value={simulationInput}
                onChange={(e) => setSimulationInput(e.target.value)}
                className="rounded-full backdrop-blur-xl bg-white/60 border-white/60 text-xs font-light"
              />
              <Button 
                onClick={handleSimulation}
                className="w-full h-10 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_8px_30px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700"
              >
                <Play className="mr-2 h-3.5 w-3.5" />
                Run Simulation
              </Button>
              {simulationResult && (
                <div className="p-4 rounded-[16px] backdrop-blur-xl bg-[#C9A876]/10 border border-[#C9A876]/20 text-xs text-[#3a2f28] font-light">
                  {simulationResult}
                </div>
              )}
              <div className="pt-4 border-t border-white/40 text-[10px] text-[#8B7355]/70 font-light">
                Applied {selectedRule.triggersToday} times today · Last triggered 15 min ago
                {selectedRule.errors > 0 && <span className="text-[#9B8370]"> · {selectedRule.errors} error(s)</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-[#3a2f28]/20 backdrop-blur-md z-50 flex items-center justify-center p-8 animate-[fadeIn_0.5s_ease-out]" onClick={() => setShowTemplates(false)}>
          <div className="max-w-4xl w-full rounded-[28px] backdrop-blur-3xl bg-white/50 border border-white/60 shadow-[0_20px_120px_rgba(0,0,0,0.15)] p-12 animate-[fadeSlideIn_0.7s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-serif text-[#3a2f28] mb-2">Start with a Template</h2>
                <p className="text-sm text-[#8B7355] font-light">Choose a pre-configured rule to customize</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowTemplates(false)} className="rounded-full hover:bg-white/60">
                <X className="h-5 w-5 text-[#8B7355]" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {templates.map((template) => {
                const Icon = template.icon
                return (
                  <button
                    key={template.id}
                    onClick={() => handleSelectTemplate(template.id)}
                    className="text-left rounded-[22px] backdrop-blur-2xl bg-white/40 border border-white/60 p-8 hover:bg-white/60 hover:shadow-[0_12px_60px_rgba(216,200,168,0.2)] transition-all duration-700 hover:-translate-y-1 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] text-white shadow-lg group-hover:scale-110 transition-transform duration-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-serif text-base text-[#3a2f28]">{template.name}</h3>
                        <p className="text-xs text-[#8B7355] leading-relaxed font-light">{template.desc}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-white/30">
              <button
                onClick={handleStartFromScratch}
                className="w-full py-4 rounded-full backdrop-blur-xl bg-white/40 text-[#6B5E52] text-sm font-light tracking-wide shadow-[0_4px_20px_rgba(139,115,85,0.06)] border border-white/40 hover:bg-white/50 hover:shadow-[0_8px_32px_rgba(216,200,168,0.15)] transition-all duration-700"
              >
                Or start from scratch →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rule Builder Modal */}
      {showRuleBuilder && (
        <div className="fixed inset-0 bg-[#3a2f28]/20 backdrop-blur-md z-50 flex items-center justify-center p-8 animate-[fadeIn_0.5s_ease-out]" onClick={() => setShowRuleBuilder(false)}>
          <div className="max-w-5xl w-full max-h-[90vh] overflow-auto rounded-[28px] backdrop-blur-3xl bg-white/50 border border-white/60 shadow-[0_20px_120px_rgba(0,0,0,0.15)] p-12 animate-[fadeSlideIn_0.7s_ease-out]" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-2">
                <h2 className="text-2xl font-serif text-[#3a2f28]">
                  {selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.name : "Create New Automation Rule"}
                </h2>
                <p className="text-sm text-[#8B7355] font-light">
                  {selectedTemplate ? "Customize this pre-configured automation" : "Build a custom automation from scratch"}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowRuleBuilder(false)} className="rounded-full hover:bg-white/60">
                <X className="h-5 w-5 text-[#8B7355]" />
              </Button>
            </div>

            <div className="space-y-10">
              
              {/* Rule Name & Description */}
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Rule Name</Label>
                <Input
                  placeholder="e.g., VIP Client Requests"
                  value={builderForm.name}
                  onChange={(e) => setBuilderForm({ ...builderForm, name: e.target.value })}
                  className="h-12 rounded-[20px] backdrop-blur-xl bg-white/60 border-white/60 text-[15px] text-[#3a2f28] placeholder:text-[#B8A896]/50 focus-visible:ring-[#D8C8A8]/30 focus-visible:border-[#D8C8A8]"
                />
                <Input
                  placeholder="Short description (optional)"
                  value={builderForm.description}
                  onChange={(e) => setBuilderForm({ ...builderForm, description: e.target.value })}
                  className="h-10 rounded-[20px] backdrop-blur-xl bg-white/40 border-white/60 text-sm text-[#6B5E52] placeholder:text-[#B8A896]/50"
                />
              </div>

              {/* Scope & Channels */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Scope</Label>
                  <Select 
                    value={builderForm.scope}
                    onValueChange={(value) => setBuilderForm({ ...builderForm, scope: value })}
                  >
                    <SelectTrigger className="h-11 rounded-full backdrop-blur-xl bg-white/60 border-white/60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[20px] backdrop-blur-3xl bg-white/95 border-white/60">
                      <SelectItem value="global">Global (All Properties)</SelectItem>
                      <SelectItem value="property">Single Property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs uppercase tracking-wider text-[#8B7355] font-light">Channels</Label>
                  <div className="flex items-center gap-3 p-4 rounded-[20px] backdrop-blur-xl bg-white/40 border border-white/60">
                    <button 
                      type="button"
                      onClick={() => handleToggleChannel("whatsapp")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl text-xs font-light shadow-[0_2px_12px_rgba(139,115,85,0.08)] border transition-all duration-500 ${
                        builderForm.channels.includes("whatsapp")
                          ? "bg-[#D8C8A8]/40 text-[#3a2f28] border-white/40"
                          : "bg-white/40 text-[#8B7355] hover:bg-[#D8C8A8]/30"
                      }`}
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      WhatsApp
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleToggleChannel("sms")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl text-xs font-light transition-all duration-500 ${
                        builderForm.channels.includes("sms")
                          ? "bg-[#D8C8A8]/40 text-[#3a2f28] shadow-[0_2px_12px_rgba(139,115,85,0.08)] border border-white/40"
                          : "bg-white/40 text-[#8B7355] hover:bg-[#D8C8A8]/30"
                      }`}
                    >
                      <Phone className="h-3.5 w-3.5" />
                      SMS
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleToggleChannel("email")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl text-xs font-light transition-all duration-500 ${
                        builderForm.channels.includes("email")
                          ? "bg-[#D8C8A8]/40 text-[#3a2f28] shadow-[0_2px_12px_rgba(139,115,85,0.08)] border border-white/40"
                          : "bg-white/40 text-[#8B7355] hover:bg-[#D8C8A8]/30"
                      }`}
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </button>
                  </div>
                </div>
              </div>

              {/* IF Conditions */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-serif uppercase tracking-wider text-[#3a2f28]">IF (Trigger Conditions)</h3>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    onClick={handleAddCondition}
                    className="h-8 text-xs text-[#8B7355] hover:text-[#3a2f28] rounded-full hover:bg-white/50"
                  >
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    Add Condition
                  </Button>
                </div>

                <div className="space-y-4">
                  {builderForm.conditions.map((condition, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="rounded-[20px] backdrop-blur-2xl bg-[#E9E2D7]/40 border border-white/60 p-6">
                        <div className="grid grid-cols-3 gap-4">
                          <Select 
                            value={condition.type.toLowerCase().replace(/ /g, '-')}
                            onValueChange={(value) => {
                              const updatedConditions = [...builderForm.conditions]
                              updatedConditions[idx] = { ...condition, type: value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') }
                              setBuilderForm({ ...builderForm, conditions: updatedConditions })
                            }}
                          >
                            <SelectTrigger className="rounded-full backdrop-blur-xl bg-white/60 border-white/60 text-xs">
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent className="backdrop-blur-3xl bg-white/90 border-white/60">
                              <SelectItem value="client-tier">Client Tier</SelectItem>
                              <SelectItem value="message-intent">Message Intent</SelectItem>
                              <SelectItem value="action-type">Action Type</SelectItem>
                              <SelectItem value="time-of-day">Time of Day</SelectItem>
                              <SelectItem value="action-value">Action Value</SelectItem>
                              <SelectItem value="ai-confidence">AI Confidence</SelectItem>
                              <SelectItem value="requires-human">Requires Human</SelectItem>
                              <SelectItem value="action-status">Action Status</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select 
                            value={condition.operator.toLowerCase().replace(/ /g, '-')}
                            onValueChange={(value) => {
                              const updatedConditions = [...builderForm.conditions]
                              updatedConditions[idx] = { ...condition, operator: value.replace('-', ' ') }
                              setBuilderForm({ ...builderForm, conditions: updatedConditions })
                            }}
                          >
                            <SelectTrigger className="rounded-full backdrop-blur-xl bg-white/60 border-white/60 text-xs">
                              <SelectValue placeholder="Operator" />
                            </SelectTrigger>
                            <SelectContent className="backdrop-blur-3xl bg-white/90 border-white/60">
                              <SelectItem value="equals">equals</SelectItem>
                              <SelectItem value="contains">contains</SelectItem>
                              <SelectItem value="greater-than">greater than</SelectItem>
                              <SelectItem value="less-than">less than</SelectItem>
                              <SelectItem value="between">between</SelectItem>
                              <SelectItem value="outside">outside</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Value"
                              value={condition.value}
                              onChange={(e) => {
                                const updatedConditions = [...builderForm.conditions]
                                updatedConditions[idx] = { ...condition, value: e.target.value }
                                setBuilderForm({ ...builderForm, conditions: updatedConditions })
                              }}
                              className="rounded-full backdrop-blur-xl bg-white/60 border-white/60 text-xs"
                            />
                            {builderForm.conditions.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveCondition(idx)}
                                className="h-9 w-9 rounded-full hover:bg-white/60"
                              >
                                <X className="h-3.5 w-3.5 text-[#9B8370]" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {condition.connector && idx < builderForm.conditions.length - 1 && (
                        <div className="flex justify-center">
                          <Select
                            value={condition.connector.toLowerCase()}
                            onValueChange={(value) => {
                              const updatedConditions = [...builderForm.conditions]
                              updatedConditions[idx] = { ...condition, connector: value.toUpperCase() }
                              setBuilderForm({ ...builderForm, conditions: updatedConditions })
                            }}
                          >
                            <SelectTrigger className="w-24 h-8 rounded-full backdrop-blur-xl bg-[#D8C8A8]/30 border-[#D8C8A8]/40 text-[10px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="and">AND</SelectItem>
                              <SelectItem value="or">OR</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Suggested Trigger Patterns */}
                <div className="rounded-[20px] backdrop-blur-2xl bg-[#D8C8A8]/15 border border-[#D8C8A8]/30 p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <CircleDot className="h-4 w-4 text-[#C9A876]" strokeWidth={1.25} />
                    <h4 className="text-xs font-light text-[#3a2f28] uppercase tracking-wide">Suggested Patterns</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="px-4 py-2 rounded-full backdrop-blur-xl bg-white/50 text-[#6B5E52] text-xs font-light hover:bg-white/70 transition-all duration-500">
                      Client tier = VIP
                    </button>
                    <button type="button" className="px-4 py-2 rounded-full backdrop-blur-xl bg-white/50 text-[#6B5E52] text-xs font-light hover:bg-white/70 transition-all duration-500">
                      Value &gt; $500
                    </button>
                    <button type="button" className="px-4 py-2 rounded-full backdrop-blur-xl bg-white/50 text-[#6B5E52] text-xs font-light hover:bg-white/70 transition-all duration-500">
                      After hours
                    </button>
                    <button type="button" className="px-4 py-2 rounded-full backdrop-blur-xl bg-white/50 text-[#6B5E52] text-xs font-light hover:bg-white/70 transition-all duration-500">
                      AI confidence &lt; 70%
                    </button>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-xl bg-white/40 border border-white/60">
                  <span className="text-[10px] uppercase tracking-wider text-[#8B7355] font-light">Then</span>
                  <ArrowRight className="h-4 w-4 text-[#C9A876]" />
                </div>
              </div>

              {/* THEN Actions */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-serif uppercase tracking-wider text-[#3a2f28]">THEN (Actions to Execute)</h3>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    onClick={handleAddAction}
                    className="h-8 text-xs text-[#8B7355] hover:text-[#3a2f28] rounded-full hover:bg-white/50"
                  >
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    Add Action
                  </Button>
                </div>

                <div className="space-y-4">
                  {builderForm.actions.map((action, idx) => (
                    <div key={idx} className="rounded-[20px] backdrop-blur-2xl bg-[#D5C8BA]/30 border border-white/60 p-6">
                      <div className="grid grid-cols-2 gap-4">
                        <Select 
                          value={action.type.toLowerCase().replace(/ /g, '-')}
                          onValueChange={(value) => {
                            const updatedActions = [...builderForm.actions]
                            updatedActions[idx] = { ...action, type: value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') }
                            setBuilderForm({ ...builderForm, actions: updatedActions })
                          }}
                        >
                          <SelectTrigger className="rounded-full backdrop-blur-xl bg-white/60 border-white/60 text-xs">
                            <SelectValue placeholder="Action type" />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-3xl bg-white/90 border-white/60">
                            <SelectItem value="route-to">Route to Team/Person</SelectItem>
                            <SelectItem value="notify-via">Notify via Channel</SelectItem>
                            <SelectItem value="set-priority">Set Priority</SelectItem>
                            <SelectItem value="tag-conversation">Tag Conversation</SelectItem>
                            <SelectItem value="pause-execution">Pause Execution</SelectItem>
                            <SelectItem value="auto-reply">Send Auto-reply</SelectItem>
                            <SelectItem value="escalate-after">Escalate After Time</SelectItem>
                            <SelectItem value="flag-conversation">Flag Conversation</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Specify action value"
                            value={action.value}
                            onChange={(e) => {
                              const updatedActions = [...builderForm.actions]
                              updatedActions[idx] = { ...action, value: e.target.value }
                              setBuilderForm({ ...builderForm, actions: updatedActions })
                            }}
                            className="rounded-full backdrop-blur-xl bg-white/60 border-white/60 text-xs"
                          />
                          {builderForm.actions.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveAction(idx)}
                              className="h-9 w-9 rounded-full hover:bg-white/60"
                            >
                              <X className="h-3.5 w-3.5 text-[#9B8370]" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Suggested Action Flows */}
                <div className="rounded-[20px] backdrop-blur-2xl bg-[#D8C8A8]/15 border border-[#D8C8A8]/30 p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <CircleDot className="h-4 w-4 text-[#C9A876]" strokeWidth={1.25} />
                    <h4 className="text-xs font-light text-[#3a2f28] uppercase tracking-wide">Suggested Action Flows</h4>
                  </div>
                  <div className="space-y-3">
                    <button type="button" className="w-full text-left p-4 rounded-[16px] backdrop-blur-xl bg-white/50 hover:bg-white/70 transition-all duration-500">
                      <div className="text-xs font-light text-[#3a2f28] mb-1">Route to Senior Staff + WhatsApp Notification</div>
                      <div className="text-[10px] font-light text-[#8B7355]">For VIP or high-value requests</div>
                    </button>
                    <button type="button" className="w-full text-left p-4 rounded-[16px] backdrop-blur-xl bg-white/50 hover:bg-white/70 transition-all duration-500">
                      <div className="text-xs font-light text-[#3a2f28] mb-1">Pause + Require Approval</div>
                      <div className="text-[10px] font-light text-[#8B7355]">For high-value services or payments</div>
                    </button>
                    <button type="button" className="w-full text-left p-4 rounded-[16px] backdrop-blur-xl bg-white/50 hover:bg-white/70 transition-all duration-500">
                      <div className="text-xs font-light text-[#3a2f28] mb-1">Flag + Route to Front Desk</div>
                      <div className="text-[10px] font-light text-[#8B7355]">For low AI confidence situations</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Integration Setup */}
              <div className="space-y-6">
                <h3 className="text-sm font-serif uppercase tracking-wider text-[#3a2f28]">Integration Setup</h3>
                
                <div className="rounded-[20px] backdrop-blur-2xl bg-white/40 border border-white/60 p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] flex items-center justify-center shadow-lg">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-light text-[#3a2f28]">WhatsApp Business</h4>
                          <p className="text-xs font-light text-[#8B7355] mt-1">Send notifications via WhatsApp</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#C9A876] shadow-[0_0_8px_currentColor]" />
                          <span className="text-xs font-light text-[#8B7355]">Connected</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Input
                          placeholder="Notification template"
                          defaultValue="urgent-vip-alert"
                          className="flex-1 h-10 rounded-full backdrop-blur-xl bg-white/60 border-white/60 text-xs"
                        />
                        <Button variant="outline" size="sm" className="rounded-full text-xs font-light h-10 px-4 backdrop-blur-xl bg-white/40 border-white/60">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/30 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D8C8A8]/30 to-[#C9A876]/20 flex items-center justify-center border-2 border-dashed border-[#C9A876]/30">
                      <Plus className="h-5 w-5 text-[#8B7355]" />
                    </div>
                    <div className="flex-1">
                      <button type="button" className="w-full text-left group">
                        <h4 className="text-sm font-light text-[#6B5E52] group-hover:text-[#3a2f28] transition-colors">Add Integration</h4>
                        <p className="text-xs font-light text-[#B8A896] mt-1">Connect SMS, Email, Slack, or custom webhooks</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/30">
                <Button
                  type="button"
                  onClick={() => setShowRuleBuilder(false)}
                  variant="outline"
                  className="flex-1 h-12 rounded-full backdrop-blur-xl bg-white/50 border-white/60 text-[#6B5E52] hover:bg-white/70 transition-all duration-700"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleCreateRule}
                  disabled={!isRuleValid()}
                  className="flex-1 h-12 rounded-full bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3a2f28] hover:shadow-[0_12px_40px_rgba(216,200,168,0.4)] border border-white/40 transition-all duration-700 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Automation Rule
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-[#3a2f28]/30 backdrop-blur-md z-[60] flex items-center justify-center p-8 animate-[fadeIn_0.3s_ease-out]" onClick={() => setDeleteConfirmId(null)}>
          <div className="max-w-md w-full rounded-[24px] backdrop-blur-3xl bg-white/60 border border-white/60 shadow-[0_20px_100px_rgba(0,0,0,0.2)] p-8 animate-[fadeSlideIn_0.5s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#9B8370]/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-[#9B8370]" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-[#3a2f28]">Delete Rule</h3>
                <p className="text-sm text-[#8B7355] font-light mt-1">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-[#6B5E52] font-light mb-8 leading-relaxed">
              Are you sure you want to delete "{rules.find(r => r.id === deleteConfirmId)?.name}"? This will permanently remove the automation rule and all its configurations.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setDeleteConfirmId(null)}
                variant="outline"
                className="flex-1 h-11 rounded-full backdrop-blur-xl bg-white/50 border-white/60 text-[#6B5E52] hover:bg-white/70"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteRule(deleteConfirmId)}
                className="flex-1 h-11 rounded-full bg-[#9B8370] text-white hover:bg-[#8B7365] hover:shadow-[0_8px_30px_rgba(155,131,112,0.3)] transition-all duration-500"
              >
                Delete Rule
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-8 right-8 z-[70] animate-[fadeSlideIn_0.5s_ease-out]">
          <div className="rounded-[20px] backdrop-blur-3xl bg-white/70 border border-white/60 shadow-[0_12px_48px_rgba(0,0,0,0.12)] p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#C9A876]/20 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-[#C9A876]" />
            </div>
            <div>
              <h4 className="text-sm font-light text-[#3a2f28]">Success!</h4>
              <p className="text-xs text-[#8B7355] font-light mt-0.5">Your changes have been saved</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
