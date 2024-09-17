import { Handlers } from "$fresh/server.ts";
import { comparePasswords, User } from "../../models/users.ts";
import { type WithSession } from "deno_session";

export type UserSession = {
  id?: string;
  username?: string;
  avatar?: string;
  authenticated?: boolean;
};

export const handler: Handlers<unknown, WithSession<"user", "success">> = {
  async POST(req, ctx) {
    const { session } = ctx.state;
    const form = await req.formData();
    const url = new URL(req.url);
    const username = String(form.get("username"));
    const password = String(form.get("password"));
    if (!username || !password) {
      return new Response(null, { status: 400 });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return new Response(null, { status: 400 });
    }
    const match = await comparePasswords(user, password);
    if (!match) {
      // already exist
      return new Response(null, { status: 400 });
    }

    const headers = new Headers(req.headers);
    headers.set("location", "/");

    session.set("user", {
      id: user._id,
      username: user.username,
      avatar: user.avatar,
      authenticated: true,
    });
    return new Response(null, { status: 303, headers });
  },
};
