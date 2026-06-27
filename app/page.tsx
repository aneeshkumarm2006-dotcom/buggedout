import Link from "next/link";
import { EVENTS } from "@/lib/events";
import { HOME } from "@/lib/copy";
import EventCard from "@/components/EventCard";
import HeroArt from "@/components/HeroArt";
import SignupButton from "@/components/SignupButton";
import CtaBanner from "@/components/CtaBanner";

export default function HomePage() {
  const titleLast = HOME.heroTitleLines.length - 1;

  return (
    <>
      {/* ============ HERO ============ */}
      <div className="hero">
        <div className="hero-glow" />
        <div className="hero-spotlight" />
        <HeroArt />
        <div className="hero-content">
          <span className="eyebrow reveal">{HOME.heroEyebrow}</span>
          <h1 className="display reveal">
            {HOME.heroTitleLines.map((line, i) => (
              <span key={line}>
                {i === titleLast ? <span className="gold">{line}</span> : line}
                {i < titleLast && <br />}
              </span>
            ))}
          </h1>
          <p className="subhead reveal">{HOME.heroSubhead}</p>
          <div className="hero-cta reveal">
            <SignupButton className="btn btn-primary btn-lg">
              <span className="shimmer" />
              Get Updates
            </SignupButton>
            <Link href="/events" className="btn btn-ghost-gold btn-lg">
              See The Events
            </Link>
          </div>
        </div>
        <div className="scroll-ind">⌄</div>
      </div>

      <div className="race-divider race-divider--strong reveal-divider" />

      {/* ============ STAT BAND ============ */}
      <section className="section" style={{ paddingTop: "var(--space-10)", paddingBottom: "var(--space-8)" }}>
        <div className="wrap">
          <div className="stat-band">
            {HOME.stats.map((s) => (
              <div className="stat reveal" key={s.label}>
                <span className="num">{s.value}</span>
                <span className="lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="race-divider reveal-divider" />

      {/* ============ MANIFESTO ============ */}
      <section className="section section-glow">
        <div className="wrap">
          <div className="section-header reveal">
            <span className="eyebrow">{HOME.manifesto.eyebrow}</span>
            <h2 className="display">
              The Sport The World Has <span className="gold">Never Seen.</span>
            </h2>
            <div className="divider-mini" />
            <p className="sub">{HOME.manifesto.lead}</p>
          </div>
          <div className="why-grid">
            {HOME.manifesto.points.map((pt) => (
              <div className="why-card hud-panel reveal" key={pt.h}>
                <h3>{pt.h}</h3>
                <p>{pt.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="race-divider reveal-divider" />

      {/* ============ LOBBY PREVIEW ============ */}
      <section className="section section-glow">
        <div className="wrap">
          <div className="section-header reveal">
            <h2 className="display">The <span className="gold">Arena</span></h2>
            <div className="divider-mini" />
            <p className="sub">Eight live events. Pick your poison.</p>
          </div>
          <div className="grid-events" id="homeEvents">
            {EVENTS.slice(0, 6).map((g, i) => (
              <EventCard key={g.slug} event={g} index={i} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
            <Link href="/events" className="btn btn-ghost">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      <div className="race-divider reveal-divider" />

      {/* ============ HOW IT WORKS ============ */}
      <section className="section">
        <div className="wrap">
          <div className="section-header reveal">
            <h2 className="display">How It <span className="gold">Works</span></h2>
            <div className="divider-mini" />
            <p className="sub">From cold open to photo finish in four moves.</p>
          </div>
          <div className="why-grid hiw-grid">
            {HOME.howItWorks.map((step, i) => (
              <div className="why-card hud-panel reveal" key={step.h}>
                <span className="hiw-num">{i + 1}</span>
                <h3>{step.h}</h3>
                <p>{step.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="race-divider reveal-divider" />

      {/* ============ THE LINEUP ============ */}
      <section className="section section-glow">
        <div className="wrap">
          <div className="section-header reveal">
            <h2 className="display">The <span className="gold">Lineup</span></h2>
            <div className="divider-mini" />
            <p className="sub">Your athletes. None of them asked for this.</p>
          </div>
          <div className="lineup-grid">
            {HOME.lineup.map((a, i) => (
              <div
                className="lineup-card reveal"
                key={a.name}
                style={{ transitionDelay: `${(i % 4) * 0.06}s` }}
              >
                <span className="nm">{a.name}</span>
                <span className="tr">{a.trait}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WINNER SHOWCASE ============ */}
      <div className="race-divider reveal-divider" />
      <section className="winner-band">
        <div className="checker-edge top" />
        <div className="winner-inner">
          <div className="winner-copy reveal">
            <span className="eyebrow">{HOME.winner.eyebrow}</span>
            <h2>{HOME.winner.h}</h2>
            <p>{HOME.winner.p}</p>
            <SignupButton className="btn btn-gold btn-lg">
              <span className="shimmer" />
              Join The List
            </SignupButton>
          </div>
          <div className="winner-frame reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hud-winner.webp"
              width={1400}
              height={781}
              alt="BuggedOut WINNER results screen"
              loading="lazy"
            />
            <div className="winner-fill">
              <span className="nm">Winner · 8×</span>
            </div>
          </div>
        </div>
        <div className="checker-edge bottom" />
      </section>

      {/* ============ WHY ============ */}
      <section className="section">
        <div className="wrap">
          <div className="section-header reveal">
            <h2 className="display">Why <span className="gold">BuggedOut</span></h2>
            <div className="divider-mini" />
            <p className="sub">It&apos;s not a simulation. It&apos;s the future of spectator sport.</p>
          </div>
          <div className="why-grid">
            {HOME.why.map((w) => (
              <div className="why-card hud-panel reveal" key={w.h}>
                <h3>{w.h}</h3>
                <p>{w.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="race-divider reveal-divider" />

      {/* ============ CTA ============ */}
      <CtaBanner />
    </>
  );
}
