import type { Metadata } from "next";
import Analytics from "@/app/components/Analytics";
import MotionLayer from "@/app/components/MotionLayer";
import ProjectStories from "@/app/components/ProjectStories";
import SiteChrome from "@/app/components/SiteChrome";
import { siteIdentity } from "@/src/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "CodeAux project case studies and work proof.",
  alternates: { canonical: "/projects" },
};

const projectNavigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
] as const;

export default function ProjectsPage() {
  return (
    <>
      <Analytics />
      <MotionLayer />
      <SiteChrome
        navItems={projectNavigation}
        homeHref="/"
        contactHref="/#contact"
        auditHref="/#audit"
        bookingUrl={process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null}
        whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
        whatsappMessage={siteIdentity.whatsappMessage}
      />
      <main>
        <ProjectStories />
      </main>
    </>
  );
}
