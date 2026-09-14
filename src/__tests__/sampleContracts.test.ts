import { describe, it, expect } from 'vitest';
import { SAMPLE_CONTRACTS } from '../data/sampleContracts';

describe('SAMPLE_CONTRACTS', () => {
  it('has at least 3 sample contracts', () => {
    expect(SAMPLE_CONTRACTS.length).toBeGreaterThanOrEqual(3);
  });

  it('each contract has required fields', () => {
    for (const contract of SAMPLE_CONTRACTS) {
      expect(contract.id).toBeTruthy();
      expect(contract.name).toBeTruthy();
      expect(contract.category).toBeTruthy(); // interface uses 'category', not 'type'
      expect(contract.clauses).toBeDefined();
      expect(Array.isArray(contract.clauses)).toBe(true);
      expect(contract.overallRiskScore).toBeGreaterThanOrEqual(0);
      expect(contract.overallRiskScore).toBeLessThanOrEqual(100);
    }
  });

  it('each clause has required fields', () => {
    for (const contract of SAMPLE_CONTRACTS) {
      for (const clause of contract.clauses) {
        expect(clause.id).toBeTruthy();
        expect(clause.section).toBeTruthy();
        expect(clause.title).toBeTruthy();
        expect(clause.riskLevel).toMatch(/^(critical|high|medium|low)$/);
        expect(clause.riskScore).toBeGreaterThanOrEqual(0);
        expect(clause.riskScore).toBeLessThanOrEqual(100);
        expect(clause.plainEnglishTranslation).toBeTruthy();
        expect(clause.recommendedCounterClause).toBeTruthy();
        // statutoryReference is optional in the interface; skip mandatory check
        if (clause.statutoryReference) {
          expect(clause.statutoryReference.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('first contract is high risk MSA', () => {
    const msa = SAMPLE_CONTRACTS[0];
    // Name is "SaaS Master Services Agreement (Enterprise 2026)"
    expect(msa.name.toLowerCase()).toContain('master services agreement');
    expect(msa.criticalIssuesCount).toBeGreaterThan(0);
  });

  it('all contracts have badge text', () => {
    for (const contract of SAMPLE_CONTRACTS) {
      expect(contract.badge).toBeTruthy();
    }
  });
});
