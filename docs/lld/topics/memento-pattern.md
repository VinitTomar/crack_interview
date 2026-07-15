---
title: Memento Pattern
sidebar_label: Memento Pattern
tags: [lld, patterns]
---

# Memento Pattern
> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Memento answers undo/redo questions — one of the most common behavioral design pattern scenarios in LLD rounds at companies like Google, Microsoft, and Atlassian. It signals that you understand encapsulation boundaries: the Caretaker manages history without ever inspecting the saved state. Recognizing when to pair it with the Command pattern demonstrates senior-level design thinking.

## Core concepts

- **Three roles**: Originator creates and restores from Mementos; Memento is an opaque state snapshot; Caretaker stores the history stack without reading its contents
- **Encapsulation boundary**: Caretaker never reads Memento internals — the Originator is the only class that knows how to pack and unpack its own state
- **Pairs with Command**: Command executes the action and triggers state capture; Memento holds the state to roll back to on undo
- **Stack-based undo**: push a new Memento on every action, pop the top Memento on undo, then restore the Originator from it
- **Serializable Mementos**: when Mementos can be serialized, undo history survives process restarts — enabling save-game slots, document autosave, and crash recovery
- **Shallow vs. deep copy**: choose carefully; mutable nested objects require deep copying inside the Memento or subsequent mutations will corrupt saved state

## Code example

```java
// Memento — opaque snapshot; only Editor can read it
public final class EditorMemento {
    private final String content;

    EditorMemento(String content) {
        this.content = content;
    }

    // Package-private: only classes in the same package (i.e. Editor) access this
    String getContent() {
        return content;
    }
}

// Originator — creates and restores Mementos
public class Editor {
    private String content;

    public Editor(String content) {
        this.content = content;
    }

    public void type(String text) {
        this.content += text;
    }

    public String getContent() {
        return content;
    }

    // Save current state into a Memento
    public EditorMemento save() {
        return new EditorMemento(content);
    }

    // Restore state from a Memento
    public void restore(EditorMemento memento) {
        this.content = memento.getContent();
    }
}

// Caretaker — manages undo history; never reads Memento internals
public class HistoryManager {
    private final Deque<EditorMemento> history = new ArrayDeque<>();

    public void backup(EditorMemento memento) {
        history.push(memento);
    }

    public EditorMemento undo() {
        if (history.isEmpty()) {
            throw new IllegalStateException("Nothing to undo");
        }
        return history.pop();
    }

    public boolean canUndo() {
        return !history.isEmpty();
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Editor editor = new Editor("Hello");
        HistoryManager manager = new HistoryManager();

        manager.backup(editor.save());   // snapshot: "Hello"
        editor.type(", World");

        manager.backup(editor.save());   // snapshot: "Hello, World"
        editor.type("!!!");

        System.out.println(editor.getContent()); // Hello, World!!!

        editor.restore(manager.undo());
        System.out.println(editor.getContent()); // Hello, World

        editor.restore(manager.undo());
        System.out.println(editor.getContent()); // Hello
    }
}
```

## When to use

| Scenario | Use this when... |
|---|---|
| Undo/Redo | The object's state changes over time and users must be able to step back through those changes |
| Game Save | You need named or numbered checkpoints a player can reload without exposing internal game state |
| Form Wizard | A multi-step form must let users navigate back to a previous step with their data intact |
| Collaborative Editing Checkpoints | Periodic auto-snapshots allow rollback to a known-good state after a conflicting merge |

## Common interview mistakes

- **Exposing Memento fields publicly** — breaking encapsulation and letting the Caretaker (or anyone else) mutate saved state directly
- **Storing Mementos inside the Originator** — the Originator should not manage its own history; that responsibility belongs to the Caretaker
- **Forgetting to save before acting** — snapshotting after the mutation means undo restores the already-modified state, not the prior one
- **Shallow-copying mutable fields** — if the Originator holds collections or nested objects, a shallow copy in the Memento shares references and will be corrupted by later mutations
- **Not limiting history size** — an unbounded stack causes memory pressure; production implementations cap depth or use weak references
- **Conflating Memento with Prototype** — Prototype clones an object for reuse; Memento captures private state specifically for rollback and deliberately hides it from the outside world

## Covered by Problems

| Problem | Link |
|---|---|
| Chess Game | [→](/docs/lld/problems/chess-game) |

## Resources

- [Refactoring.Guru: Memento](https://refactoring.guru/design-patterns/memento)
