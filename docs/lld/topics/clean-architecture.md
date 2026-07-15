---
title: Clean Architecture & Layered Design
sidebar_label: Clean Architecture & Layered Design
tags: [lld, concurrency-architecture]
---

# Clean Architecture & Layered Design
> **Level**: Concurrency & Architecture | **Track**: Low Level Design

## Why it matters in interviews

Clean Architecture questions assess your ability to design maintainable, testable systems — a signal that you can work on production codebases without creating tight coupling. Companies like Google, Uber, and Airbnb ask "how would you structure this system?" expecting you to separate domain logic from infrastructure concerns. Demonstrating this shows you understand that business rules should not depend on databases, frameworks, or HTTP — a strong differentiator at senior+ levels.

## Core concepts

- **The Dependency Rule**: inner layers never import outer layers — dependencies always point inward toward the domain
- **Domain layer**: entities, value objects, domain services — pure Java, no frameworks, no imports from outer layers
- **Application Service layer**: orchestrates domain objects and handles use-case logic; contains no business rules itself
- **Infrastructure/Adapter layer**: repository implementations (JPA/JDBC), HTTP controllers, external API clients — all live here
- **Ports**: interfaces defined in the domain or application layer that describe what the outside world must provide
- **Adapters**: concrete implementations of those ports that live in the infrastructure layer
- **Package structure**: `domain/` for entities and repository interfaces, `service/` for use-case orchestration, `repository/` impl in infra, `api/` for controllers
- **Testability**: domain and service logic can be unit-tested with plain Java — no Spring context, no database, no HTTP stack required

## Code example

```java
// domain/Book.java — pure entity, no framework annotations
public class Book {
    private final String isbn;
    private String title;
    private boolean checkedOut;

    public Book(String isbn, String title) {
        this.isbn = isbn;
        this.title = title;
        this.checkedOut = false;
    }

    public void checkout() {
        if (checkedOut) throw new IllegalStateException("Book already checked out: " + isbn);
        this.checkedOut = true;
    }

    public boolean isCheckedOut() { return checkedOut; }
    public String getIsbn()       { return isbn; }
}

// domain/BookRepository.java — PORT: interface lives in domain layer
public interface BookRepository {
    Book findByIsbn(String isbn);
    void save(Book book);
}

// service/CheckoutService.java — APPLICATION layer, depends only on the port
public class CheckoutService {
    private final BookRepository bookRepository;   // injected, never instantiated here

    public CheckoutService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void checkout(String isbn) {
        Book book = bookRepository.findByIsbn(isbn);
        if (book == null) throw new IllegalArgumentException("Book not found: " + isbn);
        book.checkout();
        bookRepository.save(book);
    }
}

// infrastructure/InMemoryBookRepository.java — ADAPTER: implements the port
import java.util.HashMap;
import java.util.Map;

public class InMemoryBookRepository implements BookRepository {
    private final Map<String, Book> store = new HashMap<>();

    @Override
    public Book findByIsbn(String isbn) { return store.get(isbn); }

    @Override
    public void save(Book book) { store.put(book.getIsbn(), book); }
}

// test/CheckoutServiceTest.java — NO Spring, NO DB, NO HTTP — plain unit test
public class CheckoutServiceTest {
    @Test
    public void checkout_marksBookAsCheckedOut() {
        BookRepository repo = new InMemoryBookRepository();
        repo.save(new Book("978-0", "Clean Code"));
        CheckoutService service = new CheckoutService(repo);

        service.checkout("978-0");

        assertTrue(repo.findByIsbn("978-0").isCheckedOut());
    }
}
```

## When to use

| Scenario | Use this when... |
|---|---|
| Simple CRUD app (users, products, settings) | You likely don't need it — a flat layered approach (controller → service → repository) is sufficient and faster to build |
| Complex domain logic (lending rules, pricing, workflows) | Use it — isolating domain logic from infrastructure pays off as rules grow and change independently of the DB or API |
| Multiple delivery mechanisms (REST + gRPC + CLI) | Use it — ports and adapters let you plug in different adapters without touching domain code |
| High unit-test coverage required | Use it — the Dependency Rule ensures domain tests run in milliseconds with no infrastructure spin-up |
| Prototype or hackathon | Don't need it — the extra structure slows initial velocity when requirements are still unknown |

## Common interview mistakes

- **Putting business logic in controllers or repositories** — the controller should only parse HTTP, the repository should only persist; domain rules belong in entities or domain services
- **Defining repository interfaces in the infrastructure layer** — the interface is a port and must live in the domain or application layer so that inner layers are never forced to import outer ones
- **Treating the service layer as a pass-through** — if every service method is just `repo.findById` → `return`, there is no use-case orchestration happening; the layer adds no value and signals the design was not thought through
- **Skipping the domain model entirely** — jumping straight to an anemic data class with no behavior means all logic leaks into services, defeating the purpose of Clean Architecture
- **Over-engineering small problems** — applying full hexagonal architecture to a two-table CRUD app signals poor judgment; interviewers want to see you know when to use it, not just how
- **Circular dependencies between layers** — forgetting the Dependency Rule and letting the domain import from the service layer or infrastructure layer breaks the entire isolation guarantee

## Covered by Problems

| Problem | Link |
|---|---|
| Connection Pool Manager | [→](/docs/lld/problems/connection-pool) |
| Food Delivery System | [→](/docs/lld/problems/food-delivery) |

## Resources

- [Uncle Bob: The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Baeldung: Hexagonal Architecture](https://www.baeldung.com/hexagonal-architecture-ddd-spring)
