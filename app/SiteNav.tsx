"use client";

type Props = {
  current?: "about" | "blog" | "waitlist";
};

export default function SiteNav({ current }: Props) {
  return (
    <header className="site-nav" aria-label="Primary">
      <a className="nav-brand" href="/">
        Cuppet
      </a>
      <nav className="nav-links" aria-label="Main">
        <a
          href="/"
          onClick={(e) => {
            // Same-route /#product used to jump to the carousel; always show page top.
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          Product
        </a>
        <a href="/about" {...(current === "about" ? { "aria-current": "page" as const } : {})}>
          About Us
        </a>
        <a href="/blog" {...(current === "blog" ? { "aria-current": "page" as const } : {})}>
          Blog
        </a>
      </nav>
      <a
        className="nav-cta"
        href="/waitlist"
        {...(current === "waitlist" ? { "aria-current": "page" as const } : {})}
      >
        Join Waitlist
      </a>
    </header>
  );
}
