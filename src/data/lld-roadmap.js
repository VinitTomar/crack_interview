export const LLD_LEVELS = [
  {
    id: 'fundamentals',
    label: 'Level 1 — Fundamentals',
    difficulty: 'Fundamentals',
    color: '#3b82f6',
    topics: [
      {
        id: 'oop-fundamentals',
        number: 1,
        title: 'OOP Fundamentals',
        description: 'The four pillars of OOP: encapsulation (hiding internal state), inheritance (reusing behaviour), polymorphism (same interface, different behaviour), and abstraction (exposing what matters, hiding how). Understand how classes and objects model real-world entities and why OOP improves modularity and reuse.',
        resources: [
          { label: 'Hello Interview: OOD Introduction', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/introduction' },
          { label: 'Refactoring.Guru: OOP Basics', url: 'https://refactoring.guru/design-patterns/what-is-pattern' },
          { label: 'Gaurav Sen: OOD Series', url: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX' },
        ],
        coveredBy: [
          { name: 'Parking Lot System', difficulty: 'Problems', url: '/docs/lld/problems/parking-lot' },
          { name: 'Vending Machine', difficulty: 'Problems', url: '/docs/lld/problems/vending-machine' },
        ],
        docsPath: '/docs/lld/topics/oop-fundamentals',
      },
      {
        id: 'solid-principles',
        number: 2,
        title: 'SOLID Principles',
        description: 'Five principles for writing maintainable OO code: Single Responsibility (one reason to change), Open-Closed (open for extension, closed for modification), Liskov Substitution (subtypes must be substitutable), Interface Segregation (prefer narrow interfaces), Dependency Inversion (depend on abstractions, not concretions). SOLID violations are red flags in every OOD interview.',
        resources: [
          { label: 'Hello Interview: SOLID', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/solid' },
          { label: 'Refactoring.Guru: SOLID', url: 'https://refactoring.guru/solid' },
          { label: 'Gaurav Sen: SOLID Principles', url: 'https://www.youtube.com/watch?v=rtmFCcjEgEw' },
        ],
        coveredBy: [
          { name: 'Library Management System', difficulty: 'Problems', url: '/docs/lld/problems/library-management' },
        ],
        docsPath: '/docs/lld/topics/solid-principles',
      },
      {
        id: 'object-relationships',
        number: 3,
        title: 'Object Relationships',
        description: 'How objects relate: association (uses-a, loose coupling), aggregation (has-a, independent lifecycle), composition (part-of, dependent lifecycle), and dependency (method parameter). Knowing when to use composition over inheritance is a core interview skill. Model these correctly and your class diagrams become self-documenting.',
        resources: [
          { label: 'Hello Interview: Relationships', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/relationships' },
          { label: 'Refactoring.Guru: Relations', url: 'https://refactoring.guru/design-patterns/catalog' },
        ],
        coveredBy: [
          { name: 'Hotel Booking System', difficulty: 'Problems', url: '/docs/lld/problems/hotel-booking' },
        ],
        docsPath: '/docs/lld/topics/object-relationships',
      },
      {
        id: 'interfaces-vs-abstract',
        number: 4,
        title: 'Interfaces vs Abstract Classes',
        description: 'Interfaces define contracts (what to do), abstract classes share partial implementations (how to do some of it). Know when each applies: prefer interfaces for capability definitions (Serializable, Comparable), abstract classes for shared state or template logic. In Java/C#, a class can implement multiple interfaces but extend only one abstract class.',
        resources: [
          { label: 'Hello Interview: Interfaces', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/introduction' },
          { label: 'Refactoring.Guru: Abstract Factory', url: 'https://refactoring.guru/design-patterns/abstract-factory' },
        ],
        coveredBy: [
          { name: 'Ride Sharing System', difficulty: 'Problems', url: '/docs/lld/problems/ride-sharing' },
        ],
        docsPath: '/docs/lld/topics/interfaces-vs-abstract',
      },
      {
        id: 'design-principles',
        number: 5,
        title: 'Design Principles',
        description: 'Beyond SOLID: DRY (Don\'t Repeat Yourself — one source of truth), YAGNI (You Ain\'t Gonna Need It — avoid premature abstraction), KISS (Keep It Simple), Law of Demeter (talk only to direct neighbours, avoid train wrecks), and Composition Over Inheritance (prefer delegation to deep hierarchies). These are the judgment calls interviewers watch for.',
        resources: [
          { label: 'Hello Interview: Design Principles', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/solid' },
          { label: 'Refactoring.Guru: Principles', url: 'https://refactoring.guru/refactoring/catalog' },
        ],
        coveredBy: [
          { name: 'Library Management System', difficulty: 'Problems', url: '/docs/lld/problems/library-management' },
          { name: 'Parking Lot System', difficulty: 'Problems', url: '/docs/lld/problems/parking-lot' },
        ],
        docsPath: '/docs/lld/topics/design-principles',
      },
      {
        id: 'uml-diagrams',
        number: 6,
        title: 'UML & Class Diagrams',
        description: 'Class diagrams show entities (classes/interfaces), their attributes, methods, and relationships. Sequence diagrams show message flow between objects over time. Interviewers expect a quick whiteboard sketch — not perfection. Focus on class names, key fields, relationships (solid line = association, hollow diamond = aggregation, filled diamond = composition, hollow arrow = inheritance), and the arrows\' direction.',
        resources: [
          { label: 'Hello Interview: Class Diagrams', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/introduction' },
          { label: 'Lucidchart: UML Guide', url: 'https://www.lucidchart.com/pages/uml-class-diagram' },
        ],
        coveredBy: [
          { name: 'Parking Lot System', difficulty: 'Problems', url: '/docs/lld/problems/parking-lot' },
          { name: 'Elevator System', difficulty: 'Problems', url: '/docs/lld/problems/elevator-system' },
        ],
        docsPath: '/docs/lld/topics/uml-diagrams',
      },
    ],
  },
  {
    id: 'patterns',
    label: 'Level 2 — Patterns',
    difficulty: 'Patterns',
    color: '#f59e0b',
    topics: [
      {
        id: 'creational-patterns',
        number: 7,
        title: 'Creational Patterns',
        description: 'Control object creation: Factory Method (let subclasses decide which class to instantiate), Abstract Factory (families of related objects), Builder (construct complex objects step-by-step), Singleton (ensure one instance), Prototype (clone existing objects). Factory and Builder are the most common in LLD interviews. Know the tradeoffs — Singleton is often a testing anti-pattern.',
        resources: [
          { label: 'Refactoring.Guru: Creational', url: 'https://refactoring.guru/design-patterns/creational-patterns' },
          { label: 'Hello Interview: Design Patterns', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/design-patterns' },
          { label: 'Gaurav Sen: Design Patterns', url: 'https://www.youtube.com/watch?v=tAuRQs_d9F4' },
        ],
        coveredBy: [
          { name: 'Vending Machine', difficulty: 'Problems', url: '/docs/lld/problems/vending-machine' },
          { name: 'Parking Lot System', difficulty: 'Problems', url: '/docs/lld/problems/parking-lot' },
          { name: 'Library Management System', difficulty: 'Problems', url: '/docs/lld/problems/library-management' },
          { name: 'Hotel Booking System', difficulty: 'Problems', url: '/docs/lld/problems/hotel-booking' },
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
          { name: 'Parking Lot System', difficulty: 'Problems', url: '/docs/lld/problems/parking-lot' },
          { name: 'Ride Sharing System', difficulty: 'Problems', url: '/docs/lld/problems/ride-sharing' },
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
          { name: 'LRU / LFU Cache', difficulty: 'Problems', url: '/docs/lld/problems/lru-cache' },
          { name: 'Hotel Booking System', difficulty: 'Problems', url: '/docs/lld/problems/hotel-booking' },
          { name: 'Thread-Safe Rate Limiter', difficulty: 'Problems', url: '/docs/lld/problems/rate-limiter-lld' },
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
          { name: 'Library Management System', difficulty: 'Problems', url: '/docs/lld/problems/library-management' },
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
          { label: 'Gaurav Sen: Observer Pattern', url: 'https://www.youtube.com/watch?v=oNalXg67XEE' },
        ],
        coveredBy: [
          { name: 'Ride Sharing System', difficulty: 'Problems', url: '/docs/lld/problems/ride-sharing' },
          { name: 'Parking Lot System', difficulty: 'Problems', url: '/docs/lld/problems/parking-lot' },
          { name: 'Library Management System', difficulty: 'Problems', url: '/docs/lld/problems/library-management' },
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
          { name: 'Vending Machine', difficulty: 'Problems', url: '/docs/lld/problems/vending-machine' },
          { name: 'Elevator System', difficulty: 'Problems', url: '/docs/lld/problems/elevator-system' },
          { name: 'Hotel Booking System', difficulty: 'Problems', url: '/docs/lld/problems/hotel-booking' },
          { name: 'Thread-Safe Rate Limiter', difficulty: 'Problems', url: '/docs/lld/problems/rate-limiter-lld' },
        ],
        docsPath: '/docs/lld/topics/behavioral-command-template',
      },
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
          { name: 'Elevator System', difficulty: 'Problems', url: '/docs/lld/problems/elevator-system' },
          { name: 'Vending Machine', difficulty: 'Problems', url: '/docs/lld/problems/vending-machine' },
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
          { name: 'Elevator System', difficulty: 'Problems', url: '/docs/lld/problems/elevator-system' },
          { name: 'Hotel Booking System', difficulty: 'Problems', url: '/docs/lld/problems/hotel-booking' },
        ],
        docsPath: '/docs/lld/topics/behavioral-chain-mediator',
      },
      {
        id: 'dependency-injection',
        number: 15,
        title: 'Dependency Injection & IoC',
        description: 'Dependency Injection (DI) means providing an object\'s dependencies from outside rather than creating them internally — constructor injection, setter injection, or interface injection. Inversion of Control (IoC) is the broader principle: the framework calls your code, not the other way around. DI makes code testable (swap real DBs for mocks) and decoupled.',
        resources: [
          { label: 'Gaurav Sen: DI & IoC', url: 'https://www.youtube.com/watch?v=EPv9-cHEmQw' },
          { label: 'Refactoring.Guru: DI', url: 'https://refactoring.guru/design-patterns/catalog' },
        ],
        coveredBy: [
          { name: 'Ride Sharing System', difficulty: 'Problems', url: '/docs/lld/problems/ride-sharing' },
          { name: 'Thread-Safe Rate Limiter', difficulty: 'Problems', url: '/docs/lld/problems/rate-limiter-lld' },
        ],
        docsPath: '/docs/lld/topics/dependency-injection',
      },
      {
        id: 'concurrency-patterns',
        number: 16,
        title: 'Concurrency Patterns',
        description: 'Thread-safe design: Producer-Consumer with a bounded blocking queue, Reader-Writer lock (multiple readers OR one writer), Thread Pool (reuse threads to avoid creation overhead), Monitor pattern (synchronised methods + wait/notify). Key concepts: mutual exclusion, deadlock prevention, liveness. Essential for rate limiter, cache, and any shared-resource LLD problem.',
        resources: [
          { label: 'Gaurav Sen: Concurrency', url: 'https://www.youtube.com/watch?v=iKtvNJQoCNw' },
          { label: 'Hello Interview: Concurrency', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/concurrency' },
        ],
        coveredBy: [
          { name: 'Thread-Safe Rate Limiter', difficulty: 'Problems', url: '/docs/lld/problems/rate-limiter-lld' },
          { name: 'LRU / LFU Cache', difficulty: 'Problems', url: '/docs/lld/problems/lru-cache' },
        ],
        docsPath: '/docs/lld/topics/concurrency-patterns',
      },
    ],
  },
  {
    id: 'problems',
    label: 'Level 3 — Problems',
    difficulty: 'Problems',
    color: '#ef4444',
    topics: [
      {
        id: 'parking-lot',
        number: 17,
        title: 'Parking Lot System',
        description: 'Design a multi-floor parking lot with different spot types (compact, large, motorcycle). Key classes: ParkingLot, Floor, Spot, Vehicle (Car, Truck, Motorcycle), Ticket, PaymentService. Covers Factory (vehicle type), Strategy (fee calculation), Observer (spot availability), and State (spot status). Classic intro LLD problem.',
        resources: [
          { label: 'Hello Interview: Parking Lot', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/parking-lot' },
          { label: 'Grokking OOD: Parking Lot', url: 'https://github.com/tssovi/grokking-the-object-oriented-design-interview/blob/master/object-oriented-design-case-studies/design-a-parking-lot.md' },
        ],
        coveredBy: [],
        docsPath: '/docs/lld/problems/parking-lot',
      },
      {
        id: 'lru-cache',
        number: 18,
        title: 'LRU / LFU Cache',
        description: 'LRU Cache: evict the least recently used item when full. Implement with a HashMap + doubly linked list for O(1) get and put. LFU Cache: evict the least frequently used item (with LRU as tiebreaker). Implement with two HashMaps and a doubly linked list of frequency buckets. Thread-safe version uses ReadWriteLock. Core data structures interview disguised as OOD.',
        resources: [
          { label: 'Hello Interview: LRU Cache', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/lru-cache' },
          { label: 'Gaurav Sen: LRU Cache Design', url: 'https://www.youtube.com/watch?v=DUbEgNw-F9c' },
        ],
        coveredBy: [],
        docsPath: '/docs/lld/problems/lru-cache',
      },
      {
        id: 'elevator-system',
        number: 19,
        title: 'Elevator System',
        description: 'Design an elevator system for a building with N floors and M elevators. Key decisions: scheduling algorithm (FCFS, SCAN/look, direction-aware), state machine for each elevator (idle, moving-up, moving-down, doors-open), request types (internal floor button, external hall button). Covers State pattern, Strategy (scheduling), Observer (floor display updates).',
        resources: [
          { label: 'Hello Interview: Elevator', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/elevator' },
          { label: 'Grokking OOD: Elevator', url: 'https://github.com/tssovi/grokking-the-object-oriented-design-interview/blob/master/object-oriented-design-case-studies/design-an-elevator-system.md' },
        ],
        coveredBy: [],
        docsPath: '/docs/lld/problems/elevator-system',
      },
      {
        id: 'library-management',
        number: 20,
        title: 'Library Management System',
        description: 'Design a library system with books, members, borrowing, reservations, and fines. Key classes: Library, Book, BookItem (physical copy), Member, Librarian, BorrowingRecord, Reservation, Fine. Explores search (by title/author/subject), role-based access (member vs librarian), Composite (catalog), and Repository pattern for data access.',
        resources: [
          { label: 'Hello Interview: Library', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/library-management-system' },
          { label: 'Grokking OOD: Library', url: 'https://github.com/tssovi/grokking-the-object-oriented-design-interview/blob/master/object-oriented-design-case-studies/design-a-library-management-system.md' },
        ],
        coveredBy: [],
        docsPath: '/docs/lld/problems/library-management',
      },
      {
        id: 'hotel-booking',
        number: 21,
        title: 'Hotel Booking System',
        description: 'Design a hotel room reservation system. Key classes: Hotel, Room (types: single/double/suite), Reservation, Guest, Payment, RoomCalendar. Key challenges: checking availability for a date range, concurrent booking prevention (optimistic locking), cancellation policies, and pricing strategy (weekend vs weekday, seasonal). Covers Strategy, Observer, and State patterns.',
        resources: [
          { label: 'Hello Interview: Hotel', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/hotel-management' },
          { label: 'Grokking OOD: Hotel', url: 'https://github.com/tssovi/grokking-the-object-oriented-design-interview/blob/master/object-oriented-design-case-studies/design-a-hotel-management-system.md' },
        ],
        coveredBy: [],
        docsPath: '/docs/lld/problems/hotel-booking',
      },
      {
        id: 'vending-machine',
        number: 22,
        title: 'Vending Machine',
        description: 'Design a vending machine with product inventory, coin/cash handling, and dispensing. State machine: idle → has-money → product-selected → dispensing → change-returned. Key classes: VendingMachine, State, Product, Inventory, CoinSlot, Display. Covers State pattern (machine states), Command (button press), Strategy (payment type). A great pattern showcase problem.',
        resources: [
          { label: 'Hello Interview: Vending Machine', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/vending-machine' },
          { label: 'Grokking OOD: Vending Machine', url: 'https://github.com/tssovi/grokking-the-object-oriented-design-interview/blob/master/object-oriented-design-case-studies/design-a-vending-machine.md' },
        ],
        coveredBy: [],
        docsPath: '/docs/lld/problems/vending-machine',
      },
      {
        id: 'ride-sharing',
        number: 23,
        title: 'Ride Sharing System (Uber OOD)',
        description: 'Design the OOD layer of a ride-sharing app. Key classes: Rider, Driver, Trip, Location, RideRequest, PricingEngine, MatchingService, NotificationService. Strategy for ride types (UberX/Pool/Black), Observer for status updates, State for trip lifecycle (requested/accepted/in-progress/completed). Focus on clean interfaces — leave HLD (maps, queues) out of scope.',
        resources: [
          { label: 'Hello Interview: Ride Sharing', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/ride-sharing' },
          { label: 'Grokking OOD: Uber', url: 'https://github.com/tssovi/grokking-the-object-oriented-design-interview/blob/master/object-oriented-design-case-studies/design-uber.md' },
        ],
        coveredBy: [],
        docsPath: '/docs/lld/problems/ride-sharing',
      },
      {
        id: 'rate-limiter-lld',
        number: 24,
        title: 'Thread-Safe Rate Limiter',
        description: 'Implement a rate limiter at the code level (not system design). Algorithms: token bucket (smooth bursts, refill at fixed rate), sliding window log (exact count, memory-heavy), sliding window counter (approximation, space-efficient), fixed window counter (simple, susceptible to boundary bursts). Thread-safe implementation using ReentrantLock or AtomicLong. Tests concurrency correctness.',
        resources: [
          { label: 'Hello Interview: Rate Limiter LLD', url: 'https://www.hellointerview.com/learn/code/object-oriented-design/rate-limiter' },
          { label: 'Gaurav Sen: Rate Limiting', url: 'https://www.youtube.com/watch?v=mhUQe4BKZXs' },
        ],
        coveredBy: [],
        docsPath: '/docs/lld/problems/rate-limiter-lld',
      },
    ],
  },
];

export const LLD_TOTAL_TOPICS = LLD_LEVELS.reduce((sum, l) => sum + l.topics.length, 0);
