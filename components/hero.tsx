"use client"

import { useEffect, useState } from "react"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative w-full h-[100vh] overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/luxury-studio-photography-setup.jpg"
          alt="Studio photography setup"
          className={`w-full h-full object-cover transition-smooth ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <div
          className={`text-center max-w-3xl transition-smooth ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-block mb-6 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full">
            <p className="text-gold text-sm font-medium tracking-widest uppercase">Fine Art Photography</p>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Moments of Elegance
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            Explore a curated collection of premium photography capturing the essence of light, emotion, and artistic
            vision.
          </p>
        </div>
      </div>
    </section>
  )
}
