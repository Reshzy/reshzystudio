import { SectionHeading } from "@/design-system/composites";
import {
  ButtonLink,
  Reveal,
  Section,
  Text,
} from "@/design-system/primitives";
import type { HomeSectionContent } from "@/types/content";

export interface HomeIntroductionProps {
  content: HomeSectionContent;
}

export function HomeIntroduction({ content }: HomeIntroductionProps) {
  return (
    <Section aria-labelledby="home-introduction-heading" width="prose">
      <Reveal>
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Introduction"
            title={content.headline}
            titleId="home-introduction-heading"
          />
          {content.body ? (
            <Text variant="body" as="p" className="text-text-secondary">
              {content.body}
            </Text>
          ) : null}
          {content.cta ? (
            <div>
              <ButtonLink href={content.cta.href} variant="secondary">
                {content.cta.label}
              </ButtonLink>
            </div>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
