import type { Metadata } from "next";
import WaitlistForm from "./WaitlistForm";

export const metadata: Metadata = {
  title: "Join Waitlist — Cuppet",
  description: "Join the Cuppet waitlist — tell us how you’ll use it, then leave your name and email.",
};

export default function WaitlistPage() {
  return (
    <main className="page waitlist-page">
      <header className="site-nav" aria-label="Primary">
        <a className="nav-brand" href="/">
          Cuppet
        </a>
        <nav className="nav-links" aria-label="Main">
          <a href="/#product">Product</a>
          <a href="/#about">About Us</a>
          <a href="/blog">BLOG</a>
        </nav>
        <a className="nav-cta" href="/waitlist" aria-current="page">
          Join Waitlist
        </a>
      </header>

      <section className="waitlist-shell" aria-labelledby="waitlist-heading">
        <div className="waitlist-card">
          <a className="waitlist-page-back" href="/">
            ← Back
          </a>
          <p className="waitlist-kicker">Early access</p>
          <h1 id="waitlist-heading">Join the waitlist</h1>
          <p className="waitlist-lead">
            First tell us how you plan to use Cuppet. Next we&apos;ll ask for your name and email.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </main>
  );
}
