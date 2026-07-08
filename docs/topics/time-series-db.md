---
id: time-series-db
title: Time Series Databases
sidebar_label: Time Series Databases
tags: [hard]
---

# Time Series Databases

**Difficulty:** Hard | **Topic #29**

## What to Learn

Append-only write patterns, compression techniques (delta encoding, Gorilla compression), downsampling and retention policies, InfluxDB/TimescaleDB internals, querying time-range aggregations efficiently.

## Resources

- [Hello Interview: Time Series Databases ↗](https://www.hellointerview.com/learn/system-design/deep-dives/time-series-databases)
- [Arpit Bhayani: Compression Algorithm Powering Time-Series DBs ↗](https://www.youtube.com/watch?v=J7VJtuRCkuI)
- [Ex-Google SWE: How Are Time Series Databases SO FAST? ↗](https://www.youtube.com/watch?v=fUpYLwzGtW0)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Activity Tracker (Strava) | Medium | [→](/docs/problems/strava) |
| Price Tracking Service | Medium | [→](/docs/problems/price-tracking) |
| Metrics Monitoring System | Hard | [→](/docs/problems/metrics-monitoring) |

## Key Concepts to Master

- Time-ordered append-only writes and why random updates are rare
- Gorilla compression — XOR delta encoding for floating-point timestamps and values
- Downsampling (roll-up) from raw to hourly to daily for storage efficiency
- Retention policies and tier storage (hot/cold)
- Columnar storage for time-range aggregations (avg, max, sum over windows)
