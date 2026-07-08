import TrailerModal from "@/components/concept/TrailerModal";
import EventsCarousel from "@/components/concept/EventsCarousel";
import SignupForm from "@/components/concept/SignupForm";

export default function HomePage() {
  return (
    <div className="bo-home">
      {/* ============ HERO ============ */}
      <section className="hero">
        <picture>
          <source
            media="(min-width: 992px)"
            srcSet="/assets/concept/hero-desk.webp"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/concept/hero-mob-nosoon.png"
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
            <img
              src="/assets/concept/fast_fun_free_impossible.png"
              alt="Fast. Fun. Free. Impossible to predict."
            />
          </div>
          <div className="gallery-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/concept/1mili.png"
              alt="Opportunity to win up to $1,000,000"
            />
          </div>
        </div>
      </section>

      {/* ============ PRIZE (mobile) ============ */}
      <section className="prize-section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/concept/one-mili.png"
          alt="Win up to one million dollars"
          className="prize-banner"
        />
      </section>

      {/* ============ ABOUT ============ */}
      <section className="about-section" id="about">
        <div className="about-content">
          <h2 className="about-heading">Where Instinct Meets Competition</h2>
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
            <img src="/assets/concept/features/TV.png" alt="Watch Live" />
          </div>
          <h3 className="glow-blue">Watch Live</h3>
          <p>Tune in to weekly live events packed with action, chaos and surprises.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/concept/features/clipboard.png"
              alt="Make Your Picks"
            />
          </div>
          <h3 className="glow-yellow">Make Your Picks</h3>
          <p>Predict the winners. It&apos;s free and easy.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/concept/features/cup.png" alt="Climb the Rankings" />
          </div>
          <h3 className="glow-red">Climb the Rankings</h3>
          <p>
            Earn points, climb the leaderboard, and prove you&apos;ve got the best
            instincts.
          </p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/concept/features/crown.png" alt="Win Big" />
          </div>
          <h3 className="glow-ice">
            Win <span className="highlight-yellow">Big</span>
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
              src="/assets/concept/fastfunflecha.webp"
              alt=""
              className="sticker-image"
              aria-hidden="true"
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
