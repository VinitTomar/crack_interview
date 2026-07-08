---
id: bitly
title: URL Shortener (Bitly)
sidebar_label: URL Shortener (Bitly)
tags: [easy]
---

# URL Shortener (Bitly)

**Difficulty:** Easy

## What It Tests

Core distributed systems fundamentals — hashing, redirection, and building a read-heavy globally available service.

## Topics Covered

- [API Design](/docs/topics/api-design)
- [Caching](/docs/topics/caching)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Load Balancing](/docs/topics/load-balancing)
- [Networking Essentials](/docs/topics/networking)
- [Key-Value Stores at Scale (DynamoDB)](/docs/topics/dynamodb)
- [Rate Limiting](/docs/topics/rate-limiting)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/bitly)

## Approach Hints

- Hash the long URL (MD5/SHA256 truncated or Base62 encoding of a counter), store in a KV store (DynamoDB/Redis) with the short code as key
- Redirect via 301 (cacheable) or 302 (trackable)
- Add a CDN layer in front for popular short URLs
- Rate limit writes per user/IP to prevent abuse

## Video Walkthroughs

- [Gaurav Sen: System Design: URL Shortener -- Introduction →](https://www.youtube.com/watch?v=_ANBR698D7c)
- [NeetCode: Design a URL Shortener (Bitly) - System Design Interview →](https://www.youtube.com/watch?v=qSJAvd5Mgio)
