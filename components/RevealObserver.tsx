"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ports the original scroll-reveal behavior: elements with `.reveal` /
 * `.reveal-divider` fade/wipe in as they enter the viewport. Re-runs on every
 * route change (the component lives in the root layout) so freshly-mounted page
 * content is observed. A 400ms safety net reveals anything the observer misses.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("in");
    const els = Array.from(
      document.querySelectorAll(".reveal:not(.in), .reveal-divider:not(.in)"),
    );
    if (els.length === 0) return;

    // Honor reduced-motion: reveal everything at once, skip the scroll animation.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => io.observe(el));
    const safety = window.setTimeout(() => els.forEach(reveal), 400);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [pathname]);

  return null;
}
