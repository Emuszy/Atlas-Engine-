import type { Scenario, FeatureVector, MatchResult } from '../data/types';
import { SCENARIOS } from '../data/scenarios';
import { getWeight } from './db';

// ─── Feature weights ──────────────────────────────────────────────────────────
// Qualifiers are supplementary — weight 1.2 means they refine but never dominate.
// Scenarios without qualifiers (q=0) simply have 0 distance on those features.

const FEATURE_KEYS: (keyof FeatureVector)[] = [
  'c1_context', 'c1_behavior',
  'c2_action', 'c2_close', 'c2_qualifier',
  'c3_action', 'c3_close', 'c3_qualifier',
  'c4_action', 'c4_close', 'c4_qualifier',
];

const IMPORTANCE: Record<keyof FeatureVector, number> = {
  c1_context:   2.5,
  c1_behavior:  1.5,
  c2_action:    2.0,
  c2_close:     1.5,
  c2_qualifier: 1.2,  // refining — not dominant
  c3_action:    2.0,
  c3_close:     1.5,
  c3_qualifier: 1.2,
  c4_action:    1.5,
  c4_close:     1.0,
  c4_qualifier: 1.0,
};

const FEATURE_MAX: Record<keyof FeatureVector, number> = {
  c1_context:   2,
  c1_behavior:  2,
  c2_action:    3,
  c2_close:     2,
  c2_qualifier: 6,
  c3_action:    3,
  c3_close:     2,
  c3_qualifier: 6,
  c4_action:    3,
  c4_close:     2,
  c4_qualifier: 6,
};

function weightedDistance(a: FeatureVector, b: FeatureVector): number {
  let totalDist = 0;
  let totalWeight = 0;
  for (const key of FEATURE_KEYS) {
    const diff = Math.abs(a[key] - b[key]);
    const normalised = diff / FEATURE_MAX[key];
    const w = IMPORTANCE[key];
    totalDist += normalised * w;
    totalWeight += w;
  }
  return totalDist / totalWeight;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface RankedMatch {
  scenario: Scenario;
  distance: number;
  similarity: number;
  matchType: 'exact' | 'inferred';
  confidenceWeight: number;
}

export async function findMatches(input: FeatureVector, topK = 3): Promise<RankedMatch[]> {
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

export async function findBestMatch(input: FeatureVector): Promise<MatchResult | null> {
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
