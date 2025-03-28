import { asset, Head } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { ObjectId } from "mongodb";
import { TUser } from "../models/users.ts";
import Layout from "@/components/Layout.tsx";
import { Handlers, PageProps, RouteContext } from "$fresh/server.ts";
// import { ServerState } from "./_middleware.ts";
import { WithSession } from "deno_session";
import { Grocery } from "@/models/grocery.ts";
import GroceryList from "@/islands/GroceryList.tsx";
import List from "@/islands/List.tsx";
import { ServerState, sessionHandler } from "@/controllers/common.handler.ts";
import re from "https://esm.sh/v135/preact-render-to-string@6.3.1/X-ZS8q/denonext/preact-render-to-string.mjs";

export const handler: Handlers<
  ServerState,
  WithSession<"user", "success">
> = {
  GET: async (req, ctx) => await sessionHandler(req, ctx),
};

export default function Home(
  props: PageProps<ServerState, WithSession<"user", "success">>,
) {
  return (
    <>
      {props.data.authenticated
        ? (
          <Layout {...props}>
            <List data={props.data} />
          </Layout>
        )
        : "not auth"}
    </>
  );
}
