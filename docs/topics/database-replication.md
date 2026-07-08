---
id: database-replication
title: Database Replication
sidebar_label: Database Replication
tags: [medium]
---

# Database Replication

**Difficulty:** Medium | **Topic #11**

## What to Learn

Leader-follower (master-slave) replication, read replicas for scaling reads, synchronous vs asynchronous replication, replication lag and eventual consistency implications, failover.

## Resources

- [Hello Interview: Scaling Reads ↗](https://www.hellointerview.com/learn/system-design/patterns/scaling-reads)
- [ByteByteGo: Database Replication Explained ↗](https://www.youtube.com/watch?v=WG6b74VSOOU)
- [Hussein Nasser: Database Replication Crash Course ↗](https://www.youtube.com/watch?v=9aFu7APZQmY)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Social News Feed (FB News Feed) | Medium | [→](/docs/problems/fb-news-feed) |
| Distributed Cache | Medium | [→](/docs/problems/distributed-cache) |
| Messaging App (WhatsApp) | Medium | [→](/docs/problems/whatsapp) |
| Payment System | Hard | [→](/docs/problems/payment-system) |

## Key Concepts to Master

- Synchronous vs asynchronous replication tradeoffs
- Replication lag and read-your-writes consistency
- Multi-leader replication and write conflicts
- Semi-synchronous as a middle ground
- Automated failover with leader election
