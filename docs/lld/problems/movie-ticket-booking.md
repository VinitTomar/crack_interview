---
title: Movie Ticket Booking (BookMyShow)
sidebar_label: Movie Ticket Booking (BookMyShow)
tags: [lld, machine-coding]
---

# Movie Ticket Booking (BookMyShow)

**Difficulty:** Hard | **Track:** LLD

## Problem statement

Design a concurrent movie ticket booking system that prevents double-booking under simultaneous seat selection. Users can browse movies and shows, select seats, and complete payment within a time-limited checkout window. The system must safely coordinate multiple users attempting to book the same seats at the same time without race conditions.

## Requirements

**Functional:**
- Browse movies, theatres, and available shows by date and location
- Select 1-6 seats for a show; seats may be contiguous or user-chosen
- Lock selected seats for 10 minutes during checkout to prevent double-booking
- Support seat categories: STANDARD, PREMIUM, and RECLINER with different base prices
- Confirm booking upon successful payment and release the seat lock
- Release seat locks automatically if payment fails or the checkout window times out

**Out of scope:**
- Theatre owner admin panel for managing screens and show schedules
- Loyalty points, offers, or promotional discount codes
- Seat map rendering and visual layout of the auditorium

## Key classes

```java
public enum SeatStatus {
    AVAILABLE, LOCKED, BOOKED;

    public SeatStatus transition(SeatStatus next) {
        // enforce valid transitions: AVAILABLE->LOCKED, LOCKED->BOOKED, LOCKED->AVAILABLE
    }
}

public enum SeatCategory {
    STANDARD(200), PREMIUM(350), RECLINER(500);

    private final int basePrice;
    SeatCategory(int basePrice) { this.basePrice = basePrice; }
    public int getBasePrice() { return basePrice; }
}

public class Seat {
    private String id;
    private int row, col;
    private SeatCategory category;
    private volatile SeatStatus status;
    private String lockedBy;       // bookingId holding the lock
    private Instant lockExpiry;
}

public class Show {
    private String id;
    private Movie movie;
    private Theatre theatre;
    private LocalDateTime dateTime;
    private Map<String, Seat> seats; // seatId -> Seat
}

public class Booking {
    private String id;
    private Show show;
    private List<Seat> seats;
    private User user;
    private BookingStatus status;
    private double totalAmount;
    private Instant expiryTime;

    public static class Builder {
        public Builder show(Show show) { ... }
        public Builder seats(List<Seat> seats) { ... }
        public Builder user(User user) { ... }
        public Booking build() { ... }
    }
}

public interface PricingStrategy {
    double calculate(List<Seat> seats, Show show);
}

public class StandardPricingStrategy implements PricingStrategy {
    public double calculate(List<Seat> seats, Show show) { ... }
}

public interface PaymentService {
    PaymentResult charge(User user, double amount, String bookingId);
    void refund(String bookingId);
}

public class BookingService {
    private final ConcurrentHashMap<String, ReentrantLock> seatLocks;
    private final ScheduledExecutorService expiryScheduler;
    private final PricingStrategy pricingStrategy;
    private final PaymentService paymentService;

    // acquires per-seat locks in sorted order to prevent deadlock
    public Booking selectSeats(Show show, List<String> seatIds, User user)
            throws SeatsUnavailableException { ... }

    public Booking confirmBooking(String bookingId) throws PaymentException { ... }

    public void cancelBooking(String bookingId) { ... }

    // scheduled task: scan and release expired locks
    private void releaseExpiredLocks() { ... }
}
```

## Patterns used

- **State** (SeatStatus): models the AVAILABLE -> LOCKED -> BOOKED lifecycle with enforced legal transitions, preventing invalid state jumps.
- **Strategy** (PricingStrategy): decouples pricing logic from booking flow, allowing dynamic/surge pricing to be swapped in without changing BookingService.
- **Builder** (Booking.Builder): constructs the Booking object step-by-step, keeping the constructor clean and making optional fields explicit.
- **Observer** (booking confirmation): downstream services (email, push notification) subscribe to booking confirmed/cancelled events without coupling to BookingService.
- **Command** (Booking as command): each Booking encapsulates the operation and its rollback (seat release), enabling clean cancellation and lock expiry handling.

## Key design decisions

- **Per-seat ReentrantLock in a ConcurrentHashMap**: finer granularity than a show-level lock means unrelated seats in the same show do not contend, improving throughput significantly under load.
- **Lock ordering by sorted seat ID to prevent deadlock**: when acquiring multiple seat locks, threads always lock in the same canonical order, eliminating circular-wait conditions.
- **tryLock with timeout instead of blocking lock()**: a thread that cannot acquire all seats within the timeout fails fast and releases any already-acquired locks, avoiding indefinite blocking.
- **10-minute logical lock with scheduled expiry cleanup**: separates the user-facing checkout window (10 min) from physical lock acquisition, so JVM-level locks are held only during the critical section while the logical reservation is tracked in the Seat object.
- **Volatile SeatStatus + lock-protected writes**: reads of seat status are cheap and visible across threads; all writes occur inside the ReentrantLock critical section, preserving consistency without full synchronization on reads.

## What the interviewer is looking for

- Correct concurrent seat reservation with no double-booking under high contention — the core correctness requirement of the problem.
- Deadlock prevention strategy: demonstrating awareness of lock ordering or lock-free alternatives when acquiring multiple locks simultaneously.
- Clean separation of lock expiry (ScheduledExecutorService) from the booking flow, rather than inline expiry checks that create race windows.
- Use of appropriate Java concurrency primitives (ConcurrentHashMap, ReentrantLock, tryLock) rather than coarse synchronized blocks or application-level mutexes.
- Extensibility of the pricing model and payment handling via interfaces, showing the design can evolve without touching core booking logic.

## Resources

- [Mike Swift: Introduction to Concurrency](https://www.youtube.com/watch?v=iKtvNJQoCNw)
