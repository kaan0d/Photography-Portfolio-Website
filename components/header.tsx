"use client"

import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 bg-foreground rounded-sm flex items-center justify-center">
              <span className="text-background font-serif text-lg font-bold">LS</span>
            </div>
            <span className="font-serif text-lg font-semibold hidden sm:inline text-foreground">Luminous Studios</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-foreground hover:text-gold transition-smooth text-sm font-medium">
              About
            </Link>
            <Link href="#portfolio" className="text-foreground hover:text-gold transition-smooth text-sm font-medium">
              Portfolio
            </Link>
            <Link href="#contact" className="text-foreground hover:text-gold transition-smooth text-sm font-medium">
              Contact
            </Link>
          </nav>

          {/* Client Access Button */}
          <div className="hidden md:block">
            <Link
              href="/client-access"
              className="px-6 py-2 text-sm font-medium text-background bg-foreground hover:bg-gold transition-smooth rounded-full"
            >
              Client Access
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="#about" className="text-foreground hover:text-gold transition-smooth text-sm font-medium">
              About
            </Link>
            <Link href="#portfolio" className="text-foreground hover:text-gold transition-smooth text-sm font-medium">
              Portfolio
            </Link>
            <Link href="#contact" className="text-foreground hover:text-gold transition-smooth text-sm font-medium">
              Contact
            </Link>
            <Link
              href="/client-access"
              className="px-6 py-2 text-sm font-medium text-background bg-foreground hover:bg-gold transition-smooth inline-block rounded-full"
            >
              Client Access
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
