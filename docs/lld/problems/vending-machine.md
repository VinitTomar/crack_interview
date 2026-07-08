---
title: Vending Machine
sidebar_label: Vending Machine
tags: [lld, machine-coding]
---

# Vending Machine

**Difficulty:** Problems | **Track:** LLD

## Problem statement

Design a vending machine that holds multiple products at configurable prices, accepts coins and banknotes, dispenses the selected product, and returns exact change. The machine must handle invalid product selections, insufficient balance, and out-of-stock scenarios without crashing. Every user interaction (insert money, select product, cancel) should behave differently depending on the machine's current state, and those rules must be enforced at the state level rather than scattered across one large class.

## Requirements

**Functional:**
- Insert coins or banknotes; the machine accumulates a running balance shown on the display
- Select a product by code; the machine validates availability and whether balance is sufficient
- Dispense the selected product and return any change due
- Cancel the transaction at any point and return all inserted money

**Out of scope:**
- Restocking workflow and admin UI (assume inventory is pre-loaded)
- Network connectivity or remote monitoring

## Key classes

```java
// State interface — every user action is declared here
interface VendingMachineState {
    void insertMoney(VendingMachine machine, double amount);
    void selectProduct(VendingMachine machine, String productCode);
    void dispense(VendingMachine machine);
    void cancel(VendingMachine machine);
}

// Concrete states
class IdleState            implements VendingMachineState { /* awaiting first coin */ }
class HasMoneyState        implements VendingMachineState { /* money inserted, product not yet selected */ }
class ProductSelectedState implements VendingMachineState { /* product chosen, validating balance */ }
class DispensingState      implements VendingMachineState { /* physically dispensing */ }

// Machine context — holds state reference and delegates all calls
class VendingMachine {              // Singleton
    private VendingMachineState currentState;
    private Inventory inventory;
    private double currentBalance;
    private String selectedProductCode;
    private Display display;

    void setState(VendingMachineState state) { this.currentState = state; }
    void insertMoney(double amount)          { currentState.insertMoney(this, amount); }
    void selectProduct(String code)          { currentState.selectProduct(this, code); }
    void dispense()                          { currentState.dispense(this); }
    void cancel()                            { currentState.cancel(this); }
}

// Supporting classes
class Product   { String code; String name; double price; }
class Inventory { Map<String, Integer> stock; boolean isAvailable(String code); void decrement(String code); }
class Display   { void show(String message); }
class CoinSlot  { double acceptCoin(Coin coin); double acceptNote(Note note); void returnChange(double amount); }
```

## Patterns used

- **State**: each `VendingMachineState` implementation handles the four actions in the way that is valid for that state — e.g., `IdleState.dispense()` just prints an error, while `DispensingState.dispense()` actually releases the product
- **Command**: a button press (insert money, select product) can be wrapped in a `Command` object, making it easy to queue, log, or undo interactions
- **Factory**: a `StateFactory` centralises state construction so `VendingMachine` never calls `new HasMoneyState()` directly, keeping state wiring in one place
- **Strategy**: payment handling (coins vs banknotes vs card) is a `PaymentStrategy`, so adding a card reader does not require changing any state class

## Key design decisions

- **State pattern eliminates if/switch chains**: without State, `selectProduct()` would need to check `if (currentState == IDLE) ... else if (currentState == HAS_MONEY) ...` for every method — adding a new state would require editing every method; with State, you add one new class and touch nothing else
- **`VendingMachine` as context, not logic owner**: the machine holds state and delegates; business rules live in state classes — this keeps `VendingMachine` thin and testable by swapping states
- **Balance held in `VendingMachine`, not in state**: balance survives state transitions, so `HasMoneyState` and `ProductSelectedState` can both read and modify it via the machine context without duplicating fields
- **`Inventory` as a separate class (not a map in `VendingMachine`)**: encapsulating stock management lets you add low-stock alerts or restock logic without touching the machine or any state class

## What the interviewer is looking for

- Immediate recognition that State is the core pattern, not a single large `switch` on an enum field
- Correctly identifying which data belongs to the machine context vs which belongs to a state
- Handling error paths in each state (e.g., selecting a product in `IdleState` when no money has been inserted)
- Keeping the model extensible — adding an `OutOfStockState` or a card payment strategy should not require modifying existing classes

## Resources

- [Hello Interview: Vending Machine](https://www.hellointerview.com/learn/code/object-oriented-design/vending-machine)
- [Grokking OOD: Vending Machine](https://github.com/tssovi/grokking-the-object-oriented-design-interview/blob/master/object-oriented-design-case-studies/design-a-vending-machine.md)
