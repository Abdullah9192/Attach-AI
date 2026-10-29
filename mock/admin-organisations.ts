export interface AdminOrganisation {
  id: string
  name: string
  vertical: 'Hotel' | 'Members\' Club' | 'Wellness' | 'Concierge' | 'Other'
  status: 'Live' | 'Onboarding' | 'Paused' | 'Trial'
  tier: 'Boutique' | 'Signature' | 'Estate'
  country: string
  city: string
  primaryContact: string
  contactEmail: string
  contactPhone: string
  lastActive: string
  messagesPerDay: number
  activeStaff: number
  whatsappNumbers: number
  integrationsConnected: number
  website: string
  timezone: string
  languages: string[]
  experienceCategory: string
  billingCycle: 'Monthly' | 'Annual'
  nextRenewal: string
  environment: 'Sandbox' | 'Production'
  createdAt: string
  subscriptionType: 'Trial' | 'Starter' | 'Professional' | 'Enterprise'
  monthlyRevenue: number
  onboardingStatus: 'Discovery' | 'Contract sent' | 'Waiting for payment' | 'API Setup' | 'Configuration & testing' | 'Live' | 'Cancelled' | 'Archived'
  accountManager: string
  whatsappApiKey?: string
  attachaiApiKey?: string
  webhookUrl?: string
  stripeConnected?: boolean
  stripeAccountId?: string
  stripePublishableKey?: string
  stripeSetupFeeStructure?: 'single' | '2-instalments'
  stripeSetupPaymentLink?: string
  stripeSetupInstalment1Link?: string
  stripeSetupInstalment2Link?: string
  stripeSubscriptionLink?: string
  integrations: {
    pms?: { name: string; connected: boolean; apiKey?: string }
    crm?: { name: string; connected: boolean; apiKey?: string }
    payments?: { name: string; connected: boolean; apiKey?: string }
    analytics?: { name: string; connected: boolean; apiKey?: string }
  }
  automations: {
    welcomeMessage: { enabled: boolean; message: string }
    autoEscalation: { enabled: boolean; thresholdMinutes: number }
    businessHours: { enabled: boolean; start: string; end: string; timezone: string }
    autoResponse: { enabled: boolean; message: string }
  }
  externalDocuments?: Array<{
    id: string
    name: string
    type: 'Google Docs' | 'Google Sheets' | 'PDF' | 'Other'
    url: string
    description?: string
    usedForAI: boolean
  }>
  locations?: Location[]
}

export interface Location {
  id: string
  name: string
  address: string
  city: string
  country: string
  subscriptionTier: 'BOUTIQUE' | 'SIGNATURE' | 'ESTATE' | 'CUSTOM'
  subscriptionMonthlyFee: number // £995, £1800, or £5500
  subscriptionCurrency: string // 'GBP'
  implementationTier: 'BOUTIQUE_SETUP' | 'SIGNATURE_SETUP' | 'ESTATE_SETUP' | 'CUSTOM_SETUP'
  implementationFeeAmount: number // £3500, £7500, or £15000-£25000
  implementationFeeCurrency: string // 'GBP'
  implementationFeeStatus: 'NOT_INVOICED' | 'INVOICED' | 'PARTIALLY_PAID' | 'PAID'
  implementationInvoiceRef?: string
  implementationNotes?: string
  whatsappNumber?: string
  activeStaff: number
  createdAt: string
}

export const mockAdminOrganisations: AdminOrganisation[] = [
  {
    id: '1',
    name: 'The Sanctuary Hotel & Spa',
    vertical: 'Hotel',
    status: 'Live',
    tier: 'Signature',
    country: 'United Kingdom',
    city: 'London',
    primaryContact: 'Sarah Mitchell',
    contactEmail: 'sarah@sanctuary-london.com',
    contactPhone: '+44 20 7123 4567',
    lastActive: '2 hours ago',
    messagesPerDay: 342,
    activeStaff: 24,
    whatsappNumbers: 3,
    integrationsConnected: 5,
    website: 'sanctuary-london.com',
    timezone: 'Europe/London',
    languages: ['English', 'French', 'Spanish'],
    experienceCategory: 'Luxury Wellness',
    billingCycle: 'Annual',
    nextRenewal: '2026-03-15',
    environment: 'Production',
    createdAt: '2024-03-15',
    subscriptionType: 'Enterprise',
    monthlyRevenue: 4500,
    onboardingStatus: 'Live',
    accountManager: 'Grace Goodwin',
    whatsappApiKey: 'wa_sk_live_abc123def456',
    attachaiApiKey: 'att_sk_live_xyz789uvw012',
    webhookUrl: 'https://sanctuary-london.com/webhooks/attachai',
    stripeConnected: true,
    stripeAccountId: 'acct_123456',
    stripePublishableKey: 'pk_live_abcdef',
    integrations: {
      pms: { name: 'Opera PMS', connected: true, apiKey: 'opera_key_123' },
      crm: { name: 'Salesforce', connected: true, apiKey: 'sf_key_456' },
      payments: { name: 'Stripe', connected: true, apiKey: 'sk_live_789' },
      analytics: { name: 'Google Analytics', connected: true, apiKey: 'ga_key_012' },
    },
    automations: {
      welcomeMessage: {
        enabled: true,
        message: 'Welcome to The Sanctuary! How may we assist you today?',
      },
      autoEscalation: { enabled: true, thresholdMinutes: 15 },
      businessHours: {
        enabled: true,
        start: '08:00',
        end: '22:00',
        timezone: 'Europe/London',
      },
      autoResponse: {
        enabled: true,
        message: 'Thank you for contacting us. A team member will respond shortly.',
      },
    },
    externalDocuments: [
      {
        id: 'doc-1',
        name: 'Brand Guidelines',
        type: 'Google Docs',
        url: 'https://docs.google.com/document/d/abc123',
        description: 'Brand voice and messaging guidelines',
        usedForAI: true,
      },
      {
        id: 'doc-2',
        name: 'Service Menu',
        type: 'Google Sheets',
        url: 'https://docs.google.com/spreadsheets/d/xyz789',
        description: 'Complete spa and wellness service catalog',
        usedForAI: true,
      },
    ],
    locations: [
      {
        id: 'loc-1',
        name: 'The Sanctuary - Shoreditch',
        address: '123 Great Eastern Street',
        city: 'London',
        country: 'United Kingdom',
        subscriptionTier: 'SIGNATURE',
        subscriptionMonthlyFee: 1800,
        subscriptionCurrency: 'GBP',
        implementationTier: 'SIGNATURE_SETUP',
        implementationFeeAmount: 7500,
        implementationFeeCurrency: 'GBP',
        implementationFeeStatus: 'PAID',
        implementationInvoiceRef: 'INV-2024-001',
        implementationNotes: 'Full setup completed March 2024',
        whatsappNumber: '+44 20 7123 4567',
        activeStaff: 12,
        createdAt: '2024-03-15',
      },
      {
        id: 'loc-2',
        name: 'The Sanctuary - Covent Garden',
        address: '45 Henrietta Street',
        city: 'London',
        country: 'United Kingdom',
        subscriptionTier: 'SIGNATURE',
        subscriptionMonthlyFee: 1800,
        subscriptionCurrency: 'GBP',
        implementationTier: 'SIGNATURE_SETUP',
        implementationFeeAmount: 7500,
        implementationFeeCurrency: 'GBP',
        implementationFeeStatus: 'PAID',
        implementationInvoiceRef: 'INV-2024-012',
        whatsappNumber: '+44 20 7234 5678',
        activeStaff: 12,
        createdAt: '2024-06-20',
      },
    ],
  },
  {
    id: '2',
    name: 'Mayfair Members Club',
    vertical: 'Members\' Club',
    status: 'Live',
    tier: 'Estate',
    country: 'United Kingdom',
    city: 'London',
    primaryContact: 'James Robertson',
    contactEmail: 'james@mayfairclub.com',
    contactPhone: '+44 20 7234 5678',
    lastActive: '1 hour ago',
    messagesPerDay: 289,
    activeStaff: 18,
    whatsappNumbers: 2,
    integrationsConnected: 7,
    website: 'mayfairclub.com',
    timezone: 'Europe/London',
    languages: ['English'],
    experienceCategory: 'Private Members',
    billingCycle: 'Annual',
    nextRenewal: '2026-01-20',
    environment: 'Production',
    createdAt: '2024-01-20',
    subscriptionType: 'Enterprise',
    monthlyRevenue: 5200,
    onboardingStatus: 'Live',
    accountManager: 'Grace Goodwin',
    whatsappApiKey: 'wa_sk_live_mayfair123',
    attachaiApiKey: 'att_sk_live_mayfair456',
    webhookUrl: 'https://mayfairclub.com/api/webhooks',
    stripeConnected: true,
    stripeAccountId: 'acct_654321',
    stripePublishableKey: 'pk_live_ghijkl',
    integrations: {
      pms: { name: 'Club Management System', connected: true, apiKey: 'cms_key_789' },
      crm: { name: 'HubSpot', connected: true, apiKey: 'hs_key_012' },
      payments: { name: 'Stripe', connected: true, apiKey: 'sk_live_345' },
      analytics: { name: 'Mixpanel', connected: true, apiKey: 'mp_key_678' },
    },
    automations: {
      welcomeMessage: {
        enabled: true,
        message: 'Good day! Welcome to Mayfair Members Club. How may we be of service?',
      },
      autoEscalation: { enabled: true, thresholdMinutes: 10 },
      businessHours: {
        enabled: true,
        start: '07:00',
        end: '23:00',
        timezone: 'Europe/London',
      },
      autoResponse: {
        enabled: false,
        message: '',
      },
    },
    externalDocuments: [
      {
        id: 'doc-3',
        name: 'Membership Benefits',
        type: 'PDF',
        url: 'https://mayfairclub.com/benefits.pdf',
        description: 'Full list of member privileges',
        usedForAI: true,
      },
    ],
    locations: [
      {
        id: 'loc-3',
        name: 'Mayfair Members Club - Mayfair',
        address: '78 Mount Street',
        city: 'London',
        country: 'United Kingdom',
        subscriptionTier: 'ESTATE',
        subscriptionMonthlyFee: 5500,
        subscriptionCurrency: 'GBP',
        implementationTier: 'ESTATE_SETUP',
        implementationFeeAmount: 18000,
        implementationFeeCurrency: 'GBP',
        implementationFeeStatus: 'PAID',
        implementationInvoiceRef: 'INV-2024-005',
        implementationNotes: 'Complex multi-department setup with staff training',
        whatsappNumber: '+44 20 7234 5678',
        activeStaff: 18,
        createdAt: '2024-01-20',
      },
    ],
  },
  {
    id: '3',
    name: 'Alpine Wellness Retreat',
    vertical: 'Wellness',
    status: 'Live',
    tier: 'Boutique',
    country: 'Switzerland',
    city: 'Verbier',
    primaryContact: 'Emma Laurent',
    contactEmail: 'emma@alpineretreat.ch',
    contactPhone: '+41 27 771 1234',
    lastActive: '30 minutes ago',
    messagesPerDay: 156,
    activeStaff: 12,
    whatsappNumbers: 2,
    integrationsConnected: 4,
    website: 'alpineretreat.ch',
    timezone: 'Europe/Zurich',
    languages: ['English', 'French', 'German'],
    experienceCategory: 'Mountain Wellness',
    billingCycle: 'Monthly',
    nextRenewal: '2025-12-01',
    environment: 'Production',
    createdAt: '2024-05-10',
    subscriptionType: 'Professional',
    monthlyRevenue: 1800,
    onboardingStatus: 'Live',
    accountManager: 'Thomas Meyer',
    whatsappApiKey: 'wa_sk_live_alpine789',
    attachaiApiKey: 'att_sk_live_alpine012',
    webhookUrl: 'https://alpineretreat.ch/webhooks',
    stripeConnected: true,
    stripeAccountId: 'acct_987654',
    stripePublishableKey: 'pk_live_mnopqr',
    integrations: {
      pms: { name: 'Mindbody', connected: true, apiKey: 'mb_key_345' },
      crm: { name: 'Zoho', connected: false },
      payments: { name: 'Stripe', connected: true, apiKey: 'sk_live_678' },
      analytics: { name: 'Google Analytics', connected: true, apiKey: 'ga_key_901' },
    },
    automations: {
      welcomeMessage: {
        enabled: true,
        message: 'Welcome to Alpine Wellness Retreat. We look forward to assisting you.',
      },
      autoEscalation: { enabled: false, thresholdMinutes: 20 },
      businessHours: {
        enabled: true,
        start: '08:00',
        end: '20:00',
        timezone: 'Europe/Zurich',
      },
      autoResponse: {
        enabled: true,
        message: 'Thank you for your message. Our wellness team will respond within 2 hours.',
      },
    },
    locations: [
      {
        id: 'loc-4',
        name: 'Alpine Wellness - Verbier',
        address: 'Route de Verbier Station 52',
        city: 'Verbier',
        country: 'Switzerland',
        subscriptionTier: 'FOUNDATION',
        subscriptionMonthlyFee: 995,
        subscriptionCurrency: 'GBP',
        implementationTier: 'FOUNDATION_SETUP',
        implementationFeeAmount: 3500,
        implementationFeeCurrency: 'GBP',
        implementationFeeStatus: 'PAID',
        implementationInvoiceRef: 'INV-2024-018',
        whatsappNumber: '+41 27 771 1234',
        activeStaff: 12,
        createdAt: '2024-05-10',
      },
    ],
  },
  {
    id: '4',
    name: 'Elite Concierge London',
    vertical: 'Concierge',
    status: 'Trial',
    tier: 'Signature',
    country: 'United Kingdom',
    city: 'London',
    primaryContact: 'Michael Chen',
    contactEmail: 'michael@eliteconcierge.co.uk',
    contactPhone: '+44 20 7345 6789',
    lastActive: '15 minutes ago',
    messagesPerDay: 98,
    activeStaff: 8,
    whatsappNumbers: 1,
    integrationsConnected: 3,
    website: 'eliteconcierge.co.uk',
    timezone: 'Europe/London',
    languages: ['English', 'Mandarin'],
    experienceCategory: 'Luxury Concierge',
    billingCycle: 'Monthly',
    nextRenewal: '2025-12-15',
    environment: 'Sandbox',
    createdAt: '2024-11-15',
    subscriptionType: 'Trial',
    monthlyRevenue: 0,
    onboardingStatus: 'Training',
    accountManager: 'Grace Goodwin',
    whatsappApiKey: 'wa_sk_test_elite123',
    attachaiApiKey: 'att_sk_test_elite456',
    webhookUrl: '',
    stripeConnected: false,
    stripeAccountId: '',
    stripePublishableKey: '',
    integrations: {
      pms: { name: 'Custom System', connected: false },
      crm: { name: 'Salesforce', connected: true, apiKey: 'sf_test_789' },
      payments: { name: 'Stripe', connected: false },
    },
    automations: {
      welcomeMessage: {
        enabled: false,
        message: '',
      },
      autoEscalation: { enabled: false, thresholdMinutes: 30 },
      businessHours: {
        enabled: false,
        start: '09:00',
        end: '18:00',
        timezone: 'Europe/London',
      },
      autoResponse: {
        enabled: false,
        message: '',
      },
    },
    locations: [
      {
        id: 'loc-5',
        name: 'Elite Concierge - Chelsea',
        address: '34 Kings Road',
        city: 'London',
        country: 'United Kingdom',
        subscriptionTier: 'SIGNATURE',
        subscriptionMonthlyFee: 1800,
        subscriptionCurrency: 'GBP',
        implementationTier: 'SIGNATURE_SETUP',
        implementationFeeAmount: 7500,
        implementationFeeCurrency: 'GBP',
        implementationFeeStatus: 'INVOICED',
        implementationInvoiceRef: 'INV-2024-025',
        implementationNotes: 'Currently in training phase',
        whatsappNumber: '+44 20 7345 6789',
        activeStaff: 8,
        createdAt: '2024-11-15',
      },
    ],
  },
  {
    id: '5',
    name: 'Coastal Haven Resort',
    vertical: 'Hotel',
    status: 'Onboarding',
    tier: 'Boutique',
    country: 'Portugal',
    city: 'Algarve',
    primaryContact: 'Sofia Silva',
    contactEmail: 'sofia@coastalhaven.pt',
    contactPhone: '+351 289 123 456',
    lastActive: '3 days ago',
    messagesPerDay: 45,
    activeStaff: 6,
    whatsappNumbers: 1,
    integrationsConnected: 2,
    website: 'coastalhaven.pt',
    timezone: 'Europe/Lisbon',
    languages: ['English', 'Portuguese'],
    experienceCategory: 'Coastal Luxury',
    billingCycle: 'Monthly',
    nextRenewal: '2026-01-01',
    environment: 'Sandbox',
    createdAt: '2024-10-01',
    subscriptionType: 'Starter',
    monthlyRevenue: 750,
    onboardingStatus: 'API Setup',
    accountManager: 'Thomas Meyer',
    whatsappApiKey: 'wa_sk_test_coastal789',
    attachaiApiKey: 'att_sk_test_coastal012',
    webhookUrl: '',
    stripeConnected: false,
    stripeAccountId: '',
    stripePublishableKey: '',
    integrations: {
      pms: { name: 'Cloudbeds', connected: true, apiKey: 'cb_key_345' },
      crm: { name: 'HubSpot', connected: false },
      payments: { name: 'Stripe', connected: false },
    },
    automations: {
      welcomeMessage: {
        enabled: false,
        message: '',
      },
      autoEscalation: { enabled: false, thresholdMinutes: 30 },
      businessHours: {
        enabled: false,
        start: '08:00',
        end: '20:00',
        timezone: 'Europe/Lisbon',
      },
      autoResponse: {
        enabled: false,
        message: '',
      },
    },
    locations: [
      {
        id: 'loc-6',
        name: 'Coastal Haven - Algarve',
        address: 'Praia da Falésia',
        city: 'Albufeira',
        country: 'Portugal',
        subscriptionTier: 'FOUNDATION',
        subscriptionMonthlyFee: 995,
        subscriptionCurrency: 'GBP',
        implementationTier: 'FOUNDATION_SETUP',
        implementationFeeAmount: 3500,
        implementationFeeCurrency: 'GBP',
        implementationFeeStatus: 'NOT_INVOICED',
        implementationNotes: 'Onboarding in progress',
        whatsappNumber: '+351 289 123 456',
        activeStaff: 6,
        createdAt: '2024-10-01',
      },
    ],
  },
]

export interface ActivityLog {
  id: string
  timestamp: string
  eventType: 'Message' | 'Automation' | 'Error' | 'Login' | 'Staff Added' | 'Integration' | 'API Call' | 'System Event' | 'Database' | 'Webhook'
  description: string
  userId?: string
  userName?: string
  metadata?: {
    endpoint?: string
    statusCode?: number
    responseTime?: number
    errorCode?: string
    ipAddress?: string
  }
}

export interface OrganisationReport {
  id: string
  type: 'Bug Report' | 'Feature Request' | 'Change Request' | 'Support Ticket'
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed'
  createdAt: string
  createdBy: string
  assignedTo?: string
  resolvedAt?: string
  tags: string[]
}

export const mockActivityLogs: Record<string, ActivityLog[]> = {
  '1': [
    {
      id: 'log-1',
      timestamp: '2024-11-17T10:30:00Z',
      eventType: 'Message',
      description: 'Guest requested spa treatment booking',
      userId: 'user-1',
      userName: 'Sarah Mitchell',
    },
    {
      id: 'log-2',
      timestamp: '2024-11-17T09:15:00Z',
      eventType: 'Automation',
      description: 'Check-in reminder sent to 12 guests',
      userId: 'system',
      userName: 'System',
    },
    {
      id: 'log-3',
      timestamp: '2024-11-17T09:10:00Z',
      eventType: 'API Call',
      description: 'WhatsApp message API endpoint called',
      userId: 'system',
      userName: 'System',
      metadata: {
        endpoint: '/api/whatsapp/send',
        statusCode: 200,
        responseTime: 245,
      },
    },
    {
      id: 'log-4',
      timestamp: '2024-11-17T08:45:00Z',
      eventType: 'Login',
      description: 'Concierge team member logged in',
      userId: 'user-2',
      userName: 'James Thompson',
      metadata: {
        ipAddress: '192.168.1.45',
      },
    },
    {
      id: 'log-5',
      timestamp: '2024-11-17T08:30:00Z',
      eventType: 'Database',
      description: 'Guest preferences table updated - 24 records',
      userId: 'system',
      userName: 'System',
      metadata: {
        endpoint: '/api/database/sync',
        responseTime: 1320,
      },
    },
    {
      id: 'log-6',
      timestamp: '2024-11-16T18:20:00Z',
      eventType: 'Integration',
      description: 'Opera PMS sync completed successfully',
      userId: 'system',
      userName: 'System',
      metadata: {
        statusCode: 200,
        responseTime: 5430,
      },
    },
    {
      id: 'log-7',
      timestamp: '2024-11-16T18:15:00Z',
      eventType: 'Webhook',
      description: 'Webhook received from payment processor',
      userId: 'system',
      userName: 'System',
      metadata: {
        endpoint: '/webhooks/stripe',
        statusCode: 200,
      },
    },
    {
      id: 'log-8',
      timestamp: '2024-11-16T14:10:00Z',
      eventType: 'Error',
      description: 'Payment processing timeout for booking #4521',
      userId: 'system',
      userName: 'System',
      metadata: {
        endpoint: '/api/payments/process',
        statusCode: 504,
        responseTime: 30000,
        errorCode: 'GATEWAY_TIMEOUT',
      },
    },
    {
      id: 'log-9',
      timestamp: '2024-11-16T12:00:00Z',
      eventType: 'System Event',
      description: 'Daily backup completed - 2.4GB archived',
      userId: 'system',
      userName: 'System',
    },
  ],
  '2': [
    {
      id: 'log-10',
      timestamp: '2024-11-17T11:00:00Z',
      eventType: 'Message',
      description: 'Member inquiry about private dining',
      userId: 'user-3',
      userName: 'James Robertson',
    },
    {
      id: 'log-11',
      timestamp: '2024-11-17T10:30:00Z',
      eventType: 'API Call',
      description: 'CRM data sync initiated',
      userId: 'system',
      userName: 'System',
      metadata: {
        endpoint: '/api/crm/sync',
        statusCode: 200,
        responseTime: 890,
      },
    },
    {
      id: 'log-12',
      timestamp: '2024-11-17T10:00:00Z',
      eventType: 'Staff Added',
      description: 'New concierge staff member added',
      userId: 'user-3',
      userName: 'James Robertson',
    },
  ],
  '3': [
    {
      id: 'log-13',
      timestamp: '2024-11-17T11:30:00Z',
      eventType: 'Message',
      description: 'Wellness consultation scheduled',
      userId: 'user-4',
      userName: 'Emma Laurent',
    },
    {
      id: 'log-14',
      timestamp: '2024-11-17T10:45:00Z',
      eventType: 'API Call',
      description: 'Booking availability check',
      userId: 'system',
      userName: 'System',
      metadata: {
        endpoint: '/api/bookings/availability',
        statusCode: 200,
        responseTime: 156,
      },
    },
  ],
  '4': [
    {
      id: 'log-15',
      timestamp: '2024-11-17T11:45:00Z',
      eventType: 'Login',
      description: 'Admin logged in for setup',
      userId: 'user-5',
      userName: 'Michael Chen',
      metadata: {
        ipAddress: '10.0.0.23',
      },
    },
  ],
  '5': [
    {
      id: 'log-16',
      timestamp: '2024-11-14T16:00:00Z',
      eventType: 'Integration',
      description: 'WhatsApp Business API connected',
      userId: 'user-6',
      userName: 'Sofia Silva',
    },
  ],
}

export const mockOrganisationReports: Record<string, OrganisationReport[]> = {
  '1': [
    {
      id: 'report-1',
      type: 'Bug Report',
      title: 'Message delivery delays during peak hours',
      description: 'WhatsApp messages taking 5-10 seconds longer to deliver between 6-8pm',
      priority: 'High',
      status: 'In Progress',
      createdAt: '2024-11-15T14:30:00Z',
      createdBy: 'Sarah Mitchell',
      assignedTo: 'Technical Team',
      tags: ['whatsapp', 'performance', 'messaging'],
    },
    {
      id: 'report-2',
      type: 'Feature Request',
      title: 'Add guest preference auto-tagging',
      description: 'Automatically tag guests based on their booking history and preferences',
      priority: 'Medium',
      status: 'Open',
      createdAt: '2024-11-12T10:00:00Z',
      createdBy: 'Sarah Mitchell',
      tags: ['ai', 'automation', 'crm'],
    },
    {
      id: 'report-3',
      type: 'Change Request',
      title: 'Update welcome message template',
      description: 'Add seasonal greetings to the automated welcome message',
      priority: 'Low',
      status: 'Resolved',
      createdAt: '2024-11-08T09:15:00Z',
      createdBy: 'James Thompson',
      resolvedAt: '2024-11-10T16:30:00Z',
      tags: ['messaging', 'content'],
    },
  ],
  '2': [
    {
      id: 'report-4',
      type: 'Bug Report',
      title: 'Calendar integration not syncing events',
      description: 'Member events not appearing in staff calendar view',
      priority: 'Critical',
      status: 'Open',
      createdAt: '2024-11-16T11:20:00Z',
      createdBy: 'James Robertson',
      assignedTo: 'Technical Team',
      tags: ['calendar', 'integration', 'critical'],
    },
  ],
  '3': [],
  '4': [],
  '5': [],
}

export function calculateTotalMRR(organisation: AdminOrganisation): number {
  if (!organisation.locations) return 0
  return organisation.locations.reduce((total, loc) => total + loc.subscriptionMonthlyFee, 0)
}

export function getPrimaryPlan(organisation: AdminOrganisation): string {
  if (!organisation.locations || organisation.locations.length === 0) return 'None'
  if (organisation.locations.length === 1) return organisation.locations[0].subscriptionTier
  
  const tierCounts: Record<string, number> = {}
  organisation.locations.forEach(loc => {
    tierCounts[loc.subscriptionTier] = (tierCounts[loc.subscriptionTier] || 0) + 1
  })
  
  // Check if mixed
  const uniqueTiers = Object.keys(tierCounts)
  if (uniqueTiers.length > 1) return 'Mixed'
  
  return uniqueTiers[0]
}

export function generateBillingSummary(organisation: AdminOrganisation): string {
  if (!organisation.locations || organisation.locations.length === 0) {
    return 'No locations configured'
  }
  
  const totalMRR = calculateTotalMRR(organisation)
  const locationCount = organisation.locations.length
  
  return `Your ATTACHAI account includes ${locationCount} location${locationCount > 1 ? 's' : ''}. Current monthly subscription total is £${totalMRR.toLocaleString()}/month, with implementation fees applied per location based on the selected tier.`
}

export function generateLocationBillingSummary(location: Location): string {
  const tierNames = {
    FOUNDATION: 'Foundation / Boutique',
    SIGNATURE: 'Signature',
    ESTATE: 'Estate',
    CUSTOM: 'Custom',
  }
  
  const setupLabels = {
    FOUNDATION_SETUP: 'Foundation Setup',
    SIGNATURE_SETUP: 'Signature Setup',
    ESTATE_SETUP: 'Estate Setup',
    CUSTOM_SETUP: 'Custom Setup',
  }
  
  return `This location is on the ${tierNames[location.subscriptionTier]} tier at £${location.subscriptionMonthlyFee.toLocaleString()}/month, with a one-time ${setupLabels[location.implementationTier]} implementation fee of £${location.implementationFeeAmount.toLocaleString()} applied per location.`
}
