import type { InputHTMLAttributes } from "react";
import { cn } from "@/design-system/shared";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({
  invalid = false,
  className,
  ...props
}: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full rounded-md border bg-input-background px-4 py-3 text-body text-input-foreground",
        "placeholder:text-input-placeholder",
        "transition-colors duration-small ease-standard",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        invalid
          ? "border-input-border-error"
          : "border-input-border focus:border-input-border-focus",
        className,
      )}
      {...props}
    />
  );
}
