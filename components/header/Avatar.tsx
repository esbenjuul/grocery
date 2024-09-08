import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Avatar(props: { avatar: string }) {
  return (
    <figure class="avatar">
      <img
        alt="image of an avatar"
        src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${props.avatar}&hair=short01,short02,short03,short04,long05
  `}
      />
      <figcaption>{props.avatar}</figcaption>
    </figure>
  );
}
