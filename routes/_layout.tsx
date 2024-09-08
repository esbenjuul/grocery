// routes/_layout.tsx
import { LayoutProps } from "$fresh/server.ts";
import { Avatar } from "@/components/header/Avatar.tsx";

export default function MyLayout({ Component, state }: LayoutProps) {
  const { avatar, authenticated } = state?.session?.get("user");
  // console.log(state.session.get("user"));
  return (
    <main>
      <header class="header">
        <div class="container">
          <a class="logo" href="/">
            <img src="images/logo.svg" alt="logo" />
          </a>
          {authenticated ? <Avatar avatar={avatar}></Avatar> : ""}
          <nav>
            <ul>
              <li>
                {authenticated ? "logout" : <a href="/login">Login</a>}
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div class="page-wrapper">
        <Component />
      </div>
      <footer>
        footer
      </footer>
    </main>
  );
}
