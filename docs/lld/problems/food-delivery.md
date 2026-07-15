---
title: Food Delivery System
sidebar_label: Food Delivery System
tags: [lld, machine-coding]
---

# Food Delivery System

**Difficulty:** Hard | **Track:** LLD

## Problem statement

Design a food delivery system (like Swiggy/Zomato) that coordinates state across three actors: customer, restaurant, and delivery partner. A customer places an order, the restaurant accepts or rejects it, and the nearest available delivery partner is assigned once the order is ready. Every state transition must be reflected to the customer in real-time.

## Requirements

**Functional:**
- Customer places an order; restaurant must accept or reject within 5 minutes or it auto-cancels
- Restaurant marks order ready; system immediately assigns the nearest available delivery partner
- Delivery partner picks up the order and marks it delivered; each transition notifies the customer
- Support order cancellation by the customer before the restaurant has accepted
- Calculate delivery fee based on distance between restaurant and customer, with surge pricing support
- Track delivery partner availability (AVAILABLE, ASSIGNED, DELIVERING) and update it on each assignment or delivery

**Out of scope:**
- Menu management and item catalog updates
- Payment gateway integration and refund flows
- GPS routing algorithm and turn-by-turn navigation

## Key classes

```java
public enum OrderStatus {
    PLACED, ACCEPTED, PREPARING, READY, ASSIGNED, PICKED_UP, DELIVERED, CANCELLED;

    public OrderStatus transition(OrderStatus next) {
        // validate legal transitions, throw IllegalStateException on invalid
        return next;
    }
}

public enum DeliveryPartnerStatus { AVAILABLE, ASSIGNED, DELIVERING }

public record Location(double lat, double lng) {}

public record OrderItem(String menuItem, int quantity, double price) {}

public class Order {
    private final String id;
    private final Customer customer;
    private final Restaurant restaurant;
    private final List<OrderItem> items;
    private OrderStatus status;
    private DeliveryPartner deliveryPartner;
    private final Instant placedAt;
    private double totalAmount;

    public void updateStatus(OrderStatus next) { this.status = status.transition(next); }
    public void assignPartner(DeliveryPartner partner) { this.deliveryPartner = partner; }
    public OrderStatus getStatus() { return status; }
}

public class Restaurant {
    private final String id;
    private final String name;
    private final Location location;

    public void acceptOrder(Order order) { order.updateStatus(OrderStatus.ACCEPTED); }
    public void rejectOrder(Order order) { order.updateStatus(OrderStatus.CANCELLED); }
    public void markReady(Order order)   { order.updateStatus(OrderStatus.READY); }
}

public class DeliveryPartner {
    private final String id;
    private final String name;
    private Location location;
    private DeliveryPartnerStatus status;

    public void markAssigned()   { this.status = DeliveryPartnerStatus.ASSIGNED; }
    public void markDelivering() { this.status = DeliveryPartnerStatus.DELIVERING; }
    public void markAvailable()  { this.status = DeliveryPartnerStatus.AVAILABLE; }
}

// Domain events (Java records)
public record OrderPlacedEvent(Order order)                              implements DomainEvent {}
public record OrderAcceptedEvent(Order order)                            implements DomainEvent {}
public record OrderReadyEvent(Order order)                               implements DomainEvent {}
public record PartnerAssignedEvent(Order order, DeliveryPartner partner) implements DomainEvent {}

public interface EventHandler<E extends DomainEvent> { void handle(E event); }

public class EventBus {
    public <E extends DomainEvent> void publish(E event) { /* dispatch to subscribers */ }
    public <E extends DomainEvent> void subscribe(Class<E> type, EventHandler<E> handler) {}
}

public interface FeeCalculator {
    double calculate(Location from, Location to, double subtotal);
}

public class DistanceBasedFeeCalculator implements FeeCalculator { /* base + per-km rate */ }
public class SurgeFeeCalculator           implements FeeCalculator { /* wraps another calculator, applies multiplier */ }

public class DeliveryAssignmentService {
    public Optional<DeliveryPartner> findNearestAvailablePartner(Location pickup) { return Optional.empty(); }
}
```

## Patterns used

- **State**: `OrderStatus.transition()` encodes the legal state machine for the order lifecycle across all three actors, preventing illegal jumps like PLACED -> DELIVERED.
- **Event-Driven**: Domain events (`OrderReadyEvent`, `PartnerAssignedEvent`, etc.) decouple the restaurant, assignment service, and notification service so neither depends on the other directly.
- **Observer**: `EventBus` subscribers (`CustomerNotificationHandler`, `AssignmentHandler`) react to events without being called explicitly by the emitting code.
- **Strategy**: `FeeCalculator` is an interface with flat, distance-based, and surge implementations swappable at runtime without changing callers.
- **Factory**: The partner assignment strategy (nearest, load-balanced, zone-based) can be injected into `DeliveryAssignmentService` via a factory, making it easy to A/B test algorithms.

## Key design decisions

- **Multi-actor state machine on a single Order**: Rather than separate state machines per actor, `OrderStatus` is the single source of truth. Each actor calls `order.updateStatus()`, and the enum enforces valid transitions, making illegal states unrepresentable.
- **Domain events over direct service calls**: When an order moves to READY, publishing `OrderReadyEvent` keeps `DeliveryAssignmentService` decoupled from `Restaurant`. Adding SMS, analytics, or fraud checks later means adding subscribers, not editing existing code.
- **Auto-cancel via scheduled task**: The 5-minute restaurant acceptance window is implemented as a scheduled job that publishes an `OrderExpiredEvent` rather than blocking a thread, keeping the flow non-blocking and easy to test with fake clocks.
- **Decorator for surge pricing**: `SurgeFeeCalculator` wraps any `FeeCalculator` and applies a multiplier, so surge logic is composable and does not leak into the base calculators.
- **Delivery partner location as snapshot**: Partner location is stored at assignment time (not streamed continuously) to avoid a real-time GPS dependency; this is explicitly noted as an accepted trade-off since GPS routing is out of scope.

## What the interviewer is looking for

- **State machine correctness**: Can you enumerate all valid transitions and prevent illegal ones with a clean abstraction rather than scattered `if/else` checks?
- **Decoupled actor coordination**: Do you avoid tight coupling between restaurant, assignment, and notification by using events or a mediator, instead of chaining direct method calls?
- **Extensibility of fee calculation**: Is the pricing logic isolated behind a Strategy interface so surge, distance, and flat-rate variants can coexist without conditional branching?
- **Handling the 5-minute timeout**: Do you propose a non-blocking mechanism (scheduler, delayed event) rather than a blocking sleep, and can you explain how you would test it?
- **Concurrency awareness**: Can you identify the race condition where two threads might assign the same partner and describe how optimistic locking or an atomic CAS on partner status would resolve it?

## Resources

- [Martin Fowler: Domain Events](https://martinfowler.com/eaaDev/DomainEvent.html)
