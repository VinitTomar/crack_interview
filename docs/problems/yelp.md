---
id: yelp
title: Local Business Reviews (Yelp)
sidebar_label: Local Business Reviews (Yelp)
tags: [easy]
---

# Local Business Reviews (Yelp)

**Difficulty:** Easy

## What It Tests

Geo search, read-heavy systems, search indexing.

## Topics Covered

- [Proximity / Geo Search](/docs/topics/geo-search)
- [API Design](/docs/topics/api-design)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Caching](/docs/topics/caching)
- [Search & Elasticsearch](/docs/topics/elasticsearch)
- [Database Indexing](/docs/topics/database-indexing)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/yelp)

## Approach Hints

- Store businesses with geohash-indexed location in PostgreSQL
- Use Elasticsearch for full-text search + geo_distance query
- Cache top-rated businesses per city in Redis
- Paginate results with cursor-based pagination

## Video Walkthroughs

- [Yelp System Design | Amazon Interview Question →](https://www.youtube.com/watch?v=TCP5iPy8xqo)
- [FAANG System Design Interview: Design A Location Based Service (Yelp, Google Places) →](https://www.youtube.com/watch?v=M4lR_Va97cQ)
