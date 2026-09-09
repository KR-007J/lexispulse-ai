import React from 'react';
import { ArrowUpRight, Key, ShieldCheck, Scale, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenStudio: () => void;
  onOpenApiKeyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenStudio, onOpenApiKeyModal }) => {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 lg:px-16 flex items-center justify-between pointer-events-none">
      {/* Left Logo */}
      <div className="pointer-events-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center text-white hover:scale-105 transition-transform duration-300 group cursor-pointer shadow-lg"
          title="LexisPulse AI"
        >
          <span className="font-heading italic text-2xl group-hover:text-cyan-300 transition-colors">
            ⚖️
          </span>
        </button>
      </div>

      {/* Center Nav Pill */}
      <nav className="pointer-events-auto hidden md:flex items-center gap-1 p-1.5 rounded-full liquid-glass shadow-2xl">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'redline', label: 'Redline Diff' },
          { id: 'risk-matrix', label: 'Risk Matrix' },
          { id: 'eli5', label: 'Plain English ELI5' },
          { id: 'citations', label: 'Statutory Citations' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-4 py-2 text-xs lg:text-sm font-medium rounded-full transition-all duration-300 font-body cursor-pointer ${
              activeTab === item.id
                ? 'bg-white/15 text-white shadow-inner font-semibold'
                : 'text-white/80 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.label}
          </button>
        ))}

        <button
          onClick={onOpenStudio}
          className="ml-2 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs lg:text-sm font-semibold hover:bg-cyan-100 transition-all duration-300 shadow-md group whitespace-nowrap cursor-pointer"
        >
          <span>Audit Contract</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </nav>

      {/* Right Diagnostics Button */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={onOpenApiKeyModal}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-xs font-body text-cyan-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer shadow-md"
          title="API Key & System Diagnostics"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Key className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-white/90">Gemini 2.0 Live</span>
        </button>

        <button
          onClick={onOpenStudio}
          className="md:hidden flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-cyan-100 transition-all shadow-md"
        >
          <span>Launch Audit</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
