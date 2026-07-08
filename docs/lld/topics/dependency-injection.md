---
title: Dependency Injection
sidebar_label: Dependency Injection
tags: [lld, patterns]
---

# Dependency Injection

> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Dependency Injection is the single most important structural technique for writing testable code, and interviewers assess it constantly — even when they don't name it explicitly. Any time you design a class and choose between `new SomeService()` internally vs. accepting it as a constructor parameter, that is a DI decision. Getting it wrong turns a simple unit test into an integration test and signals to the interviewer that your design instincts need work.

## Core concepts

**The problem DI solves:** When a class creates its own collaborators with `new`, it is tightly coupled to the concrete implementation. You cannot swap the real `EmailService` for a `FakeEmailService` in tests, and you cannot replace `MySQLUserRepository` with `PostgresUserRepository` without changing `UserService`.

**Dependency Inversion Principle (DIP):** High-level modules should not depend on low-level modules; both should depend on abstractions. DI is the *mechanism* that wires those abstractions at runtime.

### The three injection styles

| Style | Syntax | Recommendation |
|-------|--------|---------------|
| **Constructor injection** | Dependencies passed in the constructor | Preferred — dependencies are explicit, the object is always fully initialized |
| **Setter injection** | Dependencies set via setter methods after construction | Use only for optional dependencies; leaves window where object is partially constructed |
| **Interface injection** | Dependency provides an injector interface the dependent must implement | Rare; mostly seen in legacy frameworks |

### IoC Containers

Manual DI (wiring everything by hand in `main()`) scales badly. IoC containers (Spring, Guice, Dagger) automate the wiring:

- **Spring** scans `@Component` / `@Service` / `@Repository` annotations and builds a bean graph. `@Autowired` on a constructor tells Spring to inject the matching bean.
- **Guice** uses a `Module` class where you call `bind(UserRepository.class).to(MySQLUserRepository.class)` explicitly — more verbose but more transparent.
- **Dagger** (Android/Java) generates wiring code at compile time — no reflection, zero runtime overhead.

The container is just automating the same constructor calls you would write by hand; understanding manual DI makes framework behavior obvious.

## Code example

```java
// ── WITHOUT DI — tight coupling, untestable ──────────────────────────────────
class UserServiceBad {
    private final UserRepository repo  = new MySQLUserRepository();  // ← hard-coded
    private final EmailService   email = new SmtpEmailService();     // ← hard-coded

    public void registerUser(String name, String emailAddr) {
        User user = repo.save(new User(name, emailAddr));
        email.sendWelcome(user);
        // To test this, you need a real MySQL DB and an SMTP server. 🚫
    }
}

// ── WITH DI — depends on interfaces, easy to test ────────────────────────────
interface UserRepository { User save(User user); }
interface EmailService   { void sendWelcome(User user); }

class UserService {
    private final UserRepository repo;
    private final EmailService   email;

    // Constructor injection — dependencies are explicit and non-optional
    public UserService(UserRepository repo, EmailService email) {
        this.repo  = repo;
        this.email = email;
    }

    public void registerUser(String name, String emailAddr) {
        User user = repo.save(new User(name, emailAddr));
        email.sendWelcome(user);
    }
}

// ── PRODUCTION wiring ────────────────────────────────────────────────────────
UserService service = new UserService(
    new MySQLUserRepository(),
    new SmtpEmailService()
);

// ── TEST wiring — no DB, no SMTP required ────────────────────────────────────
class FakeUserRepository implements UserRepository {
    public final List<User> saved = new ArrayList<>();
    @Override public User save(User u) { saved.add(u); return u; }
}

class FakeEmailService implements EmailService {
    public final List<User> welcomed = new ArrayList<>();
    @Override public void sendWelcome(User u) { welcomed.add(u); }
}

@Test
void registerUser_savesAndSendsWelcome() {
    FakeUserRepository fakeRepo  = new FakeUserRepository();
    FakeEmailService   fakeEmail = new FakeEmailService();
    UserService svc = new UserService(fakeRepo, fakeEmail);

    svc.registerUser("Alice", "alice@example.com");

    assertEquals(1, fakeRepo.saved.size());
    assertEquals("Alice", fakeRepo.saved.get(0).name);
    assertEquals(1, fakeEmail.welcomed.size());
}

// ── SPRING annotation style (just to show the idiom) ─────────────────────────
@Service
class UserServiceSpring {
    private final UserRepository repo;
    private final EmailService   email;

    @Autowired   // Spring resolves and injects beans automatically
    public UserServiceSpring(UserRepository repo, EmailService email) {
        this.repo  = repo;
        this.email = email;
    }
}
```

## When to use

- **Always** — if a class needs a collaborator (database, HTTP client, clock, logger), that collaborator should be injected, not instantiated internally.
- Use **constructor injection** as the default. Fall back to setter injection only for dependencies that are genuinely optional with a sensible default.
- Use an **IoC container** (Spring/Guice) when the dependency graph is large enough that manual wiring in `main()` becomes unwieldy.
- Use **Dagger** when you need compile-time safety and cannot afford reflection overhead (Android, performance-critical services).

**Interview tip:** Whenever you instantiate a collaborator inside a class with `new`, that is a DI violation — you are hiding the dependency and making the class untestable. The rule of thumb: if swapping the collaborator for a fake requires editing the class under test, you have a DI problem.

## Common interview mistakes

- **Injecting concrete classes instead of interfaces** — inject `UserRepository` (interface), not `MySQLUserRepository` (concrete). Injecting concrete classes defeats the purpose; you still cannot swap implementations.
- **Using a static service locator / registry instead of injection** — `ServiceLocator.get(UserRepository.class)` hides dependencies just as badly as `new`; it's just a different form of the same problem.
- **Forgetting that DI enables testing, not just flexibility** — when asked *why* DI, lead with testability. Flexibility of deployment is a secondary benefit.
- **Over-injecting** — not every collaborator needs to be injected. `new ArrayList<>()` or `new StringBuilder()` inside a method is fine; those are not services with external side effects. Inject services that talk to I/O or hold shared state.

## Covered by Problems

| Problem | Link |
|---|---|
| Ride Sharing System | [→](/docs/lld/problems/ride-sharing) |
| Thread-Safe Rate Limiter | [→](/docs/lld/problems/rate-limiter-lld) |

## Resources

- [Gaurav Sen: DI & IoC](https://www.youtube.com/watch?v=EPv9-cHEmQw)
- [Refactoring.Guru: DI](https://refactoring.guru/design-patterns/catalog)
