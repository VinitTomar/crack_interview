---
title: Task Management System
sidebar_label: Task Management System
tags: [lld, machine-coding]
---

# Task Management System

**Difficulty:** Medium | **Track:** LLD

## Problem statement

Design a task management system similar to Jira or Trello that supports organising work into projects and sprints. Users can create tasks, assign them to team members, and track progress through a defined status workflow. The system must notify relevant users when tasks change state or ownership.

## Requirements

**Functional:**
- Create and organise tasks within projects and sprints
- Assign tasks to users; a task can have exactly one assignee at a time
- Track task status with valid transitions: TODO → IN_PROGRESS → IN_REVIEW → DONE (BLOCKED reachable from any active state)
- Notify the assignee and all watchers when a task's status changes or is reassigned
- Filter tasks by status, assignee, priority, and due date
- Support a backlog of unscheduled tasks at the project level alongside sprint-bound tasks

**Out of scope:**
- Time tracking and billing
- OAuth / SSO integration
- Gantt charts and resource planning

## Key classes

```java
public enum TaskStatus {
    TODO, IN_PROGRESS, IN_REVIEW, DONE, BLOCKED;

    public void transition(TaskStatus next) {
        // enforce valid transitions; throw IllegalStateException on invalid move
    }
}

public enum Priority { LOW, MEDIUM, HIGH, CRITICAL }

public class User {
    private String id;
    private String name;
    private String email;
    // getters
}

public class Sprint {
    private String id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<Task> tasks;
    // addTask(), removeTask(), getters
}

public class Project {
    private String id;
    private String name;
    private List<Sprint> sprints;
    private List<Task> backlog;   // tasks not yet in a sprint
    // addSprint(), addToBacklog(), getters
}

public class Task {
    private String id;
    private String title;
    private String description;
    private TaskStatus status;
    private Priority priority;
    private User assignee;
    private Set<User> watchers;
    private LocalDate dueDate;
    private Sprint sprint;        // null if in backlog
    private List<TaskObserver> observers;

    public void transition(TaskStatus next) { /* delegate + notify */ }
    public void assign(User user) { /* set assignee + notify */ }
    public void addWatcher(User user) { }
    // getters
}

public interface TaskObserver {
    void onStatusChange(Task task, TaskStatus oldStatus, TaskStatus newStatus);
    void onReassign(Task task, User oldAssignee, User newAssignee);
}

public class EmailNotificationObserver implements TaskObserver { /* ... */ }
public class InAppNotificationObserver implements TaskObserver { /* ... */ }

public class TaskFilter {
    private TaskStatus status;
    private User assignee;
    private Priority priority;
    private LocalDate dueBefore;

    public static class Builder {
        public Builder status(TaskStatus s) { return this; }
        public Builder assignee(User u) { return this; }
        public Builder priority(Priority p) { return this; }
        public Builder dueBefore(LocalDate d) { return this; }
        public TaskFilter build() { return new TaskFilter(this); }
    }
}

public interface TaskRepository {
    Task save(Task task);
    Optional<Task> findById(String id);
    List<Task> findAll(TaskFilter filter);
}

public class TaskService {
    private TaskRepository repository;

    public Task createTask(String title, Priority priority, Project project) { }
    public void assign(String taskId, User user) { }
    public void transition(String taskId, TaskStatus next) { }
    public List<Task> filter(TaskFilter criteria) { }
}
```

## Patterns used

- **State / Enum State Machine**: `TaskStatus.transition()` encodes the allowed status graph and rejects illegal moves, keeping transition logic in one place.
- **Observer**: `TaskObserver` decouples notification channels (email, in-app) from `Task`; new channels are added without touching task logic.
- **Builder**: `TaskFilter.Builder` lets callers compose any combination of filter predicates fluently without a proliferation of overloaded query methods.
- **Repository**: `TaskRepository` abstracts persistence so `TaskService` and tests are independent of any specific data store.
- **Strategy** (implicit in filter predicates): each filter criterion is an independent predicate that can be combined at runtime, keeping filtering logic composable and testable.

## Key design decisions

- **Enum-owned transition logic**: putting `transition()` on `TaskStatus` rather than in `TaskService` prevents scattered `if/switch` checks and makes adding or removing valid transitions a single-point change.
- **Observer attached to Task, not Service**: because watchers are per-task, attaching observers directly to `Task` avoids a global event bus and keeps the notification scope tight.
- **Backlog vs. Sprint separation on Project**: storing unscheduled tasks as `backlog` on `Project` rather than in a special sprint makes sprint planning explicit and avoids sentinel sprint objects.
- **Single assignee enforced at the model level**: the `assign()` method replaces the current assignee rather than appending, so the one-assignee invariant is impossible to violate from outside the class.
- **TaskFilter as a value object**: making `TaskFilter` immutable (built once, read-only) allows it to be passed across layers and cached without defensive copying.

## What the interviewer is looking for

- Correct modelling of the status machine — valid transitions enforced at the right layer, not scattered across service code.
- Proper application of Observer so that adding a new notification channel (e.g. Slack) requires zero changes to `Task` or `TaskService`.
- Fluent Builder for `TaskFilter` that demonstrates awareness of the open/closed principle for query criteria.
- Clean separation of `TaskService` (orchestration) from `TaskRepository` (persistence) so neither depends on the other's implementation.
- Discussion of concurrency concerns: concurrent `transition()` calls on the same task should be serialised (e.g. synchronised block or optimistic locking) to prevent race conditions on status.

## Resources

- [Refactoring.Guru: Observer](https://refactoring.guru/design-patterns/observer)
