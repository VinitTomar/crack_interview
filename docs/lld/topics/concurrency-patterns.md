---
title: Concurrency Patterns
sidebar_label: Concurrency Patterns
tags: [lld, patterns]
---

# Concurrency Patterns

> **Level**: Patterns | **Track**: Low Level Design

## Why it matters in interviews

Concurrency patterns appear in machine-coding rounds at virtually every top-tier company. The canonical prompts — "design a thread-safe LRU cache," "implement a rate limiter," "build a connection pool" — all require you to reason about shared mutable state under concurrent access. Knowing the standard patterns (and their Java library primitives) lets you write correct code quickly instead of reinventing synchronization from scratch.

## Core concepts

### Producer-Consumer

Producers generate work; consumers process it. The canonical Java solution is `BlockingQueue<T>`: `put()` blocks when the queue is full; `take()` blocks when it is empty. No explicit `wait()`/`notify()` needed.

```java
BlockingQueue<Task> queue = new LinkedBlockingQueue<>(100); // bounded

// Producer thread
queue.put(new Task(...));   // blocks if full

// Consumer thread
Task t = queue.take();      // blocks if empty
```

Use `ArrayBlockingQueue` when you want a fixed-size buffer; `LinkedBlockingQueue` for an unbounded or loosely-bounded one.

### Reader-Writer Lock

Many reads, rare writes → `ReadWriteLock`. Multiple threads can hold the **read lock** simultaneously; the **write lock** is exclusive — no reader or other writer can proceed while a write is in progress.

```java
ReadWriteLock rwLock = new ReentrantReadWriteLock();

// Reading (many threads concurrently)
rwLock.readLock().lock();
try   { return cache.get(key); }
finally { rwLock.readLock().unlock(); }

// Writing (exclusive)
rwLock.writeLock().lock();
try   { cache.put(key, value); }
finally { rwLock.writeLock().unlock(); }
```

### Thread Pool

`ExecutorService` manages a pool of worker threads. Submit `Runnable` or `Callable<T>` tasks; the pool queues and dispatches them without you managing thread lifecycle.

```java
ExecutorService pool = Executors.newFixedThreadPool(4);
Future<String> future = pool.submit(() -> heavyComputation());
String result = future.get(); // blocks until done
pool.shutdown();
```

Use `newCachedThreadPool()` for short-lived bursts; `newFixedThreadPool(n)` for CPU-bound tasks where `n ≈ Runtime.getRuntime().availableProcessors()`.

### Monitor Pattern

A monitor combines a lock with one or more condition variables. In Java, every `synchronized` method/block is a monitor. `wait()` releases the lock and suspends the thread; `notify()` / `notifyAll()` wakes waiters.

Use `ReentrantLock` + `Condition` instead of `synchronized` + `wait/notify` when you need multiple wait queues or timed waits.

## Code example — Thread-safe Token Bucket rate limiter

```java
import java.util.concurrent.locks.ReentrantLock;

/**
 * Token Bucket rate limiter.
 * Tokens refill at a fixed rate; each request consumes one token.
 * Thread-safe via ReentrantLock.
 */
public class TokenBucket {
    private final int    capacity;      // max tokens
    private final double refillRate;    // tokens per millisecond
    private double       tokens;
    private long         lastRefillTime; // epoch ms

    private final ReentrantLock lock = new ReentrantLock();

    public TokenBucket(int capacity, double tokensPerSecond) {
        this.capacity       = capacity;
        this.refillRate     = tokensPerSecond / 1000.0;
        this.tokens         = capacity;
        this.lastRefillTime = System.currentTimeMillis();
    }

    /** Returns true if the request is allowed, false if rate-limited. */
    public boolean tryConsume() {
        lock.lock();
        try {
            refill();
            if (tokens >= 1.0) {
                tokens -= 1.0;
                return true;
            }
            return false;
        } finally {
            lock.unlock();   // always release, even on exception
        }
    }

    private void refill() {
        long now     = System.currentTimeMillis();
        long elapsed = now - lastRefillTime;
        tokens = Math.min(capacity, tokens + elapsed * refillRate);
        lastRefillTime = now;
    }
}

// ── PRODUCER-CONSUMER demo ────────────────────────────────────────────────────
BlockingQueue<Runnable> workQueue = new LinkedBlockingQueue<>(50);

// Producer
Thread producer = new Thread(() -> {
    while (true) {
        workQueue.put(() -> System.out.println("Processing task"));
    }
});

// Consumer pool
ExecutorService consumers = Executors.newFixedThreadPool(4);
for (int i = 0; i < 4; i++) {
    consumers.submit(() -> {
        while (true) {
            Runnable task = workQueue.take();
            task.run();
        }
    });
}

// ── READ-WRITE LOCK — shared cache ───────────────────────────────────────────
class ThreadSafeCache<K, V> {
    private final Map<K, V>    map    = new HashMap<>();
    private final ReadWriteLock lock  = new ReentrantReadWriteLock();

    public V get(K key) {
        lock.readLock().lock();
        try { return map.get(key); }
        finally { lock.readLock().unlock(); }
    }

    public void put(K key, V value) {
        lock.writeLock().lock();
        try { map.put(key, value); }
        finally { lock.writeLock().unlock(); }
    }
}
```

## When to use

| Problem | Pattern / Primitive |
|---------|---------------------|
| Background tasks, offload CPU work | Thread Pool (`ExecutorService`) |
| Decouple producer speed from consumer speed | Producer-Consumer (`BlockingQueue`) |
| Cache or data structure with frequent reads, rare writes | Reader-Writer Lock (`ReadWriteLock`) |
| Rate limiting, token-based throttling | Monitor / `ReentrantLock` |
| Simple shared counter or flag | `AtomicInteger`, `AtomicBoolean` (lock-free) |
| Single piece of state updated by one writer | `volatile` (visibility guarantee, no atomicity) |

**Interview tip:** The first question for any shared mutable state problem is: *can we make it immutable?* Immutable objects need no synchronization at all. If state must be mutable, ask: *are reads far more frequent than writes?* If yes, `ReadWriteLock` gives you concurrency for readers. If reads and writes are balanced, `synchronized` or `ReentrantLock` is simpler. Only reach for `AtomicXxx` / lock-free structures when you have profiled contention as an actual bottleneck.

## Common interview mistakes

- **Forgetting `finally` around `lock.unlock()`** — if the business logic throws between `lock()` and `unlock()`, the lock is never released and every subsequent caller deadlocks. Always use `try { ... } finally { lock.unlock(); }`.
- **Using `notify()` instead of `notifyAll()`** — `notify()` wakes one arbitrary thread; if that thread re-checks a condition and goes back to sleep, no other waiter is woken and the system hangs. Prefer `notifyAll()` unless you can prove only one waiter can proceed.
- **Holding a lock across I/O** — network calls, database queries, or file reads inside a synchronized block serialize all callers on that I/O latency. Fetch data first, then lock only to update shared state.
- **Assuming `synchronized` on a method is enough for compound operations** — `if (!map.containsKey(k)) map.put(k, v)` is a check-then-act race even if `containsKey` and `put` are individually synchronized. Use `map.putIfAbsent(k, v)` or lock around the whole compound operation.

## Covered by Problems

| Problem | Link |
|---|---|
| Thread-Safe Rate Limiter | [→](/docs/lld/problems/rate-limiter-lld) |
| LRU / LFU Cache | [→](/docs/lld/problems/lru-cache) |

## Resources

- [Gaurav Sen: Concurrency](https://www.youtube.com/watch?v=iKtvNJQoCNw)
- [Hello Interview: Concurrency](https://www.hellointerview.com/learn/code/object-oriented-design/concurrency)
