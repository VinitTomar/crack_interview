---
id: fanout-patterns
title: Fanout Patterns
sidebar_label: Fanout Patterns
tags: [medium]
---

# Fanout Patterns

**Difficulty:** Medium | **Topic #22**

## What to Learn

Fan-out-on-write (push model — pre-populate each follower's feed) vs fan-out-on-read (pull model — compute feed at read time); hybrid approach for celebrities, tradeoffs in storage vs latency.

## Resources

- [Hello Interview: Scaling Writes ↗](https://www.hellointerview.com/learn/system-design/patterns/scaling-writes)
- [Gaurav Sen: Designing Instagram — News Feed System Design ↗](https://www.youtube.com/watch?v=QmX2NPkJTKg)
- [System Design Interview: How Social Media News Feeds Work ↗](https://www.youtube.com/watch?v=KwgI-VJEr3E)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Social News Feed (FB News Feed) | Medium | [→](/docs/problems/fb-news-feed) |
| Photo Sharing (Instagram) | Medium | [→](/docs/problems/instagram) |
| News Aggregator | Medium | [→](/docs/problems/news-aggregator) |

## Key Concepts to Master

- Fan-out-on-write: low read latency but huge write amplification for celebrities
- Fan-out-on-read: avoids write amplification but high read latency for active users
- Hybrid approach: fan-out-on-write for normal users, pull for celebrities (Twitter/X strategy)
- Inbox vs outbox model for activity feeds
- Ranked feed vs chronological feed storage implications
