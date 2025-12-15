"use client"

import type React from "react"

import { useEffect } from "react"

interface PortfolioItem {
  id: number
  title: string
  category: string
  image: string
  description: string
}

interface LightboxModalProps {
  item: PortfolioItem
  allItems: PortfolioItem[]
  onClose: () => void
}

export function LightboxModal({ item, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [onClose])

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-white hover:text-gold transition-smooth z-50 rounded-full cursor-pointer"
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <img
        src={item.image || "/placeholder.svg"}
        alt={item.title}
        className="max-w-full max-h-full object-contain animate-[fadeIn_0.4s_ease-out] cursor-default"
        onClick={handleImageClick}
      />
    </div>
  )
}
