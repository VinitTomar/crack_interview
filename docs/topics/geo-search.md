---
id: geo-search
title: Proximity / Geo Search
sidebar_label: Proximity / Geo Search
tags: [hard]
---

# Proximity / Geo Search

**Difficulty:** Hard | **Topic #27**

## What to Learn

Geohashing (encoding lat/lng into a string prefix), quadtrees for dynamic data, PostGIS for polygon queries, radius search with grid cells, nearest-neighbor search.

## Resources

- [Hello Interview: Proximity Search Deep Dive ↗](https://www.hellointerview.com/learn/system-design/deep-dives/proximity-search)
- [ByteByteGo: Design A Location Based Service ↗](https://www.youtube.com/watch?v=M4lR_Va97cQ)
- [Gaurav Sen: Geohashing Algorithm — Proximity Search ↗](https://www.youtube.com/watch?v=6uhSpLjGLgo)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Local Business Reviews (Yelp) | Easy | [→](/docs/problems/yelp) |
| Local Delivery Service | Easy | [→](/docs/problems/local-delivery) |
| Dating App (Tinder) | Medium | [→](/docs/problems/tinder) |
| Ride Sharing (Uber) | Hard | [→](/docs/problems/uber) |

## Key Concepts to Master

- Geohash encoding — how string prefix defines a bounding box
- Geohash precision levels and their coverage area
- Quadtree for dynamic point data (driver locations)
- Expanding search radius by querying neighboring geohash cells
- PostGIS ST_DWithin for exact distance queries on polygon data
