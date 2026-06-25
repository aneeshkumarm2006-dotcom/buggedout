import Link from "next/link";
import { type Game } from "@/lib/games";

interface GameCardProps {
  game: Game;
  index?: number;
}

export default function GameCard({ game, index = 0 }: GameCardProps) {
  return (
    <article
      className="game-card reveal"
      style={{ transitionDelay: `${(index % 6) * 0.06}s` }}
    >
      <Link href={`/games/${game.slug}`} aria-label={`Open ${game.name}`}>
        <div
          className="game-card-img"
          style={
            game.blur
              ? { backgroundImage: `url(${game.blur})`, backgroundSize: "cover" }
              : undefined
          }
        >
          <span className="game-card-type">{game.type}</span>
          {/* Pre-optimized WebP arena art; the parent shows a blur-up while it loads. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            loading="lazy"
            decoding="async"
            src={game.image}
            width={game.w}
            height={game.h}
            alt={`${game.name} arena card`}
          />
        </div>
      </Link>
      <div className="race-divider race-divider--card" />
      <div className="game-card-body">
        <h3>
          {game.emoji} {game.name}
        </h3>
        <span className="meta">{game.meta}</span>
        <p className="desc">{game.tagline}</p>
        <Link href={`/games/${game.slug}`} className="play">
          Play Now →
        </Link>
      </div>
    </article>
  );
}
