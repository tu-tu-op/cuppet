"use client";

import { useEffect, useRef, useState } from "react";

const people = [
  ["Aria Chen", "Creative Director", "aria-chen"],
  ["Noah Williams", "Operations Lead", "noah-williams"],
  ["Maya Patel", "Workflow Designer", "maya-patel"],
  ["Leo Martin", "Systems Engineer", "leo-martin"],
  ["Elena Rossi", "Product Operator", "elena-rossi"],
  ["Jon Bell", "Delivery Lead", "jon-bell"],
  ["Kenji Sato", "Product Designer", "kenji-sato"],
  ["Amara Okonkwo", "Growth Lead", "amara-okonkwo"],
  ["Diego Ramirez", "Platform Engineer", "diego-ramirez"],
  ["Priya Nair", "Customer Success", "priya-nair"],
  ["Layla Hassan", "Data Analyst", "layla-hassan"],
  ["Owen Hart", "QA Lead", "owen-hart"],
  ["Sophie Blake", "Community Manager", "sophie-blake"],
] as const;

const N = people.length;
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
  // Equal seat steps on the arc (not stretched by card size)
  const seat = Math.max(-VIS, Math.min(VIS, offset));
  const t = seam
    ? Math.sign(offset || 1) * 1.08
    : VIS === 0
      ? 0
      : seat / VIS;
  const abs = Math.min(Math.abs(t), 1);

  // Flatter front arc so L/R neighbors sit on the same path as the mid card
  const maxAngle = (Math.PI / 2) * 0.7;
  // Slight ease so first L/R seats clear the large mid without floating high/out
  const spaced = Math.sign(t) * Math.pow(abs || 0, 0.9);
  const angle = spaced * maxAngle;

  const base = (w / Math.max(N - 2, 1)) * 1.15;
  // Mid max larger; all other seats min smaller
  const widthPx = Math.max(32, base * (isActive ? 1.55 : 0.48));

  // Shared ellipse for every seat (must not depend on card width)
  const rx = w * 0.42;
  const rz = Math.min(w, h) * 0.36;

  // Shared vertical path: gentle rise on the sides (same curve for every seat)
  const y = h * (0.02 + abs * abs * -0.045);

  // Tip/yaw follow the same angle so cards stay tangent to the path
  const tip = 14 + abs * 5;
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
    // Center on path first, then rotate around card center (keeps L/R on the arc)
    transform: [
      `translate3d(-50%, -50%, 0)`,
      ` translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(1)}px)`,
      ` rotateY(${yaw.toFixed(2)}deg)`,
      ` rotateX(${tip.toFixed(2)}deg)`,
    ].join(""),
  };
}

/** Center seed for the load intro — one minimal mid-stage dot */
function introDot(seam: boolean) {
  return {
    width: "28px",
    opacity: seam ? 0 : 1,
    zIndex: seam ? 0 : 60,
    seam,
    transform: "translate3d(-50%, calc(-50% - 10px), 0) scale(0.08)",
  };
}

export default function ImageCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [size, setSize] = useState({ w: 1280, h: 640 });
  const [wrapping, setWrapping] = useState<Set<number>>(new Set());
  // pending → measure, dot → paint at center, fan → orbit seats, done → normal
  const [intro, setIntro] = useState<"pending" | "dot" | "fan" | "done">("pending");
  const stageRef = useRef<HTMLDivElement>(null);
  const swipeX = useRef<number | null>(null);
  const prevOff = useRef(people.map((_, i) => wrapOffset(i, 0)));
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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setIntro("done");
      } else {
        setIntro("dot");
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Paint the center-dot frame, then fan into orbit seats
  useEffect(() => {
    if (intro !== "dot") return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIntro("fan"));
    });
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

  // Seam jump: skip CSS transition so cards don't fly across the orbit
  useEffect(() => {
    if (introing) return;
    const next = new Set<number>();
    people.forEach((_, i) => {
      const off = wrapOffset(i, active);
      if (Math.abs(off - prevOff.current[i]) > VIS) next.add(i);
      prevOff.current[i] = off;
    });
    if (!next.size) return;
    setWrapping(next);
    const f = requestAnimationFrame(() => requestAnimationFrame(() => setWrapping(new Set())));
    return () => cancelAnimationFrame(f);
  }, [active, introing]);

  const [name, role] = people[active];

  return (
    <div
      className={["carousel-stage", introing && "is-introing"].filter(Boolean).join(" ")}
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Team portraits in orbit"
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
        {people.map(([pName, pRole, slug], i) => {
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
              key={pName}
              type="button"
              className={cls}
              aria-label={isActive ? `${pName}, ${pRole}` : `Show ${pName}`}
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
                src={`/people/${slug}.jpg`}
                alt=""
                width={900}
                height={1200}
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
              <span className="carousel-card-shade" aria-hidden="true" />
              <span className="carousel-caption">
                <strong>{pName}</strong>
                <span>{pRole}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {active + 1} of {N}: {name}, {role}
      </p>
    </div>
  );
}
