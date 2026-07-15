---
title: Chess Game
sidebar_label: Chess Game
tags: [lld, machine-coding]
---

# Chess Game

**Difficulty:** Medium | **Track:** LLD

## Problem statement

Design a two-player chess game with move validation, check detection, and undo support. The system must model all standard chess pieces, each responsible for validating its own legal moves. Players alternate turns (White then Black), and the game detects check and checkmate conditions after every move.

## Requirements

**Functional:**
- Model all 6 piece types (King, Queen, Rook, Bishop, Knight, Pawn), each validating its own legal moves
- Detect check and checkmate conditions after every move
- Enforce turn order — White and Black alternate; an illegal move must be rejected
- Support undo for the last N moves, restoring board state exactly
- Track full move history in algebraic notation

**Out of scope:**
- AI opponent or any computer-controlled player
- Time controls and chess clocks
- Special moves: castling, en passant, pawn promotion rules beyond simple queening

## Key classes

```java
enum Color { WHITE, BLACK }

enum PieceType { KING, QUEEN, ROOK, BISHOP, KNIGHT, PAWN }

record Position(int row, int col) {
    boolean isValid() { return row >= 0 && row < 8 && col >= 0 && col < 8; }
}

// Memento + Command: captures everything needed to execute or undo a move
record Move(Piece piece, Position from, Position to, Piece capturedPiece) {}

abstract class Piece {
    protected final Color color;
    protected final PieceType type;

    Piece(Color color, PieceType type) { ... }

    // Template Method: subclasses provide move-generation logic
    public abstract List<Position> legalMoves(Board board);

    public Color getColor() { return color; }
    public PieceType getType() { return type; }
}

class King   extends Piece { public List<Position> legalMoves(Board board) { ... } }
class Queen  extends Piece { public List<Position> legalMoves(Board board) { ... } }
class Rook   extends Piece { public List<Position> legalMoves(Board board) { ... } }
class Bishop extends Piece { public List<Position> legalMoves(Board board) { ... } }
class Knight extends Piece { public List<Position> legalMoves(Board board) { ... } }
class Pawn   extends Piece { public List<Position> legalMoves(Board board) { ... } }

// Flyweight: returns shared, immutable Piece instances per (PieceType, Color) pair
class ChessPieceFactory {
    private static final Map<String, Piece> cache = new HashMap<>();
    public static Piece get(PieceType type, Color color) { ... }
}

// Composite: owns the 8x8 grid and delegates move-legality to each Piece
class Board {
    private final Piece[][] grid = new Piece[8][8];

    public Piece getPieceAt(Position pos) { ... }
    public void movePiece(Position from, Position to) { ... }
    public boolean isInCheck(Color color) { ... }
    public boolean isCheckmate(Color color) { ... }
    public Board deepCopy() { ... }    // used by undo
}

class Game {
    private final Board board;
    private Color currentTurn;
    private final Deque<Move> moveHistory;   // stack for undo
    private final List<String> algebraicLog;

    public boolean makeMove(Position from, Position to) { ... }
    public void undo() { ... }
    public List<String> getMoveHistory() { return algebraicLog; }
}
```

## Patterns used

- **Polymorphism / Template Method**: `Piece` declares `legalMoves(Board)` as an abstract method; each concrete piece encapsulates its own movement rules without any switch/instanceof in the caller.
- **Command + Memento**: The `Move` record acts simultaneously as a command (carries enough data to execute the move) and a memento (captures pre-move state — including `capturedPiece` — to restore the board on undo).
- **Composite**: `Board` is the component that contains `Piece` objects; callers interact with the board as a whole rather than managing individual squares.
- **Flyweight**: `ChessPieceFactory` caches one shared `Piece` instance per `(PieceType, Color)` combination, avoiding object proliferation when pieces are replicated across board copies.

## Key design decisions

- **Piece owns move validation**: Placing `legalMoves(Board board)` on the piece itself keeps move logic cohesive and makes adding new piece types open/closed — no central dispatcher needs updating.
- **Move as both Command and Memento**: A single `Move` record replaces two separate classes (command + snapshot) because chess undo only needs one step of captured state; this keeps the undo stack simple without sacrificing correctness.
- **Check detection via simulation**: `isInCheck(Color)` works by scanning all opponent pieces and testing whether any legal move lands on the king's position; this avoids a separate check-tracking structure and stays correct after every board mutation.
- **Board.deepCopy() for undo**: Rather than storing full board snapshots (expensive) or reverse-move logic (error-prone for edge cases), the game stores the lightweight `Move` record and rebuilds from it — captured piece is replaced, moved piece returns to origin.
- **Flyweight scope limited to piece objects**: The flyweight applies only to stateless piece-type objects (their logic and color); position and board occupancy remain mutable, so the pattern does not create aliasing bugs.

## What the interviewer is looking for

- **OOP decomposition**: Can you identify that each piece is the right owner of its own move logic, rather than putting a giant switch in the board or game class?
- **Correct undo implementation**: Do you store enough state in the `Move` record (specifically `capturedPiece`) to fully reverse any move, including captures?
- **Check/checkmate reasoning**: Can you articulate how `isInCheck` works and how `isCheckmate` extends it (no legal move exists that leaves the king out of check)?
- **Pattern justification**: Can you explain *why* Memento fits undo, and *why* Flyweight is appropriate here but would be wrong if pieces were mutable?
- **Extensibility discussion**: Can you walk through what adding castling or en passant would require — without redesigning the whole system?

## Resources

- [Refactoring.Guru: Memento](https://refactoring.guru/design-patterns/memento)
