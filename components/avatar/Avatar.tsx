import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Avatar(
  props: { avatar: string; title: string; subTitle: string },
) {
  return (
    <article class="avatar">
      <figure>
        <img
          alt="image of an avatar"
          src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${props.avatar}&hair=short01,short02,short03,short04,long05
  `}
        />
      </figure>
      <section>
        <h2>{props.title}</h2>
        <span class="sub-title">{props.subTitle}</span>
      </section>
    </article>
  );
}
