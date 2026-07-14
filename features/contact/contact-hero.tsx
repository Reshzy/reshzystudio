import { FadeIn, Reveal, Section, Text } from "@/design-system/primitives";
import type { ContactPageContent } from "@/types/content";

export interface ContactHeroProps {
  content: ContactPageContent["hero"];
}

export function ContactHero({ content }: ContactHeroProps) {
  return (
    <Section
      as="header"
      aria-labelledby="contact-hero-heading"
      width="prose"
      className="pb-8 md:pb-12 lg:pb-16"
    >
      <div className="flex flex-col gap-8">
        <Reveal>
          <Text variant="metadata" as="p">
            Contact
          </Text>
        </Reveal>

        <FadeIn>
          <Text
            variant="display"
            as="h1"
            id="contact-hero-heading"
            className="max-w-3xl text-text-primary"
          >
            {content.headline}
          </Text>
        </FadeIn>

        {content.supporting ? (
          <Reveal delay={0.08}>
            <Text
              variant="body"
              as="p"
              className="max-w-prose text-text-secondary"
            >
              {content.supporting}
            </Text>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
