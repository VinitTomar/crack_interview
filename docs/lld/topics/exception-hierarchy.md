---
title: Exception Hierarchy Design
sidebar_label: Exception Hierarchy Design
tags: [lld, applied-design]
---

# Exception Hierarchy Design
> **Level**: Applied Design | **Track**: Low Level Design

## Why it matters in interviews

Exception hierarchy questions appear in LLD rounds when designing systems like booking engines, ATMs, or payment services — anywhere failure modes need to be modelled explicitly. Companies like Google, Uber, and Atlassian use this to test whether you understand the difference between recoverable domain errors and programming bugs. Getting it right signals that your API communicates intent clearly and forces callers to handle failures they can actually recover from.

## Core concepts

- **Checked exceptions** (`extends Exception`): the caller must handle or declare them; use when the condition is recoverable and the caller can meaningfully act on it (e.g., seat unavailable, file not found)
- **Unchecked exceptions** (`extends RuntimeException`): signal programming errors that should not be caught in normal flow; let them propagate (e.g., null argument, illegal state)
- **Custom hierarchy**: create a domain base exception (e.g., `BookingException`) and subclass it for specific failure modes (`SeatUnavailableException`, `InvalidDateRangeException`) so callers can catch broadly or narrowly
- **Fail-fast**: validate at boundaries — constructors and public method entry points — throw `IllegalArgumentException` immediately rather than allowing corrupt state to propagate
- **Exception message quality**: always include the bad value and the constraint violated (e.g., `"Requested date 2024-01-15 is before today 2024-07-15"`) so logs are actionable without a debugger
- **Never swallow exceptions**: catching and ignoring hides bugs; always log and re-throw, or convert to a typed domain exception with the original as the cause

## Code example

```java
// --- Exception hierarchy ---

public class BookingException extends Exception {
    public BookingException(String message) {
        super(message);
    }
    public BookingException(String message, Throwable cause) {
        super(message, cause);
    }
}

public class SeatUnavailableException extends BookingException {
    private final String seatId;

    public SeatUnavailableException(String seatId) {
        super("Seat '" + seatId + "' is no longer available.");
        this.seatId = seatId;
    }

    public String getSeatId() { return seatId; }
}

public class InvalidDateRangeException extends BookingException {
    public InvalidDateRangeException(LocalDate checkIn, LocalDate checkOut) {
        super("Check-out date " + checkOut + " must be after check-in date " + checkIn + ".");
    }
}

// --- Service that throws typed exceptions ---

public class BookingService {

    private final SeatRepository seatRepository;

    public BookingService(SeatRepository seatRepository) {
        if (seatRepository == null) {
            throw new IllegalArgumentException("seatRepository must not be null");
        }
        this.seatRepository = seatRepository;
    }

    public Booking reserve(String seatId, LocalDate checkIn, LocalDate checkOut)
            throws SeatUnavailableException, InvalidDateRangeException {

        if (!checkOut.isAfter(checkIn)) {
            throw new InvalidDateRangeException(checkIn, checkOut);
        }

        Seat seat = seatRepository.findById(seatId)
                .orElseThrow(() -> new SeatUnavailableException(seatId));

        if (!seat.isAvailable(checkIn, checkOut)) {
            throw new SeatUnavailableException(seatId);
        }

        return seatRepository.save(new Booking(seat, checkIn, checkOut));
    }
}

// --- Caller handling exceptions separately ---

public class BookingController {

    public void handleReservation(String seatId, LocalDate checkIn, LocalDate checkOut) {
        try {
            Booking booking = bookingService.reserve(seatId, checkIn, checkOut);
            System.out.println("Booking confirmed: " + booking.getId());
        } catch (SeatUnavailableException e) {
            System.out.println("Seat not available: " + e.getSeatId() + ". Please choose another.");
        } catch (InvalidDateRangeException e) {
            System.out.println("Invalid dates: " + e.getMessage());
        } catch (BookingException e) {
            // Catch-all for any future BookingException subclasses
            System.out.println("Booking failed: " + e.getMessage());
        }
    }
}
```

## When to use

| Scenario | Use this when... |
|---|---|
| Caller can retry or choose an alternative | Checked exception — forces the caller to handle it explicitly |
| Condition is a domain rule violation (seat full, date invalid) | Checked exception subclassing a domain base exception |
| Input violates a contract the caller controls (null, negative count) | Unchecked `IllegalArgumentException` — caller should have validated |
| Object is in an illegal state due to a coding bug | Unchecked `IllegalStateException` — not recoverable at runtime |
| Wrapping a third-party checked exception you cannot recover from | Wrap in an unchecked exception, pass original as cause |
| Multiple distinct failure modes need separate handling | Subclass hierarchy so callers can catch narrowly or broadly |

## Common interview mistakes

- Extending `Exception` for everything, even programming errors — forces callers to write pointless try-catch boilerplate that swallows real bugs
- Throwing a raw `Exception` or `RuntimeException` with a plain string message, losing type information the caller could act on
- Catching `BookingException` at the top of a method and ignoring it silently, making failures invisible in production logs
- Forgetting to chain the original cause when wrapping exceptions, breaking the stack trace
- Writing exception messages without the bad value (e.g., `"Invalid date"` instead of `"Check-out 2024-01-10 must be after check-in 2024-01-15"`)
- Designing a flat exception structure with no base class, making it impossible for callers to handle all domain errors in one catch block

## Covered by Problems

| Problem | Link |
|---|---|
| ATM Machine | [→](/docs/lld/problems/atm-machine) |
| Hotel Booking System | [→](/docs/lld/problems/hotel-booking) |

## Resources

- [Baeldung: Custom Exceptions](https://www.baeldung.com/java-new-custom-exception)
- [Baeldung: Checked vs Unchecked](https://www.baeldung.com/java-checked-unchecked-exceptions)
