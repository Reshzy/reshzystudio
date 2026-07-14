import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface QuoteBlockProps {
  children: string;
  cite?: string;
  className?: string;
}

export function QuoteBlock({ children, cite, className }: QuoteBlockProps) {
  return (
    <blockquote
      className={cn(
        "border-l border-border-strong pl-6 md:pl-8",
        className,
      )}
    >
      <Text
        variant="subheading"
        as="p"
        className="max-w-prose text-text-primary"
      >
        {children}
      </Text>
      {cite ? (
        <footer className="mt-4">
          <Text variant="metadata" as="p">
            {cite}
          </Text>
        </footer>
      ) : null}
    </blockquote>
  );
}
