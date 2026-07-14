import { SectionHeading } from "@/design-system/composites";
import { Reveal, Section, Text } from "@/design-system/primitives";
import type { AboutPageContent, Profile } from "@/types/content";

export interface AboutStoryProps {
  profile: Profile;
  content: AboutPageContent["story"];
}

export function AboutStory({ profile, content }: AboutStoryProps) {
  const paragraphs = [
    profile.philosophy,
    profile.fullBiography,
  ].filter((value): value is string => Boolean(value));

  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="about-story-heading"
      width="prose"
      className="border-y border-border-subtle bg-surface-primary"
    >
      <Reveal>
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Perspective"
            title={content.headline}
            titleId="about-story-heading"
            supporting={content.supporting}
          />
          <div className="flex flex-col gap-6">
            {paragraphs.map((paragraph) => (
              <Text
                key={paragraph.slice(0, 24)}
                variant="body"
                as="p"
                className="text-text-secondary"
              >
                {paragraph}
              </Text>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
