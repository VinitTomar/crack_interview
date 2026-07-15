---
title: In-Memory File System
sidebar_label: In-Memory File System
tags: [lld, machine-coding]
---

# In-Memory File System

**Difficulty:** Hard | **Track:** LLD

## Problem statement

Design an in-memory file system supporting hierarchical directories, file operations, and traversal. The system should allow clients to navigate absolute paths, perform CRUD operations on files and directories, search recursively by name or extension, and enforce read/write permissions per node.

## Requirements

**Functional:**
- Create, read, update, and delete files and directories
- Support absolute path navigation (`/home/user/docs/file.txt`)
- `find(path, name)`: search by name or extension recursively from a given path
- Calculate total size of a directory (recursive sum of all file sizes)
- Support read/write/execute permissions per file/directory (owner, group, other)
- Move a file or directory from one path to another

**Out of scope:**
- Symbolic links and hard links (inodes)
- Actual disk I/O and persistence
- User authentication and session management

## Key classes

```java
// Permissions model
public class Permission {
    private boolean ownerRead, ownerWrite, ownerExecute;
    private boolean groupRead, groupWrite, groupExecute;
    private boolean otherRead, otherWrite, otherExecute;

    public boolean canRead(String role)  { /* owner/group/other */ }
    public boolean canWrite(String role) { /* owner/group/other */ }
}

// Base node
public abstract class FileSystemNode {
    protected String name;
    protected Permission permission;
    protected Directory parent;
    protected LocalDateTime createdAt;

    public abstract long getSize();
    public abstract void accept(FileSystemNodeVisitor visitor);
    public String getName()           { return name; }
    public Permission getPermission() { return permission; }
}

// Leaf
public class File extends FileSystemNode {
    private byte[] content;

    public byte[] read()              { return content; }
    public void write(byte[] data)    { this.content = data; }
    @Override public long getSize()   { return content == null ? 0 : content.length; }
    @Override public void accept(FileSystemNodeVisitor v) { v.visitFile(this); }
}

// Composite
public class Directory extends FileSystemNode {
    private Map<String, FileSystemNode> children = new LinkedHashMap<>();

    public void addChild(FileSystemNode node)       { children.put(node.getName(), node); }
    public void removeChild(String name)            { children.remove(name); }
    public FileSystemNode getChild(String name)     { return children.get(name); }
    public Collection<FileSystemNode> getChildren() { return children.values(); }
    @Override public long getSize()                 { return children.values().stream().mapToLong(FileSystemNode::getSize).sum(); }
    @Override public void accept(FileSystemNodeVisitor v) { v.visitDirectory(this); }
}

// Visitor interface
public interface FileSystemNodeVisitor {
    void visitFile(File file);
    void visitDirectory(Directory directory);
}

public class SizeCalculatorVisitor implements FileSystemNodeVisitor {
    private long totalSize = 0;
    public void visitFile(File f)           { totalSize += f.getSize(); }
    public void visitDirectory(Directory d) { d.getChildren().forEach(c -> c.accept(this)); }
    public long getTotalSize()              { return totalSize; }
}

public class SearchVisitor implements FileSystemNodeVisitor {
    private final String query;
    private final List<FileSystemNode> results = new ArrayList<>();
    public SearchVisitor(String query)       { this.query = query; }
    public void visitFile(File f)            { if (f.getName().contains(query)) results.add(f); }
    public void visitDirectory(Directory d)  { if (d.getName().contains(query)) results.add(d); d.getChildren().forEach(c -> c.accept(this)); }
    public List<FileSystemNode> getResults() { return results; }
}

// Path utility
public class PathUtil {
    public static List<String> parse(String absolutePath) { /* split on "/" */ }
}

// FileSystem facade
public class FileSystem {
    private final Directory root = new Directory("/", null);

    public FileSystemNode navigate(String absolutePath)       { /* walk segments */ }
    public File createFile(String parentPath, String name)    { /* navigate + add */ }
    public Directory createDirectory(String parentPath, String name) { /* navigate + add */ }
    public void delete(String absolutePath)                   { /* navigate + removeChild */ }
    public void move(String srcPath, String destPath)         { /* detach + reattach */ }
    public List<FileSystemNode> find(String path, String query) { /* SearchVisitor */ }
    public long getSize(String path)                          { /* SizeCalculatorVisitor */ }
}
```

## Patterns used

- **Composite**: `File` and `Directory` both extend `FileSystemNode`, letting clients treat individual files and whole directory trees through a single interface.
- **Visitor**: `FileSystemNodeVisitor` separates operations (size calculation, search) from the node hierarchy, so new operations can be added without modifying `File` or `Directory`.
- **Iterator**: directory traversal uses the children collection's iterator, decoupling traversal order from the tree structure.
- **Null Object**: a `NullFile` implementation of `FileSystemNode` with zero size and empty reads avoids null checks at call sites when a path resolves to nothing.
- **Facade**: `FileSystem` provides a single entry point for all path-based operations, hiding path parsing, node navigation, and visitor dispatch from callers.

## Key design decisions

- **Abstract base vs. interface for nodes**: using an abstract class (`FileSystemNode`) over a pure interface captures shared state (name, permissions, parent, createdAt) once, avoiding duplication in both `File` and `Directory`.
- **`accept` on each node (double dispatch)**: placing `accept(visitor)` on `FileSystemNode` enables true double dispatch — the visitor's correct `visitFile` or `visitDirectory` overload is called at runtime without instanceof checks.
- **`byte[]` content in File**: storing raw bytes keeps `File` storage-agnostic (text, binary, JSON all fit), and `getSize()` becomes a direct `content.length` — no encoding assumptions.
- **`Map<String, FileSystemNode>` for children**: keying by name gives O(1) child lookup during path traversal and enforces unique names within a directory, mirroring real file system semantics.
- **Immutable path parsing via `PathUtil`**: isolating path-splitting logic in a stateless utility class makes it independently testable and reusable across `navigate`, `find`, and `move` without coupling to `FileSystem`.

## What the interviewer is looking for

- Correct application of the Composite pattern — `File` and `Directory` must be interchangeable through a single type, and `Directory.getSize()` must delegate recursively rather than computing size inline.
- Clean Visitor implementation with true double dispatch and no `instanceof` in visitor logic or in `FileSystem` operation methods.
- Robust path handling: empty segments from leading/trailing slashes, the root `/` edge case, and navigating to a non-existent intermediate directory.
- Permission model design — demonstrating awareness of owner/group/other and how permission checks integrate with read/write operations without polluting node logic.
- Separation of concerns between the `FileSystem` facade (path resolution), node classes (structure and size), visitors (operations), and `PathUtil` (string parsing).

## Resources

- [Refactoring.Guru: Composite](https://refactoring.guru/design-patterns/composite)
- [Refactoring.Guru: Visitor](https://refactoring.guru/design-patterns/visitor)
