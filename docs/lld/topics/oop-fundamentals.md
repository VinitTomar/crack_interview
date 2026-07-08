---
title: OOP Fundamentals
sidebar_label: OOP Fundamentals
tags: [lld, fundamentals]
---

# OOP Fundamentals

> **Level**: Fundamentals | **Track**: Low Level Design

## Why it matters in interviews

Interviewers use OOP fundamentals to gauge whether you think in objects or in procedures — a candidate who designs classes with public fields and no encapsulation signals they will produce brittle, hard-to-extend code. The four pillars are not trivia; every machine-coding problem tests them implicitly. Candidates routinely reach for inheritance when composition is the right tool, or violate encapsulation by returning raw mutable collections from getters.

## Core concepts

- **Encapsulation** — bundle state and behavior together; expose state only through controlled methods (getters/setters or domain operations). A `BankAccount` never lets callers modify its balance directly; they call `deposit()` or `withdraw()` which enforce invariants.
- **Abstraction** — expose *what* an object does, hide *how* it does it. A `Shape` exposes `area()` but callers don't know the formula; a `PaymentService` exposes `charge()` but hides the HTTP call to Stripe.
- **Inheritance** — a subclass `is-a` specialization of its parent. Use it only when the relationship is truly taxonomic (a `SavingsAccount` really is a `BankAccount`). Favor composition when you only want to reuse behavior.
- **Polymorphism** — compile-time (method overloading, resolved by parameter types) vs. runtime (method overriding, resolved by actual object type at runtime via virtual dispatch). Runtime polymorphism is what lets you write `for (Shape s : shapes) { s.area(); }` without caring about the concrete type.
- **"Is-a" vs "has-a"** — the key heuristic. If you can say "an A is a B", inheritance may fit. If you say "an A has a B", use composition.

## Code example

```java
// Encapsulation: BankAccount controls its own state
class BankAccount {
    private double balance;  // private — never exposed directly

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Must be positive");
        balance += amount;
    }

    public double getBalance() { return balance; }
}

// Abstraction + Polymorphism: callers only know about area()
abstract class Shape {
    public abstract double area();
}

class Circle extends Shape {
    private final double radius;
    Circle(double r) { this.radius = r; }

    @Override
    public double area() { return Math.PI * radius * radius; }
}

class Rectangle extends Shape {
    private final double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }

    @Override
    public double area() { return w * h; }
}

// Runtime polymorphism — no instanceof needed
List<Shape> shapes = List.of(new Circle(5), new Rectangle(3, 4));
shapes.forEach(s -> System.out.println(s.area()));
```

## When to use

| Pillar | Use when |
|---|---|
| Encapsulation | Always — every class should protect its invariants. |
| Abstraction | You want to swap implementations without changing callers (e.g., swap DB for in-memory in tests). |
| Inheritance | The "is-a" check passes **and** you need to substitute the subtype everywhere the parent is accepted. |
| Composition (over inheritance) | You want to reuse *behavior* but not the full type contract — default choice. |
| Runtime polymorphism | You have a collection of mixed types and want to dispatch without if/else chains. |

## Common interview mistakes

- **Confusing inheritance with composition** — reaching for `extends` to reuse a method or two instead of delegating to a helper object. Ask yourself: "Would I ever pass this subtype to a method that expects the parent?" If not, compose.
- **Breaking encapsulation with mutable return types** — returning `ArrayList<Order> getOrders()` lets callers mutate the internal list. Return `List<Order>` (interface) and consider `Collections.unmodifiableList()`.
- **Overloading vs. overriding confusion** — overloading is resolved at compile-time (static dispatch); overriding is resolved at runtime. Calling an overloaded method on a base-class reference will NOT dispatch to the subclass version.
- **Treating abstraction as "just making things abstract"** — abstraction is about simplifying the caller's mental model, not about using the `abstract` keyword everywhere. A concrete class with a clean public API is perfectly abstract.

## Covered by Problems

| Problem | Link |
|---|---|
| Parking Lot System | [→](/docs/lld/problems/parking-lot) |
| Vending Machine | [→](/docs/lld/problems/vending-machine) |

## Resources

- [Hello Interview: OOD Introduction](https://www.hellointerview.com/learn/code/object-oriented-design/introduction)
- [Refactoring.Guru: OOP Basics](https://refactoring.guru/design-patterns/what-is-pattern)
- [Gaurav Sen: OOD Series](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)
