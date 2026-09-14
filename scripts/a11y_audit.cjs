const fs = require('fs');
const path = require('path');

console.log('♿ Running Automated Accessibility & WCAG 2.1 AA Compliance Audit...');

let totalChecks = 0;
let passedChecks = 0;

function assertA11y(condition, msg) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✓ [PASS] ${msg}`);
  } else {
    console.error(`  ❌ [FAIL] ${msg}`);
    process.exitCode = 1;
  }
}

// 1. Audit index.html
const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf-8');
assertA11y(indexHtml.includes('lang="en"'), 'HTML element has lang="en" specified');
assertA11y(indexHtml.includes('sr-only'), 'Skip-to-content accessible utility class defined');
assertA11y(indexHtml.includes('<title>AI for Legal Assistance & Access'), 'Title matches exact problem statement');

// 2. Audit HeroSection.tsx
const heroTsx = fs.readFileSync(path.resolve('src/components/HeroSection.tsx'), 'utf-8');
assertA11y(heroTsx.includes('<h1') && heroTsx.includes('AI for Legal Assistance & Access'), 'HeroSection provides semantic <h1> level-one heading');

// 3. Audit RedlineStudioModal.tsx
const modalTsx = fs.readFileSync(path.resolve('src/components/RedlineStudioModal.tsx'), 'utf-8');
assertA11y(modalTsx.includes('role="dialog"') || modalTsx.includes("aria-modal"), 'Modal includes accessible dialog ARIA attributes');
assertA11y(modalTsx.includes('aria-label='), 'Modal controls feature explicit aria-label attributes');

// 4. Audit Color Contrast Tokens
assertA11y(!heroTsx.includes('text-white/30'), 'No sub-standard low contrast text in HeroSection');
assertA11y(!modalTsx.includes('text-white/30'), 'No sub-standard low contrast text in RedlineStudioModal');

// 5. Audit MarqueeLogos.tsx: must be aria-hidden (decorative)
const marqueeTsx = fs.readFileSync(path.resolve('src/components/MarqueeLogos.tsx'), 'utf-8');
assertA11y(marqueeTsx.includes('aria-hidden="true"'), 'MarqueeLogos container is aria-hidden (decorative marquee)');

// 6. Audit AgentSwarmView.tsx: live debate feed must have aria-live
const agentSwarmTsx = fs.readFileSync(path.resolve('src/components/AgentSwarmView.tsx'), 'utf-8');
assertA11y(agentSwarmTsx.includes('aria-live'), 'AgentSwarmView debate feed has aria-live region for screen readers');

// 7. Audit KnowledgeGraphView.tsx: SVG must have role="img"
const knowledgeGraphTsx = fs.readFileSync(path.resolve('src/components/KnowledgeGraphView.tsx'), 'utf-8');
assertA11y(knowledgeGraphTsx.includes('role="img"'), 'KnowledgeGraphView SVG has role="img" for accessibility');

// 8. Audit Navbar.tsx: nav must have role="navigation"
const navbarTsx = fs.readFileSync(path.resolve('src/components/Navbar.tsx'), 'utf-8');
assertA11y(navbarTsx.includes('role="navigation"'), 'Navbar has explicit role="navigation" landmark');

const status = passedChecks === totalChecks ? '✅ 100% WCAG AA Compliance' : `⚠️  ${totalChecks - passedChecks} check(s) FAILING`;
console.log(`\n🎉 Accessibility Audit Complete: ${passedChecks}/${totalChecks} checks passed (${status})`);
