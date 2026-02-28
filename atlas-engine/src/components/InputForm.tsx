import { useState } from 'react';
import type { UserInput, C1Context, C1Behavior, CandleAction, CandleClose, LevelQualifier } from '../data/types';
import { encodeInput } from '../data/types';
import { findBestMatch, findMatches } from '../lib/engine';
import type { MatchResult } from '../data/types';
import type { RankedMatch } from '../lib/engine';

interface InputFormProps {
  onResult: (best: MatchResult, alternatives: RankedMatch[]) => void;
  isLoading: boolean;
  setLoading: (v: boolean) => void;
}

const C1_CONTEXTS: { value: C1Context; label: string }[] = [
  { value: 'inside_pdr', label: 'Inside PDR' },
  { value: 'breaks_pdh', label: 'Breaks PDH' },
  { value: 'breaks_pdl', label: 'Breaks PDL' },
];

const C1_BEHAVIORS: { value: C1Behavior; label: string }[] = [
  { value: 'ranging', label: 'Ranging' },
  { value: 'trends_up', label: 'Trends Up' },
  { value: 'trends_down', label: 'Trends Down' },
];

const CANDLE_ACTIONS: { value: CandleAction; label: string }[] = [
  { value: 'inside_bar', label: 'Inside Bar / Ranges' },
  { value: 'breaks_high', label: 'Breaks High' },
  { value: 'breaks_low', label: 'Breaks Low' },
  { value: 'whipsaw', label: 'Whipsaw' },
];

const CANDLE_CLOSES: { value: CandleClose; label: string }[] = [
  { value: 'inside', label: 'Closes Inside' },
  { value: 'above', label: 'Holds / Closes Above' },
  { value: 'below', label: 'Holds / Closes Below' },
];

const LEVEL_QUALIFIERS: { value: LevelQualifier; label: string }[] = [
  { value: 'none',               label: 'No extra level broken' },
  { value: 'plus_pdh',           label: '+ PDH also broken' },
  { value: 'plus_pdl',           label: '+ PDL also broken' },
  { value: 'plus_setup_high',    label: '+ Setup High (C1/C2) also broken' },
  { value: 'plus_setup_low',     label: '+ Setup Low (C1/C2) also broken' },
  { value: 'plus_pdh_and_setup', label: '+ PDH & Setup High both broken' },
  { value: 'plus_pdl_and_setup', label: '+ PDL & Setup Low both broken' },
];

const DEFAULT_INPUT: UserInput = {
  c1_context:   'inside_pdr',
  c1_behavior:  'ranging',
  c2_action:    'breaks_low',
  c2_close:     'inside',
  c2_qualifier: 'none',
  c3_action:    'breaks_high',
  c3_close:     'inside',
  c3_qualifier: 'none',
  c4_action:    'inside_bar',
  c4_close:     'inside',
  c4_qualifier: 'none',
};

interface SelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  muted?: boolean;
}

function Select({ label, value, onChange, options, muted = false }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-3">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full bg-surface-2 text-ink-1 font-sans text-sm rounded-lg px-3 py-2.5
          border transition-all duration-150 outline-none focus:ring-2 cursor-pointer appearance-none
          bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23606080' d='M5.5 7.5L10 12l4.5-4.5'/%3E%3C/svg%3E")]
          bg-no-repeat bg-[right_10px_center] bg-[length:16px] pr-8
          ${muted
            ? 'border-surface-3 focus:border-accent/50 focus:ring-accent/10 text-ink-2'
            : 'border-surface-3 focus:border-accent focus:ring-accent/20'
          }
        `}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function InputForm({ onResult, isLoading, setLoading }: InputFormProps) {
  const [input, setInput] = useState<UserInput>(DEFAULT_INPUT);

  const set = <K extends keyof UserInput>(key: K) =>
    (value: string) => setInput((prev) => ({ ...prev, [key]: value as UserInput[K] }));

  // Only show qualifier when candle actually breaks a level (not inside bar)
  const showQ = (action: CandleAction) => action !== 'inside_bar';

  async function handleAnalyze() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    const features = encodeInput(input);
    const [best, alts] = await Promise.all([
      findBestMatch(features),
      findMatches(features, 3),
    ]);
    if (best) onResult(best, alts);
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 animate-fade-in">

      {/* ── C1 ── */}
      <div className="bg-surface-1 border border-surface-3 rounded-xl p-4 flex flex-col gap-4">
        <SectionHeader label="Candle 1" />
        <Select label="C1 Context"  value={input.c1_context}  onChange={set('c1_context')}  options={C1_CONTEXTS} />
        <Select label="C1 Behavior" value={input.c1_behavior} onChange={set('c1_behavior')} options={C1_BEHAVIORS} />
      </div>

      {/* ── C2 ── */}
      <div className="bg-surface-1 border border-surface-3 rounded-xl p-4 flex flex-col gap-4">
        <SectionHeader label="Candle 2" />
        <Select label="Action"       value={input.c2_action} onChange={set('c2_action')} options={CANDLE_ACTIONS} />
        <Select label="Close / Hold" value={input.c2_close}  onChange={set('c2_close')}  options={CANDLE_CLOSES} />
        {showQ(input.c2_action) && (
          <Select label="Level Qualifier (optional)" value={input.c2_qualifier} onChange={set('c2_qualifier')} options={LEVEL_QUALIFIERS} muted />
        )}
      </div>

      {/* ── C3 ── */}
      <div className="bg-surface-1 border border-surface-3 rounded-xl p-4 flex flex-col gap-4">
        <SectionHeader label="Candle 3" />
        <Select label="Action"       value={input.c3_action} onChange={set('c3_action')} options={CANDLE_ACTIONS} />
        <Select label="Close / Hold" value={input.c3_close}  onChange={set('c3_close')}  options={CANDLE_CLOSES} />
        {showQ(input.c3_action) && (
          <Select label="Level Qualifier (optional)" value={input.c3_qualifier} onChange={set('c3_qualifier')} options={LEVEL_QUALIFIERS} muted />
        )}
      </div>

      {/* ── C4 ── */}
      <div className="bg-surface-1 border border-surface-3 rounded-xl p-4 flex flex-col gap-4">
        <SectionHeader label="Candle 4" />
        <Select label="Action"       value={input.c4_action} onChange={set('c4_action')} options={CANDLE_ACTIONS} />
        <Select label="Close / Hold" value={input.c4_close}  onChange={set('c4_close')}  options={CANDLE_CLOSES} />
        {showQ(input.c4_action) && (
          <Select label="Level Qualifier (optional)" value={input.c4_qualifier} onChange={set('c4_qualifier')} options={LEVEL_QUALIFIERS} muted />
        )}
      </div>

      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="
          relative w-full py-3.5 rounded-xl font-display font-semibold text-base
          bg-accent hover:bg-accent/90 active:scale-[0.98]
          text-white transition-all duration-150
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        <span className={`transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          ⚡ Analyse Market
        </span>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm">
            <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
          </span>
        )}
      </button>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] font-bold bg-surface-3 text-ink-2 px-2 py-0.5 rounded-full uppercase tracking-widest">
        {label}
      </span>
      <div className="flex-1 h-px bg-surface-3" />
    </div>
  );
}
