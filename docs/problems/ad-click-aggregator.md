---
id: ad-click-aggregator
title: Ad Click Aggregator
sidebar_label: Ad Click Aggregator
tags: [hard]
---

# Ad Click Aggregator

**Difficulty:** Hard

## What It Tests

High-throughput event ingestion, windowed aggregation, deduplication, billing accuracy.

## Topics Covered

- [Stream Processing](/docs/topics/stream-processing)
- [Distributed Counting / Top K](/docs/topics/distributed-counting)
- [Big Data Architectures](/docs/topics/big-data-architecture)
- [Message Queues & Async Processing](/docs/topics/message-queues)
- [ZooKeeper / Distributed Coordination](/docs/topics/zookeeper)
- [Scaling Fundamentals](/docs/topics/scaling-fundamentals)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/ad-click-aggregator)

## Approach Hints

- Ingest click events to Kafka partitioned by ad_id so all clicks for the same ad land on the same partition (ordered processing)
- Flink consumes and aggregates in 1-minute tumbling windows; deduplicate within each window using a bloom filter per ad
- Write windowed aggregates to a time-series DB; serve real-time dashboards from the stream layer and billing reports from the batch layer (Lambda architecture)
- Nightly batch reconciliation job reprocesses raw events from Kafka for billing-accurate totals, correcting any approximation from the stream layer

## Video Walkthroughs

- [Gaurav Sen: Design an Ad Click Aggregator →](https://www.youtube.com/watch?v=6TroztUV3f8)
- [System Design: Design Ad Click Event Aggregation →](https://www.youtube.com/watch?v=P82HuMr8kso)
