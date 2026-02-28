import type { Scenario, FeatureVector, MatchResult } from '../data/types';
import { SCENARIOS } from '../data/scenarios';
import { getWeight } from './db';

// ─── Weighted KNN feature distances ──────────────────────────────────────────
// Weights reflect the relative importance of each feature to scenario identity.
// C1 context (inside/pdh/pdl) is the most discriminating; C4 is secondary.

const FEATURE_WEIGHTS: (keyof FeatureVector)[] = [
  'c1_context',
  'c1_behavior',
  'c2_action',
  'c2_close',
  'c3_action',
  'c3_close',
  'c4_action',
  'c4_close',
];

const IMPORTANCE: Record<keyof FeatureVector, number> = {
  c1_context:  2.5,
  c1_behavior: 1.5,
  c2_action:   2.0,
  c2_close:    1.5,
  c3_action:   2.0,
  c3_close:    1.5,
  c4_action:   1.5,
  c4_close:    1.0,
};

// Max possible distances per feature (used for normalization)
const FEATURE_MAX: Record<keyof FeatureVector, number> = {
  c1_context:  2,
  c1_behavior: 2,
  c2_action:   3,
  c2_close:    2,
  c3_action:   3,
  c3_close:    2,
  c4_action:   3,
  c4_close:    2,
};

function weightedDistance(a: FeatureVector, b: FeatureVector): number {
  let totalDist = 0;
  let totalWeight = 0;

  for (const key of FEATURE_WEIGHTS) {
    const diff = Math.abs(a[key] - b[key]);
    const normalised = diff / FEATURE_MAX[key];
    const w = IMPORTANCE[key];
    totalDist += normalised * w;
    totalWeight += w;
  }

  return totalDist / totalWeight; // 0 = identical, 1 = maximally different
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface RankedMatch {
  scenario: Scenario;
  distance: number;
  similarity: number;
  matchType: 'exact' | 'inferred';
  confidenceWeight: number;
}

export async function findMatches(
  input: FeatureVector,
  topK = 3,
): Promise<RankedMatch[]> {
  const ranked = await Promise.all(
    SCENARIOS.map(async (scenario) => {
      const distance = weightedDistance(input, scenario.features);
      const similarity = parseFloat((1 - distance).toFixed(4));
      const matchType: 'exact' | 'inferred' = distance === 0 ? 'exact' : 'inferred';
      const confidenceWeight = await getWeight(scenario.id);
      return { scenario, distance, similarity, matchType, confidenceWeight };
    }),
  );

  ranked.sort((a, b) => a.distance - b.distance);

  return ranked.slice(0, topK);
}

export async function findBestMatch(
  input: FeatureVector,
): Promise<MatchResult | null> {
  const matches = await findMatches(input, 1);
  if (!matches.length) return null;
  const m = matches[0];
  return {
    scenario: m.scenario,
    matchType: m.matchType,
    similarity: m.similarity,
    confidenceWeight: m.confidenceWeight,
  };
}

// ─── Category and bias stats (for Dashboard) ─────────────────────────────────

export function getScenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

export function getAllScenarios(): Scenario[] {
  return SCENARIOS;
}

export function getCategoryLabel(cat: Scenario['category']): string {
  const labels: Record<Scenario['category'], string> = {
    vetted: 'Vetted',
    inside_pdr: 'Inside PDR',
    whipsaw: 'Whipsaw',
    pdh_break: 'PDH Break',
    pdl_break: 'PDL Break',
  };
  return labels[cat];
}
