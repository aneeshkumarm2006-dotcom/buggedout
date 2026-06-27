import Link from "next/link";
import { type Event } from "@/lib/events";

interface EventCardProps {
  event: Event;
  index?: number;
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
  return (
    <article
      className="event-card reveal"
      style={{ transitionDelay: `${(index % 6) * 0.06}s` }}
    >
      <Link href={`/events/${event.slug}`} aria-label={`Open ${event.name}`}>
        <div
          className="event-card-img"
          style={
            event.blur
              ? { backgroundImage: `url(${event.blur})`, backgroundSize: "cover" }
              : undefined
          }
        >
          <span className="event-card-type">{event.type}</span>
          {/* Pre-optimized WebP arena art; the parent shows a blur-up while it loads. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            loading="lazy"
            decoding="async"
            src={event.image}
            width={event.w}
            height={event.h}
            alt={`${event.name} arena card`}
          />
        </div>
      </Link>
      <div className="race-divider race-divider--card" />
      <div className="event-card-body">
        <h3>{event.name}</h3>
        <span className="meta">{event.meta}</span>
        <p className="desc">{event.tagline}</p>
        <Link href={`/events/${event.slug}`} className="play">
          View Event →
        </Link>
      </div>
    </article>
  );
}
