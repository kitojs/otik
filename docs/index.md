---
layout: home

hero:
  name: "Otik"
  text: "🦊 The high-performance, type-safe, and modern TypeScript HTTP client written in Rust."
  tagline: "Very fast, safe, and elegant HTTP requests with zero bloat."
  image:
    src: /otik-logo.png
    alt: Otik Logo
  actions:
    - theme: brand
      text: Get started
      link: /docs/start
    - theme: alt
      text: Benchmarks
      link: https://github.com/kitojs/otik/bench
features:
  - title: High Performance
    icon: ⚡
    details: Built in Rust using napi-rs, Otik delivers extremely-fast HTTP requests with minimal overhead.
  - title: Type-Safe
    icon: ☂️
    details: Full TypeScript integration with automatic runtime validation ensures your data always matches your types.
  - title: Minimal & Elegant
    icon: 🍷
    details: A simple and declarative API designed for maximum developer experience and minimal boilerplate.
  - title: Parallel Requests
    icon: 🚀
    details: Send concurrent requests efficiently leveraging Rust’s async and Tokio under the hood.
  - title: Automatic Deserialization
    icon: 🌈
    details: Otik converts JSON responses directly into your TypeScript schemas automatically, without extra boilerplate.
  - title: Modern & Flexible
    icon: 🌎
    details: Works seamlessly with Node.js, Bun, and Deno, adapting to the modern JavaScript ecosystem.
---

---

## Basic usage

```ts
import { Client } from "otik";
const client = new Client();

const res = await client.get("https://example.com");
console.log(res);
```

## Schemas and deserialization

```ts
import { t, Client } from "otik";
const client = new Client();

const User = t.object({
  id: t.number(),
  name: t.string(),
  email: t.string(),
});

const res = await client.get("https://example.com/user/1", User);
console.log(res.id); // 100% type-safe + automatically deserialized!
```