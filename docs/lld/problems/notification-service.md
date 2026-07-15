---
title: Notification Service
sidebar_label: Notification Service
tags: [lld, machine-coding]
---

# Notification Service

**Difficulty:** Medium | **Track:** LLD

## Problem statement

Design a notification service that delivers messages across multiple channels based on user preferences. The service must route each notification to every channel the user has opted into, format the message appropriately per channel and notification type, and handle transient delivery failures gracefully with retries.

## Requirements

**Functional:**
- Support four delivery channels: EMAIL, SMS, PUSH, and IN_APP
- Each user has per-channel opt-in/opt-out preferences; only opted-in channels receive a notification
- Support four notification types: ALERT, PROMOTION, REMINDER, and SYSTEM
- Each channel formats a notification differently depending on its type
- Retry failed deliveries up to 3 times using exponential backoff
- Provide a unified entry point that resolves active channels for a user and dispatches to each

**Out of scope:**
- Unsubscribe link generation and mechanics
- Delivery receipts and read confirmations
- Real carrier or push-gateway integration

## Key classes

```java
public enum NotificationChannel { EMAIL, SMS, PUSH, IN_APP }

public enum NotificationType { ALERT, PROMOTION, REMINDER, SYSTEM }

public class Notification {
    private final String userId;
    private final NotificationType type;
    private final String title;
    private final String body;
    private final Map<String, String> metadata;

    // Builder pattern — see Notification.Builder inner class
    private Notification(Builder b) { /* assign fields */ }

    public static class Builder {
        public Builder userId(String id) { ... }
        public Builder type(NotificationType t) { ... }
        public Builder title(String title) { ... }
        public Builder body(String body) { ... }
        public Builder metadata(Map<String, String> m) { ... }
        public Notification build() { return new Notification(this); }
    }
    // getters omitted for brevity
}

public class UserPreferences {
    private final Map<NotificationChannel, Boolean> channelEnabled;
    public boolean isEnabled(NotificationChannel channel) { ... }
}

public interface NotificationFormatter {
    String format(Notification n, NotificationChannel channel);
}

public interface NotificationSender {
    void send(Notification n, User u) throws NotificationException;
}

public class EmailSender implements NotificationSender {
    private final NotificationFormatter formatter;
    @Override public void send(Notification n, User u) throws NotificationException { ... }
}

public class SmsSender   implements NotificationSender { ... }
public class PushSender  implements NotificationSender { ... }
public class InAppSender implements NotificationSender { ... }

public class NotificationSenderFactory {
    public NotificationSender getSender(NotificationChannel channel) { ... }
}

public class NotificationService {
    private final NotificationSenderFactory factory;
    private final UserPreferencesRepository prefsRepo;
    private static final int MAX_RETRIES = 3;

    public void notify(Notification notification) { ... }

    private List<NotificationChannel> resolveChannels(UserPreferences prefs) { ... }

    private void sendWithRetry(NotificationSender sender,
                               Notification n, User u, int attempt) { ... }
}
```

## Patterns used

- **Strategy**: each `NotificationSender` implementation encapsulates a distinct delivery algorithm, making channels interchangeable at runtime
- **Factory**: `NotificationSenderFactory` decouples the service from concrete sender classes and centralises creation logic
- **Template Method**: each sender follows the same send skeleton (format → deliver → log) but overrides the formatting and transport steps
- **Observer**: `NotificationService` acts as a publisher that fans out to all opted-in senders (subscribers) when a notification is triggered
- **Builder**: `Notification.Builder` constructs an immutable notification object step-by-step, avoiding telescoping constructors with optional fields

## Key design decisions

- **Per-channel opt-in resolved at dispatch time** — preferences are looked up inside `NotificationService.notify()` rather than at construction, so preference changes take effect immediately without rebuilding the notification object
- **Exponential backoff in `sendWithRetry`** — backing off with `2^attempt * base_delay` prevents hammering an already-degraded downstream while capping retries at 3 to bound latency
- **Formatter as a separate interface** — decoupling formatting from sending means a new type (e.g., TRANSACTIONAL) only requires a new formatter branch rather than changes to every sender
- **Factory centralises channel-to-sender mapping** — adding a new channel (e.g., WHATSAPP) requires updating only the factory and adding one sender class, leaving `NotificationService` unchanged
- **Immutable `Notification` via Builder** — thread safety is achieved for free; the same notification object can be passed concurrently to multiple senders without defensive copying

## What the interviewer is looking for

- Correct application of Strategy to swap senders without branching in the service class
- Sensible retry logic with exponential backoff and a bounded attempt count
- Clean separation of formatting concern from transport concern
- Extensibility: adding a new channel or type should touch only one class, not cascade through the design
- Awareness of edge cases: user with all channels disabled, formatter returning an empty string, partial failure across channels

## Resources

- [Refactoring.Guru: Strategy](https://refactoring.guru/design-patterns/strategy)
