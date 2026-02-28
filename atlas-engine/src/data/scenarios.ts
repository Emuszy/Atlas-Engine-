import type { Scenario } from './types';

// ─── Feature shorthand helpers ────────────────────────────────────────────────
// c1_context: 0=inside_pdr  1=breaks_pdh  2=breaks_pdl
// c1_behavior: 0=ranging    1=up          2=down
// c2/3/4 action: 0=inside_bar  1=breaks_high  2=breaks_low  3=whipsaw
// c2/3/4 close:     0=inside      1=above        2=below
// c2/3/4 qualifier: 0=none  1=+PDH  2=+PDL  3=+SetupHigh  4=+SetupLow  5=+PDH&Setup  6=+PDL&Setup

// qualifier: 0=none 1=+PDH 2=+PDL 3=+SetupHigh 4=+SetupLow 5=+PDH&Setup 6=+PDL&Setup
const fv = (
  c1c: 0|1|2, c1b: 0|1|2,
  c2a: 0|1|2|3, c2cl: 0|1|2,
  c3a: 0|1|2|3, c3cl: 0|1|2,
  c4a: 0|1|2|3, c4cl: 0|1|2,
  c2q: 0|1|2|3|4|5|6 = 0,
  c3q: 0|1|2|3|4|5|6 = 0,
  c4q: 0|1|2|3|4|5|6 = 0,
) => ({
  c1_context:c1c, c1_behavior:c1b,
  c2_action:c2a, c2_close:c2cl, c2_qualifier:c2q,
  c3_action:c3a, c3_close:c3cl, c3_qualifier:c3q,
  c4_action:c4a, c4_close:c4cl, c4_qualifier:c4q,
});

export const SCENARIOS: Scenario[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // VETTED SCENARIOS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'V-01', label: 'V-01', category: 'vetted',
    conditions: {
      c1: 'Inside PDR – Ranges',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Breaks C2 High, closes Inside',
      c4: '[Whipsaw] Breaks C3 Low then holds above Setup High',
    },
    entry: 'Above C4 High', bias: 'Bearish', target: 'PDL',
    features: fv(0,0, 2,0, 1,0, 3,1),
  },
  {
    id: 'V-02' /* c3+PDH */, label: 'V-02', category: 'vetted',
    conditions: {
      c1: 'Inside PDR – Ranges',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Breaks C2 High (or PDH), holds above',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Above C4 High', bias: 'Heavily Bearish', target: 'PDL or 2 S.D',
    features: fv(0,0, 2,0, 1,1, 1,1, 0,1,0),
  },
  {
    id: 'V-03', label: 'V-03', category: 'vetted',
    conditions: {
      c1: 'Inside PDR – Trends Up',
      c2: 'Inside C1, ranging',
      c3: 'Breaks Setup High + PDH, holds above',
      c4: 'Inside C3',
    },
    entry: 'Below C1 Low', bias: 'Heavily Bullish', target: 'Highest High / PDH',
    features: fv(0,1, 0,0, 1,1, 0,0, 0,5,0),
  },
  {
    id: 'V-04', label: 'V-04', category: 'vetted',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Inside C1, ranges',
      c3: 'Whipsaw: breaks Setup High then C2 Low',
      c4: 'Breaks C3 Low, closes Inside',
    },
    entry: 'Above 7am High', bias: 'Bearish', target: 'PDL',
    features: fv(1,1, 0,0, 3,0, 2,0),
  },
  {
    id: 'V-05', label: 'V-05', category: 'vetted',
    conditions: {
      c1: 'Inside bar – Trends down',
      c2: 'Breaks C1 Low, holds below',
      c3: 'Breaks C2 Low + PDL, holds below',
      c4: 'Inside C3, trends Up',
    },
    entry: '1st FVG after 7am', bias: 'Bearish', target: '2 S.D (then Bullish)',
    features: fv(0,2, 2,2, 2,2, 0,1, 0,2,0),
  },
  {
    id: 'V-06', label: 'V-06', category: 'vetted',
    conditions: {
      c1: 'Inside bar, ranging',
      c2: 'Breaks C1 Low + PDL, holds below',
      c3: 'Breaks C2 Low, fails to hold, closes Inside PDR',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Below C4 Low / 7am Low', bias: 'Bullish', target: '2 S.D',
    features: fv(0,0, 2,2, 2,0, 1,1, 2,0,0),
  },
  {
    id: 'V-07', label: 'V-07', category: 'vetted',
    conditions: {
      c1: 'Inside PDR – Trend down',
      c2: 'Inside bar, ranging',
      c3: 'Breaks C2 High, closes Inside',
      c4: 'Inside bar, ranging',
    },
    entry: 'Below 7am / C3 Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,2, 0,0, 1,0, 0,0),
  },
  {
    id: 'V-08', label: 'V-08', category: 'vetted',
    conditions: {
      c1: 'Breaks PDH, closes Inside',
      c2: 'Inside bar, ranging',
      c3: 'Breaks Setup Low + PDL, holds below',
      c4: 'Inside bar, ranges',
    },
    entry: 'Above C3 High', bias: 'Bearish', target: '2 S.D',
    features: fv(1,0, 0,0, 2,2, 0,0, 0,6,0),
  },
  {
    id: 'V-09', label: 'V-09', category: 'vetted',
    conditions: {
      c1: 'Inside PDR',
      c2: 'Breaks C1 Low, holds below',
      c3: 'Inside bar, ranging',
      c4: 'Breaks C3 Low, holds below',
    },
    entry: 'Above C3 High', bias: 'Bearish', target: 'PDL / 2 S.D',
    features: fv(0,0, 2,2, 0,0, 2,2),
  },
  {
    id: 'V-10', label: 'V-10', category: 'vetted',
    conditions: {
      c1: 'Breaks PDL, closes Inside PDR',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Inside bar, ranging',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Above C4 / 7am High', bias: 'Bearish', target: 'C2 Low',
    features: fv(2,0, 2,0, 0,0, 1,1),
  },
  {
    id: 'V-11', label: 'V-11', category: 'vetted',
    conditions: {
      c1: 'Inside PDR – Trends down',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Inside bar, ranges',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Above C4 / 7am High', bias: 'Bearish', target: 'PDL',
    features: fv(0,2, 2,0, 0,0, 1,1),
  },
  {
    id: 'V-12', label: 'V-12', category: 'vetted',
    conditions: {
      c1: 'Inside PDR – Trends Up',
      c2: 'Breaks C1 High, holds above',
      c3: 'Breaks C2 High, closes Inside',
      c4: 'Inside bar, ranges',
    },
    entry: 'Below C1 Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,1, 1,1, 1,0, 0,0),
  },
  {
    id: 'V-13', label: 'V-13', category: 'vetted',
    conditions: {
      c1: 'Inside bar, ranging',
      c2: 'Breaks High + PDH, holds above',
      c3: 'Breaks C2 High, holds above',
      c4: 'Inside bar, ranging',
    },
    entry: 'Below C4 Low / 7am Low', bias: 'Bullish', target: '2 S.D',
    features: fv(0,0, 1,1, 1,1, 0,0, 1,0,0),
  },
  {
    id: 'V-14', label: 'V-14', category: 'vetted',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Breaks C1 High, holds above',
      c3: 'Breaks C2 High, closes Inside',
      c4: 'Inside bar, range',
    },
    entry: 'Below C1 Low', bias: 'Bullish', target: 'C3 High, 2 S.D',
    features: fv(1,1, 1,1, 1,0, 0,0),
  },
  {
    id: 'V-15', label: 'V-15', category: 'vetted',
    conditions: {
      c1: 'Inside PDR – Trends Up',
      c2: 'Breaks C1 + PDH, closes Inside PDR',
      c3: 'Inside bar, ranging',
      c4: 'Inside bar',
    },
    entry: 'Above C2 High', bias: 'Bearish', target: 'PDL (then Bullish)',
    features: fv(0,1, 1,0, 0,0, 0,0),
  },
  {
    id: 'V-16', label: 'V-16', category: 'vetted',
    conditions: {
      c1: 'Inside PDR, ranges',
      c2: 'Breaks C1 Low + PDL, holds below',
      c3: 'Inside bar, ranges',
      c4: 'Breaks C3 Low, closes back Inside',
    },
    entry: '7am Open', bias: 'Bullish', target: 'PDH',
    features: fv(0,0, 2,2, 0,0, 2,0, 2,0,0),
  },
  {
    id: 'V-17', label: 'V-17', category: 'vetted',
    conditions: {
      c1: 'Inside PDR – Trends Up',
      c2: 'Breaks C1 High, holds above + PDH, closes Inside',
      c3: 'Breaks C2 Low, closes Inside',
      c4: 'Breaks C3 Low, closes Inside',
    },
    entry: 'Below 7am Low', bias: 'Bullish', target: '2 S.D',
    features: fv(0,1, 1,0, 2,0, 2,0),
  },
  {
    id: 'V-18', label: 'V-18', category: 'vetted',
    conditions: {
      c1: 'Inside PDR – Trends down',
      c2: 'Inside bar, ranges',
      c3: 'Breaks Setup Low, holds below',
      c4: 'Inside bar, ranges',
    },
    entry: 'Below 7am Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,2, 0,0, 2,2, 0,0),
  },
  {
    id: 'V-19', label: 'V-19', category: 'vetted',
    conditions: {
      c1: 'Inside PDR, ranges',
      c2: 'Breaks C1 Low + PDL, holds below',
      c3: 'Breaks C2 Low, holds below',
      c4: 'Breaks C3 High, closes Inside',
    },
    entry: 'Above 7am / C2 High', bias: 'Bearish', target: 'SD',
    features: fv(0,0, 2,2, 2,2, 1,0, 2,0,0),
  },
  {
    id: 'V-20', label: 'V-20', category: 'vetted',
    conditions: {
      c1: 'Breaks PDL, holds below',
      c2: 'Breaks C1 Low, holds below',
      c3: 'Breaks C2 High, closes Inside',
      c4: 'Breaks C3 Low, holds below',
    },
    entry: 'Above C3 High', bias: 'Bearish', target: '—',
    features: fv(2,2, 2,2, 1,0, 2,2),
  },
  {
    id: 'V-21', label: 'V-21', category: 'vetted',
    conditions: {
      c1: 'Breaks PDH, closes Inside',
      c2: 'Breaks C1 Low, holds below',
      c3: 'Breaks C2 Low, holds below',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Below Fam Low', bias: 'Bullish', target: 'PDH (then Bearish)',
    features: fv(1,0, 2,2, 2,2, 1,1),
  },
  {
    id: 'V-22', label: 'V-22', category: 'vetted',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: 'Inside bar, ranging',
      c3: 'Breaks Setup High, holds above',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Above Fam High / PDH', bias: 'Bearish', target: 'C1 Low, PDL',
    features: fv(0,0, 0,0, 1,1, 1,1),
  },
  {
    id: 'V-23', label: 'V-23', category: 'vetted',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: '[Whipsaw] Breaks Low then High & Low, closes Below',
      c3: '[Whipsaw] Breaks C2 low + PDL then Setup High, holds above',
      c4: 'Inside bar, ranging',
    },
    entry: 'Below 7am Low', bias: 'Bullish', target: '—',
    features: fv(0,0, 3,2, 3,1, 0,0),
  },
  {
    id: 'V-24', label: 'V-24', category: 'vetted',
    conditions: {
      c1: 'Breaks PDL, closes Inside',
      c2: 'Inside bar, ranging',
      c3: 'Breaks Setup Low, holds below',
      c4: 'Inside bar, trends up',
    },
    entry: 'Below C3 Low / Above C3 High', bias: 'Mixed', target: 'PDH',
    notes: '1st Bearish then Bullish above C3 High',
    features: fv(2,0, 0,0, 2,2, 0,1),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INSIDE PDR SCENARIOS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'IP-01', label: 'IP-01', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR – Trends down',
      c2: 'Inside bar, ranging',
      c3: 'Breaks C2 + C1 Low (Setup Low), holds below',
      c4: 'Inside bar, ranging',
    },
    entry: 'Above 7am / C4 High', bias: 'Bearish', target: 'PDL',
    features: fv(0,2, 0,0, 2,2, 0,0),
  },
  {
    id: 'IP-02', label: 'IP-02', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR – Trends down / ranging',
      c2: 'Inside bar, ranging',
      c3: 'Breaks C2 Low, closes Inside',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Above C1 / C4 High', bias: 'Heavily Bearish', target: 'PDL',
    features: fv(0,2, 0,0, 2,0, 1,1),
  },
  {
    id: 'IP-03', label: 'IP-03', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR – Trends Up',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Inside bar, trends up',
      c4: 'Breaks C3 + C2 High, closes Inside',
    },
    entry: 'Below 7am Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,1, 2,0, 0,1, 1,0),
  },
  {
    id: 'IP-04', label: 'IP-04', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR – Trends Up',
      c2: 'Breaks C1 High, closes Inside',
      c3: 'Breaks C2 High, closes Inside',
      c4: 'Inside bar, ranging',
    },
    entry: 'Below 7am / C2 Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,1, 1,0, 1,0, 0,0),
  },
  {
    id: 'IP-05', label: 'IP-05', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR – Trends Up',
      c2: 'Breaks C1 High, closes Inside',
      c3: 'Breaks C2 Low + C1 Low (Setup Low), holds below',
      c4: 'Inside bar, ranges',
    },
    entry: 'Below C3 Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,1, 1,0, 2,2, 0,0),
  },
  {
    id: 'IP-06', label: 'IP-06', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR – Trends Up',
      c2: 'Breaks C1 High, holds above',
      c3: 'Breaks C2 Low, holds below',
      c4: 'Breaks C3 Low, holds below',
    },
    entry: 'Above C2 High', bias: 'Bearish', target: 'PDL',
    features: fv(0,1, 1,1, 2,2, 2,2),
  },
  {
    id: 'IP-07', label: 'IP-07', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: 'Breaks C1 High, holds above',
      c3: 'Breaks C2 High + PDH, closes Inside',
      c4: 'Inside bar, ranging',
    },
    entry: 'Below C4 / 7am Low', bias: 'Bullish', target: '2 S.D',
    features: fv(0,0, 1,1, 1,0, 0,0, 0,1,0),
  },
  {
    id: 'IP-08', label: 'IP-08', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR – Trend up',
      c2: 'Breaks C1 High, closes Inside',
      c3: 'Inside bar, ranging',
      c4: 'Breaks C3 High + Setup (C2) High, holds above',
    },
    entry: 'Below C1 Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,1, 1,0, 0,0, 1,1, 0,0,3),
  },
  {
    id: 'IP-09', label: 'IP-09', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR, ranges',
      c2: 'Breaks C1 Low + PDL, closes below',
      c3: 'Breaks C2 Low, closes Inside',
      c4: 'Inside bar, trends down',
    },
    entry: 'Below C3 Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,0, 2,2, 2,0, 0,2, 2,0,0),
  },
  {
    id: 'IP-10', label: 'IP-10', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR – Trend down',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Breaks C2 High, closes Inside',
      c4: 'Inside bar, ranging',
    },
    entry: '1st FVG after 7am', bias: 'Bearish', target: 'PDL',
    features: fv(0,2, 2,0, 1,0, 0,0),
  },
  {
    id: 'IP-11', label: 'IP-11', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Breaks Setup High + PDH, closes Inside',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Above C4 / 7am High (whichever highest)', bias: 'Bearish', target: 'PDL',
    features: fv(0,0, 2,0, 1,0, 1,1, 0,5,0),
  },
  {
    id: 'IP-12', label: 'IP-12', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR – Trend up / ranging',
      c2: 'Breaks C1 High + PDH, closes Inside',
      c3: 'Breaks C2 Low + Setup (C1) Low, holds below',
      c4: 'Breaks C3 Low, closes Inside',
    },
    entry: 'Below C4 Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,1, 1,0, 2,2, 2,0, 1,4,0),
  },
  {
    id: 'IP-13', label: 'IP-13', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Breaks C2 High, closes Inside',
      c4: 'Breaks C3 Low, closes Inside',
    },
    entry: 'Above C4 / 7am High', bias: 'Heavily Bearish', target: 'PDL or New Lows',
    features: fv(0,0, 2,0, 1,0, 2,0),
  },
  {
    id: 'IP-14', label: 'IP-14', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR – Trends down',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Breaks C2 High, holds above',
      c4: 'Inside bar, ranges',
    },
    entry: 'Above 7am High', bias: 'Heavily Bearish', target: 'PDL',
    features: fv(0,2, 2,0, 1,1, 0,0),
  },
  {
    id: 'IP-15', label: 'IP-15', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: 'Breaks C1 Low, holds below',
      c3: 'Inside bar, ranging',
      c4: 'Breaks C3 Low, closes Inside',
    },
    entry: '1st FVG after 7am', bias: 'Bullish', target: 'PDH',
    features: fv(0,0, 2,2, 0,0, 2,0, 2,0,0),
  },
  {
    id: 'IP-16', label: 'IP-16', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR – Ranging / trending up',
      c2: 'Breaks C1 High, closes Inside',
      c3: 'Breaks C2 High, closes above',
      c4: 'Breaks C3 High, closes Inside',
    },
    entry: 'Below 7am Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,1, 1,0, 1,1, 1,0),
  },
  {
    id: 'IP-17', label: 'IP-17', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Breaks C2 High, closes above',
      c4: 'Breaks C3 + Setup High, closes Inside',
    },
    entry: 'Above C4 High', bias: 'Bearish', target: 'PDL',
    features: fv(0,0, 2,0, 1,1, 1,0),
  },
  {
    id: 'IP-18', label: 'IP-18', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: 'Breaks C1 Low + PDL, holds below',
      c3: 'Breaks C2 Low, holds below',
      c4: 'Breaks C3 High, closes Inside',
    },
    entry: 'Above C4 High', bias: 'Bearish', target: 'New Lows',
    features: fv(0,0, 2,2, 2,2, 1,0, 2,0,0),
  },
  {
    id: 'IP-19', label: 'IP-19', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR, ranges',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Breaks C2 Low, closes Inside',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Below C3 / 7am Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,0, 2,0, 2,0, 1,1),
  },
  {
    id: 'IP-20', label: 'IP-20', category: 'inside_pdr',
    conditions: {
      c1: 'Inside PDR – Ranging / Trends Up',
      c2: 'Breaks C1 High, closes Inside',
      c3: 'Breaks C2 High, holds above',
      c4: 'Inside bar, ranging',
    },
    entry: 'Above 7am / C3 High', bias: 'Bearish', target: 'PDL',
    features: fv(0,1, 1,0, 1,1, 0,0),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WHIPSAW SCENARIOS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'W-01', label: 'W-01', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: 'Breaks C1 Low, holds below',
      c3: 'Whipsaw: breaks C2 Low then C2 High, closes inside setup range',
      c4: 'Inside bar, ranging',
    },
    entry: '1st FVG after 7am / below C3 Low', bias: 'Mixed', target: '2 S.D',
    notes: 'Bearish then Bullish',
    features: fv(0,0, 2,2, 3,0, 0,0),
  },
  {
    id: 'W-02', label: 'W-02', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR – Trends down',
      c2: 'Whipsaw: breaks C1 Low then C1 High, holds above',
      c3: 'Breaks C2 High + PDH, closes Inside PDR',
      c4: 'Breaks C3 Low, holds below',
    },
    entry: 'Above 7am High', bias: 'Bearish', target: 'PDL',
    features: fv(0,2, 3,1, 1,0, 2,2, 0,1,0),
  },
  {
    id: 'W-03', label: 'W-03', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR – Trends up',
      c2: 'Inside bar, trends down',
      c3: 'Whipsaw: breaks C2 Low then C1 High, closes Inside',
      c4: 'Inside bar, ranging',
    },
    entry: '1st FVG after 7am', bias: 'Bearish', target: 'PDL',
    features: fv(0,1, 0,2, 3,0, 0,0),
  },
  {
    id: 'W-04', label: 'W-04', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR – Trend down',
      c2: 'Whipsaw: breaks C1 Low then C1 High, closes above',
      c3: 'Breaks C2 High, holds above',
      c4: 'Inside bar, ranges',
    },
    entry: 'Below C3 / 7am Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,2, 3,1, 1,1, 0,0),
  },
  {
    id: 'W-05', label: 'W-05', category: 'whipsaw',
    conditions: {
      c1: 'Whipsaw: breaks PDL then PDH, holds above',
      c2: 'Inside bar, ranges',
      c3: 'Whipsaw: breaks C1 High then C2 Low, closes Inside',
      c4: 'Inside bar, range',
    },
    entry: 'Below C1 Low', bias: 'Bullish', target: 'C3 High',
    features: fv(0,0, 0,0, 3,0, 0,0),
  },
  {
    id: 'W-06', label: 'W-06', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: 'Breaks C1 High, holds above',
      c3: 'Whipsaw: breaks C2 High then Setup (C1) Low, closes Inside',
      c4: 'Inside bar, trends down',
    },
    entry: '1st FVG after 7am', bias: 'Bearish', target: 'PDL',
    features: fv(0,0, 1,1, 3,0, 0,2),
  },
  {
    id: 'W-07', label: 'W-07', category: 'whipsaw',
    conditions: {
      c1: 'Breaks PDH, closes Inside',
      c2: 'Breaks C1 High, holds above',
      c3: 'Whipsaw: breaks C2 High then C2 Low, closes below C2 Low',
      c4: 'Breaks C3 Low, closes Inside (trends up)',
    },
    entry: 'Below 7am Low / C1 Low', bias: 'Heavily Bullish', target: '2 S.D',
    features: fv(1,0, 1,1, 3,2, 2,0),
  },
  {
    id: 'W-08', label: 'W-08', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR – Trends down',
      c2: 'Inside bar, range',
      c3: 'Whipsaw: breaks C2 High + Setup (C1) Low, closes below',
      c4: 'Inside bar, range',
    },
    entry: 'Below 7am / C3 Low', bias: 'Heavily Bullish', target: 'PDH',
    features: fv(0,2, 0,0, 3,2, 0,0),
  },
  {
    id: 'W-09', label: 'W-09', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR – Trends up',
      c2: 'Whipsaw: breaks C1 High then C1 Low, closes Inside',
      c3: 'Breaks C2 Low, holds below',
      c4: 'Breaks C3 Low, closes Inside',
    },
    entry: 'Below C4 Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,1, 3,0, 2,2, 2,0),
  },
  {
    id: 'W-10', label: 'W-10', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR, ranges',
      c2: 'Triple Whipsaw: breaks C1 Low then C1 High then Low again, closes below',
      c3: 'Whipsaw: breaks C2 Low + PDL then C2 High, holds above',
      c4: 'Inside bar, ranges',
    },
    entry: 'Below 7am Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,0, 3,2, 3,1, 0,0),
  },
  {
    id: 'W-11', label: 'W-11', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR – Trends down',
      c2: 'Whipsaw: breaks C1 Low then C1 High + PDH, holds above',
      c3: 'Breaks C2 High, holds above',
      c4: 'Breaks C3 High, closes Inside',
    },
    entry: 'Above C4/7am High then below C2 Low', bias: 'Mixed', target: 'PDH',
    notes: 'Bearish entry above C4, then Bullish below C2 Low',
    features: fv(0,2, 3,1, 1,1, 1,0, 1,0,0),
  },
  {
    id: 'W-12', label: 'W-12', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR – Trends down',
      c2: 'Breaks C1 Low + PDL, closes Inside',
      c3: 'Whipsaw: breaks C2 Low then C2 High, closes above',
      c4: 'Breaks C3 High, closes Inside',
    },
    entry: 'Below 7am / C4 Low', bias: 'Heavily Bullish', target: 'PDH',
    features: fv(0,2, 2,0, 3,1, 1,0),
  },
  {
    id: 'W-13', label: 'W-13', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR – Trends down',
      c2: 'Inside bar, ranging',
      c3: 'Whipsaw: breaks C2 Low then C2 High, closes Inside',
      c4: 'Inside bar, ranging',
    },
    entry: 'Above C3 High', bias: 'Bearish', target: 'PDL',
    features: fv(0,2, 0,0, 3,0, 0,0),
  },
  {
    id: 'W-14', label: 'W-14', category: 'whipsaw',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Inside bar, ranges',
      c3: 'Whipsaw: breaks Setup High then C2 Low, closes inside setup range',
      c4: 'Breaks C3 Low, closes Inside',
    },
    entry: 'Above C4 / 7am High', bias: 'Bearish', target: 'PDL',
    features: fv(1,1, 0,0, 3,0, 2,0),
  },
  {
    id: 'W-15', label: 'W-15', category: 'whipsaw',
    conditions: {
      c1: 'Breaks PDL, closes Inside PDR',
      c2: 'Breaks C1 High, holds above',
      c3: 'Whipsaw: breaks C2 High then C2 Low, closes Inside',
      c4: 'Inside bar, ranges',
    },
    entry: '1st FVG after 7am', bias: 'Bullish', target: 'PDH',
    features: fv(2,0, 1,1, 3,0, 0,0),
  },
  {
    id: 'W-16', label: 'W-16', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: 'Breaks C1 High, closes Inside C1',
      c3: 'Whipsaw: breaks C2 High then C1 Low, closes Inside',
      c4: 'Breaks C3 Low, holds below + PDL',
    },
    entry: '1st FVG after 7am', bias: 'Bullish', target: 'PDH',
    features: fv(0,0, 1,0, 3,0, 2,2),
  },
  {
    id: 'W-17', label: 'W-17', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: 'Whipsaw: breaks C1 High then C1 Low, holds below',
      c3: 'Breaks C2 Low, holds below + PDL',
      c4: 'Breaks C3 Low, closes Inside',
    },
    entry: '1st FVG after 7am / C2 High', bias: 'Bearish', target: 'Lower Low / 2 S.D',
    features: fv(0,0, 3,2, 2,2, 2,0, 0,2,0),
  },
  {
    id: 'W-18', label: 'W-18', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR – Trend down',
      c2: 'Inside bar, ranging',
      c3: 'Whipsaw: breaks C2 Low then C2 + C1 High, holds above',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Below C3 Low', bias: 'Bullish', target: 'PDH',
    features: fv(0,2, 0,0, 3,1, 1,1, 0,3,0),
  },
  {
    id: 'W-19', label: 'W-19', category: 'whipsaw',
    conditions: {
      c1: 'Inside PDR, ranging',
      c2: 'Breaks C1 High, holds above',
      c3: 'Whipsaw: breaks C2 Low then Setup (C2) High, holds above',
      c4: 'Breaks C3 High, closes Inside',
    },
    entry: '1st FVG after 7am', bias: 'Bullish', target: 'PDH',
    features: fv(0,0, 1,1, 3,1, 1,0),
  },
  {
    id: 'W-20', label: 'W-20', category: 'whipsaw',
    conditions: {
      c1: 'Breaks PDL, holds below',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Whipsaw: breaks C2 Low then C2 High, holds above',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Below C3 Low', bias: 'Bullish', target: 'PDH',
    features: fv(2,2, 2,0, 3,1, 1,1),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PDH BREAK SCENARIOS  (41–60)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'PDH-41', label: 'PDH-41', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Breaks C1 Low, holds below',
      c3: 'Whipsaw: breaks Setup Low then C2 High, closes Inside',
      c4: 'Breaks C3 High, holds above',
    },
    entry: '1st FVG after 7am / Below 7am Low', bias: 'Bullish', target: 'New High',
    features: fv(1,1, 2,2, 3,0, 1,1),
  },
  {
    id: 'PDH-42', label: 'PDH-42', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Breaks C1 High, holds above',
      c3: 'Breaks C2 High, holds above',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Below C1 Low', bias: 'Bullish', target: 'Higher High',
    features: fv(1,1, 1,1, 1,1, 1,1),
  },
  {
    id: 'PDH-43', label: 'PDH-43', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, closes Inside',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Breaks C2 + C1 (Setup) High, holds above',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Below C3 Low', bias: 'Bullish', target: 'Higher High',
    features: fv(1,0, 2,0, 1,1, 1,1, 0,3,0),
  },
  {
    id: 'PDH-44', label: 'PDH-44', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, closes Inside',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Breaks C2 Low, holds below',
      c4: 'Inside bar, ranging',
    },
    entry: 'Above C4 / 7am High', bias: 'Bearish', target: 'PDL',
    features: fv(1,0, 2,0, 2,2, 0,0),
  },
  {
    id: 'PDH-45', label: 'PDH-45', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, closes Inside',
      c2: 'Breaks C1 High, holds above',
      c3: 'Whipsaw: breaks C2 High then C2 Low, closes below',
      c4: 'Breaks C3 Low + Setup Low',
    },
    entry: 'Above 7am High', bias: 'Bearish', target: 'PDL',
    features: fv(1,0, 1,1, 3,2, 2,2),
  },
  {
    id: 'PDH-46', label: 'PDH-46', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Breaks C1 High, holds above',
      c3: 'Whipsaw: breaks C2 High then C2 Low, closes Inside',
      c4: 'Inside bar, ranging',
    },
    entry: '1st FVG after 7am', bias: 'Bullish', target: '1 S.D',
    notes: 'CAUTION: Heavy bearishness incoming',
    features: fv(1,1, 1,1, 3,0, 0,0),
  },
  {
    id: 'PDH-47', label: 'PDH-47', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Breaks C1 High, closes Inside',
      c3: 'Breaks C2 + C1 (Setup) Low, closes Inside',
      c4: 'Breaks C3 High, closes Inside',
    },
    entry: 'Above C4 High', bias: 'Bearish', target: 'PDL',
    features: fv(1,1, 1,0, 2,0, 1,0, 0,4,0),
  },
  {
    id: 'PDH-48', label: 'PDH-48', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, closes Inside',
      c2: 'Breaks C1 Low, holds below',
      c3: 'Breaks C2 Low, holds below',
      c4: 'Breaks C3 High, closes Inside',
    },
    entry: 'Below 7am Low then Above C1 High', bias: 'Mixed', target: 'PDL, New Low',
    notes: 'Bullish below 7am Low, then Heavily Bearish above C1 High',
    features: fv(1,0, 2,2, 2,2, 1,0),
  },
  {
    id: 'PDH-49', label: 'PDH-49', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Breaks C1 High, holds above',
      c3: 'Whipsaw: breaks C2 High then Setup (C1) Low, holds below',
      c4: 'Breaks C3 Low, closes Inside',
    },
    entry: '1st FVG after 7am', bias: 'Bullish', target: 'New Highs',
    features: fv(1,1, 1,1, 3,2, 2,0, 0,4,0),
  },
  {
    id: 'PDH-50', label: 'PDH-50', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Breaks C1 High, holds above',
      c3: 'Breaks C2 High, holds above',
      c4: 'Inside bar, ranging',
    },
    entry: 'Below 7am Low', bias: 'Bullish', target: 'New Highs',
    features: fv(1,1, 1,1, 1,1, 0,0),
  },
  {
    id: 'PDH-51', label: 'PDH-51', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Breaks C1 High, holds above',
      c3: 'Whipsaw: breaks C2 High then C2 Low, closes below',
      c4: 'Breaks C3 Low, closes Inside',
    },
    entry: 'Above 7am High', bias: 'Bearish', target: 'PDL',
    features: fv(1,1, 1,1, 3,2, 2,0, 0,4,0),
  },
  {
    id: 'PDH-52', label: 'PDH-52', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, closes Inside',
      c2: 'Breaks C1 Low, holds below',
      c3: 'Whipsaw: breaks Setup Low then Setup High, closes Inside',
      c4: 'Inside bar, ranging',
    },
    entry: '1st FVG after 7am / Below 7am Low', bias: 'Bullish', target: 'New High',
    features: fv(1,0, 2,2, 3,0, 0,0),
  },
  {
    id: 'PDH-53', label: 'PDH-53', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Breaks C1 High, closes Inside',
      c3: 'Breaks C2 Low, closes Inside',
      c4: 'Inside bar, range',
    },
    entry: '1st FVG after 7am', bias: 'Bullish', target: 'New High',
    features: fv(1,1, 1,0, 2,0, 0,0, 0,4,0),
  },
  {
    id: 'PDH-54', label: 'PDH-54', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Inside bar, ranging',
      c3: 'Breaks C2 Low, closes Inside',
      c4: 'Inside bar, ranging',
    },
    entry: 'Below C3 / 7am Low', bias: 'Bullish', target: 'New Highs',
    features: fv(1,1, 0,0, 2,0, 0,0),
  },
  {
    id: 'PDH-55', label: 'PDH-55', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, closes Inside',
      c2: 'Breaks C1 High / Inside bar, closes Inside',
      c3: 'Breaks Setup (C2) High, holds above',
      c4: 'Inside bar, ranges',
    },
    entry: 'Above C3 High', bias: 'Bearish', target: 'PDL',
    features: fv(1,0, 1,0, 1,1, 0,0),
  },
  {
    id: 'PDH-56', label: 'PDH-56', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Breaks C1 High, closes Inside',
      c3: 'Breaks C2 + C1 (Setup) Low, holds below',
      c4: 'Breaks C3 + PDL, closes Inside',
    },
    entry: 'Above C3 High', bias: 'Bearish', target: 'New Lows',
    features: fv(1,1, 1,0, 2,2, 2,0, 0,4,2),
  },
  {
    id: 'PDH-57', label: 'PDH-57', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Breaks C1 High, closes Inside',
      c3: 'Breaks C2 + C1 (Setup) Low, closes Inside',
      c4: 'Inside bar, ranging',
    },
    entry: 'Below 7am Low', bias: 'Bullish', target: 'New Highs / 1 S.D',
    features: fv(1,1, 1,0, 2,0, 0,0, 0,4,0),
  },
  {
    id: 'PDH-58', label: 'PDH-58', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, closes Inside',
      c2: 'Breaks C1 Low, holds below',
      c3: 'Breaks C2 Low, closes Inside',
      c4: 'Breaks C3 + C2 High, closes / holds above',
    },
    entry: 'Below C3 Low', bias: 'Bullish', target: 'New Highs',
    features: fv(1,0, 2,2, 2,0, 1,1, 0,0,3),
  },
  {
    id: 'PDH-59', label: 'PDH-59', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, holds above',
      c2: 'Breaks C1 High, holds above',
      c3: 'Breaks C2 High, holds above',
      c4: 'Breaks C3 High, closes Inside',
    },
    entry: 'Above C4 High', bias: 'Bearish', target: 'PDL',
    features: fv(1,1, 1,1, 1,1, 1,0),
  },
  {
    id: 'PDH-60', label: 'PDH-60', category: 'pdh_break',
    conditions: {
      c1: 'Breaks PDH, closes Inside PDR',
      c2: 'Breaks C1 High, closes Inside',
      c3: 'Breaks C2 High, closes above',
      c4: 'Breaks C3 High, closes Inside',
    },
    entry: 'Above C4 / 7am High', bias: 'Heavily Bearish', target: 'PDL',
    features: fv(1,0, 1,0, 1,1, 1,0),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PDL BREAK SCENARIOS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'PDL-01', label: 'PDL-01', category: 'pdl_break',
    conditions: {
      c1: 'Breaks PDL, closes Inside',
      c2: 'Inside bar, ranging',
      c3: 'Whipsaw: breaks C2 + C1 High then C2 Low, closes Inside',
      c4: 'Breaks C3 + Setup Low, closes Inside',
    },
    entry: 'Below C4 Low', bias: 'Bullish', target: 'PDH',
    features: fv(2,0, 0,0, 3,0, 2,0),
  },
  {
    id: 'PDL-02', label: 'PDL-02', category: 'pdl_break',
    conditions: {
      c1: 'Breaks PDL, closes Inside',
      c2: 'Breaks C1 High, holds above',
      c3: 'Breaks C2 High, holds above',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Above C4 High', bias: 'Bearish', target: 'New Lows',
    features: fv(2,0, 1,1, 1,1, 1,1, 0,0,1),
  },
  {
    id: 'PDL-03', label: 'PDL-03', category: 'pdl_break',
    conditions: {
      c1: 'Breaks PDL, holds below',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Whipsaw: breaks C2 High then C2 Low, holds below',
      c4: 'Breaks C3 Low, closes Inside',
    },
    entry: '1st FVG after 7am', bias: 'Bullish', target: 'PDH',
    features: fv(2,2, 2,0, 3,2, 2,0),
  },
  {
    id: 'PDL-04', label: 'PDL-04', category: 'pdl_break',
    conditions: {
      c1: 'Breaks PDL, closes Inside',
      c2: 'Breaks C1 High, closes Inside',
      c3: 'Breaks C2 High, holds above',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'Below C1 Low', bias: 'Bullish', target: 'PDH, New High',
    features: fv(2,0, 1,0, 1,1, 1,1),
  },
  {
    id: 'PDL-05', label: 'PDL-05', category: 'pdl_break',
    conditions: {
      c1: 'Breaks PDL, closes Inside',
      c2: 'Inside bar, ranging',
      c3: 'Breaks C2 + C1 (Setup) High, holds above',
      c4: 'Breaks C3 High, closes Inside',
    },
    entry: 'Below C3 / 7am Low', bias: 'Bullish', target: '2 S.D',
    features: fv(2,0, 0,0, 1,1, 1,0, 0,3,0),
  },
  {
    id: 'PDL-06', label: 'PDL-06', category: 'pdl_break',
    conditions: {
      c1: 'Breaks PDL, closes / holds below',
      c2: 'Breaks C1 Low, holds below',
      c3: 'Breaks C2 Low, holds below',
      c4: 'Breaks C3 High + C2 High, holds above',
    },
    entry: 'Above C4 / 7am High', bias: 'Bearish', target: 'New Lows',
    features: fv(2,2, 2,2, 2,2, 1,1, 0,0,3),
  },
  {
    id: 'PDL-07', label: 'PDL-07', category: 'pdl_break',
    conditions: {
      c1: 'Breaks PDL, closes Inside',
      c2: 'Inside bar, ranging',
      c3: 'Whipsaw: breaks C2 Low then C2 + C1 High, holds above',
      c4: 'Breaks C3 High, holds above',
    },
    entry: '1st FVG after 7am / Below 7am Low', bias: 'Bullish', target: 'PDH',
    features: fv(2,0, 0,0, 3,1, 1,1, 0,3,0),
  },
  {
    id: 'PDL-08', label: 'PDL-08', category: 'pdl_break',
    conditions: {
      c1: 'Breaks PDL, holds below',
      c2: 'Breaks C1 Low, holds below',
      c3: 'Breaks C2 Low, holds below',
      c4: 'Breaks C3 High, holds above',
    },
    entry: 'No Entry', bias: 'Mixed', target: "Bearish look, Bullish after day's low",
    notes: 'CAUTION: Bulls incoming. No trade.',
    features: fv(2,2, 2,2, 2,2, 1,1, 0,0,3),
  },
  {
    id: 'PDL-09', label: 'PDL-09', category: 'pdl_break',
    conditions: {
      c1: 'Breaks PDL, closes Inside',
      c2: 'Inside bar, ranging',
      c3: 'Breaks C2 Low, closes Inside',
      c4: 'Breaks C3 + Setup High, holds above',
    },
    entry: 'Below 7am Low', bias: 'Bullish', target: 'PDH',
    features: fv(2,0, 0,0, 2,0, 1,1, 0,0,3),
  },
  {
    id: 'PDL-10', label: 'PDL-10', category: 'pdl_break',
    conditions: {
      c1: 'Breaks PDL, closes Inside',
      c2: 'Breaks C1 High, holds above',
      c3: 'Breaks C2 High, holds above',
      c4: 'Breaks C3 High + PDH, holds above',
    },
    entry: '1st FVG after 7am', bias: 'Bearish', target: 'New Lows',
    features: fv(2,0, 1,1, 1,1, 1,1, 0,0,1),
  },
  {
    id: 'PDL-11', label: 'PDL-11', category: 'pdl_break',
    conditions: {
      c1: 'Breaks PDL, closes / holds below',
      c2: 'Breaks C1 Low, closes Inside',
      c3: 'Breaks C2 Low, holds below',
      c4: 'Inside bar, ranging',
    },
    entry: 'Below 7am Low', bias: 'Bullish', target: 'PDH',
    features: fv(2,2, 2,0, 2,2, 0,0),
  },
  {
    id: 'PDL-12', label: 'PDL-12', category: 'pdl_break',
    conditions: {
      c1: 'Breaks PDL, holds below',
      c2: 'Inside bar, ranging',
      c3: 'Breaks C2 High, holds above',
      c4: 'Inside bar, trends down',
    },
    entry: 'Below 7am Low', bias: 'Bullish', target: 'PDH',
    features: fv(2,2, 0,0, 1,1, 0,2),
  },
];
