---
id: payment-system
title: Payment System
sidebar_label: Payment System
tags: [hard]
---

# Payment System

**Difficulty:** Hard

## What It Tests

Financial consistency, idempotency, reconciliation, audit trail, compliance.

## Topics Covered

- [Distributed Transactions & Idempotency](/docs/topics/distributed-transactions)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Message Queues & Async Processing](/docs/topics/message-queues)
- [Rate Limiting](/docs/topics/rate-limiting)
- [CAP Theorem & Consistency Models](/docs/topics/cap-theorem)
- [Database Replication](/docs/topics/database-replication)
- [Microservices & API Gateway](/docs/topics/microservices)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/payment-system)

## Approach Hints

- Every payment request carries an idempotency key; the server stores (key → result) to make retries safe even if the network fails mid-flight
- Double-entry accounting: every transaction creates both a debit and a credit entry; balances are always derived from the ledger, never stored directly
- Use Saga orchestration to coordinate across payment processor, ledger service, and notification service — each step has a compensating action for rollback
- Append-only ledger table for complete audit trail; nightly reconciliation job compares ledger totals against payment processor reports to catch discrepancies
