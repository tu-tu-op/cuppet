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
  { name: "Gmail", color: "#ea4335", Icon: SiGmail, description: "Gives your agents the context inside email threads so they can summarize conversations, draft replies, and trigger the next step without losing important details." },
  { name: "Google Calendar", color: "#4285f4", Icon: SiGooglecalendar, description: "Lets agents understand your availability, schedule or adjust events, and prepare timely reminders around the commitments already on your calendar." },
  { name: "Google Drive", color: "#0f9d58", Icon: SiGoogledrive, description: "Helps agents find files, retrieve useful context, organize documents, and save completed work where your team already expects to find it." },
  { name: "Google Docs", color: "#4285f4", Icon: SiGoogledocs, description: "Lets agents draft, revise, and reference documents so written work stays current without constant manual editing." },
  { name: "Google Sheets", color: "#0f9d58", Icon: SiGooglesheets, description: "Connects agents to live spreadsheets so they can update rows, pull metrics, and keep operational data accurate." },
  { name: "Notion", color: "#1c1a17", Icon: SiNotion, description: "Connects agents to your workspace so they can reference pages, update databases, capture decisions, and keep shared knowledge current." },
  { name: "Slack", color: "#4a154b", Icon: FaSlack, description: "Lets agents read channels, post updates, and surface decisions so team communication stays in sync with automated work." },
  { name: "Discord", color: "#5865f2", Icon: SiDiscord, description: "Keeps community and team spaces connected so agents can announce progress, gather feedback, and route important messages." },
  { name: "Microsoft Teams", color: "#6264a7", Icon: BiLogoMicrosoftTeams, description: "Gives agents access to chats and meetings so enterprise collaboration stays coordinated with scheduled routines." },
  { name: "Zoom", color: "#2d8cff", Icon: SiZoom, description: "Helps agents prepare meeting context, capture follow-ups, and keep video sessions tied to your daily workflows." },
  { name: "GitHub", color: "#1c1a17", Icon: SiGithub, description: "Allows agents to follow repositories, issues, pull requests, and code changes so development work stays summarized, routed, and moving forward." },
  { name: "GitLab", color: "#fc6d26", Icon: SiGitlab, description: "Connects agents to merge requests and pipelines so engineering delivery stays visible and routine checks stay automated." },
  { name: "Linear", color: "#5e6ad2", Icon: SiLinear, description: "Keeps agents aware of project priorities so they can triage issues, update statuses, and coordinate routine product work across your team." },
  { name: "Jira", color: "#0052cc", Icon: SiJira, description: "Lets agents track tickets, update fields, and surface blockers so delivery systems stay aligned with real progress." },
  { name: "Confluence", color: "#172b4d", Icon: SiConfluence, description: "Gives agents access to docs and runbooks so institutional knowledge can be found, summarized, and kept up to date." },
  { name: "Asana", color: "#f06a6a", Icon: SiAsana, description: "Gives agents visibility into tasks and projects so they can update assignments, surface blockers, and keep recurring work on schedule." },
  { name: "Trello", color: "#0052cc", Icon: SiTrello, description: "Lets agents move cards, update boards, and keep lightweight project pipelines flowing without manual board babysitting." },
  { name: "ClickUp", color: "#7b68ee", Icon: SiClickup, description: "Connects agents to tasks and docs so multi-team workspaces stay organized and recurring actions stay automated." },
  { name: "Todoist", color: "#e44332", Icon: SiTodoist, description: "Helps agents capture personal and team to-dos so commitments are scheduled, prioritized, and closed on time." },
  { name: "Dropbox", color: "#0061ff", Icon: SiDropbox, description: "Connects agents to shared files and folders so they can locate source material, organize deliverables, and keep stored work up to date." },
  { name: "Box", color: "#0061d5", Icon: SiBox, description: "Lets agents work with enterprise content so files stay searchable, organized, and ready for the next step." },
  { name: "Figma", color: "#f24e1e", Icon: SiFigma, description: "Gives agents design context so handoffs, comments, and asset updates stay connected to product and marketing work." },
  { name: "Airtable", color: "#18bfff", Icon: SiAirtable, description: "Connects agents to structured bases so records, views, and automations stay in sync with everyday operations." },
  { name: "HubSpot", color: "#ff7a59", Icon: SiHubspot, description: "Lets agents work with CRM contacts and pipelines so outreach, follow-ups, and customer context stay current." },
  { name: "Salesforce", color: "#00a1e0", Icon: FaSalesforce, description: "Gives agents CRM visibility so opportunities, accounts, and next steps stay accurate across the sales cycle." },
  { name: "Stripe", color: "#635bff", Icon: SiStripe, description: "Connects agents to payments and billing events so revenue ops routines can react to charges, invoices, and customer activity." },
  { name: "Shopify", color: "#96bf48", Icon: SiShopify, description: "Lets agents monitor store activity so orders, inventory signals, and merchant routines stay coordinated." },
  { name: "Intercom", color: "#1f8ded", Icon: SiIntercom, description: "Helps agents support customer conversations so common questions and follow-ups can be handled with full context." },
  { name: "Zendesk", color: "#03363d", Icon: SiZendesk, description: "Connects agents to support tickets so issues can be triaged, summarized, and routed without losing customer history." },
  { name: "LinkedIn", color: "#0a66c2", Icon: FaLinkedin, description: "Lets agents assist with professional outreach and updates so networking routines stay intentional and timely." },
];

const connectorLogos = connectorCatalog.map(({ Icon, name, color }) => ({
  node: (
    <span className="connector-mark" style={{ color }} title={name}>
      <Icon aria-hidden="true" focusable="false" />
    </span>
  ),
  title: name,
  ariaLabel: name,
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
  const { Icon } = connector;
  return (
    <button
      className="connector-card"
      type="button"
      tabIndex={tabIndex}
      aria-haspopup="dialog"
      onClick={(e) => onOpen(connector, e)}
    >
      <span className="connector-card-icon" style={{ color: connector.color }}>
        <Icon aria-hidden="true" focusable="false" />
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
          Your agents gain the context they need to understand your digital world, make informed
          decisions, and take action—without constant switching between apps.
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
          Explore More
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
                  <h3 id="connector-browse-title">Explore integrations</h3>
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
