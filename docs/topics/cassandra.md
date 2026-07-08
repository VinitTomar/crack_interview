---
id: cassandra
title: Wide-Column Stores (Cassandra)
sidebar_label: Wide-Column Stores (Cassandra)
tags: [medium]
---

# Wide-Column Stores (Cassandra)

**Difficulty:** Medium | **Topic #20**

## What to Learn

Partition key selection for even distribution, clustering keys for ordering, tunable consistency (ONE, QUORUM, ALL), compaction strategies, modeling around access patterns (no joins).

## Resources

- [Hello Interview: Cassandra Deep Dive ↗](https://www.hellointerview.com/learn/system-design/deep-dives/cassandra)
- [ByteByteGo: Wide Column NoSQL Database Deep Dive ↗](https://www.youtube.com/watch?v=1n2YYyuLO4g)
- [Gaurav Sen: What is Cassandra? ↗](https://www.youtube.com/watch?v=y9wgnS-5Qxg)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Messaging App (WhatsApp) | Medium | [→](/docs/problems/whatsapp) |
| Activity Tracker (Strava) | Medium | [→](/docs/problems/strava) |
| Live Comments (FB Live) | Medium | [→](/docs/problems/fb-live-comments) |

## Key Concepts to Master

- Partition key drives data distribution — bad choices cause hot nodes
- Clustering key sorts rows within a partition for range scans
- QUORUM consistency for read-your-writes guarantee across replicas
- Compaction strategies (SizeTiered for writes, Leveled for reads)
- Data modeling around query patterns — no secondary indexes by default
