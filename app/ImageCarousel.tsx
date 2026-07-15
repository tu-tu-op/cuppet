"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  ["Welcome flow", "welcome-flow.jpg"],
  ["Dashboard overview", "opening-the-app.jpg"],
  ["Connect your tools", "connecting-your-tools.jpg"],
  ["Review permissions", "permission-approval.jpg"],
  ["Agent setup", "agent-setup.jpg"],
  ["Schedule your agent", "schedule-agent.jpg"],
  ["Chat with your agent", "agent-chat.jpg"],
  ["Command to agent", "sending-a-command.jpg"],
  ["Agent at work", "watching-the-agent-work.jpg"],
  ["Live progress", "live-status.jpg"],
  ["Result returned", "reviewing-the-result.jpg"],
  ["Task complete", "task-complete.jpg"],
  ["Activity history", "activity-history.jpg"],
] as const;

const N = slides.length;
const VIS = Math.max(1, Math.floor((N - 1) / 2) - 1);
const INTRO_MS = 980;
const INTRO_STAGGER = 72;

function wrapOffset(i: number, active: number) {
  const raw = i - active;
  const mid = N / 2;
  if (raw > mid) return raw - N;
  if (raw < -mid) return raw + N;
  return raw;
}

function orbit(offset: number, w: number, h: number, isActive: boolean) {
  const seam = Math.abs(offset) > VIS;
  const seat = Math.max(-VIS, Math.min(VIS, offset));
  const t = seam ? Math.sign(offset || 1) * 1.08 : VIS === 0 ? 0 : seat / VIS;
  const abs = Math.min(Math.abs(t), 1);
  const maxAngle = (Math.PI / 2) * 0.7;
  const angle = Math.sign(t) * Math.pow(abs || 0, 0.9) * maxAngle;
  const base = (w / Math.max(N - 2, 1)) * 1.15;
  const widthPx = Math.max(32, base * (isActive ? 1.55 : 0.48));
  const rx = w * 0.42;
  const rz = Math.min(w, h) * 0.34;
  const y = h * (-0.06 + abs * abs * 0.14);
  const tip = 10 + abs * 9;
  const yaw = -angle * (180 / Math.PI);
  let opacity = 0.58 + (1 - abs) * 0.42;
  if (Math.abs(offset) === VIS) opacity *= 0.7;
  if (seam) opacity = 0;
  const x = Math.sin(angle) * rx;
  const z = Math.cos(angle) * rz - rz;
  return {
    width: `${widthPx.toFixed(2)}px`,
    opacity,
    zIndex: seam ? 0 : Math.round(40 + (1 - abs) * 40 + (isActive ? 20 : 0)),
    seam,
    transform: [
      `translate3d(-50%, -50%, 0)`,
      ` translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(1)}px)`,
      ` rotateY(${yaw.toFixed(2)}deg)`,
      ` rotateX(${tip.toFixed(2)}deg)`,
    ].join(""),
  };
}

function introDot(seam: boolean) {
  return {
    width: "28px",
    opacity: seam ? 0 : 1,
    zIndex: seam ? 0 : 60,
    seam,
    transform: "translate3d(-50%, calc(-50% - 8px), 0) scale(0.08)",
  };
}

export default function ImageCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [size, setSize] = useState({ w: 1280, h: 640 });
  const [wrapping, setWrapping] = useState<Set<number>>(new Set());
  const [intro, setIntro] = useState<"pending" | "dot" | "fan" | "done">("pending");
  const stageRef = useRef<HTMLDivElement>(null);
  const swipeX = useRef<number | null>(null);
  const prevOff = useRef(slides.map((_, i) => wrapOffset(i, 0)));
  const introStarted = useRef(false);

  const move = (d: number) => setActive((a) => (a + d + N) % N);
  const introing = intro !== "done";

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.max(r.width, 320), h: Math.max(r.height, 360) });
      if (introStarted.current) return;
      introStarted.current = true;
      setIntro(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "done" : "dot");
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (intro !== "dot") return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setIntro("fan")));
    return () => cancelAnimationFrame(id);
  }, [intro]);

  useEffect(() => {
    if (intro !== "fan") return;
    const t = window.setTimeout(() => setIntro("done"), INTRO_MS + VIS * INTRO_STAGGER + 80);
    return () => clearTimeout(t);
  }, [intro]);

  useEffect(() => {
    if (introing || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => move(1), 4800);
    return () => clearInterval(id);
  }, [active, paused, introing]);

  useEffect(() => {
    if (introing) return;
    const next = new Set<number>();
    slides.forEach((_, i) => {
      const off = wrapOffset(i, active);
      if (Math.abs(off - prevOff.current[i]) > VIS) next.add(i);
      prevOff.current[i] = off;
    });
    if (!next.size) return;
    setWrapping(next);
    const f = requestAnimationFrame(() => requestAnimationFrame(() => setWrapping(new Set())));
    return () => cancelAnimationFrame(f);
  }, [active, introing]);

  const [label] = slides[active];

  return (
    <div
      className={["carousel-stage", introing && "is-introing"].filter(Boolean).join(" ")}
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Product workflow screenshots in orbit"
      aria-busy={introing}
      tabIndex={0}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (introing) return;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          move(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          move(1);
        }
      }}
      onPointerDown={(e) => {
        if (introing) return;
        if (e.pointerType === "touch") swipeX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (introing || e.pointerType !== "touch" || swipeX.current === null) return;
        const d = e.clientX - swipeX.current;
        swipeX.current = null;
        if (Math.abs(d) > 42) move(d > 0 ? -1 : 1);
      }}
      onPointerCancel={() => {
        swipeX.current = null;
      }}
    >
      <div className="carousel-cards" aria-live="off">
        {slides.map(([slideLabel, image], i) => {
          const offset = wrapOffset(i, active);
          const isActive = offset === 0;
          const seat = orbit(offset, size.w, size.h, isActive);
          const isWrap = wrapping.has(i);
          const style = intro === "dot" || intro === "pending" ? introDot(seat.seam) : seat;
          const delay = intro === "fan" ? `${Math.abs(offset) * INTRO_STAGGER}ms` : "0ms";
          const cls = [
            "carousel-card",
            isActive && "active",
            (style.seam || isWrap) && "is-seam",
            isWrap && "no-transition",
            intro === "dot" || intro === "pending" ? "is-intro-dot" : "",
            intro === "fan" ? "is-intro-fan" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={slideLabel}
              type="button"
              className={cls}
              aria-label={isActive ? slideLabel : `Show ${slideLabel} screenshot`}
              aria-hidden={style.seam}
              tabIndex={introing || style.seam || Math.abs(offset) > VIS ? -1 : 0}
              onClick={() => {
                if (!introing && !style.seam) setActive(i);
              }}
              style={{
                width: style.width,
                opacity: isWrap ? 0 : style.opacity,
                zIndex: style.zIndex,
                transform: style.transform,
                transitionDelay: delay,
              }}
            >
              <img
                src={`/screenshots/${image}`}
                alt={`${slideLabel} product screenshot`}
                width={900}
                height={1200}
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
              <span className="carousel-card-shade" aria-hidden="true" />
              <span className="carousel-caption">
                <strong>{slideLabel}</strong>
              </span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {active + 1} of {N}: {label}
      </p>
    </div>
  );
}
