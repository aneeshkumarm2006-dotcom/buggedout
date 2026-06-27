"use client";

import { useEffect, useRef, useState } from "react";
import { EVENTS, EVENT_TYPES, type EventType } from "@/lib/events";
import EventCard from "@/components/EventCard";

type Filter = "all" | EventType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...EVENT_TYPES.map((t) => ({ value: t as Filter, label: t })),
];

export default function EventsLobby() {
  const [filter, setFilter] = useState<Filter>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const list = filter === "all" ? EVENTS : EVENTS.filter((g) => g.type === filter);

  // The grid container carries key={filter}, so changing the filter remounts
  // the whole grid (and its cards). Each card mounts hidden (.reveal, opacity 0);
  // we add .in on the next frame so the fade-in transition plays — and because
  // the cards are freshly mounted, React won't clobber the imperative class on a
  // later render. Mirrors the original renderLobby → observeReveals behavior.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll(".reveal:not(.in)"));
    const raf = requestAnimationFrame(() =>
      cards.forEach((c) => c.classList.add("in")),
    );
    return () => cancelAnimationFrame(raf);
  }, [filter]);

  return (
    <>
      <div className="filter-bar" id="filterBar">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`filter-pill${filter === f.value ? " active" : ""}`}
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <section className="section section-glow" style={{ paddingTop: "var(--space-4)" }}>
        <div className="wrap">
          <div className="grid-events" id="lobbyEvents" ref={gridRef} key={filter}>
            {list.map((g, i) => (
              <EventCard key={g.slug} event={g} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
