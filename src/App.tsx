import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { RedlineStudioModal } from './components/RedlineStudioModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { SAMPLE_CONTRACTS, ContractSample } from './data/sampleContracts';
import { ArrowUpRight, ShieldCheck, Scale, Sparkles, Heart } from 'lucide-react';

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

  return (
    <main className="relative min-h-screen bg-black text-white font-body overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
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

      {/* 2. Section 1: Hero */}
      <HeroSection
        onOpenStudio={handleOpenStudio}
        selectedContract={selectedContract}
        setSelectedContract={setSelectedContract}
      />

      {/* 3. Section 2: Capabilities & Architecture */}
      <CapabilitiesSection onOpenStudio={() => handleOpenStudio()} />

      {/* 4. Footer */}
      <footer className="relative z-10 w-full py-12 px-6 sm:px-12 border-t border-white/10 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-cyan-300">
            ⚖️
          </div>
          <div>
            <span className="font-heading italic text-base text-white">LexisPulse AI</span>
            <p className="text-[11px] text-white/40">
              PromptWars 2026 AI Calibration Track • Built with Google Gemini 2.0 Flash
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 font-body text-white/70">
          <button onClick={() => handleOpenStudio(SAMPLE_CONTRACTS[0])} className="hover:text-white transition-colors cursor-pointer">
            SaaS MSA Redlines
          </button>
          <button onClick={() => handleOpenStudio(SAMPLE_CONTRACTS[1])} className="hover:text-white transition-colors cursor-pointer">
            Mutual NDA Rules
          </button>
          <button onClick={() => handleOpenStudio(SAMPLE_CONTRACTS[2])} className="hover:text-white transition-colors cursor-pointer">
            Employment Safeguards
          </button>
          <button onClick={() => setIsApiKeyModalOpen(true)} className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer">
            API Diagnostics
          </button>
        </div>

        <div className="text-right text-[11px] text-white/40">
          MIT License © 2026 Krish Joshi
        </div>
      </footer>

      {/* 5. Interactive Redline & Audit Studio Modal */}
      <RedlineStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        contract={selectedContract}
        onSelectContract={setSelectedContract}
      />

      {/* 6. API Key & System Diagnostics HUD */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />
    </main>
  );
}
