import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from '../components/HeroSection';
import { SAMPLE_CONTRACTS } from '../data/sampleContracts';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useAnimation: () => ({ start: vi.fn() }),
  useInView: () => [null, false],
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
  useMotionValue: () => ({ get: () => 0, set: vi.fn() }),
  useSpring: () => ({ get: () => 0 }),
}));

Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  writable: true,
  value: vi.fn().mockResolvedValue(undefined),
});
Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  writable: true,
  value: vi.fn(),
});
Object.defineProperty(HTMLVideoElement.prototype, 'load', {
  writable: true,
  value: vi.fn(),
});

describe('HeroSection', () => {
  const mockOnOpenStudio = vi.fn();
  const mockSetSelectedContract = vi.fn();

  it('renders h1 with problem statement', () => {
    render(
      <HeroSection
        onOpenStudio={mockOnOpenStudio}
        selectedContract={SAMPLE_CONTRACTS[0]}
        setSelectedContract={mockSetSelectedContract}
      />
    );
    const h1 = document.querySelector('h1');
    expect(h1).toBeInTheDocument();
    // BlurText renders each word as a separate <span> so textContent has no spaces
    expect(h1?.textContent).toContain('AI');
    expect(h1?.textContent).toContain('Legal');
    expect(h1?.textContent).toContain('Assistance');
  });

  it('renders launch CTA button with aria-label', () => {
    render(
      <HeroSection
        onOpenStudio={mockOnOpenStudio}
        selectedContract={SAMPLE_CONTRACTS[0]}
        setSelectedContract={mockSetSelectedContract}
      />
    );
    const cta = screen.getByRole('button', { name: /Launch Live Contract Audit/i });
    expect(cta).toBeInTheDocument();
  });

  it('calls onOpenStudio when CTA is clicked', () => {
    render(
      <HeroSection
        onOpenStudio={mockOnOpenStudio}
        selectedContract={SAMPLE_CONTRACTS[0]}
        setSelectedContract={mockSetSelectedContract}
      />
    );
    const cta = screen.getByRole('button', { name: /Launch Live Contract Audit/i });
    fireEvent.click(cta);
    expect(mockOnOpenStudio).toHaveBeenCalledWith(SAMPLE_CONTRACTS[0]);
  });

  it('renders contract selector buttons', () => {
    render(
      <HeroSection
        onOpenStudio={mockOnOpenStudio}
        selectedContract={SAMPLE_CONTRACTS[0]}
        setSelectedContract={mockSetSelectedContract}
      />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(2);
  });

  it('renders all stats visible on screen', () => {
    render(
      <HeroSection
        onOpenStudio={mockOnOpenStudio}
        selectedContract={SAMPLE_CONTRACTS[0]}
        setSelectedContract={mockSetSelectedContract}
      />
    );
    expect(screen.getByText(/240 ms/i)).toBeInTheDocument();
    expect(screen.getByText(/99.8%/i)).toBeInTheDocument();
  });
});
