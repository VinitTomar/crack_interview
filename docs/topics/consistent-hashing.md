---
id: consistent-hashing
title: Consistent Hashing
sidebar_label: Consistent Hashing
tags: [medium]
---

# Consistent Hashing

**Difficulty:** Medium | **Topic #9**

## What to Learn

Hash ring concept, virtual nodes, how it minimizes data redistribution when nodes join/leave, applications in distributed caches and databases.

## Resources

- [Hello Interview: Consistent Hashing ↗](https://www.hellointerview.com/learn/system-design/core-concepts/consistent-hashing)
- [Gaurav Sen: What is Consistent Hashing? ↗](https://www.youtube.com/watch?v=zaRkONvyGr8)
- [ByteByteGo: Consistent Hashing | Algorithms You Should Know ↗](https://www.youtube.com/watch?v=UF9Iqmg94tk)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Distributed Cache | Medium | [→](/docs/problems/distributed-cache) |
| Live Comments (FB Live) | Medium | [→](/docs/problems/fb-live-comments) |
| Top K System | Hard | [→](/docs/problems/top-k) |
| Ride Sharing (Uber) | Hard | [→](/docs/problems/uber) |
| Online Chess | Hard | [→](/docs/problems/online-chess) |

## Key Concepts to Master

- Hash ring and clockwise key assignment
- Virtual nodes for even distribution
- How adding/removing a node affects ~1/N keys instead of all keys
- Rendezvous hashing as an alternative
- Real-world use in Cassandra, DynamoDB, and Memcached
