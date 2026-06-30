"use client";

import { useEffect, useRef } from "react";

/**
 * "Glitch Arrow" custom cursor. Three stacked arrows (accent / gold / amber)
 * produce a chromatic-split jitter; the head flips to gold over interactive
 * elements. All styling lives in globals.css — this only wires up movement.
 *
 * Activates only on a fine pointer (touch keeps the native cursor), hides
 * itself over text fields so the native caret shows, and respects
 * prefers-reduced-motion (the jitter is gated in CSS). Listeners attach at the
 * document level and persist across client navigations since the component
 * lives in the root layout.
 */

// Elements that trigger the gold "lock" state.
const HIT =
  'a,button,[role="button"],summary,label,select,.btn,.filter-pill,.ev,.fighter,.gallery-grid figure';
// Text inputs — hide the arrow here so the native I-beam shows.
const TEXT = 'input,textarea,[contenteditable="true"]';
const ARROW = "M3,2 L3,21 L8,16 L11,22 L14,21 L11,15 L18,15 Z";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer:fine)").matches) return; // touch → native cursor

    const root = document.documentElement;
    root.classList.add("gc-on");

    const onMove = (e: PointerEvent) => {
      el.style.transform = `translate(${e.clientX - 3}px,${e.clientY - 2}px)`; // tip = hotspot
      const t = e.target as Element | null;
      const within = (sel: string) => !!(t && t.closest && t.closest(sel));
      if (within(TEXT)) {
        el.classList.remove("gc-show", "gc-hot"); // reveal the native caret
        return;
      }
      el.classList.add("gc-show");
      el.classList.toggle("gc-hot", within(HIT));
    };
    const hide = () => el.classList.remove("gc-show");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      root.classList.remove("gc-on");
    };
  }, []);

  return (
    <div id="gc-cursor" ref={ref} aria-hidden="true">
      <svg className="gc-c" viewBox="0 0 26 26"><path className="gc-a" d={ARROW} /></svg>
      <svg className="gc-m" viewBox="0 0 26 26"><path className="gc-a" d={ARROW} /></svg>
      <svg className="gc-v" viewBox="0 0 26 26"><path className="gc-a" d={ARROW} /></svg>
    </div>
  );
}
