"use client"

import * as React from "react"

interface RequestAccountContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const RequestAccountContext = React.createContext<RequestAccountContextType | undefined>(undefined)

export function RequestAccountProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <RequestAccountContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </RequestAccountContext.Provider>
  )
}

export function useRequestAccount() {
  const context = React.useContext(RequestAccountContext)
  if (!context) {
    throw new Error("useRequestAccount must be used within RequestAccountProvider")
  }
  return context
}
