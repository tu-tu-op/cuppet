"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { FiGrid, FiX } from "react-icons/fi";
import type { IconType } from "react-icons";
import {
  SiAsana,
  SiDropbox,
  SiGithub,
  SiGmail,
  SiGooglecalendar,
  SiGoogledrive,
  SiLinear,
  SiNotion,
} from "react-icons/si";
import LogoLoop from "./LogoLoop";

type Connector = {
  name: string;
  color: string;
  Icon: IconType;
  description: string;
};

const connectorCatalog: Connector[] = [
  {
    name: "Gmail",
    color: "#ea4335",
    Icon: SiGmail,
    description:
      "Gives your agents the context inside email threads so they can summarize conversations, draft replies, and trigger the next step without losing important details.",
  },
  {
    name: "Google Calendar",
    color: "#4285f4",
    Icon: SiGooglecalendar,
    description:
      "Lets agents understand your availability, schedule or adjust events, and prepare timely reminders around the commitments already on your calendar.",
  },
  {
    name: "Google Drive",
    color: "#0f9d58",
    Icon: SiGoogledrive,
    description:
      "Helps agents find files, retrieve useful context, organize documents, and save completed work where your team already expects to find it.",
  },
  {
    name: "Notion",
    color: "#1c1a17",
    Icon: SiNotion,
    description:
      "Connects agents to your workspace so they can reference pages, update databases, capture decisions, and keep shared knowledge current.",
  },
  {
    name: "GitHub",
    color: "#1c1a17",
    Icon: SiGithub,
    description:
      "Allows agents to follow repositories, issues, pull requests, and code changes so development work stays summarized, routed, and moving forward.",
  },
  {
    name: "Linear",
    color: "#5e6ad2",
    Icon: SiLinear,
    description:
      "Keeps agents aware of project priorities so they can triage issues, update statuses, and coordinate routine product work across your team.",
  },
  {
    name: "Dropbox",
    color: "#0061ff",
    Icon: SiDropbox,
    description:
      "Connects agents to shared files and folders so they can locate source material, organize deliverables, and keep stored work up to date.",
  },
  {
    name: "Asana",
    color: "#f06a6a",
    Icon: SiAsana,
    description:
      "Gives agents visibility into tasks and projects so they can update assignments, surface blockers, and keep recurring work on schedule.",
  },
];

const connectorLogos = connectorCatalog.map(({ Icon, name, color }) => ({
  node: (
    <span className="connector-mark" style={{ color }}>
      <Icon aria-hidden="true" focusable="false" />
      <span>{name}</span>
    </span>
  ),
  title: name,
  ariaLabel: name,
}));

export default function ConnectorsSection() {
  const [activeConnector, setActiveConnector] = useState<Connector | null>(null);
  const [showAll, setShowAll] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const visibleConnectors = showAll ? connectorCatalog : connectorCatalog.slice(0, 6);

  useEffect(() => {
    if (activeConnector) closeButtonRef.current?.focus();
  }, [activeConnector]);

  const openConnector = (connector: Connector, event: MouseEvent<HTMLButtonElement>) => {
    openerRef.current = event.currentTarget;
    setActiveConnector(connector);
  };

  const closeConnector = () => {
    setActiveConnector(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  return (
    <section className="connectors-page" aria-labelledby="connectors-heading">
      <div className="connectors-content">
        <span className="section-cross" aria-hidden="true" />
        <h2 id="connectors-heading">Connectors</h2>
        <p>
          Your agents gain the context they need to understand your digital world, make informed
          decisions, and take action—without constant switching between apps.
        </p>
        <div className="connectors-loop" id="connector-loop">
          <LogoLoop
            logos={connectorLogos}
            speed={64}
            direction="left"
            logoHeight={36}
            gap={52}
            hoverSpeed={0}
            scaleOnHover
            ariaLabel="Available app connectors"
          />
        </div>
      </div>
      <div className="connectors-showcase">
        <div className="connector-card-grid" aria-hidden={activeConnector ? true : undefined}>
          {visibleConnectors.map((connector) => {
            const { Icon } = connector;
            return (
              <button
                className="connector-card"
                type="button"
                key={connector.name}
                tabIndex={activeConnector ? -1 : 0}
                aria-haspopup="dialog"
                onClick={(event) => openConnector(connector, event)}
              >
                <span className="connector-card-icon" style={{ color: connector.color }}>
                  <Icon aria-hidden="true" focusable="false" />
                </span>
                <span className="connector-card-name">{connector.name}</span>
              </button>
            );
          })}
        </div>
        <button
          className="nav-cta connectors-explore"
          type="button"
          tabIndex={activeConnector ? -1 : 0}
          aria-expanded={showAll}
          onClick={() => setShowAll((current) => !current)}
        >
          <FiGrid aria-hidden="true" />
          {showAll ? "Show Featured" : "Explore More"}
        </button>

        {activeConnector && (
          <div
            className="connector-detail-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="connector-detail-title"
            onKeyDown={(event) => {
              if (event.key === "Escape") closeConnector();
              if (event.key === "Tab") {
                event.preventDefault();
                closeButtonRef.current?.focus();
              }
            }}
          >
            <button
              className="connector-detail-close"
              type="button"
              ref={closeButtonRef}
              aria-label="Close connector details"
              onClick={closeConnector}
            >
              <FiX aria-hidden="true" />
            </button>
            <span className="connector-detail-icon" style={{ color: activeConnector.color }}>
              <activeConnector.Icon aria-hidden="true" focusable="false" />
            </span>
            <p className="connector-detail-kicker">Connector</p>
            <h3 id="connector-detail-title">{activeConnector.name}</h3>
            <p className="connector-detail-description">{activeConnector.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}
