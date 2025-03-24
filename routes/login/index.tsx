import Login from "@/islands/Login.tsx";
import { ObjectId } from "mongodb";
import { TUser } from "@/models/users.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";
import { ServerState } from "@/controllers/common.handler.ts";
import { WithSession } from "deno_session";
import { sessionHandler as GET } from "@/controllers/common.handler.ts";

export const handler: Handlers<
  ServerState,
  WithSession<"user", "success">
> = {
  GET,
};

export default function Home(props: PageProps<TUser<ObjectId>>) {
  return (
    <Layout {...props}>
      <div class="container">
        <section class="box">
          <Login></Login>
        </section>
      </div>
    </Layout>
  );
}
