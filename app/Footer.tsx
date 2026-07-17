"use client";

import { FiActivity, FiShield, FiTrendingUp } from "react-icons/fi";
import { useInViewOnce } from "./useInViewOnce";

const linkGroups = [
  {
    title: "Product",
    links: [
      ["Home", "/"],
      ["Connectors", "/#connectors"],
      ["Demo", "/#demo"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Blog", "/blog"],
      ["Changelog", "/changelog"],
      ["FAQ", "/#faq"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/privacy"],
      ["Terms & Conditions", "/terms"],
      ["Contact", "/contact"],
    ],
  },
] as const;

const statusCards = [
  {
    title: "In development",
    description: "Shipping features and cleaning up rough edges.",
    Icon: FiActivity,
  },
  {
    title: "Permission-based",
    description: "You choose which apps each agent can use.",
    Icon: FiShield,
  },
  {
    title: "Launch prep",
    description: "Working toward Google Play review and public release.",
    Icon: FiTrendingUp,
  },
] as const;

const bottomLinks = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Contact", "/contact"],
] as const;

export default function Footer() {
  const [footerRef, isVisible] = useInViewOnce("0px 0px -64px");

  return (
    <footer ref={footerRef} className={`site-footer${isVisible ? " is-visible" : ""}`}>
      <div className="footer-main">
        <div className="footer-brand">
          <a className="footer-logo" href="/" aria-label="Cuppet home">
            Cuppet
          </a>
          <p>Agents that run on a schedule across the apps you connect.</p>
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

        <div className="footer-status">
          <h2>Status</h2>
          <div className="status-list">
            {statusCards.map(({ title, description, Icon }) => (
              <article className="status-card" key={title}>
                <span className="status-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <a className="nav-cta footer-cta" href="/waitlist">
            Join the waitlist
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Cuppet</p>
        <nav aria-label="Footer legal links">
          {bottomLinks.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
