import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/design-system/shared";
import { interactiveField } from "@/lib/animation";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export function Input({
  invalid = false,
  className,
  ref,
  ...props
}: InputProps) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full rounded-md border bg-input-background px-4 py-3 text-body text-input-foreground",
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
