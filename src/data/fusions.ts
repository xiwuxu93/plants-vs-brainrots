import rawFusionData from "../../pvb_fusions.json";

export interface FusionEntry {
  fused: string;
  plant: string;
  brainrot: string;
  rarity: string;
  slug: string;
}

export interface GuideList {
  type: "ordered" | "unordered";
  items: string[];
}

export interface GuideEntry {
  title: string | null;
  body: string[];
  lists?: GuideList[];
}

export interface FusionGuideSection {
  title: string;
  intro: string[];
  entries: GuideEntry[];
  notes: string[];
}

export interface FusionRelatedGuide {
  title: string;
  description: string;
  href: string;
}

export interface FusionFaq {
  question: string;
  answer: string;
}

export interface FusionGuideData {
  generatedAt: string;
  intro: string[];
  fusionNote: string | null;
  fusions: FusionEntry[];
  sections: FusionGuideSection[];
  relatedGuides: FusionRelatedGuide[];
  faqs: FusionFaq[];
}

const fusionData = rawFusionData as FusionGuideData;

export const fusionGuide = fusionData;
export const fusions = fusionData.fusions;
export const fusionSections = fusionData.sections;
export const fusionRelatedGuides = fusionData.relatedGuides;
export const fusionFaqs = fusionData.faqs;
