export interface TeamMember {
  id: number
  initials: string
  name: string
  email: string
  phone: string
  role: string
  roleDescription: string
  status: 'active' | 'away' | 'inactive'
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    initials: "GG",
    name: "Grace Gordon",
    email: "grace@attachai.com",
    phone: "+1 (424) 555-0123",
    role: "Admin",
    roleDescription: "Property manager handling all escalations and VIP guest issues. Final decision maker for complex situations.",
    status: "active",
  },
  {
    id: 2,
    initials: "MC",
    name: "Mike Chen",
    email: "mike@attachai.com",
    phone: "+1 (424) 555-0456",
    role: "Manager",
    roleDescription: "Operations manager specializing in spa bookings, dining reservations, and high-value service requests.",
    status: "active",
  },
  {
    id: 3,
    initials: "SJ",
    name: "Sarah Johnson",
    email: "sarah@attachai.com",
    phone: "+1 (424) 555-0789",
    role: "Concierge",
    roleDescription: "Guest relations expert handling transportation, activities, and general concierge services.",
    status: "away",
  },
]

// Helper function to add a new team member
export const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
  const newId = Math.max(...teamMembers.map(m => m.id), 0) + 1
  const newMember = { id: newId, ...member }
  teamMembers.push(newMember)
  console.log("[v0] Team member added to shared data:", newMember)
  return newMember
}

// Helper function to get team member names for dropdowns
export const getTeamMemberNames = () => {
  return [...teamMembers.map(m => m.name), 'Unassigned']
}
