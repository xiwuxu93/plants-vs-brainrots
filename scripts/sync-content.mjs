#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';
import { load } from 'cheerio';
import pLimit from 'p-limit';

const ROOT_URL = 'https://plantsvsbrainrots.com';
const MAX_CONCURRENT_FETCHES = 6;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const databasePath = path.join(projectRoot, 'pvb_database.json');
const cardsDataPath = path.join(projectRoot, 'pvb_cards.json');
const fusionsDataPath = path.join(projectRoot, 'pvb_fusions.json');
const rebirthDataPath = path.join(projectRoot, 'pvb_rebirth.json');

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const parseMoney = (value) => {
  if (!value || value === '-' || value.includes('NaN')) return null;
  const cleaned = value.replace(/[$,\s]/g, '').toLowerCase();
  const match = cleaned.match(/([\d.]+)([kmbt]?)/);
  if (!match) return null;
  const amount = parseFloat(match[1]);
  if (Number.isNaN(amount)) return null;
  const suffix = match[2];
  const multiplier = suffix === 'k' ? 1_000 : suffix === 'm' ? 1_000_000 : suffix === 'b' ? 1_000_000_000 : suffix === 't' ? 1_000_000_000_000 : 1;
  return Math.round(amount * multiplier);
};

const parseDamage = (value) => {
  if (!value || value === '-') return null;
  const match = value.match(/([\d.]+)/);
  if (!match) return null;
  return Number(match[1]);
};

const parseIncome = (value) => {
  if (!value || value === '-' ) return null;
  const cleaned = value.replace(/[$,\s]/g, '').replace(/\/s$/i, '');
  const match = cleaned.match(/([\d.]+)([kmbt]?)/);
  if (!match) return null;
  const amount = parseFloat(match[1]);
  if (Number.isNaN(amount)) return null;
  const suffix = match[2];
  const multiplier = suffix === 'k' ? 1_000 : suffix === 'm' ? 1_000_000 : suffix === 'b' ? 1_000_000_000 : suffix === 't' ? 1_000_000_000_000 : 1;
  return Math.round(amount * multiplier);
};

const cleanText = (value) => (value || '').replace(/\s+/g, ' ').trim();

const normalizeImageUrl = (value) => {
  if (!value) return null;
  try {
    const absolute = new URL(value, ROOT_URL);
    const original = absolute.searchParams.get('url');
    return original ? decodeURIComponent(original) : absolute.href;
  } catch (error) {
    return value;
  }
};

async function fetchText(url) {
  const response = await fetch(url, { headers: { 'User-Agent': 'pvb-sync-script/1.0' } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
}

async function fetchSitemap() {
  const xml = await fetchText(`${ROOT_URL}/sitemap.xml`);
  const parser = new XMLParser();
  const data = parser.parse(xml);
  const entries = Array.isArray(data.urlset.url) ? data.urlset.url : [data.urlset.url];
  return entries.map((entry) => ({
    loc: entry.loc,
    lastmod: entry.lastmod,
  }));
}

function classifyUrl(url) {
  const { pathname } = new URL(url);
  if (pathname.startsWith('/plants/') && pathname.split('/').filter(Boolean).length === 2) {
    return { type: 'plant-detail', slug: pathname.split('/')[2] };
  }
  if (pathname.startsWith('/brainrots/') && pathname.split('/').filter(Boolean).length === 2) {
    return { type: 'brainrot-detail', slug: pathname.split('/')[2] };
  }
  if (pathname === '/plants') return { type: 'plants-index' };
  if (pathname === '/brainrots') return { type: 'brainrots-index' };
  if (pathname === '/gears') return { type: 'gears' };
  if (pathname === '/fuse-recipe') return { type: 'fusions' };
  if (pathname === '/codes') return { type: 'codes' };
  return { type: 'other' };
}

async function scrapePlantsIndex() {
  const html = await fetchText(`${ROOT_URL}/plants`);
  const $ = load(html);
  const plants = new Map();
  $('table').each((_, table) => {
    $(table)
      .find('tr')
      .slice(1)
      .each((__, row) => {
        const cells = $(row).find('td');
        if (cells.length < 4) return;
        const name = $(cells[0]).text().trim();
        if (!name) return;
        const slug = slugify(name);
        const rarity = $(cells[1]).text().trim();
        const seedCostRaw = $(cells[2]).text().trim();
        const baseDamageRaw = $(cells[3]).text().trim();
        const seedCost = parseMoney(seedCostRaw);
        const baseDmg = parseDamage(baseDamageRaw);
        plants.set(slug, {
          name,
          slug,
          rarity,
          seedCost,
          baseDmg,
          baseDamageRaw,
          seedCostRaw,
        });
      });
  });
  return plants;
}

async function scrapePlantDetail(slug) {
  const html = await fetchText(`${ROOT_URL}/plants/${slug}`);
  const $ = load(html);
  const name = $('h1').first().text().trim();
  const inlineValues = [];
  $('p.inline-block').each((_, el) => inlineValues.push($(el).text().trim()));
  const textMuted = [];
  $('p.text-muted-foreground').each((_, el) => textMuted.push($(el).text().trim()));
  const headlineMap = new Map();
  $('h2').each((_, el) => {
    const title = $(el).text().trim();
    const value = $(el).next().text().trim();
    headlineMap.set(title, value);
  });
  const seedCost = parseMoney(inlineValues[0]);
  const robuxCost = inlineValues.find((value) => value.toLowerCase().includes('robux')) || null;
  const baseDmg = parseDamage(headlineMap.get('Base Damage') || textMuted[2]);
  const obtainMethod = headlineMap.get('How to Get') || textMuted[3] || null;
  let rarity = null;
  const description = textMuted.find((text) => /is a .*plant/i.test(text));
  if (description) {
    const match = description.match(/is a ([^.,]+?) plant/i);
    if (match) {
      rarity = match[1].trim();
    }
  }
  return {
    slug,
    name,
    seedCost,
    robuxCost,
    baseDmg,
    obtainMethod,
    rarity,
  };
}

async function scrapeBrainrotsIndex() {
  const html = await fetchText(`${ROOT_URL}/brainrots`);
  const $ = load(html);
  const rows = [];
  $('table').first().find('tr').slice(1).each((_, row) => {
    const cells = $(row).find('td');
    if (cells.length < 3) return;
    const name = $(cells[0]).text().trim();
    if (!name) return;
    const slug = slugify(name);
    const rarity = $(cells[1]).text().trim();
    const baseIncomeRaw = $(cells[2]).text().trim();
    const baseIncome = parseIncome(baseIncomeRaw);
    rows.push({
      name,
      slug,
      rarity,
      baseIncome,
      baseIncomeRaw,
    });
  });
  return rows;
}

async function scrapeBrainrotDetail(slug) {
  const html = await fetchText(`${ROOT_URL}/brainrots/${slug}`);
  const $ = load(html);
  const name = $('h1').first().text().trim();
  const textMuted = [];
  $('p.text-muted-foreground').each((_, el) => textMuted.push($(el).text().trim()));
  const headlineMap = new Map();
  $('h2').each((_, el) => {
    const title = $(el).text().trim();
    const value = $(el).next().text().trim();
    headlineMap.set(title, value);
  });
  const baseIncome = parseIncome(headlineMap.get('Base Income') || textMuted.find((text) => text.includes('$')));
  const obtainMethod = headlineMap.get('How to Get') || textMuted.find((text) => text && text !== 'Join our Discord for trading & stock notifier' && text !== 'Share your thoughts and join the discussion');
  let rarity = null;
  const description = textMuted.find((text) => /brainrot/i.test(text) && /is (an?|the)/i.test(text));
  if (description) {
    const match = description.match(/is an? ([^.,]+?) brainrot/i);
    if (match) {
      rarity = match[1].trim();
    }
  }
  return {
    slug,
    name,
    baseIncome,
    obtainMethod,
    rarity,
  };
}

async function scrapeCodes() {
  const html = await fetchText(`${ROOT_URL}/codes`);
  const $ = load(html);
  const codes = [];
  const table = $('table').first();
  table.find('tr').slice(1).each((_, row) => {
    const cells = $(row).find('td');
    if (cells.length < 3) return;
    const code = $(cells[0]).text().trim();
    const reward = $(cells[1]).text().trim();
    const addedAt = $(cells[2]).text().trim();
    if (!code) return;
    codes.push({ code, reward, addedAt });
  });
  return codes;
}

const listTypeMap = {
  ul: 'unordered',
  ol: 'ordered',
};

function extractSectionNodes($, title) {
  const heading = $('h2')
    .filter((_, el) => cleanText($(el).text()) === title)
    .first();
  if (!heading.length) return [];
  const nodes = [];
  let node = heading.next();
  while (node.length && node[0]?.tagName !== 'h2') {
    nodes.push(node);
    node = node.next();
  }
  return nodes;
}

function parseList($, node) {
  const tag = node[0]?.tagName;
  const type = listTypeMap[tag];
  if (!type) return null;
  const items = [];
  node.find('li').each((_, li) => {
    const text = cleanText($(li).text());
    if (text) items.push(text);
  });
  if (!items.length) return null;
  return { type, items };
}

function parseSection($, title) {
  const nodes = extractSectionNodes($, title);
  if (!nodes.length) return null;

  const intro = [];
  const entries = [];
  const notes = [];

  let current = null;

  const commit = () => {
    if (!current) return;
    const hasBody = current.body.length > 0;
    const hasLists = current.lists.length > 0;
    if (hasBody || hasLists || current.title) {
      entries.push({
        title: current.title,
        body: current.body,
        lists: current.lists.length ? current.lists : undefined,
      });
    }
    current = null;
  };

  for (const node of nodes) {
    const tag = node[0]?.tagName;
    if (!tag) continue;
    if (tag === 'h3') {
      commit();
      current = {
        title: cleanText(node.text()) || null,
        body: [],
        lists: [],
      };
      continue;
    }
    if (tag === 'p') {
      const text = cleanText(node.text());
      if (!text) continue;
      if (!current) {
        intro.push(text);
      } else {
        current.body.push(text);
      }
      continue;
    }
    if (tag === 'ul' || tag === 'ol') {
      const list = parseList($, node);
      if (!list) continue;
      if (!current) {
        current = { title: null, body: [], lists: [list] };
        commit();
      } else {
        current.lists.push(list);
      }
      continue;
    }
    if (tag === 'div') {
      const text = cleanText(node.text());
      if (text) notes.push(text);
      continue;
    }
  }

  commit();

  return {
    title,
    intro,
    entries,
    notes,
  };
}

function parseRelatedGuides($) {
  const nodes = extractSectionNodes($, 'Related Guides');
  const guides = [];
  for (const node of nodes) {
    const tag = node[0]?.tagName;
    if (tag !== 'ul') continue;
    node.find('li').each((_, li) => {
      const item = $(li);
      const link = item.find('a').first();
      const href = link.attr('href') || '';
      const text = cleanText(item.text());
      if (!text) return;
      const [title, ...rest] = text.split(' - ');
      const description = rest.join(' - ').trim();
      guides.push({
        title: title.trim(),
        description: description || '',
        href,
      });
    });
  }
  return guides;
}

async function scrapeCardPage() {
  const html = await fetchText(`${ROOT_URL}/card`);
  const $ = load(html);

  const introNodes = extractSectionNodes($, 'Plants vs Brainrots Cards Guide');
  const intro = introNodes
    .filter((node) => node[0]?.tagName === 'p')
    .map((node) => cleanText(node.text()))
    .filter(Boolean);

  const cardNote = cleanText($('.my-4.flex.gap-2.rounded-lg').first().text()) || null;
  const ctaLink = $('div.not-prose').eq(0).find('a').first();
  const cardCta = ctaLink.length
    ? {
        label: cleanText(ctaLink.text()),
        href: ctaLink.attr('href') || '',
      }
    : null;

  const cards = [];
  const cardTable = $('table')
    .filter((_, table) => {
      const headers = $(table)
        .find('th')
        .map((__, th) => cleanText($(th).text()))
        .get();
      return headers.includes('Card Name') && headers.includes('Rarity');
    })
    .first();

  if (cardTable.length) {
    cardTable.find('tr').slice(1).each((_, row) => {
      const cells = $(row).find('td');
      if (cells.length < 5) return;
      const imageSrc = $(cells[0]).find('img').attr('src');
      const name = cleanText($(cells[1]).text());
      if (!name) return;
      const slug = slugify(name);
      const rarity = cleanText($(cells[2]).text());
      const chanceText = cleanText($(cells[3]).text());
      const chance = chanceText ? parseFloat(chanceText.replace(/%/, '')) : null;
      const description = cleanText($(cells[4]).text());
      cards.push({
        name,
        slug,
        rarity,
        chance,
        chanceText,
        description,
        image: normalizeImageUrl(imageSrc),
      });
    });
  }

  const sectionTitles = [
    'How to Get Cards',
    'How to Use Cards',
    'Card Merging System',
    'Card Benefits & Strategy',
  ];

  const sections = sectionTitles
    .map((title) => parseSection($, title))
    .filter(Boolean);

  const relatedGuides = parseRelatedGuides($);

  return {
    generatedAt: new Date().toISOString(),
    intro,
    cardNote,
    cardCta,
    cards,
    sections,
    relatedGuides,
  };
}

function mergePlantData(existingPlants, indexData, detailData) {
  const existingBySlug = new Map();
  let maxId = 0;
  for (const plant of existingPlants) {
    const slug = slugify(plant.slug || plant.name);
    existingBySlug.set(slug, plant);
    if (plant.id > maxId) maxId = plant.id;
  }

  const detailBySlug = new Map();
  for (const item of detailData) {
    if (!item?.name) continue;
    const slug = slugify(item.slug || item.name);
    detailBySlug.set(slug, item);
  }

  const updated = [];
  for (const plant of existingPlants) {
    const slug = slugify(plant.slug || plant.name);
    const listEntry = indexData.get(slug);
    const detailEntry = detailBySlug.get(slug);

    const seedCost = detailEntry?.seedCost ?? listEntry?.seedCost ?? plant.seedCost;
    const baseDmg = detailEntry?.baseDmg ?? listEntry?.baseDmg ?? plant.baseDmg;
    const rarity = detailEntry?.rarity ?? listEntry?.rarity ?? plant.rarity;
    const obtainMethod = detailEntry?.obtainMethod ?? plant.obtainMethod;
    const costPerDmg = seedCost && baseDmg ? Number((seedCost / baseDmg).toFixed(1)) : plant.costPerDmg;

    updated.push({
      ...plant,
      slug,
      seedCost,
      baseDmg,
      rarity,
      obtainMethod,
      costPerDmg,
    });
    existingBySlug.delete(slug);
  }

  for (const [slugKey, listEntry] of indexData.entries()) {
    const slug = listEntry.slug ?? slugKey;
    if (updated.some((plant) => plant.slug === slug)) continue;
    const detailEntry = detailBySlug.get(slug);
    const seedCost = detailEntry?.seedCost ?? listEntry.seedCost ?? 0;
    const baseDmg = detailEntry?.baseDmg ?? listEntry.baseDmg ?? 0;
    const rarity = detailEntry?.rarity ?? listEntry.rarity ?? 'Unknown';
    const obtainMethod = detailEntry?.obtainMethod ?? '';
    const costPerDmg = seedCost && baseDmg ? Number((seedCost / baseDmg).toFixed(1)) : 0;
    maxId += 1;
    updated.push({
      id: maxId,
      name: listEntry.name,
      slug,
      rarity,
      seedCost,
      baseDmg,
      mutations: detailEntry?.mutations || {},
      specialEffect: null,
      costPerDmg,
      tier: detailEntry?.tier ?? 'Unranked',
      obtainMethod,
    });
  }

  updated.sort((a, b) => a.id - b.id);
  return updated;
}

function mergeBrainrotData(existingBrainrots, listData, detailData) {
  const existingBySlug = new Map();
  let maxId = 0;
  for (const brainrot of existingBrainrots) {
    const slug = slugify(brainrot.slug || brainrot.name);
    existingBySlug.set(slug, brainrot);
    if (brainrot.id > maxId) maxId = brainrot.id;
  }

  const listBySlug = new Map(listData.map((entry) => [entry.slug, entry]));
  const detailBySlug = new Map(detailData.map((entry) => [slugify(entry.slug || entry.name), entry]));

  const updated = [];
  for (const brainrot of existingBrainrots) {
    const slug = slugify(brainrot.slug || brainrot.name);
    const listEntry = listBySlug.get(slug);
    const detailEntry = detailBySlug.get(slug);
    const baseIncome = detailEntry?.baseIncome ?? listEntry?.baseIncome ?? brainrot.baseIncome;
    const rarity = detailEntry?.rarity ?? listEntry?.rarity ?? brainrot.rarity;
    const obtainMethod = detailEntry?.obtainMethod ?? brainrot.obtainMethod;
    updated.push({
      ...brainrot,
      slug,
      baseIncome,
      rarity,
      obtainMethod,
    });
    existingBySlug.delete(slug);
  }

  for (const listEntry of listData) {
    const slug = listEntry.slug ?? slugify(listEntry.name);
    if (updated.some((brainrot) => brainrot.slug === slug)) continue;
    const detailEntry = detailBySlug.get(slug);
    maxId += 1;
    updated.push({
      id: maxId,
      name: listEntry.name,
      slug,
      rarity: detailEntry?.rarity ?? listEntry.rarity ?? 'Unknown',
      baseIncome: detailEntry?.baseIncome ?? listEntry.baseIncome ?? 0,
      mutations: detailEntry?.mutations || {},
      weight: detailEntry?.weight ?? 'Unknown',
      tier: detailEntry?.tier ?? 'Unranked',
    });
  }

  updated.sort((a, b) => a.id - b.id);
  return updated;
}

function mergeCodes(existingCodes, scrapedCodes) {
  const existingByCode = new Map(existingCodes.map((entry) => [entry.code.toLowerCase(), entry]));
  const merged = [];

  for (const scraped of scrapedCodes) {
    const key = scraped.code.toLowerCase();
    const existing = existingByCode.get(key);
    merged.push({
      code: scraped.code,
      reward: scraped.reward,
      addedAt: scraped.addedAt || existing?.addedAt || new Date().toISOString().slice(0, 10),
      expiresAt: existing?.expiresAt ?? null,
      status: existing?.status ?? 'active',
    });
    existingByCode.delete(key);
  }

  for (const leftover of existingByCode.values()) {
    merged.push(leftover);
  }

  merged.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
  return merged;
}

function parseFusionTable($) {
  const table = $('table')
    .filter((_, el) => {
      const headers = $(el)
        .find('th')
        .map((__, th) => cleanText($(th).text()))
        .get();
      return headers.includes('Fused Brainrot') && headers.includes('Plant');
    })
    .first();

  const entries = [];
  table
    .find('tr')
    .slice(1)
    .each((_, row) => {
      const cells = $(row).find('td');
      if (cells.length < 4) return;
      const fused = cleanText($(cells[0]).text());
      if (!fused) return;
      const plant = cleanText($(cells[1]).text());
      const brainrot = cleanText($(cells[2]).text());
      const rarity = cleanText($(cells[3]).text());
      const slug = slugify(fused);
      entries.push({ fused, plant, brainrot, rarity, slug });
    });

  return entries;
}

function parseFaqs($) {
  const faqs = [];
  $('div[data-slot="accordion"]').first().children().each((_, item) => {
    const wrapper = $(item);
    const question = cleanText(wrapper.find('[data-slot="accordion-trigger"]').text());
    const answer = cleanText(wrapper.find('[data-slot="accordion-content"]').text());
    if (question) {
      faqs.push({ question, answer });
    }
  });
  return faqs;
}

async function scrapeFusionGuide() {
  const html = await fetchText(`${ROOT_URL}/fuse-recipe`);
  const $ = load(html);

  const introNodes = extractSectionNodes($, 'Fuse Recipes Guide');
  const intro = introNodes
    .filter((node) => node[0]?.tagName === 'p')
    .map((node) => cleanText(node.text()))
    .filter(Boolean);

  const fusionNote = cleanText($('.my-4.flex.gap-2').first().text()) || null;

  const fusionEntries = parseFusionTable($);

  const sectionTitles = [
    'How to Unlock the Fuse Machine',
    'How to Use the Fuse Machine',
    'Important Notes',
  ];

  const sections = sectionTitles
    .map((title) => parseSection($, title))
    .filter(Boolean);

  const relatedGuides = parseRelatedGuides($);
  const faqs = parseFaqs($);

  const fusionRecipes = fusionEntries.map((entry) => ({
    id: entry.slug,
    result: entry.fused,
    rarity: entry.rarity || 'Unknown',
    cost: 0,
    inputs: [
      { item: entry.plant || 'Plant', count: 1 },
      { item: entry.brainrot || 'Brainrot', count: 1 },
    ],
    unlock: 'Fuse Machine',
  }));

  return {
    guide: {
      generatedAt: new Date().toISOString(),
      intro,
      fusionNote,
      fusions: fusionEntries,
      sections,
      relatedGuides,
      faqs,
    },
    recipes: fusionRecipes,
  };
}

function parseRebirthTable($) {
  const table = $('table')
    .filter((_, el) => {
      const headers = $(el)
        .find('th')
        .map((__, th) => cleanText($(th).text()))
        .get();
      return headers.includes('Rebirth Stage');
    })
    .first();

  const rows = [];
  table
    .find('tr')
    .slice(1)
    .each((_, row) => {
      const cells = $(row).find('td');
      if (cells.length < 5) return;
      const stage = cleanText($(cells[0]).text());
      if (!stage) return;
      const requirementCell = $(cells[1]);
      const cashDisplay = cleanText(requirementCell.find('.font-mono').text());
      const brainrotRequirement = cleanText(requirementCell.find('.text-sm').text());
      const rewards = cleanText($(cells[2]).text());
      const unlocks = cleanText($(cells[3]).text());
      const boss = cleanText($(cells[4]).text());

      rows.push({
        stage,
        cashDisplay: cashDisplay || null,
        cash: cashDisplay ? parseMoney(cashDisplay) : null,
        brainrotRequirement: brainrotRequirement || null,
        rewards,
        unlocks,
        boss,
      });
    });

  return rows;
}

async function scrapeRebirthGuide() {
  const html = await fetchText(`${ROOT_URL}/rebirth`);
  const $ = load(html);

  const introNodes = extractSectionNodes($, 'Rebirth System Guide');
  const intro = introNodes
    .filter((node) => node[0]?.tagName === 'p')
    .map((node) => cleanText(node.text()))
    .filter(Boolean);

  const requirementNote = cleanText($('#rebirth-requirements-note').text()) || null;
  const fallbackNote = cleanText($('.my-4.flex.gap-2').first().text()) || null;
  const note = requirementNote || fallbackNote || null;

  const rebirths = parseRebirthTable($);

  const sectionTitles = [
    'How Rebirth Works',
    'What Changes After Rebirth',
    'Rebirth Strategy',
    'Key Tips',
  ];

  const sections = sectionTitles
    .map((title) => parseSection($, title))
    .filter(Boolean);

  const relatedGuides = parseRelatedGuides($);
  const faqs = parseFaqs($);

  return {
    generatedAt: new Date().toISOString(),
    intro,
    note,
    rebirths,
    sections,
    relatedGuides,
    faqs,
  };
}

async function main() {
  console.log('Loading local database...');
  const raw = await readFile(databasePath, 'utf8');
  const database = JSON.parse(raw);

  console.log('Fetching sitemap...');
  const sitemap = await fetchSitemap();
  const plantDetailEntries = sitemap
    .map((entry) => classifyUrl(entry.loc))
    .filter((entry) => entry.type === 'plant-detail');
  const brainrotDetailEntries = sitemap
    .map((entry) => classifyUrl(entry.loc))
    .filter((entry) => entry.type === 'brainrot-detail');

  console.log(`Found ${plantDetailEntries.length} plant detail pages in sitemap.`);
  const plantIndexData = await scrapePlantsIndex();

  const limit = pLimit(MAX_CONCURRENT_FETCHES);
  const plantDetailData = await Promise.all(
    plantDetailEntries.map(({ slug }) =>
      limit(async () => {
        try {
          return await scrapePlantDetail(slug);
        } catch (error) {
          console.warn(`Failed to scrape plant ${slug}:`, error.message);
          return null;
        }
      }),
    ),
  );

  const filteredPlantDetails = plantDetailData.filter(Boolean);

  console.log('Merging plant data...');
  database.plants = mergePlantData(database.plants, plantIndexData, filteredPlantDetails);

  console.log('Scraping brainrot list...');
  const brainrotList = await scrapeBrainrotsIndex();
  const brainrotDetailData = await Promise.all(
    brainrotDetailEntries.map(({ slug }) =>
      limit(async () => {
        try {
          return await scrapeBrainrotDetail(slug);
        } catch (error) {
          console.warn(`Failed to scrape brainrot ${slug}:`, error.message);
          return null;
        }
      }),
    ),
  );
  const filteredBrainrotDetails = brainrotDetailData.filter(Boolean);
  database.brainrots = mergeBrainrotData(database.brainrots, brainrotList, filteredBrainrotDetails);

  console.log('Scraping codes...');
  const scrapedCodes = await scrapeCodes();
  database.codeHistory = mergeCodes(database.codeHistory, scrapedCodes);

  console.log('Scraping fusion data...');
  const fusionData = await scrapeFusionGuide();
  database.fusionRecipes = fusionData.recipes;

  console.log('Writing updated database...');
  await writeFile(databasePath, `${JSON.stringify(database, null, 2)}\n`, 'utf8');
  console.log('Database updated successfully.');

  await writeFile(fusionsDataPath, `${JSON.stringify(fusionData.guide, null, 2)}\n`, 'utf8');
  console.log('Fusion data updated successfully.');

  console.log('Scraping cards...');
  const cardData = await scrapeCardPage();
  await writeFile(cardsDataPath, `${JSON.stringify(cardData, null, 2)}\n`, 'utf8');
  console.log('Card data updated successfully.');

  console.log('Scraping rebirth data...');
  const rebirthData = await scrapeRebirthGuide();
  await writeFile(rebirthDataPath, `${JSON.stringify(rebirthData, null, 2)}\n`, 'utf8');
  console.log('Rebirth data updated successfully.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
