// routes/_middleware.ts

import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { Session } from "deno_session";

type User = {
  id: number;
  username: string;
  avatar: string;
};

export type ServerState = {
  token: string;
  session: Session<"user", "success">;
  error: { code: number; msg: string } | null;
};

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<ServerState>,
) {
  const { pathname } = new URL(req.url);
  const cookies = getCookies(req.headers);
  const access_token = cookies.auth;

  if (["/", "/login"].includes(pathname) && !access_token) {
    // TODO: redirect to login;
    console.log("path", pathname);
  }

  if (access_token) {
    // Here, we will have an actual lookup of user data in the future.

    ctx.state.token = access_token;
  } else if (!pathname.includes("/login")) {
    // console.log("dd");
    // return new Response(null, {
    //   status: 307,
    //   headers: { Location: "/login" },
    // });
  }

  return await ctx.next();
}
