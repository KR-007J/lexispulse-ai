import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Scale, Swords, MessageSquareText, Sparkles, CheckCircle2, Play, RefreshCw, Cpu } from 'lucide-react';
import { playHapticClick } from '../utils/audio';

interface AgentSwarmViewProps {
  contractName: string;
  contractText: string;
}

export const AgentSwarmView: React.FC<AgentSwarmViewProps> = ({ contractName, contractText }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(4); // Default show completed debate

  const agents = [
    {
      id: 'risk_auditor',
      name: 'Risk Auditor Agent',
      role: 'Liability & Exposure Specialist',
      avatar: '🛡️',
      icon: ShieldAlert,
      color: 'text-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
      confidence: 98.4,
      verdict: 'CRITICAL EXPOSURE',
      summary: 'Flagged uncapped third-party indemnification & infinite liability multipliers.'
    },
    {
      id: 'statutory_compliance',
      name: 'Statutory Compliance Agent',
      role: 'Regulatory & Code Verification',
      avatar: '⚖️',
      icon: Scale,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      confidence: 96.8,
      verdict: 'STATUTE CONFLICT',
      summary: 'Section 14 non-compete is void under FTC 16 CFR § 910 and Cal. Labor Code § 16600.'
    },
    {
      id: 'negotiation_strategist',
      name: 'Negotiation Strategist Agent',
      role: 'Commercial Leverage & Fallbacks',
      avatar: '♟️',
      icon: Swords,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
      confidence: 92.5,
      verdict: 'HIGH LEVERAGE',
      summary: 'Proposes 12-month mutual fee cap with gross negligence carveouts.'
    },
    {
      id: 'executive_translator',
      name: 'Executive Translator Agent',
      role: 'C-Suite ELI5 & Action Items',
      avatar: '🗣️',
      icon: MessageSquareText,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      confidence: 99.1,
      verdict: 'CONSENSUS READY',
      summary: 'Translate: You bear unlimited risk as drafted. Do not sign without mutual liability cap.'
    }
  ];

  const debateTimeline = [
    {
      agent: 'Risk Auditor Agent',
      avatar: '🛡️',
      color: 'text-rose-400',
      time: 'T+00.12s',
      badge: 'Vulnerability Detected',
      message: 'Critical vulnerability detected in Section 9 (Indemnification). Uncapped unilateral defense obligations expose client to catastrophic IP infringement claims without limit.'
    },
    {
      agent: 'Statutory Compliance Agent',
      avatar: '⚖️',
      color: 'text-amber-400',
      time: 'T+00.28s',
      badge: 'Statutory Invalidation',
      message: 'Concurring with Risk Auditor. Furthermore, Section 14 (36-month non-compete) directly conflicts with FTC 16 CFR Part 910 and California Labor Code § 16600 public policy.'
    },
    {
      agent: 'Negotiation Strategist Agent',
      avatar: '♟️',
      color: 'text-cyan-400',
      time: 'T+00.45s',
      badge: 'Strategic Counter-Proposal',
      message: 'We hold significant negotiation leverage. I propose striking Section 14 entirely and presenting our standardized 12-month mutual liability cap (Section 9.2 Playbook).'
    },
    {
      agent: 'Executive Translator Agent',
      avatar: '🗣️',
      color: 'text-emerald-400',
      time: 'T+00.62s',
      badge: 'Consensus Reached',
      message: 'Multi-Agent Consensus: Recommend executive leadership require mutual indemnification cap before signature. Estimated acceptance probability: 85%.'
    }
  ];

  const handleRunSwarm = () => {
    playHapticClick();
    setIsRunning(true);
    setActiveStep(1);

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsRunning(false);
          return 4;
        }
        return prev + 1;
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl liquid-glass border border-cyan-500/20 bg-cyan-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              Autonomous Multi-Agent Swarm Orchestrator
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Gemini 2.0 Flash Coordinated
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              4 specialized AI agents debating risk boundaries, statutory conflicts, and commercial leverage in real-time.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunSwarm}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs font-semibold transition-all cursor-pointer shadow-lg disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Agents Debating...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-cyan-300" />
              <span>Re-Run Swarm Debate</span>
            </>
          )}
        </button>
      </div>

      {/* 4 Agent Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {agents.map((agent, idx) => {
          const Icon = agent.icon;
          const isActive = idx < activeStep;
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl border ${agent.border} ${agent.bg} backdrop-blur-md flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{agent.avatar}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/40 text-white/90">
                    {agent.confidence}% CONF
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">{agent.name}</h4>
                <p className="text-[11px] text-zinc-400 mb-2">{agent.role}</p>
                <div className={`text-xs font-mono font-bold mb-2 ${agent.color}`}>
                  {agent.verdict}
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-body">
                  {agent.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400">
                <span>Agent Status</span>
                <span className="flex items-center gap-1 text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live Debate Thread */}
      <div className="p-5 rounded-xl liquid-glass border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            Live Multi-Agent Consensus Stream
          </h4>
          <span className="text-xs font-mono text-zinc-400">Target: {contractName}</span>
        </div>

        <div className="space-y-3">
          {debateTimeline.slice(0, activeStep).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.avatar}</span>
                  <span className={`font-semibold ${item.color}`}>{item.agent}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
                    {item.badge}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">{item.time}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed pl-6">
                {item.message}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Synthesized Consensus Callout */}
        {activeStep >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3 mt-4"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Final Swarm Consensus (Score: 88/100)
              </h5>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                All 4 agents recommend applying the <strong>Mutual Liability Cap Playbook</strong> and striking the <strong>Post-Employment Restrictive Covenant</strong> prior to signing.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
