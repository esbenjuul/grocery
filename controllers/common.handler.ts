import { ObjectId } from "mongodb";
import { FreshContext, Handlers } from "$fresh/src/server/types.ts";
import { WithSession } from "deno_session";

export type ServerState = {
  id?: ObjectId;
  username?: string;
  avatar?: string;
  authenticated?: boolean;
};
type SessionState = { id: ObjectId; username: string; avatar: string };

export const sessionHandler = async (
  req: Request,
  ctx: FreshContext<WithSession<"user", "success">, ServerState>,
) => {
  const { session } = ctx.state;

  if (!session.has("user")) {
    session.set("user", {});
    return await ctx.render({ authenticated: false });
  }
  const { username, avatar, id } = session.get("user") as SessionState;
  if (id) {
    return ctx.render({
      username: username,
      avatar: avatar,
      authenticated: true,
    });
  }
  return ctx.render({ username: "none", avatar: "none" });
};
