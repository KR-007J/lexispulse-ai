import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, TrendingDown, CheckCircle, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { playHapticClick } from '../utils/audio';

interface VersionDelta {
  section: string;
  title: string;
  status: 'MODIFIED' | 'UNCHANGED' | 'DELETED';
  baseRisk: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  revisedRisk: 'LOW' | 'MEDIUM' | 'NONE';
  deltaScore: number;
  baseText: string;
  revisedText: string;
  verdict: string;
}

export const ContractCompareView: React.FC = () => {
  const [selectedDelta, setSelectedDelta] = useState<number>(0);

  const deltas: VersionDelta[] = [
    {
      section: 'Section 9',
      title: 'Indemnification & Third-Party Claims',
      status: 'MODIFIED',
      baseRisk: 'CRITICAL',
      revisedRisk: 'LOW',
      deltaScore: -35,
      baseText: 'Vendor agrees to indemnify, defend, and hold harmless Customer, its parent company, subsidiaries, and officers from any third-party claims, liabilities, or losses without limitation or cap.',
      revisedText: 'Each party agrees to defend the other against direct third-party claims arising from gross negligence, subject strictly to the aggregate liability cap set forth in Section 12 (12 months fees paid).',
      verdict: 'FAVORABLE: Converted one-way unlimited defense into mutual liability-capped protection.'
    },
    {
      section: 'Section 12',
      title: 'Limitation of Liability & Damages',
      status: 'MODIFIED',
      baseRisk: 'CRITICAL',
      revisedRisk: 'LOW',
      deltaScore: -30,
      baseText: "IN NO EVENT SHALL CUSTOMER BE LIABLE FOR CONSEQUENTIAL DAMAGES. VENDOR'S LIABILITY UNDER THIS AGREEMENT IS UNLIMITED.",
      revisedText: "NEITHER PARTY SHALL BE LIABLE FOR INDIRECT OR CONSEQUENTIAL DAMAGES. EACH PARTY'S AGGREGATE LIABILITY SHALL BE CAPPED AT FEES PAID IN PRIOR 12 MONTHS.",
      verdict: 'FAVORABLE: Mutualized waiver of consequential damages and inserted 12-month trailing revenue cap.'
    },
    {
      section: 'Section 14',
      title: 'Post-Employment Restrictive Covenants',
      status: 'DELETED',
      baseRisk: 'HIGH',
      revisedRisk: 'NONE',
      deltaScore: -15,
      baseText: 'Vendor and its key personnel shall not perform software development services for any competitor in North America for 36 months post-termination.',
      revisedText: '[CLAUSE STRICKEN]: Deleted to conform with FTC 16 CFR Part 910 Non-Compete Ban Rule.',
      verdict: 'FAVORABLE: Void restrictive covenant removed to preserve commercial flexibility.'
    }
  ];

  const totalDelta = deltas.reduce((acc, d) => acc + d.deltaScore, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl liquid-glass border border-emerald-500/20 bg-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              Contract Version Drift & Redline Delta Matrix
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Original vs Counterparty Redline
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              Side-by-side comparison tracking clause-level risk migrations and statutory improvements.
            </p>
          </div>
        </div>

        {/* Aggregate Drift Badge */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-500/30 text-emerald-400">
          <TrendingDown className="w-4 h-4" />
          <div className="text-right font-mono">
            <div className="text-[10px] uppercase text-zinc-400">Net Risk Drift</div>
            <div className="text-sm font-bold">{totalDelta} Points (Safer)</div>
          </div>
        </div>
      </div>

      {/* Clause Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {deltas.map((d, idx) => (
          <button
            key={idx}
            onClick={() => { playHapticClick(); setSelectedDelta(idx); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedDelta === idx
                ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                : 'liquid-glass text-zinc-400 hover:text-white hover:bg-white/5 border border-white/5'
            }`}
          >
            <span>{d.section}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-emerald-400">
              {d.deltaScore} pts
            </span>
          </button>
        ))}
      </div>

      {/* Side by Side Diff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Base Original Draft */}
        <div className="p-4 rounded-xl liquid-glass border border-rose-500/20 bg-rose-950/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold font-mono uppercase text-rose-400">
                Original Draft (V1.0)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {deltas[selectedDelta].baseRisk} RISK
              </span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-rose-200 leading-relaxed">
              {deltas[selectedDelta].baseText}
            </div>
          </div>
          <div className="mt-3 text-[11px] text-zinc-400">
            ❌ Contains uncapped indemnity and severe one-way liability shifts.
          </div>
        </div>

        {/* Counterparty / Revised Draft */}
        <div className="p-4 rounded-xl liquid-glass border border-emerald-500/20 bg-emerald-950/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold font-mono uppercase text-emerald-400">
                Counterparty Redline (V2.0)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {deltas[selectedDelta].revisedRisk} RISK
              </span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-emerald-200 leading-relaxed">
              {deltas[selectedDelta].revisedText}
            </div>
          </div>
          <div className="mt-3 text-[11px] text-emerald-300 font-semibold">
            ✓ Balanced with mutual caps and statutory safe harbor provisions.
          </div>
        </div>
      </div>

      {/* Clause Migration Summary Card */}
      <div className="p-4 rounded-xl liquid-glass border border-white/10 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-white uppercase tracking-wider">
            Linguistic Migration Verdict: {deltas[selectedDelta].title}
          </div>
          <p className="text-zinc-300 leading-relaxed font-body">
            {deltas[selectedDelta].verdict}
          </p>
        </div>
      </div>
    </div>
  );
};
