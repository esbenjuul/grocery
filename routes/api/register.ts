import { HandlerContext } from "$fresh/server.ts";
import { createSecurePassword, User } from "../../models/users.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const form = await _req.formData();
  const username = String(form.get("username"));
  const password = String(form.get("password"));
  const repeatPassword = String(form.get("password-two"));

  if (!username || !password || !repeatPassword) {
    return new Response(null, { status: 400 });
  }
  const user = await User.findOne({ username: username });
  if (user) {
    // already exist
    return new Response(null, { status: 409 });
  }
  // user not found insert a new user
  const psw = await createSecurePassword(password);
  if (!psw) {
    return new Response(null, { status: 500 });
  }
  await User.insertOne({
    username,
    password: psw,
    avatar: username,
  });
  const headers = new Headers();
  headers.set("location", `/login#${username}`);
  return new Response(null, { status: 303, headers });
};
