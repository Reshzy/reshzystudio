import { SectionHeading } from "@/design-system/composites";
import { Reveal, Section, Text } from "@/design-system/primitives";
import type { ContactPageContent } from "@/types/content";

export interface ContactIntroductionProps {
  content: ContactPageContent["introduction"];
}

export function ContactIntroduction({ content }: ContactIntroductionProps) {
  if (!content.body && !content.supporting) {
    return null;
  }

  return (
    <Section
      aria-labelledby="contact-introduction-heading"
      width="prose"
      className="border-t border-border-subtle"
    >
      <Reveal>
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Invitation"
            title={content.headline}
            titleId="contact-introduction-heading"
            supporting={content.supporting}
          />
          {content.body ? (
            <Text
              variant="body"
              as="p"
              className="max-w-prose text-text-secondary"
            >
              {content.body}
            </Text>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
