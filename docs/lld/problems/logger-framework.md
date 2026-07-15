---
title: Logger Framework
sidebar_label: Logger Framework
tags: [lld, machine-coding]
---

# Logger Framework

**Difficulty:** Easy | **Track:** LLD

## Problem statement

Design a logging framework that allows applications to emit structured log messages at different severity levels. The framework should support configurable minimum log levels to filter out noise, multiple output destinations (appenders), and a shared registry so the same named logger is reused across the codebase.

## Requirements

**Functional:**
- Support 5 log levels in ascending severity order: TRACE, DEBUG, INFO, WARN, ERROR
- Filter and discard any message whose level falls below the logger's configured minimum level
- Support multiple appenders: ConsoleAppender, FileAppender, and RemoteAppender
- Allow a custom log format that includes timestamp, level, logger name, and message
- Provide a LoggerFactory that returns named Logger instances (Singleton per name)
- Expose convenience methods (info(), warn(), error()) in addition to the generic log() method

**Out of scope:**
- Log rotation and file size management
- Asynchronous or buffered logging
- Log shipping to external systems (e.g., Splunk, Elasticsearch)

## Key classes

```java
// Severity ordering — comparisons use ordinal()
public enum LogLevel {
    TRACE, DEBUG, INFO, WARN, ERROR
}

// Immutable value object carrying all log metadata
public record LogMessage(
    LogLevel level,
    String loggerName,
    String message,
    Instant timestamp
) {}

// Strategy interface — every output destination implements this
public interface Appender {
    void append(LogMessage message);
}

public class ConsoleAppender implements Appender {
    private final LogFormatter formatter;
    public ConsoleAppender(LogFormatter formatter) { ... }
    @Override public void append(LogMessage message) { ... }
}

public class FileAppender implements Appender {
    private final String filePath;
    private final LogFormatter formatter;
    public FileAppender(String filePath, LogFormatter formatter) { ... }
    @Override public void append(LogMessage message) { ... }
}

// Formats a LogMessage into a string (e.g., "[2025-01-01T10:00:00Z] INFO  app - hello")
public interface LogFormatter {
    String format(LogMessage message);
}

public class PatternFormatter implements LogFormatter {
    private final String pattern; // e.g., "{timestamp} {level} {logger} - {message}"
    @Override public String format(LogMessage message) { ... }
}

// Chain of Responsibility node — each handler checks level, then delegates
public abstract class LogFilter {
    protected LogFilter next;
    public LogFilter setNext(LogFilter next) { this.next = next; return next; }
    public abstract void handle(LogMessage message, List<Appender> appenders);
}

public class LevelFilter extends LogFilter {
    private final LogLevel minimumLevel;
    public LevelFilter(LogLevel minimumLevel) { ... }
    @Override
    public void handle(LogMessage message, List<Appender> appenders) {
        if (message.level().ordinal() >= minimumLevel.ordinal()) {
            if (next != null) next.handle(message, appenders);
            else appenders.forEach(a -> a.append(message));
        }
    }
}

// Core logger — built via Logger.builder()
public class Logger {
    private final String name;
    private final LogLevel minimumLevel;
    private final List<Appender> appenders;
    private final LogFilter filterChain;

    private Logger(Builder builder) { ... }

    public void log(LogLevel level, String message) { ... }
    public void info(String message)  { log(LogLevel.INFO,  message); }
    public void warn(String message)  { log(LogLevel.WARN,  message); }
    public void error(String message) { log(LogLevel.ERROR, message); }

    public static Builder builder(String name) { return new Builder(name); }

    public static class Builder {
        private String name;
        private LogLevel minimumLevel = LogLevel.INFO;
        private List<Appender> appenders = new ArrayList<>();
        public Builder minimumLevel(LogLevel level) { ... }
        public Builder addAppender(Appender appender) { ... }
        public Logger build() { ... }
    }
}

// Singleton registry — returns the same Logger for the same name
public class LoggerFactory {
    private static final LoggerFactory INSTANCE = new LoggerFactory();
    private final Map<String, Logger> registry = new ConcurrentHashMap<>();

    private LoggerFactory() {}
    public static LoggerFactory getInstance() { return INSTANCE; }

    public Logger getLogger(String name) {
        return registry.computeIfAbsent(name, n ->
            Logger.builder(n).addAppender(new ConsoleAppender(new PatternFormatter(...))).build()
        );
    }
}
```

## Patterns used

- **Chain of Responsibility**: LevelFilter nodes are chained so each can decide whether to forward the message or stop processing, making it easy to add new filter types (e.g., rate-limiting, sampling) without changing Logger.
- **Strategy**: Appender is an interface; ConsoleAppender, FileAppender, and RemoteAppender are interchangeable strategies injected at construction time.
- **Singleton**: LoggerFactory holds a single instance and a ConcurrentHashMap registry so the same Logger object is returned for the same name across the application.
- **Builder**: Logger.Builder lets callers configure level, appenders, and formatter step-by-step without a sprawling constructor, and enforces immutability once build() is called.

## Key design decisions

- **LogMessage as a record**: Using a Java record makes LogMessage immutable and removes boilerplate; appenders can safely cache or hand it off without defensive copying.
- **Ordinal-based level comparison**: Comparing `level.ordinal() >= minimumLevel.ordinal()` leverages the enum's declared order so adding a new level between existing ones only requires updating the enum declaration.
- **Filter chain vs. simple if-check inside Logger**: Delegating to a filter chain keeps Logger ignorant of filtering logic and allows middleware-style extensions (sampling, redaction) to be added without touching core classes.
- **ConcurrentHashMap with computeIfAbsent in LoggerFactory**: Ensures thread-safe lazy initialization of loggers without a global lock on every getLogger() call.
- **LogFormatter as a separate interface**: Decoupling the format string from the appender means you can attach the same PatternFormatter to both ConsoleAppender and FileAppender, or swap to a JSONFormatter for one destination only.

## What the interviewer is looking for

- Correct use of Chain of Responsibility to separate filtering concerns from output concerns, not a nested if-else block inside Logger.
- Thread safety in LoggerFactory (ConcurrentHashMap / computeIfAbsent) and awareness of race conditions in FileAppender (synchronized writes or a dedicated write thread).
- Proper enum ordering for level comparison rather than hard-coded integer constants.
- Extensibility: adding a new appender or filter should require no changes to existing classes (Open/Closed Principle).
- Builder pattern usage to construct an immutable Logger cleanly, and explanation of why immutability matters in a shared, long-lived object.

## Resources

- [Refactoring.Guru: Chain of Responsibility](https://refactoring.guru/design-patterns/chain-of-responsibility)
