---
title: Design Anti-Patterns & Code Smells
sidebar_label: Design Anti-Patterns & Code Smells
tags: [lld, fundamentals]
---

# Design Anti-Patterns & Code Smells
> **Level**: Fundamentals | **Track**: Low Level Design

## Why it matters in interviews

Interviewers at companies like Google, Amazon, and Meta use design problems to assess whether you can write maintainable, extensible code — not just code that works. Recognising anti-patterns signals that you understand the cost of bad design and can refactor proactively. Candidates who name and fix these issues during a design session stand out from those who produce working but fragile solutions.

## Core concepts

- **God Class**: one class that owns all logic and data for an entire subsystem — impossible to unit test in isolation, impossible to extend without risk
- **Anemic Domain Model**: classes that are pure data bags with only getters and setters, no behaviour; business logic leaks into service layers and becomes impossible to locate
- **Feature Envy**: a method that spends most of its time reading fields or calling methods on a different class rather than its own — signals the method belongs elsewhere
- **Data Clump**: a group of fields (e.g. street, city, zip) that always appear together but have never been promoted into their own class, leading to scattered duplication
- **Primitive Obsession**: using raw `String` for email, `int` for money, `long` for IDs — bypasses the type system and allows invalid states to propagate silently
- **Shotgun Surgery**: a single conceptual change (e.g. how tax is calculated) forces edits across many unrelated classes — symptom of missing cohesion
- **Long Method**: a method that does too many things at once; any block that needs a comment to explain it is a candidate for extraction

## Code example

```java
// ---- BEFORE: God Class + Anemic Domain Model ----

// Anemic — just a data bag, no behaviour
class Order {
    private String customerEmail;   // Primitive Obsession
    private int totalCents;         // Primitive Obsession
    private String status;

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String e) { customerEmail = e; }
    public int getTotalCents() { return totalCents; }
    public void setTotalCents(int t) { totalCents = t; }
    public String getStatus() { return status; }
    public void setStatus(String s) { status = s; }
}

// God Class — owns validation, discount, tax, email, persistence
class OrderManager {
    public void processOrder(Order order) {
        // validate
        if (order.getCustomerEmail() == null || !order.getCustomerEmail().contains("@"))
            throw new IllegalArgumentException("Bad email");
        // apply discount (Feature Envy: all logic is about Order's data)
        if (order.getTotalCents() > 10000) order.setTotalCents((int)(order.getTotalCents() * 0.9));
        // add tax
        order.setTotalCents((int)(order.getTotalCents() * 1.1));
        // send email + save (Shotgun Surgery: change email provider → edit here)
        System.out.println("Email sent to " + order.getCustomerEmail());
        order.setStatus("CONFIRMED");
        System.out.println("Order saved: " + order.getTotalCents());
    }
}

// ---- AFTER: Rich Domain Model + Single Responsibility ----

record Email(String value) {                    // eliminates Primitive Obsession
    public Email {
        if (value == null || !value.contains("@"))
            throw new IllegalArgumentException("Invalid email: " + value);
    }
}

record Money(int cents) {                       // eliminates Primitive Obsession
    public Money discounted(double rate) { return new Money((int)(cents * (1 - rate))); }
    public Money withTax(double rate)    { return new Money((int)(cents * (1 + rate))); }
}

class Order {                                   // rich domain model: owns its own rules
    private final Email customerEmail;
    private Money total;
    private OrderStatus status = OrderStatus.PENDING;

    public Order(Email customerEmail, Money total) {
        this.customerEmail = customerEmail;
        this.total = total;
    }

    public void applyDiscountIfEligible() {     // behaviour lives here, not in a manager
        if (total.cents() > 10000) total = total.discounted(0.10);
    }

    public void applyTax()    { total = total.withTax(0.10); }
    public void confirm()     { status = OrderStatus.CONFIRMED; }

    public Email customerEmail() { return customerEmail; }
    public Money total()         { return total; }
    public OrderStatus status()  { return status; }
}

// Thin coordinator — easy to swap implementations without Shotgun Surgery
class OrderService {
    private final NotificationService notifier;
    private final OrderRepository repo;

    public OrderService(NotificationService notifier, OrderRepository repo) {
        this.notifier = notifier;
        this.repo = repo;
    }

    public void processOrder(Order order) {
        order.applyDiscountIfEligible();
        order.applyTax();
        order.confirm();
        notifier.sendConfirmation(order.customerEmail());
        repo.save(order);
    }
}
```

## When to use

| Scenario | Use this when... |
|---|---|
| God Class | Break into multiple classes, each owning one cohesive responsibility (SRP) |
| Anemic Domain Model | Move behaviour that operates exclusively on a class's own data back into that class |
| Feature Envy | Move the envious method to the class it is most interested in |
| Data Clump | Extract the repeated group of fields into a new value object or record |
| Primitive Obsession | Introduce a small domain type (e.g. `Email`, `Money`, `UserId`) that validates on construction |
| Shotgun Surgery | Find the missing abstraction; consolidate the scattered concept behind a single class or interface |
| Long Method | Extract well-named private methods or introduce a helper object; aim for methods under 10-15 lines |

## Common interview mistakes

- Recognising the smell but not naming it — interviewers want to hear "this is Feature Envy" not just "this looks off"
- Over-engineering the fix: replacing a Primitive Obsession with a full class hierarchy when a `record` or simple wrapper suffices
- Leaving the Anemic Domain Model intact and adding a service layer on top — this compounds the problem rather than solving it
- Confusing Shotgun Surgery (one change, many files) with God Class (many changes, one file) — they require different remedies
- Not connecting anti-patterns to SOLID principles during discussion (e.g. God Class violates SRP, Shotgun Surgery signals missing OCP)
- Fixing anti-patterns in the design phase but reintroducing them in code due to time pressure — call out the trade-off explicitly

## Covered by Problems

| Problem | Link |
|---|---|
| Parking Lot System | [→](/docs/lld/problems/parking-lot) |
| Library Management System | [→](/docs/lld/problems/library-management) |

## Resources

- [Refactoring.Guru: Code Smells](https://refactoring.guru/refactoring/smells)
- [Refactoring.Guru: Refactoring Catalog](https://refactoring.guru/refactoring/catalog)
