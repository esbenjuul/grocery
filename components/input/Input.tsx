import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export interface TInput extends JSX.HTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input(props: TInput) {
  return (
    <div class="form-input">
      <label>{props.label}</label>
      <input
        {...props}
        disabled={!IS_BROWSER || props.disabled}
        class="input-control"
      />
    </div>
  );
}
