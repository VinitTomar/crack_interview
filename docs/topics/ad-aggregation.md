---
id: ad-aggregation
title: Ad Aggregation Pipelines
sidebar_label: Ad Aggregation Pipelines
tags: [hard]
---

# Ad Aggregation Pipelines

**Difficulty:** Hard | **Topic #34**

## What to Learn

High-throughput event ingestion, server-side click deduplication, windowed counting (hourly/daily rollups), fraud signal injection, lambda architecture for real-time + batch accuracy.

## Resources

- [Hello Interview Ad Click Aggregator Breakdown ↗](https://www.hellointerview.com/learn/system-design/problem-breakdowns/ad-click-aggregator)
- [Gaurav Sen Playlist ↗](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Price Tracking Service | Medium | [→](/docs/problems/price-tracking) |
| Ad Click Aggregator | Hard | [→](/docs/problems/ad-click-aggregator) |

## Key Concepts to Master

- High-throughput ingestion via Kafka with partitioning by ad_id
- Server-side deduplication using a seen-set (Redis bitmap or bloom filter)
- Windowed aggregation (5-min, hourly, daily) with Flink
- Late data handling with watermarks and allowed lateness
- Batch reconciliation layer for billing accuracy correction
