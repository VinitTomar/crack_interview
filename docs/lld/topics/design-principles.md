---
title: Design Principles
sidebar_label: Design Principles
tags: [lld, fundamentals]
---

# Design Principles

> **Level**: Fundamentals | **Track**: Low Level Design

## Why it matters in interviews

Interviewers use design principles as a litmus test for whether you write production-quality code or just working code. Violating YAGNI by over-engineering a solution is one of the fastest ways to lose points in a machine-coding round. Understanding these four principles lets you justify every design decision you make out loud.

## Core concepts

- **DRY** (Don't Repeat Yourself) — every piece of knowledge should have a single authoritative representation; duplication creates divergence bugs
- **KISS** (Keep It Simple, Stupid) — the simplest solution that solves the problem is the right one; complexity is a liability
- **YAGNI** (You Aren't Gonna Need It) — don't build features, abstractions, or extension points until there is a concrete requirement for them
- **Law of Demeter (LoD)** — a method should only call methods on: itself, its parameters, objects it creates, and its direct fields; avoid chaining through strangers

## Code example

```java
// ===== DRY =====
// BAD: discount logic copy-pasted in two places
double priceForWeb = basePrice * 0.9;
double priceForMobile = basePrice * 0.9; // duplicated magic number

// GOOD: single source of truth
double applyDiscount(double price) { return price * 0.9; }

// ===== KISS =====
// BAD: recursive fibonacci when iterative is clearer for interviewers
int fib(int n) { return n <= 1 ? n : fib(n-1) + fib(n-2); }

// GOOD: loop, no stack-overflow risk, O(n) time O(1) space
int fib(int n) {
    int a = 0, b = 1;
    for (int i = 0; i < n; i++) { int t = a + b; a = b; b = t; }
    return a;
}

// ===== YAGNI =====
// BAD: adding a plugin system "just in case" during a 45-min session
interface DiscountPlugin { double apply(double price); }

// GOOD: implement the one discount type the problem actually asks for
double applyMemberDiscount(double price) { return price * 0.85; }

// ===== Law of Demeter =====
// BAD: train wreck — you reach through three unrelated objects
String city = order.getCustomer().getAddress().getCity();

// GOOD: delegate; Order is responsible for its own data navigation
String city = order.getCustomerCity(); // Order asks its Customer internally
```

## When to use

| Principle | Apply when... | Skip when... |
|-----------|---------------|--------------|
| DRY | The same logic appears 2+ times in different places | A tiny 1-line coincidence that may diverge later |
| KISS | You have two solutions and one is simpler | Simplicity would sacrifice important correctness |
| YAGNI | You are tempted to add an abstraction "for future extensibility" | The requirement is explicit and immediate |
| LoD | You are chaining `.get().get().get()` calls | A fluent builder API where chaining *is* the interface |

## Common interview mistakes

- **Over-engineering with YAGNI violations** — adding abstract factories, plugin systems, or strategy hierarchies when the problem only has one concrete case; interviewers notice this and penalize it
- **DRY at the wrong altitude** — unifying two pieces of code that look the same today but mean different things (accidental duplication); creates tight coupling
- **Confusing LoD with "no chaining ever"** — fluent builders like `Pizza.Builder().size(L).build()` are intentional APIs, not LoD violations; LoD applies to reaching into *unrelated* object graphs
- **Explaining principles without naming them** — if you say "I'll move this to a helper to avoid repeating it", say "DRY" too; interviewers reward vocabulary

## Resources

- [Hello Interview: OOD](https://www.hellointerview.com/learn/code/object-oriented-design/introduction)
- [Refactoring.Guru](https://refactoring.guru/design-patterns)
- [Gaurav Sen: OOD Series](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)
