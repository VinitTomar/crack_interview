---
id: redis
title: Redis Deep Dive
sidebar_label: Redis Deep Dive
tags: [medium]
---

# Redis Deep Dive

**Difficulty:** Medium | **Topic #18**

## What to Learn

Data structures (strings, hashes, sorted sets, lists, sets, bitmaps, HyperLogLog), TTL-based expiry, pub-sub, Lua scripts for atomicity, persistence (RDB vs AOF), Redis Cluster vs Sentinel.

## Resources

- [Hello Interview: Redis Deep Dive ↗](https://www.hellointerview.com/learn/system-design/deep-dives/redis)
- [ByteByteGo: Why is Single-Threaded Redis So Fast? ↗](https://www.youtube.com/watch?v=5TRFpFBccQM)
- [Hussein Nasser: Redis Pub-Sub vs Kafka ↗](https://www.youtube.com/watch?v=73Utd7nDYDs)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Rate Limiter | Medium | [→](/docs/problems/rate-limiter) |
| Distributed Cache | Medium | [→](/docs/problems/distributed-cache) |
| Social News Feed (FB News Feed) | Medium | [→](/docs/problems/fb-news-feed) |
| Top K System | Hard | [→](/docs/problems/top-k) |

## Key Concepts to Master

- Sorted sets for leaderboards and time-series data
- HyperLogLog for approximate unique counts at low memory
- Pub-sub for real-time messaging (and its fire-and-forget limitation)
- RDB snapshots vs AOF logging for durability
- Redis Cluster hash slots and why keys with the same slot must use hash tags
