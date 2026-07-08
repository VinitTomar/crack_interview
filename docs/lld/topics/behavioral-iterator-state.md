---
title: Behavioral Patterns — Iterator & State
sidebar_label: Iterator & State
tags: [lld, patterns]
---

# Behavioral Patterns — Iterator & State

> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Interviewers use Iterator and State to test whether you can translate domain logic into clean OOP instead of if/switch sprawl. Iterator shows you understand encapsulation of traversal — a common requirement when designing custom collections. State is a staple of machine-coding rounds because almost every real system (vending machines, order pipelines, traffic lights) has lifecycle states that beg for the pattern.

## Core concepts

### Iterator

Iterator separates the traversal algorithm from the collection it operates on. The collection exposes an `Iterator` object; the caller only knows `hasNext()` / `next()` — it never touches the internal array, linked list, or tree.

Key points:
- Java's `Iterable<T>` / `Iterator<T>` interfaces are the canonical implementation hook. Implementing `Iterable<T>` on your collection lets clients use the enhanced for-loop.
- **External iterator** (caller drives): most common; caller calls `hasNext()` / `next()` explicitly.
- **Internal iterator** (collection drives): collection accepts a callback (e.g., `forEach(Consumer)`); caller cannot pause mid-traversal.
- Multiple independent iterators can walk the same collection simultaneously without interfering with each other.

### State

State replaces a context object's conditional logic with a family of state objects. When the context's state changes, it swaps the current state object; every method call is then delegated to the current state.

Key points:
- The **Context** holds a reference to the current `State` and forwards calls to it.
- Each **ConcreteState** implements the full `State` interface and may trigger transitions by calling `context.setState(...)`.
- Transitions can live either in the state objects (state decides what comes next) or in the context (context decides). Keeping them in the state objects is more common and more cohesive.
- **State vs. Strategy**: both replace conditionals with polymorphism. The difference is *who controls switching*. Strategy is set once by the client and typically does not change itself; State transitions happen internally as the object's lifecycle progresses.

## Code example

```java
// ── ITERATOR ────────────────────────────────────────────────────────────────
class Book {
    public final String title;
    public Book(String title) { this.title = title; }
}

class BookCollection implements Iterable<Book> {
    private final List<Book> books = new ArrayList<>();

    public void add(Book book) { books.add(book); }

    @Override
    public Iterator<Book> iterator() {
        return new BookIterator();
    }

    private class BookIterator implements Iterator<Book> {
        private int index = 0;

        @Override public boolean hasNext() { return index < books.size(); }
        @Override public Book next() {
            if (!hasNext()) throw new NoSuchElementException();
            return books.get(index++);
        }
    }
}

// Usage — caller never knows it's backed by an ArrayList
BookCollection shelf = new BookCollection();
shelf.add(new Book("Clean Code"));
shelf.add(new Book("DDIA"));
for (Book b : shelf) {          // enhanced for-loop works via Iterable
    System.out.println(b.title);
}

// ── STATE ────────────────────────────────────────────────────────────────────
interface State {
    void insertCoin(VendingMachine vm);
    void selectProduct(VendingMachine vm);
    void dispense(VendingMachine vm);
}

class IdleState implements State {
    @Override public void insertCoin(VendingMachine vm) {
        System.out.println("Coin accepted.");
        vm.setState(new HasMoneyState());
    }
    @Override public void selectProduct(VendingMachine vm) {
        System.out.println("Insert coin first.");
    }
    @Override public void dispense(VendingMachine vm) {
        System.out.println("Insert coin first.");
    }
}

class HasMoneyState implements State {
    @Override public void insertCoin(VendingMachine vm) {
        System.out.println("Coin already inserted.");
    }
    @Override public void selectProduct(VendingMachine vm) {
        System.out.println("Product selected.");
        vm.setState(new DispensingState());
    }
    @Override public void dispense(VendingMachine vm) {
        System.out.println("Select a product first.");
    }
}

class DispensingState implements State {
    @Override public void insertCoin(VendingMachine vm) {
        System.out.println("Please wait, dispensing...");
    }
    @Override public void selectProduct(VendingMachine vm) {
        System.out.println("Already dispensing.");
    }
    @Override public void dispense(VendingMachine vm) {
        System.out.println("Here is your product!");
        vm.setState(new IdleState());
    }
}

class VendingMachine {
    private State currentState = new IdleState();

    public void setState(State state) { this.currentState = state; }

    public void insertCoin()    { currentState.insertCoin(this); }
    public void selectProduct() { currentState.selectProduct(this); }
    public void dispense()      { currentState.dispense(this); }
}

// Usage
VendingMachine vm = new VendingMachine();
vm.insertCoin();     // Coin accepted.
vm.selectProduct();  // Product selected.
vm.dispense();       // Here is your product!
vm.dispense();       // Insert coin first.  ← machine is back in IdleState
```

## When to use

| Situation | Pattern |
|-----------|---------|
| Custom collection whose traversal internals must be hidden | Iterator |
| Need to support multiple simultaneous traversals | Iterator |
| Object has 3+ clearly distinct operating modes with different behavior per method | State |
| Lifecycle has strict ordering (you can only dispense after paying) | State |
| Behavior changes driven by external input, not client code | State |

**Interview tip:** If you catch yourself writing `if (state == IDLE) { … } else if (state == HAS_MONEY) { … }` across multiple methods, that is the exact smell State is designed to cure. Enumerate the states, create a class for each, and let the machine delegate.

## Common interview mistakes

- **Forgetting `NoSuchElementException`** in `Iterator.next()` — calling `next()` past the end must throw, not return null.
- **Putting transition logic in the context** instead of the state objects — this re-creates the if/else chain you were trying to eliminate.
- **Confusing State with Strategy** — if an interviewer asks "how is State different from Strategy?", the answer is: State manages its own transitions internally; Strategy is selected once by the client and does not change itself.
- **Not handling illegal transitions** — every state method must do something sensible (print an error or throw) when an action is invalid in the current state, not silently no-op.

## Resources

- [Hello Interview: OOD](https://www.hellointerview.com/learn/code/object-oriented-design/introduction)
- [Refactoring.Guru](https://refactoring.guru/design-patterns)
- [Gaurav Sen: OOD Series](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)
