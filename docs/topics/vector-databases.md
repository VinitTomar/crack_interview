---
id: vector-databases
title: Vector Databases & LLM Infrastructure
sidebar_label: Vector Databases & LLM Infrastructure
tags: [hard]
---

# Vector Databases & LLM Infrastructure

**Difficulty:** Hard | **Topic #35**

## What to Learn

Embeddings and semantic search, Approximate Nearest Neighbor (ANN) search algorithms (HNSW, IVF), vector database options (Pinecone, Weaviate, pgvector), serving LLM inference at scale with streaming token output.

## Resources

- [Hello Interview: Vector Databases ↗](https://www.hellointerview.com/learn/system-design/deep-dives/vector-databases)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| LLM Service (ChatGPT) | Hard | [→](/docs/problems/chatgpt) |

## Key Concepts to Master

- Embeddings as dense vectors representing semantic meaning
- HNSW (Hierarchical Navigable Small World) for fast approximate nearest neighbor at query time
- IVF (Inverted File Index) for large-scale ANN with quantization
- pgvector for adding vector search to PostgreSQL
- Streaming token output from LLMs using Server-Sent Events or WebSockets
