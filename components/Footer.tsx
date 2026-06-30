import Link from "next/link";
import { IconX, IconInstagram, IconYouTube, IconDiscord } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo" aria-label="BuggedOut.com — home">
              <span className="brand">
                <span className="b1">BUGGED</span>
                <span className="b2">OUT</span>
              </span>
            </Link>
            <p className="footer-tag">
              Real animals. Real races. Real chaos. The arena never closes.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="brand-logo"
              src="/assets/logo.webp"
              width={640}
              height={346}
              alt="BuggedOut.com"
            />
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <Link href="/">Home</Link>
            <Link href="/events">Events</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>System</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Cookies Policy</a>
          </div>
          <div className="footer-col">
            <h4>Signal</h4>
            <div className="footer-social">
              <a href="#" aria-label="BuggedOut on X">
                <IconX />
              </a>
              <a href="#" aria-label="BuggedOut on Instagram">
                <IconInstagram />
              </a>
              <a href="#" aria-label="BuggedOut on YouTube">
                <IconYouTube />
              </a>
              <a href="#" aria-label="BuggedOut on Discord">
                <IconDiscord />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 BuggedOut.com — All rights reserved</span>
          <span>// The animals never asked for this</span>
        </div>
      </div>
    </footer>
  );
}
