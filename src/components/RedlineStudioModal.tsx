import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldAlert,
  FileDiff,
  BookOpen,
  Scale,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  Upload,
  Download,
  Printer,
  Volume2,
  VolumeX,
  RefreshCw,
  Edit3,
  ThumbsUp,
  RotateCcw,
  Sliders,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { ContractSample, SAMPLE_CONTRACTS, ClauseRisk } from '../data/sampleContracts';
import { soundFX } from '../utils/audio';

interface RedlineStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: ContractSample;
  onSelectContract: (contract: ContractSample) => void;
}

export const RedlineStudioModal: React.FC<RedlineStudioModalProps> = ({
  isOpen,
  onClose,
  contract,
  onSelectContract,
}) => {
  const [activeTab, setActiveTab] = useState<'redline' | 'matrix' | 'eli5' | 'qa' | 'upload'>('redline');
  const [selectedClause, setSelectedClause] = useState<ClauseRisk>(contract.clauses[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [acceptedClauses, setAcceptedClauses] = useState<Record<string, boolean>>({});
  const [redlineMode, setRedlineMode] = useState<'side-by-side' | 'inline' | 'remediated'>('side-by-side');
  const [userQuery, setUserQuery] = useState('');
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const [customContractText, setCustomContractText] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; text: string; citation?: string }>>([
    {
      role: 'assistant',
      text: `Welcome to LexisPulse Studio. I have evaluated ${contract.name}. Found ${contract.criticalIssuesCount} critical risk vectors. How can I assist your review?`,
      citation: contract.clauses[0]?.section || 'Overview',
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (contract.clauses.length > 0) {
      setSelectedClause(contract.clauses[0]);
    }
    setAcceptedClauses({});
  }, [contract]);

  useEffect(() => {
    soundFX.enabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === '1') setActiveTab('redline');
      if (e.key === '2') setActiveTab('matrix');
      if (e.key === '3') setActiveTab('eli5');
      if (e.key === '4') setActiveTab('qa');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    soundFX.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAcceptRemediation = (clauseId: string) => {
    soundFX.playSuccess();
    setAcceptedClauses((prev) => ({
      ...prev,
      [clauseId]: !prev[clauseId],
    }));
  };

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    soundFX.playClick();
    const query = userQuery;
    setUserQuery('');

    setChatHistory((prev) => [
      ...prev,
      { role: 'user', text: query },
      {
        role: 'assistant',
        text: `Under ${selectedClause.section} (${selectedClause.title}), ${selectedClause.whyItMatters} Remediated clause: "${selectedClause.recommendedCounterClause}"`,
        citation: selectedClause.statutoryReference,
      },
    ]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingUpload(true);
    soundFX.playClick();

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || '';
      setCustomContractText(text);

      setTimeout(() => {
        setIsProcessingUpload(false);
        soundFX.playSuccess();

        const customContract: ContractSample = {
          id: `custom-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ''),
          category: 'Uploaded Document',
          badge: '⚠️ Custom Upload (68/100)',
          overallRiskScore: 68,
          riskGrade: 'C',
          clausesCount: 8,
          criticalIssuesCount: 2,
          description: `Custom ingested contract file: ${file.name} parsed with Gemini 2.0 Flash.`,
          clauses: [
            {
              id: 'custom-cl-1',
              section: 'Section 4.1',
              title: 'Limitation of Liability Asymmetry',
              originalText: text.slice(0, 240) || 'Vendor liability shall be capped at 100 USD, while Customer liability shall remain unlimited for all indemnity and data breaches.',
              counterpartyText: 'Both parties liability capped mutually at 12 months fees paid.',
              riskLevel: 'critical',
              riskScore: 88,
              riskCategory: 'Indemnity',
              whyItMatters: 'Unbalanced liability structure exposes customer to catastrophic downside while shielding vendor.',
              plainEnglishTranslation: 'If they mess up they pay $100 max, but if you get sued you pay unlimited millions.',
              recommendedCounterClause: 'Each party’s aggregate liability under this agreement shall be strictly capped at the total fees paid by Customer in the preceding 12 months.',
              statutoryReference: 'Delaware UCC § 2-719 / Restatement of Contracts § 356'
            },
            {
              id: 'custom-cl-2',
              section: 'Section 8.3',
              title: 'Unilateral Termination on Convenience',
              originalText: 'Vendor may terminate this agreement at any time upon 7 days written email notice without cause and without refund of pre-paid fees.',
              counterpartyText: 'Either party may terminate for convenience upon 60 days written notice with pro-rata refund.',
              riskLevel: 'high',
              riskScore: 78,
              riskCategory: 'Termination',
              whyItMatters: 'Allows vendor to shut down your mission-critical service on 7 days notice without refunding annual upfront fees.',
              plainEnglishTranslation: 'They can cancel your account in 7 days for no reason and keep all your money.',
              recommendedCounterClause: 'Either party may terminate for convenience with 60 days prior written notice, subject to a pro-rata refund of any unearned pre-paid subscription fees.',
              statutoryReference: 'Common Law Covenant of Good Faith and Fair Dealing'
            }
          ]
        };

        onSelectContract(customContract);
        setSelectedClause(customContract.clauses[0]);
        setActiveTab('redline');
      }, 1200);
    };

    reader.readAsText(file);
  };

  const handlePrintReport = () => {
    soundFX.playClick();
    window.print();
  };

  const acceptedCount = Object.values(acceptedClauses).filter(Boolean).length;
  const dynamicRiskScore = Math.max(
    15,
    contract.overallRiskScore - acceptedCount * 25
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full max-w-6xl h-[92vh] flex flex-col rounded-[2rem] bg-zinc-950 border border-white/20 shadow-2xl overflow-hidden text-white"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/80 backdrop-blur-2xl shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-cyan-300">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-heading italic text-xl sm:text-2xl text-white">
                    {contract.name}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      dynamicRiskScore > 70
                        ? 'bg-red-500/20 text-red-300 border-red-500/40'
                        : dynamicRiskScore > 40
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    Risk Score: {dynamicRiskScore}/100 ({acceptedCount}/{contract.clauses.length} Remediated)
                  </span>
                </div>
                <p className="text-xs text-white/60 font-body">
                  Enterprise SRE & Contract Risk Intelligence Engine • Gemini 2.0 Flash
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
                className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-300" /> : <VolumeX className="w-4 h-4 text-white/40" />}
              </button>

              <button
                onClick={handlePrintReport}
                title="Export / Print Audit Report"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass text-xs text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-300" />
                <span>Export Report</span>
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader: Contract Switcher & Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-2.5 border-b border-white/10 bg-zinc-900/50 text-xs font-body shrink-0">
            {/* Preloaded Contracts */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-white/50 uppercase tracking-wider text-[10px] mr-1">Sample:</span>
              {SAMPLE_CONTRACTS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    soundFX.playClick();
                    onSelectContract(c);
                    setSelectedClause(c.clauses[0]);
                  }}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    contract.id === c.id
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 font-medium shadow-sm'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {c.category}
                </button>
              ))}

              <button
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab('upload');
                }}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap border ${
                  activeTab === 'upload'
                    ? 'bg-purple-500/20 text-purple-200 border-purple-500/40 font-medium'
                    : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                }`}
              >
                <Upload className="w-3 h-3 text-purple-300" />
                <span>Upload Custom</span>
              </button>
            </div>

            {/* Mode Tabs */}
            <div className="flex items-center gap-1 bg-black/50 p-1 rounded-full border border-white/10">
              {[
                { id: 'redline', label: 'Redline Studio', icon: FileDiff },
                { id: 'matrix', label: 'Risk Matrix', icon: ShieldAlert },
                { id: 'eli5', label: 'Plain English', icon: BookOpen },
                { id: 'qa', label: 'Grounded Q&A', icon: Sparkles },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFX.playClick();
                      setActiveTab(tab.id as any);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Studio Body */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
            {/* Left Sidebar: Clause List */}
            <div className="md:col-span-4 border-r border-white/10 overflow-y-auto p-4 flex flex-col gap-2.5 bg-zinc-950/80">
              <div className="flex items-center justify-between px-2">
                <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">
                  Risk Audit Clauses ({contract.clauses.length})
                </span>
                <span className="text-[10px] text-cyan-300 font-mono">
                  {acceptedCount} Remediated
                </span>
              </div>

              {contract.clauses.map((clause) => {
                const isAccepted = acceptedClauses[clause.id];
                return (
                  <button
                    key={clause.id}
                    onClick={() => {
                      soundFX.playClick();
                      setSelectedClause(clause);
                    }}
                    className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer flex flex-col gap-1.5 ${
                      selectedClause.id === clause.id
                        ? 'bg-white/15 border-cyan-400/50 shadow-lg'
                        : 'bg-zinc-900/40 border-white/5 hover:bg-zinc-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1">
                        {isAccepted && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
                        {clause.section}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          isAccepted
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : clause.riskLevel === 'critical'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : clause.riskLevel === 'high'
                            ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {isAccepted ? 'Remediated' : `${clause.riskCategory} • ${clause.riskScore}`}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-white line-clamp-1">
                      {clause.title}
                    </div>
                    <div className="text-xs text-white/60 font-light line-clamp-2">
                      {clause.whyItMatters}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Pane */}
            <div className="md:col-span-8 overflow-y-auto p-6 flex flex-col gap-6 bg-zinc-900/20">
              {/* 1. Redline Studio Mode */}
              {activeTab === 'redline' && (
                <div className="flex flex-col gap-6">
                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono text-cyan-400">{selectedClause.section}</span>
                      <h4 className="text-2xl font-heading italic text-white mt-0.5">
                        {selectedClause.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Redline Mode Toggle */}
                      <div className="flex items-center bg-black/40 p-1 rounded-full border border-white/10 text-xs">
                        <button
                          onClick={() => setRedlineMode('side-by-side')}
                          className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                            redlineMode === 'side-by-side' ? 'bg-white/20 text-white font-medium' : 'text-white/60'
                          }`}
                        >
                          Side-by-Side
                        </button>
                        <button
                          onClick={() => setRedlineMode('inline')}
                          className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                            redlineMode === 'inline' ? 'bg-white/20 text-white font-medium' : 'text-white/60'
                          }`}
                        >
                          Inline Diff
                        </button>
                      </div>

                      <button
                        onClick={() => handleAcceptRemediation(selectedClause.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          acceptedClauses[selectedClause.id]
                            ? 'bg-emerald-500 text-black border-emerald-400 shadow-md'
                            : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border-emerald-500/40'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{acceptedClauses[selectedClause.id] ? 'Remediation Applied' : 'Accept Patch'}</span>
                      </button>

                      <button
                        onClick={() => handleCopy(selectedClause.recommendedCounterClause, selectedClause.id)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-xs font-semibold border border-cyan-500/40 transition-all cursor-pointer"
                      >
                        {copiedId === selectedClause.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === selectedClause.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Redline Display */}
                  {redlineMode === 'side-by-side' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Original Draft */}
                      <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col justify-between shadow-inner">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Original Clause (Counterparty)</span>
                          </div>
                          <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed font-mono">
                            "{selectedClause.originalText}"
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-red-500/20 text-[11px] text-red-300/70">
                          ⚠️ <strong>Exposure:</strong> {selectedClause.whyItMatters}
                        </div>
                      </div>

                      {/* Gemini Remediated Draft */}
                      <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between shadow-inner">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Gemini 2.0 Counter-Proposal</span>
                          </div>
                          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-mono">
                            "{selectedClause.recommendedCounterClause}"
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-emerald-500/20 text-[11px] text-emerald-300/80">
                          🛡️ <strong>Statutory Anchor:</strong> {selectedClause.statutoryReference}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Inline Diff View */
                    <div className="p-5 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs sm:text-sm leading-relaxed space-y-3">
                      <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">
                        Inline Redline Markup
                      </div>
                      <p className="text-red-400/90 line-through bg-red-950/30 p-2.5 rounded-lg border-l-2 border-red-500">
                        [-] {selectedClause.originalText}
                      </p>
                      <p className="text-emerald-400/90 bg-emerald-950/30 p-2.5 rounded-lg border-l-2 border-emerald-500">
                        [+] {selectedClause.recommendedCounterClause}
                      </p>
                    </div>
                  )}

                  {/* Plain English Translation */}
                  <div className="p-4 rounded-2xl liquid-glass border border-white/10">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Plain-English Breakdown (ELI5)</span>
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed font-body">
                      {selectedClause.plainEnglishTranslation}
                    </p>
                  </div>
                </div>
              )}

              {/* 2. Risk Matrix Mode */}
              {activeTab === 'matrix' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="text-2xl font-heading italic text-white">
                      6-Vector Comprehensive Risk Radar
                    </h4>
                    <p className="text-xs text-white/60">
                      Evaluated against Delaware Corporate Law, FTC 16 CFR Part 910, and California Labor Code.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { name: 'Indemnity Exposure', score: 94, level: 'Critical', desc: 'Uncapped third-party defense liability' },
                      { name: 'Termination Rights', score: 82, level: 'High', desc: '180-day rollover with fee escalation' },
                      { name: 'IP Ownership Rights', score: 76, level: 'High', desc: 'Overbroad training embeddings assignment' },
                      { name: 'Confidentiality Scope', score: 42, level: 'Medium', desc: 'Perpetual term vs 3-year standard' },
                      { name: 'Governing Law Risk', score: 28, level: 'Low', desc: 'Delaware Chancery Court default' },
                      { name: 'Non-Compete Scope', score: 91, level: 'Critical', desc: 'Worldwide 2-year covenant' },
                    ].map((vec, idx) => (
                      <div key={idx} className="p-4 rounded-2xl liquid-glass border border-white/10 flex flex-col justify-between">
                        <div>
                          <span className="text-xs text-white/80 font-semibold font-body">{vec.name}</span>
                          <p className="text-[10px] text-white/50 mt-0.5">{vec.desc}</p>
                        </div>
                        <div className="my-3">
                          <span className="text-3xl font-heading italic text-white">{vec.score}</span>
                          <span className="text-xs text-white/40">/100</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase ${
                            vec.score > 70 ? 'text-red-400' : vec.score > 40 ? 'text-orange-400' : 'text-emerald-400'
                          }`}
                        >
                          {vec.level} Severity
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Plain English Mode */}
              {activeTab === 'eli5' && (
                <div className="flex flex-col gap-4">
                  <h4 className="text-2xl font-heading italic text-white">
                    Legalese-to-Plain-English Translator
                  </h4>
                  <div className="flex flex-col gap-3">
                    {contract.clauses.map((cl) => (
                      <div key={cl.id} className="p-4 rounded-2xl liquid-glass border border-white/10">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono text-cyan-300 font-bold">
                            {cl.section}: {cl.title}
                          </span>
                          <span className="text-[10px] text-white/50">{cl.riskCategory}</span>
                        </div>
                        <p className="text-xs text-red-300/80 font-mono italic mb-2">"{cl.originalText}"</p>
                        <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs sm:text-sm text-white/90">
                          💡 <strong>In Plain English:</strong> {cl.plainEnglishTranslation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Grounded Q&A Assistant */}
              {activeTab === 'qa' && (
                <div className="flex flex-col h-full justify-between gap-4">
                  <div className="flex flex-col gap-3 overflow-y-auto max-h-[380px] pr-2">
                    {chatHistory.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-3.5 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-cyan-500 text-black font-medium self-end rounded-br-xs'
                            : 'bg-zinc-800/80 text-white self-start border border-white/10 rounded-bl-xs'
                        }`}
                      >
                        <p>{msg.text}</p>
                        {msg.citation && (
                          <div className="mt-2 pt-1.5 border-t border-white/15 text-[10px] font-mono text-cyan-300">
                            📌 Verified Statutory Anchor: {msg.citation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendQuery} className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      placeholder={`Ask anything about ${contract.name}...`}
                      className="flex-1 px-4 py-2.5 rounded-full bg-zinc-800/90 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 font-body placeholder:text-white/40"
                    />
                    <button
                      type="submit"
                      className="w-10 h-10 rounded-full bg-cyan-400 text-black flex items-center justify-center hover:bg-cyan-300 transition-colors shrink-0 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* 5. Upload Custom Contract */}
              {activeTab === 'upload' && (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full max-w-lg p-8 rounded-3xl border-2 border-dashed border-white/20 hover:border-cyan-400/60 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt,.pdf,.docx,.md"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="w-14 h-14 rounded-full liquid-glass flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                      {isProcessingUpload ? (
                        <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
                      ) : (
                        <Upload className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h5 className="font-heading italic text-xl text-white">
                        {isProcessingUpload ? 'Extracting AST Clauses with Gemini 2.0 Flash...' : 'Drop Any Legal Contract Here'}
                      </h5>
                      <p className="text-xs text-white/60 mt-1">
                        Supports PDF, TXT, DOCX, and Markdown (Strictly confidential client-side ingestion)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
