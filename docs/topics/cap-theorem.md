---
id: cap-theorem
title: CAP Theorem & Consistency Models
sidebar_label: CAP Theorem & Consistency Models
tags: [medium]
---

# CAP Theorem & Consistency Models

**Difficulty:** Medium | **Topic #13**

## What to Learn

CAP theorem tradeoffs (Consistency, Availability, Partition Tolerance), strong consistency vs eventual consistency, read-your-writes, monotonic reads, linearizability, when to choose AP vs CP systems.

## Resources

- [Hello Interview: CAP Theorem ↗](https://www.hellointerview.com/learn/system-design/core-concepts/cap-theorem)
- [Gaurav Sen: Data Consistency and Tradeoffs ↗](https://www.youtube.com/watch?v=m4q7VkgDWrM)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Distributed Cache | Medium | [→](/docs/problems/distributed-cache) |
| Ticketing System (Ticketmaster) | Medium | [→](/docs/problems/ticketmaster) |
| Online Auction | Medium | [→](/docs/problems/online-auction) |
| Payment System | Hard | [→](/docs/problems/payment-system) |
| Real-time Doc Collaboration (Google Docs) | Hard | [→](/docs/problems/google-docs) |

## Key Concepts to Master

- Why partition tolerance is mandatory in distributed systems
- CP vs AP design choices and examples (HBase vs Cassandra)
- Eventual consistency models (read-your-writes, monotonic reads, causal consistency)
- Linearizability vs serializability
- PACELC theorem as a more nuanced view
