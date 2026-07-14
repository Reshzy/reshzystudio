import type { ReactNode } from "react";
import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
  optionalHint?: string;
}

export function FormField({
  id,
  label,
  error,
  children,
  className,
  optionalHint,
}: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="flex flex-col gap-1">
        <Text variant="metadata" as="span">
          {label}
        </Text>
        {optionalHint ? (
          <Text variant="caption" as="span">
            {optionalHint}
          </Text>
        ) : null}
      </label>
      {children}
      {error ? (
        <Text
          variant="caption"
          as="p"
          id={errorId}
          role="alert"
          className="text-state-error"
        >
          {error}
        </Text>
      ) : null}
    </div>
  );
}
