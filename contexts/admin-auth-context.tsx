"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export type UserRole = 'user' | 'admin' | 'superadmin'

interface User {
  email: string
  name: string
  role: UserRole
}

interface AdminAuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => boolean
  hasRole: (role: UserRole | UserRole[]) => boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'grace@attachai.com': {
    password: 'superadmin123',
    user: { email: 'grace@attachai.com', name: 'Grace G', role: 'superadmin' }
  },
  'admin@attachai.com': {
    password: 'admin123',
    user: { email: 'admin@attachai.com', name: 'Admin User', role: 'admin' }
  }
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem('attachai_admin_auth')
    const userData = localStorage.getItem('attachai_admin_user')
    
    if (adminAuth === 'true' && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (e) {
        // Invalid data, clear storage
        localStorage.removeItem('attachai_admin_auth')
        localStorage.removeItem('attachai_admin_user')
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, call real API
    const mockUser = MOCK_USERS[email]
    
    if (mockUser && mockUser.password === password) {
      localStorage.setItem('attachai_admin_auth', 'true')
      localStorage.setItem('attachai_admin_user', JSON.stringify(mockUser.user))
      setUser(mockUser.user)
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('attachai_admin_auth')
    localStorage.removeItem('attachai_admin_user')
    setUser(null)
    setIsAuthenticated(false)
    router.push('/admin/login')
  }

  const checkAuth = () => {
    return isAuthenticated
  }

  const hasRole = (requiredRoles: UserRole | UserRole[]): boolean => {
    if (!user) return false
    
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]
    return roles.includes(user.role)
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, login, logout, checkAuth, hasRole }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}
