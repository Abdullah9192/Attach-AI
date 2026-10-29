"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Building2, Mail, Send, CreditCard } from 'lucide-react'

interface AddOrganisationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (org: any) => void
}

export function AddOrganisationModal({ open, onOpenChange, onAdd }: AddOrganisationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    category: '',
    website: '',
    address: '',
    notes: '',
    plan: 'Boutique',
    monthlyFee: 995,
    sendInvite: true,
    stripeSetupFeeStructure: 'single' as 'single' | '2-instalments',
    stripeSetupPaymentLink: '',
    stripeSetupInstalment1Link: '',
    stripeSetupInstalment2Link: '',
    stripeSubscriptionLink: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newOrg = {
      id: `org-${Date.now()}`,
      name: formData.name,
      contact: {
        name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
      },
      status: 'Setup' as const,
      plan: formData.plan,
      monthlyFee: formData.monthlyFee,
      activeStaff: 0,
      messagesLast7Days: 0,
      experiences: 0,
      category: formData.category,
      website: formData.website,
      address: formData.address,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      stripeSetupFeeStructure: formData.stripeSetupFeeStructure,
      stripeSetupPaymentLink: formData.stripeSetupPaymentLink,
      stripeSetupInstalment1Link: formData.stripeSetupInstalment1Link,
      stripeSetupInstalment2Link: formData.stripeSetupInstalment2Link,
      stripeSubscriptionLink: formData.stripeSubscriptionLink,
    }

    onAdd(newOrg)
    
    // Send invite if requested
    if (formData.sendInvite) {
      console.log('[v0] Sending setup invite to:', formData.email)
      // TODO: Implement actual email sending
    }

    // Reset form
    setFormData({
      name: '',
      contactName: '',
      email: '',
      phone: '',
      category: '',
      website: '',
      address: '',
      notes: '',
      plan: 'Boutique',
      monthlyFee: 995,
      sendInvite: true,
      stripeSetupFeeStructure: 'single',
      stripeSetupPaymentLink: '',
      stripeSetupInstalment1Link: '',
      stripeSetupInstalment2Link: '',
      stripeSubscriptionLink: '',
    })
    
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-hidden backdrop-blur-3xl bg-[#F7F4EF]/95 border-[#D8C8A8]/30">
        <DialogHeader>
          <DialogTitle className="font-serif text-[18px] sm:text-[22px] tracking-[0.03em] text-[#6E5A4F] uppercase flex items-center gap-3">
            <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
            Add New Organisation
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6 overflow-y-auto max-h-[calc(90vh-120px)] px-1">
          {/* Organisation Details */}
          <div className="space-y-4">
            <h3 className="font-serif text-[12px] sm:text-[14px] tracking-[0.08em] text-[#6E5A4F] uppercase">Organisation Details</h3>
            
            <div>
              <Label htmlFor="name" className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">
                Organisation Name *
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2 backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">
                  Category *
                </Label>
                <Input
                  id="category"
                  required
                  placeholder="e.g. Luxury Hospitality"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-2 backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30"
                />
              </div>
              <div>
                <Label htmlFor="website" className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">
                  Website
                </Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="mt-2 backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">
                Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-2 backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 pt-4 border-t border-[#D8C8A8]/30">
            <h3 className="font-serif text-[12px] sm:text-[14px] tracking-[0.08em] text-[#6E5A4F] uppercase">Primary Contact</h3>
            
            <div>
              <Label htmlFor="contactName" className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">
                Contact Name *
              </Label>
              <Input
                id="contactName"
                required
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="mt-2 backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-2 backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30"
                />
              </div>
            </div>
          </div>

          {/* Subscription Plan */}
          <div className="space-y-4 pt-4 border-t border-[#D8C8A8]/30">
            <h3 className="font-serif text-[12px] sm:text-[14px] tracking-[0.08em] text-[#6E5A4F] uppercase">Subscription & Billing</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plan" className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">
                  Plan Type
                </Label>
                <Select 
                  value={formData.plan} 
                  onValueChange={(value) => {
                    let newFee = 995
                    if (value === 'Signature') newFee = 1800
                    else if (value === 'Estate') newFee = 5500
                    setFormData({ ...formData, plan: value, monthlyFee: newFee })
                  }}
                >
                  <SelectTrigger className="mt-2 backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Boutique">Boutique (Foundation)</SelectItem>
                    <SelectItem value="Signature">Signature</SelectItem>
                    <SelectItem value="Estate">Estate</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="monthlyFee" className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">
                  Monthly Fee (GBP)
                </Label>
                <Input
                  id="monthlyFee"
                  type="number"
                  value={formData.monthlyFee}
                  onChange={(e) => setFormData({ ...formData, monthlyFee: parseInt(e.target.value) })}
                  className="mt-2 backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30"
                />
              </div>
            </div>

            {/* Stripe Links Configuration */}
            <div className="space-y-4 pt-4 border-t border-[#D8C8A8]/20">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-4 w-4 text-[#8B7355]" />
                <Label className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">
                  Stripe Payment Links
                </Label>
              </div>

              <div>
                <Label htmlFor="setupFeeStructure" className="text-xs text-[#B8A896] mb-2 block">
                  Setup Fee Structure
                </Label>
                <Select 
                  value={formData.stripeSetupFeeStructure} 
                  onValueChange={(value: 'single' | '2-instalments') => 
                    setFormData({ ...formData, stripeSetupFeeStructure: value })
                  }
                >
                  <SelectTrigger className="backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single payment</SelectItem>
                    <SelectItem value="2-instalments">2 instalments</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.stripeSetupFeeStructure === 'single' ? (
                <div>
                  <Label htmlFor="setupPaymentLink" className="text-xs text-[#B8A896] mb-2 block">
                    Stripe Setup Payment Link (URL)
                  </Label>
                  <Input
                    id="setupPaymentLink"
                    type="url"
                    placeholder="https://buy.stripe.com/..."
                    value={formData.stripeSetupPaymentLink}
                    onChange={(e) => setFormData({ ...formData, stripeSetupPaymentLink: e.target.value })}
                    className="backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30 font-mono text-xs"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="setupInstalment1" className="text-xs text-[#B8A896] mb-2 block">
                      Stripe Setup – Instalment 1 Link (URL)
                    </Label>
                    <Input
                      id="setupInstalment1"
                      type="url"
                      placeholder="https://buy.stripe.com/..."
                      value={formData.stripeSetupInstalment1Link}
                      onChange={(e) => setFormData({ ...formData, stripeSetupInstalment1Link: e.target.value })}
                      className="backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="setupInstalment2" className="text-xs text-[#B8A896] mb-2 block">
                      Stripe Setup – Instalment 2 Link (URL)
                    </Label>
                    <Input
                      id="setupInstalment2"
                      type="url"
                      placeholder="https://buy.stripe.com/..."
                      value={formData.stripeSetupInstalment2Link}
                      onChange={(e) => setFormData({ ...formData, stripeSetupInstalment2Link: e.target.value })}
                      className="backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30 font-mono text-xs"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="subscriptionLink" className="text-xs text-[#B8A896] mb-2 block">
                  Stripe Subscription Link (URL)
                </Label>
                <Input
                  id="subscriptionLink"
                  type="url"
                  placeholder="https://buy.stripe.com/..."
                  value={formData.stripeSubscriptionLink}
                  onChange={(e) => setFormData({ ...formData, stripeSubscriptionLink: e.target.value })}
                  className="backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30 font-mono text-xs"
                />
              </div>

              <p className="text-xs text-[#8B7355] leading-relaxed bg-[#F7F4EF]/50 p-3 rounded-lg">
                These Stripe links are used when sending payment invitations to the client. Choose the structure that matches their agreement (single payment or two instalments).
              </p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="font-serif text-[11px] tracking-[0.08em] text-[#8B7355] uppercase">
              Internal Notes
            </Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Any additional information or special requirements..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-2 backdrop-blur-xl bg-white/60 border-[#D8C8A8]/30"
            />
          </div>

          {/* Send Invite */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#D8C8A8]/30">
            <input
              type="checkbox"
              id="sendInvite"
              checked={formData.sendInvite}
              onChange={(e) => setFormData({ ...formData, sendInvite: e.target.checked })}
              className="h-4 w-4 rounded border-[#D8C8A8]"
            />
            <Label htmlFor="sendInvite" className="font-serif text-[11px] tracking-[0.08em] text-[#6E5A4F] cursor-pointer flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Send setup invitation email to primary contact
            </Label>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="font-serif text-[11px] tracking-[0.08em] uppercase w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="backdrop-blur-xl bg-gradient-to-br from-[#D8C8A8] to-[#C9A876] hover:from-[#C9A876] hover:to-[#B08968] text-[#3F2F2C] font-serif text-[11px] tracking-[0.08em] uppercase shadow-lg shadow-[#D8C8A8]/20 w-full sm:w-auto"
            >
              <Send className="h-4 w-4 mr-2" />
              Create Organisation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
