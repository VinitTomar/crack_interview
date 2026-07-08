---
id: message-queues
title: Message Queues & Async Processing
sidebar_label: Message Queues & Async Processing
tags: [medium]
---

# Message Queues & Async Processing

**Difficulty:** Medium | **Topic #14**

## What to Learn

Producer-consumer pattern, Kafka (topics, partitions, consumer groups), SQS, at-least-once vs exactly-once semantics, dead letter queues, backpressure, when queues beat synchronous calls.

## Resources

- [Hello Interview Kafka Deep Dive ↗](https://www.hellointerview.com/learn/system-design/deep-dives/kafka)
- [Gaurav Sen Messaging Queue video ↗](https://www.youtube.com/watch?v=j9HxM4H9AfA)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Online Judge (LeetCode) | Medium | [→](/docs/problems/leetcode) |
| Messaging App (WhatsApp) | Medium | [→](/docs/problems/whatsapp) |
| Video Streaming (YouTube) | Medium | [→](/docs/problems/youtube) |
| Live Comments (FB Live) | Medium | [→](/docs/problems/fb-live-comments) |
| Job Scheduler | Medium | [→](/docs/problems/job-scheduler) |
| Payment System | Hard | [→](/docs/problems/payment-system) |
| Ad Click Aggregator | Hard | [→](/docs/problems/ad-click-aggregator) |

## Key Concepts to Master

- Kafka topic/partition/consumer group model and why it enables parallelism
- At-least-once vs exactly-once semantics and idempotent consumers
- Dead letter queues for poison messages
- Backpressure mechanisms to protect downstream services
- When to use a queue (decoupling, buffering) vs direct RPC
