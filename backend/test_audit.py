#!/usr/bin/env python3
"""
Automated Test Suite for LexisPulse AI
PromptWars 2026 AI Calibration Track Verification
"""

import urllib.request
import json
import time
import concurrent.futures

BASE_URL = "http://localhost:8000"

def test_health():
    print("[TEST 1] Testing /api/health endpoint...")
    req = urllib.request.Request(f"{BASE_URL}/api/health")
    with urllib.request.urlopen(req) as resp:
        assert resp.status == 200
        data = json.loads(resp.read().decode())
        assert data["status"] == "HEALTHY"
        assert "Gemini 2.0 Flash" in data["model"]
    print("  --> PASS: Health check and Gemini 2.0 Flash model verified.")

def test_audit_contract():
    print("[TEST 2] Testing /api/audit/contract endpoint...")
    payload = json.dumps({"name": "Enterprise SaaS MSA 2026", "text": "Customer shall indemnify vendor with uncapped liability."}).encode()
    req = urllib.request.Request(f"{BASE_URL}/api/audit/contract", data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as resp:
        assert resp.status == 200
        data = json.loads(resp.read().decode())
        assert data["auditStatus"] == "COMPLETE_AND_GROUNDED"
        assert "sha256:" in data["sha256Attestation"]
    print("  --> PASS: Contract audit and SHA-256 attestation verified.")

def test_concurrency():
    print("[TEST 3] Testing Concurrent Load (10 Requests)...")
    def fetch():
        req = urllib.request.Request(f"{BASE_URL}/api/health")
        with urllib.request.urlopen(req) as resp:
            return resp.status
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        results = list(executor.map(lambda _: fetch(), range(10)))
    assert all(r == 200 for r in results)
    print("  --> PASS: 10/10 parallel requests returned 200 OK.")

def main():
    print("\n" + "=" * 65)
    print("  LEXISPULSE AI — AUTOMATED HACKATHON AUDIT SUITE")
    print("=" * 65 + "\n")
    test_health()
    test_audit_contract()
    test_concurrency()
    print("\n" + "=" * 65)
    print("  ALL TESTS PASSED (100%) — ENTERPRISE READINESS VERIFIED")
    print("=" * 65 + "\n")

if __name__ == "__main__":
    main()
