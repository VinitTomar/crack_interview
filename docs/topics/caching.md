---
id: caching
title: Caching
sidebar_label: Caching
tags: [easy]
---

# Caching

**Difficulty:** Easy | **Topic #3**

## What to Learn

Cache-aside pattern with Redis/Memcached, write-through vs write-back, eviction policies (LRU, LFU, TTL), cache invalidation strategies, cache stampede prevention, CDN caching for static assets.

## Resources

- [Hello Interview: Caching ↗](https://www.hellointerview.com/learn/system-design/core-concepts/caching)
- [ByteByteGo: Cache Systems Every Developer Should Know ↗](https://www.youtube.com/watch?v=dGAgxozNWFE)
- [ByteByteGo: Caching Pitfalls Every Developer Should Know ↗](https://www.youtube.com/watch?v=wh98s0XhMmQ)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| URL Shortener/Bitly | Easy | [→](/docs/problems/bitly) |
| Distributed Cache | Medium | [→](/docs/problems/distributed-cache) |
| FB News Feed | Medium | [→](/docs/problems/fb-news-feed) |
| YouTube | Medium | [→](/docs/problems/youtube) |
| Top K | Hard | [→](/docs/problems/top-k) |

## Key Concepts to Master

- Cache-aside vs read-through vs write-through vs write-behind
- LRU vs LFU eviction algorithms
- Cache stampede and probabilistic early expiry fix
- Multi-layer caching (L1 in-process, L2 Redis, L3 CDN)
- Cache warm-up strategies
