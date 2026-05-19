# Pompelmi

A lightweight, in-process security middleware for Node.js designed to intercept and scan file upload streams in real-time.

## Features
- **In-Memory Scanning**: Detects malicious signatures before files reach the disk.
- **Stream-Based**: Minimal latency impact using Node.js Transform streams.

## How it works
Pompelmi extends the `stream.Transform` class to inspect data chunks as they flow through the system. If a forbidden pattern (e.g., PHP execution tags) is detected, the stream is aborted immediately.