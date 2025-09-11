<div align="center">
  <img src="https://github.com/kitojs/.github/blob/8e4fdcf8c2bdf63ca651eeb554c83f1742dba5cd/assets/otik-banner.png" width="220px" />
  
  <br />
  <br />
  
  <p>
    <strong>High-performance</strong>, fully <strong>type-safe</strong>, and modern HTTP client for <strong>TypeScript</strong>.  
    Powered by <strong>Rust</strong> for extremely speed, automatic deserialization, and zero bloat.
  </p>
</div>

---

- **Extreme performance** – Rust core with Tokio for massively fast & efficient HTTP requests. **See the [benchmarks](https://github.com/kitojs/otik/bench).**
- **Type-safe** – full TypeScript support with end-to-end type safety and great DX.
- **Automatic deserialization** – JSON responses mapped directly into your TypeScript schemas.
- **Efficient streaming** – handle large responses as streams directly from Rust, without buffering the whole body in memory.
- **First-class concurrency** – built-in support for batching, pooling, and cancellation of requests, leveraging Rust’s async engine.
- **Zero dependencies** – no dependencies, no bloat.
- **Cross-platform** – works seamlessly on Node.js, Bun, and Deno.

---

## 🚀 Quick Start

Install Otik with your favorite package manager:

```bash
pnpm add otik   # Or: npm i otik
````

### Minimal Example

```ts
import { Client } from "otik";
const client = new Client();

const res = await client.get("https://jsonplaceholder.typicode.com/todos/1");
console.log(res);
```

### Schemas and Deserialization

```ts
import { t, Client } from "otik";
const client = new Client();

const User = t.object({
  id: t.number(),
  name: t.string(),
  email: t.string(),
});

const user = await client.get("https://jsonplaceholder.typicode.com/users/1", User);
console.log(user.name); // 100% type-safe and automatically deserialized!
```

---

## 📚 Documentation

Full docs available at the [**official website**](https://otikjs.pages.dev).
You can also explore ready-to-run [examples](./examples).

---

## 🤝 Contributing

We welcome contributions! Check the [**contributing guide**](./contributing.md) to learn how to set up your environment and submit pull requests.

---

## 📄 License

Licensed under the [MIT License](./license).

---
