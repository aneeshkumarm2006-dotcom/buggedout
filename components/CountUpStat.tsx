"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Animated stat figure: counts every numeric group in `value` up from zero
 * when the stat scrolls into view. Handles the mixed formats used on the home
 * page — plain ("8"), grouped + suffix ("47,000+"), unit ("9s") and ratio
 * ("24/7") — by animating each number it finds while leaving the surrounding
 * text untouched.
 *
 * Hydration-safe: server and first client render both show the final value, so
 * no-JS users and crawlers see the real figure. On mount we reset to zero
 * (off-screen, below the hero) and run the count-up only once the element is
 * actually visible. Reduced-motion leaves the final value in place.
 */

type Segment =
  | { kind: "text"; text: string }
  | { kind: "num"; target: number; grouped: boolean; decimals: number };

// A number, optionally with thousands separators and a decimal part.
const NUM_RE = /\d[\d,]*(?:\.\d+)?/g;

function parse(value: string): Segment[] {
  const segments: Segment[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  NUM_RE.lastIndex = 0;
  while ((m = NUM_RE.exec(value)) !== null) {
    if (m.index > last) {
      segments.push({ kind: "text", text: value.slice(last, m.index) });
    }
    const raw = m[0];
    const numeric = raw.replace(/,/g, "");
    const dot = numeric.indexOf(".");
    segments.push({
      kind: "num",
      target: parseFloat(numeric),
      grouped: raw.includes(","),
      decimals: dot === -1 ? 0 : numeric.length - dot - 1,
    });
    last = NUM_RE.lastIndex;
  }
  if (last < value.length) {
    segments.push({ kind: "text", text: value.slice(last) });
  }
  return segments;
}

function frame(segments: Segment[], progress: number): string {
  return segments
    .map((seg) => {
      if (seg.kind === "text") return seg.text;
      const fixed = (seg.target * progress).toFixed(seg.decimals);
      if (!seg.grouped) return fixed;
      return parseFloat(fixed).toLocaleString("en-US", {
        minimumFractionDigits: seg.decimals,
        maximumFractionDigits: seg.decimals,
      });
    })
    .join("");
}

// Ease-out cubic: quick off the line, gentle settle onto the final number.
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUpStat({
  value,
  durationMs = 1600,
}: {
  value: string;
  durationMs?: number;
}) {
  const segments = useMemo(() => parse(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      return; // leave the final value in place
    }

    let raf = 0;
    let start = 0;
    let triggered = false;

    // Reset to zero before the band scrolls into view (it lives below the hero,
    // so this happens off-screen and never flashes over the final value).
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setDisplay(frame(segments, 0));

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / durationMs, 1);
      setDisplay(frame(segments, easeOut(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            raf = requestAnimationFrame(tick);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [segments, durationMs]);

  return (
    <span className="num" ref={ref}>
      {display}
    </span>
  );
}
