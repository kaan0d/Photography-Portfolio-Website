"use client"

import { useState } from "react"
import { PasswordEntry } from "./password-entry"
import { PrivateGallery } from "./private-gallery"
import { AdminPanel } from "./admin-panel"

export function ClientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [clientName, setClientName] = useState("")

  const handleAuthenticate = (name: string, admin: boolean) => {
    setClientName(name)
    setIsAdmin(admin)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsAdmin(false)
    setClientName("")
  }

  if (!isAuthenticated) {
    return <PasswordEntry onAuthenticate={handleAuthenticate} />
  }

  if (isAdmin) {
    return <AdminPanel onLogout={handleLogout} />
  }

  return <PrivateGallery clientName={clientName} onLogout={handleLogout} />
}
