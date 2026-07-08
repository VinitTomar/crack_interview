---
id: fb-live-comments
title: Live Comments (FB Live)
sidebar_label: Live Comments (FB Live)
tags: [medium]
---

# Live Comments (FB Live)

**Difficulty:** Medium

## What It Tests

High-throughput real-time fan-out, comment ordering, scaling WebSocket connections.

## Topics Covered

- [Real-time Updates](/docs/topics/realtime-updates)
- [Message Queues & Async Processing](/docs/topics/message-queues)
- [Database Sharding](/docs/topics/database-sharding)
- [Consistent Hashing](/docs/topics/consistent-hashing)
- [Wide-Column Stores (Cassandra)](/docs/topics/cassandra)
- [Stream Processing](/docs/topics/stream-processing)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/fb-live-comments)

## Approach Hints

- Publish comments to Kafka (partitioned by stream_id)
- WebSocket servers subscribe to stream partitions via Kafka consumer groups
- Persist comments to Cassandra (partition by stream_id, cluster by timestamp)
- Use consistent hashing to assign streams to WebSocket server groups; rate-limit comments per user to prevent spam
