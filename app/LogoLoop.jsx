"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./LogoLoop.css";

// ponytail: horizontal node marquee only
const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

export default function LogoLoop({
  logos,
  speed = 120,
  logoHeight = 28,
  gap = 32,
  hoverSpeed = 0,
  scaleOnHover = false,
  ariaLabel = "Partner logos",
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);
  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef(null);
  const lastTs = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  const measure = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect()?.width ?? 0;
    if (sequenceWidth <= 0) return;
    setSeqWidth(Math.ceil(sequenceWidth));
    setCopyCount(Math.max(MIN_COPIES, Math.ceil(containerWidth / sequenceWidth) + COPY_HEADROOM));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const seq = seqRef.current;
    if (!container) return;
    measure();
    if (!window.ResizeObserver) {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    if (seq) ro.observe(seq);
    return () => ro.disconnect();
  }, [measure, logos, gap, logoHeight]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (timestamp) => {
      if (lastTs.current === null) lastTs.current = timestamp;
      const dt = Math.max(0, timestamp - lastTs.current) / 1000;
      lastTs.current = timestamp;
      const target = isHovered ? hoverSpeed : Math.abs(speed);
      velocityRef.current += (target - velocityRef.current) * (1 - Math.exp(-dt / SMOOTH_TAU));

      if (seqWidth > 0) {
        const next = ((offsetRef.current + velocityRef.current * dt) % seqWidth + seqWidth) % seqWidth;
        offsetRef.current = next;
        track.style.transform = `translate3d(${-next}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTs.current = null;
    };
  }, [speed, seqWidth, isHovered, hoverSpeed]);

  return (
    <div
      ref={containerRef}
      className={`logoloop${scaleOnHover ? " logoloop--scale-hover" : ""}`}
      style={{
        width: "100%",
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
      }}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="logoloop__list"
            key={copyIndex}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, i) => (
              <li className="logoloop__item" key={`${copyIndex}-${i}`}>
                <span className="logoloop__node">{item.node}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
