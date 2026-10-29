"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { mockAdminOrganisations } from '@/mock/admin-organisations'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, Users, DollarSign, Activity, ArrowRight } from 'lucide-react'

export function AdminDashboardPage() {
  const router = useRouter()

  const totalOrgs = mockAdminOrganisations.length
  const liveOrgs = mockAdminOrganisations.filter(o => o.status === 'Live').length
  const totalStaff = mockAdminOrganisations.reduce((sum, org) => sum + org.activeStaff, 0)
  
  const tierPricing = { Boutique: 800, Signature: 1800, Estate: 3500 }
  const mrr = mockAdminOrganisations
    .filter(o => o.status === 'Live')
    .reduce((sum, org) => sum + tierPricing[org.tier], 0)

  const mostActive = [...mockAdminOrganisations]
    .sort((a, b) => b.messagesPerDay - a.messagesPerDay)
    .slice(0, 5)

  const metrics = [
    { label: 'Total Organisations', value: totalOrgs.toString(), icon: Building2, color: 'from-[#D8C8A8] to-[#C9A876]' },
    { label: 'Live Organisations', value: liveOrgs.toString(), icon: Activity, color: 'from-[#8B9D83] to-[#7A8C73]' },
    { label: 'Total Staff Users', value: totalStaff.toString(), icon: Users, color: 'from-[#B08A64] to-[#9A7A54]' },
    { label: 'Monthly Recurring Revenue', value: `£${(mrr / 1000).toFixed(1)}k`, icon: DollarSign, color: 'from-[#C9A876] to-[#B8986A]' },
  ]

  const statusColors = {
    Live: 'bg-[#8B9D83]/20 text-[#7A8C73] border-[#8B9D83]/30',
    Onboarding: 'bg-[#C9A876]/20 text-[#B8986A] border-[#C9A876]/30',
    Paused: 'bg-[#B8A896]/20 text-[#8B7355] border-[#B8A896]/30',
    Trial: 'bg-[#D8C8A8]/20 text-[#C9A876] border-[#D8C8A8]/30',
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase mb-2">
            Admin Overview
          </h1>
          <p className="text-sm text-[#8B7355] font-light">
            Central oversight for all organisations and experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div
                key={metric.label}
                className="rounded-[20px] backdrop-blur-xl bg-white/80 border border-[#E9E2D7]/30 shadow-lg p-6"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                </div>
                <p className="text-[10px] font-serif tracking-[0.12em] text-[#8B7355] uppercase mb-2">
                  {metric.label}
                </p>
                <p className="text-3xl font-serif text-[#6E5A4F] font-light">
                  {metric.value}
                </p>
              </div>
            )
          })}
        </div>

        <div className="rounded-[24px] backdrop-blur-xl bg-white/80 border border-[#E9E2D7]/30 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-[#E9E2D7]/30">
            <h2 className="font-serif text-base tracking-[0.08em] text-[#6E5A4F] uppercase">
              Most Active Organisations
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E9E2D7]/30">
                  <th className="text-left px-6 py-4 text-[10px] font-serif tracking-[0.12em] text-[#8B7355] uppercase">
                    Organisation
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] font-serif tracking-[0.12em] text-[#8B7355] uppercase">
                    Messages (7d)
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] font-serif tracking-[0.12em] text-[#8B7355] uppercase">
                    Active Staff
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] font-serif tracking-[0.12em] text-[#8B7355] uppercase">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-[10px] font-serif tracking-[0.12em] text-[#8B7355] uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {mostActive.map((org) => (
                  <tr key={org.id} className="border-b border-[#E9E2D7]/20 hover:bg-[#F7F4EF]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-[#6E5A4F] font-light">{org.name}</p>
                        <p className="text-xs text-[#B8A896] mt-0.5">
                          {org.city}, {org.country}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#6E5A4F] font-light">
                        {org.messagesPerDay * 7}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#6E5A4F] font-light">
                        {org.activeStaff}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={`${statusColors[org.status]} rounded-full px-3 py-1 text-xs font-light`}
                      >
                        {org.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full hover:bg-[#D8C8A8]/20 transition-all"
                        onClick={() => router.push(`/admin/organisations/${org.id}`)}
                      >
                        Open
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="font-serif text-sm italic text-[#B8A896] mb-2">
            Intelligent by Nature. Intimate by Design.
          </p>
          <p className="text-[10px] text-[#B8A896] tracking-[0.12em] uppercase">
            GDPR COMPLIANT. ISO-ALIGNED ARCHITECTURE.
          </p>
          <p className="text-[10px] text-[#B8A896] tracking-[0.12em] uppercase mt-1">
            COPYRIGHT ATTACHAI 2025
          </p>
        </div>
      </div>
    </div>
  )
}
