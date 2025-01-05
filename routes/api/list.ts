import { BSON } from "mongodb";
import { Handlers } from "$fresh/server.ts";
import { WithSession } from "deno_session";
import { createList, List } from "@/models/list.ts";
import { UserSession } from "./login.ts";

interface ListData {
  name: string;
}

export const handler: Handlers<unknown, WithSession<"user", "success">> = {
  async POST(req, _ctx) {
    const { session } = _ctx.state;
    const { id } = session.get("user") as UserSession;

    const form = await req.formData();

    console.log("form", form.get("name"));
    const list = await createList({
      name: form.get("name") as string,
      owner: new BSON.ObjectId(id),
    });
    return new Response(JSON.stringify({ ok: true, item: list }), {});
  },

  async GET(req, _ctx) {
    const { session } = _ctx.state;
    const { id } = session.get("user") as UserSession;
    const lists = await List.find({ owner: new BSON.ObjectId(id) }).toArray();
    return new Response(JSON.stringify(lists), {});
  },
};
