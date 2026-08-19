import type { Metadata } from "next";
import Analytics from "@/app/components/Analytics";
import MotionLayer from "@/app/components/MotionLayer";
import { CodeAuxSolution } from "@/app/components/CodeAuxSolution";
import SiteChrome from "@/app/components/SiteChrome";
import { siteIdentity } from "@/src/data/site";

export const metadata: Metadata = {
  title: "Research",
  description: "CodeAux design methodologies and conversion research.",
  alternates: { canonical: "/research" },
};

const researchNavigation = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
] as const;

export default function ResearchPage() {
  return (
    <>
      <Analytics />
      <MotionLayer />
      <SiteChrome
        navItems={researchNavigation}
        homeHref="/"
        contactHref="/#contact"
        auditHref="/#audit"
        bookingUrl={process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null}
        whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
        whatsappMessage={siteIdentity.whatsappMessage}
      />
      <main className="section-pad">
        <CodeAuxSolution />
      </main>
    </>
  );
}
