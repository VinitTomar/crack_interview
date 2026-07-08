---
id: job-scheduling
title: Job Scheduling & Background Processing
sidebar_label: Job Scheduling & Background Processing
tags: [medium]
---

# Job Scheduling & Background Processing

**Difficulty:** Medium | **Topic #23**

## What to Learn

Cron-based scheduling, distributed job queues (Celery, Sidekiq), idempotent job design, at-least-once execution guarantees, failure retries with backoff, job deduplication, priority queues.

## Resources

- [Hello Interview Long Running Tasks ↗](https://www.hellointerview.com/learn/system-design/patterns/long-running-tasks)
- [Gaurav Sen Playlist ↗](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Online Judge (LeetCode) | Medium | [→](/docs/problems/leetcode) |
| Job Scheduler | Medium | [→](/docs/problems/job-scheduler) |
| Price Tracking Service | Medium | [→](/docs/problems/price-tracking) |
| Web Crawler | Hard | [→](/docs/problems/web-crawler) |

## Key Concepts to Master

- At-least-once delivery and why idempotent jobs are mandatory
- Exponential backoff with jitter for retries
- Job deduplication via unique job IDs and a seen-set
- Priority queues with starvation prevention
- Distributed cron with leader election to avoid duplicate job triggers
