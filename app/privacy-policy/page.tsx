import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | BuggedOut",
  description:
    "How BuggedOut collects, uses, and protects the information you provide when using our website.",
};

// Reproduces the live /privacy-policy.html document: its own minimal header
// (logo + Back), the glass policy card, and the exact policy copy + inline
// styles. The live site links an empty style.css, so it renders with no page
// background; we add the dark canvas those inline styles were designed for.
const CSS = `
.policy-shell{
  min-height:100vh;
  overflow:hidden; /* contain the .policy-page margin so no light body bg leaks below */
  font-family:Arial,Helvetica,sans-serif;
  color:#fff;
  background-color:#0a0a0f;
  background-image:
    radial-gradient(60% 45% at 85% 0%, rgba(24,251,255,.10), transparent 60%),
    radial-gradient(70% 50% at 12% 4%, rgba(255,122,24,.14), transparent 62%);
  background-repeat:no-repeat;
}
.policy-nav{
  display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:18px clamp(16px,4vw,40px);
  border-bottom:1px solid rgba(255,255,255,.08);
}
.policy-logo{height:46px;width:auto;display:block}
.policy-back{
  font-weight:700;letter-spacing:2px;text-transform:uppercase;font-size:.85rem;
  color:#fff;background:#000;padding:12px 22px;border-radius:10px;
  border:1px solid rgba(255,255,255,.12);transition:.25s ease;
}
.policy-back:hover{color:#ff7a18;border-color:rgba(255,122,24,.5)}
.policy-page{max-width:900px;margin:56px auto 80px;padding:0 20px}
.policy-card{
  background:rgba(255,255,255,.05);
  backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  border:1px solid rgba(255,255,255,.08);border-radius:22px;padding:40px;
  box-shadow:0 0 12px rgba(255,122,24,.15),0 0 30px rgba(255,122,24,.08);
}
.policy-card h1{font-size:2rem;color:#fff1a6;margin-bottom:10px}
.policy-card .updated{color:rgba(255,255,255,.55);margin-bottom:35px;font-size:.9rem}
.policy-card h2{margin-top:32px;margin-bottom:10px;color:#ffb16b;font-size:1.2rem}
.policy-card p{line-height:1.8;color:rgba(255,255,255,.82)}
.policy-card ul{margin:15px 0 20px 22px;line-height:1.8;color:rgba(255,255,255,.82)}
.policy-card a{color:#ff7a18}
`;

export default function PrivacyPolicyPage() {
  return (
    <div className="policy-shell">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <header className="policy-nav">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/fast_fun_free.webp"
          alt="BuggedOut"
          className="policy-logo"
        />
        <Link href="/" className="policy-back">
          Back
        </Link>
      </header>

      <main className="policy-page" id="main-content">
        <div className="policy-card">
          <h1>Privacy Policy</h1>

          <p className="updated">Last Updated: July 1, 2026</p>

          <p>
            BuggedOut (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
            respects your privacy. This Privacy Policy explains how we collect,
            use, and protect the information you provide when using our website.
          </p>

          <h2>Information We Collect</h2>

          <p>When you sign up, we may collect:</p>

          <ul>
            <li>Email address</li>
            <li>Information you voluntarily provide</li>
            <li>
              Technical information such as browser type and device information
            </li>
          </ul>

          <h2>How We Use Your Information</h2>

          <p>Your information may be used to:</p>

          <ul>
            <li>Send event announcements</li>
            <li>Notify you about competitions and updates</li>
            <li>Improve our website and services</li>
            <li>Respond to support requests</li>
          </ul>

          <h2>Marketing Emails</h2>

          <p>
            By signing up, you agree to receive emails from BuggedOut. You may
            unsubscribe at any time using the unsubscribe link included in every
            email.
          </p>

          <h2>Data Security</h2>

          <p>
            We implement reasonable safeguards to protect your personal
            information. However, no method of electronic transmission or storage
            is completely secure.
          </p>

          <h2>Third-Party Services</h2>

          <p>
            We may use trusted third-party providers to operate our website,
            manage email communications, and analyze website traffic.
          </p>

          <h2>Your Rights</h2>

          <p>
            Depending on your location, you may have the right to request access,
            correction, or deletion of your personal information.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have questions regarding this Privacy Policy, please contact us
            at:
          </p>

          <p>
            <strong>support@buggedout.com</strong>
          </p>
        </div>
      </main>
    </div>
  );
}
