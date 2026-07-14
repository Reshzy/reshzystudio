import {
  ButtonLink,
  Reveal,
  Section,
  Text,
} from "@/design-system/primitives";
import type { HomeSectionContent } from "@/types/content";

export interface HomeCtaProps {
  content: HomeSectionContent;
}

export function HomeCta({ content }: HomeCtaProps) {
  return (
    <Section aria-labelledby="home-cta-heading" width="prose">
      <Reveal>
        <div className="flex flex-col gap-8">
          <Text variant="metadata" as="p">
            Contact
          </Text>
          <Text variant="heading" as="h2" id="home-cta-heading">
            {content.headline}
          </Text>
          {content.body ? (
            <Text variant="body" as="p" className="text-text-secondary">
              {content.body}
            </Text>
          ) : null}
          {content.cta ? (
            <div>
              <ButtonLink href={content.cta.href}>
                {content.cta.label}
              </ButtonLink>
            </div>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
