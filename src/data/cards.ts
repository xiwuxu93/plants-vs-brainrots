import rawCardData from "../../pvb_cards.json";

export interface CardEntry {
  name: string;
  slug: string;
  rarity: string;
  chance: number | null;
  chanceText: string;
  description: string;
  image: string | null;
}

export interface CardSectionList {
  type: "ordered" | "unordered";
  items: string[];
}

export interface CardSectionEntry {
  title: string | null;
  body: string[];
  lists?: CardSectionList[];
}

export interface CardSection {
  title: string;
  intro: string[];
  entries: CardSectionEntry[];
  notes: string[];
}

export interface RelatedGuideEntry {
  title: string;
  description: string;
  href: string;
}

export interface CardGuideData {
  generatedAt: string;
  intro: string[];
  cardNote: string | null;
  cardCta: { label: string; href: string } | null;
  cards: CardEntry[];
  sections: CardSection[];
  relatedGuides: RelatedGuideEntry[];
}

const cardData = rawCardData as CardGuideData;

export const cardsGuide = cardData;
export const cards = cardData.cards;
export const cardSections = cardData.sections;
export const relatedGuides = cardData.relatedGuides;
