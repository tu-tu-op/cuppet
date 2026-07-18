import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import PromptMarquee from '../sections/PromptMarquee'
import HowItWorks from '../sections/HowItWorks'
import Features from '../sections/Features'
import Security from '../sections/Security'
import Examples from '../sections/Examples'
import CTA from '../sections/CTA'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <PromptMarquee />
        <HowItWorks />
        <Features />
        <Security />
        <Examples />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
