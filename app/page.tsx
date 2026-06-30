import Link from "next/link";
import { EVENTS } from "@/lib/events";
import { HOME } from "@/lib/copy";
import EventCard from "@/components/EventCard";
import CountUpStat from "@/components/CountUpStat";
import SignupButton from "@/components/SignupButton";
import CtaBanner from "@/components/CtaBanner";

// Deterministic 45–99 "chaos rating" per athlete (stable across SSR/CSR).
function chaosRating(name: string): number {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return 45 + (sum % 55);
}

export default function HomePage() {
  const last = HOME.heroTitleLines.length - 1;
  const homeEvents = EVENTS.slice(0, 6);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="kicker hero-eye reveal">Live Animal Racing · Est. Now</span>
              <h1 className="glitch reveal">
                {HOME.heroTitleLines.map((line, i) =>
                  i === last ? (
                    <span className="gold" data-text={line} key={line}>
                      {line}
                    </span>
                  ) : (
                    <span key={line}>{line}</span>
                  ),
                )}
              </h1>
              <p className="hero-sub reveal">{HOME.heroSubhead}</p>
              <div className="hero-cta reveal">
                <SignupButton className="btn btn-primary btn-lg">
                  <span className="shimmer" />
                  Get Updates
                </SignupButton>
                <Link href="/events" className="btn btn-ghost-gold btn-lg">
                  Enter The Arena
                </Link>
              </div>
              <div className="hero-mini reveal">
                {HOME.stats.slice(0, 3).map((s) => (
                  <div className="m" key={s.label}>
                    <b>{s.value}</b>
                    <span>{s.label.split(",")[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="monitor reveal" aria-label="Live arena feed">
              <div className="monitor-bar">
                <span>FEED // ARENA_07</span>
                <span className="live-tag"><span className="dot" />REC</span>
              </div>
              <div className="monitor-screen">
                <span className="monitor-tag live-tag"><span className="dot" />Live</span>
                <picture>
                  <source media="(max-width: 768px)" srcSet="/assets/hero-vertical.webp" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/hero-horizontal.webp"
                    width={1675}
                    height={939}
                    alt="BuggedOut live arena — the animal lineup at the start line"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
                <div className="monitor-read">
                  <span>CH.07</span>
                  <span>◉ 47,210 WATCHING</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* event marquee */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-row">
            {[...EVENTS, ...EVENTS].map((g, i) => (
              <span key={`${g.slug}-${i}`}>
                <b>{g.name}</b>
                <span className="x">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STAT HUD ============ */}
      <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)", paddingBottom: "clamp(40px,5vw,64px)" }}>
        <div className="wrap">
          <div className="stathud">
            {HOME.stats.map((s, i) => (
              <div className="stat reveal" key={s.label}>
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <CountUpStat value={s.value} />
                <span className="lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MANIFESTO ============ */}
      <section className="section">
        <div className="wrap">
          <div className="mani clip-hud reveal">
            <div className="mani-grid" aria-hidden="true" />
            <div className="mani-inner">
              <span className="kicker">{HOME.manifesto.eyebrow}</span>
              <h2>
                The Sport The World Has <span className="hl-m">Never Seen.</span>
              </h2>
              <p className="mani-lead">{HOME.manifesto.lead}</p>
              <div className="mani-pts">
                {HOME.manifesto.points.map((pt, i) => (
                  <div className="mpt" key={pt.h}>
                    <span className="n">[ {String(i + 1).padStart(2, "0")} ]</span>
                    <h3>{pt.h}</h3>
                    <p>{pt.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE ARENA ============ */}
      <section className="section section-glow" id="events">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">The Arena · 08 Channels</span>
            <h2>Pick Your <span className="hl-c">Poison.</span></h2>
            <p>Eight live events, each with its own brand of mayhem. Real animals, real-time, results in seconds.</p>
          </div>
          <div className="grid-events" id="homeEvents">
            {homeEvents.map((g, i) => (
              <EventCard key={g.slug} event={g} index={i} />
            ))}
          </div>
          <div className="sec-foot">
            <Link href="/events" className="btn btn-ghost">
              View All 8 Events ▸
            </Link>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">Protocol</span>
            <h2>How It <span className="hl-c">Works.</span></h2>
            <p>From cold open to photo finish in four moves.</p>
          </div>
          <div className="flow">
            {HOME.howItWorks.map((step, i) => (
              <div className="step reveal" key={step.h}>
                <div className="node">{String(i + 1).padStart(2, "0")}</div>
                <h3>{step.h}</h3>
                <p>{step.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE LINEUP ============ */}
      <section className="section section-glow" id="lineup">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">Roster · Select Your Fighter</span>
            <h2>The <span className="hl-m">Lineup.</span></h2>
            <p>Your athletes. None of them asked for this.</p>
          </div>
          <div className="roster">
            {HOME.lineup.map((a, i) => {
              const rating = chaosRating(a.name);
              return (
                <div className="fighter reveal" key={a.name} style={{ transitionDelay: `${(i % 4) * 0.05}s` }}>
                  <span className="fid">F-{String(i + 1).padStart(2, "0")}</span>
                  <div className="fname">{a.name}</div>
                  <p className="ftrait">{a.trait}</p>
                  <div className="fbar"><i style={{ width: `${rating}%` }} /></div>
                  <div className="fstat"><span>Chaos</span><span>{rating}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WINNER SHOWCASE ============ */}
      <section className="winner-band">
        <div className="winner-inner">
          <div className="winner-copy reveal">
            <span className="kicker">{HOME.winner.eyebrow}</span>
            <h2>We Have A <em>Winner.</em></h2>
            <p>{HOME.winner.p}</p>
            <SignupButton className="btn btn-gold btn-lg">
              <span className="shimmer" />
              Join The List
            </SignupButton>
          </div>
          <div className="winner-frame brackets reveal">
            <div className="winner-screen">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="winner-feed"
                src="/assets/hero-horizontal.webp"
                width={1675}
                height={939}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <span className="winner-feed-glow" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="winner-art"
                src="/assets/hud-winner.webp"
                width={1400}
                height={781}
                alt="BuggedOut WINNER results screen"
                loading="lazy"
              />
            </div>
            <span className="winner-badge">WINNER · 8×</span>
          </div>
        </div>
      </section>

      {/* ============ WHY ============ */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">System Specs</span>
            <h2>Why <span className="hl-c">BuggedOut.</span></h2>
            <p>It&apos;s not a simulation. It&apos;s the future of spectator sport.</p>
          </div>
          <div className="mani-pts">
            {HOME.why.map((w, i) => (
              <div className="mpt reveal" key={w.h}>
                <span className="n">[ {String(i + 1).padStart(2, "0")} ]</span>
                <h3>{w.h}</h3>
                <p>{w.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <CtaBanner />
    </>
  );
}
