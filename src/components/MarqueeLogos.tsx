import React from 'react';

interface LogoItem {
  name: string;
  category: string;
  gradient: string;
}

const LOGOS: LogoItem[] = [
  { name: 'Delaware Chancery', category: 'Jurisdiction', gradient: 'from-blue-600/30 via-cyan-500/20 to-transparent' },
  { name: 'Google Cloud AI', category: 'GenAI Engine', gradient: 'from-cyan-500/30 via-blue-500/20 to-transparent' },
  { name: 'Clifford Chance', category: 'Global Law', gradient: 'from-purple-600/30 via-indigo-500/20 to-transparent' },
  { name: 'Latham & Watkins', category: 'Corporate MSA', gradient: 'from-amber-500/30 via-orange-500/20 to-transparent' },
  { name: 'FTC Compliance', category: 'Statutory Rules', gradient: 'from-emerald-500/30 via-teal-500/20 to-transparent' },
  { name: 'Wadhwani AI', category: 'Gov Standards', gradient: 'from-pink-500/30 via-rose-500/20 to-transparent' },
  { name: 'Deloitte Legal', category: 'Risk Advisory', gradient: 'from-lime-500/30 via-emerald-500/20 to-transparent' },
  { name: 'Y Combinator', category: 'SAFE & NDA', gradient: 'from-orange-500/30 via-amber-500/20 to-transparent' },
];

export const MarqueeLogos: React.FC = () => {
  const doubleList = [...LOGOS, ...LOGOS];

  return (
    <div aria-hidden="true" className="w-full relative overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
        {doubleList.map((logo, index) => (
          <div
            key={index}
            className="group relative h-20 w-48 shrink-0 flex flex-col items-center justify-center rounded-full liquid-glass border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden cursor-pointer px-5"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${logo.gradient} opacity-0 scale-150 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none`}
            />
            <span className="relative z-10 text-sm font-semibold text-white/90 group-hover:text-white font-body tracking-tight">
              {logo.name}
            </span>
            <span className="relative z-10 text-[10px] text-white/50 group-hover:text-cyan-300 font-body uppercase tracking-wider mt-0.5">
              {logo.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
