import rawData from "../../pvb_database.json";

export type MutationValues = Record<string, number>;

export interface Plant {
  id: number;
  name: string;
  rarity: string;
  seedCost: number;
  baseDmg: number;
  mutations: MutationValues;
  specialEffect: string | null;
  costPerDmg: number;
  tier: string;
}

export interface Brainrot {
  id: number;
  name: string;
  rarity: string;
  baseIncome: number;
  mutations: MutationValues;
  weight: string;
  tier: string;
}

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
  plants: Plant[];
  brainrots: Brainrot[];
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

const database = rawData as PvbDatabase;

export const plants = database.plants;
export const brainrots = database.brainrots;
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

export function getBrainrotById(id: number) {
  return brainrots.find((brainrot) => brainrot.id === id);
}

export function getGearById(id: string) {
  return gears.find((gear) => gear.id === id);
}

export function getFusionById(id: string) {
  return fusionRecipes.find((recipe) => recipe.id === id);
}
