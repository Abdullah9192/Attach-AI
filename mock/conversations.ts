// Mock conversation data for exports
export const mockConversations = [
  {
    id: "conv-1",
    guestName: "Sarah Chen",
    guestPhone: "+1 (424) 555-0104",
    room: "Silence Atelier Suite 412",
    handler: "AI",
    confidence: 0.95,
    timestamp: "2025-01-16T10:24:00Z",
    messages: [
      { from: "guest", content: "Hi, I'd like to book a float therapy session", time: "10:24 AM" },
      { from: "ai", content: "I'd be happy to help you book a float therapy session at our Float Suite. What time works best for you?", time: "10:24 AM" },
      { from: "guest", content: "3pm today if possible", time: "10:25 AM" },
      { from: "ai", content: "Perfect! I've booked your float therapy session for 3:00 PM today at the Float Suite. Your confirmation number is FLOAT-2847.", time: "10:25 AM" },
    ],
    tags: ["VIP", "Float Therapy"],
    status: "completed"
  },
  {
    id: "conv-2",
    guestName: "Michael Torres",
    guestPhone: "+1 (310) 555-0892",
    room: "Workroom 315",
    handler: "Hybrid",
    confidence: 0.88,
    timestamp: "2025-01-16T09:45:00Z",
    messages: [
      { from: "guest", content: "Can I book the infrared sauna for tomorrow?", time: "9:45 AM" },
      { from: "ai", content: "Of course! What time would you prefer?", time: "9:45 AM" },
      { from: "guest", content: "2 PM", time: "9:46 AM" },
      { from: "human", content: "Perfect! I've confirmed your infrared sauna session for tomorrow at 2 PM. Looking forward to it!", time: "9:47 AM" },
    ],
    tags: ["High Priority", "Infrared Sauna"],
    status: "completed"
  },
  {
    id: "conv-3",
    guestName: "Emma Wilson",
    guestPhone: "+1 (213) 555-4521",
    room: "528",
    handler: "Human",
    confidence: 0.72,
    timestamp: "2025-01-16T08:30:00Z",
    messages: [
      { from: "guest", content: "I need a regenerative meal reservation", time: "8:30 AM" },
      { from: "ai", content: "I'd be happy to help with your dining reservation. Which location interests you?", time: "8:30 AM" },
      { from: "guest", content: "Nutritive Parlour, 7pm tonight", time: "8:31 AM" },
      { from: "human", content: "Reserved! You're all set for the Nutritive Parlour at 7 PM. We'll prepare a special regenerative menu for you.", time: "8:32 AM" },
    ],
    tags: ["Escalated", "Dining"],
    status: "completed"
  },
]

export const mockActions = [
  {
    id: "action-1",
    guestName: "James Patterson",
    guestPhone: "+1 (818) 555-7290",
    room: "201",
    actionType: "Neural Programming Adjustment",
    description: "Neural programming session needs time adjustment",
    handler: "Human",
    confidence: 0.65,
    timestamp: "2025-01-16T11:12:00Z",
    status: "In Progress",
    tags: ["Urgent"],
    resolution: "Rescheduled to Tuesday 3 PM"
  },
  {
    id: "action-2",
    guestName: "Julia Davis",
    guestPhone: "+1 (424) 555-9876",
    room: "Workroom 202",
    actionType: "Anniversary Setup",
    description: "Special anniversary stay arrangement",
    handler: "AI",
    confidence: 0.94,
    timestamp: "2025-01-16T10:00:00Z",
    status: "Completed",
    tags: ["VIP", "High Touch"],
    resolution: "Flowers, champagne, and special welcome note arranged"
  },
]

// Mock conversation data with detailed message threads
export const mockConversationThreads = {
  "conv-1": {
    // Sarah Chen - Float Therapy booking
    guest: "Sarah Chen",
    initials: "SC",
    phone: "+1 (424) 555-0104",
    room: "Silence Atelier Suite 412",
    vip: true,
    preferences: {
      wellness: ["Prefers early float sessions", "Infrared sauna regular"],
      dining: ["Regenerative meals preferred", "Plant-based nutrition focus"],
      space: ["Silence Atelier preferred", "Neural programming Tuesdays"],
    },
    visitHistory: [
      { type: "Float Suite", date: "Today", details: "90-minute float therapy session" },
      { type: "Nutritive Parlour", date: "Yesterday", details: "Regenerative tasting menu" },
    ],
    messages: [
      {
        id: 1,
        type: "client",
        content: "Hi, I'd like to book a float therapy session",
        time: "10:24 AM",
      },
      {
        id: 2,
        type: "ai",
        content: "I'd be happy to help you book a float therapy session at our Float Suite. What time works best for you?",
        time: "10:24 AM",
        confidence: 0.94,
      },
      {
        id: 3,
        type: "client",
        content: "3pm today if possible",
        time: "10:25 AM",
      },
      {
        id: 4,
        type: "system-action",
        action: {
          type: "Float Therapy Booking",
          status: "completed",
          details: "Float Therapy - 90 min\nLocation: Float Suite\nTime: 3:00 PM\nConfirmation: FLOAT-2847",
        },
        time: "10:25 AM",
      },
      {
        id: 5,
        type: "ai",
        content: "Perfect! I've booked your float therapy session for 3:00 PM today at the Float Suite. Your confirmation number is FLOAT-2847. We'll prepare everything for your arrival.",
        time: "10:25 AM",
        confidence: 0.96,
      },
      {
        id: 6,
        type: "client",
        content: "Thank you! The float therapy was incredible.",
        time: "2m ago",
      },
    ],
  },
  "action-1": {
    // Michael Torres - Infrared sauna
    guest: "Michael Torres",
    initials: "MT",
    phone: "+1 (310) 555-0892",
    room: "Workroom 315",
    vip: false,
    preferences: {
      wellness: ["Infrared sauna preferred", "Morning sessions"],
      dining: ["Light meals", "Prefers smoothies"],
      space: ["Workroom access", "Quiet environment"],
    },
    visitHistory: [
      { type: "Infrared Sauna", date: "Tomorrow 2 PM", details: "45-minute infrared session scheduled" },
      { type: "Workroom", date: "Today", details: "Full day workspace access" },
    ],
    messages: [
      {
        id: 1,
        type: "client",
        content: "Can I book the infrared sauna for tomorrow?",
        time: "9:45 AM",
      },
      {
        id: 2,
        type: "ai",
        content: "Of course! The Infrared Sauna is available. What time would you prefer for your session?",
        time: "9:45 AM",
        confidence: 0.91,
      },
      {
        id: 3,
        type: "client",
        content: "2 PM works perfectly",
        time: "9:46 AM",
      },
      {
        id: 4,
        type: "system-action",
        action: {
          type: "Infrared Sauna Booking",
          status: "completed",
          details: "Infrared Sauna - 45 min\nLocation: Regeneration Floor\nTime: 2:00 PM Tomorrow\nConfirmation: INFRA-5821",
        },
        time: "9:47 AM",
      },
      {
        id: 5,
        type: "ai",
        content: "All set! Your infrared sauna session is confirmed for tomorrow at 2:00 PM on the Regeneration Floor. Confirmation number: INFRA-5821.",
        time: "9:47 AM",
        confidence: 0.88,
      },
    ],
  },
  "conv-2": {
    // Emma Wilson - Regenerative meal
    guest: "Emma Wilson",
    initials: "EW",
    phone: "+1 (213) 555-4521",
    room: "528",
    vip: false,
    preferences: {
      wellness: ["Wellness consultations"],
      dining: ["Regenerative cuisine focus", "Vegetarian preferences", "Wine pairings"],
      space: ["Quiet dining experiences"],
    },
    visitHistory: [
      { type: "Nutritive Parlour", date: "Tonight 7 PM", details: "Regenerative tasting menu reservation" },
      { type: "Float Suite", date: "2 days ago", details: "60-minute float session" },
    ],
    messages: [
      {
        id: 1,
        type: "client",
        content: "I need a reservation at the Nutritive Parlour",
        time: "8:30 AM",
      },
      {
        id: 2,
        type: "ai",
        content: "I'd be delighted to help with your dining reservation. What time would you like to dine?",
        time: "8:30 AM",
        confidence: 0.78,
      },
      {
        id: 3,
        type: "client",
        content: "7pm tonight. Can I request the regenerative tasting menu?",
        time: "8:31 AM",
      },
      {
        id: 4,
        type: "ai",
        content: "I'm noting your preference for the regenerative tasting menu. Let me confirm this reservation with our culinary team.",
        time: "8:32 AM",
        confidence: 0.72,
      },
      {
        id: 5,
        type: "system-action",
        action: {
          type: "Dining Reservation - Escalated",
          status: "completed",
          details: "Nutritive Parlour - Table for 1\nTime: 7:00 PM Tonight\nMenu: Regenerative Tasting\nConfirmation: NUTR-4192\nNote: Human review requested",
        },
        time: "8:33 AM",
      },
      {
        id: 6,
        type: "human",
        content: "Emma, you're all confirmed for 7 PM at the Nutritive Parlour! We've prepared a special regenerative tasting menu curated by Chef Maria. Looking forward to welcoming you.",
        time: "8:34 AM",
      },
    ],
  },
  "action-2": {
    // James Patterson - Neural programming
    guest: "James Patterson",
    initials: "JP",
    phone: "+1 (818) 555-7290",
    room: "201",
    vip: false,
    preferences: {
      wellness: ["Neural programming regular", "Tuesday sessions preferred", "Focus enhancement protocols"],
      dining: ["Light snacks", "Herbal teas"],
      space: ["Neural Programming Studio", "Private sessions"],
    },
    visitHistory: [
      { type: "Neural Programming", date: "Tuesday Rescheduled", details: "Session moved to 3 PM due to schedule conflict" },
      { type: "Silence Atelier", date: "Last week", details: "Extended meditation session" },
    ],
    messages: [
      {
        id: 1,
        type: "client",
        content: "I need to adjust my neural programming session time",
        time: "11:10 AM",
      },
      {
        id: 2,
        type: "ai",
        content: "I can help you reschedule. What time would work better for you?",
        time: "11:10 AM",
        confidence: 0.69,
      },
      {
        id: 3,
        type: "client",
        content: "Can we move it from 10 AM to 3 PM? Same day, just later",
        time: "11:12 AM",
      },
      {
        id: 4,
        type: "ai",
        content: "Let me check availability at the Neural Programming Studio for 3 PM on Tuesday. One moment...",
        time: "11:12 AM",
        confidence: 0.65,
      },
      {
        id: 5,
        type: "system-action",
        action: {
          type: "Neural Programming - Urgent",
          status: "in-progress",
          details: "Reschedule Request\nOriginal: Tuesday 10:00 AM\nRequested: Tuesday 3:00 PM\nStatus: Human review required\nNote: Studio availability needs confirmation",
        },
        time: "11:13 AM",
      },
      {
        id: 6,
        type: "human",
        content: "James, we've confirmed your Neural Programming session has been moved to Tuesday at 3 PM. Dr. Chen will be ready for you then.",
        time: "11:15 AM",
      },
    ],
  },
}
