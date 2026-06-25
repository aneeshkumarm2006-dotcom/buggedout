import type { Metadata } from "next";
import GamesLobby from "@/components/GamesLobby";
import { ROUTES } from "@/lib/copy";

export const metadata: Metadata = {
  title: ROUTES.games.title,
  description: ROUTES.games.description,
};

export default function GamesPage() {
  return (
    <>
      <div className="page-top">
        <span className="eyebrow">{ROUTES.games.eyebrow}</span>
        <h1 className="display">{ROUTES.games.h1}</h1>
        <p className="sub">{ROUTES.games.sub}</p>
      </div>
      <GamesLobby />
    </>
  );
}
