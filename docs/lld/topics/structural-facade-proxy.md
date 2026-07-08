---
title: Structural Patterns — Facade & Proxy
sidebar_label: Facade & Proxy
tags: [lld, patterns]
---

# Structural Patterns — Facade & Proxy

> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Facade and Proxy appear constantly in LLD rounds because they model how real systems manage complexity and cross-cutting concerns. Interviewers use them to test whether you know when to add an indirection layer instead of piling logic into existing classes. Getting these right demonstrates clean separation of concerns and an instinct for production-quality design.

## Core concepts

**Facade** wraps a set of complex, interdependent subsystem classes behind a single high-level interface. Clients talk only to the facade and have no dependency on the internals. This is the pattern behind most SDK entry points and service orchestrators.

**Proxy** wraps a single object and intercepts calls to it, allowing you to inject behaviour (caching, auth, logging, lazy-init) without touching the original class. The proxy and the real object share the same interface, so callers are unaware of the indirection.

Key distinctions to have ready:
- **Proxy vs. Decorator**: Proxy controls *access* or *lifecycle* of one object. Decorator *adds* optional behaviour and can be stacked.
- **Proxy types**: virtual (lazy init), protection (auth), remote (network), caching.
- **Facade** aggregates many classes; **Proxy** wraps exactly one.

## Code example

```java
// ── FACADE ──────────────────────────────────────────────────────────────────

class TV          { void on() {}  void off() {} }
class Amplifier   { void on() {}  void setVolume(int v) {} }
class DvdPlayer   { void on() {}  void play(String movie) {} }

class HomeTheaterFacade {
    private final TV tv;
    private final Amplifier amp;
    private final DvdPlayer dvd;

    HomeTheaterFacade(TV tv, Amplifier amp, DvdPlayer dvd) {
        this.tv = tv; this.amp = amp; this.dvd = dvd;
    }

    // One method instead of six sequential calls in the client
    void watchMovie(String movie) {
        tv.on();
        amp.on();
        amp.setVolume(20);
        dvd.on();
        dvd.play(movie);
    }

    void endMovie() { tv.off(); /* amp/dvd off … */ }
}

// ── PROXY ────────────────────────────────────────────────────────────────────

interface UserService {
    User findById(String id);
}

class UserServiceImpl implements UserService {
    public User findById(String id) {
        // expensive DB call
        return db.query(id);
    }
}

class CachingUserService implements UserService {
    private final UserService delegate;
    private final Map<String, User> cache = new HashMap<>();

    CachingUserService(UserService delegate) {
        this.delegate = delegate;
    }

    @Override
    public User findById(String id) {
        return cache.computeIfAbsent(id, delegate::findById);
    }
}
```

## When to use

| Situation | Pattern |
|---|---|
| Client must coordinate 3+ subsystem classes in a fixed sequence | Facade |
| You want to hide legacy or third-party complexity behind a clean API | Facade |
| Add caching, logging, or auth without modifying the original class | Proxy |
| Delay expensive object creation until first use | Virtual Proxy |
| Enforce access control on a sensitive resource | Protection Proxy |

**Decision shortcut**: if the problem says "add auth / caching / logging without changing the original class", reach for Proxy first.

## Common interview mistakes

- **Confusing Proxy with Decorator**: Say out loud — "Proxy controls access to one object, Decorator stacks extra behaviour on top." Interviewers specifically probe this.
- **Making the Facade stateful or business-logic-heavy**: A Facade should only *delegate and sequence*, not own business rules. Keep it thin.
- **Forgetting the shared interface on Proxy**: The proxy must implement the same interface as the real subject — otherwise callers cannot be swapped transparently.
- **Using Facade when Adapter is needed**: Facade simplifies a *compatible* subsystem. Adapter converts an *incompatible* interface. If the existing interface already fits, you don't need Facade.

## Resources

- [Hello Interview: OOD](https://www.hellointerview.com/learn/code/object-oriented-design/introduction)
- [Refactoring.Guru](https://refactoring.guru/design-patterns)
- [Gaurav Sen: OOD Series](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)
