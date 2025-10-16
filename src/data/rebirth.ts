import rawRebirthData from "../../pvb_rebirth.json";

export interface RebirthRow {
  stage: string;
  cashDisplay: string | null;
  cash: number | null;
  brainrotRequirement: string | null;
  rewards: string;
  unlocks: string;
  boss: string;
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

export interface RebirthSection {
  title: string;
  intro: string[];
  entries: GuideEntry[];
  notes: string[];
}

export interface RelatedGuide {
  title: string;
  description: string;
  href: string;
}

export interface RebirthFaq {
  question: string;
  answer: string;
}

export interface RebirthGuideData {
  generatedAt: string;
  intro: string[];
  note: string | null;
  rebirths: RebirthRow[];
  sections: RebirthSection[];
  relatedGuides: RelatedGuide[];
  faqs: RebirthFaq[];
}

const rebirthData = rawRebirthData as RebirthGuideData;

export const rebirthGuide = rebirthData;
export const rebirthRows = rebirthData.rebirths;
export const rebirthSections = rebirthData.sections;
export const rebirthRelatedGuides = rebirthData.relatedGuides;
export const rebirthFaqs = rebirthData.faqs;
