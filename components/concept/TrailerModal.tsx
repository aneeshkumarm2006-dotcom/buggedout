"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Trailer thumbnail button + fullscreen video modal (matches live behavior).
// Plays site/public/trailor.mp4 — drop the clip in at that exact path/name.
export default function TrailerModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // globals.css gives <main> `position:relative;z-index:2`, which makes it a
  // stacking context — a modal rendered inside it can never paint above the
  // fixed navbar (z-index 1000) or mobile menu (2000) no matter how high its
  // own z-index is. Portalling to <body> puts it in the root stacking context.
  useEffect(() => setMounted(true), []);

  const openModal = () => {
    setOpen(true);
    videoRef.current?.play().catch(() => {});
  };
  const closeModal = () => {
    setOpen(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <>
      <section className="trailer-section" id="trailer">
        <button
          className="trailer-button"
          aria-label="Watch Trailer"
          onClick={openModal}
        >
          <picture>
            <source
              media="(min-width: 992px)"
              srcSet="/images/trlr-glass.webp"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/trlr-glass.webp"
              alt="Watch Trailer"
              className="trailer-image"
            />
            <div className="play-overlay">▶</div>
          </picture>
        </button>
      </section>

      {mounted &&
        createPortal(
          <div
            className={`video-modal${open ? " active" : ""}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div className="video-container">
              <button
                className="close-video"
                aria-label="Close trailer"
                onClick={closeModal}
              >
                ×
              </button>
              {/* No poster: the trailer thumbnail is 16:9 but the clip is 9:16,
                  so a poster would snap aspect ratio once metadata loads. */}
              <video ref={videoRef} controls playsInline preload="metadata">
                <source src="/trailor.mp4" type="video/mp4" />
              </video>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
