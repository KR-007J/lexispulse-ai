"""
LexisPulse AI: Enterprise Security & Threat Mitigation Module
Implements prompt injection filtering, payload bounding, and cryptographic hashing.
"""

import re
import hashlib
import time

MAX_DOCUMENT_BYTES = 5 * 1024 * 1024  # 5 MB Max
PROMPT_INJECTION_PATTERNS = [
    r"(?i)ignore\s+(all\s+)?(previous|prior)\s+instructions",
    r"(?i)system\s+prompt\s+override",
    r"(?i)<\s*system\s*>",
    r"(?i)\[\s*INST\s*\]",
    r"(?i)you\s+are\s+now\s+DAN",
    r"(?i)jailbreak",
    r"(?i)act\s+as\s+an\s+unrestricted\s+AI",
    r"(?i)disregard\s+all\s+safety\s+guidelines"
]

def sanitize_legal_input(text: str) -> str:
    """Sanitizes legal input text, stripping harmful escape tags and potential prompt injections."""
    if not text:
        return ""
    
    # 1. Truncate if exceeds bounds
    sanitized = text[:MAX_DOCUMENT_BYTES]

    # 2. Neutralize known prompt injection markers
    for pattern in PROMPT_INJECTION_PATTERNS:
        sanitized = re.sub(pattern, "[FILTERED_SECURITY_TOKEN]", sanitized)

    # 3. Clean null bytes and control chars
    sanitized = "".join(ch for ch in sanitized if ch.isprintable() or ch in "\n\r\t")

    return sanitized.strip()

def generate_attestation_hash(contract_name: str, payload_str: str) -> str:
    """Generates an immutable cryptographic SHA-256 attestation token."""
    entropy = f"LexisPulse:Enterprise:{contract_name}:{time.time()}:{payload_str}"
    return hashlib.sha256(entropy.encode('utf-8')).hexdigest()
