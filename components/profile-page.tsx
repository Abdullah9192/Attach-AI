"use client"

import type React from "react"

import { useState } from "react"
import { User, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function ProfilePage() {
  const [hasChanges, setHasChanges] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string)
        setHasChanges(true)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Your Profile */}
      <div className="backdrop-blur-3xl bg-white/40 rounded-xl md:rounded-[24px] p-3 md:p-5 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
        <h2 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-4 md:mb-6">
          Your Profile
        </h2>

        <div className="space-y-6 md:space-y-8">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-[#D8C8A8]/30 flex items-center justify-center backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(216,200,168,0.3)] flex-shrink-0 overflow-hidden">
              {profilePhoto ? (
                <img src={profilePhoto || "/placeholder.svg"} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <User className="h-8 w-8 md:h-10 md:w-10 text-[#8B7355]" strokeWidth={1.5} />
              )}
            </div>
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Button
                type="button"
                onClick={() => document.getElementById("photo-upload")?.click()}
                className="h-auto px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-normal bg-[#D8C8A8]/30 text-[#3a2f28] hover:bg-[#D8C8A8]/40 border-0 shadow-sm transition-all duration-900 gap-2 whitespace-nowrap"
              >
                <Upload className="h-3 w-3 md:h-4 md:w-4" />
                Change Photo
              </Button>
            </label>
            <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2 md:space-y-3">
              <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">First Name</Label>
              <Input
                defaultValue="Grace"
                onChange={() => setHasChanges(true)}
                className="border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 backdrop-blur-2xl bg-white/50 rounded-xl md:rounded-[14px] text-xs md:text-sm font-normal text-[#3a2f28] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] h-10 md:h-12"
              />
            </div>
            <div className="space-y-2 md:space-y-3">
              <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">Last Name</Label>
              <Input
                defaultValue="G"
                onChange={() => setHasChanges(true)}
                className="border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 backdrop-blur-2xl bg-white/50 rounded-xl md:rounded-[14px] text-xs md:text-sm font-normal text-[#3a2f28] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] h-10 md:h-12"
              />
            </div>
          </div>

          {/* Job Title */}
          <div className="space-y-2 md:space-y-3">
            <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">Job Title / Role</Label>
            <Input
              defaultValue="Concierge Manager"
              onChange={() => setHasChanges(true)}
              className="border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 backdrop-blur-2xl bg-white/50 rounded-xl md:rounded-[14px] text-xs md:text-sm font-normal text-[#3a2f28] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] h-10 md:h-12"
            />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2 md:space-y-3">
              <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">Email</Label>
              <Input
                defaultValue="grace.g@attachaiclub.com"
                disabled
                className="border-0 ring-0 backdrop-blur-2xl bg-white/30 rounded-xl md:rounded-[14px] text-xs md:text-sm font-normal text-[#8B7355] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] h-10 md:h-12 cursor-not-allowed break-all"
              />
            </div>
            <div className="space-y-2 md:space-y-3">
              <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">Phone (Optional)</Label>
              <Input
                defaultValue="+1 (415) 555-0123"
                onChange={() => setHasChanges(true)}
                className="border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 backdrop-blur-2xl bg-white/50 rounded-xl md:rounded-[14px] text-xs md:text-sm font-normal text-[#3a2f28] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] h-10 md:h-12"
              />
            </div>
          </div>

          {/* Signature */}
          <div className="space-y-2 md:space-y-3">
            <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">Signature / Sign-off Line</Label>
            <Textarea
              defaultValue="Best regards,&#10;Grace"
              onChange={() => setHasChanges(true)}
              className="border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 backdrop-blur-2xl bg-white/50 rounded-xl md:rounded-[14px] text-xs md:text-sm font-normal text-[#3a2f28] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] min-h-[80px] resize-none"
            />
            <p className="text-[10px] md:text-xs font-normal text-[#B8A896]">Used in human-handed messages</p>
          </div>
        </div>
      </div>

      {/* Notifications Identity */}
      <div className="backdrop-blur-3xl bg-white/40 rounded-xl md:rounded-[24px] p-3 md:p-5 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
        <h2 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-4 md:mb-6">
          Notifications Identity
        </h2>

        <div className="space-y-4 md:space-y-6">
          <div className="space-y-2 md:space-y-3">
            <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">Display Name in Chats</Label>
            <Input
              defaultValue="Grace"
              onChange={() => setHasChanges(true)}
              className="border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 backdrop-blur-2xl bg-white/50 rounded-xl md:rounded-[14px] text-xs md:text-sm font-normal text-[#6E5A4F] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] h-10 md:h-12"
            />
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-[10px] md:text-xs font-normal text-[#8B7355]">Initials Badge Preview:</div>
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#D8C8A8]/30 flex items-center justify-center backdrop-blur-xl text-[10px] md:text-xs font-normal text-[#6E5A4F] shadow-sm">
              GG
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="backdrop-blur-3xl bg-white/40 rounded-xl md:rounded-[24px] p-3 md:p-5 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
        <h2 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-4 md:mb-6">
          Preferences
        </h2>

        <div className="space-y-6 md:space-y-8">
          {/* Time & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2 md:space-y-3">
              <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">Time Zone</Label>
              <Select defaultValue="pst" onValueChange={() => setHasChanges(true)}>
                <SelectTrigger className="border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 backdrop-blur-2xl bg-white/50 rounded-xl md:rounded-[14px] text-xs md:text-sm font-normal text-[#3a2f28] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] h-10 md:h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-2xl bg-white/95 border-0 shadow-[0_8px_32px_-8px_rgba(139,115,85,0.2)] rounded-xl">
                  <SelectItem
                    value="pst"
                    className="text-xs md:text-sm font-normal text-[#3a2f28] focus:bg-[#D8C8A8]/20 focus:text-[#3a2f28]"
                  >
                    Pacific Time (PST)
                  </SelectItem>
                  <SelectItem
                    value="mst"
                    className="text-xs md:text-sm font-normal text-[#3a2f28] focus:bg-[#D8C8A8]/20 focus:text-[#3a2f28]"
                  >
                    Mountain Time (MST)
                  </SelectItem>
                  <SelectItem
                    value="cst"
                    className="text-xs md:text-sm font-normal text-[#3a2f28] focus:bg-[#D8C8A8]/20 focus:text-[#3a2f28]"
                  >
                    Central Time (CST)
                  </SelectItem>
                  <SelectItem
                    value="est"
                    className="text-xs md:text-sm font-normal text-[#3a2f28] focus:bg-[#D8C8A8]/20 focus:text-[#3a2f28]"
                  >
                    Eastern Time (EST)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:space-y-3">
              <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">Date Format</Label>
              <Select defaultValue="mdy" onValueChange={() => setHasChanges(true)}>
                <SelectTrigger className="border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 backdrop-blur-2xl bg-white/50 rounded-xl md:rounded-[14px] text-xs md:text-sm font-normal text-[#3a2f28] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] h-10 md:h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-2xl bg-white/95 border-0 shadow-[0_8px_32px_-8px_rgba(139,115,85,0.2)] rounded-xl">
                  <SelectItem
                    value="mdy"
                    className="text-xs md:text-sm font-normal text-[#3a2f28] focus:bg-[#D8C8A8]/20 focus:text-[#3a2f28]"
                  >
                    MM/DD/YYYY
                  </SelectItem>
                  <SelectItem
                    value="dmy"
                    className="text-xs md:text-sm font-normal text-[#3a2f28] focus:bg-[#D8C8A8]/20 focus:text-[#3a2f28]"
                  >
                    DD/MM/YYYY
                  </SelectItem>
                  <SelectItem
                    value="ymd"
                    className="text-xs md:text-sm font-normal text-[#3a2f28] focus:bg-[#D8C8A8]/20 focus:text-[#3a2f28]"
                  >
                    YYYY-MM-DD
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4 md:space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">Email Notifications</Label>
                <p className="text-[10px] md:text-xs font-normal text-[#B8A896]">Receive updates via email</p>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={() => setHasChanges(true)}
                className="data-[state=checked]:bg-[#D8C8A8]/60 data-[state=unchecked]:bg-[#D5C8BA]/30"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">Desktop Notifications</Label>
                <p className="text-[10px] md:text-xs font-normal text-[#B8A896]">Show notifications on desktop</p>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={() => setHasChanges(true)}
                className="data-[state=checked]:bg-[#D8C8A8]/60 data-[state=unchecked]:bg-[#D5C8BA]/30"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">Sound Effects</Label>
                <p className="text-[10px] md:text-xs font-normal text-[#B8A896]">Play sounds for new messages</p>
              </div>
              <Switch
                onCheckedChange={() => setHasChanges(true)}
                className="data-[state=checked]:bg-[#D8C8A8]/60 data-[state=unchecked]:bg-[#D5C8BA]/30"
              />
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2 md:space-y-3">
            <Label className="text-[10px] md:text-xs font-normal text-[#8B7355]">Language</Label>
            <Select defaultValue="en" onValueChange={() => setHasChanges(true)}>
              <SelectTrigger className="border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 backdrop-blur-2xl bg-white/50 rounded-xl md:rounded-[14px] text-xs md:text-sm font-normal text-[#3a2f28] shadow-[0_2px_12px_-2px_rgba(139,115,85,0.08)] h-10 md:h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="backdrop-blur-2xl bg-white/95 border-0 shadow-[0_8px_32px_-8px_rgba(139,115,85,0.2)] rounded-xl">
                <SelectItem
                  value="en"
                  className="text-xs md:text-sm font-normal text-[#3a2f28] focus:bg-[#D8C8A8]/20 focus:text-[#3a2f28]"
                >
                  English
                </SelectItem>
                <SelectItem
                  value="es"
                  className="text-xs md:text-sm font-normal text-[#3a2f28] focus:bg-[#D8C8A8]/20 focus:text-[#3a2f28]"
                >
                  Español
                </SelectItem>
                <SelectItem
                  value="fr"
                  className="text-xs md:text-sm font-normal text-[#3a2f28] focus:bg-[#D8C8A8]/20 focus:text-[#3a2f28]"
                >
                  Français
                </SelectItem>
                <SelectItem
                  value="de"
                  className="text-xs md:text-sm font-normal text-[#3a2f28] focus:bg-[#D8C8A8]/20 focus:text-[#3a2f28]"
                >
                  Deutsch
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          disabled={!hasChanges}
          className={`h-auto w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-full text-xs md:text-sm font-normal transition-all duration-900 ${
            hasChanges
              ? "bg-[#D8C8A8]/40 text-[#3a2f28] hover:bg-[#D8C8A8]/50 shadow-[inset_0_0_0_1px_rgba(216,200,168,0.5),0_8px_24px_-4px_rgba(216,200,168,0.3)] border-0"
              : "bg-[#D5C8BA]/20 text-[#B8A896] cursor-not-allowed border-0"
          }`}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}
