export interface ClauseRisk {
  id: string;
  section: string;
  title: string;
  originalText: string;
  counterpartyText?: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  riskScore: number;
  riskCategory: 'Indemnity' | 'Confidentiality' | 'Termination' | 'Intellectual Property' | 'Non-Compete' | 'Governing Law';
  whyItMatters: string;
  plainEnglishTranslation: string;
  recommendedCounterClause: string;
  statutoryReference?: string;
}

export interface ContractSample {
  id: string;
  name: string;
  category: string;
  badge: string;
  overallRiskScore: number;
  riskGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  clausesCount: number;
  criticalIssuesCount: number;
  description: string;
  clauses: ClauseRisk[];
}

export const SAMPLE_CONTRACTS: ContractSample[] = [
  {
    id: 'saas-msa-2026',
    name: 'SaaS Master Services Agreement (Enterprise 2026)',
    category: 'Enterprise SaaS',
    badge: '🔴 High Risk (78/100)',
    overallRiskScore: 78,
    riskGrade: 'D',
    clausesCount: 18,
    criticalIssuesCount: 3,
    description: 'Vendor-favoring enterprise software agreement with uncapped indemnification, automatic 3-year rollover, and unilateral fee escalation.',
    clauses: [
      {
        id: 'cl-1',
        section: 'Section 9.2',
        title: 'Uncapped Customer Indemnification',
        originalText: 'Customer shall defend, indemnify, and hold harmless Vendor, its affiliates, and officers from and against any and all claims, losses, liabilities, and legal expenses arising out of Customer Data or use of the Services, without any limitation of liability or aggregate cap.',
        counterpartyText: 'Customer shall defend, indemnify, and hold harmless Vendor against all third-party claims arising from Customer Data, capped strictly at fees paid in preceding 12 months.',
        riskLevel: 'critical',
        riskScore: 94,
        riskCategory: 'Indemnity',
        whyItMatters: 'Forces your company to pay unlimited damages for vendor lawsuits, completely bypassing the standard liability cap in Section 10.',
        plainEnglishTranslation: 'If the vendor gets sued because of how you used their tool, you have to pay all their legal bills and settlements with no spending limit.',
        recommendedCounterClause: 'Customer indemnification obligations shall be subject to the aggregate Limitation of Liability cap set forth in Section 10.1 (12 months fees paid).',
        statutoryReference: 'Delaware General Corporation Law § 145 / UCC § 2-719'
      },
      {
        id: 'cl-2',
        section: 'Section 14.1',
        title: 'Unilateral Price Escalation & Auto-Renewal',
        originalText: 'This Agreement shall automatically renew for successive three (3) year terms unless Customer provides written notice via registered mail at least one-hundred eighty (180) days prior to expiration. Vendor reserves the right to increase subscription fees by up to 25% per renewal period.',
        counterpartyText: 'Agreement renews on a 1-year basis with 30-day notice; price increases capped at CPI or max 5%.',
        riskLevel: 'high',
        riskScore: 82,
        riskCategory: 'Termination',
        whyItMatters: 'Traps your company into a 3-year commitment with a 6-month notice window and allows compounding 25% price spikes.',
        plainEnglishTranslation: 'You are locked in for 3 more years unless you cancel 6 months early in writing, and they can raise your price by 25% every time.',
        recommendedCounterClause: 'Term shall renew annually with 30 days notice. Any annual price adjustments shall not exceed the Consumer Price Index (CPI) or 4%, whichever is lower.',
        statutoryReference: 'FTC Negative Option Rule 16 CFR Part 425'
      },
      {
        id: 'cl-3',
        section: 'Section 7.4',
        title: 'Derivative IP Ownership Overreach',
        originalText: 'Vendor shall exclusively own all rights, title, and interest in and to any suggestions, enhancement requests, telemetry data, machine learning embeddings, and custom modifications created in connection with Customer’s use of the Platform.',
        counterpartyText: 'Customer retains all IP in Customer Data and custom models; Vendor receives a revocable license solely to provide the services.',
        riskLevel: 'high',
        riskScore: 76,
        riskCategory: 'Intellectual Property',
        whyItMatters: 'Vendor claims ownership over your proprietary AI workflows and domain embeddings built on their platform.',
        plainEnglishTranslation: 'Anything custom you build, suggest, or train using their system becomes the vendor’s legal property forever.',
        recommendedCounterClause: 'Customer retains sole ownership of Customer Data, proprietary prompts, and fine-tuned weights. Vendor obtains only a limited license to operate the service.',
        statutoryReference: '17 U.S. Code § 201 (Work Made for Hire)'
      }
    ]
  },
  {
    id: 'mutual-nda-sv',
    name: 'Silicon Valley Mutual Non-Disclosure Agreement',
    category: 'Commercial IP',
    badge: '🟡 Medium Risk (42/100)',
    overallRiskScore: 42,
    riskGrade: 'B',
    clausesCount: 12,
    criticalIssuesCount: 1,
    description: 'Standard bilateral NDA with a stealth perpetual confidentiality clause and overbroad residual memory clause.',
    clauses: [
      {
        id: 'cl-nda-1',
        section: 'Section 4.1',
        title: 'Perpetual Confidentiality Obligation',
        originalText: 'The receiving party’s obligations of confidentiality under this Agreement shall survive indefinitely for all Disclosed Information, regardless of termination or expiration of discussions.',
        counterpartyText: 'Confidentiality obligations shall survive for a period of three (3) years from the date of disclosure, except for verified trade secrets.',
        riskLevel: 'high',
        riskScore: 68,
        riskCategory: 'Confidentiality',
        whyItMatters: 'Exposes your team to lifetime liability for routine business information that should naturally expire in 2–3 years.',
        plainEnglishTranslation: 'You are forbidden from ever speaking about or using any information shared during this meeting for the rest of your life.',
        recommendedCounterClause: 'The obligations of confidentiality shall expire three (3) years from disclosure, except for trade secrets protected under UTSA for as long as they remain secrets.',
        statutoryReference: 'Defend Trade Secrets Act (DTSA) 18 U.S.C. § 1836'
      },
      {
        id: 'cl-nda-2',
        section: 'Section 6.3',
        title: 'Overbroad Residuals Clause',
        originalText: 'Recipient may use any ideas, concepts, know-how, or techniques retained in the unaided memories of its personnel who have had access to Discloser’s Confidential Information.',
        counterpartyText: 'Residual clauses excluded; no license is granted by implication or memory retention.',
        riskLevel: 'medium',
        riskScore: 55,
        riskCategory: 'Intellectual Property',
        whyItMatters: 'Allows counterparty engineers to recreate your secret algorithms as long as they claim they remembered it without notes.',
        plainEnglishTranslation: 'Their engineers can legally copy your idea if they memorize it without writing it down.',
        recommendedCounterClause: 'Delete the residuals clause or specify that residual knowledge does not grant any patent, copyright, or trade secret license.',
        statutoryReference: 'Restatement (Third) of Unfair Competition § 39'
      }
    ]
  },
  {
    id: 'executive-employment',
    name: 'Executive Employment & IP Transfer Deed',
    category: 'Employment',
    badge: '🔴 High Risk (84/100)',
    overallRiskScore: 84,
    riskGrade: 'F',
    clausesCount: 14,
    criticalIssuesCount: 2,
    description: 'Aggressive employment agreement containing worldwide 2-year non-compete and off-hours personal IP assignment.',
    clauses: [
      {
        id: 'cl-emp-1',
        section: 'Section 8.1',
        title: 'Global 24-Month Non-Compete Restriction',
        originalText: 'For twenty-four (24) months following separation for any reason, Employee shall not directly or indirectly engage in, consult for, or invest in any business entity anywhere in the world that competes with Company.',
        counterpartyText: 'Non-compete deleted pursuant to statutory invalidity under FTC Non-Compete Rule and California Labor Code § 16600.',
        riskLevel: 'critical',
        riskScore: 98,
        riskCategory: 'Non-Compete',
        whyItMatters: 'Prohibits you from working anywhere in your industry globally for 2 full years after leaving, even if terminated without cause.',
        plainEnglishTranslation: 'If you leave this job, you cannot work in this entire industry anywhere in the world for 2 whole years.',
        recommendedCounterClause: 'Non-compete covenants are void and unenforceable under FTC 16 CFR Part 910 and California Labor Code § 16600; replace with reasonable 1-year non-solicitation of clients.',
        statutoryReference: 'FTC Non-Compete Final Rule / Cal. Lab. Code § 16600'
      },
      {
        id: 'cl-emp-2',
        section: 'Section 5.2',
        title: 'Off-Hours Personal Inventions Assignment',
        originalText: 'Employee assigns to Company all right, title, and interest in any invention, software, or patent conceived during the employment period, whether created during working hours, on personal equipment, or related to Company’s future anticipated business.',
        counterpartyText: 'Inventions created entirely on employee’s own time without using employer equipment or trade secrets remain sole property of employee.',
        riskLevel: 'critical',
        riskScore: 91,
        riskCategory: 'Intellectual Property',
        whyItMatters: 'Company claims legal ownership of weekend side projects and indie apps built on your personal laptop at home.',
        plainEnglishTranslation: 'Any code or app you write on your own laptop on weekends belongs to your boss.',
        recommendedCounterClause: 'Exclude inventions developed entirely on employee personal time without employer trade secrets or equipment, pursuant to statutory carve-outs.',
        statutoryReference: 'California Labor Code § 2870 / Washington RCW 49.44.140'
      }
    ]
  }
];
