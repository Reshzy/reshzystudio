import NextLink from "next/link";
import { Reveal, Section, Text } from "@/design-system/primitives";
import { cn } from "@/design-system/shared";
import type { HomePageContent } from "@/types/content";

export interface HomeDisciplinesProps {
  content: HomePageContent["disciplines"];
}

export function HomeDisciplines({ content }: HomeDisciplinesProps) {
  return (
    <Section
      aria-labelledby="home-disciplines-heading"
      className="border-y border-border-subtle bg-surface-primary"
    >
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <div className="flex max-w-xl flex-col gap-3">
            <Text variant="metadata" as="p">
              Practice
            </Text>
            <Text
              variant="heading"
              as="h2"
              id="home-disciplines-heading"
            >
              {content.headline}
            </Text>
            {content.supporting ? (
              <Text variant="body" as="p" className="text-text-secondary">
                {content.supporting}
              </Text>
            ) : null}
          </div>
        </Reveal>

        <ul className="grid gap-0 border-t border-border-subtle md:grid-cols-2">
          {content.items.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "border-b border-border-subtle",
                index % 2 === 0 && "md:border-r",
              )}
            >
              <Reveal delay={index * 0.04}>
                <NextLink
                  href={item.href}
                  className={cn(
                    "group flex h-full flex-col gap-3 px-0 py-8 md:px-8 md:py-10",
                    "transition-colors duration-small ease-standard",
                    "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus-ring",
                    index % 2 === 0 && "md:pl-0",
                    index % 2 === 1 && "md:pr-0",
                  )}
                >
                  <Text
                    variant="subheading"
                    as="h3"
                    className="transition-colors duration-small ease-standard group-hover:text-accent-primary"
                  >
                    {item.label}
                  </Text>
                  <Text variant="body" as="p" className="text-text-secondary">
                    {item.description}
                  </Text>
                </NextLink>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
