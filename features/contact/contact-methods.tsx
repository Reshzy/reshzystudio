import { SectionHeading } from "@/design-system/composites";
import { Link, Reveal, Section, Text } from "@/design-system/primitives";
import type { ContactPageContent } from "@/types/content";

export interface ContactMethodsProps {
  content: ContactPageContent["methods"];
  items: ContactPageContent["methodsItems"];
  email?: string;
}

export function ContactMethods({
  content,
  items,
  email,
}: ContactMethodsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="contact-methods-heading"
      width="prose"
      className="border-t border-border-subtle"
    >
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Reach out"
            title={content.headline}
            titleId="contact-methods-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <ul className="grid gap-8 md:grid-cols-2 md:gap-10">
          {items.map((item, index) => {
            const href =
              item.href ??
              (item.id === "email" && email ? `mailto:${email}` : undefined);
            const value =
              item.id === "email" && email ? email : undefined;

            return (
              <li key={item.id}>
                <Reveal delay={Math.min(index * 0.04, 0.12)}>
                  <article className="flex h-full flex-col gap-4 border-t border-border-subtle pt-6">
                    <Text variant="subheading" as="h3">
                      {item.label}
                    </Text>
                    <Text
                      variant="body"
                      as="p"
                      className="text-text-secondary"
                    >
                      {item.description}
                    </Text>
                    {href && value ? (
                      <Link href={href} variant="accent">
                        {value}
                      </Link>
                    ) : item.id === "form" ? (
                      <Link href="#contact-form" variant="accent">
                        Write a message
                      </Link>
                    ) : null}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
