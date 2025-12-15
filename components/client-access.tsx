"use client"

import Link from "next/link"

export function ClientAccess() {
  const handleContactClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 md:py-32 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-6 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full">
          <p className="text-gold text-xs font-medium tracking-widest uppercase">Private Access</p>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">Client Gallery Access</h2>

        <p className="text-foreground/70 mb-12 text-lg leading-relaxed max-w-2xl mx-auto">
          View your private gallery with exclusive access. Enter your unique password to browse, preview, and download
          your curated collection in our secure, elegant client workspace.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/client-access"
            className="px-8 py-4 bg-foreground text-background font-medium hover:bg-gold transition-smooth inline-block rounded-full"
          >
            Enter Client Portal
          </Link>
          <button
            onClick={handleContactClick}
            className="px-8 py-4 bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-smooth border border-border rounded-full cursor-pointer"
          >
            Contact for Access
          </button>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="w-12 h-0.5 bg-gold/30" />
          <span className="text-foreground/40 text-sm">Secure • Private • Elegant</span>
          <div className="w-12 h-0.5 bg-gold/30" />
        </div>
      </div>
    </section>
  )
}
