"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Building2, Search, Plus, Mail, Settings, ExternalLink, MoreVertical } from 'lucide-react'
import { mockAdminOrganisations, type AdminOrganisation } from '@/mock/admin-organisations'
import { AddOrganisationModal } from './add-organisation-modal'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { calculateTotalMRR, getPrimaryPlan } from '@/mock/admin-organisations'

export function AdminOrganisationsPage() {
  const router = useRouter()
  const [organisations, setOrganisations] = useState<AdminOrganisation[]>(mockAdminOrganisations)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredOrgs = organisations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.vertical.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || org.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddOrganisation = (newOrg: AdminOrganisation) => {
    setOrganisations([newOrg, ...organisations])
  }

  const handleSendInvite = (org: AdminOrganisation) => {
    console.log('[v0] Sending invite to:', org.contactEmail)
    alert(`Setup invitation sent to ${org.contactEmail}`)
  }

  const handleAccessControlPanel = (org: AdminOrganisation) => {
    console.log('[v0] Accessing control panel for:', org.name)
    window.open(`/dashboard?org=${org.id}`, '_blank')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-gradient-to-r from-[#8B9D83] to-[#7A8C73] text-white'
      case 'Trial':
        return 'bg-gradient-to-r from-[#D8C8A8] to-[#C9A876] text-[#3F2F2C]'
      case 'Onboarding':
        return 'bg-gradient-to-r from-[#B8A896] to-[#A08968] text-white'
      case 'Paused':
        return 'bg-gradient-to-r from-[#8B7355] to-[#6E5A4F] text-white'
      default:
        return 'bg-gradient-to-r from-[#DCC5BA] to-[#C9ADA1] text-[#6E5A4F]'
    }
  }

  return (
    <div className="p-6 md:p-8 lg:p-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-serif text-[22px] md:text-[24px] lg:text-[28px] font-normal tracking-[0.03em] text-[#6E5A4F] uppercase">
          Organisations
        </h1>
        <p className="text-[13px] text-[#8B7355] leading-relaxed">
          Manage all client organisations, subscriptions, and access controls.
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B7355]" />
            <Input
              placeholder="Search organisations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Live">Live</SelectItem>
              <SelectItem value="Trial">Trial</SelectItem>
              <SelectItem value="Onboarding">Onboarding</SelectItem>
              <SelectItem value="Paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Organisation Button */}
        <Button
          onClick={() => setShowAddModal(true)}
          className="backdrop-blur-xl bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] hover:from-[#C9A876] hover:to-[#B08968] text-[#3F2F2C] font-serif text-[11px] tracking-[0.08em] uppercase shadow-lg shadow-[#D8C8A8]/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Organisation
        </Button>
      </div>

      {/* Organisations Grid */}
      <div className="grid gap-4">
        {filteredOrgs.map((org) => (
          <div
            key={org.id}
            className="backdrop-blur-3xl bg-white/40 border-4 border-[#E9E2D7]/40 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Organisation Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#D8C8A8]/30 to-[#C9A876]/20">
                    <Building2 className="h-6 w-6 text-[#6E5A4F]" />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <h3 className="font-serif text-[18px] tracking-[0.02em] text-[#3F2F2C]">
                      {org.name}
                    </h3>
                    <p className="text-[11px] text-[#8B7355] uppercase tracking-[0.08em]">
                      {org.vertical}
                    </p>
                  </div>

                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-serif tracking-[0.08em] uppercase ${getStatusColor(org.status)}`}>
                    {org.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4 pl-[68px]">
                  <div>
                    <p className="text-[10px] text-[#8B7355] uppercase tracking-[0.08em]">Locations</p>
                    <p className="text-[16px] font-serif text-[#3F2F2C] mt-1">{org.locations?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#8B7355] uppercase tracking-[0.08em]">Primary Plan</p>
                    <p className="text-[16px] font-serif text-[#3F2F2C] mt-1">{getPrimaryPlan(org)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#8B7355] uppercase tracking-[0.08em]">Total MRR</p>
                    <p className="text-[16px] font-serif text-[#3F2F2C] mt-1">£{calculateTotalMRR(org).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#8B7355] uppercase tracking-[0.08em]">Active Staff</p>
                    <p className="text-[16px] font-serif text-[#3F2F2C] mt-1">{org.activeStaff}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#8B7355] uppercase tracking-[0.08em]">WhatsApp #s</p>
                    <p className="text-[16px] font-serif text-[#3F2F2C] mt-1">{org.whatsappNumbers}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#8B7355] uppercase tracking-[0.08em]">Msgs/Day</p>
                    <p className="text-[16px] font-serif text-[#3F2F2C] mt-1">{org.messagesPerDay}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#8B7355] uppercase tracking-[0.08em]">Tier</p>
                    <p className="text-[16px] font-serif text-[#3F2F2C] mt-1">{org.tier}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 pl-[68px] text-[11px] text-[#8B7355]">
                  <span>{org.primaryContact}</span>
                  <span>{org.contactEmail}</span>
                  <span>{org.contactPhone}</span>
                </div>
              </div>

              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 backdrop-blur-3xl bg-white/95 border-[#D8C8A8]/30">
                  <DropdownMenuItem
                    onClick={() => router.push(`/admin/organisations/${org.id}`)}
                    className="font-serif text-[11px] tracking-[0.08em] uppercase cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAccessControlPanel(org)}
                    className="font-serif text-[11px] tracking-[0.08em] uppercase cursor-pointer"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Access Control Panel
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSendInvite(org)}
                    className="font-serif text-[11px] tracking-[0.08em] uppercase cursor-pointer"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Setup Invite
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrgs.length === 0 && (
        <div className="text-center py-12 backdrop-blur-3xl bg-white/40 border-4 border-[#E9E2D7]/40 rounded-3xl">
          <Building2 className="h-12 w-12 text-[#B8A896] mx-auto mb-4" />
          <p className="font-serif text-[14px] text-[#6E5A4F] uppercase tracking-[0.08em]">
            No organisations found
          </p>
          <p className="text-[12px] text-[#8B7355] mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Modals */}
      <AddOrganisationModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAdd={handleAddOrganisation}
      />
    </div>
  )
}
