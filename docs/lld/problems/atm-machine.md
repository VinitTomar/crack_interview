---
title: ATM Machine
sidebar_label: ATM Machine
tags: [lld, machine-coding]
---

# ATM Machine

**Difficulty:** Medium | **Track:** LLD

## Problem statement

Design an ATM machine that handles card insertion, PIN verification, and cash transactions. The system must enforce a strict state machine — operations are only valid in the correct ATM state. It should interact with a bank service for account validation and debiting, and use a denomination algorithm to dispense the minimum number of notes.

## Requirements

**Functional:**
- Accept a card and validate the PIN (block the card after 3 failed attempts)
- Support balance enquiry, cash withdrawal, and mini-statement operations
- Dispense cash using the minimum number of denomination notes
- Print or display a transaction receipt after each operation
- Handle insufficient funds gracefully with a clear error response
- Handle denomination unavailability when the exact amount cannot be dispensed

**Out of scope:**
- Card issuance and physical card management
- Inter-bank network communication and settlement
- Physical hardware control (motors, sensors, card reader firmware)

## Key classes

```java
// State machine
enum ATMState {
    IDLE, CARD_INSERTED, PIN_VERIFIED, TRANSACTION_SELECTED;

    public void transition(ATMState next) { /* validate legal transitions */ }
}

// Domain models
class Card {
    private String cardNumber;
    private String bankCode;
    private boolean isBlocked;
}

class Account {
    private String accountId;
    private double balance;
    private List<Transaction> recentTransactions;
}

class Transaction {
    private TransactionType type;   // WITHDRAWAL, BALANCE_ENQUIRY, MINI_STATEMENT
    private double amount;
    private Instant timestamp;
}

// Bank integration
interface BankService {
    Account validateCard(Card card);
    boolean validatePIN(Card card, String pin);
    double getBalance(String accountId);
    boolean debit(String accountId, double amount);
    List<Transaction> getMiniStatement(String accountId);
}

// Cash dispensing
enum Denomination {
    TWO_THOUSAND(2000), FIVE_HUNDRED(500), TWO_HUNDRED(200), HUNDRED(100);

    private final int value;
    Denomination(int value) { this.value = value; }
    public int getValue() { return value; }
}

class CashDispenser {
    private Map<Denomination, Integer> inventory;

    public Map<Denomination, Integer> dispenseCash(int amount) { /* greedy algorithm */ }
    public boolean canDispense(int amount) { /* check feasibility */ }
    public void restock(Map<Denomination, Integer> notes) { }
}

// Receipt output
interface ReceiptPrinter {
    void printReceipt(Transaction transaction, Account account);
}

// Core ATM orchestrator
class ATM {
    private ATMState currentState;
    private Card currentCard;
    private Account currentSession;
    private int pinAttempts;

    private final BankService bankService;
    private final CashDispenser cashDispenser;
    private final ReceiptPrinter receiptPrinter;

    public void insertCard(Card card) { }
    public boolean enterPIN(String pin) { }
    public double checkBalance() { }
    public boolean withdraw(int amount) { }
    public List<Transaction> getMiniStatement() { }
    public void ejectCard() { }
}
```

## Patterns used

- **State**: The ATM moves through IDLE → CARD_INSERTED → PIN_VERIFIED → TRANSACTION_SELECTED with illegal transitions rejected, keeping state-specific logic encapsulated.
- **Strategy**: The cash dispensing algorithm (greedy by denomination) is isolated in `CashDispenser`, making it swappable without touching ATM orchestration logic.
- **Chain of Responsibility**: A PIN validation → balance check → dispense chain lets each step either handle or reject the request and pass it along, cleanly separating preconditions.
- **Command**: Each transaction (withdrawal, enquiry, statement) is modelled as a Command object, enabling uniform logging, receipt generation, and potential undo support.

## Key design decisions

- **PIN attempt counter lives in ATM session, not BankService**: The ATM owns the lockout logic locally so the bank service interface stays stateless and easily mockable; the card-block signal is sent to the bank only on the third failure.
- **CashDispenser validates feasibility before debiting**: `canDispense(amount)` is checked before calling `bankService.debit()`, preventing a debit with no corresponding cash payout.
- **Denomination enum ordered largest-first**: The greedy algorithm iterates `Denomination.values()` in declaration order, so ordering the enum from largest to smallest avoids sorting overhead on every withdrawal.
- **ReceiptPrinter as interface**: Allows swapping between a thermal printer, on-screen display, and SMS receipt without changing ATM or transaction logic.
- **Session object wraps Card + Account**: Grouping the active card and account into a session makes it easy to clear all ephemeral state atomically on card ejection or timeout.

## What the interviewer is looking for

- **State machine correctness**: Does the design prevent operations in wrong states (e.g., withdrawing before PIN is verified)?
- **Denomination algorithm**: Can you implement and explain the greedy denomination selection, and identify edge cases where exact change is impossible?
- **Error handling breadth**: Are insufficient funds, blocked cards, denomination gaps, and bank service failures all handled distinctly?
- **Interface segregation**: Is `BankService` kept as a thin integration boundary so the ATM core can be unit-tested without a real bank?
- **Thread safety awareness**: Can you identify shared mutable state (inventory in `CashDispenser`) and discuss synchronization if multiple sessions were possible?

## Resources

- [Refactoring.Guru: State](https://refactoring.guru/design-patterns/state)
