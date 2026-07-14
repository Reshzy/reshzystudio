import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { Container, type ContainerWidth } from "./container";
import { cn } from "@/design-system/shared";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  width?: ContainerWidth;
  contained?: boolean;
  children: ReactNode;
}

export function Section({
  as: Component = "section",
  width = "default",
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  const content = contained ? (
    <Container width={width}>{children}</Container>
  ) : (
    children
  );

  return (
    <Component
      className={cn("py-16 md:py-24 lg:py-32", className)}
      {...props}
    >
      {content}
    </Component>
  );
}
