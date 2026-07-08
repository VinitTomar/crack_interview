---
id: distributed-locking
title: Distributed Locking
sidebar_label: Distributed Locking
tags: [medium]
---

# Distributed Locking

**Difficulty:** Medium | **Topic #17**

## What to Learn

Why distributed locks are needed, Redis-based locks (SET NX EX), Redlock algorithm, fencing tokens to handle lock expiry races, lock contention and its impact on throughput.

## Resources

- [Hello Interview Dealing with Contention ↗](https://www.hellointerview.com/learn/system-design/patterns/dealing-with-contention)
- [Gaurav Sen Playlist ↗](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Ticketing System (Ticketmaster) | Medium | [→](/docs/problems/ticketmaster) |
| Online Auction | Medium | [→](/docs/problems/online-auction) |
| Job Scheduler | Medium | [→](/docs/problems/job-scheduler) |
| Online Chess | Hard | [→](/docs/problems/online-chess) |

## Key Concepts to Master

- Why network partitions make distributed locking hard
- Redis SET NX EX for simple single-node locks
- Redlock algorithm across 5 nodes for higher correctness
- Fencing tokens to prevent stale lock holder actions
- Lock-free alternatives (optimistic locking, CAS) as a performance improvement
