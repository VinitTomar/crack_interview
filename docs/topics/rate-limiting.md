---
id: rate-limiting
title: Rate Limiting
sidebar_label: Rate Limiting
tags: [medium]
---

# Rate Limiting

**Difficulty:** Medium | **Topic #15**

## What to Learn

Token bucket, leaky bucket, and sliding window algorithms; distributed rate limiting with Redis (atomic Lua scripts), rate limiting at the API gateway vs per-service, handling burst traffic.

## Resources

- [Hello Interview: Rate Limiter Breakdown ↗](https://www.hellointerview.com/learn/system-design/problem-breakdowns/distributed-rate-limiter)
- [ByteByteGo: Rate Limiting Fundamentals ↗](https://www.youtube.com/watch?v=5u8hDdB3mRY)
- [Gaurav Sen: Token Bucket, Leaky Bucket, Sliding Logs ↗](https://www.youtube.com/watch?v=mhUQe4BKZXs)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| URL Shortener/Bitly | Easy | [→](/docs/problems/bitly) |
| Rate Limiter | Medium | [→](/docs/problems/rate-limiter) |
| LLM Service (ChatGPT) | Hard | [→](/docs/problems/chatgpt) |

## Key Concepts to Master

- Token bucket (allows bursts up to capacity) vs leaky bucket (constant output rate)
- Sliding window log vs sliding window counter tradeoffs
- Redis INCR + TTL for distributed counters
- Lua scripts for atomicity in Redis
- Rate limiting at the edge (API gateway) vs per-microservice
