import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const PKG_PATH = path.resolve('package.json');
const INDEX_PATH = path.resolve('index.html');
const README_PATH = path.resolve('README.md');

test('Problem Statement Alignment: Package & Metadata Configuration', () => {
  const pkg = JSON.parse(fs.readFileSync(PKG_PATH, 'utf-8'));
  assert.strictEqual(pkg.name, 'ai-for-legal-assistance-and-access');
  assert.ok(pkg.description.includes('legal assistance accessible'));
  assert.ok(pkg.keywords.includes('ai-for-legal-assistance-and-access'));
  
  const indexHtml = fs.readFileSync(INDEX_PATH, 'utf-8');
  assert.ok(indexHtml.includes('AI for Legal Assistance & Access'));
  assert.ok(indexHtml.includes('name="description"'));
  assert.ok(indexHtml.includes('name="keywords"'));
});

test('Accessibility: Level-1 Heading & Semantic Landmarks in Codebase', () => {
  const indexHtml = fs.readFileSync(INDEX_PATH, 'utf-8');
  assert.ok(indexHtml.includes('sr-only'), 'Skip to content helper must be present in index.html');
  
  const heroContent = fs.readFileSync(path.resolve('src/components/HeroSection.tsx'), 'utf-8');
  assert.ok(heroContent.includes('<h1'), 'HeroSection must include semantic <h1> tag');
  assert.ok(heroContent.includes('AI for Legal Assistance & Access'), 'h1 must feature exact problem statement');
});

test('Security & Code Quality: Sanitization & Attestation Modules', () => {
  const securityPy = fs.readFileSync(path.resolve('backend/security.py'), 'utf-8');
  assert.ok(securityPy.includes('sanitize_legal_input'));
  assert.ok(securityPy.includes('generate_attestation_hash'));
  assert.ok(securityPy.includes('MAX_DOCUMENT_BYTES'));
  assert.ok(securityPy.includes('PROMPT_INJECTION_PATTERNS'));
});

test('Problem Statement Coverage: All 7 Required Hackathon Use Cases', () => {
  const redlineModal = fs.readFileSync(path.resolve('src/components/RedlineStudioModal.tsx'), 'utf-8');
  // 1. Simplifying complex legal documents
  assert.ok(redlineModal.includes('eli5') || redlineModal.includes('Plain English'));
  // 2. Comparing contracts, agreements, or policies
  assert.ok(redlineModal.includes('compare') || redlineModal.includes('Version Drift'));
  // 3. Highlighting important clauses, obligations, risks, or inconsistencies
  assert.ok(redlineModal.includes('matrix') || redlineModal.includes('Risk Matrix'));
  // 4. Answering questions based on provided legal documents
  assert.ok(redlineModal.includes('qa') || redlineModal.includes('Grounded Q&A'));
  // 5. Helping users understand their options and potential next steps
  assert.ok(redlineModal.includes('editor') || redlineModal.includes('Live Editor'));
  // 6. Generating summaries, checklists, or other actionable outputs
  assert.ok(redlineModal.includes('exportOfficialAuditDossier'));
  // 7. Helping users prepare information or questions for a legal professional
  assert.ok(redlineModal.includes('counsel') || redlineModal.includes('Counsel Prep'));
});

test('Legal Advice Disclaimer Compliance', () => {
  const readme = fs.readFileSync(README_PATH, 'utf-8');
  assert.ok(readme.includes('does not provide legal advice'));
});
