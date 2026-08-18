import type {
  AdditionalService,
  LeadGenerationStep,
  NavigationItem,
  PricingOption,
  PrimaryService,
  PrinciplePillar,
  ProblemItem,
  ProjectRecord,
  PublishedProject,
  PublishedTestimonial,
  PublishedVideoProof,
  SocialLink,
  VideoProofRecord,
} from "../types/site";

export const siteIdentity = {
  name: "CodeAux",
  tagline: "Websites built to grow your revenue.",
  positioning: "Premium web development focused on conversion and lead generation.",
  primaryService: "Revenue-Focused Website Design & Development",
  primaryCta: "Book a Call",
  whatsappCta: "WhatsApp Us",
  whatsappMessage:
    "Hi CodeAux, I'm interested in discussing a website project.",
} as const;

export const navigation = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#work-proof" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly NavigationItem[];

export const capabilities = [
  "Strategy",
  "UI/UX",
  "Development",
  "Lead Generation",
  "SEO Foundations",
  "Performance",
  "Analytics",
] as const;

export const problems = [
  {
    id: "silent-exits",
    statement: "Visitors leave without contacting the business.",
  },
  {
    id: "unclear-value",
    statement: "The website does not immediately communicate its value.",
  },
  {
    id: "weak-mobile-experience",
    statement: "The mobile experience is difficult or frustrating to use.",
  },
  {
    id: "slow-pages",
    statement: "Slow pages create friction before the message can land.",
  },
  {
    id: "unclear-actions",
    statement: "Calls to action are unclear or easy to miss.",
  },
  {
    id: "credibility-gap",
    statement: "The business looks less credible than its competitors.",
  },
  {
    id: "missing-conversion-path",
    statement: "There is no clear path from visitor to lead.",
  },
  {
    id: "dated-design",
    statement: "Dated design weakens trust in the business behind it.",
  },
  {
    id: "traffic-without-enquiries",
    statement: "Website traffic is not turning into enquiries.",
  },
] as const satisfies readonly ProblemItem[];

export const primaryService = {
  id: "revenue-website",
  eyebrow: "Primary service",
  title: "Revenue-Focused Website Design & Development",
  description:
    "CodeAux starts with the commercial problem, then designs and develops a website around the people, decisions and actions that move the business forward.",
  discoveryTitle: "Before design or code, we understand:",
  discoveryPoints: ["The business", "Its customers", "Its goals", "The conversion path", "The offer", "Credibility gaps"],
  deliverables: ["Strategy", "Custom UI/UX", "Responsive development", "Mobile optimization", "Performance optimization", "SEO foundations", "Analytics setup", "Deployment", "Post-launch support", "Lead-generation improvement"],
} as const satisfies PrimaryService;

export const additionalServices = [
  { id: "website-redesign", title: "Website Redesign", description: "For companies with outdated or ineffective websites.", priority: "supporting" },
  { id: "landing-pages", title: "Landing Pages", description: "For advertising campaigns, launches and focused offers.", priority: "supporting" },
  { id: "e-commerce", title: "E-commerce", description: "For businesses selling online.", priority: "supporting" },
  { id: "portfolio-websites", title: "Portfolio Websites", description: "For professionals and personal brands.", priority: "supporting" },
  { id: "website-maintenance", title: "Website Maintenance", description: "For ongoing updates and technical support.", priority: "supporting" },
  { id: "seo-foundations", title: "SEO Foundations", description: "Technical and on-page foundations needed for discoverability.", priority: "supporting" },
  { id: "analytics-setup", title: "Analytics Setup", description: "Measurement for important website actions.", priority: "supporting" },
  { id: "hosting-deployment", title: "Hosting & Deployment", description: "Production setup and deployment.", priority: "supporting" },
] as const satisfies readonly AdditionalService[];

export const pricing = [
  {
    id: "professional-presence",
    eyebrow: "Essential",
    title: "Professional Presence",
    headline: "Look credible. Make the positive first impression.",
    description:
      "Premium websites for professionals and businesses that need a polished, trustworthy digital presence.",
    bestFor: "Professionals and small businesses",
    services: [
      "Landing pages & business websites",
      "Professional & personal portfolios",
      "Mobile-first premium design",
      "Fast, responsive development",
      "Clear messaging & strong credibility",
    ],
  },
  {
    id: "lead-driven-websites",
    eyebrow: "Growth",
    title: "Lead-Driven Websites",
    headline: "Turn your website into a customer-generation asset.",
    description:
      "Conversion-focused websites designed around getting more bookings, enquiries, leads and sales—not simply looking good.",
    bestFor: "Businesses seeking more customers",
    services: [
      "Conversion-focused UX & structure",
      "Lead and booking funnels",
      "Strategic calls-to-action",
      "Analytics & conversion tracking",
      "Performance and conversion optimization",
    ],
  },
  {
    id: "entire-growth-systems",
    eyebrow: "Business System",
    title: "Entire Growth Systems",
    headline: "Get more customers. Keep them longer. Sell them more.",
    description:
      "Beyond the website, we build digital systems that help businesses acquire customers, improve follow-ups, increase retention and generate more value from existing customers.",
    bestFor: "Businesses improving acquisition and retention.",
    isMostComprehensive: true,
    services: [
      "Customer acquisition systems",
      "CRM & lead management",
      "Automated follow-ups",
      "Customer retention systems",
      "Upselling & repeat-sales strategies",
      "Email & WhatsApp automation",
    ],
  },
] as const satisfies readonly PricingOption[];

export const whyCodeAuxPillars = [
  {
    id: "conversion-first",
    title: "Conversion First",
    description: "Every page should guide visitors toward meaningful action.",
  },
  {
    id: "business-before-technology",
    title: "Business Before Technology",
    description:
      "We understand the commercial problem before choosing technical solutions.",
  },
  {
    id: "design-builds-trust",
    title: "Design That Builds Trust",
    description:
      "A premium visual experience changes how customers perceive a business.",
  },
  {
    id: "performance-matters",
    title: "Performance Matters",
    description:
      "A beautiful website that loads slowly or fails on mobile is badly designed.",
  },
] as const satisfies readonly PrinciplePillar[];

export const leadGenerationSteps = [
  {
    id: "offer-communication",
    title: "Stronger offer communication",
    description: "Make the value of the offer easier to understand quickly.",
  },
  {
    id: "cta-placement",
    title: "Better CTA placement",
    description: "Put the next action where visitors naturally need it.",
  },
  {
    id: "mobile-experience",
    title: "Better mobile experience",
    description: "Remove friction for people browsing and enquiring on a phone.",
  },
  {
    id: "navigation",
    title: "Simpler navigation",
    description: "Help visitors find the information that moves a decision forward.",
  },
  {
    id: "hierarchy",
    title: "Clearer hierarchy",
    description: "Organize every page around what matters most to the customer.",
  },
  {
    id: "credibility",
    title: "Stronger credibility",
    description: "Use clear presentation and verified proof to build trust.",
  },
  {
    id: "performance",
    title: "Faster performance",
    description: "Reduce the delay between interest and action.",
  },
  {
    id: "reduced-friction",
    title: "Reduced friction",
    description: "Remove unnecessary decisions and obstacles from the journey.",
  },
  {
    id: "forms",
    title: "Better forms",
    description: "Ask only for the information needed to begin a conversation.",
  },
  {
    id: "measurement",
    title: "Intentional paths and analytics",
    description: "Measure the actions that reveal where the journey can improve.",
  },
] as const satisfies readonly LeadGenerationStep[];

const projectRequirements = [
  "verified-client-name",
  "verified-project-title",
  "project-category",
  "approved-project-image",
  "verified-problem",
  "verified-strategy",
  "verified-outcome",
  "verified-results",
  "live-url",
] as const;

export const projects: readonly ProjectRecord[] = [
  {
    status: "placeholder",
    id: "project-slot-1",
    slotLabel: "Project slot 01 — awaiting verified client content",
    reason: "awaiting-verified-content",
    visibility: "visible",
    artDirection: "interface",
    requiredContent: projectRequirements,
  },
  {
    status: "placeholder",
    id: "project-slot-2",
    slotLabel: "Project slot 02 — awaiting verified client content",
    reason: "awaiting-verified-content",
    visibility: "visible",
    artDirection: "conversion",
    requiredContent: projectRequirements,
  },
  {
    status: "placeholder",
    id: "project-slot-3",
    slotLabel: "Project slot 03 — awaiting verified client content",
    reason: "awaiting-verified-content",
    visibility: "visible",
    artDirection: "editorial",
    requiredContent: projectRequirements,
  },
  {
    status: "placeholder",
    id: "project-slot-4",
    slotLabel: "Project slot 04 — awaiting verified client content",
    reason: "awaiting-verified-content",
    visibility: "visible",
    artDirection: "interface",
    requiredContent: projectRequirements,
  },
  {
    status: "placeholder",
    id: "project-slot-5",
    slotLabel: "Project slot 05 — awaiting verified client content",
    reason: "awaiting-verified-content",
    visibility: "visible",
    artDirection: "conversion",
    requiredContent: projectRequirements,
  },
];

const videoProofRequirements = [
  "approved-video",
  "approved-poster",
  "verified-client-name",
  "verified-business-and-role",
  "verified-quote",
  "transcript",
  "publication-consent",
] as const;

export const videoProof: readonly VideoProofRecord[] = [
  {
    status: "placeholder",
    id: "video-proof-slot-1",
    slotLabel: "Video proof slot 01 — awaiting verified client content",
    reason: "awaiting-verified-content",
    visibility: "visible",
    poster: {
      src: "/proof-blue-glass.jpg",
      alt: "Blue-lit geometric glass architecture used as sample media",
      width: 1400,
      height: 2100,
    },
    reviewPlaceholder: "Verified client review will be added here.",
    requiredContent: videoProofRequirements,
  },
  {
    status: "placeholder",
    id: "video-proof-slot-2",
    slotLabel: "Video proof slot 02 — awaiting verified client content",
    reason: "awaiting-verified-content",
    visibility: "visible",
    poster: {
      src: "/proof-concrete.jpg",
      alt: "Monochrome concrete geometry used as sample media",
      width: 1400,
      height: 1750,
    },
    reviewPlaceholder: "Verified client review will be added here.",
    requiredContent: videoProofRequirements,
  },
  {
    status: "placeholder",
    id: "video-proof-slot-3",
    slotLabel: "Video proof slot 03 — awaiting verified client content",
    reason: "awaiting-verified-content",
    visibility: "visible",
    poster: {
      src: "/proof-geometry.jpg",
      alt: "Monochrome architectural lines used as sample media",
      width: 1400,
      height: 2100,
    },
    reviewPlaceholder: "Verified client review will be added here.",
    requiredContent: videoProofRequirements,
  },
];

export const testimonials: readonly PublishedTestimonial[] = [];

export const socialLinks: readonly SocialLink[] = [];

export function isPublishedProject(
  project: ProjectRecord,
): project is PublishedProject {
  return project.status === "published";
}

export function isPublishedVideoProof(
  proof: VideoProofRecord,
): proof is PublishedVideoProof {
  return proof.status === "published";
}

export const customerProblems = [
  {
    id: "no-contact",
    title: "People visit, but don't contact you",
    description: "Traffic may be reaching the website, but too few visitors become enquiries, calls, WhatsApp conversations, bookings, or purchases.",
  },
  {
    id: "unclear-offer",
    title: "Customers don't understand why they should choose you",
    description: "The website fails to communicate clearly what the business does, who it serves, what makes it different, or why the visitor should trust it.",
  },
  {
    id: "looks-small",
    title: "Your website makes the business look smaller than it really is",
    description: "Poor presentation, weak hierarchy, outdated design, or generic layouts can reduce perceived value before a potential customer ever speaks with the business.",
  },
  {
    id: "mobile-friction",
    title: "Mobile visitors face unnecessary friction",
    description: "A large percentage of customers encounter the business through their phones. Awkward layouts, poor navigation, and badly positioned buttons cost you opportunities.",
  },
  {
    id: "buried-next-step",
    title: "The next step isn't obvious",
    description: "The visitor shouldn't have to search for what to do next. Poor CTA placement creates unnecessary friction between interest and action.",
  },
  {
    id: "isolated-brochure",
    title: "The website exists, but doesn't support growth",
    description: "Many websites function as isolated digital brochures instead of becoming part of the business's growth system for lead capture, follow-up, and repeat sales.",
  },
] as const;

export const codeAuxSystemSteps = [
  {
    id: "understand",
    title: "Understand the business",
    description: "Before designing anything, we understand the business, target customers, goals, and desired actions to prevent designing blindly.",
  },
  {
    id: "position",
    title: "Clarify and position the offer",
    description: "We make it immediately obvious what the business does, who it serves, and why someone should choose it.",
  },
  {
    id: "trust",
    title: "Build trust",
    description: "We use premium presentation, strong typography, and credibility signals so the website makes the business feel as credible online as it actually is.",
  },
  {
    id: "friction",
    title: "Remove friction",
    description: "We improve loading speed, mobile experience, navigation, and page flow to remove obstacles from the customer journey.",
  },
  {
    id: "convert",
    title: "Create clear conversion paths",
    description: "CTAs are intentionally positioned so the customer always understands what the logical next step is (Call, WhatsApp, Book, Enquire).",
  },
  {
    id: "improve",
    title: "Build around growth",
    description: "Where appropriate, we connect the website to broader systems for analytics, lead capture, CRM, and automation.",
  },
] as const;

export const siteContent = {
  identity: siteIdentity,
  navigation,
  capabilities,
  problems,
  customerProblems,
  primaryService,
  additionalServices,
  whyCodeAuxPillars,
  leadGenerationSteps,
  codeAuxSystemSteps,
  projects,
  videoProof,
  testimonials,
  pricing,
  socialLinks,
} as const;
