"use client";

import { FiClock, FiLink2, FiRadio, FiRepeat } from "react-icons/fi";
import styles from "./StorySection.module.css";
import { useInViewOnce } from "./useInViewOnce";

const storySteps = [
  {
    title: "The daily loop",
    description: "Same useful ask, every day. Starting from zero each morning got old fast.",
    Icon: FiRepeat,
  },
  {
    title: "Schedule it once",
    description: "Set the routine. Cuppet brings the result when you need it—no extra prompt.",
    Icon: FiClock,
  },
  {
    title: "Keep context close",
    description: "Connected apps mean less tab-hopping and less searching for the same files.",
    Icon: FiLink2,
  },
  {
    title: "Building in public",
    description: "Still early. We're sharing progress and aiming for a public launch.",
    Icon: FiRadio,
  },
] as const;

export default function StorySection() {
  const [sectionRef, isVisible] = useInViewOnce("0px 0px -96px");

  return (
    <section
      className={`${styles.storySection}${isVisible ? ` ${styles.isVisible}` : ""}`}
      id="story"
      aria-labelledby="story-heading"
      ref={sectionRef}
    >
      <span className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.storyInner}>
        <div className={styles.storyCopy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Our story
          </p>
          <h1 id="story-heading">AI that runs in the background, not another tab you babysit.</h1>
          <p className={styles.storyLead}>
            We kept opening AI tools to ask for the same help every day. Cuppet is for that work:
            scheduled, hooked into your apps, and done without starting over each morning.
          </p>

          <blockquote className={styles.philosophy}>
            <p>Help with the boring repeats. Stay out of the way otherwise.</p>
            <footer>Why we&apos;re building Cuppet</footer>
          </blockquote>

          <div className={styles.currentStatus} aria-label="Current project status">
            <span className={styles.statusPulse} aria-hidden="true" />
            <span>
              <strong>In development</strong>
              <small>Preparing for Google Play review and launch</small>
            </span>
          </div>
        </div>

        <div className={styles.storyVisual} aria-label="How the idea evolved">
          <div className={styles.dailyLoop} aria-hidden="true">
            <span>Ask again</span>
            <i />
            <span>Schedule once</span>
            <i />
            <span>Work arrives</span>
          </div>

          <ol className={styles.storyTimeline}>
            {storySteps.map(({ title, description, Icon }, index) => (
              <li className={styles.storyCard} key={title}>
                <span className={styles.storyIcon} aria-hidden="true">
                  <Icon />
                </span>
                <article>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
