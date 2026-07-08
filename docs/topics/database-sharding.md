---
id: database-sharding
title: Database Sharding
sidebar_label: Database Sharding
tags: [medium]
---

# Database Sharding

**Difficulty:** Medium | **Topic #10**

## What to Learn

Horizontal partitioning strategies — hash-based vs range-based sharding, choosing a shard key, avoiding hot spots, cross-shard queries and joins, resharding challenges.

## Resources

- [Hello Interview: Sharding ↗](https://www.hellointerview.com/learn/system-design/core-concepts/sharding)
- [ByteByteGo: Database Sharding and Partitioning ↗](https://www.youtube.com/watch?v=be6PLMKKSto)
- [Gaurav Sen: What is Database Sharding? ↗](https://www.youtube.com/watch?v=5faMjKuB9bc)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Photo Sharing (Instagram) | Medium | [→](/docs/problems/instagram) |
| Live Comments (FB Live) | Medium | [→](/docs/problems/fb-live-comments) |
| Video Streaming (YouTube) | Medium | [→](/docs/problems/youtube) |
| Web Crawler | Hard | [→](/docs/problems/web-crawler) |

## Key Concepts to Master

- Hash vs range sharding and their query patterns
- Hot shard problem and how to detect and fix it
- Directory-based sharding for flexible routing
- Cross-shard queries (scatter-gather pattern)
- Online resharding with minimal downtime
