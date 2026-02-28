# ATLAS Engine
### Adaptive Trading Logic Analysis System

A Progressive Web App that digitizes your 96+ proprietary trading scenarios with a local learning loop.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

> **Note:** Before deploying, update the `base` in `vite.config.ts` to match your GitHub repo name:
> ```ts
> base: '/your-repo-name/'
> ```

---

## Architecture

```
src/
├── data/
│   ├── types.ts       — TypeScript types + feature vector encoding
│   └── scenarios.ts   — All 96 scenarios (Vetted, Inside PDR, Whipsaw, PDH/PDL Breaks)
├── lib/
│   ├── db.ts          — Dexie/IndexedDB learning layer
│   └── engine.ts      — Weighted KNN matching algorithm
└── components/
    ├── InputForm.tsx  — 8-dropdown market condition input
    ├── ResultCard.tsx — Match display + Win/Loss feedback
    └── Dashboard.tsx  — Learning stats & trade history
```

---

## How It Works

### Inputs (8 features)
| Feature | Options |
|---|---|
| C1 Context | Inside PDR / Breaks PDH / Breaks PDL |
| C1 Behavior | Ranging / Trends Up / Trends Down |
| C2 Action | Inside Bar / Breaks High / Breaks Low / Whipsaw |
| C2 Close | Closes Inside / Holds Above / Holds Below |
| C3 Action | *(same as C2)* |
| C3 Close | *(same as C2)* |
| C4 Action | *(same as C2)* |
| C4 Close | *(same as C2)* |

### Matching
- **Exact Match** — feature vector distance = 0 (perfect scenario match)
- **Inferred Match** — weighted KNN, similarity shown as percentage

### Feature Weights (KNN)
Higher weight = more discriminating power:
- C1 Context: 2.5x
- C2/C3 Action: 2.0x  
- C1 Behavior, C2/C3/C4 Close: 1.5x
- C4 Action: 1.5x, C4 Close: 1.0x

### Learning Loop
- Base confidence: 1.0x
- Each **Win**: +0.05x (capped at 3.0x)
- Each **Loss**: −0.05x (floor at 0.1x)
- Stored in IndexedDB — persists across sessions, device-local

---

## Scenario Coverage

| Category | Count |
|---|---|
| Vetted | 24 |
| Inside PDR | 20 |
| Whipsaw | 20 |
| PDH Breaks | 20 |
| PDL Breaks | 12 |
| **Total** | **96** |

---

## GitHub Pages Deployment

1. Push code to a GitHub repo
2. Update `base` in `vite.config.ts` to `'/your-repo-name/'`
3. Run `npm run deploy`
4. Enable GitHub Pages in repo Settings → Pages → Source: `gh-pages` branch

---

Built for XAUUSD · All data stored locally in browser
