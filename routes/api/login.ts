import { HandlerContext } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";
import { comparePasswords, TUser, User } from "../../models/users.ts";
import { stringify } from "$std/dotenv/mod.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
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
  console.log(username);
  console.log(match);
  if (!match) {
    // already exist
    return new Response(null, { status: 400 });
  }

  const headers = new Headers();
  headers.set("location", "/");
  const value = JSON.stringify({ username: user.username, _id: user._id });
  console.log(value);
  setCookie(headers, {
    name: "auth",
    value: value,
    maxAge: 3600,
    sameSite: "Lax",
    domain: url.hostname,
    path: "/",
    secure: true,
  });
  return new Response(null, { status: 303, headers });
};
