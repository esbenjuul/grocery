import type { Signal } from "@preact/signals";
import { Button } from "../components/button/Button.tsx";
import { Handlers } from "$fresh/server.ts";
import { ServerState } from "@/controllers/common.handler.ts";
import { WithSession } from "deno_session";

interface CounterProps {
  count: Signal<number>;
}

export default function GroceryList() {
  const addGrocery = async () => {
    try {
      const response = await fetch("/api/grocery", {
        method: "POST",

        body: JSON.stringify({
          name: "milk",
          price: 10,
          category: "dairy",
          amount: 1,
        }),
      });
    } catch (err) {
      console.error(err);
    }
    //props.count.value -= 1;
  };
  const increment = () => {
  };
  return (
    <div class="">
      hej
      <Button onClick={() => addGrocery()}>add grocery item</Button>
    </div>
  );
}
