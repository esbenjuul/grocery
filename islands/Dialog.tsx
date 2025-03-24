import { ComponentChildren } from "preact";
import classNames from "classnames";
import { useEffect, useRef, useState } from "preact/hooks";
import { Portal } from "./Portal.tsx";
import { Button } from "@/components/index.ts";

interface DialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  beforeClose?: () => void;
  trigger?: ComponentChildren;
  title: string;
  description?: string;
  closeButtonText?: string;
  children: ComponentChildren;
  disableClose?: boolean;
}

export function Dialog(
  {
    isOpen,
    onOpenChange,
    beforeClose,
    trigger,
    title,
    description,
    closeButtonText,
    disableClose = false,
    children,
  }: DialogProps,
) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (
        (e.target as HTMLDivElement) === content &&
        !(e.target as HTMLDivElement).classList.contains("dialog-open")
      ) {
        content.removeEventListener("transitionend", handleTransitionEnd);
        onOpenChange(false);
      }
    };

    if (isOpen) {
      content.addEventListener("transitionend", handleTransitionEnd);
      setTimeout(() => {
        setOpen(true);
      }, 50);
    }
  }, [isOpen]);

  const handleClose = () => {
    const content = contentRef.current;
    if (!content) return;
    if (beforeClose) {
      beforeClose();
    }
  };

  return (
    <>
      {trigger && <Button onClick={() => onOpenChange(true)}>{trigger}</Button>}

      {isOpen && (
        <Portal>
          <div
            className={`dialog-overlay ${open ? "dialog-open" : ""}`}
            ref={contentRef}
          >
            <div class="dialog-content">
              <div class="dialog-inner">
                <header class="dialog-header">
                  <div>
                    <h2 class="dialog-title">{title}</h2>
                    {description && (
                      <p class="dialog-description">{description}</p>
                    )}
                  </div>
                  <button onClick={handleClose}>✕</button>
                </header>
                <main class="dialog-body">{children}</main>
                <footer class="dialog-footer">
                  <Button
                    onClick={handleClose}
                    class="dialog-close"
                    disabled={disableClose}
                  >
                    {closeButtonText || "Close"}
                  </Button>
                </footer>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
