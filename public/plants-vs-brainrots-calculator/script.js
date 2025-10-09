// Calculator dropdown functionality
function toggleDropdown() {
    const dropdown = document.getElementById('calculatorDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function selectCalculator(calculatorName) {
    const selectedElement = document.getElementById('selectedCalculator');
    const dropdown = document.getElementById('calculatorDropdown');
    
    if (selectedElement) {
        selectedElement.textContent = calculatorName;
    }
    
    if (dropdown) {
        dropdown.classList.remove('show');
    }
    
    console.log('Selected calculator:', calculatorName);
    loadCalculator(calculatorName);
}

// Brainrot data
const brainrotData = {
    "Agarrini La Palini": { income: 1 },
    "Ballerina Cappuccina": { income: 1 },
    "Bambini Crostini": { income: 1 },
    "Bananita Dolphinita": { income: 1 },
    "Bandito Bobrito": { income: 1 },
    "Bombardilo Watermelondrilo": { income: 1 },
    "Bombardiro Crocodilo": { income: 1 },
    "Bombini Gussini": { income: 1 },
    "Boneca Ambalabu": { income: 1 },
    "Brr-Brr Patapim": { income: 1 },
    "Brr-Brr Sunflowerim": { income: 1 },
    "Burbaloni Lulliloli": { income: 1 },
    "Cappuccino Assasino": { income: 1 },
    "Carnivourita Tralalerita": { income: 1 },
    "Dragonfrutina Dolphinita": { income: 1 },
    "Eggplantini Burbalonini": { income: 1 },
    "Elefanto Cocofanto": { income: 1 },
    "Espresso Signora": { income: 1 },
    "Fluri Flura": { income: 1 },
    "Frigo Camelo": { income: 1 },
    "Gangster Footera": { income: 1 },
    "Giraffa Celeste": { income: 1 },
    "Las Tralaleritas": { income: 1 },
    "Lirili Larlla": { income: 1 },
    "Madung": { income: 1 },
    "Matteo": { income: 1 },
    "Noobini Bananini": { income: 1 },
    "Noobini Cactusini": { income: 1 },
    "Odin-Din-Din-Dun": { income: 1 },
    "Orangutini Ananassini": { income: 1 },
    "Orangutini Strawberrini": { income: 1 },
    "Orcalero Orcala": { income: 1 },
    "Pipi Kiwi": { income: 1 },
    "Svinino Bombondino": { income: 1 },
    "Svinino Pumpkinino": { income: 1 },
    "Tim Cheese": { income: 1 },
    "Tralalero Tralala": { income: 1 },
    "Trippl Troppl": { income: 1 },
    "Trullmero Trulicina": { income: 1 },
    "Vacca Saturno Saturnita": { income: 1 }
};

// Mutation data
const mutationData = {
    "None": 1,
    "Gold": 2,
    "Diamond": 3,
    "Neon": 4.5,
    "Frozen": 4,
    "Rainbow": 5,
    "Galactic": 7.5,
    "Magma": 7,
    "Underworld": 6,
    "upsideDown": 6
};

const plantMutationData = {
    "None": 1,
    "Gold": 2,
    "Diamond": 3,
    "Frozen": 4,
    "Neon": 4.5
};

const mutationColors = {
    "None": "#b0b0b0",
    "Gold": "#FFD700",
    "Diamond": "#B9F2FF",
    "Neon": "#39FF14",
    "Frozen": "#87CEEB"
};

const mediaMap = {
    "all-plants-and-brainrots-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/all-plants-and-brainrots-plants-vs-brainrots.webp",
    "ballerina-cappuccina-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/ballerina-cappuccina-brainrot-plants-vs-brainrots.webp",
    "bambini-crostini-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/bambini-crostini-plants-vs-brainrots.png",
    "bananita-dolphinita-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/bananita-dolphinita-brainrot-plants-vs-brainrots.webp",
    "bandito-bobrito-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/bandito-bobrito-plants-vs-brainrots.png",
    "bombardilo-watermelondrillo-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/bombardilo-watermelondrillo-plants-vs-brainrots.png",
    "bombardiro-crocodilo-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/bombardiro-crocodilo-brainrot-plants-vs-brainrots.webp",
    "bombini-gussini-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/bombini-gussini-brainrot-plants-vs-brainrots.webp",
    "boneca-ambalabu-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/boneca-ambalabu-brainrot-plants-vs-brainrots.webp",
    "brainrots-attacking-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/brainrots-attacking-plants-vs-brainrots.webp",
    "brr-brr-patapim-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/brr-brr-patapim-brainrot-plants-vs-brainrots.webp",
    "brr-brr-sunflowerim-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/brr-brr-sunflowerim-plants-vs-brainrots.png",
    "burbaloni-lulliloli-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/burbaloni-lulliloli-brainrot-plants-vs-brainrots.webp",
    "cactus-plant-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/cactus-plant-plants-vs-brainrots.webp",
    "cappuccino-assasino-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/cappuccino-assasino-brainrot-plants-vs-brainrots.webp",
    "carnivorous-plant-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/carnivorous-plant-plants-vs-brainrots.webp",
    "carnivourita-tralalerita-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/carnivourita-tralalerita-plants-vs-brainrots.png",
    "cocotank-plant-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/cocotank-plant-plants-vs-brainrots.webp",
    "cocotanko-giraffanto-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/cocotanko-giraffanto-plants-vs-brainrots.png",
    "crazylone-pizalone-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/crazylone-pizalone-plants-vs-brainrots.png",
    "dragon-fruit-plant-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/dragon-fruit-plant-plants-vs-brainrots.webp",
    "dragonfrutina-dolphinita-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/dragonfrutina-dolphinita-plants-vs-brainrots.png",
    "eggplant-plant-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/eggplant-plant-plants-vs-brainrots.webp",
    "eggplantini-burbalonini-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/eggplantini-burbalonini-plants-vs-brainrots.png",
    "elefanto-cocofanto-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/elefanto-cocofanto-brainrot-plants-vs-brainrots.webp",
    "espresso-signora-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/espresso-signora-plants-vs-brainrots.png",
    "fluri-flura-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/fluri-flura-brainrot-plants-vs-brainrots.webp",
    "frigo-camelo-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/frigo-camelo-brainrot-plants-vs-brainrots.webp",
    "gangster-footera-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/gangster-footera-brainrot-plants-vs-brainrots.webp",
    "garamararam-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/garamararam-brainrot-plants-vs-brainrots.webp",
    "giraffa-celeste-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/giraffa-celeste-brainrot-plants-vs-brainrots.webp",
    "how-to-buy-seeds-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/how-to-buy-seeds-plants-vs-brainrots.webp",
    "how-to-sell-brainrots-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/how-to-sell-brainrots-plants-vs-brainrots.webp",
    "lirili-larila-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/lirili-larila-brainrot-plants-vs-brainrots.webp",
    "los-mr-carrotitos-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/los-mr-carrotitos-plants-vs-brainrots.png",
    "los-tralaleritos-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/los-tralaleritos-brainrot-plants-vs-brainrots.webp",
    "madung-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/madung-brainrot-plants-vs-brainrots.webp",
    "matteo-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/matteo-brainrot-plants-vs-brainrots.webp",
    "mr-carrot-plant-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/mr-carrot-plant-plants-vs-brainrots.webp",
    "noobini-bananini-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/noobini-bananini-brainrot-plants-vs-brainrots.webp",
    "noobini-cactusini-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/noobini-cactusini-plants-vs-brainrots.png",
    "odin-din-din-dun-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/odin-din-din-dun-brainrot-plants-vs-brainrots.webp",
    "orangutani-ananassini-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/orangutani-ananassini-brainrot-plants-vs-brainrots.webp",
    "orangutini-strawberrini-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/orangutini-strawberrini-plants-vs-brainrots.png",
    "orcalero-orcala-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/orcalero-orcala-plants-vs-brainrots.png",
    "pipi-kiwi-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/pipi-kiwi-brainrot-plants-vs-brainrots.webp",
    "placed-brainrots-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/placed-brainrots-plants-vs-brainrots.webp",
    "pumpkin-plant-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/pumpkin-plant-plants-vs-brainrots.webp",
    "strawberry-plant-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/strawberry-plant-plants-vs-brainrots.webp",
    "sunflower-plant-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/sunflower-plant-plants-vs-brainrots.webp",
    "svinino-bombondino-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/svinino-bombondino-brainrot-plants-vs-brainrots.webp",
    "svinino-pumpkinino-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/svinino-pumpkinino-plants-vs-brainrots.png",
    "tim-cheese-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/tim-cheese-plants-vs-brainrots.png",
    "tomatrio-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/tomatrio-plants-vs-brainrots.png",
    "tralalelo-tralala-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/tralalelo-tralala-brainrot-plants-vs-brainrots.webp",
    "trippi-troppi-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/trippi-troppi-brainrot-plants-vs-brainrots.webp",
    "trullimero-trulicina-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/trullimero-trulicina-brainrot-plants-vs-brainrots.webp",
    "vacca-saturno-saturnita-brainrot-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/vacca-saturno-saturnita-brainrot-plants-vs-brainrots.webp",
    "watermelon-plant-plants-vs-brainrots": "/plants-vs-brainrots-calculator/media/watermelon-plant-plants-vs-brainrots.webp"
};

function slugifyMediaKey(name) {
    return name
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function resolveMediaPath(name, type) {
    const slug = slugifyMediaKey(name);
    const candidates = type === 'brainrot'
        ? [
            `${slug}-brainrot-plants-vs-brainrots`,
            `${slug}-plants-vs-brainrots`,
            `${slug}-brainrot`,
            slug
        ]
        : [
            `${slug}-plant-plants-vs-brainrots`,
            `${slug}-plants-vs-brainrots`,
            `${slug}-plant`,
            slug
        ];
    for (const candidate of candidates) {
        if (mediaMap[candidate]) {
            return mediaMap[candidate];
        }
    }
    return type === 'brainrot'
        ? './plants-vs-brainrots-calculator/images/placeholder-brainrot.png'
        : './plants-vs-brainrots-calculator/images/placeholder-plant.png';
}

function getBrainrotImage(name) {
    return resolveMediaPath(name, 'brainrot');
}

function getPlantImage(name) {
    return resolveMediaPath(name, 'plant');
}

// Plant data
const plantData = {
    "Cactus": { income: 1, growthTime: 5, damage: 10, value: 200 },
    "Strawberry": { income: 1, growthTime: 60, damage: 25, value: 1250 },
    "Pumpkin": { income: 1, growthTime: 180, damage: 55, value: 5000 },
    "Sunflower": { income: 1, growthTime: 120, damage: 115, value: 25000 },
    "Dragon Fruit": { income: 1, growthTime: 240, damage: 250, value: 100000 },
    "Eggplant": { income: 1, growthTime: 300, damage: 500, value: 250000 },
    "Watermelon": { income: 1, growthTime: 660, damage: 1500, value: 1000000 },
    "Grape": { income: 1, growthTime: 600, damage: 1700, value: 2500000 },
    "Cocotank": { income: 1, growthTime: 720, damage: 1200, value: 5000000 },
    "Carnivorous Plant": { income: 1, growthTime: 1200, damage: 2200, value: 25000000 },
    "Mr Carrot": { income: 1, growthTime: 1800, damage: 3500, value: 50000000 },
    "Tomatrio": { income: 1, growthTime: 2160, damage: 9000, value: 125000000 },
    "Shroombino": { income: 1, growthTime: 2700, damage: 12500, value: 200000000 }
};

// Fuse combinations data
const fuseCombinations = {
    "Cactus": {
        requiredBrainrot: "Noobini Bananini",
        finalResult: "Noobini Cactusini",
        fuseTime: 60
    },
    "Carnivorous Plant": {
        requiredBrainrot: "Tralalero Tralala",
        finalResult: "Carnivourita Tralalerita",
        fuseTime: 300
    },
    "Cocotank": {
        requiredBrainrot: "Giraffa Celeste",
        finalResult: "Cocotanko Giraffanto",
        fuseTime: 0
    },
    "Dragon Fruit": {
        requiredBrainrot: "Bananita Dolphinita",
        finalResult: "Dragonfrutina Dolphinita",
        fuseTime: 180
    },
    "Eggplant": {
        requiredBrainrot: "Burbaloni Lulliloli",
        finalResult: "Eggplantini Burbalonini",
        fuseTime: 180
    },
    "Mr Carrot": {
        requiredBrainrot: "Los Tralalitos",
        finalResult: "Los Mr Carrotitos",
        fuseTime: 0
    },
    "Pumpkin": {
        requiredBrainrot: "Svinino Bombondino",
        finalResult: "Svinino Pumpkinino",
        fuseTime: 0
    },
    "Strawberry": {
        requiredBrainrot: "Orangutini Ananassini",
        finalResult: "Orangutini Strawberrini",
        fuseTime: 60
    },
    "Sunflower": {
        requiredBrainrot: "Brr Brr Patapim",
        finalResult: "Brr Brr Sunflowerim",
        fuseTime: 120
    },
    "Watermelon": {
        requiredBrainrot: "Bombardiro Crocodilo",
        finalResult: "Bombardilo Watermandrilo",
        fuseTime: 0
    },
};

// Stock Tracker data
let stockData = [];
let stockUpdateInterval = null;
const STOCK_API_URL = '#';
const STOCK_UPDATE_INTERVAL = 5 * 60 * 1000;

const categoryColors = {
    "SEEDS": "#72BF44",
    "GEAR": "#FFD700",
    "TOOLS": "#87CEEB",
    "WEAPONS": "#FF6B6B",
    "CONSUMABLES": "#FF8C42",
    "DEFAULT": "#6EC1E4"
};

// Helper functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        '110, 193, 228';
}

function getStockImagePath(itemName) {
    return './plants-vs-brainrots-calculator/images/placeholder-stock.png';
}

function ensureHiddenBrainrotSelect() {
    let hidden = document.getElementById('brainrotSelect');
    if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'brainrotSelect';
        document.body.appendChild(hidden);
    }
    return hidden;
}

function ensureHiddenMutationSelect() {
    let hidden = document.getElementById('mutationSelect');
    if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'mutationSelect';
        hidden.value = 'None';
        document.body.appendChild(hidden);
    }
    return hidden;
}

function ensureHiddenPlantSelect() {
    let hidden = document.getElementById('plantSelect');
    if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'plantSelect';
        document.body.appendChild(hidden);
    }
    return hidden;
}

function ensureHiddenGrowthPlantSelect() {
    let hidden = document.getElementById('growthPlantSelect');
    if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'growthPlantSelect';
        document.body.appendChild(hidden);
    }
    return hidden;
}

function ensureHiddenPlantCalculatorSelect() {
    let hidden = document.getElementById('plantCalculatorSelect');
    if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'plantCalculatorSelect';
        document.body.appendChild(hidden);
    }
    return hidden;
}

function ensureHiddenPlantMutationSelect() {
    let hidden = document.getElementById('plantMutationSelect');
    if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'plantMutationSelect';
        hidden.value = 'None';
        document.body.appendChild(hidden);
    }
    return hidden;
}

// Formatting functions
function formatCashNumber(num) {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatGrowthTime(seconds) {
    if (seconds < 60) {
        return `${seconds.toFixed(1)}s`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = (seconds % 60).toFixed(1);
        return `${minutes}m ${remainingSeconds}s`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = (seconds % 60).toFixed(1);
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
}

function formatFuseTime(seconds) {
    if (seconds < 60) {
        return `${seconds} seconds`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes} minutes`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours} hours`;
    }
}

function calculateCashForecast(cashPerSecond) {
    return {
        perMinute: cashPerSecond * 60,
        perHour: cashPerSecond * 3600,
        perDay: cashPerSecond * 86400,
        perWeek: cashPerSecond * 604800
    };
}

// COMPACT GRID CREATORS
function createCompactBrainrotGrid() {
    const gridItems = Object.entries(brainrotData).map(([name, data]) => {
        const safeName = name.replace(/'/g, '&#39;');
        const imageSrc = getBrainrotImage(name);
        return `
            <div class="brainrot-grid-item" onclick="selectBrainrotFromGrid('${safeName}')" 
                 data-brainrot="${safeName}"
                 style="display: flex; flex-direction: column; align-items: center; padding: 0.5rem; background: var(--bg-primary); border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;"
                 onmouseover="if (!this.classList.contains('selected')) { this.style.borderColor='var(--accent-primary)'; this.style.transform='translateY(-2px)'; }"
                 onmouseout="if (!this.classList.contains('selected')) { this.style.borderColor='var(--border-color)'; this.style.transform='translateY(0)'; }">
                <div style="width: 48px; height: 48px; border-radius: 6px; overflow: hidden; margin-bottom: 0.25rem; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center;">
                    <img src="${imageSrc}" alt="${name}" 
                         style="width: 100%; height: 100%; object-fit: cover;"
                         onerror="this.onerror=null; this.src='./plants-vs-brainrots-calculator/images/placeholder-brainrot.png';">
                </div>
                <div style="text-align: center; font-size: 0.7rem; color: var(--text-primary); font-weight: 500; line-height: 1.1;">${name}</div>
            </div>
        `;
    }).join('');

    return `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 0.5rem; max-height: 200px; overflow-y: auto; padding: 0.5rem; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px;">
            ${gridItems}
        </div>
    `;
}

function createCompactPlantGrid() {
    const gridItems = Object.entries(plantData).map(([name, data]) => {
        const safeName = name.replace(/'/g, '&#39;');
        const imageSrc = getPlantImage(name);
        return `
            <div class="plant-grid-item" onclick="selectPlantFromGrid('${safeName}')" 
                 data-plant="${safeName}"
                 style="display: flex; flex-direction: column; align-items: center; padding: 0.5rem; background: var(--bg-primary); border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;"
                 onmouseover="if (!this.classList.contains('selected')) { this.style.borderColor='var(--accent-primary)'; this.style.transform='translateY(-2px)'; }"
                 onmouseout="if (!this.classList.contains('selected')) { this.style.borderColor='var(--border-color)'; this.style.transform='translateY(0)'; }">
                <div style="width: 48px; height: 48px; border-radius: 6px; overflow: hidden; margin-bottom: 0.25rem; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center;">
                    <img src="${imageSrc}" alt="${name}" 
                         style="width: 100%; height: 100%; object-fit: cover;"
                         onerror="this.onerror=null; this.src='./plants-vs-brainrots-calculator/images/placeholder-plant.png';">
                </div>
                <div style="text-align: center; font-size: 0.7rem; color: var(--text-primary); font-weight: 500; line-height: 1.1;">${name}</div>
            </div>
        `;
    }).join('');

    return `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 0.5rem; max-height: 200px; overflow-y: auto; padding: 0.5rem; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px;">
            ${gridItems}
        </div>
    `;
}

function createCompactPlantCalculatorGrid() {
    const gridItems = Object.entries(plantData).map(([name, data]) => {
        const safeName = name.replace(/'/g, '&#39;');
        const imageSrc = getPlantImage(name);
        return `
            <div class="plant-calc-grid-item" onclick="selectPlantForCalculator('${safeName}')" 
                 data-plant-calc="${safeName}"
                 style="display: flex; flex-direction: column; align-items: center; padding: 0.5rem; background: var(--bg-primary); border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;"
                 onmouseover="if (!this.classList.contains('selected')) { this.style.borderColor='var(--accent-primary)'; this.style.transform='translateY(-2px)'; }"
                 onmouseout="if (!this.classList.contains('selected')) { this.style.borderColor='var(--border-color)'; this.style.transform='translateY(0)'; }">
                <div style="width: 48px; height: 48px; border-radius: 6px; overflow: hidden; margin-bottom: 0.25rem; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center;">
                    <img src="${imageSrc}" alt="${name}" 
                         style="width: 100%; height: 100%; object-fit: cover;"
                         onerror="this.onerror=null; this.src='./plants-vs-brainrots-calculator/images/placeholder-plant.png';">
                </div>
                <div style="text-align: center; font-size: 0.7rem; color: var(--text-primary); font-weight: 500; line-height: 1.1;">${name}</div>
            </div>
        `;
    }).join('');

    return `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 0.5rem; max-height: 200px; overflow-y: auto; padding: 0.5rem; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px;">
            ${gridItems}
        </div>
    `;
}

function createCompactGrowthPlantGrid() {
    const gridItems = Object.entries(plantData).map(([name, data]) => {
        const safeName = name.replace(/'/g, '&#39;');
        const imageSrc = getPlantImage(name);
        return `
            <div class="growth-plant-grid-item" onclick="selectPlantForGrowth('${safeName}')" 
                 data-growth-plant="${safeName}"
                 style="display: flex; flex-direction: column; align-items: center; padding: 0.5rem; background: var(--bg-primary); border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;"
                 onmouseover="if (!this.classList.contains('selected')) { this.style.borderColor='var(--accent-primary)'; this.style.transform='translateY(-2px)'; }"
                 onmouseout="if (!this.classList.contains('selected')) { this.style.borderColor='var(--border-color)'; this.style.transform='translateY(0)'; }">
                <div style="width: 48px; height: 48px; border-radius: 6px; overflow: hidden; margin-bottom: 0.25rem; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center;">
                    <img src="${imageSrc}" alt="${name}" 
                         style="width: 100%; height: 100%; object-fit: cover;"
                         onerror="this.onerror=null; this.src='./plants-vs-brainrots-calculator/images/placeholder-plant.png';">
                </div>
                <div style="text-align: center; font-size: 0.7rem; color: var(--text-primary); font-weight: 500; line-height: 1.1;">${name}</div>
                <div style="text-align: center; font-size: 0.65rem; color: var(--text-secondary); margin-top: 0.15rem;">${formatGrowthTime(data.growthTime)}</div>
            </div>
        `;
    }).join('');

    return `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 0.5rem; max-height: 200px; overflow-y: auto; padding: 0.5rem; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px;">
            ${gridItems}
        </div>
    `;
}

function createCompactMutationSelector() {
    const mutations = [
        { key: 'None', name: "1x", icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/normal.png" alt="Normal" width="100" height="34" style="display:block;"/>`, color: '#b0b0b0' },
        { key: 'Gold', name: '2x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/gold.png" alt="Gold" width="100" height="34" style="display:block;"/>`, color: '#FFD700' },
        { key: 'Diamond', name: '3x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/diamond.png" alt="Diamond" width="100" height="34" style="display:block;"/>`, color: '#B9F2FF' },
        { key: 'Frozen', name: '4x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/frozen.png" alt="Frozen" width="100" height="34" style="display:block;"/>`, color: '#87CEEB' },
        { key: 'Neon', name: '4.5x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/neon.png" alt="Neon" width="100" height="34" style="display:block;"/>`, color: '#39FF14' },
        { key: 'Galactic', name: '?x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/galactic.png" alt="Galactic" width="100" height="34" style="display:block;"/>`, color: '#87CEEB' },
        { key: 'Magma', name: '?x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/magma.png" alt="Magma" width="100" height="34" style="display:block;"/>`, color: '#87CEEB' },
        { key: 'Underworld', name: '?x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/underworld.png" alt="Underworld" width="100" height="34" style="display:block;"/>`, color: '#87CEEB' },
        { key: 'upsideDown', name: '?x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/upsideDown.png" alt="UpsideDown" width="100" height="34" style="display:block;"/>`, color: '#87CEEB' },
        { key: 'Rainbow', name: '?x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/rainbow.png" alt="Rainbow" width="100" height="34" style="display:block;"/>`, color: '#87CEEB' }
    ];

    return `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.5rem;">
            ${mutations.map(mutation => `
                <div class="mutation-option ${mutation.key === 'None' ? 'selected' : ''}" 
                     onclick="selectMutation('${mutation.key}')" 
                     data-mutation="${mutation.key}"
                     style="display: flex; flex-direction: column; align-items: center; padding: 0.5rem; background: var(--bg-primary); border: 2px solid ${mutation.key === 'None' ? mutation.color : 'var(--border-color)'}; border-radius: 8px; cursor: pointer; transition: all 0.2s ease;"
                     onmouseover="if (!this.classList.contains('selected')) { this.style.borderColor='${mutation.color}'; this.style.transform='translateY(-2px)'; }"
                     onmouseout="if (!this.classList.contains('selected')) { this.style.borderColor='var(--border-color)'; this.style.transform='translateY(0)'; }">
                    <div style="margin-bottom: 0.25rem;">
                        ${mutation.icon}
                    </div>
                    <div style="text-align: center; font-size: 0.7rem; color: var(--text-primary); font-weight: 500;">${mutation.name}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function createCompactPlantMutationSelector() {
    const mutations = [
        { key: 'None', name: "1x", icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/normal.png" alt="Normal" width="100" height="34" style="display:block;"/>`, color: '#b0b0b0' },
        { key: 'Gold', name: '2x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/gold.png" alt="Gold" width="100" height="34" style="display:block;"/>`, color: '#FFD700' },
        { key: 'Diamond', name: '3x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/diamond.png" alt="Diamond" width="100" height="34" style="display:block;"/>`, color: '#B9F2FF' },
        { key: 'Frozen', name: '4x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/frozen.png" alt="Frozen" width="100" height="34" style="display:block;"/>`, color: '#87CEEB' },
        { key: 'Neon', name: '4.5x', icon: `<img src="./plants-vs-brainrots-calculator/images/mutations/neon.png" alt="Neon" width="100" height="34" style="display:block;"/>`, color: '#39FF14' }
    ];

    return `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.5rem;">
            ${mutations.map(mutation => `
                <div class="plant-mutation-option ${mutation.key === 'None' ? 'selected' : ''}" 
                     onclick="selectPlantMutation('${mutation.key}')" 
                     data-plant-mutation="${mutation.key}"
                     style="display: flex; flex-direction: column; align-items: center; padding: 0.5rem; background: var(--bg-primary); border: 2px solid ${mutation.key === 'None' ? mutation.color : 'var(--border-color)'}; border-radius: 8px; cursor: pointer; transition: all 0.2s ease;"
                     onmouseover="if (!this.classList.contains('selected')) { this.style.borderColor='${mutation.color}'; this.style.transform='translateY(-2px)'; }"
                     onmouseout="if (!this.classList.contains('selected')) { this.style.borderColor='var(--border-color)'; this.style.transform='translateY(0)'; }">
                    <div style="margin-bottom: 0.25rem;">
                        ${mutation.icon}
                    </div>
                    <div style="text-align: center; font-size: 0.7rem; color: var(--text-primary); font-weight: 500;">${mutation.name}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// SELECTION FUNCTIONS
function selectMutation(mutationKey) {
    document.querySelectorAll('.mutation-option').forEach(option => {
        option.classList.remove('selected');
        option.style.borderColor = 'var(--border-color)';
        option.style.transform = 'translateY(0)';
    });
    
    const selectedOption = document.querySelector(`[data-mutation="${mutationKey}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
        const mutationColor = mutationColors[mutationKey];
        selectedOption.style.borderColor = mutationColor;
    }
    
    const hiddenSelect = document.getElementById('mutationSelect');
    if (hiddenSelect) {
        hiddenSelect.value = mutationKey;
    }
    
    updateBrainrotCalculation();
}

function selectBrainrotFromGrid(name) {
    const decodedName = name.replace(/&#39;/g, "'");
    
    document.querySelectorAll('.brainrot-grid-item').forEach(item => {
        item.classList.remove('selected');
        item.style.borderColor = 'var(--border-color)';
        item.style.transform = 'translateY(0)';
    });
    
    const selectedItem = document.querySelector(`[data-brainrot="${name}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
        selectedItem.style.borderColor = 'var(--accent-primary)';
    }
    
    ensureHiddenBrainrotSelect().value = decodedName;
    updateBrainrotCalculation();
}

function selectPlantFromGrid(name) {
    const decodedName = name.replace(/&#39;/g, "'");
    
    document.querySelectorAll('.plant-grid-item').forEach(item => {
        item.classList.remove('selected');
        item.style.borderColor = 'var(--border-color)';
        item.style.transform = 'translateY(0)';
    });
    
    const selectedItem = document.querySelector(`[data-plant="${name}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
        selectedItem.style.borderColor = 'var(--accent-primary)';
    }
    
    ensureHiddenPlantSelect().value = decodedName;
    updateFusionDisplay();
}

function selectPlantForCalculator(name) {
    const decodedName = name.replace(/&#39;/g, "'");
    
    document.querySelectorAll('.plant-calc-grid-item').forEach(item => {
        item.classList.remove('selected');
        item.style.borderColor = 'var(--border-color)';
        item.style.transform = 'translateY(0)';
    });
    
    const selectedItem = document.querySelector(`[data-plant-calc="${name}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
        selectedItem.style.borderColor = 'var(--accent-primary)';
    }
    
    ensureHiddenPlantCalculatorSelect().value = decodedName;
    updatePlantCalculation();
}

function selectPlantMutation(mutationKey) {
    document.querySelectorAll('.plant-mutation-option').forEach(option => {
        option.classList.remove('selected');
        option.style.borderColor = 'var(--border-color)';
        option.style.transform = 'translateY(0)';
    });
    
    const selectedOption = document.querySelector(`[data-plant-mutation="${mutationKey}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
        const mutationColor = mutationColors[mutationKey];
        selectedOption.style.borderColor = mutationColor;
    }
    
    const hiddenSelect = document.getElementById('plantMutationSelect');
    if (hiddenSelect) {
        hiddenSelect.value = mutationKey;
    }
    
    updatePlantCalculation();
}

function selectPlantForGrowth(name) {
    const decodedName = name.replace(/&#39;/g, "'");
    
    document.querySelectorAll('.growth-plant-grid-item').forEach(item => {
        item.classList.remove('selected');
        item.style.borderColor = 'var(--border-color)';
        item.style.transform = 'translateY(0)';
    });
    
    const selectedItem = document.querySelector(`[data-growth-plant="${name}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
        selectedItem.style.borderColor = 'var(--accent-primary)';
    }
    
    ensureHiddenGrowthPlantSelect().value = decodedName;
    updateGrowthCalculation();
}

// UPDATE FUNCTIONS
function updateCashForecast(cashPerSecond) {
    const resultsContainer = document.getElementById('cashResultsContainer');
    if (!resultsContainer) return;
    
    if (!cashPerSecond || cashPerSecond <= 0) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); padding: 1.5rem; font-style: italic; font-size: 0.9rem;">
                Enter your cash per second to see earnings
            </div>
        `;
        return;
    }

    const forecast = calculateCashForecast(parseFloat(cashPerSecond));
    
    resultsContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem;">
            <div style="background: var(--bg-primary); border-radius: 6px; padding: 0.75rem; text-align: center; border: 1px solid var(--border-color);">
                <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.4rem;">Per Minute</div>
                <div style="color: var(--accent-primary); font-size: 1.2rem; font-weight: 700;">$${formatCashNumber(forecast.perMinute)}</div>
            </div>
            <div style="background: var(--bg-primary); border-radius: 6px; padding: 0.75rem; text-align: center; border: 1px solid var(--border-color);">
                <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.4rem;">Per Hour</div>
                <div style="color: var(--accent-primary); font-size: 1.2rem; font-weight: 700;">$${formatCashNumber(forecast.perHour)}</div>
            </div>
            <div style="background: var(--bg-primary); border-radius: 6px; padding: 0.75rem; text-align: center; border: 1px solid var(--border-color);">
                <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.4rem;">Per Day</div>
                <div style="color: var(--accent-primary); font-size: 1.2rem; font-weight: 700;">$${formatCashNumber(forecast.perDay)}</div>
            </div>
            <div style="background: var(--bg-primary); border-radius: 6px; padding: 0.75rem; text-align: center; border: 1px solid var(--border-color);">
                <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.4rem;">Per Week</div>
                <div style="color: var(--accent-primary); font-size: 1.2rem; font-weight: 700;">$${formatCashNumber(forecast.perWeek)}</div>
            </div>
        </div>
    `;
}

function clearCashInput() {
    const input = document.getElementById('cashPerSecond');
    if (input) {
        input.value = '';
        updateCashForecast(0);
    }
}

function updateBrainrotCalculation() {
    const brainrotSelect = document.getElementById('brainrotSelect');
    const mutationSelect = document.getElementById('mutationSelect');
    const weightInput = document.getElementById('brainrotWeight');
    const resultsContainer = document.getElementById('brainrotResultsContainer');
    const detailsContainer = document.getElementById('brainrotDetails');
    
    if (!brainrotSelect || !mutationSelect || !resultsContainer || !detailsContainer) return;
    
    const selectedBrainrot = brainrotSelect.value;
    const selectedMutation = mutationSelect.value;
    const weight = parseFloat(weightInput ? weightInput.value : 1.0) || 1.0;
    
    if (!selectedBrainrot) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); padding: 1.5rem; font-style: italic; font-size: 0.9rem;">
                Select a brainrot and mutation
            </div>
        `;
        detailsContainer.innerHTML = '';
        return;
    }
    
    const brainrotInfo = brainrotData[selectedBrainrot];
    const baseIncome = brainrotInfo.income;
    const mutationMultiplier = mutationData[selectedMutation];
    const weightMultiplier = 1 + (weight - 1) * 0.5;
    const finalIncome = (baseIncome * mutationMultiplier) * weightMultiplier;
    
    const mutationColor = mutationColors[selectedMutation];
    detailsContainer.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
            <span style="color: var(--text-primary); font-weight: 600; font-size: 0.9rem;">${selectedBrainrot}</span>
            <span style="color: ${mutationColor}; font-weight: 600; font-size: 0.9rem;">${selectedMutation}</span>
            <span style="color: var(--accent-primary); font-size: 0.9rem;">${formatCashNumber(finalIncome)}/sec</span>
        </div>
    `;
    
    const forecast = calculateCashForecast(finalIncome);
    
    resultsContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem;">
            <div style="background: var(--bg-primary); border-radius: 6px; padding: 0.75rem; text-align: center; border: 1px solid var(--border-color);">
                <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.4rem;">Per Minute</div>
                <div style="color: var(--accent-primary); font-size: 1.2rem; font-weight: 700;">${formatCashNumber(forecast.perMinute)}</div>
            </div>
            <div style="background: var(--bg-primary); border-radius: 6px; padding: 0.75rem; text-align: center; border: 1px solid var(--border-color);">
                <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.4rem;">Per Hour</div>
                <div style="color: var(--accent-primary); font-size: 1.2rem; font-weight: 700;">${formatCashNumber(forecast.perHour)}</div>
            </div>
            <div style="background: var(--bg-primary); border-radius: 6px; padding: 0.75rem; text-align: center; border: 1px solid var(--border-color);">
                <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.4rem;">Per Day</div>
                <div style="color: var(--accent-primary); font-size: 1.2rem; font-weight: 700;">${formatCashNumber(forecast.perDay)}</div>
            </div>
            <div style="background: var(--bg-primary); border-radius: 6px; padding: 0.75rem; text-align: center; border: 1px solid var(--border-color);">
                <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.4rem;">Per Week</div>
                <div style="color: var(--accent-primary); font-size: 1.2rem; font-weight: 700;">${formatCashNumber(forecast.perWeek)}</div>
            </div>
        </div>
    `;
}

function clearBrainrotInput() {
    const hiddenSelect = document.getElementById('brainrotSelect');
    const hiddenMutation = document.getElementById('mutationSelect');
    const weightInput = document.getElementById('brainrotWeight');
    
    if (hiddenSelect) hiddenSelect.value = '';
    if (hiddenMutation) hiddenMutation.value = 'None';
    if (weightInput) weightInput.value = '1.0';
    
    document.querySelectorAll('.brainrot-grid-item').forEach(item => {
        item.classList.remove('selected');
        item.style.borderColor = 'var(--border-color)';
        item.style.transform = 'translateY(0)';
    });
    
    document.querySelectorAll('.mutation-option').forEach(option => {
        option.classList.remove('selected');
        option.style.borderColor = 'var(--border-color)';
        option.style.transform = 'translateY(0)';
    });
    
    const noneOption = document.querySelector('[data-mutation="None"]');
    if (noneOption) {
        noneOption.classList.add('selected');
        noneOption.style.borderColor = mutationColors.None;
    }
    
    updateBrainrotCalculation();
}

function updatePlantCalculation() {
    const plantSelect = document.getElementById('plantCalculatorSelect');
    const mutationSelect = document.getElementById('plantMutationSelect');
    const multiplierInput = document.getElementById('plantMultiplier');
    const resultsContainer = document.getElementById('plantResultsContainer');
    const detailsContainer = document.getElementById('plantDetails');
    
    if (!plantSelect || !mutationSelect || !resultsContainer || !detailsContainer) return;
    
    const selectedPlant = plantSelect.value;
    const selectedMutation = mutationSelect.value;
    const multiplier = parseFloat(multiplierInput ? multiplierInput.value : 1) || 1;
    
    if (!selectedPlant) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); padding: 1.5rem; font-style: italic; font-size: 0.9rem;">
                Select a plant and mutation
            </div>
        `;
        detailsContainer.innerHTML = '';
        return;
    }
    
    const plantInfo = plantData[selectedPlant];
    const baseDamage = plantInfo.damage;
    const baseValue = plantInfo.value;
    const mutationMultiplier = plantMutationData[selectedMutation];
    
    const finalDamage = baseDamage * mutationMultiplier * multiplier;
    const finalValue = baseValue * mutationMultiplier * multiplier;
    
    const mutationColor = mutationColors[selectedMutation];
    detailsContainer.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
            <span style="color: var(--text-primary); font-weight: 600; font-size: 0.9rem;">${selectedPlant}</span>
            <span style="color: ${mutationColor}; font-weight: 600; font-size: 0.9rem;">${selectedMutation}</span>
            <span style="color: var(--text-secondary); font-size: 0.9rem;">×${multiplier}</span>
        </div>
    `;
    
    resultsContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem;">
            <div style="background: var(--bg-primary); border-radius: 8px; padding: 1rem; text-align: center; border: 1px solid var(--border-color);">
                <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 0.5rem;">Base Damage</div>
                <div style="color: var(--text-primary); font-size: 1rem; margin-bottom: 0.5rem;">${formatCashNumber(baseDamage)}</div>
                <div style="height: 1px; background: var(--border-color); margin: 0.5rem auto; width: 80%;"></div>
                <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 0.4rem;">Final Damage</div>
                <div style="color: #ef4444; font-size: 1.4rem; font-weight: 700;">${formatCashNumber(finalDamage)}</div>
            </div>
            
            <div style="background: var(--bg-primary); border-radius: 8px; padding: 1rem; text-align: center; border: 1px solid var(--border-color);">
                <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 0.5rem;">Base Value</div>
                <div style="color: var(--text-primary); font-size: 1rem; margin-bottom: 0.5rem;">$${formatCashNumber(baseValue)}</div>
                <div style="height: 1px; background: var(--border-color); margin: 0.5rem auto; width: 80%;"></div>
                <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 0.4rem;">Final Value</div>
                <div style="color: #22c55e; font-size: 1.4rem; font-weight: 700;">$${formatCashNumber(finalValue)}</div>
            </div>
        </div>
        
        <div style="padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
            <div style="text-align: center; color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.25rem;">Calculation</div>
            <div style="text-align: center; color: var(--text-primary); font-size: 0.9rem; font-family: monospace;">
                Base × <span style="color: ${mutationColor};">${mutationMultiplier}x</span> × <span style="color: var(--accent-primary);">${multiplier}x</span> = 
                <span style="color: var(--accent-primary); font-weight: 700;">${(mutationMultiplier * multiplier).toFixed(2)}x</span>
            </div>
        </div>
    `;
}

function clearPlantCalculator() {
    const hiddenSelect = document.getElementById('plantCalculatorSelect');
    const hiddenMutation = document.getElementById('plantMutationSelect');
    const multiplierInput = document.getElementById('plantMultiplier');
    
    if (hiddenSelect) hiddenSelect.value = '';
    if (hiddenMutation) hiddenMutation.value = 'None';
    if (multiplierInput) multiplierInput.value = '1';
    
    document.querySelectorAll('.plant-calc-grid-item').forEach(item => {
        item.classList.remove('selected');
        item.style.borderColor = 'var(--border-color)';
        item.style.transform = 'translateY(0)';
    });
    
    document.querySelectorAll('.plant-mutation-option').forEach(option => {
        option.classList.remove('selected');
        option.style.borderColor = 'var(--border-color)';
        option.style.transform = 'translateY(0)';
    });
    
    const noneOption = document.querySelector('[data-plant-mutation="None"]');
    if (noneOption) {
        noneOption.classList.add('selected');
        noneOption.style.borderColor = mutationColors.None;
    }
    
    updatePlantCalculation();
}

function updateGrowthCalculation() {
    const plantSelect = document.getElementById('growthPlantSelect');
    const waterBucketsInput = document.getElementById('waterBuckets');
    const resultsContainer = document.getElementById('growthResultsContainer');
    const detailsContainer = document.getElementById('growthDetails');
    
    if (!plantSelect || !resultsContainer || !detailsContainer) return;
    
    const selectedPlant = plantSelect.value;
    const waterBuckets = parseInt(waterBucketsInput ? waterBucketsInput.value : 0) || 0;
    
    if (!selectedPlant) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); padding: 1.5rem; font-style: italic; font-size: 0.9rem;">
                Select a plant to see growth times
            </div>
        `;
        detailsContainer.innerHTML = '';
        return;
    }
    
    const plantInfo = plantData[selectedPlant];
    const baseGrowthTime = plantInfo.growthTime;
    
    const speedMultiplier = Math.pow(0.75, waterBuckets);
    const finalGrowthTime = baseGrowthTime * speedMultiplier;
    const timeSaved = baseGrowthTime - finalGrowthTime;
    const percentFaster = waterBuckets > 0 ? ((1 - speedMultiplier) * 100).toFixed(1) : 0;
    
    detailsContainer.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
            <span style="color: var(--text-primary); font-weight: 600; font-size: 0.9rem;">${selectedPlant}</span>
            <span style="color: var(--text-secondary); font-size: 0.9rem;">Base: ${formatGrowthTime(baseGrowthTime)}</span>
            ${waterBuckets > 0 ? `<span style="color: var(--accent-primary); font-size: 0.9rem;">+${waterBuckets} 💧</span>` : ''}
        </div>
    `;
    
    resultsContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem;">
            <div style="background: var(--bg-primary); border-radius: 6px; padding: 0.75rem; text-align: center; border: 1px solid var(--border-color);">
                <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.4rem;">Base Time</div>
                <div style="color: var(--text-primary); font-size: 1.2rem; font-weight: 700;">${formatGrowthTime(baseGrowthTime)}</div>
            </div>
            <div style="background: var(--bg-primary); border-radius: 6px; padding: 0.75rem; text-align: center; border: 1px solid var(--border-color);">
                <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.4rem;">With Water</div>
                <div style="color: var(--accent-primary); font-size: 1.2rem; font-weight: 700;">${formatGrowthTime(finalGrowthTime)}</div>
            </div>
            ${waterBuckets > 0 ? `
                <div style="background: var(--bg-primary); border-radius: 6px; padding: 0.75rem; text-align: center; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.4rem;">Time Saved</div>
                    <div style="color: #22c55e; font-size: 1.2rem; font-weight: 700;">${formatGrowthTime(timeSaved)}</div>
                </div>
                <div style="background: var(--bg-primary); border-radius: 6px; padding: 0.75rem; text-align: center; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.4rem;">Speed Up</div>
                    <div style="color: #22c55e; font-size: 1.2rem; font-weight: 700;">${percentFaster}%</div>
                </div>
            ` : ''}
        </div>
    `;
}

function clearGrowthCalculator() {
    const hiddenSelect = document.getElementById('growthPlantSelect');
    const waterBucketsInput = document.getElementById('waterBuckets');
    
    if (hiddenSelect) hiddenSelect.value = '';
    if (waterBucketsInput) waterBucketsInput.value = '0';
    
    document.querySelectorAll('.growth-plant-grid-item').forEach(item => {
        item.classList.remove('selected');
        item.style.borderColor = 'var(--border-color)';
        item.style.transform = 'translateY(0)';
    });
    
    updateGrowthCalculation();
}

function updateFusionDisplay() {
    const plantSelect = document.getElementById('plantSelect');
    const resultsContainer = document.getElementById('fusionResultsContainer');
    
    if (!resultsContainer) return;
    
    const selectedPlant = plantSelect ? plantSelect.value : '';
    
    if (!selectedPlant) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); padding: 1.5rem; font-style: italic; font-size: 0.9rem;">
                Select a plant to see fusion
            </div>
        `;
        return;
    }
    
    const fusionCombo = fuseCombinations[selectedPlant];
    
    if (!fusionCombo) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); padding: 1.5rem;">
                <h4 style="color: var(--text-primary); margin-bottom: 0.5rem; font-size: 1rem;">No Fusion Data</h4>
                <p style="font-style: italic; font-size: 0.9rem;">Fusion for "${selectedPlant}" not added yet.</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; flex-wrap: wrap; padding: 1rem; background: var(--bg-primary); border-radius: 10px;">
            <div style="text-align: center;">
                <div style="width: 64px; height: 64px; border-radius: 10px; overflow: hidden; background: var(--bg-secondary); margin: 0 auto 0.4rem;">
                    <img src="${getPlantImage(selectedPlant)}" alt="${selectedPlant}" style="width: 100%; height: 100%;" onerror="this.onerror=null; this.src='./plants-vs-brainrots-calculator/images/placeholder-plant.png';">
                </div>
                <div style="font-size: 0.8rem; color: var(--text-primary); font-weight: 600;">${selectedPlant}</div>
            </div>
            <div style="color: var(--accent-primary); font-size: 1.5rem; font-weight: bold;">+</div>
            <div style="text-align: center;">
                <div style="width: 64px; height: 64px; border-radius: 10px; overflow: hidden; background: var(--bg-secondary); margin: 0 auto 0.4rem;">
                    <img src="${getBrainrotImage(fusionCombo.requiredBrainrot)}" alt="${fusionCombo.requiredBrainrot}" style="width: 100%; height: 100%;" onerror="this.onerror=null; this.src='./plants-vs-brainrots-calculator/images/placeholder-brainrot.png';">
                </div>
                <div style="font-size: 0.8rem; color: var(--text-primary); font-weight: 600;">${fusionCombo.requiredBrainrot}</div>
            </div>
            <div style="color: var(--accent-primary); font-size: 1.5rem; font-weight: bold;">=</div>
            <div style="text-align: center;">
                <div style="width: 64px; height: 64px; border-radius: 10px; overflow: hidden; background: var(--bg-secondary); margin: 0 auto 0.4rem; border: 2px solid var(--accent-primary);">
                    <img src="${getBrainrotImage(fusionCombo.finalResult)}" alt="${fusionCombo.finalResult}" style="width: 100%; height: 100%;" onerror="this.onerror=null; this.src='./plants-vs-brainrots-calculator/images/placeholder-brainrot.png';">
                </div>
                <div style="font-size: 0.8rem; color: var(--accent-primary); font-weight: 700;">${fusionCombo.finalResult}</div>
            </div>
        </div>
        <div style="text-align: center; margin-top: 0.75rem; padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
            <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 0.25rem;">Fuse Time</div>
            <div style="color: var(--accent-primary); font-size: 1rem; font-weight: 700;">${formatFuseTime(fusionCombo.fuseTime)}</div>
        </div>
    `;
}

function clearFuseMachine() {
    const hiddenPlantSelect = document.getElementById('plantSelect');
    
    if (hiddenPlantSelect) hiddenPlantSelect.value = '';
    
    document.querySelectorAll('.plant-grid-item').forEach(item => {
        item.classList.remove('selected');
        item.style.borderColor = 'var(--border-color)';
        item.style.transform = 'translateY(0)';
    });
    
    updateFusionDisplay();
}

// Stock Tracker Functions
function createStockVisualGrid() {
    if (stockData.length === 0) {
        return `
            <div style="background: var(--bg-secondary); border: 2px solid var(--border-color); border-radius: 12px; padding: 2rem; text-align: center;">
                <div style="color: var(--text-secondary); font-size: 1rem;">Loading stock data...</div>
            </div>
        `;
    }

    const gridItems = stockData.map((item) => {
        const categoryColor = categoryColors[item.category] || categoryColors.DEFAULT;
        const stockStatus = item.available ? (item.stock > 0 ? 'In Stock' : 'Out of Stock') : 'Unavailable';
        const stockStatusColor = item.available ? (item.stock > 0 ? '#22c55e' : '#ef4444') : '#6b7280';
        
        return `
            <div class="stock-grid-item" 
                 data-item="${item.name}"
                 style="display: flex; flex-direction: column; align-items: center; padding: 0.75rem; background: var(--bg-primary); border: 2px solid var(--border-color); border-radius: 10px; position: relative;">
                <div style="position: absolute; top: 0.4rem; right: 0.4rem; background: ${categoryColor}; color: white; padding: 0.2rem 0.4rem; border-radius: 10px; font-size: 0.6rem; font-weight: 600;">
                    ${item.category}
                </div>
                <div style="width: 64px; height: 64px; border-radius: 8px; overflow: hidden; margin-bottom: 0.5rem; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center;">
                    <img src="${getStockImagePath(item.name)}" alt="${item.name}" 
                         style="width: 100%; height: 100%; object-fit: cover;"
                         onerror="this.onerror=null; this.src='./plants-vs-brainrots-calculator/images/placeholder-brainrot.png';">
                </div>
                <div style="text-align: center; font-size: 0.75rem; color: var(--text-primary); font-weight: 600; line-height: 1.2; max-width: 90px; margin-bottom: 0.4rem;">
                    ${item.name}
                </div>
                <div style="text-align: center; font-size: 0.65rem; color: ${stockStatusColor}; font-weight: 600;">
                    ${stockStatus}
                </div>
            </div>
        `;
    }).join('');

    return `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 0.75rem; max-height: 500px; overflow-y: auto;">
            ${gridItems}
        </div>
    `;
}

async function fetchStockData() {
    try {
        const response = await fetch(STOCK_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
            stockData = data;
        } else if (data && Array.isArray(data.data)) {
            stockData = data.data;
        } else {
            throw new Error('Invalid data format');
        }
        
        const placeholder = document.querySelector('.calculator-placeholder');
        if (placeholder && placeholder.innerHTML.includes('Stock Tracker')) {
            updateStockDisplay();
        }
        
        return true;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return false;
    }
}

function updateStockDisplay() {
    const container = document.getElementById('stockDisplayContainer');
    if (!container) return;
    container.innerHTML = createStockVisualGrid();
}

function startStockUpdates() {
    if (stockUpdateInterval) {
        clearInterval(stockUpdateInterval);
    }
    fetchStockData();
    stockUpdateInterval = setInterval(fetchStockData, STOCK_UPDATE_INTERVAL);
}

function stopStockUpdates() {
    if (stockUpdateInterval) {
        clearInterval(stockUpdateInterval);
        stockUpdateInterval = null;
    }
}

// MAIN LOAD CALCULATOR FUNCTION - COMPACT LAYOUTS
function loadCalculator(calculatorType) {
    const placeholder = document.querySelector('.calculator-placeholder');
    if (!placeholder) return;
    
    if (calculatorType !== 'Stock Tracker') {
        stopStockUpdates();
    }
    
    switch(calculatorType) {
        case 'Cash Forecast':
            placeholder.innerHTML = `
                <div class="calculator-header">
                    <h2 style="color: var(--accent-primary); margin-bottom: 0.25rem;">Cash Forecast Calculator</h2>
                    <p style="color: var(--text-secondary);">Calculate your earnings over time</p>
                </div>
                <div class="calculator-layout" style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
                    <div class="input-section" style="background: var(--bg-tertiary); border-radius: 8px; padding: 1rem;">
                        <label style="font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 0.4rem; font-size: 0.9rem;">Cash per Second:</label>
                        <input type="number" id="cashPerSecond" placeholder="0.00" min="0" step="0.01" 
                               oninput="updateCashForecast(this.value)"
                               style="width: 100%; padding: 0.6rem; background: var(--bg-primary); border: 2px solid var(--border-color); border-radius: 6px; color: var(--text-primary); font-size: 1rem; margin-bottom: 0.5rem;">
                        <button onclick="clearCashInput()" style="padding: 0.5rem 1rem; background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; font-size: 0.85rem;">Clear</button>
                    </div>
                    <div class="results-section" style="background: var(--bg-tertiary); border-radius: 8px; padding: 1rem;">
                        <h3 style="color: var(--accent-primary); text-align: center; margin-bottom: 0.75rem; font-size: 1.1rem;">Forecast Results</h3>
                        <div id="cashResultsContainer">
                            <div style="text-align: center; color: var(--text-secondary); padding: 1.5rem; font-style: italic; font-size: 0.9rem;">
                                Enter your cash per second to see earnings
                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    @media (min-width: 1024px) {
                        .calculator-layout {
                            grid-template-columns: 1fr 1fr !important;
                            align-items: start;
                        }
                    }
                </style>
            `;
            break;

        case 'Brainrot Calculator':
            placeholder.innerHTML = `
                <div class="calculator-header">
                    <h2 style="color: var(--accent-primary); margin-bottom: 0.25rem;">Brainrot Calculator</h2>
                    <p style="color: var(--text-secondary);">Calculate income generation</p>
                </div>
                <div class="calculator-layout" style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
                    <div class="input-section" style="background: var(--bg-tertiary); border-radius: 8px; padding: 1rem;">
                        <div style="margin-bottom: 1rem;">
                            <label style="font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 0.4rem; font-size: 0.9rem;">Select Brainrot:</label>
                            ${createCompactBrainrotGrid()}
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label style="font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 0.4rem; font-size: 0.9rem;">Select Mutation:</label>
                            ${createCompactMutationSelector()}
                        </div>
                        <div style="margin-bottom: 0.75rem;">
                            <label for="brainrotWeight" style="font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 0.4rem; font-size: 0.9rem;">Weight:</label>
                            <input type="number" id="brainrotWeight" value="1.0" min="0.1" max="10" step="0.1" 
                                   oninput="updateBrainrotCalculation()"
                                   style="width: 150px; padding: 0.6rem; background: var(--bg-primary); border: 2px solid var(--border-color); border-radius: 6px; color: var(--text-primary);">
                        </div>
                        <button onclick="clearBrainrotInput()" style="padding: 0.5rem 1rem; background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; font-size: 0.85rem;">Reset</button>
                    </div>
                    <div class="results-section" style="background: var(--bg-tertiary); border-radius: 8px; padding: 1rem;">
                        <h3 style="color: var(--accent-primary); text-align: center; margin-bottom: 0.5rem; font-size: 1.1rem;">Income Generation</h3>
                        <div id="brainrotDetails" style="color: var(--text-secondary); font-size: 0.85rem; text-align: center; margin-bottom: 0.75rem;"></div>
                        <div id="brainrotResultsContainer">
                            <div style="text-align: center; color: var(--text-secondary); padding: 1.5rem; font-style: italic; font-size: 0.9rem;">
                                Select a brainrot and mutation
                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    @media (min-width: 1024px) {
                        .calculator-layout {
                            grid-template-columns: 1fr 1fr !important;
                            align-items: start;
                        }
                    }
                </style>
            `;
            ensureHiddenBrainrotSelect();
            ensureHiddenMutationSelect();
            break;

        case 'Plant Calculator':
            placeholder.innerHTML = `
                <div class="calculator-header">
                    <h2 style="color: var(--accent-primary); margin-bottom: 0.25rem;">Plant Calculator</h2>
                    <p style="color: var(--text-secondary);">Calculate plant damage and value</p>
                </div>
                <div class="calculator-layout" style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
                    <div class="input-section" style="background: var(--bg-tertiary); border-radius: 8px; padding: 1rem;">
                        <div style="margin-bottom: 1rem;">
                            <label style="font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 0.4rem; font-size: 0.9rem;">Select Plant:</label>
                            ${createCompactPlantCalculatorGrid()}
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label style="font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 0.4rem; font-size: 0.9rem;">Select Mutation:</label>
                            ${createCompactPlantMutationSelector()}
                        </div>
                        <div style="margin-bottom: 0.75rem;">
                            <label for="plantMultiplier" style="font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 0.4rem; font-size: 0.9rem;">Multiplier:</label>
                            <input type="number" id="plantMultiplier" value="1" min="0.1" max="1000" step="0.1" 
                                oninput="updatePlantCalculation()"
                                style="width: 150px; padding: 0.6rem; background: var(--bg-primary); border: 2px solid var(--border-color); border-radius: 6px; color: var(--text-primary);">
                        </div>
                        <button onclick="clearPlantCalculator()" style="padding: 0.5rem 1rem; background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; font-size: 0.85rem;">Reset</button>
                    </div>
                    <div class="results-section" style="background: var(--bg-tertiary); border-radius: 8px; padding: 1rem;">
                        <h3 style="color: var(--accent-primary); text-align: center; margin-bottom: 0.5rem; font-size: 1.1rem;">Plant Statistics</h3>
                        <div id="plantDetails" style="color: var(--text-secondary); font-size: 0.85rem; text-align: center; margin-bottom: 0.75rem;"></div>
                        <div id="plantResultsContainer">
                            <div style="text-align: center; color: var(--text-secondary); padding: 1.5rem; font-style: italic; font-size: 0.9rem;">
                                Select a plant and mutation
                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    @media (min-width: 1024px) {
                        .calculator-layout {
                            grid-template-columns: 1fr 1fr !important;
                            align-items: start;
                        }
                    }
                </style>
            `;
            ensureHiddenPlantCalculatorSelect();
            ensureHiddenPlantMutationSelect();
            break;

        case 'Growth Calculator':
            placeholder.innerHTML = `
                <div class="calculator-header">
                    <h2 style="color: var(--accent-primary); margin-bottom: 0.25rem;">Growth Calculator</h2>
                    <p style="color: var(--text-secondary);">Calculate plant growth time with water buckets</p>
                </div>
                <div class="calculator-layout" style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
                    <div class="input-section" style="background: var(--bg-tertiary); border-radius: 8px; padding: 1rem;">
                        <div style="margin-bottom: 1rem;">
                            <label style="font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 0.4rem; font-size: 0.9rem;">Select Plant:</label>
                            ${createCompactGrowthPlantGrid()}
                        </div>
                        <div style="margin-bottom: 0.75rem;">
                            <label for="waterBuckets" style="font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 0.4rem; font-size: 0.9rem;">Water Buckets (25% faster each):</label>
                            <input type="number" id="waterBuckets" value="0" min="0" max="20" step="1" 
                                oninput="updateGrowthCalculation()"
                                style="width: 150px; padding: 0.6rem; background: var(--bg-primary); border: 2px solid var(--border-color); border-radius: 6px; color: var(--text-primary);">
                        </div>
                        <button onclick="clearGrowthCalculator()" style="padding: 0.5rem 1rem; background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; font-size: 0.85rem;">Reset</button>
                    </div>
                    <div class="results-section" style="background: var(--bg-tertiary); border-radius: 8px; padding: 1rem;">
                        <h3 style="color: var(--accent-primary); text-align: center; margin-bottom: 0.5rem; font-size: 1.1rem;">Growth Time Results</h3>
                        <div id="growthDetails" style="color: var(--text-secondary); font-size: 0.85rem; text-align: center; margin-bottom: 0.75rem;"></div>
                        <div id="growthResultsContainer">
                            <div style="text-align: center; color: var(--text-secondary); padding: 1.5rem; font-style: italic; font-size: 0.9rem;">
                                Select a plant to see growth times
                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    @media (min-width: 1024px) {
                        .calculator-layout {
                            grid-template-columns: 1fr 1fr !important;
                            align-items: start;
                        }
                    }
                </style>
            `;
            ensureHiddenGrowthPlantSelect();
            break;

        case 'Fuse Machine':
            placeholder.innerHTML = `
                <div class="calculator-header">
                    <h2 style="color: var(--accent-primary); margin-bottom: 0.25rem;">Fuse Machine</h2>
                    <p style="color: var(--text-secondary);">Select a plant to see fusion requirements</p>
                </div>
                <div class="calculator-layout" style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
                    <div class="input-section" style="background: var(--bg-tertiary); border-radius: 8px; padding: 1rem;">
                        <label style="font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 0.4rem; font-size: 0.9rem;">Select Plant:</label>
                        ${createCompactPlantGrid()}
                        <button onclick="clearFuseMachine()" style="margin-top: 0.75rem; padding: 0.5rem 1rem; background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; font-size: 0.85rem;">Reset</button>
                    </div>
                    <div class="results-section" style="background: var(--bg-tertiary); border-radius: 8px; padding: 1rem;">
                        <h3 style="color: var(--accent-primary); text-align: center; margin-bottom: 0.75rem; font-size: 1.1rem;">Fusion Process</h3>
                        <div id="fusionResultsContainer">
                            <div style="text-align: center; color: var(--text-secondary); padding: 1.5rem; font-style: italic; font-size: 0.9rem;">
                                Select a plant to see fusion
                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    @media (min-width: 1024px) {
                        .calculator-layout {
                            grid-template-columns: 1fr 1fr !important;
                            align-items: start;
                        }
                    }
                </style>
            `;
            ensureHiddenPlantSelect();
            break;

        case 'Stock Tracker':
            placeholder.innerHTML = `
                <div class="calculator-header">
                    <h2 style="color: var(--accent-primary); margin-bottom: 0.25rem;">Stock Tracker</h2>
                    <p style="color: var(--text-secondary);">Live inventory tracking</p>
                </div>
                <div style="background: var(--bg-tertiary); border-radius: 8px; padding: 0.75rem; margin: 1rem 0; text-align: center;">
                    <button onclick="fetchStockData()" style="background: var(--accent-primary); color: var(--bg-primary); border: none; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                        Refresh Stock Data
                    </button>
                </div>
                <div id="stockDisplayContainer" style="background: var(--bg-tertiary); border-radius: 8px; padding: 1rem;">
                    ${createStockVisualGrid()}
                </div>
            `;
            startStockUpdates();
            break;

        default:
            placeholder.innerHTML = `
                <div style="text-align: center; color: var(--text-secondary); padding: 3rem 1.5rem;">
                    <h3 style="color: var(--text-primary); margin-bottom: 0.5rem; font-size: 1.2rem;">${calculatorType}</h3>
                    <p style="font-size: 0.9rem;">This calculator is being developed</p>
                </div>
            `;
    }
}

// Event listeners
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('calculatorDropdown');
    const toggle = event.target.closest('.dropdown-toggle');
    if (!toggle && dropdown) {
        dropdown.classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index';
    if (currentPage === 'index' || currentPage === '') {
        setTimeout(() => {
            selectCalculator('Plant Calculator');
        }, 100);
    }
});

window.addEventListener('beforeunload', stopStockUpdates);
