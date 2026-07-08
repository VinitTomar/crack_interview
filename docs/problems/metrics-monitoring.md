---
id: metrics-monitoring
title: Metrics Monitoring System
sidebar_label: Metrics Monitoring
tags: [hard]
---

# Metrics Monitoring System

**Difficulty:** Hard

## What It Tests

Metric ingestion at scale, time-series storage, alerting, and query efficiency.

## Topics Covered

- [Time Series Databases](/docs/topics/time-series-db)
- [Stream Processing](/docs/topics/stream-processing)
- [Caching](/docs/topics/caching)
- [Big Data Architectures](/docs/topics/big-data-architecture)
- [Distributed Counting / Top K](/docs/topics/distributed-counting)
- [Scaling Fundamentals](/docs/topics/scaling-fundamentals)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/metrics-monitoring)

## Approach Hints

- Agents push metrics to Kafka (pull model with Prometheus scrape is an alternative); stream processor aggregates 1-minute windows into a time-series DB
- Pre-aggregate at multiple granularities (1-min, 1-hour, 1-day) and apply retention policies (raw data: 7 days, hourly: 3 months, daily: 2 years)
- Alert rules evaluated continuously against rolling windows; alert pipeline deduplicates and groups related alerts to prevent alert storms
- Query engine uses columnar storage and time-range partitioning for scan efficiency; cache frequently accessed dashboards in Redis
