---
id: web-crawling
title: Web Crawling at Scale
sidebar_label: Web Crawling at Scale
tags: [hard]
---

# Web Crawling at Scale

**Difficulty:** Hard | **Topic #33**

## What to Learn

URL frontier (priority queue + politeness delays), distributed fetch workers, deduplication via bloom filters or URL hashes, robots.txt compliance, re-crawl scheduling, DNS caching.

## Resources

- [Hello Interview: Web Crawler Breakdown ↗](https://www.hellointerview.com/learn/system-design/problem-breakdowns/web-crawler)
- [System Design Interview: Web Crawler — URL Frontier, Robots.txt, Deduplication ↗](https://www.youtube.com/watch?v=Ouf3J9or72Q)
- [ByteByteGo: How Search Really Works (Crawling, Indexing, Ranking) ↗](https://www.youtube.com/watch?v=TByRaraQqW4)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| News Aggregator | Medium | [→](/docs/problems/news-aggregator) |
| Web Crawler | Hard | [→](/docs/problems/web-crawler) |

## Key Concepts to Master

- URL frontier with priority queues (freshness, PageRank) and back queues per domain for politeness
- Distributed fetch workers consuming from the frontier
- URL deduplication using a distributed bloom filter or hash set
- Robots.txt fetching and compliance per domain
- DNS cache to avoid repeated lookups per domain
- Content change detection with checksums
