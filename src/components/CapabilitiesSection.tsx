import React from 'react';
import { motion } from 'framer-motion';
import { FadingVideo } from './FadingVideo';
import { ArrowUpRight, Scale, ShieldAlert, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { MarqueeLogos } from './MarqueeLogos';

interface CapabilitiesSectionProps {
  onOpenStudio: () => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onOpenStudio }) => {
  const cards = [
    {
      iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
      tags: ['AST Parsing', 'Deterministic', 'Zero Hallucination', 'Sub-300ms'],
      title: 'Clause Graph Triage',
      desc: 'Gemini 2.0 Flash tokenizes complex agreements into abstract syntax graphs, isolating uncapped liabilities, one-sided termination traps, and hidden IP assignments in milliseconds.',
    },
    {
      iconPath: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
      tags: ['Visual Redline', 'Semantic Diff', 'Leverage Scoring', 'Counter-Draft'],
      title: 'Bilateral Redline Engine',
      desc: 'Side-by-side comparative diffing reveals exactly what clauses the counterparty slipped into their draft, generating fair, standard market counter-proposals with 1-click copy.',
    },
    {
      iconPath: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z",
      tags: ['Plain English', 'Statutory Citations', 'ELI5 Lexicon', 'Court-Ready'],
      title: 'Grounded Plain English',
      desc: 'Translates convoluted Latin legalese into crisp, actionable English with statutory cross-references to Delaware Corporate Law, FTC Rules, and California Labor Codes.',
    },
  ];

  return (
    <section aria-labelledby="capabilities-heading" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white px-4 sm:px-8 lg:px-16 pt-24 pb-12">
      {/* 1. Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <FadingVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
      </div>

      {/* 2. Section Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs sm:text-sm font-body text-white/70 tracking-widest uppercase block mb-3">
            // Core Architecture & Capabilities
          </span>
          <h2 id="capabilities-heading" className="font-heading italic text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.92] tracking-[-3px]">
            Legal intelligence <br />
            re-engineered.
          </h2>
        </div>

        {/* 3 Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="p-6 rounded-[1.5rem] liquid-glass flex flex-col justify-between min-h-[380px] border border-white/10 hover:border-white/25 transition-all duration-300 group"
            >
              {/* Top Row: Icon + Tag Pills */}
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-xl liquid-glass flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-cyan-300">
                    <path d={card.iconPath} />
                  </svg>
                </div>

                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  {card.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-full liquid-glass text-[10px] sm:text-[11px] text-white/80 font-body whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: Title + Description */}
              <div className="mt-8">
                <h3 className="font-heading italic text-white text-3xl sm:text-4xl tracking-tight leading-none mb-3 group-hover:text-cyan-200 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-body font-light leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee Scroller */}
        <div className="mt-14">
          <div className="text-center mb-2">
            <span className="text-xs text-white/60 font-body uppercase tracking-wider">
              Trusted by enterprise contract standards & statutory registries
            </span>
          </div>
          <MarqueeLogos />
        </div>
      </div>
    </section>
  );
};
