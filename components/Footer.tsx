import Link from "next/link";

// Concept "1big navbar / white" footer — centered logo, nav, links, socials.
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/concept/letter-logo.png"
          alt="BuggedOut"
          className="footer-logo"
        />

        <nav className="footer-nav">
          <a href="/#trailer">Trailer</a>
          <a href="/#about">About</a>
          <a href="/#features">How It Works</a>
          <a href="/#events">Events</a>
        </nav>

        <div className="footer-links">
          <Link href="/contact">Contact</Link>
          <a href="#">Terms &amp; Conditions</a>
        </div>

        <div className="footer-social">
          <a href="#" aria-label="Instagram">
            <i className="fa-brands fa-instagram" />
          </a>
          <a href="#" aria-label="TikTok">
            <i className="fa-brands fa-tiktok" />
          </a>
          <a href="#" aria-label="YouTube">
            <i className="fa-brands fa-youtube" />
          </a>
          <a href="#" aria-label="X">
            <i className="fa-brands fa-x-twitter" />
          </a>
        </div>

        <p className="footer-copy">© 2026 BuggedOut. All rights reserved.</p>
      </div>
    </footer>
  );
}
