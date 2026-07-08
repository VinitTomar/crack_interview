---
id: distributed-cache
title: Distributed Cache
sidebar_label: Distributed Cache
tags: [medium]
---

# Distributed Cache

**Difficulty:** Medium

## What It Tests

Distributed systems fundamentals — consistent hashing, replication, eviction.

## Topics Covered

- [Consistent Hashing](/docs/topics/consistent-hashing)
- [Caching](/docs/topics/caching)
- [Database Replication](/docs/topics/database-replication)
- [Distributed Locking](/docs/topics/distributed-locking)
- [CAP Theorem & Consistency Models](/docs/topics/cap-theorem)
- [Redis Deep Dive](/docs/topics/redis)
- [ZooKeeper / Distributed Coordination](/docs/topics/zookeeper)
- [Key-Value Stores at Scale (DynamoDB)](/docs/topics/dynamodb)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/distributed-cache)

## Approach Hints

- Use consistent hashing to distribute keys across nodes with virtual nodes
- Replicate each key to N nodes for fault tolerance
- Implement LRU eviction per node with a max memory limit
- Leader election (via ZooKeeper) for cache partition ownership; write-through vs write-around caching policies
