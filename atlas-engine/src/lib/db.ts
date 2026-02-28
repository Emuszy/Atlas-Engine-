import Dexie, { type Table } from 'dexie';

export interface LearningRecord {
  id?: number;
  scenarioId: string;
  totalWins: number;
  totalLosses: number;
  currentWeight: number;
  lastUpdated: Date;
}

export interface TradeLog {
  id?: number;
  scenarioId: string;
  outcome: 'win' | 'loss';
  matchType: 'exact' | 'inferred';
  similarity: number;
  timestamp: Date;
}

export class AtlasDatabase extends Dexie {
  learning!: Table<LearningRecord, number>;
  tradeLogs!: Table<TradeLog, number>;

  constructor() {
    super('AtlasEngineDB');
    this.version(1).stores({
      learning: '++id, scenarioId',
      tradeLogs: '++id, scenarioId, outcome, timestamp',
    });
  }
}

export const db = new AtlasDatabase();

// ─── Learning helpers ─────────────────────────────────────────────────────────

export async function getWeight(scenarioId: string): Promise<number> {
  const record = await db.learning.where('scenarioId').equals(scenarioId).first();
  return record?.currentWeight ?? 1.0;
}

export async function logOutcome(
  scenarioId: string,
  outcome: 'win' | 'loss',
  matchType: 'exact' | 'inferred',
  similarity: number,
): Promise<LearningRecord> {
  const STEP = 0.05;
  const MIN_WEIGHT = 0.1;
  const MAX_WEIGHT = 3.0;

  const existing = await db.learning.where('scenarioId').equals(scenarioId).first();

  let record: LearningRecord;

  if (existing && existing.id !== undefined) {
    const delta = outcome === 'win' ? STEP : -STEP;
    const newWeight = Math.min(
      MAX_WEIGHT,
      Math.max(MIN_WEIGHT, existing.currentWeight + delta),
    );
    record = {
      ...existing,
      totalWins: existing.totalWins + (outcome === 'win' ? 1 : 0),
      totalLosses: existing.totalLosses + (outcome === 'loss' ? 1 : 0),
      currentWeight: parseFloat(newWeight.toFixed(3)),
      lastUpdated: new Date(),
    };
    await db.learning.put(record);
  } else {
    const baseWeight = outcome === 'win' ? 1.05 : 0.95;
    record = {
      scenarioId,
      totalWins: outcome === 'win' ? 1 : 0,
      totalLosses: outcome === 'loss' ? 1 : 0,
      currentWeight: baseWeight,
      lastUpdated: new Date(),
    };
    await db.learning.add(record);
  }

  await db.tradeLogs.add({
    scenarioId,
    outcome,
    matchType,
    similarity,
    timestamp: new Date(),
  });

  return record;
}

export async function getAllLearningData(): Promise<LearningRecord[]> {
  return db.learning.toArray();
}

export async function getRecentTrades(limit = 20): Promise<TradeLog[]> {
  return db.tradeLogs.orderBy('timestamp').reverse().limit(limit).toArray();
}
