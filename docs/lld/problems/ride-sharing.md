---
title: Ride Sharing System
sidebar_label: Ride Sharing System
tags: [lld, machine-coding]
---

# Ride Sharing System

**Difficulty:** Problems | **Track:** LLD

## Problem statement

Design the object-oriented core of a ride-sharing platform (Uber/Lyft style). A rider submits a trip request with a pickup and drop-off location; the matching service finds an available driver; the driver accepts or rejects the trip; and the trip progresses through a well-defined lifecycle (requested, accepted, in-progress, completed, or cancelled). The system calculates a fare based on the ride category (economy, premium, pool) and notifies both rider and driver at each state transition. The focus is on clean OOD interfaces — not on the real-time infrastructure behind maps or GPS.

## Requirements

**Functional:**
- Rider requests a trip specifying pickup location, destination, and preferred ride category
- System matches the request to an available driver using a pluggable matching strategy
- Trip moves through the lifecycle: `REQUESTED → ACCEPTED → IN_PROGRESS → COMPLETED` (or `CANCELLED` from any pre-completion state)
- Fare is calculated at completion using a pricing engine that varies by category and distance

**Out of scope:**
- Real-time GPS tracking and maps API integration (use stub `Location` objects)
- Surge pricing based on live demand signals (stub a fixed multiplier in `PricingEngine`)

## Key classes

```java
// Actors
class Rider  { String riderId; String name; Location currentLocation; List<Trip> tripHistory; }
class Driver {
    String driverId; String name;
    Location currentLocation;
    DriverStatus status;        // AVAILABLE, ON_TRIP, OFFLINE
    RideCategory vehicleCategory;
    void accept(Trip trip);
    void reject(Trip trip);
}

// Trip and request
class Location  { double latitude, longitude; }

class RideRequest {
    String requestId;
    Rider rider;
    Location pickup, destination;
    RideCategory category;      // ECONOMY, PREMIUM, POOL
    Instant requestedAt;
}

class Trip {
    String tripId;
    RideRequest request;
    Driver driver;
    TripState state;            // delegates behaviour to current TripState impl
    double fare;
    Instant startTime, endTime;

    void transitionTo(TripState newState);
}

// State interface for trip lifecycle
interface TripState {
    void accept(Trip trip, Driver driver);
    void start(Trip trip);
    void complete(Trip trip);
    void cancel(Trip trip);
}
class RequestedState  implements TripState { /* only accept() and cancel() are valid */ }
class AcceptedState   implements TripState { /* only start() and cancel() are valid  */ }
class InProgressState implements TripState { /* only complete() is valid             */ }
class CompletedState  implements TripState { /* all transitions throw                */ }

// Services
interface PricingEngine {
    double calculateFare(Trip trip);
}
class EconomyPricingEngine implements PricingEngine { /* base rate * distance */ }
class PremiumPricingEngine implements PricingEngine { /* higher per-km rate   */ }

class MatchingService {
    PricingEngine pricingEngine;    // injected
    Driver findDriver(RideRequest request);
}

class NotificationService {        // Observer target
    void notifyRider(Rider rider, String message);
    void notifyDriver(Driver driver, String message);
}

class TripManager {
    MatchingService matchingService;
    NotificationService notificationService;
    Map<String, Trip> activeTrips;

    Trip requestTrip(RideRequest request);
    void driverAccepts(String tripId, Driver driver);
    void startTrip(String tripId);
    void completeTrip(String tripId);
    void cancelTrip(String tripId, String cancelledBy);
}
```

## Patterns used

- **Strategy**: `PricingEngine` is an interface; `EconomyPricingEngine`, `PremiumPricingEngine`, and `PoolPricingEngine` are swappable without touching `TripManager`
- **Observer**: `NotificationService` is called from `Trip.transitionTo()` after each state change, decoupling notification logic from the trip lifecycle
- **State**: `TripState` implementations each know which transitions are valid and which throw `InvalidTransitionException`, preventing e.g. completing a not-yet-accepted trip
- **Dependency Injection**: `MatchingService`, `NotificationService`, and `PricingEngine` are injected into `TripManager`, making each independently testable with mocks

## Key design decisions

- **Keep HLD concerns out of scope explicitly**: the interviewer often probes whether you know what to exclude — stub `Location` as a lat/long value object and `MatchingService.findDriver()` as a single method whose internals you explain verbally but don't implement
- **`TripState` vs `TripStatus` enum**: a plain enum requires `switch` chains in `TripManager`; the State pattern moves per-state logic into dedicated classes, so `TripManager` never needs to branch on status
- **`Driver.status` vs `Trip.state` are separate**: a driver's availability (`AVAILABLE/ON_TRIP`) is their own concern — `Trip.state` tracks the trip's lifecycle; they update each other through `TripManager` rather than directly
- **`RideRequest` as a first-class object**: separating the request from the `Trip` lets the matching service operate on the request before a driver is assigned, and preserves the original request data even after the trip is completed or cancelled

## What the interviewer is looking for

- Recognizing the trip lifecycle as a State machine problem rather than a field with if/else branches
- Proposing Strategy for pricing and explaining the extension point clearly
- Scoping correctly: HLD concerns (maps, GPS, WebSockets) are acknowledged but explicitly stubbed
- Clean dependency injection — services are not singletons reached globally; they are passed in so the system is testable

## Resources

- [Hello Interview: Ride Sharing](https://www.hellointerview.com/learn/code/object-oriented-design/ride-sharing)
- [Grokking OOD: Uber](https://github.com/tssovi/grokking-the-object-oriented-design-interview/blob/master/object-oriented-design-case-studies/design-uber.md)
