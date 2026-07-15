---
title: Domain Modeling Basics
sidebar_label: Domain Modeling Basics
tags: [lld, applied-design]
---

# Domain Modeling Basics
> **Level**: Applied Design | **Track**: Low Level Design

## Why it matters in interviews

Domain modeling questions test your ability to translate business requirements into a clean object structure before writing any logic. Companies like Google, Amazon, and Uber ask system design questions (e.g., "Design Splitwise" or "Design a food delivery system") where the quality of your class hierarchy signals whether you think in terms of behaviour and invariants or just data bags. Getting this right early prevents a cascade of poor design decisions later in the interview.

## Core concepts

- **Entity**: has a unique identity (usually an ID), is mutable over its lifetime, and can be persisted — examples: `Order`, `User`, `Trip`
- **Value Object**: has no identity; equality is determined entirely by its field values; must be immutable — examples: `Money`, `Address`, `Coordinate`
- **Aggregate**: a consistency boundary made up of a root entity and its internal objects; the root entity controls all access and enforces invariants; only the aggregate root has a repository — e.g., `Order` is the root, `OrderItem` objects live inside it
- **Repository**: a collection-style abstraction over persistence — `OrderRepository.findById()`, `save()`, `findByStatus()` — callers never see SQL or storage details
- **Domain Service**: a stateless operation that coordinates multiple entities or aggregates but does not naturally belong on any single one — examples: `PricingService`, `MatchingService`, `TransferService`
- **Anemic Domain Model (anti-pattern)**: entities are pure data bags with only getters/setters; all business logic is pushed into service classes, producing a procedural design disguised as OOP

## Code example

```java
// ----- Value Object -----
public final class Money {
    private final BigDecimal amount;
    private final String currency;

    public Money(BigDecimal amount, String currency) {
        if (amount.compareTo(BigDecimal.ZERO) < 0) throw new IllegalArgumentException("Amount cannot be negative");
        this.amount = amount;
        this.currency = currency;
    }

    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) throw new IllegalArgumentException("Currency mismatch");
        return new Money(this.amount.add(other.amount), this.currency);
    }

    @Override public boolean equals(Object o) { /* compare amount + currency */ }
    @Override public int hashCode() { /* hash amount + currency */ }
}

// ----- Internal entity (not exposed outside aggregate) -----
public class OrderItem {
    private final String productId;
    private int quantity;
    private final Money unitPrice;

    public OrderItem(String productId, int quantity, Money unitPrice) {
        this.productId = productId;
        this.quantity  = quantity;
        this.unitPrice = unitPrice;
    }

    public Money subtotal() { return unitPrice.add(unitPrice)./* simplified */; }
    // No public setter — mutation only via Order methods
}

// ----- Aggregate Root -----
public class Order {
    private final String id;
    private final String customerId;
    private final List<OrderItem> items = new ArrayList<>();
    private OrderStatus status;

    public Order(String id, String customerId) {
        this.id = id;
        this.customerId = customerId;
        this.status = OrderStatus.PENDING;
    }

    public void addItem(String productId, int quantity, Money unitPrice) {
        if (status != OrderStatus.PENDING) throw new IllegalStateException("Cannot modify a placed order");
        items.add(new OrderItem(productId, quantity, unitPrice));
    }

    public void place() {
        if (items.isEmpty()) throw new IllegalStateException("Order must have at least one item");
        this.status = OrderStatus.PLACED;
    }

    public Money total() {
        return items.stream().map(OrderItem::subtotal).reduce(new Money(BigDecimal.ZERO, "USD"), Money::add);
    }
}

// ----- Repository (interface only — infrastructure implements it) -----
public interface OrderRepository {
    Optional<Order> findById(String orderId);
    List<Order> findByStatus(OrderStatus status);
    void save(Order order);
}

// ----- Domain Service -----
public class PricingService {
    public Money applyDiscount(Order order, BigDecimal discountPercent) {
        Money total = order.total();
        BigDecimal multiplier = BigDecimal.ONE.subtract(discountPercent.divide(BigDecimal.valueOf(100)));
        return new Money(total.getAmount().multiply(multiplier), "USD");
    }
}

// ----- Anemic Anti-Pattern (avoid this) -----
// class Order { String id; List<OrderItem> items; OrderStatus status; /* only getters/setters */ }
// class OrderService { void addItem(...) { /* all logic here */ } void place(Order o) { /* all logic here */ } }
```

## When to use

| Scenario | Use this when... |
|---|---|
| The concept has a meaningful lifecycle and needs to be tracked over time | **Entity** — give it an ID and a repository |
| Two instances with the same data are interchangeable (e.g., $5 USD == $5 USD) | **Value Object** — make it immutable, override equals/hashCode |
| Multiple entities must change together atomically to stay consistent | **Aggregate** — pick one as the root and enforce all changes through it |
| An operation coordinates multiple aggregates but has no state of its own | **Domain Service** — keep it stateless and focused on a single business capability |
| You need to load or persist an aggregate root | **Repository** — one repository per aggregate root, never per internal entity |

## Common interview mistakes

- Exposing internal entities (e.g., `OrderItem`) via the aggregate root's getter and letting callers mutate them directly, which breaks the consistency boundary
- Modelling `Money` as a plain `double` field on `Order`, then struggling to handle currency mismatches and rounding later
- Creating a repository for every class instead of only aggregate roots, leading to scattered persistence logic
- Writing all business rules (discount calculation, status transitions) in a service class and leaving entities as pure data holders — this is the Anemic Domain Model anti-pattern
- Forgetting to enforce invariants inside the aggregate (e.g., allowing `place()` on an empty order)
- Treating Domain Services and Application Services as the same thing — Domain Services contain business logic; Application Services orchestrate use-cases and handle transactions

## Covered by Problems

| Problem | Link |
|---|---|
| Splitwise | [→](/docs/lld/problems/splitwise) |
| Food Delivery System | [→](/docs/lld/problems/food-delivery) |

## Resources

- [Martin Fowler: Anemic Domain Model](https://martinfowler.com/bliki/AnemicDomainModel.html)
- [Baeldung: DDD with Spring](https://www.baeldung.com/spring-data-ddd)
