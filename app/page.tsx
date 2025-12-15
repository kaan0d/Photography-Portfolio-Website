import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { Contact } from "@/components/contact"
import { ClientAccess } from "@/components/client-access"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <PortfolioGrid />
      <Contact />
      <ClientAccess />
      <Footer />
    </main>
  )
}
