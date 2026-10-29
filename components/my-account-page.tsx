"use client"

import { Building2, Shield, Globe, Clock, DollarSign, MapPin } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function MyAccountPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Account Overview */}
      <div className="backdrop-blur-3xl bg-white/40 rounded-xl md:rounded-[24px] p-3 md:p-5 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
        <h2 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-4 md:mb-6">Account Overview</h2>
        
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0">
            <div className="space-y-3 md:space-y-4 flex-1 w-full">
              <div className="flex items-center gap-2 md:gap-3">
                <Building2 className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355]" strokeWidth={1.5} />
                <div>
                  <div className="text-[10px] md:text-xs font-normal text-[#8B7355] mb-0.5 md:mb-1">Organization</div>
                  <div className="text-xs md:text-sm font-normal text-[#6E5A4F]">ATTACHAI Club</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 md:gap-3">
                <div className="h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#D8C8A8]/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] md:text-xs font-normal text-[#8B7355] mb-0.5 md:mb-1">Account Owner</div>
                  <div className="text-xs md:text-sm font-normal text-[#6E5A4F]">Grace G</div>
                  <div className="text-[10px] md:text-xs font-normal text-[#B8A896] mt-0.5 break-all">grace.g@attachaiclub.com</div>
                </div>
              </div>
            </div>

            <div className="flex md:flex-col gap-2 md:gap-3 w-full md:w-auto">
              <Badge className="rounded-full px-3 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs font-normal bg-[#D8C8A8]/20 text-[#8B7355] border-0 shadow-sm whitespace-nowrap">
                Production Plan
              </Badge>
              <Badge className="rounded-full px-3 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs font-normal bg-[#D5C8BA]/30 text-[#8B7355] border-0 shadow-sm whitespace-nowrap">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Environment */}
      <div className="backdrop-blur-3xl bg-white/40 rounded-xl md:rounded-[24px] p-3 md:p-5 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
        <h2 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-4 md:mb-6">Environment</h2>
        
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-start gap-2 md:gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#D8C8A8]/20 flex items-center justify-center flex-shrink-0">
              <Globe className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs md:text-sm font-normal text-[#6E5A4F] mb-1">Production</div>
              <div className="text-[10px] md:text-xs font-normal text-[#8B7355] leading-relaxed">
                All AI interactions are live and affect real client conversations
              </div>
            </div>
          </div>
          
          <Link href="/settings">
            <Button variant="ghost" className="h-auto w-full md:w-auto px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-normal text-[#8B7355] hover:bg-[#D8C8A8]/10 border border-[#D8C8A8]/30 transition-all duration-900">
              Go to Property Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Security & Access */}
      <div className="backdrop-blur-3xl bg-white/40 rounded-xl md:rounded-[24px] p-3 md:p-5 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
        <h2 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-4 md:mb-6">Security & Access</h2>
        
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
            <div className="flex items-start gap-2 md:gap-3 flex-1">
              <Shield className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="min-w-0">
                <div className="text-xs md:text-sm font-normal text-[#6E5A4F] mb-1">Two-Factor Authentication</div>
                <Badge className="rounded-full px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-normal bg-[#9B8370]/20 text-[#8B7355] border-0 whitespace-nowrap">
                  Not Enabled
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
              <Button className="h-auto px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-normal bg-[#D8C8A8]/30 text-[#6E5A4F] hover:bg-[#D8C8A8]/40 border-0 shadow-sm transition-all duration-900 whitespace-nowrap">
                Enable 2FA
              </Button>
              <Button variant="ghost" className="h-auto px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-normal text-[#8B7355] hover:bg-white/50 border border-[#D8C8A8]/30 transition-all duration-900 whitespace-nowrap">
                View Sessions
              </Button>
            </div>
          </div>
          
          <div className="text-[10px] md:text-xs font-normal text-[#B8A896] pt-2 border-t border-[#D5C8BA]/20 break-words">
            Last login: 2 hours ago from San Francisco, CA on Chrome (macOS)
          </div>
        </div>
      </div>

      {/* Workspace Meta */}
      <div className="backdrop-blur-3xl bg-white/40 rounded-xl md:rounded-[24px] p-3 md:p-5 shadow-[0_20px_80px_-20px_rgba(139,115,85,0.15)] border-0">
        <h2 className="font-serif text-[9px] md:text-[10px] font-normal text-[#6E5A4F] tracking-widest uppercase mb-4 md:mb-6">Workspace Meta</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          <div className="flex items-start gap-2 md:gap-3">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <div>
              <div className="text-[10px] md:text-xs font-normal text-[#8B7355] mb-0.5 md:mb-1">Timezone</div>
              <div className="text-xs md:text-sm font-normal text-[#6E5A4F]">Pacific Time (PT)</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2 md:gap-3">
            <Globe className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <div>
              <div className="text-[10px] md:text-xs font-normal text-[#8B7355] mb-0.5 md:mb-1">Default Language</div>
              <div className="text-xs md:text-sm font-normal text-[#6E5A4F]">English (US)</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2 md:gap-3">
            <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <div>
              <div className="text-[10px] md:text-xs font-normal text-[#8B7355] mb-0.5 md:mb-1">Default Currency</div>
              <div className="text-xs md:text-sm font-normal text-[#6E5A4F]">USD ($)</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2 md:gap-3">
            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-[#8B7355] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <div>
              <div className="text-[10px] md:text-xs font-normal text-[#8B7355] mb-0.5 md:mb-1">Primary Vertical</div>
              <div className="text-xs md:text-sm font-normal text-[#6E5A4F]">Luxury Hospitality</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
