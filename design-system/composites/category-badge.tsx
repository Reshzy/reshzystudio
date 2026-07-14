import { Badge } from "@/design-system/primitives/badge/badge";
import { cn } from "@/design-system/shared";

export interface CategoryBadgeProps {
  label: string;
  count?: number;
  className?: string;
}

export function CategoryBadge({
  label,
  count,
  className,
}: CategoryBadgeProps) {
  return (
    <Badge variant="default" className={cn(className)}>
      {label}
      {typeof count === "number" ? (
        <span className="ms-2 tabular-nums text-text-muted">{count}</span>
      ) : null}
    </Badge>
  );
}
