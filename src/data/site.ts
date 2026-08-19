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
  { label: "Home", href: "/#top" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/#work-proof" },
  { label: "Contact", href: "/#contact" },
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
    id: "unclear-value",
    title: "Unclear Value",
    description: "Visitors don't immediately understand what the business offers or why they should choose it.",
    consequence: "Potential customers leave before understanding the offer.",
  },
  {
    id: "low-trust",
    title: "Low Trust",
    description: "The website doesn't communicate enough credibility, authority or professionalism.",
    consequence: "Competitors feel like the safer choice.",
  },
  {
    id: "weak-conversion",
    title: "Weak Conversion Path",
    description: "Visitors browse the website but aren't deliberately guided toward contacting, booking or purchasing.",
    consequence: "Traffic fails to become enquiries.",
  },
  {
    id: "mobile-friction",
    title: "Mobile Friction",
    description: "The website experience becomes frustrating, cramped or unclear on mobile devices.",
    consequence: "High-intent mobile visitors abandon.",
  },
  {
    id: "slow-performance",
    title: "Slow Performance",
    description: "Pages, media or interactions take too long to load or respond.",
    consequence: "Attention disappears before the offer lands.",
  },
  {
    id: "unclear-next-step",
    title: "Unclear Next Step",
    description: "Calls-to-action are weak, inconsistent or poorly positioned.",
    consequence: "Interested visitors don't know what to do next.",
  },
] as const;

export const codeAuxSystemSteps = [
  {
    id: "strategy",
    title: "Strategy",
    description: "Understand the business, customer, offer and desired action.",
  },
  {
    id: "design",
    title: "Design",
    description: "Create hierarchy, credibility and intentional user journeys.",
  },
  {
    id: "development",
    title: "Development",
    description: "Build a responsive, performant and polished experience.",
  },
  {
    id: "conversion",
    title: "Conversion",
    description: "Guide attention toward the actions that matter to the business.",
  },
] as const;

export const whyUsComparisons = [
  {
    criterion: "Business-first approach",
    codeaux: "We understand your commercial goals before writing a single line of code.",
    traditional: "Start immediately with templates and generic layouts.",
  },
  {
    criterion: "Conversion-focused",
    codeaux: "Every page is designed to guide visitors toward meaningful action.",
    traditional: "Focus solely on making things look pretty, ignoring the customer journey.",
  },
  {
    criterion: "Custom strategy",
    codeaux: "Architecture and design built specifically around your customers and offer.",
    traditional: "Cookie-cutter approach reused across hundreds of clients.",
  },
  {
    criterion: "Performance",
    codeaux: "Optimized for speed and mobile experience to eliminate friction.",
    traditional: "Bloated codebases and plugins that frustrate mobile visitors.",
  },
  {
    criterion: "Revenue mindset",
    codeaux: "We measure success by leads, bookings, and sales generated.",
    traditional: "Success is measured by delivering the website files on time.",
  },
  {
    criterion: "After launch",
    codeaux: "Ongoing support and optimization to keep improving conversion rates.",
    traditional: "They hand over the keys and move on to the next project.",
  },
] as const;

export const customerSolutions = [
  {
    id: "clear-messaging",
    problem: "Unclear Value",
    solution: "Clear Positioning & Messaging",
    description: "Structure the website so visitors quickly understand: what the business does, who it's for, why it matters, what they should do next.",
    outcome: "Faster understanding",
  },
  {
    id: "credibility-driven",
    problem: "Low Trust",
    solution: "Credibility-Driven Design",
    description: "Use hierarchy, presentation, proof, professionalism and intentional visual design to make the business feel established and trustworthy.",
    outcome: "More intentional enquiries",
  },
  {
    id: "conversion-structure",
    problem: "Weak Conversion Path",
    solution: "Conversion-Focused Structure",
    description: "Build deliberate paths toward: calls, WhatsApp, enquiries, bookings, purchases depending on the business objective.",
    outcome: "Clear path to action",
  },
  {
    id: "mobile-first",
    problem: "Mobile Friction",
    solution: "Mobile-First UX",
    description: "Design around how real customers browse and take action from phones instead of treating mobile as a compressed desktop website.",
    outcome: "Frictionless browsing",
  },
  {
    id: "performance-first",
    problem: "Slow Performance",
    solution: "Performance-First Development",
    description: "Prioritize fast loading, responsive interactions, optimized assets and clean implementation.",
    outcome: "Immediate loading",
  },
  {
    id: "strategic-cta",
    problem: "Unclear Next Step",
    solution: "Strategic Calls-to-Action",
    description: "Place clear, contextual CTAs throughout the customer journey so interested visitors always know the next action.",
    outcome: "Obvious next actions",
  },
] as const;

export const siteContent = {
  identity: siteIdentity,
  navigation,
  capabilities,
  problems,
  customerProblems,
  customerSolutions,
  primaryService,
  additionalServices,
  whyCodeAuxPillars,
  whyUsComparisons,
  leadGenerationSteps,
  codeAuxSystemSteps,
  projects,
  videoProof,
  testimonials,
  pricing,
  socialLinks,
} as const;
