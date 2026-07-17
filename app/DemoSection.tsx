"use client";

import { useState } from "react";
import {
  FiBell,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiFileText,
  FiLink2,
  FiMail,
  FiMoreHorizontal,
  FiSend,
  FiShield,
  FiZap,
} from "react-icons/fi";

const chapters = [
  {
    id: "opening",
    title: "Opening the app",
    caption: "See priorities, scheduled agents, and finished work at a glance.",
  },
  {
    id: "connectors",
    title: "Connecting your tools",
    caption: "Connect Gmail, Calendar, and Notion once, with permissions you choose.",
  },
  {
    id: "command",
    title: "Sending a command",
    caption: "Describe the outcome, choose a schedule, and add guardrails.",
  },
  {
    id: "working",
    title: "Watching the agent work",
    caption: "Follow the agent as it gathers context and completes the routine.",
  },
  {
    id: "result",
    title: "Reviewing the result",
    caption: "Review the finished brief, its sources, and every action taken.",
  },
] as const;

function AppHeader() {
  return (
    <>
      <div className="demo-statusbar">
        <span>9:41</span>
        <span className="demo-status-icons" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="demo-appbar">
        <span className="demo-app-logo">C</span>
        <strong>Cuppet</strong>
        <FiBell aria-hidden="true" />
      </div>
    </>
  );
}

function HomePreview() {
  return (
    <div className="demo-screen-content demo-home-screen">
      <div className="demo-mobile-heading">
        <span>Tuesday, July 14</span>
        <h4>Good morning, Maya</h4>
      </div>
      <div className="demo-metric-row">
        <div><strong>3</strong><span>Active agents</span></div>
        <div><strong>7</strong><span>Done today</span></div>
      </div>
      <div className="demo-focus-panel">
        <div className="demo-panel-heading">
          <span className="demo-icon-chip"><FiZap aria-hidden="true" /></span>
          <div><span>Next up</span><strong>Daily client brief</strong></div>
          <FiChevronRight aria-hidden="true" />
        </div>
        <div className="demo-time-row"><FiClock aria-hidden="true" /> Runs at 8:45 AM</div>
      </div>
      <p className="demo-list-label">Recent activity</p>
      <div className="demo-activity-row">
        <FiCheckCircle aria-hidden="true" />
        <div><strong>Inbox triage</strong><span>12 messages organized</span></div>
        <span>8:32</span>
      </div>
      <div className="demo-activity-row">
        <FiCalendar aria-hidden="true" />
        <div><strong>Schedule check</strong><span>2 conflicts resolved</span></div>
        <span>8:18</span>
      </div>
    </div>
  );
}

function ConnectorsPreview() {
  return (
    <div className="demo-screen-content">
      <div className="demo-mobile-heading">
        <span>Workspace setup</span>
        <h4>Connect your tools</h4>
        <p>Cuppet only uses the access you approve.</p>
      </div>
      <div className="demo-tool-list">
        <div className="demo-tool-row is-connected">
          <span className="demo-tool-icon gmail"><FiMail aria-hidden="true" /></span>
          <div><strong>Gmail</strong><span>Mail and threads</span></div>
          <span><FiCheck aria-hidden="true" /> Connected</span>
        </div>
        <div className="demo-tool-row is-connected">
          <span className="demo-tool-icon calendar"><FiCalendar aria-hidden="true" /></span>
          <div><strong>Calendar</strong><span>Events and availability</span></div>
          <span><FiCheck aria-hidden="true" /> Connected</span>
        </div>
        <div className="demo-tool-row">
          <span className="demo-tool-icon notion">N</span>
          <div><strong>Notion</strong><span>Pages and databases</span></div>
          <FiChevronRight aria-hidden="true" />
        </div>
      </div>
      <div className="demo-approval-panel">
        <div><FiShield aria-hidden="true" /><strong>Permission review</strong></div>
        <p>Read selected messages and create calendar events. Cuppet asks before sending.</p>
        <button type="button" tabIndex={-1}>Access approved</button>
      </div>
    </div>
  );
}

function CommandPreview() {
  return (
    <div className="demo-screen-content demo-command-screen">
      <div className="demo-mobile-heading">
        <span>New command</span>
        <h4>What should Cuppet handle?</h4>
      </div>
      <div className="demo-chat-bubble">
        Prepare my 9 AM client brief using unread emails, today’s calendar, and the latest project notes.
      </div>
      <div className="demo-command-settings">
        <div><FiClock aria-hidden="true" /><span><small>Schedule</small><strong>Weekdays at 8:45 AM</strong></span><FiChevronRight aria-hidden="true" /></div>
        <div><FiShield aria-hidden="true" /><span><small>Approval</small><strong>Ask before sending</strong></span><FiChevronRight aria-hidden="true" /></div>
      </div>
      <div className="demo-command-summary">
        <FiZap aria-hidden="true" />
        <span><strong>3 tools ready</strong><small>Gmail, Calendar, Notion</small></span>
      </div>
      <div className="demo-composer">
        <span>Anything else?</span>
        <button type="button" tabIndex={-1} aria-label="Send command"><FiSend aria-hidden="true" /></button>
      </div>
    </div>
  );
}

const workSteps = [
  ["Reading unread client emails", "12 messages checked"],
  ["Checking today’s calendar", "3 meetings found"],
  ["Finding the latest project notes", "Q3 Launch Plan"],
  ["Writing your morning brief", "In progress"],
] as const;

function WorkingPreview() {
  return (
    <div className="demo-screen-content">
      <div className="demo-mobile-heading">
        <span>Agent running</span>
        <h4>Daily client brief</h4>
      </div>
      <div className="demo-progress-card">
        <div><span>Working</span><strong>75%</strong></div>
        <div className="demo-progress-track"><span /></div>
        <p>Started at 8:45 AM</p>
      </div>
      <div className="demo-step-list">
        {workSteps.map(([title, detail], index) => (
          <div className={index === workSteps.length - 1 ? "is-running" : "is-done"} key={title}>
            <span className="demo-step-status">{index === workSteps.length - 1 ? <i /> : <FiCheck aria-hidden="true" />}</span>
            <span><strong>{title}</strong><small>{detail}</small></span>
            {index === workSteps.length - 1 && <FiMoreHorizontal aria-hidden="true" />}
          </div>
        ))}
      </div>
      <div className="demo-live-note"><span /> This activity is saved in the agent history.</div>
    </div>
  );
}

function ResultPreview() {
  return (
    <div className="demo-screen-content demo-result-screen">
      <div className="demo-result-mark"><FiCheck aria-hidden="true" /></div>
      <div className="demo-mobile-heading">
        <span>Completed at 8:47 AM</span>
        <h4>Your client brief is ready</h4>
        <p>What you need before the first meeting, pulled together in two minutes.</p>
      </div>
      <div className="demo-result-panel">
        <div className="demo-panel-heading">
          <span className="demo-icon-chip"><FiFileText aria-hidden="true" /></span>
          <div><span>Document</span><strong>Tuesday client brief</strong></div>
          <FiChevronRight aria-hidden="true" />
        </div>
        <ul>
          <li><FiCheck aria-hidden="true" /> 3 client updates summarized</li>
          <li><FiCheck aria-hidden="true" /> 2 decisions need your input</li>
          <li><FiCheck aria-hidden="true" /> Meeting links added to calendar</li>
        </ul>
      </div>
      <div className="demo-source-row"><FiLink2 aria-hidden="true" /><span><strong>8 sources</strong><small>View sources</small></span><FiChevronRight aria-hidden="true" /></div>
      <button className="demo-review-button" type="button" tabIndex={-1}>Review brief</button>
    </div>
  );
}

const previews = {
  opening: HomePreview,
  connectors: ConnectorsPreview,
  command: CommandPreview,
  working: WorkingPreview,
  result: ResultPreview,
} as const;

export default function DemoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapter = chapters[activeIndex];
  const Screen = previews[chapter.id];

  return (
    <section className="demo-page" id="demo" aria-labelledby="demo-heading">
      <div className="demo-content">
        <span className="section-cross" aria-hidden="true" />
        <h2 id="demo-heading">See a full run</h2>
        <p>From opening the app to reviewing finished work.</p>
        <div className="demo-index" aria-label="Demo chapters">
          {chapters.map((item, index) => (
            <button
              className={`demo-index-card${index === activeIndex ? " is-active" : ""}`}
              type="button"
              key={item.id}
              aria-pressed={index === activeIndex}
              aria-controls="interactive-demo-screen"
              onClick={() => setActiveIndex(index)}
            >
              <span className="demo-index-number">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.caption}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="demo-preview">
        <div className="demo-preview-copy" key={`copy-${chapter.id}`} aria-live="polite">
          <span>Interactive preview</span>
          <h3>{chapter.title}</h3>
          <p>{chapter.caption}</p>
        </div>
        <div className="demo-phone-float">
          <div className="demo-phone" aria-hidden="true">
            <div className="demo-phone-screen" id="interactive-demo-screen" key={chapter.id}>
              <AppHeader />
              <Screen />
              <div className="demo-home-indicator" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
