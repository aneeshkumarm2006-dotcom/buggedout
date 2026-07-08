import type { Metadata } from "next";
import TrailerModal from "@/components/concept/TrailerModal";
import EventsCarousel from "@/components/concept/EventsCarousel";
import SignupForm from "@/components/concept/SignupForm";

// Live home is titled simply "BuggedOut".
export const metadata: Metadata = { title: "BuggedOut" };

export default function HomePage() {
  return (
    <div className="bo-home">
      {/* ============ HERO ============ */}
      <section className="hero">
        <picture>
          <source
            media="(min-width: 992px)"
            srcSet="/images/hero-mob-nosoon.webp"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-mob-nosoon.webp"
            alt="BuggedOut Hero"
            className="hero-image"
          />
        </picture>
      </section>

      {/* ============ TRAILER + MODAL ============ */}
      <TrailerModal />

      {/* ============ GALLERY (desktop) ============ */}
      <section className="gallery-section">
        <div className="gallery-grid">
          <div className="gallery-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/fast_fun_free_impossible.webp" alt="Image 1" />
          </div>
          <div className="gallery-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/one-milli-desk.png" alt="Image 2" />
          </div>
        </div>
      </section>

      {/* ============ PRIZE (mobile) ============ */}
      <section className="prize-section">
        <picture>
          <source media="(min-width: 992px)" srcSet="/images/1mili-desktop.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/one-mili.webp"
            alt="Win up to one million dollars"
            className="prize-banner"
          />
        </picture>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="about-section" id="about">
        <div className="about-content">
          <h2 className="about-heading">WHERE INSTINCT MEETS COMPETITION</h2>
          <p className="about-text">
            BuggedOut is the world&apos;s first{" "}
            <strong>Critters and Things Event Promotion</strong>, bringing
            together outrageous live events, unpredictable animal competitions,
            and free-to-play predictions in one unforgettable experience.
          </p>
          <p className="about-text">
            Every show features custom-designed events, live commentary, season
            rankings, and championship stakes. Watch the action unfold, lock in
            your picks, climb the leaderboard, and earn your place in the
            BuggedOut Championship for a chance to compete for prizes of up to{" "}
            <span className="highlight-yellow">$1,000,000.</span>
          </p>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="features-section" id="features">
        <div className="feature">
          <div className="feature-icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/features/TV.webp" alt="Watch Live" />
          </div>
          <h3 className="glow-blue">WATCH LIVE</h3>
          <p>Tune in to weekly live events packed with action, chaos and surprises.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/features/clipboard.webp" alt="Make Your Picks" />
          </div>
          <h3 className="glow-yellow">MAKE YOUR PICKS</h3>
          <p>Predict the winners. It&apos;s free and easy.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/features/cup.webp" alt="Climb the Rankings" />
          </div>
          <h3 className="glow-red">CLIMB THE RANKINGS</h3>
          <p>
            Earn points, climb the leaderboard, and prove you&apos;ve got the best
            instincts.
          </p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/features/crown.webp" alt="Win Big" />
          </div>
          <h3 className="glow-ice">
            WIN <span className="highlight-yellow">BIG</span>
          </h3>
          <p>
            Qualify for the Championship and compete for the ultimate prize of up
            to <span className="highlight-yellow">$1,000,000.</span>
          </p>
        </div>
      </section>

      {/* ============ SIGNATURE EVENTS ============ */}
      <EventsCarousel />

      {/* ============ SIGNUP ============ */}
      <section className="signup-section" id="signup">
        <div className="signup-content">
          <div className="events-sticker">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/fastfunflecha.webp"
              alt=""
              className="sticker-image"
              aria-hidden="true"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/win-up-to-inline.webp"
              alt="BuggedOut"
              className="signup-logo"
            />
          </div>
          <p className="signup-description">
            Sign up and be the first to know about events, announcements and epic
            moments.
          </p>
          <SignupForm />
        </div>
      </section>
    </div>
  );
}
