import { JSX } from "preact";

export function IconButton(
  props: JSX.HTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      disabled={props.disabled}
      class="icon-button"
    >
      {props.children}
    </button>
  );
}
