---
id: stream-processing
title: Stream Processing
sidebar_label: Stream Processing
tags: [hard]
---

# Stream Processing

**Difficulty:** Hard | **Topic #25**

## What to Learn

Kafka as an event log, Flink/Kinesis for stateful stream processing, windowed aggregations (tumbling, sliding, session windows), exactly-once semantics, watermarks for out-of-order events.

## Resources

- [Hello Interview: Flink Deep Dive ↗](https://www.hellointerview.com/learn/system-design/deep-dives/flink)
- [ByteByteGo: Why is Kafka Fast? ↗](https://www.youtube.com/watch?v=UNUz1-msbOM)
- [System Design: Kafka, Flink, Spark, Exactly-Once Semantics ↗](https://www.youtube.com/watch?v=Sr-yxcpWVKI)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Live Comments (FB Live) | Medium | [→](/docs/problems/fb-live-comments) |
| Ad Click Aggregator | Hard | [→](/docs/problems/ad-click-aggregator) |
| Metrics Monitoring System | Hard | [→](/docs/problems/metrics-monitoring) |
| Search Engine / FB Post Search | Hard | [→](/docs/problems/fb-post-search) |

## Key Concepts to Master

- Tumbling vs sliding vs session windows and their memory implications
- Watermarks for handling late-arriving events
- Exactly-once processing via checkpointing in Flink
- Stateful operators and RocksDB state backend
- Kafka as the input source and the at-least-once vs exactly-once contract
