import { useState, useCallback } from 'react';
import { InputForm } from './components/InputForm';
import { ResultCard } from './components/ResultCard';
import { Dashboard } from './components/Dashboard';
import type { MatchResult } from './data/types';
import type { RankedMatch } from './lib/engine';

type Tab = 'analyze' | 'dashboard';

export default function App() {
  const [tab, setTab] = useState<Tab>('analyze');
  const [result, setResult] = useState<MatchResult | null>(null);
  const [alternatives, setAlternatives] = useState<RankedMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dashKey, setDashKey] = useState(0);

  const handleResult = useCallback((best: MatchResult, alts: RankedMatch[]) => {
    setResult(best);
    setAlternatives(alts);
  }, []);

  const handleFeedback = useCallback(() => {
    setResult(null);
    setAlternatives([]);
    setDashKey((k) => k + 1);
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setAlternatives([]);
  }, []);

  return (
    <div className="min-h-screen bg-surface-0 text-ink-1 font-sans flex flex-col max-w-lg mx-auto">
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 bg-surface-0/90 backdrop-blur border-b border-surface-2 px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-mono text-base font-bold tracking-tight text-ink-1">
            ATLAS
          </span>
          <span className="font-sans text-[9px] text-ink-3 uppercase tracking-widest -mt-0.5">
            Adaptive Trading Logic Engine
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-bull rounded-full animate-pulse" />
          <span className="font-mono text-[9px] text-bull uppercase tracking-widest">Live</span>
        </div>
      </header>

      {/* ── Nav Tabs ── */}
      <nav className="flex border-b border-surface-2 bg-surface-0 sticky top-[52px] z-20">
        {(['analyze', 'dashboard'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              if (t === 'dashboard') setDashKey((k) => k + 1);
            }}
            className={`
              flex-1 py-3 font-mono text-[10px] uppercase tracking-widest transition-all duration-150
              ${
                tab === t
                  ? 'text-ink-1 border-b-2 border-accent -mb-px'
                  : 'text-ink-3 hover:text-ink-2'
              }
            `}
          >
            {t === 'analyze' ? '⚡ Analyse' : '📊 Stats'}
          </button>
        ))}
      </nav>

      {/* ── Content ── */}
      <main className="flex-1 px-4 py-5 overflow-y-auto">
        {tab === 'analyze' && (
          <>
            {!result ? (
              <InputForm
                onResult={handleResult}
                isLoading={isLoading}
                setLoading={setIsLoading}
              />
            ) : (
              <>
                <ResultCard
                  result={result}
                  alternatives={alternatives}
                  onFeedback={handleFeedback}
                />
                <button
                  onClick={handleReset}
                  className="w-full mt-4 py-2.5 rounded-xl font-mono text-[10px] text-ink-3 hover:text-ink-2 border border-surface-3 hover:border-surface-4 uppercase tracking-widest transition-all"
                >
                  ← New Analysis
                </button>
              </>
            )}
          </>
        )}

        {tab === 'dashboard' && <Dashboard key={dashKey} />}
      </main>

      {/* ── Footer ── */}
      <footer className="px-4 py-3 border-t border-surface-2 flex items-center justify-between">
        <span className="font-mono text-[9px] text-ink-4 uppercase tracking-widest">
          v1.0 · Local Engine
        </span>
        <span className="font-mono text-[9px] text-ink-4">
          96 Scenarios
        </span>
      </footer>
    </div>
  );
}
