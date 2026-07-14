import Image from "next/image";
import NextLink from "next/link";
import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface NavigationCardProps {
  href: string;
  direction: "previous" | "next";
  title: string;
  category: string;
  year: number;
  coverSrc: string;
  className?: string;
}

export function NavigationCard({
  href,
  direction,
  title,
  category,
  year,
  coverSrc,
  className,
}: NavigationCardProps) {
  const label = direction === "previous" ? "Previous" : "Next";
  const isNext = direction === "next";

  return (
    <NextLink
      href={href}
      className={cn(
        "group flex gap-4 outline-none",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring",
        isNext && "flex-row-reverse text-right md:ml-auto",
        className,
      )}
      aria-label={`${label} artwork: ${title}`}
    >
      <div
        className={cn(
          "relative h-20 w-16 shrink-0 overflow-hidden bg-surface-secondary",
          "transition-shadow duration-medium ease-standard",
          "motion-safe:group-hover:shadow-md",
          "md:h-24 md:w-20",
        )}
      >
        <Image
          src={coverSrc}
          alt=""
          fill
          sizes="80px"
          className={cn(
            "object-cover transition-[transform,filter] duration-large ease-standard",
            "motion-safe:group-hover:scale-[1.03]",
            "motion-safe:group-hover:brightness-[1.03]",
          )}
          unoptimized={coverSrc.endsWith(".svg")}
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1">
        <Text variant="metadata" as="p">
          {label}
        </Text>
        <Text
          variant="subheading"
          as="span"
          className={cn(
            "truncate text-text-primary transition-colors duration-small ease-standard",
            "group-hover:text-accent-primary",
          )}
        >
          {title}
        </Text>
        <Text variant="metadata" as="p" tabular>
          {category} · {year}
        </Text>
      </div>
    </NextLink>
  );
}
