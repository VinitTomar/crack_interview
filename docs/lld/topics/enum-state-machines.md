---
title: Enum-Based State Machines
sidebar_label: Enum-Based State Machines
tags: [lld, applied-design]
---

# Enum-Based State Machines
> **Level**: Applied Design | **Track**: Low Level Design

## Why it matters in interviews

Enum-based state machines appear in questions asking you to model entity lifecycle (orders, bookings, ATM sessions, vending machine flows) where all valid states and transitions are known at compile time. Companies like Amazon, Flipkart, and Uber use these scenarios to test whether you can enforce business invariants at the type level rather than through scattered if-else chains. Choosing an enum state machine over ad-hoc booleans signals that you think in terms of valid state graphs, not just flags.

## Core concepts

- **Enum with abstract method**: each enum constant overrides the method body, giving every state its own transition logic co-located with the state definition
- **`transition(Event)` contract**: validates the requested event against the current state and returns the next `State`, throwing `IllegalStateException` for invalid transitions instead of silently ignoring them
- **Closed state set**: enum state machines are ideal when all states are fixed and known at compile time; adding a state is a deliberate, compile-checked change
- **Transition table is co-located**: all valid edges of the state graph live inside the enum, making the full lifecycle readable in one place
- **No extra classes**: unlike the class-per-state State pattern, an enum state machine requires zero additional files for simple lifecycles
- **Enum vs State pattern**: prefer enum when state objects need no instance data and transitions are pure; prefer the full State pattern (see Behavioral: Iterator & State) when each state must carry mutable data or delegate complex behaviour chains
- **Enum vs booleans**: replacing `isConfirmed`, `isShipped`, `isCancelled` booleans with a single enum field eliminates impossible combinations (e.g., both confirmed and cancelled at once)

## Code example

```java
public enum OrderStatus {
    PLACED {
        @Override
        public OrderStatus transition(OrderEvent event) {
            return switch (event) {
                case CONFIRM   -> CONFIRMED;
                case CANCEL    -> CANCELLED;
                default        -> invalid(this, event);
            };
        }
    },
    CONFIRMED {
        @Override
        public OrderStatus transition(OrderEvent event) {
            return switch (event) {
                case SHIP      -> SHIPPED;
                case CANCEL    -> CANCELLED;
                default        -> invalid(this, event);
            };
        }
    },
    SHIPPED {
        @Override
        public OrderStatus transition(OrderEvent event) {
            return switch (event) {
                case DELIVER   -> DELIVERED;
                default        -> invalid(this, event);
            };
        }
    },
    DELIVERED {
        @Override
        public OrderStatus transition(OrderEvent event) {
            return invalid(this, event); // terminal state
        }
    },
    CANCELLED {
        @Override
        public OrderStatus transition(OrderEvent event) {
            return invalid(this, event); // terminal state
        }
    };

    public abstract OrderStatus transition(OrderEvent event);

    protected OrderStatus invalid(OrderStatus current, OrderEvent event) {
        throw new IllegalStateException(
            "Cannot apply " + event + " in state " + current);
    }
}

public enum OrderEvent { CONFIRM, SHIP, DELIVER, CANCEL }

// --- Usage inside Order ---
public class Order {
    private final String id;
    private OrderStatus status = OrderStatus.PLACED;

    public Order(String id) { this.id = id; }

    public void apply(OrderEvent event) {
        status = status.transition(event);
    }

    public OrderStatus getStatus() { return status; }
}

// Driver
Order order = new Order("ORD-001");
order.apply(OrderEvent.CONFIRM);   // PLACED -> CONFIRMED
order.apply(OrderEvent.SHIP);      // CONFIRMED -> SHIPPED
order.apply(OrderEvent.DELIVER);   // SHIPPED -> DELIVERED
order.apply(OrderEvent.CANCEL);    // throws IllegalStateException
```

## When to use

| Scenario | Use this when... |
|---|---|
| Enum state machine | States are a fixed, closed set; no per-state instance data needed; you want the transition graph in one file |
| Class-per-state (State pattern) | Each state holds mutable data, delegates to collaborators, or the transition logic is complex enough to warrant its own class hierarchy |
| Simple booleans | There are at most two mutually exclusive states and no transitions need to be enforced (e.g., `isActive` toggle) |

## Common interview mistakes

- Forgetting terminal states: not throwing (or returning an error) when an event is applied to `DELIVERED` or `CANCELLED`, allowing silent no-ops that hide bugs
- Returning `null` instead of throwing `IllegalStateException` for invalid transitions, forcing callers to null-check and losing the fail-fast contract
- Putting transition logic in the `Order` class (a large `switch` on `status`) rather than in the enum, which scatters the state graph across the codebase
- Conflating the state enum with the event enum — using the same type for both makes transition signatures ambiguous and harder to extend
- Ignoring concurrency: in a multi-threaded context, `status = status.transition(event)` is not atomic; candidates should note the need for synchronization or a compare-and-swap
- Over-engineering by reaching for the full State pattern when there is no per-state data, adding four extra classes for a three-state lifecycle

## Covered by Problems

| Problem | Link |
|---|---|
| Vending Machine | [→](/docs/lld/problems/vending-machine) |
| ATM Machine | [→](/docs/lld/problems/atm-machine) |
| Task Management System | [→](/docs/lld/problems/task-management) |

## Resources

- [Refactoring.Guru: State](https://refactoring.guru/design-patterns/state)
- [Baeldung: Enum State Machine](https://www.baeldung.com/java-enum-simple-state-machine)
