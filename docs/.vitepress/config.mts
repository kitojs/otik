import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Otik",
  description:
    "🦊 The high-performance, type-safe and modern TypeScript HTTP client written in Rust.",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "https://github.com/kitojs/otik/examples" },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/kitojs/otik" }],
  },
});
