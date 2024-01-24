import { asset, Head } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { ObjectId } from "npm:mongodb";
import { TUser } from "../models/users.ts";
import { Handlers, PageProps, RouteContext } from "$fresh/server.ts";
import { ServerState } from "./_middleware.ts";

//import { connectToCluster } from "../mongodb/connect-to-cluster.ts";

export const handler: Handlers<TUser<ObjectId>> = {
  async GET(req, ctx) {
    console.log(ctx.state);
    //const user = await User.findOne({ username: "esben" });
    return ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps<ServerState>) {
  // temporary
  // await User.insertOne({
  //   username: "esben",
  //   password: "test",
  //   email: "e@d.dk",
  // });

  return (
    <>
      <p>
        dd: {props.data?.username}
      </p>
    </>
  );
}
