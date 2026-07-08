---
id: fb-news-feed
title: Social News Feed (FB News Feed)
sidebar_label: Social News Feed (FB News Feed)
tags: [medium]
---

# Social News Feed (FB News Feed)

**Difficulty:** Medium

## What It Tests

Feed ranking, fan-out at scale, read-heavy optimization.

## Topics Covered

- [Fanout Patterns](/docs/topics/fanout-patterns)
- [Caching](/docs/topics/caching)
- [Message Queues & Async Processing](/docs/topics/message-queues)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Database Replication](/docs/topics/database-replication)
- [Redis Deep Dive](/docs/topics/redis)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/fb-news-feed)

## Approach Hints

- Fan-out-on-write for regular users (push posts to follower feed lists in Redis sorted set)
- Fan-out-on-read for celebrities
- Rank feed by a score (recency + engagement)
- Serve cached feeds from Redis for active users

## Video Walkthroughs

- [Design Scalable News Feed System (Instagram / Facebook / Twitter) →](https://www.youtube.com/watch?v=Ox-aXX2qekU)
- [System Design Interview: Design Facebook News Feed →](https://www.youtube.com/watch?v=H_m7XibyQmE)
