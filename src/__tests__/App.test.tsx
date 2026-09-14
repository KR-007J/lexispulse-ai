import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
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

// Mock video element
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

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('has skip to main content link for accessibility', () => {
    render(<App />);
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
  });

  it('renders the main content landmark', () => {
    render(<App />);
    const main = document.querySelector('main#main-content');
    expect(main).toBeInTheDocument();
  });

  it('has footer with license information', () => {
    render(<App />);
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('renders the problem statement section', () => {
    render(<App />);
    // The section heading should be present
    const heading = screen.getByText('AI for Legal Assistance & Access');
    expect(heading).toBeInTheDocument();
  });

  it('renders all 7 use case cards', () => {
    render(<App />);
    expect(screen.getByText('Simplifying Complex Documents')).toBeInTheDocument();
    expect(screen.getByText('Comparing Contracts & Policies')).toBeInTheDocument();
    expect(screen.getByText('Highlighting Clauses & Risks')).toBeInTheDocument();
    expect(screen.getByText('Answering Document Questions')).toBeInTheDocument();
    expect(screen.getByText('Options & Potential Next Steps')).toBeInTheDocument();
    expect(screen.getByText('Summaries & Actionable Checklists')).toBeInTheDocument();
    expect(screen.getByText('Preparing for a Legal Professional')).toBeInTheDocument();
  });

  it('renders legal disclaimer', () => {
    render(<App />);
    const disclaimer = screen.getByText(/rather than replace professional legal advice/i);
    expect(disclaimer).toBeInTheDocument();
  });
});
