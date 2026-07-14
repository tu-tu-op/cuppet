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

      <style>{`
        .site-footer {
          width: 100%;
          padding: 80px clamp(24px, 4vw, 56px) 0;
          color: #faf9f6;
          background: rgba(28, 26, 23, 0.98);
          border-top: 1px solid rgba(109, 148, 128, 0.26);
          font-family: var(--nav-font);
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 600ms ease, transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .site-footer.is-visible {
          opacity: 1;
          transform: none;
        }

        .footer-main {
          display: grid;
          grid-template-columns: minmax(240px, 1.35fr) repeat(3, minmax(110px, 0.62fr)) minmax(300px, 1.55fr);
          gap: clamp(28px, 4vw, 64px);
          align-items: start;
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
        }

        .footer-logo {
          display: inline-block;
          color: #faf9f6;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .footer-logo:hover,
        .footer-column a:hover,
        .footer-bottom a:hover {
          color: #fff;
        }

        .footer-brand p {
          max-width: 330px;
          margin: 22px 0 0;
          color: rgba(250, 249, 246, 0.62);
          font-size: 14px;
          font-weight: 500;
          line-height: 1.75;
          letter-spacing: 0;
        }

        .footer-column h2,
        .footer-status > h2 {
          margin: 0 0 20px;
          color: rgba(250, 249, 246, 0.94);
          font-size: 13px;
          font-weight: 700;
          line-height: 1.4;
          letter-spacing: 0;
        }

        .footer-column ul {
          display: grid;
          gap: 14px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .footer-column a,
        .footer-bottom a {
          color: rgba(250, 249, 246, 0.58);
          font-size: 13px;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: 0;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .status-list {
          display: grid;
          gap: 10px;
        }

        .status-card {
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr);
          gap: 12px;
          align-items: start;
          min-height: 84px;
          padding: 14px;
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease,
            box-shadow 180ms ease;
        }

        .status-card:hover {
          background: rgba(255, 255, 255, 0.065);
          border-color: rgba(109, 148, 128, 0.3);
          box-shadow: 0 18px 34px rgba(0, 0, 0, 0.16);
          transform: translateY(-3px);
        }

        .status-icon {
          display: inline-grid;
          place-items: center;
          width: 34px;
          height: 34px;
          color: rgba(250, 249, 246, 0.82);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          font-size: 16px;
        }

        .status-card h3,
        .status-card p {
          margin: 0;
          letter-spacing: 0;
        }

        .status-card h3 {
          color: rgba(250, 249, 246, 0.94);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.45;
        }

        .status-card p {
          margin-top: 5px;
          color: rgba(250, 249, 246, 0.54);
          font-size: 11px;
          font-weight: 500;
          line-height: 1.55;
        }

        .footer-cta {
          justify-self: start;
          margin-top: 18px;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          width: 100%;
          max-width: 1480px;
          min-height: 76px;
          margin: 64px auto 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-bottom p {
          margin: 0;
          color: rgba(250, 249, 246, 0.48);
          font-size: 12px;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: 0;
        }

        .footer-bottom nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        @media (max-width: 1100px) {
          .footer-main {
            grid-template-columns: minmax(230px, 1.3fr) repeat(3, minmax(110px, 0.7fr));
          }

          .footer-status {
            grid-column: 1 / -1;
          }

          .status-list {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .site-footer {
            padding: 64px 20px 0;
          }

          .footer-main {
            grid-template-columns: 1fr;
            gap: 42px;
          }

          .footer-brand p {
            max-width: 420px;
          }

          .footer-status {
            grid-column: auto;
          }

          .status-list {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            align-items: flex-start;
            flex-direction: column;
            min-height: 0;
            margin-top: 52px;
            padding: 24px 0 30px;
          }

          .footer-bottom nav {
            flex-wrap: wrap;
            gap: 16px 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .site-footer {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .status-card,
          .footer-logo,
          .footer-column a,
          .footer-bottom a {
            transition: none;
          }

          .status-card:hover {
            transform: none;
          }
        }
      `}</style>
    </footer>
  );
}
