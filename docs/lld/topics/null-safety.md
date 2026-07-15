---
title: Null Safety & Null Object Pattern
sidebar_label: Null Safety & Null Object Pattern
tags: [lld, fundamentals]
---

# Null Safety & Null Object Pattern
> **Level**: Fundamentals | **Track**: Low Level Design

## Why it matters in interviews

Null-related bugs are among the most common causes of production failures, so interviewers use design questions to check whether you eliminate null at API boundaries rather than scatter null checks throughout call sites. Companies like Google, Amazon, and Meta ask variants of this when reviewing service or repository layers. Handling null correctly signals defensive design thinking and familiarity with modern Java idioms.

## Core concepts

- **Null Object pattern**: return a no-op object that implements the same interface instead of null, so callers never need to null-check
- **Java `Optional<T>`**: explicitly model the possible absence of a value in the type system, making it impossible for callers to ignore the missing case
- **Never call `Optional.get()` without `isPresent()`**: prefer `map`, `orElse`, `orElseGet`, or `orElseThrow` to chain safely and express intent
- **Design APIs that cannot return null**: return empty collections (`List.of()`, `Collections.emptyList()`) instead of `null`; use `Optional` for single nullable values
- **Fail-fast on invalid input**: validate constructor parameters immediately and throw `IllegalArgumentException` or `NullPointerException` with a clear message rather than propagating null silently

## Code example

```java
// --- Null Object Pattern: Logger ---

interface Logger {
    void log(String message);
}

class ConsoleLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println("[LOG] " + message);
    }
}

// Null Object — safe no-op, callers never receive null
class NullLogger implements Logger {
    private static final NullLogger INSTANCE = new NullLogger();

    private NullLogger() {}

    public static NullLogger getInstance() { return INSTANCE; }

    @Override
    public void log(String message) { /* intentionally empty */ }
}

class LoggerFactory {
    public static Logger getLogger(String name) {
        if (name == null || name.isBlank()) {
            return NullLogger.getInstance(); // never return null
        }
        return new ConsoleLogger();
    }
}

// --- Optional<T>: Order lookup ---

class Order {
    private final String id;
    private final double total;

    public Order(String id, double total) {
        if (id == null || id.isBlank()) throw new IllegalArgumentException("id must not be null or blank");
        if (total < 0)                  throw new IllegalArgumentException("total must be non-negative");
        this.id    = id;
        this.total = total;
    }

    public String getId()    { return id; }
    public double getTotal() { return total; }
}

class OrderRepository {
    private final Map<String, Order> store = new HashMap<>();

    public void save(Order order) {
        Objects.requireNonNull(order, "order must not be null");
        store.put(order.getId(), order);
    }

    // Return Optional — never null
    public Optional<Order> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }
}

class OrderService {
    private final OrderRepository repo;
    private final Logger logger;

    public OrderService(OrderRepository repo, Logger logger) {
        this.repo   = Objects.requireNonNull(repo,   "repo must not be null");
        this.logger = Objects.requireNonNull(logger, "logger must not be null");
    }

    public double getTotalForOrder(String id) {
        return repo.findById(id)
                   .map(Order::getTotal)
                   .orElseThrow(() -> new IllegalArgumentException("Order not found: " + id));
    }
}
```

## When to use

| Scenario | Use this when... |
|---|---|
| Null Object pattern | A dependency (logger, handler, strategy) is optional and the calling code should work unchanged whether it is configured or not |
| `Optional<T>` | A repository or service may legitimately find no result for a given query and the caller must decide what to do about absence |
| Empty collection return | A method returns multiple results; absence of results is a normal state, not an error |
| `Objects.requireNonNull` | You want to fail-fast at object construction or method entry rather than propagate a null through several layers |
| Checked presence before use | You have an `Optional` and need to branch on whether a value exists — prefer `ifPresent` / `map` over `isPresent` + `get` |

## Common interview mistakes

- Returning `null` from a method that could instead return an empty `Optional` or an empty collection, forcing every caller to defensively null-check
- Calling `optional.get()` directly without first confirming `optional.isPresent()`, which throws `NoSuchElementException` and defeats the purpose of `Optional`
- Creating a Null Object that silently swallows errors it should surface, making bugs invisible in production
- Using `Optional` as a field type or method parameter rather than limiting it to return types, which adds unnecessary wrapping overhead and is considered an anti-pattern in the Java community
- Forgetting to validate constructor parameters, allowing a corrupt object to travel deep into the system before a `NullPointerException` surfaces far from the root cause
- Conflating "no result" (a valid business state that warrants `Optional`) with an actual error condition that should throw an exception

## Covered by Problems

| Problem | Link |
|---|---|
| Parking Lot System | [→](/docs/lld/problems/parking-lot) |

## Resources

- [Refactoring.Guru: Null Object](https://refactoring.guru/introduce-null-object)
- [Baeldung: Java Optional](https://www.baeldung.com/java-optional)
