---
title: Structural Patterns — Composite & Bridge
sidebar_label: Composite & Bridge
tags: [lld, patterns]
---

# Structural Patterns — Composite & Bridge

> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Composite is the go-to pattern for any tree-structured domain — file systems, org charts, UI hierarchies, expression trees. Bridge solves a subtler but equally common problem: avoiding the N×M subclass explosion when you have two orthogonal dimensions of variation. Recognising which problem you're facing and naming it confidently is a strong interview signal.

## Core concepts

**Composite** defines a *component* interface implemented by both leaf nodes and container nodes. Containers hold a list of components (which may themselves be containers), so the client treats a single item and an entire subtree through the same interface.

**Bridge** separates an *abstraction* (the high-level control layer) from its *implementation* (the platform-specific layer) by having the abstraction hold a reference to an implementation object rather than inheriting from it. This lets each hierarchy grow independently.

Key distinctions:
- **Composite** is about uniform treatment of tree structures; every node is a *component*.
- **Bridge** is about cross-product prevention; it's designed up-front, unlike **Adapter** which is retrofitted.
- Both patterns use *composition over inheritance*, but for different reasons.

## Code example

```java
// ── COMPOSITE: File System ────────────────────────────────────────────────────

interface FileSystemEntry {
    String getName();
    long getSize();
    void print(String indent);
}

class File implements FileSystemEntry {
    private final String name;
    private final long size;

    File(String name, long size) { this.name = name; this.size = size; }

    public String getName() { return name; }
    public long   getSize() { return size; }
    public void   print(String indent) {
        System.out.println(indent + name + " (" + size + " bytes)");
    }
}

class Directory implements FileSystemEntry {
    private final String name;
    private final List<FileSystemEntry> children = new ArrayList<>();

    Directory(String name) { this.name = name; }

    void add(FileSystemEntry entry) { children.add(entry); }

    public String getName() { return name; }
    public long   getSize() { return children.stream().mapToLong(FileSystemEntry::getSize).sum(); }
    public void   print(String indent) {
        System.out.println(indent + "[" + name + "] (" + getSize() + " bytes)");
        children.forEach(c -> c.print(indent + "  "));
    }
}

// ── BRIDGE: Shape + DrawingAPI ────────────────────────────────────────────────

interface DrawingAPI {
    void drawCircle(double x, double y, double radius);
}

class SVGDrawing    implements DrawingAPI { /* SVG output */ }
class RasterDrawing implements DrawingAPI { /* pixel output */ }

abstract class Shape {
    protected final DrawingAPI drawingAPI;           // Bridge reference

    Shape(DrawingAPI api) { this.drawingAPI = api; }
    abstract void draw();
}

class Circle extends Shape {
    private final double x, y, radius;

    Circle(double x, double y, double radius, DrawingAPI api) {
        super(api);
        this.x = x; this.y = y; this.radius = radius;
    }

    public void draw() { drawingAPI.drawCircle(x, y, radius); }
}

// Mix freely: new Circle(0, 0, 5, new SVGDrawing());
//             new Circle(0, 0, 5, new RasterDrawing());
```

## When to use

| Situation | Pattern |
|---|---|
| Domain is naturally hierarchical (file system, org chart, menu) | Composite |
| Clients must treat a leaf and a container the same way | Composite |
| Two independent dimensions of variation (shape × renderer, notification × channel) | Bridge |
| You want both hierarchies to grow without touching each other | Bridge |
| Avoiding N×M subclass proliferation | Bridge |

**Decision shortcut**: if you find yourself drawing a tree, think Composite. If you find yourself writing `CircleSVG`, `CircleRaster`, `SquareSVG`, `SquareRaster` — stop and think Bridge.

## Common interview mistakes

- **Forgetting to delegate `getSize()` / aggregate operations in Directory**: Interviewers will ask "what does `getSize()` return on a Directory?" — make sure the composite node recursively accumulates.
- **Making the component interface too fat**: Only put operations that make sense for *both* leaf and composite on the interface. Operations that are composite-only (like `add`) can live on the concrete class or behind a cast.
- **Implementing Bridge via abstract class instead of composition**: The whole point is that the abstraction *holds a reference* to the implementor — not inherits from it. Inheritance collapses the two hierarchies back together.
- **Confusing Bridge with Adapter**: Bridge is designed up-front to keep two hierarchies separate. Adapter is a retrofit to reconcile an existing incompatible interface.

## Covered by Problems

| Problem | Link |
|---|---|
| Library Management System | [→](/docs/lld/problems/library-management) |

## Resources

- [Refactoring.Guru: Composite](https://refactoring.guru/design-patterns/composite)
- [Refactoring.Guru: Bridge](https://refactoring.guru/design-patterns/bridge)
