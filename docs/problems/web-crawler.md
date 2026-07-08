---
id: web-crawler
title: Web Crawler
sidebar_label: Web Crawler
tags: [hard]
---

# Web Crawler

**Difficulty:** Hard

## What It Tests

Distributed crawling at scale, URL management, politeness constraints, deduplication.

## Topics Covered

- [Web Crawling at Scale](/docs/topics/web-crawling)
- [Message Queues & Async Processing](/docs/topics/message-queues)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Job Scheduling & Background Processing](/docs/topics/job-scheduling)
- [Database Sharding](/docs/topics/database-sharding)
- [ZooKeeper / Distributed Coordination](/docs/topics/zookeeper)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/web-crawler)

## Video Walkthroughs

- [System Design Interview: Design a Web Crawler (Ex-Meta Staff Engineer) →](https://www.youtube.com/watch?v=krsuaUp__pM)
- [System Design Interview: Design a Web Crawler →](https://www.youtube.com/watch?v=l9z5_YSIZyM)

## Approach Hints

- URL frontier has two layers: a priority queue (recency, PageRank) and per-domain back queues with crawl-delay enforcement for politeness
- Distributed fetch workers pull from per-domain back queues; DNS caching avoids repeated lookups per domain
- URL deduplication via a distributed bloom filter (false positives acceptable — just means skipping a URL occasionally)
- Content deduplication via SimHash to detect near-duplicate pages; store crawled pages in S3 with metadata in a relational DB sharded by URL hash
