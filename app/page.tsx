import ConnectorsSection from "./ConnectorsSection";
import DemoSection from "./DemoSection";
import ImageCarousel from "./ImageCarousel";

export default function Home() {
  return (
    <main className="page">
      <header className="site-nav" aria-label="Primary">
        <a className="nav-brand" href="/">
          Cuppet
        </a>
        <nav className="nav-links" aria-label="Main">
          <a href="#product">Product</a>
          <a href="#about">About Us</a>
          <a href="/blog">BLOG</a>
        </nav>
        <a className="nav-cta" href="/waitlist">
          Join Waitlist
        </a>
      </header>
      <section className="hero" id="product" aria-label="Team carousel">
        <ImageCarousel />
      </section>
      <section className="brand-intro" id="about" aria-labelledby="brand-heading">
        <div className="brand-intro-lead">
          <h1 id="brand-heading">Wake up to work that&apos;s already done.</h1>
        </div>
        <div className="brand-intro-copy">
          <p>
            Schedule intelligent agents, connect your favorite apps, and let AI handle the routines
            that keep your life moving—so work gets done before you even think about it.
          </p>
          <a className="nav-cta intro-cta" href="/waitlist">
            Join Waitlist
          </a>
        </div>
      </section>
      <ConnectorsSection />
      <DemoSection />
    </main>
  );
}
