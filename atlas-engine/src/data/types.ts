// ─── Enums (kept as string unions so they're self-documenting) ───────────────

export type C1Context = 'inside_pdr' | 'breaks_pdh' | 'breaks_pdl';
export type C1Behavior = 'ranging' | 'trends_up' | 'trends_down';
export type CandleAction = 'inside_bar' | 'breaks_high' | 'breaks_low' | 'whipsaw';
export type CandleClose = 'inside' | 'above' | 'below';

export type Bias =
  | 'Bullish'
  | 'Bearish'
  | 'Heavily Bullish'
  | 'Heavily Bearish'
  | 'Mixed';

export type Category =
  | 'vetted'
  | 'inside_pdr'
  | 'whipsaw'
  | 'pdh_break'
  | 'pdl_break';

// ─── Feature vector (used for KNN distance) ──────────────────────────────────

export interface FeatureVector {
  c1_context: number;   // 0=inside_pdr, 1=breaks_pdh, 2=breaks_pdl
  c1_behavior: number;  // 0=ranging, 1=up, 2=down
  c2_action: number;    // 0=inside_bar, 1=breaks_high, 2=breaks_low, 3=whipsaw
  c2_close: number;     // 0=inside, 1=above, 2=below
  c3_action: number;
  c3_close: number;
  c4_action: number;
  c4_close: number;
}

// ─── Main scenario type ───────────────────────────────────────────────────────

export interface Scenario {
  id: string;
  category: Category;
  label: string;          // human-readable ID e.g. "V-01", "W-03"
  conditions: {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
  };
  entry: string;
  bias: Bias;
  target: string;
  notes?: string;
  features: FeatureVector;
}

// ─── User input mirrors FeatureVector but uses string labels ─────────────────

export interface UserInput {
  c1_context: C1Context;
  c1_behavior: C1Behavior;
  c2_action: CandleAction;
  c2_close: CandleClose;
  c3_action: CandleAction;
  c3_close: CandleClose;
  c4_action: CandleAction;
  c4_close: CandleClose;
}

// ─── Encode helpers ───────────────────────────────────────────────────────────

export function encodeInput(input: UserInput): FeatureVector {
  const c1c: Record<C1Context, number> = {
    inside_pdr: 0, breaks_pdh: 1, breaks_pdl: 2,
  };
  const c1b: Record<C1Behavior, number> = {
    ranging: 0, trends_up: 1, trends_down: 2,
  };
  const ca: Record<CandleAction, number> = {
    inside_bar: 0, breaks_high: 1, breaks_low: 2, whipsaw: 3,
  };
  const cc: Record<CandleClose, number> = {
    inside: 0, above: 1, below: 2,
  };
  return {
    c1_context: c1c[input.c1_context],
    c1_behavior: c1b[input.c1_behavior],
    c2_action: ca[input.c2_action],
    c2_close: cc[input.c2_close],
    c3_action: ca[input.c3_action],
    c3_close: cc[input.c3_close],
    c4_action: ca[input.c4_action],
    c4_close: cc[input.c4_close],
  };
}

// ─── Match result ─────────────────────────────────────────────────────────────

export interface MatchResult {
  scenario: Scenario;
  matchType: 'exact' | 'inferred';
  similarity: number; // 0–1
  confidenceWeight: number; // from learning DB
}
