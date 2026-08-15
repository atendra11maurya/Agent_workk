import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="section-kicker">404 / Wrong turn</p>
      <h1>
        This page took a route that <em>doesn&apos;t convert.</em>
      </h1>
      <p>
        The page you requested does not exist. The useful path starts back at
        the CodeAux homepage.
      </p>
      <Link className="button button-primary" href="/">
        Return Home <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
