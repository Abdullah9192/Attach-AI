// All values are in GBP (£) and can be updated from the admin panel

export interface PricingTier {
  id: 'boutique' | 'signature' | 'estate'
  name: string
  monthlyPrice: number
  setupFee: number
  setupFeeDisplay?: string // For "from £15,000" type displays
  description: string
}

export interface PricingConfig {
  tiers: PricingTier[]
  currency: string
  currencySymbol: string
}

// Default ATTACHAI pricing - editable from admin panel
export const defaultPricing: PricingConfig = {
  tiers: [
    {
      id: 'boutique',
      name: 'BOUTIQUE / FOUNDATION',
      monthlyPrice: 995,
      setupFee: 3500,
      description: 'For boutique hotels, studios, and small premium teams.'
    },
    {
      id: 'signature',
      name: 'SIGNATURE',
      monthlyPrice: 1800,
      setupFee: 7500,
      description: 'For members\' clubs, boutique luxury hotels, and multi-agent teams.'
    },
    {
      id: 'estate',
      name: 'ESTATE',
      monthlyPrice: 5500,
      setupFee: 15000,
      setupFeeDisplay: 'from £15,000',
      description: 'For flagship properties, estates, and complex multi-department operations.'
    }
  ],
  currency: 'GBP',
  currencySymbol: '£'
}

// Singleton instance for runtime pricing (can be updated from admin)
let currentPricing: PricingConfig = { ...defaultPricing }

export function getPricing(): PricingConfig {
  return currentPricing
}

export function updatePricing(newPricing: Partial<PricingConfig>): void {
  currentPricing = { ...currentPricing, ...newPricing }
  console.log('[v0] Pricing updated:', currentPricing)
}

export function resetPricing(): void {
  currentPricing = { ...defaultPricing }
  console.log('[v0] Pricing reset to defaults')
}

export function formatPrice(amount: number, symbol: string = '£'): string {
  return `${symbol}${amount.toLocaleString()}`
}
