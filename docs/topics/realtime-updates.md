---
id: realtime-updates
title: Real-time Updates
sidebar_label: Real-time Updates
tags: [medium]
---

# Real-time Updates

**Difficulty:** Medium | **Topic #16**

## What to Learn

WebSockets for full-duplex persistent connections, SSE for server-to-client streams, long polling as a fallback; when to pick each; connection management at scale (sticky sessions or pub-sub relay).

## Resources

- [Hello Interview: Real-time Updates Pattern ↗](https://www.hellointerview.com/learn/system-design/patterns/realtime-updates)
- [Hussein Nasser: WebSockets vs SSE vs Long-Polling ↗](https://www.youtube.com/watch?v=jwmVVEMxw50)
- [Ex-Google SWE: Long Polling vs WebSockets vs SSE ↗](https://www.youtube.com/watch?v=fIwOd4PToAY)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| Messaging App (WhatsApp) | Medium | [→](/docs/problems/whatsapp) |
| Live Comments (FB Live) | Medium | [→](/docs/problems/fb-live-comments) |
| Online Auction | Medium | [→](/docs/problems/online-auction) |
| Online Chess | Hard | [→](/docs/problems/online-chess) |
| Real-time Doc Collaboration (Google Docs) | Hard | [→](/docs/problems/google-docs) |
| Ride Sharing (Uber) | Hard | [→](/docs/problems/uber) |
| Stock Trading Platform (Robinhood) | Hard | [→](/docs/problems/robinhood) |

## Key Concepts to Master

- WebSocket handshake and upgrade process
- SSE vs WebSockets — unidirectional vs bidirectional
- Long polling overhead vs WebSocket connection cost at scale
- Pub-sub relay (Redis Pub/Sub, Kafka) to fan out to WebSocket servers
- Connection draining on server restarts
