---
title: Behavioral Patterns — Observer & Strategy
sidebar_label: Observer & Strategy
tags: [lld, patterns]
---

# Behavioral Patterns — Observer & Strategy

> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Observer and Strategy are the two behavioral patterns that appear most often in LLD system design rounds. Observer is the backbone of event-driven systems, notification frameworks, and reactive UIs. Strategy is how you avoid long if-else chains when business rules need to change at runtime. Naming these patterns quickly and sketching the interface correctly is a strong differentiator.

## Core concepts

**Observer** (publish-subscribe) decouples event producers from consumers. A *subject* maintains a list of *observers* and calls a `notify()` (or `update()`) method on each when its state changes. Observers register and deregister at runtime.

- **Push model**: subject passes event data directly in the notify call.
- **Pull model**: subject passes itself (or minimal context); observer calls back to fetch what it needs.

**Strategy** encapsulates a family of interchangeable algorithms behind a common interface. The client holds a reference to a `Strategy` and can swap it at runtime without any conditional logic.

Key distinction: Observer is about *who to tell*; Strategy is about *how to do it*.

## Code example

```java
// ── OBSERVER: Parking Lot spot availability ───────────────────────────────────

interface ParkingObserver {
    void onSpotAvailable(String spotId);
}

class ParkingLot {
    private final List<ParkingObserver> observers = new ArrayList<>();
    private final Set<String> availableSpots = new HashSet<>();

    void addObserver(ParkingObserver o)    { observers.add(o); }
    void removeObserver(ParkingObserver o) { observers.remove(o); }

    void freeSpot(String spotId) {
        availableSpots.add(spotId);
        observers.forEach(o -> o.onSpotAvailable(spotId));  // push notification
    }
}

class MobileAppNotifier implements ParkingObserver {
    public void onSpotAvailable(String spotId) {
        System.out.println("Push notification: spot " + spotId + " is free");
    }
}

class DisplayBoard implements ParkingObserver {
    public void onSpotAvailable(String spotId) {
        System.out.println("Board updated: " + spotId + " available");
    }
}

// ── STRATEGY: Pricing ─────────────────────────────────────────────────────────

interface PricingStrategy {
    double calculate(double basePrice);
}

class StandardPricing  implements PricingStrategy {
    public double calculate(double base) { return base; }
}

class PeakHourPricing  implements PricingStrategy {
    public double calculate(double base) { return base * 1.5; }
}

class DiscountPricing  implements PricingStrategy {
    private final double discountPct;
    DiscountPricing(double pct) { this.discountPct = pct; }
    public double calculate(double base) { return base * (1 - discountPct / 100); }
}

class OrderPricer {
    private PricingStrategy strategy;

    void setStrategy(PricingStrategy s) { this.strategy = s; }   // swap at runtime

    double getPrice(double base) { return strategy.calculate(base); }
}
```

## When to use

| Situation | Pattern |
|---|---|
| Multiple components must react when one object changes state | Observer |
| You want to decouple the event source from its consumers | Observer |
| The set of listeners can change at runtime (subscribe/unsubscribe) | Observer |
| Business rules vary per customer, time of day, or feature flag | Strategy |
| You have a growing if/else or switch on algorithm type | Strategy |
| You want to unit-test each algorithm in isolation | Strategy |

**Decision shortcut**: "If you need to notify multiple components of state changes, that's Observer. If you need to swap algorithms at runtime, that's Strategy."

## Common interview mistakes

- **Forgetting unsubscribe / memory leaks**: Always mention that observers should be removable. Interviewers ask "what happens when the user logs out?" — you need `removeObserver`.
- **Conflating Observer with Event Bus**: They're related but not identical. An EventBus is a global broker; classic Observer has a direct subject-observer relationship. Know when to use which.
- **Hardcoding the algorithm in the context class**: The whole point of Strategy is that the context should *not* know which algorithm runs. If you have `if (strategy == "peak") { ... }` in the context, you've missed the pattern.
- **Making Strategy stateless when it needs state**: `DiscountPricing` above holds a `discountPct` field. Strategy objects can be stateful — don't strip out constructor parameters to keep things "simple."

## Covered by Problems

| Problem | Link |
|---|---|
| Ride Sharing System | [→](/docs/lld/problems/ride-sharing) |
| Parking Lot System | [→](/docs/lld/problems/parking-lot) |
| Library Management System | [→](/docs/lld/problems/library-management) |

## Resources

- [Refactoring.Guru: Observer](https://refactoring.guru/design-patterns/observer)
- [Refactoring.Guru: Strategy](https://refactoring.guru/design-patterns/strategy)
- [ArjanCodes: Observer Pattern Tutorial](https://www.youtube.com/watch?v=oNalXg67XEE)
