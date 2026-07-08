---
id: local-delivery
title: Local Delivery Service
sidebar_label: Local Delivery Service
tags: [easy]
---

# Local Delivery Service

**Difficulty:** Easy

## What It Tests

Geo-matching, assignment, routing basics.

## Topics Covered

- [API Design](/docs/topics/api-design)
- [Proximity / Geo Search](/docs/topics/geo-search)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Load Balancing](/docs/topics/load-balancing)
- [Scaling Fundamentals](/docs/topics/scaling-fundamentals)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/gopuff)

## Approach Hints

- Use geohash to find nearby couriers within a radius
- Assign orders using a priority queue (proximity + load)
- Track courier location updates via periodic polling or WebSocket
- Store order state machine in a relational DB
