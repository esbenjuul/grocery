import { asset, Head } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { ObjectId } from "npm:mongodb";
import { TUser } from "../models/users.ts";
import { Handlers, PageProps, RouteContext } from "$fresh/server.ts";
import { ServerState } from "./_middleware.ts";
import { Session, WithSession } from "deno_session";
import { setRenderState } from "$fresh/src/server/rendering/preact_hooks.ts";

//import { connectToCluster } from "../mongodb/connect-to-cluster.ts";

export const handler: Handlers<
  unknown,
  WithSession<"user", "success">
> = {
  async GET(req, ctx) {
    const { session, token } = ctx.state;

    console.log("index", token);
    if (!session || !token) {
      session.set("user", {});
      // session.destroy();
      return await ctx.render({ username: "not logged in" });
    }
    const { username, avatar, id } = session.get("user");
    if (id === token) {
      return ctx.render({
        username: username,
        avatar: avatar,
        authenticated: true,
      });
    }
    return ctx.render({ username: "none", avatar: "none" });
  },
};

export default function Home(props: PageProps<ServerState>) {
  console.log(props.state);
  return (
    <>
      <p>
        dd: {props.data?.username}, avatar: {props.data?.avatar}
      </p>
    </>
  );
}
