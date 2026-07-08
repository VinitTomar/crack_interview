---
id: distributed-counting
title: Distributed Counting / Top K
sidebar_label: Distributed Counting / Top K
tags: [hard]
---

# Distributed Counting / Top K

**Difficulty:** Hard | **Topic #26**

## What to Learn

Count-Min Sketch for approximate counting, lossy counting, Space-Saving algorithm, two-stage MapReduce approach for heavy hitters; tradeoffs between exactness and memory/throughput.

## Resources

- [Hello Interview Data Structures for Big Data ↗](https://www.hellointerview.com/learn/system-design/deep-dives/data-structures-for-big-data)
- [Gaurav Sen Playlist ↗](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Top K System | Hard | [→](/docs/problems/top-k) |
| Ad Click Aggregator | Hard | [→](/docs/problems/ad-click-aggregator) |
| Metrics Monitoring System | Hard | [→](/docs/problems/metrics-monitoring) |

## Key Concepts to Master

- Count-Min Sketch — hash table array with minimum estimation
- Space-Saving algorithm for exact top-K with bounded memory
- Two-stage approach: local top-K per shard → global merge
- Bloom filters for membership testing without false negatives issue
- HyperLogLog for approximate cardinality (unique user counts)
