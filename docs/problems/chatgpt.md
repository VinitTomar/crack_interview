---
id: chatgpt
title: LLM Service (ChatGPT)
sidebar_label: ChatGPT / LLM
tags: [hard]
---

# LLM Service (ChatGPT)

**Difficulty:** Hard

## What It Tests

LLM inference infrastructure, token streaming, context management, cost and rate control at scale.

## Topics Covered

- [Vector Databases & LLM Infrastructure](/docs/topics/vector-databases)
- [API Gateway](/docs/topics/microservices)
- [Load Balancing](/docs/topics/load-balancing)
- [Stream Processing](/docs/topics/stream-processing)
- [Rate Limiting](/docs/topics/rate-limiting)
- [Caching](/docs/topics/caching)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/chatgpt)

## Approach Hints

- Route all requests through an API gateway for auth, rate limiting (per user and per organization), and request validation
- Load balance across GPU inference servers; use session pinning (consistent hashing on conversation_id) to reuse the KV cache across turns
- Stream tokens back to the client as they're generated using Server-Sent Events (SSE); handle client disconnects gracefully
- Store conversation history in a KV store (Redis/DynamoDB); truncate to model context window using a sliding window or summary compression
- Semantic cache: hash or embed the prompt and look up similar past queries to serve cached responses for near-duplicate questions
