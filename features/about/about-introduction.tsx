import { SectionHeading } from "@/design-system/composites";
import { Reveal, Section, Text } from "@/design-system/primitives";
import type { AboutPageContent, Profile } from "@/types/content";

export interface AboutIntroductionProps {
  profile: Profile;
  content: AboutPageContent["introduction"];
}

export function AboutIntroduction({
  profile,
  content,
}: AboutIntroductionProps) {
  const paragraphs = [
    profile.shortBio,
    profile.introduction,
  ].filter((value): value is string => Boolean(value));

  return (
    <Section aria-labelledby="about-introduction-heading" width="prose">
      <Reveal>
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Summary"
            title={content.headline}
            titleId="about-introduction-heading"
            supporting={content.supporting}
          />
          <div className="flex flex-col gap-6">
            {paragraphs.map((paragraph) => (
              <Text
                key={paragraph.slice(0, 32)}
                variant="body"
                as="p"
                className="text-text-secondary"
              >
                {paragraph}
              </Text>
            ))}
          </div>
          {profile.currentFocus ? (
            <div className="border-t border-border-subtle pt-6">
              <Text variant="metadata" as="p">
                Current focus
              </Text>
              <Text
                variant="body"
                as="p"
                className="mt-3 max-w-prose text-text-primary"
              >
                {profile.currentFocus}
              </Text>
            </div>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
