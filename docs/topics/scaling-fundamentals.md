---
id: scaling-fundamentals
title: Scaling Fundamentals
sidebar_label: Scaling Fundamentals
tags: [easy]
---

# Scaling Fundamentals

**Difficulty:** Easy | **Topic #8**

## What to Learn

Vertical scaling (bigger machines) vs horizontal scaling (more machines), stateless service design (session externalization), auto-scaling triggers, back-of-the-envelope estimation (QPS, storage, bandwidth).

## Resources

- [Hello Interview How to Prepare ↗](https://www.hellointerview.com/learn/system-design/in-a-hurry/how-to-prepare)
- [Gaurav Sen Playlist ↗](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Local Delivery Service | Easy | [→](/docs/problems/local-delivery) |
| Video Streaming (YouTube) | Medium | [→](/docs/problems/youtube) |
| Ad Click Aggregator | Hard | [→](/docs/problems/ad-click-aggregator) |
| Metrics Monitoring System | Hard | [→](/docs/problems/metrics-monitoring) |

## Key Concepts to Master

- Stateless vs stateful services and how statefulness prevents horizontal scaling
- Session storage externalization (Redis, sticky sessions tradeoff)
- Back-of-the-envelope: QPS estimation, storage sizing, bandwidth calculation
- Auto-scaling triggers (CPU%, queue depth, custom metrics)
- Database vertical limits and why sharding becomes necessary
