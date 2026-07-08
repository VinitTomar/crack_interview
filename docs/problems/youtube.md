---
id: youtube
title: Video Streaming (YouTube)
sidebar_label: Video Streaming (YouTube)
tags: [medium]
---

# Video Streaming (YouTube)

**Difficulty:** Medium

## What It Tests

Video ingestion pipeline, transcoding, adaptive streaming, content delivery.

## Topics Covered

- [Blob / Object Storage](/docs/topics/blob-storage)
- [CDN (Content Delivery Network)](/docs/topics/cdn)
- [Message Queues & Async Processing](/docs/topics/message-queues)
- [Database Sharding](/docs/topics/database-sharding)
- [API Design](/docs/topics/api-design)
- [Microservices & API Gateway](/docs/topics/microservices)
- [Load Balancing](/docs/topics/load-balancing)
- [Scaling Fundamentals](/docs/topics/scaling-fundamentals)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/youtube)

## Video Walkthroughs

- [NeetCode: Design Youtube →](https://www.youtube.com/watch?v=jPKTo1iGQiE)
- [ByteByteGo: How Video Streaming Works →](https://www.youtube.com/watch?v=kCAXpAikMVc)

## Approach Hints

- Upload raw video to S3, publish to a Kafka topic to trigger transcoding workers
- Transcode to multiple resolutions/formats (HLS/DASH), store segments in S3 served via CDN
- Store video metadata in a sharded relational DB
- Use adaptive bitrate streaming based on client bandwidth
