# Contributing to AI for Legal Assistance & Access (LexisPulse AI)

Thank you for your interest in contributing to LexisPulse AI! This document outlines the process for contributing to this project.

## Getting Started

### Prerequisites
- Node.js >= 18
- Python >= 3.10
- npm >= 9

### Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/KR-007J/lexispulse-ai.git
cd lexispulse-ai

# 2. Install dependencies
npm install

# 3. Start the frontend
npm run dev

# 4. (Optional) Start the backend server
python3 backend/server.py
```

## Development Workflow

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feat/your-feature-name`
3. **Make your changes** following the code style guidelines
4. **Run tests**: `npm test` (must pass with >70% coverage)
5. **Run linting**: `npm run lint` (must pass with 0 warnings)
6. **Run typecheck**: `npm run typecheck` (must exit 0)
7. **Submit a Pull Request** with a clear description

## Code Standards

- **TypeScript**: Strict mode enabled. All code must be fully typed.
- **Testing**: All new features must include Vitest unit tests.
- **Accessibility**: All UI components must pass WCAG 2.1 AA standards.
- **Security**: Never commit API keys or secrets. Use environment variables.

## Testing

```bash
# Run all tests with coverage
npm test

# Run backend tests
npm run test:backend

# Run accessibility audit
npm run test:a11y
```

## Reporting Issues

Please use GitHub Issues to report bugs or request features. Include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node.js version, browser)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
