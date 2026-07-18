"use client";

import { useEffect, useRef, useState } from "react";

/** One-shot reveal when the element enters the viewport. */
export function useInViewOnce(rootMargin = "0px 0px -80px") {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.IntersectionObserver) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      obs.disconnect();
    }, { rootMargin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return [ref, visible] as const;
}
