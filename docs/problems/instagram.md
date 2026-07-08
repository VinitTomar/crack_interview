---
id: instagram
title: Photo Sharing (Instagram)
sidebar_label: Photo Sharing (Instagram)
tags: [medium]
---

# Photo Sharing (Instagram)

**Difficulty:** Medium

## What It Tests

Media storage, CDN, social graph, feed delivery at scale.

## Topics Covered

- [Blob / Object Storage](/docs/topics/blob-storage)
- [CDN (Content Delivery Network)](/docs/topics/cdn)
- [Database Sharding](/docs/topics/database-sharding)
- [Caching](/docs/topics/caching)
- [Fanout Patterns](/docs/topics/fanout-patterns)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/instagram)

## Approach Hints

- Store photos in S3, serve via CDN
- Shard user and media tables by user_id
- Use fan-out-on-write for feed (pre-build follower feeds)
- Use fan-out-on-read for celebrity accounts to avoid write amplification

## Video Walkthroughs

- [Instagram System Design | Meta | Facebook →](https://www.youtube.com/watch?v=YoS5cp0cirM)
- [Instagram System Design | Design Photo-Sharing Application | System Design Interview →](https://www.youtube.com/watch?v=da7mdMz0g0g)
