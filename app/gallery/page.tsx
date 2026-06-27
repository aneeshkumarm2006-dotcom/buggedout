import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import { ROUTES } from "@/lib/copy";

export const metadata: Metadata = {
  title: ROUTES.gallery.title,
  description: ROUTES.gallery.description,
};

export default function GalleryPage() {
  return (
    <>
      <div className="page-top">
        <span className="eyebrow">{ROUTES.gallery.eyebrow}</span>
        <h1 className="display">{ROUTES.gallery.h1}</h1>
        <p className="sub">{ROUTES.gallery.sub}</p>
      </div>
      <section className="section" style={{ paddingTop: "var(--space-6)" }}>
        <div className="wrap">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
