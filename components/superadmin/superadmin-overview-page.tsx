"use client"

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DollarSign, TrendingUp, Building2, Users, ArrowRight, AlertTriangle } from 'lucide-react'
import { financialMetrics, riskFlags } from '@/mock/superadmin-data'

export function SuperadminOverviewPage() {
  const avgRevenuePerOrg = financialMetrics.mrr / 48 // Assuming 48 orgs

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="mx-auto max-w-[1400px] space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase">
            Superadmin Overview
          </h1>
          <p className="text-sm text-[#6E5A4F] mt-2 font-light">
            High-level view of ATTACHAI performance and health.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 backdrop-blur-xl bg-white/80 border border-[#E9E2D7]/50 shadow-xl rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#C9A876]/20 to-[#A08968]/10">
                <DollarSign className="h-5 w-5 text-[#C9A876]" />
              </div>
              <p className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">ARR</p>
            </div>
            <p className="font-serif text-3xl text-[#6E5A4F] mb-2">
              ${(financialMetrics.arr / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-[#B8A896]">Annual Recurring Revenue</p>
          </Card>

          <Card className="p-6 backdrop-blur-xl bg-white/80 border border-[#E9E2D7]/50 shadow-xl rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#A08968]/20 to-[#8B7355]/10">
                <TrendingUp className="h-5 w-5 text-[#A08968]" />
              </div>
              <p className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">MRR</p>
            </div>
            <p className="font-serif text-3xl text-[#6E5A4F] mb-2">
              ${(financialMetrics.mrr / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-[#B8A896]">Monthly Recurring Revenue</p>
          </Card>

          <Card className="p-6 backdrop-blur-xl bg-white/80 border border-[#E9E2D7]/50 shadow-xl rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#D8C8A8]/20 to-[#C9A876]/10">
                <Building2 className="h-5 w-5 text-[#D8C8A8]" />
              </div>
              <p className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">Live Orgs</p>
            </div>
            <p className="font-serif text-3xl text-[#6E5A4F] mb-2">48</p>
            <p className="text-xs text-[#B8A896]">Active organisations</p>
          </Card>

          <Card className="p-6 backdrop-blur-xl bg-white/80 border border-[#E9E2D7]/50 shadow-xl rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#B8A896]/20 to-[#A08968]/10">
                <Users className="h-5 w-5 text-[#B8A896]" />
              </div>
              <p className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">Avg Rev/Org</p>
            </div>
            <p className="font-serif text-3xl text-[#6E5A4F] mb-2">
              ${(avgRevenuePerOrg / 1000).toFixed(1)}K
            </p>
            <p className="text-xs text-[#B8A896]">Average monthly revenue</p>
          </Card>
        </div>

        {/* Key Signals */}
        <Card className="p-8 backdrop-blur-xl bg-white/80 border border-[#E9E2D7]/50 shadow-xl rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="h-5 w-5 text-[#C9A876]" />
            <h2 className="font-serif text-lg text-[#6E5A4F] tracking-wide uppercase">Key Signals</h2>
          </div>
          
          <div className="space-y-4">
            {riskFlags.map((flag) => (
              <div
                key={flag.orgId}
                className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#DCC5BA]/10 to-transparent border-l-4 border-[#B08080]"
              >
                <div>
                  <p className="font-serif text-sm text-[#6E5A4F] font-medium">{flag.orgName}</p>
                  <p className="text-xs text-[#8B7355] mt-1">{flag.reason}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-serif tracking-wide uppercase ${
                  flag.severity === 'high'
                    ? 'bg-[#B08080]/20 text-[#B08080]'
                    : 'bg-[#C9A876]/20 text-[#C9A876]'
                }`}>
                  {flag.severity}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/superadmin/financials">
            <Card className="p-6 backdrop-blur-xl bg-white/80 border border-[#E9E2D7]/50 shadow-xl rounded-3xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="h-6 w-6 text-[#C9A876]" />
                <ArrowRight className="h-5 w-5 text-[#B8A896]" />
              </div>
              <h3 className="font-serif text-base text-[#6E5A4F] mb-2 uppercase tracking-wide">Financial Dashboard</h3>
              <p className="text-xs text-[#8B7355]">View revenue, growth and profitability</p>
            </Card>
          </Link>

          <Link href="/superadmin/pipeline">
            <Card className="p-6 backdrop-blur-xl bg-white/80 border border-[#E9E2D7]/50 shadow-xl rounded-3xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-6 w-6 text-[#A08968]" />
                <ArrowRight className="h-5 w-5 text-[#B8A896]" />
              </div>
              <h3 className="font-serif text-base text-[#6E5A4F] mb-2 uppercase tracking-wide">Pipeline</h3>
              <p className="text-xs text-[#8B7355]">Track deals and expansion opportunities</p>
            </Card>
          </Link>

          <Link href="/superadmin/health">
            <Card className="p-6 backdrop-blur-xl bg-white/80 border border-[#E9E2D7]/50 shadow-xl rounded-3xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <Activity className="h-6 w-6 text-[#D8C8A8]" />
                <ArrowRight className="h-5 w-5 text-[#B8A896]" />
              </div>
              <h3 className="font-serif text-base text-[#6E5A4F] mb-2 uppercase tracking-wide">Platform Health</h3>
              <p className="text-xs text-[#8B7355]">Operational stability and risk indicators</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
