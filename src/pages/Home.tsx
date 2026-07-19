import Seo from '../components/Seo'
import SiteLayout from '../components/SiteLayout'
import Hero from '../sections/Hero'
import PromptMarquee from '../sections/PromptMarquee'
import HowItWorks from '../sections/HowItWorks'
import Features from '../sections/Features'
import Security from '../sections/Security'
import Examples from '../sections/Examples'
import CTA from '../sections/CTA'

export default function Home() {
  return (
    <SiteLayout>
      <Seo
        title="Cuppet"
        description="Create persistent agents in one sentence. Cuppet works across your connected accounts, keeps the schedule, and sends the result to your inbox."
        path="/"
      />
      <main>
        <Hero />
        <PromptMarquee />
        <HowItWorks />
        <Features />
        <Security />
        <Examples />
        <CTA />
      </main>
    </SiteLayout>
  )
}
