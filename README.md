---

<div align="center">

<img src="https://github.com/kitojs/.github/blob/a9c03f43b308e6361b5dc08878b003e1ce983ff3/otik_banner.png" alt="Kito banner" height="200px" />

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/kitojs/otik/ci.yml?branch=main)](https://github.com/kitojs/otik/actions)
[![GitHub](https://img.shields.io/github/license/kitojs/otik)](https://github.com/kitojs/otik/blob/main/LICENSE)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/kitojs/otik)](https://github.com/kitojs/kito/pulse)
[![GitHub last commit](https://img.shields.io/github/last-commit/kitojs/kito)](https://github.com/kitojs/otik/commits/main)

</div>

Otik is a **high-performance TypeScript HTTP client** powered by Rust. It offers an elegant, **type-safe API with end-to-end type safety**, allowing you to optionally use generic types to define and enforce the request and response schemas, providing flexibility for a wide range of use cases.

```typescript
import { client } from "otik";

const res = await client()
  .url("https://example.com")
  .get("/");

console.log(res);
```

---

## ⚡️ Performance

Otik is **one of the fastest web clients** in JavaScript, thanks to its Rust-powered core that handles thousands of concurrent requests efficiently.

<img src="./bench/charts/results.png" alt="Benchmark chart results" width="100%" />

If you want to see the [internal architecture]() of Otik, you can check it out here.

---

## ✍️ Contributing

Interested in contributing? We welcome improvements, bug fixes, and new features! Please refer to our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to help us make Otik even better.

#### Honorable Mention

A special thanks to the [RustLangES community](https://github.com/RustLangES) for their early support of this project. They provide a fantastic, welcoming space for Rust developers, whether you're just starting out or already a pro. ❤️

---

## 📄 License

Otik is licensed under the [MIT License](./LICENSE).
