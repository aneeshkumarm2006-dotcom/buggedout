"use client";

import { useRef } from "react";

// Signature events — horizontal scroll carousel with neon arrows (concept).
const SLIDES: [string, string][] = [
  ["three-door-monty", "Three Door Monty"],
  ["tunnel-vision", "Tunnel Vision"],
  ["chicken-shit-bingo-1", "Chicken Shit Bingo"],
  ["forked-fate-1", "Forked Fate"],
  ["lane-racing-1", "Lane Racing"],
];

const SCROLL = 400;

export default function EventsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const nudge = (dir: number) =>
    trackRef.current?.scrollBy({ left: dir * SCROLL, behavior: "smooth" });

  return (
    <section className="events-section" id="events">
      <div className="section-title">
        <span className="line" />
        <h2>Signature Events</h2>
        <span className="line" />
      </div>

      <div className="events-wrapper">
        <button
          className="carousel-arrow prev"
          aria-label="Previous events"
          onClick={() => nudge(-1)}
        >
          ❮
        </button>

        <div className="events-frame">
          <div className="events-carousel" ref={trackRef}>
            {SLIDES.map(([slug, name]) => (
              <div className="event-slide" key={slug}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/assets/concept/events/${slug}.png`} alt={name} />
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-arrow next"
          aria-label="Next events"
          onClick={() => nudge(1)}
        >
          ❯
        </button>
      </div>
    </section>
  );
}
