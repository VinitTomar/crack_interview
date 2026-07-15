---
title: Creational Patterns
sidebar_label: Creational Patterns
tags: [lld, patterns]
---

# Creational Patterns

> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Creational patterns appear in nearly every machine-coding problem because every system creates objects. Being able to say "I'll use a Factory Method here because the caller shouldn't know the concrete type" demonstrates design fluency. Builder in particular is a must-have — as soon as a constructor exceeds three parameters, interviewers expect you to reach for it.

## Core concepts

- **Factory Method** — defines a creation interface; subclasses (or a factory class) decide which concrete class to instantiate; the caller only depends on the interface
- **Abstract Factory** — creates *families* of related objects (e.g., a `UIFactory` that produces `Button + Checkbox + TextField` in a consistent theme) without specifying concrete classes
- **Builder** — constructs a complex object step by step; separates construction logic from the object itself; ideal when an object has many optional parameters
- **Singleton** — restricts instantiation to one instance; useful for shared resources (config, connection pool) but makes unit testing hard — prefer dependency injection instead
- **Prototype** — creates new objects by cloning an existing one; useful when construction is expensive and new instances are similar to existing ones

## Code example

```java
// ===== Factory Method =====
interface Vehicle { void drive(); }

class Car        implements Vehicle { public void drive() { System.out.println("Car driving"); } }
class Truck      implements Vehicle { public void drive() { System.out.println("Truck driving"); } }
class Motorcycle implements Vehicle { public void drive() { System.out.println("Bike riding"); } }

class VehicleFactory {
    public static Vehicle create(String type) {
        return switch (type.toUpperCase()) {
            case "CAR"        -> new Car();
            case "TRUCK"      -> new Truck();
            case "MOTORCYCLE" -> new Motorcycle();
            default -> throw new IllegalArgumentException("Unknown vehicle: " + type);
        };
    }
}

// Caller knows only the interface:
Vehicle v = VehicleFactory.create("CAR");
v.drive(); // "Car driving"


// ===== Builder =====
class Pizza {
    enum Size { SMALL, MEDIUM, LARGE }

    private final Size size;           // required
    private final List<String> toppings;
    private final boolean extraCheese;
    private final String crustType;

    private Pizza(Builder b) {
        this.size        = b.size;
        this.toppings    = Collections.unmodifiableList(b.toppings);
        this.extraCheese = b.extraCheese;
        this.crustType   = b.crustType;
    }

    public static class Builder {
        private final Size size;
        private List<String> toppings = new ArrayList<>();
        private boolean extraCheese   = false;
        private String crustType      = "thin";

        public Builder(Size size) { this.size = size; }

        public Builder addTopping(String t) { toppings.add(t); return this; }
        public Builder extraCheese()        { extraCheese = true; return this; }
        public Builder crustType(String c)  { crustType = c; return this; }
        public Pizza build()                { return new Pizza(this); }
    }
}

Pizza pizza = new Pizza.Builder(Pizza.Size.LARGE)
    .addTopping("CHEESE")
    .addTopping("MUSHROOM")
    .extraCheese()
    .crustType("thick")
    .build();


// ===== Singleton (thread-safe, double-checked locking) =====
class ConfigManager {
    private static volatile ConfigManager instance;

    private ConfigManager() {}  // private constructor

    public static ConfigManager getInstance() {
        if (instance == null) {
            synchronized (ConfigManager.class) {
                if (instance == null) instance = new ConfigManager();
            }
        }
        return instance;
    }
}
```

## When to use

| Pattern | Use when... |
|---|---|
| Factory Method | The caller should not know or care which concrete class is created; type varies at runtime |
| Abstract Factory | You need to swap entire families of related objects (e.g., dark theme vs light theme across all widgets) |
| Builder | Constructor has more than 3 parameters, or parameters are optional/combinatorial |
| Singleton | Truly one shared resource (thread pool, config, registry) — prefer DI frameworks over hand-rolled Singleton |
| Prototype | Object construction is expensive (e.g., deep DB query) and new objects are minor variations of existing ones |

## Common interview mistakes

- **Singleton overuse** — reaching for Singleton for every shared object; use it only when there *must* be exactly one instance globally; test code becomes very painful with Singletons
- **Factory when Builder is needed** — if you pass 5 parameters to `VehicleFactory.create(type, color, seats, fuelType, transmission)`, stop and use a `Vehicle.Builder` instead
- **Mutable Builder result** — forgetting to copy the list inside the Builder before assigning to the immutable object; the caller can still mutate the original list reference
- **Abstract Factory vs Factory Method confusion** — Factory Method creates *one* product type; Abstract Factory creates *a family* of related product types in a coordinated way

## Covered by Problems

| Problem | Link |
|---|---|
| Vending Machine | [→](/docs/lld/problems/vending-machine) |
| Parking Lot System | [→](/docs/lld/problems/parking-lot) |
| Library Management System | [→](/docs/lld/problems/library-management) |
| Hotel Booking System | [→](/docs/lld/problems/hotel-booking) |

## Resources

- [Refactoring.Guru: Creational Patterns](https://refactoring.guru/design-patterns/creational-patterns)
