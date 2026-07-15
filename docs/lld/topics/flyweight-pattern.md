---
title: Flyweight Pattern
sidebar_label: Flyweight Pattern
tags: [lld, patterns]
---

# Flyweight Pattern
> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Flyweight comes up in system design and LLD rounds when you need to model a large number of fine-grained objects — chess boards, game maps, document characters, or file system nodes. Companies like Google, Amazon, and EA Games ask it to test whether you can separate shared state from per-instance state. Getting it right signals you understand memory optimization and can design object graphs that scale to millions of instances.

## Core concepts

- **Intrinsic state**: shared, immutable data stored inside the Flyweight object itself — the same instance is reused across all contexts
- **Extrinsic state**: context-specific data (e.g. position, color override) that the caller passes in at the time of each operation
- **FlyweightFactory**: a cache (usually a `HashMap`) that returns an existing Flyweight when the same key is requested, creating one only on first access
- **Use when you have thousands or millions of similar objects** that differ only in a small amount of context-specific data
- **Memory savings**: one Flyweight object per unique type instead of one per instance — a 64-square chess board needs only 12 Flyweight objects, not 32
- **Flyweight objects must be immutable** — because they are shared, any mutation would corrupt all contexts that reference them
- **Client code coordinates**: the caller is responsible for supplying extrinsic state; the Flyweight itself never stores it

## Code example

```java
import java.util.HashMap;
import java.util.Map;

// Flyweight: holds intrinsic (shared, immutable) state
class ChessPiece {
    private final String type;  // e.g. "KING", "QUEEN", "PAWN"
    private final String color; // "WHITE" or "BLACK"

    public ChessPiece(String type, String color) {
        this.type = type;
        this.color = color;
    }

    // Extrinsic state (row, col) passed in — NOT stored here
    public void render(int row, int col) {
        System.out.printf("Rendering %s %s at (%d, %d)%n", color, type, row, col);
    }

    public String getKey() { return color + "_" + type; }
}

// FlyweightFactory: cache keyed on intrinsic state
class ChessPieceFactory {
    private static final Map<String, ChessPiece> cache = new HashMap<>();

    public static ChessPiece get(String type, String color) {
        String key = color + "_" + type;
        cache.computeIfAbsent(key, k -> new ChessPiece(type, color));
        return cache.get(key);
    }

    public static int getCacheSize() { return cache.size(); }
}

// Context: stores extrinsic state + a reference to the shared Flyweight
class PiecePlacement {
    private final ChessPiece piece; // shared flyweight
    private final int row;          // extrinsic
    private final int col;          // extrinsic

    public PiecePlacement(String type, String color, int row, int col) {
        this.piece = ChessPieceFactory.get(type, color);
        this.row = row;
        this.col = col;
    }

    public void render() { piece.render(row, col); }
}

// Board: uses flyweights via PiecePlacement
class Board {
    private final PiecePlacement[] placements = new PiecePlacement[32];
    private int count = 0;

    public void place(String type, String color, int row, int col) {
        placements[count++] = new PiecePlacement(type, color, row, col);
    }

    public void render() {
        for (int i = 0; i < count; i++) placements[i].render();
        System.out.println("Flyweight objects in cache: " + ChessPieceFactory.getCacheSize());
    }

    public static void main(String[] args) {
        Board board = new Board();
        board.place("PAWN", "WHITE", 2, 1);
        board.place("PAWN", "WHITE", 2, 2);
        board.place("PAWN", "WHITE", 2, 3); // reuses WHITE_PAWN flyweight
        board.place("KING", "BLACK", 8, 5);
        board.place("QUEEN", "WHITE", 1, 4);
        board.render();
        // Output: cache holds 3 objects, not 5
    }
}
```

## When to use

| Scenario | Use this when... |
|---|---|
| Game entities (chess pieces, map tiles, bullets) | Thousands of objects share type/color/sprite — only position differs |
| Text rendering (characters in a document) | Each glyph is a flyweight; font/style are intrinsic, position is extrinsic |
| In-memory file system nodes | File metadata (permissions, type) is shared; path/parent is extrinsic |
| Particle systems / simulations | Particle type and appearance are shared; velocity and position are extrinsic |
| Connection pool objects | Shared configuration is intrinsic; per-request context is extrinsic |
| Small number of object types | Overkill — just use plain objects; factory overhead is not worth it |
| Objects with mostly unique state | Flyweight saves nothing if there is little shared intrinsic data |

## Common interview mistakes

- **Storing extrinsic state inside the Flyweight** — this breaks sharing entirely because the object becomes instance-specific and is no longer safe to reuse
- **Making the Flyweight mutable** — shared objects must be immutable; candidates often forget to enforce this and introduce subtle bugs across all contexts
- **Skipping the factory** — instantiating Flyweights with `new` at call sites defeats the pattern; the factory and its cache are non-negotiable
- **Confusing Flyweight with Singleton** — a Singleton has exactly one instance globally; a Flyweight factory manages one instance *per unique intrinsic key*, which can be many objects
- **Not identifying the intrinsic/extrinsic split** — diving into code before articulating what is shared vs context-specific is the most common early stumble; always state the split out loud first
- **Ignoring thread safety** — in concurrent contexts the factory cache needs synchronization (e.g. `ConcurrentHashMap`) or a double-checked locking pattern

## Covered by Problems

| Problem | Link |
|---|---|
| Chess Game | [→](/docs/lld/problems/chess-game) |
| In-Memory File System | [→](/docs/lld/problems/file-system) |

## Resources

- [Refactoring.Guru: Flyweight](https://refactoring.guru/design-patterns/flyweight)
