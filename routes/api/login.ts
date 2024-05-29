import { Handlers } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";
import { comparePasswords, User } from "../../models/users.ts";
import { WithSession } from "deno_session";

export const handler: Handlers<unknown, WithSession<"user", "success">> = {
  async POST(_req, _ctx) {
    const { session } = _ctx.state;
    const form = await _req.formData();
    const url = new URL(_req.url);
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

    const headers = new Headers();
    headers.set("location", "/");

    session.set("user", {
      id: user._id,
      username: user.username,
      avatar: user.avatar,
      authenticated: true,
    });

    setCookie(headers, {
      name: "auth",
      value: user._id.toString(),
      maxAge: 3600,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
    });
    return new Response(null, { status: 303, headers });
  },
};
