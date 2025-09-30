# Plants vs Brainrots 网站原型设计文稿

## 页面结构概览

### 网站架构
```
Homepage (/)
├── Plants Database (/plants)
│   ├── Plant Detail (/plants/[id])
│   └── Plant Comparison (/plants/compare)
├── Brainrots Database (/brainrots)
│   ├── Brainrot Detail (/brainrots/[id])
│   └── Income Calculator (/brainrots/calculator)
├── Tools (/tools)
│   ├── Plant Calculator (/tools/plant-calculator)
│   ├── Efficiency Analyzer (/tools/efficiency)
│   └── Rebirth Calculator (/tools/rebirth)
├── Guides (/guides)
│   ├── Beginner Guide (/guides/beginner)
│   ├── Advanced Strategies (/guides/advanced)
│   └── Boss Battles (/guides/bosses)
├── Codes (/codes)
└── Admin (/admin) [管理员专用]
```

---

## 1. 首页设计 (Homepage)

### 1.1 页面布局
```
=== HEADER ===
[Logo] Plants vs Brainrots Wiki
[Nav] Plants | Brainrots | Tools | Guides | Codes
[Search] 🔍 Search plants, brainrots, guides...
[User] 👤 Login/Profile

=== HERO SECTION ===
┌─────────────────────────────────────────────────────┐
│ [Background: Game artwork with plants and brainrots] │
│                                                     │
│           🌱 Plants vs Brainrots Wiki 🧠           │
│        Your Ultimate Strategy Companion             │
│                                                     │
│    [Search Bar: "Find plants, brainrots..."]       │
│                                                     │
│  [CTA Buttons]                                      │
│  📊 Browse Plants | 🎯 View Brainrots | 🧮 Tools   │
└─────────────────────────────────────────────────────┘

=== QUICK STATS ===
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ 11  │ │ 27  │ │ 5   │ │ 12  │
│Plant│ │Brain│ │Tool │ │Guide│
└─────┘ └─────┘ └─────┘ └─────┘

=== FEATURED CONTENT ===
┌─── Latest Plants ───┐ ┌─── Top Brainrots ───┐
│ [Plant Card 1]      │ │ [Brainrot Card 1]   │
│ [Plant Card 2]      │ │ [Brainrot Card 2]   │
│ [Plant Card 3]      │ │ [Brainrot Card 3]   │
│ [View All →]        │ │ [View All →]        │
└─────────────────────┘ └─────────────────────┘

┌─── Popular Tools ───┐ ┌─── Recent Codes ────┐
│ 🧮 Plant Calculator │ │ CODE1: 💰 +10K Cash │
│ 📊 Tier List Maker  │ │ CODE2: 🌱 Free Seeds│
│ 💎 Mutation Guide   │ │ CODE3: ⏰ 2x Speed  │
│ [View All →]        │ │ [View All →]        │
└─────────────────────┘ └─────────────────────┘

=== FOOTER ===
Links | About | Contact | Discord
© 2024 Plants vs Brainrots Wiki
```

### 1.2 组件规范
- **Header高度**: 64px
- **Hero Section高度**: 400px
- **卡片间距**: 16px
- **响应式断点**: sm(640px), md(768px), lg(1024px)

---

## 2. 植物数据库页面 (/plants)

### 2.1 页面布局
```
=== BREADCRUMB ===
Home > Plants Database

=== PAGE HEADER ===
┌─────────────────────────────────────────────────────┐
│ 🌱 Plants Database                                  │
│ Complete collection of all plants with detailed     │
│ stats, mutations, and strategies                    │
│                                                     │
│ [Search]: "Search plants..." 🔍                    │
└─────────────────────────────────────────────────────┘

=== FILTERS TOOLBAR ===
┌─────────────────────────────────────────────────────┐
│ Rarity: [All▼] [Rare] [Epic] [Legendary] [Mythic]  │
│         [Godly] [Secret]                            │
│                                                     │
│ Price: [$100] ────●──── [$100M]                    │
│ Damage: [10] ────●──── [5000]                      │
│                                                     │
│ Sort by: [Name▼] [Price] [Damage] [Efficiency]     │
│ View: [Grid⊞] [List≡]                             │
│                                                     │
│ [Reset Filters] [11 Results]                       │
└─────────────────────────────────────────────────────┘

=== PLANT GRID ===
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│[Plant 1]│ │[Plant 2]│ │[Plant 3]│ │[Plant 4]│
│ Image   │ │ Image   │ │ Image   │ │ Image   │
│ Name    │ │ Name    │ │ Name    │ │ Name    │
│ Rarity  │ │ Rarity  │ │ Rarity  │ │ Rarity  │
│ $Cost   │ │ $Cost   │ │ $Cost   │ │ $Cost   │
│ DMG     │ │ DMG     │ │ DMG     │ │ DMG     │
│ [♡][👁]│ │ [♡][👁]│ │ [♡][👁]│ │ [♡][👁]│
└─────────┘ └─────────┘ └─────────┘ └─────────┘

[Continue for all 11 plants...]

=== PAGINATION ===
← Previous [1] [2] [3] Next →
```

### 2.2 植物卡片组件设计
```
┌─────────────────────┐
│ [Plant Image 160px] │
│ ┌─ Rarity Badge ─┐  │
│ │   LEGENDARY    │  │
│ └────────────────┘  │
│                     │
│ Dragonfruit         │
│ 💰 $100,000        │
│ ⚔️ 250 DMG         │
│ 📊 Tier B          │
│                     │
│ Mutations:          │
│ 🟨Gold 🔷Diamond   │
│ ❄️Frozen 🌈Neon    │
│                     │
│ [💝 Favorite]       │
│ [📖 Details]        │
└─────────────────────┘
```

---

## 3. 植物详情页面 (/plants/[id])

### 3.1 页面布局
```
=== BREADCRUMB ===
Home > Plants > Dragonfruit

=== PLANT HERO ===
┌─────────────────────────────────────────────────────┐
│ [Large Plant Image 300x300]    │ DRAGONFRUIT         │
│                                │ 🌟 Legendary Plant  │
│                                │                     │
│                                │ Base Stats:         │
│                                │ 💰 Cost: $100,000   │
│                                │ ⚔️ Damage: 250      │
│                                │ 📊 Tier: B          │
│                                │ 💎 Efficiency: 400  │
│                                │                     │
│                                │ [💝 Add to Favorite]│
│                                │ [🔗 Share Plant]    │
└─────────────────────────────────────────────────────┘

=== DETAILED STATS ===
┌─── Base Information ───┐ ┌─── Mutation Effects ───┐
│ Purchase Cost: $100,000 │ │ 🟨 Gold: 500 DMG      │
│ Base Damage: 250        │ │ 🔷 Diamond: 750 DMG   │
│ DPS: 83.33             │ │ ❄️ Frozen: 1,000 DMG  │
│ Cost per Damage: 400   │ │ 🌈 Neon: 1,125 DMG    │
│ Attack Speed: 3.0s     │ │                        │
│ Range: Medium          │ │ Special: Freeze 0.3s   │
└────────────────────────┘ └────────────────────────┘

=== STRATEGY GUIDE ===
┌─────────────────────────────────────────────────────┐
│ 📋 Strategy & Tips                                  │
│                                                     │
│ • Best used in back rows for maximum damage         │
│ • Excellent mid-game investment                     │
│ • Works well with crowd control plants             │
│ • Consider upgrading to Frozen mutation            │
│                                                     │
│ 🎯 Recommended Combos:                             │
│ • Dragonfruit + Cactus (crowd control)            │
│ • Dragonfruit + Sunflower (balanced defense)      │
└─────────────────────────────────────────────────────┘

=== EFFICIENCY CALCULATOR ===
┌─────────────────────────────────────────────────────┐
│ 🧮 Plant Efficiency Calculator                     │
│                                                     │
│ Your Budget: [$500,000────────●─────] $1,000,000   │
│                                                     │
│ Recommended Setup:                                  │
│ • 3x Dragonfruit (Frozen) = $300,000              │
│ • 2x Eggplant (Gold) = $500,000                   │
│ • Total DPS: 4,000                                 │
│                                                     │
│ [Calculate Again] [Save Setup]                     │
└─────────────────────────────────────────────────────┘

=== RELATED PLANTS ===
[Similar Tier Plants] [Same Rarity] [Similar Price]
```

---

## 4. Brainrot数据库页面 (/brainrots)

### 4.1 页面布局
```
=== PAGE HEADER ===
🧠 Brainrots Database
Your income-generating collection guide

=== FILTERS ===
┌─────────────────────────────────────────────────────┐
│ Rarity: [All▼] Weight: [All▼] Income: [$2-$2100]  │
│ Mutations: [□Gold] [□Diamond] [□Frozen] [□Neon]    │
│            [□Rainbow] [□Galaxy]                     │
│ Sort: [Income▼] [Rarity] [Name] [Efficiency]       │
└─────────────────────────────────────────────────────┘

=== BRAINROT GRID ===
┌─────────┐ ┌─────────┐ ┌─────────┐
│[Brainrot│ │[Brainrot│ │[Brainrot│
│ Image]  │ │ Image]  │ │ Image]  │
│         │ │         │ │         │
│ Name    │ │ Name    │ │ Name    │
│ Rarity  │ │ Rarity  │ │ Rarity  │
│ $2/sec  │ │ $3/sec  │ │ $4/sec  │
│ Light   │ │ Light   │ │ Light   │
│ Tier F  │ │ Tier F  │ │ Tier F  │
│         │ │         │ │         │
│[💝][📖]│ │[💝][📖]│ │[💝][📖]│
└─────────┘ └─────────┘ └─────────┘
```

### 4.2 Brainrot卡片设计
```
┌─────────────────────┐
│ [Brainrot Image]    │
│ ┌─ Mutation ─┐     │
│ │   GALAXY    │     │
│ └─────────────┘     │
│                     │
│ Garamararama        │
│ 💰 $2,100/sec      │
│ 🏋️ Legendary Heavy │
│ 📊 Tier S+         │
│                     │
│ Max Income:         │
│ 🌌 Galaxy: $15,750 │
│                     │
│ [💝 Favorite]       │
│ [📖 Details]        │
└─────────────────────┘
```

---

## 5. 计算工具页面 (/tools)

### 5.1 工具首页布局
```
=== TOOLS OVERVIEW ===
🧮 Calculation Tools
Optimize your Plants vs Brainrots strategy

┌─── Plant Calculator ────┐ ┌─── Income Optimizer ───┐
│ 🌱 Find optimal plant   │ │ 💰 Maximize your       │
│    combinations for     │ │    Brainrot income     │
│    your budget         │ │    efficiency          │
│                        │ │                        │
│ [Start Calculator →]   │ │ [Start Calculator →]   │
└────────────────────────┘ └────────────────────────┘

┌─── Efficiency Analyzer ┐ ┌─── Rebirth Calculator ─┐
│ 📊 Compare plant/brain  │ │ 🔄 Determine optimal   │
│    rot efficiency      │ │    rebirth timing      │
│                        │ │                        │
│ [Analyze Now →]        │ │ [Calculate →]          │
└────────────────────────┘ └────────────────────────┘
```

### 5.2 植物计算器页面
```
=== PLANT CALCULATOR ===
🧮 Plant Strategy Calculator
Find the optimal plant combination for your budget

┌─── INPUT SECTION ───┐
│ Your Budget:        │
│ [$100,000] 滑动条   │
│                     │
│ Strategy Focus:     │
│ ○ Maximum DPS       │
│ ○ Balanced Defense  │
│ ○ Cost Efficiency   │
│                     │
│ Include Mutations:  │
│ ☑️ Gold ☑️ Diamond  │
│ ☑️ Frozen ☑️ Neon   │
│                     │
│ [Calculate Setup]   │
└─────────────────────┘

┌─── RESULTS SECTION ───────────────────┐
│ 🎯 Recommended Setup                   │
│                                        │
│ Total Cost: $98,750 (98.75% of budget)│
│ Total DPS: 1,247                      │
│ Plants Count: 7                       │
│                                        │
│ Recommended Plants:                    │
│ ┌─────────────────────────────────────┐│
│ │ 2x Dragonfruit (Gold) - $200,000   ││
│ │ 1x Eggplant (Base) - $250,000      ││
│ │ 3x Sunflower (Diamond) - $75,000   ││
│ │ 1x Pumpkin (Neon) - $5,000         ││
│ └─────────────────────────────────────┘│
│                                        │
│ Strategy Breakdown:                    │
│ • Front line: Pumpkins (crowd control)│
│ • Mid line: Sunflowers (support)      │
│ • Back line: Dragonfruit (damage)     │
│                                        │
│ [Save Setup] [Try Another Budget]      │
│ [Share Setup] [Export to Image]       │
└────────────────────────────────────────┘
```

---

## 6. 兑换码页面 (/codes)

### 6.1 页面布局
```
=== PAGE HEADER ===
🎁 Plants vs Brainrots Codes
Free rewards and bonuses for your garden

Last Updated: September 28, 2024 ⏰

=== ACTIVE CODES ===
┌─────────