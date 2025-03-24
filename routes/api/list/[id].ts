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
  async DELETE(req, _ctx) {
    const id = _ctx.params.id;
    if (!id) {
      return new Response("no user found");
    }
    try {
      const deletedList = await deleteListById(id);
      return new Response(
        JSON.stringify({
          message: `deletedList ${deletedList}`,
        }),
      );
    } catch (err) {
      console.error(err);
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
