"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getClients } from "@/lib/client-store"

interface PrivateGalleryProps {
  clientName: string
  onLogout: () => void
}

export function PrivateGallery({ clientName, onLogout }: PrivateGalleryProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedForDownload, setSelectedForDownload] = useState<number[]>([])
  const [clientImages, setClientImages] = useState<{ id: number; title: string; image: string }[]>([])

  useEffect(() => {
    const clients = getClients()
    const client = clients.find((c) => c.name === clientName)
    if (client) {
      const images = client.images.map((img, index) => ({
        id: index + 1,
        title: `Photo ${index + 1}`,
        image: img,
      }))
      setClientImages(images)
    }
  }, [clientName])

  const toggleDownload = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedForDownload((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const downloadSelected = async () => {
    if (selectedForDownload.length === 0) return

    const selectedImages = clientImages.filter((img) => selectedForDownload.includes(img.id))

    for (const image of selectedImages) {
      const link = document.createElement("a")
      link.href = image.image
      link.download = `${image.title.replace(/\s+/g, "-")}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setSelectedForDownload([])
  }

  const downloadAll = async () => {
    for (const image of clientImages) {
      const link = document.createElement("a")
      link.href = image.image
      link.download = `photo-${image.id}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      await new Promise((resolve) => setTimeout(resolve, 200))
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
              <p className="text-sm text-foreground/60">
                Welcome, <span className="font-medium text-foreground">{clientName}</span>
              </p>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title with Download Button */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="inline-block mb-4 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full">
              <p className="text-gold text-xs font-medium tracking-widest uppercase">Your Collection</p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Your Gallery</h1>
          </div>
          {clientImages.length > 0 && (
            <button
              onClick={downloadAll}
              className="px-6 py-3 bg-gold text-foreground font-medium hover:bg-gold/90 transition-smooth rounded-full"
            >
              Download All
            </button>
          )}
        </div>

        {/* Download Bar */}
        {selectedForDownload.length > 0 && (
          <div className="mb-8 p-4 bg-gold/10 border border-gold/30 rounded-lg flex items-center justify-between">
            <p className="text-foreground font-medium">
              {selectedForDownload.length} image{selectedForDownload.length !== 1 ? "s" : ""} selected
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedForDownload([])}
                className="px-4 py-2 text-sm border border-foreground text-foreground hover:bg-foreground hover:text-background transition-smooth rounded-full"
              >
                Clear
              </button>
              <button
                onClick={downloadSelected}
                className="px-6 py-2 text-sm font-medium bg-gold text-foreground hover:bg-gold/90 transition-smooth rounded-full"
              >
                Download Selected ({selectedForDownload.length})
              </button>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {clientImages.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {clientImages.map((image) => (
              <div key={image.id} className="group relative">
                {/* Image Container */}
                <div
                  className="relative aspect-[4/5] overflow-hidden bg-secondary cursor-pointer rounded-lg"
                  onClick={() => setSelectedId(image.id)}
                >
                  <img
                    src={image.image || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-105 rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth rounded-lg" />

                  <button
                    onClick={(e) => toggleDownload(image.id, e)}
                    className={`absolute top-4 right-4 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-smooth ${
                      selectedForDownload.includes(image.id)
                        ? "bg-gold border-gold"
                        : "border-white bg-transparent hover:bg-white/10"
                    }`}
                    aria-label={`Select ${image.title}`}
                  >
                    {selectedForDownload.includes(image.id) && (
                      <svg className="w-4 h-4 text-foreground fill-current" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Selection Indicator */}
                {selectedForDownload.includes(image.id) && (
                  <div className="absolute inset-0 border-3 border-gold pointer-events-none rounded-lg" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-foreground/60">
            <svg className="w-20 h-20 mx-auto mb-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg">Your gallery is being prepared.</p>
            <p className="text-sm mt-2">Please check back soon for your photos.</p>
          </div>
        )}
      </main>

      {/* Fullscreen Lightbox */}
      {selectedId && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedId(null)}
        >
          <button
            onClick={() => setSelectedId(null)}
            className="absolute top-6 right-6 p-2 text-white hover:text-gold transition-smooth z-10 rounded-full"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={clientImages.find((i) => i.id === selectedId)?.image || "/placeholder.svg"}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain animate-[fadeIn_0.3s_ease-out]"
          />
        </div>
      )}
    </div>
  )
}
