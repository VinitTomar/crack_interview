---
id: tinder
title: Dating App (Tinder)
sidebar_label: Dating App (Tinder)
tags: [medium]
---

# Dating App (Tinder)

**Difficulty:** Medium

## What It Tests

Profile matching, geolocation filtering, swipe mechanics.

## Topics Covered

- [Proximity / Geo Search](/docs/topics/geo-search)
- [Caching](/docs/topics/caching)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Real-time Updates](/docs/topics/realtime-updates)
- [API Design](/docs/topics/api-design)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/tinder)

## Approach Hints

- Use geohash to filter nearby profiles
- Pre-cache a deck of profiles for each user
- Record swipes in a KV store, match notification via WebSocket or push
- Filter already-seen profiles with a bloom filter

## Video Walkthroughs

- [System Design Interview: Design Tinder (Ex-Meta Staff Engineer) →](https://www.youtube.com/watch?v=18Fg5Akhkqw)
- [Tinder System Design | Design Online Dating Application →](https://www.youtube.com/watch?v=pqx3QfBQHaQ)
