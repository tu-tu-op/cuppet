"use client";

type Props = {
  current?: "about" | "blog" | "waitlist";
};

export default function SiteNav({ current }: Props) {
  return (
    <div className="site-nav-shell">
      <header className="site-nav" aria-label="Primary">
        <a className="nav-brand" href="/">
          Cuppet
        </a>
        <nav className="nav-links" aria-label="Main">
          <a
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            Product
          </a>
          <a href="/about" aria-current={current === "about" ? "page" : undefined}>
            About
          </a>
          <a href="/blog" aria-current={current === "blog" ? "page" : undefined}>
            Blog
          </a>
        </nav>
        <a
          className="nav-cta"
          href="/waitlist"
          aria-current={current === "waitlist" ? "page" : undefined}
        >
          Join the waitlist
        </a>
      </header>
    </div>
  );
}
