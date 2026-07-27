import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { ROUTES } from "@/lib/copy";
import { IconInstagram, IconMail } from "@/components/icons";

const INSTAGRAM_URL = "https://www.instagram.com/buggedoutevents";

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

      <section className="section" style={{ paddingTop: "var(--space-4)" }}>
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-side">
              {/* Instagram is where the crew actually lives — lead with it. */}
              <div className="hud-panel contact-social">
                <span className="eyebrow">Fastest reply</span>
                <h2>Slide into our DMs</h2>
                <p>
                  We&apos;re most active on Instagram. Send us a message there
                  for a quick answer, and follow along for event drops,
                  behind-the-scenes chaos and announcements before they land
                  anywhere else.
                </p>
                <a
                  className="btn btn-primary btn-block"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="shimmer" />
                  <IconInstagram width={20} height={20} />
                  Follow @buggedoutevents
                </a>
              </div>

              <div className="contact-info">
                <span className="label">Other ways to reach us</span>
                <div className="links">
                  <a href="mailto:hello@buggedout.com">
                    <IconMail /> hello@buggedout.com
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconInstagram /> @buggedoutevents
                  </a>
                </div>
                <p>
                  Every message goes to a real human on the crew — questions,
                  event enquiries, partnership pitches or straight-up feedback
                  on what we should do next. Expect a reply within two business
                  days.
                </p>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
