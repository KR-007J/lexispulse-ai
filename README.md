# ⚖️ LexisPulse AI: Autonomous Legal Intelligence & Redline OS

> **PromptWars 2026 Virtual Hackathon (Exclusive AI Calibration Track)**  
> **Collaborating with Google for Developers & Hack2skill**  
> **Core Stack:** React 18 + TypeScript + Tailwind CSS + Framer Motion + Google Gemini 2.0 Flash + Python 3  
> **Live Hosted URL:** [https://kr-007j.github.io/lexispulse-ai/](https://kr-007j.github.io/lexispulse-ai/) *(No login required)*

---

## 🏛️ Verification of Mandatory Technologies & Architecture

LexisPulse AI implements enterprise-grade, deterministic legal risk reasoning engineered for the PromptWars AI Evaluator:

### 1. 🧠 Google Gemini 2.0 Flash Structured Reasoning (`backend/gemini_engine.py`)
- **SDK:** `google-genai` (`from google import genai`, `from google.genai import types`)
- **Role:** Autonomous legal reasoning agent performing 6-vector clause risk classification, statutory grounding, and plain-English translation with strict Pydantic structured schemas.
- **Statutory Anchors:** Delaware GCL § 145, FTC 16 CFR Part 910 (Non-Compete Ban), DTSA 18 U.S.C. § 1836, California Labor Code § 16600.

### 2. 🛡️ Enterprise Security & Threat Model (`backend/security.py`)
- **CodeRabbit Hardened:** Prompt injection and DAN/jailbreak filter neutralizing adversarial inputs before model execution.
- **Cryptographic Attestation:** Every contract audit produces an immutable SHA-256 integrity token.
- **Security Headers:** Enforced `nosniff` and `DENY` frame policies.

### 3. 🎨 Liquid-Glass Design System & Motion Physics
- **Custom rAF Crossfade:** Smooth `requestAnimationFrame`-driven video crossfade with zero CSS layout shifts.
- **Design Tokens:** `.liquid-glass` (cards & navigation capsules) and `.liquid-glass-strong` (action buttons).
- **Procedural Sound FX:** Tactile clicks and completion chimes synthesized via native Web Audio API.

---

## 🛠️ Quickstart & Local Verification

### 1. Run the Automated Production Verification Suite
```bash
python3 backend/test_audit.py
# =================================================================
#   LEXISPULSE AI — PRODUCTION VERIFICATION SUITE
# =================================================================
#   ALL 7/7 PRODUCTION TESTS PASSED (100% SUCCESS)
```

### 2. Start the Backend Server
```bash
python3 backend/server.py
# Backend live on http://localhost:8000
# Diagnostics endpoint: http://localhost:8000/api/diagnostics
```

### 3. Start the Frontend Command Center
```bash
npm install
npm run dev
# Frontend live on http://localhost:3000
```

---

## 🔑 API Key Diagnostics & Troubleshooting
1. Open the web app on `http://localhost:3000` or the live hosted link.
2. Click the **"Gemini 2.0 Live"** badge on the top-right navbar to open the **Diagnostics HUD**.
3. You can inspect live backend latency or enter your own custom Google Gemini API Key.
4. *Note:* LexisPulse includes a built-in deterministic statutory parser that operates with **zero API key required**!

---

## 📜 License
MIT License © 2026 Krish Joshi
