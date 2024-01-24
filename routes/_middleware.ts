// routes/_middleware.ts

import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { TUser, User } from "../models/users.ts";

type User = {
  id: number;
  name: string;
  avatar: string;
};

export type ServerState = {
  user: User | null;
  error: { code: number; msg: string } | null;
};

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<ServerState>,
) {
  const url = new URL(req.url);
  const cookies = getCookies(req.headers);
  const access_token = cookies.auth;
  console.log(cookies);
  // console.log(url.pathname);
  const headers = new Headers();
  headers.set("location", "/");

  if (!access_token) {
    // Can't use 403 if we want to redirect to home page.
    return new Response(null, { headers, status: 303 });
  }

  if (access_token) {
    // Here, we will have an actual lookup of user data in the future.
    //console.log("at", JSON.parse(access_token));
    console.log("at", access_token);
    //const user = await User.find({ _id: access_token });
    //console.log(user);
    const user_data = {
      id: 2,
      name: "esben",
      avatar: "esben",
    };

    if (!user_data) {
      // return new Response(null, { headers, status: 303 });
    }

    ctx.state.user = user_data;
  }

  return await ctx.next();
}
