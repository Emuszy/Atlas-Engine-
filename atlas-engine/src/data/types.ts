// ─── Enums ────────────────────────────────────────────────────────────────────

export type C1Context = 'inside_pdr' | 'breaks_pdh' | 'breaks_pdl';
export type C1Behavior = 'ranging' | 'trends_up' | 'trends_down';
export type CandleAction = 'inside_bar' | 'breaks_high' | 'breaks_low' | 'whipsaw';
export type CandleClose = 'inside' | 'above' | 'below';

// Extra level also broken on the same candle move (0 = none — existing logic unchanged)
export type LevelQualifier =
  | 'none'
  | 'plus_pdh'
  | 'plus_pdl'
  | 'plus_setup_high'
  | 'plus_setup_low'
  | 'plus_pdh_and_setup'
  | 'plus_pdl_and_setup';

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

// ─── Feature vector ───────────────────────────────────────────────────────────
// Qualifiers are ADDITIVE — default 0 means "no extra level broken".
// Existing scenarios without qualifiers are completely unaffected.

export interface FeatureVector {
  c1_context:   number; // 0=inside_pdr, 1=breaks_pdh, 2=breaks_pdl
  c1_behavior:  number; // 0=ranging, 1=up, 2=down
  c2_action:    number; // 0=inside_bar, 1=breaks_high, 2=breaks_low, 3=whipsaw
  c2_close:     number; // 0=inside, 1=above, 2=below
  c2_qualifier: number; // 0=none,1=+PDH,2=+PDL,3=+SetupHigh,4=+SetupLow,5=+PDH&Setup,6=+PDL&Setup
  c3_action:    number;
  c3_close:     number;
  c3_qualifier: number;
  c4_action:    number;
  c4_close:     number;
  c4_qualifier: number;
}

// ─── Scenario ─────────────────────────────────────────────────────────────────

export interface Scenario {
  id: string;
  category: Category;
  label: string;
  conditions: { c1: string; c2: string; c3: string; c4: string };
  entry: string;
  bias: Bias;
  target: string;
  notes?: string;
  features: FeatureVector;
}

// ─── User input ───────────────────────────────────────────────────────────────

export interface UserInput {
  c1_context:   C1Context;
  c1_behavior:  C1Behavior;
  c2_action:    CandleAction;
  c2_close:     CandleClose;
  c2_qualifier: LevelQualifier;
  c3_action:    CandleAction;
  c3_close:     CandleClose;
  c3_qualifier: LevelQualifier;
  c4_action:    CandleAction;
  c4_close:     CandleClose;
  c4_qualifier: LevelQualifier;
}

// ─── Encode helpers ───────────────────────────────────────────────────────────

const LQ_MAP: Record<LevelQualifier, number> = {
  none:               0,
  plus_pdh:           1,
  plus_pdl:           2,
  plus_setup_high:    3,
  plus_setup_low:     4,
  plus_pdh_and_setup: 5,
  plus_pdl_and_setup: 6,
};

export function encodeInput(input: UserInput): FeatureVector {
  const c1c: Record<C1Context, number>    = { inside_pdr: 0, breaks_pdh: 1, breaks_pdl: 2 };
  const c1b: Record<C1Behavior, number>   = { ranging: 0, trends_up: 1, trends_down: 2 };
  const ca:  Record<CandleAction, number> = { inside_bar: 0, breaks_high: 1, breaks_low: 2, whipsaw: 3 };
  const cc:  Record<CandleClose, number>  = { inside: 0, above: 1, below: 2 };

  return {
    c1_context:   c1c[input.c1_context],
    c1_behavior:  c1b[input.c1_behavior],
    c2_action:    ca[input.c2_action],
    c2_close:     cc[input.c2_close],
    c2_qualifier: LQ_MAP[input.c2_qualifier],
    c3_action:    ca[input.c3_action],
    c3_close:     cc[input.c3_close],
    c3_qualifier: LQ_MAP[input.c3_qualifier],
    c4_action:    ca[input.c4_action],
    c4_close:     cc[input.c4_close],
    c4_qualifier: LQ_MAP[input.c4_qualifier],
  };
}

// ─── Match result ─────────────────────────────────────────────────────────────

export interface MatchResult {
  scenario: Scenario;
  matchType: 'exact' | 'inferred';
  similarity: number;
  confidenceWeight: number;
}
