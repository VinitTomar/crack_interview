---
id: uber
title: Ride Sharing (Uber)
sidebar_label: Ride Sharing (Uber)
tags: [hard]
---

# Ride Sharing (Uber)

**Difficulty:** Hard

## What It Tests

Real-time geo matching, driver tracking, dynamic pricing, trip management.

## Topics Covered

- [Proximity / Geo Search](/docs/topics/geo-search)
- [Real-time Updates](/docs/topics/realtime-updates)
- [Consistent Hashing](/docs/topics/consistent-hashing)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Message Queues & Async Processing](/docs/topics/message-queues)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/uber)

## Video Walkthroughs

- [System Design Interview: Design Uber (Ex-Meta Staff Engineer) →](https://www.youtube.com/watch?v=lsKU38RKQSo)
- [Uber System Design | Ola System Design Interview Question →](https://www.youtube.com/watch?v=Tp8kpMe-ZKw)

## Approach Hints

- Drivers publish location updates every 4 seconds via WebSocket, store driver locations in Redis geospatial index (GEORADIUS)
- Use geohash to find nearby idle drivers
- Match rider request to closest driver with a distributed lock to prevent double-assignment
- Surge pricing computed via stream processing (supply/demand ratio per geohash cell)
