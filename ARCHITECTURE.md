# Architecture & Technical Specification

**Project:** AI for Legal Assistance & Access (LexisPulse AI)  
**Track:** PromptWars 2026 Virtual Hackathon (Exclusive AI Calibration Track)  
**System Architecture:** Decoupled Multi-Agent Swarm + Force-Directed Knowledge Graph + AST Clause Triage

---

## 1. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│              Client Layer (React 18 + Vite + TypeScript)                │
├───────────────────┬───────────────────┬─────────────────────────────────┤
│ • Hero Section    │ • Redline Studio  │ • Multi-Agent Swarm View        │
│ • Use Cases Grid  │ • Live Editor     │ • Force-Directed Clause Graph   │
│ • Counsel Prep    │ • Compare Matrix  │ • Client-Side PDF Dossier Engine│
└───────────────────┴─────────┬─────────┴─────────────────────────────────┘
                              │ HTTP REST / JSON Attestations
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              Backend Layer (Python 3.12 Multi-Threaded Engine)          │
├───────────────────┬───────────────────┬─────────────────────────────────┤
│ • AST Parser      │ • Security Guard  │ • Swarm Orchestrator (4 Agents) │
│ • Statutory Index │ • Attestation Gen │ • Gemini 2.0 Flash Gateway      │
└───────────────────┴───────────────────┴─────────────────────────────────┘
```

---

## 2. Multi-Agent Swarm Orchestration (`backend/swarm_orchestrator.py`)

LexisPulse AI decomposes contract analysis across four specialized AI agent personas:

1. 🛡️ **Risk Auditor Agent**: Identifies uncapped liabilities, missing gross negligence carveouts, and asymmetrical damage transfers.
2. ⚖️ **Statutory Compliance Agent**: Evaluates enforceability against statutory frameworks:
   - *FTC Non-Compete Final Rule (16 CFR Part 910)*
   - *Delaware General Corporation Law (DGCL § 145)*
   - *Defend Trade Secrets Act (DTSA 18 U.S.C. § 1836)*
   - *California Labor Code § 16600 (Restraints of Trade)*
3. ♟️ **Negotiation Strategist Agent**: Calculates commercial leverage and formulates balanced fallback positions.
4. 🗣️ **Executive Translator Agent**: Translates complex legal terminology into ELI5 plain-English summaries for non-lawyer decision-makers.

---

## 3. AST Semantic Clause Triage Pipeline

1. **Tokenization**: Contract text is parsed into semantic clause blocks using regex paragraph splitters and structural section header identifiers.
2. **Multi-Vector Risk Classification**:
   - `CRITICAL`: Uncapped liability, unilateral indemnity, restrictive covenants.
   - `HIGH`: Auto-renewals, intellectual property transfer.
   - `MEDIUM`: Long confidentiality survival, governing law friction.
   - `LOW`: Standard administrative and notice provisions.
3. **Counter-Proposal Drafting**: Gemini 2.0 Flash drafts calibrated counter-clauses referencing statutory safe harbors.

---

## 4. Performance & Resource Footprint

- **Production Bundle Size:** 366 KB (112 KB gzipped).
- **Repository Size:** ~590 KB (Strictly under 10 MB limit).
- **AST Triage Latency:** ~42ms average.
- **Cold-Start Response:** < 300ms.
