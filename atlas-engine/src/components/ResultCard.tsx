import { useState } from 'react';
import type { MatchResult, Scenario } from '../data/types';
import type { RankedMatch } from '../lib/engine';
import { getCategoryLabel } from '../lib/engine';
import { logOutcome } from '../lib/db';

interface ResultCardProps {
  result: MatchResult;
  alternatives: RankedMatch[];
  onFeedback: () => void;
}

function BiasTag({ bias }: { bias: Scenario['bias'] }) {
  const config: Record<
    Scenario['bias'],
    { bg: string; text: string; dot: string; label: string }
  > = {
    Bullish: { bg: 'bg-bull/10', text: 'text-bull', dot: 'bg-bull', label: '↑ BULLISH' },
    Bearish: { bg: 'bg-bear/10', text: 'text-bear', dot: 'bg-bear', label: '↓ BEARISH' },
    'Heavily Bullish': { bg: 'bg-bull/20', text: 'text-bull', dot: 'bg-bull animate-pulse', label: '↑↑ HEAVILY BULLISH' },
    'Heavily Bearish': { bg: 'bg-bear/20', text: 'text-bear', dot: 'bg-bear animate-pulse', label: '↓↓ HEAVILY BEARISH' },
    Mixed: { bg: 'bg-accent/10', text: 'text-accent', dot: 'bg-accent', label: '↕ MIXED' },
  };
  const c = config[bias];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${c.bg} ${c.text} font-mono text-xs font-bold uppercase tracking-wider`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function ConfidenceBar({ weight }: { weight: number }) {
  // weight range: 0.1 – 3.0, normalise to 0–100
  const pct = Math.min(100, Math.round(((weight - 0.1) / 2.9) * 100));
  const color =
    pct >= 70 ? 'bg-bull' : pct >= 40 ? 'bg-warn' : 'bg-bear';

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[10px] text-ink-3 uppercase tracking-widest">Confidence</span>
        <span className="font-mono text-xs font-semibold text-ink-2">
          {weight.toFixed(2)}x <span className="text-ink-3">({pct}%)</span>
        </span>
      </div>
      <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SimilarityRing({ similarity }: { similarity: number }) {
  const pct = Math.round(similarity * 100);
  const r = 16;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct === 100 ? '#00d68f' : pct >= 80 ? '#f0b429' : '#7c6df0';

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width="44" height="44" className="-rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" stroke="#2e2e4a" strokeWidth="3" />
        <circle
          cx="22" cy="22" r={r} fill="none"
          stroke={color} strokeWidth="3"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <span className="font-mono text-[10px] font-bold" style={{ color }}>
        {pct}%
      </span>
      <span className="font-mono text-[9px] text-ink-3 uppercase tracking-widest">Match</span>
    </div>
  );
}

export function ResultCard({ result, alternatives, onFeedback }: ResultCardProps) {
  const { scenario, matchType, similarity, confidenceWeight } = result;
  const [feedbackDone, setFeedbackDone] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [showAlts, setShowAlts] = useState(false);

  async function handleFeedback(outcome: 'win' | 'loss') {
    setFeedbackLoading(true);
    await logOutcome(scenario.id, outcome, matchType, similarity);
    setFeedbackDone(true);
    setFeedbackLoading(false);
    setTimeout(onFeedback, 400);
  }

  const matchBadge = matchType === 'exact'
    ? 'bg-bull/10 text-bull border-bull/30'
    : 'bg-accent/10 text-accent border-accent/30';

  return (
    <div className="flex flex-col gap-4 animate-slide-up">
      {/* ── Header ── */}
      <div className="bg-surface-1 border border-surface-3 rounded-xl p-4 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-widest ${matchBadge}`}>
              {matchType === 'exact' ? '✓ Exact Match' : '~ Inferred'}
            </span>
            <span className="font-mono text-[10px] text-ink-3 bg-surface-2 border border-surface-3 px-2 py-0.5 rounded-full uppercase tracking-widest">
              {getCategoryLabel(scenario.category)}
            </span>
          </div>
          <h2 className="font-mono text-2xl font-bold text-ink-1 tracking-tight">
            {scenario.label}
          </h2>
          <BiasTag bias={scenario.bias} />
        </div>
        <SimilarityRing similarity={similarity} />
      </div>

      {/* ── Target & Entry ── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-1 border border-surface-3 rounded-xl p-3 flex flex-col gap-1">
          <span className="font-mono text-[9px] text-ink-3 uppercase tracking-widest">Target</span>
          <span className="font-sans text-sm font-medium text-ink-1">{scenario.target}</span>
        </div>
        <div className="bg-surface-1 border border-surface-3 rounded-xl p-3 flex flex-col gap-1">
          <span className="font-mono text-[9px] text-ink-3 uppercase tracking-widest">Entry</span>
          <span className="font-sans text-sm font-medium text-ink-1">{scenario.entry}</span>
        </div>
      </div>

      {/* ── Confidence ── */}
      <div className="bg-surface-1 border border-surface-3 rounded-xl p-4">
        <ConfidenceBar weight={confidenceWeight} />
      </div>

      {/* ── Candle conditions ── */}
      <div className="bg-surface-1 border border-surface-3 rounded-xl p-4 flex flex-col gap-3">
        <span className="font-mono text-[10px] text-ink-3 uppercase tracking-widest">Scenario Structure</span>
        {(['c1', 'c2', 'c3', 'c4'] as const).map((c, i) => (
          <div key={c} className="flex gap-3 items-start">
            <span className="font-mono text-[10px] font-bold text-ink-3 bg-surface-2 border border-surface-4 rounded px-1.5 py-0.5 mt-0.5 shrink-0">
              C{i + 1}
            </span>
            <span className="font-sans text-sm text-ink-2 leading-relaxed">
              {scenario.conditions[c]}
            </span>
          </div>
        ))}
        {scenario.notes && (
          <div className="mt-1 px-3 py-2 bg-warn/10 border border-warn/30 rounded-lg">
            <span className="font-sans text-xs text-warn">⚠ {scenario.notes}</span>
          </div>
        )}
      </div>

      {/* ── Feedback ── */}
      {!feedbackDone ? (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] text-ink-3 uppercase tracking-widest text-center">
            Log Outcome
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleFeedback('win')}
              disabled={feedbackLoading}
              className="py-3 rounded-xl font-display font-semibold text-sm bg-bull/10 text-bull border border-bull/30 hover:bg-bull/20 active:scale-[0.97] transition-all duration-150 disabled:opacity-50"
            >
              ✓ Win
            </button>
            <button
              onClick={() => handleFeedback('loss')}
              disabled={feedbackLoading}
              className="py-3 rounded-xl font-display font-semibold text-sm bg-bear/10 text-bear border border-bear/30 hover:bg-bear/20 active:scale-[0.97] transition-all duration-150 disabled:opacity-50"
            >
              ✗ Loss
            </button>
          </div>
        </div>
      ) : (
        <div className="py-3 text-center font-sans text-sm text-ink-2 animate-fade-in">
          Logged ✓
        </div>
      )}

      {/* ── Alternatives ── */}
      {alternatives.length > 1 && (
        <div>
          <button
            onClick={() => setShowAlts(!showAlts)}
            className="w-full py-2 text-center font-mono text-[10px] text-ink-3 hover:text-ink-2 uppercase tracking-widest transition-colors"
          >
            {showAlts ? '▲ Hide' : '▼ Show'} Alternative Matches ({alternatives.length - 1})
          </button>
          {showAlts && (
            <div className="flex flex-col gap-2 mt-2 animate-fade-in">
              {alternatives.slice(1).map((alt) => (
                <div
                  key={alt.scenario.id}
                  className="bg-surface-1 border border-surface-3 rounded-xl p-3 flex items-center justify-between gap-3"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-xs font-bold text-ink-2">{alt.scenario.label}</span>
                    <span className="font-sans text-xs text-ink-3">{getCategoryLabel(alt.scenario.category)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BiasTag bias={alt.scenario.bias} />
                    <span className="font-mono text-xs text-ink-3">{Math.round(alt.similarity * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
