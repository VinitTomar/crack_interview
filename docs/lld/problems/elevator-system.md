---
title: Elevator System
sidebar_label: Elevator System
tags: [lld, machine-coding]
---

# Elevator System

**Difficulty:** Problems | **Track:** LLD

## Problem statement

Design an elevator control system for a multi-floor building with several elevator cars. The system must handle two kinds of requests: external hall-button presses (passengers on a floor pressing Up or Down) and internal cabin-button presses (passengers inside selecting a destination floor). A scheduler dispatches requests to the most suitable elevator and each elevator manages its own state machine — idle, moving up, moving down, or doors open.

## Requirements

**Functional:**
- Accept external requests (floor + direction) from hall buttons on each floor.
- Accept internal requests (destination floor) from buttons inside each elevator cabin.
- Dispatch requests to the most suitable elevator via a pluggable scheduling algorithm.
- Each elevator tracks and displays its current floor number and direction.
- Elevators open and close doors automatically when reaching a requested floor.

**Out of scope:**
- Weight sensors or overload detection.
- Priority queues for emergency or VIP service.

## Key classes

```java
// State pattern — one interface, four concrete states
interface ElevatorState {
    void handleRequest(Elevator e, Request r);
    void move(Elevator e);
}
class IdleState      implements ElevatorState { ... }
class MovingUpState  implements ElevatorState { ... }
class MovingDownState implements ElevatorState { ... }
class DoorsOpenState implements ElevatorState { ... }

class Elevator {
    int id, currentFloor;
    ElevatorState state;           // current state object
    SortedSet<Integer> upQueue;    // floors to visit going up
    SortedSet<Integer> downQueue;  // floors to visit going down
    void addRequest(Request r) { ... }
    void step() { state.move(this); }  // called each time-tick
    void setState(ElevatorState s) { this.state = s; }
}

// Command pattern — button press becomes a Request object
class Request {
    int floor; Direction direction; RequestType type; // EXTERNAL | INTERNAL
}

// Strategy pattern — scheduling is interchangeable
interface Scheduler {
    Elevator dispatch(List<Elevator> elevators, Request r);
}
class ScanScheduler  implements Scheduler { ... }  // LOOK/SCAN algorithm
class NearestScheduler implements Scheduler { ... } // nearest idle car

class ElevatorSystem {
    List<Elevator> elevators;
    Scheduler scheduler;
    void handleExternalRequest(int floor, Direction dir) { ... }
    void handleInternalRequest(int elevatorId, int floor) { ... }
}
```

## Patterns used

- **State**: Each `ElevatorState` implementation encapsulates the behavior for one lifecycle phase. Transitions (`IdleState` → `MovingUpState`) happen inside state objects, keeping `Elevator` free of large switch/if chains.
- **Strategy**: `Scheduler` is an interface. Swapping `ScanScheduler` for `NearestScheduler` (or a ML-based dispatcher) requires no changes to `ElevatorSystem`.
- **Command**: A hall or cabin button press is reified as a `Request` object. This decouples the button hardware from the dispatcher and makes requests serialisable and loggable.
- **Observer**: Each `Elevator` notifies a `FloorDisplay` observer when its `currentFloor` changes, updating the floor indicator lights without the elevator knowing about the display.

## Key design decisions

- **SCAN/LOOK scheduling over FCFS**: First-Come-First-Served can cause starvation for passengers at distant floors. SCAN sweeps the elevator in one direction, servicing all floors in its path before reversing — similar to a disk read head — minimising average travel distance.
- **Separate up/down queues per elevator**: Maintaining two sorted sets (one for each direction) allows the elevator to service all stops in a sweep before reversing, which directly maps to the SCAN algorithm without extra bookkeeping.
- **State objects own transition logic**: Putting `handleRequest` and `move` on the state object rather than in `Elevator` means adding a new state (e.g., `MaintenanceState`) only requires a new class, not a change to `Elevator`.
- **External vs internal request types**: Distinguishing `RequestType` matters because internal requests are guaranteed to come from passengers already inside a specific elevator, whereas external requests must be assigned by the scheduler.

## What the interviewer is looking for

- Clear state machine for the elevator lifecycle with well-defined transitions.
- Justification for SCAN/LOOK over simpler FCFS — awareness that scheduling choice has real impact on user experience.
- Understanding that the scheduler is a policy that should be swappable, not hardcoded.
- Concurrency awareness: multiple elevators run in parallel; shared `Scheduler` access and `Elevator` state updates must be thread-safe.

## Resources

- [Hello Interview: OOD](https://www.hellointerview.com/learn/code/object-oriented-design/introduction)
- [Grokking OOD](https://github.com/tssovi/grokking-the-object-oriented-design-interview)
