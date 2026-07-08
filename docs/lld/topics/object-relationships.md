---
title: Object Relationships
sidebar_label: Object Relationships
tags: [lld, fundamentals]
---

# Object Relationships

> **Level**: Fundamentals | **Track**: Low Level Design

## Why it matters in interviews

When you draw a class diagram, every line between two classes communicates a lifecycle and ownership decision. Interviewers look at whether you chose the right relationship type — using a plain arrow when you meant a filled diamond is not just a notation error, it signals muddled ownership thinking. The most common mistake is reaching for inheritance to relate two classes when the relationship is actually one of use or containment.

## Core concepts

- **Association** ("uses-a") — the weakest link. Class A holds a reference to class B but neither creates nor destroys it. Both have independent lifecycles. UML: plain arrow (`A --> B`).
- **Aggregation** ("has-a", weak ownership) — A contains a collection of B, but B can exist without A. If A is destroyed, B lives on. UML: open diamond on A's side (`A <>-- B`).
- **Composition** ("owns-a", strong ownership) — A creates B and B cannot exist without A. Destroying A destroys B. UML: filled diamond on A's side (`A <+>-- B`).
- **Dependency** ("depends-on") — A uses B transiently, typically as a method parameter or local variable. No field reference. UML: dashed arrow (`A ---> B`).
- **Inheritance** ("is-a") — B is a specialization of A. B substitutes for A wherever A is expected. UML: hollow triangle arrow pointing to parent.

## Code example

```java
// --- Association: Driver uses a Car, but doesn't own it ---
class Driver {
    private Car car;  // reference held, but Car has its own lifecycle
    Driver(Car car) { this.car = car; }
    void drive() { car.start(); }
}

// --- Aggregation: Team has Players, Players exist independently ---
class Team {
    private List<Player> players;  // players can be on multiple teams or none
    Team(List<Player> players) { this.players = players; }
    void addPlayer(Player p) { players.add(p); }
}

// --- Composition: House owns Rooms, Rooms can't exist without House ---
class House {
    private final List<Room> rooms = new ArrayList<>();

    House(int numRooms) {
        for (int i = 0; i < numRooms; i++) {
            rooms.add(new Room());  // House creates its own Rooms
        }
        // When House is GC'd, no external ref to rooms exists → they go too
    }
}

class Room {
    // Room has no meaning outside a House in this model
}

// --- Dependency: OrderService depends on PaymentProcessor transiently ---
class OrderService {
    void placeOrder(Order order, PaymentProcessor processor) {
        // processor is used only in this method — no field, no ownership
        processor.charge(order.total());
    }
}
```

## When to use

| Relationship | Choose when |
|---|---|
| Association | Two objects collaborate but neither owns the other (e.g., a `Driver` and a `Car` rented from a fleet). |
| Aggregation | A parent logically groups children, but the children are shared or reused (e.g., `Department` and `Employee` — an employee can move departments). |
| Composition | A child object is an inseparable part of the parent and has no independent identity (e.g., `Order` and `OrderLineItem`, `Document` and `Page`). |
| Dependency | A class only needs another object for a single operation (pass it as a parameter, don't store it). |
| Inheritance | The subtype truly satisfies LSP and you want substitutability, not just code reuse. |

**Default rule**: start with composition. Only loosen to aggregation or association when the child genuinely needs to outlive or be shared across parents.

## Common interview mistakes

- **Using inheritance when composition is correct** — modeling `Car extends Engine` because a Car "has" engine behavior is a classic error. An engine is a *part* of a car (composition), not a type of car.
- **Blurring aggregation and composition** — the test is lifecycle: if deleting the parent should delete the children, it's composition. If the children survive, it's aggregation. Candidates often draw aggregation but describe composition semantics.
- **Ignoring the dependency relationship** — method parameters that establish a temporary coupling are still a relationship worth noting. They affect testability and coupling metrics.
- **Over-using association arrows** — drawing every reference as a plain arrow loses the ownership information the diagram is supposed to convey. When in doubt, say aloud "who creates this object?" — the creator usually owns it (composition or at least aggregation).

## Covered by Problems

| Problem | Link |
|---|---|
| Hotel Booking System | [→](/docs/lld/problems/hotel-booking) |

## Resources

- [Hello Interview: Relationships](https://www.hellointerview.com/learn/code/object-oriented-design/relationships)
- [Refactoring.Guru: Relations](https://refactoring.guru/design-patterns/catalog)
