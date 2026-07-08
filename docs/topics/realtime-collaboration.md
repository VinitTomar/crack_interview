---
id: realtime-collaboration
title: Real-time Collaboration (OT / CRDT)
sidebar_label: Real-time Collaboration (OT / CRDT)
tags: [hard]
---

# Real-time Collaboration (OT / CRDT)

**Difficulty:** Hard | **Topic #28**

## What to Learn

Operational Transformation (OT) for collaborative text editing, Conflict-Free Replicated Data Types (CRDTs) as the modern alternative, cursor/selection sync, version vectors, merging concurrent edits.

## Resources

- [Hello Interview Google Docs Breakdown ↗](https://www.hellointerview.com/learn/system-design/problem-breakdowns/google-docs)
- [Gaurav Sen Playlist ↗](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Real-time Doc Collaboration (Google Docs) | Hard | [→](/docs/problems/google-docs) |
| Online Chess | Hard | [→](/docs/problems/online-chess) |

## Key Concepts to Master

- OT — transform an operation to account for concurrent remote operations
- Convergence guarantee: all clients reach the same state regardless of operation order
- CRDT — data structures where concurrent updates automatically resolve (counters, sets, sequences)
- Vector clocks for tracking causality between operations
- Cursor/selection broadcast as a separate low-latency channel
