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
  const body = profile.introduction ?? profile.shortBio;

  return (
    <Section aria-labelledby="about-introduction-heading" width="prose">
      <Reveal>
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Introduction"
            title={content.headline}
            titleId="about-introduction-heading"
            supporting={content.supporting}
          />
          <Text variant="body" as="p" className="text-text-secondary">
            {body}
          </Text>
          {profile.currentFocus ? (
            <Text variant="caption" as="p">
              Current focus — {profile.currentFocus}
            </Text>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
