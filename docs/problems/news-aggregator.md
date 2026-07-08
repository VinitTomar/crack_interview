---
id: news-aggregator
title: News Aggregator
sidebar_label: News Aggregator
tags: [medium]
---

# News Aggregator

**Difficulty:** Medium

## What It Tests

Feed crawling, deduplication, topic clustering, feed ranking, and freshness.

## Topics Covered

- [Message Queues & Async Processing](/docs/topics/message-queues)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Search & Elasticsearch](/docs/topics/elasticsearch)
- [API Design](/docs/topics/api-design)
- [Fanout Patterns](/docs/topics/fanout-patterns)
- [Web Crawling at Scale](/docs/topics/web-crawling)
- [Database Indexing](/docs/topics/database-indexing)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/google-news)

## Video Walkthroughs

- [15 Minute System Design: News Aggregator →](https://www.youtube.com/watch?v=xRBLqs6Gij4)
- [Hello Interview: RSS Newsfeed System Design →](https://www.youtube.com/watch?v=hVMGtfaiM9Q)

## Approach Hints

- Periodic crawl workers fetch RSS/Atom feeds from configured sources; deduplicate articles by URL hash and SimHash for near-duplicates
- Index articles in Elasticsearch for full-text search and topic clustering (ML-based category tagging)
- Rank feed by a combined score of recency + source trust + user engagement signals
- Personalize feeds based on user topic subscriptions; fan-out on read to blend personalized and trending content
