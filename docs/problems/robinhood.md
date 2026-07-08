---
id: robinhood
title: Stock Trading Platform (Robinhood)
sidebar_label: Stock Trading Platform (Robinhood)
tags: [hard]
---

# Stock Trading Platform (Robinhood)

**Difficulty:** Hard

## What It Tests

Low-latency data delivery, order execution, financial system consistency.

## Topics Covered

- [Real-time Updates](/docs/topics/realtime-updates)
- [Distributed Transactions & Idempotency](/docs/topics/distributed-transactions)
- [Consistent Hashing](/docs/topics/consistent-hashing)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Caching](/docs/topics/caching)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/robinhood)

## Approach Hints

- Stream real-time market data via WebSocket (Kafka → WebSocket servers)
- Order placement with idempotency keys and exactly-once processing
- Account balance updates as atomic transactions (optimistic locking)
- Persist order book in PostgreSQL with strong consistency; use CQRS — separate read models (portfolio view) from write models (order processing)
