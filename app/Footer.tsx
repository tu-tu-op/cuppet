"use client";

import { useEffect, useRef, useState } from "react";
import { FiActivity, FiShield, FiTrendingUp } from "react-icons/fi";

const linkGroups = [
  {
    title: "Product",
    links: [
      ["Home", "/"],
      ["Connectors", "/#connectors"],
      ["Workflows", "/#demo"],
      ["Demo", "/#demo"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Blog", "/blog"],
      ["Changelog", "/changelog"],
      ["FAQ", "/faq"],
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
    title: "Active Development",
    description: "We're continuously shipping improvements and expanding the platform.",
    Icon: FiActivity,
  },
  {
    title: "Privacy First",
    description: "Every integration is permission-based and designed with user privacy in mind.",
    Icon: FiShield,
  },
  {
    title: "Launch Journey",
    description: "Currently preparing for Google Play verification and public release.",
    Icon: FiTrendingUp,
  },
] as const;

const bottomLinks = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Contact", "/contact"],
] as const;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -64px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className={`site-footer${isVisible ? " is-visible" : ""}`}>
      <div className="footer-main">
        <div className="footer-brand">
          <a className="footer-logo" href="/" aria-label="Cuppet home">
            Cuppet
          </a>
          <p>
            Your personal AI workspace where scheduled agents automate everyday tasks across your
            connected digital life.
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
            Join Waitlist
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
