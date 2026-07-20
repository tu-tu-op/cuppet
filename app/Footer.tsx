"use client";

import { useInViewOnce } from "./useInViewOnce";

const linkGroups = [
  {
    title: "Product",
    links: [
      ["Home", "/"],
      ["Connectors", "/#connectors"],
      ["Demo", "/#demo"],
      ["FAQ", "/#faq"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Blog", "/blog"],
      ["Waitlist", "/waitlist"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Contact", "/contact"],
    ],
  },
] as const;

export default function Footer() {
  const [footerRef, isVisible] = useInViewOnce("0px 0px -64px");

  return (
    <footer ref={footerRef} className={`site-footer${isVisible ? " is-visible" : ""}`}>
      <div className="footer-statement">
        <div className="footer-statement-copy">
          <a className="footer-logo" href="/" aria-label="Cuppet home">
            Cuppet
          </a>
          <p className="footer-tagline">
            Agents that run on a schedule across the apps you connect — with your approval on
            sensitive steps.
          </p>
        </div>
        <a className="nav-cta footer-cta" href="/waitlist">
          Join the waitlist
        </a>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <p className="footer-status-line">
            <span className="footer-status-dot" aria-hidden="true" />
            In development · Permission-based access · Preparing for public launch
          </p>
        </div>

        {linkGroups.map((group) => (
          <nav className="footer-column" aria-label={`${group.title} links`} key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© 2026 Cuppet</p>
        <nav aria-label="Footer legal links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
