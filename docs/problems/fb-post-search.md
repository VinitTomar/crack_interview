---
id: fb-post-search
title: Search Engine / FB Post Search
sidebar_label: FB Post Search
tags: [hard]
---

# Search Engine / FB Post Search

**Difficulty:** Hard

## What It Tests

Search index building, relevance ranking, freshness, query parsing at social-network scale.

## Topics Covered

- [Search & Elasticsearch](/docs/topics/elasticsearch)
- [Stream Processing](/docs/topics/stream-processing)
- [Big Data Architectures](/docs/topics/big-data-architecture)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Database Indexing](/docs/topics/database-indexing)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/fb-post-search)

## Approach Hints

- CDC (Debezium) captures new/updated posts from primary DB and publishes to Kafka; indexing workers consume and upsert Elasticsearch documents
- BM25 relevance scoring augmented with personalization signals (friend graph proximity, engagement history)
- Near-real-time indexing via Elasticsearch's 1-second refresh interval; use a hot index for recent posts and a cold index for historical
- Query parsing handles hashtags, mentions, phrases, and boolean operators; a ranking model blends text relevance + social signals

## Video Walkthroughs

- [System Design: Design FB Post Search (ex-Meta Interviewer) →](https://www.youtube.com/watch?v=l38XL9914fs)
- [System Design: Design Facebook Status Search →](https://www.youtube.com/watch?v=KxfYCkZJw8U)
