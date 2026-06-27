import type { Metadata } from "next";
import EventsLobby from "@/components/EventsLobby";
import { ROUTES } from "@/lib/copy";

export const metadata: Metadata = {
  title: ROUTES.events.title,
  description: ROUTES.events.description,
};

export default function EventsPage() {
  return (
    <>
      <div className="page-top">
        <span className="eyebrow">{ROUTES.events.eyebrow}</span>
        <h1 className="display">{ROUTES.events.h1}</h1>
        <p className="sub">{ROUTES.events.sub}</p>
      </div>
      <EventsLobby />
    </>
  );
}
