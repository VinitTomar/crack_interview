---
id: whatsapp
title: Messaging App (WhatsApp)
sidebar_label: Messaging App (WhatsApp)
tags: [medium]
---

# Messaging App (WhatsApp)

**Difficulty:** Medium

## What It Tests

Real-time messaging, delivery receipts, group chat, media sharing.

## Topics Covered

- [Real-time Updates](/docs/topics/realtime-updates)
- [Message Queues & Async Processing](/docs/topics/message-queues)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Blob / Object Storage](/docs/topics/blob-storage)
- [Networking Essentials](/docs/topics/networking)
- [Wide-Column Stores (Cassandra)](/docs/topics/cassandra)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/whatsapp)

## Approach Hints

- Persistent WebSocket connection per client
- Store messages in Cassandra (partitioned by conversation_id + timestamp)
- Media uploaded to S3 and linked in the message
- Delivery states (sent/delivered/read) stored in Redis, push notifications via APNs/FCM for offline users

## Video Walkthroughs

- [Gaurav Sen: WhatsApp System Design →](https://www.youtube.com/watch?v=RjQjbJ2UJDg)
- [System Design Interview: Design WhatsApp (Chat Messaging Systems) →](https://www.youtube.com/watch?v=vvhC64hQZMk)
