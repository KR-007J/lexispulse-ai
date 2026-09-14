import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryCache, auditCache, qaCache } from '../utils/cache';
import { soundFX, playHapticClick, playSuccessChime } from '../utils/audio';

describe('MemoryCache (LRU & TTL Cache)', () => {
  let cache: MemoryCache<string>;

  beforeEach(() => {
    cache = new MemoryCache<string>(3, 1); // max 3 entries, 1 min TTL
  });

  it('stores and retrieves cached entries', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
    expect(cache.size()).toBe(1);
  });

  it('returns null for non-existent keys', () => {
    expect(cache.get('nonexistent')).toBeNull();
  });

  it('evicts oldest entry when maxEntries is exceeded', () => {
    cache.set('k1', 'v1');
    cache.set('k2', 'v2');
    cache.set('k3', 'v3');
    expect(cache.size()).toBe(3);

    // Adding 4th entry evicts oldest (k1)
    cache.set('k4', 'v4');
    expect(cache.size()).toBe(3);
    expect(cache.get('k1')).toBeNull();
    expect(cache.get('k2')).toBe('v2');
    expect(cache.get('k3')).toBe('v3');
    expect(cache.get('k4')).toBe('v4');
  });

  it('refreshes LRU order upon access', () => {
    cache.set('k1', 'v1');
    cache.set('k2', 'v2');
    cache.set('k3', 'v3');

    // Access k1 so it becomes most recently used
    expect(cache.get('k1')).toBe('v1');

    // Adding 4th entry should now evict k2 (oldest) instead of k1
    cache.set('k4', 'v4');
    expect(cache.get('k2')).toBeNull();
    expect(cache.get('k1')).toBe('v1');
    expect(cache.get('k4')).toBe('v4');
  });

  it('updates existing key without increasing size', () => {
    cache.set('k1', 'initial');
    cache.set('k1', 'updated');
    expect(cache.size()).toBe(1);
    expect(cache.get('k1')).toBe('updated');
  });

  it('expires entries after TTL', () => {
    const shortTtlCache = new MemoryCache<string>(5, 0.0001); // ~6ms TTL
    shortTtlCache.set('k1', 'v1');
    expect(shortTtlCache.get('k1')).toBe('v1');

    // Mock Date.now() forward by 10000ms
    const originalDateNow = Date.now;
    try {
      Date.now = () => originalDateNow() + 10000;
      expect(shortTtlCache.get('k1')).toBeNull();
    } finally {
      Date.now = originalDateNow;
    }
  });

  it('clears all entries', () => {
    cache.set('k1', 'v1');
    cache.set('k2', 'v2');
    expect(cache.size()).toBe(2);
    cache.clear();
    expect(cache.size()).toBe(0);
    expect(cache.get('k1')).toBeNull();
  });

  it('exports valid global singletons auditCache and qaCache', () => {
    expect(auditCache).toBeDefined();
    expect(qaCache).toBeDefined();
    expect(typeof auditCache.get).toBe('function');
    expect(typeof qaCache.get).toBe('function');
  });
});

describe('SoundFX & Tactile Audio Engine', () => {
  it('supports muting sound effects', () => {
    soundFX.enabled = false;
    expect(() => soundFX.playClick()).not.toThrow();
    expect(() => soundFX.playSuccess()).not.toThrow();
    soundFX.enabled = true;
  });

  it('invokes convenience helper functions safely', () => {
    expect(() => playHapticClick()).not.toThrow();
    expect(() => playSuccessChime()).not.toThrow();
  });
});
