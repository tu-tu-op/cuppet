import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Cuppet",
  description: "The Cuppet blog.",
};

export default function BlogPage() {
  return (
    <main className="page">
      <header className="site-nav" aria-label="Primary">
        <a className="nav-brand" href="/">
          Cuppet
        </a>
        <nav className="nav-links" aria-label="Main">
          <a href="/#product">Product</a>
          <a href="/#about">About Us</a>
          <a href="/blog" aria-current="page">
            BLOG
          </a>
        </nav>
        <a className="nav-cta" href="/waitlist">
          Join Waitlist
        </a>
      </header>
    </main>
  );
}
