"use client"

import { useState } from "react"
import { Globe, Bell, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PreferencesPage() {
  const [hasChanges, setHasChanges] = useState(false)
  const [whatsappNotifications, setWhatsappNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  const handleSavePreferences = async () => {
    // TODO: Save to user preferences table/API
    console.log("[v0] Saving preferences:", { whatsappNotifications, emailNotifications })
    setHasChanges(false)
  }

  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6 max-w-4xl mx-auto">
      {/* Language & Time */}
      <div className="backdrop-blur-3xl bg-white/40 rounded-[18px] md:rounded-[20px] lg:rounded-[24px] p-4 md:p-5 lg:p-6 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5 lg:mb-6">
          <Globe className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355]" strokeWidth={1.5} />
          <h2 className="font-serif text-[9px] md:text-[10px] font-light text-[#6E5A4F] tracking-widest uppercase">
            LANGUAGE & TIME
          </h2>
        </div>

        <div className="space-y-4 md:space-y-5 lg:space-y-6">
          <div className="space-y-2 md:space-y-3">
            <Label className="text-[11px] md:text-xs font-light text-[#8B7355]">Interface Language</Label>
            <Select defaultValue="en-us" onValueChange={() => setHasChanges(true)}>
              <SelectTrigger className="border-0 ring-0 focus:ring-0 backdrop-blur-2xl bg-white/50 rounded-[12px] md:rounded-[14px] text-[13px] md:text-sm font-light text-[#3a2f28] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] h-11 md:h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="backdrop-blur-3xl bg-[#F7F4EF]/95 border-[#D5C8BA]/20 rounded-[16px]">
                <SelectItem value="en-us">English (US)</SelectItem>
                <SelectItem value="en-gb">English (UK)</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:space-y-3">
            <Label className="text-[11px] md:text-xs font-light text-[#8B7355]">Personal Timezone</Label>
            <Select defaultValue="pst" onValueChange={() => setHasChanges(true)}>
              <SelectTrigger className="border-0 ring-0 focus:ring-0 backdrop-blur-2xl bg-white/50 rounded-[12px] md:rounded-[14px] text-[13px] md:text-sm font-light text-[#3a2f28] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] h-11 md:h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="backdrop-blur-3xl bg-[#F7F4EF]/95 border-[#D5C8BA]/20 rounded-[16px]">
                <SelectItem value="gmt">GMT London (GMT)</SelectItem>
                <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                <SelectItem value="est">Eastern Time (ET)</SelectItem>
                <SelectItem value="cst">Central Time (CT)</SelectItem>
                <SelectItem value="mst">Mountain Time (MT)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:space-y-3">
            <Label className="text-[11px] md:text-xs font-light text-[#8B7355]">Date & Time Format</Label>
            <Select defaultValue="12h" onValueChange={() => setHasChanges(true)}>
              <SelectTrigger className="border-0 ring-0 focus:ring-0 backdrop-blur-2xl bg-white/50 rounded-[12px] md:rounded-[14px] text-[13px] md:text-sm font-light text-[#3a2f28] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] h-11 md:h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="backdrop-blur-3xl bg-[#F7F4EF]/95 border-[#D5C8BA]/20 rounded-[16px]">
                <SelectItem value="12h">12-hour (2:30 PM)</SelectItem>
                <SelectItem value="24h">24-hour (14:30)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="backdrop-blur-3xl bg-white/40 rounded-[18px] md:rounded-[20px] lg:rounded-[24px] p-4 md:p-5 lg:p-6 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5 lg:mb-6">
          <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355]" strokeWidth={1.25} />
          <h2 className="font-serif text-[9px] md:text-[10px] font-light text-[#6E5A4F] tracking-widest uppercase">
            COMMUNICATION PREFERENCES
          </h2>
        </div>

        <div className="space-y-1">
          <div className="flex items-start justify-between py-3 md:py-4 border-b border-[#D5C8BA]/20">
            <div className="flex-1 pr-3 md:pr-4">
              <div className="text-[13px] md:text-sm font-light text-[#6E5A4F] mb-1">WhatsApp notifications</div>
              <div className="text-[11px] md:text-xs font-light text-[#8B7355] leading-relaxed">
                Messages, alerts, and updates delivered via WhatsApp
              </div>
            </div>
            <Switch
              checked={whatsappNotifications}
              onCheckedChange={(checked) => {
                setWhatsappNotifications(checked)
                setHasChanges(true)
              }}
              className="data-[state=checked]:bg-[#C9A876] shrink-0 mt-0.5"
            />
          </div>

          <div className="flex items-start justify-between py-3 md:py-4">
            <div className="flex-1 pr-3 md:pr-4">
              <div className="text-[13px] md:text-sm font-light text-[#6E5A4F] mb-1">Email notifications</div>
              <div className="text-[11px] md:text-xs font-light text-[#8B7355] leading-relaxed">
                Receive summaries, important updates, and alerts by email
              </div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={(checked) => {
                setEmailNotifications(checked)
                setHasChanges(true)
              }}
              className="data-[state=checked]:bg-[#C9A876] shrink-0 mt-0.5"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="backdrop-blur-3xl bg-white/40 rounded-[18px] md:rounded-[20px] lg:rounded-[24px] p-4 md:p-5 lg:p-6 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5 lg:mb-6">
          <Bell className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355]" strokeWidth={1.25} />
          <h2 className="font-serif text-[9px] md:text-[10px] font-light text-[#6E5A4F] tracking-widest uppercase">
            ALERT PREFERENCES
          </h2>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] md:text-[11px] font-light text-[#8B7355] mb-2 md:mb-3">Critical Alerts</div>

          <div className="flex items-start justify-between py-2.5 md:py-3 border-b border-[#D5C8BA]/20">
            <div className="flex-1 pr-3 md:pr-4">
              <div className="text-[13px] md:text-sm font-light text-[#6E5A4F] mb-0.5 md:mb-1">
                Escalated Conversations
              </div>
              <div className="text-[11px] md:text-xs font-light text-[#8B7355] leading-relaxed">
                When AI requests human review
              </div>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
              className="data-[state=checked]:bg-[#C9A876] shrink-0 mt-0.5"
            />
          </div>

          <div className="flex items-start justify-between py-2.5 md:py-3 border-b border-[#D5C8BA]/20">
            <div className="flex-1 pr-3 md:pr-4">
              <div className="text-[13px] md:text-sm font-light text-[#6E5A4F] mb-0.5 md:mb-1">Failed Actions</div>
              <div className="text-[11px] md:text-xs font-light text-[#8B7355] leading-relaxed">
                When automated tasks fail
              </div>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
              className="data-[state=checked]:bg-[#C9A876] shrink-0 mt-0.5"
            />
          </div>

          <div className="flex items-start justify-between py-2.5 md:py-3 border-b border-[#D5C8BA]/20">
            <div className="flex-1 pr-3 md:pr-4">
              <div className="text-[13px] md:text-sm font-light text-[#6E5A4F] mb-0.5 md:mb-1">
                AI Human-Review Requests
              </div>
              <div className="text-[11px] md:text-xs font-light text-[#8B7355] leading-relaxed">
                Direct requests for assistance
              </div>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
              className="data-[state=checked]:bg-[#C9A876] shrink-0 mt-0.5"
            />
          </div>

          <div className="text-[10px] md:text-[11px] font-light text-[#8B7355] mt-4 md:mt-5 lg:mt-6 mb-2 md:mb-3">
            System Updates
          </div>

          <div className="flex items-start justify-between py-2.5 md:py-3 border-b border-[#D5C8BA]/20">
            <div className="flex-1 pr-3 md:pr-4">
              <div className="text-[13px] md:text-sm font-light text-[#6E5A4F] mb-0.5 md:mb-1">
                New AI Learning Updates
              </div>
              <div className="text-[11px] md:text-xs font-light text-[#8B7355] leading-relaxed">
                When AI discovers new patterns
              </div>
            </div>
            <Switch
              onCheckedChange={() => setHasChanges(true)}
              className="data-[state=checked]:bg-[#C9A876] shrink-0 mt-0.5"
            />
          </div>

          <div className="flex items-start justify-between py-2.5 md:py-3">
            <div className="flex-1 pr-3 md:pr-4">
              <div className="text-[13px] md:text-sm font-light text-[#6E5A4F] mb-0.5 md:mb-1">System Changes</div>
              <div className="text-[11px] md:text-xs font-light text-[#8B7355] leading-relaxed">
                Updates and maintenance notices
              </div>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
              className="data-[state=checked]:bg-[#C9A876] shrink-0 mt-0.5"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <Button
          disabled={!hasChanges}
          onClick={handleSavePreferences}
          className={`h-auto px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 rounded-full text-[13px] md:text-sm font-light transition-all duration-900 ${
            hasChanges
              ? "bg-[#D8C8A8]/40 text-[#3a2f28] hover:bg-[#D8C8A8]/50 shadow-[inset_0_0_0_1px_rgba(216,200,168,0.5),0_8px_24px_-4px_rgba(216,200,168,0.3)] border-0"
              : "bg-[#D5C8BA]/20 text-[#B8A896] cursor-not-allowed border-0"
          }`}
        >
          Save Preferences
        </Button>
      </div>
    </div>
  )
}
