"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  type ClientUser,
  getClients,
  addClient,
  deleteClient,
  addImageToClient,
  removeImageFromClient,
} from "@/lib/client-store"

interface AdminPanelProps {
  onLogout: () => void
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [clients, setClients] = useState<ClientUser[]>([])
  const [selectedClient, setSelectedClient] = useState<ClientUser | null>(null)
  const [newClientName, setNewClientName] = useState("")
  const [newImageUrl, setNewImageUrl] = useState("")
  const [showAddClient, setShowAddClient] = useState(false)
  const [showAddImage, setShowAddImage] = useState(false)
  const [createdPassword, setCreatedPassword] = useState<string | null>(null)
  const [createdClientName, setCreatedClientName] = useState<string | null>(null)

  useEffect(() => {
    setClients(getClients())
  }, [])

  const refreshClients = () => {
    setClients(getClients())
  }

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newClientName.trim()) return

    const { client, password } = addClient(newClientName.trim())
    setCreatedPassword(password)
    setCreatedClientName(client.name)
    setNewClientName("")
    setShowAddClient(false)
    refreshClients()
  }

  const handleDeleteClient = (id: string) => {
    if (confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      deleteClient(id)
      if (selectedClient?.id === id) {
        setSelectedClient(null)
      }
      refreshClients()
    }
  }

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClient || !newImageUrl.trim()) return

    addImageToClient(selectedClient.id, newImageUrl.trim())
    setNewImageUrl("")
    setShowAddImage(false)
    refreshClients()
    // Update selected client
    const updated = getClients().find((c) => c.id === selectedClient.id)
    if (updated) setSelectedClient(updated)
  }

  const handleRemoveImage = (imageUrl: string) => {
    if (!selectedClient) return
    if (confirm("Bu resmi silmek istediğinizden emin misiniz?")) {
      removeImageFromClient(selectedClient.id, imageUrl)
      refreshClients()
      // Update selected client
      const updated = getClients().find((c) => c.id === selectedClient.id)
      if (updated) setSelectedClient(updated)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              onClick={() => window.scrollTo(0, 0)}
              className="flex items-center gap-2 text-foreground hover:text-gold transition-smooth"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium text-sm">Back to Portfolio</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-gold/20 border border-gold/40 rounded-full">
                <span className="text-gold text-xs font-medium">Admin</span>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium border border-border text-foreground hover:bg-secondary transition-smooth rounded-full"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title */}
        <div className="mb-12">
          <div className="inline-block mb-4 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full">
            <p className="text-gold text-xs font-medium tracking-widest uppercase">Admin Panel</p>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Client Management</h1>
        </div>

        {/* Password Created Alert */}
        {createdPassword && createdClientName && (
          <div className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-green-400 font-semibold mb-2">New Client Created!</h3>
                <p className="text-foreground/80 mb-3">Share these credentials with the client:</p>
                <div className="bg-background/50 p-4 rounded border border-border">
                  <p className="text-sm mb-1">
                    <span className="text-foreground/60">Username:</span>{" "}
                    <span className="font-mono font-semibold text-foreground">{createdClientName}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-foreground/60">Password:</span>{" "}
                    <span className="font-mono font-semibold text-gold">{createdPassword}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCreatedPassword(null)
                  setCreatedClientName(null)
                }}
                className="text-foreground/60 hover:text-foreground"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Client List */}
          <div className="lg:col-span-1">
            <div className="bg-secondary/30 border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-semibold text-foreground">Clients</h2>
                <button
                  onClick={() => setShowAddClient(true)}
                  className="p-2 bg-gold text-foreground rounded-full hover:bg-gold/90 transition-smooth"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Add Client Form */}
              {showAddClient && (
                <form onSubmit={handleAddClient} className="mb-6 p-4 bg-background border border-border rounded-lg">
                  <input
                    type="text"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="Client name"
                    className="w-full px-3 py-2 mb-3 border border-border bg-background text-foreground rounded focus:outline-none focus:border-gold"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-gold text-foreground text-sm font-medium rounded hover:bg-gold/90 transition-smooth"
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddClient(false)}
                      className="px-4 py-2 border border-border text-foreground text-sm rounded hover:bg-secondary transition-smooth"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Client List */}
              <div className="space-y-2">
                {clients.map((client) => (
                  <div
                    key={client.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-smooth ${
                      selectedClient?.id === client.id
                        ? "bg-gold/20 border border-gold/40"
                        : "bg-background border border-border hover:border-gold/30"
                    }`}
                    onClick={() => setSelectedClient(client)}
                  >
                    <div>
                      <p className="font-medium text-foreground">{client.name}</p>
                      <p className="text-xs text-foreground/60">{client.images.length} images</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteClient(client.id)
                      }}
                      className="p-2 text-foreground/40 hover:text-red-400 transition-smooth"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Client Details / Images */}
          <div className="lg:col-span-2">
            {selectedClient ? (
              <div className="bg-secondary/30 border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground">{selectedClient.name}</h2>
                    <p className="text-sm text-foreground/60 mt-1">
                      Password: <span className="font-mono text-gold">{selectedClient.password}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddImage(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gold text-foreground rounded-full hover:bg-gold/90 transition-smooth"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Image
                  </button>
                </div>

                {/* Add Image Form */}
                {showAddImage && (
                  <form onSubmit={handleAddImage} className="mb-6 p-4 bg-background border border-border rounded-lg">
                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="Image URL (e.g., /photo.jpg or https://...)"
                      className="w-full px-3 py-2 mb-3 border border-border bg-background text-foreground rounded focus:outline-none focus:border-gold"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-gold text-foreground text-sm font-medium rounded hover:bg-gold/90 transition-smooth"
                      >
                        Add Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddImage(false)}
                        className="px-4 py-2 border border-border text-foreground text-sm rounded hover:bg-secondary transition-smooth"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Images Grid */}
                {selectedClient.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedClient.images.map((image, index) => (
                      <div key={index} className="relative group aspect-square">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-smooth rounded-lg" />
                        <button
                          onClick={() => handleRemoveImage(image)}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-smooth hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-foreground/60">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 opacity-30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p>No images yet. Add some images for this client.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-secondary/30 border border-border rounded-lg p-6 flex items-center justify-center min-h-[400px]">
                <div className="text-center text-foreground/60">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 opacity-30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p>Select a client to view their images</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
