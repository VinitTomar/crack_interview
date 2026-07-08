---
id: google-docs
title: Real-time Doc Collaboration (Google Docs)
sidebar_label: Google Docs
tags: [hard]
---

# Real-time Doc Collaboration (Google Docs)

**Difficulty:** Hard

## What It Tests

Conflict-free collaborative editing, cursor sync, version history, convergence guarantees.

## Topics Covered

- [Real-time Collaboration (OT / CRDT)](/docs/topics/realtime-collaboration)
- [Real-time Updates](/docs/topics/realtime-updates)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Blob / Object Storage](/docs/topics/blob-storage)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/google-docs)

## Video Walkthroughs

- [Design Google Docs — System Design Interview →](https://www.youtube.com/watch?v=9JKBlkwg0yM)
- [Google Docs System Design: Collaborative Editor & Operational Transformation →](https://www.youtube.com/watch?v=YiZh9Gj75HI)

## Approach Hints

- Use Operational Transformation (OT) — each client sends operations; the server transforms concurrent ops before applying and broadcasting
- A central server serializes all operations to guarantee convergence: all clients reach the same document state regardless of arrival order
- Persist the full operation log for version history and point-in-time restore; take periodic snapshots to avoid replaying the full log
- Separate cursor/selection sync (100ms update rate, ephemeral) from document content sync (apply + broadcast on every op)
