---
id: dynamodb
title: Key-Value Stores at Scale (DynamoDB)
sidebar_label: Key-Value Stores at Scale (DynamoDB)
tags: [medium]
---

# Key-Value Stores at Scale (DynamoDB)

**Difficulty:** Medium | **Topic #21**

## What to Learn

Single-table design, partition key + sort key modeling, Global Secondary Indexes (GSIs), DynamoDB Streams, provisioned vs on-demand capacity, hot partition problem.

## Resources

- [Hello Interview: DynamoDB Deep Dive ↗](https://www.hellointerview.com/learn/system-design/deep-dives/dynamodb)
- [ByteByteGo: How Key-Value Stores Work (Redis, DynamoDB) ↗](https://www.youtube.com/watch?v=Dwt8R0KPu7k)
- [Hussein Nasser: Designing a Highly Available KV Store — The Dynamo Paper ↗](https://www.youtube.com/watch?v=wbZZftuLs4o)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| URL Shortener/Bitly | Easy | [→](/docs/problems/bitly) |
| Distributed Cache | Medium | [→](/docs/problems/distributed-cache) |
| Job Scheduler | Medium | [→](/docs/problems/job-scheduler) |

## Key Concepts to Master

- Single-table design and overloading partition/sort keys for multiple entity types
- GSIs for alternate access patterns (index overloading)
- DynamoDB Streams for event-driven patterns
- Hot partition detection via CloudWatch and key sharding solutions
- On-demand vs provisioned capacity and when to switch
