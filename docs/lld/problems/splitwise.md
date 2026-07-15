---
title: Splitwise / Expense Sharing
sidebar_label: Splitwise / Expense Sharing
tags: [lld, machine-coding]
---

# Splitwise / Expense Sharing

**Difficulty:** Hard | **Track:** LLD

## Problem statement

Design an expense sharing application where users can split expenses and track who owes whom. Users can add expenses with different splitting strategies, view their net balances, settle up with other users, and see a simplified debt graph that minimises the total number of transactions needed to clear all debts.

## Requirements

**Functional:**
- Add an expense with a description, payer, and participants with their share
- Support three split types: EQUAL (split evenly), EXACT (explicit amounts), PERCENTAGE
- Show balance summary: net amount each user owes or is owed
- Settle up: record a payment between two users that reduces their balance
- Show simplified debt graph: minimise total number of transactions to settle all debts

**Out of scope:**
- Group management and group-level expense tracking
- Currency conversion between different currencies
- Recurring or scheduled expenses

## Key classes

```java
// Value Object
public class Money {
    private final BigDecimal amount;
    private final String currency;

    public Money(BigDecimal amount, String currency) { ... }
    public Money add(Money other) { ... }
    public Money subtract(Money other) { ... }
    public boolean isPositive() { ... }
    public boolean isZero() { ... }
}

// Split strategy enum + abstract base
public enum SplitType { EQUAL, EXACT, PERCENTAGE }

public abstract class Split {
    protected SplitType type;
    public abstract Map<User, Money> compute(Money total, List<User> participants);
}

// Concrete split strategies
public class EqualSplit extends Split {
    public Map<User, Money> compute(Money total, List<User> participants) { ... }
}

public class ExactSplit extends Split {
    private final Map<User, Money> exactAmounts;
    public Map<User, Money> compute(Money total, List<User> participants) { ... }
}

public class PercentageSplit extends Split {
    private final Map<User, Double> percentages;
    public Map<User, Money> compute(Money total, List<User> participants) { ... }
}

// Expense aggregate root
public class Expense {
    private final String id;
    private final String description;
    private final User payer;
    private final Money totalAmount;
    private final Map<User, Money> splits;  // computed from Split strategy
    private final LocalDateTime createdAt;
}

// Transaction (for simplified debt output)
public class Transaction {
    private final User from;
    private final User to;
    private final Money amount;
}

// Core service
public class ExpenseService {
    private final Map<String, Expense> expenses;
    private final Map<User, Map<User, Money>> balances;  // user -> owes -> amount

    public Expense addExpense(String description, User payer, Money total,
                              Split split, List<User> participants) { ... }
    private void updateBalances(Expense expense) { ... }
    public void settleUp(User from, User to, Money amount) { ... }
    public Map<User, Money> getBalance(User user) { ... }
    public Map<User, Money> getNetBalances() { ... }
}

// Simplified debt calculator
public class SimplifiedDebtCalculator {
    // Greedy max-creditor / max-debtor algorithm using two priority queues
    public List<Transaction> compute(Map<User, Money> netBalances) { ... }
}
```

## Patterns used

- **Strategy**: Each split type (Equal, Exact, Percentage) is a separate class implementing the same `compute()` interface, making it trivial to add new split types without touching existing code.
- **Value Object**: `Money` is immutable with no identity, encapsulating amount and currency together and preventing primitive-obsession bugs around arithmetic.
- **Domain Modeling / Aggregate Root**: `Expense` owns its split results and is the single source of truth for a transaction; balance state is derived by replaying expenses through `ExpenseService`.
- **Template Method**: The abstract `Split` base class defines the contract and common structure, while concrete subclasses override `compute()` to implement their specific algorithm.

## Key design decisions

- **BigDecimal for Money**: Using `BigDecimal` instead of `double` or `float` avoids floating-point rounding errors that would cause balances to not net to zero over many expenses.
- **Storing computed splits on Expense**: The `Map<User, Money> splits` is stored on the `Expense` at creation time rather than recomputed on read, making balance recalculation a simple replay and ensuring consistency if percentages or participant lists change later.
- **Balance as adjacency map, not net per user**: Maintaining `Map<User, Map<User, Money>>` preserves who owes whom directionally, enabling settle-up between specific pairs, while `getNetBalances()` collapses this into a single net per user for the simplified debt algorithm.
- **Greedy two-heap algorithm for simplification**: The simplified debt calculator uses a max-heap of creditors and a max-debtor heap to greedily pair the largest debtor with the largest creditor, guaranteeing O(n log n) time and at most n-1 transactions.
- **Settle up as a first-class operation**: Rather than modelling settlements as reverse expenses, `settleUp()` directly mutates the balance map, keeping the expense log clean and making balance queries O(1) instead of a full replay.

## What the interviewer is looking for

- Correct handling of `PERCENTAGE` splits that must sum to exactly 100% with validation before `compute()` is called.
- Rounding strategy for `EQUAL` splits where the total may not divide evenly — one common approach is to give the remainder to the payer.
- Thread safety considerations: concurrent `addExpense()` calls mutating shared balance state require either synchronization or an immutable event-sourcing approach.
- Clean separation between the balance data structure and the simplified-debt algorithm — the calculator should be a pure function over net balances, not coupled to `ExpenseService`.
- Ability to extend to new split types (e.g., SHARE-based) by adding a new `Split` subclass with zero changes to `ExpenseService`.

## Resources

- [Martin Fowler: Anemic Domain Model](https://martinfowler.com/bliki/AnemicDomainModel.html)
