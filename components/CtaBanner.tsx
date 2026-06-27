import Link from "next/link";
import { HOME } from "@/lib/copy";
import SignupButton from "@/components/SignupButton";

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="reveal">
        <h2 className="display">{HOME.cta.h}</h2>
        <p>{HOME.cta.p}</p>
        <div className="actions">
          <SignupButton className="btn btn-primary btn-lg">
            <span className="shimmer" />
            Join The List
          </SignupButton>
          <Link href="/events" className="btn btn-ghost-gold btn-lg">
            Browse Events
          </Link>
        </div>
      </div>
    </section>
  );
}
