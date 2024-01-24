import type { Signal } from "@preact/signals";
import { Button } from "../components/button/Button.tsx";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  const decrement = () => {
    console.log("minus");
    props.count.value -= 1;
  };
  const increment = () => {
  };
  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => decrement()}>-1</Button>
      <p class="text-3xl">{props.count}</p>
      <Button onClick={() => props.count.value += 1}>+1</Button>
    </div>
  );
}
