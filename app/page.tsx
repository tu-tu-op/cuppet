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
          <a href="#blog">BLOG</a>
        </nav>
        <a className="nav-cta" href="#waitlist">
          Join Waitlist
        </a>
      </header>
      <section className="hero" id="product" aria-label="Team carousel">
        <ImageCarousel />
      </section>
    </main>
  );
}
