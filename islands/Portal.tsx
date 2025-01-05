// components/Portal.tsx
import { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import { render } from "preact";

export function Portal({ children }: { children: ComponentChildren }) {
  const [container] = useState(() => {
    if (typeof document !== "undefined") {
      return document.createElement("div");
    }
    return null;
  });

  useEffect(() => {
    if (!container) return;
    document.body.appendChild(container);
    render(children as unknown, container);

    return () => {
      document.body.removeChild(container);
      render(null, container);
    };
  }, [children, container]);

  return null;
}
