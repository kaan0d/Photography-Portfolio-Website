"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-background rounded-sm flex items-center justify-center">
                <span className="text-foreground font-serif text-sm font-bold">LS</span>
              </div>
              <span className="font-serif font-semibold">Luminous Studios</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Fine art photography capturing moments of elegance and visual poetry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#portfolio" className="text-background/70 hover:text-gold transition-smooth">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-background/70 hover:text-gold transition-smooth">
                  About
                </Link>
              </li>
              <li>
                <Link href="/client-access" className="text-background/70 hover:text-gold transition-smooth">
                  Client Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@luminousstudios.com"
                  className="text-background/70 hover:text-gold transition-smooth"
                >
                  hello@luminousstudios.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-background/70 hover:text-gold transition-smooth">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm">&copy; 2025 Luminous Studios. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-background/60 hover:text-gold transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-background/60 hover:text-gold transition-smooth">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
