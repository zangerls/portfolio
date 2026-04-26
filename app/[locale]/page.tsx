import { About } from "@/components/about"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"
import { Container } from "@/components/container"
import { Crosshair } from "@/components/crosshair"
import { Experience } from "@/components/experience"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { TechStack } from "@/components/tech-stack"

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Portfolio />

      <TechStack />

      <Container>
        <div aria-hidden="true" className="relative h-8 border-x">
          <Crosshair position="top-left" />
        </div>
      </Container>
      <div aria-hidden="true" className="border-t" />
      <Certifications />
      <Container>
        <div aria-hidden="true" className="relative h-8 border-x">
          <Crosshair position="bottom-right" />
        </div>
      </Container>
      <Contact />
      <Footer />
    </main>
  )
}
