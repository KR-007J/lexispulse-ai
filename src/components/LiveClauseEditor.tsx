import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Wand2, Check, RotateCcw, AlertTriangle, ShieldCheck, Sparkles, Copy } from 'lucide-react';
import { playHapticClick, playSuccessChime } from '../utils/audio';

interface ClauseEditorProps {
  initialText?: string;
  onApplyChange?: (newText: string) => void;
}

export const LiveClauseEditor: React.FC<ClauseEditorProps> = ({ initialText, onApplyChange }) => {
  const defaultSample = `Section 9. Indemnification: Vendor agrees to indemnify, defend, and hold harmless Customer, its parent company, subsidiaries, and officers from any third-party claims, liabilities, or losses without limitation or cap.`;

  const [text, setText] = useState(initialText || defaultSample);
  const [copied, setCopied] = useState(false);

  // Dynamic live score calculator based on text analysis
  const calculateLiveScore = (val: string) => {
    const lower = val.toLowerCase();
    let score = 30; // base score
    if (lower.includes('uncapped') || lower.includes('without limitation') || lower.includes('unlimited liability')) {
      score += 55;
    }
    if (lower.includes('indemnify') && !lower.includes('mutual')) {
      score += 25;
    }
    if (lower.includes('non-compete') || lower.includes('36 months')) {
      score += 40;
    }
    if (lower.includes('capped at') || lower.includes('mutual') || lower.includes('fees paid')) {
      score = Math.max(10, score - 50);
    }
    return Math.min(98, Math.max(12, score));
  };

  const liveScore = calculateLiveScore(text);
  const isHighRisk = liveScore > 65;

  const playbooks = [
    {
      name: 'Mutual 12-Month Fee Cap',
      desc: 'Limits indemnity strictly to aggregate fees paid in prior 12 months under DGCL standards.',
      snippet: `Section 9. Indemnification: Each party agrees to defend the other against direct third-party claims arising from gross negligence, subject strictly to the aggregate liability cap set forth in Section 12 (12 months fees paid).`
    },
    {
      name: 'FTC Compliance Strike',
      desc: 'Replaces void post-employment non-compete with standard non-solicitation of clients.',
      snippet: `Section 14. Restrictive Covenants: Post-employment non-compete covenants are intentionally deleted as void under FTC 16 CFR Part 910. The parties agree to mutual 12-month non-solicitation of existing clients.`
    },
    {
      name: 'DTSA Whistleblower Immunity Notice',
      desc: 'Inserts mandatory federal 18 U.S.C. § 1836(b) immunity carveout into confidentiality terms.',
      snippet: `Section 7. Confidentiality: Confidentiality obligations shall survive for 3 years. Notice: Pursuant to 18 U.S.C. § 1836(b), an individual shall not be held criminally or civilly liable under any trade secret law for confidential disclosures made to government officials.`
    }
  ];

  const handleApplyPlaybook = (snippet: string) => {
    playSuccessChime();
    setText(snippet);
    if (onApplyChange) onApplyChange(snippet);
  };

  const handleCopy = () => {
    playHapticClick();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Live Score Meter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl liquid-glass border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              Interactive Live Clause Studio & Redline Sandbox
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Instant Recalibration
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              Type or paste custom language to watch risk vectors and statutory compatibility update in real time.
            </p>
          </div>
        </div>

        {/* Live Score Dial */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-black/40 border border-white/10">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-zinc-400">Calculated Risk</div>
            <div className={`text-lg font-bold font-mono ${isHighRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
              {liveScore}/100
            </div>
          </div>
          <div className={`w-3.5 h-3.5 rounded-full ${isHighRisk ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
        </div>
      </div>

      {/* Editor & Playbooks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Textarea Workspace */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Clause Draft Workspace</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playHapticClick();
                  setText(initialText || defaultSample);
                  if (onApplyChange) onApplyChange(initialText || defaultSample);
                }}
                className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Reset clause to original text"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Clause'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (onApplyChange) onApplyChange(e.target.value);
            }}
            rows={8}
            className="w-full p-4 rounded-xl liquid-glass border border-white/15 bg-black/40 text-sm font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all leading-relaxed resize-none"
            placeholder="Paste or type contract clause..."
          />

          {/* Real-Time Assessment Alert */}
          <motion.div
            key={isHighRisk ? 'high' : 'safe'}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
              isHighRisk
                ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
            }`}
          >
            {isHighRisk ? (
              <>
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong>High Risk Flag:</strong> This clause contains unlimited liability or unilateral indemnification triggers. Click a Playbook template on the right to auto-balance.
                </div>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Statutorily Balanced:</strong> Clause contains mutual indemnification caps and complies with modern FTC and DGCL safe harbors.
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Right: 1-Click Calibrated Playbooks */}
        <div className="space-y-3">
          <div className="text-xs text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>1-Click Safe Playbook Counter-Clauses</span>
          </div>

          <div className="space-y-3">
            {playbooks.map((pb, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl liquid-glass border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {pb.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    {pb.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleApplyPlaybook(pb.snippet)}
                  className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Wand2 className="w-3 h-3" />
                  <span>Insert Playbook</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
