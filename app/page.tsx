import Image from "next/image";
import Script from "next/script";
import { headers } from "next/headers";
import Analytics from "@/app/components/Analytics";
import BeforeAfter from "@/app/components/BeforeAfter";
import ConnectsProgress from "@/app/components/ConnectsProgress";
import { ConversionSection } from "@/app/components/ConversionSection";
import MotionLayer, { Magnetic, Reveal } from "@/app/components/MotionLayer";
import SiteChrome from "@/app/components/SiteChrome";
import {
  capabilities,
  leadGenerationSteps,
  navigation,
  pricing,
  primaryService,
  problems,
  projects,
  siteIdentity,
  videoProof,
  whyCodeAuxPillars,
} from "@/src/data/site";
import { getRequestSiteUrl } from "@/src/lib/site-url";

const projectArtLabels = {
  interface: ["Message", "Hierarchy", "Action"],
  editorial: ["Positioning", "Proof", "Enquiry"],
  conversion: ["Attention", "Trust", "Conversion"],
} as const;

function getWhatsappHref() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

  if (!number || !/^\d{8,15}$/.test(number)) {
    return null;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(
    siteIdentity.whatsappMessage,
  )}`;
}

function getContactEmailHref() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

  return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? `mailto:${email}`
    : null;
}

export default async function Home() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null;
  const bookingHref = bookingUrl || "#contact";
  const whatsappHref = getWhatsappHref();
  const contactEmailHref = getContactEmailHref();
  const secondaryHref = whatsappHref || "#audit";
  const leadCaptureAvailable = Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY,
  );
  const siteUrl = getRequestSiteUrl(await headers());
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteIdentity.name,
      url: siteUrl,
      description: siteIdentity.positioning,
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: siteIdentity.name,
      url: siteUrl,
      description: siteIdentity.positioning,
      areaServed: ["India", "International"],
      serviceType: [
        "Website design",
        "Website development",
        "Conversion-focused website strategy",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteIdentity.name,
      url: siteUrl,
      description: siteIdentity.tagline,
    },
  ];

  return (
    <>
      <Analytics />
      <MotionLayer />
      <SiteChrome
        navItems={navigation}
        bookingUrl={bookingUrl}
        whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
        whatsappMessage={siteIdentity.whatsappMessage}
      />

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <Reveal delay={0.06} distance={24}>
              <h1>
                We build
                <br />
                websites
                <br />
                that increase
                <br />
                <em>
                  leads <span className="hero-heading-and">and</span> presence
                </em>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="hero-intro">
                We combine lead generation strategy, custom design and code
                that runs smoothly to help businesses improve their online
                visibility, build trust and turn visits into meaningful action.
              </p>
              <div className="hero-actions">
                <Magnetic>
                  <a
                    className="button button-primary"
                    href={bookingHref}
                    data-analytics-event="book_call_click"
                    data-analytics-placement="hero"
                    {...(bookingUrl
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    Book a Call <span aria-hidden="true">↗</span>
                  </a>
                </Magnetic>
                <a
                  className="button button-secondary"
                  href={secondaryHref}
                  data-analytics-event={
                    whatsappHref
                      ? "whatsapp_click"
                      : "website_audit_click"
                  }
                  data-analytics-placement="hero"
                  {...(whatsappHref
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {whatsappHref ? "WhatsApp Us" : "Get a Free Audit"}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal className="hero-system" delay={0.16} distance={16}>
            <div className="system-topline">
              <span>CODEAUX / CONVERSION SYSTEM</span>
              <span>LIVE</span>
            </div>
            <div
              className="system-canvas"
              aria-label="A website conversion system from attention to action"
            >
              <div className="system-card card-message">
                <span>01 / MESSAGE</span>
                <strong>Make the value clear.</strong>
                <i />
                <i />
              </div>
              <div className="system-card card-proof">
                <span>02 / PROOF</span>
                <strong>Give people a reason to trust.</strong>
                <div className="proof-bars">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="conversion-rail" aria-hidden="true">
                <span className="rail-node rail-node-one" />
                <span className="rail-node rail-node-two" />
                <span className="rail-node rail-node-three" />
                <span className="rail-node rail-node-four" />
              </div>
              <div className="rail-labels" aria-hidden="true">
                <span>Attention</span>
                <span>Clarity</span>
                <span>Trust</span>
                <span>Action</span>
              </div>
              <div className="system-action">
                <span>THE NEXT STEP IS OBVIOUS</span>
                <strong>Start a conversation</strong>
                <b aria-hidden="true">↗</b>
              </div>
            </div>
            <div className="system-footer">
              <span>Business before technology</span>
              <span>01—04</span>
            </div>
          </Reveal>
        </section>

        <section className="credibility-strip" aria-label="Capabilities">
          <div className="credibility-strip__viewport">
            <div className="credibility-strip__track">
              {[false, true].map((isDuplicate) => (
                <div
                  className="credibility-strip__group"
                  aria-hidden={isDuplicate || undefined}
                  key={isDuplicate ? "duplicate" : "primary"}
                >
                  {capabilities.map((capability) => (
                    <span key={capability}>
                      <i aria-hidden="true" />
                      {capability}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="problem-section section-pad">
          <div className="section-index">
            <span>01</span>
            <span>The business problem</span>
          </div>
          <Reveal className="problem-heading">
            <p className="section-kicker">Beautiful isn&apos;t enough.</p>
            <h2>
              Your website shouldn&apos;t just exist.{" "}
              <em>It should work for your business.</em>
            </h2>
          </Reveal>
          <div className="problem-grid">
            <div className="problem-statement">
              <p>
                A website can look finished and still leak opportunity. The
                symptoms are usually visible in what customers cannot
                understand, trust or do.
              </p>
              <ConnectsProgress />
            </div>
            <ol className="diagnosis-list">
              {problems.slice(0, 6).map((problem, index) => (
                <li key={problem.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{problem.statement}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="work-section section-pad" id="work">
          <div className="section-index">
            <span>02</span>
            <span>Selected work system</span>
          </div>
          <Reveal className="work-heading section-heading">
            <p className="section-kicker">Proof belongs in the foreground</p>
            <h2>
              Large stories. Little noise.{" "}
              <em>Real evidence goes here.</em>
            </h2>
            <p>
              The complete showcase is ready for verified screenshots and
              outcomes. Every current slot is intentionally marked as demo
              content.
            </p>
          </Reveal>

          <div className="project-stack">
            {projects.map((project, index) => {
              const placeholder = project.status === "placeholder";
              const labels = placeholder
                ? projectArtLabels[project.artDirection]
                : ["Problem", "Strategy", "Result"];
              const image = placeholder ? null : project.projectImage;

              return (
                <article
                  className="project-story"
                  key={project.id}
                  data-analytics-event="portfolio_interaction"
                  data-analytics-project={project.id}
                >
                  <div className="project-meta">
                    <p>PROJECT / {String(index + 1).padStart(2, "0")}</p>
                    <h3>
                      {placeholder ? `Project slot 0${index + 1}` : project.title}
                    </h3>
                    <span>
                      {placeholder
                        ? "Awaiting verified client content"
                        : project.category}
                    </span>
                  </div>
                  <div
                    className={`project-media project-media--${
                      placeholder ? project.artDirection : "published"
                    }`}
                  >
                    {image ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 900px) 100vw, 76vw"
                      />
                    ) : (
                      <div className="project-placeholder-art" aria-hidden="true">
                        <div className="placeholder-window">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="placeholder-copy">
                          <strong>{labels[0]}</strong>
                          <i />
                          <i />
                        </div>
                        <div className="placeholder-path">
                          {labels.map((label) => (
                            <span key={label}>{label}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {placeholder ? (
                      <p className="demo-label">
                        Demo content · Replace before public launch
                      </p>
                    ) : null}
                  </div>
                  <div className="project-outcome">
                    <span>OUTCOME</span>
                    <p>
                      {placeholder
                        ? "Verified project outcome will be added here."
                        : project.shortOutcome}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="section-index">
            <span>03</span>
            <span>What we build</span>
          </div>
          <div className="primary-service">
            <Reveal className="primary-service__intro">
              <p className="section-kicker">{primaryService.eyebrow}</p>
              <h2>{primaryService.title}</h2>
              <p>{primaryService.description}</p>
            </Reveal>
            <div className="service-system">
              <div className="discovery-panel">
                <p>{primaryService.discoveryTitle}</p>
                <ol>
                  {primaryService.discoveryPoints.map((point, index) => (
                    <li key={point}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {point}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

        </section>

        <section className="why-section section-pad">
          <div className="section-index">
            <span>04</span>
            <span>How we think</span>
          </div>
          <Reveal className="section-heading why-heading">
            <p className="section-kicker">Why CodeAux</p>
            <h2>
              The standard is simple:{" "}
              <em>every decision needs a reason.</em>
            </h2>
          </Reveal>
          <div className="principle-grid">
            {whyCodeAuxPillars.map((pillar, index) => (
              <article key={pillar.id}>
                <span>0{index + 1}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lead-generation section-pad">
          <div className="section-index">
            <span>05</span>
            <span>The conversion path</span>
          </div>
          <Reveal className="section-heading conversion-heading">
            <p className="section-kicker">Better opportunities to convert</p>
            <h2>
              More clarity. Less friction.{" "}
              <em>A stronger path to action.</em>
            </h2>
            <p>
              Design cannot guarantee leads. It can make the path toward an
              enquiry dramatically clearer, faster and easier to trust.
            </p>
          </Reveal>
          <div className="conversion-path">
            {leadGenerationSteps.slice(0, 5).map((step, index) => (
              <article key={step.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
          <div className="conversion-details">
            {leadGenerationSteps.slice(5).map((step) => (
              <span key={step.id}>{step.title}</span>
            ))}
          </div>
        </section>

        <section className="proof-section section-pad">
          <div className="section-index">
            <span>06</span>
            <span>Work proof</span>
          </div>
          <Reveal className="section-heading proof-heading">
            <p className="section-kicker">Show, then tell</p>
            <h2>
              Proof should be seen,{" "}
              <em>not manufactured.</em>
            </h2>
            <p>
              These media and review cards are fully built and clearly labeled
              until verified client videos and words replace them.
            </p>
          </Reveal>
          <div className="video-proof-grid">
            {videoProof.map((proof, index) => {
              const poster = proof.poster;

              return (
                <article className="video-proof-card" key={proof.id}>
                  <div className="video-proof-card__media">
                    {proof.status === "placeholder" ? (
                      <>
                        <Image
                          src={poster.src}
                          alt={poster.alt}
                          fill
                          sizes="(max-width: 760px) 90vw, 33vw"
                        />
                        <div className="video-slot-mark">
                          <span aria-hidden="true">▶</span>
                          <p>VIDEO SLOT</p>
                        </div>
                      </>
                    ) : (
                      <video
                        controls
                        preload="metadata"
                        poster={poster.src}
                        aria-label={proof.title}
                        aria-describedby={`video-transcript-${proof.id}`}
                      >
                        <source src={proof.videoSrc} />
                        <track
                          kind="captions"
                          src={proof.captionsSrc}
                          srcLang="en"
                          label="English captions"
                          default
                        />
                        Your browser does not support embedded video.
                      </video>
                    )}
                    {proof.status === "placeholder" ? (
                      <span className="demo-label">
                        Demo media · 0{index + 1}
                      </span>
                    ) : null}
                  </div>
                  <div className="video-proof-card__review">
                    <span>REVIEW TEXT</span>
                    <blockquote>
                      “
                      {proof.status === "placeholder"
                        ? proof.reviewPlaceholder
                        : proof.quote}
                      ”
                    </blockquote>
                    <p>
                      {proof.status === "placeholder"
                        ? "Verified name · Business · Role"
                        : `${proof.clientName} · ${proof.business} · ${proof.role}`}
                    </p>
                    {proof.status === "published" ? (
                      <details>
                        <summary>Video transcript</summary>
                        <p id={`video-transcript-${proof.id}`}>
                          {proof.transcript}
                        </p>
                      </details>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="comparison-block">
            <div className="comparison-copy">
              <p className="section-kicker">Before / After system</p>
              <h3>Show the transformation, not just a change of color.</h3>
              <p>
                Drag or use the arrow keys to test the comparison interaction.
                Both images are demo media and make no client claim.
              </p>
            </div>
            <BeforeAfter
              demo
              label="Compare two demo proof images"
              before={{
                src: "/proof-concrete.jpg",
                alt: "Demo before image showing monochrome concrete geometry",
                objectPosition: "50% 50%",
              }}
              after={{
                src: "/proof-blue-glass.jpg",
                alt: "Demo after image showing blue-lit glass architecture",
                objectPosition: "50% 44%",
              }}
              beforeLabel="Before demo"
              afterLabel="After demo"
            />
          </div>
        </section>



        <section className="pricing-section section-pad">
          <div className="section-index">
            <span>08</span>
            <span>Engagement</span>
          </div>
          <Reveal className="section-heading pricing-heading">
            <p className="section-kicker">Website projects from ₹50,000</p>
            <h2>
              Enough investment to{" "}
              <em>do the work properly.</em>
            </h2>
          </Reveal>
          <div className="pricing-grid">
            {pricing.map((option, index) => (
              <article key={option.id}>
                <span>0{index + 1}</span>
                <h3>{option.title}</h3>
                <strong>{option.price.label}</strong>
                <p>{option.description}</p>
                <a href="#contact">
                  Request a quote <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="unified-cta-section section-pad">
          <Reveal className="unified-cta-intro">
            <span className="eyebrow">
              <span aria-hidden="true" /> START A CONVERSATION
            </span>
            <h2>Ready to build a website that works for your business?</h2>
            <p>Start a conversation directly, or send us your requirements and we'll get back to you.</p>
          </Reveal>
          <ConversionSection
            whatsappHref={whatsappHref}
            contactEmailHref={contactEmailHref}
            phoneNumber={process.env.NEXT_PUBLIC_CONTACT_PHONE}
            available={leadCaptureAvailable}
          />
        </section>

      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <a className="wordmark" href="#top" aria-label="Back to the top of the CodeAux website">
            <Image
              className="site-logo site-logo--footer"
              src="/codeaux-logo.png"
              alt="CodeAux logo"
              width={112}
              height={112}
            />
            <span className="footer-wordmark-text">
              <span className="footer-wordmark-code">Code</span><span className="footer-wordmark-aux">Aux</span>
            </span>
          </a>
          <p>
            Conversion-focused websites built to turn attention into leads,
            bookings, and sales.
          </p>
        </div>
        <div className="footer-content">
          <nav className="footer-group footer-navigation" aria-label="Footer navigation">
            <p className="footer-label">Navigate</p>
            <a href="#top">Home</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#audit">Free Audit</a>
          </nav>
          {whatsappHref || contactEmailHref ? (
            <div className="footer-group footer-contact">
              <p className="footer-label">Contact</p>
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-event="whatsapp_click"
                  data-analytics-placement="footer"
                >
                  WhatsApp
                </a>
              ) : null}
              {contactEmailHref ? <a href={contactEmailHref}>Email</a> : null}
            </div>
          ) : null}
          <div className="footer-group footer-project">
            <p className="footer-label">Start a project</p>
            <p className="footer-project__prompt">
              Not sure what&apos;s holding your website back?
            </p>
            <a
              className="footer-audit-cta"
              href="#audit"
              data-analytics-event="website_audit_click"
              data-analytics-placement="footer"
            >
              Get a Free Website Audit <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 CodeAux</span>
          <span>Built around business outcomes.</span>
          <a className="footer-back-to-top" href="#top" aria-label="Back to top">
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>

      <Script
        id="codeaux-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\u003c"),
        }}
      />
    </>
  );
}
