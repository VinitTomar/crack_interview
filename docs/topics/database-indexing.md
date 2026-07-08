---
id: database-indexing
title: Database Indexing
sidebar_label: Database Indexing
tags: [medium]
---

# Database Indexing

**Difficulty:** Medium | **Topic #12**

## What to Learn

B-tree indexes for range queries, hash indexes for exact lookups, composite indexes and column order, covering indexes, when indexes hurt (write amplification), external indexes (Elasticsearch for full-text).

## Resources

- [Hello Interview: Database Indexing ↗](https://www.hellointerview.com/learn/system-design/core-concepts/db-indexing)
- [Hussein Nasser: Database Indexing Explained ↗](https://www.youtube.com/watch?v=-qNSXK7s7_w)
- [ByteByteGo: DB Indexing for System Design ↗](https://www.youtube.com/watch?v=BHCSL_ZifI0)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Local Business Reviews (Yelp) | Easy | [→](/docs/problems/yelp) |
| News Aggregator | Medium | [→](/docs/problems/news-aggregator) |
| Search Engine / FB Post Search | Hard | [→](/docs/problems/fb-post-search) |

## Key Concepts to Master

- B-tree index structure and range scan efficiency
- Composite index column order (equality first, range last)
- Covering index to avoid table lookups
- Write amplification from over-indexing
- When to use external indexes (Elasticsearch) vs native DB indexes
