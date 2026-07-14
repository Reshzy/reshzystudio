import type { Ref, TextareaHTMLAttributes } from "react";
import { cn } from "@/design-system/shared";
import { interactiveField } from "@/lib/animation";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({
  invalid = false,
  className,
  ref,
  rows = 6,
  ...props
}: TextareaProps) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full resize-y rounded-md border bg-input-background px-4 py-3 text-body text-input-foreground",
        "placeholder:text-input-placeholder",
        interactiveField,
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
        invalid
          ? "border-input-border-error"
          : "border-input-border focus:border-input-border-focus",
        className,
      )}
      {...props}
    />
  );
}
