export const financialMetrics = {
  arr: 1248000,
  mrr: 104000,
  newMrrThisMonth: 12000,
  churnedMrrThisMonth: 2400,
  mrrGrowthRate: 0.12,
  avgRevenuePerOrg: 20800
}

export const mrrHistory = [
  { month: 'Jun', mrr: 92000 },
  { month: 'Jul', mrr: 96000 },
  { month: 'Aug', mrr: 98000 },
  { month: 'Sep', mrr: 100000 },
  { month: 'Oct', mrr: 102000 },
  { month: 'Nov', mrr: 104000 },
]

export const planMix = {
  boutique: { count: 12, revenue: 24000 },
  signature: { count: 28, revenue: 56000 },
  estate: { count: 8, revenue: 24000 }
}

export const organisationRevenue = [
  {
    id: '1',
    name: 'The Sanctuary Spa',
    plan: 'Estate',
    mrr: 3000,
    implementationFees: 12000,
    region: 'Americas',
    startDate: '2024-03-15'
  },
  {
    id: '2',
    name: 'Villa Rosa',
    plan: 'Signature',
    mrr: 2000,
    implementationFees: 8000,
    region: 'EMEA',
    startDate: '2024-05-20'
  },
  {
    id: '3',
    name: 'Maison Belle',
    plan: 'Estate',
    mrr: 3000,
    implementationFees: 12000,
    region: 'EMEA',
    startDate: '2024-02-10'
  },
  {
    id: '4',
    name: 'The Grand Hotel',
    plan: 'Signature',
    mrr: 2000,
    implementationFees: 8000,
    region: 'Asia-Pacific',
    startDate: '2024-06-01'
  },
  {
    id: '5',
    name: 'Château Lumière',
    plan: 'Boutique',
    mrr: 1500,
    implementationFees: 5000,
    region: 'EMEA',
    startDate: '2024-07-15'
  }
]

export const pipelineOpportunities = [
  {
    id: '1',
    name: 'Serenity Resort & Spa',
    stage: 'Proposal',
    estimatedMrr: 2500,
    estimatedSetupFee: 10000,
    probability: 0.7,
    expectedCloseDate: '2025-01-15',
    owner: 'Grace G'
  },
  {
    id: '2',
    name: 'Alpine Chalet Retreat',
    stage: 'Pilot',
    estimatedMrr: 3000,
    estimatedSetupFee: 12000,
    probability: 0.85,
    expectedCloseDate: '2024-12-20',
    owner: 'Grace G'
  },
  {
    id: '3',
    name: 'Coastal Manor',
    stage: 'Contract',
    estimatedMrr: 2000,
    estimatedSetupFee: 8000,
    probability: 0.95,
    expectedCloseDate: '2024-12-10',
    owner: 'Grace G'
  },
  {
    id: '4',
    name: 'Urban Boutique Hotel',
    stage: 'Intro',
    estimatedMrr: 1500,
    estimatedSetupFee: 5000,
    probability: 0.3,
    expectedCloseDate: '2025-02-28',
    owner: 'Grace G'
  }
]

export const platformHealth = {
  uptime: 99.97,
  errorRate: 0.02,
  activeIncidents: 0,
  nps: 72
}

export const riskFlags = [
  {
    orgId: '4',
    orgName: 'The Grand Hotel',
    reason: 'Low usage (< 50 messages/month)',
    severity: 'medium'
  },
  {
    orgId: '5',
    orgName: 'Château Lumière',
    reason: 'Late invoice payment',
    severity: 'high'
  }
]
