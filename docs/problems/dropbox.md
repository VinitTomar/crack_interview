---
id: dropbox
title: File Storage & Sync (Dropbox)
sidebar_label: File Storage & Sync (Dropbox)
tags: [easy]
---

# File Storage & Sync (Dropbox)

**Difficulty:** Easy

## What It Tests

Blob storage, chunked uploads, client sync protocol, conflict resolution.

## Topics Covered

- [Blob / Object Storage](/docs/topics/blob-storage)
- [CDN (Content Delivery Network)](/docs/topics/cdn)
- [API Design](/docs/topics/api-design)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Networking Essentials](/docs/topics/networking)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/dropbox)

## Approach Hints

- Split files into fixed-size chunks and upload each to S3, store a chunk manifest in a relational DB
- Use delta sync to only upload changed chunks
- Detect conflicts using vector clocks or last-write-wins
- Serve downloads via CDN-backed pre-signed S3 URLs for low latency

## Video Walkthroughs

- [ByteByteGo: Google Drive System Design | Dropbox System Design | File Sharing Service System Design →](https://www.youtube.com/watch?v=3RHjRXWAUvg)
- [System Design: Dropbox (5+ Approaches) →](https://www.youtube.com/watch?v=b1xqGj-SYB0)
