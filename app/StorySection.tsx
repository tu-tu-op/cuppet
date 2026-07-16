"use client";

import { useEffect, useRef, useState } from "react";
import { FiClock, FiLink2, FiRadio, FiRepeat } from "react-icons/fi";
import styles from "./StorySection.module.css";

const storySteps = [
  {
    title: "The daily loop",
    description:
      "The same useful questions keep coming back. Starting from zero each time never felt like the right answer.",
    Icon: FiRepeat,
  },
  {
    title: "A quieter rhythm",
    description:
      "Schedule the routine once. Cuppet brings the result when it matters, without another round of prompting.",
    Icon: FiClock,
  },
  {
    title: "Context stays close",
    description:
      "Connected apps keep everyday work in one flow, with fewer tabs and less searching between tools.",
    Icon: FiLink2,
  },
  {
    title: "Built in the open",
    description:
      "Cuppet is still taking shape. We are sharing the process, learning in public, and preparing for launch.",
    Icon: FiRadio,
  },
] as const;

export default function StorySection() {
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
      { rootMargin: "0px 0px -96px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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
            Our Story
          </p>
          <h1 id="story-heading">AI should fit into life, not interrupt it.</h1>
          <p className={styles.storyLead}>
            Cuppet began with a familiar pattern: open AI, ask for the same kind of help, close it,
            then do it all again tomorrow. We wanted that useful work to keep moving on its own, at
            the right time, without asking people to repeat themselves.
          </p>

          <blockquote className={styles.philosophy}>
            <p>Technology should quietly help, then get out of the way.</p>
            <footer>Why we are building Cuppet</footer>
          </blockquote>

          <div className={styles.currentStatus} aria-label="Current project status">
            <span className={styles.statusPulse} aria-hidden="true" />
            <span>
              <strong>Actively in development</strong>
              <small>Preparing for Google Play verification and launch</small>
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
