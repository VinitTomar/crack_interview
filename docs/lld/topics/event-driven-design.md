---
title: Event-Driven Design
sidebar_label: Event-Driven Design
tags: [lld, concurrency-architecture]
---

# Event-Driven Design
> **Level**: Concurrency & Architecture | **Track**: Low Level Design

## Why it matters in interviews

Event-driven questions appear when interviewers ask you to design multi-actor workflows — "how does placing an order trigger an email, reduce inventory, and notify fulfillment without tight coupling?" Companies like Uber, DoorDash, and Stripe ask this to stress-test your ability to decouple side effects from core business logic. A clean answer signals you understand separation of concerns, extensibility, and the tradeoffs between synchronous and asynchronous execution.

## Core concepts

- **Domain events**: immutable data records describing something that already happened (`OrderPlaced`, `TripCompleted`, `PaymentFailed`) — past tense, never a command
- **EventPublisher**: raises events to the bus; has no knowledge of which handlers (if any) will react
- **EventHandler / EventListener**: subscribes to a specific event type and encapsulates the reaction logic
- **Synchronous dispatch**: handlers are called inline in the same thread — simple to reason about, but failures in one handler can block or corrupt others
- **Asynchronous dispatch**: events are queued and handlers run on a separate thread pool — better isolation and throughput, but harder to debug and test
- **EventBus**: the registry and dispatcher; maps event types to their list of registered handlers
- **Distinguish from Observer pattern**: Observer couples a concrete subject to its observers in the same process; Event-Driven is an architectural style where producers and consumers are fully decoupled through a shared bus or broker
- **Multi-actor workflow**: a single state transition (order placed) fans out to multiple downstream reactions — confirmation email, inventory deduction, fulfillment notification — each independently extensible

## Code example

```java
// Immutable domain event
record OrderPlacedEvent(String orderId, String customerId, double totalAmount) {}

// Generic handler contract
interface EventHandler<T> {
    void handle(T event);
}

// In-process synchronous EventBus
class EventBus {
    private final Map<Class<?>, List<EventHandler<?>>> handlers = new HashMap<>();

    public <T> void subscribe(Class<T> eventType, EventHandler<T> handler) {
        handlers.computeIfAbsent(eventType, k -> new ArrayList<>()).add(handler);
    }

    @SuppressWarnings("unchecked")
    public <T> void publish(T event) {
        List<EventHandler<?>> registered = handlers.getOrDefault(event.getClass(), List.of());
        for (EventHandler<?> handler : registered) {
            ((EventHandler<T>) handler).handle(event);
        }
    }
}

// Handler 1: sends confirmation email
class EmailNotificationHandler implements EventHandler<OrderPlacedEvent> {
    @Override
    public void handle(OrderPlacedEvent event) {
        System.out.printf("Email sent to customer %s for order %s%n",
                event.customerId(), event.orderId());
    }
}

// Handler 2: reduces inventory
class InventoryHandler implements EventHandler<OrderPlacedEvent> {
    @Override
    public void handle(OrderPlacedEvent event) {
        System.out.printf("Inventory reserved for order %s (amount: %.2f)%n",
                event.orderId(), event.totalAmount());
    }
}

// Wiring and usage
class OrderService {
    private final EventBus eventBus;

    OrderService(EventBus eventBus) {
        this.eventBus = eventBus;
    }

    void placeOrder(String orderId, String customerId, double amount) {
        // core business logic here ...
        eventBus.publish(new OrderPlacedEvent(orderId, customerId, amount));
    }
}

// Main
EventBus bus = new EventBus();
bus.subscribe(OrderPlacedEvent.class, new EmailNotificationHandler());
bus.subscribe(OrderPlacedEvent.class, new InventoryHandler());

OrderService service = new OrderService(bus);
service.placeOrder("ORD-001", "CUST-42", 149.99);
```

## When to use

| Scenario | Use this when... |
|---|---|
| Single caller, single reaction | Direct method call — no indirection needed |
| One subject, multiple observers, tightly scoped | Observer pattern — subject explicitly manages its observer list |
| Multiple producers, multiple consumers, loosely coupled | Event-Driven architecture — decouple via a shared EventBus |
| Side effects must not block the main flow | Asynchronous event dispatch with a thread pool or queue |
| Adding new reactions without modifying existing code | Event-Driven — new handlers register themselves; no existing code changes |
| Strong ordering or exactly-once guarantees needed | Consider a durable message broker (Kafka, RabbitMQ) rather than in-process bus |

## Common interview mistakes

- **Mutating the event object** inside a handler — events must be immutable records of the past; mutating them creates hidden coupling between handlers
- **Confusing Observer and Event-Driven** — Observer ties a concrete subject to its observers; Event-Driven removes that coupling entirely through a bus; interviewers notice when candidates use the terms interchangeably
- **Forgetting error isolation in synchronous dispatch** — one handler throwing an unchecked exception will abort all subsequent handlers; candidates often miss wrapping each dispatch in a try-catch
- **Not discussing async tradeoffs** — jumping straight to async looks sophisticated but skips the conversation about ordering guarantees, error visibility, and testability that interviewers want to hear
- **Using `Object` or raw types for the event** — losing type safety on the handler signature is a red flag; generic `EventHandler<T>` with a typed `subscribe(Class<T>, EventHandler<T>)` demonstrates design discipline
- **No deduplication or idempotency discussion** — in real systems (and senior interviews) candidates are expected to note that async handlers may receive duplicate events and should be idempotent

## Covered by Problems

| Problem | Link |
|---|---|
| Food Delivery System | [→](/docs/lld/problems/food-delivery) |
| Notification Service | [→](/docs/lld/problems/notification-service) |

## Resources

- [Martin Fowler: Domain Events](https://martinfowler.com/eaaDev/DomainEvent.html)
- [Baeldung: Spring Events](https://www.baeldung.com/spring-events)
