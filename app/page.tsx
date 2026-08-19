import Image from "next/image";
import Script from "next/script";
import { headers } from "next/headers";
import Analytics from "@/app/components/Analytics";
import BeforeAfter from "@/app/components/BeforeAfter";
import { CustomerProblems } from "@/app/components/CustomerProblems";
import { CodeAuxSolution } from "@/app/components/CodeAuxSolution";
import { ConversionSection } from "@/app/components/ConversionSection";
import { WhyUs } from "@/app/components/WhyUs";
import MotionLayer, { Magnetic, Reveal } from "@/app/components/MotionLayer";
import SiteChrome from "@/app/components/SiteChrome";
import {
  capabilities,
  navigation,
  pricing,
  siteIdentity,
  videoProof,
} from "@/src/data/site";
import { getRequestSiteUrl } from "@/src/lib/site-url";

function getWhatsappHref() {
  const rawNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "+918957003542";
  const number = rawNumber.replace(/\D/g, "");

  if (!number || !/^\d{8,15}$/.test(number)) {
    return `https://wa.me/918957003542?text=${encodeURIComponent(
      siteIdentity.whatsappMessage,
    )}`;
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
  const contactPhone =
    process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "+918957003542";
  const contactPhoneDigits = contactPhone.replace(/\D/g, "") || "918957003542";
  const callHref = `tel:${
    contactPhoneDigits.startsWith("91")
      ? `+${contactPhoneDigits}`
      : `+91${contactPhoneDigits}`
  }`;
  const leadCaptureAvailable = true;
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

        <CustomerProblems />

        <CodeAuxSolution />

        <section className="proof-section section-pad" id="work-proof">
          <div className="section-index">
            <span>03</span>
            <span>Work proof</span>
          </div>
          <Reveal className="section-heading proof-heading">
            <div className="proof-heading__copy">
              <p className="section-kicker">Show, then tell</p>
              <h2>
                Proof should be seen,{" "}
                <em>not manufactured.</em>
              </h2>
              <p>
                These media and review cards are fully built and clearly labeled
                until verified client videos and words replace them.
              </p>
            </div>
            <a className="proof-detail-link" href="/projects">
              <span>Know everything in detail</span>
              <span aria-hidden="true">→</span>
            </a>
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
                    <a
                      className="video-proof-card__link"
                      href="/projects"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Know more</span>
                      <span aria-hidden="true">→</span>
                    </a>
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
          <div className="proof-case-studies-cta">
            <a className="proof-detail-link" href="/projects">
              <span>View all case studies</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>



        <section id="contact" className="unified-cta-section section-pad">
          <Reveal className="unified-cta-intro">
            <span className="eyebrow">
              <span aria-hidden="true" /> START A CONVERSATION
            </span>
            <h2>
              Ready to build a website<br />
              <em>that works for your business?</em>
            </h2>
            <p>Start a conversation directly.</p>
          </Reveal>

          <Reveal className="massive-contact-buttons" delay={0.1}>
            <a 
              href={callHref} 
              className="massive-button massive-button--call"
              data-analytics-event="call_click"
              data-analytics-placement="massive_button"
            >
              <span className="massive-button-icon flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </span>
              Call Us: +91 89570 03542
            </a>
            <a 
              href={whatsappHref} 
              target="_blank" 
              rel="noreferrer" 
              className="massive-button massive-button--wa"
              data-analytics-event="whatsapp_click"
              data-analytics-placement="massive_button"
            >
              <span className="massive-button-icon flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
                </svg>
              </span>
              WhatsApp Inquiry
            </a>
          </Reveal>

          <Reveal delay={0.2} className="flex items-center w-full max-w-[960px] mx-auto mb-[24px] text-[#687281] text-[22px] font-bold tracking-[0.15em] uppercase">
            <div className="flex-1 border-b border-[#050608]/10" aria-hidden="true" />
            <span className="px-6">OR</span>
            <div className="flex-1 border-b border-[#050608]/10" aria-hidden="true" />
          </Reveal>

          <Reveal delay={0.3} className="text-center mb-[40px]">
            <p className="text-[clamp(16px,1.5vw,18px)] text-[#050608]/70 font-medium">
              Send us your requirements and we'll get back to you.
            </p>
          </Reveal>

          <ConversionSection
            whatsappHref={whatsappHref}
            contactEmailHref={contactEmailHref}
            phoneNumber={contactPhone}
            available={leadCaptureAvailable}
          />
        </section>

        <section className="pricing-section section-pad">
          <div className="section-index">
            <span>04</span>
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
              <article className={`pricing-grid__tier--${index + 1}`} key={option.id}>
                {"isMostComprehensive" in option && option.isMostComprehensive ? (
                  <span className="pricing-grid__comprehensive">
                    Most comprehensive
                  </span>
                ) : null}
                <div className="pricing-grid__meta">
                  <p className="pricing-grid__eyebrow">
                    <span>{option.eyebrow}</span>
                  </p>
                  <div
                    className="pricing-grid__scope-meter"
                    aria-label={`Scope level ${index + 1} of 3`}
                  >
                    {Array.from({ length: index + 1 }, (_, meterIndex) => (
                      <span aria-hidden="true" key={meterIndex} />
                    ))}
                  </div>
                </div>
                <h3>{option.title}</h3>
                <strong>{option.headline}</strong>
                <p>{option.description}</p>
                <p className="pricing-grid__best-for">
                  <span>Best for</span>
                  {option.bestFor}
                </p>
                <ul>
                  {option.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <div className="pricing-grid__cta">
                  <a href="#contact">
                    Request a Quote <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        
        <WhyUs />

      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <a className="wordmark" href="#top" aria-label="Back to the top of the CodeAux website">
            <Image
              className="site-logo site-logo--footer"
              src="/codeaux-logo.png"
              alt="CodeAux logo"
              width={64}
              height={64}
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
          
          <div className="footer-group footer-contact">
            <p className="footer-label">Contact</p>
            <a
              href={whatsappHref || "#contact"}
              target={whatsappHref ? "_blank" : undefined}
              rel={whatsappHref ? "noreferrer" : undefined}
            >
              WhatsApp
            </a>
            <a href={contactEmailHref || "mailto:hello@codeaux.com"}>Email</a>
            <a href={bookingHref || "#contact"}>Book a Call</a>
          </div>

          <div className="footer-group footer-project">
            <p className="footer-label">Start a project</p>
            <p className="footer-project__title">Have a project in mind?</p>
            <p className="footer-project__prompt">
              Let’s talk about what would actually move your business forward.
            </p>
            <a
              className="footer-primary-cta"
              href="#contact"
            >
              Start a Conversation <span aria-hidden="true">→</span>
            </a>
            <a
              className="footer-secondary-cta"
              href="#audit"
              data-analytics-event="website_audit_click"
              data-analytics-placement="footer"
            >
              Get a Free Website Audit <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© 2026 CODEAUX — BUILT AROUND BUSINESS OUTCOMES.</span>
          </div>
          <div className="footer-bottom-right">
            <a href="/privacy" className="footer-legal-link">Privacy</a>
            <a href="/terms" className="footer-legal-link">Terms</a>
            <a className="footer-back-to-top" href="#top" aria-label="Back to top">
              <span aria-hidden="true">↑</span>
            </a>
          </div>
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
