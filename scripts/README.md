# Data Sync Scripts

This folder contains automation for synchronizing content from [plantsvsbrainrots.com](https://plantsvsbrainrots.com) into the local knowledge base.

## `sync-content.mjs`

End-to-end scraper that:
- fetches the public sitemap and identifies plant and brainrot detail pages;
- scrapes list/detail pages to refresh seed costs, base damage, income, rarities, and acquisition text;
- refreshes the promo code catalogue;
- gathers card drop data plus guide sections from `/card` and saves them to `pvb_cards.json`;
- mirrors fuse recipes and guide content from `/fuse-recipe`, writing structured data to `pvb_fusions.json` and updating `fusionRecipes` in `pvb_database.json`;
- captures rebirth requirements and strategy notes from `/rebirth`, storing them in `pvb_rebirth.json`;
- offers a stock endpoint at `/api/stock` that caches upstream data for five minutes; hit `/api/stock/refresh` from a Vercel cron job every five minutes to keep the cache warm.
- writes the merged output back to `pvb_database.json`.

### Prerequisites
- Node.js 20+
- npm dependencies installed (`npm install`)

### Run manually

```bash
npm run sync:remote
```

The script overwrites `pvb_database.json`, `pvb_cards.json`, `pvb_fusions.json`, and `pvb_rebirth.json`; review the diff before committing. Numeric fields are normalized during serialization (e.g. `40.0` -> `40`).

### Scheduling
- Add a cron entry (e.g. daily at 05:00):
  `0 5 * * * cd /path/to/plants-vs-brainrots && /usr/local/bin/npm run sync:remote >> logs/pvb-sync.log 2>&1`
- Alternatively, wire it into your CI/CD pipeline so production deployments fetch fresh data ahead of builds.

### Extending
- Update the `classifyUrl` helper if new sitemap sections should be crawled.
- Add new merge helpers following the pattern in `sync-content.mjs` to integrate additional tables (e.g. gears, fusion recipes) without losing bespoke fields.
