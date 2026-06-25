import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { ROUTES } from "@/lib/copy";

export const metadata: Metadata = {
  title: ROUTES.contact.title,
  description: ROUTES.contact.description,
};

export default function ContactPage() {
  return (
    <>
      <div className="page-top">
        <span className="eyebrow">{ROUTES.contact.eyebrow}</span>
        <h1 className="display">{ROUTES.contact.h1}</h1>
        <p className="sub">{ROUTES.contact.sub}</p>
      </div>
      <div className="race-divider reveal-divider" />
      <section className="section" style={{ paddingTop: "var(--space-8)" }}>
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="label">Questions?</span>
              <p>
                Stuck on the rules, chasing a payout, or want to put BuggedOut in
                front of your audience? Drop a line and a real human on the crew
                gets back to you fast.
              </p>
              <span className="label">Reach Us</span>
              <div className="links">
                <a href="mailto:hello@buggedout.com">✉ hello@buggedout.com</a>
                <a href="#">✦ @buggedout</a>
                <a href="#">▶ youtube.com/buggedout</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
