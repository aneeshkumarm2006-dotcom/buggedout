"use client";

import { useEffect, useState } from "react";
import SignupButton from "@/components/SignupButton";

interface LiveStatsProps {
  format: string;
  type: string;
  payout: string;
}

/**
 * Random "live" figures are generated on the client after mount so server and
 * client render the same initial markup (no hydration mismatch).
 */
export default function LiveStats({ format, type, payout }: LiveStatsProps) {
  const [online, setOnline] = useState<number | null>(null);
  const [rounds, setRounds] = useState<number | null>(null);

  useEffect(() => {
    // Randomized "live" figures are computed on mount (client-only) so the
    // server and first client render match — setting them here, rather than in
    // a lazy initializer, is what keeps the markup hydration-safe.
    /* eslint-disable react-hooks/set-state-in-effect */
    setOnline(80 + Math.floor(Math.random() * 180));
    setRounds(20 + Math.floor(Math.random() * 40));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  return (
    <>
      <div className="stat-row">
        <span className="label">Players Online</span>
        <span className="val live">{online ?? "—"}</span>
      </div>
      <div className="stat-row">
        <span className="label">Rounds Today</span>
        <span className="val muted">{rounds ?? "—"}</span>
      </div>
      <div className="stat-row">
        <span className="label">Format</span>
        <span className="val muted">{format}</span>
      </div>
      <div className="stat-row">
        <span className="label">Type</span>
        <span className="val muted">{type}</span>
      </div>
      <div className="stat-row" style={{ borderBottom: "none" }}>
        <span className="label">Top Payout</span>
        <span className="val gold">{payout}</span>
      </div>
      <SignupButton className="btn btn-primary btn-block">
        <span className="shimmer" />
        Join Game
      </SignupButton>
    </>
  );
}
