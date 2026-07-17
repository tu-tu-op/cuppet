"use client";

import {
  FiArrowDown,
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiLink2,
} from "react-icons/fi";
import { useInViewOnce } from "../useInViewOnce";
import styles from "./BlogPage.module.css";

const topics = [
  ["Scheduled Agents", "#what-are-scheduled-ai-agents"],
  ["Connectors", "#connected-apps-ai-context"],
  ["Everyday Automation", "#everyday-tasks-ai-agents"],
  ["Productivity", "#personal-ai-workflow-busy-days"],
  ["Tutorials", "#reminders-into-action"],
  ["Product Updates", "#product-update-shipped-this-week"],
] as const;

const articles = [
  {
    slug: "connected-apps-ai-context",
    category: "Connectors",
    title: "How Connected Apps Give AI Real Context",
    excerpt:
      "Why useful automation depends on the right calendar, inbox, and workspace context, plus clear permission boundaries.",
    date: "2026-07-11",
    displayDate: "July 11, 2026",
    readTime: "6 min read",
  },
  {
    slug: "everyday-tasks-ai-agents",
    category: "Everyday Automation",
    title: "7 Everyday Tasks You Can Automate with AI Agents",
    excerpt:
      "Practical routines for morning planning, follow-ups, recurring research, and the small jobs that quietly take up a week.",
    date: "2026-07-07",
    displayDate: "July 7, 2026",
    readTime: "7 min read",
  },
  {
    slug: "ai-agents-run-on-schedule",
    category: "Scheduled Agents",
    title: "Why AI Works Better When It Runs on a Schedule",
    excerpt:
      "A schedule turns a useful prompt into a dependable routine that starts with fresh context and arrives when it matters.",
    date: "2026-07-02",
    displayDate: "July 2, 2026",
    readTime: "5 min read",
  },
  {
    slug: "personal-ai-workflow-busy-days",
    category: "Productivity",
    title: "Building a Personal AI Workflow for Busy Days",
    excerpt:
      "A calm way to decide what an agent should gather, what it can act on, and where a human review still belongs.",
    date: "2026-06-26",
    displayDate: "June 26, 2026",
    readTime: "8 min read",
  },
  {
    slug: "reminders-into-action",
    category: "Tutorials",
    title: "How to Turn Reminders into Real Action",
    excerpt:
      "Move beyond a notification by pairing timing with context, a clear next step, and approval before anything sensitive happens.",
    date: "2026-06-19",
    displayDate: "June 19, 2026",
    readTime: "6 min read",
  },
  {
    slug: "product-update-shipped-this-week",
    category: "Product Updates",
    title: "Product Update: What We Shipped This Week",
    excerpt:
      "A short build log covering clearer agent activity, connector permissions, and the details we are tightening before launch.",
    date: "2026-06-13",
    displayDate: "June 13, 2026",
    readTime: "4 min read",
  },
] as const;

const relatedLinks = [
  ["Connected tools", "See where agents get useful context.", "/#connectors"],
  ["Product walkthrough", "Follow one routine from request to result.", "/#demo"],
  ["Common questions", "Read about access, privacy, and scheduled work.", "/#faq"],
  ["Why Cuppet", "Learn what we are building and why.", "/about"],
] as const;

export default function BlogIndex() {
  const [heroRef, heroVisible] = useInViewOnce("0px 0px -48px");
  const [guidesRef, guidesVisible] = useInViewOnce();
  const [relatedRef, relatedVisible] = useInViewOnce();

  return (
    <div className={styles.blog}>
      <section
        className={`${styles.hero}${heroVisible ? ` ${styles.isVisible}` : ""}`}
        aria-labelledby="blog-heading"
        ref={heroRef}
      >
        <header className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Cuppet Blog
          </p>
          <h1 id="blog-heading">Scheduled AI agents for everyday workflows.</h1>
          <p className={styles.heroLead}>
            Practical guides to connected apps, useful automation, and routines that keep moving
            without another round of asking.
          </p>
          <p className={styles.editorialNote}>
            Field notes from building Cuppet, written for people who want useful routines rather
            than another tool to manage.
          </p>
        </header>

        <article
          className={styles.featured}
          id="what-are-scheduled-ai-agents"
          aria-labelledby="featured-title"
        >
          <div className={styles.featuredCopy}>
            <div className={styles.articleMeta}>
              <span>Scheduled Agents</span>
              <time dateTime="2026-07-15">July 15, 2026</time>
              <span>9 min read</span>
            </div>
            <h2 id="featured-title">What Are Scheduled AI Agents? A Practical Guide</h2>
            <p>
              A scheduled agent is a reusable job with timing, connected context, and boundaries
              you approve. Here is how that changes a helpful answer into work that arrives ready.
            </p>
            <a href="#latest-guides">
              Explore the guides
              <FiArrowDown aria-hidden="true" />
            </a>
          </div>

          <div className={styles.featuredVisual} aria-hidden="true">
            <div className={styles.visualTop}>
              <span>Morning brief</span>
              <small><i /> Active</small>
            </div>
            <div className={styles.visualFlow}>
              <div>
                <span>01</span>
                <p><small>Schedule</small><strong>Weekdays, 8:45 AM</strong></p>
                <FiClock />
              </div>
              <div>
                <span>02</span>
                <p><small>Context</small><strong>Mail, calendar, notes</strong></p>
                <FiLink2 />
              </div>
              <div>
                <span>03</span>
                <p><small>Result</small><strong>Brief ready to review</strong></p>
                <FiCheck />
              </div>
            </div>
            <div className={styles.visualResult}>
              <span><FiCheck /> Completed</span>
              <small>Delivered before the first meeting</small>
            </div>
          </div>
        </article>
      </section>

      <section
        className={`${styles.guides}${guidesVisible ? ` ${styles.isVisible}` : ""}`}
        aria-labelledby="latest-guides"
        ref={guidesRef}
      >
        <div className={styles.guidesHeader}>
          <div>
            <p>Browse by topic</p>
            <h2 id="latest-guides">Practical guides and build notes</h2>
          </div>
          <p>
            Start with the part of connected automation you are working through now. Every topic
            stays grounded in a routine someone could actually use.
          </p>
        </div>

        <nav className={styles.topics} aria-label="Blog topics">
          {topics.map(([label, href]) => (
            <a href={href} key={label}>{label}</a>
          ))}
        </nav>

        <div className={styles.articleGrid}>
          {articles.map(({ slug, category, title, excerpt, date, displayDate, readTime }, index) => (
            <article className={styles.card} id={slug} key={slug}>
              <div className={styles.cardVisual} aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.articleMeta}>
                  <span>{category}</span>
                  <time dateTime={date}>{displayDate}</time>
                  <span>{readTime}</span>
                </div>
                <h3>
                  <a href={`#${slug}`}>{title}</a>
                </h3>
                <p>{excerpt}</p>
                <a className={styles.permalink} href={`#${slug}`} aria-label={`Permanent link to ${title}`}>
                  Article outline
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`${styles.related}${relatedVisible ? ` ${styles.isVisible}` : ""}`}
        aria-labelledby="related-heading"
        ref={relatedRef}
      >
        <div className={styles.relatedIntro}>
          <p>Keep exploring</p>
          <h2 id="related-heading">See how the ideas work in Cuppet.</h2>
          <a className="nav-cta" href="/waitlist">Join Waitlist</a>
        </div>
        <nav className={styles.relatedGrid} aria-label="Related Cuppet pages">
          {relatedLinks.map(([title, description, href]) => (
            <a href={href} key={title}>
              <span>
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
              <FiArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>
      </section>
    </div>
  );
}
