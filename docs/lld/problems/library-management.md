---
title: Library Management System
sidebar_label: Library Management System
tags: [lld, machine-coding]
---

# Library Management System

**Difficulty:** Problems | **Track:** LLD

## Problem statement

Design a library management system that allows members to search the catalog, borrow and return physical copies of books, reserve unavailable copies, and pay fines for late returns. Librarians have elevated privileges to add books, manage inventory, and override reservations. The system must track which physical copy is with which member and calculate overdue fines accurately.

## Requirements

**Functional:**
- Members can search the catalog by title, author, or ISBN.
- Members can borrow an available `BookItem`, return it, and reserve a `BookItem` that is currently on loan.
- The system calculates and records fines when a `BookItem` is returned past its due date.
- Librarians can add new `Book` entries and `BookItem` copies, and block/unblock members.

**Out of scope:**
- E-book or digital lending.
- Inter-library loan between branches.

## Key classes

```java
// Catalog and book model
class Book {
    String isbn, title, author, subject;
    List<BookItem> copies;           // all physical copies
}
class BookItem {
    String barcode; BookStatus status; // AVAILABLE, LOANED, RESERVED, LOST
    Book book; Member borrowedBy; LocalDate dueDate;
}
class BookCatalog {
    Map<String, Book> byIsbn;
    void addBook(Book b) { ... }
    List<Book> searchByTitle(String q)  { ... }  // Strategy delegates here
    List<Book> searchByAuthor(String q) { ... }
    List<Book> searchByIsbn(String isbn){ ... }
}

// Member model and roles
class Member {
    String memberId, name, email;
    List<BorrowingRecord> activeLoans;
    boolean blocked;
    void borrowItem(BookItem item) { ... }
    void returnItem(BookItem item) { ... }
}
class Librarian extends Member {
    void addBookItem(Book b, BookItem item) { ... }
    void blockMember(Member m) { ... }
}

// Loan tracking
class BorrowingRecord {
    BookItem item; Member member;
    LocalDate borrowDate, dueDate, returnDate;
}
class Reservation { BookItem item; Member member; LocalDate reservedOn; }

// Services
interface FineCalculator { double calculate(BorrowingRecord r, LocalDate returnedOn); }
class DailyFineCalculator implements FineCalculator { ... }  // Strategy impl
class Library {                                              // Singleton
    BookCatalog catalog; List<Member> members;
    FineCalculator fineCalculator;
    BorrowingRecord issue(Member m, BookItem item)  { ... }
    double returnItem(BorrowingRecord r) { ... }   // returns fine amount
    Reservation reserve(Member m, Book b) { ... }
}
```

## Patterns used

- **Composite**: `BookCatalog` can be organised as a tree of sections and sub-sections (Fiction > Science Fiction > Classic), with search operations traversing the tree uniformly — each node implements the same `Searchable` interface.
- **Repository**: `BookCatalog` acts as a repository abstraction over the underlying data store, exposing domain-oriented query methods (`searchByIsbn`) rather than raw SQL or collection iteration.
- **Strategy**: `FineCalculator` is an interface; the library can swap in `DailyFineCalculator`, `PercentageFineCalculator`, or a grace-period variant without touching `Library`.
- **Observer**: When a borrowed `BookItem` is returned and a `Reservation` is waiting, the `BookItem` notifies the `NotificationService` observer, which emails the waiting member — decoupling status change from notification delivery.

## Key design decisions

- **Separate `Book` from `BookItem`**: `Book` holds immutable metadata (title, author, ISBN); `BookItem` represents a single physical copy with its own barcode, status, and current borrower. This models reality: a library can have ten copies of the same title, each in different states.
- **Role differentiation via inheritance**: `Librarian extends Member` is justified because librarians are members with additional capabilities. Alternatively, a permission-based approach (`Role` enum + access-control checks) scales better if roles evolve — worth discussing trade-offs in the interview.
- **Fine calculation at return time**: Computing fines lazily at return (not daily via a scheduled job) simplifies the design and is sufficient for an interview; the `BorrowingRecord` stores the `dueDate` so the calculation is trivial.
- **Reservation queue per `Book` not per `BookItem`**: Members reserve a title, not a specific copy. When any copy of that title becomes available, the reservation queue for the `Book` is checked and the first waiting member is notified.

## What the interviewer is looking for

- The `Book` vs `BookItem` distinction — conflating them into a single class is the most common mistake in this problem.
- Clean role model: how librarian permissions are enforced (inheritance, decorator, or access-control list).
- Correct Observer wiring for reservation notifications — not polling, but event-driven.
- Discussion of the Strategy pattern for fine calculation and why it matters for extensibility.

## Resources

- [Hello Interview: OOD](https://www.hellointerview.com/learn/code/object-oriented-design/introduction)
- [Grokking OOD](https://github.com/tssovi/grokking-the-object-oriented-design-interview)
