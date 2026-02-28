import { useEffect, useState } from 'react';
import { getAllLearningData, getRecentTrades } from '../lib/db';
import type { LearningRecord, TradeLog } from '../lib/db';
import { getScenarioById } from '../lib/engine';

export function Dashboard() {
  const [records, setRecords] = useState<LearningRecord[]>([]);
  const [trades, setTrades] = useState<TradeLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [r, t] = await Promise.all([getAllLearningData(), getRecentTrades(15)]);
      setRecords(r.sort((a, b) => b.currentWeight - a.currentWeight));
      setTrades(t);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 bg-accent rounded-full animate-bounce"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  const totalTrades = trades.length;
  const wins = trades.filter((t) => t.outcome === 'win').length;
  const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : null;

  const top5 = records.slice(0, 5);
  const bottom5 = [...records].sort((a, b) => a.currentWeight - b.currentWeight).slice(0, 5);

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center animate-fade-in">
        <div className="text-5xl opacity-30">📊</div>
        <p className="font-sans text-sm text-ink-3 max-w-xs">
          No learning data yet. Analyse some setups and log your outcomes to build your stats.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* ── Summary stats ── */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Trades" value={String(totalTrades)} />
        <StatCard label="Wins" value={String(wins)} color="text-bull" />
        <StatCard
          label="Win Rate"
          value={winRate !== null ? `${winRate}%` : '—'}
          color={winRate !== null && winRate >= 50 ? 'text-bull' : 'text-bear'}
        />
      </div>

      {/* ── Top performing ── */}
      <Section title="↑ Highest Confidence" color="text-bull">
        {top5.map((r) => (
          <ScenarioRow key={r.id} record={r} />
        ))}
      </Section>

      {/* ── Bottom performing ── */}
      <Section title="↓ Lowest Confidence" color="text-bear">
        {bottom5.map((r) => (
          <ScenarioRow key={r.id} record={r} />
        ))}
      </Section>

      {/* ── Recent trades ── */}
      <Section title="Recent Activity" color="text-ink-2">
        {trades.map((t) => {
          const s = getScenarioById(t.scenarioId);
          return (
            <div
              key={t.id}
              className="flex items-center justify-between py-2 border-b border-surface-3 last:border-0"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    t.outcome === 'win' ? 'bg-bull' : 'bg-bear'
                  }`}
                />
                <span className="font-mono text-xs text-ink-2">{s?.label ?? t.scenarioId}</span>
                <span className="font-mono text-[9px] text-ink-3 bg-surface-2 px-1.5 py-0.5 rounded uppercase">
                  {t.matchType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-ink-3">
                  {Math.round(t.similarity * 100)}%
                </span>
                <span
                  className={`font-mono text-xs font-bold uppercase ${
                    t.outcome === 'win' ? 'text-bull' : 'text-bear'
                  }`}
                >
                  {t.outcome}
                </span>
              </div>
            </div>
          );
        })}
      </Section>
    </div>
  );
}

function StatCard({ label, value, color = 'text-ink-1' }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-surface-1 border border-surface-3 rounded-xl p-3 flex flex-col gap-1 items-center">
      <span className={`font-mono text-xl font-bold ${color}`}>{value}</span>
      <span className="font-mono text-[9px] text-ink-3 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function Section({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-1 border border-surface-3 rounded-xl p-4 flex flex-col gap-1">
      <span className={`font-mono text-[10px] font-bold uppercase tracking-widest mb-2 ${color}`}>
        {title}
      </span>
      {children}
    </div>
  );
}

function ScenarioRow({ record }: { record: LearningRecord }) {
  const scenario = getScenarioById(record.scenarioId);
  const wr =
    record.totalWins + record.totalLosses > 0
      ? Math.round((record.totalWins / (record.totalWins + record.totalLosses)) * 100)
      : null;

  const weightColor =
    record.currentWeight >= 1.3
      ? 'text-bull'
      : record.currentWeight <= 0.7
      ? 'text-bear'
      : 'text-warn';

  return (
    <div className="flex items-center justify-between py-2 border-b border-surface-3 last:border-0">
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-xs font-semibold text-ink-1">
          {scenario?.label ?? record.scenarioId}
        </span>
        <span className="font-sans text-[10px] text-ink-3">
          {record.totalWins}W / {record.totalLosses}L
          {wr !== null && ` · ${wr}%`}
        </span>
      </div>
      <span className={`font-mono text-sm font-bold ${weightColor}`}>
        {record.currentWeight.toFixed(2)}x
      </span>
    </div>
  );
}
