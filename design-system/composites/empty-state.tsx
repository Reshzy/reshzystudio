import type { ReactNode } from "react";
import { ButtonLink } from "@/design-system/primitives/link/button-link";
import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
  children?: ReactNode;
}

export function EmptyState({
  title,
  description,
  action,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-start gap-4 border-t border-border-subtle py-16",
        className,
      )}
    >
      <Text variant="subheading" as="h3">
        {title}
      </Text>
      {description ? (
        <Text variant="body" as="p" className="max-w-md text-text-secondary">
          {description}
        </Text>
      ) : null}
      {children}
      {action ? (
        <ButtonLink href={action.href} variant="secondary">
          {action.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}
