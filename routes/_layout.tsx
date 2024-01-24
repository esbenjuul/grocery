// routes/_layout.tsx
import { LayoutProps } from "$fresh/server.ts";

export default function MyLayout({ Component }: LayoutProps) {
  return (
    <main>
      <header class="my-layout">
        <a href="/">Home</a>
        <figure class="avatar">
          <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Louise&hair=short01,short02,short03,short04,long05
        " />
        </figure>
        <nav>
          <ul>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
          </ul>
        </nav>
      </header>
      <div class="wrapper">
        <Component />
      </div>
      <footer>
        footer
      </footer>
    </main>
  );
}
