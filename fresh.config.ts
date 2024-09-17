import { defineConfig } from "$fresh/server.ts";
import { getCookieSessionPlugin } from "deno_session";

export default defineConfig({
  plugins: [
    getCookieSessionPlugin("/", { cookieOptions: { maxAge: 60 * 10 } }),
  ],
});
