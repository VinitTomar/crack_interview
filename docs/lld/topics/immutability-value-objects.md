---
title: Immutability & Value Objects
sidebar_label: Immutability & Value Objects
tags: [lld, applied-design]
---

# Immutability & Value Objects
> **Level**: Applied Design | **Track**: Low Level Design

## Why it matters in interviews

Interviewers use domain-modelling questions (Splitwise, parking lot, ride-sharing) to check whether you can distinguish concepts that carry identity from those that represent a pure value. Getting this right signals you understand thread-safety, defensive copying, and why two `Money(100, "USD")` objects should compare equal without being the same heap reference. FAANG and fintech companies ask this directly when reviewing how you model currency, coordinates, or measurements.

## Core concepts

- **Immutable class checklist**: declare the class `final`, declare all fields `private final`, provide no setters, defensively copy mutable parameters in the constructor, and defensively copy mutable fields before returning them
- **Value Object**: equality is determined by value, not by reference or identity; two VOs with identical state are interchangeable and should be immutable
- **Entity**: has a unique, stable identity (typically a database ID); two entities with the same field values are still distinct objects; entities are allowed to be mutable
- **Java `record`**: a concise, built-in immutable value object syntax introduced in Java 16; the compiler generates a canonical constructor, `equals`, `hashCode`, and `toString` automatically
- **Thread-safety for free**: an immutable object can be shared across threads without synchronisation because its state can never change after construction
- **Defensive copy on input**: if a constructor receives a mutable object (e.g. `List`, `Date`), copy it immediately so callers cannot mutate the VO's internals through their own reference
- **Defensive copy on output**: if a getter must expose an internal mutable field, return a copy or a read-only wrapper (`Collections.unmodifiableList(...)`) — never the raw reference
- **`equals` / `hashCode` contract**: Value Objects must override both; identity-based defaults from `Object` will produce wrong behaviour when VOs are used as map keys or in sets

## Code example

```java
import java.util.Currency;
import java.util.Objects;

// ---- Value Object: Money ------------------------------------------------

// 1. final class — cannot be subclassed to add mutable state
public final class Money {

    // 2. private final fields — set once, never changed
    private final long amountInCents; // avoid floating-point for money
    private final Currency currency;  // Currency is itself immutable

    // 3. Constructor performs validation and no defensive copy is needed here
    //    because Currency is immutable; if the field were a mutable type,
    //    copy it: this.tags = new ArrayList<>(tags);
    public Money(long amountInCents, Currency currency) {
        if (amountInCents < 0) throw new IllegalArgumentException("Amount cannot be negative");
        this.amountInCents = amountInCents;
        this.currency       = Objects.requireNonNull(currency, "Currency required");
    }

    // 4. No setters — getters only
    public long getAmountInCents() { return amountInCents; }
    public Currency getCurrency()  { return currency; }

    // 5. Value equality — two Money objects are equal when their values match
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Money other)) return false;
        return amountInCents == other.amountInCents
            && currency.equals(other.currency);
    }

    @Override
    public int hashCode() {
        return Objects.hash(amountInCents, currency);
    }

    public Money add(Money other) {
        if (!currency.equals(other.currency))
            throw new IllegalArgumentException("Currency mismatch");
        return new Money(amountInCents + other.amountInCents, currency); // returns new instance
    }

    @Override
    public String toString() {
        return currency.getCurrencyCode() + " " + (amountInCents / 100.0);
    }
}

// ---- Java record version (Java 16+) ------------------------------------

public record MoneyRecord(long amountInCents, Currency currency) {
    // Compact canonical constructor for validation
    public MoneyRecord {
        if (amountInCents < 0) throw new IllegalArgumentException("Amount cannot be negative");
        Objects.requireNonNull(currency, "Currency required");
    }
}

// ---- Entity: Order (has identity, may mutate) --------------------------

public class Order {
    private final String orderId; // stable identity
    private Money total;          // mutable state — total can change as items are added

    public Order(String orderId, Money initialTotal) {
        this.orderId = Objects.requireNonNull(orderId);
        this.total   = Objects.requireNonNull(initialTotal);
    }

    public String getOrderId() { return orderId; }
    public Money getTotal()    { return total; }

    public void applyDiscount(Money discount) {
        // Entities ARE allowed to change state
        this.total = new Money(total.getAmountInCents() - discount.getAmountInCents(),
                               total.getCurrency());
    }

    // Entities use identity equality — two Orders with the same ID are the same order
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Order other)) return false;
        return orderId.equals(other.orderId);
    }

    @Override
    public int hashCode() { return orderId.hashCode(); }
}
```

## When to use

| Scenario | Use this when... |
|---|---|
| Representing a measurement or quantity (money, weight, distance) | Use a **Value Object** — equality by value, immutable, no setters |
| Modelling a domain concept with a lifecycle (order, user, account) | Use an **Entity** — give it a stable ID, allow state to change |
| Sharing objects across threads without locks | Use an **immutable VO** — no synchronisation needed by design |
| Using a domain concept as a map key or in a `HashSet` | Use a **Value Object** — override `equals`/`hashCode` based on fields |
| You need Java 16+ and the type is just data with no behaviour | Use a **`record`** — less boilerplate, same guarantees |
| A field inside a VO is itself mutable (e.g. `List`, `Date`) | Always **defensively copy** on both input and output |

## Common interview mistakes

- Declaring fields `private final` but still returning the internal `List` directly from a getter — callers can mutate the list through their own reference, breaking immutability
- Forgetting to copy a mutable constructor argument (e.g. accepting a `List<String>` and assigning it directly) — the caller still holds a reference and can change the list
- Relying on the default `Object.equals` for a Value Object — two distinct `Money(100, USD)` instances will compare as not-equal, causing bugs when used as map keys
- Making a class immutable but not `final` — a subclass can add mutable fields, defeating the contract
- Confusing Entity and Value Object: giving a `Money` object a database ID and row-level locking, or treating two `Order` entities with the same fields as duplicates
- Using `double` or `float` to store monetary amounts — floating-point rounding causes silent correctness bugs; use `long` cents or `BigDecimal`

## Covered by Problems

| Problem | Link |
|---|---|
| Splitwise | [→](/docs/lld/problems/splitwise) |

## Resources

- [Refactoring.Guru: Replace Data Value with Object](https://refactoring.guru/replace-data-value-with-object)
- [Baeldung: Immutable Objects](https://www.baeldung.com/java-immutable-object)
