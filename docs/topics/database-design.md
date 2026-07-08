---
id: database-design
title: "Database Design: SQL vs NoSQL"
sidebar_label: "Database Design: SQL vs NoSQL"
tags: [easy]
---

# Database Design: SQL vs NoSQL

**Difficulty:** Easy | **Topic #2**

## What to Learn

When to use relational (ACID, joins, strong consistency) vs NoSQL (flexible schema, horizontal scale). Understand document, key-value, wide-column, and graph stores and their tradeoffs.

## Resources

- [Hello Interview: Data Modeling ↗](https://www.hellointerview.com/learn/system-design/core-concepts/data-modeling)
- [ByteByteGo: SQL vs NoSQL is the WRONG Question ↗](https://www.youtube.com/watch?v=tIvCjH2ETzo)
- [Gaurav Sen: SQL vs NoSQL — Tradeoffs ↗](https://www.youtube.com/watch?v=QzLhb1WBFjQ)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| URL Shortener/Bitly | Easy | [→](/docs/problems/bitly) |
| File Storage/Dropbox | Easy | [→](/docs/problems/dropbox) |
| FB News Feed | Medium | [→](/docs/problems/fb-news-feed) |
| WhatsApp | Medium | [→](/docs/problems/whatsapp) |
| Online Chess | Hard | [→](/docs/problems/online-chess) |

## Key Concepts to Master

- ACID vs BASE properties
- Normalization vs denormalization for read performance
- Choosing a primary key and access patterns for NoSQL
- When to pick Postgres vs DynamoDB vs Cassandra
- Data modeling for high fan-out vs high-read workloads
