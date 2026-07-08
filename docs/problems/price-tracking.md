---
id: price-tracking
title: Price Tracking Service
sidebar_label: Price Tracking
tags: [medium]
---

# Price Tracking Service

**Difficulty:** Medium

## What It Tests

Periodic data collection, change detection, time-series storage, and alerting at scale.

## Topics Covered

- [Message Queues & Async Processing](/docs/topics/message-queues)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Time Series Databases](/docs/topics/time-series-db)
- [Job Scheduling & Background Processing](/docs/topics/job-scheduling)
- [Ad Aggregation Pipelines](/docs/topics/ad-aggregation)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/camelcamelcamel)

## Approach Hints

- Scheduled scrape jobs per product (cron-based with random jitter to avoid thundering herd against retailers)
- Store price history as time-series data; compare new price to last known price to detect drops
- Publish price-drop events to Kafka and fan out to alert workers that notify users via email/push
- Rate-limit notifications per user (max 1 alert per product per day) and allow users to set threshold percentages
