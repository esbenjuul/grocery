import { BSON } from "mongodb";
import { Handlers } from "$fresh/server.ts";
import { WithSession } from "deno_session";
import {
  createList,
  deleteListById,
  getListFromOwnerId,
} from "@/services/list.service.ts";
import { UserSession } from "../login.ts";

interface ListData {
  name: string;
}
//  // Redirect user to thank you page.
//  const headers = new Headers();
//  headers.set("location", "/thanks-for-subscribing");

export const handler: Handlers<unknown, WithSession<"user", "success">> = {
  async POST(req, _ctx) {
    const { session } = _ctx.state;
    const { id } = session.get("user") as UserSession;

    const form = await req.formData();

    const list = await createList({
      name: form.get("name") as string,
      owner: new BSON.ObjectId(id),
    });
    return new Response(JSON.stringify({ item: list }), {});
  },

  async GET(req, _ctx) {
    const { session } = _ctx.state;
    const { id } = session.get("user") as UserSession;
    if (!id) {
      return new Response(JSON.stringify({ message: "no user found" }), {
        status: 400,
      });
    }
    try {
      const lists = await getListFromOwnerId(id);
      if (lists) {
        return new Response(JSON.stringify(lists), {});
      }
    } catch (err) {
      return new Response(
        JSON.stringify({
          message: "no list found or error in db connection",
          raw: err,
        }),
        {
          status: 505,
        },
      );
    }
    return new Response(
      JSON.stringify({
        message: "unknown error",
      }),
      {
        status: 500,
      },
    );
  },
};
