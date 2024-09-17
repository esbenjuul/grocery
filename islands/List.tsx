import type { Signal } from "@preact/signals";
import { Button } from "../components/button/Button.tsx";
import { Handlers } from "$fresh/server.ts";
import { ServerState } from "@/controllers/common.handler.ts";
import { WithSession } from "deno_session";

export default function List(props: { data: ServerState }) {
  const addList = async () => {
    fetch("/api/list", {
      method: "POST",
      body: JSON.stringify({ name: "test", owner: props.data.id }),
    });
  };
  return (
    <div class="">
      <Button onClick={() => addList()}>Add list</Button>
    </div>
  );
}
