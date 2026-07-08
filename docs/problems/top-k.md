---
id: top-k
title: Top K System (YouTube Top K)
sidebar_label: Top K System
tags: [hard]
---

# Top K System (YouTube Top K)

**Difficulty:** Hard

## What It Tests

Approximate counting at massive scale, heavy hitters algorithm, two-stage aggregation architecture.

## Topics Covered

- [Distributed Counting / Top K](/docs/topics/distributed-counting)
- [Stream Processing](/docs/topics/stream-processing)
- [Consistent Hashing](/docs/topics/consistent-hashing)
- [Caching](/docs/topics/caching)
- [Redis Deep Dive](/docs/topics/redis)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/top-k)

## Approach Hints

- Two-stage architecture: local Count-Min Sketch per ingest shard counts events; merge local top-K lists into a global top-K every few seconds
- Store the global top-K in a Redis sorted set (ZREVRANGE) for O(log N) updates and O(k) reads
- Use a sliding window (last 1h, 24h, all-time) — each window requires a separate aggregation pipeline
- Approximate algorithms (Space-Saving) allow O(k) memory regardless of the total number of distinct items
