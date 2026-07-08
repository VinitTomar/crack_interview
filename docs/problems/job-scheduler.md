---
id: job-scheduler
title: Job Scheduler
sidebar_label: Job Scheduler
tags: [medium]
---

# Job Scheduler

**Difficulty:** Medium

## What It Tests

Distributed cron, fault tolerance, exactly-once execution.

## Topics Covered

- [Job Scheduling & Background Processing](/docs/topics/job-scheduling)
- [Message Queues & Async Processing](/docs/topics/message-queues)
- [Distributed Locking](/docs/topics/distributed-locking)
- [Database Design: SQL vs NoSQL](/docs/topics/database-design)
- [Key-Value Stores at Scale (DynamoDB)](/docs/topics/dynamodb)

## Hello Interview Breakdown

[Read the full Hello Interview breakdown →](https://www.hellointerview.com/learn/system-design/problem-breakdowns/job-scheduler)

## Approach Hints

- Poll a jobs table for due jobs (next_run_at)
- Use a distributed lock to claim a job before execution
- Mark job as running to prevent double-execution
- Exponential backoff for failed jobs; store next_run_at based on cron expression after successful completion
