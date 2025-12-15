"use client"

export interface ClientUser {
  id: string
  name: string
  password: string
  images: string[]
  createdAt: string
}

const STORAGE_KEY = "luminous_clients"

// Generate random password
export function generateRandomPassword(length = 8): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let password = ""
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

// Get all clients from localStorage
export function getClients(): ClientUser[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) {
    // Initialize with demo clients
    const defaultClients: ClientUser[] = [
      {
        id: "demo",
        name: "demo",
        password: "demo123",
        images: [
          "/beautiful-candid-wedding-moment.jpg",
          "/golden-hour-portrait-soft-light.jpg",
          "/wedding-ring-details-photography.jpg",
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: "smith-wedding",
        name: "smith-wedding",
        password: "wedding2024",
        images: [
          "/elegant-wedding-reception-dancing.jpg",
          "/first-dance-wedding-romantic.jpg",
          "/couple-portrait-sunset-romantic.jpg",
        ],
        createdAt: new Date().toISOString(),
      },
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultClients))
    return defaultClients
  }
  return JSON.parse(data)
}

// Save clients to localStorage
export function saveClients(clients: ClientUser[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
}

// Add a new client
export function addClient(name: string): { client: ClientUser; password: string } {
  const clients = getClients()
  const password = generateRandomPassword()
  const newClient: ClientUser = {
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name: name,
    password: password,
    images: [],
    createdAt: new Date().toISOString(),
  }
  clients.push(newClient)
  saveClients(clients)
  return { client: newClient, password }
}

// Delete a client
export function deleteClient(id: string): void {
  const clients = getClients()
  const filtered = clients.filter((c) => c.id !== id)
  saveClients(filtered)
}

// Get a client by id
export function getClientById(id: string): ClientUser | undefined {
  const clients = getClients()
  return clients.find((c) => c.id === id)
}

// Validate client credentials
export function validateClient(name: string, password: string): ClientUser | null {
  const clients = getClients()
  const client = clients.find((c) => c.name === name && c.password === password)
  return client || null
}

// Add image to client
export function addImageToClient(clientId: string, imageUrl: string): void {
  const clients = getClients()
  const clientIndex = clients.findIndex((c) => c.id === clientId)
  if (clientIndex !== -1) {
    clients[clientIndex].images.push(imageUrl)
    saveClients(clients)
  }
}

// Remove image from client
export function removeImageFromClient(clientId: string, imageUrl: string): void {
  const clients = getClients()
  const clientIndex = clients.findIndex((c) => c.id === clientId)
  if (clientIndex !== -1) {
    clients[clientIndex].images = clients[clientIndex].images.filter((img) => img !== imageUrl)
    saveClients(clients)
  }
}
