import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-top" style={{ minHeight: "70vh" }}>
      <span className="eyebrow">Error 404</span>
      <h1 className="display">Off The Track</h1>
      <p className="sub">
        This race doesn&apos;t exist — or it already crossed the line.
      </p>
      <div style={{ marginTop: "var(--space-5)" }}>
        <Link href="/" className="btn btn-primary">
          <span className="shimmer" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
