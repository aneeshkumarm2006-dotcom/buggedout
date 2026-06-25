"use client";

import { useEffect, useRef, useState } from "react";
import { GALLERY } from "@/lib/games";
import { useScrollLock } from "@/lib/useScrollLock";

interface ActiveImage {
  src: string;
  alt: string;
}

export default function GalleryGrid() {
  const [active, setActive] = useState<ActiveImage | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const openLightbox = (src: string, alt: string, trigger: HTMLElement) => {
    lastFocus.current = trigger;
    setActive({ src, alt });
  };
  const closeLightbox = () => setActive(null);

  useScrollLock(!!active);

  // While the lightbox is open: focus the close button, trap focus on it,
  // Escape to close, and restore focus to the thumbnail on close.
  useEffect(() => {
    if (!active) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
      } else if (e.key === "Tab") {
        // The close button is the only focusable element in the lightbox.
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lastFocus.current?.focus();
    };
  }, [active]);

  return (
    <>
      <div className="masonry" id="galleryGrid">
        {GALLERY.map((tile) => (
          <figure
            key={tile.src}
            role="button"
            tabIndex={0}
            aria-label={`Open image: ${tile.alt}`}
            style={
              tile.blur
                ? { backgroundImage: `url(${tile.blur})`, backgroundSize: "cover" }
                : undefined
            }
            onClick={(e) => openLightbox(tile.src, tile.alt, e.currentTarget)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(tile.src, tile.alt, e.currentTarget);
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              loading="lazy"
              decoding="async"
              src={tile.src}
              width={tile.w}
              height={tile.h}
              alt={tile.alt}
            />
            <figcaption>{tile.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div
        className={`lightbox${active ? " open" : ""}`}
        id="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={active ? active.alt : undefined}
        inert={!active}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
      >
        <button
          ref={closeBtnRef}
          className="lightbox-close"
          aria-label="Close image"
          onClick={closeLightbox}
        >
          ×
        </button>
        {active && (
          // eslint-disable-next-line @next/next/no-img-element
          <img id="lightboxImg" src={active.src} alt={active.alt} />
        )}
      </div>
    </>
  );
}
