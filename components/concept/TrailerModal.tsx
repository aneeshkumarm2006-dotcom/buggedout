"use client";

import { useRef, useState } from "react";

// Trailer thumbnail button + fullscreen video modal (concept behavior).
// Drop the real trailer at /public/assets/concept/trailer.mp4.
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
              srcSet="/assets/concept/trlr-glass.png"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/concept/trlr-glass.png"
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
            <source src="/assets/concept/trailer.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}
