import { Badge, type BadgeVariant } from "@/design-system/primitives/badge/badge";
import { cn } from "@/design-system/shared";

export interface TechBadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export function TechBadge({
  label,
  variant = "default",
  className,
}: TechBadgeProps) {
  return (
    <Badge variant={variant} className={cn(className)}>
      {label}
    </Badge>
  );
}
