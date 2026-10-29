export interface GlobalAnalyticsData {
  totalConversations: number
  aiResolutionRate: number
  humanHandoverRate: number
  avgResponseTime: string
  avgSatisfaction: number
  errorRate: number
  periodComparison: {
    conversations: number
    aiResolution: number
    responseTime: number
    satisfaction: number
  }
}

export interface CategoryPerformance {
  category: string
  conversations: number
  aiResolutionRate: number
  avgResponseTime: string
  avgConfidence: number
  escalationRate: number
}

export interface TopOrganisation {
  id: string
  name: string
  conversations: number
  aiResolutionRate: number
  avgResponseTime: string
  category: string
}

export interface IntentAnalysis {
  intent: string
  totalOccurrences: number
  escalationRate: number
  errorRate: number
  avgConfidence: number
  topCategories: string[]
}

export interface BenchmarkData {
  orgId: string
  orgName: string
  category: string
  metrics: {
    aiResolution: { value: number; categoryAvg: number }
    responseTime: { value: string; categoryAvg: string }
    satisfaction: { value: number; categoryAvg: number }
    errorRate: { value: number; categoryAvg: number }
  }
}

export const globalAnalytics: GlobalAnalyticsData = {
  totalConversations: 17498,
  aiResolutionRate: 86.2,
  humanHandoverRate: 13.8,
  avgResponseTime: '3.8 sec',
  avgSatisfaction: 4.7,
  errorRate: 1.2,
  periodComparison: {
    conversations: 12.3,
    aiResolution: 4.2,
    responseTime: -8.5,
    satisfaction: 3.1,
  }
}

export const categoryPerformance: CategoryPerformance[] = [
  { category: 'Wellness Space', conversations: 5240, aiResolutionRate: 89.2, avgResponseTime: '3.2 sec', avgConfidence: 92, escalationRate: 8.1 },
  { category: 'Hospitality', conversations: 4120, aiResolutionRate: 84.5, avgResponseTime: '4.1 sec', avgConfidence: 88, escalationRate: 12.3 },
  { category: 'Members\' Club', conversations: 3890, aiResolutionRate: 87.8, avgResponseTime: '3.5 sec', avgConfidence: 91, escalationRate: 9.2 },
  { category: 'Luxury Concierge', conversations: 2140, aiResolutionRate: 82.1, avgResponseTime: '4.8 sec', avgConfidence: 85, escalationRate: 15.4 },
  { category: 'Dining', conversations: 1380, aiResolutionRate: 91.3, avgResponseTime: '2.9 sec', avgConfidence: 94, escalationRate: 6.2 },
  { category: 'Sanctuary/Pavilion', conversations: 728, aiResolutionRate: 85.7, avgResponseTime: '4.2 sec', avgConfidence: 87, escalationRate: 11.8 },
]

export const topOrgsByVolume: TopOrganisation[] = [
  { id: '1', name: 'ATTACHAI Club', conversations: 8420, aiResolutionRate: 85.9, avgResponseTime: '3.2 min', category: 'Wellness Space' },
  { id: '4', name: 'Aurelian Pavilion', conversations: 5670, aiResolutionRate: 86.3, avgResponseTime: '2.9 min', category: 'Members\' Club' },
  { id: '2', name: 'Meridian Sanctuary', conversations: 3210, aiResolutionRate: 88.7, avgResponseTime: '4.1 min', category: 'Hospitality' },
  { id: '6', name: 'Oasis-9 Resort', conversations: 2840, aiResolutionRate: 83.2, avgResponseTime: '4.5 min', category: 'Hospitality' },
  { id: '7', name: 'Consciousness Kitchen', conversations: 1890, aiResolutionRate: 92.1, avgResponseTime: '2.8 min', category: 'Dining' },
  { id: '8', name: 'Presence Wellness', conversations: 1620, aiResolutionRate: 89.5, avgResponseTime: '3.4 min', category: 'Wellness Space' },
  { id: '9', name: 'Neural Nexus', conversations: 1340, aiResolutionRate: 87.8, avgResponseTime: '3.6 min', category: 'Wellness Space' },
  { id: '10', name: 'Solaris Observatory', conversations: 1120, aiResolutionRate: 81.4, avgResponseTime: '5.1 min', category: 'Luxury Concierge' },
  { id: '11', name: 'Elysian Collective', conversations: 890, aiResolutionRate: 84.9, avgResponseTime: '4.3 min', category: 'Sanctuary/Pavilion' },
  { id: '12', name: 'Aurelian Dining', conversations: 720, aiResolutionRate: 90.8, avgResponseTime: '3.1 min', category: 'Dining' },
]

export const topOrgsByAI: TopOrganisation[] = [
  { id: '7', name: 'Consciousness Kitchen', conversations: 1890, aiResolutionRate: 92.1, avgResponseTime: '2.8 min', category: 'Dining' },
  { id: '12', name: 'Aurelian Dining', conversations: 720, aiResolutionRate: 90.8, avgResponseTime: '3.1 min', category: 'Dining' },
  { id: '8', name: 'Presence Wellness', conversations: 1620, aiResolutionRate: 89.5, avgResponseTime: '3.4 min', category: 'Wellness Space' },
  { id: '2', name: 'Meridian Sanctuary', conversations: 3210, aiResolutionRate: 88.7, avgResponseTime: '4.1 min', category: 'Hospitality' },
  { id: '9', name: 'Neural Nexus', conversations: 1340, aiResolutionRate: 87.8, avgResponseTime: '3.6 min', category: 'Wellness Space' },
  { id: '4', name: 'Aurelian Pavilion', conversations: 5670, aiResolutionRate: 86.3, avgResponseTime: '2.9 min', category: 'Members\' Club' },
  { id: '1', name: 'ATTACHAI Club', conversations: 8420, aiResolutionRate: 85.9, avgResponseTime: '3.2 min', category: 'Wellness Space' },
  { id: '11', name: 'Elysian Collective', conversations: 890, aiResolutionRate: 84.9, avgResponseTime: '4.3 min', category: 'Sanctuary/Pavilion' },
  { id: '6', name: 'Oasis-9 Resort', conversations: 2840, aiResolutionRate: 83.2, avgResponseTime: '4.5 min', category: 'Hospitality' },
  { id: '10', name: 'Solaris Observatory', conversations: 1120, aiResolutionRate: 81.4, avgResponseTime: '5.1 min', category: 'Luxury Concierge' },
]

export const intentAnalysis: IntentAnalysis[] = [
  { intent: 'Complex Special Request', totalOccurrences: 1240, escalationRate: 42.3, errorRate: 8.2, avgConfidence: 68, topCategories: ['Luxury Concierge', 'Hospitality'] },
  { intent: 'VIP Service Request', totalOccurrences: 890, escalationRate: 38.5, errorRate: 5.1, avgConfidence: 72, topCategories: ['Members\' Club', 'Hospitality'] },
  { intent: 'Policy Exception Request', totalOccurrences: 720, escalationRate: 35.2, errorRate: 12.4, avgConfidence: 65, topCategories: ['Hospitality', 'Sanctuary/Pavilion'] },
  { intent: 'Multi-Service Booking', totalOccurrences: 650, escalationRate: 28.7, errorRate: 15.8, avgConfidence: 71, topCategories: ['Wellness Space', 'Hospitality'] },
  { intent: 'Custom Menu Request', totalOccurrences: 540, escalationRate: 24.1, errorRate: 9.3, avgConfidence: 78, topCategories: ['Dining', 'Hospitality'] },
  { intent: 'System Integration Error', totalOccurrences: 320, escalationRate: 18.2, errorRate: 68.4, avgConfidence: 45, topCategories: ['All Categories'] },
  { intent: 'Language Translation Issue', totalOccurrences: 280, escalationRate: 15.8, errorRate: 52.1, avgConfidence: 58, topCategories: ['Hospitality', 'Luxury Concierge'] },
]

export const mockBenchmarkData: BenchmarkData[] = [
  {
    orgId: '1',
    orgName: 'ATTACHAI Club',
    category: 'Wellness Space',
    metrics: {
      aiResolution: { value: 85.9, categoryAvg: 89.2 },
      responseTime: { value: '3.2 min', categoryAvg: '3.2 sec' },
      satisfaction: { value: 4.8, categoryAvg: 4.7 },
      errorRate: { value: 0.9, categoryAvg: 1.2 },
    }
  },
  {
    orgId: '2',
    orgName: 'Meridian Sanctuary',
    category: 'Hospitality',
    metrics: {
      aiResolution: { value: 88.7, categoryAvg: 84.5 },
      responseTime: { value: '4.1 min', categoryAvg: '4.1 sec' },
      satisfaction: { value: 4.9, categoryAvg: 4.6 },
      errorRate: { value: 0.7, categoryAvg: 1.4 },
    }
  },
]
