---
title: Behavioral Patterns — Command & Template Method
sidebar_label: Command & Template Method
tags: [lld, patterns]
---

# Behavioral Patterns — Command & Template Method

> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Command and Template Method both address *how work gets structured and executed*, but at different levels. Command is the pattern behind undo/redo, task queues, and audit logs — all of which come up in system design. Template Method is the cleaner alternative to copy-paste when multiple classes share an algorithm skeleton but differ in specific steps.

## Core concepts

**Command** turns a request into a first-class object. Four roles:
- **Command interface** — declares `execute()` and optionally `undo()`.
- **ConcreteCommand** — binds a *Receiver* to an action and holds the parameters needed to reverse it.
- **Invoker** — triggers `execute()`, optionally queues or logs commands.
- **Receiver** — the object that actually does the work (`Order`, `TextEditor`, etc.).

**Template Method** defines the *skeleton* of an algorithm in a base-class method, with individual steps declared abstract (or as overridable hooks). Subclasses fill in the variable steps without altering the overall sequence. This embodies the **Hollywood Principle**: "don't call us, we'll call you" — the base class calls the subclass hooks, not the other way around.

## Code example

```java
// ── COMMAND: Order management ─────────────────────────────────────────────────

interface OrderCommand {
    void execute();
    void undo();
}

class Order {
    private String status = "PENDING";
    void confirm() { status = "CONFIRMED"; System.out.println("Order confirmed"); }
    void cancel()  { status = "CANCELLED"; System.out.println("Order cancelled"); }
    void revert()  { status = "PENDING";   System.out.println("Order reverted to pending"); }
}

class ConfirmOrderCommand implements OrderCommand {
    private final Order order;
    ConfirmOrderCommand(Order order) { this.order = order; }

    public void execute() { order.confirm(); }
    public void undo()    { order.revert(); }   // reverse the state change
}

class OrderInvoker {
    private final Deque<OrderCommand> history = new ArrayDeque<>();

    void run(OrderCommand cmd) {
        cmd.execute();
        history.push(cmd);
    }

    void undoLast() {
        if (!history.isEmpty()) history.pop().undo();
    }
}

// ── TEMPLATE METHOD: Data migration pipeline ──────────────────────────────────

abstract class DataMigration {

    // Template method — defines the fixed sequence
    final void run() {
        extractData();
        transformData();
        loadData();
        System.out.println("Migration complete");
    }

    abstract void extractData();     // subclass fills in
    abstract void transformData();   // subclass fills in
    abstract void loadData();        // subclass fills in
}

class UserDataMigration extends DataMigration {
    void extractData()   { System.out.println("Reading users from legacy DB"); }
    void transformData() { System.out.println("Normalising phone numbers"); }
    void loadData()      { System.out.println("Inserting into new users table"); }
}

class ProductDataMigration extends DataMigration {
    void extractData()   { System.out.println("Reading products from CSV"); }
    void transformData() { System.out.println("Converting prices to cents"); }
    void loadData()      { System.out.println("Bulk-inserting into products table"); }
}
```

## When to use

| Situation | Pattern |
|---|---|
| Need undo/redo capability | Command |
| Requests must be queued, scheduled, or logged | Command |
| Operations should be parameterised and passed around like objects | Command |
| Multiple classes share an algorithm skeleton but differ in specific steps | Template Method |
| You want to eliminate copy-paste between sibling classes | Template Method |
| A framework must enforce a workflow while letting users customise steps | Template Method |

**Decision shortcut**: Command enables undo/redo and queuing by making requests first-class objects. Template Method is the Hollywood Principle in code — the base class calls you, you don't call it.

## Common interview mistakes

- **Omitting `undo()` from Command**: The undo capability is the main reason interviewers ask about Command. Always define `undo()` and store enough state in the command to reverse the operation.
- **Making the Template Method non-final**: The skeleton method (`run()`) should be `final` so subclasses cannot accidentally reorder the steps. Forgetting `final` is a common code review catch.
- **Confusing Command with Strategy**: Both encapsulate behaviour, but Command represents a *specific action with context* (and supports undo). Strategy represents an *interchangeable algorithm* with no history.
- **Putting too much logic in ConcreteCommand**: The command is a coordinator, not a worker. Business logic belongs in the Receiver (`Order`, `Editor`). ConcreteCommand only bridges the Invoker to the Receiver.

## Covered by Problems

| Problem | Link |
|---|---|
| Vending Machine | [→](/docs/lld/problems/vending-machine) |
| Elevator System | [→](/docs/lld/problems/elevator-system) |
| Hotel Booking System | [→](/docs/lld/problems/hotel-booking) |
| Thread-Safe Rate Limiter | [→](/docs/lld/problems/rate-limiter-lld) |

## Resources

- [Refactoring.Guru: Command](https://refactoring.guru/design-patterns/command)
- [Refactoring.Guru: Template Method](https://refactoring.guru/design-patterns/template-method)
