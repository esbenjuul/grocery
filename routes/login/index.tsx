import { asset, Head } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import Login from "../../islands/Login.tsx";
import { ObjectId } from "npm:mongodb";
import { TUser, User } from "../../models/users.ts";
import { Handlers, PageProps, RouteContext } from "$fresh/server.ts";
import { Input } from "../../components/input/Input.tsx";
import { Button } from "../../components/button/Button.tsx";

//import { connectToCluster } from "../mongodb/connect-to-cluster.ts";

// export const handler: Handlers<TUser<ObjectId>> = {
//   async GET(req, ctx) {
//     console.log(ctx.state);
//     const user = await User.findOne({ username: "esben" });
//     return ctx.render({ ...user });
//   },
// };

export default function Home(props: PageProps<TUser<ObjectId>>) {
  return <Login></Login>;
}
