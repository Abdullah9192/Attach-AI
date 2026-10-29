"use client"

import { useState } from 'react'
import { Location } from '@/mock/admin-organisations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Check, MapPin, CreditCard, DollarSign } from 'lucide-react'

interface BillingPlansTabProps {
  locations: Location[]
  onUpdate: (locations: Location[]) => void
}

const SUBSCRIPTION_TIERS = [
  {
    id: 'FOUNDATION',
    name: 'Foundation / Boutique',
    price: 995,
    description: 'Ideal for small boutique hotels, wellness studios, small real estate teams, boutique retail.',
  },
  {
    id: 'SIGNATURE',
    name: 'Signature',
    price: 1800,
    description: 'Ideal for members\' clubs, boutique luxury hotels, premium retail, private clinics, multi-agent teams.',
  },
  {
    id: 'ESTATE',
    name: 'Estate',
    price: 5500,
    description: 'Ideal for large luxury hotels, iconic resorts, elite clubs, large clinics, multi-location groups.',
  },
]

const IMPLEMENTATION_TIERS = [
  {
    id: 'FOUNDATION_SETUP',
    name: 'Foundation Setup',
    defaultFee: 3500,
    scope: 'Core workflows, 1 WhatsApp line, basic AI training, simple onboarding.',
  },
  {
    id: 'SIGNATURE_SETUP',
    name: 'Signature Setup',
    defaultFee: 7500,
    scope: 'Multi-department flows, integrations, tone training, multi-language.',
  },
  {
    id: 'ESTATE_SETUP',
    name: 'Estate Setup',
    defaultFee: 15000,
    scope: 'Full operational intelligence, multi-line orchestration, deep integrations, staff onboarding. (£15,000-£25,000 range)',
  },
]

export function BillingPlansTab({ locations, onUpdate }: BillingPlansTabProps) {
  const [localLocations, setLocalLocations] = useState<Location[]>(locations)

  const updateLocation = (locationId: string, updates: Partial<Location>) => {
    const updated = localLocations.map(loc =>
      loc.id === locationId ? { ...loc, ...updates } : loc
    )
    setLocalLocations(updated)
    onUpdate(updated)
  }

  const switchPlan = (locationId: string, newTier: 'FOUNDATION' | 'SIGNATURE' | 'ESTATE') => {
    const tierPrices = {
      FOUNDATION: 995,
      SIGNATURE: 1800,
      ESTATE: 5500,
    }

    updateLocation(locationId, {
      subscriptionTier: newTier,
      subscriptionMonthlyFee: tierPrices[newTier],
    })

    const location = localLocations.find(l => l.id === locationId)
    if (location) {
      alert(`Plan updated. This location is now on the ${SUBSCRIPTION_TIERS.find(t => t.id === newTier)?.name} tier at £${tierPrices[newTier]}/month.`)
    }
  }

  const updateImplementationTier = (locationId: string, newTier: 'FOUNDATION_SETUP' | 'SIGNATURE_SETUP' | 'ESTATE_SETUP') => {
    const defaultFees = {
      FOUNDATION_SETUP: 3500,
      SIGNATURE_SETUP: 7500,
      ESTATE_SETUP: 15000,
    }

    updateLocation(locationId, {
      implementationTier: newTier,
      implementationFeeAmount: defaultFees[newTier],
    })
  }

  return (
    <div className="space-y-8">
      {localLocations.map((location) => (
        <div key={location.id} className="space-y-6">
          {/* Location Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-[#D8C8A8]/20">
              <MapPin className="h-5 w-5 text-[#6E5A4F]" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#3F2F2C]">{location.name}</h3>
              <p className="text-xs text-[#8B7355]">{location.address}, {location.city}, {location.country}</p>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-4 w-4 text-[#B8A896]" />
              <h4 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase">
                Subscription (Per Location)
              </h4>
            </div>

            <div className="mb-4 p-4 rounded-lg bg-white/60 border border-[#E9E2D7]/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#B8A896] uppercase tracking-wide">Current Plan</span>
                <Badge className="bg-[#8B9D83] text-white">
                  {SUBSCRIPTION_TIERS.find(t => t.id === location.subscriptionTier)?.name}
                </Badge>
              </div>
              <div className="text-2xl font-serif text-[#3F2F2C]">
                £{location.subscriptionMonthlyFee.toLocaleString()}<span className="text-sm text-[#8B7355]">/month</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SUBSCRIPTION_TIERS.map((tier) => {
                const isCurrentPlan = location.subscriptionTier === tier.id
                return (
                  <div
                    key={tier.id}
                    className={`rounded-2xl p-5 border-2 transition-all ${
                      isCurrentPlan
                        ? 'border-[#8B9D83] bg-[#8B9D83]/5'
                        : 'border-[#E9E2D7]/40 bg-white/40 hover:border-[#D8C8A8]/60'
                    }`}
                  >
                    <h5 className="font-serif text-base text-[#3F2F2C] mb-1">{tier.name}</h5>
                    <div className="text-2xl font-serif text-[#6E5A4F] mb-2">
                      £{tier.price}<span className="text-sm text-[#8B7355]">/mo</span>
                    </div>
                    <p className="text-xs text-[#8B7355] leading-relaxed mb-4 min-h-[60px]">
                      {tier.description}
                    </p>
                    <Button
                      onClick={() => !isCurrentPlan && switchPlan(location.id, tier.id as any)}
                      disabled={isCurrentPlan}
                      size="sm"
                      variant={isCurrentPlan ? 'secondary' : 'default'}
                      className={`w-full rounded-full text-xs uppercase tracking-wide ${
                        isCurrentPlan
                          ? 'bg-[#E9E2D7]/50 text-[#8B7355] cursor-not-allowed'
                          : 'bg-[#8B9D83] hover:bg-[#7A8C73] text-white'
                      }`}
                    >
                      {isCurrentPlan ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Current Plan
                        </>
                      ) : (
                        'Switch to this plan'
                      )}
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Implementation Section */}
          <div className="rounded-[20px] bg-[#F7F4EF]/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-4 w-4 text-[#B8A896]" />
              <h4 className="font-serif text-sm tracking-[0.08em] text-[#6E5A4F] uppercase">
                Implementation / Setup (One-Time Fee)
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-xs text-[#B8A896] mb-2 block uppercase tracking-wide">
                  Implementation Tier
                </Label>
                <Select
                  value={location.implementationTier}
                  onValueChange={(value: any) => updateImplementationTier(location.id, value)}
                >
                  <SelectTrigger className="bg-white/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {IMPLEMENTATION_TIERS.map(tier => (
                      <SelectItem key={tier.id} value={tier.id}>
                        {tier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-[#8B7355] mt-2">
                  {IMPLEMENTATION_TIERS.find(t => t.id === location.implementationTier)?.scope}
                </p>
              </div>

              <div>
                <Label className="text-xs text-[#B8A896] mb-2 block uppercase tracking-wide">
                  Implementation Fee
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7355]">£</span>
                  <Input
                    type="number"
                    value={location.implementationFeeAmount}
                    onChange={(e) => updateLocation(location.id, { implementationFeeAmount: Number(e.target.value) })}
                    className="pl-7 bg-white/60"
                  />
                </div>
                <p className="text-xs text-[#8B7355] mt-2">Editable - adjust as needed</p>
              </div>

              <div>
                <Label className="text-xs text-[#B8A896] mb-2 block uppercase tracking-wide">
                  Status
                </Label>
                <Select
                  value={location.implementationFeeStatus}
                  onValueChange={(value: any) => updateLocation(location.id, { implementationFeeStatus: value })}
                >
                  <SelectTrigger className="bg-white/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NOT_INVOICED">Not Invoiced</SelectItem>
                    <SelectItem value="INVOICED">Invoiced</SelectItem>
                    <SelectItem value="PARTIALLY_PAID">Partially Paid</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-[#B8A896] mb-2 block uppercase tracking-wide">
                  Invoice Reference
                </Label>
                <Input
                  value={location.implementationInvoiceRef || ''}
                  onChange={(e) => updateLocation(location.id, { implementationInvoiceRef: e.target.value })}
                  placeholder="INV-2024-001"
                  className="bg-white/60"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label className="text-xs text-[#B8A896] mb-2 block uppercase tracking-wide">
                Implementation Notes
              </Label>
              <Textarea
                value={location.implementationNotes || ''}
                onChange={(e) => updateLocation(location.id, { implementationNotes: e.target.value })}
                placeholder="Add notes about the implementation process..."
                className="bg-white/60"
                rows={3}
              />
            </div>
          </div>

          {/* Divider between locations */}
          {location.id !== localLocations[localLocations.length - 1].id && (
            <div className="border-t border-[#E9E2D7]/40 my-8" />
          )}
        </div>
      ))}

      {localLocations.length === 0 && (
        <div className="text-center py-12 rounded-[20px] bg-[#F7F4EF]/50">
          <MapPin className="h-12 w-12 text-[#E9E2D7] mx-auto mb-4" />
          <p className="text-sm text-[#B8A896] mb-2">No locations configured</p>
          <p className="text-xs text-[#8B7355]">
            Add locations to manage billing and subscription plans
          </p>
        </div>
      )}
    </div>
  )
}
