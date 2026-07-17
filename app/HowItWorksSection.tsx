"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiFileText,
  FiMail,
  FiPlay,
  FiRepeat,
  FiSend,
  FiShield,
} from "react-icons/fi";
import styles from "./HowItWorksSection.module.css";

function WindowBar({ label }: { label: string }) {
  return (
    <div className={styles.windowBar}>
      <span />
      <span />
      <span />
      <small>{label}</small>
    </div>
  );
}

function ScheduleScene() {
  return (
    <div className={styles.miniWindow}>
      <WindowBar label="New schedule" />
      <div className={styles.windowBody}>
        <span className={styles.sceneKicker}>Recurring agent</span>
        <strong className={styles.sceneTitle}>Morning reset</strong>
        <div className={styles.scheduleRow}>
          <span className={styles.iconTile}><FiClock /></span>
          <span><small>Runs</small><strong>Weekdays · 8:30 AM</strong></span>
          <span className={styles.toggle}><i /></span>
        </div>
        <div className={styles.dayRow}>
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <span className={index < 5 ? styles.activeDay : ""} key={`${day}-${index}`}>{day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConnectScene() {
  return (
    <div className={styles.nodeMap}>
      <span className={`${styles.mapLine} ${styles.lineOne}`} />
      <span className={`${styles.mapLine} ${styles.lineTwo}`} />
      <span className={`${styles.mapLine} ${styles.lineThree}`} />
      <span className={`${styles.toolNode} ${styles.mailNode}`}><FiMail /><small>Mail</small></span>
      <span className={`${styles.toolNode} ${styles.calendarNode}`}><FiCalendar /><small>Calendar</small></span>
      <span className={`${styles.toolNode} ${styles.notesNode}`}><FiFileText /><small>Notes</small></span>
      <span className={styles.cuppetNode}>C</span>
      <span className={styles.permissionChip}><FiShield /> Approved access</span>
    </div>
  );
}

function CommandScene() {
  return (
    <div className={styles.miniWindow}>
      <WindowBar label="Agent conversation" />
      <div className={`${styles.windowBody} ${styles.chatBody}`}>
        <div className={styles.commandBubble}>
          Check tomorrow&apos;s calendar and prepare my morning list.
        </div>
        <div className={styles.responseBubble}>
          <span className={styles.agentMark}>C</span>
          <span>
            <small>Ready to schedule</small>
            <strong>Morning plan · 7:45 AM</strong>
          </span>
          <FiCheck />
        </div>
        <div className={styles.composer}>
          <span>Add a detail</span>
          <i><FiSend /></i>
        </div>
      </div>
    </div>
  );
}

const runSteps = [
  ["Calendar checked", "Done"],
  ["Notes gathered", "Done"],
  ["Morning list", "Writing"],
] as const;

function RunScene() {
  return (
    <div className={styles.runPanel}>
      <div className={styles.runHeading}>
        <span><i /> Running now</span>
        <strong>72%</strong>
      </div>
      <div className={styles.progressTrack}><span /></div>
      <div className={styles.runTimeline}>
        {runSteps.map(([label, state], index) => (
          <div className={index === 2 ? styles.currentStep : ""} key={label}>
            <span className={styles.stepMark}>{index < 2 ? <FiCheck /> : <i />}</span>
            <strong>{label}</strong>
            <small>{state}</small>
          </div>
        ))}
      </div>
      <span className={styles.runTime}><FiClock /> Started on time at 7:45 AM</span>
    </div>
  );
}

function ApprovalScene() {
  return (
    <div className={styles.approvalPanel}>
      <span className={styles.shieldMark}><FiShield /></span>
      <span className={styles.sceneKicker}>Approval required</span>
      <strong className={styles.sceneTitle}>Send weekly update?</strong>
      <p>3 recipients · Uses your project summary</p>
      <div className={styles.reviewRow}>
        <span><FiFileText /><small>Preview message</small></span>
        <FiChevronRight />
      </div>
      <div className={styles.approvalActions}>
        <span>Not now</span>
        <strong><FiCheck /> Approve</strong>
      </div>
    </div>
  );
}

function LibraryScene() {
  return (
    <div className={styles.libraryPanel}>
      <div className={styles.libraryHeading}>
        <span><FiRepeat /> Saved routines</span>
        <small>3 workflows</small>
      </div>
      <div className={styles.workflowStack}>
        <div><span><FiCalendar /></span><strong>Morning plan</strong><small>Weekdays</small><i><FiPlay /></i></div>
        <div><span><FiMail /></span><strong>Inbox reset</strong><small>Every evening</small><i><FiPlay /></i></div>
        <div><span><FiFileText /></span><strong>Weekly review</strong><small>Fridays</small><i><FiPlay /></i></div>
      </div>
    </div>
  );
}

const features = [
  {
    label: "Timing",
    title: "Schedule once",
    description:
      "Choose what should happen and when. One setup keeps recurring work moving on your cadence.",
    Scene: ScheduleScene,
  },
  {
    label: "Context",
    title: "Connect your tools",
    description:
      "Bring mail, calendars, notes, and tasks into one useful flow with access you approve.",
    Scene: ConnectScene,
  },
  {
    label: "Direction",
    title: "Talk to an agent",
    description:
      "Describe the outcome in everyday language. Cuppet turns it into a clear, reusable routine.",
    Scene: CommandScene,
  },
  {
    label: "Progress",
    title: "Let it run on time",
    description:
      "Agents start on schedule, gather the right context, and leave a visible trail as they work.",
    Scene: RunScene,
  },
  {
    label: "Permission",
    title: "Stay in control",
    description:
      "Review sensitive actions before they happen and see exactly what changed after they finish.",
    Scene: ApprovalScene,
  },
  {
    label: "Routines",
    title: "Reuse workflows",
    description:
      "Save the routines that work, run them again, or adapt them for a different week.",
    Scene: LibraryScene,
  },
] as const;

export default function HowItWorksSection() {
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
      aria-labelledby="how-it-works-heading"
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}><span aria-hidden="true" /> How it works</p>
          <h2 id="how-it-works-heading">A quieter way to keep things moving.</h2>
          <p className={styles.lead}>
            Connect the apps you already use, schedule an agent once, and let everyday routines
            keep their rhythm with clear permissions at every step.
          </p>
        </header>

        <div className={styles.grid}>
          {features.map(({ label, title, description, Scene }, index) => (
            <article className={styles.card} key={title}>
              <div className={styles.cardTop}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{label}</small>
              </div>
              <div className={styles.visual} aria-hidden="true">
                <Scene />
              </div>
              <div className={styles.cardCopy}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
