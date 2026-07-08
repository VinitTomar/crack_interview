---
id: microservices
title: Microservices & API Gateway
sidebar_label: Microservices & API Gateway
tags: [medium]
---

# Microservices & API Gateway

**Difficulty:** Medium | **Topic #24**

## What to Learn

Service decomposition principles, inter-service communication (REST vs gRPC), service discovery, API gateway responsibilities (routing, auth, rate limiting, circuit breaking), tradeoffs vs monolith.

## Resources

- [Hello Interview: API Gateway Deep Dive ↗](https://www.hellointerview.com/learn/system-design/deep-dives/api-gateway)
- [ByteByteGo: What Are Microservices Really All About? ↗](https://www.youtube.com/watch?v=lTAcCNbJ7KE)
- [Gaurav Sen: Monolithic vs MicroServices Architecture ↗](https://www.youtube.com/watch?v=srXdCa89H04)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Messaging App (WhatsApp) | Medium | [→](/docs/problems/whatsapp) |
| Video Streaming (YouTube) | Medium | [→](/docs/problems/youtube) |
| Payment System | Hard | [→](/docs/problems/payment-system) |
| LLM Service (ChatGPT) | Hard | [→](/docs/problems/chatgpt) |

## Key Concepts to Master

- Monolith vs microservices: when the split is worth the operational cost
- Service discovery (client-side vs server-side, Consul, Kubernetes)
- Circuit breaker pattern to prevent cascading failures
- API gateway as the single entry point for auth, routing, rate limiting
- gRPC for internal service communication (proto contracts, bidirectional streaming)
