/**
 * Hero artwork — the BuggedOut arena render.
 *
 * Art-directed with <picture>: the portrait intro render on narrow screens,
 * the horizontal render everywhere else. Both are pre-optimized WebP in
 * /public/assets, so they load without the image optimizer (this is the LCP
 * image — we want it eager and cheap).
 */
export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <picture>
        <source media="(max-width: 768px)" srcSet="/assets/hero-vertical.webp" />
        <img
          src="/assets/hero-horizontal.webp"
          width={1675}
          height={939}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  );
}
