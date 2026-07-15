---
title: Object Pool & Resource Management
sidebar_label: Object Pool & Resource Management
tags: [lld, concurrency-architecture]
---

# Object Pool & Resource Management
> **Level**: Concurrency & Architecture | **Track**: Low Level Design

## Why it matters in interviews

Object Pool is a classic design pattern question that tests your understanding of concurrency, bounded resource management, and thread safety. Companies like Google, Meta, and Amazon ask it as "design a connection pool" or "implement a thread-safe resource manager." It signals that you understand the cost of object creation, can reason about concurrent access, and know how to apply semaphores and blocking queues together.

## Core concepts

- **Pool pattern**: maintain a bounded set of reusable expensive objects (DB connections, sockets, parsers) to avoid repeated costly initialization
- **acquire()**: borrow an object from the pool — blocks or times out if none are available, never exceeds the configured max size
- **release()**: return an object to the pool — validate health before returning; discard and replace unhealthy objects rather than polluting the pool
- **Semaphore**: bounds total concurrent object holders, ensuring no more than `maxSize` objects ever exist at one time
- **`BlockingQueue<T> idlePool`**: holds available objects; `poll(timeout, unit)` provides a bounded wait so callers are never blocked forever
- **Health check on borrow**: call `validate(obj)` after acquiring from the queue to confirm the object is still usable (e.g. connection not dropped)
- **Eviction**: a scheduled background task removes objects that have been idle longer than `maxIdleTime` to free resources
- **Builder pattern for configuration**: exposes `maxSize`, `minIdle`, `maxWaitMs`, and `validationQuery` cleanly without a telescoping constructor

## Code example

```java
import java.util.concurrent.*;
import java.util.function.*;

public class ObjectPool<T> {

    private final Semaphore semaphore;
    private final BlockingQueue<T> idlePool;
    private final Supplier<T> factory;
    private final Predicate<T> validator;
    private final int maxSize;

    private ObjectPool(Builder<T> builder) {
        this.maxSize    = builder.maxSize;
        this.factory    = builder.factory;
        this.validator  = builder.validator;
        this.semaphore  = new Semaphore(maxSize, true); // fair
        this.idlePool   = new LinkedBlockingQueue<>(maxSize);

        for (int i = 0; i < builder.minIdle; i++) {
            idlePool.offer(factory.get());
        }
    }

    /** Borrow an object. Returns null if timeout elapses. */
    public T acquire(long timeout, TimeUnit unit) throws InterruptedException {
        if (!semaphore.tryAcquire(timeout, unit)) {
            return null; // pool exhausted, caller should handle
        }
        T obj = idlePool.poll();
        if (obj == null) {
            obj = factory.get(); // semaphore acquired but queue empty — create new
        } else if (!validator.test(obj)) {
            obj = factory.get(); // stale object — discard and create fresh
        }
        return obj;
    }

    /** Return an object to the pool. */
    public void release(T obj) {
        if (obj != null && validator.test(obj)) {
            idlePool.offer(obj);
        }
        // whether we keep it or discard it, release the semaphore permit
        semaphore.release();
    }

    public static class Builder<T> {
        private int maxSize = 10;
        private int minIdle = 2;
        private Supplier<T> factory;
        private Predicate<T> validator = o -> true;

        public Builder<T> maxSize(int v)        { this.maxSize = v;    return this; }
        public Builder<T> minIdle(int v)        { this.minIdle = v;    return this; }
        public Builder<T> factory(Supplier<T> f){ this.factory = f;    return this; }
        public Builder<T> validator(Predicate<T> p){ this.validator = p; return this; }

        public ObjectPool<T> build() {
            if (factory == null) throw new IllegalStateException("factory required");
            return new ObjectPool<>(this);
        }
    }
}
```

## When to use

| Scenario | Use this when... |
|---|---|
| Connection pool | Creating DB/HTTP connections is expensive and max concurrency must be capped |
| Thread pool | Tasks are short-lived and thread creation overhead is measurable |
| Socket pool | Maintaining persistent TCP connections to avoid handshake cost per request |
| Parser pool | XML/JSON parsers are heavy to instantiate and not thread-safe (borrow one per thread) |

## Common interview mistakes

- **Forgetting to release the semaphore on error**: if `factory.get()` throws, the permit is never released and the pool slowly drains to zero
- **Returning invalid objects to the queue**: skipping the `validator.test()` call in `release()` lets broken connections re-enter the pool and fail the next borrower
- **Using `synchronized` instead of `BlockingQueue`**: hand-rolling wait/notify is error-prone; `BlockingQueue.poll(timeout)` handles spurious wakeups cleanly
- **Infinite blocking on `acquire()`**: not providing a timeout makes callers hang indefinitely under load — always use `tryAcquire` with a deadline
- **Not pre-warming `minIdle` connections**: lazy creation means the first wave of requests all hit cold start latency simultaneously
- **Ignoring fairness on the semaphore**: `new Semaphore(n)` is non-fair and can starve threads — pass `true` for fair ordering in contended pools

## Covered by Problems

| Problem | Link |
|---|---|
| Connection Pool Manager | [→](/docs/lld/problems/connection-pool) |

## Resources

- [Baeldung: Object Pooling](https://www.baeldung.com/java-object-pool)
- [Baeldung: BlockingQueue](https://www.baeldung.com/java-blocking-queue)
