---
id: rate-limiter
title: Rate Limiter
sidebar_label: Rate Limiter
tags: [medium]
---

# Rate Limiter

**Difficulty:** Medium

## What It Tests

Algorithmic rate limiting, distributed enforcement, Redis patterns.

## Topics Covered

- [Rate Limiting](/docs/topics/rate-limiting)
- [Redis Deep Dive](/docs/topics/redis)
- [API Design](/docs/topics/api-design)
- [Microservices & API Gateway](/docs/topics/microservices)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/distributed-rate-limiter)

## Approach Hints

- Sliding window counter using Redis INCR + EXPIRE
- Atomic Lua script to check-and-increment in one round trip
- Store limit config in a centralized config store
- Return Retry-After header on 429 responses; handle Redis failure with a local in-memory fallback counter
