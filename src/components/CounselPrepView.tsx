import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, CheckSquare, Square, Copy, Check, AlertCircle } from 'lucide-react';
import { playHapticClick } from '../utils/audio';

interface CounselPrepProps {
  contractName: string;
}

export const CounselPrepView: React.FC<CounselPrepProps> = ({ contractName }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const lawyerQuestions = [
    {
      topic: 'Uncapped Indemnification (Section 9.2)',
      question: 'Should we propose an aggregate liability cap equal to 12 months fees paid, or insist on reciprocal defense obligations under Delaware GCL § 145?',
      rationale: 'Current draft imposes unlimited indemnity on licensee with zero reciprocal protections.'
    },
    {
      topic: 'Consequential & Indirect Damages Waiver (Section 12.1)',
      question: 'Is the counterparty willing to accept a mutual waiver of consequential damages, with carveouts strictly limited to gross negligence and confidentiality breaches?',
      rationale: 'Vendor has carved out their own damages while leaving licensee subject to speculative lost profit claims.'
    },
    {
      topic: 'Restrictive Covenants & Non-Compete (Section 14)',
      question: 'Given FTC 16 CFR Part 910 and California Labor Code § 16600, should we strike the 36-month non-compete completely as void ab initio?',
      rationale: 'Overbroad post-employment covenants may be statutorily unenforceable and restrict corporate operations.'
    },
    {
      topic: 'Data Ownership & AI Model Weights (Section 7.4)',
      question: 'Does the IP assignment clause inadvertently license Customer training embeddings or proprietary prompts under 17 U.S. Code § 201?',
      rationale: 'Broad language assigns all derivative works to vendor without customer data carveouts.'
    },
    {
      topic: 'Automatic Rollover & Termination Notice (Section 4.3)',
      question: 'Can we negotiate the cancellation window down from 180 days to 30 days prior to annual renewal?',
      rationale: 'A 180-day advance notice requirement creates severe lock-in and unexpected financial commitments.'
    }
  ];

  const toggleCheck = (idx: number) => {
    playHapticClick();
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopyQuestions = () => {
    playHapticClick();
    const formatted = lawyerQuestions.map((q, i) => `${i+1}. [${q.topic}]\nQuestion: ${q.question}\nContext: ${q.rationale}\n`).join('\n');
    navigator.clipboard.writeText(`COUNSEL CONSULTATION BRIEFING — ${contractName}\n\n${formatted}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl liquid-glass border border-cyan-500/20 bg-cyan-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              Legal Counsel Consultation Brief & Prep Checklist
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Lawyer-Ready
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              Prepare high-leverage questions and statutory evidence before consulting your legal counsel or attorney.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyQuestions}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs font-semibold transition-all cursor-pointer shadow-lg"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Briefing' : 'Copy Questions for Lawyer'}</span>
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {lawyerQuestions.map((item, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => toggleCheck(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                isChecked
                  ? 'bg-cyan-950/30 border-cyan-500/40 shadow-sm'
                  : 'liquid-glass border-white/10 hover:border-white/20'
              }`}
            >
              <button className="mt-0.5 text-cyan-300">
                {isChecked ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-zinc-500" />}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    {item.topic}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    Priority: High
                  </span>
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  "{item.question}"
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed font-body">
                  <strong>Why Ask This:</strong> {item.rationale}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Advisory Notice */}
      <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 flex items-start gap-2.5 text-xs text-zinc-400 font-body">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong>Legal Information Notice:</strong> LexisPulse AI provides contract intelligence and preparation assistance for informational purposes only and does not constitute formal legal advice. Always review terms with a licensed attorney before signing binding agreements.
        </p>
      </div>
    </div>
  );
};
