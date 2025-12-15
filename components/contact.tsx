"use client"

import type React from "react"

import { useState } from "react"

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full">
            <p className="text-gold text-xs font-medium tracking-widest uppercase">Get In Touch</p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">Contact Me</h2>
          <p className="text-foreground/70 text-lg">
            Interested in booking a session or discussing your project? I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-2xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">Contact</h3>
              <div className="space-y-2">
                <div>
                  <a
                    href="mailto:hello@luminousstudios.com"
                    className="text-gold hover:text-gold/80 transition-smooth block"
                  >
                    hello@luminousstudios.com
                  </a>
                </div>
                <div>
                  <a href="tel:+1234567890" className="text-gold hover:text-gold/80 transition-smooth block">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-foreground/60">Response time: Usually within 24 hours</p>
            </div>
          </div>

          {/* Connect/Social Links */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">Connect</h3>
              <div className="space-y-2">
                <div>
                  <a href="#" className="text-foreground/60 hover:text-gold transition-smooth block">
                    Instagram
                  </a>
                </div>
                <div>
                  <a href="#" className="text-foreground/60 hover:text-gold transition-smooth block">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="mt-16 pt-12 border-t border-border text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-0.5 bg-gold/30" />
            <span className="text-foreground/40 text-sm">Let's create something beautiful</span>
            <div className="w-12 h-0.5 bg-gold/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
