import ConnectorsSection from "./ConnectorsSection";
import DemoSection from "./DemoSection";
import ExecutionComparisonSection from "./ExecutionComparisonSection";
import FAQSection from "./FAQSection";
import Footer from "./Footer";
import HowItWorksSection from "./HowItWorksSection";
import ImageCarousel from "./ImageCarousel";
import SiteNav from "./SiteNav";

export default function Home() {
  return (
    <main className="page">
      <SiteNav />
      <section className="brand-intro" id="about" aria-labelledby="brand-heading">
        <div className="brand-intro-lead">
          <h1 id="brand-heading">Wake up to work that&apos;s already done.</h1>
        </div>
        <div className="brand-intro-copy">
          <p>
            Connect the apps you use and schedule an agent once. You&apos;ll get the result when it
            matters, without opening another chat every morning.
          </p>
        </div>
      </section>
      <section className="hero" id="product" aria-label="Product demo carousel">
        <ImageCarousel />
      </section>
      <ConnectorsSection />
      <DemoSection />
      <HowItWorksSection />
      <ExecutionComparisonSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
