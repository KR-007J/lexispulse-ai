import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { RedlineStudioModal } from './components/RedlineStudioModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { SAMPLE_CONTRACTS, ContractSample } from './data/sampleContracts';
import {
  FileText,
  GitCompare,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  FileCheck,
  UserCheck,
  AlertCircle,
  Scale
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedContract, setSelectedContract] = useState<ContractSample>(SAMPLE_CONTRACTS[0]);
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  const handleOpenStudio = (contract?: ContractSample) => {
    if (contract) {
      setSelectedContract(contract);
    }
    setIsStudioOpen(true);
  };

  const useCases = [
    {
      title: 'Simplifying Complex Documents',
      desc: 'Converts dense legalese into plain-English (ELI5) summaries with clear takeaway points for non-lawyers.',
      icon: FileText,
      tag: 'Plain English'
    },
    {
      title: 'Comparing Contracts & Policies',
      desc: 'Side-by-side redline comparison showing risk deltas, clause modifications, and strike-throughs across drafts.',
      icon: GitCompare,
      tag: 'Version Drift'
    },
    {
      title: 'Highlighting Clauses & Risks',
      desc: 'AST classification flagging uncapped indemnity, automatic renewals, and restrictive covenants.',
      icon: ShieldAlert,
      tag: '6-Vector Radar'
    },
    {
      title: 'Answering Document Questions',
      desc: 'Grounded question answering with direct citations and statutory references (FTC, DGCL, DTSA).',
      icon: Sparkles,
      tag: 'Grounded Q&A'
    },
    {
      title: 'Options & Potential Next Steps',
      desc: 'Provides 1-click counter-proposal playbooks with commercially balanced compromises.',
      icon: ArrowRight,
      tag: 'Playbooks'
    },
    {
      title: 'Summaries & Actionable Checklists',
      desc: 'Generates multi-page executive dossiers with risk scorecards and cryptographic SHA-256 seal.',
      icon: FileCheck,
      tag: 'PDF Dossier'
    },
    {
      title: 'Preparing for a Legal Professional',
      desc: 'Generates high-leverage questions and statutory evidence for meetings with an attorney or outside counsel.',
      icon: UserCheck,
      tag: 'Counsel Prep'
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white font-body overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Skip to Content for Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

      {/* 1. Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'overview') {
            setIsStudioOpen(true);
          }
        }}
        onOpenStudio={() => handleOpenStudio()}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content">
        {/* 2. Section 1: Hero */}
        <HeroSection
          onOpenStudio={handleOpenStudio}
          selectedContract={selectedContract}
          setSelectedContract={setSelectedContract}
        />

        {/* 3. Section 2: 7 Core Challenge Use Cases */}
        <section aria-labelledby="challenge-use-cases" className="relative z-10 py-16 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 uppercase tracking-wider">
              PromptWars 2026 Problem Statement
            </span>
            <h2 id="challenge-use-cases" className="text-3xl sm:text-4xl md:text-5xl font-heading italic text-white mt-3">
              AI for Legal Assistance & Access
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-3 font-light leading-relaxed">
              Legal information is often complex, intimidating, and costly to navigate. LexisPulse AI provides GenAI-powered assistance across all 7 core legal access dimensions:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <div
                  key={i}
                  onClick={() => handleOpenStudio()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleOpenStudio()}
                  className="p-5 rounded-2xl liquid-glass border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/10 text-cyan-200">
                        {uc.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {uc.title}
                    </h3>
                    <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed font-light">
                      {uc.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-cyan-300 font-semibold">
                    <span>Try In Studio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legal Assistance Disclaimer Banner */}
          <div className="mt-12 p-4 rounded-2xl bg-zinc-900/80 border border-white/15 flex items-start gap-3 text-xs text-zinc-300">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Legal Assistance Notice & Disclaimer:</strong> LexisPulse AI is an AI-powered legal intelligence tool engineered to make legal information and basic assistance accessible. Solutions provide information and assistance, rather than replace professional legal advice. Always review binding agreements with a qualified legal professional.
            </div>
          </div>
        </section>

        {/* 4. Section 3: Architecture & Capabilities */}
        <CapabilitiesSection onOpenStudio={() => handleOpenStudio()} />
      </main>

      {/* 5. Footer */}
      <footer className="relative z-10 w-full py-12 px-6 sm:px-12 border-t border-white/10 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-cyan-300">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <span className="font-heading italic text-base text-white">AI for Legal Assistance & Access (LexisPulse AI)</span>
            <p className="text-[11px] text-zinc-400">
              PromptWars 2026 AI Calibration Track • Built with Google Gemini 2.0 Flash
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 font-body text-zinc-200">
          <button onClick={() => handleOpenStudio(SAMPLE_CONTRACTS[0])} className="hover:text-white transition-colors cursor-pointer">
            SaaS MSA Redlines
          </button>
          <button onClick={() => handleOpenStudio(SAMPLE_CONTRACTS[1])} className="hover:text-white transition-colors cursor-pointer">
            Mutual NDA Rules
          </button>
          <button onClick={() => handleOpenStudio(SAMPLE_CONTRACTS[2])} className="hover:text-white transition-colors cursor-pointer">
            Employment Safeguards
          </button>
          <button onClick={() => setIsApiKeyModalOpen(true)} className="text-cyan-300 hover:text-white transition-colors cursor-pointer">
            API Diagnostics
          </button>
        </div>

        <div className="text-right text-[11px] text-zinc-300">
          MIT License © 2026 Krish Joshi
        </div>
      </footer>

      {/* 6. Interactive Redline & Audit Studio Modal */}
      <RedlineStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        contract={selectedContract}
        onSelectContract={setSelectedContract}
      />

      {/* 7. API Key & System Diagnostics HUD */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />
    </div>
  );
}
