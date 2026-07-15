type Props = {
  /** Which nav item is current, if any */
  current?: "blog" | "waitlist";
  /** Prefix product/about links with `/` for non-home pages */
  root?: boolean;
};

export default function SiteNav({ current, root }: Props) {
  const base = root ? "/" : "";
  return (
    <header className="site-nav" aria-label="Primary">
      <a className="nav-brand" href="/">
        Cuppet
      </a>
      <nav className="nav-links" aria-label="Main">
        <a href={`${base}#product`}>Product</a>
        <a href={`${base}#about`}>About Us</a>
        <a href="/blog" {...(current === "blog" ? { "aria-current": "page" as const } : {})}>
          BLOG
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
