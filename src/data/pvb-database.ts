import rawData from "../../pvb_database.json";

export type MutationValues = Record<string, number>;

export interface Plant {
  id: number;
  name: string;
  slug: string;
  rarity: string;
  seedCost: number;
  baseDmg: number;
  mutations: MutationValues;
  specialEffect: string | null;
  costPerDmg: number;
  tier: string;
  obtainMethod: string;
}

export type RawPlant = Omit<Plant, "slug"> & { slug?: string };

export interface Brainrot {
  id: number;
  name: string;
  slug: string;
  rarity: string;
  baseIncome: number;
  mutations: MutationValues;
  weight: string;
  tier: string;
}

export type RawBrainrot = Omit<Brainrot, "slug"> & { slug?: string };

export interface Gear {
  id: string;
  name: string;
  rarity: string;
  cost: number;
  effect: string;
  cooldown: number;
  source: string;
  notes?: string;
}

export interface FusionInput {
  item: string;
  count: number;
}

export interface FusionRecipe {
  id: string;
  result: string;
  rarity: string;
  cost: number;
  inputs: FusionInput[];
  unlock: string;
  notes?: string;
}

export interface EventEntry {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  modifiers: string[];
  rewards: string[];
  notes?: string;
}

export interface DropReward {
  item: string;
  rarity: string;
  chance: string;
}

export interface DropTable {
  id: string;
  activity: string;
  recommendedPower: number;
  drops: DropReward[];
}

export interface StockHistoryEntry {
  timestamp: string;
  items: Array<{
    id: string;
    name: string;
    type: string;
    change: number;
    price: number;
  }>;
}

export interface CodeHistoryEntry {
  code: string;
  reward: string;
  addedAt: string;
  expiresAt: string | null;
  status: string;
}

export interface GameInfo {
  lastUpdated: string;
  totalPlants: number;
  totalBrainrots: number;
  maxFusionLevel: string;
  rebirthRequirement: string;
}

export interface MutationInfo {
  plants: Record<string, { effect: string; damageMultiplier: number }>;
  brainrots: Record<string, { effect: string; incomeMultiplier: number }>;
}

export interface PvbDatabase {
  plants: RawPlant[];
  brainrots: RawBrainrot[];
  gameInfo: GameInfo;
  mutationInfo: MutationInfo;
  rarityOrder: string[];
  gears: Gear[];
  fusionRecipes: FusionRecipe[];
  events: EventEntry[];
  dropTables: DropTable[];
  stockHistory: StockHistoryEntry[];
  codeHistory: CodeHistoryEntry[];
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const database = rawData as PvbDatabase;

const plantsWithSlugs: Plant[] = database.plants.map((plant) => {
  const slug = plant.slug ? slugify(plant.slug) : slugify(plant.name);
  return { ...plant, slug };
});

const brainrotsWithSlugs: Brainrot[] = database.brainrots.map((brainrot) => {
  const slug = brainrot.slug ? slugify(brainrot.slug) : slugify(brainrot.name);
  return { ...brainrot, slug };
});

export const toSlug = (value: string) => slugify(value);

export const plants = plantsWithSlugs;
export const brainrots = brainrotsWithSlugs;
export const gameInfo = database.gameInfo;
export const mutationInfo = database.mutationInfo;
export const rarityOrder = database.rarityOrder;
export const gears = database.gears;
export const fusionRecipes = database.fusionRecipes;
export const events = database.events;
export const dropTables = database.dropTables;
export const stockHistory = database.stockHistory;
export const codeHistory = database.codeHistory;

export function getPlantById(id: number) {
  return plants.find((plant) => plant.id === id);
}

export function getPlantByName(name: string) {
  return plants.find((plant) => plant.name === name);
}

export function getPlantBySlug(slug: string) {
  const normalized = slugify(slug);
  return plants.find((plant) => plant.slug === normalized);
}

export function getBrainrotById(id: number) {
  return brainrots.find((brainrot) => brainrot.id === id);
}
export function getBrainrotByName(name: string) {
  return brainrots.find((brainrot) => brainrot.name === name);
}

export function getBrainrotBySlug(slug: string) {
  const normalized = slugify(slug);
  return brainrots.find((brainrot) => brainrot.slug === normalized);
}

export function getGearById(id: string) {
  return gears.find((gear) => gear.id === id);
}

export function getFusionById(id: string) {
  return fusionRecipes.find((recipe) => recipe.id === id);
}
