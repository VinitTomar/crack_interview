---
title: Interfaces vs Abstract Classes
sidebar_label: Interfaces vs Abstract Classes
tags: [lld, fundamentals]
---

# Interfaces vs Abstract Classes

> **Level**: Fundamentals | **Track**: Low Level Design

## Why it matters in interviews

This is one of the most asked OOP questions in system design interviews, and it trips up candidates because both tools enable polymorphism. The distinction is about intent and constraints: an interface declares a *capability contract* that unrelated classes can satisfy; an abstract class declares a *partial implementation* with shared state and behavior for a family of related types. Candidates who pick abstract class by reflex often over-constrain their design and block multiple inheritance of type.

## Core concepts

- **Interface** — a pure contract: no instance state, no concrete methods (before Java 8 default methods). Defines *what* a class can do. A class can implement many interfaces. Use when capability needs to cross class hierarchies.
- **Abstract class** — a partial implementation: can have instance fields, constructors, and concrete methods alongside abstract ones. Defines *what a family of types is* (shared identity + shared behavior). A class can extend only one abstract class.
- **Interface as capability** — `Comparable<T>`, `Serializable`, `Runnable`, `Iterable<T>` — none of these imply a shared parent type. A `String` and a `LocalDate` are both `Comparable` without being related.
- **Abstract class as template** — `AbstractList<E>`, `HttpServlet`, `AbstractQueuedSynchronizer` — these provide reusable scaffolding so subclasses implement only the variable parts.
- **Java 8+ default methods** — interfaces can now carry default implementations to avoid breaking existing implementors when adding new methods. This narrows (but does not eliminate) the gap. Abstract classes still win when you need instance state or a constructor.

## Code example

```java
// --- Interface: contract any unrelated class can satisfy ---
interface Comparable<T> {
    int compareTo(T other);  // pure contract, no state
}

class Money implements Comparable<Money> {
    private final int cents;
    Money(int cents) { this.cents = cents; }

    @Override
    public int compareTo(Money other) {
        return Integer.compare(this.cents, other.cents);
    }
}

// A completely unrelated class can also be Comparable
class Priority implements Comparable<Priority> {
    private final int level;
    Priority(int level) { this.level = level; }

    @Override
    public int compareTo(Priority other) {
        return Integer.compare(this.level, other.level);
    }
}

// --- Abstract class: shared scaffolding for a type family ---
abstract class AbstractList<E> {
    // Concrete shared behavior — subclasses inherit for free
    public boolean isEmpty() { return size() == 0; }
    public void add(int index, E e) { throw new UnsupportedOperationException(); }

    // Variable parts — subclasses must provide
    public abstract E get(int index);
    public abstract int size();
}

class ArrayList<E> extends AbstractList<E> {
    private Object[] data = new Object[10];
    private int size = 0;

    @Override public E get(int index) { return (E) data[index]; }
    @Override public int size() { return size; }
    // isEmpty() is inherited for free
}
```

## When to use

| Situation | Pick |
|---|---|
| Multiple unrelated classes need to share a capability (e.g., `Printable`, `Auditable`). | **Interface** |
| You need multiple inheritance of type (a class that is both `Runnable` and `Closeable`). | **Interface** |
| You are defining a family of related types that share state or a non-trivial default implementation. | **Abstract class** |
| You want to enforce a template method pattern (skeleton algorithm, variable steps). | **Abstract class** |
| You need a constructor to initialize shared state across all subclasses. | **Abstract class** |
| You are writing a public API and want to add methods later without breaking implementors. | **Interface** (with default methods in Java 8+) |

**Default rule**: start with an interface. Promote to an abstract class only when you identify shared state or a reusable concrete method that belongs to a type family.

## Common interview mistakes

- **Picking abstract class by reflex** — "I'll use abstract class because some methods are implemented" is not enough justification. If there's no shared instance state and no template method, an interface with default methods achieves the same result with less coupling.
- **Forgetting that Java has single-class inheritance** — designing a hierarchy where a class needs behavior from two abstract classes is a red flag. Refactor so shared behavior lives in interfaces (with default methods) or in helper objects composed in.
- **Treating `default` methods as equivalent to abstract class methods** — default methods cannot access instance fields (interfaces have none). If your shared method needs `this.fieldName`, you need an abstract class.
- **Not connecting the choice to testability** — interfaces are easier to mock in tests because you can pass any implementation. Mention this tradeoff: "I'm using an interface here so I can inject a mock in unit tests."

## Covered by Problems

| Problem | Link |
|---|---|
| Ride Sharing System | [→](/docs/lld/problems/ride-sharing) |

## Resources

- [Hello Interview: Interfaces](https://www.hellointerview.com/learn/code/object-oriented-design/introduction)
- [Refactoring.Guru: Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory)
