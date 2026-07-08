---
title: Rate Limiter
sidebar_label: Rate Limiter
tags: [lld, machine-coding]
---

# Rate Limiter

**Difficulty:** Problems | **Track:** LLD

## Problem statement

Design a thread-safe rate limiter whose primary API is `boolean allow(String userId)`. The limiter should be configurable with a request limit N and a time window T, support multiple interchangeable algorithms (token bucket, sliding window, fixed window), and work correctly when called concurrently from many threads. The design should make algorithm choice a run-time decision and keep the implementation testable without relying on wall-clock time.

## Requirements

**Functional:**
- `allow(userId)` returns `true` if the request is within the configured limit, `false` otherwise
- Configurable rate: N requests per T seconds, independently per user or API key
- Support at least two algorithms: Token Bucket and Sliding Window Log
- Thread-safe under concurrent access — no double-counts or missed decrements

**Out of scope:**
- Distributed rate limiting across multiple nodes (focus on single-process, in-memory)
- Persistent storage or Redis-backed counters

## Key classes

```java
// Strategy interface
interface RateLimiter {
    boolean allow(String userId);
}

// Configuration value object
class RateLimiterConfig {
    int maxRequests;        // N
    Duration windowSize;    // T
}

// Token Bucket — thread-safe implementation
class TokenBucketRateLimiter implements RateLimiter {
    private final RateLimiterConfig config;
    private final Clock clock;                      // injected for testability
    private final Map<String, TokenBucket> buckets = new ConcurrentHashMap<>();

    @Override
    public boolean allow(String userId) {
        TokenBucket bucket = buckets.computeIfAbsent(userId, id -> new TokenBucket(config, clock));
        return bucket.tryConsume();
    }
}

class TokenBucket {
    private final RateLimiterConfig config;
    private final Clock clock;
    private double tokens;
    private long lastRefillTime;
    private final ReentrantLock lock = new ReentrantLock();

    boolean tryConsume() {
        lock.lock();
        try {
            refill();
            if (tokens >= 1) { tokens--; return true; }
            return false;
        } finally { lock.unlock(); }
    }

    private void refill() {
        long now = clock.millis();
        double elapsed = (now - lastRefillTime) / 1000.0;
        tokens = Math.min(config.maxRequests,
                          tokens + elapsed * config.maxRequests / config.windowSize.toSeconds());
        lastRefillTime = now;
    }
}

// Fixed Window
class FixedWindowRateLimiter implements RateLimiter {
    private final RateLimiterConfig config;
    private final Clock clock;
    private final Map<String, AtomicLong> counters   = new ConcurrentHashMap<>();
    private final Map<String, AtomicLong> windowStart = new ConcurrentHashMap<>();

    @Override
    public boolean allow(String userId) { /* reset counter if window expired */ return false; }
}

// Sliding Window Log
class SlidingWindowRateLimiter implements RateLimiter {
    // stores per-user deque of request timestamps; prunes entries older than T
    @Override
    public boolean allow(String userId) { /* prune + size check */ return false; }
}

// Factory / registry
class RateLimiterFactory {
    static RateLimiter create(String algorithm, RateLimiterConfig config, Clock clock) {
        return switch (algorithm) {
            case "token_bucket"    -> new TokenBucketRateLimiter(config, clock);
            case "fixed_window"    -> new FixedWindowRateLimiter(config, clock);
            case "sliding_window"  -> new SlidingWindowRateLimiter(config, clock);
            default -> throw new IllegalArgumentException("Unknown algorithm: " + algorithm);
        };
    }
}
```

## Patterns used

- **Strategy**: `RateLimiter` is an interface; the algorithm is selected at construction time and the call site (`allow(userId)`) never knows which one is running — swapping algorithms requires no code change at the call site
- **Template Method**: a base class `AbstractRateLimiter` can implement the per-user bucket lookup and delegate to `isAllowed(bucket)`, so subclasses only implement the core acceptance logic without repeating the map lookup
- **Dependency Injection**: `Clock` is injected rather than calling `System.currentTimeMillis()` directly — tests pass a `FakeClock` that advances on demand, making time-dependent assertions fully deterministic

## Key design decisions

- **`AtomicLong` for counters where possible**: `FixedWindowRateLimiter` uses `AtomicLong.incrementAndGet()` for the happy path, avoiding lock acquisition entirely — `ReentrantLock` is only needed in `TokenBucket` because the read-modify-write on two fields (`tokens` + `lastRefillTime`) must be atomic together
- **`ConcurrentHashMap.computeIfAbsent()` for per-user buckets**: avoids a race where two threads simultaneously find no bucket and both try to create one — `computeIfAbsent` guarantees exactly one bucket per user
- **Inject `Clock`, not `System.currentTimeMillis()`**: calling system time directly makes tests non-deterministic and slow (you'd have to actually sleep to advance the window); a `Clock` interface with a real impl and a fake impl solves this cleanly
- **`TokenBucket` per user, not a shared global bucket**: a single shared bucket would conflate all users; per-user buckets stored in a `ConcurrentHashMap` give independent rate windows at the cost of O(users) memory — acceptable for in-memory scope

## What the interviewer is looking for

- Immediately spotting that thread-safety is the central challenge, not just the algorithmic logic
- Choosing `ReentrantLock` vs `AtomicLong` consciously and explaining the trade-off
- Proposing `Clock` injection unprompted (or when asked "how would you test this?")
- Understanding the trade-offs between algorithms: Token Bucket smooths bursts, Sliding Window is most accurate but memory-heavy, Fixed Window is cheapest but allows boundary bursts

## Resources

- [Hello Interview: OOD](https://www.hellointerview.com/learn/code/object-oriented-design/introduction)
- [Grokking OOD](https://github.com/tssovi/grokking-the-object-oriented-design-interview)
