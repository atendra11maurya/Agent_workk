export type SiteAnchor =
  | "#top"
  | "#services"
  | "#contact"
  | "#work"
  | "#audit";

export interface NavigationItem {
  label: string;
  href: SiteAnchor;
}

export interface ProblemItem {
  id: string;
  statement: string;
}

export interface PrimaryService {
  id: "revenue-website";
  eyebrow: string;
  title: string;
  description: string;
  discoveryTitle: string;
  discoveryPoints: readonly string[];
  deliverables: readonly string[];
}

export interface AdditionalService {
  id: string;
  title: string;
  description: string;
  priority: "supporting";
}

export interface PrinciplePillar {
  id: string;
  title: string;
  description: string;
}

export interface LeadGenerationStep {
  id: string;
  title: string;
  description: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PublishedProject {
  status: "published";
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  projectImage: ImageAsset;
  shortOutcome: string;
  problem: string;
  strategy: string;
  results: readonly [string, ...string[]];
  beforeImage?: ImageAsset;
  afterImage?: ImageAsset;
  liveUrl: `https://${string}`;
  featured: boolean;
}

export type ProjectContentRequirement =
  | "verified-client-name"
  | "verified-project-title"
  | "project-category"
  | "approved-project-image"
  | "verified-problem"
  | "verified-strategy"
  | "verified-outcome"
  | "verified-results"
  | "live-url";

export interface ProjectPlaceholder {
  status: "placeholder";
  id: `project-slot-${number}`;
  slotLabel: string;
  reason: "awaiting-verified-content";
  visibility: "visible";
  artDirection: "interface" | "editorial" | "conversion";
  requiredContent: readonly ProjectContentRequirement[];
}

export type ProjectRecord = PublishedProject | ProjectPlaceholder;

export interface PublishedVideoProof {
  status: "published";
  id: string;
  title: string;
  clientName: string;
  business: string;
  role: string;
  quote: string;
  videoSrc: string;
  captionsSrc: string;
  poster: ImageAsset;
  transcript: string;
  consentConfirmed: true;
}

export type VideoProofContentRequirement =
  | "approved-video"
  | "approved-poster"
  | "verified-client-name"
  | "verified-business-and-role"
  | "verified-quote"
  | "transcript"
  | "publication-consent";

export interface VideoProofPlaceholder {
  status: "placeholder";
  id: `video-proof-slot-${number}`;
  slotLabel: string;
  reason: "awaiting-verified-content";
  visibility: "visible";
  poster: ImageAsset;
  reviewPlaceholder: string;
  requiredContent: readonly VideoProofContentRequirement[];
}

export type VideoProofRecord = PublishedVideoProof | VideoProofPlaceholder;

export interface PublishedTestimonial {
  status: "published";
  id: string;
  quote: string;
  clientName: string;
  business: string;
  role: string;
  photo?: ImageAsset;
  logo?: ImageAsset;
}

export type SocialPlatform =
  | "Behance"
  | "Dribbble"
  | "Facebook"
  | "GitHub"
  | "Instagram"
  | "LinkedIn"
  | "X"
  | "YouTube";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: `https://${string}`;
}

export type PricingDisplay =
  | {
      kind: "from";
      currency: "INR";
      amount: number;
      label: string;
    }
  | {
      kind: "custom";
      label: string;
    };

export interface PricingOption {
  id: string;
  title: string;
  price: PricingDisplay;
  description: string;
}
