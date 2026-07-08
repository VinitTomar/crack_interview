---
id: online-auction
title: Online Auction
sidebar_label: Online Auction
tags: [medium]
---

# Online Auction

**Difficulty:** Medium

## What It Tests

Real-time bidding, concurrency control, fairness, consistency.

## Topics Covered

- [Distributed Locking](/docs/topics/distributed-locking)
- [Real-time Updates](/docs/topics/realtime-updates)
- [CAP Theorem & Consistency Models](/docs/topics/cap-theorem)
- [Distributed Transactions & Idempotency](/docs/topics/distributed-transactions)
- [Message Queues & Async Processing](/docs/topics/message-queues)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/online-auction)

## Approach Hints

- Use optimistic locking on the current bid price (compare-and-swap)
- Broadcast new bids via WebSocket to all auction watchers
- Store bid history in an append-only event log
- Finalize auction close with a distributed lock to prevent last-second race conditions
