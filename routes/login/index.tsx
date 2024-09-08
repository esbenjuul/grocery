import { asset, Head } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import Login from "../../islands/Login.tsx";
import { ObjectId } from "npm:mongodb";
import { TUser } from "../../models/users.ts";
import { Handlers, PageProps, RouteContext } from "$fresh/server.ts";
import { Input } from "../../components/input/Input.tsx";
import { Button } from "../../components/button/Button.tsx";

export default function Home(props: PageProps<TUser<ObjectId>>) {
  return (
    <div class="container">
      <section class="box">
        <Login></Login>
      </section>
    </div>
  );
}
