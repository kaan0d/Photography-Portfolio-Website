"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { validateClient, getClients } from "@/lib/client-store"

interface PasswordEntryProps {
  onAuthenticate: (name: string, isAdmin: boolean) => void
}

export function PasswordEntry({ onAuthenticate }: PasswordEntryProps) {
  const [password, setPassword] = useState("")
  const [clientName, setClientName] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    getClients() // This initializes default clients if none exist
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!clientName.trim() || !password) {
      setError("Please enter both name and password")
      return
    }

    if (clientName === "admin" && password === "admin123") {
      onAuthenticate("admin", true)
      return
    }

    const client = validateClient(clientName, password)
    if (client) {
      onAuthenticate(client.name, false)
    } else {
      setError("Invalid credentials. Please try again.")
      setPassword("")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <Link href="/" className="inline-flex items-center gap-2 mb-12">
          <div className="w-12 h-12 bg-foreground rounded-sm flex items-center justify-center">
            <span className="text-background font-serif text-lg font-bold">LS</span>
          </div>
          <span className="font-serif text-lg font-semibold text-foreground">Luminous Studios</span>
        </Link>

        {/* Form */}
        <div className="mb-8">
          <div className="inline-block mb-4 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full">
            <p className="text-gold text-xs font-medium tracking-widest uppercase">Private Access</p>
          </div>
          <h1 className="font-serif text-4xl font-bold mb-4 text-foreground">Client Gallery</h1>
          <p className="text-foreground/70 leading-relaxed">
            Enter your credentials to access your private gallery with exclusive previews and downloads.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Client Name
            </label>
            <input
              id="name"
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter your name or session ID"
              className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-smooth"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-smooth"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-foreground text-background font-medium hover:bg-gold transition-smooth cursor-pointer"
          >
            Access Gallery
          </button>
        </form>

        {/* Demo Hint */}
        <div className="mt-8 p-4 bg-secondary/50 border border-border rounded">
          <p className="text-xs font-medium text-foreground/60 mb-2">Demo Credentials:</p>
          <p className="text-xs text-foreground/50 font-mono">
            Name: demo
            <br />
            Password: demo123
          </p>
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center text-foreground/60 hover:text-gold transition-smooth text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>
      </div>
    </div>
  )
}
