import Link from "next/link";
import { type Event } from "@/lib/events";

interface EventCardProps {
  event: Event;
  index?: number;
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
  const channel = String((index % 99) + 1).padStart(2, "0");

  return (
    <article
      className="ev reveal"
      style={{ transitionDelay: `${(index % 6) * 0.06}s` }}
    >
      <Link
        href={`/events/${event.slug}`}
        className="ev-img"
        aria-label={`Open ${event.name}`}
        style={
          event.blur
            ? { backgroundImage: `url(${event.blur})`, backgroundSize: "cover" }
            : undefined
        }
      >
        <span className="ev-type">{event.type}</span>
        <span className="ev-no">CH.{channel}</span>
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
      </Link>
      <div className="ev-body">
        <h3>{event.name}</h3>
        <span className="ev-meta">{event.meta}</span>
        <p className="ev-desc">{event.tagline}</p>
        <Link href={`/events/${event.slug}`} className="ev-go">
          Enter
        </Link>
      </div>
    </article>
  );
}
