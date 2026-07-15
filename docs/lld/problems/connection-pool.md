---
title: Connection Pool Manager
sidebar_label: Connection Pool Manager
tags: [lld, machine-coding]
---

# Connection Pool Manager

**Difficulty:** Hard | **Track:** LLD

## Problem statement

Design a thread-safe generic connection pool for database connections with bounded size, timeout, and health validation. The pool must manage a fixed maximum number of live connections, lending them to callers and reclaiming them after use. Idle connections that exceed a configurable lifetime should be automatically evicted by a background task.

## Requirements

**Functional:**
- Pool bounded by `maxSize`: never create more than `maxSize` connections simultaneously
- `acquire(timeout)`: blocks until a connection is available or the timeout expires, returning the connection or throwing
- `release(connection)`: return connection to the pool; validate before returning, discard and replace permit if unhealthy
- Connections idle longer than `maxIdleTimeMs` are evicted by a background task
- Configurable via Builder: `maxSize`, `minIdle`, `maxWaitMs`, `validationQuery`, `maxIdleTimeMs`
- Pool pre-warms to `minIdle` connections on startup

**Out of scope:**
- Read replicas and connection sharding
- SSL / TLS configuration
- Connection-level authentication rotation

## Key classes

```java
// Wrapper around the raw connection
public class PooledConnection<T> {
    private final T underlying;
    private volatile Instant lastUsedAt;
    private volatile boolean valid;

    public PooledConnection(T underlying) { ... }
    public T get() { return underlying; }
    public Instant getLastUsedAt() { return lastUsedAt; }
    public void touch() { this.lastUsedAt = Instant.now(); }
    public boolean isValid() { return valid; }
    public void invalidate() { this.valid = false; }
}

// Pool configuration
public class PoolConfig {
    private final int maxSize;
    private final int minIdle;
    private final long maxWaitMs;
    private final long maxIdleTimeMs;
    private final String validationQuery;

    private PoolConfig(Builder b) { ... }

    public static class Builder {
        public Builder maxSize(int n) { ... }
        public Builder minIdle(int n) { ... }
        public Builder maxWaitMs(long ms) { ... }
        public Builder maxIdleTimeMs(long ms) { ... }
        public Builder validationQuery(String q) { ... }
        public PoolConfig build() { ... }
    }
}

// Core pool
public class ConnectionPool<T> implements AutoCloseable {
    private final Semaphore permits;
    private final BlockingDeque<PooledConnection<T>> idlePool;
    private final Supplier<T> connectionFactory;
    private final Predicate<T> validator;
    private final PoolConfig config;
    private final ScheduledExecutorService evictionScheduler;

    public ConnectionPool(PoolConfig config,
                          Supplier<T> connectionFactory,
                          Predicate<T> validator) { ... }

    // semaphore.tryAcquire(timeout) → poll idle or create new → validate
    public PooledConnection<T> acquire(long timeout, TimeUnit unit)
            throws InterruptedException, TimeoutException { ... }

    // validate → push to idlePool or semaphore.release()
    public void release(PooledConnection<T> conn) { ... }

    // called by EvictionTask: remove expired idle, release permit per removal
    void evict() { ... }

    @Override
    public void close() { ... }
}

// Background eviction task
public class EvictionTask<T> implements Runnable {
    private final ConnectionPool<T> pool;

    public EvictionTask(ConnectionPool<T> pool) { ... }

    @Override
    public void run() {
        pool.evict();
    }
}
```

## Patterns used

- **Object Pool**: Core pattern — reuse expensive-to-create connections instead of creating and destroying them per request
- **Builder**: `PoolConfig.Builder` separates optional configuration from construction, keeping the pool constructor clean
- **Strategy**: The validator is injected as a `Predicate<T>`, allowing callers to swap health-check logic without modifying the pool
- **Decorator**: `PooledConnection<T>` wraps the raw connection `T` to attach pool-managed metadata (`lastUsedAt`, `valid`) without modifying the connection class
- **Template Method**: `acquire` defines the fixed protocol (acquire permit → get or create → validate) while delegating connection creation and validation to injected collaborators

## Key design decisions

- **Semaphore as the gate for total connections**: The `Semaphore` is the single source of truth for how many connections exist (idle + in-use). Every created connection consumes one permit; every discarded connection releases one. This prevents the pool from silently growing beyond `maxSize` even under concurrent pressure.
- **BlockingDeque for idle connections**: Using a deque (LIFO from the front) keeps recently-used connections warm in the DB server's cache, while still supporting FIFO draining during eviction.
- **Validate before returning on `release`**: Returning a broken connection to the idle pool is a "poison pill" — the next caller acquires it, fails immediately, and the error is blamed on unrelated code. Discarding on release keeps the pool healthy.
- **Eviction must release the Semaphore permit**: If eviction removes an idle connection but forgets to release the permit, the pool shrinks over time and eventually deadlocks. The permit lifecycle must mirror the connection lifecycle exactly.
- **`acquire` atomicity via Semaphore-first ordering**: Acquiring the permit before polling the idle deque ensures two threads can never race to create the (maxSize+1)th connection.

## What the interviewer is looking for

- **Correct concurrency primitives**: Choosing `Semaphore` + `BlockingDeque` over simpler alternatives (e.g., a plain `List` with `synchronized`) and explaining why each one is needed
- **Permit lifecycle correctness**: Demonstrating that every code path through `acquire`, `release`, and `evict` keeps permits consistent with live connections
- **Poison-pill prevention on release**: Explicitly validating before re-enqueue and explaining the class of bugs it prevents
- **Background eviction without leaks**: Wiring `ScheduledExecutorService` and shutting it down in `close()`, including releasing permits for removed connections
- **Generic design**: Using `ConnectionPool<T>` with `Supplier<T>` and `Predicate<T>` to show the pool is reusable beyond JDBC

## Resources

- [Baeldung: Object Pooling](https://www.baeldung.com/java-object-pool)
