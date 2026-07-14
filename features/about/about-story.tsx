import { SectionHeading } from "@/design-system/composites";
import { Reveal, Section, Text } from "@/design-system/primitives";
import type { AboutPageContent, Profile } from "@/types/content";

export interface AboutStoryProps {
  profile: Profile;
  content: AboutPageContent["story"];
}

export function AboutStory({ profile, content }: AboutStoryProps) {
  if (!profile.fullBiography) {
    return null;
  }

  return (
    <Section aria-labelledby="about-story-heading" width="prose">
      <Reveal>
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Journey"
            title={content.headline}
            titleId="about-story-heading"
            supporting={content.supporting}
          />
          <Text variant="body" as="p" className="text-text-secondary">
            {profile.fullBiography}
          </Text>
        </div>
      </Reveal>
    </Section>
  );
}
