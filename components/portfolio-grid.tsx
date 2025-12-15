"use client"

import { useState } from "react"
import Link from "next/link"
import { LightboxModal } from "./lightbox-modal"

const portfolioItems = [
  {
    id: 1,
    title: "Ethereal Landscapes",
    category: "Landscape",
    image: "/misty-mountain-landscape.jpg",
    description: "A collection exploring the interplay of light and nature",
  },
  {
    id: 2,
    title: "Portrait Series",
    category: "Portrait",
    image: "/elegant-portrait-studio-lighting.jpg",
    description: "Intimate character studies in natural light",
  },
  {
    id: 3,
    title: "Urban Geometry",
    category: "Architecture",
    image: "/modern-architecture-lines.jpg",
    description: "Finding beauty in architectural forms",
  },
  {
    id: 4,
    title: "Botanical Studies",
    category: "Nature",
    image: "/macro-flower-photography-detailed.jpg",
    description: "Macro perspectives revealing hidden details",
  },
  {
    id: 5,
    title: "Golden Hour Chronicles",
    category: "Landscape",
    image: "/sunset-golden-hour-landscape.jpg",
    description: "Moments suspended in golden light",
  },
  {
    id: 6,
    title: "Commercial Work",
    category: "Commercial",
    image: "/luxury-product-photography-minimal.jpg",
    description: "Elevated product and lifestyle imagery",
  },
]

export function PortfolioGrid() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selectedItem = portfolioItems.find((item) => item.id === selectedId)

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-block mb-4 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full">
            <p className="text-gold text-xs font-medium tracking-widest uppercase">Collections</p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">Selected Works</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            A curated selection of recent projects showcasing our artistic approach and technical mastery.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {portfolioItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`group relative overflow-hidden aspect-[4/5] fade-in rounded-lg cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover transition-smooth group-hover:scale-105 rounded-lg"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-smooth rounded-lg" />

              <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none rounded-lg" />
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/collections"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-block px-8 py-4 bg-foreground text-background font-medium hover:bg-gold transition-smooth rounded-full"
          >
            View More
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <LightboxModal item={selectedItem} onClose={() => setSelectedId(null)} allItems={portfolioItems} />
      )}
    </section>
  )
}
