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
  ["Send a command", "sending-a-command.jpg"],
  ["Agent at work", "watching-the-agent-work.jpg"],
  ["Live progress", "live-status.jpg"],
  ["Review the result", "reviewing-the-result.jpg"],
  ["Task complete", "task-complete.jpg"],
  ["Activity history", "activity-history.jpg"],
] as const;

const N = slides.length;
const VIS = Math.max(1, Math.floor((N - 1) / 2) - 2);
const INTRO_MS = 980;
const INTRO_STAGGER = 72;
const DRAG_PX_PER_STEP = 120;
const DRAG_MAX_STEPS = 3;
const TITLE_FADE_MS = 180;

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
  const angle = Math.sign(t) * Math.pow(abs || 0, 0.85) * maxAngle;
  const base = (w / Math.max(N - 2, 1)) * 1.15;
  const widthPx = Math.max(32, base * (isActive ? 1.55 : 0.48));
  const rx = w * 0.44;
  const rz = Math.min(w, h) * 0.34;
  const y = h * (-0.06 + abs * abs * 0.14);
  const tip = 10 + abs * 9;
  const yaw = -angle * (180 / Math.PI);
  let opacity = 0.88 + (1 - abs) * 0.12;
  if (seam) opacity = 0;
  const gap = abs > 0 ? w * 0.015 : 0;
  const x = Math.sin(angle) * rx + Math.sign(t || 0) * gap;
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
  const [dragging, setDragging] = useState(false);
  const [openSlide, setOpenSlide] = useState<number | null>(null);
  const [title, setTitle] = useState<string>(slides[0][0]);
  const [titleShown, setTitleShown] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeX = useRef<number | null>(null);
  const swipeSteps = useRef(0);
  const suppressClick = useRef(false);
  const prevOff = useRef(slides.map((_, i) => wrapOffset(i, 0)));
  const introStarted = useRef(false);

  const move = (d: number) => setActive((a) => (a + d + N) % N);
  const introing = intro !== "done";

  const applyDrag = (clientX: number) => {
    if (swipeX.current === null) return;
    const d = clientX - swipeX.current;
    const dir = d > 0 ? -1 : d < 0 ? 1 : 0;
    const target = dir * Math.min(DRAG_MAX_STEPS, Math.floor(Math.abs(d) / DRAG_PX_PER_STEP));
    const delta = target - swipeSteps.current;
    if (delta === 0) return;
    swipeSteps.current = target;
    move(delta);
  };

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
    if (introing || paused || dragging || openSlide !== null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => move(1), 4800);
    return () => clearInterval(id);
  }, [active, paused, dragging, introing, openSlide]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (openSlide !== null && dialog && !dialog.open) dialog.showModal();
  }, [openSlide]);

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

  useEffect(() => {
    if (introing) {
      setTitleShown(false);
      return;
    }
    setTitleShown(false);
    const t = window.setTimeout(() => {
      setTitle(slides[active][0]);
      setTitleShown(true);
    }, TITLE_FADE_MS);
    return () => clearTimeout(t);
  }, [active, introing]);

  const [label] = slides[active];
  const openedSlide = openSlide === null ? null : slides[openSlide];

  return (
    <div
      className={["carousel-stage", introing && "is-introing", dragging && "is-dragging"]
        .filter(Boolean)
        .join(" ")}
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
        if (introing || openSlide !== null || !e.isPrimary || e.button !== 0) return;
        swipeX.current = e.clientX;
        swipeSteps.current = 0;
        suppressClick.current = false;
        setDragging(true);
      }}
      onPointerMove={(e) => {
        if (swipeX.current === null) return;
        if (Math.abs(e.clientX - swipeX.current) > 8) {
          suppressClick.current = true;
          if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.setPointerCapture(e.pointerId);
          }
        }
        applyDrag(e.clientX);
      }}
      onPointerUp={(e) => {
        if (introing || swipeX.current === null) return;
        applyDrag(e.clientX);
        swipeX.current = null;
        swipeSteps.current = 0;
        setDragging(false);
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
        window.setTimeout(() => {
          suppressClick.current = false;
        }, 0);
      }}
      onPointerCancel={() => {
        swipeX.current = null;
        swipeSteps.current = 0;
        suppressClick.current = false;
        setDragging(false);
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
            Math.abs(offset) <= 1 && !style.seam && "is-drag-zone",
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
              aria-label={isActive ? `Open ${slideLabel} screenshot` : `Show ${slideLabel} screenshot`}
              aria-haspopup={isActive ? "dialog" : undefined}
              aria-hidden={style.seam}
              tabIndex={introing || style.seam || Math.abs(offset) > VIS ? -1 : 0}
              onClick={() => {
                if (introing || style.seam || suppressClick.current) return;
                if (isActive) setOpenSlide(i);
                else setActive(i);
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
            </button>
          );
        })}
      </div>
      <p
        className={["carousel-title", titleShown && "is-visible"].filter(Boolean).join(" ")}
        aria-hidden="true"
      >
        {title}
      </p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {active + 1} of {N}: {label}
      </p>
      <dialog
        id="carousel-lightbox"
        className="carousel-lightbox"
        ref={dialogRef}
        aria-label={openedSlide ? `${openedSlide[0]} screenshot` : "Product screenshot"}
        onClose={() => setOpenSlide(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        {openedSlide && (
          <>
            <button
              type="button"
              className="carousel-lightbox-close"
              aria-label="Close screenshot"
              onClick={() => dialogRef.current?.close()}
            >
              ×
            </button>
            <img
              src={`/screenshots/${openedSlide[1]}`}
              alt={`${openedSlide[0]} product screenshot`}
              draggable={false}
            />
            <p>{openedSlide[0]}</p>
          </>
        )}
      </dialog>
    </div>
  );
}
