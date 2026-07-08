---
id: big-data-architecture
title: Big Data Architectures
sidebar_label: Big Data Architectures
tags: [hard]
---

# Big Data Architectures

**Difficulty:** Hard | **Topic #32**

## What to Learn

Lambda architecture (batch layer + speed layer + serving layer), Kappa architecture (stream-only), batch processing with Spark/Hadoop, data lake vs data warehouse, compaction and partitioning for query efficiency.

## Resources

- [Hello Interview Flink Deep Dive ↗](https://www.hellointerview.com/learn/system-design/deep-dives/flink)
- [Gaurav Sen Playlist ↗](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Ad Click Aggregator | Hard | [→](/docs/problems/ad-click-aggregator) |
| Metrics Monitoring System | Hard | [→](/docs/problems/metrics-monitoring) |
| Search Engine / FB Post Search | Hard | [→](/docs/problems/fb-post-search) |

## Key Concepts to Master

- Lambda: batch layer for accuracy, speed layer for low latency, serving layer merges both — operationally complex
- Kappa: stream-only, reprocess from Kafka for corrections — simpler but requires replayable source
- Data lake (raw, schema-on-read) vs data warehouse (curated, schema-on-write)
- Parquet/ORC columnar formats for scan efficiency
- Partitioning by time + entity for partition pruning
