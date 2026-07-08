---
id: online-chess
title: Online Chess
sidebar_label: Online Chess
tags: [hard]
---

# Online Chess

**Difficulty:** Hard

## What It Tests

Real-time game state synchronization, matchmaking, session affinity, distributed state.

## Topics Covered

- [Real-time Updates](/docs/topics/realtime-updates)
- [Consistent Hashing](/docs/topics/consistent-hashing)
- [Distributed Locking](/docs/topics/distributed-locking)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [CAP Theorem & Consistency Models](/docs/topics/cap-theorem)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/online-chess)

## Approach Hints

- Use consistent hashing to assign each active game to a specific game server; both players connect via WebSocket to the same server for zero-latency move sync
- Game state stored in Redis (fast reads and writes for active games) and persisted to PostgreSQL after each move for durability
- Matchmaking service pairs players by ELO rating using a priority queue; tolerance expands over time if no match found
- A distributed lock prevents race conditions when both players submit moves simultaneously; server validates move legality before broadcasting to both clients
