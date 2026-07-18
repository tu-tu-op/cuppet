"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { FaLinkedin, FaSalesforce, FaSlack } from "react-icons/fa";
import { FiGrid, FiX } from "react-icons/fi";
import type { IconType } from "react-icons";
import {
  SiAirtable,
  SiAsana,
  SiBox,
  SiClickup,
  SiConfluence,
  SiDiscord,
  SiDropbox,
  SiFigma,
  SiGithub,
  SiGitlab,
  SiGmail,
  SiGooglecalendar,
  SiGoogledocs,
  SiGoogledrive,
  SiGooglesheets,
  SiHubspot,
  SiIntercom,
  SiJira,
  SiLinear,
  SiNotion,
  SiShopify,
  SiStripe,
  SiTodoist,
  SiTrello,
  SiZendesk,
  SiZoom,
} from "react-icons/si";
import LogoLoop from "./LogoLoop";

type Connector = { name: string; color: string; Icon: IconType; description: string };

const connectorCatalog: Connector[] = [
  { name: "Gmail", color: "#ea4335", Icon: SiGmail, description: "Read threads, draft replies, and move work forward from your inbox." },
  { name: "Google Calendar", color: "#4285f4", Icon: SiGooglecalendar, description: "See what's free and update events. Scheduled work fits around the rest of your calendar." },
  { name: "Google Drive", color: "#0f9d58", Icon: SiGoogledrive, description: "Find the right files, work from their contents, and save results where your team expects them." },
  { name: "Google Docs", color: "#4285f4", Icon: SiGoogledocs, description: "Draft new documents and keep existing ones up to date." },
  { name: "Google Sheets", color: "#0f9d58", Icon: SiGooglesheets, description: "Read key metrics, update rows, and keep operational sheets accurate." },
  { name: "Notion", color: "#1c1a17", Icon: SiNotion, description: "Reference pages, update databases, and keep shared notes current." },
  { name: "Slack", color: "#4a154b", Icon: FaSlack, description: "Read channels and post updates so your team can follow the work in Slack." },
  { name: "Discord", color: "#5865f2", Icon: SiDiscord, description: "Share progress, collect feedback, and route important messages to the right place." },
  { name: "Microsoft Teams", color: "#6264a7", Icon: BiLogoMicrosoftTeams, description: "Bring chats and meetings into the routines you schedule for work." },
  { name: "Zoom", color: "#2d8cff", Icon: SiZoom, description: "Prepare for meetings and capture the follow-ups after each call." },
  { name: "GitHub", color: "#1c1a17", Icon: SiGithub, description: "Follow issues, PRs, and repo changes without manual check-ins." },
  { name: "GitLab", color: "#fc6d26", Icon: SiGitlab, description: "Include merge requests and pipeline status in your regular delivery checks." },
  { name: "Linear", color: "#5e6ad2", Icon: SiLinear, description: "Triage issues and update their status as product work moves forward." },
  { name: "Jira", color: "#0052cc", Icon: SiJira, description: "Track tickets, update fields, and surface blockers." },
  { name: "Confluence", color: "#172b4d", Icon: SiConfluence, description: "Find and summarize runbooks or docs, then keep them up to date." },
  { name: "Asana", color: "#f06a6a", Icon: SiAsana, description: "Update tasks, flag blockers, and keep recurring projects on track." },
  { name: "Trello", color: "#0052cc", Icon: SiTrello, description: "Move cards and keep simple project boards up to date." },
  { name: "ClickUp", color: "#7b68ee", Icon: SiClickup, description: "Coordinate tasks and docs in workspaces shared across teams." },
  { name: "Todoist", color: "#e44332", Icon: SiTodoist, description: "Capture and prioritize to-dos, then mark them done on time." },
  { name: "Dropbox", color: "#0061ff", Icon: SiDropbox, description: "Locate shared files and keep deliverables organized." },
  { name: "Box", color: "#0061d5", Icon: SiBox, description: "Keep enterprise files searchable, organized, and ready when your team needs them." },
  { name: "Figma", color: "#f24e1e", Icon: SiFigma, description: "Bring design details into product and marketing handoffs." },
  { name: "Airtable", color: "#18bfff", Icon: SiAirtable, description: "Keep Airtable bases, views, and records aligned with day-to-day work." },
  { name: "HubSpot", color: "#ff7a59", Icon: SiHubspot, description: "Update contacts and pipelines so follow-ups don't fall behind." },
  { name: "Salesforce", color: "#00a1e0", Icon: FaSalesforce, description: "Keep opportunities and next steps accurate across the sales cycle." },
  { name: "Stripe", color: "#635bff", Icon: SiStripe, description: "Include charges, invoices, and other billing events in recurring revenue work." },
  { name: "Shopify", color: "#96bf48", Icon: SiShopify, description: "Track orders and inventory changes as part of regular store operations." },
  { name: "Intercom", color: "#1f8ded", Icon: SiIntercom, description: "Handle common support questions with full conversation context." },
  { name: "Zendesk", color: "#03363d", Icon: SiZendesk, description: "Triage tickets, summarize issues, and route them with their history intact." },
  { name: "LinkedIn", color: "#0a66c2", Icon: FaLinkedin, description: "Handle routine outreach and updates without starting from scratch each day." },
];

const connectorLogos = connectorCatalog.map(({ Icon, name, color }) => ({
  node: (
    <span className="connector-mark" style={{ color }} title={name}>
      <Icon aria-hidden="true" focusable="false" />
    </span>
  ),
}));

function ConnectorCard({
  connector,
  onOpen,
  tabIndex,
}: {
  connector: Connector;
  onOpen: (c: Connector, e: MouseEvent<HTMLButtonElement>) => void;
  tabIndex?: number;
}) {
  return (
    <button
      className="connector-card"
      type="button"
      tabIndex={tabIndex}
      aria-haspopup="dialog"
      onClick={(e) => onOpen(connector, e)}
    >
      <span className="connector-card-icon" style={{ color: connector.color }}>
        <connector.Icon aria-hidden="true" focusable="false" />
      </span>
      <span className="connector-card-name">{connector.name}</span>
    </button>
  );
}

export default function ConnectorsSection() {
  const [activeConnector, setActiveConnector] = useState<Connector | null>(null);
  const [browseOpen, setBrowseOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const browseCloseRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const exploreRef = useRef<HTMLButtonElement>(null);
  const blocked = !!(activeConnector || browseOpen);

  useEffect(() => {
    if (activeConnector) closeButtonRef.current?.focus();
    else if (browseOpen) browseCloseRef.current?.focus();
  }, [activeConnector, browseOpen]);

  useEffect(() => {
    if (!blocked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [blocked]);

  const openConnector = (connector: Connector, event: MouseEvent<HTMLButtonElement>) => {
    openerRef.current = event.currentTarget;
    setActiveConnector(connector);
  };

  const closeConnector = () => {
    setActiveConnector(null);
    requestAnimationFrame(() => {
      if (browseOpen) browseCloseRef.current?.focus();
      else openerRef.current?.focus();
    });
  };

  const closeBrowse = () => {
    setBrowseOpen(false);
    requestAnimationFrame(() => exploreRef.current?.focus());
  };

  return (
    <section className="connectors-page" id="connectors" aria-labelledby="connectors-heading">
      <div className="connectors-content">
        <span className="section-cross" aria-hidden="true" />
        <h2 id="connectors-heading">Connectors</h2>
        <p>
          Connect the apps you already use. Agents get the context they need, so you spend less
          time moving between tabs.
        </p>
        <div className="connectors-loop" id="connector-loop">
          <LogoLoop
            logos={connectorLogos}
            speed={64}
            logoHeight={36}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            ariaLabel="Available app connectors"
          />
        </div>
      </div>
      <div className="connectors-showcase">
        <div className="connector-card-grid" aria-hidden={blocked || undefined}>
          {connectorCatalog.slice(0, 6).map((c) => (
            <ConnectorCard
              key={c.name}
              connector={c}
              onOpen={openConnector}
              tabIndex={blocked ? -1 : 0}
            />
          ))}
        </div>
        <button
          className="nav-cta connectors-explore"
          type="button"
          ref={exploreRef}
          tabIndex={blocked ? -1 : 0}
          aria-haspopup="dialog"
          aria-expanded={browseOpen}
          onClick={() => setBrowseOpen(true)}
        >
          <FiGrid aria-hidden="true" />
          Explore more
        </button>

        {browseOpen && (
          <div
            className="connector-browse-backdrop"
            role="presentation"
            onClick={closeBrowse}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeBrowse();
            }}
          >
            <div
              className="connector-browse-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="connector-browse-title"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  if (activeConnector) closeConnector();
                  else closeBrowse();
                }
              }}
            >
              <div className="connector-browse-header">
                <div>
                  <p className="connector-browse-kicker">All connectors</p>
                  <h3 id="connector-browse-title">Browse integrations</h3>
                </div>
                <button
                  className="connector-detail-close"
                  type="button"
                  ref={browseCloseRef}
                  aria-label="Close connector list"
                  onClick={closeBrowse}
                >
                  <FiX aria-hidden="true" />
                </button>
              </div>
              <div className="connector-browse-scroll">
                <div className="connector-card-grid connector-browse-grid">
                  {connectorCatalog.map((c) => (
                    <ConnectorCard key={c.name} connector={c} onOpen={openConnector} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeConnector && (
          <div
            className="connector-detail-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="connector-detail-title"
            onKeyDown={(e) => {
              if (e.key === "Escape") closeConnector();
              if (e.key === "Tab") {
                e.preventDefault();
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
