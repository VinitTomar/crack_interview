export const LLD_LEVELS = [
  {
    id: 'foundational',
    label: 'Level 1 — Foundational',
    difficulty: 'Foundational',
    color: '#16a34a',
    topics: [
      {
        id: 'oop-fundamentals',
        number: 1,
        title: 'OOP Fundamentals',
        description: 'The four pillars of OOP: encapsulation (hiding internal state), inheritance (reusing behaviour), polymorphism (same interface, different behaviour), and abstraction (exposing what matters, hiding how). Understand how classes and objects model real-world entities and why OOP improves modularity and reuse.',
        resources: [
          { label: 'Refactoring.Guru: OOP Basics', url: 'https://refactoring.guru/design-patterns/what-is-pattern' },
        ],
        coveredBy: [
          { name: 'Parking Lot System', difficulty: 'Advanced', url: '/docs/lld/problems/parking-lot' },
          { name: 'Vending Machine', difficulty: 'Advanced', url: '/docs/lld/problems/vending-machine' },
        ],
        docsPath: '/docs/lld/topics/oop-fundamentals',
      },
      {
        id: 'solid-principles',
        number: 2,
        title: 'SOLID Principles',
        description: 'Five principles for writing maintainable OO code: Single Responsibility (one reason to change), Open-Closed (open for extension, closed for modification), Liskov Substitution (subtypes must be substitutable), Interface Segregation (prefer narrow interfaces), Dependency Inversion (depend on abstractions, not concretions). SOLID violations are red flags in every OOD interview.',
        resources: [
          { label: 'Refactoring.Guru: SOLID', url: 'https://refactoring.guru/refactoring/catalog' },
          { label: 'Laracon EU: SOLID Principles', url: 'https://www.youtube.com/watch?v=rtmFCcjEgEw' },
        ],
        coveredBy: [
          { name: 'Library Management System', difficulty: 'Advanced', url: '/docs/lld/problems/library-management' },
        ],
        docsPath: '/docs/lld/topics/solid-principles',
      },
      {
        id: 'object-relationships',
        number: 3,
        title: 'Object Relationships',
        description: 'How objects relate: association (uses-a, loose coupling), aggregation (has-a, independent lifecycle), composition (part-of, dependent lifecycle), and dependency (method parameter). Knowing when to use composition over inheritance is a core interview skill. Model these correctly and your class diagrams become self-documenting.',
        resources: [
          { label: 'Refactoring.Guru: Relations', url: 'https://refactoring.guru/design-patterns/catalog' },
        ],
        coveredBy: [
          { name: 'Hotel Booking System', difficulty: 'Advanced', url: '/docs/lld/problems/hotel-booking' },
        ],
        docsPath: '/docs/lld/topics/object-relationships',
      },
      {
        id: 'interfaces-vs-abstract',
        number: 4,
        title: 'Interfaces vs Abstract Classes',
        description: 'Interfaces define contracts (what to do), abstract classes share partial implementations (how to do some of it). Know when each applies: prefer interfaces for capability definitions (Serializable, Comparable), abstract classes for shared state or template logic. In Java/C#, a class can implement multiple interfaces but extend only one abstract class.',
        resources: [
          { label: 'Refactoring.Guru: Abstract Factory', url: 'https://refactoring.guru/design-patterns/abstract-factory' },
        ],
        coveredBy: [
          { name: 'Ride Sharing System', difficulty: 'Advanced', url: '/docs/lld/problems/ride-sharing' },
        ],
        docsPath: '/docs/lld/topics/interfaces-vs-abstract',
      },
      {
        id: 'design-principles',
        number: 5,
        title: 'Design Principles',
        description: 'Beyond SOLID: DRY (Don\'t Repeat Yourself — one source of truth), YAGNI (You Ain\'t Gonna Need It — avoid premature abstraction), KISS (Keep It Simple), Law of Demeter (talk only to direct neighbours, avoid train wrecks), and Composition Over Inheritance (prefer delegation to deep hierarchies). These are the judgment calls interviewers watch for.',
        resources: [
          { label: 'Refactoring.Guru: Principles', url: 'https://refactoring.guru/refactoring/catalog' },
        ],
        coveredBy: [
          { name: 'Library Management System', difficulty: 'Advanced', url: '/docs/lld/problems/library-management' },
          { name: 'Parking Lot System', difficulty: 'Advanced', url: '/docs/lld/problems/parking-lot' },
        ],
        docsPath: '/docs/lld/topics/design-principles',
      },
      {
        id: 'uml-diagrams',
        number: 6,
        title: 'UML & Class Diagrams',
        description: 'Class diagrams show entities (classes/interfaces), their attributes, methods, and relationships. Sequence diagrams show message flow between objects over time. Interviewers expect a quick whiteboard sketch — not perfection. Focus on class names, key fields, relationships (solid line = association, hollow diamond = aggregation, filled diamond = composition, hollow arrow = inheritance), and the arrows\' direction.',
        resources: [
          { label: 'Lucidchart: UML Guide', url: 'https://www.lucidchart.com/pages/uml-class-diagram' },
        ],
        coveredBy: [
          { name: 'Parking Lot System', difficulty: 'Advanced', url: '/docs/lld/problems/parking-lot' },
          { name: 'Elevator System', difficulty: 'Advanced', url: '/docs/lld/problems/elevator-system' },
        ],
        docsPath: '/docs/lld/topics/uml-diagrams',
      },
      {
        id: 'design-anti-patterns',
        number: 7,
        title: 'Design Anti-Patterns & Code Smells',
        description: 'Recognize bad design before it spreads. God Class (one class that does everything), Anemic Domain Model (data bags with no behaviour), Feature Envy (method uses another class more than its own), Data Clump (groups of fields that always appear together), and Primitive Obsession (using primitives instead of domain types). Interviewers often show broken code and ask what is wrong — this vocabulary lets you name the problem precisely.',
        resources: [
          { label: 'Refactoring.Guru: Code Smells', url: 'https://refactoring.guru/refactoring/smells' },
          { label: 'Refactoring.Guru: Refactoring Catalog', url: 'https://refactoring.guru/refactoring/catalog' },
        ],
        coveredBy: [],
        docsPath: '/docs/lld/topics/design-anti-patterns',
      },
      {
        id: 'null-safety',
        number: 8,
        title: 'Null Safety & Null Object Pattern',
        description: 'NullPointerException is the most common Java runtime error and a red flag in interviews. The Null Object pattern returns a no-op object instead of null, eliminating defensive null checks throughout the codebase. Java Optional<T> lets you express "may or may not have a value" in the type system. Key rule: never call Optional.get() without isPresent(), and never return null from a public API.',
        resources: [
          { label: 'Refactoring.Guru: Null Object', url: 'https://refactoring.guru/introduce-null-object' },
          { label: 'Baeldung: Java Optional', url: 'https://www.baeldung.com/java-optional' },
        ],
        coveredBy: [],
        docsPath: '/docs/lld/topics/null-safety',
      },
    ],
  },
  {
    id: 'intermediate',
    label: 'Level 2 — Intermediate',
    difficulty: 'Intermediate',
    color: '#d97706',
    topics: [
      {
        id: 'creational-patterns',
        number: 7,
        title: 'Creational Patterns',
        description: 'Control object creation: Factory Method (let subclasses decide which class to instantiate), Abstract Factory (families of related objects), Builder (construct complex objects step-by-step), Singleton (ensure one instance), Prototype (clone existing objects). Factory and Builder are the most common in LLD interviews. Know the tradeoffs — Singleton is often a testing anti-pattern.',
        resources: [
          { label: 'Refactoring.Guru: Creational', url: 'https://refactoring.guru/design-patterns/creational-patterns' },
        ],
        coveredBy: [
          { name: 'Vending Machine', difficulty: 'Advanced', url: '/docs/lld/problems/vending-machine' },
          { name: 'Parking Lot System', difficulty: 'Advanced', url: '/docs/lld/problems/parking-lot' },
          { name: 'Library Management System', difficulty: 'Advanced', url: '/docs/lld/problems/library-management' },
          { name: 'Hotel Booking System', difficulty: 'Advanced', url: '/docs/lld/problems/hotel-booking' },
        ],
        docsPath: '/docs/lld/topics/creational-patterns',
      },
      {
        id: 'structural-adapter-decorator',
        number: 8,
        title: 'Structural: Adapter & Decorator',
        description: 'Adapter wraps an incompatible interface to make it compatible — like a power adapter. Use when integrating third-party APIs. Decorator wraps an object to add behaviour dynamically without subclassing — like stacking toppings. Use for cross-cutting concerns (logging, caching, validation) that should not pollute core classes.',
        resources: [
          { label: 'Refactoring.Guru: Adapter', url: 'https://refactoring.guru/design-patterns/adapter' },
          { label: 'Refactoring.Guru: Decorator', url: 'https://refactoring.guru/design-patterns/decorator' },
        ],
        coveredBy: [
          { name: 'Parking Lot System', difficulty: 'Advanced', url: '/docs/lld/problems/parking-lot' },
          { name: 'Ride Sharing System', difficulty: 'Advanced', url: '/docs/lld/problems/ride-sharing' },
        ],
        docsPath: '/docs/lld/topics/structural-adapter-decorator',
      },
      {
        id: 'structural-facade-proxy',
        number: 9,
        title: 'Structural: Facade & Proxy',
        description: 'Facade provides a simplified interface to a complex subsystem — a single entry point that hides internal complexity. Proxy controls access to another object: virtual proxy (lazy init), protection proxy (access control), remote proxy (local stand-in for remote resource), caching proxy. Very common in LLD interviews involving authentication or lazy loading.',
        resources: [
          { label: 'Refactoring.Guru: Facade', url: 'https://refactoring.guru/design-patterns/facade' },
          { label: 'Refactoring.Guru: Proxy', url: 'https://refactoring.guru/design-patterns/proxy' },
        ],
        coveredBy: [
          { name: 'LRU / LFU Cache', difficulty: 'Advanced', url: '/docs/lld/problems/lru-cache' },
          { name: 'Hotel Booking System', difficulty: 'Advanced', url: '/docs/lld/problems/hotel-booking' },
          { name: 'Thread-Safe Rate Limiter', difficulty: 'Advanced', url: '/docs/lld/problems/rate-limiter-lld' },
        ],
        docsPath: '/docs/lld/topics/structural-facade-proxy',
      },
      {
        id: 'structural-composite-bridge',
        number: 10,
        title: 'Structural: Composite & Bridge',
        description: 'Composite lets you treat individual objects and compositions uniformly — perfect for tree structures (file systems, UI hierarchies, org charts). Bridge separates an abstraction from its implementation so both can vary independently — use when you want to avoid a multiplicative explosion of subclasses across two dimensions.',
        resources: [
          { label: 'Refactoring.Guru: Composite', url: 'https://refactoring.guru/design-patterns/composite' },
          { label: 'Refactoring.Guru: Bridge', url: 'https://refactoring.guru/design-patterns/bridge' },
        ],
        coveredBy: [
          { name: 'Library Management System', difficulty: 'Advanced', url: '/docs/lld/problems/library-management' },
        ],
        docsPath: '/docs/lld/topics/structural-composite-bridge',
      },
      {
        id: 'behavioral-observer-strategy',
        number: 11,
        title: 'Behavioral: Observer & Strategy',
        description: 'Observer defines a one-to-many dependency — when one object changes, all dependents are notified automatically. Core of event-driven systems and pub/sub. Strategy encapsulates interchangeable algorithms behind an interface — swap sorting, payment, or routing logic at runtime without changing the client. Both are extremely common in machine-coding rounds.',
        resources: [
          { label: 'Refactoring.Guru: Observer', url: 'https://refactoring.guru/design-patterns/observer' },
          { label: 'Refactoring.Guru: Strategy', url: 'https://refactoring.guru/design-patterns/strategy' },
          { label: 'ArjanCodes: Observer Pattern Tutorial', url: 'https://www.youtube.com/watch?v=oNalXg67XEE' },
        ],
        coveredBy: [
          { name: 'Ride Sharing System', difficulty: 'Advanced', url: '/docs/lld/problems/ride-sharing' },
          { name: 'Parking Lot System', difficulty: 'Advanced', url: '/docs/lld/problems/parking-lot' },
          { name: 'Library Management System', difficulty: 'Advanced', url: '/docs/lld/problems/library-management' },
        ],
        docsPath: '/docs/lld/topics/behavioral-observer-strategy',
      },
      {
        id: 'behavioral-command-template',
        number: 12,
        title: 'Behavioral: Command & Template Method',
        description: 'Command encapsulates a request as an object, enabling undo/redo, queuing, logging, and macro-commands. Template Method defines the skeleton of an algorithm in a base class, letting subclasses override specific steps without changing the structure. Use Template Method when you have multiple algorithms with the same outline but different steps.',
        resources: [
          { label: 'Refactoring.Guru: Command', url: 'https://refactoring.guru/design-patterns/command' },
          { label: 'Refactoring.Guru: Template Method', url: 'https://refactoring.guru/design-patterns/template-method' },
        ],
        coveredBy: [
          { name: 'Vending Machine', difficulty: 'Advanced', url: '/docs/lld/problems/vending-machine' },
          { name: 'Elevator System', difficulty: 'Advanced', url: '/docs/lld/problems/elevator-system' },
          { name: 'Hotel Booking System', difficulty: 'Advanced', url: '/docs/lld/problems/hotel-booking' },
          { name: 'Thread-Safe Rate Limiter', difficulty: 'Advanced', url: '/docs/lld/problems/rate-limiter-lld' },
        ],
        docsPath: '/docs/lld/topics/behavioral-command-template',
      },
      {
        id: 'flyweight-pattern',
        number: 17,
        title: 'Flyweight Pattern',
        description: 'Share fine-grained objects to reduce memory when you have thousands or millions of similar objects. Split state into intrinsic (shared, immutable — stored in the flyweight) and extrinsic (per-instance — passed in by the caller). Classic example: a chess piece type object shared across all instances of that piece on the board. The FlyweightFactory caches and returns existing instances instead of creating new ones.',
        resources: [
          { label: 'Refactoring.Guru: Flyweight', url: 'https://refactoring.guru/design-patterns/flyweight' },
        ],
        coveredBy: [
          { name: 'Chess Game', difficulty: 'Advanced', url: '/docs/lld/problems/chess-game' },
          { name: 'In-Memory File System', difficulty: 'Advanced', url: '/docs/lld/problems/file-system' },
        ],
        docsPath: '/docs/lld/topics/flyweight-pattern',
      },
      {
        id: 'memento-pattern',
        number: 18,
        title: 'Memento Pattern',
        description: 'Capture and restore an object\'s internal state without exposing its internals — the foundation of undo/redo. Three roles: Originator (creates and restores from memento), Memento (opaque snapshot of state), Caretaker (stores and manages mementos, does not inspect them). Pairs directly with Command: Command executes an action, Memento records the state to roll back to.',
        resources: [
          { label: 'Refactoring.Guru: Memento', url: 'https://refactoring.guru/design-patterns/memento' },
        ],
        coveredBy: [
          { name: 'Chess Game', difficulty: 'Advanced', url: '/docs/lld/problems/chess-game' },
        ],
        docsPath: '/docs/lld/topics/memento-pattern',
      },
      {
        id: 'visitor-pattern',
        number: 19,
        title: 'Visitor Pattern',
        description: 'Add new operations to a type hierarchy without modifying the types. A Visitor object implements one visit() method per type in the hierarchy; each type calls accept(visitor) which dispatches to the right visit() overload — this is double dispatch. Use when you have a stable set of types but frequently add new operations (serialise, render, export, validate). Hard conceptual question at Google/Amazon senior level.',
        resources: [
          { label: 'Refactoring.Guru: Visitor', url: 'https://refactoring.guru/design-patterns/visitor' },
        ],
        coveredBy: [
          { name: 'In-Memory File System', difficulty: 'Advanced', url: '/docs/lld/problems/file-system' },
        ],
        docsPath: '/docs/lld/topics/visitor-pattern',
      },
    ],
  },
  {
    id: 'advanced',
    label: 'Level 3 — Advanced',
    difficulty: 'Advanced',
    color: '#dc2626',
    topics: [
      {
        id: 'behavioral-iterator-state',
        number: 13,
        title: 'Behavioral: Iterator & State',
        description: 'Iterator provides a standard way to traverse a collection without exposing its internal structure. State allows an object to change its behaviour when its internal state changes — the object appears to change its class. Essential for modelling state machines: elevator (idle/moving/open), vending machine (idle/selecting/dispensing/collecting).',
        resources: [
          { label: 'Refactoring.Guru: State', url: 'https://refactoring.guru/design-patterns/state' },
          { label: 'Refactoring.Guru: Iterator', url: 'https://refactoring.guru/design-patterns/iterator' },
        ],
        coveredBy: [
          { name: 'Elevator System', difficulty: 'Advanced', url: '/docs/lld/problems/elevator-system' },
          { name: 'Vending Machine', difficulty: 'Advanced', url: '/docs/lld/problems/vending-machine' },
        ],
        docsPath: '/docs/lld/topics/behavioral-iterator-state',
      },
      {
        id: 'behavioral-chain-mediator',
        number: 14,
        title: 'Behavioral: Chain of Responsibility & Mediator',
        description: 'Chain of Responsibility passes a request along a chain of handlers — each decides to handle it or pass it on. Perfect for middleware pipelines, validation chains, and request filters. Mediator centralises complex communication between components behind a single object, reducing direct dependencies. Use for GUI components, chat rooms, air traffic control.',
        resources: [
          { label: 'Refactoring.Guru: Chain of Responsibility', url: 'https://refactoring.guru/design-patterns/chain-of-responsibility' },
          { label: 'Refactoring.Guru: Mediator', url: 'https://refactoring.guru/design-patterns/mediator' },
        ],
        coveredBy: [
          { name: 'Elevator System', difficulty: 'Advanced', url: '/docs/lld/problems/elevator-system' },
          { name: 'Hotel Booking System', difficulty: 'Advanced', url: '/docs/lld/problems/hotel-booking' },
        ],
        docsPath: '/docs/lld/topics/behavioral-chain-mediator',
      },
      {
        id: 'dependency-injection',
        number: 15,
        title: 'Dependency Injection & IoC',
        description: 'Dependency Injection (DI) means providing an object\'s dependencies from outside rather than creating them internally — constructor injection, setter injection, or interface injection. Inversion of Control (IoC) is the broader principle: the framework calls your code, not the other way around. DI makes code testable (swap real DBs for mocks) and decoupled.',
        resources: [
          { label: 'Ryan Schachte: Dependency Injection & IoC', url: 'https://www.youtube.com/watch?v=EPv9-cHEmQw' },
          { label: 'Refactoring.Guru: DI', url: 'https://refactoring.guru/design-patterns/catalog' },
        ],
        coveredBy: [
          { name: 'Ride Sharing System', difficulty: 'Advanced', url: '/docs/lld/problems/ride-sharing' },
          { name: 'Thread-Safe Rate Limiter', difficulty: 'Advanced', url: '/docs/lld/problems/rate-limiter-lld' },
        ],
        docsPath: '/docs/lld/topics/dependency-injection',
      },
      {
        id: 'concurrency-patterns',
        number: 16,
        title: 'Concurrency Patterns',
        description: 'Thread-safe design: Producer-Consumer with a bounded blocking queue, Reader-Writer lock (multiple readers OR one writer), Thread Pool (reuse threads to avoid creation overhead), Monitor pattern (synchronised methods + wait/notify). Key concepts: mutual exclusion, deadlock prevention, liveness. Essential for rate limiter, cache, and any shared-resource LLD problem.',
        resources: [
          { label: 'Mike Swift: Introduction to Concurrency', url: 'https://www.youtube.com/watch?v=iKtvNJQoCNw' },
        ],
        coveredBy: [
          { name: 'Thread-Safe Rate Limiter', difficulty: 'Advanced', url: '/docs/lld/problems/rate-limiter-lld' },
          { name: 'LRU / LFU Cache', difficulty: 'Advanced', url: '/docs/lld/problems/lru-cache' },
        ],
        docsPath: '/docs/lld/topics/concurrency-patterns',
      },
      {
        id: 'immutability-value-objects',
        number: 20,
        title: 'Immutability & Value Objects',
        description: 'Immutable objects need zero synchronisation — the simplest concurrency strategy. Make fields final, return defensive copies of collections, and provide no setters. Value Objects have no identity — two Money(100, USD) instances are equal regardless of reference. Java 16+ records are value objects by default. Distinguish from Entities (identity-based equality, mutable): Order is an Entity, Money is a Value Object.',
        resources: [
          { label: 'Refactoring.Guru: Replace Data Value with Object', url: 'https://refactoring.guru/replace-data-value-with-object' },
          { label: 'Baeldung: Immutable Objects', url: 'https://www.baeldung.com/java-immutable-object' },
        ],
        coveredBy: [
          { name: 'Splitwise', difficulty: 'Advanced', url: '/docs/lld/problems/splitwise' },
        ],
        docsPath: '/docs/lld/topics/immutability-value-objects',
      },
      {
        id: 'exception-hierarchy',
        number: 21,
        title: 'Exception Hierarchy Design',
        description: 'Design exceptions that communicate domain intent. Checked exceptions (extends Exception) signal recoverable conditions — the caller must handle them. Unchecked exceptions (extends RuntimeException) signal programming errors — let them propagate. Build a hierarchy: BookingException → SeatUnavailableException, InsufficientFundsException. Fail-fast: validate inputs at boundaries and throw early rather than propagating bad state deep into the system.',
        resources: [
          { label: 'Baeldung: Custom Exceptions', url: 'https://www.baeldung.com/java-new-custom-exception' },
          { label: 'Baeldung: Checked vs Unchecked', url: 'https://www.baeldung.com/java-checked-unchecked-exceptions' },
        ],
        coveredBy: [
          { name: 'ATM Machine', difficulty: 'Advanced', url: '/docs/lld/problems/atm-machine' },
        ],
        docsPath: '/docs/lld/topics/exception-hierarchy',
      },
      {
        id: 'enum-state-machines',
        number: 22,
        title: 'Enum-Based State Machines',
        description: 'Java enums with abstract methods are a lightweight alternative to the class-per-state State pattern when states are fixed and transitions are simple. Each enum constant overrides the abstract method with its own behaviour. Add a transition() method that enforces valid transitions and throws IllegalStateException for invalid ones. Reach for this idiom first in interviews — it is concise, readable, and avoids the boilerplate of full State pattern classes.',
        resources: [
          { label: 'Refactoring.Guru: State', url: 'https://refactoring.guru/design-patterns/state' },
          { label: 'Baeldung: Enum State Machine', url: 'https://www.baeldung.com/java-enum-simple-state-machine' },
        ],
        coveredBy: [
          { name: 'Vending Machine', difficulty: 'Advanced', url: '/docs/lld/problems/vending-machine' },
          { name: 'ATM Machine', difficulty: 'Advanced', url: '/docs/lld/problems/atm-machine' },
          { name: 'Task Management System', difficulty: 'Advanced', url: '/docs/lld/problems/task-management' },
        ],
        docsPath: '/docs/lld/topics/enum-state-machines',
      },
      {
        id: 'functional-java-patterns',
        number: 23,
        title: 'Functional Java Patterns',
        description: 'Java 8+ idioms expected in every modern interview. Stream pipeline: filter → map → collect. groupingBy() for aggregations. Optional chaining: map/flatMap/orElse instead of null checks. Functional interfaces: Function<T,R>, Predicate<T>, Supplier<T>, Consumer<T>. Comparator.comparing() for concise sorting. Method references (Class::method) over verbose lambdas. Writing for-loops when streams apply is a signal of dated knowledge.',
        resources: [
          { label: 'Baeldung: Java 8 Streams', url: 'https://www.baeldung.com/java-8-streams' },
          { label: 'Baeldung: Functional Interfaces', url: 'https://www.baeldung.com/java-8-functional-interfaces' },
          { label: 'Baeldung: Java Optional', url: 'https://www.baeldung.com/java-optional' },
        ],
        coveredBy: [],
        docsPath: '/docs/lld/topics/functional-java-patterns',
      },
      {
        id: 'domain-modeling-basics',
        number: 24,
        title: 'Domain Modeling Basics',
        description: 'Translate a problem statement into a class model. Entity: has identity, mutable, persisted (Order, User). Value Object: no identity, immutable, equality by value (Money, Address). Aggregate: consistency boundary with a root entity that controls all access to internal objects (Order owns OrderItems). Repository: collection abstraction that hides persistence details. Service: stateless operation that does not belong on any entity. Avoid the Anemic Domain Model — put behaviour on entities, not in service methods.',
        resources: [
          { label: 'Martin Fowler: Anemic Domain Model', url: 'https://martinfowler.com/bliki/AnemicDomainModel.html' },
          { label: 'Baeldung: DDD with Spring', url: 'https://www.baeldung.com/spring-data-ddd' },
        ],
        coveredBy: [
          { name: 'Splitwise', difficulty: 'Advanced', url: '/docs/lld/problems/splitwise' },
          { name: 'Food Delivery System', difficulty: 'Advanced', url: '/docs/lld/problems/food-delivery' },
        ],
        docsPath: '/docs/lld/topics/domain-modeling-basics',
      },
    ],
  },
  {
    id: 'expert',
    label: 'Level 4 — Expert',
    difficulty: 'Expert',
    color: '#7c3aed',
    topics: [
      {
        id: 'object-pool',
        number: 25,
        title: 'Object Pool & Resource Management',
        description: 'Reuse expensive objects (DB connections, threads, HTTP clients) instead of creating and destroying them repeatedly. Pool maintains a bounded set of idle objects. Borrower calls acquire() — blocks or times out if none available. Returns object via release(). Implementation: Semaphore bounds total connections, BlockingQueue holds idle objects, health-check on borrow, scheduled eviction of idle-too-long objects. The canonical hard concurrency problem in LLD interviews.',
        resources: [
          { label: 'Baeldung: Object Pooling', url: 'https://www.baeldung.com/java-object-pool' },
          { label: 'Baeldung: BlockingQueue', url: 'https://www.baeldung.com/java-blocking-queue' },
        ],
        coveredBy: [
          { name: 'Connection Pool Manager', difficulty: 'Expert', url: '/docs/lld/problems/connection-pool' },
        ],
        docsPath: '/docs/lld/topics/object-pool',
      },
      {
        id: 'event-driven-design',
        number: 26,
        title: 'Event-Driven Design',
        description: 'Decouple components by having them communicate through events rather than direct calls. Domain events are immutable data records (OrderPlaced, TripCompleted). Publisher raises events; handlers subscribe and react. Synchronous dispatch: handlers called inline in the same thread. Asynchronous: events queued and processed later. Distinguish from Observer: Observer is a pattern, event-driven is an architecture style. Use to model multi-actor workflows where each state transition triggers downstream reactions.',
        resources: [
          { label: 'Martin Fowler: Domain Events', url: 'https://martinfowler.com/eaaDev/DomainEvent.html' },
          { label: 'Baeldung: Spring Events', url: 'https://www.baeldung.com/spring-events' },
        ],
        coveredBy: [
          { name: 'Food Delivery System', difficulty: 'Expert', url: '/docs/lld/problems/food-delivery' },
          { name: 'Notification Service', difficulty: 'Expert', url: '/docs/lld/problems/notification-service' },
        ],
        docsPath: '/docs/lld/topics/event-driven-design',
      },
      {
        id: 'clean-architecture',
        number: 27,
        title: 'Clean Architecture & Layered Design',
        description: 'Structure code so the domain layer has zero dependencies on infrastructure. Three layers: Domain (entities, value objects, domain services — pure Java, no frameworks), Application Service (orchestrates domain objects, no business logic itself), Infrastructure/Adapter (repositories, APIs, external services). The Dependency Rule: inner layers never import outer layers. Ports and adapters: domain defines interfaces (ports), infrastructure provides implementations (adapters). Makes domain logic testable without a database or HTTP stack.',
        resources: [
          { label: 'Uncle Bob: The Clean Architecture', url: 'https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html' },
          { label: 'Baeldung: Hexagonal Architecture', url: 'https://www.baeldung.com/hexagonal-architecture-ddd-spring' },
        ],
        coveredBy: [],
        docsPath: '/docs/lld/topics/clean-architecture',
      },
    ],
  },
];

export const LLD_TOTAL_TOPICS = LLD_LEVELS.reduce((sum, l) => sum + l.topics.length, 0);
