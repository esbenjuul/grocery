// routes/_layout.tsx
import { PageProps } from "$fresh/server.ts";
import { Avatar } from "@/components/index.ts";
import { ServerState } from "@/routes/_middleware.ts";

export default function MyLayout(
  { Component, state }: PageProps<any, ServerState>,
) {
  const { avatar } = state?.session?.get("user");
  console.log("state", state);
  console.log("avatar", avatar);
  return (
    <main>
      <header class="header">
        <div class="container">
          <a class="logo" href="/">
            <img src="images/logo.svg" alt="logo" />
          </a>
          {state.token ? <Avatar avatar={avatar}></Avatar> : ""}
          <nav>
            avatar: {avatar}
            token: {state.token}
            <ul>
              <li>
                {state.token ? "logout" : <a href="/login">Login</a>}
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
