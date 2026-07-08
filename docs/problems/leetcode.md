---
id: leetcode
title: Online Judge (LeetCode)
sidebar_label: Online Judge (LeetCode)
tags: [medium]
---

# Online Judge (LeetCode)

**Difficulty:** Medium

## What It Tests

Code execution sandbox, job queuing, result storage.

## Topics Covered

- [Message Queues & Async Processing](/docs/topics/message-queues)
- [Job Scheduling & Background Processing](/docs/topics/job-scheduling)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [API Design](/docs/topics/api-design)
- [Blob / Object Storage](/docs/topics/blob-storage)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/leetcode)

## Approach Hints

- Sandboxed execution in Docker containers (nsjail/gVisor)
- Submit code to a job queue (Kafka/SQS), workers pull jobs and execute with resource limits (CPU/memory/time)
- Store results and submission history in a relational DB
- Return real-time execution status via polling or WebSocket

## Video Walkthroughs

- [System Design Interview: Design LeetCode (Online Judge) w/ Ex-Meta Staff Engineer →](https://www.youtube.com/watch?v=1xHADtekTNg)
- [Launch Party: System Design Online Judge →](https://www.youtube.com/watch?v=mwcadRR3nsk)
