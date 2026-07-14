import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/design-system/shared";

export type ContainerWidth = "default" | "prose" | "full";

const widthStyles: Record<ContainerWidth, string> = {
  default: "max-w-container w-full",
  prose: "max-w-prose w-full",
  full: "w-full max-w-none",
};

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  width?: ContainerWidth;
}

export function Container({
  as: Component = "div",
  width = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto px-4 md:px-6 lg:px-8",
        widthStyles[width],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
