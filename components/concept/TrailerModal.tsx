"use client";

import { useRef, useState } from "react";

// Trailer thumbnail button + fullscreen video modal (matches live behavior).
// The live site references /videos/Buggedout_Full Events Video.mp4 (not deployed
// there); drop a real clip at site/public/videos/ to make the modal play.
export default function TrailerModal() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
          <video ref={videoRef} controls playsInline preload="metadata">
            {/* Matches the live site's reference; the source .mp4 is not
                deployed there either, so the modal opens with no playable clip. */}
            <source src="/videos/Buggedout_Full Events Video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}
