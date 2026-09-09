import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, ShieldAlert, Sparkles, Clock, Globe, FileText, CheckCircle2, Scale } from 'lucide-react';
import { FadingVideo } from './FadingVideo';
import { BlurText } from './BlurText';
import { SAMPLE_CONTRACTS, ContractSample } from '../data/sampleContracts';

interface HeroSectionProps {
  onOpenStudio: (contract?: ContractSample) => void;
  selectedContract: ContractSample;
  setSelectedContract: (contract: ContractSample) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenStudio,
  selectedContract,
  setSelectedContract,
}) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white pt-24 pb-8">
      {/* 1. Cinematic Background Video with custom JS rAF Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <FadingVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top"
          style={{ width: '120%', height: '120%' }}
        />
        {/* Subtle radial vignette to guarantee text legibility */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />
      </div>

      {/* 2. Hero Center Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto my-auto">
        {/* Badge */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 p-1 pr-4 rounded-full liquid-glass mb-6 border border-white/10"
        >
          <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-bold font-body">
            New
          </span>
          <span className="text-xs sm:text-sm text-white/90 font-body flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            PromptWars AI Calibration Edition Arrives 2026
          </span>
        </motion.div>

        {/* Headline with Word-by-Word Blur Animation */}
        <div className="max-w-4xl mb-4">
          <BlurText
            text="Autonomous Legal Intelligence Across Every Clause"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.88] tracking-[-3px] sm:tracking-[-4px]"
            delayOffset={0.5}
          />
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
          className="mt-3 text-sm sm:text-base md:text-lg text-white/80 max-w-2xl font-body font-light leading-relaxed"
        >
          Audit complex NDAs, MSAs, and employment contracts in sub-300ms. Detect uncapped indemnities, visualize side-by-side redlines, and translate legalese with zero hallucinations.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8"
        >
          <button
            onClick={() => onOpenStudio(selectedContract)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full liquid-glass-strong text-white text-sm md:text-base font-semibold hover:scale-105 hover:bg-white/15 transition-all duration-300 shadow-2xl group cursor-pointer"
          >
            <span>Launch Live Contract Audit</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-cyan-300" />
          </button>

          <button
            onClick={() => onOpenStudio(selectedContract)}
            className="flex items-center gap-2 text-sm md:text-base text-white/90 hover:text-white font-medium font-body transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
            </div>
            <span>View Redline Diff Demo</span>
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: 'easeOut' }}
          className="grid grid-cols-2 gap-4 mt-10 max-w-md w-full"
        >
          <div className="p-4 rounded-[1.25rem] liquid-glass text-left flex flex-col justify-between border border-white/10">
            <Clock className="w-6 h-6 text-cyan-300 mb-3" />
            <div>
              <div className="font-heading italic text-3xl sm:text-4xl text-white tracking-tight">
                240 ms
              </div>
              <div className="text-xs text-white/70 font-body font-light mt-1">
                Average Gemini 2.0 Triage Speed
              </div>
            </div>
          </div>

          <div className="p-4 rounded-[1.25rem] liquid-glass text-left flex flex-col justify-between border border-white/10">
            <Globe className="w-6 h-6 text-emerald-300 mb-3" />
            <div>
              <div className="font-heading italic text-3xl sm:text-4xl text-white tracking-tight">
                99.8%
              </div>
              <div className="text-xs text-white/70 font-body font-light mt-1">
                Grounded Statutory Accuracy
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Bottom Left Card: 1-Click Interactive Contract Selector */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-20 w-full px-4 sm:px-8 lg:px-16 mt-6 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="p-3.5 sm:p-4 rounded-[1.5rem] liquid-glass flex flex-col gap-2 max-w-sm w-full border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-white/60 font-body uppercase tracking-wider">
              1-Click Contract Preloaders
            </span>
            <span className="text-xs text-cyan-300 font-mono">
              Risk: {selectedContract.overallRiskScore}/100
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {SAMPLE_CONTRACTS.map((contract) => (
              <button
                key={contract.id}
                onClick={() => setSelectedContract(contract)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-body transition-all duration-200 cursor-pointer ${
                  selectedContract.id === contract.id
                    ? 'bg-white/20 text-white font-medium shadow-inner'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="truncate pr-2">{contract.name}</span>
                <span className="text-[10px] shrink-0">{contract.badge}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => onOpenStudio(selectedContract)}
            className="mt-1 flex items-center justify-center gap-1.5 w-full py-2 rounded-full bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-200 text-xs font-semibold border border-cyan-400/30 transition-all cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Audit {selectedContract.name.split(' ')[0]} Now</span>
          </button>
        </div>

        {/* Partners / Jurisdictions Row */}
        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
          <span className="px-3 py-1 rounded-full liquid-glass text-[11px] font-medium text-white/80 font-body">
            Calibrated for Enterprise & Cross-Border Legal Frameworks
          </span>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6 text-white font-heading italic text-lg sm:text-xl text-white/90">
            <span>Delaware Chancery</span>
            <span>·</span>
            <span>FTC Rules</span>
            <span>·</span>
            <span>DTSA Secrets</span>
            <span>·</span>
            <span>UK Commercial</span>
            <span>·</span>
            <span>Cal. Labor § 16600</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
