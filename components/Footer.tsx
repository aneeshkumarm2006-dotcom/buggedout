import Link from "next/link";

// Concept "1big navbar / white" footer — centered logo, nav, links, socials.
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/letter-logo.webp"
          alt="BuggedOut"
          className="footer-logo"
        />

        <nav className="footer-nav">
          <a href="/#trailer">Trailer</a>
          <a href="/#about">About</a>
          <a href="/#features">How It Works</a>
          <a href="/#events">Events</a>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="footer-links">
          <Link href="/contact">Contact &amp; Feedback</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <a href="#">Terms &amp; Conditions</a>
        </div>

        <div className="footer-social">
          <a
            href="https://www.instagram.com/buggedoutevents"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram" />
          </a>
        </div>

        <p className="footer-copy">© 2026 BuggedOut. All rights reserved.</p>
      </div>
    </footer>
  );
}
