---
title: Parking Lot System
sidebar_label: Parking Lot System
tags: [lld, machine-coding]
---

# Parking Lot System

**Difficulty:** Problems | **Track:** LLD

## Problem statement

Design a multi-floor parking lot system that manages vehicle entry, spot assignment, and exit payment. The lot supports three vehicle types — motorcycle, car, and truck — each requiring a differently sized spot. On entry the system issues a ticket, assigns the nearest available compatible spot, and on exit calculates the fee based on duration and vehicle type.

## Requirements

**Functional:**
- Support multiple floors, each with a configurable mix of motorcycle, compact, and large spots.
- Accept motorcycles, cars, and trucks; each vehicle type fits only in spots of the appropriate size or larger.
- Issue a ticket on entry and calculate the parking fee on exit based on vehicle type and duration.
- Expose a real-time availability display showing free spots per floor and spot type.

**Out of scope:**
- Online pre-booking or reservation of spots.
- Payment gateway integration (assume cash/card is handled externally).

## Key classes

```java
// Spot hierarchy
abstract class ParkingSpot {
    String spotId; SpotType type; boolean occupied;
    abstract boolean canFitVehicle(Vehicle v);
    void assignVehicle(Vehicle v) { ... }
    void removeVehicle() { ... }
}
class MotorcycleSpot extends ParkingSpot { ... }
class CompactSpot  extends ParkingSpot { ... }
class LargeSpot    extends ParkingSpot { ... }

// Vehicle hierarchy
abstract class Vehicle { String licensePlate; VehicleType type; }
class Motorcycle extends Vehicle { ... }
class Car        extends Vehicle { ... }
class Truck      extends Vehicle { ... }

// Core domain
class ParkingFloor {
    int floorNumber;
    List<ParkingSpot> spots;
    Optional<ParkingSpot> findNearestAvailable(VehicleType type) { ... }
}
class ParkingLot {                          // Singleton
    List<ParkingFloor> floors;
    Ticket issueTicket(Vehicle v) { ... }
    Receipt processExit(Ticket t) { ... }
}
class Ticket { String ticketId; Vehicle vehicle; ParkingSpot spot; Instant entryTime; }
interface FeeCalculator { double calculate(Ticket t, Instant exitTime); }
class HourlyFeeCalculator implements FeeCalculator { ... }  // Strategy impl
class PaymentService { Receipt charge(Ticket t, PaymentMethod m) { ... } }
```

## Patterns used

- **Factory Method**: `VehicleFactory` and `SpotFactory` decouple creation logic from the core `ParkingLot`, making it easy to add new vehicle or spot types without touching assignment logic.
- **Strategy**: `FeeCalculator` is an interface; swapping in `HourlyFeeCalculator`, `FlatRateFeeCalculator`, or `WeekendFeeCalculator` requires no changes to `PaymentService`.
- **Observer**: `ParkingSpot` notifies a `AvailabilityBoard` observer whenever its `occupied` flag changes, keeping the display in sync without polling.
- **State**: Each `ParkingSpot` transitions through `AVAILABLE → OCCUPIED → (optionally) RESERVED` states, enforced by the state machine rather than scattered boolean checks.

## Key design decisions

- **Spot sizing hierarchy**: A truck requires a `LargeSpot`; a car fits `CompactSpot` or `LargeSpot`; a motorcycle fits any. Encoding this in `canFitVehicle()` on each spot subclass keeps assignment logic simple and extensible.
- **Singleton `ParkingLot`**: The lot itself is a natural Singleton because all floors and global spot counts are owned by one authoritative object; floor-level state is delegated down to `ParkingFloor`.
- **Ticket as a value object**: The `Ticket` captures the snapshot of entry time and assigned spot. Exit calculation only needs the ticket plus the current time — no mutable shared state is needed.
- **Strategy over switch/if for fees**: Pricing rules change frequently (peak hours, EV discount, monthly pass). Encapsulating each rule as a `FeeCalculator` implementation means new rules are added without modifying existing ones (Open/Closed Principle).

## What the interviewer is looking for

- Clean separation between spot types, vehicle types, and the assignment algorithm — no fat conditionals like `if vehicle == "truck"`.
- Correct use of polymorphism: `canFitVehicle()` on the spot, not in the lot's assignment loop.
- Awareness of thread safety: `findNearestAvailable` + `assignVehicle` must be atomic to prevent double-assignment under concurrent entry.
- Extensibility discussion: how would you add EV charging spots or monthly pass pricing without rewriting the core?

## Resources

- [Hello Interview: Parking Lot](https://www.hellointerview.com/learn/code/object-oriented-design/parking-lot)
- [Grokking OOD: Parking Lot](https://github.com/tssovi/grokking-the-object-oriented-design-interview/blob/master/object-oriented-design-case-studies/design-a-parking-lot.md)
