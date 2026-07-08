---
id: blob-storage
title: Blob / Object Storage
sidebar_label: Blob / Object Storage
tags: [easy]
---

# Blob / Object Storage

**Difficulty:** Easy | **Topic #6**

## What to Learn

S3-style object storage for unstructured data (images, videos, files), chunked uploads, pre-signed URLs, metadata vs binary separation, multipart upload for large files.

## Resources

- [Hello Interview Large Blobs Pattern ↗](https://www.hellointerview.com/learn/system-design/patterns/large-blobs)
- [Gaurav Sen Playlist ↗](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)

## Covered by Problems

| Problem | Difficulty | Link |
|---|---|---|
| File Storage/Dropbox | Easy | [→](/docs/problems/dropbox) |
| Photo Sharing (Instagram) | Medium | [→](/docs/problems/instagram) |
| Video Streaming (YouTube) | Medium | [→](/docs/problems/youtube) |
| Real-time Doc Collaboration (Google Docs) | Hard | [→](/docs/problems/google-docs) |

## Key Concepts to Master

- Flat namespace with prefix-based pseudo-folders
- Multipart upload for large files (chunking strategy)
- Pre-signed URLs for direct client-to-storage upload
- Metadata database alongside blob storage
- Erasure coding vs replication for durability
