import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, ZoomIn, ZoomOut, RotateCcw, AlertTriangle, ShieldCheck, Scale, Info } from 'lucide-react';
import { playHapticClick } from '../utils/audio';

interface Node {
  id: string;
  label: string;
  type: 'clause' | 'statute' | 'root';
  risk: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'STATUTE';
  x: number;
  y: number;
  desc?: string;
}

interface Edge {
  source: string;
  target: string;
  relation: string;
  severity: string;
}

export const KnowledgeGraphView: React.FC<{ contractName: string }> = ({ contractName }) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [zoom, setZoom] = useState(1);

  // Nodes positioning in virtual 800x480 canvas
  const nodes: Node[] = [
    { id: 'root', label: 'Master Agreement', type: 'root', risk: 'LOW', x: 400, y: 220, desc: 'Root Enterprise Contract Node' },
    { id: 'c1', label: 'Section 9: Indemnification', type: 'clause', risk: 'CRITICAL', x: 220, y: 120, desc: 'Uncapped defense obligation against third-party claims.' },
    { id: 'c2', label: 'Section 12: Liability Cap', type: 'clause', risk: 'HIGH', x: 200, y: 320, desc: 'Unlimited vendor liability and consequential damages.' },
    { id: 'c3', label: 'Section 14: Non-Compete', type: 'clause', risk: 'CRITICAL', x: 580, y: 120, desc: '36-month worldwide non-compete restraint.' },
    { id: 'c4', label: 'Section 7: IP Ownership', type: 'clause', risk: 'MEDIUM', x: 600, y: 320, desc: 'Broad derivative intellectual property assignment.' },
    
    // Statutory Anchors
    { id: 's_dgcl', label: 'DGCL § 145', type: 'statute', risk: 'STATUTE', x: 80, y: 100, desc: 'Delaware General Corp Law indemnification boundaries.' },
    { id: 's_ftc', label: 'FTC 16 CFR § 910', type: 'statute', risk: 'STATUTE', x: 720, y: 100, desc: 'Federal Trade Commission Non-Compete Ban Rule.' },
    { id: 's_dtsa', label: 'DTSA 18 U.S.C. § 1836', type: 'statute', risk: 'STATUTE', x: 730, y: 340, desc: 'Defend Trade Secrets Act whistleblower protection.' },
    { id: 's_cal', label: 'Cal. Labor Code § 16600', type: 'statute', risk: 'STATUTE', x: 480, y: 50, desc: 'California statutory prohibition on restraints of trade.' }
  ];

  const edges: Edge[] = [
    { source: 'root', target: 'c1', relation: 'contains', severity: 'CRITICAL' },
    { source: 'root', target: 'c2', relation: 'contains', severity: 'HIGH' },
    { source: 'root', target: 'c3', relation: 'contains', severity: 'CRITICAL' },
    { source: 'root', target: 'c4', relation: 'contains', severity: 'MEDIUM' },
    
    { source: 'c1', target: 'c2', relation: 'liability_compounds', severity: 'CRITICAL' },
    { source: 'c1', target: 's_dgcl', relation: 'governed_by', severity: 'HIGH' },
    { source: 'c3', target: 's_ftc', relation: 'violates', severity: 'CRITICAL' },
    { source: 'c3', target: 's_cal', relation: 'void_under', severity: 'CRITICAL' },
    { source: 'c4', target: 's_dtsa', relation: 'requires_notice', severity: 'MEDIUM' }
  ];

  const getNodeColor = (risk: string) => {
    switch (risk) {
      case 'CRITICAL': return { bg: '#ef4444', ring: '#dc2626', text: '#fee2e2' };
      case 'HIGH': return { bg: '#f97316', ring: '#ea580c', text: '#ffedd5' };
      case 'MEDIUM': return { bg: '#eab308', ring: '#ca8a04', text: '#fef9c3' };
      case 'LOW': return { bg: '#22c55e', ring: '#16a34a', text: '#dcfce7' };
      case 'STATUTE': return { bg: '#06b6d4', ring: '#0891b2', text: '#cffafe' };
      default: return { bg: '#a1a1aa', ring: '#71717a', text: '#f4f4f5' };
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl liquid-glass border border-white/10 text-xs">
        <div className="flex items-center gap-2 text-white">
          <Network className="w-4 h-4 text-cyan-300" />
          <span className="font-semibold">Clause Dependency & Statutory Blast-Radius Map</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300">
            {nodes.length} Nodes • {edges.length} Dependencies
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { playHapticClick(); setZoom(z => Math.min(z + 0.15, 1.6)); }}
            className="p-1.5 rounded-lg liquid-glass hover:bg-white/10 text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => { playHapticClick(); setZoom(z => Math.max(z - 0.15, 0.7)); }}
            className="p-1.5 rounded-lg liquid-glass hover:bg-white/10 text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => { playHapticClick(); setZoom(1); setSelectedNode(null); }}
            className="p-1.5 rounded-lg liquid-glass hover:bg-white/10 text-white transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Graph Canvas */}
      <div className="relative h-[480px] w-full rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-md overflow-hidden flex items-center justify-center">
        {/* Radial Ambient Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06)_0,transparent_70%)] pointer-events-none" />

        <svg
          viewBox="0 0 800 460"
          role="img"
          aria-label="Interactive clause dependency knowledge graph showing relationships between contract clauses and statutory frameworks"
          className="w-full h-full cursor-grab active:cursor-grabbing select-none"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
        >
          <title>Clause Knowledge Graph</title>
          {/* Edges */}
          {edges.map((e, idx) => {
            const src = nodes.find(n => n.id === e.source)!;
            const tgt = nodes.find(n => n.id === e.target)!;
            const isHighlight = selectedNode && (selectedNode.id === e.source || selectedNode.id === e.target);

            return (
              <g key={idx}>
                <line
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke={isHighlight ? '#06b6d4' : e.severity === 'CRITICAL' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.15)'}
                  strokeWidth={isHighlight ? 2.5 : e.severity === 'CRITICAL' ? 1.8 : 1}
                  strokeDasharray={e.relation.includes('violates') || e.relation.includes('void') ? '4 3' : undefined}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const style = getNodeColor(node.risk);
            const isSelected = selectedNode?.id === node.id;
            const isConnected = selectedNode && edges.some(e => (e.source === selectedNode.id && e.target === node.id) || (e.target === selectedNode.id && e.source === node.id));

            return (
              <g
                key={node.id}
                onClick={() => { playHapticClick(); setSelectedNode(node); }}
                aria-label={`${node.label} – Risk: ${node.risk}`}
                className="cursor-pointer transition-all duration-200"
              >
                {/* Halo */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 28 : isConnected ? 22 : 18}
                  fill={style.bg}
                  fillOpacity={isSelected ? 0.4 : 0.15}
                  stroke={style.ring}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                />

                {/* Center Core */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.type === 'root' ? 12 : node.type === 'statute' ? 10 : 8}
                  fill={style.bg}
                />

                {/* Text Label */}
                <text
                  x={node.x}
                  y={node.y + 26}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="600"
                  className="pointer-events-none drop-shadow-md"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Node Details Drawer */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 p-4 rounded-xl liquid-glass-strong border border-white/20 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/10 text-cyan-300">
                  {selectedNode.type.toUpperCase()}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">{selectedNode.label}</h4>
              </div>
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                style={{ backgroundColor: getNodeColor(selectedNode.risk).bg, color: '#ffffff' }}
              >
                {selectedNode.risk}
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-body">
              {selectedNode.desc}
            </p>

            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
              <span>Blast Radius Impact</span>
              <span className="text-rose-400 font-bold">
                {selectedNode.risk === 'CRITICAL' ? 'High Risk Propagation' : 'Local Scope'}
              </span>
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <div className="absolute top-3 left-3 p-2.5 rounded-lg liquid-glass border border-white/10 hidden md:flex items-center gap-3 text-[10px] text-zinc-300">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Critical Risk
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> High Risk
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Safe / Balanced
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Statute Anchor
          </div>
        </div>
      </div>
    </div>
  );
};
