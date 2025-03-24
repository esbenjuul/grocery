import Login from "@/islands/Login.tsx";
import { ObjectId } from "mongodb";
import { TUser } from "@/models/users.ts";
import { PageProps } from "$fresh/server.ts";

import { Handlers } from "$fresh/server.ts";
import { ServerState } from "@/controllers/common.handler.ts";
import { WithSession } from "deno_session";

export const handler: Handlers<
  ServerState,
  WithSession<"user", "success">
> = {
  async GET(req, ctx) {
    const headers = new Headers(req.headers);
    const { session } = ctx.state;
    session.delete("user");
    headers.set("location", "/login");

    return new Response(null, { status: 302, headers });
  },
};
