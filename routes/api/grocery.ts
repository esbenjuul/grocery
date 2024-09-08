import { Handlers } from "$fresh/server.ts";
import { WithSession } from "deno_session";
import { Grocery, IGrocery } from "@/models/grocery.ts";

export const handler: Handlers<unknown, WithSession<"user", "success">> = {
  async POST(_req, _ctx) {
    const { session } = _ctx.state;
    //const form = await _req.formData();
    // const url = new URL(_req.url);
    const item: IGrocery = {
      name: "Tomato",
      img:
        "https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=",
      category: "green",
      icon: "tomato",
    };

    const newItem = await Grocery.insertOne(item);

    return new Response(JSON.stringify({ ok: true, item: newItem }), {});
  },
};
