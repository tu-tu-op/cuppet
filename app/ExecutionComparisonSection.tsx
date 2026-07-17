"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";
import styles from "./ExecutionComparisonSection.module.css";

const comparisons = [
  {
    need: "Start the day with what matters.",
    typical: "Gather the latest updates and ask for another summary every morning.",
    outcome:
      "Runs before your day starts, checks the apps you approved, and delivers a fresh brief.",
    status: "Scheduled",
    result: "Morning brief ready at 8:45 AM",
  },
  {
    need: "Walk into meetings prepared.",
    typical: "Paste the newest notes and rebuild the context when the meeting gets close.",
    outcome:
      "Reads the calendar, relevant mail, and saved notes in time to prepare the meeting context.",
    status: "On time",
    result: "Meeting prep completed",
  },
  {
    need: "Keep a topic in view.",
    typical: "Repeat the search and prompt whenever you want to know what changed.",
    outcome:
      "Checks saved sources each week, organizes the changes, and sends a concise digest.",
    status: "Updated",
    result: "Weekly digest delivered",
  },
  {
    need: "Stay ahead of follow-ups.",
    typical: "Get a draft, then remember when to revisit it and what happened next.",
    outcome:
      "Tracks the due moment, prepares the follow-up with current context, and asks before sending.",
    status: "Review",
    result: "Ready for your approval",
  },
  {
    need: "Keep recurring work moving.",
    typical: "The answer stops when the conversation closes, so the next cycle starts from zero.",
    outcome:
      "A saved routine runs again, records each step, and returns when the result is ready.",
    status: "Repeatable",
    result: "Routine completed with history",
  },
] as const;

export default function ExecutionComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`${styles.section}${isVisible ? ` ${styles.isVisible}` : ""}`}
      aria-labelledby="comparison-heading"
      ref={sectionRef}
    >
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Beyond the chat window
          </p>
          <div className={styles.introGrid}>
            <h2 id="comparison-heading">The difference is what happens next.</h2>
            <p>
              A conversation can point you in the right direction. Cuppet keeps the routine moving
              with connected context, a schedule, and clear control over every action.
            </p>
          </div>
        </header>

        <div className={styles.columnHeadings} aria-hidden="true">
          <span>What you need</span>
          <span>A one-time conversation</span>
          <span>With Cuppet</span>
        </div>

        <ol className={styles.rows} aria-label="How Cuppet differs from a one-time AI conversation">
          {comparisons.map(({ need, typical, outcome, status, result }, index) => (
            <li className={styles.row} key={need}>
              <div className={styles.needCell}>
                <span className={styles.cellLabel}>What you need</span>
                <div className={styles.needMeta}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{need}</h3>
              </div>

              <div className={styles.typicalCell}>
                <span className={styles.cellLabel}>A one-time conversation</span>
                <span className={styles.typicalStatus}><i /> One-time response</span>
                <p>{typical}</p>
              </div>

              <div className={styles.outcomeCell}>
                <span className={styles.cellLabel}>With Cuppet</span>
                <span className={styles.productStatus}><i /> {status}</span>
                <p>{outcome}</p>
                <span className={styles.result}>
                  <FiCheck aria-hidden="true" />
                  {result}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
