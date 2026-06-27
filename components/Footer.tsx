import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="race-divider race-divider--mid" />
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo" aria-label="BuggedOut.com — home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="brand-logo"
                src="/assets/logo.webp"
                width={640}
                height={346}
                alt="BuggedOut.com"
              />
            </Link>
            <p className="footer-tag">
              Real animals. Real races. Real chaos. The arena never closes.
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/events">Events</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Cookies Policy</a>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="footer-social">
              <a href="#" aria-label="X">
                ✦
              </a>
              <a href="#" aria-label="Instagram">
                ◎
              </a>
              <a href="#" aria-label="YouTube">
                ▶
              </a>
              <a href="#" aria-label="Discord">
                ✺
              </a>
            </div>
          </div>
        </div>
        <p className="footer-copy">
          Copyright © 2025 BuggedOut.com · All Rights Reserved · The animals
          never asked for this
        </p>
      </div>
    </footer>
  );
}
