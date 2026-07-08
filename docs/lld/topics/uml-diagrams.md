---
title: UML Diagrams
sidebar_label: UML Diagrams
tags: [lld, fundamentals]
---

# UML Diagrams

> **Level**: Fundamentals | **Track**: Low Level Design

## Why it matters in interviews

A class diagram is your shared language with the interviewer — it lets you align on structure before writing a single line of code. Candidates who sketch while they think catch relationship mistakes early; candidates who code first and draw later spend time refactoring. Sequence diagrams are equally important for explaining complex workflows like booking flows or payment processing.

## Core concepts

**Class box layout**

```
+------------------+
|   ClassName      |  ← name compartment
+------------------+
| - privateField   |  ← attribute compartment
| # protectedField |    visibility: + public  - private  # protected
| + publicField    |
+------------------+
| + method(): Type |  ← operation compartment
| - helper(): void |
+------------------+
```

**Relationship arrows (most important to memorise)**

| Relationship | Line style | Arrow/end | Meaning |
|---|---|---|---|
| Association | Solid line | Open arrow → | A uses / knows B |
| Aggregation | Solid line | Hollow diamond ◇ | A has-a B (B can exist without A) |
| Composition | Solid line | Filled diamond ◆ | A owns B (B dies with A) |
| Inheritance | Solid line | Hollow triangle △ | A is-a B (extends) |
| Realization | Dashed line | Hollow triangle △ | A implements interface B |
| Dependency | Dashed line | Open arrow --> | A depends on B temporarily |

**Multiplicity notation**

- `1` — exactly one
- `0..1` — zero or one (optional)
- `*` or `0..*` — zero or more
- `1..*` — one or more

## Code example

Minimal Parking Lot class diagram as text art:

```
+------------------+          +-------------------+
|   ParkingLot     |          |   ParkingFloor    |
+------------------+          +-------------------+
| - name: String   |1       * | - floorId: int    |
| - address: String|◆---------| - spots: List     |
+------------------+          +-------------------+
| + getAvailable() |          | + getAvailable()  |
+------------------+          +-------------------+
                                        | 1
                                        ◆ (composition: floor owns spots)
                                        | *
                              +-------------------+
                              |   ParkingSpot     |
                              +-------------------+
                              | - spotId: int     |
                              | - type: SpotType  |
                              | - isOccupied: bool|
                              +-------------------+

+------------------+          +-------------------+
|   <<interface>>  |          |   Ticket          |
|   Payable        |          +-------------------+
+------------------+          | - entryTime: Date |
| + getAmount()    |<·····△   | - vehicle: Vehicle|
+------------------+          | + getDuration()   |
                              +-------------------+
                              (Ticket realizes Payable)

+------------------+
|   Vehicle        |  (abstract)
+------------------+
| - licensePlate   |
+------------------+
        △
        |  (inheritance)
   _____|_____
   |         |
+------+  +-------+
| Car  |  | Truck |
+------+  +-------+
```

**Sequence diagram — parking entry flow:**

```
Client        ParkingLot      ParkingFloor     Ticket
  |                |                |             |
  |--findSpot()--> |                |             |
  |                |--getAvailable()-->           |
  |                |           <---|             |
  |                |<-spot------|               |
  |--park(vehicle)-|                |             |
  |                |--createTicket()-----------> |
  |                |<--------------------------ticket
  |<------ticket---|
```

## When to use

- **Class diagrams** — draw at the start of every LLD interview; update as requirements change rather than rebuilding at the end
- **Sequence diagrams** — use when explaining a multi-step workflow (checkout, authentication, booking confirmation) where the *order* of calls between objects matters
- **Skip** component and deployment diagrams in LLD interviews — those belong to HLD (High Level Design)

## Common interview mistakes

- **Drawing after coding** — by the time you draw, you've already committed to a structure; draw first to catch missed relationships early
- **Forgetting multiplicity** — writing `ParkingLot` → `ParkingFloor` without noting `1..*` leaves ambiguity; multiplicity is one of the first things senior interviewers look for
- **Using inheritance where composition fits** — `Car extends Vehicle` is correct; `ParkingLot extends Building` is questionable; prefer composition unless "is-a" is truly permanent
- **Mixing aggregation and composition** — aggregation (hollow ◇) means the child outlives the parent; composition (filled ◆) means it doesn't; a `Ticket` cannot exist without a `ParkingLot` so use composition

## Covered by Problems

| Problem | Link |
|---|---|
| Parking Lot System | [→](/docs/lld/problems/parking-lot) |
| Elevator System | [→](/docs/lld/problems/elevator-system) |

## Resources

- [Hello Interview: Class Diagrams](https://www.hellointerview.com/learn/code/object-oriented-design/introduction)
- [Lucidchart: UML Guide](https://www.lucidchart.com/pages/uml-class-diagram)
