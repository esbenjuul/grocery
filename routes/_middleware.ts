// routes/_middleware.ts

import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
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
  ctx: FreshContext<ServerState>,
) {
  const { pathname } = new URL(req.url);
  const cookies = getCookies(req.headers);
  const access_token = cookies.auth;
  // console.log("cookie", access_token);

  if (["/", "/login"].includes(pathname) && !access_token) {
    // TODO: redirect to login;
    // console.log("path ee", pathname);
  }

  if (access_token) {
    // Here, we will have an actual lookup of user data in the future.
    ctx.state.token = access_token;
  } else if (!pathname.includes("/login")) {
    // return new Response(null, {
    //   status: 307,
    //   headers: { Location: "/login" },
    // });
  }

  return await ctx.next();
}
