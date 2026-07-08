---
id: distributed-transactions
title: Distributed Transactions & Idempotency
sidebar_label: Distributed Transactions & Idempotency
tags: [hard]
---

# Distributed Transactions & Idempotency

**Difficulty:** Hard | **Topic #30**

## What to Learn

Two-phase commit (2PC) and its limitations, Saga pattern (choreography vs orchestration), idempotency keys for safe retries, compensating transactions for rollback, outbox pattern for reliable event publishing.

## Resources

- [Hello Interview: Multi-step Processes ↗](https://www.hellointerview.com/learn/system-design/patterns/multi-step-processes)
- [ByteByteGo: Distributed Transactions — 2 Phase Commit vs Saga Pattern ↗](https://www.youtube.com/watch?v=DOFflggE_0Q)
- [Arpit Bhayani: Two-Phase Commit in Distributed Transactions ↗](https://www.youtube.com/watch?v=oMhESvU87jM)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Online Auction | Medium | [→](/docs/problems/online-auction) |
| Payment System | Hard | [→](/docs/problems/payment-system) |
| Stock Trading Platform (Robinhood) | Hard | [→](/docs/problems/robinhood) |

## Key Concepts to Master

- 2PC coordinator failure and the blocking problem
- Saga pattern — break a distributed transaction into local transactions with compensating actions
- Choreography (event-driven) vs orchestration (central coordinator) Sagas
- Idempotency key stored with the transaction to make retries safe
- Transactional outbox pattern to atomically write to DB and publish an event
