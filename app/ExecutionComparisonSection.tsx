"use client";

import { FiCheck } from "react-icons/fi";
import styles from "./ExecutionComparisonSection.module.css";
import { useInViewOnce } from "./useInViewOnce";

const comparisons = [
  {
    need: "Start the day with what matters.",
    typical: "Pull updates yourself and ask for another summary every morning.",
    outcome: "Runs before you start work, checks only the apps you've approved, and leaves a brief ready.",
    status: "Scheduled",
    result: "Morning brief ready at 8:45 AM",
  },
  {
    need: "Walk into meetings prepared.",
    typical: "Paste in the latest notes and rebuild the context right before each meeting.",
    outcome: "Reads your calendar, mail, and notes in time to prepare the meeting pack.",
    status: "On time",
    result: "Meeting prep completed",
  },
  {
    need: "Keep a topic in view.",
    typical: "Search and re-prompt whenever you want to know what changed.",
    outcome: "Checks saved sources each week and sends a short digest.",
    status: "Updated",
    result: "Weekly digest delivered",
  },
  {
    need: "Stay ahead of follow-ups.",
    typical: "Get a draft, then try to remember when to send it and what changed.",
    outcome: "Keeps track of the deadline, updates the draft, and asks before sending.",
    status: "Review",
    result: "Ready for your approval",
  },
  {
    need: "Keep recurring work moving.",
    typical: "The thread ends, so next week you start from zero again.",
    outcome: "A saved routine runs again, logs each step, and lets you know when it's done.",
    status: "Repeatable",
    result: "Routine completed with history",
  },
] as const;

export default function ExecutionComparisonSection() {
  const [sectionRef, isVisible] = useInViewOnce();

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
            Chat vs Cuppet
          </p>
          <div className={styles.introGrid}>
            <h2 id="comparison-heading">Chat ends when you close the tab. Cuppet keeps going.</h2>
            <p>
              A one-off conversation answers a question. Cuppet runs the same job on a schedule,
              with your apps connected and your approval on sensitive steps.
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
