import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(
  props: JSX.HTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      disabled={props.disabled}
      class="button"
    />
  );
}
