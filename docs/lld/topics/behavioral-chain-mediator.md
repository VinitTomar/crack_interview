---
title: Behavioral Patterns — Chain of Responsibility & Mediator
sidebar_label: Chain of Responsibility & Mediator
tags: [lld, patterns]
---

# Behavioral Patterns — Chain of Responsibility & Mediator

> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Chain of Responsibility appears in nearly every backend system as middleware, filters, or interceptors — understanding it lets you model HTTP pipelines, logging hierarchies, and support escalation cleanly. Mediator is critical for any design where many objects need to communicate without becoming a tangled web of direct references; chat systems, air traffic control, and UI widget coordination are all classic prompts.

## Core concepts

### Chain of Responsibility

A request is passed along a linked list of handler objects. Each handler either processes the request or forwards it to the next handler. The sender does not know which handler will ultimately respond.

Key points:
- Every handler implements a common `Handler` interface (or abstract class) and holds a reference to the **next** handler (`successor`).
- A handler can short-circuit the chain by not calling `next.handle()` — useful for auth or rate limiting that must reject before reaching downstream logic.
- The chain is assembled at runtime by the caller, not hard-coded inside the handlers — this is what makes it composable.
- **Chain vs. Decorator**: both wrap a core handler, but Decorator always forwards and adds behavior; Chain can stop propagation.

### Mediator

Instead of letting N objects reference each other (N² relationships), all communication goes through one **Mediator** object. Components only know about the mediator; they call `mediator.send(message, sender)` and the mediator decides who receives it.

Key points:
- Dramatically reduces coupling: adding a new participant requires changing only the mediator, not every existing component.
- The mediator can contain coordination logic that doesn't belong inside any single component (e.g., "if user A sends to room, broadcast to all except A").
- **Mediator vs. Facade**: Facade is one-directional — it simplifies access to a subsystem from the outside. Mediator is bidirectional — it facilitates communication *between* components that are all peers.
- **Mediator vs. Observer**: Observer is a 1-to-many broadcast; Mediator handles many-to-many with custom routing logic.

## Code example

```java
// ── CHAIN OF RESPONSIBILITY — HTTP middleware chain ───────────────────────────
interface Middleware {
    void handle(HttpRequest request, Middleware next);
}

class AuthMiddleware implements Middleware {
    @Override
    public void handle(HttpRequest request, Middleware next) {
        if (request.getHeader("Authorization") == null) {
            System.out.println("401 Unauthorized — request rejected at AuthMiddleware");
            return;                    // ← short-circuit: chain stops here
        }
        System.out.println("Auth OK");
        next.handle(request, null);   // forward to next in chain
    }
}

class RateLimitMiddleware implements Middleware {
    private final Map<String, Integer> callCount = new HashMap<>();

    @Override
    public void handle(HttpRequest request, Middleware next) {
        String user = request.getHeader("User");
        callCount.merge(user, 1, Integer::sum);
        if (callCount.get(user) > 100) {
            System.out.println("429 Too Many Requests");
            return;
        }
        System.out.println("Rate limit OK");
        next.handle(request, null);
    }
}

class LoggingMiddleware implements Middleware {
    @Override
    public void handle(HttpRequest request, Middleware next) {
        System.out.println("LOG: " + request.getPath());
        next.handle(request, null);
    }
}

class FinalHandler implements Middleware {
    @Override
    public void handle(HttpRequest request, Middleware next) {
        System.out.println("200 OK — handling " + request.getPath());
    }
}

// Assemble the chain at startup
MiddlewareChain chain = new MiddlewareChain(
    new AuthMiddleware(),
    new RateLimitMiddleware(),
    new LoggingMiddleware(),
    new FinalHandler()
);
chain.execute(request);

// ── MEDIATOR — ChatRoom ──────────────────────────────────────────────────────
interface ChatMediator {
    void sendMessage(String message, User sender);
    void addUser(User user);
}

class ChatRoom implements ChatMediator {
    private final List<User> users = new ArrayList<>();

    @Override public void addUser(User user) { users.add(user); }

    @Override
    public void sendMessage(String message, User sender) {
        for (User user : users) {
            if (user != sender) {                     // don't echo to sender
                user.receive(sender.getName() + ": " + message);
            }
        }
    }
}

class User {
    private final String name;
    private final ChatMediator mediator;

    public User(String name, ChatMediator mediator) {
        this.name = name;
        this.mediator = mediator;
    }

    public String getName() { return name; }

    public void send(String message) {
        System.out.println(name + " sends: " + message);
        mediator.sendMessage(message, this);   // Users talk to mediator, NOT to each other
    }

    public void receive(String message) {
        System.out.println(name + " receives: " + message);
    }
}

// Usage
ChatRoom room = new ChatRoom();
User alice = new User("Alice", room);
User bob   = new User("Bob",   room);
User carol = new User("Carol", room);
room.addUser(alice); room.addUser(bob); room.addUser(carol);

alice.send("Hello everyone!");
// Bob receives: Alice: Hello everyone!
// Carol receives: Alice: Hello everyone!
```

## When to use

| Situation | Pattern |
|-----------|---------|
| Pipeline of independent processing steps (auth → rate limit → log) | Chain of Responsibility |
| Processing steps that may short-circuit early (reject bad requests) | Chain of Responsibility |
| Steps need to be reordered or toggled per deployment | Chain of Responsibility |
| N objects need to communicate with each other in arbitrary ways | Mediator |
| Adding a new participant to a group must not require changes in all peers | Mediator |
| Coordination logic (who talks to whom, when) belongs in one place | Mediator |

**Interview tip:** Ask yourself: is this a pipeline where each step independently filters or transforms? → Chain. Is this a many-to-many communication problem where objects are coupled to too many peers? → Mediator. These patterns solve orthogonal problems and are rarely confused once you see them in those terms.

## Common interview mistakes

- **Forgetting to pass `next` into the handler** — handlers need a reference to the successor, not just a `handle()` method; forgetting this makes the chain non-composable.
- **Putting routing logic inside User (or Component) classes** — users should never call `otherUser.receive()` directly; all communication must go through the mediator.
- **Confusing Mediator with Facade** — Facade is a one-way simplification layer for a subsystem; Mediator facilitates *peer-to-peer* communication between equals.
- **Allowing the chain to fail silently** — if no handler processes a request, the chain should either throw or log an explicit warning; silent drops are hard to debug.

## Resources

- [Hello Interview: OOD](https://www.hellointerview.com/learn/code/object-oriented-design/introduction)
- [Refactoring.Guru](https://refactoring.guru/design-patterns)
- [Gaurav Sen: OOD Series](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)
