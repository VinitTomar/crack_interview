---
id: strava
title: Activity Tracker (Strava)
sidebar_label: Activity Tracker (Strava)
tags: [medium]
---

# Activity Tracker (Strava)

**Difficulty:** Medium

## What It Tests

GPS data ingestion, activity analysis, leaderboards, time series data.

## Topics Covered

- [Time Series Databases](/docs/topics/time-series-db)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Caching](/docs/topics/caching)
- [API Design](/docs/topics/api-design)
- [Wide-Column Stores (Cassandra)](/docs/topics/cassandra)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/strava)

## Approach Hints

- Ingest GPS track points as time-series data (Cassandra or InfluxDB)
- Compute activity statistics (distance, pace, elevation) async after upload
- Serve segment leaderboards from precomputed Redis sorted sets
- Store activity summaries in PostgreSQL for complex queries

## Video Walkthroughs

- [System Design - Design Strava →](https://www.youtube.com/watch?v=9tic0WUGYjI)
- [Low Level Design of a Fitness App (Mock LLD Interview) →](https://www.youtube.com/watch?v=7-A5NgGrJqY)
