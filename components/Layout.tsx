import { ComponentChildren } from "preact";
import { LayoutProps } from "$fresh/server.ts";
import { Avatar } from "@/components/header/Avatar.tsx";
import { ServerState } from "@/routes/index.tsx";
import { PageProps } from "$fresh/server.ts";

type Props = {
  children: ComponentChildren;
  state: ServerState;
};

export default function Layout(props: Props) {
  return (
    <main>
      <header class="header">
        <div class="container">
          <a class="logo" href="/">
            <img src="images/logo.svg" alt="logo" />
          </a>
          {props.state.authenticated ? <Avatar avatar={"dd"}></Avatar> : ""}
          <nav>
            <ul>
              <li>
                {props.state.authenticated
                  ? <a href="/logout">Logout</a>
                  : <a href="/login">Login</a>}
              </li>
              {props.state.authenticated ? "" : (
                <li>
                  <a href="/register">Register</a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <div class="page-wrapper">
        {props.children}
      </div>
      <footer>
        footer
      </footer>
    </main>
  );
}
