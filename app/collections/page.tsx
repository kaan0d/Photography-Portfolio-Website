"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LightboxModal } from "@/components/lightbox-modal"

const allPortfolioItems = [
  {
    id: 1,
    title: "Ethereal Landscapes",
    category: "Landscape",
    image: "/misty-mountain-landscape.jpg",
    description: "",
  },
  {
    id: 2,
    title: "Portrait Series",
    category: "Portrait",
    image: "/elegant-portrait-studio-lighting.jpg",
    description: "",
  },
  {
    id: 3,
    title: "Urban Geometry",
    category: "Architecture",
    image: "/modern-architecture-lines.jpg",
    description: "",
  },
  {
    id: 4,
    title: "Botanical Studies",
    category: "Nature",
    image: "/macro-flower-photography-detailed.jpg",
    description: "",
  },
  {
    id: 5,
    title: "Golden Hour Chronicles",
    category: "Landscape",
    image: "/sunset-golden-hour-landscape.jpg",
    description: "",
  },
  {
    id: 6,
    title: "Commercial Work",
    category: "Commercial",
    image: "/luxury-product-photography-minimal.jpg",
    description: "",
  },
  {
    id: 7,
    title: "Abstract Expressions",
    category: "Fine Art",
    image: "/abstract-art-photography.png",
    description: "",
  },
  {
    id: 8,
    title: "Wildlife Moments",
    category: "Wildlife",
    image: "/wildlife-animal-photography.jpg",
    description: "",
  },
  {
    id: 9,
    title: "Architectural Details",
    category: "Architecture",
    image: "/architecture-detail-photography.jpg",
    description: "",
  },
  {
    id: 10,
    title: "Minimal Landscapes",
    category: "Landscape",
    image: "/minimal-landscape.png",
    description: "",
  },
  {
    id: 11,
    title: "Studio Portraits",
    category: "Portrait",
    image: "/studio-portrait.png",
    description: "",
  },
  {
    id: 12,
    title: "Urban Explorations",
    category: "Urban",
    image: "/urban-street-photography.png",
    description: "",
  },
  {
    id: 13,
    title: "Nature Studies",
    category: "Nature",
    image: "/nature-study-photography.jpg",
    description: "",
  },
  {
    id: 14,
    title: "Commercial Products",
    category: "Commercial",
    image: "/commercial-product-shot.png",
    description: "",
  },
  {
    id: 15,
    title: "Fine Art Series",
    category: "Fine Art",
    image: "/fine-art-series.jpg",
    description: "",
  },
  {
    id: 16,
    title: "Wildlife Photography",
    category: "Wildlife",
    image: "/wildlife-photography-savanna.png",
    description: "",
  },
  {
    id: 17,
    title: "Modern Architecture",
    category: "Architecture",
    image: "/modern-architecture.png",
    description: "",
  },
  {
    id: 18,
    title: "Landscape Serenity",
    category: "Landscape",
    image: "/landscape-serenity.jpg",
    description: "",
  },
  {
    id: 19,
    title: "Portrait Excellence",
    category: "Portrait",
    image: "/portrait-excellence.jpg",
    description: "",
  },
  {
    id: 20,
    title: "Street Photography",
    category: "Urban",
    image: "/street-photography-city-rain.png",
    description: "",
  },
  {
    id: 21,
    title: "Nature Close-ups",
    category: "Nature",
    image: "/nature-closeup.png",
    description: "",
  },
  {
    id: 22,
    title: "Product Showcase",
    category: "Commercial",
    image: "/product-showcase.png",
    description: "",
  },
  {
    id: 23,
    title: "Artistic Vision",
    category: "Fine Art",
    image: "/artistic-vision.jpg",
    description: "",
  },
  {
    id: 24,
    title: "Wildlife Wonders",
    category: "Wildlife",
    image: "/wildlife-wonders.jpg",
    description: "",
  },
]

export default function CollectionsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selectedItem = allPortfolioItems.find((item) => item.id === selectedId)

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">Full Collections</h1>
            <p className="text-foreground/70 text-lg">Explore the complete portfolio of our curated works.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
            {allPortfolioItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id)
                  window.scrollTo(0, 0)
                }}
                className={`group relative overflow-hidden aspect-[4/5] fade-in rounded-lg cursor-pointer`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-smooth rounded-lg" />
                <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none rounded-lg" />
              </button>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block px-8 py-4 bg-foreground text-background font-medium hover:bg-gold transition-smooth rounded-full"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {selectedItem && (
        <LightboxModal item={selectedItem} onClose={() => setSelectedId(null)} allItems={allPortfolioItems} />
      )}

      <Footer />
    </main>
  )
}
