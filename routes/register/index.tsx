import Register from "@/islands/Register.tsx";
import { ObjectId } from "npm:mongodb";
import { TUser, User } from "../../models/users.ts";
import { PageProps } from "$fresh/server.ts";

export default function Home(props: PageProps<TUser<ObjectId>>) {
  return <Register></Register>;
}
