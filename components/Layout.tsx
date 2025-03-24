import { ComponentChildren } from "preact";
import {
  ArrowLeftIcon,
  Avatar,
  DotsIcon,
  IconButton,
} from "@/components/index.ts";
import { ServerState } from "@/controllers/common.handler.ts";
import { PageProps } from "$fresh/server.ts";
import { WithSession } from "deno_session";

type Props = {
  children: ComponentChildren;
  state: ServerState;
};

const isSubpage = (route: string) => true;

export default function Layout(
  props: PageProps<ServerState, WithSession<"user", "success">>,
) {
  return (
    <main>
      <header class="header">
        <div class="container">
          {isSubpage(props.route)
            ? (
              <a href="/">
                <IconButton>
                  <ArrowLeftIcon />
                </IconButton>
              </a>
            )
            : (
              <a href="/profile">
                <Avatar
                  avatar={"dd"}
                  title={props.data.username || ""}
                  subTitle={props.data.email || ""}
                >
                </Avatar>
              </a>
            )}
          <h1>Title</h1>
          <Avatar></Avatar>
        </div>
      </header>
      <div class="page-wrapper container">
        <nav>
          <ul>
            <li>
              {props.data.authenticated
                ? <a href="/logout">Logout</a>
                : <a href="/login">Login</a>}
            </li>
          </ul>
        </nav>
        {props.children}
      </div>
    </main>
  );
}
