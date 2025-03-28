// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_grocery from "./routes/api/grocery.ts";
import * as $api_joke from "./routes/api/joke.ts";
import * as $api_list_id_ from "./routes/api/list/[id].ts";
import * as $api_list_index from "./routes/api/list/index.ts";
import * as $api_login from "./routes/api/login.ts";
import * as $api_register from "./routes/api/register.ts";
import * as $components_index from "./routes/components/index.tsx";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $layout from "./routes/layout.tsx";
import * as $login_index from "./routes/login/index.tsx";
import * as $logout_index from "./routes/logout/index.tsx";
import * as $profile from "./routes/profile.tsx";
import * as $register_index from "./routes/register/index.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Dialog from "./islands/Dialog.tsx";
import * as $GroceryList from "./islands/GroceryList.tsx";
import * as $List from "./islands/List.tsx";
import * as $Login from "./islands/Login.tsx";
import * as $Portal from "./islands/Portal.tsx";
import * as $Register from "./islands/Register.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/grocery.ts": $api_grocery,
    "./routes/api/joke.ts": $api_joke,
    "./routes/api/list/[id].ts": $api_list_id_,
    "./routes/api/list/index.ts": $api_list_index,
    "./routes/api/login.ts": $api_login,
    "./routes/api/register.ts": $api_register,
    "./routes/components/index.tsx": $components_index,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/layout.tsx": $layout,
    "./routes/login/index.tsx": $login_index,
    "./routes/logout/index.tsx": $logout_index,
    "./routes/profile.tsx": $profile,
    "./routes/register/index.tsx": $register_index,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
    "./islands/Dialog.tsx": $Dialog,
    "./islands/GroceryList.tsx": $GroceryList,
    "./islands/List.tsx": $List,
    "./islands/Login.tsx": $Login,
    "./islands/Portal.tsx": $Portal,
    "./islands/Register.tsx": $Register,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
