import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EVENTS, getEvent, getMoreEvents } from "@/lib/events";
import EventCard from "@/components/EventCard";
import SignupButton from "@/components/SignupButton";
import LiveStats from "@/components/LiveStats";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return EVENTS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) {
    return { title: "Event not found — BuggedOut.com" };
  }
  return {
    title: `${event.name} — ${event.meta} | BuggedOut.com`,
    description: event.tagline,
    openGraph: {
      title: `${event.name} — BuggedOut.com`,
      description: event.tagline,
      images: [{ url: event.image }],
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const more = getMoreEvents(slug, 4);

  return (
    <>
      <div
        className="event-hero"
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className="event-hero-content">
          <span
            className={`badge ${event.type === "Race" ? "badge-gold" : "badge-acid"}`}
          >
            {event.meta}
          </span>
          <h1 className="display">{event.name}</h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "var(--text-lg)",
              maxWidth: "60ch",
              margin: "0 auto var(--space-4)",
            }}
          >
            {event.intro}
          </p>
          <SignupButton className="btn btn-primary btn-lg">
            <span className="shimmer" />
            Get Notified
          </SignupButton>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="event-info">
            <div>
              <h2>How It Works</h2>
              <div className="steps">
                {event.how.map((step, i) => (
                  <div className="step" key={step.h}>
                    <span className="num">{i + 1}</span>
                    <div>
                      <h3 className="step-h">{step.h}</h3>
                      <p>{step.p}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="vibe-note hud-panel">
                <span className="eyebrow">Expect chaos</span>
                <p>{event.vibe}</p>
              </div>

              <div className="lineup-chips">
                <span className="chips-label">In the arena</span>
                <div className="chips">
                  {event.lineup.map((l) => (
                    <span className="chip" key={l}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="stats-card hud-panel hud-corners">
              <h3>This Round</h3>
              <LiveStats format={event.format} type={event.type} score={event.score} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-header" style={{ marginBottom: "var(--space-5)" }}>
            <h2 className="display" style={{ fontSize: "var(--text-2xl)" }}>
              More Events
            </h2>
          </div>
          <div className="more-row">
            {more.map((g, i) => (
              <EventCard key={g.slug} event={g} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
