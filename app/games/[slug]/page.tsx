import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GAMES, getGame, getMoreGames } from "@/lib/games";
import GameCard from "@/components/GameCard";
import SignupButton from "@/components/SignupButton";
import LiveStats from "@/components/LiveStats";

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GAMES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) {
    return { title: "Game not found — BuggedOut.com" };
  }
  return {
    title: `${game.name} — ${game.meta} | BuggedOut.com`,
    description: game.tagline,
    openGraph: {
      title: `${game.name} — BuggedOut.com`,
      description: game.tagline,
      images: [{ url: game.image }],
    },
  };
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const more = getMoreGames(slug, 4);

  return (
    <>
      <div
        className="game-hero"
        style={{ backgroundImage: `url(${game.image})` }}
      >
        <div className="game-hero-content">
          <span
            className={`badge ${game.type === "Race" ? "badge-gold" : "badge-acid"}`}
          >
            {game.meta}
          </span>
          <h1 className="display">{game.name}</h1>
          <p
            style={{
              color: "var(--color-fog)",
              fontSize: "var(--text-lg)",
              maxWidth: "60ch",
              margin: "0 auto var(--space-4)",
            }}
          >
            {game.intro}
          </p>
          <SignupButton className="btn btn-primary btn-lg">
            <span className="shimmer" />
            Play Now
          </SignupButton>
        </div>
      </div>

      <div className="race-divider race-divider--strong" />

      <section className="section">
        <div className="wrap">
          <div className="game-info">
            <div>
              <h2>How To Play</h2>
              <div className="steps">
                {game.how.map((step, i) => (
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
                <p>{game.vibe}</p>
              </div>

              <div className="lineup-chips">
                <span className="chips-label">In the arena</span>
                <div className="chips">
                  {game.lineup.map((l) => (
                    <span className="chip" key={l}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="stats-card hud-panel">
              <h3>This Round</h3>
              <LiveStats format={game.format} type={game.type} payout={game.payout} />
            </div>
          </div>
        </div>
      </section>

      <div className="race-divider" />

      <section className="section">
        <div className="wrap">
          <div className="section-header" style={{ marginBottom: "var(--space-5)" }}>
            <h2 className="display" style={{ fontSize: "var(--text-2xl)" }}>
              More Games
            </h2>
          </div>
          <div className="more-row">
            {more.map((g, i) => (
              <GameCard key={g.slug} game={g} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
