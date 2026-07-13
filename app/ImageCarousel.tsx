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

function wrapOffset(i: number, active: number) {
  const raw = i - active;
  const mid = N / 2;
  if (raw > mid) return raw - N;
  if (raw < -mid) return raw + N;
  return raw;
}

function orbit(offset: number, w: number, h: number, isActive: boolean) {
  const seam = Math.abs(offset) > VIS;
  const t = seam
    ? Math.sign(offset || 1) * 1.12
    : VIS === 0
      ? 0
      : Math.max(-VIS, Math.min(VIS, offset)) / VIS;
  const abs = Math.min(Math.abs(t), 1);
  const angle = t * (Math.PI / 2) * 0.88;
  const rx = w * 0.46;
  const rz = Math.min(w, h) * 0.4;
  const tip = 18 + abs * 6;
  const yaw = -angle * (180 / Math.PI) * 0.85;
  let opacity = 0.62 + (1 - abs) * 0.38;
  if (Math.abs(offset) === VIS) opacity *= 0.72;
  if (seam) opacity = 0;

  return {
    width: `${Math.max(42, (w / Math.max(N - 2, 1)) * (1.15 - abs * 0.24)).toFixed(2)}px`,
    opacity,
    zIndex: seam ? 0 : Math.round(40 + (1 - abs) * 40 + (isActive ? 20 : 0)),
    seam,
    transform: [
      `translate3d(calc(-50% + ${(Math.sin(angle) * rx).toFixed(2)}px), calc(-50% + ${(abs * abs * h * -0.06 + h * 0.04).toFixed(2)}px), ${(Math.cos(angle) * rz - rz).toFixed(1)}px)`,
      ` rotateX(${tip.toFixed(2)}deg) rotateY(${yaw.toFixed(2)}deg)`,
      ` scale(${(isActive ? 1.08 : 1 - abs * 0.1).toFixed(3)})`,
    ].join(""),
  };
}

export default function ImageCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [size, setSize] = useState({ w: 1280, h: 640 });
  const [wrapping, setWrapping] = useState<Set<number>>(new Set());
  const stageRef = useRef<HTMLDivElement>(null);
  const swipeX = useRef<number | null>(null);
  const prevOff = useRef(people.map((_, i) => wrapOffset(i, 0)));

  const move = (d: number) => setActive((a) => (a + d + N) % N);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.max(r.width, 320), h: Math.max(r.height, 360) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => move(1), 4800);
    return () => clearInterval(id);
  }, [active, paused]);

  // Seam jump: skip CSS transition so cards don't fly across the orbit
  useEffect(() => {
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
  }, [active]);

  const [name, role] = people[active];

  return (
    <div
      className="carousel-stage"
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Team portraits in orbit"
      tabIndex={0}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          move(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          move(1);
        }
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") swipeX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (e.pointerType !== "touch" || swipeX.current === null) return;
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
          const style = orbit(offset, size.w, size.h, isActive);
          const isWrap = wrapping.has(i);
          const cls = [
            "carousel-card",
            isActive && "active",
            (style.seam || isWrap) && "is-seam",
            isWrap && "no-transition",
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
              tabIndex={style.seam || Math.abs(offset) > VIS ? -1 : 0}
              onClick={() => {
                if (!style.seam) setActive(i);
              }}
              style={{
                width: style.width,
                opacity: isWrap ? 0 : style.opacity,
                zIndex: style.zIndex,
                transform: style.transform,
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
