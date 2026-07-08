---
title: SOLID Principles
sidebar_label: SOLID Principles
tags: [lld, fundamentals]
---

# SOLID Principles

> **Level**: Fundamentals | **Track**: Low Level Design

## Why it matters in interviews

Interviewers ask about SOLID to see whether you can *apply* design principles on the fly, not just recite the acronym. A common trap: a candidate names all five principles confidently but then designs a `UserService` that handles authentication, email sending, and DB persistence in the same class. The question is almost always implicit — your class diagram is evaluated against these principles throughout the interview.

## Core concepts

- **S** — Single Responsibility: one class, one reason to change. If you ever say "this class handles X *and* Y", split it.
- **O** — Open/Closed: extend behavior by adding new classes, not by editing existing ones. New requirements should result in new code, not modified code.
- **L** — Liskov Substitution: any subtype must be behaviorally substitutable for its parent. If swapping the subtype breaks the caller, the inheritance is wrong.
- **I** — Interface Segregation: prefer narrow, focused interfaces over fat ones. A class implementing an interface should need *all* the methods it provides.
- **D** — Dependency Inversion: high-level modules depend on abstractions (interfaces), not concrete implementations. Wire dependencies from the outside (constructor injection).

## Code example

```java
// --- S: Single Responsibility ---
// BAD: one class does too many things
class UserService {
    void register(User u) { /* save to DB */ }
    void sendWelcomeEmail(User u) { /* call SMTP */ }  // wrong concern here
}

// GOOD: separate concerns
class UserRepository { void save(User u) { /* DB */ } }
class EmailService    { void sendWelcome(User u) { /* SMTP */ } }

// --- O: Open/Closed ---
// BAD: add a new payment type → edit this method
double charge(String type, double amount) {
    if (type.equals("card")) { /* ... */ }
    else if (type.equals("upi")) { /* ... */ }  // keeps growing
}

// GOOD: new payment type → new class, no edits
interface PaymentProcessor { void charge(double amount); }
class CardProcessor implements PaymentProcessor { ... }
class UpiProcessor  implements PaymentProcessor { ... }

// --- L: Liskov Substitution ---
// BAD: Penguin can't fly, but is forced to implement fly()
class Bird  { void fly() { ... } }
class Penguin extends Bird {
    void fly() { throw new UnsupportedOperationException(); } // violates LSP
}

// GOOD: split the contract
interface Flyable { void fly(); }
class Sparrow implements Flyable { public void fly() { ... } }
class Penguin { /* no fly — and that's fine */ }

// --- I: Interface Segregation ---
// BAD: ReadOnlyRepo is forced to implement write methods
interface Repository { User findById(int id); void save(User u); void delete(int id); }

// GOOD: split by capability
interface ReadRepository  { User findById(int id); }
interface WriteRepository { void save(User u); void delete(int id); }

// --- D: Dependency Inversion ---
// BAD: high-level class creates its own dependency
class OrderService {
    private MySQLOrderRepo repo = new MySQLOrderRepo(); // tightly coupled
}

// GOOD: depend on abstraction, inject from outside
class OrderService {
    private final OrderRepository repo;
    OrderService(OrderRepository repo) { this.repo = repo; } // inject interface
}
```

## When to use

| Principle | Red flag that you are violating it |
|---|---|
| SRP | Your class has more than one private field group that changes for different reasons. |
| OCP | Adding a new variant requires editing an existing `if/else` or `switch`. |
| LSP | A subclass throws `UnsupportedOperationException` or weakens a postcondition. |
| ISP | A class implements an interface but leaves methods empty or throws by default. |
| DIP | A constructor calls `new ConcreteClass()` for a dependency that should be swappable. |

## Common interview mistakes

- **Naming all 5 but ignoring them in the diagram** — the interviewer is watching your class diagram, not your verbal answer. Every class you draw is being silently checked.
- **Over-applying SRP** — splitting every method into its own class creates an explosion of tiny objects. SRP is about *reasons to change*, not lines of code. A 50-line class with a single cohesive purpose is fine.
- **Confusing LSP with type safety** — LSP is a *behavioral* contract, not just a type contract. A subclass that compiles fine but changes a method's observable behavior (e.g., returns empty list instead of throwing) still violates LSP.
- **Skipping DIP under time pressure** — hardcoding `new` inside a class makes it untestable and tightly coupled. Even a quick `// inject via constructor` comment signals awareness to the interviewer.

## Resources

- [Hello Interview: OOD](https://www.hellointerview.com/learn/code/object-oriented-design/introduction)
- [Refactoring.Guru](https://refactoring.guru/design-patterns)
- [Gaurav Sen: OOD Series](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)
