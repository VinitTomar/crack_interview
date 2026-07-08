---
id: zookeeper
title: ZooKeeper / Distributed Coordination
sidebar_label: ZooKeeper / Distributed Coordination
tags: [hard]
---

# ZooKeeper / Distributed Coordination

**Difficulty:** Hard | **Topic #31**

## What to Learn

Leader election, distributed configuration management, service registry, ephemeral nodes, watch mechanisms; when ZooKeeper is overkill vs when it's necessary.

## Resources

- [Hello Interview ZooKeeper Deep Dive ↗](https://www.hellointerview.com/learn/system-design/deep-dives/zookeeper)
- [Gaurav Sen Playlist ↗](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Distributed Cache | Medium | [→](/docs/problems/distributed-cache) |
| Web Crawler | Hard | [→](/docs/problems/web-crawler) |
| Ad Click Aggregator | Hard | [→](/docs/problems/ad-click-aggregator) |

## Key Concepts to Master

- ZooKeeper znodes — persistent vs ephemeral and how ephemeral nodes detect crashes
- Watches — one-time notifications when a znode changes
- Leader election recipe using sequential ephemeral znodes
- Quorum-based writes for consistency (ZAB protocol)
- When etcd or Consul is a better modern alternative
