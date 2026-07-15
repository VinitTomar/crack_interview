---
title: Visitor Pattern
sidebar_label: Visitor Pattern
tags: [lld, patterns]
---

# Visitor Pattern
> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Visitor comes up when an interviewer asks you to add behaviour to a sealed class hierarchy without modifying it — a classic Open/Closed Principle question. Companies like Google, Meta, and Amazon use it to probe whether you can separate algorithms from the data structures they operate on. Demonstrating double dispatch correctly signals a deeper understanding of polymorphism beyond simple method overriding.

## Core concepts

- **Double dispatch**: the operation executed depends on both the element's runtime type AND the visitor's runtime type — Java's single-dispatch polymorphism cannot do this alone
- **`accept(Visitor)` is the key**: each element implements `accept(ShapeVisitor v)` and calls `v.visit(this)` — this second call resolves the visitor's overloaded `visit` to the correct concrete type
- **Open/Closed Principle**: new operations (e.g. export to SVG) are added as new `Visitor` implementations without touching any element class
- **Centralised operation families**: all serialisation logic lives in one `SerializerVisitor`, all area logic in `AreaCalculatorVisitor` — no scattering across element classes
- **Drawback — fragile to new elements**: adding a new `Shape` subclass requires adding a `visit(NewShape)` method to every existing visitor, breaking the Open/Closed Principle in the other direction
- **Separation of concerns**: element classes remain focused on their own state; visitors own the algorithms

## Code example

```java
// --- Element interface ---
public interface Shape {
    void accept(ShapeVisitor visitor);
}

// --- Concrete elements ---
public class Circle implements Shape {
    public final double radius;
    public Circle(double radius) { this.radius = radius; }

    @Override
    public void accept(ShapeVisitor visitor) { visitor.visit(this); }
}

public class Rectangle implements Shape {
    public final double width, height;
    public Rectangle(double width, double height) {
        this.width = width; this.height = height;
    }

    @Override
    public void accept(ShapeVisitor visitor) { visitor.visit(this); }
}

public class Triangle implements Shape {
    public final double a, b, c; // side lengths
    public Triangle(double a, double b, double c) {
        this.a = a; this.b = b; this.c = c;
    }

    @Override
    public void accept(ShapeVisitor visitor) { visitor.visit(this); }
}

// --- Visitor interface ---
public interface ShapeVisitor {
    void visit(Circle circle);
    void visit(Rectangle rectangle);
    void visit(Triangle triangle);
}

// --- Concrete visitor 1: area ---
public class AreaCalculatorVisitor implements ShapeVisitor {
    private double result;

    public double getResult() { return result; }

    @Override public void visit(Circle c)    { result = Math.PI * c.radius * c.radius; }
    @Override public void visit(Rectangle r) { result = r.width * r.height; }
    @Override public void visit(Triangle t)  {
        double s = (t.a + t.b + t.c) / 2;
        result = Math.sqrt(s * (s - t.a) * (s - t.b) * (s - t.c)); // Heron's formula
    }
}

// --- Concrete visitor 2: perimeter ---
public class PerimeterCalculatorVisitor implements ShapeVisitor {
    private double result;

    public double getResult() { return result; }

    @Override public void visit(Circle c)    { result = 2 * Math.PI * c.radius; }
    @Override public void visit(Rectangle r) { result = 2 * (r.width + r.height); }
    @Override public void visit(Triangle t)  { result = t.a + t.b + t.c; }
}

// --- New operation added WITHOUT touching Shape classes ---
public class SvgExportVisitor implements ShapeVisitor {
    private String svg;

    public String getSvg() { return svg; }

    @Override public void visit(Circle c)    { svg = "<circle r=\"" + c.radius + "\" />"; }
    @Override public void visit(Rectangle r) { svg = "<rect width=\"" + r.width + "\" height=\"" + r.height + "\" />"; }
    @Override public void visit(Triangle t)  { svg = "<!-- triangle sides: " + t.a + ", " + t.b + ", " + t.c + " -->"; }
}

// --- Usage ---
// Shape shape = new Circle(5);
// AreaCalculatorVisitor areaVisitor = new AreaCalculatorVisitor();
// shape.accept(areaVisitor);
// System.out.println(areaVisitor.getResult()); // 78.53...
```

## When to use

| Scenario | Use this when... |
|---|---|
| Stable type hierarchy, many new operations | The set of element types is fixed and you need to keep adding algorithms (reporting, serialisation, validation) — Visitor is ideal |
| Unstable hierarchy (types added often) | Each new element type forces updates to all visitors — prefer a Strategy or simply adding a method to the interface instead |
| Accumulating unrelated operations on elements | Methods like `toJson()`, `toXml()`, `calculateCost()` are polluting your element classes — move them into separate visitors |
| Compiler-enforced exhaustiveness | If the visitor interface lists every element, the compiler will flag any visitor that forgets to handle a new element type |

## Common interview mistakes

- Forgetting that `accept` must call `visitor.visit(this)` — candidates sometimes call a method on the visitor with a cast, losing the double-dispatch benefit entirely
- Making the visitor interface return `void` and then struggling to extract results; consider a generic `Visitor<R>` or a result field on the visitor
- Confusing Visitor with Strategy — Strategy varies a single algorithm for one type, Visitor varies behaviour across an entire type hierarchy
- Trying to use Visitor when the element hierarchy is actively growing, then spending interview time patching every visitor for each new type
- Not explaining *why* double dispatch is needed — just saying "it calls visit" without articulating that Java resolves overloads at compile time using the static type, not the runtime type
- Leaving the `accept` method out of the element and attempting to handle dispatch externally with `instanceof` chains, which defeats the pattern entirely

## Covered by Problems

| Problem | Link |
|---|---|
| In-Memory File System | [→](/docs/lld/problems/file-system) |

## Resources

- [Refactoring.Guru: Visitor](https://refactoring.guru/design-patterns/visitor)
