"use client"

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="fade-in">
            <img
              src="/photographer-portrait-studio.jpg"
              alt="Photographer portrait"
              className="w-full h-auto rounded-sm elegant-shadow"
            />
            {/* Decorative line */}
            <div className="w-24 h-1 bg-gold mt-8" />
          </div>

          {/* Content */}
          <div className="fade-in">
            <div className="inline-block mb-4 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full">
              <p className="text-gold text-xs font-medium tracking-widest uppercase">About</p>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Capturing Light, Creating Art
            </h2>

            <p className="text-foreground/70 mb-6 leading-relaxed text-lg">
              With over 15 years of experience in fine art photography, Luminous Studios specializes in creating
              compelling visual narratives that tell meaningful stories. Each image is meticulously crafted with
              attention to composition, light, and emotion.
            </p>

            <p className="text-foreground/70 mb-8 leading-relaxed text-lg">
              Our philosophy centers on the marriage of technical excellence and artistic vision, producing work that
              resonates with galleries, collectors, and brands worldwide.
            </p>

            <div className="flex gap-6">
              <div>
                <p className="text-3xl font-serif font-bold text-foreground">500+</p>
                <p className="text-foreground/60 text-sm">Exhibitions</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-foreground">10k+</p>
                <p className="text-foreground/60 text-sm">Collections</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-foreground">15+</p>
                <p className="text-foreground/60 text-sm">Years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
