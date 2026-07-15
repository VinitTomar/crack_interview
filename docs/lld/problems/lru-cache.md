---
title: LRU / LFU Cache
sidebar_label: LRU / LFU Cache
tags: [lld, machine-coding]
---

# LRU / LFU Cache

**Difficulty:** Problems | **Track:** LLD

## Problem statement

Design a generic Least Recently Used (LRU) cache that supports `get(key)` and `put(key, value)` in O(1) time. The cache holds a fixed number of entries; when a new entry is inserted beyond that capacity, the entry that was accessed least recently is evicted. Optionally extend the design to be safe for concurrent access from multiple threads.

## Requirements

**Functional:**
- `get(key)` returns the cached value in O(1); marks the entry as most recently used.
- `put(key, value)` inserts or updates an entry in O(1); evicts the LRU entry when at capacity.
- Eviction policy is strictly LRU: the entry with the oldest last-access timestamp is removed first.
- Optional thread-safe variant: concurrent `get` calls should not block each other; `put` uses an exclusive write lock.

**Out of scope:**
- TTL-based expiration (time-to-live).
- Distributed or multi-node caching (single-process only).

## Key classes

```java
class Node<K, V> {
    K key; V value;
    Node<K, V> prev, next;
}

class DoublyLinkedList<K, V> {
    Node<K, V> head, tail;   // sentinel nodes — head = MRU end, tail = LRU end
    void addToFront(Node<K, V> node) { ... }
    void remove(Node<K, V> node) { ... }
    Node<K, V> removeLast() { ... }   // evict LRU
}

class LRUCache<K, V> {
    int capacity;
    Map<K, Node<K, V>> map;         // O(1) lookup
    DoublyLinkedList<K, V> list;    // O(1) move-to-front / evict

    V get(K key) {
        // lookup in map, move node to front, return value
    }
    void put(K key, V value) {
        // if exists: update + move to front
        // if new + at capacity: evict tail, then insert at front
    }
}

// Thread-safe wrapper (Proxy pattern)
class ThreadSafeLRUCache<K, V> {
    LRUCache<K, V> delegate;
    ReadWriteLock lock = new ReentrantReadWriteLock();
    V get(K key)            { /* readLock  */ }
    void put(K key, V value){ /* writeLock */ }
}
```

## Patterns used

- **Iterator**: Traversing the doubly linked list from head to tail visits entries in MRU-to-LRU order, which is useful for inspection, serialisation, and debugging.
- **Proxy**: `ThreadSafeLRUCache` wraps `LRUCache` and adds locking without touching the core eviction logic — a clean separation of concurrency concern from cache concern.

## Key design decisions

- **HashMap + doubly linked list combo**: The `HashMap` gives O(1) node lookup; the doubly linked list gives O(1) node removal and insertion at front. Neither structure alone achieves both; together they make `get` and `put` both O(1).
- **Sentinel head/tail nodes**: Using dummy sentinel nodes eliminates all null-pointer edge cases when adding or removing from either end of the list, making the list operations cleaner.
- **Store the key in the node**: When the LRU node is evicted from the list's tail, the cache must also delete it from the `HashMap`. Storing the key inside the `Node` avoids a reverse-lookup scan.
- **LFU variant**: If eviction should prefer the *least frequently* used entry instead, add a `minFreq` counter and replace the single linked list with a `HashMap<freq, DoublyLinkedList>` of frequency buckets. `get` and `put` remain O(1) but the bookkeeping is more involved.

## What the interviewer is looking for

- Proof that both `get` and `put` are truly O(1) — ability to trace through each operation step by step.
- Correct handling of edge cases: capacity 1, `put` on an existing key, `get` on a missing key.
- Thread-safety discussion: why a `ReadWriteLock` is preferable to `synchronized` here (readers don't block each other).
- Awareness of the LFU extension and when you'd choose LFU over LRU (workloads with skewed access frequency distributions).

## Resources

- [Hello Interview: LRU Cache](https://www.hellointerview.com/learn/code/object-oriented-design/lru-cache)
- [Tech Dummies: Distributed Cache System Design](https://www.youtube.com/watch?v=DUbEgNw-F9c)
