---
title: Functional Java Patterns
sidebar_label: Functional Java Patterns
tags: [lld, applied-design]
---

# Functional Java Patterns
> **Level**: Applied Design | **Track**: Low Level Design

## Why it matters in interviews

Interviewers at companies like Uber, Lyft, and Amazon routinely ask candidates to implement filtering, aggregation, and sorting logic on domain objects — and writing imperative for-loops instead of streams signals unfamiliarity with modern Java. This topic directly answers questions like "filter and rank rides by fare" or "group tasks by priority." It demonstrates that you can write concise, readable production code rather than verbose procedural logic.

## Core concepts

- **Stream pipeline**: `filter → map → sorted → collect` — the backbone of declarative data processing
- **`Collectors.groupingBy`** for aggregations: group domain objects by a field (e.g. rides by status, tasks by assignee)
- **Optional chaining**: use `.map()` to transform a value instead of null checks; use `.orElseThrow()` at service boundaries to surface missing data explicitly
- **Functional interfaces**: `Function<T,R>` (transform), `Predicate<T>` (test), `Supplier<T>` (produce), `Consumer<T>` (act), `BiFunction<T,U,R>` (combine two inputs)
- **Method references**: prefer `Class::method` and `instance::method` over verbose lambda bodies when the mapping is a direct delegation
- **`Comparator.comparing().thenComparing()`** for multi-field sorting without writing manual comparison logic
- **`Stream.reduce()`** for aggregation: fold a stream into a single value (e.g. total fare, max duration)
- Writing for-loops when streams apply is a red flag in modern interviews — it signals you are not fluent in Java 8+

## Code example

```java
import java.util.*;
import java.util.stream.*;

public class RideService {

    enum Status { COMPLETED, CANCELLED, IN_PROGRESS }

    record Ride(String id, String driverId, Status status, double fare) {}

    private final List<Ride> rides;

    public RideService(List<Ride> rides) {
        this.rides = rides;
    }

    // Filter completed rides, grouped by driver
    public Map<String, List<Ride>> completedRidesByDriver() {
        return rides.stream()
            .filter(r -> r.status() == Status.COMPLETED)
            .collect(Collectors.groupingBy(Ride::driverId));
    }

    // Top 3 completed rides by fare (descending)
    public List<Ride> topThreeByFare() {
        return rides.stream()
            .filter(r -> r.status() == Status.COMPLETED)
            .sorted(Comparator.comparingDouble(Ride::fare).reversed())
            .limit(3)
            .collect(Collectors.toList());
    }

    // Total fare across all completed rides
    public double totalCompletedFare() {
        return rides.stream()
            .filter(r -> r.status() == Status.COMPLETED)
            .mapToDouble(Ride::fare)
            .sum();
    }

    // Find a specific ride by id — Optional at the boundary
    public Ride findById(String rideId) {
        return rides.stream()
            .filter(r -> r.id().equals(rideId))
            .findFirst()
            .orElseThrow(() -> new NoSuchElementException("Ride not found: " + rideId));
    }

    // Utility: apply a fare discount using Function composition
    public List<Ride> applyDiscount(Predicate<Ride> eligible, double discountPct) {
        Function<Ride, Ride> applyFare =
            r -> new Ride(r.id(), r.driverId(), r.status(), r.fare() * (1 - discountPct));
        return rides.stream()
            .map(r -> eligible.test(r) ? applyFare.apply(r) : r)
            .collect(Collectors.toList());
    }
}
```

## When to use

| Scenario | Use this when... |
|---|---|
| Iterating a list to build a new filtered list | Use `stream().filter().collect()` instead of a for-loop with an `if` and `add` |
| Iterating a list to transform each element | Use `stream().map().collect()` instead of a for-loop with a new list |
| Building a `Map<Key, List<Value>>` from a list | Use `Collectors.groupingBy()` instead of a for-loop with `computeIfAbsent` |
| Sorting by one field, then a second as a tiebreaker | Use `Comparator.comparing().thenComparing()` instead of a manual `Comparator` |
| Returning the first match or throwing if absent | Use `findFirst().orElseThrow()` instead of a loop with a null-return and a null check at the call site |
| Accumulating a sum, max, or count over a collection | Use `mapToDouble().sum()`, `reduce()`, or `Collectors.counting()` instead of a running accumulator variable |

## Common interview mistakes

- Writing an explicit for-loop for filtering or mapping when a one-liner stream would do — interviewers notice this immediately as a fluency gap
- Calling `.get()` on an `Optional` without checking `.isPresent()` first — use `.orElseThrow()` or `.orElse()` instead
- Collecting to a list with `Collectors.toList()` and then sorting the result separately — sort inside the pipeline before collecting
- Using `Stream.forEach()` with side effects (mutating external state) instead of `collect()` — forEach is for terminal side effects like logging, not for building results
- Forgetting that streams are lazy and single-use — trying to reuse a consumed stream throws `IllegalStateException`
- Ignoring `Comparator.reversed()` and writing a manual negation lambda like `(a, b) -> Double.compare(b.fare(), a.fare())` — the built-in form is clearer and less error-prone

## Covered by Problems

| Problem | Link |
|---|---|
| Ride Sharing System | [→](/docs/lld/problems/ride-sharing) |
| Task Management System | [→](/docs/lld/problems/task-management) |

## Resources

- [Baeldung: Java 8 Streams](https://www.baeldung.com/java-8-streams)
- [Baeldung: Functional Interfaces](https://www.baeldung.com/java-8-functional-interfaces)
- [Baeldung: Java Optional](https://www.baeldung.com/java-optional)
