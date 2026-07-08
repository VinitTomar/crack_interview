---
title: Structural Patterns — Adapter & Decorator
sidebar_label: Adapter & Decorator
tags: [lld, patterns]
---

# Structural Patterns — Adapter & Decorator

> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Adapter and Decorator are the two structural patterns that come up most in LLD interviews because they model real-world constraints: integrating legacy code and extending behavior without modification. Knowing the one-sentence distinction — *Adapter changes an interface, Decorator adds behavior through the same interface* — lets you answer "how would you add caching/logging/retry to X without modifying X?" instantly.

## Core concepts

- **Adapter** — wraps an incompatible class so it conforms to an interface the client expects; the wrapped class's interface *changes* from the client's perspective
- **Object adapter vs class adapter** — object adapter uses composition (preferred); class adapter uses multiple inheritance (available in C++, not Java)
- **Decorator** — wraps a component that already implements the target interface, adding behavior before/after delegating to it; the interface stays *the same*
- **Stacking decorators** — decorators can be layered: `new CachingService(new LoggingService(new UserService()))` — each layer adds one responsibility
- **Open/Closed connection** — both patterns let you extend behavior (Open) without modifying existing code (Closed); the choice depends on whether the interface matches

## Code example

```java
// ===== ADAPTER =====
// Legacy class with a different interface — you cannot modify it
class LegacyLogger {
    public void writeLog(String severity, String msg) {
        System.out.printf("[%s] %s%n", severity, msg);
    }
}

// New interface the rest of the system expects
interface Logger {
    void info(String message);
    void error(String message);
}

// Adapter: wraps LegacyLogger, exposes Logger
class LegacyLoggerAdapter implements Logger {
    private final LegacyLogger legacy;

    public LegacyLoggerAdapter(LegacyLogger legacy) { this.legacy = legacy; }

    @Override public void info(String message)  { legacy.writeLog("INFO",  message); }
    @Override public void error(String message) { legacy.writeLog("ERROR", message); }
}

// Client code depends only on Logger — no knowledge of LegacyLogger
Logger logger = new LegacyLoggerAdapter(new LegacyLogger());
logger.info("Application started");


// ===== DECORATOR =====
// Base service interface
interface UserService {
    User getUser(String id);
    void saveUser(User user);
}

// Concrete implementation
class UserServiceImpl implements UserService {
    public User getUser(String id)      { /* DB call */ return new User(id); }
    public void saveUser(User user)     { /* DB call */ }
}

// Decorator: wraps UserService, adds request/response logging
class LoggingUserService implements UserService {
    private final UserService delegate;
    private final Logger logger;

    public LoggingUserService(UserService delegate, Logger logger) {
        this.delegate = delegate;
        this.logger   = logger;
    }

    @Override
    public User getUser(String id) {
        logger.info("getUser called with id=" + id);
        User result = delegate.getUser(id);
        logger.info("getUser returned: " + result);
        return result;
    }

    @Override
    public void saveUser(User user) {
        logger.info("saveUser called: " + user);
        delegate.saveUser(user);
        logger.info("saveUser completed");
    }
}

// Stack a caching decorator on top of the logging decorator:
UserService service = new CachingUserService(
    new LoggingUserService(
        new UserServiceImpl(), logger
    )
);
```

## When to use

| Pattern | Use when... | Signal phrase in interviews |
|---|---|---|
| Adapter | You have an existing class with the right behavior but the wrong interface | "We have a legacy X, can we make it work with the new Y interface?" |
| Decorator | You want to add behavior to an object without subclassing and without modifying the original | "How would you add caching/logging/retry to X without changing X?" |
| Neither | You control the original class and can modify it safely | Refactor instead of wrapping |

**The golden rule**: if the interviewer asks *"how would you add caching to the UserService without modifying UserService?"* — the answer is always Decorator.

## Common interview mistakes

- **Confusing Adapter with Decorator** — Adapter bridges two *different* interfaces; Decorator wraps an object that already implements the *same* interface; if you're not sure, ask: "does the wrapped object implement the same interface the client expects?"
- **Using inheritance for Decorator** — subclassing adds static behavior; Decorator composes at runtime and lets you stack multiple concerns independently
- **Forgetting to delegate** — a common bug: writing the logging Decorator but not calling `delegate.getUser(id)`, so the method logs but returns null
- **Adapter when a simple façade would do** — if you're wrapping an entire subsystem (not adapting one interface to another), a Façade is the right pattern, not Adapter

## Covered by Problems

| Problem | Link |
|---|---|
| Parking Lot System | [→](/docs/lld/problems/parking-lot) |
| Ride Sharing System | [→](/docs/lld/problems/ride-sharing) |

## Resources

- [Refactoring.Guru: Adapter](https://refactoring.guru/design-patterns/adapter)
- [Refactoring.Guru: Decorator](https://refactoring.guru/design-patterns/decorator)
