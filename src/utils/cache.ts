/**
 * LexisPulse AI: Client-Side LRU Cache with Time-To-Live (TTL)
 * Optimizes performance by memoizing repetitive contract clause audits,
 * eliminating redundant API calls and rendering in sub-millisecond response times.
 */

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

export class MemoryCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private maxEntries: number;
  private ttlMs: number;

  constructor(maxEntries = 100, ttlMinutes = 60) {
    this.maxEntries = maxEntries;
    this.ttlMs = ttlMinutes * 60 * 1000;
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.cache.delete(key);
      return null;
    }

    // Refresh LRU order
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key: string, value: T): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxEntries) {
      // Evict oldest entry
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, { value, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

export interface AuditCacheItem {
  name?: string;
  triageLatencyMs?: number;
  sha256Attestation?: string;
  overallRiskScore?: number;
  riskGrade?: string;
  criticalIssuesCount?: number;
  clausesCount?: number;
  clauses?: unknown[];
  [key: string]: unknown;
}

export interface QACacheItem {
  answer: string;
  verifiedCitation?: string;
  statutoryAnchor?: string;
  [key: string]: unknown;
}

export const auditCache = new MemoryCache<AuditCacheItem>(50, 60);
export const qaCache = new MemoryCache<QACacheItem>(100, 60);
