---
title: Hotel Booking System
sidebar_label: Hotel Booking System
tags: [lld, machine-coding]
---

# Hotel Booking System

**Difficulty:** Problems | **Track:** LLD

## Problem statement

Design a hotel booking system that allows guests to search for available rooms by type and date range, make and cancel reservations, and process payments. The system should prevent double-booking under concurrent access and apply flexible pricing policies (weekend surcharges, seasonal rates). Check-in and check-out transitions must update room state atomically, and cancellation should trigger refund logic based on how far in advance the cancellation is made.

## Requirements

**Functional:**
- Search rooms by type (Single, Double, Suite) and date range, returning only available options
- Make a reservation that locks availability for the requested dates and records guest details
- Cancel a reservation with a configurable refund policy applied at cancellation time
- Check a guest in (marks room Occupied) and check them out (marks room Available, triggers billing)

**Out of scope:**
- Real-time third-party payment gateway integration (stub `PaymentService`)
- Multi-property / multi-hotel inventory management

## Key classes

```java
// Room hierarchy
abstract class Room {
    String roomId;
    RoomType type;           // SINGLE, DOUBLE, SUITE
    double baseNightlyRate;
    RoomState state;         // AVAILABLE, RESERVED, OCCUPIED, MAINTENANCE
    RoomCalendar calendar;   // date → RoomState map for this room

    abstract double computeRate(LocalDate date, PricingStrategy strategy);
}
class SingleRoom extends Room { /* ... */ }
class DoubleRoom extends Room { /* ... */ }
class SuiteRoom  extends Room { /* ... */ }

// Availability tracking
class RoomCalendar {
    Map<LocalDate, RoomState> dateStateMap;

    boolean isAvailable(LocalDate from, LocalDate to);
    void reserve(LocalDate from, LocalDate to);   // optimistic locking
    void release(LocalDate from, LocalDate to);
}

// Core booking entities
class Reservation {
    String reservationId;
    Guest guest;
    Room room;
    LocalDate checkIn, checkOut;
    ReservationStatus status;  // CONFIRMED, CANCELLED, CHECKED_IN, COMPLETED
    double totalAmount;
}

class Guest {
    String guestId, name, email;
    List<Reservation> history;
}

// Services
interface PricingStrategy {
    double computeNightlyRate(Room room, LocalDate date);
}
class WeekendPricingStrategy  implements PricingStrategy { /* 1.25x Fri-Sat */ }
class SeasonalPricingStrategy implements PricingStrategy { /* peak multiplier */ }

class BookingService {   // Facade
    RoomRepository roomRepo;
    ReservationRepository reservationRepo;
    PaymentService paymentService;
    PricingStrategy pricingStrategy;

    List<Room> searchAvailable(RoomType type, LocalDate from, LocalDate to);
    Reservation makeReservation(Guest guest, String roomId, LocalDate from, LocalDate to);
    void cancelReservation(String reservationId);
    void checkIn(String reservationId);
    void checkOut(String reservationId);
}
```

## Patterns used

- **Strategy**: `PricingStrategy` interface allows plugging in `WeekendPricingStrategy` or `SeasonalPricingStrategy` without touching `BookingService`
- **State**: `Room` moves through `AVAILABLE → RESERVED → OCCUPIED → AVAILABLE` transitions; illegal transitions (e.g., checking in an already-occupied room) throw an exception
- **Observer**: `ReservationObserver` (email, SMS) is notified when reservation status changes to `CONFIRMED` or `CANCELLED`
- **Facade**: `BookingService` is the single entry point that coordinates `RoomCalendar`, `PaymentService`, and repositories — callers never interact with those directly

## Key design decisions

- **`RoomCalendar` per room**: storing a `Map<LocalDate, RoomState>` per room makes availability checks O(1) per date and makes the locking scope small — only the calendar for that specific room needs to be synchronized, not a global table
- **Optimistic locking on reservation**: re-check availability inside a `synchronized(roomCalendar)` block immediately before committing; if the window was taken since the search, throw `RoomNotAvailableException` — avoids pessimistic table-level locks
- **Cancellation policy as a separate Strategy**: separating `CancellationPolicy` from `BookingService` lets you swap "free up to 24h before check-in" vs "no refund" without branching in the main flow
- **Abstract `Room` vs interface**: using an abstract class gives shared fields (`roomId`, `baseNightlyRate`, `calendar`) while still forcing subclasses to implement `computeRate()`, keeping the hierarchy shallow and inspectable

## What the interviewer is looking for

- Recognizing that concurrent reservation is the core correctness challenge, and proposing a per-room lock rather than a global one
- Knowing when to reach for Strategy vs simple if/else — pricing and cancellation policies are natural extension points that interviewers probe
- Clean separation between the domain model (`Room`, `Reservation`, `Guest`) and service-layer orchestration (`BookingService`)
- Calling out what you are intentionally leaving out (payment gateway, multi-hotel) so the interviewer knows your scope is deliberate

## Resources

- [Hello Interview: Hotel Management](https://www.hellointerview.com/learn/code/object-oriented-design/hotel-management)
- [Grokking OOD: Hotel](https://github.com/tssovi/grokking-the-object-oriented-design-interview/blob/master/object-oriented-design-case-studies/design-a-hotel-management-system.md)
