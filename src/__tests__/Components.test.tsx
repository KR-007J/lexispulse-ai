import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { SAMPLE_CONTRACTS } from '../data/sampleContracts';
import { CounselPrepView } from '../components/CounselPrepView';
import { ContractCompareView } from '../components/ContractCompareView';
import { AgentSwarmView } from '../components/AgentSwarmView';
import { KnowledgeGraphView } from '../components/KnowledgeGraphView';
import { LiveClauseEditor } from '../components/LiveClauseEditor';
import { ApiKeyModal } from '../components/ApiKeyModal';
import { RedlineStudioModal } from '../components/RedlineStudioModal';

type MockProps = React.PropsWithChildren<Record<string, unknown>>;

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: MockProps) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: MockProps) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }: MockProps) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: MockProps) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: MockProps) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }: MockProps) => <h4 {...props}>{children}</h4>,
    span: ({ children, ...props }: MockProps) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: MockProps) => <>{children}</>,
  useAnimation: () => ({ start: vi.fn() }),
  useInView: () => [null, false],
}));

describe('Comprehensive Component Coverage Suite', () => {
  const sample = SAMPLE_CONTRACTS[0];

  it('renders CounselPrepView with checklist and attorney question guides', () => {
    const { container } = render(<CounselPrepView contractName={sample.name} />);
    expect(container).toBeTruthy();
    expect(screen.getByText(/Legal Counsel Consultation Brief/i)).toBeInTheDocument();
    expect(screen.getByText(/Lawyer-Ready/i)).toBeInTheDocument();
  });

  it('renders ContractCompareView with drift delta metrics', () => {
    const { container } = render(<ContractCompareView />);
    expect(container).toBeTruthy();
    expect(screen.getByText(/Contract Version Drift/i)).toBeInTheDocument();
    expect(screen.getByText(/Original vs Counterparty Redline/i)).toBeInTheDocument();
  });

  it('renders AgentSwarmView with 4 AI personas and consensus score', () => {
    const { container } = render(
      <AgentSwarmView contractName={sample.name} contractText={sample.clauses[0].originalText} />
    );
    expect(container).toBeTruthy();
    expect(screen.getByText(/Autonomous Multi-Agent Swarm/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Risk Auditor Agent/i).length).toBeGreaterThan(0);
  });

  it('renders KnowledgeGraphView with SVG visualization and legend', () => {
    const { container } = render(<KnowledgeGraphView contractName={sample.name} />);
    expect(container).toBeTruthy();
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg[role="img"]')).toBeInTheDocument();
  });

  it('renders LiveClauseEditor with risk meters and playbooks', () => {
    const mockUpdate = vi.fn();
    const { container } = render(
      <LiveClauseEditor initialText={sample.clauses[0].originalText} onApplyChange={mockUpdate} />
    );
    expect(container).toBeTruthy();
    expect(screen.getByText(/Interactive Live Clause Studio/i)).toBeInTheDocument();
  });

  it('renders ApiKeyModal with diagnostic controls', () => {
    const mockClose = vi.fn();
    const { container } = render(<ApiKeyModal isOpen={true} onClose={mockClose} />);
    expect(container).toBeTruthy();
    expect(screen.getByText(/Gemini 2.0 API & Diagnostics HUD/i)).toBeInTheDocument();
  });

  it('renders RedlineStudioModal when open', () => {
    const mockClose = vi.fn();
    const mockSelect = vi.fn();
    const { container } = render(
      <RedlineStudioModal
        isOpen={true}
        onClose={mockClose}
        contract={sample}
        onSelectContract={mockSelect}
      />
    );
    expect(container).toBeTruthy();
    expect(screen.getByText(/Redline Studio/i)).toBeInTheDocument();
  });
});
