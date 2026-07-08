---
id: elasticsearch
title: Search & Elasticsearch
sidebar_label: Search & Elasticsearch
tags: [medium]
---

# Search & Elasticsearch

**Difficulty:** Medium | **Topic #19**

## What to Learn

Inverted index construction, full-text search (tokenization, stemming, relevance scoring with BM25/TF-IDF), index sharding and replication in Elasticsearch, near-real-time indexing, change data capture for sync.

## Resources

- [Hello Interview: Elasticsearch Deep Dive ↗](https://www.hellointerview.com/learn/system-design/deep-dives/elasticsearch)
- [Arpit Bhayani: Inverted Index — Data Structure Behind Search Engines ↗](https://www.youtube.com/watch?v=iHHqnyThrqE)
- [ByteByteGo: Elasticsearch Design Deep Dive ↗](https://www.youtube.com/watch?v=eUvwRAxmEgY)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Local Business Reviews (Yelp) | Easy | [→](/docs/problems/yelp) |
| News Aggregator | Medium | [→](/docs/problems/news-aggregator) |
| Search Engine / FB Post Search | Hard | [→](/docs/problems/fb-post-search) |

## Key Concepts to Master

- Inverted index structure — term → doc list mapping
- BM25 relevance scoring and how term frequency and field length factor in
- Index sharding in Elasticsearch (primary + replica shards)
- Near-real-time indexing (1-second refresh interval by default)
- CDC (Debezium) to sync primary DB changes into Elasticsearch
