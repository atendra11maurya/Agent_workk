"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { analyticsEvents, track } from "@/src/lib/analytics";

export interface SiteNavigationItem {
  href: string;
  label: string;
}

export interface SiteChromeProps {
  auditHref?: string;
  bookingUrl?: string | null;
  className?: string;
  contactHref?: string;
  homeHref?: string;
  navItems?: readonly SiteNavigationItem[];
  whatsappMessage?: string;
  whatsappNumber?: string | null;
}

const DEFAULT_NAV_ITEMS: readonly SiteNavigationItem[] = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

const DEFAULT_WHATSAPP_MESSAGE =
  "Hi CodeAux team!\n\nI’m interested in a website / redesign for my business.\n\nMy goals:\n— Stronger credibility\n— Better customer experience\n— More inquiries & conversions\n— A more premium presence\n\nI’d like your recommendation on the right approach, scope, timeline & investment.\n\nLet me know when we can discuss the project.";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getExternalLinkProps(href: string) {
  return /^https?:\/\//i.test(href)
    ? { rel: "noreferrer", target: "_blank" as const }
    : {};
}

export function getSafeBookingHref(
  value: string | null | undefined,
  fallback: string,
) {
  const candidate = value?.trim();
  return candidate && /^(?:https?:\/\/|\/|#)/i.test(candidate)
    ? candidate
    : fallback;
}

export function getWhatsappHref(
  number?: string | null,
  message = DEFAULT_WHATSAPP_MESSAGE,
) {
  const rawNumber =
    number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+918957003542";
  const digits = rawNumber.replace(/\D/g, "");

  if (!/^\d{8,15}$/.test(digits)) {
    return `https://wa.me/918957003542?text=${encodeURIComponent(message)}`;
  }

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export default function SiteChrome({
  auditHref = "#audit",
  bookingUrl,
  className,
  contactHref = "#contact",
  homeHref = "#top",
  navItems = DEFAULT_NAV_ITEMS,
  whatsappMessage = DEFAULT_WHATSAPP_MESSAGE,
  whatsappNumber,
}: SiteChromeProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const bookingHref = getSafeBookingHref(bookingUrl, contactHref);
  const isBookingFallback = bookingHref === contactHref;
  const whatsappHref = getWhatsappHref(whatsappNumber, whatsappMessage);
  const secondaryHref = whatsappHref ?? auditHref;
  const secondaryLabel = whatsappHref ? "WhatsApp Us" : "Free Website Audit";

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 24);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 681px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const menu = menuRef.current;
    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = menu?.querySelectorAll<HTMLElement>(
      focusableSelector,
    );
    focusableElements?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menu) {
        return;
      }

      const items = Array.from(
        menu.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const firstItem = items[0];
      const lastItem = items.at(-1);

      if (!firstItem || !lastItem) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus({ preventScroll: true });
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const trackBookingClick = (placement: "header" | "mobile_menu") => {
    track(analyticsEvents.bookCallClick, {
      destination: isBookingFallback ? "contact" : "booking_provider",
      placement,
    });
  };

  const trackSecondaryClick = () => {
    track(
      whatsappHref
        ? analyticsEvents.whatsappClick
        : analyticsEvents.websiteAuditClick,
      { placement: "mobile_menu" },
    );
  };

  return (
    <header
      className={cx(
        "site-header site-chrome",
        isScrolled && "site-chrome--scrolled is-scrolled",
        isMenuOpen && "site-chrome--menu-open is-menu-open",
        className,
      )}
      data-menu-open={isMenuOpen ? "true" : "false"}
      data-scrolled={isScrolled ? "true" : "false"}
    >
      <div className="site-chrome__inner">
        <a
          className="site-chrome__wordmark wordmark"
          href={homeHref}
          aria-label="CodeAux home"
          onClick={closeMenu}
        >
          <Image
            className="site-logo site-logo--header"
            src="/codeaux-logo.png"
            alt="CodeAux logo"
            width={52}
            height={52}
            priority
          />
          <span className="header-wordmark-text">
            <span className="header-wordmark-code">Code</span><span className="header-wordmark-aux">Aux</span>
          </span>
        </a>

        <nav className="site-chrome__desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={`${item.href}-${item.label}`} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="site-chrome__booking nav-cta"
          href={bookingHref}
          onClick={() => trackBookingClick("header")}
          {...getExternalLinkProps(bookingHref)}
        >
          Book a Call
          <span aria-hidden="true">{isBookingFallback ? "↓" : "↗"}</span>
        </a>

        <button
          ref={menuButtonRef}
          className="site-chrome__menu-toggle"
          type="button"
          aria-controls={menuId}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {isMenuOpen ? (
        <div
          ref={menuRef}
          className="site-chrome__mobile-menu mobile-menu"
          id={menuId}
          role="dialog"
          aria-label="Site navigation"
          aria-modal="true"
        >
          <div className="mobile-menu__topline">
            <span aria-hidden="true">Navigation</span>
            <button
              className="mobile-menu__close"
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
            >
              <span aria-hidden="true">Close</span>
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav className="mobile-menu__links" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <a
                key={`${item.href}-${item.label}`}
                href={item.href}
                onClick={closeMenu}
              >
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mobile-menu__actions">
            <a
              className="button button-primary mobile-menu__primary"
              href={bookingHref}
              onClick={() => {
                trackBookingClick("mobile_menu");
                closeMenu();
              }}
              {...getExternalLinkProps(bookingHref)}
            >
              Book a Call
              <span aria-hidden="true">{isBookingFallback ? "↓" : "↗"}</span>
            </a>
            <a
              className="button button-secondary mobile-menu__secondary"
              href={secondaryHref}
              onClick={() => {
                trackSecondaryClick();
                closeMenu();
              }}
              {...getExternalLinkProps(secondaryHref)}
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
